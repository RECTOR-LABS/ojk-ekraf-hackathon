'use client';

import { SlideContent } from '../SlideContent';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { Target, Globe2, Shield, Landmark } from 'lucide-react';

export function Slide14Impact() {
  const impacts = [
    {
      icon: Target,
      emoji: '🎯',
      title: 'Economic Empowerment',
      points: [
        '63 million+ creative workers gain affordable copyright protection',
        'Democratize IP rights (not just for big corporations)',
        'Enable micro-creators to monetize their work',
      ],
    },
    {
      icon: Globe2,
      emoji: '🌍',
      title: 'Global Market Access',
      points: [
        'Indonesian creators can sell to international buyers',
        'Remove geographic barriers',
        'Compete on global Web3 marketplace',
      ],
    },
    {
      icon: Shield,
      emoji: '💪',
      title: 'Strengthen IP Culture',
      points: [
        'Educate creators about copyright importance',
        'Build IP-aware creative community',
        'Reduce piracy through easy registration',
      ],
    },
    {
      icon: Landmark,
      emoji: '🏛️',
      title: 'Align with National Goals',
      points: [
        "Support OJK's digital financial innovation vision",
        "Contribute to Indonesia's creative economy GDP (8%+)",
        'Foster blockchain adoption in creative sector',
      ],
    },
  ];

  return (
    <SlideContent>
      <div className="space-y-8">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Empowering Indonesia&apos;s <span className="gradient-text">Creative Economy</span>
          </h2>
        </div>

        {/* Impact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {impacts.map((impact, index) => {
            const Icon = impact.icon;
            return (
              <GlassCard
                key={index}
                variant="elevated"
                className="p-6 border-2 border-red-500/20 hover:border-red-500/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600/20 to-white/5 flex items-center justify-center border border-red-500/20">
                      <Icon className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <span className="text-2xl mr-2">{impact.emoji}</span>
                      <h3 className="text-xl font-bold inline">{impact.title}</h3>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    {impact.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-400 flex-shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Real Impact Statistics */}
        <GlassCard variant="elevated" className="p-6 border-2 border-red-500/20">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Real-World Impact</h3>
            <p className="text-lg text-foreground/70">If just 1% of 63M creators use KaryaChain:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div>
                <p className="text-4xl font-bold text-red-400">630,000</p>
                <p className="text-sm text-foreground/60">Creators Protected</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white">$300,000+</p>
                <p className="text-sm text-foreground/60">Saved in Registration Fees</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-green-400">Millions</p>
                <p className="text-sm text-foreground/60">In Royalties Earned</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </SlideContent>
  );
}
