import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Impact from "@/components/Impact";
import DonationSection from "@/components/DonationSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Impact />
        <DonationSection />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
