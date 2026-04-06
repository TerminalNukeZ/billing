import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Gamepad2, Server, Globe, Shield, Zap, Headphones, 
  ChevronDown, Menu, X, ArrowRight, Search, Cpu, 
  Database, Activity, Plus, Minus, HelpCircle,
  MessageSquare, Users, Ticket, BookOpen, ExternalLink,
  MessageCircle
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// --- Components ---

const FeatureCard = ({ icon: Icon, title, description, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card p-8 group relative overflow-hidden"
  >
    <div className={cn("absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl transition-opacity group-hover:opacity-20", color)} />
    <div className={cn("inline-flex p-3 rounded-xl mb-6", color.replace('bg-', 'bg-opacity-20 bg-'))}>
      <Icon className={cn("w-6 h-6", color.replace('bg-', 'text-'))} />
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

const GameCard = ({ image, name, price, platforms }: any) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
  >
    <img 
      src={image} 
      alt={name} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
    <div className="absolute inset-0 p-6 flex flex-col justify-end">
      <div className="flex items-center gap-2 mb-2">
        {platforms.map((p: string, i: number) => (
          <span key={i} className="text-white/60"><Server className="w-3 h-3" /></span>
        ))}
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
      <p className="text-purple-400 font-medium">Starting at ${price}/mo</p>
    </div>
  </motion.div>
);

const FAQItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors">{question}</span>
        <div className={cn("p-2 rounded-lg bg-white/5 transition-all", isOpen && "bg-purple-600 rotate-180")}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Pages ---

const LandingPage = () => {
  const [activeTab, setActiveTab] = React.useState("minecraft");

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-purple-600/20 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-purple-400 mb-8"
          >
            <Gamepad2 className="w-4 h-4" />
            Minecraft Server Hosting
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight"
          >
            Minecraft Server <span className="text-purple-500">Hosting</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            High-performance Minecraft server hosting with low latency, DDoS protection, and 24/7 support.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <div className="text-2xl font-bold text-white">
              Starting at <span className="text-green-500 text-3xl">$1/mo</span>
            </div>
            <Link 
              to="/games"
              className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-purple-600/20"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { icon: Gamepad2, label: "Minecraft Hosting", active: true },
              { icon: Server, label: "VPS Hosting" },
              { icon: Globe, label: "Web Hosting" },
              { icon: Zap, label: "Bot Hosting" }
            ].map((item, i) => (
              <button 
                key={i}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl border transition-all",
                  item.active 
                    ? "bg-white/10 border-white/20 text-white" 
                    : "bg-transparent border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-8 text-sm font-medium">
            <span className="flex items-center gap-2 text-green-500">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              99% Uptime
            </span>
            <span className="flex items-center gap-2 text-blue-500">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              DDoS Protected
            </span>
            <span className="flex items-center gap-2 text-purple-500">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              24/7 Support
            </span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              CUTTING-EDGE <span className="text-purple-500">FEATURES</span>
            </h2>
            <p className="text-gray-400 text-lg">Discover unparalleled server performance and security.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Zap}
              title="Instant Setup"
              description="Deployment in under 60 seconds. Our automated systems provision your resources the moment your payment is confirmed."
              color="bg-blue-500"
            />
            <FeatureCard 
              icon={Shield}
              title="DDoS Protection"
              description="Enterprise-grade mitigation capable of filtering up to 17Tbps+. Stay online during the most intense volumetric attacks."
              color="bg-green-500"
            />
            <FeatureCard 
              icon={Activity}
              title="99.9% Uptime"
              description="Tier 3+ certified data centers with redundant power, cooling, and network links to ensure your services never go offline."
              color="bg-orange-500"
            />
            <FeatureCard 
              icon={Headphones}
              title="24/7 Support"
              description="Real-world experts at your service. Our average response time is under 15 minutes, day or night."
              color="bg-purple-500"
            />
            <FeatureCard 
              icon={Cpu}
              title="Powerful Hardware"
              description="Utilizing latest-gen AMD EPYC™ processors and enterprise NVMe Gen4 storage for maximum I/O performance."
              color="bg-red-500"
            />
            <FeatureCard 
              icon={Globe}
              title="Global Locations"
              description="A globally distributed network with premium peerage to ensure ultra-low latency specifically optimized for gaming traffic."
              color="bg-cyan-500"
            />
          </div>
        </div>
      </section>

      {/* Popular Games Section */}
      <section className="py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Popular Game Servers</h2>
              <p className="text-gray-400 text-lg">Host your favorite games with premium hardware and 24/7 support.</p>
            </div>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search for a game"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GameCard 
              image="https://picsum.photos/seed/minecraft/800/600" 
              name="Minecraft" 
              price="1.00" 
              platforms={["pc", "mobile", "console"]} 
            />
            <GameCard 
              image="https://picsum.photos/seed/gta/800/600" 
              name="Grand Theft Auto V" 
              price="2.00" 
              platforms={["pc"]} 
            />
            <GameCard 
              image="https://picsum.photos/seed/palworld/800/600" 
              name="Palworld" 
              price="3.00" 
              platforms={["pc"]} 
            />
            <GameCard 
              image="https://picsum.photos/seed/rust/800/600" 
              name="Rust" 
              price="2.00" 
              platforms={["pc"]} 
            />
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-purple-600/10 border border-purple-600/20 flex flex-col items-center justify-center text-center p-8">
              <div className="bg-purple-600 p-4 rounded-full mb-6">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">View More</h3>
              <p className="text-gray-400">Explore all available games</p>
              <Link to="/games" className="absolute inset-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Control Panel Section */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Experience Our <span className="text-purple-500">Control Panel</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our bespoke game panel offers all the features you need to manage your community, versioning, and plugins effortlessly.
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            {["Game Hosting", "Web Hosting", "VPS Hosting", "Reseller Hosting"].map((tab, i) => (
              <button 
                key={i}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                  i === 0 ? "bg-purple-600 text-white" : "bg-white/5 text-gray-400 hover:text-white"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 space-y-4">
              {[
                { icon: Activity, label: "Real-Time Console" },
                { icon: Plus, label: "Mods Installer" },
                { icon: Zap, label: "Plugin Installer", active: true },
                { icon: Users, label: "Player Manager" },
                { icon: Database, label: "Config Editor" }
              ].map((item, i) => (
                <button 
                  key={i}
                  className={cn(
                    "w-full flex items-center justify-between p-5 rounded-2xl border transition-all text-left",
                    item.active 
                      ? "bg-white/10 border-white/20 text-white shadow-xl shadow-purple-600/5" 
                      : "bg-transparent border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className="w-5 h-5" />
                    <span className="font-bold">{item.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ))}
            </div>
            <div className="lg:col-span-8 relative">
              <div className="absolute -inset-4 bg-purple-600/20 blur-3xl rounded-full -z-10" />
              <div className="glass-card overflow-hidden border-white/10 shadow-2xl">
                <div className="bg-white/5 px-6 py-4 flex items-center gap-2 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="mx-auto bg-black/40 px-4 py-1 rounded-lg text-xs text-gray-500 font-mono">
                    gp.furiousnodes.xyz
                  </div>
                </div>
                <img 
                  src="https://picsum.photos/seed/panel/1200/800" 
                  alt="Control Panel" 
                  className="w-full h-auto opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-7">
              <h2 className="text-4xl font-bold text-white mb-12 tracking-tight">
                Frequently Asked <span className="text-purple-500">Questions</span>
              </h2>
              
              <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
                {["Minecraft Hosting", "VPS Servers", "Web Hosting", "Bot Hosting"].map((tab, i) => (
                  <button 
                    key={i}
                    className={cn(
                      "whitespace-nowrap px-8 py-3 rounded-full text-sm font-bold transition-all",
                      i === 0 ? "bg-purple-600 text-white" : "bg-white/5 text-gray-400 hover:text-white"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <FAQItem 
                  question="Is Furious Nodes suitable for hosting Minecraft servers?"
                  answer="Yes, Furious Nodes specializes in Minecraft server hosting, providing powerful hardware, easy-to-use control panels, and customizable plans to meet the needs of Minecraft players and communities."
                />
                <FAQItem 
                  question="What makes Furious Nodes the best choice for Minecraft hosting?"
                  answer="We use latest-gen AMD EPYC processors and NVMe storage, combined with a custom-built panel and 24/7 expert support to ensure the best possible experience."
                />
                <FAQItem 
                  question="Do you provide DDoS protection for Minecraft servers?"
                  answer="Absolutely. All our servers include enterprise-grade DDoS protection capable of mitigating attacks up to 17Tbps+."
                />
                <FAQItem 
                  question="How easy is it to manage my Minecraft server?"
                  answer="Our panel is designed for simplicity. You can install mods, plugins, and manage your files with just a few clicks."
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass-card p-8 sticky top-32">
                <div className="bg-purple-600/20 p-4 rounded-2xl inline-flex mb-6">
                  <HelpCircle className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Need Help?</h3>
                <p className="text-gray-400 mb-8">Available 24/7 to assist you with any questions or technical issues.</p>
                
                <div className="space-y-4 mb-8">
                  <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left">
                    <div className="p-2 bg-blue-500/20 rounded-lg"><MessageSquare className="w-5 h-5 text-blue-500" /></div>
                    <div>
                      <div className="font-bold text-white">Live Chat</div>
                      <div className="text-xs text-gray-500">Instant help from our team</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left">
                    <div className="p-2 bg-purple-500/20 rounded-lg"><MessageCircle className="w-5 h-5 text-purple-500" /></div>
                    <div>
                      <div className="font-bold text-white">Discord Community</div>
                      <div className="text-xs text-gray-500">Join our community</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left">
                    <div className="p-2 bg-orange-500/20 rounded-lg"><Ticket className="w-5 h-5 text-orange-500" /></div>
                    <div>
                      <div className="font-bold text-white">Submit Ticket</div>
                      <div className="text-xs text-gray-500">Detailed technical support</div>
                    </div>
                  </button>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                    Browse Knowledge Base <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                    Visit FAQs Page <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Hosting Solution Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-purple-400 mb-6">
              <Server className="w-4 h-4" />
              Beyond Gaming
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Your Complete Hosting Solution</h2>
            <p className="text-gray-400 text-lg">Beyond gaming servers, we offer professional hosting for all your needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Reseller Hosting", desc: "Start your own hosting business with our platform.", icon: Users, color: "text-green-500" },
              { title: "RDP Hosting", desc: "Windows Remote Desktop with full admin access.", icon: Globe, color: "text-orange-500" },
              { title: "Colocation", desc: "House your hardware in our secure data centers.", icon: Server, color: "text-red-500" },
              { title: "VPS Hosting", desc: "Full root access with dedicated resources for developers.", icon: Cpu, color: "text-blue-500" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="glass-card p-8 group"
              >
                <div className={cn("inline-flex p-3 rounded-xl mb-6 bg-white/5", item.color)}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

import MinecraftHosting from "./pages/MinecraftHosting";
import Checkout from "./pages/Checkout";

import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/games/minecraft" element={<MinecraftHosting />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
