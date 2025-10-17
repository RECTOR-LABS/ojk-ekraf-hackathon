'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, XCircle } from 'lucide-react';
import { GlassCard } from './glass/GlassCard';
import { GlassButton } from './glass/GlassButton';

interface ErrorDisplayProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  variant?: 'error' | 'warning' | 'info';
  fullScreen?: boolean;
}

export function ErrorDisplay({
  title,
  message,
  onRetry,
  variant = 'error',
  fullScreen = false,
}: ErrorDisplayProps) {
  const variantConfig = {
    error: {
      icon: XCircle,
      iconColor: 'text-red-400',
      bgColor: 'from-red-600/10 to-red-600/5',
      borderColor: 'border-red-600/20',
    },
    warning: {
      icon: AlertCircle,
      iconColor: 'text-orange-400',
      bgColor: 'from-orange-600/10 to-orange-600/5',
      borderColor: 'border-orange-600/20',
    },
    info: {
      icon: AlertCircle,
      iconColor: 'text-blue-400',
      bgColor: 'from-blue-600/10 to-blue-600/5',
      borderColor: 'border-blue-600/20',
    },
  };

  const config = variantConfig[variant];
  const Icon = config.icon;

  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={fullScreen ? 'max-w-md w-full' : ''}
    >
      <GlassCard className={`bg-gradient-to-br ${config.bgColor} border ${config.borderColor}`}>
        <div className="flex items-start gap-4">
          <div
            className={`w-10 h-10 rounded-full bg-background/50 flex items-center justify-center flex-shrink-0`}
          >
            <Icon className={`w-5 h-5 ${config.iconColor}`} />
          </div>

          <div className="flex-1 space-y-3">
            {title && <h3 className="font-bold text-lg">{title}</h3>}
            <p className="text-foreground/70 text-sm leading-relaxed">{message}</p>

            {onRetry && (
              <div className="pt-2">
                <GlassButton variant="secondary" size="sm" onClick={onRetry}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </GlassButton>
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 p-6">
        {content}
      </div>
    );
  }

  return content;
}
