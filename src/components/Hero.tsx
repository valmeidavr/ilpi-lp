"use client";

import { ArrowDown, HandHeart } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  content?: Record<string, string>;
}

export default function Hero({ content }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/HEADER_BG.webp"
        alt=""
        fill
        className="object-cover"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-34 lg:pt-40 pb-16 text-center lg:text-left">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-8 mt-8 sm:mt-12 animate-fade-in-up-delay-1">
            {content?.hero_title_line1 || "Um gesto de amor"}
            <br />
            {content?.hero_title_line2 || "pode"}{" "}
            <span className="text-orange-400">
              {content?.hero_title_line2 ? "" : "mudar"}
            </span>
            <br />
            <span className="text-orange-400">
              {content?.hero_title_line3 || "uma vida!"}
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed animate-fade-in-up-delay-2">
            {content?.hero_subtitle ||
              "São 20 moradores que estão aguardando o seu gesto de amor. Ajude a manter esse ciclo de amor, DOE alimentos, medicamentos e itens de higiene pessoal. Seja Amigo da pessoa idosa."}
          </p>

          <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-4 animate-fade-in-up-delay-3">
            <a
              href="#doar"
              className="group bg-accent hover:bg-accent-light text-white px-6 py-2.5 sm:px-10 sm:py-4 rounded-full font-bold text-sm sm:text-lg transition-all hover:scale-105 shadow-2xl shadow-orange-500/30 flex items-center gap-2 sm:gap-3 justify-center"
            >
              <HandHeart className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
              {content?.hero_btn_primary || "Quero Doar Agora"}
            </a>
            <a
              href="#sobre"
              className="text-white bg-white/15 hover:bg-white/25 px-6 py-2.5 sm:px-10 sm:py-4 rounded-full font-semibold text-sm sm:text-lg transition-all backdrop-blur-sm text-center"
            >
              {content?.hero_btn_secondary || "Conheça Nossa História"}
            </a>
          </div>

          <div className="mt-10 sm:mt-14 animate-float">
            <a
              href="#sobre"
              aria-label="Rolar para baixo"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ArrowDown className="w-5 h-5 text-white/70" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
