'use client';

import { useState, useRef, useEffect } from 'react';
import { Material, PlantRecommendation, StepType } from '../types';
import VoiceInputButton from './VoiceInputButton';
import MaterialSelectionModal from './MaterialSelectionModal';

interface QuestionPanelProps {
  currentQuestion: string;
  onAnswer: (answer: string) => void;
  onPrevious?: () => void;
  isLoading: boolean;
  stepType: StepType;
  materials: Material[];
  plants: PlantRecommendation[];
  hasPrevious: boolean;
}

// Skeleton loader for question
function QuestionSkeleton({ stepType }: { stepType: StepType }) {
  // Create different skeleton layouts based on step type
  const renderSkeletonContent = () => {
    switch (stepType) {
      case StepType.MATERIAL_SELECTION:
        return (
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        );
        
      case StepType.PLANT_SELECTION:
        return (
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
            {[1, 2].map(i => (
              <div key={i} className="h-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        );
        
      case StepType.BUDGET:
        return (
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        );
        
      case StepType.CUSTOMER_INFO:
        return (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        );
        
      default:
        return (
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        );
    }
  };
  
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
      {renderSkeletonContent()}
      <div className="flex justify-between items-center mt-6">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </div>
    </div>
  );
}

export default function QuestionPanel({
  currentQuestion,
  onAnswer,
  onPrevious,
  isLoading,
  stepType,
  materials,
  plants,
  hasPrevious
}: QuestionPanelProps) {
  const [answer, setAnswer] = useState('');
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [answer]);
  
  // Reset answer when step type changes
  useEffect(() => {
    setAnswer('');
  }, [stepType]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() && !isLoading) {
      onAnswer(answer.trim());
      // Don't clear the answer immediately - will be handled when step changes
    }
  };
  
  // Flags for showing different input components based on step type
  const showMaterialOptions = stepType === StepType.MATERIAL_SELECTION && 
                             materials.length > 0;
  
  const showPlantOptions = stepType === StepType.PLANT_SELECTION && 
                          plants.length > 0;
                          
  const showBudgetInput = stepType === StepType.BUDGET;
  const showCustomerInfoForm = stepType === StepType.CUSTOMER_INFO;
  
  return (
    <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
      {isLoading ? (
        /* Skeleton loader for questions */
        <QuestionSkeleton stepType={stepType} />
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{currentQuestion}</h2>
          
          {/* Material Selection Component */}
          {showMaterialOptions && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Recommended Materials:</h3>
            <button 
              onClick={() => setShowMaterialModal(true)}
              className="text-xs text-primary hover:text-primary/80 font-medium"
            >
              View All Materials
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
            {materials.slice(0, 4).map((material, index) => (
              <div 
                key={material.id}
                className={`p-3 border border-gray-200 dark:border-gray-700 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${answer.includes(material.name) ? 'border-primary dark:border-primary' : ''}`}
                onClick={() => {
                  const currentMaterials = answer.split(',').map(m => m.trim()).filter(Boolean);
                  const isSelected = currentMaterials.includes(material.name);
                  
                  if (isSelected) {
                    setAnswer(currentMaterials.filter(m => m !== material.name).join(', '));
                  } else {
                    setAnswer([...currentMaterials, material.name].join(', '));
                  }
                }}
              >
                <div className="flex items-start space-x-2">
                  <input 
                    type="checkbox" 
                    className="mt-1"
                    checked={answer.includes(material.name)}
                    onChange={() => {}} // Handled by parent div onClick
                    onClick={e => e.stopPropagation()}
                  />
                  <div>
                    <div className="font-medium dark:text-white">{material.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{material.category}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {material.recommendedQuantity} {material.unit}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {materials.length > 4 && (
            <button 
              onClick={() => setShowMaterialModal(true)}
              className="text-sm text-primary hover:text-primary/80 mt-1"
            >
              + {materials.length - 4} more materials
            </button>
          )}
          
          <MaterialSelectionModal
            isOpen={showMaterialModal}
            onClose={() => setShowMaterialModal(false)}
            materials={materials.map(m => ({
              id: m.id,
              name: m.name,
              quantity: m.recommendedQuantity || 0
            }))}
            allMaterials={[]}
            selectedMaterials={answer ? answer.split(',').map(m => m.trim()).filter(Boolean) : []}
            onConfirm={setAnswer}
          />
        </div>
      )}
      
      {/* Plant Selection Component */}
      {showPlantOptions && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recommended Suppliers:</h3>
          <div className="space-y-3">
            {plants.map((plantRec) => (
              <div 
                key={plantRec.plant.id}
                className={`p-3 border border-gray-200 dark:border-gray-700 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${answer.includes(plantRec.plant.name) ? 'border-primary dark:border-primary' : ''} ${plantRec.isRecommended ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                onClick={() => {
                  const currentPlants = answer.split(',').map(p => p.trim()).filter(Boolean);
                  const isSelected = currentPlants.includes(plantRec.plant.name);
                  
                  if (isSelected) {
                    setAnswer(currentPlants.filter(p => p !== plantRec.plant.name).join(', '));
                  } else {
                    setAnswer([...currentPlants, plantRec.plant.name].join(', '));
                  }
                }}
              >
                <div className="flex items-start space-x-2">
                  <input 
                    type="checkbox" 
                    className="mt-1"
                    checked={answer.includes(plantRec.plant.name)}
                    onChange={() => {}} // Handled by parent div onClick
                    onClick={e => e.stopPropagation()}
                  />
                  <div className="flex-1">
                    <div className="font-medium dark:text-white">{plantRec.plant.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {plantRec.plant.location.address} ({plantRec.distance} miles)
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Transport cost: ~${plantRec.transportCost.toFixed(2)}
                    </div>
                    {plantRec.isRecommended && plantRec.reasonForRecommendation && (
                      <div className="text-xs text-primary mt-1">
                        {plantRec.reasonForRecommendation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Budget Input Component */}
      {showBudgetInput && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">What's your budget for these materials?</h3>
          <div className="relative">
            <span className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500">$</span>
            <input
              type="text"
              value={answer}
              onChange={(e) => {
                // Only allow numbers, commas, and decimal point
                const value = e.target.value.replace(/[^0-9,.]/g, '');
                setAnswer(value);
              }}
              className="w-full p-2 pl-6 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter amount"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[5000, 10000, 25000, 50000, 100000, 250000].map((amount) => (
              <button
                key={amount}
                type="button"
                className={`p-2 border border-gray-200 dark:border-gray-700 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-700 ${answer === amount.toString() ? 'bg-primary/10 border-primary' : ''}`}
                onClick={() => setAnswer(amount.toString())}
              >
                ${amount.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Customer Info Form */}
      {showCustomerInfoForm && (
        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Full name"
              value={answer.split('|||')[0] || ''}
              onChange={(e) => {
                const parts = answer.split('|||');
                parts[0] = e.target.value;
                setAnswer(parts.join('|||'));
              }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company (optional)</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Company name"
              value={answer.split('|||')[1] || ''}
              onChange={(e) => {
                const parts = answer.split('|||');
                parts[1] = e.target.value;
                // Ensure array has correct length
                while (parts.length < 3) parts.push('');
                setAnswer(parts.join('|||'));
              }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Information</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Email or phone number"
              value={answer.split('|||')[2] || ''}
              onChange={(e) => {
                const parts = answer.split('|||');
                parts[2] = e.target.value;
                // Ensure array has correct length
                while (parts.length < 3) parts.push('');
                setAnswer(parts.join('|||'));
              }}
            />
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Text input for answering questions */}
        {!showMaterialOptions && !showPlantOptions && !showBudgetInput && !showCustomerInfoForm && (
          <div>
            {/* Delivery Location - Address and Date */}
            {stepType === StepType.DELIVERY_LOCATION ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Delivery Address
                  </label>
                  <textarea
                    ref={textareaRef}
                    value={answer.split('|||')[0] || ''}
                    onChange={(e) => {
                      const parts = answer.split('|||');
                      parts[0] = e.target.value;
                      // Ensure array has correct length
                      while (parts.length < 2) parts.push('');
                      setAnswer(parts.join('|||'));
                    }}
                    className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter the delivery address..."
                    rows={3}
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Preferred Delivery Date
                  </label>
                  <input
                    type="date"
                    value={answer.split('|||')[1] || ''}
                    onChange={(e) => {
                      const parts = answer.split('|||');
                      parts[1] = e.target.value;
                      // Ensure array has correct length
                      while (parts.length < 2) parts.push('');
                      setAnswer(parts.join('|||'));
                    }}
                    className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    min={new Date().toISOString().split('T')[0]} // Today or later
                    disabled={isLoading}
                  />
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Please provide the full delivery address and your preferred delivery date.
                </div>
              </div>
            ) : (
              <textarea
                ref={textareaRef}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Type your answer here..."
                rows={3}
                disabled={isLoading}
              />
            )}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-3 items-center">
            <VoiceInputButton />
            
            {hasPrevious && (
              <button
                type="button"
                onClick={onPrevious}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                disabled={isLoading}
              >
                Back
              </button>
            )}
          </div>
          
          <button
            type="submit"
            className={`px-5 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading || (!answer.trim() && stepType !== StepType.CONFIRMATION)}
          >
            {isLoading ? 'Processing...' : (stepType === StepType.CONFIRMATION ? 'Complete Quote' : 'Next')}
          </button>
        </div>
      </form>
        </>
      )}
    </div>
  );
}