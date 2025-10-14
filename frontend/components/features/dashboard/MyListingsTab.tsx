"use client";

import Link from "next/link";
import NextImage from "next/image";
import { ShoppingBag } from "lucide-react";
import { formatEther } from "viem";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SkeletonGrid } from "@/components/ui/Skeleton";
import { useUserNFTs } from "@/lib/hooks/useUserNFTs";

const ASSET_TYPE_LABELS: Record<number, string> = {
  0: "Art",
  1: "Music",
  2: "Photography",
  3: "Writing",
  4: "Design",
};

const ASSET_TYPE_COLORS: Record<number, string> = {
  0: "bg-purple-100 text-purple-700",
  1: "bg-pink-100 text-pink-700",
  2: "bg-blue-100 text-blue-700",
  3: "bg-green-100 text-green-700",
  4: "bg-orange-100 text-orange-700",
};

interface MyListingsTabProps {
  userAddress: string;
}

export default function MyListingsTab({ userAddress }: MyListingsTabProps) {
  const { nfts, isLoading, error } = useUserNFTs(userAddress);

  // Filter only listed NFTs
  const listedNFTs = nfts.filter((nft) => nft.isListed);

  if (isLoading) {
    return <SkeletonGrid count={6} />;
  }

  if (error) {
    return (
      <Card className="p-8 border-red-200 bg-red-50">
        <h3 className="text-lg font-semibold text-red-900 mb-2">
          Error Loading Listings
        </h3>
        <p className="text-red-700">{error.message}</p>
      </Card>
    );
  }

  if (listedNFTs.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Active Listings
        </h3>
        <p className="text-gray-600 mb-6">
          You don't have any NFTs listed for sale yet
        </p>
        <Link href="/dashboard?tab=nfts">
          <Button>Go to My NFTs</Button>
        </Link>
      </Card>
    );
  }

  return (
    <div>
      {/* Stats */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Active Listings</p>
            <p className="text-3xl font-bold text-gray-900">
              {listedNFTs.length}
            </p>
          </div>
          <ShoppingBag className="w-10 h-10 text-green-500" />
        </div>
      </Card>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listedNFTs.map((nft) => {
          const assetTypeLabel =
            nft.assetType !== undefined
              ? ASSET_TYPE_LABELS[nft.assetType]
              : "Unknown";
          const assetTypeColor =
            nft.assetType !== undefined
              ? ASSET_TYPE_COLORS[nft.assetType]
              : "bg-gray-100 text-gray-700";

          return (
            <Card
              key={nft.tokenId}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative aspect-square bg-gray-100">
                {nft.image ? (
                  <NextImage
                    src={nft.image}
                    alt={nft.title || `NFT #${nft.tokenId}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-16 h-16 text-gray-400" />
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${assetTypeColor}`}
                  >
                    {assetTypeLabel}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium flex items-center gap-1">
                    <ShoppingBag className="w-3 h-3" />
                    Active
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                  {nft.title || `NFT #${nft.tokenId}`}
                </h3>

                {/* Price */}
                {nft.listingPrice && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-xs text-green-700 mb-1">Listed Price</p>
                    <p className="text-2xl font-bold text-green-900">
                      {parseFloat(formatEther(nft.listingPrice)).toFixed(4)}{" "}
                      <span className="text-sm font-normal">ETH</span>
                    </p>
                  </div>
                )}

                {/* Metadata */}
                <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Token ID</span>
                    <span className="font-mono font-medium text-gray-900">
                      #{nft.tokenId}
                    </span>
                  </div>
                  {nft.listingId && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Listing ID</span>
                      <span className="font-mono font-medium text-gray-900">
                        #{nft.listingId}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/marketplace/${nft.tokenId}`}
                    className="flex-1"
                  >
                    <Button size="small" className="w-full">
                      View Listing
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
