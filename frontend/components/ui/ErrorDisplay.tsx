/**
 * ErrorDisplay Component
 * Displays user-friendly error messages with optional actions
 */

import { AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from './button';
import type { UserFriendlyError } from '@/lib/utils/errors';

interface ErrorDisplayProps {
  error: UserFriendlyError;
  onRetry?: () => void;
  className?: string;
}

export function ErrorDisplay({ error, onRetry, className = '' }: ErrorDisplayProps) {
  const handleAction = () => {
    if (error.action?.onClick) {
      error.action.onClick();
    } else if (error.action?.href) {
      window.open(error.action.href, '_blank', 'noopener,noreferrer');
    } else if (onRetry) {
      onRetry();
    }
  };

  return (
    <div className={`bg-error-50 border border-error-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-error-900 mb-1">
            {error.title}
          </h4>
          <p className="text-sm text-error-700 mb-3">
            {error.message}
          </p>
          {(error.action || onRetry) && (
            <Button
              onClick={handleAction}
              variant="secondary"
              size="sm"
              className="inline-flex items-center gap-2"
            >
              {error.action?.label || 'Try Again'}
              {error.action?.href && <ExternalLink className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Inline Error Message (for form validation)
 */
interface InlineErrorProps {
  message: string;
  className?: string;
}

export function InlineError({ message, className = '' }: InlineErrorProps) {
  return (
    <div className={`flex items-center gap-2 text-sm text-error-600 mt-1 ${className}`}>
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}
