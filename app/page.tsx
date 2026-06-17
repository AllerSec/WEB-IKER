import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero";
import { BenefitsSection } from "@/components/sections/benefits";
import { ServicesSection } from "@/components/sections/services";
import { ProcessSection } from "@/components/sections/process";
import { ContactSection } from "@/components/sections/contact";
import { CTAFinalSection } from "@/components/sections/cta-final";
import { FooterSection } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <main className="relative bg-bg-deep text-white selection:bg-accent-blue/40">
      <Navbar />
      <HeroSection />
      <BenefitsSection />
      <ServicesSection />
      <ProcessSection />
      <ContactSection />
      <CTAFinalSection />
      <FooterSection />
    </main>
  );
}
