'use client';

import { motion } from 'framer-motion';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { Zap, Check, Loader2 } from 'lucide-react';

export function TransactionStep() {
  // TODO: Implement blockchain transaction logic with wagmi

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Register on Blockchain</h2>
        <p className="text-foreground/70">
          Submit your copyright registration to the Ethereum blockchain.
        </p>
      </div>

      {/* Transaction Steps */}
      <div className="space-y-4">
        <GlassCard>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold mb-1">Transaction Details</h3>
              <div className="space-y-2 text-sm text-foreground/70">
                <div className="flex justify-between">
                  <span>Gas Fee (estimated):</span>
                  <span className="font-semibold text-foreground">~0.002 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span>Network:</span>
                  <span className="font-semibold text-foreground">Sepolia Testnet</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Placeholder - To be implemented */}
      <motion.div
        className="glass rounded-xl p-8 border-2 border-yellow-600/30 bg-yellow-600/5 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Loader2 className="w-12 h-12 mx-auto mb-4 text-yellow-400 animate-spin" />
        <h3 className="text-xl font-bold mb-2">Blockchain Integration In Progress</h3>
        <p className="text-sm text-foreground/70">
          This step will be connected to smart contracts using wagmi v2
        </p>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4 pt-4">
        <GlassButton variant="ghost" size="lg">
          Back
        </GlassButton>
        <GlassButton variant="primary" size="lg" disabled>
          Register Copyright (Coming Soon)
        </GlassButton>
      </div>
    </div>
  );
}
