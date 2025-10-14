import { useState, useEffect } from "react";
import { useReadContract, usePublicClient } from "wagmi";
import { marketplaceABI, marketplaceAddress } from "@/lib/contracts/marketplace";
import { karyaNFTABI, karyaNFTAddress } from "@/lib/contracts/karyaNFT";

export interface EnrichedListing {
  listingId: number;
  tokenId: number;
  seller: string;
  price: bigint;
  active: boolean;
  listedAt: number;
  // NFT Metadata
  title?: string;
  description?: string;
  image?: string;
  assetType?: number;
  royaltyPercentage?: number;
  creator?: string;
}

export function useMarketplaceListings() {
  const [listings, setListings] = useState<EnrichedListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const publicClient = usePublicClient();

  // Fetch all listing IDs
  const { data: listingIds, isLoading: isLoadingIds } = useReadContract({
    address: marketplaceAddress as `0x${string}`,
    abi: marketplaceABI,
    functionName: "getAllListingIds",
  });

  useEffect(() => {
    if (!listingIds || !publicClient) {
      setIsLoading(isLoadingIds);
      return;
    }

    async function fetchListingsWithMetadata() {
      try {
        setIsLoading(true);
        const enrichedListings: EnrichedListing[] = [];

        for (const listingId of listingIds as bigint[]) {
          try {
            // Fetch listing details
            const listing = (await publicClient!.readContract({
              address: marketplaceAddress as `0x${string}`,
              abi: marketplaceABI,
              functionName: "getListing",
              args: [listingId],
            })) as any;

            // Only process active listings
            if (!listing.active) continue;

            // Fetch NFT token URI
            const tokenURI = (await publicClient!.readContract({
              address: karyaNFTAddress as `0x${string}`,
              abi: karyaNFTABI,
              functionName: "tokenURI",
              args: [listing.tokenId],
            })) as string;

            // Fetch metadata from IPFS
            let metadata: any = {};
            try {
              const response = await fetch(tokenURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/"));
              if (response.ok) {
                metadata = await response.json();
              }
            } catch (err) {
              console.error("Error fetching metadata:", err);
            }

            // Fetch royalty info
            let royaltyPercentage = 0;
            try {
              const royaltyInfo = (await publicClient!.readContract({
                address: karyaNFTAddress as `0x${string}`,
                abi: karyaNFTABI,
                functionName: "royaltyInfo",
                args: [listing.tokenId, BigInt(10000)], // Query for 10000 (100% in BPS)
              })) as [string, bigint];

              // Convert BPS to percentage
              royaltyPercentage = Number(royaltyInfo[1]) / 100;
            } catch (err) {
              console.error("Error fetching royalty:", err);
            }

            enrichedListings.push({
              listingId: Number(listing.listingId),
              tokenId: Number(listing.tokenId),
              seller: listing.seller,
              price: listing.price,
              active: listing.active,
              listedAt: Number(listing.listedAt),
              title: metadata.name,
              description: metadata.description,
              image: metadata.image?.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/"),
              assetType: metadata.attributes?.find((attr: any) => attr.trait_type === "Asset Type")?.value,
              royaltyPercentage,
              creator: metadata.attributes?.find((attr: any) => attr.trait_type === "Creator")?.value,
            });
          } catch (err) {
            console.error(`Error fetching listing ${listingId}:`, err);
          }
        }

        setListings(enrichedListings);
        setError(null);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchListingsWithMetadata();
  }, [listingIds, publicClient, isLoadingIds]);

  return { listings, isLoading, error };
}
