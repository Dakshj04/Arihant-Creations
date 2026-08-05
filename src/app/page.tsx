import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import BrandStory from "@/components/sections/BrandStory";
import ProductShowcase from "@/components/sections/ProductShowcase";
import SignatureProjects from "@/components/sections/SignatureProjects";
import BeforeAfter from "@/components/sections/BeforeAfter";
import MaterialComparison from "@/components/sections/MaterialComparison";
import ConfiguratorSection from "@/components/sections/ConfiguratorSection";
import WhyChoose from "@/components/sections/WhyChoose";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";
import QuoteForm from "@/components/sections/QuoteForm";
import { generateFAQSchema } from "@/lib/schema";

export default function HomePage() {
  const faqSchema = generateFAQSchema();

  return (
    <>
      {/* FAQPage JSON-LD — Server-Rendered for Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <Hero />
      <TrustBar />
      <BrandStory />
      <ProductShowcase />
      <SignatureProjects />
      <BeforeAfter />
      <MaterialComparison />
      <ConfiguratorSection />
      <WhyChoose />
      <Testimonials />
      <FAQ />
      <QuoteForm />
      <CTASection />
    </>
  );
}
