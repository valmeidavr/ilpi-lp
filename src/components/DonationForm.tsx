"use client";

import { useState, useCallback } from "react";
import {
  Heart,
  User,
  Mail,
  Phone,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Check,
  Copy,
  QrCode,
  FileText,
  Sparkles,
} from "lucide-react";

interface DonorData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

const PRESET_AMOUNTS = [20, 50, 100, 200, 500];

const PIX_KEY = "00.000.000/0001-00"; // Substituir pela chave PIX real da ILPI

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

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function DonationForm() {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "boleto">("pix");
  const [donorData, setDonorData] = useState<DonorData>({
    name: "",
    email: "",
    phone: "",
    cpf: "",
  });
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Partial<DonorData>>({});

  const finalAmount = isCustom ? parseFloat(customAmount) || 0 : amount;

  const validateStep2 = useCallback(() => {
    const newErrors: Partial<DonorData> = {};
    if (!donorData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!donorData.email.trim() || !/\S+@\S+\.\S+/.test(donorData.email))
      newErrors.email = "E-mail inválido";
    if (!donorData.phone.trim() || donorData.phone.replace(/\D/g, "").length < 10)
      newErrors.phone = "Telefone inválido";
    if (!donorData.cpf.trim() || donorData.cpf.replace(/\D/g, "").length !== 11)
      newErrors.cpf = "CPF inválido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [donorData]);

  const handleNext = () => {
    if (step === 1 && finalAmount < 1) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => Math.min(s + 1, 5));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleCopyPix = async () => {
    const pixCode = `00020126330014BR.GOV.BCB.PIX0111${PIX_KEY}5204000053039865404${finalAmount.toFixed(2)}5802BR5925ILPI JOAO MIGUEL DA SILVA6015VOLTA REDONDA62070503***6304`;
    await navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const stepLabels = [
    "Valor",
    "Seus Dados",
    "Pagamento",
    "Confirmação",
    "Obrigado",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      {step < 5 && (
        <div className="mb-8">
          <div className="flex justify-between mb-3">
            {stepLabels.slice(0, 4).map((label, i) => (
              <div
                key={label}
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-colors ${
                  i + 1 <= step ? "text-primary" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i + 1 < step
                      ? "bg-green-500 text-white"
                      : i + 1 === step
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i + 1 < step ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span className="hidden sm:inline">{label}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step 1: Choose Amount */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Escolha o valor da sua doação
            </h3>
            <p className="text-gray-500">
              Qualquer valor faz a diferença na vida dos nossos idosos
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {PRESET_AMOUNTS.map((val) => (
              <button
                key={val}
                onClick={() => {
                  setAmount(val);
                  setIsCustom(false);
                }}
                className={`py-3 sm:py-4 px-2 rounded-xl font-bold text-base sm:text-lg transition-all border-2 ${
                  !isCustom && amount === val
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-105"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                R$ {val}
              </button>
            ))}
          </div>

          <div>
            <button
              onClick={() => setIsCustom(true)}
              className={`w-full py-3 rounded-xl font-semibold transition-all border-2 mb-3 ${
                isCustom
                  ? "bg-primary/5 text-primary border-primary"
                  : "bg-white text-gray-500 border-gray-200 hover:border-primary/50"
              }`}
            >
              Outro valor
            </button>
            {isCustom && (
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">
                  R$
                </span>
                <input
                  type="number"
                  min="1"
                  placeholder="0,00"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 border-2 border-primary/30 rounded-xl text-2xl font-bold text-gray-900 focus:outline-none focus:border-primary transition-colors"
                  autoFocus
                />
              </div>
            )}
          </div>

          {finalAmount >= 1 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <p className="text-green-700 text-sm">
                Com{" "}
                <strong className="text-green-800">
                  {formatCurrency(finalAmount)}
                </strong>
                , você ajuda a garantir{" "}
                {finalAmount >= 200
                  ? "medicamentos e alimentação para os idosos por vários dias"
                  : finalAmount >= 100
                    ? "refeições nutritivas por uma semana"
                    : finalAmount >= 50
                      ? "materiais de higiene essenciais"
                      : "um dia de cuidado com carinho"}
                .
              </p>
            </div>
          )}

          <button
            onClick={handleNext}
            disabled={finalAmount < 1}
            className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Step 2: Personal Data */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Seus dados
            </h3>
            <p className="text-gray-500">
              Precisamos de algumas informações para gerar sua doação
            </p>
          </div>

          <div className="space-y-4">
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
                  className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors text-gray-900 ${
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
                  className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors text-gray-900 ${
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
                    className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors text-gray-900 ${
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
                    className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors text-gray-900 ${
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
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
            <button
              onClick={handleNext}
              className="flex-[2] bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Payment Method */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Forma de pagamento
            </h3>
            <p className="text-gray-500">
              Escolha como deseja realizar sua doação de{" "}
              <strong className="text-primary">
                {formatCurrency(finalAmount)}
              </strong>
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod("pix")}
              className={`w-full p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                paymentMethod === "pix"
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 hover:border-primary/30 bg-white"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  paymentMethod === "pix" ? "bg-primary" : "bg-gray-100"
                }`}
              >
                <QrCode
                  className={`w-6 h-6 ${paymentMethod === "pix" ? "text-white" : "text-gray-500"}`}
                />
              </div>
              <div className="text-left flex-1">
                <p className="font-bold text-gray-900 text-lg">PIX</p>
                <p className="text-gray-500 text-sm">
                  Pagamento instantâneo via QR Code ou código
                </p>
              </div>
              {paymentMethod === "pix" && (
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>

            <button
              onClick={() => setPaymentMethod("boleto")}
              className={`w-full p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                paymentMethod === "boleto"
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 hover:border-primary/30 bg-white"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  paymentMethod === "boleto" ? "bg-primary" : "bg-gray-100"
                }`}
              >
                <FileText
                  className={`w-6 h-6 ${paymentMethod === "boleto" ? "text-white" : "text-gray-500"}`}
                />
              </div>
              <div className="text-left flex-1">
                <p className="font-bold text-gray-900 text-lg">Boleto Bancário</p>
                <p className="text-gray-500 text-sm">
                  Pague em qualquer banco ou lotérica
                </p>
              </div>
              {paymentMethod === "boleto" && (
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          </div>

          {/* Order summary */}
          <div className="bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">
              Resumo da doação
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Doador</span>
                <span className="font-medium text-gray-900">
                  {donorData.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">E-mail</span>
                <span className="font-medium text-gray-900">
                  {donorData.email}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                <span className="text-gray-700 font-semibold">
                  Valor da doação
                </span>
                <span className="font-bold text-primary text-lg">
                  {formatCurrency(finalAmount)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
            <button
              onClick={handleNext}
              className="flex-[2] bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              Gerar Pagamento
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Payment */}
      {step === 4 && (
        <div className="space-y-6">
          {paymentMethod === "pix" ? (
            <>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Pague via PIX
                </h3>
                <p className="text-gray-500">
                  Escaneie o QR Code ou copie o código PIX abaixo
                </p>
              </div>

              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-8 text-center">
                {/* QR Code placeholder */}
                <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-6 border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm font-medium">
                      QR Code PIX
                    </p>
                    <p className="text-gray-400 text-xs">
                      {formatCurrency(finalAmount)}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-3">
                  Ou copie o código PIX:
                </p>
                <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2 border border-gray-200">
                  <code className="flex-1 text-xs text-gray-600 break-all text-left">
                    00020126330014BR.GOV.BCB.PIX0111{PIX_KEY}...
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
                        Copiar
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-800 text-sm text-center">
                  <strong>Importante:</strong> O PIX tem validade de 30 minutos.
                  Após o pagamento, clique no botão abaixo para confirmar.
                </p>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
              >
                <Check className="w-5 h-5" />
                Já Fiz o Pagamento
              </button>
            </>
          ) : (
            <>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Boleto Bancário
                </h3>
                <p className="text-gray-500">
                  Seu boleto foi gerado com sucesso
                </p>
              </div>

              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-8 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-10 h-10 text-primary" />
                </div>
                <p className="text-gray-900 font-bold text-xl mb-2">
                  {formatCurrency(finalAmount)}
                </p>
                <p className="text-gray-500 text-sm mb-6">
                  Vencimento: 3 dias úteis
                </p>

                <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-2 border border-gray-200 mb-4">
                  <code className="flex-1 text-xs text-gray-600 break-all text-left">
                    23793.38128 60000.000003 00000.000409 1 84340000{(finalAmount * 100).toFixed(0).padStart(8, "0")}
                  </code>
                  <button
                    onClick={async () => {
                      await navigator.clipboard.writeText(
                        `23793.38128 60000.000003 00000.000409 1 84340000${(finalAmount * 100).toFixed(0).padStart(8, "0")}`
                      );
                      setCopied(true);
                      setTimeout(() => setCopied(false), 3000);
                    }}
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
                        Copiar
                      </>
                    )}
                  </button>
                </div>

                <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-all inline-flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Baixar Boleto PDF
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-800 text-sm text-center">
                  <strong>Importante:</strong> O boleto pode levar até 3 dias
                  úteis para ser compensado.
                </p>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
              >
                <Check className="w-5 h-5" />
                Já Efetuei o Pagamento
              </button>
            </>
          )}

          <button
            onClick={handleBack}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
        </div>
      )}

      {/* Step 5: Thank You */}
      {step === 5 && (
        <div className="text-center space-y-6 py-4">
          <div className="animate-fade-in-up">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-gentle">
              <Heart className="w-12 h-12 text-green-600 fill-green-600" />
            </div>
            <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Doação Registrada!
            </div>
          </div>

          <div className="animate-fade-in-up-delay-1">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-3">
              Muito obrigado, {donorData.name.split(" ")[0]}!
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
              Sua doação de{" "}
              <strong className="text-primary">
                {formatCurrency(finalAmount)}
              </strong>{" "}
              vai fazer uma diferença enorme na vida dos nossos idosos. Você está
              ajudando a garantir que eles tenham uma velhice com dignidade,
              carinho e amor.
            </p>
          </div>

          <div className="animate-fade-in-up-delay-2 bg-warm-bg rounded-2xl p-6 border border-blue-100">
            <p className="text-gray-700 italic text-lg">
              &ldquo;Quem cuida de um idoso, cuida de uma história inteira de
              vida. Obrigado por fazer parte dessa história.&rdquo;
            </p>
            <p className="text-gray-500 text-sm mt-2">— Equipe ILPI</p>
          </div>

          <div className="animate-fade-in-up-delay-3 space-y-3">
            <p className="text-gray-500 text-sm">
              Enviamos um e-mail de confirmação para{" "}
              <strong>{donorData.email}</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setStep(1);
                  setDonorData({ name: "", email: "", phone: "", cpf: "" });
                  setAmount(50);
                  setCustomAmount("");
                  setIsCustom(false);
                }}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-all inline-flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Fazer Nova Doação
              </button>
              <a
                href="https://api.whatsapp.com/send/?phone=552421021901&text=Ol%C3%A1%2C+acabei+de+fazer+uma+doa%C3%A7%C3%A3o+para+a+ILPI!&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all inline-flex items-center justify-center gap-2"
              >
                Compartilhar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
