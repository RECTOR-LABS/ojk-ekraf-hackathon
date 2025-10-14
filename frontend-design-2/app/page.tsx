import { GlassCard } from '@/components/ui/glass/GlassCard';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Shield, Sparkles, TrendingUp, Lock } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto space-y-16">
      {/* Hero Section */}
      <AnimatedSection>
        <div className="text-center space-y-6 py-12">
          <h1 className="text-5xl lg:text-7xl font-bold">
            <span className="gradient-text">Protect Your Creativity</span>
            <br />
            <span className="text-foreground">On The Blockchain</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Tamper-proof copyright registration, NFT creation, and perpetual royalties for
            Indonesian creators.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/register">
              <GlassButton variant="primary" size="lg">
                Register Copyright
              </GlassButton>
            </Link>
            <Link href="/marketplace">
              <GlassButton variant="secondary" size="lg">
                Explore Marketplace
              </GlassButton>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Features Grid */}
      <AnimatedSection delay={0.2}>
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

      {/* Stats */}
      <AnimatedSection delay={0.4}>
        <GlassCard variant="elevated">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">1,234</div>
              <div className="text-sm text-foreground/60">Copyrights Registered</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">567</div>
              <div className="text-sm text-foreground/60">NFTs Minted</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">89</div>
              <div className="text-sm text-foreground/60">Active Listings</div>
            </div>
          </div>
        </GlassCard>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection delay={0.6}>
        <GlassCard variant="elevated">
          <div className="text-center space-y-6 py-8">
            <h2 className="text-3xl font-bold gradient-text">Ready to Get Started?</h2>
            <p className="text-foreground/70 max-w-xl mx-auto">
              Join Indonesian creators protecting their work on the blockchain. Register your first
              copyright in minutes.
            </p>
            <Link href="/register">
              <GlassButton variant="primary" size="lg">
                Register Your First Copyright
              </GlassButton>
            </Link>
          </div>
        </GlassCard>
      </AnimatedSection>
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
