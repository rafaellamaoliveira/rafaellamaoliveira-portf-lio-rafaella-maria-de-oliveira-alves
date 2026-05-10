import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  onOpenAdmin?: () => void;
}

export function MainLayout({ children, onOpenAdmin }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col p-6">
      <Navbar onOpenAdmin={onOpenAdmin} />
      <main className="flex-grow my-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}

