'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { Lock, Database, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const trustIndicators = [
  {
    icon: Lock,
    title: 'Blockchain Security',
    description: 'Ethereum Sepolia Testnet',
    detail: 'Immutable and tamper-proof records',
  },
  {
    icon: Database,
    title: 'IPFS Storage',
    description: 'Decentralized & Permanent',
    detail: 'Your files stored forever on IPFS',
  },
  {
    icon: CheckCircle2,
    title: 'Smart Contracts Verified',
    description: 'Audited & Open Source',
    detail: 'Transparent and trustworthy code',
  },
];

export function TrustSection() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('trust-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="trust-section" className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <GlassCard variant="elevated">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={index}
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Animated Icon with Pulse */}
                <motion.div
                  className="relative mx-auto w-20 h-20"
                  animate={
                    inView
                      ? {
                          scale: [1, 1.1, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                >
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                    <indicator.icon className="w-10 h-10 text-purple-400" />
                  </div>

                  {/* Pulsing ring effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-purple-600/30"
                    animate={
                      inView
                        ? {
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </motion.div>

                <h3 className="text-xl font-bold">{indicator.title}</h3>
                <p className="text-lg gradient-text font-semibold">{indicator.description}</p>
                <p className="text-sm text-foreground/70">{indicator.detail}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
