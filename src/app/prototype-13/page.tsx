'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import ClaudeToggle from './components/ClaudeToggle';
import ThemeToggle from './components/ThemeToggle';
import QuestionPanel from './components/QuestionPanel';
import SidePanel from './components/SidePanel';
import VoiceInputButton from './components/VoiceInputButton';
import { useQuoteStore } from './components/QuoteContext';
import { callClaudeAPI, processAnswer } from './components/AIService';
import { StepType } from './types';

const AdaptiveQuoteRequestFlow = observer(() => {
  const store = useQuoteStore();
  
  // Handle going back to a previous question
  const handlePreviousQuestion = () => {
    store.goToPreviousQuestion();
  };
  
  // Handle user answers to questions
  const handleAnswer = async (answer: string) => {
    if (!answer.trim() || store.isLoading) return;
    
    // Set loading state but don't clear inputs yet - that happens on success
    store.setIsLoading(true);
    
    try {
      // Save current state to history
      store.addToQuestionHistory({
        id: Date.now().toString(),
        question: store.currentQuestion,
        answer,
        stepType: store.currentStepType
      });
      
      // Process the answer to update the quote request
      const updatedQuote = processAnswer(
        store.currentStepType, 
        answer, 
        store.quoteRequest, 
        store.recommendedMaterials
      );
      
      // Update the quote request
      store.setQuoteRequest(updatedQuote);
      
      // Get the next question from Claude or sample data
      let response;
      
      try {
        if (store.useClaudeAPI) {
          // Use Claude API to generate the next question
          response = await callClaudeAPI(
            store.currentStepType,
            store.quoteRequest,
            store.recommendedMaterials,
            store.recommendedPlants
          );
      } else {
        // Make it look like we made an API call but we'll just pass back the sample data
        console.log('Claude API is disabled, using sample data...');
        
        // Sample response using the provided example
        const sampleResponses: Record<StepType, any> = {
          [StepType.CUSTOMER_INFO]: {
            question: "Can you describe what you are trying to build?",
            componentType: "project_info"
          },
          [StepType.PROJECT_INFO]: {
            question: "Based on your Highway Construction project, here are the recommended materials. Are there any additional materials you need?",
            componentType: "material_selection",
            materials: [
              {
                id: "asphalt-concrete",
                name: "Asphalt Concrete",
                category: "Paving",
                unit: "Ton",
                basePrice: 100,
                description: "A composite material commonly used for road surfaces",
                commonUses: ["Road surface", "Highway paving"],
                recommendedQuantity: 50000
              },
              {
                id: "crushed-stone",
                name: "Crushed Stone",
                category: "Aggregate",
                unit: "Ton",
                basePrice: 30,
                description: "Used for road base and drainage",
                commonUses: ["Road base", "Drainage"],
                recommendedQuantity: 75000
              },
              {
                id: "reinforced-concrete",
                name: "Reinforced Concrete",
                category: "Structural",
                unit: "Cubic Yard",
                basePrice: 150,
                description: "For bridges, culverts, and other structures",
                commonUses: ["Bridges", "Culverts", "Drainage structures"],
                recommendedQuantity: 10000
              },
              {
                id: "geotextile-fabric",
                name: "Geotextile Fabric",
                category: "Erosion Control",
                unit: "Square Yard",
                basePrice: 2,
                description: "Used for soil stabilization and drainage",
                commonUses: ["Soil stabilization", "Drainage improvement"],
                recommendedQuantity: 100000
              }
            ],
            quote_type: "Highway Construction"
          },
          [StepType.MATERIAL_SELECTION]: {
            question: "Where should we deliver these materials?",
            componentType: "delivery_location",
            quote_type: "Highway Construction"
          },
          [StepType.DELIVERY_LOCATION]: {
            question: "What's your budget for this project?",
            componentType: "budget",
            quote_type: "Highway Construction"
          },
          [StepType.BUDGET]: {
            question: "Based on your materials and location, here are the recommended suppliers. Which would you prefer to work with?",
            componentType: "plant_selection",
            quote_type: "Highway Construction",
            plants: [
              {
                id: "plant-midwest-01",
                name: "Midwest Asphalt Supply",
                location: {
                  address: "1234 Industrial Blvd, Kansas City, KS 66101",
                  coordinates: { lat: 39.115, lng: -94.626 }
                },
                transportCostPerMile: 4.50,
                minDeliveryDistance: 0,
                maxDeliveryDistance: 150,
                tollZones: [],
                materials: [
                  {
                    materialId: "asphalt-concrete",
                    availability: "high",
                    priceMultiplier: 1.0
                  }
                ]
              },
              {
                id: "plant-central-02",
                name: "Central Materials Depot",
                location: {
                  address: "4500 Main Industrial Parkway",
                  coordinates: { lat: 30.25, lng: -97.75 }
                },
                transportCostPerMile: 4.25,
                minDeliveryDistance: 0,
                maxDeliveryDistance: 100,
                tollZones: [],
                materials: [
                  {
                    materialId: "crushed-stone",
                    availability: "high",
                    priceMultiplier: 0.95
                  }
                ]
              }
            ]
          },
          [StepType.PLANT_SELECTION]: {
            question: "Thank you. Your quote has been generated and can be viewed in the sidebar.",
            componentType: "confirmation",
            quote_type: "Highway Construction",
            costs: {
              materials: 8500000,
              transport_cost: 125000,
              toll_cost: 15000,
              total_cost: 8640000
            }
          },
          [StepType.CONFIRMATION]: {
            question: "What's your name and contact information?",
            componentType: "customer_info",
            quote_type: "Highway Construction"
          }
        };
        
        // Return response for current step
        response = sampleResponses[store.currentStepType];
      }
      
        // Process Claude's response to update the store
        store.processClaudeResponse(response);
        
      } catch (error) {
        console.error('Error processing answer:', error);
        store.setCurrentQuestion('Sorry, there was an error processing your response. Please try again.');
      } finally {
        store.setIsLoading(false);
      }
    } catch (error) {
      console.error('Error in answer handling:', error);
      store.setCurrentQuestion('Sorry, there was an error. Please try again or toggle the Claude API switch.');
      store.setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Adaptive Quote Request Flow</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Get a customized quote for heavy construction materials by answering a series of questions.
            </p>
          </div>
          <ThemeToggle />
        </div>
        
        <div className="mt-4 flex items-center">
          <ClaudeToggle 
            enabled={store.useClaudeAPI} 
            onChange={(enabled) => store.setUseClaudeAPI(enabled)} 
          />
          <span className="ml-6">
            <VoiceInputButton />
          </span>
        </div>
      </div>
      
      {store.quoteComplete ? (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Quote Request Submitted</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Your quote request has been successfully generated!
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-300">Quote ID: <span className="font-mono font-medium">{store.quoteRequest.id || 'QR-123456'}</span></p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Created: {store.quoteRequest.createdAt ? new Date(store.quoteRequest.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</p>
              </div>
              
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={() => store.resetStore()}
                  className="px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Start New Quote
                </button>
                <Link
                  href="/"
                  className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Return Home
                </Link>
                <Link
                  href={`/prototype-13/track?id=${store.quoteRequest.id || 'QR-123456'}`}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Track Order
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right side panel with cost details */}
          <div className="lg:w-96 w-full mt-8 lg:mt-0">
            <SidePanel quoteRequest={store.quoteRequest} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Question Panel */}
          <div className="flex-1">
            <QuestionPanel
              currentQuestion={store.currentQuestion}
              onAnswer={handleAnswer}
              onPrevious={handlePreviousQuestion}
              isLoading={store.isLoading}
              stepType={store.currentStepType}
              materials={store.recommendedMaterials}
              plants={store.recommendedPlants}
              hasPrevious={store.questionHistory.length > 0}
            />
          </div>
          
          {/* Side Panel */}
          <div className="lg:w-96 w-full mt-8 lg:mt-0">
            <SidePanel quoteRequest={store.quoteRequest} />
          </div>
        </div>
      )}
    </div>
  );
});

export default AdaptiveQuoteRequestFlow;