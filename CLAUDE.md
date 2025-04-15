Adaptive Quote Request Flow – Prompt Specification
Objective

Develop a Next.js prototype that presents a sequential, adaptive question workflow. The AI agent (using Claude via the npm claude sdk) will dynamically generate one question at a time based on previous responses. The system gathers:

    Customer Information (including inferred expertise level)

    Project Information (what is being built; for example, a road vs. a residential building)

    Materials Information (selection of realistic, industry-relevant materials)

    Delivery & Budget Information (delivery location and budget details; used later to compare against cost breakdown)

    Plant Recommendation Details (multiple plants may offer overlapping materials; recommendations are based on price, proximity, and transportation cost factors)

Additionally, the prototype should include:

    A UI switch (default off) to enable/disable Claude API calls (to avoid unnecessary API usage during development).

    A dummy “Voice Input” button (no functionality, purely indicative of potential future voice integration).

    A side-panel (or overlay) that updates in real time to show the current context: materials selected, plant recommendations, delivery location, and cost breakdown components (e.g., material cost, transport cost, tolls).

Key Functional Requirements

    Sequential Adaptive Question Flow (Non-Chatbot UI)

        One question at a time: The interface displays a single, clear question. When answered, it updates the internal context and dynamically determines the next question.

        Dynamic decision making: The AI agent adapts based on user input. For instance, if a user describes a road construction project, the AI automatically recommends appropriate materials (aggregates, asphalt, etc.).

        Contextual follow-up: If the answer is ambiguous or adds new information, the agent asks clarifying questions to fully capture the data.

        User expertise inference: The system determines the user’s level of expertise by analyzing the input style. For entry-level responses, it prompts with “Can you describe what you are trying to build?” to then provide material recommendations. For expert-like inputs, it allows free choice along with recommendations.

    Materials Recommendation and Flexibility

        Realistic material data: Recommendations must pull from a set of realistic materials (e.g., aggregates, asphalt, concrete) and must avoid unrelated items (e.g., wood for road construction).

        Editable selections: Users can add or remove materials from the recommended list. For example, if the AI suggests standard materials but the user wants an extra type, the input is added to the context.

        Side Panel Display: A real-time side-panel displays the evolving context—what materials have been chosen, along with preliminary cost estimates for each.

    Plant Recommendations and Multi-Choice Adjustments

        Pre-recommendation data capture: The system must ask for the delivery location before plant recommendations.

        Dynamic plant list: The agent suggests available plants based on the selected materials, delivery location, and dummy cost data. In cases where multiple plants offer the same material, the system compares factors such as proximity versus pricing (including transport cost and toll estimates) and recommends the best option by default.

        User override: The user is able to deselect any plant (e.g., due to personal preferences) and choose alternatives from the provided list.

    Cost Breakdown and Budget Comparison

        Realistic dummy costs: While material data is realistic, transportation, toll, and other overhead cost data are simulated (dummy values).

        Budget check: The final computed quote includes a cost breakdown. If the total cost exceeds the provided budget, the AI explicitly notes that the quote goes above the customer’s budget and prompts the user with options to adjust selections (e.g., change materials from different plants or increase the budget).

    Quote Request Lifecycle

        End-to-End Process: The conversation flows from gathering customer/project details, through material and plant selection to a final quotation summary.

        Future ordering hook: The system clearly frames this as a quote request module—once the quote is generated, the customer may choose to proceed with an order later or track the quote over time.

    Claude API Toggle and Voice Placeholder

        API Toggle: A visible switch on the page (default off) controls whether Claude API calls are made. When off, the system uses a local fallback or dummy next-question generator to avoid unnecessary API usage during prototype testing.

        Voice Input Placeholder: A dummy “Voice Input” button is displayed to indicate potential future voice features (no voice functionality implementation is required).

Example AI Prompt for Claude

(This prompt will be used by the adaptive AI engine internally to decide on the next question.)

    "You are an adaptive agent facilitating a quote request for heavy construction materials. Your goal is to dynamically ask one clear question at a time until you have gathered the following information: customer details (including inferred expertise), project description, materials requirements (with realistic recommendations), delivery location, budget, and plant recommendations.

    Begin by asking: 'Can you describe what you are trying to build?'

    Based on the user’s response, determine whether the user appears to be an entry-level or expert user.

        If entry-level, follow up with a recommendation question like, 'Based on your project, I recommend these materials: [list]. Would you like to add any others?'

        If expert, allow the user to directly specify their material choices while providing suggestions.

    Ensure you capture delivery location and budget before suggesting plant options. For plant recommendations, consider that multiple plants may offer the same materials. Compare them using dummy values for transport cost, tolls, and proximity. If multiple options exist, ask: 'Our system recommends [Plant A] because it is cheaper despite being slightly further away, and [Plant B] because it is closer but marginally more expensive. Which would you prefer, or would you like to choose both?'

    Finally, summarize the accumulated data (customer info, project details, materials, selected plant(s), delivery location, and cost breakdown) and indicate that the quote will be generated based on these details. Do not hardcode any questions; instead, adapt based on the context of the conversation and user's responses."

Clarifying Summary

    User Response Handling:
    The AI always updates its internal context and decides the next question based on remaining gaps. It accounts for off-script or additional details by reordering the question sequence if necessary.

    Dynamic, Non-Hardcoded Flow:
    Every question is generated in response to the context, ensuring the workflow is flexible enough to handle variations in user input while still reaching all the end-goal parameters.

    Realistic Data Integration:
    The system uses realistic material data (e.g., aggregates, asphalt) and dummy calculations for cost elements to give a credible yet prototype-friendly quote preview.

Prompt to Follow as per Postman. This code was done in postman. Try doing something similar here

var customer_info = JSON.stringify({
    name: 'alex',
    contact: 'test@tet.ocm'
})

var project_info = JSON.stringify({
    desc: `
        A Road for Highway
        Well its a highway road where 1000s of trucks will go every day. The highway will be 10km long and width is of standard highway
        Well Drainage system is needed like japan. Like how they have water to be put on the roads during cold weather to avoid slippage of vehicle
    `
})

var material_selection = JSON.stringify({
    materials: [{
        id: 'asphalt-concrete',
        name: 'Asphalt Concrete',
        category: 'Paving',
        unit: 'ton',
        recommendedQuantity: 50000,
        surface: 'Road paving'
    }]
})


var delivery_location = JSON.stringify({
    delivery: 'Delhi University'
})

var budget = JSON.stringify({
    budget: '$5000'
})

var plant_selection = JSON.stringify({
    plants: [{
        "id": "plant-kc-01",
        "name": "Kansas City Asphalt Plant",
        "location": {
            "address": "1234 Industrial Blvd, Kansas City, KS 66101",
            "coordinates": {
            "lat": 39.115,
            "lng": -94.626
            }
        },
        "transportCostPerMile": 4.5,
        "minDeliveryDistance": 0,
        "maxDeliveryDistance": 150,
        "tollZones": [],
        "materials": [
            {
            "materialId": "asphalt-concrete",
            "availability": "high",
            "priceMultiplier": 1.0
            }
        ]
    }]
})


var not_provided = 'Data Not Provided'

function isEmptyObj(inp) {
  return inp.replace('{}', '').length > 0
}

var rawPrompt = `
You are an AI assistant helping with a heavy construction materials quote request system.
OUTPUT Format:
You MUST output ONLY JSON in this EXACT format:
{
    'question': 'The question is srigtforward. We don't put any thank you and stuff here',
    'componentType': 'Determine what type of component should be rendered by te UI like |text|, |options|, |radio|, |boolean|, |date| etc based on type of question',
    'materials': [], // Provide only when we are in material_selection step otherwise skip
    'plants': [], // Provide only when we are in plant_selection step otherwise skip
    'quote_type': 'Determine based on user what type of quote it is for like Road, Bridge construction etc',
    'costs': {}, // Provide only when we have selected materials and plants otherwise skip
}

POPULATION FORMAT:

materials[]:
Each object must follow this format:
{
    'id': 'material-id',
    'name': 'Material Name',
    'category': 'Category',
    'unit': 'Unit',
    'basePrice': 50,
    'description': 'Brief description of the material',
    'commonUses': ['Road base', 'Foundation fill'],
    'recommendedQuantity': 100
}

plants[]:
Each object must follow this format:
{
    'id': 'plant-id',
    'name': 'Plant Name',
    'location': {
        'address': 'Physical address',
        'coordinates': {
            'lat': 30.0,
            'lng': -97.0
        }
    },
    'transportCostPerMile': 5,
    'minDeliveryDistance': 0,
    'maxDeliveryDistance': 100,
    'tollZones': [],
    'materials': [
        {
            'materialId': 'material-id',
            'availability': 'high',
            'priceMultiplier': 1.0
        }
    ]
}

cost{}:
{
    materials: 'calculate material's price based on selected entries',
    transport_cost: 'calculate', // Generate Realtime value
    toll_cost: 'calculate',  // Generate Realtime value
    total_cost: 'calculate',  // Generate Realtime value
}

MANDATORY SEQUENCE (never skip or reorder):
1. customer_info → Ask: 'What's your name and contact information?' (customer_component)
2. project_info → Ask: 'Can you describe what you are trying to build?' (project_info_component)
3. material_selection → IMMEDIATELY after project_info is answered, respond with recommended materials. Do NOT ask. Use this question: 'Based on your [project type], here are the recommended materials. Are there any additional materials you need?' (options)
4. delivery_location → Ask: 'Where should we deliver these materials?' (text)
5. budget → Ask: 'What's your budget for this project?' (options & text)
6. plant_selection → Offer multiple plants with pricing and availability. (options)
7. confirmation → Final message: 'Thank you. Your quote has been generated and can be viewed in the sidebar.'

STATE:
1. customer_info: ${isEmptyObj(customer_info) ? customer_info : not_provided}
2. project_info: ${isEmptyObj(project_info) ? project_info : not_provided}
3. material_selection: ${isEmptyObj(material_selection) ? material_selection : not_provided}
4. delivery_location: ${isEmptyObj(delivery_location) ? delivery_location : not_provided}
5. budget: ${isEmptyObj(budget) ? budget : not_provided}
6. plant_selection: ${isEmptyObj(plant_selection) ? plant_selection : not_provided}
`.trim();

pm.variables.set('prompt_input', JSON.stringify(rawPrompt));


