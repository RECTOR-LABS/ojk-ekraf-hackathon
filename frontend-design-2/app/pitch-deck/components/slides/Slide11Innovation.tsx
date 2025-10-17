'use client';

import { SlideContent } from '../SlideContent';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { Globe, Infinity, Palette, Box, Sparkles } from 'lucide-react';

export function Slide11Innovation() {
  const innovations = [
    {
      icon: Globe,
      emoji: '🇮🇩',
      title: 'First for Indonesia',
      description: '63M+ creative workers, bilingual support (Bahasa + English)',
      highlight: '63M+ creators',
      color: 'from-red-600/20 to-white/20', // Indonesian flag colors
    },
    {
      icon: Infinity,
      emoji: '♾️',
      title: 'Perpetual Royalties',
      description: 'ERC-2981 standard ensures creators earn on every resale, forever',
      highlight: 'Forever',
      color: 'from-purple-600/20 to-blue-600/20',
    },
    {
      icon: Palette,
      emoji: '🎨',
      title: '5 Asset Types',
      description: 'Visual Art, Music, Literature, Video, and Other creative works',
      highlight: '5 types',
      color: 'from-pink-600/20 to-orange-600/20',
    },
    {
      icon: Box,
      emoji: '🏗️',
      title: 'Complete Ecosystem',
      description: 'Registration + Minting + Marketplace in one unified platform',
      highlight: '3-in-1',
      color: 'from-green-600/20 to-teal-600/20',
    },
    {
      icon: Sparkles,
      emoji: '✨',
      title: 'Beautiful Glassmorphism UX',
      description: 'Modern, intuitive design with responsive mobile experience',
      highlight: 'Premium UX',
      color: 'from-blue-600/20 to-purple-600/20',
    },
  ];

  return (
    <SlideContent>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            What Makes <span className="gradient-text">KaryaChain Unique?</span>
          </h2>
          <p className="text-xl text-foreground/70">
            Five key innovations that set us apart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {innovations.map((innovation, index) => (
            <GlassCard
              key={index}
              variant="elevated"
              className="p-6 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${innovation.color} flex items-center justify-center flex-shrink-0 text-2xl`}
                >
                  {innovation.emoji}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold">{innovation.title}</h3>
                    <span className="text-xs font-bold text-purple-400 px-3 py-1 rounded-full bg-purple-400/10 whitespace-nowrap">
                      {innovation.highlight}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/70">{innovation.description}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Indonesian Flag Accent */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-center gap-4 text-center">
            <div className="w-16 h-10 rounded-lg overflow-hidden flex flex-col shadow-lg">
              <div className="flex-1 bg-red-600"></div>
              <div className="flex-1 bg-white"></div>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-bold">Built for Indonesian Creators</p>
              <p className="text-sm text-foreground/70">
                Empowering the creative economy through blockchain innovation
              </p>
            </div>
          </div>
        </GlassCard>

        <div className="flex items-center justify-center gap-2 text-purple-400">
          <Sparkles className="w-5 h-5" />
          <p className="text-sm font-medium">
            A Complete Platform That Prioritizes Creator Rights
          </p>
          <Sparkles className="w-5 h-5" />
        </div>
      </div>
    </SlideContent>
  );
}
