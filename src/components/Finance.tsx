import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  Wallet,
  Download,
  CreditCard,
  Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const profitData = [
  { month: 'Jan', profit: 45000, revenue: 150000 },
  { month: 'Feb', profit: 52000, revenue: 180000 },
  { month: 'Mar', profit: 48000, revenue: 165000 },
  { month: 'Apr', profit: 61000, revenue: 210000 },
  { month: 'May', profit: 55000, revenue: 195000 },
];

const expenseCategory = [
  { name: 'Sourcing', value: 65 },
  { name: 'Logistics', value: 15 },
  { name: 'Salaries', value: 12 },
  { name: 'Marketing', value: 8 },
];

const COLORS = ['#000', '#6B7280', '#9CA3AF', '#E5E7EB'];

export const Finance = () => {
  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Finance & Profits</h1>
          <p className="text-muted-foreground text-sm">Real-time breakdown of revenue, costs and net profits.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-9 text-xs gap-2">
             <Calendar className="w-4 h-4" /> Custom Range
           </Button>
           <Button className="bg-primary text-primary-foreground gap-2 h-9 text-xs">
             <Download className="w-4 h-4" /> Financial Report (PDF)
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <SummaryCard title="Monthly Profit" value="৳55,200" trend="+8%" sub="from last month" icon={Wallet} />
         <SummaryCard title="Pending Payments" value="৳142,000" trend="-2%" negative sub="B2B Credit" icon={CreditCard} />
         <SummaryCard title="Operating Costs" value="৳32,500" trend="+4%" negative sub="Fixed Monthly" icon={Building} />
         <SummaryCard title="Total Ad Spend" value="৳12,000" trend="-15%" sub="Meta Ads" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border shadow-sm">
           <CardHeader>
              <CardTitle className="text-md font-bold">Revenue vs Net Profit</CardTitle>
           </CardHeader>
           <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={profitData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px' }} />
                    <Bar dataKey="revenue" fill="#000" radius={[4, 4, 0, 0]} barSize={40} />
                    <Bar dataKey="profit" fill="#10B981" radius={[4, 4, 0, 0]} barSize={40} />
                 </BarChart>
              </ResponsiveContainer>
           </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
           <CardHeader>
              <CardTitle className="text-md font-bold text-center">Expense Breakdown</CardTitle>
           </CardHeader>
           <CardContent className="flex flex-col items-center">
              <div className="h-[250px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                          data={expenseCategory}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                       >
                          {expenseCategory.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                       </Pie>
                       <Tooltip />
                    </PieChart>
                 </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2 w-full">
                 {expenseCategory.map((item, idx) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                          <span className="text-muted-foreground">{item.name}</span>
                       </div>
                       <span className="font-bold">{item.value}%</span>
                    </div>
                 ))}
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, trend, sub, icon: Icon, negative }: any) => (
   <Card className="border-border shadow-sm">
      <CardContent className="pt-6">
         <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-muted rounded-xl">
               <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className={cn(
               "flex items-center gap-1 text-[10px] font-bold",
               negative ? "text-red-500" : "text-green-500"
            )}>
               {negative ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
               {trend}
            </div>
         </div>
         <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
         <p className="text-xs font-medium text-muted-foreground mt-1">{title}</p>
         <p className="text-[10px] text-muted-foreground opacity-60 uppercase font-bold tracking-widest mt-2">{sub}</p>
      </CardContent>
   </Card>
);
