import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AssetType = 'VISUAL_ART' | 'MUSIC' | 'LITERATURE' | 'VIDEO' | 'OTHER';

export interface RegistrationMetadata {
  title: string;
  description: string;
  assetType: AssetType;
  tags: string[];
}

export interface RegistrationState {
  // File data
  file: File | null;
  fileHash: string;
  filePreviewUrl: string;

  // Metadata
  metadata: RegistrationMetadata | null;

  // IPFS
  ipfsCID: string;
  ipfsMetadataCID: string;

  // Registration
  registrationId: string;
  transactionHash: string;

  // UI State
  currentStep: number; // 0-3 (4 steps total)

  // Actions
  setFile: (file: File | null, hash: string, previewUrl: string) => void;
  setMetadata: (metadata: RegistrationMetadata) => void;
  setIpfsCID: (cid: string, metadataCID: string) => void;
  setRegistrationId: (id: string, txHash: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
}

const initialState = {
  file: null,
  fileHash: '',
  filePreviewUrl: '',
  metadata: null,
  ipfsCID: '',
  ipfsMetadataCID: '',
  registrationId: '',
  transactionHash: '',
  currentStep: 0,
};

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set) => ({
      ...initialState,

      setFile: (file, hash, previewUrl) =>
        set({
          file,
          fileHash: hash,
          filePreviewUrl: previewUrl,
        }),

      setMetadata: (metadata) => set({ metadata }),

      setIpfsCID: (cid, metadataCID) =>
        set({
          ipfsCID: cid,
          ipfsMetadataCID: metadataCID,
        }),

      setRegistrationId: (id, txHash) =>
        set({
          registrationId: id,
          transactionHash: txHash,
        }),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 3),
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 0),
        })),

      goToStep: (step) =>
        set({
          currentStep: Math.max(0, Math.min(step, 3)),
        }),

      reset: () => set(initialState),
    }),
    {
      name: 'karyachain-registration',
      // Don't persist File object (can't be serialized)
      partialize: (state) => ({
        ...state,
        file: null,
      }),
    }
  )
);
