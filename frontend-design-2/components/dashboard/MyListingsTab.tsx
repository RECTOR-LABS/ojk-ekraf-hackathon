'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { Badge } from '@/components/ui/glass/Badge';
import { ShoppingBag, Eye, TrendingUp, Calendar, Image } from 'lucide-react';
import Link from 'next/link';

// TODO: Fetch from blockchain using wagmi
const mockListings = [
  {
    listingId: '456',
    tokenId: '42',
    title: 'Music Album - Nusantara Dreams',
    assetType: 'MUSIC',
    price: '0.5',
    listedAt: '2025-01-12',
    views: 127,
    royaltyPercentage: 10,
  },
  {
    listingId: '789',
    tokenId: '156',
    title: 'Documentary Film - Heritage Stories',
    assetType: 'VIDEO',
    price: '1.2',
    listedAt: '2025-01-16',
    views: 89,
    royaltyPercentage: 12,
  },
];

export function MyListingsTab() {
  const totalListings = mockListings.length;
  const totalValue = mockListings.reduce((sum, listing) => sum + Number(listing.price), 0);
  const totalViews = mockListings.reduce((sum, listing) => sum + listing.views, 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard>
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text mb-2">{totalListings}</p>
              <p className="text-sm text-foreground/60">Active Listings</p>
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
              <p className="text-3xl font-bold text-green-400 mb-2">
                {totalValue.toFixed(2)} ETH
              </p>
              <p className="text-sm text-foreground/60">Total Value</p>
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
              <p className="text-3xl font-bold text-blue-400 mb-2">{totalViews}</p>
              <p className="text-sm text-foreground/60">Total Views</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Listing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockListings.map((listing, index) => (
          <motion.div
            key={listing.listingId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <ListingCard listing={listing} />
          </motion.div>
        ))}
      </div>

      {mockListings.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <GlassCard>
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-foreground/40" />
              <h3 className="text-xl font-bold mb-2">No Active Listings</h3>
              <p className="text-foreground/70 mb-6">
                List your NFTs on the marketplace to start selling
              </p>
              <Link href="/dashboard">
                <GlassButton variant="primary">View My NFTs</GlassButton>
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}

function ListingCard({ listing }: { listing: any }) {
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
          <div className="aspect-video rounded-xl bg-gradient-to-br from-green-600/20 to-blue-600/20 flex items-center justify-center">
            <Image className="w-16 h-16 text-green-400" />
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="success">Active</Badge>
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-3 left-3">
            <div className="glass rounded-lg px-3 py-1.5 bg-background/80 backdrop-blur-md">
              <p className="text-lg font-bold text-green-400">{listing.price} ETH</p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2">
          <h3 className="font-bold text-lg truncate">{listing.title}</h3>

          <div className="flex items-center gap-2">
            <Badge variant="default">{assetTypeLabels[listing.assetType]}</Badge>
            <Badge variant="default" className="bg-purple-600/80">
              {listing.royaltyPercentage}% Royalty
            </Badge>
          </div>

          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-foreground/60">
              <span>Listing ID:</span>
              <span className="font-mono">#{listing.listingId}</span>
            </div>
            <div className="flex justify-between text-foreground/60">
              <span>Token ID:</span>
              <span className="font-mono">#{listing.tokenId}</span>
            </div>
            <div className="flex justify-between text-foreground/60">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Listed:
              </span>
              <span>{new Date(listing.listedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-foreground/60">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                Views:
              </span>
              <span>{listing.views}</span>
            </div>
          </div>
        </div>

        {/* Performance Indicator */}
        <GlassCard className="bg-gradient-to-r from-green-600/10 to-blue-600/10">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-foreground/70">
              <TrendingUp className="w-3 h-3 text-green-400" />
              <span>Performance</span>
            </div>
            <Badge variant="success" className="text-xs">
              {listing.views > 100 ? 'High' : listing.views > 50 ? 'Medium' : 'Low'}
            </Badge>
          </div>
        </GlassCard>

        {/* Actions */}
        <div className="flex gap-2">
          <Link href={`/marketplace/${listing.tokenId}`} className="flex-1">
            <GlassButton variant="secondary" size="sm" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              View Listing
            </GlassButton>
          </Link>

          <GlassButton variant="ghost" size="sm" className="flex-1">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Manage
          </GlassButton>
        </div>
      </div>
    </GlassCard>
  );
}
