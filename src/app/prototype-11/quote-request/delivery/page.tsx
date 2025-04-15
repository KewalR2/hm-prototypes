'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuote } from '@/app/prototype-11/components/QuoteContext';
import ToastNotification from '@/app/prototype-11/components/ToastNotification';

export default function DeliveryPage() {
  const router = useRouter();
  const { quoteRequest, updateQuoteRequest, setCurrentStep } = useQuote();
  
  // Form state
  const [street, setStreet] = useState(quoteRequest.deliveryAddress?.street || '');
  const [city, setCity] = useState(quoteRequest.deliveryAddress?.city || '');
  const [state, setState] = useState(quoteRequest.deliveryAddress?.state || '');
  const [zipCode, setZipCode] = useState(quoteRequest.deliveryAddress?.zipCode || '');
  const [specialInstructions, setSpecialInstructions] = useState(quoteRequest.deliveryAddress?.specialInstructions || '');
  const [accessLimitations, setAccessLimitations] = useState(quoteRequest.deliveryAddress?.accessLimitations || '');
  
  // Time window state
  const [hasTimeWindow, setHasTimeWindow] = useState(!!quoteRequest.preferredDeliveryTimeWindow);
  const [startHour, setStartHour] = useState(quoteRequest.preferredDeliveryTimeWindow?.startHour?.toString() || '9');
  const [endHour, setEndHour] = useState(quoteRequest.preferredDeliveryTimeWindow?.endHour?.toString() || '17');
  
  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  
  // Form validation
  const [errors, setErrors] = useState<{
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    timeWindow?: string;
  }>({});

  // Validate form before submission
  const validateForm = () => {
    const newErrors: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      timeWindow?: string;
    } = {};
    
    if (!street.trim()) {
      newErrors.street = 'Street address is required';
    }
    
    if (!city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)';
    }
    
    if (hasTimeWindow) {
      const start = parseInt(startHour, 10);
      const end = parseInt(endHour, 10);
      
      if (isNaN(start) || start < 0 || start > 23) {
        newErrors.timeWindow = 'Start hour must be between 0 and 23';
      } else if (isNaN(end) || end < 0 || end > 23) {
        newErrors.timeWindow = 'End hour must be between 0 and 23';
      } else if (start >= end) {
        newErrors.timeWindow = 'End hour must be greater than start hour';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setToastMessage('Please fix the form errors before continuing');
      setToastType('error');
      setShowToast(true);
      return;
    }
    
    // Update the quote request with form values
    updateQuoteRequest({
      deliveryAddress: {
        street,
        city,
        state,
        zipCode,
        specialInstructions: specialInstructions || undefined,
        accessLimitations: accessLimitations || undefined,
      },
      preferredDeliveryTimeWindow: hasTimeWindow 
        ? {
            startHour: parseInt(startHour, 10),
            endHour: parseInt(endHour, 10),
          } 
        : undefined,
    });
    
    // Update step and navigate to next page
    setCurrentStep(5);
    router.push('/prototype-11/quote-request/review');
  };

  // Handle back button
  const handleBack = () => {
    setCurrentStep(3);
    router.push('/prototype-11/quote-request/materials');
  };

  // Generate time options
  const timeOptions = [];
  for (let i = 0; i < 24; i++) {
    const hour = i;
    const period = i < 12 ? 'AM' : 'PM';
    const displayHour = i === 0 ? 12 : i > 12 ? i - 12 : i;
    timeOptions.push(
      <option key={hour} value={hour}>
        {displayHour}:00 {period}
      </option>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Please provide the delivery address and any special instructions for your order.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Delivery Address */}
          <div>
            <h3 className="text-lg font-medium mb-4">Delivery Address</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="street"
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="123 Main St"
                  className={`w-full px-4 py-2 border ${errors.street ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                />
                {errors.street && (
                  <p className="mt-1 text-sm text-red-500">{errors.street}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Springfield"
                    className={`w-full px-4 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="state"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="CA"
                    className={`w-full px-4 py-2 border ${errors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="zipCode"
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="12345"
                    className={`w-full px-4 py-2 border ${errors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Delivery Instructions */}
          <div>
            <h3 className="text-lg font-medium mb-4">Delivery Instructions</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Special Instructions (Optional)
                </label>
                <textarea
                  id="specialInstructions"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  rows={3}
                  placeholder="Any special delivery instructions? (e.g., call before delivery, gate code)"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="accessLimitations" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Access Limitations (Optional)
                </label>
                <textarea
                  id="accessLimitations"
                  value={accessLimitations}
                  onChange={(e) => setAccessLimitations(e.target.value)}
                  rows={3}
                  placeholder="Any access limitations we should be aware of? (e.g., low bridges, weight restrictions, narrow roads)"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
          
          {/* Preferred Delivery Time */}
          <div>
            <h3 className="text-lg font-medium mb-4">Preferred Delivery Time</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="hasTimeWindow"
                  type="checkbox"
                  checked={hasTimeWindow}
                  onChange={(e) => setHasTimeWindow(e.target.checked)}
                  className="h-5 w-5 text-primary focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="hasTimeWindow" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  I have a preferred delivery time window
                </label>
              </div>
              
              {hasTimeWindow && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startHour" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Start Time
                    </label>
                    <select
                      id="startHour"
                      value={startHour}
                      onChange={(e) => setStartHour(e.target.value)}
                      className={`w-full px-4 py-2 border ${errors.timeWindow ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                    >
                      {timeOptions}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="endHour" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      End Time
                    </label>
                    <select
                      id="endHour"
                      value={endHour}
                      onChange={(e) => setEndHour(e.target.value)}
                      className={`w-full px-4 py-2 border ${errors.timeWindow ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                    >
                      {timeOptions}
                    </select>
                  </div>
                  
                  {errors.timeWindow && (
                    <div className="col-span-2">
                      <p className="text-sm text-red-500">{errors.timeWindow}</p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700 dark:text-yellow-200">
                      Note: Delivery times are not guaranteed and may be affected by weather, traffic, and other factors.
                      We will do our best to accommodate your preferred time window.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <button
            type="submit"
            className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium flex items-center"
          >
            Next: Review Quote
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
      
      {/* Toast Notification */}
      {showToast && (
        <ToastNotification 
          message={toastMessage} 
          type={toastType}
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
}