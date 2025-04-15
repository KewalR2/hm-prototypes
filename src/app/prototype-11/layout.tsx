'use client';

import { QuoteProvider } from './components/QuoteContext';

export default function Prototype11Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QuoteProvider>
      {children}
    </QuoteProvider>
  );
}