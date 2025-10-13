'use client';

import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Button, Spinner } from '@/components/ui';
import { karyaNFTAddress, karyaNFTABI } from '@/lib/contracts';

// Asset type labels
const assetTypeLabels = ['Digital Art', 'Music', 'Photography', 'Writing', 'Design'];

// Copyright data type
interface Copyright {
  id: bigint;
  creator: string;
  contentHash: string;
  ipfsCID: string;
  title: string;
  description: string;
  assetType: number;
  tags: string[];
  timestamp: bigint;
  exists: boolean;
}

interface MintNFTModalProps {
  copyright: Copyright;
  onClose: () => void;
  onSuccess: (txHash: string, tokenId: bigint) => void;
}

export function MintNFTModal({ copyright, onClose, onSuccess }: MintNFTModalProps) {
  const [royaltyPercentage, setRoyaltyPercentage] = useState(10); // Default 10%
  const [txStatus, setTxStatus] = useState<'idle' | 'signing' | 'pending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  // Handle transaction confirmation
  useEffect(() => {
    if (isConfirmed && receipt) {
      setTxStatus('success');

      // Extract token ID from event logs
      const log = receipt.logs.find(
        (log) => log.address.toLowerCase() === karyaNFTAddress.toLowerCase()
      );

      if (log && log.topics.length > 3) {
        // The tokenId is in topics[3] for Transfer event
        const tokenId = BigInt(log.topics[3]);
        onSuccess(txHash!, tokenId);
      } else {
        onSuccess(txHash!, BigInt(0)); // Fallback
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

  const handleMint = () => {
    setTxStatus('signing');
    setErrorMessage(null);

    try {
      // Convert royalty percentage to basis points (1% = 100 basis points)
      const royaltyBasisPoints = royaltyPercentage * 100;

      // Call the mint function on KaryaNFT contract
      writeContract({
        address: karyaNFTAddress,
        abi: karyaNFTABI,
        functionName: 'mint',
        args: [
          copyright.id, // registrationId
          BigInt(royaltyBasisPoints) // royaltyPercentage in basis points
        ]
      });
    } catch (error: any) {
      setTxStatus('error');
      setErrorMessage(error?.message || 'Failed to initiate minting transaction');
    }
  };

  const handleRoyaltyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 5 && value <= 20) {
      setRoyaltyPercentage(value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-neutral-900">Mint NFT</h2>
          <button
            onClick={onClose}
            disabled={txStatus === 'signing' || txStatus === 'pending'}
            className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Idle State - Configuration */}
          {txStatus === 'idle' && (
            <div className="space-y-6">
              {/* Copyright Details */}
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-4">Copyright Details</h3>
                <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-neutral-700">Registration ID</p>
                    <p className="text-sm text-neutral-900">#{copyright.id.toString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-700">Title</p>
                    <p className="text-base font-semibold text-neutral-900">{copyright.title}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-700">Description</p>
                    <p className="text-sm text-neutral-600">{copyright.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs font-semibold text-neutral-700">Asset Type</p>
                      <p className="text-sm text-neutral-900">{assetTypeLabels[copyright.assetType]}</p>
                    </div>
                    {copyright.tags.length > 0 && (
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-neutral-700 mb-1">Tags</p>
                        <div className="flex flex-wrap gap-1">
                          {copyright.tags.slice(0, 4).map((tag, index) => (
                            <span key={index} className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Royalty Configuration */}
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Royalty Configuration</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Set the royalty percentage you'll earn from future sales (5-20%)
                </p>
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-neutral-700">Royalty Percentage</span>
                    <span className="text-3xl font-bold text-primary-600">{royaltyPercentage}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="1"
                    value={royaltyPercentage}
                    onChange={handleRoyaltyChange}
                    className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex items-center justify-between mt-2 text-xs text-neutral-600">
                    <span>5% (Min)</span>
                    <span>20% (Max)</span>
                  </div>
                </div>
              </div>

              {/* What You'll Earn Info */}
              <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-success-900 mb-2">💰 Your Earnings</h4>
                <ul className="space-y-1 text-sm text-success-700">
                  <li>• If sold for 1 ETH, you earn {(royaltyPercentage / 100).toFixed(2)} ETH royalty</li>
                  <li>• If sold for 10 ETH, you earn {(royaltyPercentage / 10).toFixed(1)} ETH royalty</li>
                  <li>• Royalties apply to <strong>every future sale</strong>, forever!</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
                <Button onClick={onClose} variant="secondary">
                  Cancel
                </Button>
                <Button onClick={handleMint} variant="primary" size="large">
                  Mint NFT with {royaltyPercentage}% Royalty
                </Button>
              </div>
            </div>
          )}

          {/* Signing State */}
          {txStatus === 'signing' && (
            <div className="text-center py-12">
              <Spinner size="large" className="mx-auto mb-6" />
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Waiting for Wallet Confirmation</h3>
              <p className="text-neutral-600">
                Please check your wallet and confirm the transaction to mint your NFT.
              </p>
            </div>
          )}

          {/* Pending State */}
          {txStatus === 'pending' && (
            <div className="text-center py-12">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <Spinner size="large" className="absolute inset-0" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Minting Your NFT...</h3>
              <p className="text-neutral-600 mb-4">
                Your NFT is being minted on the blockchain. This may take up to 30 seconds.
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
              <h3 className="text-xl font-bold text-error-900 mb-2">Minting Failed</h3>
              <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                {errorMessage || 'An error occurred while minting your NFT. Please try again.'}
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button onClick={onClose} variant="secondary">
                  Close
                </Button>
                <Button onClick={() => setTxStatus('idle')} variant="primary">
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom slider styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
        }
      `}</style>
    </div>
  );
}
