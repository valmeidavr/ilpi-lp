"use client";

import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "Minha mãe mora na ILPI há 3 anos e posso dizer que ela nunca foi tão bem cuidada. Os profissionais são dedicados e amorosos. Fico em paz sabendo que ela está em boas mãos.",
    name: "Maria Aparecida S.",
    relation: "Filha de moradora",
  },
  {
    text: "Doe para a ILPI! Eu conheço o trabalho de perto e posso garantir que cada centavo é utilizado com responsabilidade e amor. Os idosos são tratados como família.",
    name: "Carlos Eduardo M.",
    relation: "Voluntário",
  },
  {
    text: "Visitar a ILPI mudou minha perspectiva sobre o cuidado com idosos. O carinho da equipe, a estrutura e o respeito com que cada morador é tratado é emocionante.",
    name: "Ana Paula R.",
    relation: "Doadora mensal",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Quem conhece,{" "}
            <span className="gradient-text">recomenda</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 hover:shadow-lg transition-all"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-gray-600 leading-relaxed mb-6 text-base">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {testimonial.relation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
