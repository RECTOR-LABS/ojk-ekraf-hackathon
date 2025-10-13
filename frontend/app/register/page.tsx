'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Card, Button, Spinner } from '@/components/ui';
import { FileUpload } from '@/components/features/FileUpload';
import { MetadataForm, CopyrightMetadata } from '@/components/features/MetadataForm';
import { useRegistrationStore } from '@/lib/stores/registrationStore';
import { uploadFileToIPFS } from '@/lib/utils/ipfs';

// Step indicators
const steps = [
  { number: 1, title: 'Upload File', titleId: 'Unggah File' },
  { number: 2, title: 'Add Details', titleId: 'Tambah Detail' },
  { number: 3, title: 'Review', titleId: 'Tinjau' },
  { number: 4, title: 'Register', titleId: 'Daftar' },
];

// Step 1: File Upload Component
function Step1FileUpload({ onNext }: { onNext: () => void }) {
  const { file, contentHash, setFile, setIPFSData } = useRegistrationStore();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileSelected = (selectedFile: File, hash: string) => {
    setFile(selectedFile, hash);
    setUploadError(null);
  };

  const handleFileRemoved = () => {
    setFile(null, null);
    setUploadError(null);
  };

  const handleContinue = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      // Upload file to IPFS
      const { ipfsHash, gatewayUrl } = await uploadFileToIPFS(file, {
        contentHash,
        originalName: file.name,
        fileType: file.type,
      });

      setIPFSData(ipfsHash, gatewayUrl);
      onNext();
    } catch (error) {
      console.error('IPFS upload error:', error);
      setUploadError('Failed to upload file to IPFS. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold font-display text-neutral-900 mb-2">
        Step 1: Upload Your Creative Work
      </h2>
      <p className="text-neutral-600 mb-6">
        Upload the file you want to protect. We'll store it securely on IPFS (decentralized storage).
      </p>

      <FileUpload
        onFileSelected={handleFileSelected}
        onFileRemoved={handleFileRemoved}
        maxSizeMB={100}
      />

      {uploadError && (
        <div className="mt-4 p-4 bg-error-50 border border-error-200 rounded-lg">
          <p className="text-sm text-error-900 font-semibold">Upload Error</p>
          <p className="text-sm text-error-700">{uploadError}</p>
        </div>
      )}

      <div className="flex items-center justify-end mt-8 pt-6 border-t border-neutral-200">
        <Button
          onClick={handleContinue}
          disabled={!file || isUploading}
          variant="primary"
          size="large"
          loading={isUploading}
        >
          {isUploading ? 'Uploading to IPFS...' : 'Continue to Details →'}
        </Button>
      </div>
    </div>
  );
}

// Step 2: Metadata Form Component
function Step2Metadata({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { address } = useAccount();
  const { metadata, setMetadata } = useRegistrationStore();

  const handleSubmit = (formData: CopyrightMetadata) => {
    setMetadata(formData);
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold font-display text-neutral-900 mb-2">
        Step 2: Add Details About Your Work
      </h2>
      <p className="text-neutral-600 mb-6">
        Provide information to help others understand and discover your creative work.
      </p>

      <MetadataForm
        onSubmit={handleSubmit}
        onBack={onBack}
        initialData={metadata || undefined}
        walletAddress={address}
      />
    </div>
  );
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold font-display text-neutral-900 mb-4">
            Register Your Copyright
          </h1>
          <p className="text-lg text-neutral-600 mb-2">
            Daftarkan Hak Cipta Karya Anda
          </p>
          <p className="text-neutral-500">
            Protect your creative work on the blockchain in minutes
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all
                      ${
                        currentStep > step.number
                          ? 'bg-primary-600 text-white'
                          : currentStep === step.number
                          ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                          : 'bg-neutral-200 text-neutral-500'
                      }
                    `}
                  >
                    {currentStep > step.number ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  {/* Step Label */}
                  <div className="mt-2 text-center">
                    <p
                      className={`text-sm font-semibold ${
                        currentStep >= step.number ? 'text-neutral-900' : 'text-neutral-500'
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-neutral-500 hidden sm:block">{step.titleId}</p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all ${
                      currentStep > step.number ? 'bg-primary-600' : 'bg-neutral-200'
                    }`}
                    style={{ marginTop: '-48px', maxWidth: '100px' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card variant="elevated" className="p-6 lg:p-8">
          {/* Step Content */}
          {currentStep === 1 && <Step1FileUpload onNext={() => setCurrentStep(2)} />}
          {currentStep === 2 && (
            <Step2Metadata
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold font-display text-neutral-900 mb-2">
                Step 3: Review Your Information
              </h2>
              <p className="text-neutral-600 mb-6">
                Double-check all information before registering on the blockchain.
              </p>
              {/* Review component will go here */}
              <div className="text-center py-12 text-neutral-500">
                [Review Component - Coming Soon]
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold font-display text-neutral-900 mb-2">
                Step 4: Register on Blockchain
              </h2>
              <p className="text-neutral-600 mb-6">
                Confirm the transaction to register your copyright on the Sepolia blockchain.
              </p>
              {/* Transaction component will go here */}
              <div className="text-center py-12 text-neutral-500">
                [Transaction Component - Coming Soon]
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-200">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={`
                px-6 py-3 rounded-lg font-semibold transition-all
                ${
                  currentStep === 1
                    ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                    : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                }
              `}
            >
              ← Previous
            </button>

            <div className="text-sm text-neutral-500">
              Step {currentStep} of {steps.length}
            </div>

            <button
              onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
              disabled={currentStep === steps.length}
              className={`
                px-6 py-3 rounded-lg font-semibold transition-all
                ${
                  currentStep === steps.length
                    ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                    : 'bg-primary-600 text-white hover:bg-primary-500 shadow-lg hover:shadow-xl'
                }
              `}
            >
              Next →
            </button>
          </div>
        </Card>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-600">
            Need help?{' '}
            <a href="/docs" className="text-primary-600 hover:text-primary-500 font-semibold">
              View registration guide
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
