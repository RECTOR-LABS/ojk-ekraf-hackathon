'use client';

import { SlideContent } from '../SlideContent';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { Coins, TrendingUp, Calculator, Sparkles } from 'lucide-react';
import Image from 'next/image';

export function Slide07Mint() {
  const features = [
    {
      icon: Coins,
      title: 'Customizable Royalty',
      description: 'Set your royalty rate between 5-20%',
    },
    {
      icon: Calculator,
      title: 'Earnings Calculator',
      description: 'Real-time projection of future earnings',
    },
    {
      icon: TrendingUp,
      title: 'Perpetual Income',
      description: 'Earn on every resale, forever',
    },
  ];

  return (
    <SlideContent>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Demo: NFT Minting with <span className="gradient-text">Perpetual Royalties</span>
          </h2>
          <p className="text-xl text-foreground/70">Turn your copyrights into income-generating assets</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <GlassCard key={index} variant="elevated" className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                    <p className="text-sm text-foreground/70">{feature.description}</p>
                  </div>
                </div>
              </GlassCard>
            ))}

            {/* Example Calculation */}
            <GlassCard variant="elevated" className="p-5 bg-gradient-to-br from-green-600/10 to-emerald-600/10">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-bold">Example Calculation</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Initial Sale:</span>
                    <span className="font-semibold">0.5 ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Royalty Rate:</span>
                    <span className="font-semibold">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">10 Resales @ 1 ETH:</span>
                    <span className="font-semibold text-green-400">1 ETH earned</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent my-2" />
                  <div className="flex justify-between text-base">
                    <span className="font-bold">Total Earnings:</span>
                    <span className="font-bold text-green-400">1.5 ETH</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right: Screenshot */}
          <GlassCard variant="elevated" className="p-4 overflow-hidden">
            <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden">
              <Image
                src="/pitch-deck/06-mint-nft-modal.png"
                alt="Mint NFT Modal - Earnings Calculator"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </GlassCard>
        </div>

        {/* Key Benefit Highlight */}
        <div className="text-center">
          <GlassCard variant="elevated" className="p-6 inline-block bg-gradient-to-r from-purple-600/10 to-blue-600/10">
            <p className="text-lg sm:text-xl font-bold">
              <span className="gradient-text">💰 Earn passive income forever, not just on first sale!</span>
            </p>
          </GlassCard>
        </div>
      </div>
    </SlideContent>
  );
}
