"use client";

import { Heart } from "lucide-react";

export default function Impact() {
  return (
    <section
      id="impacto"
      className="py-16 sm:py-20 lg:py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Por que doar?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Sua doação{" "}
            <span className="gradient-text">faz a diferença</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">
            Cada centavo é investido diretamente no cuidado e bem-estar dos
            nossos idosos. Sua contribuição mantém vivo o sonho de uma velhice digna.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              Imagine se cada pessoa doasse apenas R$ 20,00
            </h3>
            <p className="text-white/80 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
              Com apenas o valor de um café por dia, você garante que um idoso
              tenha medicamento, comida e carinho. Não espere para fazer a
              diferença.
            </p>
            <a
              href="#doar"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-2xl"
            >
              <Heart className="w-5 h-5" />
              Fazer Minha Doação
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
