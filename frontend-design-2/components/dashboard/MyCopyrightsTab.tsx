'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { Badge } from '@/components/ui/glass/Badge';
import { LoadingSpinner } from '@/components/ui/glass/Loading';
import { Sparkles, Eye, Image, FileText, Music, BookOpen, Video, File, Check } from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';
import { useState } from 'react';
import { useUserCopyrights, type Copyright } from '@/lib/hooks/useUserCopyrights';

export function MyCopyrightsTab() {
  const { copyrights, isLoading, error, totalCopyrights, mintedCount, unmintedCount } = useUserCopyrights();

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
          <p className="text-red-400 mb-2">Failed to load copyrights</p>
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
              <p className="text-3xl font-bold gradient-text mb-2">{totalCopyrights}</p>
              <p className="text-sm text-foreground/60">Total Copyrights</p>
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
              <p className="text-3xl font-bold text-green-400 mb-2">{mintedCount}</p>
              <p className="text-sm text-foreground/60">Minted as NFTs</p>
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
              <p className="text-3xl font-bold text-purple-400 mb-2">{unmintedCount}</p>
              <p className="text-sm text-foreground/60">Ready to Mint</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Copyright Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {copyrights.map((copyright, index) => (
          <motion.div
            key={copyright.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <CopyrightCard copyright={copyright} />
          </motion.div>
        ))}
      </div>

      {copyrights.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <GlassCard>
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 text-foreground/40" />
              <h3 className="text-xl font-bold mb-2">No Copyrights Yet</h3>
              <p className="text-foreground/70 mb-6">
                Start by registering your first creative work
              </p>
              <Link href="/register">
                <GlassButton variant="primary">Register Copyright</GlassButton>
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}

function CopyrightCard({ copyright }: { copyright: Copyright }) {
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
        return <Music className="w-16 h-16 text-purple-400" aria-label="Music" />;
      case 'LITERATURE':
        return <BookOpen className="w-16 h-16 text-blue-400" aria-label="Literature" />;
      case 'VIDEO':
        return <Video className="w-16 h-16 text-green-400" aria-label="Video" />;
      case 'OTHER':
        return <File className="w-16 h-16 text-gray-400" aria-label="Other" />;
      default:
        return <Image className="w-16 h-16 text-purple-400" aria-label="Visual Art" />;
    }
  };

  return (
    <GlassCard hover>
      <div className="space-y-4">
        {/* Thumbnail */}
        <div className="relative">
          <div className="aspect-video rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center overflow-hidden">
            {imageUrl && !imageError ? (
              <NextImage
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
              <Badge variant="warning">Not Minted</Badge>
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

        {/* Actions */}
        <div className="flex gap-2">
          {copyright.isMinted ? (
            <Link href={`/marketplace/${copyright.tokenId}`} className="flex-1">
              <GlassButton variant="secondary" size="sm" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                View NFT
              </GlassButton>
            </Link>
          ) : (
            <Link href="/mint" className="flex-1">
              <GlassButton variant="primary" size="sm" className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Mint NFT
              </GlassButton>
            </Link>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
