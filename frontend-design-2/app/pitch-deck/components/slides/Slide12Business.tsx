'use client';

import { SlideContent } from '../SlideContent';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { DollarSign, TrendingUp, Globe } from 'lucide-react';

export function Slide12Business() {
  return (
    <SlideContent>
      <div className="space-y-8">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Sustainable <span className="gradient-text">Revenue Model</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Platform Revenue */}
          <GlassCard variant="elevated" className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">Platform Fee: 2.5%</h3>
              </div>
              <div className="space-y-3 text-sm text-foreground/70">
                <p>Applied to all marketplace sales</p>
                <p>Industry-standard rate</p>
                <p>Transparent, on-chain deduction</p>
              </div>
              <div className="pt-4 space-y-2 font-mono text-sm">
                <p className="text-foreground/60">Revenue Projection Example:</p>
                <div className="space-y-1 bg-black/20 p-3 rounded-lg">
                  <p>Monthly Sales: <span className="text-purple-400">100 ETH</span></p>
                  <p>Platform Fee (2.5%): <span className="text-purple-400">2.5 ETH</span></p>
                  <p>Annual Revenue: <span className="text-green-400">30 ETH (~$60k)</span></p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Creator Benefits */}
          <GlassCard variant="elevated" className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold">Creator Benefits</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold">Perpetual Royalties (5-20%)</p>
                    <p className="text-sm text-foreground/60">Set your own rate, earn on every resale</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold">Global Market Access</p>
                    <p className="text-sm text-foreground/60">Reach international buyers, 24/7 marketplace</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <div>
                    <p className="font-semibold">Affordable Registration</p>
                    <p className="text-sm text-foreground/60">Gas fees only (~$0.50), no middlemen</p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Market Opportunity */}
        <GlassCard variant="elevated" className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
              <Globe className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold">Market Opportunity</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-purple-400">63M+</p>
              <p className="text-sm text-foreground/60">Indonesia Creative Workers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-400">200M+</p>
              <p className="text-sm text-foreground/60">Southeast Asia Potential</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-400">$2.6T</p>
              <p className="text-sm text-foreground/60">Global Creative Economy</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </SlideContent>
  );
}
