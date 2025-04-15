'use client';

import ThemedLayout from '@/components/ThemedLayout';

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemedLayout currentPage="home">
      {children}
    </ThemedLayout>
  );
}