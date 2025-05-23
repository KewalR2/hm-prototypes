'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import { useQuoteStore } from '../components/QuoteContext';
import ThemeToggle from '../components/ThemeToggle';
import SidePanel from '../components/SidePanel';

const TrackOrderPage = observer(() => {
  const store = useQuoteStore();
  const [quoteId, setQuoteId] = useState('');
  const [searched, setSearched] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [error, setError] = useState('');
  
  // Check for query parameter on mount
  useEffect(() => {
    // Get the quote ID from the URL if available
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id');
    
    if (idFromUrl) {
      setQuoteId(idFromUrl);
      
      // Auto-search with the ID from URL
      setTimeout(() => {
        const foundQuote = store.generatedQuotes.find(q => q.id === idFromUrl);
        
        if (foundQuote) {
          setCurrentQuote(foundQuote);
          setSearched(true);
        } else {
          setError(`No quote found with ID: ${idFromUrl}`);
          setSearched(true);
        }
      }, 100); // Small delay to ensure the store is fully loaded
    }
  }, [store.generatedQuotes]);

  // Search for a quote by ID
  const searchQuote = () => {
    if (!quoteId.trim()) {
      setError('Please enter a valid Quote ID');
      return;
    }

    // Reset state
    setError('');
    setCurrentQuote(null);
    
    // Find quote in saved quotes
    const foundQuote = store.generatedQuotes.find(q => q.id === quoteId);
    
    if (foundQuote) {
      setCurrentQuote(foundQuote);
      setSearched(true);
    } else {
      setError(`No quote found with ID: ${quoteId}`);
      setSearched(true);
    }
  };

  // Demo tracking progress state
  const [demoProgress, setDemoProgress] = useState(0);
  
  // Generate tracking status based on quote date or demo progress
  const getTrackingStatus = (quote) => {
    if (!quote) return null;
    
    // Get creation date
    const creationDate = new Date(quote.createdAt);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - creationDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Use either real progress based on date or the demo progress value
    const progress = demoProgress > 0 ? demoProgress : Math.min(100, daysDiff * 20); // Each day is 20% progress
    
    // Get status based on progress
    let status = 'Processing';
    let statusColor = 'bg-blue-600';
    
    if (progress >= 100) {
      status = 'Delivered';
      statusColor = 'bg-green-600';
    } else if (progress >= 80) {
      status = 'Out for Delivery';
      statusColor = 'bg-indigo-600';
    } else if (progress >= 60) {
      status = 'In Transit';
      statusColor = 'bg-purple-600';
    } else if (progress >= 40) {
      status = 'Packed';
      statusColor = 'bg-yellow-600';
    } else if (progress >= 20) {
      status = 'Preparing';
      statusColor = 'bg-orange-600';
    }
    
    const expectedDelivery = new Date(creationDate);
    expectedDelivery.setDate(expectedDelivery.getDate() + 5); // 5 days after creation
    
    return {
      status,
      statusColor,
      progress,
      expectedDelivery: expectedDelivery.toLocaleDateString(),
      days: daysDiff
    };
  };
  
  // Admin function to update order status manually
  const updateOrderStatus = (newProgress) => {
    setDemoProgress(newProgress);
  };
  
  const trackingInfo = currentQuote ? getTrackingStatus(currentQuote) : null;

  // State for floating action menu
  const [showActionMenu, setShowActionMenu] = useState(false);
  
  // Function to toggle action menu
  const toggleActionMenu = () => {
    setShowActionMenu(!showActionMenu);
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Order Tracking</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track the status of your material orders and quotes
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>
      
      {/* Floating Action Button */}
      {searched && currentQuote && (
        <div className="fixed bottom-6 right-6 z-50">
          <button 
            onClick={toggleActionMenu}
            className="h-14 w-14 rounded-full bg-primary shadow-lg text-white flex items-center justify-center hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {showActionMenu ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            )}
          </button>
          
          {/* Action Menu */}
          {showActionMenu && (
            <div className="absolute bottom-16 right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 w-48">
              <div className="p-2">
                <button 
                  onClick={() => {
                    alert('Email sent with order details!');
                    setShowActionMenu(false);
                  }}
                  className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Order Details
                </button>
                <button 
                  onClick={() => {
                    alert('Order details PDF downloaded!');
                    setShowActionMenu(false);
                  }}
                  className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </button>
                <button 
                  onClick={() => {
                    alert('Text message with order details has been sent!');
                    setShowActionMenu(false);
                  }}
                  className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Send to Mobile
                </button>
                <button 
                  onClick={() => {
                    alert('Order copied to clipboard!');
                    setShowActionMenu(false);
                  }}
                  className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy to Clipboard
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
            {/* Search form */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Track Your Order
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter your Quote ID (e.g., QR-123456)"
                  value={quoteId}
                  onChange={(e) => setQuoteId(e.target.value)}
                />
                <button
                  onClick={searchQuote}
                  className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Track
                </button>
              </div>
              
              {error && (
                <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>
              )}
            </div>
            
            {/* Results */}
            {searched && currentQuote && trackingInfo && (
              <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600 px-6 py-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        Order: <span className="font-mono">{currentQuote.id}</span>
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Created: {new Date(currentQuote.createdAt).toLocaleDateString()}
                      </p>
                      {currentQuote.project?.projectType && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Project Type: {currentQuote.project.projectType}
                        </p>
                      )}
                    </div>
                    <div className="mt-2 md:mt-0 flex flex-col md:flex-row md:items-center gap-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-white text-sm ${trackingInfo.statusColor}`}>
                        {trackingInfo.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      onClick={() => alert('Email sent with order details!')}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Send to Email
                    </button>
                    <button
                      onClick={() => alert('Order details PDF downloaded!')}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download PDF
                    </button>
                    <button
                      onClick={() => alert('Text message with order details has been sent!')}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md shadow-sm text-gray-700 dark:text-white bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Send to Mobile
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${trackingInfo.statusColor}`} 
                        style={{ width: `${trackingInfo.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <span className={trackingInfo.status === 'Processing' ? `${trackingInfo.statusColor} px-1 rounded-full text-white font-medium` : ''}>Processing</span>
                      <span className={trackingInfo.status === 'Preparing' ? `${trackingInfo.statusColor} px-1 rounded-full text-white font-medium` : ''}>Preparing</span>
                      <span className={trackingInfo.status === 'Packed' ? `${trackingInfo.statusColor} px-1 rounded-full text-white font-medium` : ''}>Packed</span>
                      <span className={trackingInfo.status === 'In Transit' ? `${trackingInfo.statusColor} px-1 rounded-full text-white font-medium` : ''}>In Transit</span>
                      <span className={trackingInfo.status === 'Out for Delivery' ? `${trackingInfo.statusColor} px-1 rounded-full text-white font-medium` : ''}>Out for Delivery</span>
                      <span className={trackingInfo.status === 'Delivered' ? `${trackingInfo.statusColor} px-1 rounded-full text-white font-medium` : ''}>Delivered</span>
                    </div>
                  </div>
                  
                  {/* Admin Controls - For demo purposes */}
                  <div className="border dark:border-gray-700 rounded-lg p-4 mb-6 bg-gray-50 dark:bg-gray-800">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-3">Demo Controls</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      For demonstration purposes, use these buttons to simulate the order's progress:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => updateOrderStatus(0)} 
                        className={`px-2 py-1 text-xs rounded ${trackingInfo.progress < 20 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                      >
                        Processing
                      </button>
                      <button 
                        onClick={() => updateOrderStatus(20)} 
                        className={`px-2 py-1 text-xs rounded ${trackingInfo.progress >= 20 && trackingInfo.progress < 40 ? 'bg-orange-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                      >
                        Preparing
                      </button>
                      <button 
                        onClick={() => updateOrderStatus(40)} 
                        className={`px-2 py-1 text-xs rounded ${trackingInfo.progress >= 40 && trackingInfo.progress < 60 ? 'bg-yellow-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                      >
                        Packed
                      </button>
                      <button 
                        onClick={() => updateOrderStatus(60)} 
                        className={`px-2 py-1 text-xs rounded ${trackingInfo.progress >= 60 && trackingInfo.progress < 80 ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                      >
                        In Transit
                      </button>
                      <button 
                        onClick={() => updateOrderStatus(80)} 
                        className={`px-2 py-1 text-xs rounded ${trackingInfo.progress >= 80 && trackingInfo.progress < 100 ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                      >
                        Out for Delivery
                      </button>
                      <button 
                        onClick={() => updateOrderStatus(100)} 
                        className={`px-2 py-1 text-xs rounded ${trackingInfo.progress >= 100 ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                      >
                        Delivered
                      </button>
                    </div>
                  </div>
                  
                  {/* Delivery info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">Delivery Information</h4>
                      <p className="text-sm mb-1">
                        <span className="font-medium">Destination:</span> {currentQuote.deliveryInfo?.location?.address || 'Not provided'}
                      </p>
                      <p className="text-sm mb-1">
                        <span className="font-medium">Requested Date:</span> {currentQuote.deliveryInfo?.preferredDate || 'Not specified'}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Expected Delivery:</span> {trackingInfo.expectedDelivery}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">Order Details</h4>
                      <p className="text-sm mb-1">
                        <span className="font-medium">Status:</span> {trackingInfo.status}
                      </p>
                      <p className="text-sm mb-1">
                        <span className="font-medium">Total Materials:</span> {currentQuote.materials?.length || 0} items
                      </p>
                      {currentQuote.costBreakdown && (
                        <>
                          {/* Material costs */}
                          {currentQuote.costBreakdown.materialCosts && currentQuote.costBreakdown.materialCosts.length > 0 && (
                            <p className="text-sm mb-1">
                              <span className="font-medium">Materials Cost:</span> ${currentQuote.costBreakdown.materialCosts.reduce((sum, cost) => sum + cost.totalCost, 0).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </p>
                          )}
                          
                          {/* Transportation costs based on number of materials */}
                          <p className="text-sm mb-1">
                            <span className="font-medium">Transport Cost:</span> ${currentQuote.materials && currentQuote.materials.length > 1 ? '15,000.00' : '5,250.00'}
                          </p>
                          
                          {/* Fixed toll fees for all quotes */}
                          <p className="text-sm mb-1">
                            <span className="font-medium">Toll Fees:</span> $500.00
                          </p>
                          
                          {/* Fixed additional fees for all quotes */}
                          <p className="text-sm mb-1">
                            <span className="font-medium">Additional Fees:</span> $250.00
                          </p>
                          
                          {/* Recalculated total that always includes our fixed values */}
                          <p className="text-sm font-medium text-lg mt-2">
                            <span className="font-medium">Total:</span> ${(() => {
                              // Calculate materials cost
                              const materialsCost = currentQuote.costBreakdown.materialCosts ? 
                                currentQuote.costBreakdown.materialCosts.reduce((sum, cost) => sum + cost.totalCost, 0) : 0;
                              
                              // Add transport cost
                              const transportCost = currentQuote.materials && currentQuote.materials.length > 1 ? 15000 : 5250;
                              
                              // Add other costs
                              const otherCosts = 750; // 500 + 250
                              
                              // Calculate total
                              const total = materialsCost + transportCost + otherCosts;
                              
                              return total.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              });
                            })()}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Recent activities */}
                  {/* Delivery Verification Section */}
                  {currentQuote && trackingInfo && trackingInfo.progress >= 60 && (
                    <div className="mb-6 border dark:border-gray-700 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">Delivery Verification</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Share this Delivery Code with the truck driver upon delivery to verify receipt of materials.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 w-full">
                            <div className="font-medium text-gray-800 dark:text-white">
                              {currentQuote.plants?.[0]?.name || 'Primary Materials Supplier'}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                              Verify delivery by providing the Delivery Code to the driver when they arrive
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <div className="text-sm text-gray-600 dark:text-gray-300">
                                <div>
                                  <span className="font-medium mr-1">Vehicle:</span> Heavy-Duty Mixer Truck (DL-45-RT-7890)
                                </div>
                                <div>
                                  <span className="font-medium mr-1">Truck Number:</span> TRK-{Math.floor(1000 + Math.random() * 9000)}
                                </div>
                                <div>
                                  <span className="font-medium mr-1">Driver:</span> John Morrison
                                </div>
                              </div>
                              <div className="font-mono text-lg font-bold text-primary">
                                <span className="block text-sm font-normal text-gray-600 dark:text-gray-400">Delivery Code:</span>
                                {Math.floor(100000 + Math.random() * 900000)}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {currentQuote.materials && currentQuote.materials.length > 1 && (
                          <div className="flex items-start">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 w-full">
                              <div className="font-medium text-gray-800 dark:text-white">
                                Secondary Materials Delivery
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                Verify delivery by providing the Delivery Code to the driver when they arrive
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                  <div>
                                    <span className="font-medium mr-1">Vehicle:</span> Flatbed Truck (DL-78-ST-2345)
                                  </div>
                                  <div>
                                    <span className="font-medium mr-1">Truck Number:</span> TRK-{Math.floor(1000 + Math.random() * 9000)}
                                  </div>
                                  <div>
                                    <span className="font-medium mr-1">Driver:</span> Sarah Williams
                                  </div>
                                </div>
                                <div className="font-mono text-lg font-bold text-primary">
                                  <span className="block text-sm font-normal text-gray-600 dark:text-gray-400">Delivery Code:</span>
                                  {Math.floor(100000 + Math.random() * 900000)}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t dark:border-gray-700 pt-4">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">Recent Activities</h4>
                    <div className="space-y-3">
                      {trackingInfo.progress >= 20 && (
                        <div className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium dark:text-white">Order Confirmed</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(currentQuote.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {trackingInfo.progress >= 40 && (
                        <div className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h1a1 1 0 011 1v6.05A2.5 2.5 0 0115 17h-1.05a2.5 2.5 0 01-4.9 0H9V8a1 1 0 011-1h4z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium dark:text-white">Materials Prepared</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(new Date(currentQuote.createdAt).getTime() + 86400000).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {trackingInfo.progress >= 60 && (
                        <div className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium dark:text-white">Order Packed</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(new Date(currentQuote.createdAt).getTime() + 172800000).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {trackingInfo.progress >= 80 && (
                        <div className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h1a1 1 0 011 1v6.05A2.5 2.5 0 0115 17h-1.05a2.5 2.5 0 01-4.9 0H9V8a1 1 0 011-1h4z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium dark:text-white">Out For Delivery</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(new Date(currentQuote.createdAt).getTime() + 259200000).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {trackingInfo.progress >= 100 && (
                        <div className="flex items-start">
                          <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium dark:text-white">Delivered</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(new Date(currentQuote.createdAt).getTime() + 432000000).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* No results */}
            {searched && !currentQuote && !error && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Results Found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  We couldn't find any order with the provided Quote ID.
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Please check the ID and try again, or contact support if you need help.
                </p>
              </div>
            )}
            
            {/* Help section */}
            {!searched && (
              <div className="mt-8 border-t dark:border-gray-700 pt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                  How to Track Your Order
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      1
                    </span>
                    <p className="text-gray-600 dark:text-gray-300">
                      Enter your Quote ID found in your order confirmation
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      2
                    </span>
                    <p className="text-gray-600 dark:text-gray-300">
                      Click the "Track" button to view your order status
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      3
                    </span>
                    <p className="text-gray-600 dark:text-gray-300">
                      Follow the progress of your order from processing to delivery
                    </p>
                  </li>
                </ul>
              </div>
            )}
            
            <div className="border-t dark:border-gray-700 mt-8 pt-6">
              <Link
                href="/prototype-13"
                className="text-primary hover:text-primary-dark transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Quote Request
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right side panel with quote details - only show when a quote is found */}
        {currentQuote && (
          <div className="lg:w-96 w-full mt-8 lg:mt-0">
            <SidePanel quoteRequest={currentQuote} />
          </div>
        )}
      </div>
    </div>
  );
});

export default TrackOrderPage;