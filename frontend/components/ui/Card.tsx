import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'featured' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      padding = 'medium',
      hoverable = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-xl transition-all duration-200';

    const variantStyles = {
      default: 'bg-white border border-neutral-200 shadow-sm',
      featured: 'bg-white border-2 border-primary-500 shadow-md',
      elevated: 'bg-white border border-neutral-200 shadow-lg',
      outlined: 'bg-white border-2 border-neutral-300',
    };

    const paddingStyles = {
      none: '',
      small: 'p-4',
      medium: 'p-6',
      large: 'p-8',
    };

    const hoverStyles = hoverable
      ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
      : '';

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`;

    return (
      <div ref={ref} className={combinedClassName} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
