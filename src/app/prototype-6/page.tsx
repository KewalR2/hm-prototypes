'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

export default function Prototype6Landing() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Materials Scheduling Optimization</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Streamline your project timeline with intelligent material delivery scheduling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/prototype-6/scheduler" 
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Try the Scheduler
              </Link>
              <button 
                className="border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Optimized Delivery Timing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Schedule material deliveries to match your project phases perfectly, minimizing storage costs and reducing waste.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Multi-Supplier Coordination</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Coordinate deliveries from multiple suppliers to ensure materials arrive in the right sequence for project success.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Availability Forecasting</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Stay ahead of supply shortages with real-time material availability forecasting and automatic alternatives.
              </p>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700"></div>
            
            {/* Steps */}
            <div className="space-y-12 relative">
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 md:pr-12 md:text-right">
                  <h3 className="text-xl font-bold mb-2">Import Your Project Plan</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Upload or create your project timeline with key milestones and phase requirements.
                  </p>
                </div>
                <div className="md:mx-auto relative z-10 my-4 md:my-0">
                  <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                </div>
                <div className="flex-1 md:pl-12 md:text-left"></div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 md:pr-12 md:text-right"></div>
                <div className="md:mx-auto relative z-10 my-4 md:my-0">
                  <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                </div>
                <div className="flex-1 md:pl-12 md:text-left">
                  <h3 className="text-xl font-bold mb-2">Select Materials and Quantities</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Choose the materials needed for each phase of your project and specify quantities.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 md:pr-12 md:text-right">
                  <h3 className="text-xl font-bold mb-2">Review Optimization Suggestions</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our system analyzes your needs and suggests the most efficient delivery schedule.
                  </p>
                </div>
                <div className="md:mx-auto relative z-10 my-4 md:my-0">
                  <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                </div>
                <div className="flex-1 md:pl-12 md:text-left"></div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 md:pr-12 md:text-right"></div>
                <div className="md:mx-auto relative z-10 my-4 md:my-0">
                  <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">4</div>
                </div>
                <div className="flex-1 md:pl-12 md:text-left">
                  <h3 className="text-xl font-bold mb-2">Finalize and Request Quote</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Approve the optimized schedule and request a detailed quote for your materials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-10 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to optimize your material deliveries?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start saving time and reducing costs with intelligent materials scheduling.
          </p>
          <Link 
            href="/prototype-6/scheduler" 
            className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors inline-block"
          >
            Try the Scheduler Now
          </Link>
        </section>
      </main>
    </div>
  );
}