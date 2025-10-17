'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { Navbar } from './Navbar';
import { ReactNode } from 'react';

export function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Marketing pages use Navbar layout, app pages use Sidebar + TopBar layout
  const isMarketingPage = pathname === '/' || pathname === '/pitch-deck';

  if (isMarketingPage) {
    return (
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="pt-16 sm:pt-20 overflow-x-hidden">{children}</main>
      </div>
    );
  }

  // App layout for dashboard pages
  return (
    <div className="flex min-h-screen overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TopBar */}
        <TopBar />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
