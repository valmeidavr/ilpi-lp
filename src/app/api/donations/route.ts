import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { donorName, donorEmail, donorPhone, donorCpf, amount, paymentMethod } = body;

    if (!donorName || !donorEmail) {
      return NextResponse.json(
        { error: "Dados incompletos" },
        { status: 400 }
      );
    }

    const donation = await prisma.donation.create({
      data: {
        donorName,
        donorEmail,
        donorPhone: donorPhone || "",
        donorCpf: donorCpf || "",
        amount: amount ? parseFloat(amount) : 0,
        paymentMethod: paymentMethod || "pix",
      },
    });

    return NextResponse.json(donation, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao registrar doação" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const [donations, total] = await Promise.all([
    prisma.donation.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.donation.count(),
  ]);

  return NextResponse.json({
    donations,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
