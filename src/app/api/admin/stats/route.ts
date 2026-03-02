import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const [totalLeads, totalDonations, recentLeads, recentDonations, donations] =
      await Promise.all([
        prisma.lead.count(),
        prisma.donation.count(),
        prisma.lead.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
        }),
        prisma.donation.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
        }),
        prisma.donation.findMany({
          select: { amount: true },
        }),
      ]);

    const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);

    return NextResponse.json({
      totalLeads,
      totalDonations,
      totalAmount,
      recentLeads,
      recentDonations,
    });
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar estatísticas" },
      { status: 500 }
    );
  }
}
