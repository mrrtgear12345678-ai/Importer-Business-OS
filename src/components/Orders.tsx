import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle,
  MoreVertical
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const orders = [
  { id: 'ORD-7721', customer: 'Karim Bazaar', type: 'B2B', amount: 54200, status: 'pending', date: '2024-05-07' },
  { id: 'ORD-7722', customer: 'Abdur Rahman', type: 'B2C', amount: 3200, status: 'shipped', date: '2024-05-07' },
  { id: 'ORD-7723', customer: 'Shopon Electronics', type: 'B2B', amount: 125000, status: 'packed', date: '2024-05-06' },
  { id: 'ORD-7724', customer: 'Muna Fashion', type: 'B2C', amount: 1200, status: 'delivered', date: '2024-05-06' },
  { id: 'ORD-7725', customer: 'Janata Store', type: 'B2B', amount: 45000, status: 'cancelled', date: '2024-05-05' },
];

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  packed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  shipped: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  delivered: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const statusIcons: Record<string, any> = {
  pending: Clock,
  packed: CheckCircle2,
  shipped: Truck,
  delivered: CheckCircle2,
  cancelled: XCircle,
};

export const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Order Management</h1>
          <p className="text-muted-foreground text-sm">Track and manage all retail and wholesale orders.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="gap-2 h-9 text-xs">
             <Download className="w-4 h-4" /> Export
           </Button>
           <Button className="bg-primary text-primary-foreground gap-2 h-9 text-xs">
             New Order
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <OrderStatsCard title="Pending" value="12" icon={Clock} color="text-yellow-600" />
        <OrderStatsCard title="Packed" value="8" icon={CheckCircle2} color="text-blue-600" />
        <OrderStatsCard title="Shipped" value="24" icon={Truck} color="text-purple-600" />
        <OrderStatsCard title="Delivered Today" value="45" icon={CheckCircle2} color="text-green-600" />
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search orders, customers, or IDs..." 
                className="pl-10 h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2 h-10">
              <Filter className="w-4 h-4" /> Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="w-[120px] font-semibold text-xs text-muted-foreground">ORDER ID</TableHead>
                <TableHead className="font-semibold text-xs text-muted-foreground">CUSTOMER</TableHead>
                <TableHead className="font-semibold text-xs text-muted-foreground">TYPE</TableHead>
                <TableHead className="font-semibold text-xs text-muted-foreground">DATE</TableHead>
                <TableHead className="font-semibold text-xs text-muted-foreground">AMOUNT</TableHead>
                <TableHead className="font-semibold text-xs text-muted-foreground">STATUS</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="border-border hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium text-sm">{order.id}</TableCell>
                  <TableCell className="text-sm font-semibold">{order.customer}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(
                      "text-[10px] font-bold px-2 py-0",
                      order.type === 'B2B' ? "border-blue-200 text-blue-700 bg-blue-50/50" : "border-green-200 text-green-700 bg-green-50/50"
                    )}>
                      {order.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{order.date}</TableCell>
                  <TableCell className="text-sm font-bold">৳{order.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={cn("text-[10px] uppercase font-bold px-2 py-1 flex items-center gap-1 w-fit", statusStyles[order.status])}>
                      {React.createElement(statusIcons[order.status], { className: "w-3 h-3" })}
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
                        <MoreVertical className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Eye className="w-4 h-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer text-blue-600">
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          Print Invoice
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

const OrderStatsCard = ({ title, value, icon: Icon, color }: any) => (
  <Card className="border-border shadow-sm">
    <CardContent className="pt-6 flex items-center gap-4">
      <div className={cn("p-3 rounded-xl bg-muted", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold text-muted-foreground">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </CardContent>
  </Card>
);
