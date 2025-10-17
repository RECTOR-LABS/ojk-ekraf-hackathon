'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SlideContentProps {
  children: ReactNode;
  className?: string;
}

export function SlideContent({ children, className }: SlideContentProps) {
  return (
    <div className="min-h-screen w-full flex-shrink-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn('max-w-7xl w-full', className)}
      >
        {children}
      </motion.div>
    </div>
  );
}
