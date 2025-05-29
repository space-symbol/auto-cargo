import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { queryClient } from '@/lib/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ROUTES } from '@/config/routes';
import Layout from '@/components/layout/Layout';
import Index from '@/pages/Index';
import CargoRequest from '@/pages/CargoRequest';
import CargoRequestSubmission from '@/pages/CargoRequestSubmission';
import Profile from '@/pages/Profile';
import CargoRequestsList from '@/pages/CargoRequestsList';
import NotFound from '@/pages/NotFound';
import { CargoCalculationProvider } from '@/contexts/CargoCalculationContext';
import { AuthProvider, useAuth } from '@/lib/auth/AuthProvider';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { RequestsPage } from '@/pages/admin/RequestsPage';
import { StatisticsPage } from '@/pages/admin/StatisticsPage';
import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { TariffsPage } from '@/pages/admin/TariffsPage';
import Reports from '@/pages/admin/Reports';
import { UsersPage } from '@/pages/admin/UsersPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
  requireAuth?: boolean;
}

function ProtectedRoute({ children, roles, requireAuth = true }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (requireAuth && !user) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CargoCalculationProvider>
            <AuthProvider>
              <Router>
                <Routes>
                  <Route path={ROUTES.HOME} element={<Index />} />
                  <Route path={ROUTES.LOGIN} element={
                    <Layout>
                      <AuthWrapper>
                        <LoginPage />
                      </AuthWrapper>
                    </Layout>
                  } />
                  <Route path={ROUTES.REGISTER} element={
                    <Layout>
                      <AuthWrapper>
                        <RegisterPage />
                      </AuthWrapper>
                    </Layout>
                  } />
                  <Route
                    path={ROUTES.CARGO_REQUEST}
                    element={
                      <ProtectedRoute>
                        <Layout>
                          <CargoRequest />
                        </Layout>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTES.CARGO_REQUEST_SUBMISSION}
                    element={
                      <ProtectedRoute>
                        <Layout>
                          <CargoRequestSubmission />
                        </Layout>
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
                    path={ROUTES.MY_REQUESTS}
                    element={
                      <ProtectedRoute>
                        <Layout>
                          <CargoRequestsList />
                        </Layout>
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute roles={['ADMIN', 'MANAGER']}>
                        <Layout>
                          <Outlet />
                        </Layout>
                      </ProtectedRoute>
                    }
                  >
                    <Route
                      path="requests"
                      element={
                        <ProtectedRoute roles={['ADMIN', 'MANAGER']}>
                          <RequestsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="statistics"
                      element={
                        <ProtectedRoute roles={['ADMIN']}>
                          <StatisticsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="tariffs"
                      element={
                        <ProtectedRoute roles={['ADMIN']}>
                          <TariffsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="reports"
                      element={
                        <ProtectedRoute roles={['ADMIN']}>
                          <Reports />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="users"
                      element={
                        <ProtectedRoute roles={['ADMIN']}>
                          <UsersPage />
                        </ProtectedRoute>
                      }
                    />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster position="top-right" />
              </Router>
            </AuthProvider>
          </CargoCalculationProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
