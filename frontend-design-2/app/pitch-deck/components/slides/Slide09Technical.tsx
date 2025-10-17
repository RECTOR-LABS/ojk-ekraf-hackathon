'use client';

import { SlideContent } from '../SlideContent';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { Code2, ArrowRight } from 'lucide-react';

export function Slide09Technical() {
  const contracts = [
    {
      name: 'CopyrightRegistry',
      description: '100% coverage • 19 tests',
      features: ['Asset registration', 'Ownership verification', 'Timestamp proof'],
    },
    {
      name: 'KaryaNFT',
      description: 'ERC-721 + ERC-2981',
      features: ['NFT minting', 'Royalty standard', 'Copyright linkage'],
    },
    {
      name: 'KaryaMarketplace',
      description: '2.5% platform fee',
      features: ['NFT listings', 'Secure purchases', 'Auto royalties'],
    },
  ];

  const techStack = [
    { label: 'Blockchain', value: 'Ethereum Sepolia' },
    { label: 'Smart Contracts', value: 'Solidity 0.8.20' },
    { label: 'Frontend', value: 'Next.js 14 + TypeScript' },
    { label: 'Web3 Integration', value: 'wagmi v2 + RainbowKit' },
    { label: 'Storage', value: 'Pinata IPFS' },
    { label: 'Testing', value: 'Hardhat + 90 tests' },
  ];

  return (
    <SlideContent>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Enterprise-Grade <span className="gradient-text">Technical Stack</span>
          </h2>
          <p className="text-xl text-foreground/70">Built for scale, security, and performance</p>
        </div>

        {/* Architecture Flow */}
        <GlassCard variant="elevated" className="p-6">
          <h3 className="text-xl font-bold mb-6 text-center">Architecture Flow</h3>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm lg:text-base">
            <div className="glass rounded-lg px-4 py-2 font-medium">Next.js Frontend</div>
            <ArrowRight className="w-5 h-5 text-purple-400 hidden sm:block" />
            <div className="glass rounded-lg px-4 py-2 font-medium">RainbowKit + wagmi</div>
            <ArrowRight className="w-5 h-5 text-purple-400 hidden sm:block" />
            <div className="glass rounded-lg px-4 py-2 font-medium">3 Smart Contracts</div>
            <ArrowRight className="w-5 h-5 text-purple-400 hidden sm:block" />
            <div className="glass rounded-lg px-4 py-2 font-medium">IPFS Storage</div>
          </div>
        </GlassCard>

        {/* Smart Contracts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {contracts.map((contract, index) => (
            <GlassCard key={index} className="p-4 lg:p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-bold">{contract.name}</h3>
                </div>
                <p className="text-sm text-purple-400 font-medium">{contract.description}</p>
                <ul className="space-y-1 text-sm text-foreground/70">
                  {contract.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-400 flex-shrink-0">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Tech Stack Grid */}
        <GlassCard variant="elevated" className="p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Technology Stack</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((tech, index) => (
              <div key={index} className="space-y-1">
                <p className="text-xs text-foreground/50 font-medium">{tech.label}</p>
                <p className="text-sm font-bold text-purple-400">{tech.value}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </SlideContent>
  );
}
