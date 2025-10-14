'use client';

import { motion } from 'framer-motion';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { Shield, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const floatingIcons = [
    { Icon: Shield, delay: 0, x: -20, y: -30, rotate: -15 },
    { Icon: Sparkles, delay: 0.2, x: 20, y: -20, rotate: 15 },
    { Icon: TrendingUp, delay: 0.4, x: 0, y: 30, rotate: 0 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>

      {/* Floating 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map(({ Icon, delay, x, y, rotate }, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${20 + index * 25}%`,
              top: `${30 + index * 15}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              x: [x, x + 10, x],
              y: [y, y - 10, y],
              rotate: [rotate, rotate + 10, rotate],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay,
              ease: 'easeInOut',
            }}
          >
            <div className="w-32 h-32 rounded-3xl glass flex items-center justify-center">
              <Icon className="w-16 h-16 text-purple-400/30" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-8">
        {/* Headline with Typing Animation Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
            <motion.span
              className="gradient-text block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Protect Your Creativity
            </motion.span>
            <motion.span
              className="text-foreground block mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              On The Blockchain
            </motion.span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          className="text-xl lg:text-2xl text-foreground/70 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Tamper-proof copyright registration, NFT creation, and perpetual royalties
          for Indonesian creators.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
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
        </motion.div>

        {/* Animated Statistics Counter */}
        {mounted && <StatisticsCounter />}
      </div>
    </section>
  );
}

function StatisticsCounter() {
  // TODO: Fetch real data from blockchain contracts
  const stats = [
    { value: 1234, label: 'Copyrights Registered' },
    { value: 567, label: 'NFTs Minted' },
    { value: 89, label: 'Active Listings' },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="glass rounded-2xl p-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
        >
          <CountUpNumber value={stat.value} duration={1.5} delay={0.6 + index * 0.05} />
          <p className="text-sm text-foreground/60 mt-2">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function CountUpNumber({ value, duration, delay }: { value: number; duration: number; delay: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const end = value;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [value, duration, delay]);

  return <div className="text-5xl font-bold gradient-text">{count.toLocaleString()}</div>;
}
