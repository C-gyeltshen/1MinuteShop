import { motion } from "framer-motion";
import { 
  Clock, 
  CreditCard, 
  Globe, 
  Shield, 
  Users, 
  TrendingUp, 
  Zap, 
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "1-Minute Setup",
    description: "Launch your store faster than making coffee",
    highlight: "60 seconds",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Secure Payments",
    description: "Accept payments from day one with bank-level security",
    highlight: "256-bit SSL",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Reach",
    description: "Sell worldwide with multi-currency support",
    highlight: "180+ countries",
  },
];

const stats = [
  { number: "50K+", label: "Active Stores" },
  { number: "$2M+", label: "Revenue Generated" },
  { number: "99.9%", label: "Uptime" },
  { number: "4.9/5", label: "Customer Rating" },
];

const benefits = [
  "No coding required",
  "Free forever plan",
  "24/7 support included",
  "Mobile-optimized stores",
  "SEO-ready templates",
  "Analytics dashboard",
];

const testimonial = {
  quote: "I went from idea to first sale in under 10 minutes. This platform is a game-changer!",
  author: "Sarah Chen",
  business: "Artisan Jewelry",
  revenue: "$25K in first month",
  avatar: "SC"
};

export default function Left() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-12"
    >
      {/* Hero Section */}
      <div className="text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-sm font-medium text-indigo-700 mb-6"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Join 50,000+ successful entrepreneurs
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
        >
          Build Your
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {" "}Dream Store{" "}
          </span>
          in Minutes
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-slate-600 mb-8 leading-relaxed"
        >
          Join thousands of entrepreneurs who've transformed their ideas into thriving online businesses. 
          No coding, no complexity—just pure ecommerce magic.
        </motion.p>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <div className="text-2xl font-bold text-indigo-600 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Features */}
      <div className="space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-2xl font-bold text-slate-900 mb-6"
        >
          Why Choose 1MinuteShop?
        </motion.h2>
        
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
                {feature.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                    {feature.highlight}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Benefits List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200/50"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 text-green-600 mr-2" />
          What's Included
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.2 + index * 0.05 }}
              className="flex items-center space-x-3"
            >
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-sm text-slate-700">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-200/50 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full -translate-y-10 translate-x-10"></div>
        
        <div className="relative">
          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
            <span className="text-sm text-slate-600 ml-2">5.0</span>
          </div>
          
          <blockquote className="text-slate-700 mb-4 italic leading-relaxed">
            "{testimonial.quote}"
          </blockquote>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {testimonial.avatar}
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-sm">
                  {testimonial.author}
                </div>
                <div className="text-xs text-slate-600">
                  {testimonial.business}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-indigo-600">
                {testimonial.revenue}
              </div>
              <div className="text-xs text-slate-600">Revenue</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="text-center lg:text-left"
      >
        <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-slate-600 mb-4">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span>Average store goes live in under 5 minutes</span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Zap className="w-4 h-4" />
          <span>See Live Demo</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}