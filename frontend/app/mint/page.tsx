'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { Card, Button, Spinner } from '@/components/ui';
import { copyrightRegistryAddress, copyrightRegistryABI } from '@/lib/contracts';
import { MintNFTModal } from '@/components/features/MintNFTModal';

// Asset type labels
const assetTypeLabels = ['Digital Art', 'Music', 'Photography', 'Writing', 'Design'];

// Copyright data type from contract
interface Copyright {
  id: bigint;
  creator: string;
  contentHash: string;
  ipfsCID: string;
  title: string;
  description: string;
  assetType: number;
  tags: string[];
  timestamp: bigint;
  exists: boolean;
}

export default function MintPage() {
  const { address, isConnected } = useAccount();
  const [selectedCopyright, setSelectedCopyright] = useState<Copyright | null>(null);
  const [mintSuccess, setMintSuccess] = useState<{ txHash: string; tokenId: bigint } | null>(null);

  // Fetch user's registered copyright IDs
  const {
    data: copyrightIds,
    isLoading: isLoadingIds,
    error: idsError,
    refetch: refetchIds
  } = useReadContract({
    address: copyrightRegistryAddress,
    abi: copyrightRegistryABI,
    functionName: 'getRegistrationsByCreator',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
    },
  });

  // Not connected state
  if (!isConnected || !address) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-warning-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-warning-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Wallet Not Connected</h2>
            <p className="text-neutral-600 mb-8">Please connect your wallet to view and mint your registered copyrights.</p>
            <Button variant="primary" size="large">
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoadingIds) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Spinner size="large" className="mx-auto mb-6" />
            <p className="text-neutral-600">Loading your registered copyrights...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (idsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-error-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-error-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-error-900 mb-4">Failed to Load Copyrights</h2>
            <p className="text-neutral-600 mb-8">There was an error loading your registered copyrights.</p>
            <Button onClick={() => refetchIds()} variant="primary">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // No copyrights registered
  const ids = copyrightIds as bigint[] || [];
  if (ids.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-neutral-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">No Copyrights Registered</h2>
            <p className="text-neutral-600 mb-8">You haven't registered any copyrights yet. Register your work first before minting NFTs.</p>
            <Button
              onClick={() => window.location.href = '/register'}
              variant="primary"
              size="large"
            >
              Register Copyright
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Success modal
  if (mintSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-success-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold font-display text-neutral-900 mb-2">
              NFT Minted Successfully! 🎉
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Your copyright is now a tradeable NFT with royalties
            </p>

            {/* NFT Details */}
            <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">NFT Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-neutral-700">Token ID</p>
                  <code className="text-lg font-mono text-primary-600">
                    #{mintSuccess.tokenId.toString()}
                  </code>
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-700">Transaction Hash</p>
                  <a
                    href={`https://sepolia.etherscan.io/tx/${mintSuccess.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary-600 hover:text-primary-500 underline break-all block"
                  >
                    {mintSuccess.txHash}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => window.open(`https://sepolia.etherscan.io/tx/${mintSuccess.txHash}`, '_blank')}
                variant="secondary"
                size="large"
              >
                View on Etherscan
              </Button>
              <Button
                onClick={() => window.location.href = '/marketplace'}
                variant="primary"
                size="large"
              >
                List on Marketplace
              </Button>
            </div>

            <div className="mt-8">
              <button
                onClick={() => {
                  setMintSuccess(null);
                  refetchIds();
                }}
                className="text-sm text-neutral-600 hover:text-neutral-900"
              >
                Mint Another NFT →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold font-display text-neutral-900 mb-4">
            Mint Your NFTs
          </h1>
          <p className="text-lg text-neutral-600 mb-2">
            Cetak NFT dari Karya Anda
          </p>
          <p className="text-neutral-500">
            Convert your registered copyrights into tradeable NFTs with royalties
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">About Minting NFTs</h3>
              <p className="text-neutral-700 mb-3">
                Minting converts your registered copyright into a unique NFT (ERC-721) that you can sell on marketplaces.
                You'll earn royalties (5-20%) on every future sale!
              </p>
              <ul className="space-y-1 text-sm text-neutral-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-600"></span>
                  Each copyright can only be minted once
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-600"></span>
                  You set the royalty percentage (5-20%)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-600"></span>
                  NFT metadata is stored on IPFS (decentralized)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyrights Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Your Registered Copyrights ({ids.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ids.map((id) => (
              <CopyrightCard
                key={id.toString()}
                registrationId={id}
                onMintClick={(copyright) => setSelectedCopyright(copyright)}
              />
            ))}
          </div>
        </div>

        {/* Mint NFT Modal */}
        {selectedCopyright && (
          <MintNFTModal
            copyright={selectedCopyright}
            onClose={() => setSelectedCopyright(null)}
            onSuccess={(txHash, tokenId) => {
              setSelectedCopyright(null);
              setMintSuccess({ txHash, tokenId });
            }}
          />
        )}
      </div>
    </div>
  );
}

// Copyright Card Component
function CopyrightCard({
  registrationId,
  onMintClick
}: {
  registrationId: bigint;
  onMintClick: (copyright: Copyright) => void;
}) {
  // Fetch individual copyright details
  const {
    data: copyright,
    isLoading,
    error
  } = useReadContract({
    address: copyrightRegistryAddress,
    abi: copyrightRegistryABI,
    functionName: 'getRegistration',
    args: [registrationId],
  });

  if (isLoading) {
    return (
      <Card variant="outlined" className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-neutral-200 rounded mb-3"></div>
          <div className="h-4 bg-neutral-200 rounded mb-2"></div>
          <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
        </div>
      </Card>
    );
  }

  if (error || !copyright) {
    return (
      <Card variant="outlined" className="p-6">
        <p className="text-sm text-error-600">Failed to load</p>
      </Card>
    );
  }

  const data = copyright as Copyright;

  return (
    <Card variant="outlined" className="p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-semibold text-primary-600">
            #{registrationId.toString()}
          </span>
          <span className="px-2 py-1 bg-accent-100 text-accent-700 rounded text-xs font-medium">
            {assetTypeLabels[data.assetType]}
          </span>
        </div>
        <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2">
          {data.title}
        </h3>
        <p className="text-sm text-neutral-600 line-clamp-3 mb-3">
          {data.description}
        </p>
        {data.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {data.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-xs">
                {tag}
              </span>
            ))}
            {data.tags.length > 3 && (
              <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-xs">
                +{data.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-neutral-200 pt-4">
        <Button
          variant="primary"
          className="w-full"
          onClick={() => onMintClick(data)}
        >
          Mint NFT
        </Button>
      </div>
    </Card>
  );
}
