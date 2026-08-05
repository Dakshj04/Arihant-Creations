export interface NavLink {
  label: string;
  href: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  href: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  projectType: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WhyChooseCard {
  title: string;
  description: string;
  icon: string;
}

export interface QuoteFormData {
  name: string;
  phone: string;
  cityPincode: string;
  projectType: string;
  message?: string;
}
