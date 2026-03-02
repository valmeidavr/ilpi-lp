"use client";

import { Heart, Shield, Lock, Users } from "lucide-react";
import DonationForm from "./DonationForm";

interface DonationSectionProps {
  content?: Record<string, string>;
}

export default function DonationSection({ content }: DonationSectionProps) {
  const title = content?.donation_title || "Doe agora e transforme vidas";
  const subtitle = content?.donation_subtitle || "Sua contribuição é essencial para manter o funcionamento da ILPI. Escolha o valor, preencha seus dados e ajude nossos idosos.";

  return (
    <section
      id="doar"
      className="py-16 sm:py-20 lg:py-24"
      style={{
        background:
          "linear-gradient(135deg, #f1ecce 0%, #f1ecce 50%, #f1ecce 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Faça sua doação
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">
            {subtitle}
          </p>

          {/* Social proof */}
          <div className="mt-6 inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-primary/10">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border-2 border-white">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center border-2 border-white text-xs font-bold text-accent">
                +
              </div>
            </div>
            <p className="text-sm text-gray-600">
              <strong className="text-primary">127 pessoas</strong> já doaram
              este mês
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-gray-100">
            <DonationForm />
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary/60" />
              <span className="text-sm">Doação segura</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary/60" />
              <span className="text-sm">Dados protegidos</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary/60" />
              <span className="text-sm">100% para os idosos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
