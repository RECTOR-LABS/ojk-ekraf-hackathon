import { useState, useEffect } from "react";
import { usePublicClient } from "wagmi";
import {
  copyrightRegistryABI,
  copyrightRegistryAddress,
} from "@/lib/contracts/copyrightRegistry";
import { karyaNFTABI, karyaNFTAddress } from "@/lib/contracts/karyaNFT";

export interface UserCopyright {
  registrationId: number;
  creator: string;
  contentHash: string;
  ipfsHash: string;
  title: string;
  description: string;
  assetType: number;
  timestamp: number;
  isMinted: boolean;
  tokenId?: number;
}

export function useUserCopyrights(userAddress: string | undefined) {
  const [copyrights, setCopyrights] = useState<UserCopyright[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const publicClient = usePublicClient();

  useEffect(() => {
    if (!userAddress || !publicClient) {
      setIsLoading(false);
      return;
    }

    async function fetchUserCopyrights() {
      try {
        setIsLoading(true);

        // Get total registrations count
        const totalRegistrations = (await publicClient!.readContract({
          address: copyrightRegistryAddress as `0x${string}`,
          abi: copyrightRegistryABI,
          functionName: "getTotalRegistrations",
        })) as bigint;

        const userCopyrights: UserCopyright[] = [];

        // Iterate through all registrations and filter by user
        for (let i = 1; i <= Number(totalRegistrations); i++) {
          try {
            const registration = (await publicClient!.readContract({
              address: copyrightRegistryAddress as `0x${string}`,
              abi: copyrightRegistryABI,
              functionName: "getRegistration",
              args: [BigInt(i)],
            })) as any;

            // Only include user's registrations
            if (
              registration.creator.toLowerCase() === userAddress!.toLowerCase()
            ) {
              // Check if this copyright has been minted
              const copyrightIdToToken = (await publicClient!.readContract({
                address: karyaNFTAddress as `0x${string}`,
                abi: karyaNFTABI,
                functionName: "copyrightToToken",
                args: [BigInt(i)],
              })) as bigint;

              const isMinted = copyrightIdToToken > BigInt(0);

              userCopyrights.push({
                registrationId: Number(registration.registrationId),
                creator: registration.creator,
                contentHash: registration.contentHash,
                ipfsHash: registration.ipfsHash,
                title: registration.title,
                description: registration.description,
                assetType: Number(registration.assetType),
                timestamp: Number(registration.timestamp),
                isMinted,
                tokenId: isMinted ? Number(copyrightIdToToken) : undefined,
              });
            }
          } catch (err) {
            console.error(`Error fetching registration ${i}:`, err);
          }
        }

        // Sort by timestamp (newest first)
        userCopyrights.sort((a, b) => b.timestamp - a.timestamp);

        setCopyrights(userCopyrights);
        setError(null);
      } catch (err) {
        console.error("Error fetching user copyrights:", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserCopyrights();
  }, [userAddress, publicClient]);

  return { copyrights, isLoading, error };
}
