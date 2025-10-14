import { useState, useEffect } from "react";
import { usePublicClient } from "wagmi";
import { karyaNFTABI, karyaNFTAddress } from "@/lib/contracts/karyaNFT";
import { marketplaceABI, marketplaceAddress } from "@/lib/contracts/marketplace";

export interface UserNFT {
  tokenId: number;
  owner: string;
  tokenURI: string;
  copyrightId: number;
  royaltyPercentage: number;
  isListed: boolean;
  listingId?: number;
  listingPrice?: bigint;
  // Metadata
  title?: string;
  description?: string;
  image?: string;
  assetType?: number;
}

export function useUserNFTs(userAddress: string | undefined) {
  const [nfts, setNfts] = useState<UserNFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const publicClient = usePublicClient();

  useEffect(() => {
    if (!userAddress || !publicClient) {
      setIsLoading(false);
      return;
    }

    async function fetchUserNFTs() {
      try {
        setIsLoading(true);

        // Get total minted tokens
        const totalMinted = (await publicClient!.readContract({
          address: karyaNFTAddress as `0x${string}`,
          abi: karyaNFTABI,
          functionName: "totalMinted",
        })) as bigint;

        const userNFTs: UserNFT[] = [];

        // Iterate through all tokens and check ownership
        for (let tokenId = 1; tokenId <= Number(totalMinted); tokenId++) {
          try {
            // Check if user owns this token
            const owner = (await publicClient!.readContract({
              address: karyaNFTAddress as `0x${string}`,
              abi: karyaNFTABI,
              functionName: "ownerOf",
              args: [BigInt(tokenId)],
            })) as string;

            // Skip if not owned by user
            if (owner.toLowerCase() !== userAddress!.toLowerCase()) {
              continue;
            }

            // Fetch token URI
            const tokenURI = (await publicClient!.readContract({
              address: karyaNFTAddress as `0x${string}`,
              abi: karyaNFTABI,
              functionName: "tokenURI",
              args: [BigInt(tokenId)],
            })) as string;

            // Fetch copyright ID
            const copyrightId = (await publicClient!.readContract({
              address: karyaNFTAddress as `0x${string}`,
              abi: karyaNFTABI,
              functionName: "tokenToCopyright",
              args: [BigInt(tokenId)],
            })) as bigint;

            // Fetch royalty info
            const royaltyInfo = (await publicClient!.readContract({
              address: karyaNFTAddress as `0x${string}`,
              abi: karyaNFTABI,
              functionName: "royaltyInfo",
              args: [BigInt(tokenId), BigInt(10000)],
            })) as [string, bigint];
            const royaltyPercentage = Number(royaltyInfo[1]) / 100;

            // Check if listed on marketplace
            const isListed = (await publicClient!.readContract({
              address: marketplaceAddress as `0x${string}`,
              abi: marketplaceABI,
              functionName: "isNFTListed",
              args: [karyaNFTAddress, BigInt(tokenId)],
            })) as boolean;

            let listingId: number | undefined;
            let listingPrice: bigint | undefined;

            if (isListed) {
              listingId = Number(
                (await publicClient!.readContract({
                  address: marketplaceAddress as `0x${string}`,
                  abi: marketplaceABI,
                  functionName: "getListingByNFT",
                  args: [karyaNFTAddress, BigInt(tokenId)],
                })) as bigint
              );

              const listing = (await publicClient!.readContract({
                address: marketplaceAddress as `0x${string}`,
                abi: marketplaceABI,
                functionName: "getListing",
                args: [BigInt(listingId)],
              })) as any;

              listingPrice = listing.price;
            }

            // Fetch metadata from IPFS
            let metadata: any = {};
            try {
              const ipfsUrl = tokenURI.replace(
                "ipfs://",
                "https://gateway.pinata.cloud/ipfs/"
              );
              const response = await fetch(ipfsUrl);
              if (response.ok) {
                metadata = await response.json();
              }
            } catch (err) {
              console.error("Error fetching metadata:", err);
            }

            userNFTs.push({
              tokenId,
              owner: userAddress!,
              tokenURI,
              copyrightId: Number(copyrightId),
              royaltyPercentage,
              isListed,
              listingId,
              listingPrice,
              title: metadata.name,
              description: metadata.description,
              image: metadata.image?.replace(
                "ipfs://",
                "https://gateway.pinata.cloud/ipfs/"
              ),
              assetType: metadata.attributes?.find(
                (attr: any) => attr.trait_type === "Asset Type"
              )?.value,
            });
          } catch (err) {
            console.error(`Error fetching NFT tokenId ${tokenId}:`, err);
          }
        }

        setNfts(userNFTs);
        setError(null);
      } catch (err) {
        console.error("Error fetching user NFTs:", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserNFTs();
  }, [userAddress, publicClient]);

  return { nfts, isLoading, error };
}
