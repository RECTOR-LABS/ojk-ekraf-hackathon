'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { GlassInput } from '@/components/ui/glass/GlassInput';
import { Badge } from '@/components/ui/glass/Badge';
import { Search, Filter, ShoppingBag, TrendingUp, Image, Music, FileText, Video, Package } from 'lucide-react';
import Link from 'next/link';

// TODO: Fetch from blockchain using wagmi
const mockMarketplaceNFTs = [
  {
    tokenId: '42',
    listingId: '456',
    title: 'Music Album - Nusantara Dreams',
    assetType: 'MUSIC',
    price: '0.5',
    seller: '0xabcd...1234',
    royaltyPercentage: 10,
    views: 127,
  },
  {
    tokenId: '87',
    listingId: '321',
    title: 'Digital Artwork - Batik Modern',
    assetType: 'VISUAL_ART',
    price: '0.8',
    seller: '0xef56...5678',
    royaltyPercentage: 15,
    views: 203,
  },
  {
    tokenId: '156',
    listingId: '789',
    title: 'Documentary Film - Heritage Stories',
    assetType: 'VIDEO',
    price: '1.2',
    seller: '0x9012...9abc',
    royaltyPercentage: 12,
    views: 89,
  },
  {
    tokenId: '234',
    listingId: '654',
    title: 'Short Story Collection - Islands',
    assetType: 'LITERATURE',
    price: '0.3',
    seller: '0xdef0...def0',
    royaltyPercentage: 8,
    views: 145,
  },
  {
    tokenId: '567',
    listingId: '987',
    title: 'Traditional Dance Recording',
    assetType: 'VIDEO',
    price: '0.6',
    seller: '0x1111...2222',
    royaltyPercentage: 10,
    views: 178,
  },
  {
    tokenId: '890',
    listingId: '135',
    title: 'Wayang Kulit Performance',
    assetType: 'MUSIC',
    price: '0.4',
    seller: '0x3333...4444',
    royaltyPercentage: 9,
    views: 96,
  },
];

const assetTypes = [
  { value: 'ALL', label: 'All Types', icon: Package },
  { value: 'VISUAL_ART', label: 'Visual Art', icon: Image },
  { value: 'MUSIC', label: 'Music', icon: Music },
  { value: 'LITERATURE', label: 'Literature', icon: FileText },
  { value: 'VIDEO', label: 'Video', icon: Video },
];

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssetType, setSelectedAssetType] = useState('ALL');
  const [sortBy, setSortBy] = useState('recent');

  // Filter NFTs
  const filteredNFTs = mockMarketplaceNFTs.filter((nft) => {
    const matchesSearch =
      searchQuery === '' ||
      nft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedAssetType === 'ALL' || nft.assetType === selectedAssetType;
    return matchesSearch && matchesType;
  });

  // Sort NFTs
  const sortedNFTs = [...filteredNFTs].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return Number(a.price) - Number(b.price);
      case 'price-high':
        return Number(b.price) - Number(a.price);
      case 'popular':
        return b.views - a.views;
      default:
        return 0;
    }
  });

  const totalVolume = mockMarketplaceNFTs
    .reduce((sum, nft) => sum + Number(nft.price), 0)
    .toFixed(2);
  const totalNFTs = mockMarketplaceNFTs.length;
  const avgPrice = (Number(totalVolume) / totalNFTs).toFixed(3);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <motion.div className="mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          <span className="gradient-text">NFT Marketplace</span>
        </h1>
        <p className="text-xl text-foreground/70">
          Discover and collect unique creative works from Indonesian creators
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard>
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text mb-2">{totalNFTs}</p>
              <p className="text-sm text-foreground/60">Listed NFTs</p>
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
              <p className="text-3xl font-bold text-green-400 mb-2">{totalVolume} ETH</p>
              <p className="text-sm text-foreground/60">Total Volume</p>
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

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard className="mb-8">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <GlassInput
                type="text"
                placeholder="Search by title or creator address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <Filter className="w-4 h-4" />
                <span className="font-semibold">Filter by:</span>
              </div>

              {assetTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedAssetType(type.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    selectedAssetType === type.value
                      ? 'bg-purple-600/30 border-2 border-purple-600/50 text-foreground'
                      : 'bg-white/5 border-2 border-transparent text-foreground/60 hover:text-foreground hover:bg-white/10'
                  }`}
                >
                  <type.icon className="w-4 h-4" />
                  <span className="font-medium">{type.label}</span>
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2 text-sm text-foreground/60">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">Sort by:</span>
              </div>

              {[
                { value: 'recent', label: 'Recently Listed' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' },
                { value: 'popular', label: 'Most Popular' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                    sortBy === option.value
                      ? 'bg-blue-600/30 border-2 border-blue-600/50 text-foreground'
                      : 'bg-white/5 border-2 border-transparent text-foreground/60 hover:text-foreground hover:bg-white/10'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* NFT Grid */}
      {sortedNFTs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedNFTs.map((nft, index) => (
            <motion.div
              key={nft.tokenId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <MarketplaceNFTCard nft={nft} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <GlassCard>
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-foreground/40" />
              <h3 className="text-xl font-bold mb-2">No NFTs Found</h3>
              <p className="text-foreground/70">Try adjusting your search or filters</p>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}

interface NFT {
  tokenId: string;
  listingId: string;
  title: string;
  assetType: string;
  price: string;
  seller: string;
  royaltyPercentage: number;
  views: number;
}

function MarketplaceNFTCard({ nft }: { nft: NFT }) {
  const assetTypeLabels: { [key: string]: string } = {
    VISUAL_ART: 'Visual Art',
    MUSIC: 'Music',
    LITERATURE: 'Literature',
    VIDEO: 'Video',
    OTHER: 'Other',
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'VISUAL_ART':
        return Image;
      case 'MUSIC':
        return Music;
      case 'LITERATURE':
        return FileText;
      case 'VIDEO':
        return Video;
      default:
        return Package;
    }
  };

  const AssetIcon = getAssetIcon(nft.assetType);

  return (
    <Link href={`/marketplace/${nft.tokenId}`}>
      <GlassCard hover className="h-full">
        <div className="space-y-4">
          {/* Thumbnail */}
          <div className="relative">
            <div className="aspect-square rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
              <AssetIcon className="w-16 h-16 text-purple-400" />
            </div>

            {/* Royalty Badge */}
            <div className="absolute top-3 right-3">
              <Badge variant="default" className="bg-purple-600/80 backdrop-blur-sm">
                {nft.royaltyPercentage}%
              </Badge>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-lg truncate mb-1">{nft.title}</h3>
              <Badge variant="default" className="text-xs">
                {assetTypeLabels[nft.assetType]}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-foreground/60">Price:</span>
                <span className="font-bold text-green-400 text-lg">{nft.price} ETH</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-foreground/60">Seller:</span>
                <span className="font-mono text-foreground/80">{nft.seller}</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-foreground/60">Views:</span>
                <span className="text-foreground/80">{nft.views}</span>
              </div>
            </div>

            {/* Buy Button Hint */}
            <div className="pt-2 border-t border-foreground/10">
              <div className="flex items-center justify-center gap-2 text-sm text-purple-400 font-semibold">
                <ShoppingBag className="w-4 h-4" />
                <span>View Details</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
