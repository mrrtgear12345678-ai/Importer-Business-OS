import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles
} from 'lucide-react';
import { collection, query, limit, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const data = [
  { name: 'Mon', revenue: 4000, orders: 24 },
  { name: 'Tue', revenue: 3000, orders: 18 },
  { name: 'Wed', revenue: 2000, orders: 12 },
  { name: 'Thu', revenue: 2780, orders: 22 },
  { name: 'Fri', revenue: 1890, orders: 15 },
  { name: 'Sat', revenue: 2390, orders: 19 },
  { name: 'Sun', revenue: 3490, orders: 28 },
];

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    activeCustomers: 0
  });

  useEffect(() => {
    // Mock simple counts for initial load
    setStats({
      totalSales: 45290,
      totalOrders: 142,
      totalProducts: 85,
      activeCustomers: 240
    });
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Dashboard</h1>
          <p className="text-[#6B7280] text-sm">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
           <Button size="sm" variant="outline" className="text-xs h-8">Last 7 Days</Button>
           <Button size="sm" variant="outline" className="text-xs h-8">Export PDF</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`৳${stats.totalSales.toLocaleString()}`} 
          change="+12.5%" 
          trend="up" 
          icon={TrendingUp} 
        />
        <StatCard 
          title="Orders" 
          value={stats.totalOrders.toString()} 
          change="+8.2%" 
          trend="up" 
          icon={ShoppingCart} 
        />
        <StatCard 
          title="Inventory Items" 
          value={stats.totalProducts.toString()} 
          change="-2" 
          trend="down" 
          icon={Package} 
        />
        <StatCard 
          title="Customers" 
          value={stats.activeCustomers.toString()} 
          change="+4" 
          trend="up" 
          icon={Users} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-[#E5E7EB] shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <CardTitle className="text-md font-semibold font-sans">Sales Performance</CardTitle>
            <div className="flex items-center gap-2 text-xs text-[#6B7280]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-black"></div>
                Revenue
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#000" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-[#E5E7EB] shadow-sm">
          <CardHeader>
            <CardTitle className="text-md font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              AI Inventory Tip
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="text-xs text-purple-900 leading-relaxed font-medium">
                "Sales for 'Cotton Polo Shirts' are up by 24% in B2C. Stock is currently at 15 units. Suggest restocking 50 units before next weekend."
              </p>
              <Button size="sm" className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-xs h-8">
                Create Restock Order
              </Button>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Top Moving Items</h4>
              <div className="space-y-3">
                <TopItem name="Anker PowerBank" price="৳2,400" qty="45" />
                <TopItem name="Baseus Cable 2m" price="৳850" qty="38" />
                <TopItem name="T-Shirt XL Gray" price="৳1,200" qty="32" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, trend, icon: Icon }: any) => (
  <Card className="border-[#E5E7EB] shadow-sm hover:border-black transition-colors">
    <CardContent className="pt-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-[#6B7280]">{title}</span>
        <div className="p-2 bg-[#F9FAFB] rounded-lg">
          <Icon className="w-4 h-4 text-black" />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold">{value}</h3>
        <span className={cn(
          "text-xs font-medium flex items-center",
          trend === 'up' ? "text-green-600" : "text-red-600"
        )}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
          {change}
        </span>
      </div>
    </CardContent>
  </Card>
);

const TopItem = ({ name, price, qty }: any) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-semibold">{name}</p>
      <p className="text-[10px] text-[#6B7280]">{price}</p>
    </div>
    <div className="text-right">
      <p className="text-sm font-medium">{qty}</p>
      <p className="text-[10px] text-green-600 font-bold uppercase">Moving Fast</p>
    </div>
  </div>
);
