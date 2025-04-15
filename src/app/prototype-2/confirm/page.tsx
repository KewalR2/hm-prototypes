'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConfirmationPage() {
  // State for handling quote data
  const [quoteData, setQuoteData] = useState(null);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [referenceNumber] = useState(`VQR-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`);
  
  // Load quote data from session storage
  useEffect(() => {
    const data = sessionStorage.getItem('finalQuoteData');
    
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setQuoteData(parsedData);
        setQuoteSubmitted(true);
        
        // Clear session storage after successful processing
        setTimeout(() => {
          sessionStorage.removeItem('finalQuoteData');
        }, 1000);
      } catch (error) {
        console.error('Error parsing quote data:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header currentPage="home" />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link href="/prototype-2" className="text-primary hover:underline inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Prototype 2
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Quote Request Submitted!</h1>
            
            {quoteSubmitted && (
              <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 rounded-lg p-4 mb-6 mx-auto max-w-xl">
                <p className="font-medium">Your voice-based quote request was processed successfully!</p>
              </div>
            )}
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
              Your voice-based quote request has been successfully submitted. We'll prepare your quote and get back to you shortly.
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8 max-w-md mx-auto">
              <h2 className="font-semibold mb-4">Your Quote Request Details</h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Reference Number:</span>
                <span className="font-medium">{referenceNumber}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Submitted On:</span>
                <span className="font-medium">{new Date().toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Expected Response:</span>
                <span className="font-medium">Within 2 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                <span className="text-primary font-medium">Processing</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold mb-3">What happens next?</h3>
              <ol className="text-sm text-left max-w-lg mx-auto space-y-4">
                <li className="flex">
                  <div className="mr-3 text-primary">1.</div>
                  <div>
                    <p className="font-medium">Our team reviews your voice-captured requirements</p>
                    <p className="text-gray-600 dark:text-gray-400">We'll analyze the materials and quantities you specified</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-3 text-primary">2.</div>
                  <div>
                    <p className="font-medium">You'll receive a detailed quote via email</p>
                    <p className="text-gray-600 dark:text-gray-400">A copy will be sent to {quoteData?.contact?.email || 'your email'}</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-3 text-primary">3.</div>
                  <div>
                    <p className="font-medium">Review and accept the quote online</p>
                    <p className="text-gray-600 dark:text-gray-400">You can review and accept directly from the email</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-3 text-primary">4.</div>
                  <div>
                    <p className="font-medium">Track your order and deliveries</p>
                    <p className="text-gray-600 dark:text-gray-400">Once accepted, you'll get real-time tracking</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button className="border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary font-medium py-2 px-6 rounded-lg transition-colors">
                Download Request Summary
              </button>
              <Link 
                href="/"
                className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mt-8">
            <h3 className="font-medium mb-4 text-center">How was your experience?</h3>
            <div className="flex justify-center space-x-6 mb-6">
              {['😞', '😐', '🙂', '😊', '😃'].map((emoji, index) => (
                <button 
                  key={index} 
                  className="w-12 h-12 text-2xl hover:scale-110 transition-transform focus:outline-none"
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <textarea 
                placeholder="Any additional feedback on the voice quote experience?" 
                className="w-full max-w-lg p-3 rounded-lg border border-gray-300 dark:border-gray-700 text-sm"
                rows={3}
              ></textarea>
            </div>
            <div className="flex justify-center mt-3">
              <button className="text-primary hover:text-blue-700 text-sm font-medium">
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}