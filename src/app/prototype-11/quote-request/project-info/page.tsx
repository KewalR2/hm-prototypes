'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuote } from '@/app/prototype-11/components/QuoteContext';
import ToastNotification from '@/app/prototype-11/components/ToastNotification';

export default function ProjectInfoPage() {
  const router = useRouter();
  const { quoteRequest, updateQuoteRequest, setCurrentStep } = useQuote();
  
  // Form state
  const [projectName, setProjectName] = useState(quoteRequest.projectName || '');
  const [projectDescription, setProjectDescription] = useState(quoteRequest.projectDescription || '');
  const [desiredDeliveryDate, setDesiredDeliveryDate] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  
  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  
  // Form validation
  const [errors, setErrors] = useState<{
    projectName?: string;
    projectDescription?: string;
  }>({});

  // Initialize dates from existing quote request
  useEffect(() => {
    if (quoteRequest.desiredDeliveryDate) {
      const date = new Date(quoteRequest.desiredDeliveryDate);
      setDesiredDeliveryDate(date.toISOString().split('T')[0]);
    }
    
    if (quoteRequest.expirationDate) {
      const date = new Date(quoteRequest.expirationDate);
      setExpirationDate(date.toISOString().split('T')[0]);
    }
  }, [quoteRequest]);

  // Validate form before submission
  const validateForm = () => {
    const newErrors: {
      projectName?: string;
      projectDescription?: string;
    } = {};
    
    if (!projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }
    
    if (!projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required';
    } else if (projectDescription.trim().length < 10) {
      newErrors.projectDescription = 'Please provide a more detailed description (at least 10 characters)';
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
      projectName,
      projectDescription,
      desiredDeliveryDate: desiredDeliveryDate ? new Date(desiredDeliveryDate) : undefined,
      expirationDate: expirationDate ? new Date(expirationDate) : undefined,
    });
    
    // Update step and navigate to next page
    setCurrentStep(2);
    router.push('/prototype-11/quote-request/sector-info');
  };

  // Calculate minimum dates
  const today = new Date().toISOString().split('T')[0];
  const minDeliveryDate = new Date();
  minDeliveryDate.setDate(minDeliveryDate.getDate() + 3); // Minimum 3 days from today
  const minDeliveryDateString = minDeliveryDate.toISOString().split('T')[0];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Project Information</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Let's start with the basic details about your project. This information helps us understand your needs better.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Project Name */}
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              id="projectName"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className={`w-full px-4 py-2 border ${errors.projectName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
            />
            {errors.projectName && (
              <p className="mt-1 text-sm text-red-500">{errors.projectName}</p>
            )}
          </div>
          
          {/* Project Description */}
          <div>
            <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Provide a detailed description of your project"
              rows={4}
              className={`w-full px-4 py-2 border ${errors.projectDescription ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
            />
            {errors.projectDescription && (
              <p className="mt-1 text-sm text-red-500">{errors.projectDescription}</p>
            )}
          </div>
          
          {/* Dates Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Desired Delivery Date */}
            <div>
              <label htmlFor="desiredDeliveryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Desired Delivery Date
              </label>
              <input
                id="desiredDeliveryDate"
                type="date"
                value={desiredDeliveryDate}
                onChange={(e) => setDesiredDeliveryDate(e.target.value)}
                min={minDeliveryDateString}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Minimum 3 days from today for processing
              </p>
            </div>
            
            {/* Quote Expiration Date */}
            <div>
              <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Quote Expiration Date
              </label>
              <input
                id="expirationDate"
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                min={today}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                How long do you need this quote to be valid?
              </p>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium flex items-center"
          >
            Next: Sector & Requirements
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