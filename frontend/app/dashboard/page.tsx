"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FileText, Image, ShoppingBag, Wallet } from "lucide-react";
import MyCopyrightsTab from "@/components/features/dashboard/MyCopyrightsTab";
import MyNFTsTab from "@/components/features/dashboard/MyNFTsTab";
import MyListingsTab from "@/components/features/dashboard/MyListingsTab";

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState("copyrights");

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 flex items-center justify-center">
        <Card className="max-w-md p-8 text-center">
          <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to view your dashboard
          </p>
          <p className="text-sm text-gray-500">
            Use the "Connect Wallet" button in the header
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 mb-2">
            My Dashboard
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Manage your copyrights, NFTs, and marketplace listings
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white border border-gray-200 rounded-lg p-1">
            <TabsTrigger
              value="copyrights"
              className="flex items-center gap-2 data-[state=active]:bg-primary-500 data-[state=active]:text-white"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">My Copyrights</span>
              <span className="sm:hidden">Copyrights</span>
            </TabsTrigger>
            <TabsTrigger
              value="nfts"
              className="flex items-center gap-2 data-[state=active]:bg-primary-500 data-[state=active]:text-white"
            >
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">My NFTs</span>
              <span className="sm:hidden">NFTs</span>
            </TabsTrigger>
            <TabsTrigger
              value="listings"
              className="flex items-center gap-2 data-[state=active]:bg-primary-500 data-[state=active]:text-white"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">My Listings</span>
              <span className="sm:hidden">Listings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="copyrights" className="mt-0">
            <MyCopyrightsTab userAddress={address!} />
          </TabsContent>

          <TabsContent value="nfts" className="mt-0">
            <MyNFTsTab userAddress={address!} />
          </TabsContent>

          <TabsContent value="listings" className="mt-0">
            <MyListingsTab userAddress={address!} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
