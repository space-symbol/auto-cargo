import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ROUTES } from '@/config/routes';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Layout from '@/components/layout/Layout';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import CargoRequest from './pages/CargoRequest';
import NotFound from './pages/NotFound';
import CargoRequestSubmission from '@/pages/CargoRequestSubmission';
import Profile from '@/pages/Profile';
import CargoRequestsList from '@/pages/CargoRequestsList';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router>
            <Routes>
              <Route path={ROUTES.HOME} element={<Index />} />
              <Route path={ROUTES.LOGIN} element={
                <Layout>
                  <Login />
                </Layout>
              } />
              <Route path={ROUTES.REGISTER} element={<Register />} />
              <Route path={ROUTES.CARGO_REQUEST} element={<CargoRequest />} />
              <Route 
                path="/request-submission" 
                element={
                  <ProtectedRoute>
                    <CargoRequestSubmission />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path={ROUTES.PROFILE} 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/my-requests" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <CargoRequestsList />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster position="top-right" />
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
