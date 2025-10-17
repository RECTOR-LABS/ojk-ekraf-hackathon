'use client';

import { SlideContent } from '../SlideContent';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { CheckCircle2, Calendar, Rocket, Globe2, Target } from 'lucide-react';

export function Slide13Roadmap() {
  const phases = [
    {
      phase: 'Phase 1',
      status: '✅ Current - October 2025',
      icon: CheckCircle2,
      color: 'green',
      items: [
        '3 smart contracts deployed & verified (Sepolia)',
        'Full-stack dApp (100% blockchain integrated)',
        '5 asset types supported',
        '90 tests, 100% coverage',
        'Security audit passed',
      ],
    },
    {
      phase: 'Phase 2',
      status: 'Q1 2026',
      icon: Rocket,
      color: 'purple',
      items: [
        'Deploy to Ethereum Mainnet or Polygon',
        'Creator onboarding campaign',
        'Partnership with Indonesian creator communities',
        'Mobile app development (React Native)',
      ],
    },
    {
      phase: 'Phase 3',
      status: 'Q2-Q3 2026',
      icon: Target,
      color: 'blue',
      items: [
        'Multi-chain support (Solana, Base, etc.)',
        'AI-powered content verification',
        'Integration with Indonesian legal system',
        'Dispute resolution mechanism',
      ],
    },
    {
      phase: 'Phase 4',
      status: 'Q4 2026',
      icon: Globe2,
      color: 'cyan',
      items: [
        'Expand to Southeast Asian markets',
        'Localization (Thai, Vietnamese, Filipino)',
        'Institutional partnerships (galleries, studios)',
        'Creator education programs',
      ],
    },
  ];

  const colorMap: Record<string, string> = {
    green: 'bg-green-600/20 text-green-400 border-green-600/30',
    purple: 'bg-purple-600/20 text-purple-400 border-purple-600/30',
    blue: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
    cyan: 'bg-cyan-600/20 text-cyan-400 border-cyan-600/30',
  };

  return (
    <SlideContent>
      <div className="space-y-8">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Roadmap: From Testnet to <span className="gradient-text">Ecosystem</span>
          </h2>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <GlassCard key={index} variant="elevated" className={`p-6 border-2 ${colorMap[phase.color]}`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${colorMap[phase.color]} flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{phase.phase}</h3>
                        <p className="text-sm text-foreground/60">{phase.status}</p>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className={phase.color === 'green' ? 'text-green-400' : 'text-foreground/40'}>
                          {phase.color === 'green' ? '✓' : '•'}
                        </span>
                        <span className="text-foreground/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Long-term Vision */}
        <GlassCard variant="elevated" className="p-6 text-center">
          <h3 className="text-xl font-bold mb-3">Long-term Vision</h3>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Become the <span className="gradient-text font-semibold">standard for copyright protection in Indonesia</span>,
            bridge Web2 creators to Web3, and enable economic empowerment for <span className="text-purple-400 font-semibold">63M+</span> creative workers
          </p>
        </GlassCard>
      </div>
    </SlideContent>
  );
}
