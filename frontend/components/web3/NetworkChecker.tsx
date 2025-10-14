'use client';

import { useEffect, useState } from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { sepolia } from 'wagmi/chains';

const SEPOLIA_CHAIN_ID = 11155111;

export function NetworkChecker() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Only show warning if user is connected and on wrong network
    if (isConnected && chainId && chainId !== SEPOLIA_CHAIN_ID) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }, [chainId, isConnected]);

  const handleSwitchNetwork = () => {
    try {
      switchChain({ chainId: sepolia.id });
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };

  if (!showWarning) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-warning-500 text-white px-4 py-3 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Warning Icon */}
          <svg
            className="w-6 h-6 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>

          {/* Message */}
          <div>
            <p className="font-semibold">Wrong Network Detected</p>
            <p className="text-sm">
              Please switch to Sepolia Testnet to use this application.
            </p>
          </div>
        </div>

        {/* Switch Network Button */}
        <button
          onClick={handleSwitchNetwork}
          className="px-4 py-2 bg-white text-warning-700 rounded-lg hover:bg-warning-50 transition-colors font-medium flex-shrink-0"
        >
          Switch to Sepolia
        </button>
      </div>
    </div>
  );
}
