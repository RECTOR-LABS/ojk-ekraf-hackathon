'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { Badge } from '@/components/ui/glass/Badge';
import { Sparkles, Eye, Image, FileText } from 'lucide-react';
import Link from 'next/link';

interface Copyright {
  id: string;
  title: string;
  assetType: string;
  registeredAt: string;
  isMinted: boolean;
  tokenId?: string;
}

// TODO: Fetch from blockchain using wagmi
const mockCopyrights = [
  {
    id: '1',
    title: 'Digital Artwork Collection',
    assetType: 'VISUAL_ART',
    registeredAt: '2025-01-10',
    isMinted: false,
  },
  {
    id: '2',
    title: 'Music Album - Nusantara Dreams',
    assetType: 'MUSIC',
    registeredAt: '2025-01-08',
    isMinted: true,
    tokenId: '42',
  },
  {
    id: '3',
    title: 'Short Story: Tales of Indonesia',
    assetType: 'LITERATURE',
    registeredAt: '2025-01-05',
    isMinted: false,
  },
];

export function MyCopyrightsTab() {
  const totalCopyrights = mockCopyrights.length;
  const mintedCount = mockCopyrights.filter((c) => c.isMinted).length;
  const readyToMintCount = totalCopyrights - mintedCount;

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
              <p className="text-3xl font-bold text-purple-400 mb-2">{readyToMintCount}</p>
              <p className="text-sm text-foreground/60">Ready to Mint</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Copyright Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCopyrights.map((copyright, index) => (
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

      {mockCopyrights.length === 0 && (
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
          <div className="aspect-video rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
            <Image className="w-16 h-16 text-purple-400" aria-label="Copyright preview" />
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
