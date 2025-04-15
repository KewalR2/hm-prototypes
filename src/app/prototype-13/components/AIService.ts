import { 
  QuoteRequest, ClaudeResponse, StepType, Material, 
  PlantRecommendation 
} from '../types';

/**
 * Generate the structured prompt for Claude based on current state
 */
export function generateClaudePrompt(
  currentStepType: StepType,
  quoteRequest: QuoteRequest,
  selectedMaterials: Material[] = [],
  selectedPlants: PlantRecommendation[] = []
): string {
  // Format the current state as JSON for Claude
  const customerInfo = quoteRequest.customer 
    ? JSON.stringify({
        name: quoteRequest.customer.name,
        contact: quoteRequest.customer.contactInfo,
        company: quoteRequest.customer.company,
        expertiseLevel: quoteRequest.customer.expertiseLevel
      })
    : 'Data Not Provided';

  const projectInfo = quoteRequest.project
    ? JSON.stringify({
        desc: quoteRequest.project.description,
        type: quoteRequest.project.projectType
      })
    : 'Data Not Provided';

  const materialSelection = selectedMaterials.length > 0
    ? JSON.stringify({
        materials: selectedMaterials.map(material => ({
          id: material.id,
          name: material.name,
          category: material.category,
          unit: material.unit,
          recommendedQuantity: material.recommendedQuantity
        }))
      })
    : 'Data Not Provided';

  const deliveryLocation = quoteRequest.deliveryInfo?.location?.address
    ? JSON.stringify({
        delivery: quoteRequest.deliveryInfo.location.address,
        coordinates: quoteRequest.deliveryInfo.location.coordinates
      })
    : 'Data Not Provided';

  const budget = quoteRequest.deliveryInfo?.budget
    ? JSON.stringify({
        budget: `$${quoteRequest.deliveryInfo.budget}`
      })
    : 'Data Not Provided';

  const plantSelection = selectedPlants.length > 0
    ? JSON.stringify({
        plants: selectedPlants.map(plant => ({
          id: plant.plant.id,
          name: plant.plant.name,
          location: plant.plant.location,
          transportCostPerMile: plant.plant.transportCostPerMile,
          materials: plant.plant.materials
        }))
      })
    : 'Data Not Provided';

  // Helper function to check if object has content
  const isEmptyObj = (inp: string): boolean => inp !== 'Data Not Provided';

  // Create the prompt based on Postman example
  return `
You are an AI assistant helping with a heavy construction materials quote request system.
OUTPUT Format:
You MUST output ONLY JSON in this EXACT format:
{
    "question": "Keep questions short. Only include essential information.", 
    "componentType": "${currentStepType}", // MUST be one of: "customer_info", "project_info", "material_selection", "delivery_location", "budget", "plant_selection", "confirmation"
    "materials": [], // Provide only when we are in material_selection step otherwise skip
    "plants": [], // Provide only when we are in plant_selection step otherwise skip
    "quote_type": "ALWAYS INCLUDE with specific project type like 'Highway Construction', 'Road Construction', 'Bridge Construction', etc.",
    "expertise_level": "ONLY analyze expertise level AFTER customer provides project_info, never during customer_info step. Valid values are: 'beginner', 'intermediate', or 'expert'",
    "project_summary": "When project_info is provided, include a 1-2 sentence technical summary of the project",
    "costs": {}, // Provide only when we have selected materials and plants otherwise skip
}

POPULATION FORMAT:

materials[]:
Each object must follow this format:
{
    "id": "material-id",
    "name": "Material Name",
    "category": "Category",
    "unit": "Unit",
    "basePrice": 50,
    "description": "Brief description of the material",
    "commonUses": ["Road base", "Foundation fill"],
    "recommendedQuantity": 100,
    "preferredPlantId": "plant-id" // OPTIONAL: For specific plant recommendation
}

plants[]:
Each object must follow this format:
{
    "id": "plant-id",
    "name": "Plant Name", // Must be descriptive and professional (e.g. "Northeast Concrete Supply")
    "location": {
        "address": "Physical address",
        "coordinates": {
            "lat": 30.0,
            "lng": -97.0
        }
    },
    "transportCostPerMile": 5,
    "minDeliveryDistance": 0,
    "maxDeliveryDistance": 100,
    "tollZones": [],
    "truckInfo": { // NEW: Include truck information
        "vehicleType": "Heavy Duty", // e.g. "Heavy Duty", "Light Duty", "Crane Truck"
        "plateNumber": "TR-1234", // A realistic truck identifier
        "driverContact": "555-123-4567" // Driver's contact number
    },
    "deliveryVerification": { // NEW: Include delivery verification info
        "otp": "123456", // A 6-digit OTP code for verification
        "instructions": "Share OTP with driver upon delivery"
    },
    "materials": [
        {
            "materialId": "material-id",
            "availability": "high",
            "priceMultiplier": 1.0
        }
    ]
}

costs{}:
{
    "materials": number, // calculate material's price based on selected entries
    "transport_cost": number, // Generate Realtime value
    "toll_cost": number,  // Generate Realtime value
    "total_cost": number,  // Generate Realtime value
}

MANDATORY SEQUENCE (never skip or reorder):
1. customer_info → Ask: "What's your name and contact information?" (componentType MUST be "customer_info")
2. project_info → Ask: "Can you describe what you are trying to build?" (componentType MUST be "project_info")
3. material_selection → IMMEDIATELY after project_info is answered, respond with recommended materials. Do NOT ask. Use this question: "Based on your [project type], here are the recommended materials. Are there any additional materials you need?" (componentType MUST be "material_selection")
4. delivery_location → Ask: "Where and when should we deliver these materials? Please include your preferred delivery date." (componentType MUST be "delivery_location")
5. budget → Ask: "What's your budget for this project?" (componentType MUST be "budget")
6. plant_selection → IMPORTANT: Do NOT assign all materials to all plants. Each plant should specialize in specific materials only. Include truck and delivery verification info for each plant. Keep the question short and direct. (componentType MUST be "plant_selection")
7. confirmation → Final message: "Thank you. Your quote has been generated and can be viewed in the sidebar." (componentType MUST be "confirmation")

STATE:
1. customer_info: ${isEmptyObj(customerInfo) ? customerInfo : 'Data Not Provided'}
2. project_info: ${isEmptyObj(projectInfo) ? projectInfo : 'Data Not Provided'}
3. material_selection: ${isEmptyObj(materialSelection) ? materialSelection : 'Data Not Provided'}
4. delivery_location: ${isEmptyObj(deliveryLocation) ? deliveryLocation : 'Data Not Provided'}
5. budget: ${isEmptyObj(budget) ? budget : 'Data Not Provided'}
6. plant_selection: ${isEmptyObj(plantSelection) ? plantSelection : 'Data Not Provided'}
`.trim();
}

/**
 * Call the Claude API with the current state to get the next question
 */
export async function callClaudeAPI(
  currentStepType: StepType,
  quoteRequest: QuoteRequest,
  selectedMaterials: Material[] = [],
  selectedPlants: PlantRecommendation[] = []
): Promise<ClaudeResponse> {
  try {
    const prompt = generateClaudePrompt(
      currentStepType,
      quoteRequest,
      selectedMaterials,
      selectedPlants
    );
    
    const response = await fetch('/api/claude', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    
    if (!response.ok) {
      throw new Error(`API response error: ${response.status}`);
    }
    
    const data = await response.json();
    let claudeResponse: ClaudeResponse;
    
    try {
      // Try to safely parse Claude's response as JSON with error handling
      try {
        // Check if the response is incomplete JSON
        const responseText = data.text.trim();
        let jsonText = responseText;
        
        // Check if the JSON is incomplete (missing closing brackets)
        const openBraces = (responseText.match(/{/g) || []).length;
        const closeBraces = (responseText.match(/}/g) || []).length;
        
        if (openBraces > closeBraces) {
          console.warn('Detected incomplete JSON response, attempting to fix');
          // Attempt to fix by adding missing closing braces
          jsonText = responseText + '}'.repeat(openBraces - closeBraces);
        }
        
        claudeResponse = JSON.parse(jsonText);
      } catch (innerError) {
        console.error('Error parsing JSON even after repair attempt', innerError);
        throw new Error('Invalid JSON response from Claude API');
      }
      
      // Validate required fields
      if (!claudeResponse.question || !claudeResponse.componentType) {
        throw new Error('Invalid response format: missing question or componentType');
      }
      
      // Log the response for debugging
      console.log('Claude response:', claudeResponse);
      
      // Validate componentType - it should be one of our step types or a valid UI type
      const validComponentTypes = [
        ...Object.values(StepType),
        'text',
        'options',
        'customer_component',
        'project_info_component'
      ];
      
      if (!validComponentTypes.includes(claudeResponse.componentType as any)) {
        console.warn(`Unrecognized componentType "${claudeResponse.componentType}" in Claude response, might cause routing issues`);
      }
    } catch (parseError) {
      // If parsing fails, log the error and rethrow
      console.error('Failed to parse Claude response as JSON:', parseError);
      console.error('Raw response:', data.text);
      throw new Error(`Failed to parse Claude response: ${parseError.message}`);
    }
    
    return claudeResponse;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

// Removed hardcoded fallback response since we handle this in the main page component

/**
 * Process the user's answer and update the quote request
 */
export function processAnswer(
  stepType: StepType,
  answer: string,
  quoteRequest: QuoteRequest,
  recommendedMaterials: Material[] = []
): Partial<QuoteRequest> {
  const updatedQuote = { ...quoteRequest };
  
  switch (stepType) {
    case StepType.CUSTOMER_INFO:
      // Parse customer info from answer (name|company|contact)
      let name, company, contactInfo;
      
      if (answer.includes('|||')) {
        const parts = answer.split('|||');
        name = parts[0]?.trim() || '';
        company = parts[1]?.trim();
        contactInfo = parts[2]?.trim() || name;
      } else {
        name = answer.trim();
        contactInfo = answer.trim();
      }
      
      // Only update if we have a name
      if (name) {
        updatedQuote.customer = {
          name,
          company,
          contactInfo: contactInfo || name,
          // Don't set a default expertise level - will be determined after project info
          expertiseLevel: '' 
        };
      }
      break;
      
    case StepType.PROJECT_INFO:
      // Extract project details
      updatedQuote.project = {
        description: answer,
        projectType: 'General Construction', // We'll let Claude determine this
        summary: undefined // This will be provided by Claude
      };
      break;
      
    case StepType.MATERIAL_SELECTION:
      // Only use materials that the user actually selected
      // The answer will be a comma-separated list of material names
      const selectedMaterialNames = answer.split(',').map(name => name.trim()).filter(Boolean);
      
      // Find the corresponding material objects from the recommended materials
      updatedQuote.materials = [];
      
      // Only add materials that were selected by the user
      selectedMaterialNames.forEach(materialName => {
        const material = recommendedMaterials.find(m => 
          m.name === materialName || 
          m.name.toLowerCase() === materialName.toLowerCase()
        );
        
        if (material) {
          updatedQuote.materials.push({
            materialId: material.id,
            quantity: material.recommendedQuantity || 0
          });
        }
      });
      break;
      
    case StepType.DELIVERY_LOCATION:
      // Update delivery address and date
      const parts = answer.split('|||');
      const address = parts[0] || '';
      const preferredDate = parts[1] || '';
      
      updatedQuote.deliveryInfo = {
        ...updatedQuote.deliveryInfo || {},
        location: {
          address: address,
          coordinates: generateRandomCoordinates()
        },
        preferredDate: preferredDate
      };
      break;
      
    case StepType.BUDGET:
      // Extract budget value from answer
      const budget = parseFloat(answer.replace(/[^0-9.]/g, ''));
      
      updatedQuote.deliveryInfo = {
        ...updatedQuote.deliveryInfo || {},
        budget: isNaN(budget) ? 10000 : budget
      };
      break;
      
    case StepType.PLANT_SELECTION:
      // Parse selected plants from answer
      const selectedPlantNames = answer.split(',').map(name => name.trim());
      
      // We'll create an object to map plants to their specific materials
      const plantMaterialMap: Record<string, string[]> = {};
      
      // First, find each plant in the recommendedMaterials
      selectedPlantNames.forEach((name, index) => {
        // Try to find the matching plant in recommendedMaterials by name
        const plantId = `plant-${index + 1}`;
        
        // Initialize with an empty array - we'll assign materials in the next step
        plantMaterialMap[plantId] = [];
      });
      
      // Now, let's evenly distribute materials among the plants
      // Instead of giving all materials to all plants
      if (updatedQuote.materials && updatedQuote.materials.length > 0) {
        const plantIds = Object.keys(plantMaterialMap);
        
        // Distribute materials among plants
        updatedQuote.materials.forEach((material, index) => {
          // Assign each material to a plant in round-robin fashion
          const targetPlantIndex = index % plantIds.length;
          const targetPlantId = plantIds[targetPlantIndex];
          
          // Add this material to the target plant
          plantMaterialMap[targetPlantId].push(material.materialId);
        });
      }
      
      // Now create the plant selections from our map
      updatedQuote.plantSelections = Object.entries(plantMaterialMap).map(([plantId, materialIds]) => ({
        plantId,
        materialIds
      }));
      break;
      
    case StepType.CONFIRMATION:
      // Mark quote as submitted
      updatedQuote.status = 'submitted';
      break;
  }
  
  return updatedQuote;
}

// Generate random coordinates for delivery location
function generateRandomCoordinates() {
  return {
    lat: 30.26 + (Math.random() - 0.5) * 2,
    lng: -97.74 + (Math.random() - 0.5) * 2
  };
}