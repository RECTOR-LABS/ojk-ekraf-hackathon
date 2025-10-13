"use client";

import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { useMarketplaceListings } from "@/lib/hooks/useMarketplaceListings";
import NFTCard from "@/components/features/NFTCard";
import { Button } from "@/components/ui/Button";
import { SkeletonGrid } from "@/components/ui/Skeleton";

const ASSET_TYPES = [
  { value: "all", label: "All Assets" },
  { value: "0", label: "Art" },
  { value: "1", label: "Music" },
  { value: "2", label: "Photography" },
  { value: "3", label: "Writing" },
  { value: "4", label: "Design" },
];

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAssetType, setSelectedAssetType] = useState("all");

  // Fetch all active listings with metadata
  const { listings, isLoading, error } = useMarketplaceListings();

  // Filter and search listings
  const filteredListings = useMemo(() => {
    let filtered = listings;

    // Filter by asset type
    if (selectedAssetType !== "all") {
      filtered = filtered.filter(
        (listing) => listing.assetType === parseInt(selectedAssetType)
      );
    }

    // Search by title or creator
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (listing) =>
          listing.title?.toLowerCase().includes(query) ||
          listing.creator?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [listings, selectedAssetType, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-display text-gray-900 mb-2">
            Marketplace
          </h1>
          <p className="text-lg text-gray-600">
            Discover and collect unique digital assets from Indonesian creators
          </p>
          {!isLoading && listings.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {listings.length} {listings.length === 1 ? "listing" : "listings"} available
            </p>
          )}
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or creator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Asset Type Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedAssetType}
                onChange={(e) => setSelectedAssetType(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
              >
                {ASSET_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedAssetType !== "all") && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
              {searchQuery && (
                <div className="flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                  <span>Search: "{searchQuery}"</span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-primary-900"
                  >
                    ×
                  </button>
                </div>
              )}
              {selectedAssetType !== "all" && (
                <div className="flex items-center gap-2 px-3 py-1 bg-secondary-50 text-secondary-700 rounded-full text-sm">
                  <span>
                    Type:{" "}
                    {
                      ASSET_TYPES.find((t) => t.value === selectedAssetType)
                        ?.label
                    }
                  </span>
                  <button
                    onClick={() => setSelectedAssetType("all")}
                    className="hover:text-secondary-900"
                  >
                    ×
                  </button>
                </div>
              )}
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedAssetType("all");
                }}
                className="text-sm text-gray-600 hover:text-gray-900 underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              Error Loading Marketplace
            </h3>
            <p className="text-red-700 mb-4">{error.message}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && !error && <SkeletonGrid count={8} />}

        {/* Empty State - No Listings */}
        {!isLoading && listings.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No listings yet
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to list your NFT on the marketplace!
            </p>
            <Button href="/mint">Mint Your First NFT</Button>
          </div>
        )}

        {/* Empty State - No Results */}
        {!isLoading &&
          listings.length > 0 &&
          filteredListings.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedAssetType("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}

        {/* NFT Grid */}
        {!isLoading && filteredListings.length > 0 && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredListings.map((listing) => (
                <NFTCard key={listing.listingId} listing={listing} />
              ))}
            </div>

            {/* Load More (Future Enhancement) */}
            {/* <div className="flex justify-center mt-8">
              <Button variant="outline">Load More</Button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
