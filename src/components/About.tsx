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

interface AboutProps {
  content?: Record<string, string>;
}

export default function About({ content }: AboutProps) {
  const sectionTitle = content?.about_section_title || "Mais de 50 anos compartilhando amor";
  const homeTitle = content?.about_home_title || "Um verdadeiro lar";
  const homeText = content?.about_home_text;
  const historyTitle = content?.about_history_title || "Nossa trajetória";
  const historyText = content?.about_history_text;
  const quote = content?.about_quote || "Envelhecer com dignidade é um direito. Compartilhar amor é a nossa missão.";

  return (
    <section id="sobre" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Nossa História
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {sectionTitle}
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left column - Story */}
          <div className="space-y-6">
            <div className="bg-warm-bg rounded-2xl p-6 sm:p-8 border border-warm-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {homeTitle}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                    {homeText || (
                      <>
                        A ILPI João Miguel da Silva é uma instituição sem fins
                        lucrativos dedicada ao acolhimento de pessoas idosas que
                        necessitam de abrigo, conforto e cuidado. Mais do que
                        oferecer um espaço seguro, a instituição se tornou um
                        verdadeiro lar — um lugar onde cada história é respeitada,
                        cada vida é valorizada e cada gesto de carinho faz a
                        diferença. Hoje, abriga{" "}
                        <strong className="text-gray-800">20 moradores</strong> e
                        conta com uma equipe multidisciplinar especializada, cuja
                        missão é simples e profunda:{" "}
                        <strong className="text-primary">compartilhar o amor</strong>.
                      </>
                    )}
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
                    {historyTitle}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                    {historyText || (
                      <>
                        A trajetória da instituição começou em{" "}
                        <strong className="text-gray-800">1971</strong>, quando foi
                        fundada com o nome Asilo da Sociedade São Vicente de Paulo,
                        sendo carinhosamente conhecida pela comunidade como Asilo Dom
                        Bosco. Ao longo de mais de cinco décadas, tornou-se símbolo
                        de cuidado, respeito e solidariedade. Em{" "}
                        <strong className="text-gray-800">2012</strong>, foi
                        rebatizada como{" "}
                        <strong className="text-gray-800">
                          Instituição de Longa Permanência João Miguel da Silva
                        </strong>
                        , em homenagem a um grande colaborador que, por meio de seu
                        trabalho voluntário e generosidade, deixou um legado de
                        dedicação e amor — valores que continuam vivos em cada
                        detalhe da instituição.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <blockquote className="border-l-4 border-primary pl-6 py-2">
              <p className="text-lg sm:text-xl italic text-gray-700 font-medium">
                &ldquo;{quote}&rdquo;
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
