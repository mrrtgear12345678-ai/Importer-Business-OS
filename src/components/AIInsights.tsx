import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  BrainCircuit, 
  TrendingUp, 
  Megaphone, 
  Smartphone,
  MessageSquare,
  Wand2,
  Lightbulb,
  Zap,
  RefreshCw,
  Facebook,
  AtSign,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateSocialMediaCopy } from '@/lib/ai';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export const AIInsights = () => {
  const [activeTab, setActiveTab] = useState<'strategy' | 'marketing' | 'cs'>('strategy');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Command Center</h1>
          <p className="text-muted-foreground text-sm">Autonomous growth suggestions and creative automation.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="gap-2 h-9 text-xs">
             <RefreshCw className="w-3.3 h-3" /> Re-Scan Store
           </Button>
           <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2 h-9 text-xs font-bold shadow-lg shadow-purple-200 dark:shadow-none">
             <BrainCircuit className="w-4 h-4" /> Run Deep Audit
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {/* Sidebar Nav */}
         <div className="lg:col-span-1 space-y-2">
            <AINavItem 
              active={activeTab === 'strategy'} 
              onClick={() => setActiveTab('strategy')}
              icon={Lightbulb}
              label="Growth Strategy"
              desc="Market trends & Pricing"
            />
            <AINavItem 
              active={activeTab === 'marketing'} 
              onClick={() => setActiveTab('marketing')}
              icon={Megaphone}
              label="Ad Automation"
              desc="Social & Copywriting"
            />
            <AINavItem 
              active={activeTab === 'cs'} 
              onClick={() => setActiveTab('cs')}
              icon={MessageSquare}
              label="Customer Support"
              desc="Chat shortcuts & FAQs"
            />
         </div>

         {/* Content Area */}
         <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
               {activeTab === 'strategy' && <GrowthStrategy key="growth" />}
               {activeTab === 'marketing' && <MarketingAutomation key="marketing" />}
               {activeTab === 'cs' && <SupportShortcuts key="cs" />}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
};

const GrowthStrategy = () => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="grid grid-cols-1 md:grid-cols-2 gap-6"
  >
     <InsightCard 
        tag="Pricing Opportunity"
        title="Gaming Peripherals Optimization"
        desc="Your competitors in Bangladesh market are selling Logitech G102 for ৳2,300. Your current price of ৳2,200 is too low. Suggest increasing to ৳2,250 to gain 2.3% margin without losing Rank 1 position on Google."
        actionLabel="Apply New Pricing"
        icon={TrendingUp}
     />
     <InsightCard 
        tag="Inventory Risk"
        title="Powerbank Stock Alert"
        desc="Anker PowerCore stock is decreasing 15% faster than last month. Current lead time from China is 18 days. Suggest placing a restock order of 100 units now to avoid stockout by end of month."
        actionLabel="Order from Supplier"
        icon={Zap}
        color="border-amber-200 bg-amber-50/50"
     />
     <InsightCard 
        tag="Market Trend"
        title="Upcoming Summer Season"
        desc="AI detected a surge in 'Portable Mini Fans' searches on 1688.com. Suggest sourcing 5 models to capture the 40% retail margin available during May-July."
        actionLabel="Explore Sourcing"
        icon={Sparkles}
     />
  </motion.div>
);

const MarketingAutomation = () => {
  const [selectedProduct, setSelectedProduct] = useState('Anker PowerCore');
  const [copy, setCopy] = useState('');

  const generate = async (platform: any) => {
    toast.promise(generateSocialMediaCopy({ name: selectedProduct, retail_price: '৳4,500' }, platform), {
      loading: `Writing for ${platform}...`,
      success: (str) => {
        setCopy(str || '');
        return `${platform} caption ready!`;
      }
    });
  };

  return (
    <motion.div 
       initial={{ opacity: 0, x: 20 }}
       animate={{ opacity: 1, x: 0 }}
       className="space-y-6"
    >
       <Card className="border-border shadow-md">
          <CardHeader>
             <CardTitle className="text-md font-bold">Social Media Copy Generator</CardTitle>
             <CardDescription>Pick a product and platform. Shopon AI does the rest.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="flex gap-2 p-2 bg-muted rounded-xl">
                <Button 
                  variant={selectedProduct === 'Anker PowerCore' ? 'default' : 'ghost'} 
                  size="sm" 
                  onClick={() => setSelectedProduct('Anker PowerCore')}
                  className="text-xs h-8"
                >
                  Anker PowerCore
                </Button>
                <Button 
                   variant={selectedProduct === 'Logitech G102' ? 'default' : 'ghost'} 
                   size="sm" 
                   onClick={() => setSelectedProduct('Logitech G102')}
                   className="text-xs h-8"
                >
                   Logitech G102
                </Button>
             </div>
             
             <div className="grid grid-cols-3 gap-4">
                <PlatformButton icon={Facebook} label="Facebook" onClick={() => generate('Facebook')} />
                <PlatformButton icon={AtSign} label="TikTok" onClick={() => generate('TikTok')} />
                <PlatformButton icon={Send} label="WhatsApp" onClick={() => generate('WhatsApp')} />
             </div>

             {copy && (
                <div className="p-6 bg-muted rounded-2xl border border-dashed border-border leading-relaxed text-sm whitespace-pre-wrap flex flex-col gap-4">
                   <p className="italic text-muted-foreground">"{copy}"</p>
                   <Button size="sm" className="w-fit gap-2 h-8 text-[11px] font-bold" onClick={() => {
                     navigator.clipboard.writeText(copy);
                     toast.success("Copied to clipboard!");
                   }}>
                     Copy Text
                   </Button>
                </div>
             )}
          </CardContent>
       </Card>
    </motion.div>
  );
};

const SupportShortcuts = () => (
   <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
   >
      <Card className="border-border shadow-sm">
         <CardHeader>
            <CardTitle className="text-md font-bold">AI Chatbot Optimization</CardTitle>
            <CardDescription>Auto-replies for frequent questions detected via WhatsApp API.</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            <ChatShortcut 
              trigger="Price?" 
              response="Currently retailing for ৳{{product.price}}. Wholesale price available for shops starting from {{product.min_order}} pcs." 
            />
            <ChatShortcut 
              trigger="Delivery time?" 
              response="Dhaka: 24h, Outside Dhaka: 48-72h via Steadfast/SA Paribahan." 
            />
            <ChatShortcut 
              trigger="Warranty?" 
              response="1 Year official replacement warranty for this brand." 
            />
         </CardContent>
      </Card>
   </motion.div>
);

const AINavItem = ({ active, onClick, icon: Icon, label, desc }: any) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 group",
      active 
        ? "bg-black text-white border-black dark:bg-primary dark:text-primary-foreground dark:border-primary shadow-lg shadow-zinc-200 dark:shadow-none" 
        : "bg-white dark:bg-muted border-border hover:border-black dark:hover:border-primary text-muted-foreground hover:text-black dark:hover:text-foreground"
    )}
  >
     <div className={cn(
       "p-2.5 rounded-xl transition-colors",
       active ? "bg-white/20" : "bg-muted group-hover:bg-black/5"
     )}>
        <Icon className="w-5 h-5" />
     </div>
     <div className="flex-1">
        <h4 className="text-sm font-bold">{label}</h4>
        <p className="text-[10px] opacity-60 uppercase font-bold tracking-wider">{desc}</p>
     </div>
  </button>
);

const InsightCard = ({ tag, title, desc, actionLabel, icon: Icon, color }: any) => (
  <Card className={cn("border-border shadow-sm overflow-hidden", color)}>
     <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-3">
           <Badge variant="outline" className="text-[10px] bg-white/50 backdrop-blur-sm border-border font-bold uppercase">{tag}</Badge>
        </div>
        <div className="flex items-start gap-4">
           <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center shrink-0 shadow-sm">
              <Icon className="w-5 h-5" />
           </div>
           <div>
              <h4 className="text-sm font-bold tracking-tight">{title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed mt-2">{desc}</p>
              <Button size="sm" variant="link" className="px-0 mt-4 h-auto text-xs font-bold gap-1 text-black dark:text-white">
                 {actionLabel} <Wand2 className="w-3 h-3" />
              </Button>
           </div>
        </div>
     </CardContent>
  </Card>
);

const PlatformButton = ({ icon: Icon, label, onClick }: any) => (
  <Button 
    variant="outline" 
    className="h-20 flex-col gap-2 rounded-2xl hover:bg-black hover:text-white dark:hover:bg-primary transition-all group"
    onClick={onClick}
  >
     <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
     <span className="text-[10px] font-bold uppercase">{label}</span>
  </Button>
);

const ChatShortcut = ({ trigger, response }: any) => (
  <div className="p-4 bg-muted/30 rounded-xl border border-border flex items-center justify-between">
     <div className="flex-1">
        <p className="text-xs font-bold text-muted-foreground flex items-center gap-2">
           <Zap className="w-3 h-3 text-yellow-600" /> Lead Trigger: "{trigger}"
        </p>
        <p className="text-sm mt-1">AI Response: <span className="text-muted-foreground">"{response}"</span></p>
     </div>
     <Button variant="ghost" size="sm" className="h-8 text-xs font-bold">Edit Rule</Button>
  </div>
);
