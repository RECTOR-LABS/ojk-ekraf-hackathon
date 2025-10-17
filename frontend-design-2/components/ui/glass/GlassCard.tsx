'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'interactive';
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className = '',
  variant = 'default',
  hover = false,
  onClick,
}: GlassCardProps) {
  const baseClasses = 'glass rounded-2xl';

  const variantClasses = {
    default: 'p-6',
    elevated: 'p-8 shadow-2xl',
    interactive: 'p-6 cursor-pointer',
  };

  const hoverClasses = hover || variant === 'interactive' ? 'glass-hover' : '';

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={
        hover || variant === 'interactive'
          ? {
              scale: 1.02,
              transition: { duration: 0.2 },
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
