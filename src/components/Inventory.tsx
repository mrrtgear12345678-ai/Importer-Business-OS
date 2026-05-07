import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, Download, MoreHorizontal, Sparkles, Wand2, Calculator } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { buttonVariants } from '@/components/ui/button';
import { getAIPricingSuggestion } from '@/lib/ai';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // Example dummy data
  const products = [
    { id: '1', name: 'Anker PowerCore 20k', category: 'Electonics', stock: 12, cost: 3200, retail: 4500, wholesale: 4000 },
    { id: '2', name: 'Logitech MX Master 3', category: 'Computing', stock: 5, cost: 8500, retail: 12500, wholesale: 11000 },
    { id: '3', name: 'Keychron K2 V2', category: 'Computing', stock: 0, cost: 7200, retail: 9800, wholesale: 8800 },
    { id: '4', name: 'Xiaomi Mi Band 7', category: 'Wearables', stock: 45, cost: 2800, retail: 4200, wholesale: 3800 },
  ];

  const handleAIPriceOptimization = async (product: any) => {
    toast.promise(getAIPricingSuggestion(product.cost, product.category, product.retail), {
      loading: `AI analyzing ${product.name}...`,
      success: (data) => {
        return `Retail: ৳${data.suggestedRetail}, Wholesale: ৳${data.suggestedWholesale}. ${data.reasoning}`;
      },
      error: 'AI failed to analyze.'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-[#6B7280] text-sm">Monitor stock, manage pricing and optimize your products.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="gap-2 h-9 text-xs">
             <Download className="w-4 h-4" /> Export CSV
           </Button>
           <Button className="bg-black text-white gap-2 h-9 text-xs">
             <Plus className="w-4 h-4" /> Add Product
           </Button>
        </div>
      </div>

      <Card className="border-[#E5E7EB] shadow-sm">
        <CardHeader className="border-b border-[#F3F4F6] pb-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <Input 
                placeholder="Search products, SKUs, or categories..." 
                className="pl-10 h-10 border-[#E5E7EB] focus-visible:ring-black rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 h-10 text-xs">
                <Filter className="w-4 h-4" /> Filters
              </Button>
              <Button variant="secondary" size="sm" className="gap-2 h-10 text-xs px-4">
                <Sparkles className="w-4 h-4 text-purple-600" /> AI Stock Analysis
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#F9FAFB]">
              <TableRow className="hover:bg-transparent border-[#F3F4F6]">
                <TableHead className="w-[300px] font-semibold text-xs text-[#6B7280]">PRODUCT</TableHead>
                <TableHead className="font-semibold text-xs text-[#6B7280]">CATEGORY</TableHead>
                <TableHead className="font-semibold text-xs text-[#6B7280]">STOCK</TableHead>
                <TableHead className="font-semibold text-xs text-[#6B7280]">COST</TableHead>
                <TableHead className="font-semibold text-xs text-[#6B7280]">RETAIL</TableHead>
                <TableHead className="font-semibold text-xs text-[#6B7280]">STATUS</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F3F4F6] rounded-lg flex items-center justify-center font-bold text-xs">
                        {product.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{product.name}</p>
                        <p className="text-[10px] text-[#6B7280]">SKU-{product.id}0023</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{product.category}</TableCell>
                  <TableCell className="text-sm font-medium">{product.stock} pcs</TableCell>
                  <TableCell className="text-sm text-[#6B7280]">৳{product.cost}</TableCell>
                  <TableCell className="text-sm font-bold">৳{product.retail}</TableCell>
                  <TableCell>
                    {product.stock === 0 ? (
                      <Badge variant="destructive" className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md">Out of Stock</Badge>
                    ) : product.stock < 10 ? (
                      <Badge variant="default" className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-[10px] uppercase font-bold px-2 py-0.5 rounded-md">Low Stock</Badge>
                    ) : (
                      <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100 text-[10px] uppercase font-bold px-2 py-0.5 rounded-md">In Stock</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
                        <MoreHorizontal className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl">
                        <DropdownMenuItem className="text-xs gap-2 py-2 cursor-pointer">
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-xs gap-2 py-2 text-purple-600 font-bold bg-purple-50 cursor-pointer"
                          onClick={() => handleAIPriceOptimization(product)}
                        >
                          <Wand2 className="w-3 h-3" /> Optimize Price (AI)
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-xs gap-2 py-2 cursor-pointer"
                          onClick={() => navigate('/calculators')}
                        >
                          <Calculator className="w-3 h-3" /> Calculate Margin
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs gap-2 py-2 text-red-600 cursor-pointer">
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
