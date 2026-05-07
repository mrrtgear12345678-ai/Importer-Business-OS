import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Calculator, 
  Ship, 
  Scale, 
  AlertCircle, 
  ChevronRight, 
  Sparkles,
  FileText
} from 'lucide-react';
import { generateProductDescription } from '@/lib/ai';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export const ImportManager = () => {
  const [calc, setCalc] = useState({
    supplierPrice: 0,
    exchangeRate: 17.5,
    shippingPerKg: 450,
    itemWeight: 0.5,
    dutyPercent: 5,
    platformFee: 2 // e.g. Alibaba fee
  });

  const landingCost = (calc.supplierPrice * calc.exchangeRate) + 
                    (calc.shippingPerKg * calc.itemWeight) + 
                    ((calc.supplierPrice * calc.exchangeRate) * (calc.dutyPercent / 100)) +
                    ((calc.supplierPrice * calc.exchangeRate) * (calc.platformFee / 100));

  const [productInfo, setProductInfo] = useState({
    name: '',
    category: '',
    features: ''
  });
  const [aiDescription, setAiDescription] = useState('');

  const handleGenerateDescription = async () => {
    if (!productInfo.name || !productInfo.category) {
      toast.error("Please provide name and category.");
      return;
    }
    toast.promise(generateProductDescription(
      productInfo.name, 
      productInfo.category, 
      productInfo.features.split(',').map(f => f.trim())
    ), {
      loading: 'AI writing description...',
      success: (desc) => {
        setAiDescription(desc || '');
        return 'Description generated!';
      }
    });
  };

  return (
    <div className="space-y-6">
       <div>
          <h1 className="text-2xl font-bold tracking-tight">Import & Sourcing Manager</h1>
          <p className="text-[#6B7280] text-sm">Calculate precise landing costs and prepare products for market.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Cost Calculator */}
           <div className="space-y-6">
             <Card className="border-[#E5E7EB] shadow-sm">
               <CardHeader>
                 <CardTitle className="text-lg flex items-center gap-2">
                   <Calculator className="w-5 h-5" /> Landing Cost Calculator
                 </CardTitle>
                 <CardDescription>Support for China (Alibaba/1688) conversions</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label className="text-xs">Supplier Price (CNY/¥)</Label>
                     <Input 
                       type="number" 
                       value={calc.supplierPrice} 
                       onChange={(e) => setCalc({...calc, supplierPrice: Number(e.target.value)})}
                     />
                   </div>
                   <div className="space-y-2">
                     <Label className="text-xs">Exchange Rate (BDT/¥)</Label>
                     <Input 
                       type="number" 
                       value={calc.exchangeRate}
                       onChange={(e) => setCalc({...calc, exchangeRate: Number(e.target.value)})} 
                     />
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label className="text-xs text-blue-600 font-bold flex items-center gap-1">
                       <Ship className="w-3 h-3" /> Shipping Rate (per KG)
                     </Label>
                     <Input 
                       type="number" 
                       value={calc.shippingPerKg}
                       onChange={(e) => setCalc({...calc, shippingPerKg: Number(e.target.value)})} 
                     />
                   </div>
                   <div className="space-y-2">
                     <Label className="text-xs font-bold flex items-center gap-1">
                       <Scale className="w-3 h-3" /> Item Weight (KG)
                     </Label>
                     <Input 
                       type="number" 
                       value={calc.itemWeight}
                       onChange={(e) => setCalc({...calc, itemWeight: Number(e.target.value)})} 
                     />
                   </div>
                 </div>

                 <div className="flex items-center justify-between p-6 bg-black rounded-2xl text-white">
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-60">Estimated Landing Cost</p>
                      <h3 className="text-3xl font-bold">BDT {Math.ceil(landingCost).toLocaleString()}</h3>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] uppercase font-bold opacity-60">Supplier Price</p>
                       <p className="text-sm font-medium">BDT {Math.ceil(calc.supplierPrice * calc.exchangeRate).toLocaleString()}</p>
                    </div>
                 </div>

                 <div className="flex gap-4 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                   <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                   <p className="text-xs text-amber-900 leading-tight">
                     This unit cost includes {calc.dutyPercent}% calculated duty and {calc.platformFee}% processing fee. Does not include local last-mile delivery.
                   </p>
                 </div>
               </CardContent>
             </Card>
           </div>

           {/* Content Prep */}
           <div className="space-y-6">
             <Card className="border-[#E5E7EB] shadow-sm">
               <CardHeader>
                 <CardTitle className="text-lg flex items-center gap-2">
                   <Sparkles className="w-5 h-5 text-purple-600" /> AI Content Preparation
                 </CardTitle>
                 <CardDescription>Generate listings for your new import</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Product Name</Label>
                    <Input placeholder="e.g. Joyroom Magnetic Car Holder" value={productInfo.name} onChange={e => setProductInfo({...productInfo, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Category</Label>
                    <Input placeholder="e.g. Mobile Accessories" value={productInfo.category} onChange={e => setProductInfo({...productInfo, category: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Key Features (comma separated)</Label>
                    <Input placeholder="N52 Magnet, 360 Rotation, Carbon Fiber" value={productInfo.features} onChange={e => setProductInfo({...productInfo, features: e.target.value})} />
                  </div>

                  <Button onClick={handleGenerateDescription} className="w-full bg-purple-600 hover:bg-purple-700 text-white gap-2 font-semibold h-11">
                    <FileText className="w-4 h-4" /> AI Generate Description
                  </Button>

                  {aiDescription && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 bg-[#F9FAFB] rounded-xl border border-dashed border-[#D1D5DB] text-sm italic text-[#4B5563]"
                    >
                      {aiDescription}
                    </motion.div>
                  )}
               </CardContent>
             </Card>

             <Card className="border-[#E5E7EB] shadow-sm">
               <CardContent className="p-6">
                  <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" /> 
                    Next Step: Add to Inventory
                  </h4>
                  <p className="text-xs text-[#6B7280] mb-4">
                    Ready to move this item to your live inventory? This will sync across B2C storefront and B2B wholesale portals.
                  </p>
                  <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white transition-all font-bold h-11">
                    Push to Inventory
                  </Button>
               </CardContent>
             </Card>
           </div>
        </div>
    </div>
  );
};
