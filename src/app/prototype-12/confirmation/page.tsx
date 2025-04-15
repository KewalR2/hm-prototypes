'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConfirmationPage() {
  const router = useRouter();
  const [quoteData, setQuoteData] = useState<any>(null);
  const [quoteNumber, setQuoteNumber] = useState('');
  
  useEffect(() => {
    // Retrieve quote data from session storage
    const storedData = sessionStorage.getItem('aiQuoteData');
    if (storedData) {
      try {
        setQuoteData(JSON.parse(storedData));
        // Generate a random quote number
        setQuoteNumber(`HM-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}`);
      } catch (e) {
        console.error("Failed to parse quote data", e);
      }
    }
  }, []);

  // Go back to home page
  const goToHome = () => {
    router.push('/');
  };
  
  // Start a new quote
  const startNewQuote = () => {
    router.push('/prototype-12/quote');
  };

  if (!quoteData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Header currentPage="prototype-12" />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-6">Quote Data Not Found</h1>
          <p className="mb-8">We couldn't find your quote data. Let's start a new quote.</p>
          <button 
            onClick={startNewQuote}
            className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Start New Quote
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header currentPage="prototype-12" />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Success Header */}
          <div className="bg-green-500 p-6 text-white text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold">Quote Submitted Successfully!</h1>
            <p className="text-lg mt-2">Your quote request has been received and is being processed.</p>
          </div>
          
          {/* Quote Details */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">Quote Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Project Information</h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Project Type:</span>
                    <span className="ml-2 capitalize">{quoteData.project.type}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Location:</span>
                    <span className="ml-2">{quoteData.project.location}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Size:</span>
                    <span className="ml-2">{quoteData.project.size}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Timeline:</span>
                    <span className="ml-2">{quoteData.project.timeline}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Name:</span>
                    <span className="ml-2">{quoteData.contactInfo?.name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Email:</span>
                    <span className="ml-2">{quoteData.contactInfo?.email}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Phone:</span>
                    <span className="ml-2">{quoteData.contactInfo?.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Selected Materials</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Material</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Unit Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                    {quoteData.materials?.map((material: any) => (
                      <tr key={material.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{material.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{material.quantity} {material.unit}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${material.unitPrice.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${(material.quantity * material.unitPrice).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <td colSpan={3} className="px-6 py-4 text-right font-medium text-gray-900 dark:text-white">Total:</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">
                        ${quoteData.materials?.reduce((sum: number, material: any) => sum + (material.quantity * material.unitPrice), 0).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Supplier</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  {quoteData.selectedPlant ? (
                    <>
                      <p className="font-medium">{quoteData.selectedPlant.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {quoteData.selectedPlant.location} • {quoteData.selectedPlant.distance} away
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(quoteData.selectedPlant.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{quoteData.selectedPlant.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No supplier selected</p>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Delivery Information</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-gray-600 dark:text-gray-400">Date:</p>
                      <p className="mt-1">{quoteData.deliveryDate || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-600 dark:text-gray-400">Time:</p>
                      <p className="mt-1">{quoteData.deliveryTime || 'Not specified'}</p>
                    </div>
                  </div>
                  {quoteData.specialInstructions && (
                    <div className="mt-3">
                      <p className="font-medium text-gray-600 dark:text-gray-400">Special Instructions:</p>
                      <p className="mt-1 text-sm">{quoteData.specialInstructions}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Quote Reference */}
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-8">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold">Quote Reference</h3>
              </div>
              <p className="mt-2">
                Your quote reference number: <span className="font-bold text-blue-600 dark:text-blue-300">{quoteNumber}</span>
              </p>
              <p className="text-sm mt-1">
                You will receive a detailed quote via email within 24 hours. Our team may contact you for any additional information needed.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={goToHome}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Return to Home
              </button>
              <button 
                onClick={startNewQuote}
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Start New Quote
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}