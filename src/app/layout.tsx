import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ILPI - Instituição de Longa Permanência para Idosos | Doe Agora",
  description:
    "A ILPI é uma instituição sem fins lucrativos que atende idosos que precisam de abrigo e cuidados. Faça sua doação e ajude a distribuir amor.",
  keywords: [
    "ILPI",
    "doação",
    "idosos",
    "instituição",
    "Volta Redonda",
    "asilo",
    "caridade",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "ILPI - Instituição de Longa Permanência para Idosos",
    description:
      "Ajude a ILPI a continuar distribuindo amor. Faça sua doação via PIX ou Boleto.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
