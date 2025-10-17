'use client';

import { SlideContent } from '../SlideContent';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { Upload, FileCheck, Coins, ShoppingBag, ArrowRight } from 'lucide-react';

export function Slide04HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: Upload,
      title: 'Upload Creative Work',
      description: 'Upload your file and add metadata',
      screenshot: '02-registration-upload-file.png',
    },
    {
      number: 2,
      icon: FileCheck,
      title: 'Register on Blockchain',
      description: 'Immutable proof of ownership',
      screenshot: '04-registration-blockchain-confirm.png',
    },
    {
      number: 3,
      icon: Coins,
      title: 'Mint NFT',
      description: 'Convert to tradeable NFT with royalties',
      screenshot: '06-mint-nft-modal.png',
    },
    {
      number: 4,
      icon: ShoppingBag,
      title: 'List on Marketplace',
      description: 'Sell globally, earn forever',
      screenshot: '08-marketplace-browse.png',
    },
  ];

  const innovations = [
    { text: 'Perpetual Royalties', highlight: true },
    { text: 'Verifiable Ownership', highlight: true },
    { text: 'Global Access', highlight: false },
  ];

  return (
    <SlideContent>
      <div className="space-y-10">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Simple <span className="gradient-text">4-Step Process</span>
          </h2>
          <p className="text-xl text-foreground/70">From creation to global marketplace in minutes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <GlassCard variant="elevated" className="p-5 h-full">
                <div className="flex flex-col items-center text-center space-y-3">
                  {/* Step Number Badge */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-purple-400" />
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                    <p className="text-sm text-foreground/60">{step.description}</p>
                  </div>
                </div>
              </GlassCard>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-2 transform -translate-y-1/2 translate-x-full z-10">
                  <ArrowRight className="w-6 h-6 text-purple-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Key Innovations */}
        <div className="text-center">
          <GlassCard variant="elevated" className="p-6 inline-block">
            <h3 className="text-lg font-bold mb-4">Key Innovations</h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {innovations.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.highlight ? 'bg-green-400' : 'bg-blue-400'}`} />
                  <span className={item.highlight ? 'text-green-400 font-semibold' : 'text-foreground/70'}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </SlideContent>
  );
}
