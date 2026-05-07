import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  Sparkles,
  LayoutDashboard,
  Truck,
  DollarSign,
  Briefcase,
  Moon,
  Sun,
  Calculator
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Import Manager', href: '/import', icon: Briefcase },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'B2B Wholesale', href: '/wholesale', icon: Truck },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Sales Team', href: '/sales-crm', icon: Briefcase },
  { name: 'Finance', href: '/finance', icon: DollarSign },
  { name: 'Calculators', href: '/calculators', icon: Calculator },
  { name: 'AI Insights', href: '/ai-insights', icon: Sparkles },
];

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-background text-foreground font-sans transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col hidden md:flex">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <Package className="text-white dark:text-black w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">Shopon OS</span>
          </div>
          
          <nav className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl transition-all",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )
                }
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-border">
          <div className="flex items-center justify-between mb-4 px-3">
             <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Theme</span>
             <Button 
               variant="ghost" 
               size="icon" 
               className="h-8 w-8 rounded-full"
               onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
             >
               {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
             </Button>
          </div>
          <Separator className="mb-4" />
          <div className="flex items-center gap-3 px-3 py-4 mb-2">
            <div className="w-8 h-8 rounded-full bg-muted overflow-hidden flex-shrink-0">
               {user?.photoURL ? (
                 <img src={user.photoURL} alt={user.displayName || ''} />
               ) : (
                 <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-white text-xs">
                   {user?.displayName?.[0] || 'A'}
                 </div>
               )}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate leading-tight">{user?.displayName || 'User'}</p>
              <p className="text-[10px] text-muted-foreground truncate uppercase font-bold tracking-widest opacity-60">Admin Access</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 font-bold text-xs"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-8 sticky top-0 z-50">
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" className="md:hidden">
               <Menu className="w-5 h-5 text-foreground" />
             </Button>
             <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Shopon / OS</h2>
          </div>
          <div className="flex items-center gap-4">
             <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 rounded-full border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground font-bold transition-all px-4 h-9">
               <Sparkles className="w-4 h-4" />
               AI Assistant
             </Button>
             <Separator orientation="vertical" className="h-6" />
             <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-green-500/10 text-green-600 px-3 py-1 rounded-full uppercase tracking-widest border border-green-500/20">System Live</span>
             </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
