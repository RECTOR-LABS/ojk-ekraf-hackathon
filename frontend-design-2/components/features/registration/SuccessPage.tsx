'use client';

import { motion } from 'framer-motion';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { Check, Download, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';

interface SuccessPageProps {
  registrationId: string;
  transactionHash: string;
  contentHash: string;
  timestamp: string;
}

export function SuccessPage({
  registrationId,
  transactionHash,
  contentHash,
  timestamp,
}: SuccessPageProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const etherscanUrl = `https://sepolia.etherscan.io/tx/${transactionHash}`;

  return (
    <div className="space-y-6">
      {/* Confetti Animation */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      {/* Success Animation */}
      <motion.div
        className="text-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <div className="relative inline-block mb-6">
          <motion.div
            className="w-32 h-32 rounded-full bg-gradient-to-br from-green-600/20 to-emerald-600/20 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <Check className="w-16 h-16 text-green-400" />
          </motion.div>

          {/* Pulsing rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-green-600/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <h2 className="text-3xl lg:text-4xl font-bold mb-3">
          <span className="gradient-text">Registration Successful!</span>
        </h2>
        <p className="text-xl text-foreground/70">
          Your copyright has been securely registered on the blockchain
        </p>
      </motion.div>

      {/* Registration Certificate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard variant="elevated">
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Registration Certificate</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Registration ID */}
              <div className="glass rounded-xl p-4">
                <p className="text-sm text-foreground/60 mb-1">Registration ID</p>
                <p className="font-mono text-lg font-bold gradient-text">#{registrationId}</p>
              </div>

              {/* Timestamp */}
              <div className="glass rounded-xl p-4">
                <p className="text-sm text-foreground/60 mb-1">Registered At</p>
                <p className="font-semibold">{new Date(timestamp).toLocaleString()}</p>
              </div>

              {/* Content Hash */}
              <div className="glass rounded-xl p-4 md:col-span-2">
                <p className="text-sm text-foreground/60 mb-1">Content Hash (SHA-256)</p>
                <code className="text-xs text-purple-400 break-all block">
                  {contentHash}
                </code>
              </div>

              {/* Transaction Hash */}
              <div className="glass rounded-xl p-4 md:col-span-2">
                <p className="text-sm text-foreground/60 mb-2">Transaction Hash</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs text-blue-400 break-all flex-1">
                    {transactionHash}
                  </code>
                  <a
                    href={etherscanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-2 rounded-lg glass hover:bg-white/10 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-blue-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Download Certificate Button */}
            <button className="w-full flex items-center justify-center gap-2 glass rounded-xl p-4 hover:bg-white/10 transition-colors">
              <Download className="w-5 h-5 text-purple-400" />
              <span>Download Certificate (PNG)</span>
            </button>
          </div>
        </GlassCard>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <GlassCard>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold">What&apos;s Next?</h3>
            <p className="text-foreground/70">
              Transform your registered copyright into an NFT and start earning royalties
            </p>
            <Link href="/mint">
              <GlassButton variant="primary" size="lg">
                Mint NFT Now
              </GlassButton>
            </Link>
          </div>
        </GlassCard>
      </motion.div>

      {/* Additional Actions */}
      <div className="flex justify-center gap-4">
        <Link href="/dashboard">
          <GlassButton variant="secondary">View Dashboard</GlassButton>
        </Link>
        <Link href="/register">
          <GlassButton variant="ghost">Register Another Copyright</GlassButton>
        </Link>
      </div>
    </div>
  );
}
