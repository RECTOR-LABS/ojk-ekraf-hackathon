'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Card, Button, Spinner } from '@/components/ui';
import { FileUpload } from '@/components/features/FileUpload';
import { MetadataForm, CopyrightMetadata } from '@/components/features/MetadataForm';
import { useRegistrationStore } from '@/lib/stores/registrationStore';
import { uploadFileToIPFS } from '@/lib/utils/ipfs';
import { copyrightRegistryAddress, copyrightRegistryABI } from '@/lib/contracts';

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

// Step 3: Review & Confirmation Component
function Step3Review({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { file, contentHash, ipfsHash, gatewayUrl, metadata } = useRegistrationStore();
  const { address } = useAccount();

  if (!file || !contentHash || !ipfsHash || !metadata) {
    return (
      <div className="text-center py-12">
        <p className="text-error-600 font-semibold mb-4">Missing information!</p>
        <Button onClick={onBack} variant="secondary">Go Back</Button>
      </div>
    );
  }

  // Asset type labels
  const assetTypeLabels = ['Digital Art', 'Music', 'Photography', 'Writing', 'Design'];

  // Check if file is an image
  const isImage = file.type.startsWith('image/');

  return (
    <div>
      <h2 className="text-2xl font-bold font-display text-neutral-900 mb-2">
        Step 3: Review Your Information
      </h2>
      <p className="text-neutral-600 mb-6">
        Double-check all information before registering on the blockchain. This data will be permanently stored.
      </p>

      <div className="space-y-6">
        {/* File Preview Section */}
        <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">📁 Uploaded File</h3>
          <div className="flex items-start gap-4">
            {/* Image Preview or File Icon */}
            {isImage ? (
              <div className="w-32 h-32 rounded-lg overflow-hidden border border-neutral-300 flex-shrink-0">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-lg bg-neutral-200 border border-neutral-300 flex items-center justify-center flex-shrink-0">
                <svg className="w-16 h-16 text-neutral-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
              </div>
            )}

            {/* File Details */}
            <div className="flex-1">
              <p className="text-sm font-semibold text-neutral-900 mb-1">{file.name}</p>
              <p className="text-sm text-neutral-600 mb-2">
                Type: {file.type || 'Unknown'} • Size: {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <div className="mt-3">
                <p className="text-xs font-semibold text-neutral-700 mb-1">Content Hash (SHA-256)</p>
                <code className="text-xs bg-white px-2 py-1 rounded border border-neutral-200 block break-all">
                  {contentHash}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Metadata Section */}
        <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">📝 Work Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-neutral-700">Title</p>
              <p className="text-base text-neutral-900">{metadata.title}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-700">Description</p>
              <p className="text-base text-neutral-900">{metadata.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-neutral-700">Asset Type</p>
                <p className="text-base text-neutral-900">{assetTypeLabels[metadata.assetType]}</p>
              </div>
              {metadata.creatorName && (
                <div>
                  <p className="text-sm font-semibold text-neutral-700">Creator Name</p>
                  <p className="text-base text-neutral-900">{metadata.creatorName}</p>
                </div>
              )}
            </div>
            {metadata.tags && metadata.tags.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-neutral-700 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {metadata.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* IPFS Storage Section */}
        <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">🌐 Decentralized Storage</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-neutral-700">IPFS Hash (CID)</p>
              <code className="text-xs bg-white px-2 py-1 rounded border border-neutral-200 block break-all mt-1">
                {ipfsHash}
              </code>
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-700">Gateway URL</p>
              <a
                href={gatewayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-600 hover:text-primary-500 underline break-all block mt-1"
              >
                {gatewayUrl}
              </a>
            </div>
          </div>
        </div>

        {/* Wallet Information */}
        <div className="border border-neutral-200 rounded-lg p-6 bg-neutral-50">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">👤 Copyright Owner</h3>
          <div>
            <p className="text-sm font-semibold text-neutral-700">Wallet Address</p>
            <code className="text-xs bg-white px-2 py-1 rounded border border-neutral-200 block break-all mt-1">
              {address}
            </code>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-warning-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-warning-900">Important - Please Review Carefully</p>
              <p className="text-sm text-warning-700 mt-1">
                Once registered on the blockchain, this information cannot be changed or deleted.
                Make sure all details are correct before proceeding.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-200">
        <Button onClick={onBack} variant="secondary" size="large">
          ← Back to Edit
        </Button>
        <Button onClick={onNext} variant="primary" size="large">
          Confirm & Register on Blockchain →
        </Button>
      </div>
    </div>
  );
}

// Step 4: Blockchain Transaction Component
function Step4Register({ onBack, onSuccess }: { onBack: () => void; onSuccess: (txHash: string, registrationId: bigint) => void }) {
  const { contentHash, ipfsHash, metadata } = useRegistrationStore();
  const { address } = useAccount();

  // wagmi hooks for contract interaction
  const {
    data: txHash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
    isError: isWriteError
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
    data: receipt
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Transaction state
  const [txStatus, setTxStatus] = useState<'idle' | 'signing' | 'pending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle transaction confirmation
  useEffect(() => {
    if (isConfirmed && receipt) {
      setTxStatus('success');

      // Extract registration ID from event logs
      const log = receipt.logs.find(
        (log) => log.address.toLowerCase() === copyrightRegistryAddress.toLowerCase()
      );

      if (log && log.topics.length > 1) {
        // The first indexed parameter (id) is in topics[1]
        const registrationId = BigInt(log.topics[1]);
        onSuccess(txHash!, registrationId);
      } else {
        onSuccess(txHash!, BigInt(0)); // Fallback if we can't parse the ID
      }
    }
  }, [isConfirmed, receipt, txHash, onSuccess]);

  // Handle errors
  useEffect(() => {
    if (isWriteError && writeError) {
      setTxStatus('error');
      setErrorMessage(writeError.message || 'Transaction failed. Please try again.');
    } else if (receiptError) {
      setTxStatus('error');
      setErrorMessage('Transaction failed during confirmation. Please try again.');
    }
  }, [isWriteError, writeError, receiptError]);

  // Handle transaction state changes
  useEffect(() => {
    if (isWritePending) {
      setTxStatus('signing');
    } else if (isConfirming) {
      setTxStatus('pending');
    }
  }, [isWritePending, isConfirming]);

  const handleRegister = async () => {
    if (!contentHash || !ipfsHash || !metadata || !address) {
      setErrorMessage('Missing required information. Please go back and complete all steps.');
      setTxStatus('error');
      return;
    }

    setTxStatus('signing');
    setErrorMessage(null);

    try {
      // Call the smart contract
      writeContract({
        address: copyrightRegistryAddress,
        abi: copyrightRegistryABI,
        functionName: 'registerCopyright',
        args: [
          contentHash as `0x${string}`, // bytes32
          ipfsHash, // string
          metadata.title, // string
          metadata.description, // string
          metadata.assetType, // uint8 (enum)
          metadata.tags || [] // string[]
        ]
      });
    } catch (error: any) {
      setTxStatus('error');
      setErrorMessage(error?.message || 'Failed to initiate transaction');
    }
  };

  const handleRetry = () => {
    setTxStatus('idle');
    setErrorMessage(null);
  };

  // Validation check
  if (!contentHash || !ipfsHash || !metadata) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-error-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-error-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-error-600 font-semibold mb-4">Missing Information</p>
        <p className="text-neutral-600 mb-6">Please complete all previous steps before registering.</p>
        <Button onClick={onBack} variant="secondary">Go Back</Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold font-display text-neutral-900 mb-2">
        Step 4: Register on Blockchain
      </h2>
      <p className="text-neutral-600 mb-8">
        Confirm the transaction in your wallet to permanently register your copyright on the Sepolia testnet.
      </p>

      {/* Idle State - Ready to Register */}
      {txStatus === 'idle' && (
        <div className="space-y-6">
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Ready to Register</h3>
                <p className="text-neutral-700 mb-4">
                  Click the button below to register your copyright on the blockchain. You'll need to:
                </p>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600"></span>
                    Confirm the transaction in your wallet
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600"></span>
                    Pay a small gas fee (Sepolia testnet ETH)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600"></span>
                    Wait for transaction confirmation (~15 seconds)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
            <Button onClick={onBack} variant="secondary" size="large">
              ← Back to Review
            </Button>
            <Button onClick={handleRegister} variant="primary" size="large">
              Register Copyright on Blockchain
            </Button>
          </div>
        </div>
      )}

      {/* Signing State - Waiting for wallet confirmation */}
      {txStatus === 'signing' && (
        <div className="text-center py-12">
          <Spinner size="large" className="mx-auto mb-6" />
          <h3 className="text-xl font-bold text-neutral-900 mb-2">Waiting for Wallet Confirmation</h3>
          <p className="text-neutral-600 mb-6">
            Please check your wallet and confirm the transaction to continue.
          </p>
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-neutral-700">
              <strong>Tip:</strong> Make sure you have enough Sepolia ETH for gas fees.
            </p>
          </div>
        </div>
      )}

      {/* Pending State - Transaction submitted, waiting for confirmation */}
      {txStatus === 'pending' && (
        <div className="text-center py-12">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <Spinner size="large" className="absolute inset-0" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-12 h-12 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">Transaction Pending</h3>
          <p className="text-neutral-600 mb-4">
            Your copyright is being registered on the blockchain...
          </p>
          {txHash && (
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-xs font-semibold text-neutral-700 mb-1">Transaction Hash</p>
              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-600 hover:text-primary-500 underline break-all"
              >
                {txHash}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Error State */}
      {txStatus === 'error' && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-error-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-error-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-error-900 mb-2">Transaction Failed</h3>
          <p className="text-neutral-600 mb-6 max-w-md mx-auto">
            {errorMessage || 'An error occurred while registering your copyright. Please try again.'}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button onClick={onBack} variant="secondary">
              ← Back to Review
            </Button>
            <Button onClick={handleRetry} variant="primary">
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationSuccess, setRegistrationSuccess] = useState<{
    txHash: string;
    registrationId: bigint;
  } | null>(null);

  const handleRegistrationSuccess = (txHash: string, registrationId: bigint) => {
    setRegistrationSuccess({ txHash, registrationId });
  };

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
            <Step3Review
              onNext={() => setCurrentStep(4)}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && !registrationSuccess && (
            <Step4Register
              onBack={() => setCurrentStep(3)}
              onSuccess={handleRegistrationSuccess}
            />
          )}

          {/* Success Page */}
          {registrationSuccess && (
            <div>
              <div className="text-center py-8">
                {/* Success Icon */}
                <div className="w-20 h-20 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-success-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>

                <h2 className="text-3xl font-bold font-display text-neutral-900 mb-2">
                  Copyright Registered Successfully! 🎉
                </h2>
                <p className="text-lg text-neutral-600 mb-8">
                  Your creative work is now protected on the blockchain
                </p>

                {/* Registration Details */}
                <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-6 text-left max-w-2xl mx-auto">
                  <h3 className="text-lg font-bold text-neutral-900 mb-4">Registration Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-neutral-700">Registration ID</p>
                      <code className="text-lg font-mono text-primary-600">
                        #{registrationSuccess.registrationId.toString()}
                      </code>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-700">Transaction Hash</p>
                      <a
                        href={`https://sepolia.etherscan.io/tx/${registrationSuccess.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary-600 hover:text-primary-500 underline break-all block"
                      >
                        {registrationSuccess.txHash}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-700">Network</p>
                      <p className="text-sm text-neutral-900">Sepolia Testnet</p>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 text-left max-w-2xl mx-auto mb-8">
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">What's Next?</h3>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 font-bold">1.</span>
                      <span>
                        <strong>Mint an NFT:</strong> Convert your registered copyright into a tradeable NFT with royalties
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 font-bold">2.</span>
                      <span>
                        <strong>List on Marketplace:</strong> Sell your NFT and earn from your creative work
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 font-bold">3.</span>
                      <span>
                        <strong>Verify Anytime:</strong> Your registration is permanently stored on the blockchain
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={() => window.open(`https://sepolia.etherscan.io/tx/${registrationSuccess.txHash}`, '_blank')}
                    variant="secondary"
                    size="large"
                  >
                    View on Etherscan
                  </Button>
                  <Button
                    onClick={() => window.location.href = '/dashboard'}
                    variant="primary"
                    size="large"
                  >
                    Go to Dashboard
                  </Button>
                </div>

                <div className="mt-8">
                  <a href="/register" className="text-sm text-neutral-600 hover:text-neutral-900">
                    Register Another Work →
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons - Hidden on success */}
          {!registrationSuccess && currentStep <= 2 && (
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
          )}
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
