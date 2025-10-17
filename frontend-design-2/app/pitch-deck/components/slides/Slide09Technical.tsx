'use client';

import { SlideContent } from '../SlideContent';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { Code2, ArrowRight } from 'lucide-react';
import { usePitchDeckLanguage } from '@/lib/hooks/usePitchDeckLanguage';

export function Slide09Technical() {
  const { language } = usePitchDeckLanguage();

  const content = {
    en: {
      title: 'Enterprise-Grade',
      titleHighlight: 'Technical Stack',
      subtitle: 'Built for scale, security, and performance',
      archTitle: 'Architecture Flow',
      archFlow: ['Next.js Frontend', 'RainbowKit + wagmi', '3 Smart Contracts', 'IPFS Storage'],
      contracts: [
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
      ],
      techStackTitle: 'Technology Stack',
      techStack: [
        { label: 'Blockchain', value: 'Ethereum Sepolia' },
        { label: 'Smart Contracts', value: 'Solidity 0.8.20' },
        { label: 'Frontend', value: 'Next.js 14 + TypeScript' },
        { label: 'Web3 Integration', value: 'wagmi v2 + RainbowKit' },
        { label: 'Storage', value: 'Pinata IPFS' },
        { label: 'Testing', value: 'Hardhat + 90 tests' },
      ],
    },
    id: {
      title: 'Tumpukan Teknologi',
      titleHighlight: 'Tingkat Enterprise',
      subtitle: 'Dibangun untuk skala, keamanan, dan performa',
      archTitle: 'Alur Arsitektur',
      archFlow: ['Frontend Next.js', 'RainbowKit + wagmi', '3 Smart Contract', 'Penyimpanan IPFS'],
      contracts: [
        {
          name: 'CopyrightRegistry',
          description: '100% coverage • 19 tes',
          features: ['Pendaftaran aset', 'Verifikasi kepemilikan', 'Bukti timestamp'],
        },
        {
          name: 'KaryaNFT',
          description: 'ERC-721 + ERC-2981',
          features: ['Minting NFT', 'Standar royalti', 'Tautan hak cipta'],
        },
        {
          name: 'KaryaMarketplace',
          description: '2.5% biaya platform',
          features: ['Listing NFT', 'Pembelian aman', 'Royalti otomatis'],
        },
      ],
      techStackTitle: 'Tumpukan Teknologi',
      techStack: [
        { label: 'Blockchain', value: 'Ethereum Sepolia' },
        { label: 'Smart Contract', value: 'Solidity 0.8.20' },
        { label: 'Frontend', value: 'Next.js 14 + TypeScript' },
        { label: 'Integrasi Web3', value: 'wagmi v2 + RainbowKit' },
        { label: 'Penyimpanan', value: 'Pinata IPFS' },
        { label: 'Testing', value: 'Hardhat + 90 tes' },
      ],
    },
  };

  const t = content[language];

  return (
    <SlideContent>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-xl text-foreground/70">{t.subtitle}</p>
        </div>

        {/* Architecture Flow */}
        <GlassCard variant="elevated" className="p-6">
          <h3 className="text-xl font-bold mb-6 text-center">{t.archTitle}</h3>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm lg:text-base">
            {t.archFlow.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="glass rounded-lg px-4 py-2 font-medium">{item}</div>
                {index < t.archFlow.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-purple-400 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Smart Contracts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {t.contracts.map((contract, index) => (
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
          <h3 className="text-xl font-bold mb-4 text-center">{t.techStackTitle}</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {t.techStack.map((tech, index) => (
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
