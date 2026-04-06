import React from "react";
import { motion } from "motion/react";
import { Gamepad2, Server, Globe, Shield, Zap, Headphones, ChevronDown, Menu, X, ArrowRight, Search, Cpu, Database, Activity, Plus, Minus, HelpCircle, MessageSquare, Users, Ticket, BookOpen, ExternalLink } from "lucide-react";
import { cn } from "@/src/lib/utils";
import PlanCard from "../components/PlanCard";

const plans = [
  { name: "Gravel", price: "1.00", cpu: "100%", memory: "2", disk: "12", backups: "1", ports: "1", databases: "1", icon: "🪨", pterodactylEggId: 3, pterodactylNestId: 1 },
  { name: "Andesite", price: "2.00", cpu: "150%", memory: "3", disk: "18", backups: "2", ports: "2", databases: "2", icon: "⛰️", pterodactylEggId: 3, pterodactylNestId: 1 },
  { name: "Cobblestone", price: "3.00", cpu: "180%", memory: "4", disk: "25", backups: "2", ports: "2", databases: "4", icon: "🧱", pterodactylEggId: 3, pterodactylNestId: 1 },
  { name: "Stone", price: "4.00", cpu: "200%", memory: "5", disk: "30", backups: "2", ports: "2", databases: "4", icon: "💎", pterodactylEggId: 3, pterodactylNestId: 1 },
  { name: "Coal", price: "5.00", cpu: "250%", memory: "6", disk: "36", backups: "3", ports: "4", databases: "4", icon: "⬛", pterodactylEggId: 3, pterodactylNestId: 1 },
  { name: "Iron", price: "6.00", cpu: "280%", memory: "7", disk: "42", backups: "3", ports: "4", databases: "4", icon: "💿", pterodactylEggId: 3, pterodactylNestId: 1 },
  { name: "Gold", price: "7.00", cpu: "300%", memory: "8", disk: "48", backups: "4", ports: "5", databases: "6", icon: "🟡", isPopular: true, pterodactylEggId: 3, pterodactylNestId: 1 },
  { name: "Diamond", price: "8.00", cpu: "350%", memory: "10", disk: "60", backups: "4", ports: "5", databases: "6", icon: "💎", pterodactylEggId: 3, pterodactylNestId: 1 },
  { name: "Emerald", price: "10.00", cpu: "400%", memory: "12", disk: "72", backups: "5", ports: "6", databases: "8", icon: "🟢", isPopular: true, pterodactylEggId: 3, pterodactylNestId: 1 },
  { name: "Netherite", price: "13.00", cpu: "450%", memory: "16", disk: "96", backups: "5", ports: "6", databases: "8", icon: "🟫", pterodactylEggId: 3, pterodactylNestId: 1 },
  { name: "Obsidian", price: "15.00", cpu: "500%", memory: "18", disk: "108", backups: "6", ports: "8", databases: "10", icon: "🌑", pterodactylEggId: 3, pterodactylNestId: 1 },
  { name: "Bedrock", price: "16.00", cpu: "550%", memory: "20", disk: "120", backups: "6", ports: "8", databases: "10", icon: "⬛", pterodactylEggId: 3, pterodactylNestId: 1 },
];

export default function MinecraftHosting() {
  const [tier, setTier] = React.useState("premium");

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
          >
            Let's play <span className="text-green-500">Minecraft</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Multiplayer worlds hosted on the best hardware on the market.
          </motion.p>

          <div className="flex items-center justify-center gap-4 mb-16">
            <button 
              onClick={() => setTier("premium")}
              className={cn(
                "px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2",
                tier === "premium" ? "bg-green-600 text-white" : "bg-white/5 text-gray-400 hover:text-white"
              )}
            >
              <Zap className="w-4 h-4" /> Premium
            </button>
            <button 
              onClick={() => setTier("deluxe")}
              className={cn(
                "px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2",
                tier === "deluxe" ? "bg-purple-600 text-white" : "bg-white/5 text-gray-400 hover:text-white"
              )}
            >
              <Shield className="w-4 h-4" /> Deluxe
            </button>
          </div>

          {/* Locations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {[
              { country: "Singapore", flag: "🇸🇬", cpu: "AMD EPYC", ram: "Intel Haswell" },
              { country: "India", flag: "🇮🇳", cpu: "AMD EPYC 7K62", ram: "Intel Platinum 8269CY", active: true },
              { country: "Germany", flag: "🇩🇪", cpu: "AMD EPYC", ram: "Intel Gold 6150" },
              { country: "USA-California", flag: "🇺🇸", cpu: "AMD EPYC 7413", ram: "Intel Xeon E5" }
            ].map((loc, i) => (
              <div 
                key={i}
                className={cn(
                  "glass-card p-6 border-white/5 text-left group cursor-pointer transition-all",
                  loc.active && "border-orange-500/50 shadow-lg shadow-orange-500/10"
                )}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{loc.flag}</span>
                  <span className="font-bold text-white">{loc.country}</span>
                </div>
                <div className="space-y-2 text-xs text-gray-500 font-medium">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3 h-3 text-orange-500" /> {loc.cpu}
                  </div>
                  <div className="flex items-center gap-2">
                    <Server className="w-3 h-3 text-orange-500" /> {loc.ram}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, i) => (
            <PlanCard key={i} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
}
