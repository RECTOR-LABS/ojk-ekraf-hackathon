import { GlassCard } from '@/components/ui/glass/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { TrustSection } from '@/components/landing/TrustSection';
import { CTASection } from '@/components/landing/CTASection';
import { Shield, Sparkles, TrendingUp, Lock } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section - Full Height */}
      <HeroSection />

      {/* Features Grid */}
      <section className="py-24" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Why <span className="gradient-text">KaryaChain</span>?
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                The most comprehensive copyright protection platform for Indonesian creators
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <GlassCard key={index} variant="interactive" hover>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-sm text-foreground/70">{feature.description}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Trust Indicators Section */}
      <TrustSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

const features = [
  {
    icon: Shield,
    title: 'Copyright Protection',
    description: 'Tamper-proof registration on Ethereum Sepolia testnet.',
  },
  {
    icon: Sparkles,
    title: 'NFT Creation',
    description: 'Mint NFTs linked to your registered copyrights.',
  },
  {
    icon: TrendingUp,
    title: 'Perpetual Royalties',
    description: 'Earn 5-20% royalties on every resale, forever.',
  },
  {
    icon: Lock,
    title: 'IPFS Storage',
    description: 'Decentralized and permanent file storage.',
  },
];
