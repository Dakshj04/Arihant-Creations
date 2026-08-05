import type { WithContext, LocalBusiness, FAQPage, Product } from "schema-dts";
import { BUSINESS, FAQ_ITEMS, PRODUCTS } from "./constants";

export function generateLocalBusinessSchema(): WithContext<LocalBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    description: `${BUSINESS.name} — Premium aluminium windows and doors manufacturer and installer in India. Custom designs, professional installation, and lasting performance.`,
    url: "https://arihantcreations.com", // TODO: Real domain
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.pincode,
      addressCountry: BUSINESS.address.country,
    },
    openingHours: "Mo-Sa 09:00-19:00",
    priceRange: "₹₹₹",
    image: "https://arihantcreations.com/og-image.jpg", // TODO: Real OG image URL
    sameAs: [
      BUSINESS.socialLinks.instagram,
      BUSINESS.socialLinks.facebook,
      BUSINESS.socialLinks.youtube,
    ],
  };
}

export function generateFAQSchema(): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question" as const,
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: item.answer,
      },
    })),
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  id: string;
}): WithContext<Product> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: BUSINESS.name,
    },
    url: `https://arihantcreations.com/products#${product.id}`, // TODO: Real domain
  };
}
