'use client';

import { ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  // Removed page transition animations for faster initial load
  return <>{children}</>;
}
