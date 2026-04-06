import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Instagram, MessageCircle, Send, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img 
                src="https://furiousnodes.xyz/assets/furious-nodes-logo-MYIMflq6.png" 
                alt="Furious Nodes" 
                className="h-10 w-auto"
                referrerPolicy="no-referrer"
              />
              <span className="text-xl font-bold text-white tracking-tight">
                Furious <span className="text-purple-500">Nodes</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
              Furious Nodes, founded in 2024, strives to redefine hosting excellence. 
              Our goal is to empower online ventures with top-quality servers and unmatched customer support.
            </p>
            <div className="flex items-center gap-4">
              <Link to="#" className="p-2 bg-white/5 rounded-lg hover:bg-purple-600/20 hover:text-purple-500 transition-all">
                <MessageCircle className="w-5 h-5" />
              </Link>
              <Link to="#" className="p-2 bg-white/5 rounded-lg hover:bg-purple-600/20 hover:text-purple-500 transition-all">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link to="#" className="p-2 bg-white/5 rounded-lg hover:bg-purple-600/20 hover:text-purple-500 transition-all">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link to="#" className="p-2 bg-white/5 rounded-lg hover:bg-purple-600/20 hover:text-purple-500 transition-all">
                <Send className="w-5 h-5" />
              </Link>
              <Link to="#" className="p-2 bg-white/5 rounded-lg hover:bg-purple-600/20 hover:text-purple-500 transition-all">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-bold mb-6">Game Server</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="#" className="hover:text-purple-500 transition-colors">Minecraft</Link></li>
              <li><Link to="#" className="hover:text-purple-500 transition-colors">FiveM</Link></li>
              <li><Link to="#" className="hover:text-purple-500 transition-colors">Palworld</Link></li>
              <li><Link to="#" className="hover:text-purple-500 transition-colors">Rust</Link></li>
              <li><Link to="#" className="hover:text-purple-500 transition-colors">Terraria</Link></li>
              <li><Link to="#" className="hover:text-purple-500 transition-colors font-medium text-purple-500">View All →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="#" className="hover:text-purple-500 transition-colors">VPS Hosting</Link></li>
              <li><Link to="#" className="hover:text-purple-500 transition-colors">RDP Hosting</Link></li>
              <li><Link to="#" className="hover:text-purple-500 transition-colors">Colocation</Link></li>
              <li><Link to="#" className="hover:text-purple-500 transition-colors">Web Hosting</Link></li>
              <li><Link to="#" className="hover:text-purple-500 transition-colors">Discord Bot</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="#" className="hover:text-purple-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-purple-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-purple-500 transition-colors">Refund Policy</Link></li>
              <li><Link to="#" className="hover:text-purple-500 transition-colors">AUP</Link></li>
              <li><Link to="#" className="hover:text-purple-500 transition-colors">SLA</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024-2026 Furious Nodes. All Rights Reserved.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-gray-500 hover:text-white transition-colors text-sm flex items-center gap-2"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
