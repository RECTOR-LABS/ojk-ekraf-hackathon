'use client';

import { SlideContent } from '../SlideContent';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { DollarSign, TrendingUp, Globe } from 'lucide-react';
import { usePitchDeckLanguage } from '@/lib/hooks/usePitchDeckLanguage';

export function Slide12Business() {
  const { language } = usePitchDeckLanguage();

  const content = {
    en: {
      title: 'Sustainable',
      titleHighlight: 'Revenue Model',
      platformFee: {
        title: 'Platform Fee: 2.5%',
        details: ['Applied to all marketplace sales', 'Industry-standard rate', 'Transparent, on-chain deduction'],
        projection: {
          title: 'Revenue Projection Example:',
          monthlySales: 'Monthly Sales:',
          platformFee: 'Platform Fee (2.5%):',
          annualRevenue: 'Annual Revenue:',
        },
      },
      creatorBenefits: {
        title: 'Creator Benefits',
        benefits: [
          {
            title: 'Perpetual Royalties (5-20%)',
            description: 'Set your own rate, earn on every resale',
          },
          {
            title: 'Global Market Access',
            description: 'Reach international buyers, 24/7 marketplace',
          },
          {
            title: 'Affordable Registration',
            description: 'Gas fees only (~$0.50), no middlemen',
          },
        ],
      },
      marketOpportunity: {
        title: 'Market Opportunity',
        stats: [
          { value: '63M+', label: 'Indonesia Creative Workers' },
          { value: '200M+', label: 'Southeast Asia Potential' },
          { value: '$2.6T', label: 'Global Creative Economy' },
        ],
      },
    },
    id: {
      title: 'Model Pendapatan',
      titleHighlight: 'Berkelanjutan',
      platformFee: {
        title: 'Biaya Platform: 2.5%',
        details: ['Diterapkan pada semua penjualan marketplace', 'Tarif standar industri', 'Pemotongan transparan on-chain'],
        projection: {
          title: 'Contoh Proyeksi Pendapatan:',
          monthlySales: 'Penjualan Bulanan:',
          platformFee: 'Biaya Platform (2.5%):',
          annualRevenue: 'Pendapatan Tahunan:',
        },
      },
      creatorBenefits: {
        title: 'Manfaat Kreator',
        benefits: [
          {
            title: 'Royalti Perpetual (5-20%)',
            description: 'Atur tingkat sendiri, dapatkan penghasilan dari setiap penjualan ulang',
          },
          {
            title: 'Akses Pasar Global',
            description: 'Jangkau pembeli internasional, marketplace 24/7',
          },
          {
            title: 'Pendaftaran Terjangkau',
            description: 'Hanya biaya gas (~$0.50), tanpa perantara',
          },
        ],
      },
      marketOpportunity: {
        title: 'Peluang Pasar',
        stats: [
          { value: '63 juta+', label: 'Pekerja Kreatif Indonesia' },
          { value: '200 juta+', label: 'Potensi Asia Tenggara' },
          { value: '$2.6T', label: 'Ekonomi Kreatif Global' },
        ],
      },
    },
  };

  const t = content[language];

  return (
    <SlideContent>
      <div className="space-y-8">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Platform Revenue */}
          <GlassCard variant="elevated" className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">{t.platformFee.title}</h3>
              </div>
              <div className="space-y-3 text-sm text-foreground/70">
                {t.platformFee.details.map((detail, index) => (
                  <p key={index}>{detail}</p>
                ))}
              </div>
              <div className="pt-4 space-y-2 font-mono text-sm">
                <p className="text-foreground/60">{t.platformFee.projection.title}</p>
                <div className="space-y-1 bg-black/20 p-3 rounded-lg">
                  <p>
                    {t.platformFee.projection.monthlySales} <span className="text-purple-400">100 ETH</span>
                  </p>
                  <p>
                    {t.platformFee.projection.platformFee} <span className="text-purple-400">2.5 ETH</span>
                  </p>
                  <p>
                    {t.platformFee.projection.annualRevenue} <span className="text-green-400">30 ETH (~$60k)</span>
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Creator Benefits */}
          <GlassCard variant="elevated" className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold">{t.creatorBenefits.title}</h3>
              </div>
              <div className="space-y-3">
                {t.creatorBenefits.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-green-400 flex-shrink-0">✓</span>
                    <div>
                      <p className="font-semibold">{benefit.title}</p>
                      <p className="text-sm text-foreground/60">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Market Opportunity */}
        <GlassCard variant="elevated" className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
              <Globe className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold">{t.marketOpportunity.title}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {t.marketOpportunity.stats.map((stat, index) => (
              <div key={index}>
                <p
                  className={`text-3xl font-bold ${
                    index === 0 ? 'text-purple-400' : index === 1 ? 'text-blue-400' : 'text-green-400'
                  }`}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </SlideContent>
  );
}
