'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuote } from '@/app/prototype-11/components/QuoteContext';
import { 
  PRODUCTS, 
  PLANTS, 
  TRUCKS,
  WEATHER_CONDITIONS,
  getProductById, 
  getPlantById,
  getTruckById,
  calculateProductCost,
  calculateDeliveryCost,
  getRandomWeatherCondition
} from '@/app/prototype-11/mockData';
import ToastNotification from '@/app/prototype-11/components/ToastNotification';
import { GeneratedQuote } from '@/app/prototype-11/types';

export default function ReviewPage() {
  const router = useRouter();
  const { quoteRequest, updateQuoteRequest, setCurrentStep, clearQuoteRequest } = useQuote();
  
  // State for quote generation
  const [isGeneratingQuote, setIsGeneratingQuote] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState<GeneratedQuote | null>(null);
  const [selectedPlant, setSelectedPlant] = useState(quoteRequest.selectedPlantId || '');
  
  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  
  // Function to generate a quote
  const generateQuote = () => {
    setIsGeneratingQuote(true);
    setToastMessage('Generating your quote...');
    setToastType('info');
    setShowToast(true);
    
    // Simulate API delay
    setTimeout(() => {
      try {
        // If no plant is selected, pick the closest one that has all the products
        let plant = getPlantById(selectedPlant || quoteRequest.selectedPlantId || '');
        if (!plant) {
          // Find a plant that has all the products
          const productIds = quoteRequest.products?.map(p => p.productId) || [];
          plant = PLANTS.find(p => 
            productIds.every(id => p.availableProducts.includes(id))
          ) || PLANTS[0]; // Fallback to first plant if none found
        }
        
        // Select appropriate truck based on materials
        const productCategories = new Set(
          quoteRequest.products?.map(p => {
            const product = getProductById(p.productId);
            return product?.category;
          }) || []
        );
        
        // For concrete, use a mixer truck; for others, use appropriate types
        let truckId = '';
        if (productCategories.has('Concrete')) {
          truckId = 'truck-001'; // Concrete mixer
        } else if (productCategories.has('Steel') || productCategories.has('Lumber')) {
          truckId = 'truck-003'; // Flatbed truck
        } else {
          truckId = 'truck-002'; // Dump truck
        }
        
        // Make sure the selected plant has the required truck
        if (!plant.availableTrucks.includes(truckId)) {
          truckId = plant.availableTrucks[0];
        }
        
        // Get the truck
        const truck = getTruckById(truckId);
        if (!truck) throw new Error('No suitable truck found');
        
        // Get a random weather condition
        const weatherCondition = getRandomWeatherCondition();
        
        // Calculate delivery costs
        const { transportCost, tollFees, fuelSurcharge } = calculateDeliveryCost(
          truckId,
          plant.distance,
          weatherCondition
        );
        
        // Calculate product costs and details
        const productDetails = (quoteRequest.products || []).map(item => {
          const product = getProductById(item.productId);
          if (!product) throw new Error(`Product not found: ${item.productId}`);
          
          const unitPrice = product.basePrice;
          const quantity = item.quantity;
          const totalPrice = unitPrice * quantity;
          
          // Calculate availability date (3-5 days from now, plus weather delays)
          const availabilityDate = new Date();
          availabilityDate.setDate(
            availabilityDate.getDate() + 
            3 + Math.floor(Math.random() * 3) + // 3-5 days base
            Math.ceil(weatherCondition.potentialDelay / 24) // Weather delay in days
          );
          
          return {
            product,
            quantity,
            unitPrice,
            totalPrice,
            availabilityDate,
            specialInstructions: item.specialInstructions,
          };
        });
        
        // Calculate additional costs
        const additionalCosts = [];
        
        if (quoteRequest.requestsSamples) {
          additionalCosts.push({
            description: 'Material samples',
            amount: 75.00,
          });
        }
        
        if (quoteRequest.requestsConsultation) {
          additionalCosts.push({
            description: 'Consultation with material specialist',
            amount: 150.00,
          });
        }
        
        if (quoteRequest.needsInstallation) {
          additionalCosts.push({
            description: 'Installation services (estimate)',
            amount: 500.00,
          });
        }
        
        // Calculate delivery date
        const estimatedDeliveryDate = new Date();
        estimatedDeliveryDate.setDate(
          estimatedDeliveryDate.getDate() + 
          5 + Math.floor(Math.random() * 5) + // 5-10 days base
          Math.ceil(weatherCondition.potentialDelay / 24) // Weather delay in days
        );
        
        // Calculate totals
        const productSubtotal = productDetails.reduce((sum, item) => sum + item.totalPrice, 0);
        const deliverySubtotal = transportCost + tollFees + fuelSurcharge;
        const additionalSubtotal = additionalCosts.reduce((sum, item) => sum + item.amount, 0);
        const subtotal = productSubtotal + deliverySubtotal + additionalSubtotal;
        const taxRate = 0.0825; // 8.25% tax rate
        const taxes = subtotal * taxRate;
        const total = subtotal + taxes;
        
        // Generate alternates
        const alternateOptions = [];
        
        // If we're delivering in bad weather, suggest a delay for better conditions
        if (weatherCondition.riskLevel !== 'low') {
          alternateOptions.push({
            description: 'Delay delivery until better weather conditions',
            costDifference: -transportCost * 0.15, // 15% discount on transportation
            timelineDifference: 7, // 7 days delay
          });
        }
        
        // If ordering high-priced materials, suggest bulk discount
        if (productSubtotal > 5000) {
          alternateOptions.push({
            description: 'Bulk order discount (10% off materials)',
            costDifference: -productSubtotal * 0.1,
            timelineDifference: 0,
          });
        }
        
        // Generate the final quote
        const quote: GeneratedQuote = {
          id: `QT-${Date.now().toString(36).toUpperCase()}`,
          requestId: `RQ-${Date.now().toString(36).toUpperCase()}`,
          dateCreated: new Date(),
          expirationDate: quoteRequest.expirationDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          status: 'pending',
          
          // Original request data
          request: quoteRequest as any, // Type assertion as we know it's complete at this point
          
          // Quote response details
          selectedPlant: plant,
          
          // Product pricing
          products: productDetails,
          
          // Delivery details
          delivery: {
            truck,
            estimatedDistance: plant.distance,
            transportCost,
            estimatedDeliveryDate,
            weatherCondition,
            tollFees,
            fuelSurcharge,
          },
          
          // Additional costs
          additionalCosts,
          
          // Pricing summary
          subtotal,
          taxes,
          total,
          
          // Alternate options
          alternateOptions: alternateOptions.length > 0 ? alternateOptions : undefined,
        };
        
        // Set the generated quote
        setGeneratedQuote(quote);
        setIsGeneratingQuote(false);
        setToastMessage('Your quote has been generated successfully!');
        setToastType('success');
        setShowToast(true);
        
      } catch (error) {
        console.error('Error generating quote:', error);
        setIsGeneratingQuote(false);
        setToastMessage('There was an error generating your quote. Please try again.');
        setToastType('error');
        setShowToast(true);
      }
    }, 3000);
  };
  
  // Handle back button
  const handleBack = () => {
    setCurrentStep(4);
    router.push('/prototype-11/quote-request/delivery');
  };
  
  // Handle starting a new quote
  const handleNewQuote = () => {
    clearQuoteRequest();
    router.push('/prototype-11/');
  };
  
  // Handle accepting the quote
  const handleAcceptQuote = () => {
    if (!generatedQuote) return;
    
    // In a real application, this would call an API to accept the quote
    // For now, we'll simulate a successful acceptance
    setToastMessage('Quote accepted! Redirecting to order tracking...');
    setToastType('success');
    setShowToast(true);
    
    // Store the quote ID in sessionStorage for tracking
    sessionStorage.setItem('acceptedQuoteId', generatedQuote.id);
    
    // Navigate to the tracking page after a short delay
    setTimeout(() => {
      router.push('/prototype-11/quote-request/tracking');
    }, 2000);
  };
  
  // Auto-generate quote on page load if not already generated
  useEffect(() => {
    if (!generatedQuote && !isGeneratingQuote) {
      generateQuote();
    }
  }, []);
  
  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Review Your Quote</h2>
      
      {isGeneratingQuote ? (
        <div className="py-12 flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Generating your comprehensive quote...
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            This may take a few moments while we calculate pricing, check availability, and assess delivery options.
          </p>
        </div>
      ) : generatedQuote ? (
        <div className="space-y-8">
          {/* Quote Header */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-primary bg-opacity-10 dark:bg-opacity-20 p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Quote #{generatedQuote.id}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Created on {formatDate(generatedQuote.dateCreated)}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Valid until {formatDate(generatedQuote.expirationDate)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Project Information */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-medium mb-4">Project Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Project Name</p>
                  <p className="font-medium">{generatedQuote.request.projectName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Sector</p>
                  <p className="font-medium capitalize">{generatedQuote.request.sector}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                  <p>{generatedQuote.request.projectDescription}</p>
                </div>
              </div>
            </div>
            
            {/* Products */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-medium mb-4">Materials</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Unit Price</th>
                      <th className="px-4 py-3">Quantity</th>
                      <th className="px-4 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {generatedQuote.products.map((product, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {product.product.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {product.product.category} • {product.product.description.substring(0, 60)}...
                          </div>
                          {product.specialInstructions && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <span className="font-medium">Note:</span> {product.specialInstructions}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          {formatCurrency(product.unitPrice)}/{product.product.unitOfMeasure}
                        </td>
                        <td className="px-4 py-4">
                          {product.quantity} {product.product.unitOfMeasure}
                        </td>
                        <td className="px-4 py-4 text-right font-medium">
                          {formatCurrency(product.totalPrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Delivery Details */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-medium mb-4">Delivery Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Plant Information</h5>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="font-medium">{generatedQuote.selectedPlant.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {generatedQuote.selectedPlant.location}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Distance: {generatedQuote.selectedPlant.distance.toFixed(1)} miles
                    </p>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Delivery Address</h5>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p>{generatedQuote.request.deliveryAddress.street}</p>
                    <p>{generatedQuote.request.deliveryAddress.city}, {generatedQuote.request.deliveryAddress.state} {generatedQuote.request.deliveryAddress.zipCode}</p>
                    {generatedQuote.request.deliveryAddress.specialInstructions && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        <span className="font-medium">Special Instructions:</span> {generatedQuote.request.deliveryAddress.specialInstructions}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Transportation</h5>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="font-medium">{generatedQuote.delivery.truck.type}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {generatedQuote.delivery.truck.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Capacity: {generatedQuote.delivery.truck.capacity} {generatedQuote.products[0]?.product.unitOfMeasure}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Delivery Timeline</h5>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm">
                      <span className="font-medium">Estimated Delivery:</span> {formatDate(generatedQuote.delivery.estimatedDeliveryDate)}
                    </p>
                    
                    {generatedQuote.request.preferredDeliveryTimeWindow && (
                      <p className="text-sm mt-1">
                        <span className="font-medium">Preferred Time:</span> 
                        {generatedQuote.request.preferredDeliveryTimeWindow.startHour}:00 - 
                        {generatedQuote.request.preferredDeliveryTimeWindow.endHour}:00
                      </p>
                    )}
                    
                    <div className="mt-3 flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        Delivery times may be affected by weather conditions and availability. 
                        You will be notified of any changes to the delivery schedule.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Weather Conditions */}
              <div className="mt-6">
                <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Weather Impact Assessment</h5>
                <div className={`bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 ${
                  generatedQuote.delivery.weatherCondition.riskLevel === 'low' 
                    ? 'border-green-400'
                    : generatedQuote.delivery.weatherCondition.riskLevel === 'medium'
                    ? 'border-yellow-400'
                    : 'border-red-400'
                }`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className={`h-5 w-5 ${
                        generatedQuote.delivery.weatherCondition.riskLevel === 'low' 
                          ? 'text-green-400'
                          : generatedQuote.delivery.weatherCondition.riskLevel === 'medium'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h6 className="text-sm font-medium text-gray-900 dark:text-white">
                        {generatedQuote.delivery.weatherCondition.condition.charAt(0).toUpperCase() + generatedQuote.delivery.weatherCondition.condition.slice(1)} Conditions
                      </h6>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {generatedQuote.delivery.weatherCondition.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span className="font-medium">Potential Delay:</span> {generatedQuote.delivery.weatherCondition.potentialDelay} hours
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Risk Level:</span> {generatedQuote.delivery.weatherCondition.riskLevel.charAt(0).toUpperCase() + generatedQuote.delivery.weatherCondition.riskLevel.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pricing Summary */}
            <div className="p-6">
              <h4 className="text-lg font-medium mb-4">Quote Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Materials Subtotal</span>
                  <span className="font-medium">{formatCurrency(generatedQuote.products.reduce((sum, item) => sum + item.totalPrice, 0))}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Transportation Cost</span>
                  <span className="font-medium">{formatCurrency(generatedQuote.delivery.transportCost)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Toll Fees</span>
                  <span className="font-medium">{formatCurrency(generatedQuote.delivery.tollFees)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Fuel Surcharge</span>
                  <span className="font-medium">{formatCurrency(generatedQuote.delivery.fuelSurcharge)}</span>
                </div>
                
                {generatedQuote.additionalCosts.length > 0 && (
                  <>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Services</p>
                      {generatedQuote.additionalCosts.map((cost, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">{cost.description}</span>
                          <span className="font-medium">{formatCurrency(cost.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                
                <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                    <span className="font-medium">{formatCurrency(generatedQuote.subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Taxes (8.25%)</span>
                    <span className="font-medium">{formatCurrency(generatedQuote.taxes)}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(generatedQuote.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Alternate Options */}
          {generatedQuote.alternateOptions && generatedQuote.alternateOptions.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h4 className="text-lg font-medium mb-4">Alternate Options</h4>
              <div className="space-y-4">
                {generatedQuote.alternateOptions.map((option, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">Option {index + 1}: {option.description}</h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {option.timelineDifference > 0 
                            ? `Adds ${option.timelineDifference} days to delivery timeline`
                            : option.timelineDifference < 0
                            ? `Reduces delivery timeline by ${Math.abs(option.timelineDifference)} days`
                            : 'No change to delivery timeline'
                          }
                        </p>
                      </div>
                      <div className={`text-lg font-medium ${option.costDifference < 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {option.costDifference < 0 ? '-' : '+'}{formatCurrency(Math.abs(option.costDifference))}
                      </div>
                    </div>
                    <div className="mt-3 flex">
                      <button className="text-sm text-primary hover:text-blue-600">
                        Request this option
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Actions */}
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Delivery Information
            </button>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleNewQuote}
                className="px-6 py-3 border border-primary text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                Start New Quote
              </button>
              
              <button
                type="button"
                onClick={handleAcceptQuote}
                className="px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Accept Quote
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            An error occurred while generating your quote. Please try again.
          </p>
          <button
            onClick={generateQuote}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      )}
      
      {/* Toast Notification */}
      {showToast && (
        <ToastNotification 
          message={toastMessage} 
          type={toastType}
          isLoading={isGeneratingQuote}
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
}