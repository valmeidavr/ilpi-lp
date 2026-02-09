"use client";

import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-primary">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-secondary">
                ILPI
              </span>
              <p className="text-[10px] leading-tight text-gray-500">
                Instituição de Longa Permanência
              </p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#sobre"
              className="relative text-gray-600 hover:text-primary transition-colors font-medium py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              Sobre Nós
            </a>
            <a
              href="#impacto"
              className="relative text-gray-600 hover:text-primary transition-colors font-medium py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              Nosso Impacto
            </a>
            <a
              href="#doar"
              className="relative text-gray-600 hover:text-primary transition-colors font-medium py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              Como Doar
            </a>
            <a
              href="#contato"
              className="relative text-gray-600 hover:text-primary transition-colors font-medium py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              Contato
            </a>
            <a
              href="#doar"
              className="bg-accent hover:bg-accent-light text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105 shadow-lg shadow-accent/30"
            >
              Doe Agora
            </a>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-white/20 shadow-lg">
          <nav className="flex flex-col px-4 py-4 gap-1">
            <a
              href="#sobre"
              className="text-gray-600 hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nós
            </a>
            <a
              href="#impacto"
              className="text-gray-600 hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Nosso Impacto
            </a>
            <a
              href="#doar"
              className="text-gray-600 hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Como Doar
            </a>
            <a
              href="#contato"
              className="text-gray-600 hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>
            <a
              href="#doar"
              className="bg-accent text-white px-6 py-3 rounded-full font-semibold text-center mt-2 shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Doe Agora
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
