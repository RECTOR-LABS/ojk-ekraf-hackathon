'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { Badge } from '@/components/ui/glass/Badge';
import {
  ShoppingBag,
  Shield,
  Eye,
  ExternalLink,
  Image,
  User,
  Calendar,
  Check,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

// TODO: Fetch from blockchain using wagmi and IPFS
const mockNFTDetail = {
  tokenId: '42',
  listingId: '456',
  title: 'Music Album - Nusantara Dreams',
  description:
    'A beautiful collection of traditional Indonesian music fused with modern electronic elements. This album represents the rich cultural heritage of the Nusantara archipelago, featuring authentic instruments like gamelan, angklung, and sasando.',
  assetType: 'MUSIC',
  price: '0.5',
  seller: '0xabcd...1234',
  owner: '0xabcd...1234',
  creator: '0xabcd...1234',
  royaltyPercentage: 10,
  views: 127,
  registrationId: '1',
  registeredAt: '2025-01-08',
  mintedAt: '2025-01-10',
  listedAt: '2025-01-12',
  contentHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  ipfsCID: 'QmXyZ123...',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function NFTDetailPage({ params }: { params: { tokenId: string } }) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [purchaseError, setPurchaseError] = useState('');

  const nft = mockNFTDetail; // TODO: Fetch actual NFT data using tokenId from params

  const handlePurchase = async () => {
    setIsPurchasing(true);
    setPurchaseError('');

    // TODO: Implement actual purchase with wagmi
    // Simulate purchase process
    setTimeout(() => {
      setIsPurchasing(false);
      setPurchaseSuccess(true);
    }, 3000);
  };

  const assetTypeLabels: { [key: string]: string } = {
    VISUAL_ART: 'Visual Art',
    MUSIC: 'Music',
    LITERATURE: 'Literature',
    VIDEO: 'Video',
    OTHER: 'Other',
  };

  // Platform fee calculation
  const platformFee = (Number(nft.price) * 2.5) / 100;
  const creatorRoyalty = (Number(nft.price) * nft.royaltyPercentage) / 100;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Back Button */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
        <Link href="/marketplace">
          <GlassButton variant="ghost" size="sm">
            ← Back to Marketplace
          </GlassButton>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image and Details */}
        <div className="space-y-6">
          {/* NFT Image */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard className="p-0 overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                <Image className="w-32 h-32 text-purple-400" aria-label="NFT preview" />
              </div>

              {/* Badges Overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge variant="default" className="bg-purple-600/80 backdrop-blur-sm">
                  {nft.royaltyPercentage}% Royalty
                </Badge>
                <Badge variant="success">For Sale</Badge>
              </div>

              {/* Views Counter */}
              <div className="absolute bottom-4 left-4">
                <div className="glass rounded-lg px-3 py-1.5 bg-background/80 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-sm">
                    <Eye className="w-4 h-4 text-foreground/60" />
                    <span className="font-semibold">{nft.views} views</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Properties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard>
              <h3 className="font-bold text-lg mb-4">Properties</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-lg p-3 border border-foreground/10">
                  <p className="text-xs text-foreground/60 mb-1">Asset Type</p>
                  <p className="font-semibold">{assetTypeLabels[nft.assetType]}</p>
                </div>
                <div className="glass rounded-lg p-3 border border-foreground/10">
                  <p className="text-xs text-foreground/60 mb-1">Token ID</p>
                  <p className="font-mono font-semibold">#{nft.tokenId}</p>
                </div>
                <div className="glass rounded-lg p-3 border border-foreground/10">
                  <p className="text-xs text-foreground/60 mb-1">Listing ID</p>
                  <p className="font-mono font-semibold">#{nft.listingId}</p>
                </div>
                <div className="glass rounded-lg p-3 border border-foreground/10">
                  <p className="text-xs text-foreground/60 mb-1">Copyright ID</p>
                  <p className="font-mono font-semibold">#{nft.registrationId}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Copyright Verification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-1">Copyright Verified</h3>
                  <p className="text-sm text-foreground/70 mb-3">
                    This NFT is backed by a verified copyright registration on the blockchain.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Registered:</span>
                      <span>{new Date(nft.registeredAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Content Hash:</span>
                      <span className="font-mono">{nft.contentHash.slice(0, 10)}...</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Right Column - Info and Purchase */}
        <div className="space-y-6">
          {/* Title and Description */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-3">
              <Badge variant="default" className="mb-3">
                {assetTypeLabels[nft.assetType]}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{nft.title}</h1>
            </div>
            <p className="text-foreground/70 leading-relaxed">{nft.description}</p>
          </motion.div>

          {/* Price Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="bg-gradient-to-br from-purple-600/10 to-blue-600/10">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Current Price</p>
                  <p className="text-4xl font-bold text-green-400">{nft.price} ETH</p>
                </div>

                {/* Purchase Success */}
                {purchaseSuccess && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-green-600/20 border border-green-600/30 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-600/30 flex items-center justify-center">
                        <Check className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-green-400 mb-1">Purchase Successful!</p>
                        <p className="text-sm text-foreground/70">
                          The NFT is now in your wallet. View it in your dashboard.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Purchase Error */}
                {purchaseError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-red-600/20 border border-red-600/30 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-bold text-red-400 mb-1">Purchase Failed</p>
                        <p className="text-sm text-foreground/70">{purchaseError}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Purchase Button */}
                <GlassButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handlePurchase}
                  disabled={isPurchasing || purchaseSuccess}
                  loading={isPurchasing}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  {isPurchasing
                    ? 'Processing...'
                    : purchaseSuccess
                      ? 'Purchased'
                      : `Buy for ${nft.price} ETH`}
                </GlassButton>

                {/* Fee Breakdown */}
                <div className="space-y-2 text-sm pt-3 border-t border-foreground/10">
                  <div className="flex justify-between text-foreground/60">
                    <span>Listing Price:</span>
                    <span>{nft.price} ETH</span>
                  </div>
                  <div className="flex justify-between text-foreground/60">
                    <span>Platform Fee (2.5%):</span>
                    <span>{platformFee.toFixed(4)} ETH</span>
                  </div>
                  <div className="flex justify-between text-foreground/60">
                    <span>Creator Royalty ({nft.royaltyPercentage}%):</span>
                    <span>{creatorRoyalty.toFixed(4)} ETH</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Seller Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard>
              <h3 className="font-bold mb-4">Seller Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground/60">Seller Address</p>
                    <p className="font-mono font-semibold">{nft.seller}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm pt-3 border-t border-foreground/10">
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Creator:</span>
                    <span className="font-mono">{nft.creator}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Owner:</span>
                    <span className="font-mono">{nft.owner}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard>
              <h3 className="font-bold mb-4">Timeline</h3>
              <div className="space-y-3">
                {[
                  { label: 'Copyright Registered', date: nft.registeredAt },
                  { label: 'NFT Minted', date: nft.mintedAt },
                  { label: 'Listed for Sale', date: nft.listedAt },
                ].map((event, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{event.label}</p>
                      <p className="text-xs text-foreground/60">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* External Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard>
              <h3 className="font-bold mb-3">External Links</h3>
              <div className="space-y-2">
                <a
                  href={`https://sepolia.etherscan.io/token/CONTRACT_ADDRESS/${nft.tokenId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm font-medium">View on Etherscan</span>
                  <ExternalLink className="w-4 h-4 text-foreground/60" />
                </a>
                <a
                  href={`https://gateway.pinata.cloud/ipfs/${nft.ipfsCID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm font-medium">View on IPFS</span>
                  <ExternalLink className="w-4 h-4 text-foreground/60" />
                </a>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
