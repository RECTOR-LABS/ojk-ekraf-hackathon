import React from 'react';

export interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'white' | 'neutral';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  color = 'primary',
  className = '',
}) => {
  const sizeStyles = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  const colorStyles = {
    primary: 'border-primary-600',
    secondary: 'border-secondary-600',
    white: 'border-white',
    neutral: 'border-neutral-600',
  };

  const spinnerClassName = `${sizeStyles[size]} ${colorStyles[color]} ${className} animate-spin rounded-full border-4 border-t-transparent`;

  return (
    <div className="inline-flex items-center justify-center">
      <div className={spinnerClassName} role="status" aria-label="loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

Spinner.displayName = 'Spinner';
