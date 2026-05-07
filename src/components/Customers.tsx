import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Mail, Phone, MapPin, MoreHorizontal, UserCheck, UserPlus, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

const customers = [
  { id: '1', name: 'Karim Ullah', email: 'karim@gmail.com', phone: '01712345678', type: 'B2B', address: 'Dhanmondi, Dhaka', totalOrders: 12, spent: 450200 },
  { id: '2', name: 'Nabila Ahmed', email: 'nabila@outlook.com', phone: '01811223344', type: 'B2C', address: 'Uttara, Dhaka', totalOrders: 3, spent: 12400 },
  { id: '3', name: 'Shopon Sheikh', email: 'sheikh@shopon.com', phone: '01911334455', type: 'B2B', address: 'Chattogram', totalOrders: 25, spent: 1250000 },
  { id: '4', name: 'Rakib Hossain', email: 'rakib@yahoo.com', phone: '01511223311', type: 'B2C', address: 'Sylhet', totalOrders: 1, spent: 850 },
];

export const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customer CRM</h1>
          <p className="text-muted-foreground text-sm">Manage your retail (B2C) and shop (B2B) relationships.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button className="bg-primary text-primary-foreground gap-2 h-9 text-xs">
             <UserPlus className="w-4 h-4" /> Add Customer
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsTile title="Active Customers" value="842" trend="+12%" icon={UserCheck} />
        <StatsTile title="B2B Shop Owners" value="124" trend="+5%" icon={UserPlus} />
        <StatsTile title="Total B2C Clients" value="718" trend="+15%" icon={UserCheck} />
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="border-b border-border pb-4">
           <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search customers by name, email or phone..." 
                className="pl-10 h-10 border-border focus-visible:ring-primary rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 h-10 text-xs">
                <Filter className="w-4 h-4" /> B2B Only
              </Button>
              <Button variant="outline" size="sm" className="gap-2 h-10 text-xs">
                <Filter className="w-4 h-4" /> B2C Only
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="font-semibold text-xs text-muted-foreground">CUSTOMER</TableHead>
                <TableHead className="font-semibold text-xs text-muted-foreground">CONTACT</TableHead>
                <TableHead className="font-semibold text-xs text-muted-foreground">TYPE</TableHead>
                <TableHead className="font-semibold text-xs text-muted-foreground">ORDERS</TableHead>
                <TableHead className="font-semibold text-xs text-muted-foreground">TOTAL SPENT</TableHead>
                <TableHead className="font-semibold text-xs text-muted-foreground">LOCATION</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id} className="border-border hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-border">
                        <AvatarFallback className="text-xs font-bold">{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-sm">{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Mail className="w-3 h-3" /> {customer.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3" /> {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(
                      "text-[10px] font-bold",
                      customer.type === 'B2B' ? "border-blue-200 text-blue-700 bg-blue-50/50" : "border-green-200 text-green-700 bg-green-50/50"
                    )}>
                      {customer.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{customer.totalOrders}</TableCell>
                  <TableCell className="text-sm font-bold">৳{customer.spent.toLocaleString()}</TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[150px] truncate">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {customer.address}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                       <MoreHorizontal className="w-4 h-4" />
                    </Button>
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

const StatsTile = ({ title, value, trend, icon: Icon }: any) => (
  <Card className="border-border shadow-sm">
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
           <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
           <h3 className="text-2xl font-bold">{value}</h3>
           <p className="text-[10px] text-green-600 font-bold">{trend} from last month</p>
        </div>
        <div className="p-3 bg-muted rounded-2xl">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </CardContent>
  </Card>
);
