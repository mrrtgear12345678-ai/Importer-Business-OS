import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  Trophy, 
  Target, 
  DollarSign, 
  TrendingUp, 
  Briefcase,
  ChevronRight,
  MoreVertical,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

const agents = [
  { id: '1', name: 'Tanvir Ahmed', revenue: 450000, commission: 22500, customers: 45, progress: 85, rank: 1 },
  { id: '2', name: 'Farhan Kabir', revenue: 380000, commission: 19000, customers: 38, progress: 72, rank: 2 },
  { id: '3', name: 'Zayed Khan', revenue: 290000, commission: 14500, customers: 29, progress: 45, rank: 3 },
  { id: '4', name: 'Raisa Islam', revenue: 210000, commission: 10500, customers: 21, progress: 30, rank: 4 },
];

export const SalesCRM = () => {
  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales Team CRM</h1>
          <p className="text-muted-foreground text-sm">Track agent performance, leads, and commissions.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-9 text-xs">Commission Rules</Button>
           <Button className="bg-primary text-primary-foreground gap-2 h-9 text-xs">
             <Briefcase className="w-4 h-4" /> Add Agent
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <MetricCard title="Team Target" value="৳2.5M" progress={65} icon={Target} color="text-blue-600" />
         <MetricCard title="Total Revenue" value="৳1.6M" icon={TrendingUp} color="text-green-600" />
         <MetricCard title="Total Commission" value="৳80k" icon={DollarSign} color="text-purple-600" />
         <MetricCard title="Active Agents" value="12" icon={Users} color="text-orange-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border shadow-sm">
          <CardHeader>
             <CardTitle className="text-md font-bold">Agent Performance Leaderboard</CardTitle>
             <CardDescription>Monthly data based on completed orders.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="w-[80px] font-semibold text-xs text-muted-foreground">RANK</TableHead>
                  <TableHead className="font-semibold text-xs text-muted-foreground">AGENT NAME</TableHead>
                  <TableHead className="font-semibold text-xs text-muted-foreground">REVENUE</TableHead>
                  <TableHead className="font-semibold text-xs text-muted-foreground">CUSTOMERS</TableHead>
                  <TableHead className="font-semibold text-xs text-muted-foreground">COMMISSION</TableHead>
                  <TableHead className="w-[150px] font-semibold text-xs text-muted-foreground">GOAL</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent.id} className="border-border hover:bg-muted/30">
                    <TableCell>
                      {agent.rank === 1 ? (
                        <div className="bg-yellow-100 text-yellow-700 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs border border-yellow-200">
                          <Trophy className="w-3 h-3" />
                        </div>
                      ) : (
                        <span className="text-sm font-medium text-muted-foreground ml-2">{agent.rank}</span>
                      )}
                    </TableCell>
                    <TableCell className="font-bold text-sm">{agent.name}</TableCell>
                    <TableCell className="text-sm font-semibold">৳{agent.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-sm">{agent.customers}</TableCell>
                    <TableCell className="text-sm font-bold text-green-600">৳{agent.commission.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={agent.progress} className="h-1.5" />
                        <span className="text-[10px] text-muted-foreground">{agent.progress}% achieved</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="icon" className="h-8 w-8">
                         <ChevronRight className="w-4 h-4" />
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-md font-bold text-orange-600 flex items-center gap-2">
              <Star className="w-4 h-4 fill-current" />
              Agent of the Month
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6 text-center">
             <div className="w-20 h-20 rounded-full bg-orange-100 border-4 border-white shadow-lg flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-orange-600" />
             </div>
             <h3 className="text-lg font-bold">Tanvir Ahmed</h3>
             <p className="text-xs text-muted-foreground mb-4">Regional Sales Head</p>
             <div className="grid grid-cols-2 gap-4 w-full mt-4">
                <div className="bg-muted p-3 rounded-xl">
                   <p className="text-[10px] font-bold text-muted-foreground uppercase">Revenue</p>
                   <p className="text-sm font-bold tracking-tight">৳450k</p>
                </div>
                <div className="bg-muted p-3 rounded-xl">
                   <p className="text-[10px] font-bold text-muted-foreground uppercase">Win Rate</p>
                   <p className="text-sm font-bold tracking-tight">92%</p>
                </div>
             </div>
             <Button variant="outline" className="w-full mt-6 h-10 border-orange-200 text-orange-700 hover:bg-orange-50 font-bold">
               Team Shoutout
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, progress, icon: Icon, color }: any) => (
  <Card className="border-border shadow-sm">
    <CardContent className="pt-6">
       <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase">{title}</p>
          <Icon className={cn("w-4 h-4", color)} />
       </div>
       <div className="space-y-3">
          <h3 className="text-2xl font-bold font-sans tracking-tight">{value}</h3>
          {progress !== undefined && (
            <div className="space-y-1">
              <Progress value={progress} className="h-1 bg-muted" />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                 <span>Achieved</span>
                 <span>{progress}%</span>
              </div>
            </div>
          )}
       </div>
    </CardContent>
  </Card>
);
