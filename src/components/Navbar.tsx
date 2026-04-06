import React from "react";
import { Link } from "react-router-dom";
import { Gamepad2, Server, Globe, Shield, Zap, Headphones, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, signInWithGoogle, signOut } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <div className="group relative">
              <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
                <Gamepad2 className="w-4 h-4" />
                Game Hosting
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-2xl border border-white/5 rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                <Link to="/games/minecraft" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Minecraft Hosting</p>
                    <p className="text-xs text-gray-500">Starting at $1.50/GB</p>
                  </div>
                </Link>
              </div>
            </div>
            <Link to="#" className="text-gray-300 hover:text-white transition-colors">Web Hosting</Link>
            <Link to="#" className="text-gray-300 hover:text-white transition-colors">Dedicated</Link>
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Client Area</Link>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-2 pr-4 py-1.5">
                  <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white">
                    {user.displayName?.[0] || user.email?.[0]}
                  </div>
                  <span className="text-sm font-medium text-white">{user.displayName?.split(' ')[0] || "User"}</span>
                  <button onClick={signOut} className="text-gray-500 hover:text-red-500 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button onClick={signInWithGoogle} className="text-gray-300 hover:text-white px-4 py-2 transition-colors">
                  Login
                </button>
                <Link 
                  to="/checkout"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2.5 rounded-lg font-medium transition-all transform hover:scale-105"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/5 px-4 py-6 space-y-4">
          <Link to="/games" className="block text-gray-300 hover:text-white text-lg">Game Hosting</Link>
          <Link to="/services" className="block text-gray-300 hover:text-white text-lg">Hosting Services</Link>
          <Link to="/legal" className="block text-gray-300 hover:text-white text-lg">Legal</Link>
          <hr className="border-white/5" />
          <Link to="/login" className="block bg-purple-600 text-white text-center py-3 rounded-lg font-medium">Login</Link>
        </div>
      )}
    </nav>
  );
}
