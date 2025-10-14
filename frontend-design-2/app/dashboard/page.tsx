'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  // TODO: Get wallet address from wagmi
  const userAddress = '0xcAfe...f8Bf';

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="text-xl text-foreground/70">
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
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Wallet Address</p>
                <p className="font-mono font-semibold">{userAddress}</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard>
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all relative ${
                  activeTab === tab.id
                    ? 'bg-purple-600/20 text-foreground'
                    : 'text-foreground/60 hover:text-foreground hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-semibold whitespace-nowrap">{tab.label}</span>

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
