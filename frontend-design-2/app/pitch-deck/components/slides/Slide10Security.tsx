'use client';

import { SlideContent } from '../SlideContent';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { Shield, CheckCircle2, TestTube, Code2, Lock, Zap } from 'lucide-react';
import Image from 'next/image';

export function Slide10Security() {
  const securityFeatures = [
    {
      icon: TestTube,
      title: '100% Test Coverage',
      description: '90 comprehensive tests across all contracts',
      metric: '90 tests',
    },
    {
      icon: Shield,
      title: 'Slither Security Audit',
      description: 'Professional security analysis with zero critical issues',
      metric: '0 critical',
    },
    {
      icon: Lock,
      title: 'ReentrancyGuard',
      description: 'Protection against reentrancy attacks on all transfers',
      metric: 'Protected',
    },
    {
      icon: CheckCircle2,
      title: 'Etherscan Verified',
      description: 'All contracts verified with public source code',
      metric: 'Verified',
    },
  ];

  const productionQuality = [
    {
      icon: Code2,
      title: '100% Blockchain Integration',
      description: '5 custom wagmi hooks, no mock data anywhere',
    },
    {
      icon: Zap,
      title: 'Production-Ready UX',
      description: 'Mobile responsive, glassmorphism design, skeleton loaders',
    },
  ];

  return (
    <SlideContent>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Built for Production: <span className="gradient-text">Security & Quality</span>
          </h2>
          <p className="text-xl text-foreground/70">
            Enterprise-grade testing and auditing standards
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {securityFeatures.map((feature, index) => (
            <GlassCard key={index} className="p-4 lg:p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                    <span className="text-sm font-bold text-green-400 px-3 py-1 rounded-full bg-green-400/10">
                      {feature.metric}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/70">{feature.description}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Production Quality */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {productionQuality.map((item, index) => (
            <GlassCard key={index} variant="elevated" className="p-4 lg:p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-purple-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-foreground/70">{item.description}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Etherscan Verification Screenshot */}
        <GlassCard variant="elevated" className="overflow-hidden p-0">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src="/.pitch-deck-assets/screenshots/11-etherscan-verification.png"
              alt="Etherscan Contract Verification - All contracts verified with public source code"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </GlassCard>

        <div className="flex items-center justify-center gap-2 text-green-400">
          <Shield className="w-5 h-5" />
          <p className="text-sm font-medium">
            Production-Ready: Security Audited & Fully Tested
          </p>
        </div>
      </div>
    </SlideContent>
  );
}
