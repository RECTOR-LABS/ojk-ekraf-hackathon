'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassModal } from '@/components/ui/glass/GlassModal';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { GlassInput } from '@/components/ui/glass/GlassInput';
import { Badge } from '@/components/ui/glass/Badge';
import { ShoppingBag, TrendingUp, Check, ExternalLink, AlertCircle } from 'lucide-react';

interface ListNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: any;
}

export function ListNFTModal({ isOpen, onClose, nft }: ListNFTModalProps) {
  const [price, setPrice] = useState('');
  const [isListing, setIsListing] = useState(false);
  const [listSuccess, setListSuccess] = useState(false);
  const [listingId, setListingId] = useState('');

  // Platform fee (2.5%)
  const platformFeePercentage = 2.5;
  const platformFee = price ? (Number(price) * platformFeePercentage) / 100 : 0;
  const youReceive = price ? Number(price) - platformFee : 0;

  // Minimum price validation
  const minPrice = 0.001;
  const isPriceValid = price && Number(price) >= minPrice;

  const handleList = async () => {
    if (!isPriceValid) return;

    setIsListing(true);

    // TODO: Implement actual listing with wagmi
    // Simulate listing process
    setTimeout(() => {
      setIsListing(false);
      setListSuccess(true);
      setListingId('456'); // Mock listing ID
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
    <GlassModal isOpen={isOpen} onClose={onClose} title="List NFT for Sale">
      <AnimatePresence mode="wait">
        {!listSuccess ? (
          <motion.div
            key="list-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* NFT Preview */}
            <GlassCard>
              <div className="space-y-3">
                <h3 className="font-bold">NFT Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Title:</span>
                    <span className="font-semibold">{nft.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Type:</span>
                    <Badge variant="default">{assetTypeLabels[nft.assetType]}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Token ID:</span>
                    <span className="font-mono">#{nft.tokenId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Royalty:</span>
                    <Badge variant="default" className="bg-purple-600/80">
                      {nft.royaltyPercentage}%
                    </Badge>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Price Input */}
            <div className="space-y-3">
              <label className="font-bold flex items-center gap-2">
                Set Listing Price
                <span className="text-sm font-normal text-foreground/60">(in ETH)</span>
              </label>

              <div className="relative">
                <GlassInput
                  type="number"
                  step="0.001"
                  min={minPrice.toString()}
                  placeholder={`Min ${minPrice} ETH`}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="text-xl font-bold"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/60 font-semibold">
                  ETH
                </div>
              </div>

              {price && Number(price) < minPrice && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-red-400"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Price must be at least {minPrice} ETH</span>
                </motion.div>
              )}

              <p className="text-sm text-foreground/70">
                This is the total price buyers will pay for your NFT.
              </p>
            </div>

            {/* Fee Breakdown */}
            {isPriceValid && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <GlassCard>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <h3 className="font-bold">Earnings Breakdown</h3>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center py-2 border-b border-foreground/10">
                        <span className="text-foreground/60">Listing Price:</span>
                        <span className="font-semibold">{Number(price).toFixed(3)} ETH</span>
                      </div>

                      <div className="flex justify-between items-center py-2 border-b border-foreground/10">
                        <span className="text-foreground/60">
                          Platform Fee ({platformFeePercentage}%):
                        </span>
                        <span className="font-semibold text-orange-400">
                          -{platformFee.toFixed(3)} ETH
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-3 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-lg px-3">
                        <span className="font-bold">You Receive:</span>
                        <motion.span
                          key={youReceive}
                          className="font-bold text-xl text-green-400"
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                        >
                          {youReceive.toFixed(3)} ETH
                        </motion.span>
                      </div>
                    </div>

                    <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-3">
                      <p className="text-xs text-blue-300 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>
                          You'll also earn <strong>{nft.royaltyPercentage}% royalty</strong> on
                          every future resale of this NFT, automatically distributed to your
                          wallet.
                        </span>
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* List Button */}
            <div className="flex gap-3">
              <GlassButton
                variant="ghost"
                size="lg"
                onClick={onClose}
                disabled={isListing}
                className="flex-1"
              >
                Cancel
              </GlassButton>
              <GlassButton
                variant="primary"
                size="lg"
                onClick={handleList}
                disabled={!isPriceValid || isListing}
                loading={isListing}
                className="flex-1"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {isListing ? 'Listing...' : 'List NFT'}
              </GlassButton>
            </div>
          </motion.div>
        ) : (
          <SuccessView listingId={listingId} price={price} onClose={onClose} />
        )}
      </AnimatePresence>
    </GlassModal>
  );
}

function SuccessView({
  listingId,
  price,
  onClose,
}: {
  listingId: string;
  price: string;
  onClose: () => void;
}) {
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
          <span className="gradient-text">NFT Listed Successfully!</span>
        </h3>
        <p className="text-foreground/70">Your NFT is now available on the marketplace</p>
      </div>

      {/* Listing Details */}
      <GlassCard>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-foreground/60">Listing ID:</span>
            <span className="font-mono font-bold gradient-text">#{listingId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-foreground/60">Price:</span>
            <span className="font-bold text-green-400">{Number(price).toFixed(3)} ETH</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-foreground/60">Status:</span>
            <Badge variant="success">Active Listing</Badge>
          </div>
        </div>
      </GlassCard>

      {/* Action Buttons */}
      <div className="space-y-3">
        <a href="/marketplace" className="block">
          <GlassButton variant="primary" size="lg" className="w-full">
            <ShoppingBag className="w-5 h-5 mr-2" />
            View on Marketplace
          </GlassButton>
        </a>
        <GlassButton variant="secondary" size="md" onClick={onClose} className="w-full">
          Close
        </GlassButton>
      </div>
    </motion.div>
  );
}
