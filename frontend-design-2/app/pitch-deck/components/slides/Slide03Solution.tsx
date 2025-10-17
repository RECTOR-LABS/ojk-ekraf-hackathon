'use client';

import { SlideContent } from '../SlideContent';
import { CheckCircle2, Zap, ShoppingCart, Database } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass/GlassCard';

export function Slide03Solution() {
  const features = [
    {
      icon: Zap,
      title: 'Instant Copyright Registration',
      points: [
        'One-click registration with blockchain timestamp',
        'Immutable proof of ownership',
        'Cost: ~$0.50 (gas fees only)',
      ],
    },
    {
      icon: CheckCircle2,
      title: 'NFT Minting with Royalties',
      points: [
        'Convert copyrights into tradeable NFTs',
        'Set custom royalties: 5-20%',
        'Earn on every resale, forever',
      ],
    },
    {
      icon: ShoppingCart,
      title: 'Decentralized Marketplace',
      points: [
        'List and sell creative works globally',
        'Automatic royalty distribution',
        'Transparent, secure transactions',
      ],
    },
    {
      icon: Database,
      title: 'IPFS Storage',
      points: [
        'Decentralized file storage',
        'Permanent, censorship-resistant',
        'Content addressing for verification',
      ],
    },
  ];

  return (
    <SlideContent>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Blockchain-Based <span className="gradient-text">Copyright Registry</span>
            <br />+ NFT Marketplace
          </h2>
          <p className="text-xl text-foreground/70">A decentralized platform that provides:</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <GlassCard key={index} variant="elevated" className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    {feature.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-400 flex-shrink-0">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </SlideContent>
  );
}
