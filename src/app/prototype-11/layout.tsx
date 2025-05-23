'use client';

import ThemedLayout from '@/components/ThemedLayout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { QuoteProvider } from './components/QuoteContext';

export default function Prototype11Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemedLayout currentPage="prototype-11">
      <Header currentPage="prototype-11" />
      <QuoteProvider>
        {children}
      </QuoteProvider>
      <Footer />
    </ThemedLayout>
  );
}
