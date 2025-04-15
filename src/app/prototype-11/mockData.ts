import { 
  Plant, 
  Product, 
  BaseProduct,
  CompositeProduct,
  Truck, 
  WeatherCondition,
  MaterialComponent
} from './types';

// Type guard to check if a product is a composite product
export const isCompositeProduct = (product: Product): product is CompositeProduct => {
  return 'components' in product;
};

// Generate a large number of plants for realistic scale
const generatePlants = (count: number): Plant[] => {
  const baseLocations = [
    { city: 'Philadelphia', state: 'PA' },
    { city: 'Camden', state: 'NJ' },
    { city: 'Chester', state: 'PA' },
    { city: 'West Chester', state: 'PA' },
    { city: 'Trenton', state: 'NJ' },
    { city: 'King of Prussia', state: 'PA' },
    { city: 'Wilmington', state: 'DE' },
    { city: 'Allentown', state: 'PA' },
    { city: 'Reading', state: 'PA' },
    { city: 'York', state: 'PA' },
  ];
  
  const plantNamePrefixes = [
    'North', 'South', 'East', 'West', 'Central', 'Metro', 'River', 'Valley', 'Mountain', 'Peak',
    'United', 'American', 'National', 'Regional', 'Global', 'Premier', 'Elite', 'Standard', 'Quality',
    'Capital', 'Liberty', 'Pioneer', 'Heritage', 'Legacy', 'Frontier', 'Landmark', 'Summit', 'Horizon'
  ];
  
  const plantNameSuffixes = [
    'Materials', 'Aggregate', 'Construction Supply', 'Building Materials', 'Concrete', 'Stone',
    'Resources', 'Industries', 'Products', 'Supplies', 'Solutions', 'Contractors', 'Builders',
    'Manufacturing', 'Distribution', 'Services', 'Supply Chain', 'Logistics', 'Trading'
  ];
  
  const certifications = [
    'ISO 9001', 'ISO 14001', 'ASTM Certified', 'LEED Compatible', 'Green Seal', 'OSHA Compliant',
    'DOT Approved', 'EPA Compliant', 'USACE Certified', 'State DOT Approved', 'Energy Star Partner'
  ];
  
  const specialCapabilities = [
    'Custom Mix Design', 'Color Additives', 'Accelerated Curing', 'Cold Weather Processing',
    'High Volume Production', 'Specialty Materials Handling', 'Remote Site Delivery',
    'Just-in-Time Delivery', 'Sustainable Materials', 'Recycled Content Processing',
    'High-Performance Mixtures', 'Waterproof Additives', 'Fiber Reinforcement'
  ];
  
  // Generate plants array
  const plants: Plant[] = [];
  for (let i = 0; i < count; i++) {
    const locationIndex = i % baseLocations.length;
    const location = baseLocations[locationIndex];
    
    const prefixIndex = Math.floor(Math.random() * plantNamePrefixes.length);
    const suffixIndex = Math.floor(Math.random() * plantNameSuffixes.length);
    
    // Create a more varied set of available products
    const availableProductCount = 5 + Math.floor(Math.random() * 15); // Between 5 and 20 products
    const availableProducts: string[] = [];
    for (let j = 0; j < availableProductCount; j++) {
      const productId = `prod-${String(Math.floor(Math.random() * 100)).padStart(3, '0')}`;
      if (!availableProducts.includes(productId)) {
        availableProducts.push(productId);
      }
    }
    
    // Create a varied set of available trucks
    const availableTruckCount = 2 + Math.floor(Math.random() * 4); // Between 2 and 5 truck types
    const availableTrucks: string[] = [];
    for (let j = 0; j < availableTruckCount; j++) {
      const truckId = `truck-${String(j % 10 + 1).padStart(3, '0')}`;
      if (!availableTrucks.includes(truckId)) {
        availableTrucks.push(truckId);
      }
    }
    
    // Generate a random set of certifications
    const certCount = Math.floor(Math.random() * 4);
    const plantCertifications: string[] = [];
    for (let j = 0; j < certCount; j++) {
      const certIndex = Math.floor(Math.random() * certifications.length);
      const cert = certifications[certIndex];
      if (!plantCertifications.includes(cert)) {
        plantCertifications.push(cert);
      }
    }
    
    // Generate a random set of special capabilities
    const capCount = Math.floor(Math.random() * 5);
    const plantCapabilities: string[] = [];
    for (let j = 0; j < capCount; j++) {
      const capIndex = Math.floor(Math.random() * specialCapabilities.length);
      const cap = specialCapabilities[capIndex];
      if (!plantCapabilities.includes(cap)) {
        plantCapabilities.push(cap);
      }
    }
    
    // Calculate a realistic distance
    const distance = 5 + Math.random() * 45; // Between 5 and 50 miles
    
    plants.push({
      id: `plant-${String(i + 1).padStart(3, '0')}`,
      name: `${plantNamePrefixes[prefixIndex]} ${suffixIndex % 3 === 0 ? location.city : ''} ${plantNameSuffixes[suffixIndex]}`,
      location: `${1000 + Math.floor(Math.random() * 9000)} ${['Industry Dr', 'Quarry Rd', 'Materials Way', 'Production Ave', 'Distribution Blvd'][i % 5]}, ${location.city}, ${location.state}`,
      distance: parseFloat(distance.toFixed(1)),
      availableProducts,
      availableTrucks,
      capacity: 100 + Math.floor(Math.random() * 900), // Between 100 and 1000 tons per day
      operatingHours: Math.random() > 0.3 ? 'Mon-Fri: 7AM-5PM' : 'Mon-Sat: 6AM-6PM',
      specialCapabilities: plantCapabilities.length > 0 ? plantCapabilities : undefined,
      certifications: plantCertifications.length > 0 ? plantCertifications : undefined,
      contactInfo: {
        phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        email: `info@${plantNamePrefixes[prefixIndex].toLowerCase()}${plantNameSuffixes[suffixIndex].toLowerCase().replace(/\s+/g, '')}.com`
      }
    });
  }
  
  return plants;
};

// Generate a large set of base products
const generateBaseProducts = (count: number): BaseProduct[] => {
  const baseProducts: BaseProduct[] = [
    {
      id: 'prod-001',
      name: 'Ready-Mix Concrete',
      description: 'Standard ready-mix concrete suitable for foundations, slabs, and general construction.',
      category: 'Concrete',
      unitOfMeasure: 'cubic yard',
      basePrice: 125.00,
      minOrderQuantity: 1,
      properties: {
        compressionStrength: '3000 PSI',
        slump: '4-6 inches',
        mixDesign: 'Standard',
        cureTime: '28 days'
      },
      image: '/concrete.jpg'
    },
    {
      id: 'prod-002',
      name: 'High-Strength Concrete',
      description: 'High PSI concrete mix for heavy-duty applications and structural components.',
      category: 'Concrete',
      unitOfMeasure: 'cubic yard',
      basePrice: 145.00,
      minOrderQuantity: 1,
      properties: {
        compressionStrength: '5000 PSI',
        slump: '3-5 inches',
        mixDesign: 'High-Strength',
        cureTime: '28 days'
      },
      image: '/high-strength-concrete.jpg'
    },
    {
      id: 'prod-003',
      name: 'Crushed Stone 3/4"',
      description: '3/4-inch crushed stone aggregate for driveways, drainage, and base layers.',
      category: 'Aggregate',
      unitOfMeasure: 'ton',
      basePrice: 35.00,
      minOrderQuantity: 5,
      properties: {
        size: '3/4 inch',
        angularity: 'High',
        hardness: 'Medium',
        color: 'Gray'
      },
      image: '/crushed-stone.jpg'
    },
    {
      id: 'prod-004',
      name: 'Mason Sand',
      description: 'Fine mason sand for mortar, concrete, and masonry applications.',
      category: 'Sand',
      unitOfMeasure: 'ton',
      basePrice: 45.00,
      minOrderQuantity: 5,
      properties: {
        size: 'Fine',
        texture: 'Smooth',
        color: 'Tan',
        moisture: 'Low'
      },
      image: '/mason-sand.jpg'
    },
    {
      id: 'prod-005',
      name: 'Construction Gravel',
      description: 'Mixed gravel for construction projects, driveways, and landscaping.',
      category: 'Aggregate',
      unitOfMeasure: 'ton',
      basePrice: 32.00,
      minOrderQuantity: 5,
      properties: {
        size: 'Mixed',
        angularity: 'Medium',
        hardness: 'Medium',
        color: 'Mixed'
      },
      image: '/construction-gravel.jpg'
    },
    {
      id: 'prod-006',
      name: 'Reinforced Steel Beams',
      description: 'Standard I-beams for structural support in construction projects.',
      category: 'Steel',
      unitOfMeasure: 'foot',
      basePrice: 18.50,
      minOrderQuantity: 20,
      properties: {
        type: 'I-Beam',
        grade: 'A36',
        strength: 'High',
        corrosionResistance: 'Standard'
      },
      image: '/steel-beams.jpg'
    },
    {
      id: 'prod-007',
      name: 'Asphalt Mix',
      description: 'Hot mix asphalt for road construction and paving applications.',
      category: 'Asphalt',
      unitOfMeasure: 'ton',
      basePrice: 95.00,
      minOrderQuantity: 10,
      properties: {
        type: 'Hot Mix',
        aggregateSize: 'Standard',
        bitumenContent: 'Medium',
        application: 'Roads'
      },
      image: '/asphalt.jpg'
    },
    {
      id: 'prod-008',
      name: 'Construction Lumber',
      description: 'Pressure-treated lumber for construction framing and general building.',
      category: 'Lumber',
      unitOfMeasure: 'board foot',
      basePrice: 4.75,
      minOrderQuantity: 100,
      properties: {
        treatment: 'Pressure-Treated',
        grade: 'Construction',
        species: 'Pine',
        moisture: 'Kiln-Dried'
      },
      image: '/lumber.jpg'
    },
    {
      id: 'prod-009',
      name: 'Erosion Control Stone',
      description: 'Large stones for erosion control in water management projects.',
      category: 'Aggregate',
      unitOfMeasure: 'ton',
      basePrice: 42.00,
      minOrderQuantity: 10,
      properties: {
        size: 'Large',
        angularity: 'High',
        hardness: 'High',
        application: 'Erosion Control'
      },
      image: '/erosion-control.jpg'
    },
    {
      id: 'prod-010',
      name: 'Road Base Material',
      description: 'Compactable aggregate mix designed for road base construction.',
      category: 'Aggregate',
      unitOfMeasure: 'ton',
      basePrice: 28.50,
      minOrderQuantity: 20,
      properties: {
        type: 'Crushed',
        compaction: 'High',
        drainage: 'Good',
        application: 'Road Base'
      },
      image: '/road-base.jpg'
    }
  ];
  
  // Add additional products to reach the desired count
  const categories = ['Concrete', 'Aggregate', 'Sand', 'Steel', 'Asphalt', 'Lumber', 'Brick', 'Cement', 'Clay', 'Stone'];
  const unitMeasures = ['cubic yard', 'ton', 'foot', 'square foot', 'cubic foot', 'each', 'pallet', 'bag'];
  
  for (let i = baseProducts.length; i < count; i++) {
    const category = categories[i % categories.length];
    const unitOfMeasure = unitMeasures[Math.floor(Math.random() * unitMeasures.length)];
    const basePrice = 10 + Math.random() * 150;
    const minOrderQuantity = Math.max(1, Math.floor(Math.random() * 20));
    
    let properties: Record<string, string | number | boolean> = {};
    
    // Add category-specific properties
    switch (category) {
      case 'Concrete':
        properties = {
          compressionStrength: `${2000 + Math.floor(Math.random() * 5000)} PSI`,
          slump: `${2 + Math.floor(Math.random() * 6)} inches`,
          mixDesign: ['Standard', 'High-Strength', 'Fast-Setting', 'Self-Consolidating', 'Fiber-Reinforced'][Math.floor(Math.random() * 5)],
          cureTime: `${7 + Math.floor(Math.random() * 21)} days`
        };
        break;
      case 'Aggregate':
        properties = {
          size: [`${Math.floor(Math.random() * 3) + 1}/4 inch`, 'Fine', 'Coarse', 'Mixed', 'Custom'][Math.floor(Math.random() * 5)],
          angularity: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          hardness: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          color: ['Gray', 'Tan', 'Brown', 'White', 'Mixed'][Math.floor(Math.random() * 5)]
        };
        break;
      case 'Asphalt':
        properties = {
          type: ['Hot Mix', 'Cold Mix', 'Warm Mix', 'Recycled', 'Rubberized'][Math.floor(Math.random() * 5)],
          aggregateSize: ['Fine', 'Medium', 'Coarse', 'Custom'][Math.floor(Math.random() * 4)],
          bitumenContent: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          application: ['Roads', 'Driveways', 'Parking Lots', 'Patching'][Math.floor(Math.random() * 4)]
        };
        break;
      // Additional cases can be added for other categories
    }
    
    baseProducts.push({
      id: `prod-${String(i + 1).padStart(3, '0')}`,
      name: `${category} ${['Mix', 'Blend', 'Material', 'Supply', 'Product'][Math.floor(Math.random() * 5)]} Type ${String.fromCharCode(65 + (i % 26))}`,
      description: `Quality ${category.toLowerCase()} material for construction and building projects.`,
      category,
      unitOfMeasure,
      basePrice: parseFloat(basePrice.toFixed(2)),
      minOrderQuantity,
      properties,
      image: `/${category.toLowerCase().replace(/\s+/g, '-')}.jpg`
    });
  }
  
  return baseProducts;
};

// Generate composite products (mixtures of base materials)
const generateCompositeProducts = (baseProducts: BaseProduct[], count: number): CompositeProduct[] => {
  const compositeProducts: CompositeProduct[] = [];
  
  const mixTypes = [
    'Standard Blend', 'Premium Mix', 'Custom Blend', 'Special Formula', 'Professional Grade',
    'High-Performance', 'Economy Mix', 'Contractor Grade', 'Industrial Strength', 'Specialty Mix'
  ];
  
  for (let i = 0; i < count; i++) {
    // Determine how many components this mix will have (2-5)
    const componentCount = 2 + Math.floor(Math.random() * 4);
    
    // Select random base products for components
    const components: MaterialComponent[] = [];
    const usedProductIds: string[] = [];
    
    for (let j = 0; j < componentCount; j++) {
      // Keep selecting until we find a product not already used
      let productId = '';
      let attempts = 0;
      
      while (attempts < 20) {
        const randomIndex = Math.floor(Math.random() * baseProducts.length);
        const candidate = baseProducts[randomIndex].id;
        
        if (!usedProductIds.includes(candidate)) {
          productId = candidate;
          usedProductIds.push(productId);
          break;
        }
        
        attempts++;
      }
      
      // If we couldn't find a unique one after multiple attempts, just use any
      if (!productId) {
        productId = baseProducts[Math.floor(Math.random() * baseProducts.length)].id;
      }
      
      // Determine proportion - total should add up to close to 100%
      let proportion = 0;
      if (j === componentCount - 1) {
        // Last component - calculate to make total 100%
        const currentTotal = components.reduce((sum, comp) => sum + comp.proportion, 0);
        proportion = 100 - currentTotal;
      } else {
        // For all but the last component, assign a random portion of the remaining percentage
        const remainingPercentage = 100 - components.reduce((sum, comp) => sum + comp.proportion, 0);
        const maxAllocation = remainingPercentage / (componentCount - j);
        proportion = Math.max(5, Math.min(maxAllocation, 5 + Math.floor(Math.random() * (maxAllocation - 5))));
      }
      
      components.push({
        baseProductId: productId,
        proportion,
        isOptional: j >= componentCount - 1 && Math.random() > 0.7 // Make some components optional
      });
    }
    
    // Calculate base price based on components
    let basePrice = 0;
    for (const component of components) {
      const product = baseProducts.find(p => p.id === component.baseProductId);
      if (product) {
        basePrice += (product.basePrice * (component.proportion / 100));
      }
    }
    
    // Add a premium for the mixing process
    basePrice = basePrice * (1 + (Math.random() * 0.3)); // 0-30% premium
    
    // Determine the dominant component for naming
    let dominantComponentId = components[0].baseProductId;
    let maxProportion = components[0].proportion;
    
    for (const component of components) {
      if (component.proportion > maxProportion) {
        maxProportion = component.proportion;
        dominantComponentId = component.baseProductId;
      }
    }
    
    const dominantProduct = baseProducts.find(p => p.id === dominantComponentId);
    const mixType = mixTypes[Math.floor(Math.random() * mixTypes.length)];
    
    const compositeName = dominantProduct 
      ? `${dominantProduct.category} ${mixType} ${String.fromCharCode(65 + (i % 26))}`
      : `Custom ${mixType} ${String.fromCharCode(65 + (i % 26))}`;
    
    compositeProducts.push({
      id: `mix-${String(i + 1).padStart(3, '0')}`,
      name: compositeName,
      description: `Custom ${dominantProduct ? dominantProduct.category.toLowerCase() : ''} mixture designed for optimal performance in various construction applications.`,
      category: dominantProduct ? dominantProduct.category : 'Custom Mix',
      unitOfMeasure: dominantProduct ? dominantProduct.unitOfMeasure : 'ton',
      basePrice: parseFloat(basePrice.toFixed(2)),
      minOrderQuantity: Math.max(1, Math.floor(Math.random() * 10)),
      components,
      mixProperties: {
        mixType: ['Ready-to-Use', 'Requires Activation', 'Pre-Blended', 'Custom Blend'][Math.floor(Math.random() * 4)],
        specialAdditive: Math.random() > 0.7,
        qualityGrade: ['Standard', 'Premium', 'Economy', 'Professional', 'Industrial'][Math.floor(Math.random() * 5)],
        shelfLife: `${1 + Math.floor(Math.random() * 24)} months`
      },
      image: dominantProduct ? dominantProduct.image : `/custom-mix-${i % 5 + 1}.jpg`
    });
  }
  
  return compositeProducts;
};

// Mock Plants Data - Generate 100 plants to simulate scale
export const PLANTS: Plant[] = generatePlants(100).slice(0, 100);

// Base products - core building blocks
export const BASE_PRODUCTS: BaseProduct[] = generateBaseProducts(50);

// Composite products - mixtures of base products
export const COMPOSITE_PRODUCTS: CompositeProduct[] = generateCompositeProducts(BASE_PRODUCTS, 50);

// Combine all products into one collection
export const PRODUCTS: Product[] = [...BASE_PRODUCTS, ...COMPOSITE_PRODUCTS];

// Mock Trucks Data
export const TRUCKS: Truck[] = [
  {
    id: 'truck-001',
    type: 'Concrete Mixer',
    description: 'Standard concrete mixer truck for transporting ready-mix concrete.',
    capacity: 10, // cubic yards
    costPerMile: 4.50,
    minCost: 150.00,
    specialFeatures: ['Rotating Drum', 'Water Tank', 'Washout System'],
    restrictions: ['Limited to concrete products', 'Not suitable for dry materials'],
    image: '/mixer-truck.jpg'
  },
  {
    id: 'truck-002',
    type: 'Dump Truck',
    description: 'Standard dump truck for aggregate, sand, and loose materials.',
    capacity: 16, // tons
    costPerMile: 3.75,
    minCost: 125.00,
    specialFeatures: ['Heated Bed', 'Tarp Cover', 'Rear and Side Dump Options'],
    image: '/dump-truck.jpg'
  },
  {
    id: 'truck-003',
    type: 'Flatbed Truck',
    description: 'Flatbed truck for lumber, steel, and palletized materials.',
    capacity: 24, // tons
    costPerMile: 3.25,
    minCost: 135.00,
    specialFeatures: ['Extendable Bed', 'Stake Sides Option', 'Loading Ramp'],
    restrictions: ['Not suitable for loose materials'],
    image: '/flatbed-truck.jpg'
  },
  {
    id: 'truck-004',
    type: 'Heavy Hauler',
    description: 'Heavy-duty truck for oversized and large-volume materials.',
    capacity: 35, // tons
    costPerMile: 5.25,
    minCost: 225.00,
    specialFeatures: ['High Capacity', 'Multi-axle Configuration', 'Special Permits Included'],
    restrictions: ['Requires 48-hour advance booking', 'May require route survey'],
    image: '/heavy-hauler.jpg'
  },
  {
    id: 'truck-005',
    type: 'Specialty Transport',
    description: 'Specialized transport for sensitive or precisely manufactured materials.',
    capacity: 18, // tons
    costPerMile: 4.75,
    minCost: 195.00,
    specialFeatures: ['Climate Control', 'Air-ride Suspension', 'GPS Tracking'],
    restrictions: ['Limited availability', 'Special handling requirements'],
    image: '/specialty-transport.jpg'
  },
  {
    id: 'truck-006',
    type: 'Tanker Truck',
    description: 'Liquid material transport vehicle for water, chemicals, and liquid cement.',
    capacity: 6000, // gallons
    costPerMile: 4.95,
    minCost: 175.00,
    specialFeatures: ['Insulated Tank', 'Pump System', 'Chemical Resistant Lining'],
    restrictions: ['Liquids only', 'Hazmat certification required for some materials'],
    image: '/tanker-truck.jpg'
  },
  {
    id: 'truck-007',
    type: 'Boom Truck',
    description: 'Delivery truck with crane for materials placement on multi-story sites.',
    capacity: 12, // tons
    costPerMile: 5.50,
    minCost: 250.00,
    specialFeatures: ['80ft Boom Reach', 'Precision Placement', 'Remote Control Operation'],
    restrictions: ['Requires site assessment', 'Space required for outriggers'],
    image: '/boom-truck.jpg'
  },
  {
    id: 'truck-008',
    type: 'Pneumatic Bulk Tanker',
    description: 'Specialized tanker for powder materials like cement and fly ash.',
    capacity: 25, // tons
    costPerMile: 4.25,
    minCost: 185.00,
    specialFeatures: ['Pressurized Unloading', 'Self-contained Blower', 'Dust Collection System'],
    restrictions: ['Dry powder materials only', 'Requires compressed air source at some sites'],
    image: '/pneumatic-tanker.jpg'
  },
  {
    id: 'truck-009',
    type: 'Roll-Off Truck',
    description: 'Delivers and picks up large containers for bulk material disposal or delivery.',
    capacity: 30, // tons
    costPerMile: 3.80,
    minCost: 140.00,
    specialFeatures: ['Multiple Container Sizes', 'Quick Loading/Unloading', 'Versatile Application'],
    restrictions: ['Requires flat, stable ground for placement'],
    image: '/roll-off-truck.jpg'
  },
  {
    id: 'truck-010',
    type: 'Volumetric Mixer',
    description: 'Mobile concrete batch plant that mixes materials on-site for precise specifications.',
    capacity: 10, // cubic yards per hour
    costPerMile: 6.75,
    minCost: 325.00,
    specialFeatures: ['On-site Mixing', 'Custom Mix Design', 'Reduced Waste'],
    restrictions: ['Requires space for setup', 'Premium pricing', 'Limited daily volume'],
    image: '/volumetric-mixer.jpg'
  }
];

// Mock Weather Conditions
export const WEATHER_CONDITIONS: WeatherCondition[] = [
  {
    condition: 'sunny',
    description: 'Clear skies, no anticipated weather delays.',
    potentialDelay: 0,
    riskLevel: 'low',
    impact: {
      onMaterials: 'No impact on material quality.',
      onDelivery: 'No delivery delays expected.',
      onInstallation: 'Ideal conditions for installation.'
    }
  },
  {
    condition: 'cloudy',
    description: 'Overcast with light chance of precipitation.',
    potentialDelay: 0.5,
    riskLevel: 'low',
    impact: {
      onMaterials: 'No significant impact on material quality.',
      onDelivery: 'Minimal delivery delays possible.',
      onInstallation: 'Suitable conditions for most installation activities.'
    }
  },
  {
    condition: 'rainy',
    description: 'Moderate rain expected. May slow delivery and impact unloading.',
    potentialDelay: 2,
    riskLevel: 'medium',
    impact: {
      onMaterials: 'Some materials may require covering during unloading.',
      onDelivery: 'Slower transport speeds and potential road delays.',
      onInstallation: 'Certain installation processes may need to be postponed.'
    }
  },
  {
    condition: 'snowy',
    description: 'Snow accumulation expected. Road conditions may be hazardous.',
    potentialDelay: 4,
    riskLevel: 'high',
    impact: {
      onMaterials: 'Cold-sensitive materials may require special handling.',
      onDelivery: 'Significant delays due to slow road speeds and limited access.',
      onInstallation: 'Many installation activities may need to be rescheduled.'
    }
  },
  {
    condition: 'windy',
    description: 'High winds forecasted. May impact delivery of certain materials.',
    potentialDelay: 1.5,
    riskLevel: 'medium',
    impact: {
      onMaterials: 'Lightweight materials require secure anchoring.',
      onDelivery: 'Possible delays for high-profile vehicles.',
      onInstallation: 'Installation of sheet materials and insulation may be affected.'
    }
  },
  {
    condition: 'stormy',
    description: 'Severe weather conditions. Significant delays possible.',
    potentialDelay: 6,
    riskLevel: 'high',
    impact: {
      onMaterials: 'Materials will require secure storage and protection.',
      onDelivery: 'Major delays likely; deliveries may be rescheduled.',
      onInstallation: 'Most outdoor installation activities will be postponed.'
    }
  }
];

// AI conversation message templates for simulating an AI assistant
export const AI_QUESTIONS = [
  {
    topic: 'project_basics',
    questions: [
      "Could you tell me a bit about your project? What are you building or renovating?",
      "What's the timeline for your project? When do you need materials delivered?",
      "Can you estimate the size of your project in square feet or acres?",
      "Is this a new construction, renovation, or maintenance project?"
    ],
    followUps: [
      "Thanks for sharing that. What's your estimated timeline for completion?",
      "That's helpful. Do you have any specific deadlines we should be aware of?",
      "Got it. Are there any particular challenges with this project I should know about?"
    ]
  },
  {
    topic: 'material_needs',
    questions: [
      "What specific materials are you looking for? Please list the main ones you need.",
      "Do you know the approximate quantities of materials you'll need?",
      "Are you looking for any specialty or custom materials for this project?",
      "Do you have any specific material quality requirements or certifications needed?"
    ],
    followUps: [
      "I see you need {material}. Do you know how much you'll need?",
      "For the {material}, do you have any specific grade or quality requirements?",
      "Would you be interested in seeing some alternative options for {material} that might save cost?"
    ]
  },
  {
    topic: 'delivery_requirements',
    questions: [
      "Where will these materials need to be delivered?",
      "Are there any site access limitations we should know about?",
      "Do you need all materials delivered at once, or would you prefer a phased delivery schedule?",
      "Are there specific times of day that work best for deliveries at your site?"
    ],
    followUps: [
      "Thanks for the address. Are there any special instructions for the delivery driver?",
      "Is there adequate space for a large delivery truck at the site?",
      "Would you need assistance with unloading, or will you have equipment on-site?"
    ]
  },
  {
    topic: 'project_specifics',
    questions: [
      "Is this project for residential, commercial, or industrial use?",
      "Is this a government or public works project?",
      "Will this project require any special permits for materials?",
      "Are there any environmental considerations or certifications needed for this project?"
    ],
    followUps: [
      "For {project_type} projects, are you working with an architect or engineer?",
      "Does this project have any sustainable or green building requirements?",
      "Are there any specific regulations you need the materials to comply with?"
    ]
  },
  {
    topic: 'budget_planning',
    questions: [
      "Do you have a budget range for the materials portion of this project?",
      "Are you looking for premium quality materials or more budget-friendly options?",
      "Would you be interested in learning about bulk pricing options?",
      "How important is price versus delivery speed for your project?"
    ],
    followUps: [
      "Would you like me to suggest some ways to optimize your material costs?",
      "Are there specific materials where you'd prioritize quality over cost?",
      "Would you like information about financing options for larger orders?"
    ]
  }
];

// Sample responses based on intent detection in AI conversation
export const AI_RESPONSE_TEMPLATES = {
  project_description: "Thanks for sharing details about your {project_type} project. Based on what you've told me, I'll recommend appropriate materials that would work well for {project_description}.",
  
  material_recommendation: "For {project_type} projects like yours, I'd recommend {material_name} which offers {benefit}. This is particularly well-suited for {application}.",
  
  quantity_calculation: "Based on your project dimensions of {dimensions}, I estimate you'll need approximately {quantity} {unit} of {material_name}.",
  
  delivery_confirmation: "I've noted your delivery address in {location}. The closest plant would be {plant_name}, approximately {distance} miles away.",
  
  weather_advisory: "I should mention that the forecast for your delivery date shows {weather_condition}, which might {impact}. Would you like to consider an alternative date?",
  
  budget_guidance: "Based on your budget range, I recommend focusing on {recommendation}. This would optimize your spending while meeting your project requirements.",
  
  alternative_suggestion: "You might also consider {alternative_material} as an alternative to {original_material}. It {comparison} and could {benefit}."
};

// Extract common patterns from user input
export const extractProjectInfo = (text: string) => {
  // Extract project type
  const projectTypePatterns = [
    { regex: /new\s+(?:construction|build|building|home|house|structure)/i, type: 'new_construction' },
    { regex: /renovat(?:e|ing|ion)/i, type: 'renovation' },
    { regex: /repair|maintenance|fixing|updating/i, type: 'maintenance' },
    { regex: /infrastructure|road|highway|bridge|public/i, type: 'infrastructure' },
    { regex: /landscap(?:e|ing)|yard|garden|outdoor/i, type: 'landscaping' }
  ];
  
  let projectType: string | null = null;
  for (const pattern of projectTypePatterns) {
    if (pattern.regex.test(text)) {
      projectType = pattern.type;
      break;
    }
  }
  
  // Extract sector
  const sectorPatterns = [
    { regex: /residential|home|house|apartment|condo/i, sector: 'residential' },
    { regex: /commercial|office|retail|store|restaurant|business/i, sector: 'commercial' },
    { regex: /industrial|factory|manufacturing|warehouse|plant/i, sector: 'industrial' },
    { regex: /government|public|municipal|city|state|federal/i, sector: 'government' }
  ];
  
  let sector: string | null = null;
  for (const pattern of sectorPatterns) {
    if (pattern.regex.test(text)) {
      sector = pattern.sector;
      break;
    }
  }
  
  // Extract timeline
  const timelineRegex = /(?:need|deliver|complete|finish)(?:ed)?\s+(?:by|before|within|in)\s+(\d+)?\s*(days?|weeks?|months?)|(?:by|before)\s+(January|February|March|April|May|June|July|August|September|October|November|December)/i;
  const timelineMatch = text.match(timelineRegex);
  const timeline = timelineMatch ? timelineMatch[0] : null;
  
  return {
    projectType: projectType || 'other',
    sector: sector || 'private',
    timeline,
    confidence: projectType && sector ? 0.8 : (projectType || sector ? 0.5 : 0.3)
  };
};

// Extract material information from text
export const extractMaterialInfo = (text: string) => {
  const materials: { name: string; quantity?: string; unit?: string }[] = [];
  
  // Common construction materials
  const materialPatterns = [
    { regex: /concrete|cement/i, name: 'concrete' },
    { regex: /lumber|wood|timber/i, name: 'lumber' },
    { regex: /brick|masonry/i, name: 'brick' },
    { regex: /steel|metal/i, name: 'steel' },
    { regex: /asphalt|blacktop/i, name: 'asphalt' },
    { regex: /sand|aggregate|gravel|stone/i, name: 'aggregate' }
  ];
  
  // Check for materials mentioned
  for (const pattern of materialPatterns) {
    if (pattern.regex.test(text)) {
      const material = { name: pattern.name };
      materials.push(material);
    }
  }
  
  // Look for quantity mentions
  for (let i = 0; i < materials.length; i++) {
    const material = materials[i];
    const quantityRegex = new RegExp(`(\\d+(?:\\.\\d+)?)[\\s-]*(cubic\\s*yards?|tons?|yards?|feet|foot|gallons?|bags?|pieces?)\\s*(?:of\\s*)?${material.name}`, 'i');
    const match = text.match(quantityRegex);
    
    if (match) {
      materials[i] = {
        ...material,
        quantity: match[1],
        unit: match[2]
      };
    }
  }
  
  return {
    materials,
    confidence: materials.length > 0 ? Math.min(0.8, 0.4 + (materials.length * 0.1)) : 0.2
  };
};

// Get product by ID helper function
export const getProductById = (id: string | number): Product | undefined => {
  // If id is a number, convert it to prod-XXX format
  const formattedId = typeof id === 'number' ? `prod-${String(id).padStart(3, '0')}` : id;
  return PRODUCTS.find(product => product.id === formattedId);
};

// Get base product by ID
export const getBaseProductById = (id: string | number): BaseProduct | undefined => {
  // If id is a number, convert it to prod-XXX format
  const formattedId = typeof id === 'number' ? `prod-${String(id).padStart(3, '0')}` : id;
  return BASE_PRODUCTS.find(product => product.id === formattedId);
};

// Get plant by ID helper function
export const getPlantById = (id: string | number): Plant | undefined => {
  // If id is a number, convert it to plant-XXX format
  const formattedId = typeof id === 'number' ? `plant-${String(id).padStart(3, '0')}` : id;
  return PLANTS.find(plant => plant.id === formattedId);
};

// Get truck by ID helper function
export const getTruckById = (id: string | number): Truck | undefined => {
  // If id is a number, convert it to truck-XXX format
  const formattedId = typeof id === 'number' ? `truck-${String(id).padStart(3, '0')}` : id;
  return TRUCKS.find(truck => truck.id === formattedId);
};

// Get products available at a specific plant
export const getProductsForPlant = (plantId: string | number): Product[] => {
  const plant = getPlantById(plantId);
  if (!plant) return [];
  
  return PRODUCTS.filter(product => {
    // For base products, check if directly available
    if (!isCompositeProduct(product)) {
      return plant.availableProducts.includes(product.id);
    }
    
    // For composite products, check if all required components are available
    const requiredComponents = product.components.filter(comp => !comp.isOptional);
    return requiredComponents.every(comp => 
      plant.availableProducts.includes(comp.baseProductId)
    );
  });
};

// Search for products by name, description, or category
export const searchProducts = (query: string): Product[] => {
  if (!query || query.trim() === '') return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(normalizedQuery) ||
    product.description.toLowerCase().includes(normalizedQuery) ||
    product.category.toLowerCase().includes(normalizedQuery)
  );
};

// Search for plants by name, location, or capabilities
export const searchPlants = (query: string): Plant[] => {
  if (!query || query.trim() === '') return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return PLANTS.filter(plant => 
    plant.name.toLowerCase().includes(normalizedQuery) ||
    plant.location.toLowerCase().includes(normalizedQuery) ||
    (plant.specialCapabilities && 
      plant.specialCapabilities.some(cap => cap.toLowerCase().includes(normalizedQuery)))
  );
};

// Find nearest plants to a location (simplified simulation)
export const findNearestPlants = (zipCode: string, limit = 5): Plant[] => {
  // This is a simulation - in a real system, we'd use geocoding and distance calculations
  // For now, we'll use a pseudo-random but deterministic approach based on the zip code
  
  // Convert zip to a number that we'll use to "seed" our sort
  const zipSum = zipCode.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  
  // Create a sorted copy of plants with a distance calculation influenced by the zip
  const sortedPlants = [...PLANTS].map(plant => ({
    ...plant,
    // Adjust the existing distance by a factor derived from the zip code
    distance: plant.distance * (0.5 + ((zipSum % 10) / 10))
  })).sort((a, b) => a.distance - b.distance);
  
  return sortedPlants.slice(0, limit);
};

// Get trucks available at a specific plant
export const getTrucksForPlant = (plantId: string): Truck[] => {
  const plant = getPlantById(plantId);
  if (!plant) return [];
  
  return TRUCKS.filter(truck => plant.availableTrucks.includes(truck.id));
};

// Get random weather condition
export const getRandomWeatherCondition = (): WeatherCondition => {
  const randomIndex = Math.floor(Math.random() * WEATHER_CONDITIONS.length);
  return WEATHER_CONDITIONS[randomIndex];
};

// Calculate total cost for a product order
export const calculateProductCost = (productId: string, quantity: number): number => {
  const product = getProductById(productId);
  if (!product) return 0;
  
  // Apply volume discounts
  let priceMultiplier = 1.0;
  if (quantity > 100) priceMultiplier = 0.85;
  else if (quantity > 50) priceMultiplier = 0.9;
  else if (quantity > 20) priceMultiplier = 0.95;
  
  return product.basePrice * quantity * priceMultiplier;
};

// Calculate delivery cost based on truck, distance and weather
export const calculateDeliveryCost = (
  truckId: string, 
  distance: number, 
  weather: WeatherCondition
): { transportCost: number; tollFees: number; fuelSurcharge: number; } => {
  const truck = getTruckById(truckId);
  if (!truck) {
    return { transportCost: 0, tollFees: 0, fuelSurcharge: 0 };
  }
  
  // Calculate base transport cost
  const baseCost = Math.max(truck.minCost, distance * truck.costPerMile);
  
  // Calculate weather-related surcharge
  const weatherMultiplier = 1 + (weather.potentialDelay / 10); // 10% increase per hour of delay
  
  // Add toll fees (simplified calculation)
  const tollFees = distance > 20 ? Math.floor(distance / 10) * 5 : 0;
  
  // Add fuel surcharge
  const fuelSurcharge = baseCost * 0.08; // 8% fuel surcharge
  
  // Final transport cost with weather adjustment
  const transportCost = baseCost * weatherMultiplier;
  
  return {
    transportCost,
    tollFees,
    fuelSurcharge
  };
};

// Calculate the cost of a composite product based on its components
export const calculateCompositeCost = (product: CompositeProduct, quantity: number): { 
  basePrice: number; 
  mixingFee: number; 
  components: { name: string; proportion: number; cost: number; }[];
} => {
  if (!isCompositeProduct(product)) {
    throw new Error('Not a composite product');
  }
  
  let totalComponentCost = 0;
  const componentDetails = [];
  
  for (const component of product.components) {
    const baseProduct = getBaseProductById(component.baseProductId);
    if (baseProduct) {
      const proportion = component.proportion / 100;
      const componentCost = baseProduct.basePrice * proportion * quantity;
      totalComponentCost += componentCost;
      
      componentDetails.push({
        name: baseProduct.name,
        proportion: component.proportion,
        cost: componentCost
      });
    }
  }
  
  // Calculate mixing fee (typically 15-25% of component costs)
  const mixingFee = totalComponentCost * 0.2; // 20% mixing fee
  
  return {
    basePrice: totalComponentCost,
    mixingFee,
    components: componentDetails
  };
};

// Find optimal plant based on product needs and delivery location
export const findOptimalPlant = (
  productIds: string[], 
  zipCode: string
): { plant: Plant; availability: { productId: string; available: boolean }[]; score: number } | null => {
  // Get nearest plants
  const nearestPlants = findNearestPlants(zipCode, 10);
  
  if (nearestPlants.length === 0) return null;
  
  // Calculate a score for each plant based on availability and distance
  const plantScores = nearestPlants.map(plant => {
    // Check availability of each product
    const availability = productIds.map(productId => ({
      productId,
      available: plant.availableProducts.includes(productId)
    }));
    
    // Count how many of the products are available
    const availableCount = availability.filter(a => a.available).length;
    
    // Calculate score: higher is better
    // Weigh availability higher than distance
    const availabilityScore = availableCount / productIds.length * 70;
    const distanceScore = (50 - Math.min(plant.distance, 50)) / 50 * 30;
    
    return {
      plant,
      availability,
      score: availabilityScore + distanceScore
    };
  });
  
  // Sort by score (higher is better)
  plantScores.sort((a, b) => b.score - a.score);
  
  // Return the best option
  return plantScores[0] || null;
};

// Get available delivery dates based on plant and product availability
export const getAvailableDeliveryDates = (plantId: string, productIds: string[]): Date[] => {
  // In a real system, this would check actual inventory and schedule
  // For our simulation, we'll generate dates starting tomorrow
  const dates: Date[] = [];
  const today = new Date();
  
  // Generate 10 available dates
  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    // Add between 1 and 14 days
    date.setDate(date.getDate() + 1 + Math.floor(Math.random() * 14));
    // Skip weekends
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push(date);
    }
  }
  
  // Sort chronologically
  return dates.sort((a, b) => a.getTime() - b.getTime());
};