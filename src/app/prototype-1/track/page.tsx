'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function OrderTrackingPage() {
  const [orderData, setOrderData] = useState({
    orderNumber: 'ORD-2025-04-10-001',
    quoteNumber: 'QT-2025-04-10-001',
    status: 'In Transit',
    placedDate: 'April 10, 2025',
    estimatedDelivery: 'May 20, 2025',
    customer: {
      company: 'Acme Construction',
      contact: 'John Smith',
      email: 'john@acmeconstruction.com',
      phone: '(555) 123-4567'
    },
    project: {
      name: 'Highway 42 Expansion',
      location: 'Springfield, IL'
    },
    materials: [
      {
        id: 1,
        type: 'Crushed Stone',
        grade: '#57 Stone',
        quantity: 2500,
        unit: 'Tons',
        status: 'Pending'
      },
      {
        id: 2,
        type: 'Sand',
        grade: 'Fine Grain',
        quantity: 1200,
        unit: 'Tons',
        status: 'In Transit'
      }
    ],
    delivery: {
      address: '123 Construction Site, Springfield, IL 62701',
      scheduledDate: 'May 20, 2025',
      timeWindow: 'Morning (8am - 12pm)',
      driverName: 'Michael Johnson',
      driverPhone: '(555) 987-6543',
      vehicle: 'Truck #42 - Dump Truck',
      currentLocation: 'En route - 15 miles away',
      eta: '30 minutes'
    },
    statusHistory: [
      {
        status: 'Order Placed',
        date: 'April 10, 2025 - 10:30 AM',
        notes: 'Order received and confirmed'
      },
      {
        status: 'Processing',
        date: 'April 12, 2025 - 9:15 AM',
        notes: 'Materials being prepared for shipment'
      },
      {
        status: 'Partial Shipment',
        date: 'April 15, 2025 - 2:45 PM',
        notes: 'Sand shipment prepared and scheduled'
      },
      {
        status: 'In Transit',
        date: 'April 16, 2025 - 8:00 AM',
        notes: 'Sand shipment en route to delivery location'
      }
    ]
  });

  const [orderCreated, setOrderCreated] = useState(false);

  // Check for accepted quote data on page load
  useEffect(() => {
    const quoteData = sessionStorage.getItem('acceptedQuoteData');
    
    if (quoteData) {
      try {
        const parsedQuote = JSON.parse(quoteData);
        
        // Create an order from the quote data
        setOrderData(prevData => ({
          ...prevData,
          quoteNumber: parsedQuote.quoteNumber,
          customer: parsedQuote.customer,
          project: {
            name: parsedQuote.project.name,
            location: parsedQuote.project.location
          },
          materials: parsedQuote.materials.map(material => ({
            id: material.id,
            type: material.type,
            grade: material.grade,
            quantity: material.quantity,
            unit: material.unit,
            status: material.id === 2 ? 'In Transit' : 'Pending'
          })),
          delivery: {
            ...prevData.delivery,
            address: parsedQuote.delivery.address,
            scheduledDate: parsedQuote.delivery.preferredDate,
            timeWindow: parsedQuote.delivery.timeWindow
          }
        }));
        
        setOrderCreated(true);
        
        // Clear the quote data after creating the order
        setTimeout(() => {
          sessionStorage.removeItem('acceptedQuoteData');
        }, 1000);
      } catch (error) {
        console.error('Error parsing quote data:', error);
      }
    }
  }, []);

  // Define status steps for tracking
  const trackingSteps = [
    { status: 'Order Placed', completed: true, current: false },
    { status: 'Processing', completed: true, current: false },
    { status: 'Preparing Shipment', completed: true, current: false },
    { status: 'In Transit', completed: false, current: true },
    { status: 'Delivered', completed: false, current: false }
  ];

  // Calculate progress percentage based on completed steps
  const completedSteps = trackingSteps.filter(step => step.completed).length;
  const totalSteps = trackingSteps.length;
  const progressPercentage = (completedSteps / (totalSteps - 1)) * 100;

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Placed':
      case 'Processing':
      case 'Preparing Shipment':
      case 'Partial Shipment':
        return 'text-blue-600 dark:text-blue-400';
      case 'In Transit':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'Delivered':
        return 'text-green-600 dark:text-green-400';
      case 'Delayed':
        return 'text-red-600 dark:text-red-400';
      case 'Pending':
        return 'text-gray-600 dark:text-gray-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  // Function to get map URL (hardcoded for demo)
  const getMapUrl = () => {
    return "https://maps.google.com/maps?q=Springfield,IL&output=embed";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/prototype-1" className="text-primary hover:underline inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Prototype 1
            </Link>
          </div>

          {/* Success notification */}
          {orderCreated && (
            <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 rounded-lg p-4 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <span className="font-medium">Order placed successfully!</span>
                <p className="text-sm">Your quote has been converted to an order and is being processed.</p>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Order Tracking</h1>
                <p className="text-gray-600 dark:text-gray-400">Order #{orderData.orderNumber}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">From Quote #{orderData.quoteNumber}</p>
              </div>

              <div className="mt-4 md:mt-0 md:text-right">
                <div className="inline-block px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 font-semibold text-sm">
                  {orderData.status}
                </div>
                <p className="text-sm mt-2">
                  <span className="text-gray-600 dark:text-gray-400">Order Date: </span>
                  {orderData.placedDate}
                </p>
                <p className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Estimated Delivery: </span>
                  {orderData.estimatedDelivery}
                </p>
              </div>
            </div>

            {/* Progress Tracker */}
            <div className="mb-10">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-blue-200 dark:bg-blue-900">
                      Order Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-primary">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-gray-700">
                  <div style={{ width: `${progressPercentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
                </div>
              </div>

              <div className="flex justify-between">
                {trackingSteps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full mb-1 ${
                      step.completed ? 'bg-primary text-white' : 
                      step.current ? 'border-2 border-primary text-primary' : 
                      'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.completed ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className="text-xs text-center mt-1 max-w-[80px]">{step.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Delivery Details */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-4">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Delivery Address:</p>
                  <p className="font-medium mb-3">{orderData.delivery.address}</p>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Scheduled Delivery:</p>
                  <p className="font-medium mb-3">{orderData.delivery.scheduledDate} | {orderData.delivery.timeWindow}</p>
                  
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">Driver Information:</p>
                    <p className="mb-1">{orderData.delivery.driverName}</p>
                    <p className="mb-1">{orderData.delivery.driverPhone}</p>
                    <p className="mb-3">{orderData.delivery.vehicle}</p>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{orderData.delivery.currentLocation}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">ETA: {orderData.delivery.eta}</p>
                      </div>
                      <button className="bg-primary hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded transition-colors">
                        Contact Driver
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live Map Placeholder */}
                <div className="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden h-64 relative">
                  <iframe
                    title="Delivery Location Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={getMapUrl()}
                  ></iframe>
                </div>
              </div>

              {/* Order Details */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                
                {/* Customer and Project Info */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Customer:</p>
                      <p className="font-medium">{orderData.customer.company}</p>
                      <p className="text-sm">{orderData.customer.contact}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Project:</p>
                      <p className="font-medium">{orderData.project.name}</p>
                      <p className="text-sm">{orderData.project.location}</p>
                    </div>
                  </div>
                </div>

                {/* Materials Status */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold mb-3">Materials Status</h3>
                  <div className="space-y-4">
                    {orderData.materials.map((material) => (
                      <div key={material.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">{material.type}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{material.grade} | {material.quantity} {material.unit}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          material.status === 'In Transit' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300' :
                          material.status === 'Delivered' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' :
                          'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                        }`}>
                          {material.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status History */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Order History</h3>
                  <ol className="relative border-l border-gray-300 dark:border-gray-700">
                    {orderData.statusHistory.map((status, index) => (
                      <li key={index} className="mb-6 ml-6 last:mb-0">
                        <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
                          index === 0 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700'
                        }`}>
                          {index === 0 ? (
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                          )}
                        </span>
                        <h4 className={`font-semibold text-sm ${getStatusColor(status.status)}`}>{status.status}</h4>
                        <time className="block mb-1 text-xs font-normal text-gray-500 dark:text-gray-400">{status.date}</time>
                        <p className="text-sm font-normal text-gray-600 dark:text-gray-400">{status.notes}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
              <button className="border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary font-semibold py-2 px-6 rounded-lg transition-colors">
                Download Details
              </button>
              <button className="border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary font-semibold py-2 px-6 rounded-lg transition-colors">
                Report Issue
              </button>
              <button className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                Get Updates via SMS
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}