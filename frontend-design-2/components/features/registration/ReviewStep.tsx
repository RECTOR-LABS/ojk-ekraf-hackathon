'use client';

import { motion } from 'framer-motion';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { useRegistrationStore } from '@/lib/stores/registrationStore';
import { Badge } from '@/components/ui/glass/Badge';
import { File, Image, Video, Music, FileText, Check } from 'lucide-react';

export function ReviewStep() {
  const { file, fileHash, metadata, nextStep, prevStep, goToStep } = useRegistrationStore();

  const getFileIcon = () => {
    if (!file) return File;
    if (file.type.startsWith('image/')) return Image;
    if (file.type.startsWith('video/')) return Video;
    if (file.type.startsWith('audio/')) return Music;
    return FileText;
  };

  const FileIcon = getFileIcon();

  const assetTypeLabels: { [key: string]: string } = {
    VISUAL_ART: 'Visual Art',
    MUSIC: 'Music',
    LITERATURE: 'Literature',
    VIDEO: 'Video',
    OTHER: 'Other',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review Your Registration</h2>
        <p className="text-foreground/70">
          Please verify all information before submitting to the blockchain.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Summary */}
        <GlassCard>
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              File Information
            </h3>

            {file && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
                    <FileIcon className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{file.name}</p>
                    <p className="text-sm text-foreground/60">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground/70">Content Hash</p>
                  <code className="text-xs text-purple-400 break-all block bg-black/20 p-2 rounded-lg">
                    {fileHash}
                  </code>
                </div>
              </div>
            )}

            <button
              onClick={() => goToStep(0)}
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              Edit File
            </button>
          </div>
        </GlassCard>

        {/* Metadata Summary */}
        <GlassCard>
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              Metadata
            </h3>

            {metadata && (
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground/70 mb-1">Title</p>
                  <p className="font-semibold">{metadata.title}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground/70 mb-1">Description</p>
                  <p className="text-sm">{metadata.description}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground/70 mb-1">Asset Type</p>
                  <Badge variant="info">{assetTypeLabels[metadata.assetType]}</Badge>
                </div>

                {metadata.tags.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-foreground/70 mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {metadata.tags.map((tag) => (
                        <Badge key={tag} variant="default">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => goToStep(1)}
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              Edit Metadata
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Important Notice */}
      <motion.div
        className="glass rounded-xl p-6 border-2 border-yellow-600/30 bg-yellow-600/5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h4 className="font-bold text-yellow-400 mb-2">Important Notice</h4>
        <ul className="text-sm text-foreground/70 space-y-1 list-disc list-inside">
          <li>Your file and metadata will be uploaded to IPFS (decentralized storage)</li>
          <li>Content hash will be registered on the Ethereum blockchain</li>
          <li>Once registered, the information cannot be altered</li>
          <li>You will need to pay a small gas fee for the blockchain transaction</li>
        </ul>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4 pt-4">
        <GlassButton variant="ghost" size="lg" onClick={prevStep}>
          Back
        </GlassButton>
        <GlassButton variant="primary" size="lg" onClick={nextStep}>
          Proceed to Registration
        </GlassButton>
      </div>
    </div>
  );
}
