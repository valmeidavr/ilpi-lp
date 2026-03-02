"use client";

import { useState } from "react";
import {
  Building2,
  User,
  Mail,
  Phone,
  FileText,
  Globe,
  Send,
  Check,
  Loader2,
} from "lucide-react";

interface FormData {
  nome: string;
  responsavel: string;
  email: string;
  telefone: string;
  cnpj: string;
  site: string;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatCNPJ(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8)
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12)
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    responsavel: "",
    email: "",
    telefone: "",
    cnpj: "",
    site: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.nome.trim()) newErrors.nome = "Nome da empresa é obrigatório";
    if (!formData.responsavel.trim())
      newErrors.responsavel = "Responsável é obrigatório";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "E-mail inválido";
    if (
      !formData.telefone.trim() ||
      formData.telefone.replace(/\D/g, "").length < 10
    )
      newErrors.telefone = "Telefone inválido";
    if (
      !formData.cnpj.trim() ||
      formData.cnpj.replace(/\D/g, "").length !== 14
    )
      newErrors.cnpj = "CNPJ inválido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          nome: "",
          responsavel: "",
          email: "",
          telefone: "",
          cnpj: "",
          site: "",
        });
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section id="empresa-amiga" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-green-50 rounded-3xl p-8 sm:p-12 border border-green-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Mensagem enviada com sucesso!
            </h3>
            <p className="text-gray-600 mb-6">
              Agradecemos seu interesse em se tornar uma Empresa Amiga da Pessoa
              Idosa. Entraremos em contato em breve.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              Enviar outra mensagem
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="empresa-amiga" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Parceria
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Deseja ser uma{" "}
            <span className="gradient-text">empresa amiga</span> da pessoa
            idosa?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">
            Fale conosco
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 space-y-5"
          >
            {/* Nome da empresa */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Nome da Empresa *
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nome da empresa"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors text-gray-900 bg-white ${
                    errors.nome
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-primary"
                  }`}
                />
              </div>
              {errors.nome && (
                <p className="text-red-500 text-xs mt-1">{errors.nome}</p>
              )}
            </div>

            {/* Responsável */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Responsável *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nome do responsável"
                  value={formData.responsavel}
                  onChange={(e) =>
                    setFormData({ ...formData, responsavel: e.target.value })
                  }
                  className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors text-gray-900 bg-white ${
                    errors.responsavel
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-primary"
                  }`}
                />
              </div>
              {errors.responsavel && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.responsavel}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                E-mail *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="empresa@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors text-gray-900 bg-white ${
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

            {/* Telefone e CNPJ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Telefone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="(24) 99999-9999"
                    value={formData.telefone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        telefone: formatPhone(e.target.value),
                      })
                    }
                    className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors text-gray-900 bg-white ${
                      errors.telefone
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-primary"
                    }`}
                  />
                </div>
                {errors.telefone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.telefone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  CNPJ *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="00.000.000/0000-00"
                    value={formData.cnpj}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cnpj: formatCNPJ(e.target.value),
                      })
                    }
                    className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors text-gray-900 bg-white ${
                      errors.cnpj
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-primary"
                    }`}
                  />
                </div>
                {errors.cnpj && (
                  <p className="text-red-500 text-xs mt-1">{errors.cnpj}</p>
                )}
              </div>
            </div>

            {/* Site ou Rede Social */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Site ou Rede Social{" "}
                <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="https://www.suaempresa.com.br"
                  value={formData.site}
                  onChange={(e) =>
                    setFormData({ ...formData, site: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 focus:border-primary rounded-xl focus:outline-none transition-colors text-gray-900 bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
