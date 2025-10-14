export {
  copyrightRegistryAddress,
  copyrightRegistryABI,
} from './copyrightRegistry';
export { karyaNFTAddress, karyaNFTABI } from './karyaNFT';
export { marketplaceAddress, marketplaceABI } from './marketplace';

// Network configuration
export const SEPOLIA_CHAIN_ID = 11155111;
export const SEPOLIA_RPC_URL = 'https://ethereum-sepolia-rpc.publicnode.com';

// Deployer address (platform fee recipient)
export const DEPLOYER_ADDRESS = '0xcAfeA0fd5937C3b9C5E16DDcE1Bb8791BfBAf8Bf';

// Contract addresses for easy access
export const contracts = {
  copyrightRegistry: '0xa2e84f3c2520b963E4EeCdB64d3B384f829ca93f',
  karyaNFT: '0xE7f3c9BdAFd36050BdFAD3195dD7d0f4f2b52Fa4',
  marketplace: '0xb2430198bF01a8ec5749424a4642F32eb4b8Ed10',
} as const;

// Etherscan links
export const getEtherscanLink = (address: string) =>
  `https://sepolia.etherscan.io/address/${address}`;
