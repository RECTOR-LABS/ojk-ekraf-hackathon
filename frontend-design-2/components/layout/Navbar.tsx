'use client';

import { motion } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Marketplace', href: '/marketplace' },
];

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between min-h-[52px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 min-h-[44px]">
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="w-6 h-6 text-white" />
            </motion.div>
            <h1 className="text-lg sm:text-xl font-bold gradient-text">KaryaChain</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/70 hover:text-foreground transition-colors py-2 min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="min-h-[44px] flex items-center">
              <LanguageSwitcher />
            </div>
            <Link href="/register">
              <GlassButton variant="primary">Get Started</GlassButton>
            </Link>
          </div>

          {/* Mobile Menu Toggle - Only on mobile */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex md:!hidden glass rounded-lg p-3 min-h-[44px] min-w-[44px] items-center justify-center"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <motion.div
            className="md:hidden mt-4 pb-4 space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block text-foreground/70 hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex justify-center">
              <LanguageSwitcher />
            </div>
            <Link href="/register" onClick={() => setIsMobileOpen(false)}>
              <GlassButton variant="primary" fullWidth>
                Get Started
              </GlassButton>
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
