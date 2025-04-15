export interface Customer {
  name: string;
  company?: string;
  contactInfo: string;
  expertiseLevel: 'beginner' | 'intermediate' | 'expert';
}

export interface Project {
  description: string;
  projectType: string;
  summary?: string;
  equipment?: string;
  timeline?: string;
}

export interface DeliveryInfo {
  location: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  preferredDate?: string;
  budget?: number;
}

export interface MaterialRequest {
  materialId: string;
  quantity: number;
}

export interface PlantSelection {
  plantId: string;
  materialIds: string[];
}

export interface CostBreakdown {
  materialCosts: {
    materialId: string;
    name: string;
    quantity: number;
    unitCost: number;
    totalCost: number;
  }[];
  transportationCosts: {
    plantId: string;
    plantName: string;
    distance: number;
    cost: number;
  }[];
  tollCosts: number;
  additionalFees: number;
  totalCost: number;
  exceedsBudget?: boolean;
}

export interface QuoteRequest {
  id?: string;
  customer?: Customer;
  project?: Project;
  materials?: MaterialRequest[];
  deliveryInfo?: DeliveryInfo;
  plantSelections?: PlantSelection[];
  costBreakdown?: CostBreakdown;
  createdAt?: string;
  status?: 'draft' | 'submitted' | 'approved' | 'rejected';
  exceedsBudget?: boolean;
}

export interface Material {
  id: string;
  name: string;
  category: string;
  unit: string;
  basePrice: number;
  description: string;
  commonUses: string[];
  recommendedQuantity?: number;
}

export interface Plant {
  id: string;
  name: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  materials: {
    materialId: string;
    availability: 'high' | 'medium' | 'low';
    priceMultiplier: number;
  }[];
  transportCostPerMile: number;
  minDeliveryDistance: number;
  maxDeliveryDistance: number;
  tollZones: string[];
}

export interface PlantRecommendation {
  plant: Plant;
  materials: string[];
  distance: number;
  transportCost: number;
  isRecommended: boolean;
  reasonForRecommendation?: string;
}

// Material categories and types for different project types
export const MaterialCategories = {
  AGGREGATE: 'Aggregate',
  CONCRETE: 'Concrete',
  ASPHALT: 'Asphalt',
  REINFORCEMENT: 'Reinforcement',
  DRAINAGE: 'Drainage',
  MASONRY: 'Masonry'
} as const;

export const MaterialUnits = {
  TON: 'ton',
  CUBIC_YARD: 'cubic yard',
  LINEAR_FOOT: 'linear ft',
  EACH: 'each',
  SQUARE_FOOT: 'square ft'
} as const;

export const ProjectTypes = {
  ROAD: 'Road Construction',
  HIGHWAY: 'Highway Construction',
  BRIDGE: 'Bridge Construction',
  BUILDING: 'Building Construction',
  RESIDENTIAL: 'Residential Construction',
  COMMERCIAL: 'Commercial Construction',
  FOUNDATION: 'Foundation Work',
  DRIVEWAY: 'Driveway Construction',
  PARKING: 'Parking Area Construction',
  DRAINAGE: 'Drainage System',
  WALL: 'Wall Construction',
  SIDEWALK: 'Sidewalk Construction',
  GENERAL: 'General Construction'
} as const;

export interface ClaudeResponse {
  question: string;
  componentType: string;
  materials?: {
    id: string;
    name: string;
    category: string;
    unit: string;
    basePrice: number;
    description?: string;
    commonUses?: string[];
    recommendedQuantity: number;
  }[];
  plants?: {
    id: string;
    name: string;
    location: {
      address: string;
      coordinates?: {
        lat: number;
        lng: number;
      };
    };
    transportCostPerMile?: number;
    minDeliveryDistance?: number;
    maxDeliveryDistance?: number;
    tollZones?: string[];
    materials?: {
      materialId: string;
      availability: 'high' | 'medium' | 'low';
      priceMultiplier: number;
    }[];
  }[];
  quote_type?: string;
  expertise_level?: 'beginner' | 'intermediate' | 'expert';
  project_summary?: string;
  costs?: {
    materials?: number;
    transport_cost?: number;
    toll_cost?: number;
    total_cost?: number;
  };
}

export enum StepType {
  CUSTOMER_INFO = 'customer_info',
  PROJECT_INFO = 'project_info',
  MATERIAL_SELECTION = 'material_selection',
  DELIVERY_LOCATION = 'delivery_location',
  BUDGET = 'budget',
  PLANT_SELECTION = 'plant_selection',
  CONFIRMATION = 'confirmation'
}

export interface QuestionHistory {
  id: string;
  question: string;
  answer: string;
  stepType: StepType;
}