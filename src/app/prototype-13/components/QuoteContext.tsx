'use client';

import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';
import { 
  QuoteRequest, Material, PlantRecommendation, 
  ClaudeResponse, StepType, QuestionHistory 
} from '../types';

// MobX Store for quote data
class QuoteStore {
  // Quote Data
  quoteRequest: QuoteRequest = {
    status: 'draft',
    exceedsBudget: false,
    createdAt: new Date().toISOString(),
    materials: [],
    plantSelections: [],
    deliveryInfo: {
      location: {
        address: '',
      }
    }
  };

  // UI State
  currentQuestion: string = 'What\'s your name and contact information?';
  currentStepType: StepType = StepType.CUSTOMER_INFO;
  isLoading: boolean = false;
  quoteComplete: boolean = false;
  useClaudeAPI: boolean = true; // Enable Claude API by default
  questionHistory: QuestionHistory[] = [];

  // Recommendations
  recommendedMaterials: Material[] = [];
  recommendedPlants: PlantRecommendation[] = [];

  // Previously completed quotes
  generatedQuotes: QuoteRequest[] = [];

  constructor() {
    makeAutoObservable(this);
    
    // Load saved quotes from localStorage if available
    if (typeof window !== 'undefined') {
      try {
        const savedQuotes = localStorage.getItem('generatedQuotes');
        if (savedQuotes) {
          this.generatedQuotes = JSON.parse(savedQuotes);
        }
      } catch (error) {
        console.warn('Could not load quotes from local storage:', error);
      }
    }
  }

  // Setters for state updates
  setQuoteRequest(quote: Partial<QuoteRequest>) {
    this.quoteRequest = { ...this.quoteRequest, ...quote };
  }

  setCurrentQuestion(question: string) {
    this.currentQuestion = question;
  }

  setCurrentStepType(stepType: StepType) {
    this.currentStepType = stepType;
  }

  setIsLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setQuoteComplete(complete: boolean) {
    this.quoteComplete = complete;
  }

  setUseClaudeAPI(useAPI: boolean) {
    this.useClaudeAPI = useAPI;
  }

  setRecommendedMaterials(materials: Material[]) {
    this.recommendedMaterials = materials;
  }

  setRecommendedPlants(plants: PlantRecommendation[]) {
    this.recommendedPlants = plants;
  }

  addToQuestionHistory(history: QuestionHistory) {
    this.questionHistory.push(history);
  }

  // Go back to the previous question
  goToPreviousQuestion() {
    if (this.questionHistory.length === 0) return;

    // Remove the last question from history
    const prevQuestion = this.questionHistory.pop();
    if (!prevQuestion) return;

    // Go back to the previous step type
    this.currentStepType = prevQuestion.stepType;
    
    // Restore the previous question
    this.currentQuestion = prevQuestion.question;
  }

  // Complete the quote and save it
  completeQuote() {
    // Mark as complete
    this.quoteComplete = true;
    
    // Add a unique ID and timestamp
    const completeQuote: QuoteRequest = {
      ...this.quoteRequest,
      id: this.generateQuoteId(),
      createdAt: new Date().toISOString(),
      status: 'submitted'
    };
    
    // Update the current quote
    this.quoteRequest = completeQuote;
    
    // Add to generated quotes
    this.generatedQuotes.push(completeQuote);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('generatedQuotes', JSON.stringify(this.generatedQuotes));
      } catch (error) {
        console.warn('Error saving quote to local storage:', error);
      }
    }
  }

  // Reset the store for a new quote
  resetStore() {
    this.quoteRequest = {
      status: 'draft',
      exceedsBudget: false,
      createdAt: new Date().toISOString(),
      materials: [],
      plantSelections: [],
      deliveryInfo: {
        location: {
          address: '',
        }
      }
    };
    
    this.currentQuestion = 'What\'s your name and contact information?';
    this.currentStepType = StepType.CUSTOMER_INFO;
    this.quoteComplete = false;
    this.questionHistory = [];
    this.recommendedMaterials = [];
    this.recommendedPlants = [];
  }

  // Process Claude's response
  processClaudeResponse(response: ClaudeResponse) {
    // Update the current question and step type
    this.currentQuestion = response.question;
    
    // Update quote type, expertise level, and project summary from the API
    
    // First, handle the project info
    if (this.quoteRequest.project) {
      let projectUpdates: Partial<Project> = {};
      let updatedProject = false;
      
      // Update project type if provided
      if (response.quote_type) {
        const oldType = this.quoteRequest.project.projectType;
        console.log(`Updating quote type from API: "${oldType}" -> "${response.quote_type}"`);
        projectUpdates.projectType = response.quote_type;
        updatedProject = true;
      }
      
      // Update project summary if provided
      if (response.project_summary && !this.quoteRequest.project.summary) {
        console.log(`Adding project summary from API: "${response.project_summary}"`);
        projectUpdates.summary = response.project_summary;
        updatedProject = true;
      }
      
      // Apply project updates if needed
      if (updatedProject) {
        this.quoteRequest.project = {
          ...this.quoteRequest.project,
          ...projectUpdates
        };
      }
    } else if (response.quote_type && this.currentStepType !== StepType.CUSTOMER_INFO) {
      // Create project if it doesn't exist and we're not in customer info step
      console.log(`Adding quote type from API: "${response.quote_type}"`);
      // Only add quote type, don't create a fake description or project
    }
    
    // Update expertise level if customer exists and API provides it,
    // but ONLY if we're past customer info step (i.e., when project info is provided)
    if (this.quoteRequest.customer && response.expertise_level && this.currentStepType !== StepType.CUSTOMER_INFO) {
      // Only update if it's different to avoid unnecessary logs
      if (this.quoteRequest.customer.expertiseLevel !== response.expertise_level) {
        console.log(`Updating expertise level from API: "${this.quoteRequest.customer.expertiseLevel}" -> "${response.expertise_level}"`);
        this.quoteRequest.customer = {
          ...this.quoteRequest.customer,
          expertiseLevel: response.expertise_level
        };
      }
    }
    
    // Map component type to valid StepType
    const componentType = response.componentType;
    
    // Validate the component type and map it to our StepType enum
    if (Object.values(StepType).includes(componentType as StepType)) {
      this.currentStepType = componentType as StepType;
    } else {
      // Define step sequence for reliable transitions
      const stepOrder = [
        StepType.CUSTOMER_INFO,
        StepType.PROJECT_INFO,
        StepType.MATERIAL_SELECTION,
        StepType.DELIVERY_LOCATION,
        StepType.BUDGET,
        StepType.PLANT_SELECTION,
        StepType.CONFIRMATION
      ];
      
      // Map text fields or other values to appropriate step types
      switch (componentType) {
        case 'text':
          // Determine the next step based on the current one
          const currentIndex = stepOrder.indexOf(this.currentStepType);
          if (currentIndex >= 0 && currentIndex < stepOrder.length - 1) {
            // Move to the next step in the sequence
            this.currentStepType = stepOrder[currentIndex + 1];
            console.log(`Advancing to next step: ${this.currentStepType}`);
          } else {
            // If we can't determine the current step, pick a reasonable default
            this.currentStepType = StepType.DELIVERY_LOCATION;
            console.warn(`Could not determine next step from ${this.currentStepType}, defaulting to ${StepType.DELIVERY_LOCATION}`);
          }
          break;
        case 'options':
          // Map options component to the appropriate step type
          if (this.recommendedMaterials.length > 0) {
            this.currentStepType = StepType.MATERIAL_SELECTION;
          } else if (response.plants && response.plants.length > 0) {
            this.currentStepType = StepType.PLANT_SELECTION;
          }
          break;
        default:
          console.warn(`Unknown component type: ${componentType}, using current step type: ${this.currentStepType}`);
          // Keep the current step type as fallback
          break;
      }
    }
    
    console.log(`Mapped component type ${componentType} to step type ${this.currentStepType}`);

    // Update materials if provided
    if (response.materials && response.materials.length > 0) {
      this.recommendedMaterials = response.materials.map(material => ({
        id: material.id,
        name: material.name,
        category: material.category,
        unit: material.unit,
        basePrice: material.basePrice,
        description: material.description || `${material.name} for construction projects`,
        commonUses: material.commonUses || ['Construction'],
        recommendedQuantity: material.recommendedQuantity
      }));
    }

    // Update plants if provided
    if (response.plants && response.plants.length > 0) {
      const plantRecommendations = response.plants.map((plantInfo, index) => {
        // Create a complete plant object with the info we have
        const plant = {
          id: plantInfo.id || `plant-${index + 1}`, // Ensure we have an ID
          name: plantInfo.name,
          location: {
            address: plantInfo.location?.address || `${plantInfo.name} location`,
            coordinates: plantInfo.location?.coordinates || { 
              lat: 30.26 + (Math.random() - 0.5) * 2, 
              lng: -97.74 + (Math.random() - 0.5) * 2 
            }
          },
          materials: Array.isArray(plantInfo.materials) ? plantInfo.materials : [
            {
              materialId: this.quoteRequest.materials?.[0]?.materialId || 'default-material',
              availability: 'high' as const,
              priceMultiplier: 1.0
            }
          ],
          transportCostPerMile: plantInfo.transportCostPerMile || 4.50,
          minDeliveryDistance: plantInfo.minDeliveryDistance || 0,
          maxDeliveryDistance: plantInfo.maxDeliveryDistance || 75,
          tollZones: plantInfo.tollZones || []
        };
        
        // Determine which plants should be recommended
        const isRecommended = index === 0 || index === 1; // Make the first two recommended by default
        const reasons = [
          'Cost-effective option for your materials',
          'Closest supplier to your delivery location',
          'Best availability for your requested materials',
          'Specialized in the materials you need'
        ];
        
        // Calculate more realistic transport cost based on plant's transportCostPerMile 
        // and delivery location vs plant location
        const userCoordinates = this.quoteRequest.deliveryInfo?.location?.coordinates;
        const plantCoordinates = plant.location.coordinates;
        
        // Calculate rough distance using coordinates if available
        let distance = 30; // Default distance
        if (userCoordinates && plantCoordinates) {
          // Simple distance calculation (not accurate for long distances but good enough for demo)
          const latDiff = Math.abs(userCoordinates.lat - plantCoordinates.lat);
          const lngDiff = Math.abs(userCoordinates.lng - plantCoordinates.lng);
          // Roughly 69 miles per degree of latitude/longitude (simplified)
          distance = Math.floor(Math.sqrt(latDiff*latDiff + lngDiff*lngDiff) * 69);
        } else {
          // Random but reasonable distance 
          distance = Math.floor(20 + Math.random() * 80); // 20-100 miles
        }
        
        const transportCost = distance * plant.transportCostPerMile;
        
        // Return the complete plant recommendation
        return {
          plant,
          materials: this.quoteRequest.materials?.map(m => m.materialId) || [],
          distance,
          transportCost,
          isRecommended,
          reasonForRecommendation: isRecommended ? reasons[Math.floor(Math.random() * reasons.length)] : undefined
        };
      });
      
      // Log the plant info for debugging
      console.log('Plants from Claude API:', response.plants);
      console.log('Processed plant recommendations:', plantRecommendations);
      
      this.recommendedPlants = plantRecommendations;
    }

    // Removed duplicate cost calculation

    // If confirmation step, complete the quote
    if (response.componentType === StepType.CONFIRMATION) {
      this.completeQuote();
    }
    
    // Update costs if provided
    if (response.costs) {
      this.updateCostFromClaudeResponse(response.costs);
    }
  }
  
  // Update cost information from Claude API response
  updateCostFromClaudeResponse(costs: any) {
    if (!costs) return;
    
    // Create material costs array
    const materialCosts = (this.quoteRequest.materials || []).map(material => {
      // Find the material details
      const materialDetail = this.recommendedMaterials.find(m => m.id === material.materialId) || {
        name: material.materialId.replace(/-/g, ' '),
        basePrice: 50
      };
      
      const unitCost = materialDetail.basePrice || 50;
      const totalCost = unitCost * material.quantity;
      
      return {
        materialId: material.materialId,
        name: materialDetail.name || material.materialId
          .replace(/-/g, ' ')
          .split(' ')
          .map(word => word ? word.charAt(0).toUpperCase() + word.slice(1) : '')
          .join(' '),
        quantity: material.quantity,
        unitCost,
        totalCost
      };
    });
    
    // Create transportation costs array
    const transportationCosts = (this.quoteRequest.plantSelections || []).map((plant, index) => {
      return {
        plantId: plant.plantId,
        plantName: this.recommendedPlants[index]?.plant.name || `Plant ${index + 1}`,
        distance: this.recommendedPlants[index]?.distance || 30,
        cost: (costs.transport_cost || 0) / Math.max(1, this.quoteRequest.plantSelections?.length || 1)
      };
    });
    
    // Get toll costs from Claude or use default
    const tollCosts = costs.toll_cost || 0;
    const additionalFees = 250; // Fixed additional fees
    
    // Get total cost from Claude or calculate
    const totalCost = costs.total_cost || 
                     (costs.materials || 0) + (costs.transport_cost || 0) + (costs.toll_cost || 0) + additionalFees;
    
    // Check if exceeds budget
    const exceedsBudget = this.quoteRequest.deliveryInfo?.budget !== undefined && 
                          totalCost > this.quoteRequest.deliveryInfo.budget;
    
    const costBreakdown = {
      materialCosts,
      transportationCosts,
      tollCosts,
      additionalFees,
      totalCost,
      exceedsBudget
    };

    // Update the quote request with cost breakdown
    this.quoteRequest = {
      ...this.quoteRequest,
      costBreakdown,
      exceedsBudget
    };
  }

  // Generate a unique quote ID
  private generateQuoteId(): string {
    const timestamp = new Date().getTime().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 5);
    return `QR-${timestamp}-${randomStr}`.toUpperCase();
  }
}

// Create React Context with MobX store
const QuoteStoreContext = createContext<QuoteStore | null>(null);

// Custom hook for accessing the store
export function useQuoteStore() {
  const store = useContext(QuoteStoreContext);
  if (!store) {
    throw new Error('useQuoteStore must be used within a QuoteStoreProvider');
  }
  return store;
}

// Create a singleton store instance
let storeInstance: QuoteStore;

// Provider component that creates the store instance
export function QuoteStoreProvider({ children }: { children: React.ReactNode }) {
  // Create or reuse the store instance
  if (!storeInstance) {
    storeInstance = new QuoteStore();
  }
  
  return (
    <QuoteStoreContext.Provider value={storeInstance}>
      {children}
    </QuoteStoreContext.Provider>
  );
}