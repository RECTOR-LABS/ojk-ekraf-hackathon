'use client';

import { motion } from 'framer-motion';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export function CTASection() {
  const t = useTranslations('cta');
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

    const element = document.getElementById('cta-section');
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
    <section id="cta-section" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Rainbow Border - Pulsing Glow */}
          <motion.div
            className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 opacity-75 blur-xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.75, 0.9, 0.75],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Content Card */}
          <div className="relative glass rounded-3xl p-12 text-center space-y-6">
            {/* Subtle Batik Pattern Overlay */}
            <div className="absolute inset-0 rounded-3xl opacity-5 bg-[url('/batik-pattern.svg')] bg-repeat" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
                {t('title')}
              </h2>
            </motion.div>

            <motion.p
              className="text-xl text-foreground/70 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/register">
                <GlassButton variant="primary" size="lg">
                  {t('button')}
                </GlassButton>
              </Link>
            </motion.div>

            {/* Supporting Text */}
            <motion.p
              className="text-sm text-foreground/50"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {t('features')}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
