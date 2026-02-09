"use client";

import { Heart, ArrowDown, HandHeart } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-28 lg:pt-32 pb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-8 animate-fade-in-up-delay-1">
          Um gesto de carinho
          <br />
          pode <span className="text-orange-400">transformar</span>
          <br />
          <span className="text-orange-400">a vida</span> de um idoso
        </h1>

        <p className="text-lg sm:text-xl text-blue-100/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up-delay-2">
          São <strong className="text-white">20 idosos</strong> que dependem da
          sua generosidade para ter um lar, alimentação, medicamentos e o
          carinho que merecem. <strong className="text-white">Doe agora</strong>{" "}
          e faça parte dessa corrente do bem.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up-delay-3">
          <a
            href="#doar"
            className="group bg-accent hover:bg-accent-light text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-2xl shadow-orange-500/30 flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            <HandHeart className="w-6 h-6 group-hover:scale-110 transition-transform" />
            Quero Doar Agora
          </a>
          <a
            href="#sobre"
            className="text-white/90 hover:text-white px-10 py-4 rounded-full font-semibold text-lg transition-all border-2 border-white/25 hover:border-white/50 hover:bg-white/5 w-full sm:w-auto text-center"
          >
            Conheça Nossa História
          </a>
        </div>

        <div className="mt-8 sm:mt-12 animate-float">
          <a href="#sobre" aria-label="Rolar para baixo">
            <ArrowDown className="w-7 h-7 text-white/40 mx-auto" />
          </a>
        </div>
      </div>
    </section>
  );
}
