// Define types for the comprehensive quote system

// Plant information
export interface Plant {
  id: string;
  name: string;
  location: string;
  distance: number; // distance in miles from delivery location
  availableProducts: string[]; // product IDs that this plant can provide
  availableTrucks: string[]; // truck types available at this plant
  capacity: number; // production capacity in tons per day
  operatingHours: string; // e.g., "Mon-Fri: 7AM-5PM"
  specialCapabilities?: string[]; // special manufacturing capabilities
  certifications?: string[]; // quality certifications
  contactInfo?: {
    phone: string;
    email: string;
  };
}

// Base product (raw material) information
export interface BaseProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  unitOfMeasure: string;
  basePrice: number;
  minOrderQuantity: number;
  properties?: {
    [key: string]: string | number | boolean;
  };
  image?: string;
}

// Material mix component
export interface MaterialComponent {
  baseProductId: string;
  proportion: number; // percentage (0-100)
  isOptional: boolean;
}

// Mixed/composite product information
export interface CompositeProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  unitOfMeasure: string;
  basePrice: number;
  minOrderQuantity: number;
  components: MaterialComponent[];
  mixProperties?: {
    [key: string]: string | number | boolean;
  };
  image?: string;
}

// Product type union
export type Product = BaseProduct | CompositeProduct;

// Function to determine if a product is composite
export function isCompositeProduct(product: Product): product is CompositeProduct {
  return 'components' in product;
}

// Truck/delivery vehicle information
export interface Truck {
  id: string;
  type: string;
  description: string;
  capacity: number;
  costPerMile: number;
  minCost: number;
  specialFeatures?: string[];
  restrictions?: string[];
  availabilityCalendar?: {
    [date: string]: number; // date to count of available trucks
  };
  image?: string;
}

// Weather information affecting delivery
export interface WeatherCondition {
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy' | 'stormy';
  description: string;
  potentialDelay: number; // additional hours of delay
  riskLevel: 'low' | 'medium' | 'high';
  impact: {
    onMaterials?: string;
    onDelivery?: string;
    onInstallation?: string;
  };
}

// Sector type
export type Sector = 'public' | 'private' | 'government' | 'residential' | 'commercial' | 'industrial';

// Project type
export type ProjectType = 'new_construction' | 'renovation' | 'maintenance' | 'infrastructure' | 'landscaping' | 'other';

// Customer information
export interface Customer {
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  address?: string;
  previousOrders?: string[]; // IDs of previous orders
  paymentTerms?: string;
  preferredPlants?: string[]; // IDs of preferred plants
}

// AI conversation message
export interface AIMessage {
  role: 'ai' | 'user';
  content: string;
  timestamp: Date;
  context?: {
    detectedIntent?: string;
    confidence?: number;
    extractedData?: Record<string, any>;
  };
}

// AI conversation state
export interface AIConversationState {
  messages: AIMessage[];
  currentQuestion: string;
  extractedData: Partial<QuoteRequest>;
  completedTopics: string[];
  confidence: number;
  suggestedNextSteps: string[];
}

// Input mode preference
export type InputMode = 'ai_conversation' | 'manual_form';

// Quote request details
export interface QuoteRequest {
  // Basic quote information
  projectName: string;
  projectDescription: string;
  expirationDate?: Date; // When the quote should expire
  desiredDeliveryDate?: Date;
  projectType: ProjectType;
  
  // Input mode used to create
  inputMode: InputMode;
  aiConversation?: AIConversationState;
  
  // Sector information
  sector: Sector;
  isGovernmentContract: boolean;
  requiresPermits: boolean;
  
  // Customer information
  customer: Customer;
  
  // Plant and product information
  selectedPlantId?: string;
  selectedPlantIds?: string[]; // for multiple plant selection 
  alternativePlantIds?: string[]; // backup plants if primary is unavailable
  
  // Materials/products requested
  products: {
    productId: string;
    quantity: number;
    sourcePlantId?: string; // which plant will be sourcing this product
    specialInstructions?: string;
    customMixAdjustments?: { // for composite products
      componentId: string;
      adjustedProportion: number;
    }[];
  }[];
  
  // Delivery information
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    specialInstructions?: string;
    accessLimitations?: string;
    siteContactName?: string;
    siteContactPhone?: string;
  };
  preferredDeliveryTimeWindow?: {
    startHour: number;
    endHour: number;
  };
  multipleDeliveries?: {
    count: number;
    schedule: {
      date: Date;
      percentageOfTotal: number;
    }[];
  };
  
  // Budget information
  budgetRange?: {
    min: number;
    max: number;
  };
  
  // Additional options
  requestsSamples: boolean;
  requestsConsultation: boolean;
  needsInstallation: boolean;
  
  // Miscellaneous
  additionalComments?: string;
  referralSource?: string;
  tags?: string[]; // For categorization and searching
}

// Generated quote
export interface GeneratedQuote {
  id: string;
  requestId: string;
  dateCreated: Date;
  expirationDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  
  // Original request data
  request: QuoteRequest;
  
  // Quote response details
  selectedPlant: Plant;
  
  // Product pricing
  products: {
    product: Product;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    availabilityDate: Date;
    specialInstructions?: string;
    customMixDetails?: {
      componentName: string;
      originalProportion: number;
      adjustedProportion: number;
      impact: string;
    }[];
  }[];
  
  // Delivery details
  delivery: {
    truck: Truck;
    estimatedDistance: number;
    transportCost: number;
    estimatedDeliveryDate: Date;
    weatherCondition?: WeatherCondition;
    tollFees: number;
    fuelSurcharge: number;
    multipleDeliverySchedule?: {
      date: Date;
      percentage: number;
      cost: number;
    }[];
  };
  
  // Additional costs
  additionalCosts: {
    description: string;
    amount: number;
  }[];
  
  // Pricing summary
  subtotal: number;
  taxes: number;
  total: number;
  
  // Contract terms
  paymentTerms: string;
  cancellationPolicy: string;
  
  // Approval information
  approvedBy?: string;
  approvalDate?: Date;
  
  // Alternate options (if requested)
  alternateOptions?: {
    description: string;
    costDifference: number;
    timelineDifference: number; // in days
    availabilityImpact: string;
    qualityImpact: string;
  }[];
  
  // AI generated recommendations
  aiRecommendations?: {
    title: string;
    description: string;
    potentialSavings?: number;
    potentialTimelineImprovement?: number;
    confidence: number;
  }[];
}