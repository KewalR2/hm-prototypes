'use client';

import ThemedLayout from '@/components/ThemedLayout';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemedLayout currentPage="products">
      {children}
    </ThemedLayout>
  );
}