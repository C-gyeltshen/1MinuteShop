import { Store } from "lucide-react";

export default function Footer(){
    return (
        <footer className="bg-slate-900/50 border-t border-slate-700/50 py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Store className="w-6 h-6 text-[#ff6800]" />
                    <span className="text-lg font-bold text-white">
                      1MinuteShop
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">
                    Build your dream store in 60 seconds
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Product</h4>
                  <ul className="space-y-2 text-slate-400 text-sm">
                    <li>
                      <a
                        href="#"
                        className="hover:text-[#ff6800] transition-colors"
                      >
                        Features
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-[#ff6800] transition-colors"
                      >
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-[#ff6800] transition-colors"
                      >
                        Templates
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Company</h4>
                  <ul className="space-y-2 text-slate-400 text-sm">
                    <li>
                      <a
                        href="#"
                        className="hover:text-[#ff6800] transition-colors"
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-[#ff6800] transition-colors"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-[#ff6800] transition-colors"
                      >
                        Careers
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Support</h4>
                  <ul className="space-y-2 text-slate-400 text-sm">
                    <li>
                      <a
                        href="#"
                        className="hover:text-[#ff6800] transition-colors"
                      >
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-[#ff6800] transition-colors"
                      >
                        Contact
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-[#ff6800] transition-colors"
                      >
                        Terms
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-slate-700/50 pt-8 text-center text-slate-400 text-sm">
                <p>&copy; 2025 1MinuteShop. All rights reserved.</p>
              </div>
            </div>
        </footer>
    )
}