'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { Shield, Sparkles, ShoppingBag } from 'lucide-react';
import { MyCopyrightsTab } from '@/components/dashboard/MyCopyrightsTab';
import { MyNFTsTab } from '@/components/dashboard/MyNFTsTab';
import { MyListingsTab } from '@/components/dashboard/MyListingsTab';

const tabs = [
  { id: 'copyrights', label: 'My Copyrights', icon: Shield },
  { id: 'nfts', label: 'My NFTs', icon: Sparkles },
  { id: 'listings', label: 'My Listings', icon: ShoppingBag },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('copyrights');
  const { address } = useAccount();

  // Format address for display
  const userAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Page Header */}
      <motion.div
        className="mb-8 sm:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="text-lg sm:text-xl text-foreground/70">
          Manage your copyrights, NFTs, and marketplace listings
        </p>

        {/* User Address Card */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
                <span className="text-lg sm:text-xl">👤</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-foreground/60">Wallet Address</p>
                <p className="font-mono font-semibold text-sm sm:text-base truncate">{userAddress}</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        className="mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-2 px-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 min-h-[44px] rounded-xl transition-all relative flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-purple-600/20 text-foreground'
                    : 'text-foreground/60 hover:text-foreground hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="font-semibold whitespace-nowrap text-sm sm:text-base">{tab.label}</span>

                {/* Active indicator */}
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"
                    layoutId="activeTab"
                  />
                )}
              </button>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'copyrights' && <MyCopyrightsTab />}
          {activeTab === 'nfts' && <MyNFTsTab />}
          {activeTab === 'listings' && <MyListingsTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
