'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { Badge } from '@/components/ui/glass/Badge';
import { LoadingSpinner } from '@/components/ui/glass/Loading';
import {
  ShoppingBag,
  Shield,
  ExternalLink,
  Image,
  Music,
  FileText,
  Video,
  Package,
  User,
  Calendar,
  Check,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';
import { useTranslations } from 'next-intl';
import { useNFTDetail } from '@/lib/hooks/useNFTDetail';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { KaryaMarketplaceAddress, KaryaMarketplaceABI } from '@/lib/contracts/KaryaMarketplace';
import { KaryaNFTAddress } from '@/lib/contracts/KaryaNFT';
import { useQueryClient } from '@tanstack/react-query';

export default function NFTDetailPage({ params }: { params: { tokenId: string } }) {
  const t = useTranslations('marketplace.detail');
  const { address: userAddress } = useAccount();
  const { nft, isLoading, error } = useNFTDetail(params.tokenId);
  const queryClient = useQueryClient();

  const [purchaseError, setPurchaseError] = useState('');
  const [imageError, setImageError] = useState(false);

  // Purchase transaction
  const { writeContract, data: txHash, isPending: isWritePending, error: writeError } = useWriteContract();
  const {
    isLoading: isTxPending,
    isSuccess: isTxSuccess,
    error: txError,
  } = useWaitForTransactionReceipt({ hash: txHash });

  const handlePurchase = async () => {
    if (!nft || !nft.isListed || !nft.listingId) {
      setPurchaseError('NFT is not listed for sale');
      return;
    }

    try {
      setPurchaseError('');
      writeContract({
        address: KaryaMarketplaceAddress,
        abi: KaryaMarketplaceABI,
        functionName: 'buyNFT',
        args: [BigInt(nft.listingId)],
        value: BigInt(nft.priceWei),
      });
    } catch (err) {
      console.error('Purchase error:', err);
      setPurchaseError(err instanceof Error ? err.message : 'Failed to purchase NFT');
    }
  };

  // Handle transaction errors
  useEffect(() => {
    if (writeError) {
      setPurchaseError(writeError.message);
    }
    if (txError) {
      setPurchaseError(txError.message);
    }
  }, [writeError, txError]);

  // Invalidate cache after successful purchase
  useEffect(() => {
    if (isTxSuccess) {
      console.log('✅ [NFTDetailPage] Purchase successful, invalidating cache...');

      // Invalidate marketplace listings cache (auto-refresh marketplace page)
      queryClient.invalidateQueries({ queryKey: ['marketplaceListings'] });

      // Invalidate NFT detail cache (auto-refresh current page)
      queryClient.invalidateQueries({ queryKey: ['nftDetail', params.tokenId] });

      // Invalidate user NFTs cache (auto-refresh dashboard)
      queryClient.invalidateQueries({ queryKey: ['userNFTs'] });

      // Invalidate user listings cache (auto-refresh seller's dashboard)
      queryClient.invalidateQueries({ queryKey: ['userListings'] });

      console.log('✅ [NFTDetailPage] Cache invalidated successfully');
    }
  }, [isTxSuccess, queryClient, params.tokenId]);

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-center items-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !nft) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <GlassCard>
          <div className="text-center py-12">
            <p className="text-red-400 mb-2">Failed to load NFT details</p>
            <p className="text-sm text-foreground/60">
              {error ? 'Please check your connection and try again' : 'NFT not found'}
            </p>
          </div>
        </GlassCard>
      </div>
    );
  }

  const assetTypeLabels: { [key: string]: string } = {
    VISUAL_ART: 'Visual Art',
    MUSIC: 'Music',
    LITERATURE: 'Literature',
    VIDEO: 'Video',
    OTHER: 'Other',
  };

  // Get asset icon
  const getAssetIcon = () => {
    switch (nft.assetType) {
      case 'MUSIC':
        return Music;
      case 'LITERATURE':
        return FileText;
      case 'VIDEO':
        return Video;
      case 'OTHER':
        return Package;
      default:
        return Image;
    }
  };

  const AssetIcon = getAssetIcon();

  // IPFS image URL for Visual Art
  const imageUrl = nft.ipfsCID && nft.assetType === 'VISUAL_ART'
    ? `https://gateway.pinata.cloud/ipfs/${nft.ipfsCID}`
    : null;

  // Truncate addresses
  const truncatedSeller = `${nft.seller.slice(0, 6)}...${nft.seller.slice(-4)}`;
  const truncatedOwner = `${nft.owner.slice(0, 6)}...${nft.owner.slice(-4)}`;
  const truncatedCreator = `${nft.creator.slice(0, 6)}...${nft.creator.slice(-4)}`;

  // Platform fee calculation
  const platformFee = nft.isListed ? (Number(nft.price) * 2.5) / 100 : 0;
  const creatorRoyalty = nft.isListed ? (Number(nft.price) * nft.royaltyPercentage) / 100 : 0;

  // Purchase states
  const isPurchasing = isWritePending || isTxPending;
  const purchaseSuccess = isTxSuccess;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Back Button */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
        <Link href="/marketplace">
          <GlassButton variant="ghost" size="sm">
            {t('backButton')}
          </GlassButton>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image and Details */}
        <div className="space-y-6">
          {/* NFT Image */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <GlassCard className="p-0 overflow-hidden relative">
              <div className="aspect-square bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center overflow-hidden">
                {imageUrl && !imageError ? (
                  <NextImage
                    src={imageUrl}
                    alt={nft.title}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <AssetIcon className="w-32 h-32 text-purple-400" aria-label="NFT preview" />
                )}
              </div>

              {/* Badges Overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge variant="default" className="bg-purple-600/80 backdrop-blur-sm">
                  {nft.royaltyPercentage}% {t('royalty')}
                </Badge>
                {nft.isListed && <Badge variant="success">{t('forSale')}</Badge>}
                {!nft.isListed && <Badge variant="default">Not Listed</Badge>}
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
              <h3 className="font-bold text-lg mb-4">{t('properties.title')}</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-lg p-3 border border-foreground/10">
                  <p className="text-xs text-foreground/60 mb-1">{t('properties.assetType')}</p>
                  <p className="font-semibold">{assetTypeLabels[nft.assetType]}</p>
                </div>
                <div className="glass rounded-lg p-3 border border-foreground/10">
                  <p className="text-xs text-foreground/60 mb-1">{t('properties.tokenId')}</p>
                  <p className="font-mono font-semibold">#{nft.tokenId}</p>
                </div>
                {nft.listingId && (
                  <div className="glass rounded-lg p-3 border border-foreground/10">
                    <p className="text-xs text-foreground/60 mb-1">{t('properties.listingId')}</p>
                    <p className="font-mono font-semibold">#{nft.listingId}</p>
                  </div>
                )}
                <div className="glass rounded-lg p-3 border border-foreground/10">
                  <p className="text-xs text-foreground/60 mb-1">{t('properties.copyrightId')}</p>
                  <p className="font-mono font-semibold">#{nft.copyrightId}</p>
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
                  <h3 className="font-bold mb-1">{t('copyright.title')}</h3>
                  <p className="text-sm text-foreground/70 mb-3">
                    {t('copyright.description')}
                  </p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-foreground/60">{t('copyright.registered')}</span>
                      <span>{new Date(nft.registeredAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">{t('copyright.contentHash')}</span>
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
                  <p className="text-sm text-foreground/60 mb-1">{t('price.title')}</p>
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
                        <p className="font-bold text-green-400 mb-1">{t('purchase.success.title')}</p>
                        <p className="text-sm text-foreground/70">
                          {t('purchase.success.description')}
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
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-red-400 mb-1">{t('purchase.error.title')}</p>
                        <div className="max-h-32 overflow-y-auto">
                          <p className="text-sm text-foreground/70 break-words whitespace-pre-wrap">
                            {purchaseError}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Purchase Button */}
                {!nft.isListed && (
                  <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4">
                    <p className="text-sm text-foreground/70 text-center">
                      This NFT is not currently listed for sale
                    </p>
                  </div>
                )}
                {nft.isListed && (nft.isOwner || nft.isSeller) && (
                  <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
                    <p className="text-sm text-foreground/70 text-center">
                      You own this NFT
                    </p>
                  </div>
                )}
                {nft.isListed && !nft.isOwner && !nft.isSeller && (
                  <GlassButton
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handlePurchase}
                    disabled={isPurchasing || purchaseSuccess || !userAddress}
                    loading={isPurchasing}
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    {!userAddress
                      ? 'Connect Wallet to Purchase'
                      : isPurchasing
                        ? t('purchase.processing')
                        : purchaseSuccess
                          ? t('purchase.purchased')
                          : `${t('purchase.button')} ${nft.price} ETH`}
                  </GlassButton>
                )}

                {/* Fee Breakdown */}
                <div className="space-y-2 text-sm pt-3 border-t border-foreground/10">
                  <div className="flex justify-between text-foreground/60">
                    <span>{t('price.listingPrice')}</span>
                    <span>{nft.price} ETH</span>
                  </div>
                  <div className="flex justify-between text-foreground/60">
                    <span>{t('price.platformFee')}</span>
                    <span>{platformFee.toFixed(4)} ETH</span>
                  </div>
                  <div className="flex justify-between text-foreground/60">
                    <span>{t('price.creatorRoyalty')} ({nft.royaltyPercentage}%):</span>
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
              <h3 className="font-bold mb-4">{t('seller.title')}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground/60">{t('seller.address')}</p>
                    <p className="font-mono font-semibold">{truncatedSeller}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm pt-3 border-t border-foreground/10">
                  <div className="flex justify-between">
                    <span className="text-foreground/60">{t('seller.creator')}</span>
                    <span className="font-mono">{truncatedCreator}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">{t('seller.owner')}</span>
                    <span className="font-mono">{truncatedOwner}</span>
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
              <h3 className="font-bold mb-4">{t('timeline.title')}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{t('timeline.copyrightRegistered')}</p>
                    <p className="text-xs text-foreground/60">
                      {new Date(nft.registeredAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {nft.listedAt && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{t('timeline.listedForSale')}</p>
                      <p className="text-xs text-foreground/60">
                        {new Date(nft.listedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
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
              <h3 className="font-bold mb-3">{t('externalLinks.title')}</h3>
              <div className="space-y-2">
                <a
                  href={`https://sepolia.etherscan.io/token/${KaryaNFTAddress}?a=${nft.tokenId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm font-medium">{t('externalLinks.etherscan')}</span>
                  <ExternalLink className="w-4 h-4 text-foreground/60" />
                </a>
                {nft.ipfsCID && (
                  <a
                    href={`https://gateway.pinata.cloud/ipfs/${nft.ipfsCID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm font-medium">{t('externalLinks.ipfs')}</span>
                    <ExternalLink className="w-4 h-4 text-foreground/60" />
                  </a>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
