'use client';

import { SlideContent } from '../SlideContent';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { Upload, FileText, Eye, CheckCircle2, Clock, Shield, Database } from 'lucide-react';
import Image from 'next/image';

export function Slide05Registration() {
  const flowSteps = [
    {
      icon: Upload,
      label: 'Upload File',
      color: 'from-blue-600/20 to-cyan-600/20',
      iconColor: 'text-blue-400',
    },
    {
      icon: FileText,
      label: 'Add Metadata',
      color: 'from-purple-600/20 to-pink-600/20',
      iconColor: 'text-purple-400',
    },
    {
      icon: Eye,
      label: 'Review',
      color: 'from-orange-600/20 to-yellow-600/20',
      iconColor: 'text-orange-400',
    },
    {
      icon: CheckCircle2,
      label: 'Submit to Blockchain',
      color: 'from-green-600/20 to-emerald-600/20',
      iconColor: 'text-green-400',
    },
  ];

  const results = [
    {
      icon: Clock,
      label: '<2 min registration',
    },
    {
      icon: Shield,
      label: 'Immutable proof',
    },
    {
      icon: Database,
      label: 'IPFS storage',
    },
    {
      icon: CheckCircle2,
      label: 'Ready to mint',
    },
  ];

  return (
    <SlideContent>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Demo: <span className="gradient-text">Copyright Registration</span>
          </h2>
          <p className="text-xl text-foreground/70">Complete flow from upload to blockchain</p>
        </div>

        {/* Flow Steps */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {flowSteps.map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                  <step.icon className={`w-7 h-7 ${step.iconColor}`} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-center">{step.label}</span>
              </div>
              {index < flowSteps.length - 1 && (
                <div className="hidden sm:block w-8 h-0.5 bg-gradient-to-r from-purple-600/50 to-blue-600/50 mb-6" />
              )}
            </div>
          ))}
        </div>

        {/* Screenshot */}
        <GlassCard variant="elevated" className="p-4 overflow-hidden">
          <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden">
            <Image
              src="/pitch-deck/03-registration-ipfs-upload.png"
              alt="Copyright Registration - IPFS Upload"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </GlassCard>

        {/* Results */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((result, index) => (
            <GlassCard key={index} variant="elevated" className="p-4">
              <div className="flex flex-col items-center text-center gap-2">
                <result.icon className="w-8 h-8 text-green-400" />
                <span className="text-sm font-medium">{result.label}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </SlideContent>
  );
}
