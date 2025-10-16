'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Badge } from '../ui/glass/Badge';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';

export function TopBar() {
  return (
    <div className="sticky top-0 z-30 glass border-b border-glass-border">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Network Badge */}
        <Badge variant="info" className="hidden sm:inline-flex">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse mr-2" />
          Sepolia Testnet
        </Badge>

        {/* Right: Language Switcher + Wallet Connection */}
        <div className="ml-auto flex items-center gap-4">
          <LanguageSwitcher />
          <ConnectButton
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
            chainStatus="icon"
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
          />
        </div>
      </div>
    </div>
  );
}
