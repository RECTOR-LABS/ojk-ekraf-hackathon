'use client';

import { useRegistrationStore } from '@/lib/stores/registrationStore';
import { SuccessPage } from '@/components/features/registration/SuccessPage';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RegisterSuccessPage() {
  const router = useRouter();
  const { registrationId, transactionHash, fileHash } = useRegistrationStore();

  // Redirect if no registration data
  useEffect(() => {
    if (!registrationId || !transactionHash) {
      router.push('/register');
    }
  }, [registrationId, transactionHash, router]);

  if (!registrationId || !transactionHash) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <SuccessPage
        registrationId={registrationId}
        transactionHash={transactionHash}
        contentHash={fileHash}
        timestamp={new Date().toISOString()}
      />
    </div>
  );
}
