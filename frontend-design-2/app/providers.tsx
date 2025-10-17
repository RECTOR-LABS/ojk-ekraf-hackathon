'use client';

import { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme, getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { LocaleProvider } from '@/lib/LocaleProvider';

const config = getDefaultConfig({
  appName: 'KaryaChain',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || '',
  chains: [sepolia],
  ssr: true,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // Don't retry failed RPC requests (reduces console noise)
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      refetchOnMount: false, // Don't refetch on component mount
      staleTime: 60000, // Consider data fresh for 1 minute (reduces RPC calls)
    },
  },
});

// Suppress non-critical RPC timeout errors in console (development only)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args) => {
    // Filter out RPC "Failed to fetch" errors (these are non-critical background calls)
    const errorString = args[0]?.toString() || '';
    if (errorString.includes('Failed to fetch') || errorString.includes('fetch failed')) {
      return; // Silently ignore
    }
    originalError.apply(console, args);
  };
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: '#8b5cf6',
              accentColorForeground: 'white',
              borderRadius: 'large',
              fontStack: 'system',
            })}
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </LocaleProvider>
  );
}
