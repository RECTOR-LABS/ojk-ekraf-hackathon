'use client';

import { SlideContent } from '../SlideContent';
import { CheckCircle2, Zap, ShoppingCart, Database } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { usePitchDeckLanguage } from '@/lib/hooks/usePitchDeckLanguage';

export function Slide03Solution() {
  const { language } = usePitchDeckLanguage();

  const content = {
    en: {
      title: 'Blockchain-Based',
      titleHighlight: 'Copyright Registry',
      subtitle: '+ NFT Marketplace',
      description: 'A decentralized platform that provides:',
      features: [
        {
          icon: Zap,
          title: 'Instant Copyright Registration',
          points: [
            'One-click registration with blockchain timestamp',
            'Immutable proof of ownership',
            'Cost: ~$0.50 (gas fees only)',
          ],
        },
        {
          icon: CheckCircle2,
          title: 'NFT Minting with Royalties',
          points: [
            'Convert copyrights into tradeable NFTs',
            'Set custom royalties: 5-20%',
            'Earn on every resale, forever',
          ],
        },
        {
          icon: ShoppingCart,
          title: 'Decentralized Marketplace',
          points: [
            'List and sell creative works globally',
            'Automatic royalty distribution',
            'Transparent, secure transactions',
          ],
        },
        {
          icon: Database,
          title: 'IPFS Storage',
          points: [
            'Decentralized file storage',
            'Permanent, censorship-resistant',
            'Content addressing for verification',
          ],
        },
      ],
    },
    id: {
      title: 'Registri Hak Cipta Berbasis',
      titleHighlight: 'Blockchain',
      subtitle: '+ Marketplace NFT',
      description: 'Platform terdesentralisasi yang menyediakan:',
      features: [
        {
          icon: Zap,
          title: 'Pendaftaran Hak Cipta Instan',
          points: [
            'Pendaftaran satu klik dengan timestamp blockchain',
            'Bukti kepemilikan yang tidak dapat diubah',
            'Biaya: ~$0.50 (hanya biaya gas)',
          ],
        },
        {
          icon: CheckCircle2,
          title: 'Minting NFT dengan Royalti',
          points: [
            'Konversi hak cipta menjadi NFT yang dapat diperdagangkan',
            'Atur royalti kustom: 5-20%',
            'Dapatkan penghasilan dari setiap penjualan ulang, selamanya',
          ],
        },
        {
          icon: ShoppingCart,
          title: 'Marketplace Terdesentralisasi',
          points: [
            'Jual karya kreatif secara global',
            'Distribusi royalti otomatis',
            'Transaksi transparan dan aman',
          ],
        },
        {
          icon: Database,
          title: 'Penyimpanan IPFS',
          points: [
            'Penyimpanan file terdesentralisasi',
            'Permanen dan tahan sensor',
            'Content addressing untuk verifikasi',
          ],
        },
      ],
    },
  };

  const t = content[language];
  const features = t.features;

  return (
    <SlideContent>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>
            <br />{t.subtitle}
          </h2>
          <p className="text-xl text-foreground/70">{t.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <GlassCard key={index} variant="elevated" className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    {feature.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-400 flex-shrink-0">✓</span>
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
