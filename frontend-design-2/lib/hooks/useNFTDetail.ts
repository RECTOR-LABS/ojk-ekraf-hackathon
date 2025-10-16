'use client';

import { useMemo } from 'react';
import { useReadContract, useReadContracts, useAccount } from 'wagmi';
import { KaryaMarketplaceAddress, KaryaMarketplaceABI } from '@/lib/contracts/KaryaMarketplace';
import { KaryaNFTAddress, KaryaNFTABI } from '@/lib/contracts/KaryaNFT';
import { CopyrightRegistryAddress, CopyrightRegistryABI } from '@/lib/contracts/CopyrightRegistry';
import { formatEther } from 'viem';

export interface NFTDetail {
  tokenId: string;
  listingId: string | null;
  copyrightId: string;
  title: string;
  description: string;
  assetType: string;
  ipfsCID: string;
  contentHash: string;
  price: string; // in ETH
  priceWei: string; // in wei
  seller: string;
  owner: string;
  creator: string;
  royaltyPercentage: number;
  registeredAt: string;
  listedAt: string | null;
  isListed: boolean;
  isOwner: boolean;
  isSeller: boolean;
}

const assetTypeLabels: { [key: number]: string } = {
  0: 'VISUAL_ART',
  1: 'MUSIC',
  2: 'LITERATURE',
  3: 'VIDEO',
  4: 'OTHER',
};

export function useNFTDetail(tokenId: string) {
  const { address: userAddress } = useAccount();

  // 1. Fetch basic NFT info (owner, copyright ID, royalty)
  const nftCalls = useMemo(() => {
    if (!tokenId) return [];

    return [
      {
        address: KaryaNFTAddress,
        abi: KaryaNFTABI,
        functionName: 'ownerOf',
        args: [BigInt(tokenId)],
      },
      {
        address: KaryaNFTAddress,
        abi: KaryaNFTABI,
        functionName: 'getCopyrightId',
        args: [BigInt(tokenId)],
      },
      {
        address: KaryaNFTAddress,
        abi: KaryaNFTABI,
        functionName: 'royaltyInfo',
        args: [BigInt(tokenId), BigInt(1000000000000000000)], // 1 ETH
      },
    ];
  }, [tokenId]);

  const { data: nftData, isLoading: isLoadingNFT, error: nftError } = useReadContracts({
    contracts: nftCalls as any,
    query: {
      enabled: nftCalls.length > 0,
      retry: 1,
      retryDelay: 1000,
    },
  });

  // 2. Get copyright ID for subsequent calls
  const copyrightId = useMemo(() => {
    if (!nftData || nftData.length < 2) return null;
    const copyrightIdData = nftData[1];
    if (copyrightIdData?.status === 'success' && copyrightIdData.result) {
      return copyrightIdData.result as bigint;
    }
    return null;
  }, [nftData]);

  // 3. Fetch copyright details
  const { data: copyrightData, isLoading: isLoadingCopyright, error: copyrightError } = useReadContract({
    address: CopyrightRegistryAddress,
    abi: CopyrightRegistryABI,
    functionName: 'getRegistration',
    args: copyrightId ? [copyrightId] : undefined,
    query: {
      enabled: !!copyrightId,
      retry: 1,
      retryDelay: 1000,
    },
  });

  // 4. Fetch listing status (check if NFT is listed)
  const { data: allListingIds } = useReadContract({
    address: KaryaMarketplaceAddress,
    abi: KaryaMarketplaceABI,
    functionName: 'getAllListingIds',
  });

  // 5. Build calls to check each listing
  const listingCheckCalls = useMemo(() => {
    if (!allListingIds || !Array.isArray(allListingIds)) return [];

    return allListingIds.map((listingId) => ({
      address: KaryaMarketplaceAddress,
      abi: KaryaMarketplaceABI,
      functionName: 'getListing',
      args: [listingId],
    }));
  }, [allListingIds]);

  const { data: allListings } = useReadContracts({
    contracts: listingCheckCalls as any,
    query: {
      enabled: listingCheckCalls.length > 0,
    },
  });

  // 6. Find listing for this token
  const listingInfo = useMemo(() => {
    if (!allListings || !tokenId) return null;

    for (const result of allListings) {
      if (result.status === 'success' && result.result) {
        const listing = result.result as any;
        if (String(listing.tokenId) === tokenId && listing.active) {
          return listing;
        }
      }
    }
    return null;
  }, [allListings, tokenId]);

  // 7. Build final NFT detail object
  const nftDetail = useMemo((): NFTDetail | null => {
    if (!nftData || !copyrightData || !tokenId) return null;

    const ownerData = nftData[0];
    const royaltyData = nftData[2];

    if (ownerData?.status !== 'success' || !ownerData.result) return null;

    const owner = ownerData.result as string;
    const copyright = copyrightData as any;

    // Extract copyright details
    const title = copyright.title || 'Untitled';
    const description = copyright.description || '';
    const assetType = assetTypeLabels[Number(copyright.assetType)] || 'OTHER';
    const ipfsCID = copyright.ipfsCID || '';
    const contentHash = copyright.contentHash || '0x';
    const creator = copyright.creator || '0x';
    const registeredAt = copyright.timestamp
      ? new Date(Number(copyright.timestamp) * 1000).toISOString()
      : new Date().toISOString();

    // Calculate royalty percentage
    let royaltyPercentage = 10;
    if (royaltyData?.status === 'success' && royaltyData.result) {
      const royaltyResult = royaltyData.result as any;
      const royaltyAmount = BigInt(royaltyResult[1]);
      const salePrice = BigInt(1000000000000000000); // 1 ETH
      royaltyPercentage = Number((royaltyAmount * BigInt(100)) / salePrice);
    }

    // Extract listing info if exists
    const isListed = !!listingInfo;
    const price = listingInfo ? formatEther(listingInfo.price) : '0';
    const priceWei = listingInfo ? String(listingInfo.price) : '0';
    const seller = listingInfo ? listingInfo.seller : owner;
    const listingId = listingInfo ? String(listingInfo.listingId) : null;
    const listedAt = listingInfo
      ? new Date(Number(listingInfo.listedAt) * 1000).toISOString()
      : null;

    // Check ownership
    const isOwner = userAddress ? owner.toLowerCase() === userAddress.toLowerCase() : false;
    const isSeller = userAddress && listingInfo
      ? listingInfo.seller.toLowerCase() === userAddress.toLowerCase()
      : false;

    return {
      tokenId,
      listingId,
      copyrightId: copyrightId ? String(copyrightId) : '0',
      title,
      description,
      assetType,
      ipfsCID,
      contentHash,
      price,
      priceWei,
      seller,
      owner,
      creator,
      royaltyPercentage,
      registeredAt,
      listedAt,
      isListed,
      isOwner,
      isSeller,
    };
  }, [nftData, copyrightData, listingInfo, tokenId, copyrightId, userAddress]);

  return {
    nft: nftDetail,
    isLoading: isLoadingNFT || isLoadingCopyright,
    error: nftError || copyrightError,
  };
}
