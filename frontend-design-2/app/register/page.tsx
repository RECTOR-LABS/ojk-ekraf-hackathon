'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { useRegistrationStore } from '@/lib/stores/registrationStore';
import { Upload, FileText, Eye, Zap, Check } from 'lucide-react';
import { FileUploadStep } from '@/components/features/registration/FileUploadStep';
import { MetadataFormStep } from '@/components/features/registration/MetadataFormStep';
import { ReviewStep } from '@/components/features/registration/ReviewStep';
import { TransactionStep } from '@/components/features/registration/TransactionStep';

const steps = [
  { icon: Upload, label: 'Upload File', description: 'Select your creative work' },
  { icon: FileText, label: 'Add Metadata', description: 'Describe your creation' },
  { icon: Eye, label: 'Review', description: 'Verify all information' },
  { icon: Zap, label: 'Register', description: 'Submit to blockchain' },
];

export default function RegisterPage() {
  const currentStep = useRegistrationStore((state) => state.currentStep);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-foreground/60">
        Home <span className="mx-2">/</span>{' '}
        <span className="text-foreground">Register Copyright</span>
      </div>

      {/* Page Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          Register Your <span className="gradient-text">Copyright</span>
        </h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Secure your creative work on the blockchain in 4 simple steps
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar - Progress Stepper (30%) */}
        <div className="lg:col-span-4">
          <GlassCard variant="elevated">
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-6">Progress</h2>
              {steps.map((step, index) => (
                <ProgressStepItem
                  key={index}
                  step={step}
                  index={index}
                  currentStep={currentStep}
                  isLast={index === steps.length - 1}
                />
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Content - Current Step Form (70%) */}
        <div className="lg:col-span-8">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard variant="elevated">
              {currentStep === 0 && <FileUploadStep />}
              {currentStep === 1 && <MetadataFormStep />}
              {currentStep === 2 && <ReviewStep />}
              {currentStep === 3 && <TransactionStep />}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

interface ProgressStepItemProps {
  step: { icon: any; label: string; description: string };
  index: number;
  currentStep: number;
  isLast: boolean;
}

function ProgressStepItem({ step, index, currentStep, isLast }: ProgressStepItemProps) {
  const isActive = index === currentStep;
  const isCompleted = index < currentStep;

  return (
    <div className="relative">
      <div className="flex gap-4">
        {/* Icon/Number */}
        <div className="relative flex-shrink-0">
          <motion.div
            className={`w-14 h-14 rounded-xl glass flex items-center justify-center border-2 relative z-10 ${
              isActive
                ? 'border-purple-600 bg-purple-600/20'
                : isCompleted
                  ? 'border-green-600 bg-green-600/20'
                  : 'border-foreground/10'
            }`}
            animate={isActive ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isCompleted ? (
              <Check className="w-6 h-6 text-green-400" />
            ) : (
              <step.icon
                className={`w-6 h-6 ${isActive ? 'text-purple-400' : 'text-foreground/40'}`}
              />
            )}
          </motion.div>

          {/* Pulsing ring for active step */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-purple-600/50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          {/* Connector line */}
          {!isLast && (
            <div
              className={`absolute left-1/2 top-14 -translate-x-1/2 w-0.5 h-16 ${
                isCompleted ? 'bg-green-600/50' : 'bg-foreground/10'
              }`}
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-8">
          <h3
            className={`font-bold mb-1 ${
              isActive ? 'text-foreground' : isCompleted ? 'text-green-400' : 'text-foreground/40'
            }`}
          >
            {step.label}
          </h3>
          <p className="text-sm text-foreground/60">{step.description}</p>
        </div>
      </div>
    </div>
  );
}
