'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { Upload, Sparkles, ShoppingBag, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const steps = [
  {
    number: 1,
    icon: Upload,
    title: 'Register Copyright',
    description: 'Upload your creative work and add metadata. We generate a tamper-proof hash and store it on the blockchain.',
  },
  {
    number: 2,
    icon: Sparkles,
    title: 'Mint NFT',
    description: 'Transform your registered copyright into an NFT. Set your royalty percentage (5-20%) for all future sales.',
  },
  {
    number: 3,
    icon: ShoppingBag,
    title: 'List on Marketplace',
    description: 'Set your price and list your NFT on our marketplace. Your work is now ready for collectors.',
  },
  {
    number: 4,
    icon: TrendingUp,
    title: 'Earn Forever',
    description: 'Receive automatic royalty payments on every resale. Your creativity pays you perpetually.',
  },
];

export function HowItWorksSection() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('how-it-works');
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
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Get Started in <span className="gradient-text">4 Simple Steps</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            From registration to perpetual earnings in minutes
          </p>
        </motion.div>

        {/* Timeline - Desktop (Horizontal) */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connector Line */}
            {inView && (
              <motion.div
                className="absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                style={{ transformOrigin: 'left' }}
              />
            )}

            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                >
                  <GlassCard hover>
                    <div className="text-center space-y-4">
                      {/* Number Badge */}
                      <motion.div
                        className="relative mx-auto"
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        transition={{
                          type: 'spring',
                          stiffness: 200,
                          delay: 0.5 + index * 0.2,
                        }}
                      >
                        <div className="w-24 h-24 mx-auto rounded-full glass flex items-center justify-center border-4 border-purple-600/50 relative z-10">
                          <span className="text-4xl font-bold gradient-text">{step.number}</span>
                        </div>
                        {/* Pulsing ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-purple-600/30"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.5 + index * 0.2,
                          }}
                        />
                      </motion.div>

                      {/* Icon */}
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-purple-400" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="text-sm text-foreground/70">{step.description}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline - Mobile (Vertical) */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
            >
              {/* Connector Line (Vertical) */}
              {index < steps.length - 1 && (
                <motion.div
                  className="absolute left-12 top-24 bottom-0 w-1 bg-gradient-to-b from-purple-600 to-blue-600"
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                  style={{ transformOrigin: 'top' }}
                />
              )}

              <GlassCard>
                <div className="flex gap-6">
                  {/* Number Badge */}
                  <div className="flex-shrink-0">
                    <motion.div
                      className="w-24 h-24 rounded-full glass flex items-center justify-center border-4 border-purple-600/50 relative z-10"
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        delay: 0.5 + index * 0.2,
                      }}
                    >
                      <span className="text-3xl font-bold gradient-text">{step.number}</span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className="text-sm text-foreground/70">{step.description}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
