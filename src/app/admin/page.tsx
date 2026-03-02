"use client";

import { useState, useEffect } from "react";
import { Users, Heart, DollarSign, TrendingUp } from "lucide-react";

interface Stats {
  totalLeads: number;
  totalDonations: number;
  totalAmount: number;
  recentLeads: { id: string; nome: string; createdAt: string }[];
  recentDonations: {
    id: string;
    donorName: string;
    amount: number;
    paymentMethod: string;
    createdAt: string;
  }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6 lg:p-8">
        <p className="text-gray-500">Erro ao carregar dados.</p>
      </div>
    );
  }

  const cards = [
    {
      label: "Total de Leads",
      value: stats.totalLeads,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Total de Doações",
      value: stats.totalDonations,
      icon: Heart,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Valor Arrecadado",
      value: stats.totalAmount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      icon: DollarSign,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      label: "Média por Doação",
      value:
        stats.totalDonations > 0
          ? (stats.totalAmount / stats.totalDonations).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
          : "R$ 0,00",
      icon: TrendingUp,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Visão geral do site da ILPI
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {card.label}
              </span>
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.color}`}
              >
                <card.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent items */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Leads Recentes</h3>
          {stats.recentLeads.length === 0 ? (
            <p className="text-gray-400 text-sm">Nenhum lead ainda.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="font-medium text-gray-900">
                    {lead.nome}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {new Date(lead.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Donations */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">
            Doações Recentes
          </h3>
          {stats.recentDonations.length === 0 ? (
            <p className="text-gray-400 text-sm">Nenhuma doação ainda.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <span className="font-medium text-gray-900">
                      {donation.donorName}
                    </span>
                    <span className="text-gray-400 text-xs ml-2">
                      via {donation.paymentMethod.toUpperCase()}
                    </span>
                  </div>
                  <span className="font-semibold text-green-600">
                    {donation.amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
