/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo, useEffect } from 'react';
import { useAccount, useReadContract, useReadContracts } from 'wagmi';
import { KaryaNFTAddress, KaryaNFTABI } from '@/lib/contracts/KaryaNFT';
import { KaryaMarketplaceAddress, KaryaMarketplaceABI } from '@/lib/contracts/KaryaMarketplace';
import { CopyrightRegistryAddress, CopyrightRegistryABI } from '@/lib/contracts/CopyrightRegistry';

export interface UserNFT {
  tokenId: string;
  copyrightId: string;
  title: string;
  description: string;
  assetType: string;
  ipfsCID: string;
  tokenURI: string;
  royaltyPercentage: number;
  isListed: boolean;
  listingId?: string;
  price?: string;
}

const assetTypeLabels: { [key: number]: string } = {
  0: 'VISUAL_ART',
  1: 'MUSIC',
  2: 'LITERATURE',
  3: 'VIDEO',
  4: 'OTHER',
};

export function useUserNFTs() {
  const { address } = useAccount();

  // 1. Fetch total minted NFTs
  const { data: totalMinted, isLoading: isLoadingTotal, error: totalError } = useReadContract({
    address: KaryaNFTAddress,
    abi: KaryaNFTABI,
    functionName: 'totalMinted',
    query: {
      enabled: !!address,
      retry: 1,
      retryDelay: 1000,
    },
  });

  // 2. Build contract calls to check ownership for all token IDs
  const ownershipCalls = useMemo(() => {
    if (!totalMinted || !address) return [];

    const calls: any[] = [];
    const total = Number(totalMinted);

    // Check ownership for each token ID (1 to totalMinted)
    for (let tokenId = 1; tokenId <= total; tokenId++) {
      calls.push({
        address: KaryaNFTAddress,
        abi: KaryaNFTABI,
        functionName: 'ownerOf',
        args: [BigInt(tokenId)],
      });
    }

    return calls;
  }, [totalMinted, address]);

  // 3. Fetch ownership data
  const { data: ownershipData, isLoading: isLoadingOwnership, error: ownershipError } = useReadContracts({
    contracts: ownershipCalls as any,
    query: {
      enabled: ownershipCalls.length > 0,
      retry: 1,
      retryDelay: 1000,
    },
  });

  // 4. Filter owned token IDs
  const ownedTokenIds = useMemo(() => {
    if (!ownershipData || !address) return [];

    const tokenIds: bigint[] = [];
    ownershipData.forEach((result, index) => {
      if (result.status === 'success' && result.result) {
        const owner = result.result as string;
        if (owner.toLowerCase() === address.toLowerCase()) {
          tokenIds.push(BigInt(index + 1)); // Token IDs start at 1
        }
      }
    });

    return tokenIds;
  }, [ownershipData, address]);

  // Debug: Log owned token IDs
  useEffect(() => {
    if (ownedTokenIds.length > 0) {
      console.log('[useUserNFTs] Owned token IDs:', ownedTokenIds.map(id => id.toString()));
    }
  }, [ownedTokenIds]);

  // 5. Build contract calls for each owned NFT
  const nftDataCalls = useMemo(() => {
    if (ownedTokenIds.length === 0) return [];

    const calls: any[] = [];

    ownedTokenIds.forEach((tokenId) => {
      // Get copyright ID
      calls.push({
        address: KaryaNFTAddress,
        abi: KaryaNFTABI,
        functionName: 'getCopyrightId',
        args: [tokenId],
      });

      // Get token URI
      calls.push({
        address: KaryaNFTAddress,
        abi: KaryaNFTABI,
        functionName: 'tokenURI',
        args: [tokenId],
      });

      // Get royalty info (using 1 ETH as sample sale price to get percentage)
      calls.push({
        address: KaryaNFTAddress,
        abi: KaryaNFTABI,
        functionName: 'royaltyInfo',
        args: [tokenId, BigInt(1000000000000000000)], // 1 ETH in wei
      });

      // Check if listed
      calls.push({
        address: KaryaMarketplaceAddress,
        abi: KaryaMarketplaceABI,
        functionName: 'isNFTListed',
        args: [KaryaNFTAddress, tokenId],
      });

      // Get listing ID (will be 0 if not listed)
      calls.push({
        address: KaryaMarketplaceAddress,
        abi: KaryaMarketplaceABI,
        functionName: 'getListingByNFT',
        args: [KaryaNFTAddress, tokenId],
      });
    });

    return calls;
  }, [ownedTokenIds]);

  // 6. Fetch NFT data
  const { data: nftData, isLoading: isLoadingNFTData, error: nftDataError } = useReadContracts({
    contracts: nftDataCalls as any,
    query: {
      enabled: nftDataCalls.length > 0,
      retry: 1,
      retryDelay: 1000,
    },
  });

  // 7. Build contract calls for copyright details
  const copyrightCalls = useMemo(() => {
    if (!nftData || ownedTokenIds.length === 0) return [];

    const calls: any[] = [];

    ownedTokenIds.forEach((_, index) => {
      const baseIndex = index * 5; // 5 calls per NFT
      const copyrightIdData = nftData[baseIndex];

      if (copyrightIdData?.status === 'success' && copyrightIdData.result) {
        const copyrightId = copyrightIdData.result as bigint;

        // Get copyright registration details
        calls.push({
          address: CopyrightRegistryAddress,
          abi: CopyrightRegistryABI,
          functionName: 'getRegistration',
          args: [copyrightId],
        });
      } else {
        // Placeholder for missing copyright data
        calls.push(null);
      }
    });

    return calls.filter(Boolean); // Remove nulls
  }, [nftData, ownedTokenIds]);

  // 8. Fetch copyright data
  const { data: copyrightData, isLoading: isLoadingCopyright, error: copyrightError } = useReadContracts({
    contracts: copyrightCalls as any,
    query: {
      enabled: copyrightCalls.length > 0,
      retry: 1,
      retryDelay: 1000,
    },
  });

  // 9. Build NFT array with all data
  const nfts = useMemo((): UserNFT[] => {
    if (!nftData || !copyrightData || ownedTokenIds.length === 0) return [];

    const result: UserNFT[] = [];

    ownedTokenIds.forEach((tokenId, index) => {
      const baseIndex = index * 5; // 5 calls per NFT
      const copyrightIdData = nftData[baseIndex];
      const tokenURIData = nftData[baseIndex + 1];
      const royaltyData = nftData[baseIndex + 2];
      const isListedData = nftData[baseIndex + 3];
      const listingIdData = nftData[baseIndex + 4];
      const copyrightInfo = copyrightData[index];

      if (copyrightIdData?.status === 'success' && copyrightIdData.result) {
        const copyrightId = String(copyrightIdData.result);
        const tokenURI = tokenURIData?.status === 'success' ? String(tokenURIData.result) : '';
        const isListed = isListedData?.status === 'success' ? Boolean(isListedData.result) : false;
        const listingId = listingIdData?.status === 'success' && isListed ? String(listingIdData.result) : undefined;

        // Calculate royalty percentage from royaltyInfo
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

        result.push({
          tokenId: tokenId.toString(),
          copyrightId,
          title,
          description,
          assetType,
          ipfsCID,
          tokenURI,
          royaltyPercentage,
          isListed,
          listingId,
        });
      }
    });

    return result;
  }, [ownedTokenIds, nftData, copyrightData]);

  // 10. Calculate stats
  const listedCount = nfts.filter((nft) => nft.isListed).length;
  const notListedCount = nfts.length - listedCount;

  return {
    nfts,
    isLoading: isLoadingTotal || isLoadingOwnership || isLoadingNFTData || isLoadingCopyright,
    error: totalError || ownershipError || nftDataError || copyrightError,
    totalNFTs: nfts.length,
    listedCount,
    notListedCount,
  };
}
