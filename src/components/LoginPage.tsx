import React from 'react';
import { Button } from '@/components/ui/button';
import { Package, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'motion/react';

export const LoginPage = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#E5E7EB] p-10 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center">
            <Package className="text-white w-8 h-8" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight text-[#111827] mb-2">Shopon Store OS</h1>
        <p className="text-[#6B7280] mb-8">Modern business automation for import, wholesale, and retail.</p>
        
        <div className="space-y-4 mb-10 text-left">
          <div className="flex items-start gap-3">
            <div className="mt-1 bg-green-50 p-1 rounded-full">
              <Zap className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#111827]">AI-Powered Insights</h4>
              <p className="text-xs text-[#6B7280]">Optimization for pricing and inventory.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 bg-blue-50 p-1 rounded-full">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#111827]">Secure B2B & CRM</h4>
              <p className="text-xs text-[#6B7280]">Manage shops and sales agents with precision.</p>
            </div>
          </div>
        </div>

        <Button 
          onClick={loginWithGoogle} 
          className="w-full h-12 bg-black text-white hover:bg-zinc-800 transition-all font-semibold rounded-xl flex items-center justify-center gap-3"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </Button>
        
        <p className="mt-6 text-[10px] text-[#9CA3AF] uppercase tracking-widest">Enterprise Edition v1.0</p>
      </motion.div>
    </div>
  );
};
