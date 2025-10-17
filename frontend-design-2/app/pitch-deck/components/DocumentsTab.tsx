'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, FileText, Shield, Download } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass/GlassCard';

const documents = [
  {
    title: 'Download Pitch Deck PDF',
    description: 'Download the complete pitch deck presentation',
    icon: Download,
    href: '/pitch-deck/KaryaChain_Pitch_Deck.pdf',
    isPDF: true,
    external: true,
  },
  {
    title: 'GitHub Repository',
    description: 'View the complete source code and documentation',
    icon: Github,
    href: 'https://github.com/RECTOR619/ojk-ekraf-hackathon',
    external: true,
  },
  {
    title: 'Smart Contracts (Sepolia)',
    description: 'View deployed and verified contracts on Etherscan',
    icon: Shield,
    href: 'https://sepolia.etherscan.io/address/0xa2e84f3c2520b963E4EeCdB64d3B384f829ca93f',
    external: true,
  },
  {
    title: 'Technical Documentation',
    description: 'Contract API, architecture, and security audit',
    icon: FileText,
    href: 'https://github.com/RECTOR619/ojk-ekraf-hackathon/tree/main/docs',
    external: true,
  },
];

export function DocumentsTab() {
  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Project <span className="gradient-text">Resources</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Access all project documentation, source code, and deployed contracts
          </p>
        </motion.div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc, index) => {
            const Icon = doc.icon;

            return (
              <motion.a
                key={doc.title}
                href={doc.href}
                target={doc.external ? '_blank' : undefined}
                rel={doc.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard variant="interactive" hover className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{doc.title}</h3>
                        {doc.external && (
                          <ExternalLink className="w-4 h-4 text-foreground/50 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-foreground/70">{doc.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.a>
            );
          })}
        </div>

        {/* Contract Addresses */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GlassCard className="p-6">
            <h3 className="text-xl font-bold mb-4 gradient-text">Deployed Contracts (Sepolia)</h3>
            <div className="space-y-3 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-foreground/70 font-medium min-w-[180px]">CopyrightRegistry:</span>
                <code className="glass px-3 py-1 rounded text-xs break-all">
                  0xa2e84f3c2520b963E4EeCdB64d3B384f829ca93f
                </code>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-foreground/70 font-medium min-w-[180px]">KaryaNFT:</span>
                <code className="glass px-3 py-1 rounded text-xs break-all">
                  0xE7f3c9BdAFd36050BdFAD3195dD7d0f4f2b52Fa4
                </code>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-foreground/70 font-medium min-w-[180px]">KaryaMarketplace:</span>
                <code className="glass px-3 py-1 rounded text-xs break-all">
                  0xb2430198bF01a8ec5749424a4642F32eb4b8Ed10
                </code>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
