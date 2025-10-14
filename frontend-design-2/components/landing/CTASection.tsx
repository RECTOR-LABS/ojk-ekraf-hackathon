'use client';

import { motion } from 'framer-motion';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function CTASection() {
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
          {/* Animated Rainbow Border */}
          <motion.div
            className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 opacity-75 blur-xl"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
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
                Start Protecting Your Work Today
              </h2>
            </motion.div>

            <motion.p
              className="text-xl text-foreground/70 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Join Indonesian creators securing their digital rights on blockchain.
              Register your first copyright in minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/register">
                <GlassButton variant="primary" size="lg">
                  Register Your First Copyright
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
              Free to register • No credit card required • Secured by blockchain
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
