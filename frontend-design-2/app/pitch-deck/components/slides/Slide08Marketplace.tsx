'use client';

import { SlideContent } from '../SlideContent';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { Search, ShoppingCart, ExternalLink, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export function Slide08Marketplace() {
  const features = [
    {
      icon: Search,
      title: 'Smart Search & Filters',
      description: 'Find NFTs by asset type, price range, and keywords',
    },
    {
      icon: ShoppingCart,
      title: 'Secure Purchasing',
      description: 'Web3 wallet integration with automatic royalty distribution',
    },
    {
      icon: ExternalLink,
      title: 'Full Transparency',
      description: 'View transaction history and ownership on Etherscan',
    },
  ];

  return (
    <SlideContent>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Demo: <span className="gradient-text">Decentralized Marketplace</span>
          </h2>
          <p className="text-xl text-foreground/70">
            Browse, discover, and purchase creative works on-chain
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <GlassCard key={index} className="p-4 lg:p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="text-sm text-foreground/70">{feature.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard variant="elevated" className="overflow-hidden p-0">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src="/screenshots/08-marketplace-browse.png"
              alt="KaryaChain Marketplace - Browse and discover creative works"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </GlassCard>

        <div className="flex items-center justify-center gap-2 text-green-400">
          <CheckCircle2 className="w-5 h-5" />
          <p className="text-sm font-medium">
            100% Blockchain Integration - No Mock Data
          </p>
        </div>
      </div>
    </SlideContent>
  );
}
