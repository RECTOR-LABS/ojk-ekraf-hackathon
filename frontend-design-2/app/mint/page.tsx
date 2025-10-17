'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { Badge } from '@/components/ui/glass/Badge';
import { LoadingSpinner } from '@/components/ui/glass/Loading';
import { Sparkles, Check, ExternalLink, Image as ImageIcon, File, Music as MusicIcon, BookOpen, Video as VideoIcon } from 'lucide-react';
import { useState } from 'react';
import { MintNFTModal } from '@/components/features/mint/MintNFTModal';
import { useUserCopyrights, type Copyright } from '@/lib/hooks/useUserCopyrights';
import Image from 'next/image';

export default function MintPage() {
  const [selectedCopyright, setSelectedCopyright] = useState<Copyright | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch real blockchain data
  const { copyrights, isLoading, error, totalCopyrights, mintedCount, unmintedCount } = useUserCopyrights();

  const openMintModal = (copyright: Copyright) => {
    setSelectedCopyright(copyright);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          Your Registered <span className="gradient-text">Copyrights</span>
        </h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Transform your registered copyrights into NFTs and start earning royalties
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard>
          <div className="text-center">
            <p className="text-3xl font-bold gradient-text mb-2">{totalCopyrights}</p>
            <p className="text-sm text-foreground/60">Total Registered</p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-400 mb-2">{mintedCount}</p>
            <p className="text-sm text-foreground/60">Minted as NFTs</p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-400 mb-2">{unmintedCount}</p>
            <p className="text-sm text-foreground/60">Ready to Mint</p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Copyright Cards Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <GlassCard variant="elevated">
            <div className="py-8 space-y-4">
              <p className="text-red-400">Failed to load copyrights from blockchain</p>
              <p className="text-sm text-foreground/60">Please check your wallet connection and try again</p>
            </div>
          </GlassCard>
        </div>
      ) : copyrights.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {copyrights.map((copyright, index) => (
            <CopyrightCard
              key={copyright.id}
              copyright={copyright}
              onMint={() => openMintModal(copyright)}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      ) : (
        <EmptyState />
      )}

      {/* Mint NFT Modal */}
      {selectedCopyright && (
        <MintNFTModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          copyright={selectedCopyright}
        />
      )}
    </div>
  );
}

interface CopyrightCardProps {
  copyright: Copyright;
  onMint: () => void;
  delay: number;
}

function CopyrightCard({ copyright, onMint, delay }: CopyrightCardProps) {
  const [imageError, setImageError] = useState(false);

  const assetTypeLabels: { [key: string]: string } = {
    VISUAL_ART: 'Visual Art',
    MUSIC: 'Music',
    LITERATURE: 'Literature',
    VIDEO: 'Video',
    OTHER: 'Other',
  };

  const imageUrl = copyright.ipfsCID && copyright.assetType === 'VISUAL_ART'
    ? `https://gateway.pinata.cloud/ipfs/${copyright.ipfsCID}`
    : null;

  // Asset type icon mapping
  const getAssetIcon = () => {
    if (copyright.isMinted) {
      return <Check className="w-16 h-16 text-green-400" aria-label="Minted" />;
    }

    switch (copyright.assetType) {
      case 'MUSIC':
        return <MusicIcon className="w-16 h-16 text-purple-400" aria-label="Music" />;
      case 'LITERATURE':
        return <BookOpen className="w-16 h-16 text-blue-400" aria-label="Literature" />;
      case 'VIDEO':
        return <VideoIcon className="w-16 h-16 text-green-400" aria-label="Video" />;
      case 'OTHER':
        return <File className="w-16 h-16 text-gray-400" aria-label="Other" />;
      default:
        return <ImageIcon className="w-16 h-16 text-purple-400" aria-label="Visual Art" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <GlassCard hover>
        <div className="space-y-4">
          {/* Thumbnail / Icon */}
          <div className="relative">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center overflow-hidden">
              {imageUrl && !imageError ? (
                <Image
                  src={imageUrl}
                  alt={copyright.title}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                getAssetIcon()
              )}
            </div>

            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              {copyright.isMinted ? (
                <Badge variant="success">Minted</Badge>
              ) : (
                <Badge variant="info">Not Minted</Badge>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2">
            <h3 className="font-bold text-lg truncate">{copyright.title}</h3>

            <div className="flex items-center gap-2">
              <Badge variant="default">{assetTypeLabels[copyright.assetType]}</Badge>
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-foreground/60">
                <span>Registration ID:</span>
                <span className="font-mono">#{copyright.id}</span>
              </div>
              <div className="flex justify-between text-foreground/60">
                <span>Registered:</span>
                <span>{new Date(copyright.registeredAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {copyright.isMinted ? (
            <a
              href={`/marketplace/${copyright.tokenId}`}
              className="block"
            >
              <GlassButton variant="secondary" size="md" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                View NFT
              </GlassButton>
            </a>
          ) : (
            <GlassButton variant="primary" size="md" onClick={onMint} className="w-full">
              <Sparkles className="w-4 h-4 mr-2" />
              Mint NFT
            </GlassButton>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      className="text-center py-16"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <GlassCard variant="elevated">
        <div className="py-12 space-y-6">
          <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
            <File className="w-12 h-12 text-purple-400" />
          </div>

          <h3 className="text-2xl font-bold">No Copyrights Yet</h3>
          <p className="text-foreground/70 max-w-md mx-auto">
            You haven&apos;t registered any copyrights yet. Register your creative work to get started.
          </p>

          <a href="/register">
            <GlassButton variant="primary" size="lg">
              Register Copyright
            </GlassButton>
          </a>
        </div>
      </GlassCard>
    </motion.div>
  );
}
