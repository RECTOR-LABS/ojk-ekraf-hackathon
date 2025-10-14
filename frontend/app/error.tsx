'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-error-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h2 className="text-2xl font-bold text-neutral-900 mb-3">
          Something went wrong!
        </h2>
        <p className="text-neutral-600 mb-6">
          An unexpected error occurred while rendering this page. Please try again or contact support if the problem persists.
        </p>

        {/* Error Details (Development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg text-left">
            <p className="text-sm font-semibold text-error-900 mb-2">Error Details:</p>
            <p className="text-xs text-error-700 font-mono break-all">
              {error.message || 'Unknown error'}
            </p>
            {error.digest && (
              <p className="text-xs text-error-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            variant="primary"
            size="medium"
          >
            Try Again
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="secondary"
            size="medium"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
