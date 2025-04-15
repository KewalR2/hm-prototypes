'use client';

import ThemedLayout from '@/components/ThemedLayout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Prototype5Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemedLayout currentPage="prototype-5">
      <Header currentPage="prototype-5" />
      {children}
      <Footer />
    </ThemedLayout>
  );
}
