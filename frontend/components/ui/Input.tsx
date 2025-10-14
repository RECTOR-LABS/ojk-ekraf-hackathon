import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const inputStyles = `
      w-full px-4 py-3
      border rounded-lg
      focus:outline-none focus:ring-2
      placeholder:text-neutral-400
      disabled:bg-neutral-100 disabled:cursor-not-allowed
      transition-colors duration-200
      ${
        error
          ? 'border-error-500 focus:ring-error-500 focus:border-error-500'
          : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500'
      }
      ${className}
    `;

    const containerStyles = fullWidth ? 'w-full' : '';

    return (
      <div className={containerStyles}>
        {label && (
          <label className="block text-sm font-medium text-neutral-900 mb-2">
            {label}
            {props.required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <input ref={ref} className={inputStyles} {...props} />
        {error && (
          <p className="mt-1 text-sm text-error-600 flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-neutral-600">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
