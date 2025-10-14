/**
 * Error Handling Utilities
 * Provides user-friendly error messages and actionable guidance
 */

export interface UserFriendlyError {
  title: string;
  message: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
}

/**
 * Parse wallet/contract errors into user-friendly messages
 */
export function parseContractError(error: any): UserFriendlyError {
  const errorMessage = error?.message?.toLowerCase() || error?.toString()?.toLowerCase() || '';

  // User rejected transaction
  if (
    errorMessage.includes('user rejected') ||
    errorMessage.includes('user denied') ||
    errorMessage.includes('user cancelled')
  ) {
    return {
      title: 'Transaction Cancelled',
      message: 'You cancelled the transaction in your wallet. No changes were made.',
      action: {
        label: 'Try Again',
      },
    };
  }

  // Insufficient funds for gas
  if (
    errorMessage.includes('insufficient funds') ||
    errorMessage.includes('insufficient balance')
  ) {
    return {
      title: 'Insufficient ETH',
      message: 'You don\'t have enough ETH to pay for gas fees. Get test ETH from a Sepolia faucet.',
      action: {
        label: 'Get Test ETH',
        href: 'https://www.alchemy.com/faucets/ethereum-sepolia',
      },
    };
  }

  // Network/connection issues
  if (
    errorMessage.includes('network') ||
    errorMessage.includes('connection') ||
    errorMessage.includes('timeout')
  ) {
    return {
      title: 'Network Error',
      message: 'Unable to connect to the blockchain. Check your internet connection and try again.',
      action: {
        label: 'Retry',
      },
    };
  }

  // Wrong network
  if (
    errorMessage.includes('chain') ||
    errorMessage.includes('network')
  ) {
    return {
      title: 'Wrong Network',
      message: 'Please switch to Sepolia Testnet in your wallet and try again.',
      action: {
        label: 'Switch Network',
      },
    };
  }

  // Gas estimation failed
  if (errorMessage.includes('gas')) {
    return {
      title: 'Transaction Failed',
      message: 'Unable to estimate gas. The transaction might fail. Check your wallet balance and try again.',
      action: {
        label: 'Try Again',
      },
    };
  }

  // Contract-specific errors
  if (errorMessage.includes('already minted')) {
    return {
      title: 'Already Minted',
      message: 'This copyright has already been minted as an NFT. Each copyright can only be minted once.',
    };
  }

  if (errorMessage.includes('not owner')) {
    return {
      title: 'Permission Denied',
      message: 'You don\'t own this item and cannot perform this action.',
    };
  }

  if (errorMessage.includes('not approved')) {
    return {
      title: 'Approval Required',
      message: 'Please approve the marketplace contract to transfer your NFT first.',
      action: {
        label: 'Approve',
      },
    };
  }

  if (errorMessage.includes('insufficient allowance')) {
    return {
      title: 'Insufficient Allowance',
      message: 'The contract doesn\'t have permission to transfer this NFT. Please approve it first.',
      action: {
        label: 'Approve',
      },
    };
  }

  // Marketplace-specific errors
  if (errorMessage.includes('not listed')) {
    return {
      title: 'Not Listed',
      message: 'This NFT is not currently listed for sale on the marketplace.',
    };
  }

  if (errorMessage.includes('already listed')) {
    return {
      title: 'Already Listed',
      message: 'This NFT is already listed for sale. Cancel the current listing first.',
    };
  }

  if (errorMessage.includes('invalid price')) {
    return {
      title: 'Invalid Price',
      message: 'The price must be greater than 0 ETH. Please enter a valid price.',
    };
  }

  // Generic fallback
  return {
    title: 'Transaction Failed',
    message: 'An unexpected error occurred. Please try again or contact support if the issue persists.',
    action: {
      label: 'Try Again',
    },
  };
}

/**
 * Validate form inputs and return user-friendly error messages
 */
export function validatePrice(price: string): string | null {
  if (!price || price.trim() === '') {
    return 'Please enter a price';
  }

  const numPrice = parseFloat(price);

  if (isNaN(numPrice)) {
    return 'Please enter a valid number';
  }

  if (numPrice <= 0) {
    return 'Price must be greater than 0 ETH';
  }

  if (numPrice > 1000000) {
    return 'Price is too high. Please enter a reasonable amount.';
  }

  // Check for too many decimal places (more than 18)
  const decimals = price.split('.')[1];
  if (decimals && decimals.length > 18) {
    return 'Too many decimal places. Maximum 18 decimals.';
  }

  return null;
}

/**
 * Format transaction hash for display
 */
export function formatTxHash(hash: string, length: number = 10): string {
  if (!hash || hash.length < length * 2) return hash;
  return `${hash.slice(0, length)}...${hash.slice(-length)}`;
}

/**
 * Check if user is on correct network
 */
export function isCorrectNetwork(chainId: number | undefined): boolean {
  return chainId === 11155111; // Sepolia
}

/**
 * Get network name from chain ID
 */
export function getNetworkName(chainId: number | undefined): string {
  switch (chainId) {
    case 1:
      return 'Ethereum Mainnet';
    case 11155111:
      return 'Sepolia Testnet';
    case 5:
      return 'Goerli Testnet';
    default:
      return 'Unknown Network';
  }
}
