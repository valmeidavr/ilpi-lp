import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Create default admin user (credenciais só usadas no seed inicial)
  const email = "admin@ilpi.org.br";
  const password = "admin123";
  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      name: "Administrador",
    },
  });
  console.log(`Admin user created: ${email}`);

  // 2. Seed SiteContent
  const contentEntries = [
    { key: "hero_title_line1", value: "Um gesto de amor" },
    { key: "hero_title_line2", value: "pode mudar" },
    { key: "hero_title_line3", value: "uma vida!" },
    {
      key: "hero_subtitle",
      value:
        "São 20 moradores que estão aguardando o seu gesto de amor. Ajude a manter esse ciclo de amor, DOE alimentos, medicamentos e itens de higiene pessoal. Seja Amigo da pessoa idosa.",
    },
    { key: "hero_btn_primary", value: "Quero Doar Agora" },
    { key: "hero_btn_secondary", value: "Conheça Nossa História" },
    {
      key: "about_section_title",
      value: "Mais de 50 anos compartilhando amor",
    },
    { key: "about_home_title", value: "Um verdadeiro lar" },
    {
      key: "about_home_text",
      value:
        "A ILPI João Miguel da Silva é uma instituição sem fins lucrativos dedicada ao acolhimento de pessoas idosas que necessitam de abrigo, conforto e cuidado. Mais do que oferecer um espaço seguro, a instituição se tornou um verdadeiro lar — um lugar onde cada história é respeitada, cada vida é valorizada e cada gesto de carinho faz a diferença. Hoje, abriga 20 moradores e conta com uma equipe multidisciplinar especializada, cuja missão é simples e profunda: compartilhar o amor.",
    },
    { key: "about_history_title", value: "Nossa trajetória" },
    {
      key: "about_history_text",
      value:
        "A trajetória da instituição começou em 1971, quando foi fundada com o nome Asilo da Sociedade São Vicente de Paulo, sendo carinhosamente conhecida pela comunidade como Asilo Dom Bosco. Ao longo de mais de cinco décadas, tornou-se símbolo de cuidado, respeito e solidariedade. Em 2012, foi rebatizada como Instituição de Longa Permanência João Miguel da Silva, em homenagem a um grande colaborador que, por meio de seu trabalho voluntário e generosidade, deixou um legado de dedicação e amor — valores que continuam vivos em cada detalhe da instituição.",
    },
    {
      key: "about_quote",
      value:
        "Envelhecer com dignidade é um direito. Compartilhar amor é a nossa missão.",
    },
    { key: "impact_title", value: "Sua doação faz a diferença" },
    {
      key: "impact_subtitle",
      value:
        "Cada centavo é investido diretamente no cuidado e bem-estar dos nossos idosos. Sua contribuição mantém vivo o sonho de uma velhice digna.",
    },
    {
      key: "impact_cta_title",
      value: "Imagine se cada pessoa doasse apenas R$ 20,00",
    },
    {
      key: "impact_cta_text",
      value:
        "Com apenas o valor de um café por dia, você garante que um idoso tenha medicamento, comida e carinho. Não espere para fazer a diferença.",
    },
    { key: "donation_title", value: "Doe agora e transforme vidas" },
    {
      key: "donation_subtitle",
      value:
        "Sua contribuição é essencial para manter o funcionamento da ILPI. Escolha o valor, preencha seus dados e ajude nossos idosos.",
    },
    {
      key: "footer_description",
      value:
        "Instituição de Longa Permanência para Idosos João Miguel da Silva — desde 1971 cuidando com amor.",
    },
    {
      key: "footer_address",
      value:
        "Rua Epitácio Pessoa, nº 154, Dom Bosco, Volta Redonda – Rio de Janeiro",
    },
    { key: "footer_phone", value: "(24) 3338-5056" },
    { key: "footer_email", value: "contato@ilpi.org.br" },
    { key: "whatsapp_number", value: "552421021901" },
    { key: "pix_key", value: "00.000.000/0001-00" },
  ];

  for (const entry of contentEntries) {
    await prisma.siteContent.upsert({
      where: { key: entry.key },
      update: { value: entry.value },
      create: entry,
    });
  }
  console.log(`${contentEntries.length} content entries seeded.`);

  // 3. Seed Gallery Images
  const galleryImages = [
    { src: "/galeria/atividade-moradores-01.jpg", alt: "Atividade com moradores", order: 1 },
    { src: "/galeria/atividade-moradores-02.jpg", alt: "Atividade com moradores", order: 2 },
    { src: "/galeria/atividade-moradores-03.jpg", alt: "Atividade com moradores", order: 3 },
    { src: "/galeria/atividade-moradores-04.jpg", alt: "Atividade com moradores", order: 4 },
    { src: "/galeria/arraia-solidario-01.jpg", alt: "Arraiá Solidário ILPI", order: 5 },
    { src: "/galeria/arraia-solidario-02.jpg", alt: "Arraiá Solidário ILPI", order: 6 },
    { src: "/galeria/arraia-solidario-03.jpg", alt: "Arraiá Solidário ILPI", order: 7 },
    { src: "/galeria/arraia-solidario-04.jpg", alt: "Arraiá Solidário ILPI", order: 8 },
    { src: "/galeria/dia-a-dia-01.jpg", alt: "Dia a dia na ILPI", order: 9 },
    { src: "/galeria/dia-a-dia-02.jpg", alt: "Dia a dia na ILPI", order: 10 },
    { src: "/galeria/dia-a-dia-03.jpg", alt: "Dia a dia na ILPI", order: 11 },
    { src: "/galeria/dia-a-dia-04.jpg", alt: "Dia a dia na ILPI", order: 12 },
    { src: "/galeria/evento-flor-de-maria-01.jpg", alt: "Evento Flor de Maria", order: 13 },
    { src: "/galeria/evento-flor-de-maria-02.jpg", alt: "Evento Flor de Maria", order: 14 },
    { src: "/galeria/evento-flor-de-maria-03.jpg", alt: "Evento Flor de Maria", order: 15 },
    { src: "/galeria/evento-flor-de-maria-04.jpg", alt: "Evento Flor de Maria", order: 16 },
  ];

  const existingCount = await prisma.galleryImage.count();
  if (existingCount === 0) {
    await prisma.galleryImage.createMany({ data: galleryImages });
    console.log(`${galleryImages.length} gallery images seeded.`);
  } else {
    console.log(`Gallery already has ${existingCount} images, skipping.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
