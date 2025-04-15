'use client';

import ThemedLayout from '@/components/ThemedLayout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header currentPage="products" />
      <ThemedLayout currentPage="products">
        {children}
      </ThemedLayout>
      <Footer />
    </>
  );
}