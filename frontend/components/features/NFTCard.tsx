"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, User, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatEther } from "viem";

interface NFTCardProps {
  listing: {
    listingId: number;
    tokenId: number;
    seller: string;
    price: bigint;
    active: boolean;
    // NFT Metadata
    title?: string;
    description?: string;
    image?: string;
    assetType?: number;
    royaltyPercentage?: number;
    creator?: string;
  };
}

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

export default function NFTCard({ listing }: NFTCardProps) {
  const [imageError, setImageError] = useState(false);

  const assetTypeLabel =
    listing.assetType !== undefined
      ? ASSET_TYPE_LABELS[listing.assetType]
      : "Unknown";
  const assetTypeColor =
    listing.assetType !== undefined
      ? ASSET_TYPE_COLORS[listing.assetType]
      : "bg-gray-100 text-gray-700";

  const formattedPrice = listing.price
    ? parseFloat(formatEther(listing.price)).toFixed(4)
    : "0.0000";

  const shortAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Link href={`/marketplace/${listing.tokenId}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-2 border-transparent hover:border-primary-500">
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          {!imageError && listing.image ? (
            <Image
              src={listing.image}
              alt={listing.title || `NFT #${listing.tokenId}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                  <ExternalLink className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">No preview</p>
              </div>
            </div>
          )}

          {/* Asset Type Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${assetTypeColor}`}
            >
              {assetTypeLabel}
            </span>
          </div>

          {/* Royalty Badge */}
          {listing.royaltyPercentage !== undefined && (
            <div className="absolute top-3 right-3">
              <div className="flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                <TrendingUp className="w-3 h-3" />
                <span>{listing.royaltyPercentage}%</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {listing.title || `NFT #${listing.tokenId}`}
          </h3>

          {/* Description */}
          {listing.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {listing.description}
            </p>
          )}

          {/* Creator */}
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200">
            <div className="w-6 h-6 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Creator</p>
              <p className="text-xs font-medium text-gray-900">
                {listing.creator
                  ? shortAddress(listing.creator)
                  : shortAddress(listing.seller)}
              </p>
            </div>
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Price</p>
              <p className="text-xl font-bold text-gray-900">
                {formattedPrice}{" "}
                <span className="text-sm font-normal text-gray-600">ETH</span>
              </p>
            </div>

            <Button
              size="small"
              className="group-hover:bg-primary-600 group-hover:shadow-lg transition-all"
            >
              View
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
