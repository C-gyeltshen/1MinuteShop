import {
  Star,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";

export default function TrustBadgeSection() {
  const badges = [
    { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
    { icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
    { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
    { icon: Star, title: "Quality Guaranteed", desc: "Premium products only" },
  ];

  return (
    <section className="py-2 sm:py-8 md:py-12 border-y">
      <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Mobile: Horizontal scroll with button-style badges */}
        <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-3 min-w-max pb-2">
            {badges.map((badge, i) => (
              <button 
                key={i} 
                className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors flex-shrink-0 shadow-sm"
              >
                <badge.icon className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900 text-sm whitespace-nowrap">
                  {badge.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="text-3xl text-blue-600 mb-3">
                <badge.icon />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {badge.title}
              </h3>
              <p className="text-sm text-gray-600">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}