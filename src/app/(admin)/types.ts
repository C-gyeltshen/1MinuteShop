// Landing page type definitions

export interface SplashMessage {
  text: string;
  icon: React.ReactNode;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  business: string;
  quote: string;
  revenue: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}