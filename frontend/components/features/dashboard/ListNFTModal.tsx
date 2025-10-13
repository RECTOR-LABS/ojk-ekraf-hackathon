"use client";

import { useState } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { parseEther } from "viem";
import {
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ErrorDisplay, InlineError } from "@/components/ui/ErrorDisplay";
import { karyaNFTABI, karyaNFTAddress } from "@/lib/contracts/karyaNFT";
import { marketplaceABI, marketplaceAddress } from "@/lib/contracts/marketplace";
import { parseContractError, validatePrice, type UserFriendlyError } from "@/lib/utils/errors";

interface ListNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: any;
  onSuccess: () => void;
}

export default function ListNFTModal({
  isOpen,
  onClose,
  nft,
  onSuccess,
}: ListNFTModalProps) {
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState<string | null>(null);
  const [userFriendlyError, setUserFriendlyError] = useState<UserFriendlyError | null>(null);
  const [step, setStep] = useState<"input" | "approving" | "listing" | "success">(
    "input"
  );

  // Check if marketplace is already approved
  const { data: isApproved, refetch: refetchApproval } = useReadContract({
    address: karyaNFTAddress as `0x${string}`,
    abi: karyaNFTABI,
    functionName: "getApproved",
    args: nft ? [BigInt(nft.tokenId)] : undefined,
  });

  // Approve marketplace
  const {
    writeContract: approveMarketplace,
    data: approveHash,
    isPending: isApprovePending,
    error: approveError,
  } = useWriteContract();

  const { isLoading: isApproveConfirming, isSuccess: isApproveSuccess } =
    useWaitForTransactionReceipt({
      hash: approveHash,
    });

  // List NFT
  const {
    writeContract: listNFT,
    data: listHash,
    isPending: isListPending,
    error: listError,
  } = useWriteContract();

  const { isLoading: isListConfirming, isSuccess: isListSuccess } =
    useWaitForTransactionReceipt({
      hash: listHash,
    });

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = e.target.value;
    setPrice(newPrice);

    // Clear previous errors
    setPriceError(null);
    setUserFriendlyError(null);

    // Validate on change (only if not empty)
    if (newPrice) {
      const error = validatePrice(newPrice);
      setPriceError(error);
    }
  };

  const handleApprove = async () => {
    if (!nft) return;

    setStep("approving");
    setUserFriendlyError(null);

    try {
      approveMarketplace({
        address: karyaNFTAddress as `0x${string}`,
        abi: karyaNFTABI,
        functionName: "approve",
        args: [marketplaceAddress, BigInt(nft.tokenId)],
      });
    } catch (err) {
      console.error("Approve error:", err);
      setUserFriendlyError(parseContractError(err));
      setStep("input");
    }
  };

  const handleList = async () => {
    if (!price || !nft) return;

    // Validate price before listing
    const validationError = validatePrice(price);
    if (validationError) {
      setPriceError(validationError);
      return;
    }

    setStep("listing");
    setUserFriendlyError(null);

    try {
      const priceInWei = parseEther(price);
      listNFT({
        address: marketplaceAddress as `0x${string}`,
        abi: marketplaceABI,
        functionName: "listNFT",
        args: [karyaNFTAddress, BigInt(nft.tokenId), priceInWei],
      });
    } catch (err) {
      console.error("List error:", err);
      setUserFriendlyError(parseContractError(err));
      setStep("input");
    }
  };

  const handleSubmit = async () => {
    // Validate price first
    const validationError = validatePrice(price);
    if (validationError) {
      setPriceError(validationError);
      return;
    }

    // Check if already approved
    const needsApproval =
      isApproved?.toString().toLowerCase() !==
      marketplaceAddress.toLowerCase();

    if (needsApproval) {
      await handleApprove();
    } else {
      await handleList();
    }
  };

  // Watch for approval success, then proceed to listing
  if (isApproveSuccess && step === "approving") {
    refetchApproval();
    handleList();
  }

  // Watch for listing success
  if (isListSuccess && step === "listing") {
    setStep("success");
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 3000);
  }

  if (!isOpen) return null;

  const needsApproval =
    isApproved?.toString().toLowerCase() !== marketplaceAddress.toLowerCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={
            isApprovePending ||
            isApproveConfirming ||
            isListPending ||
            isListConfirming
          }
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBag className="w-6 h-6 text-primary-500" />
          <h2 className="text-2xl font-bold text-gray-900">List NFT for Sale</h2>
        </div>

        {/* NFT Preview */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            {nft.image ? (
              <img
                src={nft.image}
                alt={nft.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{nft.title}</h3>
              <p className="text-sm text-gray-600">Token #{nft.tokenId}</p>
              {nft.royaltyPercentage > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  {nft.royaltyPercentage}% creator royalty
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Step: Input Price */}
        {step === "input" && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Listing Price (ETH)
              </label>
              <input
                type="number"
                step="0.0001"
                min="0"
                value={price}
                onChange={handlePriceChange}
                placeholder="0.0"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                  priceError ? 'border-error-500' : 'border-gray-300'
                }`}
              />
              {priceError && <InlineError message={priceError} />}
              <p className="text-xs text-gray-500 mt-2">
                Platform fee: 2.5% • Creator royalty: {nft.royaltyPercentage}%
              </p>
            </div>

            {/* Approval Info */}
            {needsApproval && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> You'll need to approve the marketplace to
                  transfer your NFT first. This requires 2 transactions.
                </p>
              </div>
            )}

            {/* Error Messages */}
            {userFriendlyError && (
              <ErrorDisplay
                error={userFriendlyError}
                onRetry={() => setUserFriendlyError(null)}
                className="mb-4"
              />
            )}

            {/* Contract Errors (fallback) */}
            {!userFriendlyError && (approveError || listError) && (
              <ErrorDisplay
                error={parseContractError(approveError || listError)}
                onRetry={() => {
                  // Clear errors by resetting state
                  setStep("input");
                }}
                className="mb-4"
              />
            )}

            <Button
              onClick={handleSubmit}
              disabled={!price || parseFloat(price) <= 0 || !!priceError}
              className="w-full"
            >
              {needsApproval ? "Approve & List" : "List for Sale"}
            </Button>
          </>
        )}

        {/* Step: Approving */}
        {step === "approving" && (
          <div className="text-center py-8">
            <Loader2 className="w-16 h-16 text-primary-500 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isApprovePending
                ? "Confirm Approval in Wallet"
                : "Approving Marketplace..."}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {isApprovePending
                ? "Please confirm the transaction in your wallet"
                : "Waiting for approval confirmation (1/2)"}
            </p>
            {approveHash && (
              <a
                href={`https://sepolia.etherscan.io/tx/${approveHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
              >
                View on Etherscan
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        )}

        {/* Step: Listing */}
        {step === "listing" && (
          <div className="text-center py-8">
            <Loader2 className="w-16 h-16 text-primary-500 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isListPending
                ? "Confirm Listing in Wallet"
                : "Listing NFT for Sale..."}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {isListPending
                ? "Please confirm the transaction in your wallet"
                : "Waiting for listing confirmation (2/2)"}
            </p>
            {listHash && (
              <a
                href={`https://sepolia.etherscan.io/tx/${listHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
              >
                View on Etherscan
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        )}

        {/* Step: Success */}
        {step === "success" && (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              NFT Listed Successfully!
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Your NFT is now available on the marketplace at {price} ETH
            </p>
            {listHash && (
              <a
                href={`https://sepolia.etherscan.io/tx/${listHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
              >
                View on Etherscan
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
