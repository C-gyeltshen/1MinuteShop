import { motion } from "framer-motion";
import { 
  Shield, 
  Users, 
  Zap, 
  BarChart3,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  Sparkles,
  Globe,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Access",
    description: "Your data is protected with enterprise-grade security",
    highlight: "256-bit SSL",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Access your dashboard in seconds with optimized performance",
    highlight: "< 2s load",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Real-time Analytics",
    description: "Monitor your store performance with live insights",
    highlight: "Live data",
  },
];

const stats = [
  { number: "50K+", label: "Active Users" },
  { number: "99.9%", label: "Uptime" },
  { number: "24/7", label: "Support" },
  { number: "4.9/5", label: "Rating" },
];

const recentUpdates = [
  "New dashboard analytics",
  "Enhanced security features",
  "Mobile app improvements",
  "API rate limit increased",
];

const successStory = {
  quote: "Since using this platform, my store revenue increased by 300%. The analytics helped me optimize everything!",
  author: "Michael Rodriguez",
  business: "Tech Gadgets Store",
  achievement: "300% growth",
  avatar: "MR"
};

export default function Left() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-10"
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
          Welcome back to your success
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
        >
          Continue Your
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {" "}Ecommerce Journey
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-slate-600 mb-8 leading-relaxed"
        >
          Access your dashboard to monitor sales, manage inventory, and grow your business 
          with powerful tools and real-time insights.
        </motion.p>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:shadow-lg transition-all duration-200"
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
          Your Dashboard Awaits
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

      {/* Recent Updates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200/50"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Zap className="w-5 h-5 text-blue-600 mr-2" />
          What's New
        </h3>
        <div className="space-y-3">
          {recentUpdates.map((update, index) => (
            <motion.div
              key={update}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.2 + index * 0.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
              <span className="text-sm text-slate-700">{update}</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full ml-auto">New</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Success Story */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-200/50 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full -translate-y-10 translate-x-10"></div>
        
        <div className="relative">
          {/* Success badge */}
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
              Success Story
            </span>
          </div>
          
          <blockquote className="text-slate-700 mb-4 italic leading-relaxed">
            "{successStory.quote}"
          </blockquote>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {successStory.avatar}
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-sm">
                  {successStory.author}
                </div>
                <div className="text-xs text-slate-600">
                  {successStory.business}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">
                {successStory.achievement}
              </div>
              <div className="text-xs text-slate-600">Growth</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Access CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="text-center lg:text-left"
      >
        <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-slate-600 mb-4">
          <Clock className="w-4 h-4 text-indigo-600" />
          <span>Last login: 2 hours ago</span>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-semibold text-sm border border-slate-300 hover:border-indigo-300 hover:shadow-lg transition-all duration-200"
        >
          <Globe className="w-4 h-4" />
          <span>Visit Your Store</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}