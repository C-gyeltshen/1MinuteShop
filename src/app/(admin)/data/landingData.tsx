import {
  Store,
  Zap,
  Palette,
  CreditCard,
  BarChart3,
  Globe,
  Smartphone,
  Clock,
  Sparkles,
} from "lucide-react";
import { SplashMessage, Feature, Testimonial, Step } from "../types";

export const splashMessages: SplashMessage[] = [
  {
    text: "Building your digital empire...",
    icon: <Store className="w-8 h-8" />,
  },
  {
    text: "Crafting beautiful storefronts...",
    icon: <Palette className="w-8 h-8" />,
  },
  {
    text: "Powering up your sales engine...",
    icon: <Zap className="w-8 h-8" />,
  },
  { text: "Welcome to 1MinuteShop!", icon: <Sparkles className="w-8 h-8" /> },
];

export const features: Feature[] = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "1-Minute Setup",
    description: "Launch your store faster than making coffee",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Drag & Drop Builder",
    description: "Design like a pro without any coding",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Secure Payments",
    description: "Accept payments from day one",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile Optimized",
    description: "Perfect on every device",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Analytics Dashboard",
    description: "Track your success in real-time",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Reach",
    description: "Sell worldwide from day one",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    business: "Artisan Jewelry",
    quote: "From idea to first sale in under 10 minutes!",
    revenue: "$50K in first month",
  },
  {
    name: "Mike Rodriguez",
    business: "Tech Gadgets",
    quote: "The easiest way to start selling online. Period.",
    revenue: "$25K weekly sales",
  },
  {
    name: "Emma Thompson",
    business: "Handmade Crafts",
    quote: "Finally, a platform that just works!",
    revenue: "200% growth",
  },
];

export const steps: Step[] = [
  {
    number: "01",
    title: "Choose Template",
    description: "Pick from 100+ stunning designs",
  },
  {
    number: "02",
    title: "Customize Everything",
    description: "Drag, drop, and make it yours",
  },
  {
    number: "03",
    title: "Go Live",
    description: "Launch and start selling immediately",
  },
];