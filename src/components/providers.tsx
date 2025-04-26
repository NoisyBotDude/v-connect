'use client';

import { ReactNode } from 'react';
import { ToastProvider } from './providers/toast-provider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <ToastProvider />
      {children}
    </>
  );
} 