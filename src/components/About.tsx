"use client";

import {
  Heart,
  Users,
  Stethoscope,
  Brain,
  HandHeart,
  Utensils,
  ShieldCheck,
  Activity,
} from "lucide-react";

const professionals = [
  { icon: Brain, label: "Psicólogos" },
  { icon: Activity, label: "Fisioterapeutas" },
  { icon: HandHeart, label: "Assistente Social" },
  { icon: Stethoscope, label: "Médicos" },
  { icon: Utensils, label: "Nutricionistas" },
  { icon: ShieldCheck, label: "Enfermeiros" },
  { icon: Users, label: "Cuidadores" },
];

export default function About() {
  return (
    <section id="sobre" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Nossa História
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Mais de 50 anos{" "}
            <span className="gradient-text">distribuindo amor</span>
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left column - Story */}
          <div className="space-y-6">
            <div className="bg-warm-bg rounded-2xl p-6 sm:p-8 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Uma missão de amor
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                    A ILPI é uma instituição sem fins lucrativos, que atende
                    idosos que estejam precisando de abrigo e de cuidados. Com{" "}
                    <strong className="text-gray-800">20 moradores</strong> e um
                    quadro de funcionários especializados, a ILPI tem uma única
                    proposta:{" "}
                    <strong className="text-primary">distribuir amor</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Nossa trajetória
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                    A entidade surgiu em{" "}
                    <strong className="text-gray-800">1971</strong>, com o nome
                    Asilo da Sociedade São Vicente de Paulo (SSVP), mais
                    conhecido como Asilo Dom Bosco. Por 40 anos, mantiveram sua
                    obra e, em <strong className="text-gray-800">2012</strong>,
                    o asilo – agora rebatizado de{" "}
                    <strong className="text-gray-800">
                      Instituição de Longa Permanência para Idosos João Miguel
                      da Silva
                    </strong>{" "}
                    – recebeu o apoio da AAP-VR.
                  </p>
                </div>
              </div>
            </div>

            <blockquote className="border-l-4 border-primary pl-6 py-2">
              <p className="text-lg sm:text-xl italic text-gray-700 font-medium">
                &ldquo;Envelhecer com dignidade é um direito. Garantir isso é o
                nosso dever e a nossa alegria.&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Right column - Image + Team */}
          <div className="space-y-8">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.aapvr.org.br/wp-content/uploads/2022/05/instituto_longa_permanencia.png"
                alt="Idosos da instituição"
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>
            <div className="bg-gradient-to-br from-secondary to-primary rounded-3xl p-6 sm:p-8 lg:p-10 text-white">
              <h3 className="text-2xl font-bold mb-2">
                Equipe Especializada
              </h3>
              <p className="text-white/70 mb-8">
                Profissionais dedicados ao bem-estar dos nossos idosos
              </p>

              <div className="grid grid-cols-2 gap-4">
                {professionals.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-orange-300 flex-shrink-0" />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Cuidado 24 horas</p>
                    <p className="text-white/60 text-sm">
                      Assistência integral e humanizada
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
