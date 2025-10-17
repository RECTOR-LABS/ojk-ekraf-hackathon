'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

export function PDFDownloadButton() {
  return (
    <motion.a
      href="/pitch-deck.pdf"
      download="KaryaChain-Pitch-Deck-OJK-Ekraf-2025.pdf"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed top-24 right-4 sm:right-6 z-50 glass rounded-full px-4 sm:px-6 py-3 flex items-center gap-2 hover:scale-105 transition-transform shadow-lg"
    >
      <Download className="w-5 h-5" />
      <span className="hidden lg:inline font-medium">Download PDF</span>
    </motion.a>
  );
}
