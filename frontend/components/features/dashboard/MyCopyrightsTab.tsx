"use client";

import Link from "next/link";
import { FileText, CheckCircle2, ExternalLink, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useUserCopyrights } from "@/lib/hooks/useUserCopyrights";
import { SkeletonGrid } from "@/components/ui/Skeleton";

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

interface MyCopyrightsTabProps {
  userAddress: string;
}

export default function MyCopyrightsTab({ userAddress }: MyCopyrightsTabProps) {
  const { copyrights, isLoading, error } = useUserCopyrights(userAddress);

  if (isLoading) {
    return <SkeletonGrid count={6} />;
  }

  if (error) {
    return (
      <Card className="p-8 border-red-200 bg-red-50">
        <h3 className="text-lg font-semibold text-red-900 mb-2">
          Error Loading Copyrights
        </h3>
        <p className="text-red-700">{error.message}</p>
      </Card>
    );
  }

  if (copyrights.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Copyrights Yet
        </h3>
        <p className="text-gray-600 mb-6">
          Start protecting your creative work by registering your first copyright
        </p>
        <Button href="/register">Register Your First Copyright</Button>
      </Card>
    );
  }

  return (
    <div>
      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Copyrights</p>
              <p className="text-3xl font-bold text-gray-900">
                {copyrights.length}
              </p>
            </div>
            <FileText className="w-10 h-10 text-primary-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Minted as NFT</p>
              <p className="text-3xl font-bold text-gray-900">
                {copyrights.filter((c) => c.isMinted).length}
              </p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Ready to Mint</p>
              <p className="text-3xl font-bold text-gray-900">
                {copyrights.filter((c) => !c.isMinted).length}
              </p>
            </div>
            <Sparkles className="w-10 h-10 text-accent-500" />
          </div>
        </Card>
      </div>

      {/* Copyrights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {copyrights.map((copyright) => {
          const assetTypeLabel = ASSET_TYPE_LABELS[copyright.assetType];
          const assetTypeColor = ASSET_TYPE_COLORS[copyright.assetType];

          return (
            <Card key={copyright.registrationId} className="p-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${assetTypeColor}`}>
                  {assetTypeLabel}
                </span>
                {copyright.isMinted && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {copyright.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {copyright.description}
              </p>

              {/* Metadata */}
              <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Registration ID</span>
                  <span className="font-mono font-medium text-gray-900">
                    #{copyright.registrationId}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Registered</span>
                  <span className="font-medium text-gray-900">
                    {new Date(copyright.timestamp * 1000).toLocaleDateString()}
                  </span>
                </div>
                {copyright.isMinted && copyright.tokenId && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Token ID</span>
                    <span className="font-mono font-medium text-gray-900">
                      #{copyright.tokenId}
                    </span>
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="mb-4">
                {copyright.isMinted ? (
                  <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-medium">Minted as NFT</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                    <FileText className="w-4 h-4" />
                    <span className="font-medium">Not yet minted</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {copyright.isMinted && copyright.tokenId ? (
                  <Button
                    href={`/marketplace/${copyright.tokenId}`}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    View NFT
                  </Button>
                ) : (
                  <Link
                    href={`/mint?copyrightId=${copyright.registrationId}`}
                    className="flex-1"
                  >
                    <Button size="sm" className="w-full">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Mint NFT
                    </Button>
                  </Link>
                )}
                <a
                  href={`https://sepolia.etherscan.io/address/${copyright.creator}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  title="View on Etherscan"
                >
                  <ExternalLink className="w-4 h-4 text-gray-600" />
                </a>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
