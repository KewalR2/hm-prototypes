'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// User types
type User = {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'editor' | 'viewer';
  department: string;
};

// Message and activity types
type Message = {
  id: string;
  userId: string;
  content: string;
  timestamp: number;
  replyTo?: string;
  attachments?: string[];
};

type Activity = {
  id: string;
  userId: string;
  action: string;
  target: string;
  timestamp: number;
};

// Material and quote types
type Material = {
  id: string;
  name: string;
  description: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  status: 'pending' | 'approved' | 'rejected' | 'discussion';
  lastEditedBy: string;
  comments: Comment[];
};

type Comment = {
  id: string;
  userId: string;
  content: string;
  timestamp: number;
  resolved: boolean;
};

// Sample data
const USERS: User[] = [
  { id: 'user1', name: 'John Smith', avatar: '👨‍💼', role: 'admin', department: 'Project Management' },
  { id: 'user2', name: 'Sarah Johnson', avatar: '👩‍💼', role: 'editor', department: 'Procurement' },
  { id: 'user3', name: 'Michael Chen', avatar: '👨‍💻', role: 'editor', department: 'Estimating' },
  { id: 'user4', name: 'Jessica Lee', avatar: '👩‍🔧', role: 'viewer', department: 'Engineering' },
  { id: 'user5', name: 'Robert Taylor', avatar: '👨‍🏫', role: 'viewer', department: 'Finance' },
];

const SAMPLE_MATERIALS: Material[] = [
  {
    id: 'mat1',
    name: 'Concrete Mix - High Strength',
    description: 'Premium high-strength concrete mix suitable for structural applications',
    unit: 'cubic yard',
    quantity: 250,
    unitPrice: 125,
    status: 'approved',
    lastEditedBy: 'user3',
    comments: [
      {
        id: 'com1',
        userId: 'user2',
        content: 'Should we consider the standard mix to reduce costs?',
        timestamp: Date.now() - 3600000 * 24,
        resolved: true,
      },
      {
        id: 'com2',
        userId: 'user3',
        content: 'The high-strength mix is required for the foundation per engineering specs.',
        timestamp: Date.now() - 3600000 * 23,
        resolved: true,
      },
    ],
  },
  {
    id: 'mat2',
    name: 'Rebar #4',
    description: 'Standard #4 rebar (0.5" diameter) for concrete reinforcement',
    unit: 'ton',
    quantity: 18,
    unitPrice: 980,
    status: 'approved',
    lastEditedBy: 'user2',
    comments: [],
  },
  {
    id: 'mat3',
    name: 'Geotextile Fabric',
    description: 'Non-woven geotextile fabric for ground stabilization',
    unit: 'sq. ft.',
    quantity: 12000,
    unitPrice: 0.45,
    status: 'discussion',
    lastEditedBy: 'user2',
    comments: [
      {
        id: 'com3',
        userId: 'user1',
        content: 'Can we get a sample of this material to confirm compatibility with our site conditions?',
        timestamp: Date.now() - 1800000,
        resolved: false,
      },
    ],
  },
  {
    id: 'mat4',
    name: 'Structural Steel I-Beams',
    description: 'W12x26 structural steel I-beams for mezzanine construction',
    unit: 'linear ft.',
    quantity: 450,
    unitPrice: 42,
    status: 'pending',
    lastEditedBy: 'user3',
    comments: [
      {
        id: 'com4',
        userId: 'user4',
        content: 'The engineering specs call for W12x30. Should we adjust?',
        timestamp: Date.now() - 600000,
        resolved: false,
      },
    ],
  },
  {
    id: 'mat5',
    name: 'Gravel - 3/4" Crushed Stone',
    description: 'Clean 3/4" crushed stone aggregate for base preparation',
    unit: 'ton',
    quantity: 180,
    unitPrice: 38,
    status: 'approved',
    lastEditedBy: 'user1',
    comments: [],
  },
];

const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act1', 
    userId: 'user1', 
    action: 'created', 
    target: 'quote',
    timestamp: Date.now() - 3600000 * 48
  },
  {
    id: 'act2', 
    userId: 'user2', 
    action: 'added', 
    target: 'Concrete Mix - High Strength',
    timestamp: Date.now() - 3600000 * 47
  },
  {
    id: 'act3', 
    userId: 'user3', 
    action: 'updated', 
    target: 'Concrete Mix - High Strength',
    timestamp: Date.now() - 3600000 * 46
  },
  {
    id: 'act4', 
    userId: 'user2', 
    action: 'commented on', 
    target: 'Concrete Mix - High Strength',
    timestamp: Date.now() - 3600000 * 24
  },
  {
    id: 'act5', 
    userId: 'user3', 
    action: 'replied to comment on', 
    target: 'Concrete Mix - High Strength',
    timestamp: Date.now() - 3600000 * 23
  },
  {
    id: 'act6', 
    userId: 'user1', 
    action: 'approved', 
    target: 'Concrete Mix - High Strength',
    timestamp: Date.now() - 3600000 * 22
  },
  {
    id: 'act7', 
    userId: 'user2', 
    action: 'added', 
    target: 'Rebar #4',
    timestamp: Date.now() - 3600000 * 20
  },
  {
    id: 'act8', 
    userId: 'user1', 
    action: 'approved', 
    target: 'Rebar #4',
    timestamp: Date.now() - 3600000 * 19
  },
  {
    id: 'act9', 
    userId: 'user2', 
    action: 'added', 
    target: 'Geotextile Fabric',
    timestamp: Date.now() - 3600000 * 10
  },
  {
    id: 'act10', 
    userId: 'user1', 
    action: 'commented on', 
    target: 'Geotextile Fabric',
    timestamp: Date.now() - 1800000
  },
  {
    id: 'act11', 
    userId: 'user3', 
    action: 'added', 
    target: 'Structural Steel I-Beams',
    timestamp: Date.now() - 1200000
  },
  {
    id: 'act12', 
    userId: 'user4', 
    action: 'commented on', 
    target: 'Structural Steel I-Beams',
    timestamp: Date.now() - 600000
  },
  {
    id: 'act13', 
    userId: 'user1', 
    action: 'added', 
    target: 'Gravel - 3/4" Crushed Stone',
    timestamp: Date.now() - 300000
  },
  {
    id: 'act14', 
    userId: 'user1', 
    action: 'approved', 
    target: 'Gravel - 3/4" Crushed Stone',
    timestamp: Date.now() - 240000
  },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg1',
    userId: 'user1',
    content: 'Welcome to the workspace! I\'ve started the quote for the Main Street project.',
    timestamp: Date.now() - 3600000 * 48,
  },
  {
    id: 'msg2',
    userId: 'user2',
    content: 'Great, I\'ll start adding the concrete and rebar materials.',
    timestamp: Date.now() - 3600000 * 47,
  },
  {
    id: 'msg3',
    userId: 'user3',
    content: 'I\'ll review the engineering specs and make sure we have the right quantities.',
    timestamp: Date.now() - 3600000 * 46,
  },
  {
    id: 'msg4',
    userId: 'user1',
    content: 'Just approved the concrete and rebar. Let\'s move on to site prep materials.',
    timestamp: Date.now() - 3600000 * 22,
  },
  {
    id: 'msg5',
    userId: 'user4',
    content: 'I noticed we might need to adjust the I-beam specs based on the revised drawings.',
    timestamp: Date.now() - 3600000 * 5,
  },
  {
    id: 'msg6',
    userId: 'user3',
    content: 'Good catch Jessica! I\'ll take a look at that right away.',
    timestamp: Date.now() - 3600000 * 4.8,
  },
];

export default function CollaborativeWorkspace() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User>(USERS[0]);
  const [materials, setMaterials] = useState<Material[]>(SAMPLE_MATERIALS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [activeTab, setActiveTab] = useState<'materials' | 'chat' | 'activity'>('materials');
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [newComment, setNewComment] = useState({ materialId: '', content: '' });
  
  // For new material form
  const [showNewMaterialForm, setShowNewMaterialForm] = useState(false);
  const [newMaterial, setNewMaterial] = useState<Partial<Material>>({
    name: '',
    description: '',
    unit: '',
    quantity: 0,
    unitPrice: 0,
  });
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom of chat
  useEffect(() => {
    if (activeTab === 'chat' && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);
  
  // Load data from session storage
  useEffect(() => {
    const savedWorkspace = sessionStorage.getItem('collaborativeWorkspace');
    if (savedWorkspace) {
      const data = JSON.parse(savedWorkspace);
      setMaterials(data.materials || SAMPLE_MATERIALS);
      setMessages(data.messages || INITIAL_MESSAGES);
      setActivities(data.activities || INITIAL_ACTIVITIES);
    }
  }, []);
  
  // Save data to session storage
  const saveToSessionStorage = () => {
    const workspaceData = {
      materials,
      messages,
      activities,
    };
    sessionStorage.setItem('collaborativeWorkspace', JSON.stringify(workspaceData));
  };
  
  // Effect to save data when state changes
  useEffect(() => {
    saveToSessionStorage();
  }, [materials, messages, activities]);
  
  // Helper to get user by ID
  const getUserById = (userId: string): User => {
    return USERS.find(user => user.id === userId) || USERS[0];
  };
  
  // Handle user change
  const handleUserChange = (userId: string) => {
    const user = USERS.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      
      // Add activity for user change
      const newActivity: Activity = {
        id: `act${activities.length + 1}`,
        userId: user.id,
        action: 'joined',
        target: 'workspace',
        timestamp: Date.now(),
      };
      
      setActivities([...activities, newActivity]);
    }
  };
  
  // Handle material edit
  const handleEditMaterial = (material: Material) => {
    setEditingMaterial(material);
  };
  
  // Handle save material edit
  const handleSaveMaterial = () => {
    if (editingMaterial) {
      const updatedMaterials = materials.map(mat => 
        mat.id === editingMaterial.id ? { ...editingMaterial, lastEditedBy: currentUser.id } : mat
      );
      
      setMaterials(updatedMaterials);
      
      // Add activity
      const newActivity: Activity = {
        id: `act${activities.length + 1}`,
        userId: currentUser.id,
        action: 'updated',
        target: editingMaterial.name,
        timestamp: Date.now(),
      };
      
      setActivities([...activities, newActivity]);
      setEditingMaterial(null);
    }
  };
  
  // Handle cancel material edit
  const handleCancelEdit = () => {
    setEditingMaterial(null);
  };
  
  // Handle status change
  const handleStatusChange = (materialId: string, status: 'pending' | 'approved' | 'rejected' | 'discussion') => {
    const updatedMaterials = materials.map(mat => {
      if (mat.id === materialId) {
        return { ...mat, status, lastEditedBy: currentUser.id };
      }
      return mat;
    });
    
    const material = materials.find(m => m.id === materialId);
    
    if (material) {
      // Add activity
      const newActivity: Activity = {
        id: `act${activities.length + 1}`,
        userId: currentUser.id,
        action: status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : 'moved to discussion',
        target: material.name,
        timestamp: Date.now(),
      };
      
      setActivities([...activities, newActivity]);
    }
    
    setMaterials(updatedMaterials);
  };
  
  // Handle adding a comment
  const handleAddComment = (materialId: string) => {
    if (newComment.content.trim() === '') return;
    
    const updatedMaterials = materials.map(mat => {
      if (mat.id === materialId) {
        const newCommentObj: Comment = {
          id: `com${Date.now()}`,
          userId: currentUser.id,
          content: newComment.content,
          timestamp: Date.now(),
          resolved: false,
        };
        
        return { 
          ...mat, 
          comments: [...mat.comments, newCommentObj],
          status: 'discussion'
        };
      }
      return mat;
    });
    
    const material = materials.find(m => m.id === materialId);
    
    if (material) {
      // Add activity
      const newActivity: Activity = {
        id: `act${activities.length + 1}`,
        userId: currentUser.id,
        action: 'commented on',
        target: material.name,
        timestamp: Date.now(),
      };
      
      setActivities([...activities, newActivity]);
    }
    
    setMaterials(updatedMaterials);
    setNewComment({ materialId: '', content: '' });
  };
  
  // Handle resolving a comment
  const handleResolveComment = (materialId: string, commentId: string) => {
    const updatedMaterials = materials.map(mat => {
      if (mat.id === materialId) {
        const updatedComments = mat.comments.map(com => {
          if (com.id === commentId) {
            return { ...com, resolved: true };
          }
          return com;
        });
        
        // Check if all comments are resolved
        const allResolved = updatedComments.every(com => com.resolved);
        
        return { 
          ...mat, 
          comments: updatedComments,
          status: allResolved ? 'pending' : 'discussion'
        };
      }
      return mat;
    });
    
    const material = materials.find(m => m.id === materialId);
    
    if (material) {
      // Add activity
      const newActivity: Activity = {
        id: `act${activities.length + 1}`,
        userId: currentUser.id,
        action: 'resolved comment on',
        target: material.name,
        timestamp: Date.now(),
      };
      
      setActivities([...activities, newActivity]);
    }
    
    setMaterials(updatedMaterials);
  };
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const message: Message = {
      id: `msg${Date.now()}`,
      userId: currentUser.id,
      content: newMessage,
      timestamp: Date.now(),
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Add activity
    const newActivity: Activity = {
      id: `act${activities.length + 1}`,
      userId: currentUser.id,
      action: 'sent message in',
      target: 'chat',
      timestamp: Date.now(),
    };
    
    setActivities([...activities, newActivity]);
  };
  
  // Handle adding new material
  const handleAddNewMaterial = () => {
    if (!newMaterial.name || !newMaterial.unit || !newMaterial.quantity || !newMaterial.unitPrice) {
      return; // Simple validation
    }
    
    const material: Material = {
      id: `mat${Date.now()}`,
      name: newMaterial.name,
      description: newMaterial.description || '',
      unit: newMaterial.unit,
      quantity: newMaterial.quantity,
      unitPrice: newMaterial.unitPrice,
      status: 'pending',
      lastEditedBy: currentUser.id,
      comments: [],
    };
    
    setMaterials([...materials, material]);
    
    // Add activity
    const newActivity: Activity = {
      id: `act${activities.length + 1}`,
      userId: currentUser.id,
      action: 'added',
      target: material.name,
      timestamp: Date.now(),
    };
    
    setActivities([...activities, newActivity]);
    
    // Reset form
    setNewMaterial({
      name: '',
      description: '',
      unit: '',
      quantity: 0,
      unitPrice: 0,
    });
    setShowNewMaterialForm(false);
  };
  
  // Format timestamp
  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  // Format compact timestamp
  const formatCompactTimestamp = (timestamp: number): string => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 0) {
      return `${diffDay}d ago`;
    } else if (diffHour > 0) {
      return `${diffHour}h ago`;
    } else if (diffMin > 0) {
      return `${diffMin}m ago`;
    } else {
      return 'Just now';
    }
  };
  
  // Calculate total price
  const calculateTotal = (): number => {
    return materials.reduce((sum, mat) => sum + (mat.quantity * mat.unitPrice), 0);
  };
  
  // Count materials by status
  const countByStatus = (status: 'pending' | 'approved' | 'rejected' | 'discussion'): number => {
    return materials.filter(mat => mat.status === status).length;
  };
  
  // Check if user has edit permissions
  const canEdit = (): boolean => {
    return currentUser.role === 'admin' || currentUser.role === 'editor';
  };
  
  // Check if user has approval permissions
  const canApprove = (): boolean => {
    return currentUser.role === 'admin';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header currentPage="prototype-7" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Workspace Header */}
        <div className="mb-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Main Street Construction Project</h1>
              <p className="text-gray-600 dark:text-gray-300">Collaborative Quote Workspace</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 dark:text-gray-300">Working as:</span>
                <select 
                  value={currentUser.id}
                  onChange={(e) => handleUserChange(e.target.value)}
                  className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
                >
                  {USERS.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.avatar} {user.name} ({user.role})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-md">
              <span className="font-medium mr-2">Quote Status:</span>
              <span>In Progress</span>
            </div>
            <div className="flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md">
              <span className="font-medium mr-2">Total:</span>
              <span>${calculateTotal().toLocaleString()}</span>
            </div>
            <div className="flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md">
              <span className="font-medium mr-2">Approved:</span>
              <span>{countByStatus('approved')}</span>
            </div>
            <div className="flex items-center px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-md">
              <span className="font-medium mr-2">Pending:</span>
              <span>{countByStatus('pending')}</span>
            </div>
            <div className="flex items-center px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-md">
              <span className="font-medium mr-2">In Discussion:</span>
              <span>{countByStatus('discussion')}</span>
            </div>
          </div>
        </div>
        
        {/* Tab Buttons */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'materials' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('materials')}
          >
            Materials
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'chat' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('chat')}
          >
            Team Chat
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'activity' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('activity')}
          >
            Activity Log
          </button>
        </div>
        
        {/* Materials Tab */}
        {activeTab === 'materials' && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold">Materials List</h2>
              {canEdit() && (
                <button
                  onClick={() => setShowNewMaterialForm(true)}
                  className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Add Material
                </button>
              )}
            </div>
            
            {/* New Material Form */}
            {showNewMaterialForm && (
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <h3 className="text-lg font-bold mb-4">Add New Material</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      value={newMaterial.name}
                      onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <input
                      type="text"
                      value={newMaterial.description}
                      onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit</label>
                    <input
                      type="text"
                      value={newMaterial.unit}
                      onChange={(e) => setNewMaterial({ ...newMaterial, unit: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
                    <input
                      type="number"
                      value={newMaterial.quantity || ''}
                      onChange={(e) => setNewMaterial({ ...newMaterial, quantity: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit Price ($)</label>
                    <input
                      type="number"
                      value={newMaterial.unitPrice || ''}
                      onChange={(e) => setNewMaterial({ ...newMaterial, unitPrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowNewMaterialForm(false)}
                    className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddNewMaterial}
                    className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                  >
                    Add Material
                  </button>
                </div>
              </div>
            )}
            
            {/* Materials List */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {materials.map((material) => (
                <div key={material.id} className="p-6">
                  {/* Material Editing Form */}
                  {editingMaterial && editingMaterial.id === material.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                          <input
                            type="text"
                            value={editingMaterial.name}
                            onChange={(e) => setEditingMaterial({ ...editingMaterial, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                          <input
                            type="text"
                            value={editingMaterial.description}
                            onChange={(e) => setEditingMaterial({ ...editingMaterial, description: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit</label>
                          <input
                            type="text"
                            value={editingMaterial.unit}
                            onChange={(e) => setEditingMaterial({ ...editingMaterial, unit: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
                          <input
                            type="number"
                            value={editingMaterial.quantity}
                            onChange={(e) => setEditingMaterial({ ...editingMaterial, quantity: Number(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit Price ($)</label>
                          <input
                            type="number"
                            value={editingMaterial.unitPrice}
                            onChange={(e) => setEditingMaterial({ ...editingMaterial, unitPrice: Number(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={handleCancelEdit}
                          className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveMaterial}
                          className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Material Display */}
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg font-bold mr-3">{material.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              material.status === 'approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                              material.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                              material.status === 'discussion' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' :
                              'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                            }`}>
                              {material.status.charAt(0).toUpperCase() + material.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mb-2">{material.description}</p>
                          <div className="flex flex-wrap gap-4">
                            <p className="text-sm"><span className="font-medium">Quantity:</span> {material.quantity} {material.unit}</p>
                            <p className="text-sm"><span className="font-medium">Unit Price:</span> ${material.unitPrice.toFixed(2)}</p>
                            <p className="text-sm"><span className="font-medium">Total:</span> ${(material.quantity * material.unitPrice).toFixed(2)}</p>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Last edited by {getUserById(material.lastEditedBy).name}
                          </p>
                        </div>
                        
                        {/* Action Buttons */}
                        {(canEdit() || canApprove()) && (
                          <div className="flex flex-wrap gap-2">
                            {canEdit() && (
                              <button
                                onClick={() => handleEditMaterial(material)}
                                className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                              >
                                Edit
                              </button>
                            )}
                            {canApprove() && material.status !== 'approved' && (
                              <button
                                onClick={() => handleStatusChange(material.id, 'approved')}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
                              >
                                Approve
                              </button>
                            )}
                            {canApprove() && material.status !== 'rejected' && (
                              <button
                                onClick={() => handleStatusChange(material.id, 'rejected')}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                              >
                                Reject
                              </button>
                            )}
                            {canEdit() && material.status !== 'discussion' && (
                              <button
                                onClick={() => handleStatusChange(material.id, 'discussion')}
                                className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-md text-sm"
                              >
                                Move to Discussion
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Comments Section */}
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Comments</h4>
                        
                        {material.comments.length === 0 ? (
                          <p className="text-gray-500 dark:text-gray-400 text-sm italic">No comments yet.</p>
                        ) : (
                          <div className="space-y-3">
                            {material.comments.map((comment) => (
                              <div key={comment.id} className={`p-3 rounded-lg ${comment.resolved ? 'bg-gray-100 dark:bg-gray-800/50' : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800'}`}>
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center">
                                    <span className="font-medium mr-2">{getUserById(comment.userId).avatar} {getUserById(comment.userId).name}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{formatCompactTimestamp(comment.timestamp)}</span>
                                  </div>
                                  {!comment.resolved && (
                                    <button
                                      onClick={() => handleResolveComment(material.id, comment.id)}
                                      className="text-xs text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                    >
                                      Resolve
                                    </button>
                                  )}
                                </div>
                                <p className={`mt-1 ${comment.resolved ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-200'}`}>
                                  {comment.content}
                                </p>
                                {comment.resolved && (
                                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">Resolved</p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Add Comment Form */}
                        <div className="mt-3 flex">
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment.materialId === material.id ? newComment.content : ''}
                            onChange={(e) => setNewComment({ materialId: material.id, content: e.target.value })}
                            onFocus={() => setNewComment({ materialId: material.id, content: newComment.materialId === material.id ? newComment.content : '' })}
                            className="flex-1 border border-gray-300 dark:border-gray-700 rounded-l-md px-3 py-2"
                          />
                          <button
                            onClick={() => handleAddComment(material.id)}
                            className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-r-md"
                          >
                            Comment
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
              
              {materials.length === 0 && (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  <p>No materials added yet. Click "Add Material" to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold">Team Chat</h2>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => {
                    const user = getUserById(message.userId);
                    const isCurrentUser = user.id === currentUser.id;
                    
                    return (
                      <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-lg p-3 ${
                          isCurrentUser 
                            ? 'bg-primary text-white rounded-tr-none' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-tl-none'
                        }`}>
                          <div className="flex items-center mb-1">
                            <span className="font-medium text-sm">{user.avatar} {user.name}</span>
                            <span className={`ml-2 text-xs ${
                              isCurrentUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {formatCompactTimestamp(message.timestamp)}
                            </span>
                          </div>
                          <p>{message.content}</p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={chatEndRef} />
                </div>
              )}
            </div>
            
            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 border border-gray-300 dark:border-gray-700 rounded-l-md px-3 py-2"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-r-md"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold">Activity Log</h2>
            </div>
            
            {/* Activity List */}
            <div className="p-4">
              {activities.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-6">No activity recorded yet.</p>
              ) : (
                <div className="relative">
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  
                  <div className="space-y-4">
                    {[...activities].reverse().map((activity) => {
                      const user = getUserById(activity.userId);
                      
                      return (
                        <div key={activity.id} className="relative flex items-start pl-8">
                          <div className="absolute left-0 mt-1.5 w-2.5 h-2.5 rounded-full bg-primary"></div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <span className="font-medium">{user.avatar} {user.name}</span>
                              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                {formatTimestamp(activity.timestamp)}
                              </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-200">
                              {activity.action} {activity.target}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Actions Bar */}
        <div className="mt-8 flex flex-wrap gap-4 justify-end">
          <button
            onClick={() => {
              // This would save a final version and return to the main prototype page
              router.push('/prototype-7');
            }}
            className="border border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Exit Workspace
          </button>
          
          <button
            onClick={() => {
              // In a real app, this would finalize and submit the quote
              alert('Quote has been saved! In a real application, this would finalize and submit the quote for customer review.');
            }}
            className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Finalize Quote
          </button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}