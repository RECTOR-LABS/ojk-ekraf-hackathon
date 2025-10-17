'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Play } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass/GlassCard';

interface DemoVideoSectionProps {
  videoUrl?: string; // YouTube embed URL (to be added later)
}

export function DemoVideoSection({ videoUrl }: DemoVideoSectionProps) {
  // If no video URL provided, show placeholder
  const hasVideo = videoUrl && videoUrl.trim() !== '';

  return (
    <section className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-background to-purple-950/10">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Title */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold">
              Watch <span className="gradient-text">Live Demo</span>
            </h2>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
              See KaryaChain in action - from copyright registration to marketplace purchase
            </p>
          </div>

          {/* Video Player Card */}
          <GlassCard variant="elevated" className="p-4 sm:p-6 lg:p-8">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-purple-950/50 to-blue-950/50">
              {hasVideo ? (
                /* YouTube Embed */
                <iframe
                  src={videoUrl}
                  title="KaryaChain Demo Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                /* Placeholder when no video URL */
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-purple-600/20 flex items-center justify-center">
                    <Play className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-lg sm:text-xl font-semibold text-foreground/80">
                      Demo Video Coming Soon
                    </p>
                    <p className="text-sm text-foreground/50">
                      Video will be added before submission
                    </p>
                  </div>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Video Description */}
          <div className="text-center space-y-4 sm:space-y-6">
            <p className="text-foreground/70">
              This 3-5 minute walkthrough demonstrates the complete user journey
            </p>

            {/* Feature Checklist */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>Copyright Registration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>NFT Minting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>Marketplace Purchase</span>
              </div>
            </div>

            {/* Live Demo CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-4"
            >
              <a
                href="https://karyachain.rectorspace.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 glass px-6 py-3 rounded-xl hover:scale-105 transition-transform font-medium"
              >
                <span>Try Live Demo</span>
                <span className="text-purple-400">→</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
