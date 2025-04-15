'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function QuoteViewPage() {
  const router = useRouter();
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [quoteData, setQuoteData] = useState({
    quoteNumber: 'QT-2025-04-10-001',
    status: 'Ready for Review',
    createdDate: 'April 10, 2025',
    validUntil: 'May 10, 2025',
    customer: {
      company: 'Acme Construction',
      contact: 'John Smith',
      email: 'john@acmeconstruction.com',
      phone: '(555) 123-4567'
    },
    project: {
      name: 'Highway 42 Expansion',
      location: 'Springfield, IL',
      startDate: 'May 15, 2025',
      duration: '3-6 months'
    },
    materials: [
      {
        id: 1,
        type: 'Crushed Stone',
        grade: '#57 Stone',
        quantity: 2500,
        unit: 'Tons',
        unitPrice: 24.50,
        total: 61250.00
      },
      {
        id: 2,
        type: 'Sand',
        grade: 'Fine Grain',
        quantity: 1200,
        unit: 'Tons',
        unitPrice: 18.75,
        total: 22500.00
      }
    ],
    delivery: {
      address: '123 Construction Site, Springfield, IL 62701',
      preferredDate: 'May 20, 2025',
      timeWindow: 'Morning (8am - 12pm)',
      fee: 1250.00
    },
    pricing: {
      subtotal: 83750.00,
      deliveryFee: 1250.00,
      tax: 4250.00,
      total: 89250.00
    },
    terms: [
      'Payment terms: Net 30 days',
      'Prices valid for 30 days from quote date',
      'Delivery schedule subject to material availability',
      'Minimum order quantities may apply',
      'Additional fees may apply for site access limitations'
    ]
  });

  // Check if this is immediately after a form submission
  useEffect(() => {
    const formData = sessionStorage.getItem('quoteRequestData');
    
    if (formData) {
      try {
        const parsedData = JSON.parse(formData);
        
        // Update the quote data with form submission data
        setQuoteData(prevData => ({
          ...prevData,
          customer: {
            company: parsedData.companyName || prevData.customer.company,
            contact: parsedData.contactName || prevData.customer.contact,
            email: parsedData.email || prevData.customer.email,
            phone: parsedData.phone || prevData.customer.phone
          },
          project: {
            name: parsedData.projectName || prevData.project.name,
            location: parsedData.projectLocation || prevData.project.location,
            startDate: parsedData.startDate || prevData.project.startDate,
            duration: parsedData.projectDuration || prevData.project.duration
          },
          materials: [
            {
              id: 1,
              type: getMaterialName(parsedData.material1),
              grade: parsedData.grade1 || '#57 Stone',
              quantity: parseInt(parsedData.quantity1) || 2500,
              unit: getUnitName(parsedData.unit1) || 'Tons',
              unitPrice: 24.50,
              total: (parseInt(parsedData.quantity1) || 2500) * 24.50
            },
            ...(parsedData.material2 ? [{
              id: 2,
              type: getMaterialName(parsedData.material2),
              grade: parsedData.grade2 || 'Fine Grain',
              quantity: parseInt(parsedData.quantity2) || 1200,
              unit: getUnitName(parsedData.unit2) || 'Tons',
              unitPrice: 18.75,
              total: (parseInt(parsedData.quantity2) || 1200) * 18.75
            }] : [])
          ],
          delivery: {
            address: parsedData.deliveryAddress || prevData.delivery.address,
            preferredDate: formatDate(parsedData.deliveryDate) || prevData.delivery.preferredDate,
            timeWindow: getTimeWindow(parsedData.deliveryTime) || prevData.delivery.timeWindow,
            fee: 1250.00
          }
        }));
        
        setSubmissionSuccess(true);
        
        // Clear the form data from session storage after 1 second
        setTimeout(() => {
          sessionStorage.removeItem('quoteRequestData');
        }, 1000);
      } catch (error) {
        console.error('Error parsing form data:', error);
      }
    }
  }, []);

  // Helper functions to convert form values to display values
  function getMaterialName(materialCode) {
    const materials = {
      'concrete': 'Concrete',
      'asphalt': 'Asphalt',
      'gravel': 'Gravel',
      'sand': 'Sand',
      'crushed-stone': 'Crushed Stone',
      'topsoil': 'Topsoil',
      'mulch': 'Mulch',
      'limestone': 'Limestone'
    };
    return materials[materialCode] || 'Crushed Stone';
  }

  function getUnitName(unitCode) {
    const units = {
      'tons': 'Tons',
      'cubic-yards': 'Cubic Yards',
      'cubic-feet': 'Cubic Feet'
    };
    return units[unitCode] || 'Tons';
  }

  function getTimeWindow(timeCode) {
    const timeWindows = {
      'morning': 'Morning (8am - 12pm)',
      'afternoon': 'Afternoon (12pm - 4pm)',
      'evening': 'Evening (4pm - 8pm)',
      'flexible': 'Flexible'
    };
    return timeWindows[timeCode] || 'Morning (8am - 12pm)';
  }

  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  // Calculate total
  const totalQuantity = quoteData.materials.reduce((total, item) => total + item.quantity, 0);

  // Recalculate pricing based on updated materials
  useEffect(() => {
    const subtotal = quoteData.materials.reduce((sum, material) => sum + material.total, 0);
    const deliveryFee = 1250.00;
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + deliveryFee + tax;

    setQuoteData(prev => ({
      ...prev,
      pricing: {
        subtotal,
        deliveryFee,
        tax,
        total
      }
    }));
  }, [quoteData.materials]);

  // Handle order conversion
  const handleAcceptQuote = () => {
    // Store quote data in session storage for the order tracking page
    sessionStorage.setItem('acceptedQuoteData', JSON.stringify(quoteData));
    router.push('/prototype-1/track');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header currentPage="home" />

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
          {submissionSuccess && (
            <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 rounded-lg p-4 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <span className="font-medium">Quote request submitted successfully!</span>
                <p className="text-sm">Your quote has been prepared and is ready for review.</p>
              </div>
            </div>
          )}

          {/* Quote Header */}
          <div className="bg-white dark:bg-gray-900 rounded-t-xl shadow-sm p-8">
            <div className="flex flex-col md:flex-row justify-between mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Materials Quote</h1>
                <p className="text-gray-600 dark:text-gray-400">Quote #{quoteData.quoteNumber}</p>
              </div>

              <div className="mt-4 md:mt-0 md:text-right">
                <div className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-primary font-semibold text-sm">
                  {quoteData.status}
                </div>
                <p className="text-sm mt-2">
                  <span className="text-gray-600 dark:text-gray-400">Created: </span>
                  {quoteData.createdDate}
                </p>
                <p className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Valid until: </span>
                  {quoteData.validUntil}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Customer Information */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Customer Information</h2>
                <p className="font-medium">{quoteData.customer.company}</p>
                <p>{quoteData.customer.contact}</p>
                <p>{quoteData.customer.email}</p>
                <p>{quoteData.customer.phone}</p>
              </div>

              {/* Project Information */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Project Information</h2>
                <p className="font-medium">{quoteData.project.name}</p>
                <p>Location: {quoteData.project.location}</p>
                <p>Start Date: {quoteData.project.startDate}</p>
                <p>Duration: {quoteData.project.duration}</p>
              </div>
            </div>

            {/* Materials Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Materials</h2>
              
              <div className="overflow-x-auto rounded-lg">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm uppercase">
                    <tr>
                      <th className="px-6 py-3">Material</th>
                      <th className="px-6 py-3">Grade</th>
                      <th className="px-6 py-3">Quantity</th>
                      <th className="px-6 py-3">Unit Price</th>
                      <th className="px-6 py-3">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {quoteData.materials.map((material) => (
                      <tr key={material.id} className="bg-white dark:bg-gray-900">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{material.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{material.grade}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{material.quantity} {material.unit}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${material.unitPrice.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${material.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50 dark:bg-gray-800 font-medium">
                    <tr>
                      <td className="px-6 py-3" colSpan={2}>Total Materials</td>
                      <td className="px-6 py-3">{totalQuantity} Units</td>
                      <td className="px-6 py-3"></td>
                      <td className="px-6 py-3">${quoteData.pricing.subtotal.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Delivery Address:</p>
                    <p className="font-medium">{quoteData.delivery.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Preferred Delivery:</p>
                    <p className="font-medium">{quoteData.delivery.preferredDate} | {quoteData.delivery.timeWindow}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Pricing Summary</h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="py-3 flex justify-between">
                    <span>Subtotal:</span>
                    <span>${quoteData.pricing.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span>Delivery Fee:</span>
                    <span>${quoteData.pricing.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span>Tax:</span>
                    <span>${quoteData.pricing.tax.toFixed(2)}</span>
                  </div>
                  <div className="py-4 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${quoteData.pricing.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {quoteData.terms.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-10">
              <button className="border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary font-semibold py-3 px-6 rounded-lg transition-colors">
                Download PDF
              </button>
              <button className="border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary font-semibold py-3 px-6 rounded-lg transition-colors">
                Request Changes
              </button>
              <button 
                onClick={handleAcceptQuote}
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Accept & Place Order
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}