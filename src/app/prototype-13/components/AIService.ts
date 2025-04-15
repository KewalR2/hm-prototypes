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
    "question": "The question is straightforward. We don't put any thank you and stuff here",
    "componentType": "${currentStepType}", // MUST be one of: "customer_info", "project_info", "material_selection", "delivery_location", "budget", "plant_selection", "confirmation"
    "materials": [], // Provide only when we are in material_selection step otherwise skip
    "plants": [], // Provide only when we are in plant_selection step otherwise skip
    "quote_type": "ALWAYS INCLUDE with specific project type like 'Highway Construction', 'Road Construction', 'Bridge Construction', etc.",
    "expertise_level": "Always analyze customer's expertise based on their answers and provide 'beginner', 'intermediate', or 'expert'",
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
    "recommendedQuantity": 100
}

plants[]:
Each object must follow this format:
{
    "id": "plant-id",
    "name": "Plant Name",
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
4. delivery_location → Ask: "Where should we deliver these materials?" (componentType MUST be "delivery_location")
5. budget → Ask: "What's your budget for this project?" (componentType MUST be "budget")
6. plant_selection → Offer multiple plants with pricing and availability. (componentType MUST be "plant_selection")
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
      // Parse Claude's response as JSON
      claudeResponse = JSON.parse(data.text);
      
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
          // Don't set expertise level here, wait for Claude to infer it
        };
      }
      break;
      
    case StepType.PROJECT_INFO:
      // Extract project details
      updatedQuote.project = {
        description: answer,
        projectType: 'General Construction' // We'll let Claude determine this
      };
      break;
      
    case StepType.MATERIAL_SELECTION:
      // Use materials from Claude response 
      updatedQuote.materials = recommendedMaterials.map(material => ({
        materialId: material.id,
        quantity: material.recommendedQuantity || 0
      }));
      break;
      
    case StepType.DELIVERY_LOCATION:
      // Update delivery address
      updatedQuote.deliveryInfo = {
        ...updatedQuote.deliveryInfo || {},
        location: {
          address: answer,
          coordinates: generateRandomCoordinates()
        }
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
      
      // Use the actual plant IDs from the recommended plants
      // This ensures we preserve the correct plant IDs from the Claude API
      updatedQuote.plantSelections = selectedPlantNames.map((name) => {
        // Try to find the matching plant in recommendedMaterials by name
        const matchingPlant = recommendedMaterials.find(material => 
          material.name.toLowerCase().includes(name.toLowerCase()) || 
          name.toLowerCase().includes(material.name.toLowerCase())
        );
        
        // If found, use the actual ID, otherwise create an ID that matches API format (plant-1, plant-2)
        const plantId = matchingPlant?.id || `plant-${selectedPlantNames.indexOf(name) + 1}`;
        
        return {
          plantId,
          materialIds: updatedQuote.materials?.map(m => m.materialId) || []
        };
      });
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