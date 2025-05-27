import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/config/routes';
import { useAuth } from '@/lib/auth/AuthProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
  <Link 
    to={href} 
    className={cn("text-foreground hover:text-primary transition-colors font-medium", className)}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-company-primary flex items-center justify-center text-white font-bold">
              ТВ
            </div>
            <span className="font-bold text-company-dark hidden sm:inline-block">
              ТРЭНС ВЭСТОР
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink href={ROUTES.HOME}>Главная</NavLink>
          <NavLink href={ROUTES.CARGO_REQUEST}>Оформить заявку</NavLink>
          {isAuthenticated && (
            <NavLink href="/my-requests">Мои заявки</NavLink>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{user?.firstName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Профиль</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-requests">Мои заявки</Link>
                </DropdownMenuItem>
                {(user?.role === 'ADMIN' || user?.role === 'MANAGER') && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin/requests">Заявки</Link>
                    </DropdownMenuItem>
                    {user?.role === 'ADMIN' && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin/statistics">Статистика</Link>
                      </DropdownMenuItem>
                    )}
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to={ROUTES.LOGIN}>Войти</Link>
              </Button>
              <Button asChild>
                <Link to={ROUTES.REGISTER}>Регистрация</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Открыть меню</span>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-slide-in">
          <div className="pt-2 pb-4 px-4 space-y-1 bg-background border-b border-border/40">
            <Link to={ROUTES.HOME} className="block px-3 py-2 text-base font-medium hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>
              Главная
            </Link>
            <Link to={ROUTES.CARGO_REQUEST} className="block px-3 py-2 text-base font-medium hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>
              Оформить заявку
            </Link>
            {isAuthenticated && (
              <Link to="/my-requests" className="block px-3 py-2 text-base font-medium hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Мои заявки
              </Link>
            )}
            <div className="mt-4 flex flex-col gap-2 px-3">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="block px-3 py-2 text-base font-medium hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>
                    Профиль
                  </Link>
                  {(user?.role === 'ADMIN' || user?.role === 'MANAGER') && (
                    <>
                      <Link to="/admin/requests" className="block px-3 py-2 text-base font-medium hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>
                        Заявки
                      </Link>
                      {user?.role === 'ADMIN' && (
                        <Link to="/admin/statistics" className="block px-3 py-2 text-base font-medium hover:bg-muted rounded-md" onClick={() => setMobileMenuOpen(false)}>
                          Статистика
                        </Link>
                      )}
                    </>
                  )}
                  <Button variant="outline" className="w-full justify-center" onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}>
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full justify-center">
                    <Link to={ROUTES.LOGIN} onClick={() => setMobileMenuOpen(false)}>Войти</Link>
                  </Button>
                  <Button asChild className="w-full justify-center">
                    <Link to={ROUTES.REGISTER} onClick={() => setMobileMenuOpen(false)}>Регистрация</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
