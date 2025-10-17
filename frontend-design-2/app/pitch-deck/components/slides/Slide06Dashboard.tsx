'use client';

import { SlideContent } from '../SlideContent';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { FileCheck, Image as ImageIcon, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

export function Slide06Dashboard() {
  const tabs = [
    {
      icon: FileCheck,
      title: 'My Copyrights',
      description: 'View all registered works',
      features: [
        'Copyright ID & timestamp',
        'Asset type & metadata',
        'IPFS storage links',
        'Quick access to mint NFT',
      ],
      color: 'from-blue-600/20 to-cyan-600/20',
      iconColor: 'text-blue-400',
    },
    {
      icon: ImageIcon,
      title: 'NFT Collection',
      description: 'Your minted NFTs',
      features: [
        'NFT ownership proof',
        'Royalty settings',
        'Transfer history',
        'List on marketplace',
      ],
      color: 'from-purple-600/20 to-pink-600/20',
      iconColor: 'text-purple-400',
    },
    {
      icon: ShoppingBag,
      title: 'My Listings',
      description: 'Active marketplace sales',
      features: [
        'Current price & status',
        'View count & analytics',
        'Delist anytime',
        'Track earnings',
      ],
      color: 'from-green-600/20 to-emerald-600/20',
      iconColor: 'text-green-400',
    },
  ];

  return (
    <SlideContent>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Demo: <span className="gradient-text">Creator Dashboard</span>
          </h2>
          <p className="text-xl text-foreground/70">Manage your creative assets in one place</p>
        </div>

        {/* 3 Tabs Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tabs.map((tab, index) => (
            <GlassCard key={index} variant="elevated" className="p-6">
              <div className="space-y-4">
                {/* Icon & Title */}
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tab.color} flex items-center justify-center flex-shrink-0`}>
                    <tab.icon className={`w-6 h-6 ${tab.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{tab.title}</h3>
                    <p className="text-sm text-foreground/60">{tab.description}</p>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  {tab.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className={`${tab.iconColor} flex-shrink-0`}>✓</span>
                      <span className="text-foreground/70">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Screenshot */}
        <GlassCard variant="elevated" className="p-4 overflow-hidden">
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src="/pitch-deck/05-dashboard-copyrights.png"
              alt="Creator Dashboard - My Copyrights"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </GlassCard>
      </div>
    </SlideContent>
  );
}
