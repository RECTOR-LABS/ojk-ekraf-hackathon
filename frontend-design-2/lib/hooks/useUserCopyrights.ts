'use client';

import { useMemo, useEffect } from 'react';
import { useAccount, useReadContract, useReadContracts } from 'wagmi';
import { CopyrightRegistryAddress, CopyrightRegistryABI } from '@/lib/contracts/CopyrightRegistry';
import { KaryaNFTAddress, KaryaNFTABI } from '@/lib/contracts/KaryaNFT';

export interface Copyright {
  id: string;
  title: string;
  description: string;
  assetType: string;
  contentHash: string;
  ipfsCID: string;
  registeredAt: string;
  isMinted: boolean;
  tokenId?: string;
}

const assetTypeLabels: { [key: number]: string } = {
  0: 'VISUAL_ART',
  1: 'MUSIC',
  2: 'LITERATURE',
  3: 'VIDEO',
  4: 'OTHER',
};

export function useUserCopyrights() {
  const { address } = useAccount();

  // 1. Fetch user's copyright IDs
  const { data: copyrightIds, isLoading: isLoadingIds, error: idsError } = useReadContract({
    address: CopyrightRegistryAddress,
    abi: CopyrightRegistryABI,
    functionName: 'getRegistrationsByCreator',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      retry: 1,
      retryDelay: 1000,
    },
  });

  // Debug: Log the copyright IDs from blockchain
  useEffect(() => {
    if (copyrightIds) {
      console.log('[useUserCopyrights] Copyright IDs from blockchain:', copyrightIds);
    }
  }, [copyrightIds]);

  // 2. Build contract calls for batch fetching
  const contractCalls = useMemo(() => {
    if (!copyrightIds || !Array.isArray(copyrightIds) || copyrightIds.length === 0) {
      return [];
    }

    const calls: any[] = [];

    copyrightIds.forEach((id) => {
      // Fetch registration details
      calls.push({
        address: CopyrightRegistryAddress,
        abi: CopyrightRegistryABI,
        functionName: 'getRegistration',
        args: [id],
      });

      // Fetch mint status
      calls.push({
        address: KaryaNFTAddress,
        abi: KaryaNFTABI,
        functionName: 'isMinted',
        args: [id],
      });

      // Fetch token ID if minted
      calls.push({
        address: KaryaNFTAddress,
        abi: KaryaNFTABI,
        functionName: 'getTokenIdByCopyright',
        args: [id],
      });
    });

    return calls;
  }, [copyrightIds]);

  // 3. Fetch all data in batch
  const { data: contractData, isLoading: isLoadingData, error: dataError } = useReadContracts({
    contracts: contractCalls as any,
    query: {
      enabled: contractCalls.length > 0,
      retry: 1,
      retryDelay: 1000,
    },
  });

  // 4. Parse and build copyrights array
  const copyrights = useMemo((): Copyright[] => {
    if (!copyrightIds || !contractData || copyrightIds.length === 0) {
      return [];
    }

    const result: Copyright[] = [];

    copyrightIds.forEach((id, index) => {
      const baseIndex = index * 3;
      const registrationData = contractData[baseIndex];
      const isMintedData = contractData[baseIndex + 1];
      const tokenIdData = contractData[baseIndex + 2];

      if (registrationData?.status === 'success' && registrationData.result) {
        const reg = registrationData.result as any;
        const isMinted = isMintedData?.status === 'success' ? Boolean(isMintedData.result) : false;
        const tokenId = tokenIdData?.status === 'success' && isMinted ? String(tokenIdData.result) : undefined;

        result.push({
          id: String(reg.id || id),
          title: reg.title || 'Untitled',
          description: reg.description || '',
          assetType: assetTypeLabels[Number(reg.assetType)] || 'OTHER',
          contentHash: reg.contentHash || '0x',
          ipfsCID: reg.ipfsCID || '',
          registeredAt: reg.timestamp ? new Date(Number(reg.timestamp) * 1000).toISOString().split('T')[0] : '',
          isMinted,
          tokenId,
        });
      }
    });

    return result;
  }, [copyrightIds, contractData]);

  // 5. Calculate stats
  const mintedCount = copyrights.filter((c) => c.isMinted).length;
  const unmintedCount = copyrights.length - mintedCount;

  return {
    copyrights,
    isLoading: isLoadingIds || isLoadingData,
    error: idsError || dataError,
    totalCopyrights: copyrights.length,
    mintedCount,
    unmintedCount,
  };
}
