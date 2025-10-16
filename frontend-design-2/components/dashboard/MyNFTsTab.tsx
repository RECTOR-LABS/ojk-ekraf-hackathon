'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { Badge } from '@/components/ui/glass/Badge';
import { LoadingSpinner } from '@/components/ui/glass/Loading';
import { Sparkles, Eye, Image, ShoppingBag, Music, BookOpen, Video, File } from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';
import { ListNFTModal } from '@/components/features/marketplace/ListNFTModal';
import { useUserNFTs, type UserNFT } from '@/lib/hooks/useUserNFTs';

export function MyNFTsTab() {
  const { nfts, isLoading, error, totalNFTs, listedCount, notListedCount } = useUserNFTs();
  const [selectedNFT, setSelectedNFT] = useState<UserNFT | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openListModal = (nft: UserNFT) => {
    setSelectedNFT(nft);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <GlassCard>
        <div className="text-center py-12">
          <p className="text-red-400 mb-2">Failed to load NFTs</p>
          <p className="text-sm text-foreground/60">Please check your wallet connection</p>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard>
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text mb-2">{totalNFTs}</p>
              <p className="text-sm text-foreground/60">Total NFTs</p>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400 mb-2">{listedCount}</p>
              <p className="text-sm text-foreground/60">Listed for Sale</p>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-400 mb-2">{notListedCount}</p>
              <p className="text-sm text-foreground/60">Not Listed</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* NFT Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft, index) => (
          <motion.div
            key={nft.tokenId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <NFTCard nft={nft} onListForSale={() => openListModal(nft)} />
          </motion.div>
        ))}
      </div>

      {/* List NFT Modal */}
      {selectedNFT && (
        <ListNFTModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          nft={selectedNFT}
        />
      )}

      {nfts.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <GlassCard>
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-foreground/40" />
              <h3 className="text-xl font-bold mb-2">No NFTs Yet</h3>
              <p className="text-foreground/70 mb-6">
                Mint your first NFT from your registered copyrights
              </p>
              <Link href="/mint">
                <GlassButton variant="primary">Mint NFT</GlassButton>
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}

function NFTCard({ nft, onListForSale }: { nft: UserNFT; onListForSale: () => void }) {
  const [imageError, setImageError] = useState(false);

  const assetTypeLabels: { [key: string]: string } = {
    VISUAL_ART: 'Visual Art',
    MUSIC: 'Music',
    LITERATURE: 'Literature',
    VIDEO: 'Video',
    OTHER: 'Other',
  };

  const imageUrl = nft.ipfsCID && nft.assetType === 'VISUAL_ART'
    ? `https://gateway.pinata.cloud/ipfs/${nft.ipfsCID}`
    : null;

  // Asset type icon mapping
  const getAssetIcon = () => {
    switch (nft.assetType) {
      case 'MUSIC':
        return <Music className="w-16 h-16 text-purple-400" aria-label="Music" />;
      case 'LITERATURE':
        return <BookOpen className="w-16 h-16 text-blue-400" aria-label="Literature" />;
      case 'VIDEO':
        return <Video className="w-16 h-16 text-green-400" aria-label="Video" />;
      case 'OTHER':
        return <File className="w-16 h-16 text-gray-400" aria-label="Other" />;
      default:
        return <Image className="w-16 h-16 text-blue-400" aria-label="Visual Art" />;
    }
  };

  return (
    <GlassCard hover>
      <div className="space-y-4">
        {/* Thumbnail */}
        <div className="relative">
          <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center overflow-hidden">
            {imageUrl && !imageError ? (
              <NextImage
                src={imageUrl}
                alt={nft.title}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              getAssetIcon()
            )}
          </div>

          {/* Status Badges */}
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge variant="default">
              <Sparkles className="w-3 h-3 mr-1" />
              NFT
            </Badge>
            {nft.isListed ? (
              <Badge variant="success">Listed</Badge>
            ) : (
              <Badge variant="warning">Not Listed</Badge>
            )}
          </div>

          {/* Royalty Badge */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="default" className="bg-purple-600/80 backdrop-blur-sm">
              {nft.royaltyPercentage}% Royalty
            </Badge>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2">
          <h3 className="font-bold text-lg truncate">{nft.title}</h3>

          <div className="flex items-center gap-2">
            <Badge variant="default">{assetTypeLabels[nft.assetType]}</Badge>
          </div>

          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-foreground/60">
              <span>Token ID:</span>
              <span className="font-mono">#{nft.tokenId}</span>
            </div>
            <div className="flex justify-between text-foreground/60">
              <span>Copyright ID:</span>
              <span className="font-mono">#{nft.copyrightId}</span>
            </div>
            {nft.isListed && nft.price && (
              <div className="flex justify-between text-foreground/60">
                <span>Price:</span>
                <span className="font-bold text-foreground">{nft.price} ETH</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link href={`/marketplace/${nft.tokenId}`} className="flex-1">
            <GlassButton variant="secondary" size="sm" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </GlassButton>
          </Link>

          {!nft.isListed && (
            <GlassButton
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={onListForSale}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              List for Sale
            </GlassButton>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
