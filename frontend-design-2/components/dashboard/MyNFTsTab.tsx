'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { Badge } from '@/components/ui/glass/Badge';
import { Sparkles, Eye, Image, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { ListNFTModal } from '@/components/features/marketplace/ListNFTModal';

interface NFT {
  tokenId: string;
  title: string;
  assetType: string;
  mintedAt: string;
  isListed: boolean;
  price?: string;
  royaltyPercentage: number;
}

// TODO: Fetch from blockchain using wagmi
const mockNFTs = [
  {
    tokenId: '42',
    title: 'Music Album - Nusantara Dreams',
    assetType: 'MUSIC',
    mintedAt: '2025-01-08',
    isListed: true,
    price: '0.5',
    royaltyPercentage: 10,
  },
  {
    tokenId: '87',
    title: 'Digital Artwork - Batik Modern',
    assetType: 'VISUAL_ART',
    mintedAt: '2025-01-12',
    isListed: false,
    royaltyPercentage: 15,
  },
  {
    tokenId: '156',
    title: 'Documentary Film - Heritage Stories',
    assetType: 'VIDEO',
    mintedAt: '2025-01-15',
    isListed: true,
    price: '1.2',
    royaltyPercentage: 12,
  },
];

export function MyNFTsTab() {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalNFTs = mockNFTs.length;
  const listedCount = mockNFTs.filter((nft) => nft.isListed).length;
  const unlistedCount = totalNFTs - listedCount;

  const openListModal = (nft: NFT) => {
    setSelectedNFT(nft);
    setIsModalOpen(true);
  };

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
              <p className="text-3xl font-bold text-orange-400 mb-2">{unlistedCount}</p>
              <p className="text-sm text-foreground/60">Not Listed</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* NFT Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockNFTs.map((nft, index) => (
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

      {mockNFTs.length === 0 && (
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

function NFTCard({ nft, onListForSale }: { nft: NFT; onListForSale: () => void }) {
  const assetTypeLabels: { [key: string]: string } = {
    VISUAL_ART: 'Visual Art',
    MUSIC: 'Music',
    LITERATURE: 'Literature',
    VIDEO: 'Video',
    OTHER: 'Other',
  };

  return (
    <GlassCard hover>
      <div className="space-y-4">
        {/* Thumbnail */}
        <div className="relative">
          <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
            <Image className="w-16 h-16 text-blue-400" aria-label="NFT preview" />
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
              <span>Minted:</span>
              <span>{new Date(nft.mintedAt).toLocaleDateString()}</span>
            </div>
            {nft.isListed && (
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
