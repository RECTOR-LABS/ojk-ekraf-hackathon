'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass/GlassCard';

export function PitchDeckHero() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };
  return (
    <section className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-background to-blue-950/20" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl w-full text-center space-y-8 sm:space-y-12"
      >
        {/* Main Title */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold"
          >
            Karya<span className="gradient-text">Chain</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl lg:text-3xl text-foreground/80"
          >
            Pitch Deck
          </motion.p>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard variant="elevated" className="p-6 sm:p-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Blockchain-Powered Copyright Protection
              </h2>
              <p className="text-lg sm:text-xl text-foreground/70">
                for Indonesian Creators
              </p>
              <div className="pt-4 space-y-2 text-sm sm:text-base text-foreground/60">
                <p>OJK-Ekraf Infinity Hackathon 2025</p>
                <p>Digital Rights & Authentication</p>
                <p className="font-mono text-purple-400">
                  karyachain.rectorspace.com
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={scrollToContent}
          className="glass px-8 py-4 rounded-xl text-lg font-medium hover:scale-105 transition-transform inline-flex items-center gap-3"
        >
          <span>View Presentation</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </motion.button>
      </motion.div>
    </section>
  );
}
