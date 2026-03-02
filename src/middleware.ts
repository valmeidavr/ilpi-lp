import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "ilpi-dev-secret-change-in-production"
);

// Rate limiting para login (in-memory)
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_LOGIN_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutos

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) return false;
  return entry.count >= MAX_LOGIN_ATTEMPTS;
}

function recordLoginAttempt(ip: string) {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
  } else {
    entry.count++;
  }
}

function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}

async function verifyAuth(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("admin_session")?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate limit no login
  if (pathname === "/api/admin/login" && request.method === "POST") {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return addSecurityHeaders(
        NextResponse.json(
          { error: "Muitas tentativas. Tente novamente em 15 minutos." },
          { status: 429 }
        )
      );
    }
    recordLoginAttempt(ip);
    return addSecurityHeaders(NextResponse.next());
  }

  // Página de login: redireciona se já logado
  if (pathname === "/admin/login") {
    if (await verifyAuth(request)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return addSecurityHeaders(NextResponse.next());
  }

  // Proteger TODAS as API routes do admin (exceto login)
  if (pathname.startsWith("/api/admin") && pathname !== "/api/admin/login") {
    if (!(await verifyAuth(request))) {
      return addSecurityHeaders(
        NextResponse.json({ error: "Não autenticado" }, { status: 401 })
      );
    }
    return addSecurityHeaders(NextResponse.next());
  }

  // Proteger TODAS as páginas do admin
  if (pathname.startsWith("/admin")) {
    if (!(await verifyAuth(request))) {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
      response.cookies.delete("admin_session");
      return addSecurityHeaders(response);
    }
    return addSecurityHeaders(NextResponse.next());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
