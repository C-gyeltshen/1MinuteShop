import { Store } from "lucide-react";

export default function Footer(){
    return (
        <footer className="bg-slate-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                    <Store className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold">1MinuteShop</span>
                </div>
                <p className="text-slate-400 mb-6">
                  Empowering entrepreneurs to build their digital future, one store at a time.
                </p>
                <div className="flex justify-center space-x-8 text-sm">
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">Help Center</a>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">Templates</a>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">Pricing</a>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a>
                </div>
              </div>
            </div>
        </footer>
    )
}