import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { Inventory } from './components/Inventory';
import { ImportManager } from './components/ImportManager';
import { Orders } from './components/Orders';
import { B2BWholesale } from './components/B2BWholesale';
import { Customers } from './components/Customers';
import { SalesCRM } from './components/SalesCRM';
import { Finance } from './components/Finance';
import { AIInsights } from './components/AIInsights';
import { Calculators } from './components/Calculators';
import { TooltipProvider } from './components/ui/tooltip';
import { ThemeProvider } from './contexts/ThemeContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="h-screen w-screen flex items-center justify-center font-bold tracking-tighter text-3xl">SHOPON.</div>;
  if (!user) return <Navigate to="/login" />;
  
  return <DashboardLayout>{children}</DashboardLayout>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/inventory" element={<PrivateRoute><Inventory /></PrivateRoute>} />
      <Route path="/import" element={<PrivateRoute><ImportManager /></PrivateRoute>} />
      <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
      <Route path="/wholesale" element={<PrivateRoute><B2BWholesale /></PrivateRoute>} />
      <Route path="/customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
      <Route path="/sales-crm" element={<PrivateRoute><SalesCRM /></PrivateRoute>} />
      <Route path="/finance" element={<PrivateRoute><Finance /></PrivateRoute>} />
      <Route path="/calculators" element={<PrivateRoute><Calculators /></PrivateRoute>} />
      <Route path="/ai-insights" element={<PrivateRoute><AIInsights /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <AppRoutes />
              <Toaster />
            </Suspense>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}
