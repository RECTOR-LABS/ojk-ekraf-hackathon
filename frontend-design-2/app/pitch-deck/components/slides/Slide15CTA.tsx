'use client';

import { SlideContent } from '../SlideContent';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { ExternalLink, Github, Mail } from 'lucide-react';
import Image from 'next/image';

export function Slide15CTA() {
  return (
    <SlideContent>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/pitch-deck/01-landing-page-hero.png"
          alt="KaryaChain"
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-8 text-center">
        {/* Title */}
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Try <span className="gradient-text">KaryaChain</span> Today
          </h2>
        </div>

        {/* Main CTA - HUGE URL */}
        <GlassCard variant="elevated" className="p-8 sm:p-12">
          <div className="space-y-6">
            <p className="text-xl text-foreground/70 mb-6">Experience the Platform Live:</p>

            {/* Huge Clickable URL */}
            <a
              href="https://karyachain.rectorspace.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="text-3xl sm:text-4xl lg:text-6xl font-bold font-mono bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-purple-300 hover:via-blue-300 hover:to-purple-300 transition-all duration-300 group-hover:scale-105 transform">
                karyachain.rectorspace.com
              </div>
            </a>

            {/* Live Demo Button */}
            <div className="pt-4">
              <a
                href="https://karyachain.rectorspace.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 glass px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-transform"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Launch Live Demo</span>
              </a>
            </div>
          </div>
        </GlassCard>

        {/* What You Can Do */}
        <GlassCard variant="elevated" className="p-6">
          <h3 className="text-xl font-bold mb-4">What You Can Do:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2 justify-center">
              <span className="text-green-400">✓</span>
              <span>Connect Wallet</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span className="text-green-400">✓</span>
              <span>Register Copyright</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span className="text-green-400">✓</span>
              <span>Mint NFT</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span className="text-green-400">✓</span>
              <span>Explore Marketplace</span>
            </div>
          </div>
        </GlassCard>

        {/* Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* GitHub */}
          <a
            href="https://github.com/RECTOR-LABS/ojk-ekraf-hackathon"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-foreground/70 hover:text-purple-400 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="font-mono text-sm">github.com/RECTOR-LABS/ojk-ekraf-hackathon</span>
          </a>

          {/* Contact */}
          <div className="flex items-center gap-2 text-foreground/70">
            <Mail className="w-5 h-5" />
            <span className="text-sm">Team: RECTOR</span>
          </div>
        </div>

        {/* Final Message */}
        <div className="pt-4">
          <p className="text-xl sm:text-2xl font-semibold text-foreground/90">
            Join us in empowering Indonesia&apos;s creative economy! 🇮🇩
          </p>
        </div>
      </div>
    </SlideContent>
  );
}
