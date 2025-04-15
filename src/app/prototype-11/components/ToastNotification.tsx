'use client';

import { useEffect } from 'react';

interface ToastNotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  isLoading?: boolean;
  onClose: () => void;
  duration?: number;
}

export default function ToastNotification({ 
  message, 
  type = 'info',
  isLoading = false, 
  onClose, 
  duration = 5000 
}: ToastNotificationProps) {
  
  // Auto-dismiss toast after duration
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, onClose, duration, message]);

  // Define colors based on type
  const getColorClasses = () => {
    switch (type) {
      case 'success':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'error':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'info':
      default:
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  // Define icon based on type
  const getIcon = () => {
    if (isLoading) {
      return (
        <div className="animate-spin h-5 w-5 text-gray-600 dark:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      );
    }

    switch (type) {
      case 'success':
        return (
          <div className="text-green-500 dark:text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="text-red-500 dark:text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="text-yellow-500 dark:text-yellow-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'info':
      default:
        return (
          <div className="text-blue-500 dark:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in-up">
      <div className={`rounded-lg shadow-lg p-4 max-w-md flex items-center space-x-3 border-l-4 ${getColorClasses()}`}>
        {getIcon()}
        
        <div className="flex-1">
          <p className="text-gray-800 dark:text-white font-medium">{message}</p>
        </div>
        
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}