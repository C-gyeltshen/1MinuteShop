import {
  Star,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";export default function TrustBadgeSection() {
  const badges = [
    { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
    { icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
    { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
    { icon: Star, title: "Quality Guaranteed", desc: "Premium products only" },
  ];

  return (
    <section className="py-6 sm:py-8 md:py-12 bg-gray-50 border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {badges.map((badge, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="text-2xl sm:text-3xl text-blue-600 mb-2 sm:mb-3">
                <badge.icon />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {badge.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}