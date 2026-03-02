"use client";

import { useState } from "react";
import {
  Heart,
  User,
  Mail,
  Phone,
  CreditCard,
  Check,
  Copy,
  Loader2,
} from "lucide-react";
import Image from "next/image";

const PIX_CNPJ = "29.292.752/0013-99";

function formatCPF(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function DonationForm() {
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [donorData, setDonorData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCopyPix = async () => {
    await navigator.clipboard.writeText(PIX_CNPJ);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSaveDonor = async () => {
    const newErrors: Record<string, string> = {};
    if (!donorData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!donorData.email.trim() || !/\S+@\S+\.\S+/.test(donorData.email))
      newErrors.email = "E-mail inválido";
    if (!donorData.phone.trim() || donorData.phone.replace(/\D/g, "").length < 10)
      newErrors.phone = "Telefone inválido";
    if (!donorData.cpf.trim() || donorData.cpf.replace(/\D/g, "").length !== 11)
      newErrors.cpf = "CPF inválido";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSaving(true);
    try {
      await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: donorData.name,
          donorEmail: donorData.email,
          donorPhone: donorData.phone,
          donorCpf: donorData.cpf,
        }),
      });
      setSaved(true);
    } catch {
      // best-effort
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 text-center">
      {/* QR Code PIX direto */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">
          Doe via PIX
        </h3>
        <p className="text-gray-500 text-sm">
          Escaneie o QR Code abaixo com o app do seu banco
        </p>
      </div>

      <div className="relative w-52 h-52 sm:w-60 sm:h-60 mx-auto rounded-xl overflow-hidden">
        <Image
          src="/pix.jpg"
          alt="QR Code PIX para doação"
          fill
          className="object-contain"
        />
      </div>

      <div className="space-y-1">
        <p className="font-bold text-gray-900 text-xs sm:text-sm">
          ASS. DOS APOSENTADOS E PESIONISTAS DE VOLTA REDONDA
        </p>
        <p className="text-gray-500 text-xs">
          CNPJ: {PIX_CNPJ}
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2 border border-gray-200">
        <code className="flex-1 text-sm text-gray-700 font-medium text-center">
          {PIX_CNPJ}
        </code>
        <button
          onClick={handleCopyPix}
          className={`flex-shrink-0 px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-1.5 ${
            copied
              ? "bg-green-500 text-white"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copiar Chave
            </>
          )}
        </button>
      </div>

      {/* Identificação opcional */}
      {!showForm && !saved && (
        <button
          onClick={() => setShowForm(true)}
          className="text-primary hover:text-primary-dark text-sm font-medium transition-colors underline underline-offset-2"
        >
          Quero me identificar como doador
        </button>
      )}

      {showForm && !saved && (
        <div className="space-y-4 text-left border-t border-gray-100 pt-5">
          <p className="text-sm text-gray-500 text-center">
            Preencha seus dados para registrar sua doação
          </p>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Nome completo
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Digite seu nome completo"
                value={donorData.name}
                onChange={(e) =>
                  setDonorData({ ...donorData, name: e.target.value })
                }
                className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-gray-900 ${
                  errors.name
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-primary"
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="seu@email.com"
                value={donorData.email}
                onChange={(e) =>
                  setDonorData({ ...donorData, email: e.target.value })
                }
                className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-gray-900 ${
                  errors.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-primary"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Telefone
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder="(24) 99999-9999"
                  value={donorData.phone}
                  onChange={(e) =>
                    setDonorData({
                      ...donorData,
                      phone: formatPhone(e.target.value),
                    })
                  }
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-gray-900 ${
                    errors.phone
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-primary"
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                CPF
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  value={donorData.cpf}
                  onChange={(e) =>
                    setDonorData({
                      ...donorData,
                      cpf: formatCPF(e.target.value),
                    })
                  }
                  className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-gray-900 ${
                    errors.cpf
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-primary"
                  }`}
                />
              </div>
              {errors.cpf && (
                <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>
              )}
            </div>
          </div>

          <button
            onClick={handleSaveDonor}
            disabled={saving}
            className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Heart className="w-5 h-5" />
            )}
            {saving ? "Enviando..." : "Registrar Doação"}
          </button>
        </div>
      )}

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <Check className="w-6 h-6 text-green-600 mx-auto mb-1" />
          <p className="text-green-700 font-semibold text-sm">
            Obrigado, {donorData.name.split(" ")[0]}! Sua doação foi registrada.
          </p>
        </div>
      )}
    </div>
  );
}
