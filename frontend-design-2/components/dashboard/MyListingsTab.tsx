'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { Badge } from '@/components/ui/glass/Badge';
import { LoadingSpinner } from '@/components/ui/glass/Loading';
import { ShoppingBag, Eye, TrendingUp, Calendar, Image, Music, BookOpen, Video, File } from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';
import { useUserListings, type UserListing } from '@/lib/hooks/useUserListings';

export function MyListingsTab() {
  const { listings, isLoading, error, totalListings } = useUserListings();

  const totalValue = listings.reduce((sum, listing) => sum + Number(listing.price), 0);
  const avgPrice = totalListings > 0 ? (totalValue / totalListings).toFixed(3) : '0.000';

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
          <p className="text-red-400 mb-2">Failed to load listings</p>
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
              <p className="text-3xl font-bold text-blue-400 mb-2">{avgPrice} ETH</p>
              <p className="text-sm text-foreground/60">Average Price</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Listing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing, index) => (
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

      {listings.length === 0 && (
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

function ListingCard({ listing }: { listing: UserListing }) {
  const [imageError, setImageError] = useState(false);

  const assetTypeLabels: { [key: string]: string } = {
    VISUAL_ART: 'Visual Art',
    MUSIC: 'Music',
    LITERATURE: 'Literature',
    VIDEO: 'Video',
    OTHER: 'Other',
  };

  const imageUrl = listing.ipfsCID && listing.assetType === 'VISUAL_ART'
    ? `https://gateway.pinata.cloud/ipfs/${listing.ipfsCID}`
    : null;

  // Asset type icon mapping
  const getAssetIcon = () => {
    switch (listing.assetType) {
      case 'MUSIC':
        return <Music className="w-16 h-16 text-purple-400" aria-label="Music" />;
      case 'LITERATURE':
        return <BookOpen className="w-16 h-16 text-blue-400" aria-label="Literature" />;
      case 'VIDEO':
        return <Video className="w-16 h-16 text-green-400" aria-label="Video" />;
      case 'OTHER':
        return <File className="w-16 h-16 text-gray-400" aria-label="Other" />;
      default:
        return <Image className="w-16 h-16 text-green-400" aria-label="Visual Art" />;
    }
  };

  return (
    <GlassCard hover>
      <div className="space-y-4">
        {/* Thumbnail */}
        <div className="relative">
          <div className="aspect-video rounded-xl bg-gradient-to-br from-green-600/20 to-blue-600/20 flex items-center justify-center overflow-hidden">
            {imageUrl && !imageError ? (
              <NextImage
                src={imageUrl}
                alt={listing.title}
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
              <span>Copyright ID:</span>
              <span className="font-mono">#{listing.copyrightId}</span>
            </div>
          </div>
        </div>

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
