'use client';

import { motion } from 'framer-motion';
import { Presentation } from 'lucide-react';
import Link from 'next/link';

export function FloatingPitchDeckButton() {
  return (
    <Link href="/pitch-deck">
      <motion.div
        className="fixed bottom-6 right-6 z-40 group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulsing Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 opacity-75 blur-lg"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.75, 0.9, 0.75],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Button Content */}
        <div className="relative glass rounded-full px-6 py-4 flex items-center gap-3 shadow-xl border-2 border-purple-500/30 group-hover:border-purple-500/60 transition-all">
          <Presentation className="w-5 h-5 text-purple-400" />
          <span className="font-semibold text-foreground whitespace-nowrap">
            View Pitch Deck
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
