"use client";

import { Heart, Shield, Lock } from "lucide-react";
import DonationForm from "./DonationForm";

export default function DonationSection() {
  return (
    <section id="doar" className="py-16 sm:py-20 lg:py-24 donation-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Faça sua doação
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Doe agora e{" "}
            <span className="gradient-text">transforme vidas</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">
            Sua contribuição é essencial para manter o funcionamento da ILPI.
            Escolha o valor, preencha seus dados e ajude nossos idosos.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-gray-100">
            <DonationForm />
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Doação segura</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <span className="text-sm">Dados protegidos</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span className="text-sm">100% para os idosos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
