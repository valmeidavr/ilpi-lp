"use client";

import { ArrowDown, HandHeart } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(170deg, #15447d 0%, #1a5298 40%, #1e5faa 65%, #15447d 100%)",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-34 lg:pt-40 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-8 animate-fade-in-up-delay-1">
              Um gesto de carinho
              <br />
              pode <span className="text-orange-400">transformar</span>
              <br />
              <span className="text-orange-400">a vida</span> de um idoso
            </h1>

            <p className="text-sm sm:text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed animate-fade-in-up-delay-2">
              São <strong className="text-white">20 idosos</strong> que dependem da
              sua generosidade para ter um lar, alimentação, medicamentos e o
              carinho que merecem. <strong className="text-white">Doe agora</strong>{" "}
              e faça parte dessa corrente do bem.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 animate-fade-in-up-delay-3">
              <a
                href="#doar"
                className="group bg-accent hover:bg-accent-light text-white px-6 py-2.5 sm:px-10 sm:py-4 rounded-full font-bold text-sm sm:text-lg transition-all hover:scale-105 shadow-2xl shadow-orange-500/30 flex items-center gap-2 sm:gap-3 justify-center"
              >
                <HandHeart className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                Quero Doar Agora
              </a>
              <a
                href="#sobre"
                className="text-white bg-white/15 hover:bg-white/25 px-6 py-2.5 sm:px-10 sm:py-4 rounded-full font-semibold text-sm sm:text-lg transition-all backdrop-blur-sm text-center"
              >
                Conheça Nossa História
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="flex-shrink-0 animate-fade-in-up-delay-2">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.aapvr.org.br/wp-content/uploads/2022/05/instituto_longa_permanencia.png"
                alt="Idoso sorrindo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-14 animate-float text-center">
          <a
            href="#sobre"
            aria-label="Rolar para baixo"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowDown className="w-5 h-5 text-white/70" />
          </a>
        </div>
      </div>
    </section>
  );
}
