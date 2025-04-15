import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function Prototype4Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Visual Project Builder</h1>
          <p className="text-lg mb-10 text-center text-gray-600 dark:text-gray-300">
            Prototype 4: Interactive Drag-and-Drop Material Selection
          </p>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-center">Build Your Project Visually</h2>
            <p className="text-center mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              This prototype introduces a visual, drag-and-drop interface to build your project and select materials. 
              Simply add project zones, drag materials onto them, adjust quantities, and get immediate pricing feedback.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Define Project Zones</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Create different zones for your project like driveways, foundations, backfill areas, and more
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Drag & Drop Materials</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Simply drag materials from our catalog and drop them onto your project zones
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-Time Pricing</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  See price updates instantly as you add materials, adjust quantities, or change specifications
                </p>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <Link 
                href="/prototype-4/builder" 
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Try Visual Builder
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-6">How It Works</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-medium mb-2">Create Your Project Layout</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Add zones to your project by selecting from common templates or creating custom areas
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-medium mb-2">Browse Material Catalog</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Select from categorized materials including aggregates, concrete, and specialty products
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-medium mb-2">Assign Materials to Zones</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Drag materials from the catalog and drop them onto project zones, then adjust quantities and specifications
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-primary font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-medium mb-2">Get Detailed Quote</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Receive a comprehensive quote with itemized pricing, delivery options, and scheduling information
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}