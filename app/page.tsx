import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero";
import { LazyOnView } from "@/components/ui/lazy-on-view";

// Below-the-fold sections — each becomes its own JS chunk that only loads
// when its <LazyOnView> placeholder approaches the viewport.
const BenefitsSection = dynamic(() =>
  import("@/components/sections/benefits").then((m) => m.BenefitsSection)
);
const ServicesSection = dynamic(() =>
  import("@/components/sections/services").then((m) => m.ServicesSection)
);
const ProcessSection = dynamic(() =>
  import("@/components/sections/process").then((m) => m.ProcessSection)
);
const ContactSection = dynamic(() =>
  import("@/components/sections/contact").then((m) => m.ContactSection)
);
const CTAFinalSection = dynamic(() =>
  import("@/components/sections/cta-final").then((m) => m.CTAFinalSection)
);
const FooterSection = dynamic(() =>
  import("@/components/sections/footer").then((m) => m.FooterSection)
);

export default function HomePage() {
  return (
    <main className="relative bg-bg-deep text-white selection:bg-accent-blue/40">
      <Navbar />
      <HeroSection />
      <LazyOnView minHeight={800}>
        <BenefitsSection />
      </LazyOnView>
      <LazyOnView minHeight={900}>
        <ServicesSection />
      </LazyOnView>
      <LazyOnView minHeight={900}>
        <ProcessSection />
      </LazyOnView>
      <LazyOnView minHeight={900}>
        <ContactSection />
      </LazyOnView>
      <LazyOnView minHeight={700}>
        <CTAFinalSection />
      </LazyOnView>
      <LazyOnView minHeight={280}>
        <FooterSection />
      </LazyOnView>
    </main>
  );
}
