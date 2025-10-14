"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  usePublicClient,
} from "wagmi";
import { formatEther } from "viem";
import {
  ArrowLeft,
  ExternalLink,
  User,
  TrendingUp,
  ShieldCheck,
  Tag,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ErrorDisplay } from "@/components/ui/ErrorDisplay";
import { marketplaceABI, marketplaceAddress } from "@/lib/contracts/marketplace";
import { karyaNFTABI, karyaNFTAddress } from "@/lib/contracts/karyaNFT";
import { parseContractError } from "@/lib/utils/errors";

const ASSET_TYPE_LABELS: Record<number, string> = {
  0: "Art",
  1: "Music",
  2: "Photography",
  3: "Writing",
  4: "Design",
};

export default function NFTDetailPage() {
  const params = useParams();
  const { address: userAddress, isConnected } = useAccount();
  const publicClient = usePublicClient();

  const tokenId = params.tokenId ? BigInt(params.tokenId as string) : undefined;

  const [nftMetadata, setNftMetadata] = useState<any>(null);
  const [listingData, setListingData] = useState<any>(null);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Fetch NFT owner
  const { data: nftOwner } = useReadContract({
    address: karyaNFTAddress as `0x${string}`,
    abi: karyaNFTABI,
    functionName: "ownerOf",
    args: tokenId ? [tokenId] : undefined,
  });

  // Fetch token URI
  const { data: tokenURI } = useReadContract({
    address: karyaNFTAddress as `0x${string}`,
    abi: karyaNFTABI,
    functionName: "tokenURI",
    args: tokenId ? [tokenId] : undefined,
  });

  // Fetch royalty info
  const { data: royaltyInfo } = useReadContract({
    address: karyaNFTAddress as `0x${string}`,
    abi: karyaNFTABI,
    functionName: "royaltyInfo",
    args: tokenId ? [tokenId, BigInt(10000)] : undefined,
  });

  // Check if NFT is listed
  const { data: isListed } = useReadContract({
    address: marketplaceAddress as `0x${string}`,
    abi: marketplaceABI,
    functionName: "isNFTListed",
    args: tokenId ? [karyaNFTAddress, tokenId] : undefined,
  });

  // Fetch listing if listed
  const { data: listingIdData } = useReadContract({
    address: marketplaceAddress as `0x${string}`,
    abi: marketplaceABI,
    functionName: "getListingByNFT",
    args: tokenId && isListed ? [karyaNFTAddress, tokenId] : undefined,
  });

  // Purchase NFT
  const {
    writeContract: purchaseNFT,
    data: purchaseHash,
    isPending: isPurchasing,
    error: purchaseError,
  } = useWriteContract();

  const { isLoading: isPurchaseConfirming, isSuccess: isPurchaseSuccess } =
    useWaitForTransactionReceipt({
      hash: purchaseHash,
    });

  // Fetch metadata from IPFS
  useEffect(() => {
    if (!tokenURI) return;

    async function fetchMetadata() {
      try {
        const ipfsUrl = (tokenURI as string).replace(
          "ipfs://",
          "https://gateway.pinata.cloud/ipfs/"
        );
        const response = await fetch(ipfsUrl);
        if (response.ok) {
          const data = await response.json();
          setNftMetadata(data);
        }
      } catch (err) {
        console.error("Error fetching metadata:", err);
      } finally {
        setIsLoadingMetadata(false);
      }
    }

    fetchMetadata();
  }, [tokenURI]);

  // Fetch listing data if listed
  useEffect(() => {
    if (!listingIdData || !publicClient) return;

    async function fetchListing() {
      try {
        const listing = await publicClient!.readContract({
          address: marketplaceAddress as `0x${string}`,
          abi: marketplaceABI,
          functionName: "getListing",
          args: [listingIdData as bigint],
        });
        setListingData(listing);
      } catch (err) {
        console.error("Error fetching listing:", err);
      }
    }

    fetchListing();
  }, [listingIdData, publicClient]);

  const handlePurchase = async () => {
    if (!listingData || !isConnected) return;

    try {
      purchaseNFT({
        address: marketplaceAddress as `0x${string}`,
        abi: marketplaceABI,
        functionName: "buyNFT",
        args: [listingData.listingId],
        value: listingData.price,
      });
    } catch (err) {
      console.error("Purchase error:", err);
    }
  };

  if (isLoadingMetadata || !tokenId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading NFT details...</p>
        </div>
      </div>
    );
  }

  const assetType = nftMetadata?.attributes?.find(
    (attr: any) => attr.trait_type === "Asset Type"
  )?.value;
  const creator = nftMetadata?.attributes?.find(
    (attr: any) => attr.trait_type === "Creator"
  )?.value;
  const copyrightId = nftMetadata?.attributes?.find(
    (attr: any) => attr.trait_type === "Copyright ID"
  )?.value;
  const royaltyPercentage = royaltyInfo ? Number(royaltyInfo[1]) / 100 : 0;

  const isOwner = userAddress?.toLowerCase() === (nftOwner as string)?.toLowerCase();
  const isSeller =
    listingData &&
    userAddress?.toLowerCase() === listingData.seller?.toLowerCase();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Marketplace</span>
        </Link>

        {/* Purchase Success Banner */}
        {isPurchaseSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-900 mb-1">
                Purchase Successful!
              </h3>
              <p className="text-green-700 mb-3">
                You are now the owner of this NFT.
              </p>
              <a
                href={`https://sepolia.etherscan.io/tx/${purchaseHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-green-700 hover:text-green-900 underline"
              >
                View on Etherscan
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Purchase Error Banner */}
        {purchaseError && (
          <div className="mb-6">
            <ErrorDisplay
              error={parseContractError(purchaseError)}
              onRetry={handlePurchase}
            />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="relative aspect-square bg-gray-100">
                {!imageError && nftMetadata?.image ? (
                  <Image
                    src={nftMetadata.image.replace(
                      "ipfs://",
                      "https://gateway.pinata.cloud/ipfs/"
                    )}
                    alt={nftMetadata.name || `NFT #${tokenId.toString()}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    onError={() => setImageError(true)}
                    priority={true}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <ExternalLink className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">No preview available</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Properties Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-primary-500" />
                Properties
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {nftMetadata?.attributes?.map((attr: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                  >
                    <p className="text-xs text-gray-500 uppercase mb-1">
                      {attr.trait_type}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {typeof attr.value === "number"
                        ? ASSET_TYPE_LABELS[attr.value] || attr.value
                        : attr.value}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Title and Description */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                {assetType !== undefined && (
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {ASSET_TYPE_LABELS[assetType]}
                  </span>
                )}
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  Token #{tokenId.toString()}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-gray-900 mb-4">
                {nftMetadata?.name || `NFT #${tokenId.toString()}`}
              </h1>
              {nftMetadata?.description && (
                <p className="text-lg text-gray-600">{nftMetadata.description}</p>
              )}
            </div>

            {/* Creator Info */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Creator</p>
                  <p className="font-medium text-gray-900">
                    {creator
                      ? `${creator.slice(0, 6)}...${creator.slice(-4)}`
                      : "Unknown"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Owner</p>
                  <p className="font-medium text-gray-900">
                    {isOwner
                      ? "You"
                      : nftOwner
                      ? `${(nftOwner as string).slice(0, 6)}...${(nftOwner as string).slice(-4)}`
                      : "Unknown"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Royalty Info */}
            {royaltyPercentage > 0 && (
              <Card className="p-6 bg-gradient-to-br from-accent-50 to-white border-accent-200">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-accent-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Creator Royalties
                  </h3>
                </div>
                <p className="text-gray-600 mb-2">
                  {royaltyPercentage}% of every sale goes to the original creator
                </p>
                <p className="text-sm text-gray-500">
                  Supporting creators on every secondary sale
                </p>
              </Card>
            )}

            {/* Copyright Registration */}
            {copyrightId && (
              <Card className="p-6 bg-gradient-to-br from-secondary-50 to-white border-secondary-200">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-5 h-5 text-secondary-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Copyright Protected
                  </h3>
                </div>
                <p className="text-gray-600 mb-3">
                  This work is registered on-chain and protected by copyright
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="font-medium">Registration ID:</span>
                  <span className="font-mono bg-white px-2 py-1 rounded border border-secondary-200">
                    #{copyrightId}
                  </span>
                </div>
              </Card>
            )}

            {/* Listing Info & Purchase */}
            {isListed && listingData ? (
              <Card className="p-6 border-2 border-primary-200">
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">Current Price</p>
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                    {parseFloat(formatEther(listingData.price)).toFixed(4)}{" "}
                    <span className="text-xl sm:text-2xl font-normal text-gray-600">
                      ETH
                    </span>
                  </p>
                </div>

                {isOwner || isSeller ? (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600">
                      {isOwner
                        ? "You own this NFT"
                        : "You are the seller of this NFT"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      onClick={handlePurchase}
                      disabled={
                        !isConnected ||
                        isPurchasing ||
                        isPurchaseConfirming ||
                        isPurchaseSuccess
                      }
                      className="w-full"
                      size="large"
                    >
                      {!isConnected ? (
                        "Connect Wallet to Purchase"
                      ) : isPurchasing || isPurchaseConfirming ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          {isPurchasing
                            ? "Confirm in Wallet..."
                            : "Processing Purchase..."}
                        </>
                      ) : isPurchaseSuccess ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 mr-2" />
                          Purchased!
                        </>
                      ) : (
                        "Buy Now"
                      )}
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      Includes {royaltyPercentage}% creator royalty + 2.5%
                      platform fee
                    </p>
                  </div>
                )}

                {/* Seller Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Seller</p>
                      <p className="font-medium text-gray-900">
                        {isSeller
                          ? "You"
                          : `${listingData.seller.slice(0, 6)}...${listingData.seller.slice(-4)}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Listed</p>
                      <p className="font-medium text-gray-900">
                        {new Date(
                          Number(listingData.listedAt) * 1000
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-6 border-2 border-gray-200">
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-2">Not currently for sale</p>
                  {isOwner && (
                    <p className="text-sm text-gray-500">
                      Go to your dashboard to list this NFT
                    </p>
                  )}
                </div>
              </Card>
            )}

            {/* External Links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://sepolia.etherscan.io/token/${karyaNFTAddress}?a=${tokenId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
              >
                <ExternalLink className="w-4 h-4" />
                View on Etherscan
              </a>
              {tokenURI && (
                <a
                  href={(tokenURI as string).replace(
                    "ipfs://",
                    "https://gateway.pinata.cloud/ipfs/"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Metadata
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
