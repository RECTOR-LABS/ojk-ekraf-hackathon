/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo } from 'react';
import { useReadContract, useReadContracts } from 'wagmi';
import { KaryaMarketplaceAddress, KaryaMarketplaceABI } from '@/lib/contracts/KaryaMarketplace';
import { KaryaNFTAddress, KaryaNFTABI } from '@/lib/contracts/KaryaNFT';
import { CopyrightRegistryAddress, CopyrightRegistryABI } from '@/lib/contracts/CopyrightRegistry';
import { formatEther } from 'viem';

export interface MarketplaceListing {
  listingId: string;
  tokenId: string;
  copyrightId: string;
  title: string;
  description: string;
  assetType: string;
  ipfsCID: string;
  price: string; // in ETH
  priceWei: string; // in wei
  seller: string;
  royaltyPercentage: number;
  listedAt: string; // ISO timestamp
  isActive: boolean;
}

const assetTypeLabels: { [key: number]: string } = {
  0: 'VISUAL_ART',
  1: 'MUSIC',
  2: 'LITERATURE',
  3: 'VIDEO',
  4: 'OTHER',
};

export function useMarketplaceListings() {
  // 1. Fetch all listing IDs from marketplace
  const { data: allListingIds, isLoading: isLoadingIds, error: idsError } = useReadContract({
    address: KaryaMarketplaceAddress,
    abi: KaryaMarketplaceABI,
    functionName: 'getAllListingIds',
    query: {
      retry: 1,
      retryDelay: 1000,
    },
  });

  // 2. Build batch calls to fetch listing details
  const listingCalls = useMemo(() => {
    if (!allListingIds || !Array.isArray(allListingIds) || allListingIds.length === 0) {
      return [];
    }

    const calls: any[] = [];
    allListingIds.forEach((listingId) => {
      calls.push({
        address: KaryaMarketplaceAddress,
        abi: KaryaMarketplaceABI,
        functionName: 'getListing',
        args: [listingId],
      });
    });

    return calls;
  }, [allListingIds]);

  // 3. Fetch listing details
  const { data: listingData, isLoading: isLoadingListings, error: listingsError } = useReadContracts({
    contracts: listingCalls as any,
    query: {
      enabled: listingCalls.length > 0,
      retry: 1,
      retryDelay: 1000,
    },
  });

  // 4. Filter active listings and extract token IDs
  const activeListings = useMemo(() => {
    if (!listingData) return [];

    const listings: any[] = [];
    listingData.forEach((result) => {
      if (result.status === 'success' && result.result) {
        const listing = result.result as any;
        // Only include active listings
        if (listing.active) {
          listings.push(listing);
        }
      }
    });

    return listings;
  }, [listingData]);

  // 5. Build batch calls for NFT metadata (copyright ID + royalty)
  const nftCalls = useMemo(() => {
    if (activeListings.length === 0) return [];

    const calls: any[] = [];
    activeListings.forEach((listing) => {
      // Get copyright ID from NFT
      calls.push({
        address: KaryaNFTAddress,
        abi: KaryaNFTABI,
        functionName: 'getCopyrightId',
        args: [listing.tokenId],
      });

      // Get royalty info (using 1 ETH as base for percentage calculation)
      calls.push({
        address: KaryaNFTAddress,
        abi: KaryaNFTABI,
        functionName: 'royaltyInfo',
        args: [listing.tokenId, BigInt(1000000000000000000)], // 1 ETH in wei
      });
    });

    return calls;
  }, [activeListings]);

  // 6. Fetch NFT metadata
  const { data: nftData, isLoading: isLoadingNFT, error: nftError } = useReadContracts({
    contracts: nftCalls as any,
    query: {
      enabled: nftCalls.length > 0,
      retry: 1,
      retryDelay: 1000,
    },
  });

  // 7. Build batch calls for copyright details
  const copyrightCalls = useMemo(() => {
    if (!nftData || activeListings.length === 0) return [];

    const calls: any[] = [];
    activeListings.forEach((_, index) => {
      const baseIndex = index * 2; // 2 calls per listing
      const copyrightIdData = nftData[baseIndex];

      if (copyrightIdData?.status === 'success' && copyrightIdData.result) {
        const copyrightId = copyrightIdData.result as bigint;

        calls.push({
          address: CopyrightRegistryAddress,
          abi: CopyrightRegistryABI,
          functionName: 'getRegistration',
          args: [copyrightId],
        });
      } else {
        calls.push(null);
      }
    });

    return calls.filter(Boolean); // Remove nulls
  }, [nftData, activeListings]);

  // 8. Fetch copyright data
  const { data: copyrightData, isLoading: isLoadingCopyright, error: copyrightError } = useReadContracts({
    contracts: copyrightCalls as any,
    query: {
      enabled: copyrightCalls.length > 0,
      retry: 1,
      retryDelay: 1000,
    },
  });

  // 9. Build enriched listings array
  const listings = useMemo((): MarketplaceListing[] => {
    if (!nftData || !copyrightData || activeListings.length === 0) return [];

    const result: MarketplaceListing[] = [];

    activeListings.forEach((listing, index) => {
      const baseIndex = index * 2; // 2 calls per listing
      const copyrightIdData = nftData[baseIndex];
      const royaltyData = nftData[baseIndex + 1];
      const copyrightInfo = copyrightData[index];

      if (copyrightIdData?.status === 'success' && copyrightIdData.result) {
        const copyrightId = String(copyrightIdData.result);

        // Calculate royalty percentage
        let royaltyPercentage = 10; // Default 10%
        if (royaltyData?.status === 'success' && royaltyData.result) {
          const royaltyResult = royaltyData.result as any;
          const royaltyAmount = BigInt(royaltyResult[1]); // amount in wei
          const salePrice = BigInt(1000000000000000000); // 1 ETH
          royaltyPercentage = Number((royaltyAmount * BigInt(100)) / salePrice);
        }

        // Get copyright details
        let title = 'Untitled';
        let description = '';
        let assetType = 'OTHER';
        let ipfsCID = '';

        if (copyrightInfo?.status === 'success' && copyrightInfo.result) {
          const reg = copyrightInfo.result as any;
          title = reg.title || 'Untitled';
          description = reg.description || '';
          assetType = assetTypeLabels[Number(reg.assetType)] || 'OTHER';
          ipfsCID = reg.ipfsCID || '';
        }

        // Format price
        const priceWei = String(listing.price);
        const price = formatEther(listing.price);

        result.push({
          listingId: String(listing.listingId),
          tokenId: String(listing.tokenId),
          copyrightId,
          title,
          description,
          assetType,
          ipfsCID,
          price,
          priceWei,
          seller: listing.seller,
          royaltyPercentage,
          listedAt: new Date(Number(listing.listedAt) * 1000).toISOString(),
          isActive: listing.active,
        });
      }
    });

    return result;
  }, [activeListings, nftData, copyrightData]);

  return {
    listings,
    isLoading: isLoadingIds || isLoadingListings || isLoadingNFT || isLoadingCopyright,
    error: idsError || listingsError || nftError || copyrightError,
    totalListings: listings.length,
  };
}
