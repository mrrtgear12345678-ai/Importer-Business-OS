import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, 
  Search, 
  Plus, 
  ShoppingBag, 
  ArrowRight,
  TrendingDown,
  Clock,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const wholesaleItems = [
  { id: '1', name: 'Logitech G102 Lightsync', category: 'Peripherals', minOrder: 5, wholesalePrice: 1650, retailValue: 2200, stock: 120 },
  { id: '2', name: 'Rapoo V500 Pro Keyboard', category: 'Peripherals', minOrder: 10, wholesalePrice: 2800, retailValue: 3800, stock: 45 },
  { id: '3', name: 'Havit H2002d Headset', category: 'Audio', minOrder: 5, wholesalePrice: 2100, retailValue: 3200, stock: 28 },
  { id: '4', name: 'A4Tech Blood B120', category: 'Peripherals', minOrder: 20, wholesalePrice: 1900, retailValue: 2800, stock: 65 },
];

export const B2BWholesale = () => {
  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Wholesale Center (B2B)</h1>
          <p className="text-muted-foreground text-sm">Special catalog for retail shop partners and bulk buyers.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-9 text-xs">Bulk Import</Button>
           <Button className="bg-primary text-primary-foreground gap-2 h-9 text-xs">
             <Plus className="w-4 h-4" /> Add Wholesale Item
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
           <Card className="border-border shadow-sm border-l-4 border-l-blue-600">
             <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                   <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                      <Truck className="w-5 h-5" />
                   </div>
                   <Badge variant="secondary" className="text-[10px] bg-blue-50 text-blue-700 font-bold">New Policy</Badge>
                </div>
                <h4 className="font-bold text-sm">Free Delivery Threshold</h4>
                <p className="text-xs text-muted-foreground mt-1">Shop owners now get free truck delivery for orders over ৳75,000.</p>
             </CardContent>
           </Card>

           <Card className="border-border shadow-sm border-l-4 border-l-purple-600">
             <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                   <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
                      <Sparkles className="w-5 h-5" />
                   </div>
                   <Badge variant="secondary" className="text-[10px] bg-purple-50 text-purple-700 font-bold">AI Driven</Badge>
                </div>
                <h4 className="font-bold text-sm">Bulk Price Recommendation</h4>
                <p className="text-xs text-muted-foreground mt-1">AI suggests 12% discount for keyboard category bulk buyers this week.</p>
             </CardContent>
           </Card>
        </div>

        <Card className="bg-black text-white border-0 shadow-xl overflow-hidden relative">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShoppingBag className="w-32 h-32" />
           </div>
           <CardContent className="pt-6 relative z-10">
              <p className="text-xs font-bold text-zinc-400 uppercase">Partner Orders</p>
              <h3 className="text-3xl font-bold mt-1">12 Orders</h3>
              <p className="text-[10px] mt-1 text-green-400 flex items-center gap-1 font-bold">
                 <TrendingDown className="w-3 h-3" /> Average margin 18.5%
              </p>
              <Button className="w-full mt-6 bg-white text-black hover:bg-zinc-200 font-bold text-xs">
                 View Shop Partner Requests
              </Button>
           </CardContent>
        </Card>
      </div>

      <div className="bg-background border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
           <h3 className="font-bold">Wholesale Price List</h3>
           <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Filter by category..." className="pl-10 h-9 text-xs" />
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
           {wholesaleItems.map(item => (
             <Card key={item.id} className="border-border hover:border-primary transition-all group">
                <CardContent className="p-4">
                   <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center font-bold text-xs">
                        {item.name[0]}
                      </div>
                      <Badge className="text-[10px] font-bold">Min. {item.minOrder} pcs</Badge>
                   </div>
                   <h5 className="font-bold text-sm group-hover:text-primary transition-colors">{item.name}</h5>
                   <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{item.category}</p>
                   
                   <div className="mt-6 flex items-end justify-between">
                      <div>
                         <p className="text-[10px] text-muted-foreground font-bold">Wholesale Price</p>
                         <p className="text-lg font-bold">৳{item.wholesalePrice.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] text-muted-foreground font-bold line-through">Retail ৳{item.retailValue.toLocaleString()}</p>
                         <p className="text-[10px] text-green-600 font-bold">Safe Margin 25%</p>
                      </div>
                   </div>
                   
                   <Button variant="ghost" className="w-full mt-4 h-9 group-hover:bg-primary group-hover:text-primary-foreground border border-border group-hover:border-primary justify-between font-bold text-xs">
                      Manage Listing
                      <ArrowRight className="w-4 h-4" />
                   </Button>
                </CardContent>
             </Card>
           ))}
        </div>
      </div>
    </div>
  );
};
