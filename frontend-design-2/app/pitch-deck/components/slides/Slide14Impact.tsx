'use client';

import { SlideContent } from '../SlideContent';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { Target, Globe2, Shield, Landmark } from 'lucide-react';
import { usePitchDeckLanguage } from '@/lib/hooks/usePitchDeckLanguage';

export function Slide14Impact() {
  const { language } = usePitchDeckLanguage();

  const content = {
    en: {
      title: "Empowering Indonesia's",
      titleHighlight: 'Creative Economy',
      impacts: [
        {
          icon: Target,
          emoji: '🎯',
          title: 'Economic Empowerment',
          points: [
            '63 million+ creative workers gain affordable copyright protection',
            'Democratize IP rights (not just for big corporations)',
            'Enable micro-creators to monetize their work',
          ],
        },
        {
          icon: Globe2,
          emoji: '🌍',
          title: 'Global Market Access',
          points: [
            'Indonesian creators can sell to international buyers',
            'Remove geographic barriers',
            'Compete on global Web3 marketplace',
          ],
        },
        {
          icon: Shield,
          emoji: '💪',
          title: 'Strengthen IP Culture',
          points: [
            'Educate creators about copyright importance',
            'Build IP-aware creative community',
            'Reduce piracy through easy registration',
          ],
        },
        {
          icon: Landmark,
          emoji: '🏛️',
          title: 'Align with National Goals',
          points: [
            "Support OJK's digital financial innovation vision",
            "Contribute to Indonesia's creative economy GDP (8%+)",
            'Foster blockchain adoption in creative sector',
          ],
        },
      ],
      realImpactTitle: 'Real-World Impact',
      realImpactSubtitle: 'If just 1% of 63M creators use KaryaChain:',
      stats: [
        { value: '630,000', label: 'Creators Protected', color: 'text-red-400' },
        { value: '$300,000+', label: 'Saved in Registration Fees', color: 'text-white' },
        { value: 'Millions', label: 'In Royalties Earned', color: 'text-green-400' },
      ],
    },
    id: {
      title: 'Memberdayakan Ekonomi Kreatif',
      titleHighlight: 'Indonesia',
      impacts: [
        {
          icon: Target,
          emoji: '🎯',
          title: 'Pemberdayaan Ekonomi',
          points: [
            '63 juta+ pekerja kreatif mendapat perlindungan hak cipta terjangkau',
            'Demokratisasi hak kekayaan intelektual (tidak hanya untuk korporasi besar)',
            'Memungkinkan kreator mikro memonetisasi karya mereka',
          ],
        },
        {
          icon: Globe2,
          emoji: '🌍',
          title: 'Akses Pasar Global',
          points: [
            'Kreator Indonesia dapat menjual ke pembeli internasional',
            'Hilangkan hambatan geografis',
            'Bersaing di marketplace Web3 global',
          ],
        },
        {
          icon: Shield,
          emoji: '💪',
          title: 'Perkuat Budaya Kekayaan Intelektual',
          points: [
            'Edukasi kreator tentang pentingnya hak cipta',
            'Bangun komunitas kreatif yang sadar kekayaan intelektual',
            'Kurangi pembajakan melalui pendaftaran mudah',
          ],
        },
        {
          icon: Landmark,
          emoji: '🏛️',
          title: 'Selaras dengan Tujuan Nasional',
          points: [
            'Mendukung visi inovasi keuangan digital OJK',
            'Berkontribusi pada PDB ekonomi kreatif Indonesia (8%+)',
            'Mendorong adopsi blockchain di sektor kreatif',
          ],
        },
      ],
      realImpactTitle: 'Dampak Nyata',
      realImpactSubtitle: 'Jika hanya 1% dari 63 juta kreator menggunakan KaryaChain:',
      stats: [
        { value: '630.000', label: 'Kreator Terlindungi', color: 'text-red-400' },
        { value: '$300.000+', label: 'Hemat Biaya Pendaftaran', color: 'text-white' },
        { value: 'Jutaan', label: 'Royalti yang Diperoleh', color: 'text-green-400' },
      ],
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

        {/* Impact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {t.impacts.map((impact, index) => {
            const Icon = impact.icon;
            return (
              <GlassCard
                key={index}
                variant="elevated"
                className="p-6 border-2 border-red-500/20 hover:border-red-500/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600/20 to-white/5 flex items-center justify-center border border-red-500/20">
                      <Icon className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <span className="text-2xl mr-2">{impact.emoji}</span>
                      <h3 className="text-xl font-bold inline">{impact.title}</h3>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    {impact.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-400 flex-shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Real Impact Statistics */}
        <GlassCard variant="elevated" className="p-6 border-2 border-red-500/20">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">{t.realImpactTitle}</h3>
            <p className="text-lg text-foreground/70">{t.realImpactSubtitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {t.stats.map((stat, index) => (
                <div key={index}>
                  <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-sm text-foreground/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </SlideContent>
  );
}
