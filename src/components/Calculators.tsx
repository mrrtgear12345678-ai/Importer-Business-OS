import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Calculator, 
  Download, 
  RefreshCw, 
  TrendingUp, 
  ArrowRight, 
  Info,
  DollarSign,
  Ship,
  Scale,
  Percent,
  Sparkles,
  PieChart as PieChartIcon,
  Trash2,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Types
interface LandingCostState {
  unitPrice: number;
  exchangeRate: number;
  quantity: number;
  shippingCost: number;
  insurance: number;
  dutyPercent: number;
  aitPercent: number;
  clearingFee: number;
  localTransport: number;
}

interface PriceMarginState {
  costPrice: number;
  markupPercent: number;
  vatPercent: number;
  platformFeePercent: number;
}

export const Calculators = () => {
  const [landingCost, setLandingCost] = useState<LandingCostState>({
    unitPrice: 15,
    exchangeRate: 16.5,
    quantity: 100,
    shippingCost: 25000,
    insurance: 500,
    dutyPercent: 25,
    aitPercent: 5,
    clearingFee: 2000,
    localTransport: 1500,
  });

  const [pricing, setPricing] = useState<PriceMarginState>({
    costPrice: 450,
    markupPercent: 30,
    vatPercent: 15,
    platformFeePercent: 5,
  });

  // Calculations for Landing Cost
  const landingResults = useMemo(() => {
    const rawCostSubtotal = landingCost.unitPrice * landingCost.exchangeRate * landingCost.quantity;
    const dutyAmount = (rawCostSubtotal * landingCost.dutyPercent) / 100;
    const aitAmount = (rawCostSubtotal * landingCost.aitPercent) / 100;
    const totalAdditionalFees = landingCost.shippingCost + landingCost.insurance + dutyAmount + aitAmount + landingCost.clearingFee + landingCost.localTransport;
    const grandTotal = rawCostSubtotal + totalAdditionalFees;
    const costPerUnit = grandTotal / landingCost.quantity;

    return {
      rawCostSubtotal,
      dutyAmount,
      aitAmount,
      totalAdditionalFees,
      grandTotal,
      costPerUnit
    };
  }, [landingCost]);

  // Calculations for Pricing
  const pricingResults = useMemo(() => {
    const markupAmount = (pricing.costPrice * pricing.markupPercent) / 100;
    const sellingPriceExclVat = pricing.costPrice + markupAmount;
    const vatAmount = (sellingPriceExclVat * pricing.vatPercent) / 100;
    const platformFeeAmount = (sellingPriceExclVat * pricing.platformFeePercent) / 100;
    const finalRetailPrice = sellingPriceExclVat + vatAmount;
    const netProfit = finalRetailPrice - pricing.costPrice - vatAmount - platformFeeAmount;
    const marginPercent = (netProfit / finalRetailPrice) * 100;

    return {
      markupAmount,
      sellingPriceExclVat,
      vatAmount,
      platformFeeAmount,
      finalRetailPrice,
      netProfit,
      marginPercent
    };
  }, [pricing]);

  const exportLandingCostPDF = () => {
    const doc = new jsPDF() as any;
    
    doc.setFontSize(20);
    doc.text("Import Landing Cost Analysis", 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    
    const rows = [
      ["Item Unit Price (CNY)", `${landingCost.unitPrice}`],
      ["Exchange Rate (BDT)", `${landingCost.exchangeRate}`],
      ["Quantity", `${landingCost.quantity}`],
      ["Raw Cost Subtotal", `BDT ${landingResults.rawCostSubtotal.toLocaleString()}`],
      ["Shipping & Freight", `BDT ${landingCost.shippingCost.toLocaleString()}`],
      ["Custom Duty", `BDT ${landingResults.dutyAmount.toLocaleString()} (${landingCost.dutyPercent}%)`],
      ["AIT", `BDT ${landingResults.aitAmount.toLocaleString()} (${landingCost.aitPercent}%)`],
      ["Clearing & Misc", `BDT ${landingCost.clearingFee.toLocaleString()}`],
      ["Total Landing Cost", `BDT ${landingResults.grandTotal.toLocaleString()}`],
      ["LANDED COST PER UNIT", `BDT ${landingResults.costPerUnit.toFixed(2)}`],
    ];

    autoTable(doc, {
      head: [['Expense Head', 'Value']],
      body: rows,
      startY: 40,
      theme: 'striped',
      headStyles: { fillColor: [0, 0, 0] }
    });

    doc.save("landing-cost-report.pdf");
    toast.success("PDF Report Generated!");
  };

  const handleAIAnalysis = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'AI analyzing margins...',
        success: 'AI suggests: Your clearing fee is 20% higher than average for this volume. Consider switching to Dhaka Custom House Agent 07.',
        error: 'AI analysis failed',
      }
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Business Calculators</h1>
          <p className="text-muted-foreground text-sm">Precision tools for import, pricing, and margin management.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="gap-2 h-9 text-xs" onClick={() => window.print()}>
             <FileText className="w-4 h-4" /> Print View
           </Button>
           <Button variant="outline" className="gap-2 h-9 text-xs text-purple-600 border-purple-200 bg-purple-50 hover:bg-purple-100" onClick={handleAIAnalysis}>
             <Sparkles className="w-4 h-4" /> AI Audit
           </Button>
        </div>
      </div>

      <Tabs defaultValue="landing" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mb-8 bg-muted/50 p-1 rounded-xl">
          <TabsTrigger value="landing" className="rounded-lg font-bold text-xs uppercase tracking-wider">Landing Cost</TabsTrigger>
          <TabsTrigger value="pricing" className="rounded-lg font-bold text-xs uppercase tracking-wider">Pricing & Margin</TabsTrigger>
        </TabsList>

        <TabsContent value="landing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-md font-bold">Cost Components</CardTitle>
                <CardDescription>Enter import details for an accurate per-unit landed cost.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-4">
                      <div className="grid gap-2">
                         <Label className="text-xs font-bold uppercase text-muted-foreground">Unit Price (CNY)</Label>
                         <Input 
                            type="number" 
                            step="0.01"
                            value={landingCost.unitPrice}
                            onChange={(e) => setLandingCost({...landingCost, unitPrice: parseFloat(e.target.value) || 0})}
                         />
                      </div>
                      <div className="grid gap-2">
                         <Label className="text-xs font-bold uppercase text-muted-foreground">Ex. Rate (BDT)</Label>
                         <Input 
                            type="number" 
                            step="0.1"
                            value={landingCost.exchangeRate}
                            onChange={(e) => setLandingCost({...landingCost, exchangeRate: parseFloat(e.target.value) || 0})}
                         />
                      </div>
                      <div className="grid gap-2">
                         <Label className="text-xs font-bold uppercase text-muted-foreground">Quantity (Pcs)</Label>
                         <Input 
                            type="number" 
                            value={landingCost.quantity}
                            onChange={(e) => setLandingCost({...landingCost, quantity: parseInt(e.target.value) || 0})}
                         />
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="grid gap-2">
                         <Label className="text-xs font-bold uppercase text-muted-foreground">Shipping / Freight (BDT)</Label>
                         <Input 
                            type="number" 
                            value={landingCost.shippingCost}
                            onChange={(e) => setLandingCost({...landingCost, shippingCost: parseFloat(e.target.value) || 0})}
                         />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="grid gap-2">
                            <Label className="text-xs font-bold uppercase text-muted-foreground">Duty (%)</Label>
                            <Input 
                               type="number" 
                               value={landingCost.dutyPercent}
                               onChange={(e) => setLandingCost({...landingCost, dutyPercent: parseFloat(e.target.value) || 0})}
                            />
                         </div>
                         <div className="grid gap-2">
                            <Label className="text-xs font-bold uppercase text-muted-foreground">AIT (%)</Label>
                            <Input 
                               type="number" 
                               value={landingCost.aitPercent}
                               onChange={(e) => setLandingCost({...landingCost, aitPercent: parseFloat(e.target.value) || 0})}
                            />
                         </div>
                      </div>
                      <div className="grid gap-2">
                         <Label className="text-xs font-bold uppercase text-muted-foreground">Clearing & Other (BDT)</Label>
                         <Input 
                            type="number" 
                            value={landingCost.clearingFee}
                            onChange={(e) => setLandingCost({...landingCost, clearingFee: parseFloat(e.target.value) || 0})}
                         />
                      </div>
                   </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-md bg-zinc-950 text-zinc-50 flex flex-col">
              <CardHeader>
                <CardTitle className="text-md font-bold flex items-center gap-2">
                   <TrendingUp className="w-4 h-4 text-green-400" /> Landing Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                 <div className="space-y-2">
                    <p className="text-[10px] uppercase font-bold text-zinc-400 opacity-60">Total Budget Needed</p>
                    <h3 className="text-3xl font-black tracking-tighter">৳{landingResults.grandTotal.toLocaleString()}</h3>
                 </div>

                 <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
                    <p className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Cost Per Unit</p>
                    <p className="text-2xl font-bold text-green-400">৳{landingResults.costPerUnit.toFixed(2)}</p>
                    <p className="text-[10px] text-zinc-500 mt-2">Breakdown: {((landingResults.totalAdditionalFees / landingResults.grandTotal) * 100).toFixed(1)}% Overhead</p>
                 </div>

                 <div className="space-y-3 pt-4 border-t border-zinc-800">
                    <SummaryRow label="Raw Subtotal" value={landingResults.rawCostSubtotal} />
                    <SummaryRow label="Total Duties" value={landingResults.dutyAmount + landingResults.aitAmount} />
                    <SummaryRow label="Logistics" value={landingCost.shippingCost + landingCost.localTransport} />
                 </div>

                 <Button 
                   className="w-full mt-4 bg-zinc-50 text-zinc-950 font-bold hover:bg-zinc-200"
                   onClick={exportLandingCostPDF}
                 >
                   <Download className="w-4 h-4 mr-2" /> Download Analysis
                 </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border shadow-sm">
                 <CardHeader>
                    <CardTitle className="text-md font-bold">Retail Pricing Model</CardTitle>
                    <CardDescription>Calculate final retail price and profit margins.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="grid gap-2">
                          <Label className="text-xs font-bold uppercase text-muted-foreground">Original Cost (BDT)</Label>
                          <Input 
                             type="number" 
                             value={pricing.costPrice}
                             onChange={(e) => setPricing({...pricing, costPrice: parseFloat(e.target.value) || 0})}
                          />
                       </div>
                       <div className="grid gap-2">
                          <Label className="text-xs font-bold uppercase text-muted-foreground">Desired Markup (%)</Label>
                          <Input 
                             type="number" 
                             value={pricing.markupPercent}
                             onChange={(e) => setPricing({...pricing, markupPercent: parseFloat(e.target.value) || 0})}
                          />
                       </div>
                       <div className="grid gap-2">
                          <Label className="text-xs font-bold uppercase text-muted-foreground">Govt. VAT (%)</Label>
                          <Input 
                             type="number" 
                             value={pricing.vatPercent}
                             onChange={(e) => setPricing({...pricing, vatPercent: parseFloat(e.target.value) || 0})}
                          />
                       </div>
                       <div className="grid gap-2">
                          <Label className="text-xs font-bold uppercase text-muted-foreground">Marketplace Fee (%)</Label>
                          <Input 
                             type="number" 
                             value={pricing.platformFeePercent}
                             onChange={(e) => setPricing({...pricing, platformFeePercent: parseFloat(e.target.value) || 0})}
                          />
                       </div>
                    </div>

                    <div className="bg-muted/50 p-6 rounded-2xl border border-border space-y-4">
                       <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">Recommended Retail Price</span>
                          <span className="text-xl font-black">৳{Math.ceil(pricingResults.finalRetailPrice).toLocaleString()}</span>
                       </div>
                       <div className="flex items-center justify-between text-green-600 font-bold">
                          <span className="text-xs uppercase tracking-wider">Net Profit Per Sale</span>
                          <span>৳{pricingResults.netProfit.toFixed(2)}</span>
                       </div>
                       <div className="space-y-1 pt-2">
                          <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                             <span>Net Margin</span>
                             <span>{pricingResults.marginPercent.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
                             <div className="bg-green-500 h-full" style={{ width: `${pricingResults.marginPercent}%` }}></div>
                          </div>
                       </div>
                    </div>
                 </CardContent>
              </Card>

              <Card className="border-border shadow-sm border-l-4 border-l-blue-600">
                 <CardHeader>
                    <CardTitle className="text-md font-bold">Wholesale vs B2C Comparison</CardTitle>
                    <CardDescription>Simulated comparison of bulk selling vs individual retail.</CardDescription>
                 </CardHeader>
                 <CardContent>
                    <div className="space-y-4">
                       <ComparisonItem 
                          label="Individual B2C Retail" 
                          price={pricingResults.finalRetailPrice} 
                          margin={pricingResults.marginPercent} 
                          vol="1 pc"
                       />
                       <Separator />
                       <ComparisonItem 
                          label="B2B Shop Owner (Wholesale)" 
                          price={pricingResults.costPrice * 1.15} 
                          margin={12} 
                          vol="10+ pcs"
                          badge="Bulk Volume"
                          color="blue"
                       />
                       <Separator />
                       <ComparisonItem 
                          label="Super Platinum Partner" 
                          price={pricingResults.costPrice * 1.08} 
                          margin={8} 
                          vol="100+ pcs"
                          badge="High Volume"
                          color="purple"
                       />
                    </div>
                    
                    <div className="mt-8 p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex gap-4 items-start">
                       <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                          <Info className="w-4 h-4" />
                       </div>
                       <p className="text-xs text-blue-800 leading-relaxed italic font-medium">
                         "Strategy Tip: Wholesale margins are lower, but inventory turnover is 7x faster. AI suggests shifting 40% of electronics stock to Wholesale partners."
                       </p>
                    </div>
                 </CardContent>
              </Card>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const SummaryRow = ({ label, value }: { label: string, value: number }) => (
   <div className="flex justify-between text-[11px]">
      <span className="text-zinc-400 font-medium">{label}</span>
      <span className="font-bold">৳{Math.round(value).toLocaleString()}</span>
   </div>
);

const ComparisonItem = ({ label, price, margin, vol, badge, color = "green" }: any) => (
   <div className="flex items-center justify-between group cursor-default">
      <div>
         <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold">{label}</h4>
            {badge && <span className={cn("text-[9px] font-black uppercase px-2 py-0.5 rounded-full", color === "blue" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700")}>{badge}</span>}
         </div>
         <p className="text-[10px] text-muted-foreground mt-0.5">Min Order: {vol}</p>
      </div>
      <div className="text-right">
         <p className="text-sm font-black">৳{Math.round(price).toLocaleString()}</p>
         <p className={cn("text-[10px] font-bold", color === "green" ? "text-green-600" : color === "blue" ? "text-blue-600" : "text-purple-600")}>{margin.toFixed(1)}% Margin</p>
      </div>
   </div>
);
