'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuote } from '@/app/prototype-11/components/QuoteContext';
import { Sector } from '@/app/prototype-11/types';
import ToastNotification from '@/app/prototype-11/components/ToastNotification';

export default function SectorInfoPage() {
  const router = useRouter();
  const { quoteRequest, updateQuoteRequest, setCurrentStep } = useQuote();
  
  // Form state
  const [sector, setSector] = useState<Sector>(quoteRequest.sector || 'private');
  const [isGovernmentContract, setIsGovernmentContract] = useState(quoteRequest.isGovernmentContract || false);
  const [requiresPermits, setRequiresPermits] = useState(quoteRequest.requiresPermits || false);
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  
  // Customer information
  const [customerName, setCustomerName] = useState(quoteRequest.customer?.name || '');
  const [companyName, setCompanyName] = useState(quoteRequest.customer?.companyName || '');
  const [email, setEmail] = useState(quoteRequest.customer?.email || '');
  const [phone, setPhone] = useState(quoteRequest.customer?.phone || '');
  
  // Budget information
  const [hasBudgetRange, setHasBudgetRange] = useState(!!quoteRequest.budgetRange);
  const [minBudget, setMinBudget] = useState(quoteRequest.budgetRange?.min?.toString() || '');
  const [maxBudget, setMaxBudget] = useState(quoteRequest.budgetRange?.max?.toString() || '');
  
  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  
  // Form validation
  const [errors, setErrors] = useState<{
    customerName?: string;
    email?: string;
    phone?: string;
    budget?: string;
  }>({});

  // Validate form before submission
  const validateForm = () => {
    const newErrors: {
      customerName?: string;
      email?: string;
      phone?: string;
      budget?: string;
    } = {};
    
    if (!customerName.trim()) {
      newErrors.customerName = 'Contact name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\(\)\-\+]+$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (hasBudgetRange) {
      const min = parseFloat(minBudget);
      const max = parseFloat(maxBudget);
      
      if (isNaN(min) || min <= 0) {
        newErrors.budget = 'Minimum budget must be a positive number';
      } else if (isNaN(max) || max <= 0) {
        newErrors.budget = 'Maximum budget must be a positive number';
      } else if (min >= max) {
        newErrors.budget = 'Maximum budget must be greater than minimum budget';
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
      sector,
      isGovernmentContract,
      requiresPermits,
      additionalComments: additionalRequirements || undefined,
      customer: {
        name: customerName,
        companyName: companyName || undefined,
        email,
        phone,
      },
      budgetRange: hasBudgetRange 
        ? {
            min: parseFloat(minBudget),
            max: parseFloat(maxBudget),
          } 
        : undefined,
    });
    
    // Update step and navigate to next page
    setCurrentStep(3);
    router.push('/prototype-11/quote-request/materials');
  };

  // Handle back button
  const handleBack = () => {
    setCurrentStep(1);
    router.push('/prototype-11/quote-request/project-info');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Sector & Customer Information</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Tell us about your sector, any specific requirements, and your contact information.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Sector Selection */}
          <div>
            <h3 className="text-lg font-medium mb-4">Sector Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Sector
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(['private', 'public', 'government', 'residential', 'commercial', 'industrial'] as Sector[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSector(s)}
                      className={`py-2 px-4 border ${
                        sector === s 
                          ? 'bg-primary text-white border-primary' 
                          : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                      } rounded-lg font-medium text-sm transition-colors capitalize text-center`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    id="governmentContract"
                    type="checkbox"
                    checked={isGovernmentContract}
                    onChange={(e) => setIsGovernmentContract(e.target.checked)}
                    className="h-5 w-5 text-primary focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="governmentContract" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    This is a government contract
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="requiresPermits"
                    type="checkbox"
                    checked={requiresPermits}
                    onChange={(e) => setRequiresPermits(e.target.checked)}
                    className="h-5 w-5 text-primary focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="requiresPermits" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Requires special permits
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="additionalRequirements" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Additional Requirements or Special Considerations
                </label>
                <textarea
                  id="additionalRequirements"
                  value={additionalRequirements}
                  onChange={(e) => setAdditionalRequirements(e.target.value)}
                  placeholder="Any special requirements for your sector? (e.g., compliance needs, certifications required)"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
          
          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Customer Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Contact Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="customerName"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your full name"
                  className={`w-full px-4 py-2 border ${errors.customerName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                />
                {errors.customerName && (
                  <p className="mt-1 text-sm text-red-500">{errors.customerName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your company name (if applicable)"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Budget Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Budget Information (Optional)</h3>
            <div className="mb-4">
              <div className="flex items-center">
                <input
                  id="hasBudgetRange"
                  type="checkbox"
                  checked={hasBudgetRange}
                  onChange={(e) => setHasBudgetRange(e.target.checked)}
                  className="h-5 w-5 text-primary focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="hasBudgetRange" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  I have a budget range in mind
                </label>
              </div>
            </div>
            
            {hasBudgetRange && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="minBudget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Minimum Budget ($)
                  </label>
                  <input
                    id="minBudget"
                    type="number"
                    value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={`w-full px-4 py-2 border ${errors.budget ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                  />
                </div>
                
                <div>
                  <label htmlFor="maxBudget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Maximum Budget ($)
                  </label>
                  <input
                    id="maxBudget"
                    type="number"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={`w-full px-4 py-2 border ${errors.budget ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                  />
                </div>
                
                {errors.budget && (
                  <div className="col-span-2">
                    <p className="text-sm text-red-500">{errors.budget}</p>
                  </div>
                )}
              </div>
            )}
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
            Next: Materials
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