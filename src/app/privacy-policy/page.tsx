import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${BUSINESS.name}. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container-custom max-w-3xl">
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-anthracite mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-gray max-w-none text-medium-gray text-sm leading-relaxed space-y-6">
          <p className="text-base text-charcoal">
            Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
          </p>

          <p>
            {BUSINESS.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed
            to protecting your privacy. This Privacy Policy explains how we
            collect, use, and safeguard your personal information when you visit
            our website or use our services.
          </p>

          <h2 className="font-heading font-semibold text-xl text-anthracite mt-8 mb-3">
            1. Information We Collect
          </h2>
          <p>When you submit a quotation request through our website, we collect:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Full name</li>
            <li>Phone number</li>
            <li>City and/or pincode</li>
            <li>Project type (residential, commercial, renovation)</li>
            <li>Any additional message you provide</li>
          </ul>
          <p>
            We may also automatically collect basic technical data such as your IP
            address, browser type, and device information for website analytics
            and security purposes.
          </p>

          <h2 className="font-heading font-semibold text-xl text-anthracite mt-8 mb-3">
            2. How We Use Your Information
          </h2>
          <p>We use the information you provide to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Respond to your quotation request</li>
            <li>Schedule site visits and consultations</li>
            <li>Communicate about your project</li>
            <li>Improve our products and services</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p>
            We do <strong>not</strong> sell, rent, or share your personal
            information with third parties for marketing purposes.
          </p>

          <h2 className="font-heading font-semibold text-xl text-anthracite mt-8 mb-3">
            3. Data Protection (DPDP Act 2023)
          </h2>
          <p>
            In accordance with India&apos;s Digital Personal Data Protection Act,
            2023, you have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access your personal data we hold</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your personal data</li>
            <li>Withdraw consent for data processing</li>
            <li>Nominate a person to exercise your rights</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the details
            below.
          </p>

          <h2 className="font-heading font-semibold text-xl text-anthracite mt-8 mb-3">
            4. Data Retention
          </h2>
          <p>
            We retain your personal information only for as long as necessary to
            fulfill the purposes outlined in this policy or as required by law.
            Quotation request data is typically retained for up to 2 years.
          </p>

          <h2 className="font-heading font-semibold text-xl text-anthracite mt-8 mb-3">
            5. Security
          </h2>
          <p>
            We implement reasonable technical and organizational measures to
            protect your personal data against unauthorized access, alteration,
            or destruction. However, no method of internet transmission is 100%
            secure.
          </p>

          <h2 className="font-heading font-semibold text-xl text-anthracite mt-8 mb-3">
            6. Cookies & Analytics
          </h2>
          <p>
            Our website may use cookies and analytics tools (such as Google
            Analytics) to understand visitor behavior and improve our site. You
            can disable cookies through your browser settings.
          </p>

          <h2 className="font-heading font-semibold text-xl text-anthracite mt-8 mb-3">
            7. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy or wish to
            exercise your data protection rights, please contact us:
          </p>
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

          <h2 className="font-heading font-semibold text-xl text-anthracite mt-8 mb-3">
            8. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. The updated
            version will be posted on this page with a revised &ldquo;last updated&rdquo;
            date. We encourage you to review this policy periodically.
          </p>
        </div>
      </div>
    </div>
  );
}
