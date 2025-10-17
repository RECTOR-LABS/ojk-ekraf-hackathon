'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { decodeEventLog } from 'viem';
import { GlassButton } from '@/components/ui/glass/GlassButton';
import { GlassCard } from '@/components/ui/glass/GlassCard';
import { useRegistrationStore } from '@/lib/stores/registrationStore';
import { uploadFileToIPFS, uploadJSONToIPFS } from '@/lib/utils/ipfs';
import { CopyrightRegistryAddress, CopyrightRegistryABI } from '@/lib/contracts';
import { Zap, Loader2, CheckCircle2, AlertCircle, Upload, FileCheck, Link as LinkIcon } from 'lucide-react';
import type { AssetType } from '@/lib/stores/registrationStore';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';
type TransactionStatus = 'idle' | 'preparing' | 'signing' | 'pending' | 'success' | 'error';

const assetTypeToNumber: Record<AssetType, number> = {
  VISUAL_ART: 0,
  MUSIC: 1,
  LITERATURE: 2,
  VIDEO: 3,
  OTHER: 4,
};

export function TransactionStep() {
  const router = useRouter();
  const { address } = useAccount();
  const { file, fileHash, metadata, setIpfsCID, setRegistrationId, prevStep } =
    useRegistrationStore();

  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [uploadError, setUploadError] = useState<string>('');
  const [fileCID, setFileCID] = useState<string>('');
  const [metadataCID, setMetadataCID] = useState<string>('');

  const { writeContract, data: txHash, isPending: isWritePending, error: writeError } = useWriteContract();
  const {
    data: receipt,
    isLoading: isTxPending,
    isSuccess: isTxSuccess,
    error: txError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Determine transaction status
  const getTxStatus = (): TransactionStatus => {
    if (writeError || txError) return 'error';
    if (isTxSuccess) return 'success';
    if (isTxPending) return 'pending';
    if (isWritePending) return 'signing';
    if (uploadStatus === 'success' && fileCID && metadataCID) return 'preparing';
    return 'idle';
  };

  const txStatus = getTxStatus();

  // Extract registration ID from transaction receipt
  useEffect(() => {
    if (isTxSuccess && txHash && receipt) {
      try {
        // Find the CopyrightRegistered event in the logs
        const registeredEvent = receipt.logs.find((log) => {
          try {
            const decoded = decodeEventLog({
              abi: CopyrightRegistryABI,
              data: log.data,
              topics: log.topics,
            });
            return decoded.eventName === 'CopyrightRegistered';
          } catch {
            return false;
          }
        });

        if (registeredEvent) {
          const decoded = decodeEventLog({
            abi: CopyrightRegistryABI,
            data: registeredEvent.data,
            topics: registeredEvent.topics,
          });

          // Extract registration ID from event (first indexed parameter)
          const registrationId = String(decoded.args.id);
          setRegistrationId(registrationId, txHash);
        }
      } catch (error) {
        console.error('Error extracting registration ID:', error);
        // Fallback: use timestamp if event decoding fails
        setRegistrationId(Date.now().toString(), txHash);
      }

      // Redirect to success page after short delay
      setTimeout(() => {
        router.push('/register/success');
      }, 2000);
    }
  }, [isTxSuccess, txHash, receipt, setRegistrationId, router]);

  // Handle IPFS upload
  const handleIPFSUpload = async () => {
    if (!file || !metadata) {
      setUploadError('Missing file or metadata');
      return;
    }

    setUploadStatus('uploading');
    setUploadError('');

    try {
      // Upload file to IPFS
      const fileResult = await uploadFileToIPFS(file);
      setFileCID(fileResult.cid);

      // Upload metadata to IPFS
      const metadataObject = {
        name: metadata.title,
        description: metadata.description,
        image: `ipfs://${fileResult.cid}`,
        attributes: [
          {
            trait_type: 'Asset Type',
            value: metadata.assetType,
          },
          {
            trait_type: 'Content Hash',
            value: fileHash,
          },
          ...metadata.tags.map((tag) => ({
            trait_type: 'Tag',
            value: tag,
          })),
        ],
      };

      const metadataResult = await uploadJSONToIPFS(metadataObject);
      setMetadataCID(metadataResult.cid);

      // Store in Zustand
      setIpfsCID(fileResult.cid, metadataResult.cid);

      setUploadStatus('success');
    } catch (error) {
      console.error('IPFS upload error:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to upload to IPFS');
      setUploadStatus('error');
    }
  };

  // Handle blockchain registration
  const handleRegister = async () => {
    if (!address || !metadata || !fileCID || !metadataCID) return;

    try {
      // Convert hex string to bytes32
      const contentHashBytes = `0x${fileHash}` as `0x${string}`;

      writeContract({
        address: CopyrightRegistryAddress,
        abi: CopyrightRegistryABI,
        functionName: 'registerCopyright',
        args: [
          contentHashBytes,
          fileCID,
          metadata.title,
          metadata.description,
          assetTypeToNumber[metadata.assetType],
          metadata.tags,
        ],
      });
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  // Auto-start IPFS upload when component mounts
  useEffect(() => {
    if (uploadStatus === 'idle' && file && metadata) {
      handleIPFSUpload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Register on Blockchain</h2>
        <p className="text-foreground/70">
          Submit your copyright registration to the Ethereum blockchain.
        </p>
      </div>

      {/* Transaction Details */}
      <GlassCard>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold mb-1">Transaction Details</h3>
            <div className="space-y-2 text-sm text-foreground/70">
              <div className="flex justify-between">
                <span>Gas Fee (estimated):</span>
                <span className="font-semibold text-foreground">~0.002 ETH</span>
              </div>
              <div className="flex justify-between">
                <span>Network:</span>
                <span className="font-semibold text-foreground">Sepolia Testnet</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* IPFS Upload Status */}
      <GlassCard>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {uploadStatus === 'uploading' && (
              <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
            )}
            {uploadStatus === 'success' && <CheckCircle2 className="w-5 h-5 text-green-400" />}
            {uploadStatus === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
            <div>
              <h3 className="font-bold">IPFS Upload</h3>
              <p className="text-sm text-foreground/70">
                {uploadStatus === 'idle' && 'Preparing to upload...'}
                {uploadStatus === 'uploading' && 'Uploading to IPFS...'}
                {uploadStatus === 'success' && 'Upload complete!'}
                {uploadStatus === 'error' && 'Upload failed'}
              </p>
            </div>
          </div>

          {uploadStatus === 'success' && (
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-green-400" />
                <span className="text-foreground/70">File CID:</span>
                <code className="text-xs text-purple-400 bg-black/20 px-2 py-1 rounded">{fileCID}</code>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-green-400" />
                <span className="text-foreground/70">Metadata CID:</span>
                <code className="text-xs text-purple-400 bg-black/20 px-2 py-1 rounded">
                  {metadataCID}
                </code>
              </div>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="bg-red-500/10 p-3 rounded-lg">
              <div className="max-h-32 overflow-y-auto">
                <p className="text-sm text-red-400 break-words whitespace-pre-wrap">{uploadError}</p>
              </div>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Blockchain Transaction Status */}
      {uploadStatus === 'success' && (
        <GlassCard>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {txStatus === 'preparing' && <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />}
              {txStatus === 'signing' && <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />}
              {txStatus === 'pending' && <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />}
              {txStatus === 'success' && <CheckCircle2 className="w-5 h-5 text-green-400" />}
              {txStatus === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
              <div>
                <h3 className="font-bold">Blockchain Registration</h3>
                <p className="text-sm text-foreground/70">
                  {txStatus === 'idle' && 'Ready to register'}
                  {txStatus === 'preparing' && 'Preparing transaction...'}
                  {txStatus === 'signing' && 'Waiting for wallet confirmation...'}
                  {txStatus === 'pending' && 'Transaction pending...'}
                  {txStatus === 'success' && 'Registration successful!'}
                  {txStatus === 'error' && 'Transaction failed'}
                </p>
              </div>
            </div>

            {txHash && (
              <div className="flex items-center gap-2 text-sm">
                <LinkIcon className="w-4 h-4 text-purple-400" />
                <a
                  href={`https://sepolia.etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  View on Etherscan
                </a>
              </div>
            )}

            {(writeError || txError) && (
              <div className="bg-red-500/10 p-3 rounded-lg">
                <div className="max-h-32 overflow-y-auto">
                  <p className="text-sm text-red-400 break-words whitespace-pre-wrap">
                    {writeError?.message || txError?.message || 'Transaction failed'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4 pt-4">
        <GlassButton variant="ghost" size="lg" onClick={prevStep} disabled={uploadStatus === 'uploading' || txStatus !== 'idle'}>
          Back
        </GlassButton>
        <GlassButton
          variant="primary"
          size="lg"
          onClick={handleRegister}
          disabled={
            uploadStatus !== 'success' ||
            txStatus === 'signing' ||
            txStatus === 'pending' ||
            txStatus === 'success'
          }
        >
          {txStatus === 'idle' && 'Register Copyright'}
          {txStatus === 'preparing' && 'Register Copyright'}
          {txStatus === 'signing' && 'Awaiting Wallet Approval...'}
          {txStatus === 'pending' && 'Confirming on Blockchain...'}
          {txStatus === 'success' && 'Success! Redirecting...'}
          {txStatus === 'error' && 'Retry Registration'}
        </GlassButton>
      </div>
    </div>
  );
}
