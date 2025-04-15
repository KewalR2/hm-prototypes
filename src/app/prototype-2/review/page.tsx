'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function ReviewPage() {
  const router = useRouter();
  // Initial data state
  const [quoteData, setQuoteData] = useState({
    project: {
      type: "Highway expansion project for Route 42",
      description: "Approximately 5 miles of new road construction",
      location: "Springfield, IL, between markers 35 and 40"
    },
    materials: [
      {
        type: "Crushed Stone",
        grade: "#57 Stone",
        quantity: "2,500 tons"
      },
      {
        type: "Asphalt",
        grade: "Hot Mix Asphalt",
        quantity: "1,800 tons"
      },
      {
        type: "Sand",
        grade: "Fine Grain",
        quantity: "800 tons"
      }
    ],
    delivery: {
      timeframe: "Starting May 15th, with deliveries over 3 weeks",
      schedule: "Weekly deliveries of approximately 1/3 of the total materials",
      specialInstructions: "Site has weight restrictions for vehicles over 30 tons"
    },
    contact: {
      company: "Acme Construction",
      name: "John Smith",
      phone: "(555) 123-4567",
      email: "john@acmeconstruction.com"
    }
  });
  // State for tracking editing modes
  const [voiceResponseReceived, setVoiceResponseReceived] = useState(false);
  const [editingSection, setEditingSection] = useState(null); // 'project', 'materials', 'delivery', 'contact'
  // Edit field states
  const [editedProject, setEditedProject] = useState({...quoteData.project});
  const [editedDelivery, setEditedDelivery] = useState({...quoteData.delivery});
  const [editedContact, setEditedContact] = useState({...quoteData.contact});
  // Start editing a section
  const startEditing = (section) => {
    setEditingSection(section);
    // Reset edit fields to current values
    if (section === 'project') {
      setEditedProject({...quoteData.project});
    } else if (section === 'delivery') {
      setEditedDelivery({...quoteData.delivery});
    } else if (section === 'contact') {
      setEditedContact({...quoteData.contact});
    }
  };
  // Save edits
  const saveEdits = () => {
    if (editingSection === 'project') {
      setQuoteData(prev => ({...prev, project: editedProject}));
    } else if (editingSection === 'materials') {
      // Material editing would be handled separately due to its more complex structure
    } else if (editingSection === 'delivery') {
      setQuoteData(prev => ({...prev, delivery: editedDelivery}));
    } else if (editingSection === 'contact') {
      setQuoteData(prev => ({...prev, contact: editedContact}));
    }
    setEditingSection(null);
  };
  // Cancel edits
  const cancelEdits = () => {
    setEditingSection(null);
  };
  // Load voice responses from session storage
  useEffect(() => {
    const responseData = sessionStorage.getItem('voiceResponses');
    if (responseData) {
      try {
        const responses = JSON.parse(responseData);
        // Map the voice responses to the structured data format
        if (responses.length >= 6) {
          console.log('Processing voice responses:', responses);
          // Process each response and extract relevant information
          const projectResponse = responses.find(r => r.id === 1)?.response || '';
          const materialsResponse = responses.find(r => r.id === 2)?.response || '';
          const deliveryResponse = responses.find(r => r.id === 3)?.response || '';
          const locationResponse = responses.find(r => r.id === 4)?.response || '';
          const contactResponse = responses.find(r => r.id === 5)?.response || '';
          const specialResponse = responses.find(r => r.id === 6)?.response || '';
          // Extract data from responses and update quoteData
          setQuoteData(prev => ({
            project: {
              type: projectResponse || prev.project.type,
              description: extractDescription(projectResponse) || prev.project.description,
              location: locationResponse || prev.project.location
            },
            materials: extractMaterials(materialsResponse) || prev.materials,
            delivery: {
              timeframe: deliveryResponse || prev.delivery.timeframe,
              schedule: extractSchedule(deliveryResponse) || prev.delivery.schedule,
              specialInstructions: specialResponse || prev.delivery.specialInstructions
            },
            contact: extractContactInfo(contactResponse) || prev.contact
          }));
          setVoiceResponseReceived(true);
        }
      } catch (error) {
        console.error('Error parsing voice responses:', error);
      }
    }
  }, []);
  // Helper functions to extract structured data from voice responses
  function extractDescription(response) {
    if (!response) return '';
    // Try to extract a project description from the response
    // Look for common phrases that might indicate a description
    const descriptionPatterns = [
      /it'?s\s+(approximately|about|around)([^.]+)/i,
      /approximately([^.]+)/i,
      /project\s+(?:is|for)([^.]+)/i,
    ];
    for (const pattern of descriptionPatterns) {
      const match = response.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    // Fallback: if there are multiple sentences, return the second one as it often contains description
    const parts = response.split('.');
    return parts && parts.length > 1 ? parts[1].trim() : '';
  }
  function extractMaterials(response) {
    if (!response) return null;
    // More robust extraction with fallbacks
    const materials = [];
    // Common material types to look for
    const materialTypes = [
      { 
        keyword: ['crushed stone', 'gravel', 'aggregate'], 
        type: "Crushed Stone",
        grade: "#57 Stone",
        pattern: /(\d+[,.]?\d*)\s*(?:tons?|cubic\s+yards?|cy|yards?)\s+(?:of\s+)?(?:crushed\s+stone|gravel|aggregate)/i
      },
      { 
        keyword: ['asphalt', 'hot mix'], 
        type: "Asphalt",
        grade: "Hot Mix Asphalt",
        pattern: /(\d+[,.]?\d*)\s*(?:tons?|cubic\s+yards?|cy|yards?)\s+(?:of\s+)?(?:hot\s+mix\s+)?asphalt/i
      },
      { 
        keyword: ['sand'], 
        type: "Sand",
        grade: "Fine Grain",
        pattern: /(\d+[,.]?\d*)\s*(?:tons?|cubic\s+yards?|cy|yards?)\s+(?:of\s+)?(?:fine\s+grain\s+)?sand/i
      },
      { 
        keyword: ['concrete'], 
        type: "Concrete",
        grade: "Ready-Mix",
        pattern: /(\d+[,.]?\d*)\s*(?:tons?|cubic\s+yards?|cy|yards?)\s+(?:of\s+)?(?:ready\s+mix\s+)?concrete/i
      },
      { 
        keyword: ['dirt', 'soil', 'fill'], 
        type: "Fill Dirt",
        grade: "Clean Fill",
        pattern: /(\d+[,.]?\d*)\s*(?:tons?|cubic\s+yards?|cy|yards?)\s+(?:of\s+)?(?:clean\s+)?(?:dirt|soil|fill)/i
      }
    ];
    // Check for each material type
    for (const material of materialTypes) {
      // Check if any of the keywords for this material are present
      const keywordFound = material.keyword.some(keyword => response.toLowerCase().includes(keyword));
      if (keywordFound) {
        const match = response.match(material.pattern);
        if (match && match[1]) {
          materials.push({
            type: material.type,
            grade: material.grade,
            quantity: match[1].replace(/,/g, '') + " tons"
          });
        } else {
          // Fallback: if we found the keyword but couldn't extract quantity, add with default quantity
          materials.push({
            type: material.type,
            grade: material.grade,
            quantity: "Unknown quantity"
          });
        }
      }
    }
    // Generic number + material pattern as a final fallback
    if (materials.length === 0) {
      const genericMatches = response.matchAll(/(\d+[,.]?\d*)\s*(?:tons?|cubic\s+yards?|cy|yards?)\s+(?:of\s+)?([a-zA-Z\s]+)/gi);
      for (const match of genericMatches) {
        if (match && match[1] && match[2]) {
          materials.push({
            type: match[2].trim().replace(/^\w/, c => c.toUpperCase()),
            grade: "Standard",
            quantity: match[1].replace(/,/g, '') + " tons"
          });
        }
      }
    }
    return materials.length > 0 ? materials : null;
  }
  function extractSchedule(response) {
    if (!response) return null;
    // More robust schedule extraction
    const schedulePatterns = [
      {
        pattern: /weekly/i,
        schedule: "Weekly deliveries"
      },
      {
        pattern: /(\d+)\s*(?:week|month)s?/i,
        schedule: match => `Deliveries over ${match[1]} ${match[0].includes('week') ? 'weeks' : 'months'}`
      },
      {
        pattern: /spread\s+over\s+([^.]+)/i,
        schedule: match => `Deliveries spread over ${match[1]}`
      },
      {
        pattern: /starting\s+([^,]+),\s+([^.]+)/i,
        schedule: match => `Starting ${match[1]}, ${match[2]}`
      }
    ];
    for (const { pattern, schedule } of schedulePatterns) {
      const match = response.match(pattern);
      if (match) {
        return typeof schedule === 'function' ? schedule(match) : schedule;
      }
    }
    return null;
  }
  function extractContactInfo(response) {
    if (!response) return null;
    const contactInfo = {
      company: "Unknown Company",
      name: "Unknown Name",
      phone: "Unknown Phone",
      email: "Unknown Email"
    };
    // More robust company name extraction
    const companyPatterns = [
      /company\s+(?:is|called|named)\s+([^,.]+)/i,
      /(?:at|with|for)\s+([A-Z][A-Za-z\s]+)(?:,|\.|and)/i,
      /([A-Z][A-Za-z\s]+)(?:\s+company|\s+construction|\s+inc\.?|\s+llc\.?)/i
    ];
    for (const pattern of companyPatterns) {
      const match = response.match(pattern);
      if (match && match[1]) {
        contactInfo.company = match[1].trim();
        break;
      }
    }
    // More robust name extraction
    const namePatterns = [
      /(?:I'?m|name\s+is|this\s+is)\s+([^,.]+)/i,
      /([A-Z][a-z]+\s+[A-Z][a-z]+)(?:,|\.|and)/i
    ];
    for (const pattern of namePatterns) {
      const match = response.match(pattern);
      if (match && match[1]) {
        contactInfo.name = match[1].trim();
        break;
      }
    }
    // Email extraction - looking for standard email format
    const emailMatch = response.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i);
    if (emailMatch) {
      contactInfo.email = emailMatch[1];
    }
    // Phone extraction - various formats
    const phonePatterns = [
      /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/,  // (555) 123-4567 or 555-123-4567
      /\d{3}[-.\s]\d{3}[-.\s]\d{4}/           // 555 123 4567 or similar
    ];
    for (const pattern of phonePatterns) {
      const match = response.match(pattern);
      if (match) {
        contactInfo.phone = match[0];
        break;
      }
    }
    return contactInfo;
  }
  // Handle submitting the quote request
  const handleSubmitQuote = () => {
    // Save the final quote data for the confirmation page
    sessionStorage.setItem('finalQuoteData', JSON.stringify(quoteData));
    router.push('/prototype-2/confirm');
  };
  return (
    <div>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link href="/prototype-2" className="text-primary hover:underline inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Prototype 2
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Interview Complete!</h1>
            </div>
            {voiceResponseReceived && (
              <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 rounded-lg p-4 mb-6">
                <p className="font-medium">Voice responses received and processed successfully!</p>
              </div>
            )}
            <p className="text-center mb-8 text-gray-600 dark:text-gray-300">
              Please review the information we've captured from your voice responses
            </p>
            {/* Review Sections */}
            <div className="space-y-8 mb-8">
              {/* Project Information */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-semibold">Project Information</h2>
                  {editingSection !== 'project' ? (
                    <button 
                      onClick={() => startEditing('project')}
                      className="text-primary hover:text-blue-700 text-sm font-medium flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button 
                        onClick={cancelEdits}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={saveEdits}
                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
                {editingSection !== 'project' ? (
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Project Type: </span>
                      <span className="font-medium">{quoteData.project.type}</span>
                    </p>
                    <p>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Description: </span>
                      <span className="font-medium">{quoteData.project.description}</span>
                    </p>
                    <p>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Location: </span>
                      <span className="font-medium">{quoteData.project.location}</span>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Project Type
                      </label>
                      <input
                        type="text"
                        value={editedProject.type}
                        onChange={(e) => setEditedProject({...editedProject, type: e.target.value})}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={editedProject.description}
                        onChange={(e) => setEditedProject({...editedProject, description: e.target.value})}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={editedProject.location}
                        onChange={(e) => setEditedProject({...editedProject, location: e.target.value})}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                )}
              </div>
              {/* Materials */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-semibold">Materials Required</h2>
                  {editingSection !== 'materials' ? (
                    <button 
                      onClick={() => startEditing('materials')}
                      className="text-primary hover:text-blue-700 text-sm font-medium flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button 
                        onClick={cancelEdits}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={saveEdits}
                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  {quoteData.materials.map((material, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <div className="flex justify-between">
                        <div className="font-medium">{material.type}</div>
                        <div>{material.quantity}</div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {material.grade}
                      </div>
                    </div>
                  ))}
                </div>
                {editingSection === 'materials' && (
                  <div className="mt-4 p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Material editing is not implemented in this prototype.
                    </p>
                  </div>
                )}
              </div>
              {/* Delivery Information */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-semibold">Delivery Information</h2>
                  {editingSection !== 'delivery' ? (
                    <button 
                      onClick={() => startEditing('delivery')}
                      className="text-primary hover:text-blue-700 text-sm font-medium flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button 
                        onClick={cancelEdits}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={saveEdits}
                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
                {editingSection !== 'delivery' ? (
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Timeframe: </span>
                      <span className="font-medium">{quoteData.delivery.timeframe}</span>
                    </p>
                    <p>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Schedule: </span>
                      <span className="font-medium">{quoteData.delivery.schedule}</span>
                    </p>
                    <p>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Special Instructions: </span>
                      <span className="font-medium">{quoteData.delivery.specialInstructions}</span>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Timeframe
                      </label>
                      <input
                        type="text"
                        value={editedDelivery.timeframe}
                        onChange={(e) => setEditedDelivery({...editedDelivery, timeframe: e.target.value})}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Schedule
                      </label>
                      <input
                        type="text"
                        value={editedDelivery.schedule}
                        onChange={(e) => setEditedDelivery({...editedDelivery, schedule: e.target.value})}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Special Instructions
                      </label>
                      <textarea
                        value={editedDelivery.specialInstructions}
                        onChange={(e) => setEditedDelivery({...editedDelivery, specialInstructions: e.target.value})}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"
                        rows={3}
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
              {/* Contact Information */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-semibold">Contact Information</h2>
                  {editingSection !== 'contact' ? (
                    <button 
                      onClick={() => startEditing('contact')}
                      className="text-primary hover:text-blue-700 text-sm font-medium flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button 
                        onClick={cancelEdits}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={saveEdits}
                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
                {editingSection !== 'contact' ? (
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Company: </span>
                      <span className="font-medium">{quoteData.contact.company}</span>
                    </p>
                    <p>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Contact Name: </span>
                      <span className="font-medium">{quoteData.contact.name}</span>
                    </p>
                    <p>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Phone: </span>
                      <span className="font-medium">{quoteData.contact.phone}</span>
                    </p>
                    <p>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Email: </span>
                      <span className="font-medium">{quoteData.contact.email}</span>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        value={editedContact.company}
                        onChange={(e) => setEditedContact({...editedContact, company: e.target.value})}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        value={editedContact.name}
                        onChange={(e) => setEditedContact({...editedContact, name: e.target.value})}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={editedContact.phone}
                        onChange={(e) => setEditedContact({...editedContact, phone: e.target.value})}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editedContact.email}
                        onChange={(e) => setEditedContact({...editedContact, email: e.target.value})}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-10">
              <button 
                onClick={() => router.push('/prototype-2/voice-request')}
                className="border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Start Over
              </button>
              <button 
                onClick={handleSubmitQuote}
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                disabled={editingSection !== null}
              >
                Submit Quote Request
              </button>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6 mt-8">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-medium mb-2">How We Process Your Information</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your voice responses are processed using AI to extract key information.
                  Our system creates a structured quote request that our team can respond to quickly.
                  You can always edit any information that wasn't captured correctly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}