'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { Navbar } from './Navbar';
import { ReactNode } from 'react';

export function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Homepage uses marketing layout (Navbar), other pages use app layout (Sidebar + TopBar)
  const isHomepage = pathname === '/';

  if (isHomepage) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20">{children}</main>
      </div>
    );
  }

  // App layout for dashboard pages
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* TopBar */}
        <TopBar />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
