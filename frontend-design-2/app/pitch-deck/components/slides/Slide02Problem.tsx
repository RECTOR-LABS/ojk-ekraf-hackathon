'use client';

import { SlideContent } from '../SlideContent';
import { AlertTriangle, Ban, DollarSign, Target } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass/GlassCard';

export function Slide02Problem() {
  const problems = [
    {
      icon: Ban,
      title: 'No Accessible Copyright Protection',
      points: [
        'Traditional registration: expensive, slow, bureaucratic',
        'Average cost: IDR 1-5 million per work',
        'Processing time: 3-6 months',
      ],
    },
    {
      icon: AlertTriangle,
      title: 'Rampant IP Theft',
      points: [
        '70%+ of digital creators experience unauthorized use',
        'Difficult to prove ownership and creation date',
        'Limited legal recourse for small creators',
      ],
    },
    {
      icon: DollarSign,
      title: 'Lost Revenue',
      points: [
        "Creators can't monetize secondary sales",
        'No infrastructure for perpetual royalties',
        'Global marketplace access barriers',
      ],
    },
    {
      icon: Target,
      title: 'Target Market',
      points: [
        '63 million+ creative economy workers in Indonesia',
        'Growing digital creator ecosystem',
        'Need for affordable, accessible protection',
      ],
    },
  ];

  return (
    <SlideContent>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Indonesian Creators Face <span className="text-red-400">Critical Challenges</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <GlassCard key={index} variant="elevated" className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <problem.icon className="w-6 h-6 text-red-400" />
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-bold">{problem.title}</h3>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    {problem.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-400 flex-shrink-0">•</span>
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
