"use client";

import { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import {
  Image as ImageIcon,
  ShoppingBag,
  ExternalLink,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { formatEther } from "viem";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SkeletonGrid } from "@/components/ui/Skeleton";
import { useUserNFTs } from "@/lib/hooks/useUserNFTs";
import ListNFTModal from "./ListNFTModal";

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

interface MyNFTsTabProps {
  userAddress: string;
}

export default function MyNFTsTab({ userAddress }: MyNFTsTabProps) {
  const { nfts, isLoading, error } = useUserNFTs(userAddress);
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  const handleListForSale = (nft: any) => {
    setSelectedNFT(nft);
    setIsListModalOpen(true);
  };

  if (isLoading) {
    return <SkeletonGrid count={6} />;
  }

  if (error) {
    return (
      <Card className="p-8 border-red-200 bg-red-50">
        <h3 className="text-lg font-semibold text-red-900 mb-2">
          Error Loading NFTs
        </h3>
        <p className="text-red-700">{error.message}</p>
      </Card>
    );
  }

  if (nfts.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No NFTs Yet</h3>
        <p className="text-gray-600 mb-6">
          Mint your first NFT from your registered copyrights
        </p>
        <Button href="/mint">Mint Your First NFT</Button>
      </Card>
    );
  }

  return (
    <>
      <div>
        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total NFTs</p>
                <p className="text-3xl font-bold text-gray-900">{nfts.length}</p>
              </div>
              <ImageIcon className="w-10 h-10 text-primary-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Listed for Sale</p>
                <p className="text-3xl font-bold text-gray-900">
                  {nfts.filter((n) => n.isListed).length}
                </p>
              </div>
              <ShoppingBag className="w-10 h-10 text-green-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Not Listed</p>
                <p className="text-3xl font-bold text-gray-900">
                  {nfts.filter((n) => !n.isListed).length}
                </p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-accent-500" />
            </div>
          </Card>
        </div>

        {/* NFTs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => {
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
                      <ImageIcon className="w-16 h-16 text-gray-400" />
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

                  {nft.isListed && (
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium flex items-center gap-1">
                        <ShoppingBag className="w-3 h-3" />
                        Listed
                      </span>
                    </div>
                  )}

                  {nft.royaltyPercentage > 0 && (
                    <div className="absolute bottom-3 right-3">
                      <div className="flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                        <TrendingUp className="w-3 h-3" />
                        <span>{nft.royaltyPercentage}%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {nft.title || `NFT #${nft.tokenId}`}
                  </h3>

                  {nft.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {nft.description}
                    </p>
                  )}

                  {/* Metadata */}
                  <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Token ID</span>
                      <span className="font-mono font-medium text-gray-900">
                        #{nft.tokenId}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Copyright ID</span>
                      <span className="font-mono font-medium text-gray-900">
                        #{nft.copyrightId}
                      </span>
                    </div>
                    {nft.isListed && nft.listingPrice && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Listed Price</span>
                        <span className="font-bold text-green-700">
                          {parseFloat(formatEther(nft.listingPrice)).toFixed(4)}{" "}
                          ETH
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
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>

                    {!nft.isListed && (
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleListForSale(nft)}
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        List for Sale
                      </Button>
                    )}

                    <a
                      href={`https://sepolia.etherscan.io/token/${nft.tokenId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      title="View on Etherscan"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-600" />
                    </a>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* List NFT Modal */}
      {selectedNFT && (
        <ListNFTModal
          isOpen={isListModalOpen}
          onClose={() => {
            setIsListModalOpen(false);
            setSelectedNFT(null);
          }}
          nft={selectedNFT}
          onSuccess={() => {
            // Refresh the page or refetch NFTs
            window.location.reload();
          }}
        />
      )}
    </>
  );
}
