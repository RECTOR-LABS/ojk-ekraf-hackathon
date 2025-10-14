import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CopyrightMetadata, AssetType } from '@/components/features/MetadataForm';

export interface RegistrationState {
  // Step 1: File Upload
  file: File | null;
  contentHash: string | null;
  ipfsHash: string | null;
  gatewayUrl: string | null;

  // Step 2: Metadata
  metadata: CopyrightMetadata | null;

  // Step 3: Review (derived from above)
  // Step 4: Transaction
  transactionHash: string | null;
  tokenId: string | null;
  isRegistering: boolean;
  registrationError: string | null;

  // Actions
  setFile: (file: File | null, contentHash: string | null) => void;
  setIPFSData: (ipfsHash: string, gatewayUrl: string) => void;
  setMetadata: (metadata: CopyrightMetadata) => void;
  setTransactionHash: (hash: string) => void;
  setTokenId: (tokenId: string) => void;
  setIsRegistering: (isRegistering: boolean) => void;
  setRegistrationError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  file: null,
  contentHash: null,
  ipfsHash: null,
  gatewayUrl: null,
  metadata: null,
  transactionHash: null,
  tokenId: null,
  isRegistering: false,
  registrationError: null,
};

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set) => ({
      ...initialState,

      setFile: (file, contentHash) =>
        set({
          file,
          contentHash,
          // Clear IPFS data when new file is selected
          ipfsHash: null,
          gatewayUrl: null,
        }),

      setIPFSData: (ipfsHash, gatewayUrl) =>
        set({
          ipfsHash,
          gatewayUrl,
        }),

      setMetadata: (metadata) =>
        set({
          metadata,
        }),

      setTransactionHash: (transactionHash) =>
        set({
          transactionHash,
        }),

      setTokenId: (tokenId) =>
        set({
          tokenId,
        }),

      setIsRegistering: (isRegistering) =>
        set({
          isRegistering,
        }),

      setRegistrationError: (registrationError) =>
        set({
          registrationError,
        }),

      reset: () => set(initialState),
    }),
    {
      name: 'karya-registration-storage',
      // Don't persist file object (can't be serialized)
      partialize: (state) => ({
        contentHash: state.contentHash,
        ipfsHash: state.ipfsHash,
        gatewayUrl: state.gatewayUrl,
        metadata: state.metadata,
        transactionHash: state.transactionHash,
        tokenId: state.tokenId,
      }),
    }
  )
);
