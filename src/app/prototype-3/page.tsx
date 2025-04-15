import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function Prototype3Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Augmented Reality Material Visualization</h1>
          <p className="text-lg mb-10 text-center text-gray-600 dark:text-gray-300">
            Prototype 3: AR-Powered Material Selection & Visualization
          </p>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-center">Visualize Before You Buy</h2>
            <p className="text-center mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              This prototype uses augmented reality to help you visualize materials in your actual project location.
              See exactly how different aggregates, concrete mixes, and other materials will look in your space before finalizing your order.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Scan Your Site</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Use your device camera to scan your project site and create a 3D model for material visualization
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Select Materials</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Browse our material catalog and select options to visualize in your project space
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Compare Options</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Visualize different material options side by side and get price estimates for your project
                </p>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <Link 
                href="/prototype-3/ar-visualizer" 
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Try AR Visualization
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
                  <h3 className="font-medium mb-2">Scan Your Project Site</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Use your device camera to scan the area where materials will be placed or used
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
                    Select from our extensive catalog of aggregates, concrete mixes, and other construction materials
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-medium mb-2">Visualize in AR</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    See realistic 3D renderings of selected materials in your actual project space through your device camera
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-primary font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-medium mb-2">Get Instant Quotes</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Once satisfied with your selection, receive instant quotes based on your project size and material choices
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