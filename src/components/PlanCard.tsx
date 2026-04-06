import React from "react";
import { motion } from "motion/react";
import { Cpu, Database, Server, Shield, Zap, ArrowRight, Check } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Link } from "react-router-dom";

interface PlanProps {
  name: string;
  price: string;
  cpu: string;
  memory: string;
  disk: string;
  backups: string;
  ports: string;
  databases: string;
  isPopular?: boolean;
  icon?: string;
  pterodactylEggId?: number;
  pterodactylNestId?: number;
}

export default function PlanCard({ 
  name, price, cpu, memory, disk, backups, ports, databases, isPopular, icon, pterodactylEggId, pterodactylNestId 
}: PlanProps) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className={cn(
        "glass-card p-8 flex flex-col relative overflow-hidden group transition-all duration-300",
        isPopular ? "border-purple-500/50 shadow-2xl shadow-purple-600/10" : "border-white/5"
      )}
    >
      {isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-purple-600 text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3 h-3 fill-white" />
            Most Popular
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl">
              {icon || "📦"}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{name}</h3>
              <p className="text-gray-500 text-sm">Minecraft Server</p>
            </div>
          </div>
          {(pterodactylEggId || pterodactylNestId) && (
            <div className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">
              E:{pterodactylEggId} N:{pterodactylNestId}
            </div>
          )}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-green-500">${price}</span>
          <span className="text-gray-500 text-sm">/month</span>
        </div>
      </div>

      <div className="space-y-4 mb-10 flex-grow">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-gray-300">
            <Cpu className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium">{cpu} CPU</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <Server className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium">{memory} GB</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <Database className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium">{disk} GB NVMe</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <Zap className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium">{backups} Backup</span>
          </div>
        </div>
        
        <hr className="border-white/5" />
        
        <ul className="space-y-3">
          {[
            `${ports} Port`,
            `${databases} Database`,
            "Premium Game Panel",
            "Advanced DDoS Protection"
          ].map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
              <Check className="w-4 h-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Link 
        to="/checkout"
        className={cn(
          "w-full py-4 rounded-xl font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2",
          isPopular 
            ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20" 
            : "bg-green-600 hover:bg-green-700 text-white"
        )}
      >
        Get Started <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}
