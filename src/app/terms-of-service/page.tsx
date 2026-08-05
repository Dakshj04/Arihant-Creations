import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${BUSINESS.name}. Terms governing the use of our website and services.`,
};

export default function TermsOfServicePage() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container-custom max-w-3xl">
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-anthracite mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-gray max-w-none text-medium-gray text-sm leading-relaxed space-y-6">
          <p className="text-base text-charcoal">
            Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
          </p>

          <p>
            Welcome to {BUSINESS.name}. By accessing or using our website, you
            agree to be bound by these Terms of Service. Please read them
            carefully.
          </p>

          <h2 className="font-heading font-semibold text-xl text-anthracite mt-8 mb-3">
            1. Services
          </h2>
          <p>
            {BUSINESS.name} provides aluminium windows, doors, glass railings,
            ACP cladding, and related installation services. Quotations provided
            through our website are estimates and may vary based on site
            conditions, measurements, and material availability.
          </p>

          <h2 className="font-heading font-semibold text-xl text-anthracite mt-8 mb-3">
            2. Quotations & Pricing
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              All quotations are valid for 15 days from the date of issue unless
              otherwise stated.
            </li>
            <li>
              Prices are subject to change based on material costs and market
              conditions.
            </li>
            <li>
              Final pricing is confirmed only upon acceptance of a formal
              quotation and order confirmation.
            </li>
            <li>Applicable GST will be charged as per prevailing rates.</li>
          </ul>

          <h2 className="font-heading font-semibold text-xl text-anthracite mt-8 mb-3">
            3. Orders & Payment
          </h2>
          <p>
            Orders are confirmed upon receipt of an advance payment as specified
            in the quotation. Payment terms, including installment schedules, will
            be detailed in the formal quotation document.
          </p>

          <h2 className="font-heading font-semibold text-xl text-anthracite mt-8 mb-3">
            4. Installation & Timelines
          </h2>
          <p>
            We strive to complete installations within the timeline communicated
            during the order confirmation. However, timelines may be affected by
            site readiness, weather conditions, or unforeseen circumstances. We
            will communicate any delays promptly.
          </p>

          <h2 className="font-heading font-semibold text-xl text-anthracite mt-8 mb-3">
            5. Warranty
          </h2>
          <p>
            Our products come with a warranty against manufacturing defects.
            Specific warranty terms and duration vary by product category and will
            be provided at the time of purchase. The warranty does not cover
            damage caused by misuse, accidents, or unauthorized modifications.
          </p>

          <h2 className="font-heading font-semibold text-xl text-anthracite mt-8 mb-3">
            6. Intellectual Property
          </h2>
          <p>
            All content on this website — including text, images, logos, and
            design — is the property of {BUSINESS.name} and is protected by
            applicable intellectual property laws. You may not reproduce,
            distribute, or use any content without our prior written consent.
          </p>

          <h2 className="font-heading font-semibold text-xl text-anthracite mt-8 mb-3">
            7. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by law, {BUSINESS.name} shall not be
            liable for any indirect, incidental, or consequential damages arising
            from the use of our website or services.
          </p>

          <h2 className="font-heading font-semibold text-xl text-anthracite mt-8 mb-3">
            8. Governing Law
          </h2>
          <p>
            These terms are governed by the laws of India. Any disputes shall be
            subject to the exclusive jurisdiction of the courts in{" "}
            {BUSINESS.address.city}, {BUSINESS.address.state}.
          </p>

          <h2 className="font-heading font-semibold text-xl text-anthracite mt-8 mb-3">
            9. Contact
          </h2>
          <p>For any questions regarding these terms, please contact us:</p>
          <ul className="list-none space-y-1">
            <li>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${BUSINESS.email}`} className="text-accent hover:underline">
                {BUSINESS.email}
              </a>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <a href={`tel:${BUSINESS.phone}`} className="text-accent hover:underline">
                {BUSINESS.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
