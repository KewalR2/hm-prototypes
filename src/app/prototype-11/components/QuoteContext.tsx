'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { QuoteRequest, InputMode, AIMessage, AIConversationState, ProjectType } from '../types';

interface QuoteContextType {
  quoteRequest: Partial<QuoteRequest>;
  updateQuoteRequest: (data: Partial<QuoteRequest>) => void;
  clearQuoteRequest: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  inputMode: InputMode;
  setInputMode: (mode: InputMode) => void;
  aiConversation: AIConversationState;
  addAIMessage: (message: Omit<AIMessage, 'timestamp'>) => void;
  updateAIConversation: (data: Partial<AIConversationState>) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Initial AI conversation state
const initialAIConversation: AIConversationState = {
  messages: [],
  currentQuestion: "Hi there! I'm your materials quoting assistant. I'd like to help you get a quote for your construction materials. To get started, could you tell me a bit about your project?",
  extractedData: {},
  completedTopics: [],
  confidence: 0,
  suggestedNextSteps: ['project_basics', 'material_needs', 'delivery_requirements'],
};

// Initial empty quote request
const emptyQuoteRequest: Partial<QuoteRequest> = {
  products: [],
  requestsSamples: false,
  requestsConsultation: false,
  needsInstallation: false,
  inputMode: 'ai_conversation',
  projectType: 'new_construction' as ProjectType,
};

// Create the context
const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

// Provider component
export function QuoteProvider({ children }: { children: ReactNode }) {
  // State for the quote request data
  const [quoteRequest, setQuoteRequest] = useState<Partial<QuoteRequest>>(emptyQuoteRequest);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [inputMode, setInputMode] = useState<InputMode>('ai_conversation');
  const [aiConversation, setAIConversation] = useState<AIConversationState>(initialAIConversation);
  const [isLoading, setIsLoading] = useState(false);
  const totalSteps = 5; // Define total steps in the wizard

  // Load any saved quote data from sessionStorage on mount
  useEffect(() => {
    const savedQuoteData = sessionStorage.getItem('quoteRequestData');
    if (savedQuoteData) {
      try {
        const parsedData = JSON.parse(savedQuoteData);
        setQuoteRequest(parsedData);
        
        // Set input mode based on saved data
        if (parsedData.inputMode) {
          setInputMode(parsedData.inputMode);
        }
        
        // Load AI conversation if it exists
        if (parsedData.aiConversation) {
          setAIConversation(parsedData.aiConversation);
        }
      } catch (error) {
        console.error('Error parsing saved quote data:', error);
      }
    }
    
    const savedStep = sessionStorage.getItem('quoteCurrentStep');
    if (savedStep) {
      try {
        setCurrentStep(parseInt(savedStep, 10));
      } catch (error) {
        console.error('Error parsing saved step:', error);
      }
    }
  }, []);

  // Save quote data to sessionStorage whenever it changes
  useEffect(() => {
    // Include the AI conversation data in the quote request
    const updatedQuoteRequest = {
      ...quoteRequest,
      inputMode,
      aiConversation: inputMode === 'ai_conversation' ? aiConversation : undefined,
    };
    
    // Save to session storage
    sessionStorage.setItem('quoteRequestData', JSON.stringify(updatedQuoteRequest));
  }, [quoteRequest, inputMode, aiConversation]);
  
  // Save current step to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('quoteCurrentStep', currentStep.toString());
  }, [currentStep]);

  // Function to update the quote request data
  const updateQuoteRequest = (data: Partial<QuoteRequest>) => {
    setQuoteRequest(prev => ({
      ...prev,
      ...data,
    }));
  };

  // Function to add a message to the AI conversation
  const addAIMessage = (message: Omit<AIMessage, 'timestamp'>) => {
    const newMessage: AIMessage = {
      ...message,
      timestamp: new Date(),
    };
    
    setAIConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  };

  // Function to update the AI conversation state
  const updateAIConversation = (data: Partial<AIConversationState>) => {
    setAIConversation(prev => ({
      ...prev,
      ...data,
    }));
  };

  // Function to clear the quote request data
  const clearQuoteRequest = () => {
    setQuoteRequest(emptyQuoteRequest);
    setCurrentStep(1);
    setAIConversation(initialAIConversation);
    sessionStorage.removeItem('quoteRequestData');
    sessionStorage.removeItem('quoteCurrentStep');
  };

  // Context value
  const contextValue: QuoteContextType = {
    quoteRequest,
    updateQuoteRequest,
    clearQuoteRequest,
    currentStep,
    setCurrentStep,
    totalSteps,
    inputMode,
    setInputMode,
    aiConversation,
    addAIMessage,
    updateAIConversation,
    isLoading,
    setIsLoading,
  };

  return (
    <QuoteContext.Provider value={contextValue}>
      {children}
    </QuoteContext.Provider>
  );
}

// Custom hook to use the quote context
export function useQuote() {
  const context = useContext(QuoteContext);
  
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  
  return context;
}