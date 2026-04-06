import React from "react";
import { motion } from "motion/react";
import { Shield, Zap, ArrowRight, Check, CreditCard, Wallet, Globe, Mail, User, Phone, MapPin, MessageSquare, MessageCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { payments } from "../services/api";

import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const { user, signInWithGoogle, loading: authLoading } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState("crypto");

  const handleCompleteOrder = async () => {
    if (!user) {
      alert("Please sign in to complete your order.");
      return;
    }

    setLoading(true);
    try {
      const orderId = "ORDER_" + Date.now();
      const response = await payments.createInvoice({
        amount: 6.00,
        currency: "BTC",
        order_id: orderId,
        order_description: "Iron Plan - Minecraft Hosting",
        userId: user.uid,
        planId: "minecraft-iron"
      });
      
      if (response.data.invoice_url) {
        window.location.href = response.data.invoice_url;
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div className="pt-32 pb-32 text-center text-white">Loading...</div>;
  }

  return (
    <div className="pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Checkout</h1>
          <p className="text-gray-400">Please enter your personal details and billing information to checkout.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-8 space-y-8">
            {/* Sign Up / Login */}
            <div className="glass-card p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white">Personal Information</h2>
                {!user && <button onClick={signInWithGoogle} className="text-purple-500 text-sm font-bold hover:underline">Already Registered?</button>}
              </div>
              
              {user ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white">
                    {user.displayName?.[0] || user.email?.[0]}
                  </div>
                  <div>
                    <p className="text-white font-bold">{user.displayName || "User"}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-green-500/10 text-green-500 text-xs font-bold px-3 py-1 rounded-full border border-green-500/20">Signed In</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">First Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input type="text" placeholder="First Name" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-purple-500 outline-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input type="text" placeholder="Last Name" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-purple-500 outline-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-purple-500 outline-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input type="tel" placeholder="+1 Phone Number" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-purple-500 outline-none" />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={signInWithGoogle}
                    className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                  >
                    <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                    Sign in with Google
                  </button>
                </>
              )}
            </div>

            {/* Payment Details */}
            <div className="glass-card p-8">
              <h2 className="text-xl font-bold text-white mb-8">Payment Details</h2>
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl mb-8 flex items-center justify-between">
                <span className="text-green-500 font-bold">Total Due Today:</span>
                <span className="text-green-500 text-2xl font-extrabold">$6.00</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  { id: "paypal", label: "PayPal Basic", icon: CreditCard },
                  { id: "crypto", label: "LitePay.ch Crypto PayGate", icon: Wallet, active: true },
                  { id: "upi", label: "UPI, Credit/Debit Cards", icon: Globe },
                  { id: "discord", label: "Discord Manual Payment", icon: MessageSquare }
                ].map((method) => (
                  <button 
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={cn(
                      "flex items-center justify-between p-5 rounded-xl border transition-all text-left",
                      paymentMethod === method.id 
                        ? "bg-purple-600/10 border-purple-500 text-white" 
                        : "bg-white/5 border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <method.icon className="w-5 h-5" />
                      <span className="font-bold">{method.label}</span>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      paymentMethod === method.id ? "border-purple-500" : "border-gray-700"
                    )}>
                      {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-400">Additional Notes</label>
                <textarea 
                  placeholder="You can enter any additional notes or information you want included with your order here..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-purple-500 outline-none h-32 resize-none"
                />
              </div>
            </div>

            <button 
              onClick={handleCompleteOrder}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-5 rounded-xl font-bold text-lg shadow-xl shadow-purple-600/20 transition-all transform active:scale-95"
            >
              {loading ? "Processing..." : "Complete Order"}
            </button>
          </div>

          {/* Sidebar Section */}
          <div className="lg:col-span-4">
            <div className="glass-card p-8 sticky top-32">
              <h2 className="text-xl font-bold text-white mb-8 bg-purple-600 -mx-8 -mt-8 p-6 rounded-t-2xl">Order Summary</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white">Iron Plan</h3>
                    <span className="text-white font-bold">$6.00</span>
                  </div>
                  <p className="text-sm text-gray-500 italic mb-4">Minecraft Hosting - Premium</p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex justify-between"><span>» Server Location: India, Mumbai</span> <span>$0.00</span></li>
                    <li className="flex justify-between"><span>» Server Egg: Paper</span> <span>$0.00</span></li>
                    <li className="flex justify-between"><span>» Default Java + Bedrock Port: No</span> <span>$0.00</span></li>
                  </ul>
                </div>

                <hr className="border-white/5" />

                <div className="space-y-2">
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>Setup Fees:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>Monthly:</span>
                    <span>$6.00</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <div className="flex justify-between items-end">
                    <span className="text-white font-bold">Total Due Today</span>
                    <span className="text-3xl font-extrabold text-white">$6.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
