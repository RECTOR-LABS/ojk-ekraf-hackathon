'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassModal } from '@/components/ui/glass/GlassModal';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { Badge } from '@/components/ui/glass/Badge';
import { Sparkles, TrendingUp, Zap, Check } from 'lucide-react';

interface Copyright {
  id: string;
  title: string;
  assetType: string;
}

interface MintNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  copyright: Copyright;
}

export function MintNFTModal({ isOpen, onClose, copyright }: MintNFTModalProps) {
  const [royaltyPercentage, setRoyaltyPercentage] = useState(10);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [tokenId, setTokenId] = useState('');

  // Example calculations
  const exampleSalePrice = 1; // ETH
  const royaltyPerSale = (exampleSalePrice * royaltyPercentage) / 100;
  const averageResales = 5;
  const lifetimeEarnings = royaltyPerSale * averageResales;

  const handleMint = async () => {
    setIsMinting(true);

    // TODO: Implement actual minting with wagmi
    // Simulate minting process
    setTimeout(() => {
      setIsMinting(false);
      setMintSuccess(true);
      setTokenId('123'); // Mock token ID
    }, 3000);
  };

  const assetTypeLabels: { [key: string]: string } = {
    VISUAL_ART: 'Visual Art',
    MUSIC: 'Music',
    LITERATURE: 'Literature',
    VIDEO: 'Video',
    OTHER: 'Other',
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title="Mint NFT">
      <AnimatePresence mode="wait">
        {!mintSuccess ? (
          <motion.div
            key="mint-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Copyright Preview */}
            <GlassCard>
              <div className="space-y-3">
                <h3 className="font-bold">Copyright Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Title:</span>
                    <span className="font-semibold">{copyright.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Type:</span>
                    <Badge variant="default">{assetTypeLabels[copyright.assetType]}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Registration ID:</span>
                    <span className="font-mono">#{copyright.id}</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Royalty Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-bold">Set Your Royalty</label>
                <div className="flex items-center gap-2">
                  <motion.span
                    key={royaltyPercentage}
                    className="text-3xl font-bold gradient-text"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                  >
                    {royaltyPercentage}%
                  </motion.span>
                </div>
              </div>

              {/* Custom Slider */}
              <div className="relative">
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="1"
                  value={royaltyPercentage}
                  onChange={(e) => setRoyaltyPercentage(Number(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(139, 92, 246) 0%, rgb(139, 92, 246) ${((royaltyPercentage - 5) / 15) * 100}%, rgba(255, 255, 255, 0.1) ${((royaltyPercentage - 5) / 15) * 100}%, rgba(255, 255, 255, 0.1) 100%)`,
                  }}
                />
              </div>

              <div className="flex justify-between text-xs text-foreground/60">
                <span>5% (Min)</span>
                <span>20% (Max)</span>
              </div>

              <p className="text-sm text-foreground/70">
                You&apos;ll earn {royaltyPercentage}% royalty on every resale of this NFT, forever.
              </p>
            </div>

            {/* Earnings Calculator */}
            <GlassCard>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <h3 className="font-bold">Earnings Calculator</h3>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-foreground/10">
                    <span className="text-foreground/60">Example Sale Price:</span>
                    <span className="font-semibold">{exampleSalePrice} ETH</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-foreground/10">
                    <span className="text-foreground/60">Your Royalty per Sale:</span>
                    <motion.span
                      key={royaltyPerSale}
                      className="font-bold text-purple-400"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                    >
                      {royaltyPerSale.toFixed(3)} ETH
                    </motion.span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-foreground/10">
                    <span className="text-foreground/60">Average Resales:</span>
                    <span className="font-semibold">{averageResales}×</span>
                  </div>

                  <div className="flex justify-between items-center py-3 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-lg px-3">
                    <span className="font-bold">Lifetime Earnings Estimate:</span>
                    <motion.span
                      key={lifetimeEarnings}
                      className="font-bold text-xl gradient-text"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                    >
                      ~{lifetimeEarnings.toFixed(3)} ETH
                    </motion.span>
                  </div>
                </div>

                <p className="text-xs text-foreground/50">
                  * Based on historical NFT market data. Actual earnings may vary.
                </p>
              </div>
            </GlassCard>

            {/* Fee Breakdown */}
            <GlassCard>
              <div className="space-y-3">
                <h3 className="font-bold text-sm">Fee Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-foreground/60">
                    <span>Gas Fee (estimated):</span>
                    <span className="font-semibold text-foreground">~0.003 ETH</span>
                  </div>
                  <div className="flex justify-between text-foreground/60">
                    <span>Platform Fee:</span>
                    <span className="font-semibold text-foreground">Free</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Mint Button */}
            <div className="flex gap-3">
              <GlassButton
                variant="ghost"
                size="lg"
                onClick={onClose}
                disabled={isMinting}
                className="flex-1"
              >
                Cancel
              </GlassButton>
              <GlassButton
                variant="primary"
                size="lg"
                onClick={handleMint}
                disabled={isMinting}
                loading={isMinting}
                className="flex-1"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {isMinting ? 'Minting...' : 'Mint NFT'}
              </GlassButton>
            </div>
          </motion.div>
        ) : (
          <SuccessView tokenId={tokenId} onClose={onClose} />
        )}
      </AnimatePresence>
    </GlassModal>
  );
}

function SuccessView({ tokenId, onClose }: { tokenId: string; onClose: () => void }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6 py-8"
    >
      {/* Success Icon */}
      <motion.div
        className="relative inline-block"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-600/20 to-emerald-600/20 flex items-center justify-center">
          <Check className="w-12 h-12 text-green-400" />
        </div>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-green-600/30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      <div>
        <h3 className="text-2xl font-bold mb-2">
          <span className="gradient-text">NFT Minted Successfully!</span>
        </h3>
        <p className="text-foreground/70">Your copyright is now an NFT on the blockchain</p>
      </div>

      {/* NFT Details */}
      <GlassCard>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-foreground/60">Token ID:</span>
            <span className="font-mono font-bold gradient-text">#{tokenId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-foreground/60">Network:</span>
            <span className="font-semibold">Sepolia Testnet</span>
          </div>
        </div>
      </GlassCard>

      {/* Action Buttons */}
      <div className="space-y-3">
        <a href={`/marketplace/${tokenId}`} className="block">
          <GlassButton variant="primary" size="lg" className="w-full">
            <Zap className="w-5 h-5 mr-2" />
            List on Marketplace
          </GlassButton>
        </a>
        <GlassButton variant="secondary" size="md" onClick={onClose} className="w-full">
          Close
        </GlassButton>
      </div>
    </motion.div>
  );
}
