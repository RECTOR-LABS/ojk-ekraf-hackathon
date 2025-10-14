'use client';

import { motion } from 'framer-motion';
import { InputHTMLAttributes, useState, forwardRef } from 'react';

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      if (props.onBlur) props.onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      if (props.onChange) props.onChange(e);
    };

    const isLabelFloating = isFocused || hasValue;

    return (
      <div className={`relative ${className}`}>
        {/* Input */}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl
            bg-glass-bg backdrop-blur-md
            border ${error ? 'border-red-500/50' : 'border-glass-border'}
            text-foreground placeholder-transparent
            focus:outline-none focus:ring-2
            ${error ? 'focus:ring-red-500/30' : 'focus:ring-purple-500/30'}
            transition-all duration-300
          `}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />

        {/* Floating Label */}
        {label && (
          <motion.label
            className={`
              absolute left-4 pointer-events-none
              transition-all duration-300
              ${error ? 'text-red-400' : isFocused ? 'text-purple-400' : 'text-foreground/60'}
            `}
            animate={{
              top: isLabelFloating ? '-0.5rem' : '0.75rem',
              fontSize: isLabelFloating ? '0.75rem' : '1rem',
              backgroundColor: isLabelFloating ? 'rgba(10, 10, 15, 0.9)' : 'transparent',
              paddingLeft: isLabelFloating ? '0.5rem' : '0',
              paddingRight: isLabelFloating ? '0.5rem' : '0',
            }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>
        )}

        {/* Error Message */}
        {error && (
          <motion.p
            className="mt-1 text-sm text-red-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}

        {/* Focus Glow Effect */}
        {isFocused && !error && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';
