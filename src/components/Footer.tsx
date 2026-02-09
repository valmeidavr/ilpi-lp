"use client";

import { Heart, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contato" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <span className="text-lg font-bold">ILPI</span>
                <p className="text-[10px] text-gray-400 leading-tight">
                  Instituição de Longa Permanência
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Instituição de Longa Permanência para Idosos João Miguel da Silva
              — desde 1971 cuidando com amor.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>
                  Rua Epitácio Pessoa, nº 154, Dom Bosco,
                  <br />
                  Volta Redonda – Rio de Janeiro
                </span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                <a href="tel:+552433385056" className="hover:text-white transition-colors">
                  (24) 3338-5056
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0 text-primary" />
                <a href="mailto:contato@ilpi.org.br" className="hover:text-white transition-colors">
                  contato@ilpi.org.br
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#sobre"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Sobre Nós
                </a>
              </li>
              <li>
                <a
                  href="#impacto"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Nosso Impacto
                </a>
              </li>
              <li>
                <a
                  href="#doar"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Fazer Doação
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send/?phone=552421021901&text=Ol%C3%A1%2C+gostaria+de+me+associar%21&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-bold text-lg mb-4">Ajude Agora</h4>
            <p className="text-gray-400 text-sm mb-4">
              Sua doação transforma vidas. Não importa o valor, o que importa é
              o amor.
            </p>
            <a
              href="#doar"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
            >
              <Heart className="w-4 h-4" />
              Doe Agora
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ILPI — Instituição de Longa
            Permanência para Idosos João Miguel da Silva. Todos os direitos
            reservados.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Instituição sem fins lucrativos — CNPJ: 00.000.000/0001-00
          </p>
        </div>
      </div>
    </footer>
  );
}
