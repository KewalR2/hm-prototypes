'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
// Types for our conversation
type MessageRole = 'user' | 'assistant' | 'system';
interface Message {
  role: MessageRole;
  content: string;
  options?: string[];
}
interface Material {
  id: string;
  name: string;
  description: string;
  bestFor: string[];
  notRecommendedFor: string[];
  priceRange: string;
  properties: {
    durability: number;
    aesthetics: number;
    easeOfInstallation: number;
    environmentalImpact: number;
  };
}
// Sample materials database
const MATERIALS: Material[] = [
  {
    id: "crushed-stone",
    name: "Crushed Stone",
    description: "Angular, crushed stone ranging from 3/8\" to 4\" in size. Excellent for drainage and stability.",
    bestFor: ["Driveways", "Pathways", "Drainage areas", "Under concrete slabs"],
    notRecommendedFor: ["Areas with heavy pedestrian traffic", "Children's play areas"],
    priceRange: "$30-45 per ton",
    properties: {
      durability: 4.5,
      aesthetics: 3.0,
      easeOfInstallation: 4.0,
      environmentalImpact: 3.5
    }
  },
  {
    id: "pea-gravel",
    name: "Pea Gravel",
    description: "Small, rounded stones approximately 3/8\" in size. Available in various colors.",
    bestFor: ["Walkways", "Patios", "Landscaping accents", "Children's play areas"],
    notRecommendedFor: ["Driveways with steep slopes", "Areas with heavy vehicle traffic"],
    priceRange: "$40-55 per ton",
    properties: {
      durability: 3.5,
      aesthetics: 4.5,
      easeOfInstallation: 4.5,
      environmentalImpact: 3.5
    }
  },
  {
    id: "concrete-mix",
    name: "Ready-Mix Concrete",
    description: "Pre-mixed concrete with consistent performance and strength properties.",
    bestFor: ["Foundations", "Slabs", "Footings", "Structural elements"],
    notRecommendedFor: ["Temporary structures", "Areas requiring flexibility"],
    priceRange: "$110-150 per cubic yard",
    properties: {
      durability: 5.0,
      aesthetics: 2.5,
      easeOfInstallation: 3.0,
      environmentalImpact: 2.0
    }
  },
  {
    id: "sand",
    name: "Construction Sand",
    description: "Fine granular material essential for concrete mixing and base layers.",
    bestFor: ["Concrete mixing", "Base layers", "Paver foundation", "Playground areas"],
    notRecommendedFor: ["Structural fill without proper compaction", "Erosion-prone areas without stabilization"],
    priceRange: "$25-40 per ton",
    properties: {
      durability: 3.0,
      aesthetics: 3.0,
      easeOfInstallation: 4.5,
      environmentalImpact: 3.5
    }
  },
  {
    id: "recycled-concrete",
    name: "Recycled Concrete Aggregate",
    description: "Crushed recycled concrete, environmentally friendly alternative to virgin aggregates.",
    bestFor: ["Road base", "Fill material", "Drainage applications", "Sustainable projects"],
    notRecommendedFor: ["Exposed decorative applications", "New structural concrete"],
    priceRange: "$20-30 per ton",
    properties: {
      durability: 4.0,
      aesthetics: 2.0,
      easeOfInstallation: 3.5,
      environmentalImpact: 5.0
    }
  },
  {
    id: "decomposed-granite",
    name: "Decomposed Granite",
    description: "Granite rock naturally broken down into small particles with fines that help with compaction.",
    bestFor: ["Pathways", "Rustic patios", "Garden trails", "Xeriscape landscapes"],
    notRecommendedFor: ["Areas with poor drainage", "High-traffic commercial areas"],
    priceRange: "$45-65 per ton",
    properties: {
      durability: 3.5,
      aesthetics: 4.0,
      easeOfInstallation: 4.0,
      environmentalImpact: 4.0
    }
  },
  {
    id: "limestone",
    name: "Crushed Limestone",
    description: "Sedimentary rock that's crushed for various construction applications.",
    bestFor: ["Driveways", "Base material", "French drains", "Soil pH adjustment"],
    notRecommendedFor: ["Acidic soil environments without proper preparation"],
    priceRange: "$35-50 per ton",
    properties: {
      durability: 4.0,
      aesthetics: 3.5,
      easeOfInstallation: 4.0,
      environmentalImpact: 3.0
    }
  }
];
// Initial system messages to guide the conversation
const INITIAL_MESSAGES: Message[] = [
  {
    role: 'system',
    content: 'Welcome to the AI Material Advisor! I can help you select the best materials for your construction project based on your specific needs and requirements. To get started, please tell me about your project.',
  },
  {
    role: 'assistant',
    content: 'Hi there! I\'m your AI Materials Advisor. I can help you find the perfect materials for your construction project. What type of project are you working on? (For example: driveway, patio, foundation, landscaping, etc.)',
  },
];
// Predefined conversation paths based on project types
const PROJECT_PATHS: Record<string, Message[]> = {
  driveway: [
    {
      role: 'assistant',
      content: 'Great! Driveways need durable materials that can handle vehicle weight. What length and width is your driveway approximately?',
    },
    {
      role: 'assistant',
      content: "What's the climate like in your area? Do you get heavy rain, snow, or ice?",
      options: ['Heavy snow/ice', 'Moderate rain', 'Hot and dry', 'Varied/seasonal']
    },
    {
      role: 'assistant',
      content: "Do you prefer a natural look, or something more refined and uniform?",
      options: ['Natural appearance', 'Refined/uniform look', 'No strong preference']
    }
  ],
  patio: [
    {
      role: 'assistant',
      content: 'Patios are great outdoor living spaces! What size is your planned patio area approximately?',
    },
    {
      role: 'assistant',
      content: 'How do you plan to use your patio primarily?',
      options: ['Dining/entertaining', 'Relaxing/lounge area', 'Container gardening', 'Multi-purpose']
    },
    {
      role: 'assistant',
      content: "What's your priority for your patio surface?",
      options: ['Low maintenance', 'Natural appearance', 'Comfort underfoot', 'Heat resistance', 'Cost efficiency']
    }
  ],
  foundation: [
    {
      role: 'assistant',
      content: 'Foundations are critical structures! What type of building will this foundation support?',
      options: ['Residential home', 'Commercial building', 'Shed/garage', 'Addition to existing structure']
    },
    {
      role: 'assistant',
      content: "What's the approximate square footage of the foundation?",
    },
    {
      role: 'assistant',
      content: 'Are there any special soil or drainage conditions at your site?',
      options: ['Clay soil', 'Sandy soil', 'Rocky soil', 'High water table', 'Sloped site', 'Not sure']
    }
  ],
  landscaping: [
    {
      role: 'assistant',
      content: 'Landscaping projects can transform your outdoor space! What specific elements are you working on?',
      options: ['Garden paths', 'Retaining walls', 'Water features', 'Garden beds', 'General landscaping']
    },
    {
      role: 'assistant',
      content: "What's the aesthetic you're aiming for?",
      options: ['Modern/contemporary', 'Natural/rustic', 'Formal/traditional', 'Low-maintenance']
    },
    {
      role: 'assistant',
      content: 'Do you have any sustainability or environmental priorities?',
      options: ['Using recycled materials', 'Water conservation', 'Supporting local ecosystems', 'Low environmental impact', 'Not a primary concern']
    }
  ]
};
// Function to get recommendations based on project type and answers
const getRecommendations = (projectType: string, answers: string[]): Material[] => {
  let recommended: Material[] = [];
  // Very simplified recommendation logic based on project type and answers
  if (projectType.includes('driveway')) {
    // For driveways - prioritize durability
    recommended = MATERIALS.filter(m => 
      m.bestFor.some(use => use.toLowerCase().includes('driveway')) ||
      m.properties.durability >= 4.0
    );
    // If they want natural look, prioritize those materials
    if (answers.some(a => a.toLowerCase().includes('natural'))) {
      recommended = recommended.sort((a, b) => b.properties.aesthetics - a.properties.aesthetics);
    }
    // If they have heavy snow/ice, prioritize materials good for drainage
    if (answers.some(a => a.toLowerCase().includes('snow') || a.toLowerCase().includes('ice'))) {
      recommended = recommended.filter(m => 
        m.bestFor.some(use => use.toLowerCase().includes('drainage')) ||
        m.name.toLowerCase().includes('stone')
      );
    }
  } 
  else if (projectType.includes('patio')) {
    // For patios - balance aesthetics and durability
    recommended = MATERIALS.filter(m => 
      m.bestFor.some(use => use.toLowerCase().includes('patio')) ||
      (m.properties.aesthetics >= 3.5 && m.properties.durability >= 3.0)
    );
    // If they prioritize low maintenance
    if (answers.some(a => a.toLowerCase().includes('low maintenance'))) {
      recommended = recommended.filter(m => m.properties.durability >= 3.5);
    }
    // If they prioritize natural appearance
    if (answers.some(a => a.toLowerCase().includes('natural'))) {
      recommended = recommended.sort((a, b) => b.properties.aesthetics - a.properties.aesthetics);
    }
  }
  else if (projectType.includes('foundation')) {
    // For foundations - prioritize structural materials
    recommended = MATERIALS.filter(m => 
      m.bestFor.some(use => use.toLowerCase().includes('foundation')) ||
      m.name.toLowerCase().includes('concrete')
    );
  }
  else if (projectType.includes('landscaping')) {
    // For landscaping - prioritize aesthetics
    recommended = MATERIALS.filter(m => 
      m.properties.aesthetics >= 3.5 ||
      m.bestFor.some(use => use.toLowerCase().includes('landscape'))
    );
    // If they want sustainable options
    if (answers.some(a => a.toLowerCase().includes('recycled') || a.toLowerCase().includes('environmental'))) {
      recommended = recommended.filter(m => m.properties.environmentalImpact >= 4.0);
    }
  }
  else {
    // Generic recommendations if no specific project type recognized
    recommended = MATERIALS.slice(0, 3);
  }
  // Limit to top 3 recommendations
  return recommended.slice(0, 3);
};
// Functions to handle material selection
const createMaterialComparisonMessage = (materials: Material[]): string => {
  return `
Based on what you've told me, here are my top material recommendations for your project:
${materials.map((mat, index) => `
**${index + 1}. ${mat.name}**
${mat.description}
• Best for: ${mat.bestFor.join(', ')}
• Price range: ${mat.priceRange}
• Durability: ${' ★'.repeat(Math.round(mat.properties.durability))}
• Aesthetics: ${' ★'.repeat(Math.round(mat.properties.aesthetics))}
• Ease of installation: ${' ★'.repeat(Math.round(mat.properties.easeOfInstallation))}
• Environmental impact: ${' ★'.repeat(Math.round(mat.properties.environmentalImpact))}
`).join('\n')}
Would you like more details on any of these options? Or would you like to proceed with getting a quote for one of them?
  `;
};
export default function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [projectType, setProjectType] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<Material[]>([]);
  const [showRecommendations, setShowRecommendations] = useState<boolean>(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [quoteGenerated, setQuoteGenerated] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Effect to scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  // Process user input to determine project type
  const processProjectType = (input: string) => {
    input = input.toLowerCase();
    if (input.includes('driveway')) {
      setProjectType('driveway');
      return 'driveway';
    } else if (input.includes('patio')) {
      setProjectType('patio');
      return 'patio';
    } else if (input.includes('foundation')) {
      setProjectType('foundation');
      return 'foundation';
    } else if (input.includes('landscap') || input.includes('garden')) {
      setProjectType('landscaping');
      return 'landscaping';
    }
    return '';
  };
  // Handle sending a message
  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    const userMessage = { role: 'user' as MessageRole, content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);
    // Short delay to simulate "thinking"
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Logic to determine response based on conversation state
    let nextMessage: Message | null = null;
    // If this is the initial project description
    if (messages.length === 2) {  // After system message and initial greeting
      const detectedProjectType = processProjectType(userMessage.content);
      if (detectedProjectType && PROJECT_PATHS[detectedProjectType]) {
        // If we recognize the project type, start that conversation path
        nextMessage = PROJECT_PATHS[detectedProjectType][0];
        setCurrentQuestion(1);
      } else {
        // If we don't recognize the project, ask for clarification
        nextMessage = {
          role: 'assistant',
          content: "I'm not quite sure what type of project you're describing. Could you clarify if it's a driveway, patio, foundation, or landscaping project?",
          options: ['Driveway', 'Patio', 'Foundation', 'Landscaping', 'Other']
        };
      }
    }
    // Handle responses to clarification about project type
    else if (messages.length === 4 && projectType === '') {
      const detectedProjectType = processProjectType(userMessage.content);
      if (detectedProjectType && PROJECT_PATHS[detectedProjectType]) {
        setProjectType(detectedProjectType);
        nextMessage = PROJECT_PATHS[detectedProjectType][0];
        setCurrentQuestion(1);
      } else {
        // Still don't understand, start general questions
        nextMessage = {
          role: 'assistant',
          content: "Let me ask more about your project. What materials are you considering, or what properties are most important to you? (durability, appearance, cost, etc.)"
        };
      }
    }
    // Handle ongoing conversation for a recognized project type
    else if (projectType && PROJECT_PATHS[projectType] && currentQuestion < PROJECT_PATHS[projectType].length) {
      // Store user's answer
      setUserAnswers(prev => [...prev, userMessage.content]);
      // Move to next question in the path
      nextMessage = PROJECT_PATHS[projectType][currentQuestion];
      setCurrentQuestion(prev => prev + 1);
    }
    // When we've gone through all questions, provide recommendations
    else if (projectType && currentQuestion >= PROJECT_PATHS[projectType].length) {
      // Store the final answer
      setUserAnswers(prev => [...prev, userMessage.content]);
      // Generate recommendations based on project type and answers
      const materialRecommendations = getRecommendations(projectType, [...userAnswers, userMessage.content]);
      setRecommendations(materialRecommendations);
      // Create a message with material comparisons
      nextMessage = {
        role: 'assistant',
        content: createMaterialComparisonMessage(materialRecommendations)
      };
      setShowRecommendations(true);
    }
    // Handle selection of a recommended material
    else if (showRecommendations && userMessage.content.toLowerCase().includes('quote')) {
      // Extract material number from message if present
      const materialMatch = userMessage.content.match(/[1-3]/);
      const materialIndex = materialMatch ? parseInt(materialMatch[0]) - 1 : 0;
      if (materialIndex >= 0 && materialIndex < recommendations.length) {
        setSelectedMaterial(recommendations[materialIndex]);
        // Generate quote information
        nextMessage = {
          role: 'assistant',
          content: `Great choice! I've prepared a quote for ${recommendations[materialIndex].name}. To finalize this quote, I need a few more details:
1. What quantity do you need? (For your project size, I'd estimate around 10-15 tons)
2. When would you like the materials delivered?
Once we have these details, I can provide a complete quote with pricing, delivery, and any additional recommendations for your specific application.`
        };
      } else {
        nextMessage = {
          role: 'assistant',
          content: 'Which material would you like to get a quote for? Please specify material 1, 2, or 3 from the recommendations.'
        };
      }
    }
    // Handle quote finalization
    else if (selectedMaterial && !quoteGenerated) {
      // This would parse details about quantity and delivery date
      setQuoteGenerated(true);
      // Generate a final quote
      const estimatedQuantity = 12; // This would be calculated based on project dimensions
      const pricePerUnit = parseInt(selectedMaterial.priceRange.replace(/[^\d-]/g, '').split('-')[0]);
      const totalPrice = pricePerUnit * estimatedQuantity;
      nextMessage = {
        role: 'assistant',
        content: `# Quote Summary for Your ${projectType.charAt(0).toUpperCase() + projectType.slice(1)} Project
**Selected Material**: ${selectedMaterial.name}
**Estimated Quantity**: ${estimatedQuantity} tons
**Unit Price**: $${pricePerUnit} per ton
**Subtotal**: $${totalPrice}
**Delivery Fee**: $150
**Total**: $${totalPrice + 150}
**Notes**:
- This quote is valid for 30 days
- Delivery timeframe: 3-5 business days
- Minimum order quantity may apply
- Price includes standard delivery to accessible locations
Would you like to:
1. Save this quote for later
2. Adjust the material selection or quantity
3. Proceed with ordering`
      };
    }
    // Default fallback response
    else {
      nextMessage = {
        role: 'assistant',
        content: "Thanks for that information. Is there anything specific about materials you'd like to know more about?"
      };
    }
    if (nextMessage) {
      setMessages(prev => [...prev, nextMessage!]);
    }
    setLoading(false);
  };
  // Handle clicking a suggested option
  const handleOptionClick = (option: string) => {
    setInputValue(option);
    handleSendMessage();
  };
  return (
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-primary text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h1 className="text-xl font-semibold">AI Material Advisor</h1>
            </div>
            {/* Chat messages container */}
            <div className="h-[500px] overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800">
              {messages.filter(m => m.role !== 'system').map((message, index) => (
                <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    message.role === 'user' 
                      ? 'bg-blue-100 dark:bg-blue-900 text-gray-800 dark:text-white' 
                      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white'
                  }`}>
                    <div className="whitespace-pre-wrap prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </div>
                  {/* Display options if available */}
                  {message.options && (
                    <div className="mt-2 flex flex-wrap gap-2 justify-start">
                      {message.options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          onClick={() => handleOptionClick(option)}
                          className="bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-full px-3 py-1 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* Input area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={loading || inputValue.trim() === ''}
                  className="bg-primary hover:bg-blue-600 text-white rounded-lg px-4 py-2 font-medium transition-colors disabled:opacity-50"
                >
                  Send
                </button>
              </div>
              {quoteGenerated && (
                <div className="mt-4 flex justify-center">
                  <Link
                    href="/prototype-5"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors text-center"
                  >
                    Return to Home
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="mt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
            <p>This is a prototype interface. In a real application, this would connect to a materials database, AI service, and quote system.</p>
          </div>
        </div>
      </main>
  );
}