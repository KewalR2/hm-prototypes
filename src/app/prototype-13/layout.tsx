'use client';

import ThemedLayout from '@/components/ThemedLayout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { QuoteStoreProvider } from './components/QuoteContext';

export default function Prototype13Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemedLayout currentPage="prototype-13">
      <Header currentPage="prototype-13" />
      <QuoteStoreProvider>
        {children}
      </QuoteStoreProvider>
      <Footer />
    </ThemedLayout>
  );
}
