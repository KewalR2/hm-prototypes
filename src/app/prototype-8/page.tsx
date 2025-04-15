'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

export default function Prototype8Landing() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Smart Contract System</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Streamline your quote-to-contract process with automated digital contracts and milestone tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/prototype-8/contracts" 
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                View Contracts
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Digital Signatures</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Secure and legally binding digital signatures for all parties, eliminating the need for physical paperwork.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Automated Templates</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Smart templates that automatically populate contract details from approved quotes, saving time and reducing errors.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Milestone Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track delivery milestones and payment schedules with automatic notifications and status updates.
              </p>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">For Suppliers</h3>
              <ol className="space-y-4 list-decimal list-inside">
                <li className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Generate Contract</span>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 ml-6">
                    Convert approved quotes into legally binding contracts with one click, automatically populating all necessary details.
                  </p>
                </li>
                <li className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Add Terms & Schedule</span>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 ml-6">
                    Customize payment terms, delivery schedules, and specific conditions using smart clause templates.
                  </p>
                </li>
                <li className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Send for Signature</span>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 ml-6">
                    Send contracts directly to customers for digital signature with automatic reminders.
                  </p>
                </li>
                <li className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Track Progress</span>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 ml-6">
                    Monitor contract status, delivery milestones, and payment schedules in real-time.
                  </p>
                </li>
              </ol>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">For Customers</h3>
              <ol className="space-y-4 list-decimal list-inside">
                <li className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Review Contract</span>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 ml-6">
                    Receive contracts electronically with clear highlighting of key terms and comparison to original quote.
                  </p>
                </li>
                <li className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Request Changes</span>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 ml-6">
                    Suggest modifications or request clarifications directly within the document with in-line commenting.
                  </p>
                </li>
                <li className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Sign Digitally</span>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 ml-6">
                    Apply legally binding electronic signatures from any device, with multi-party signing workflow.
                  </p>
                </li>
                <li className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Access Dashboard</span>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 ml-6">
                    Track delivery status, upcoming milestones, and payment due dates through a personalized dashboard.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </section>
        
        {/* Benefits */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Speed & Efficiency</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Reduce contract processing time by up to 80% with automated generation and digital signatures.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Legal Protection</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Ensure compliance with standardized templates and maintain comprehensive audit trails of all contract activities.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Improved Cash Flow</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Accelerate contract execution and milestone tracking, leading to faster payments and better financial planning.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Customer Satisfaction</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Provide a modern, convenient, and transparent process that enhances customer experience and builds trust.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonial */}
        <section className="mb-16 bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <div className="inline-block text-yellow-400 mb-4">
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <p className="text-xl italic text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
              "The Smart Contract System has transformed how we manage our material supply agreements. From quote acceptance to final payment, the entire process is now seamless, transparent, and 10 times faster. Our clients love the modern experience, and our team spends far less time on paperwork."
            </p>
            <div>
              <p className="font-bold text-lg">Thomas Wilson</p>
              <p className="text-gray-500 dark:text-gray-400">Operations Director, GreenBuild Construction</p>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-10 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to streamline your contracting process?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Convert quotes to contracts with a single click and track progress from signature to delivery.
          </p>
          <Link 
            href="/prototype-8/contracts" 
            className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors inline-block"
          >
            Try Smart Contracts Now
          </Link>
        </section>
      </main>
    </div>
  );
}