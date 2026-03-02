import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Impact from "@/components/Impact";
import DonationSection from "@/components/DonationSection";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [contentRecords, galleryImages] = await Promise.all([
    prisma.siteContent.findMany(),
    prisma.galleryImage.findMany({
      where: { visible: true },
      orderBy: { order: "asc" },
    }),
  ]);

  const content = Object.fromEntries(
    contentRecords.map((c) => [c.key, c.value])
  );

  return (
    <>
      <Header />
      <main>
        <Hero content={content} />
        <About content={content} />
        <Gallery images={galleryImages} />
        <Impact content={content} />
        <DonationSection content={content} />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer content={content} />
      <WhatsAppButton />
    </>
  );
}
