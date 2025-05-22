
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastProvider } from '@radix-ui/react-toast';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
        {children}
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}
