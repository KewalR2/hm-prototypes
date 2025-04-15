'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Types
type ContractStatus = 'draft' | 'pending_signature' | 'signed' | 'active' | 'completed' | 'cancelled';

type Milestone = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  paymentAmount?: number;
  paymentStatus?: 'unpaid' | 'paid';
};

type Contract = {
  id: string;
  title: string;
  customer: {
    name: string;
    company: string;
    email: string;
  };
  quoteId: string;
  quoteAmount: number;
  created: string;
  updated: string;
  status: ContractStatus;
  signingDeadline?: string;
  startDate?: string;
  endDate?: string;
  milestones: Milestone[];
  materials: {
    name: string;
    quantity: number;
    unit: string;
    deliveryDate: string;
  }[];
  notes?: string;
};

// Sample contracts data
const SAMPLE_CONTRACTS: Contract[] = [
  {
    id: 'cont-1001',
    title: 'Main Street Project - Phase 1 Materials',
    customer: {
      name: 'Robert Johnson',
      company: 'Acme Construction',
      email: 'robert@acmeconstruction.com',
    },
    quoteId: 'Q-5782',
    quoteAmount: 125750,
    created: '2023-06-15',
    updated: '2023-06-18',
    status: 'active',
    signingDeadline: '2023-06-20',
    startDate: '2023-06-25',
    endDate: '2023-09-30',
    milestones: [
      {
        id: 'ms-1001-1',
        title: 'Initial Deposit',
        description: 'Due upon contract signing',
        dueDate: '2023-06-25',
        status: 'completed',
        paymentAmount: 37725,
        paymentStatus: 'paid',
      },
      {
        id: 'ms-1001-2',
        title: 'Concrete Material Delivery',
        description: 'Delivery of all concrete and rebar materials',
        dueDate: '2023-07-15',
        status: 'in_progress',
        paymentAmount: 50300,
        paymentStatus: 'unpaid',
      },
      {
        id: 'ms-1001-3',
        title: 'Steel Structure Delivery',
        description: 'Delivery of all structural steel components',
        dueDate: '2023-08-10',
        status: 'pending',
        paymentAmount: 37725,
        paymentStatus: 'unpaid',
      },
    ],
    materials: [
      {
        name: 'Concrete Mix - High Strength',
        quantity: 250,
        unit: 'cubic yard',
        deliveryDate: '2023-07-15',
      },
      {
        name: 'Rebar #4',
        quantity: 18,
        unit: 'ton',
        deliveryDate: '2023-07-15',
      },
      {
        name: 'Structural Steel I-Beams',
        quantity: 450,
        unit: 'linear ft',
        deliveryDate: '2023-08-10',
      },
    ],
  },
  {
    id: 'cont-1002',
    title: 'River Crossing Project - Foundation Materials',
    customer: {
      name: 'Sarah Miller',
      company: 'Miller Engineering & Construction',
      email: 'sarah.miller@millerconstruction.com',
    },
    quoteId: 'Q-5790',
    quoteAmount: 87500,
    created: '2023-06-10',
    updated: '2023-06-12',
    status: 'pending_signature',
    signingDeadline: '2023-06-25',
    startDate: '2023-07-01',
    endDate: '2023-10-15',
    milestones: [
      {
        id: 'ms-1002-1',
        title: 'Initial Deposit',
        description: 'Due upon contract signing',
        dueDate: '2023-07-01',
        status: 'pending',
        paymentAmount: 26250,
        paymentStatus: 'unpaid',
      },
      {
        id: 'ms-1002-2',
        title: 'Site Prep Materials Delivery',
        description: 'Delivery of all site preparation materials',
        dueDate: '2023-07-20',
        status: 'pending',
        paymentAmount: 30625,
        paymentStatus: 'unpaid',
      },
      {
        id: 'ms-1002-3',
        title: 'Waterproofing Materials Delivery',
        description: 'Delivery of all waterproofing materials',
        dueDate: '2023-08-05',
        status: 'pending',
        paymentAmount: 30625,
        paymentStatus: 'unpaid',
      },
    ],
    materials: [
      {
        name: 'Crushed Stone - 3/4"',
        quantity: 180,
        unit: 'ton',
        deliveryDate: '2023-07-20',
      },
      {
        name: 'Geotextile Fabric',
        quantity: 12000,
        unit: 'sq. ft.',
        deliveryDate: '2023-07-20',
      },
      {
        name: 'Waterproofing Membrane',
        quantity: 8500,
        unit: 'sq. ft.',
        deliveryDate: '2023-08-05',
      },
    ],
  },
  {
    id: 'cont-1003',
    title: 'Oakridge Mall Renovation - Phase 2',
    customer: {
      name: 'Daniel Chen',
      company: 'Chen Development Group',
      email: 'dchen@chendevelopment.com',
    },
    quoteId: 'Q-5741',
    quoteAmount: 215000,
    created: '2023-05-22',
    updated: '2023-06-05',
    status: 'completed',
    signingDeadline: '2023-05-30',
    startDate: '2023-06-01',
    endDate: '2023-06-10',
    milestones: [
      {
        id: 'ms-1003-1',
        title: 'Full Payment',
        description: 'Complete payment upon delivery',
        dueDate: '2023-06-10',
        status: 'completed',
        paymentAmount: 215000,
        paymentStatus: 'paid',
      },
    ],
    materials: [
      {
        name: 'Luxury Vinyl Tile',
        quantity: 25000,
        unit: 'sq. ft.',
        deliveryDate: '2023-06-05',
      },
      {
        name: 'Commercial Carpet Tile',
        quantity: 10000,
        unit: 'sq. ft.',
        deliveryDate: '2023-06-05',
      },
      {
        name: 'Acoustical Ceiling Tile',
        quantity: 18000,
        unit: 'sq. ft.',
        deliveryDate: '2023-06-05',
      },
    ],
  },
  {
    id: 'cont-1004',
    title: 'Pinecrest Residential Development',
    customer: {
      name: 'Jennifer White',
      company: 'White Residential Builders',
      email: 'jennifer@whitebuilders.com',
    },
    quoteId: 'Q-5810',
    quoteAmount: 175300,
    created: '2023-06-18',
    updated: '2023-06-19',
    status: 'draft',
    milestones: [],
    materials: [
      {
        name: 'Concrete Mix - Standard',
        quantity: 180,
        unit: 'cubic yard',
        deliveryDate: '2023-07-25',
      },
      {
        name: 'Lumber Package - Framing',
        quantity: 1,
        unit: 'package',
        deliveryDate: '2023-08-05',
      },
      {
        name: 'Roofing Shingles - Architectural',
        quantity: 150,
        unit: 'square',
        deliveryDate: '2023-08-20',
      },
    ],
  },
];

export default function ContractManagementPage() {
  const router = useRouter();
  
  // State management
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [filteredContracts, setFilteredContracts] = useState<Contract[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentContract, setCurrentContract] = useState<Contract | null>(null);
  const [showContractPreview, setShowContractPreview] = useState<boolean>(false);
  
  // Initialize contracts from sessionStorage or use sample data
  useEffect(() => {
    const savedContracts = sessionStorage.getItem('smartContracts');
    
    if (savedContracts) {
      const parsedContracts = JSON.parse(savedContracts);
      setContracts(parsedContracts);
      setFilteredContracts(parsedContracts);
    } else {
      setContracts(SAMPLE_CONTRACTS);
      setFilteredContracts(SAMPLE_CONTRACTS);
    }
  }, []);
  
  // Save contracts to sessionStorage when they change
  useEffect(() => {
    if (contracts.length > 0) {
      sessionStorage.setItem('smartContracts', JSON.stringify(contracts));
    }
  }, [contracts]);
  
  // Filter contracts based on status and search query
  useEffect(() => {
    let filtered = [...contracts];
    
    // Apply status filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(contract => contract.status === activeFilter);
    }
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(contract => 
        contract.title.toLowerCase().includes(query) ||
        contract.customer.name.toLowerCase().includes(query) ||
        contract.customer.company.toLowerCase().includes(query) ||
        contract.id.toLowerCase().includes(query)
      );
    }
    
    setFilteredContracts(filtered);
  }, [activeFilter, searchQuery, contracts]);
  
  // Open contract preview
  const handleOpenContract = (contract: Contract) => {
    setCurrentContract(contract);
    setShowContractPreview(true);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get status badge color
  const getStatusColor = (status: ContractStatus) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'pending_signature':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'signed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'completed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  // Get friendly status name
  const getStatusName = (status: ContractStatus) => {
    switch (status) {
      case 'draft':
        return 'Draft';
      case 'pending_signature':
        return 'Pending Signature';
      case 'signed':
        return 'Signed';
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };
  
  // Get milestone status color
  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'delayed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  // Handle contract signing
  const handleSignContract = (contractId: string) => {
    const updatedContracts = contracts.map(contract => {
      if (contract.id === contractId) {
        return {
          ...contract,
          status: 'active' as ContractStatus,
          updated: new Date().toISOString().split('T')[0],
          startDate: new Date().toISOString().split('T')[0],
        };
      }
      return contract;
    });
    
    setContracts(updatedContracts);
    
    // Update current contract if it's the one being signed
    if (currentContract && currentContract.id === contractId) {
      const updatedContract = updatedContracts.find(c => c.id === contractId);
      if (updatedContract) {
        setCurrentContract(updatedContract);
      }
    }
    
    // Show confirmation
    alert('Contract signed successfully! The contract is now active.');
  };
  
  // Handle completing a milestone
  const handleCompleteMilestone = (contractId: string, milestoneId: string) => {
    const updatedContracts = contracts.map(contract => {
      if (contract.id === contractId) {
        const updatedMilestones = contract.milestones.map(milestone => {
          if (milestone.id === milestoneId) {
            return {
              ...milestone,
              status: 'completed' as 'pending' | 'in_progress' | 'completed' | 'delayed',
              paymentStatus: 'paid' as 'unpaid' | 'paid',
            };
          }
          return milestone;
        });
        
        // Check if all milestones are completed to update contract status
        const allCompleted = updatedMilestones.every(m => m.status === 'completed');
        const newStatus = allCompleted ? 'completed' as ContractStatus : contract.status;
        
        return {
          ...contract,
          milestones: updatedMilestones,
          status: newStatus,
          updated: new Date().toISOString().split('T')[0],
        };
      }
      return contract;
    });
    
    setContracts(updatedContracts);
    
    // Update current contract if it's the one being modified
    if (currentContract && currentContract.id === contractId) {
      const updatedContract = updatedContracts.find(c => c.id === contractId);
      if (updatedContract) {
        setCurrentContract(updatedContract);
      }
    }
    
    // Show confirmation
    alert('Milestone completed successfully!');
  };
  
  // Generate contract from quote (would connect to real quote data in a full implementation)
  const handleCreateContractFromQuote = () => {
    const newContract: Contract = {
      id: `cont-${1000 + contracts.length + 1}`,
      title: 'New Office Building - Foundation Materials',
      customer: {
        name: 'Michael Rodriguez',
        company: 'Rodriguez Commercial Development',
        email: 'michael@rodriguezdevelopment.com',
      },
      quoteId: `Q-${5850 + contracts.length}`,
      quoteAmount: 143750,
      created: new Date().toISOString().split('T')[0],
      updated: new Date().toISOString().split('T')[0],
      status: 'draft',
      milestones: [
        {
          id: `ms-${1000 + contracts.length + 1}-1`,
          title: 'Initial Deposit',
          description: 'Due upon contract signing',
          dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'pending',
          paymentAmount: 43125,
          paymentStatus: 'unpaid',
        },
        {
          id: `ms-${1000 + contracts.length + 1}-2`,
          title: 'Foundation Materials Delivery',
          description: 'Delivery of all foundation materials',
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'pending',
          paymentAmount: 50313,
          paymentStatus: 'unpaid',
        },
        {
          id: `ms-${1000 + contracts.length + 1}-3`,
          title: 'Structural Materials Delivery',
          description: 'Delivery of all structural materials',
          dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'pending',
          paymentAmount: 50312,
          paymentStatus: 'unpaid',
        },
      ],
      materials: [
        {
          name: 'Concrete Mix - High Strength',
          quantity: 220,
          unit: 'cubic yard',
          deliveryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
        {
          name: 'Rebar #5',
          quantity: 12,
          unit: 'ton',
          deliveryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
        {
          name: 'Structural Steel Columns',
          quantity: 28,
          unit: 'piece',
          deliveryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
      ],
    };
    
    setContracts([...contracts, newContract]);
    setCurrentContract(newContract);
    setShowContractPreview(true);
    
    // Show confirmation
    alert('New contract created from quote successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header currentPage="prototype-8" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">Smart Contract Management</h1>
              <p className="text-gray-600 dark:text-gray-300">Manage all your material contracts in one place</p>
            </div>
            <button
              onClick={handleCreateContractFromQuote}
              className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Create Contract from Quote
            </button>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeFilter === 'all' 
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('draft')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeFilter === 'draft' 
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Drafts
              </button>
              <button
                onClick={() => setActiveFilter('pending_signature')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeFilter === 'pending_signature' 
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Pending Signature
              </button>
              <button
                onClick={() => setActiveFilter('active')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeFilter === 'active' 
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveFilter('completed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeFilter === 'completed' 
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Completed
              </button>
            </div>
            
            <div className="w-full md:w-72">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search contracts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-800"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contract List */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold">Contracts</h2>
          </div>
          
          {filteredContracts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No contracts found matching your criteria.</p>
              <button
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
                className="text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Contract
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Value
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Updated
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredContracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer" onClick={() => handleOpenContract(contract)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{contract.id}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{contract.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{contract.customer.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{contract.customer.company}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{formatCurrency(contract.quoteAmount)}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Quote: {contract.quoteId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(contract.status)}`}>
                          {getStatusName(contract.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(contract.updated)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-primary hover:text-blue-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenContract(contract);
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Contract Preview Modal */}
        {showContractPreview && currentContract && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-auto">
              {/* Modal Header */}
              <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{currentContract.title}</h2>
                    <p className="text-gray-500 dark:text-gray-400">Contract ID: {currentContract.id}</p>
                  </div>
                  <button
                    onClick={() => setShowContractPreview(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Contract Content */}
              <div className="p-6">
                {/* Status Bar */}
                <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(currentContract.status)}`}>
                      {getStatusName(currentContract.status)}
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    {currentContract.status === 'pending_signature' && (
                      <button
                        onClick={() => handleSignContract(currentContract.id)}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
                      >
                        Sign Contract
                      </button>
                    )}
                    <button className="text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 py-2 px-4 rounded-lg">
                      Download PDF
                    </button>
                  </div>
                </div>
                
                {/* Contract Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-bold mb-3">Contract Details</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                          <p className="font-medium">{formatDate(currentContract.created)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                          <p className="font-medium">{formatDate(currentContract.updated)}</p>
                        </div>
                        {currentContract.signingDeadline && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Signing Deadline</p>
                            <p className="font-medium">{formatDate(currentContract.signingDeadline)}</p>
                          </div>
                        )}
                        {currentContract.startDate && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
                            <p className="font-medium">{formatDate(currentContract.startDate)}</p>
                          </div>
                        )}
                        {currentContract.endDate && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">End Date</p>
                            <p className="font-medium">{formatDate(currentContract.endDate)}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Quote Reference</p>
                          <p className="font-medium">{currentContract.quoteId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Contract Value</p>
                          <p className="font-medium">{formatCurrency(currentContract.quoteAmount)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-3">Customer Information</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <p className="font-medium text-lg">{currentContract.customer.name}</p>
                      <p className="mb-3">{currentContract.customer.company}</p>
                      <p className="text-gray-600 dark:text-gray-400">{currentContract.customer.email}</p>
                    </div>
                  </div>
                </div>
                
                {/* Milestones */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-3">Milestones & Payments</h3>
                  {currentContract.milestones.length > 0 ? (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Milestone
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Due Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {currentContract.milestones.map((milestone) => (
                            <tr key={milestone.id}>
                              <td className="px-6 py-4">
                                <p className="font-medium">{milestone.title}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{milestone.description}</p>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {formatDate(milestone.dueDate)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {milestone.paymentAmount ? formatCurrency(milestone.paymentAmount) : 'N/A'}
                                {milestone.paymentStatus && (
                                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                    milestone.paymentStatus === 'paid' 
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                  }`}>
                                    {milestone.paymentStatus.charAt(0).toUpperCase() + milestone.paymentStatus.slice(1)}
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${getMilestoneStatusColor(milestone.status)}`}>
                                  {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1).replace('_', ' ')}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {currentContract.status === 'active' && milestone.status !== 'completed' && (
                                  <button
                                    onClick={() => handleCompleteMilestone(currentContract.id, milestone.id)}
                                    className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                  >
                                    Complete
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      No milestones defined for this contract yet.
                    </p>
                  )}
                </div>
                
                {/* Materials List */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-3">Materials Included</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Material
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Delivery Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {currentContract.materials.map((material, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4">
                              {material.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {material.quantity} {material.unit}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {formatDate(material.deliveryDate)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Digital Signature */}
                {currentContract.status === 'active' && (
                  <div className="mb-8 border border-green-300 dark:border-green-700 rounded-lg p-6 bg-green-50 dark:bg-green-900/20">
                    <div className="flex items-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <h3 className="text-lg font-bold text-green-700 dark:text-green-300">Digitally Signed Contract</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Supplier Signature</p>
                        <div className="mt-2 flex items-center">
                          <span className="text-lg font-medium font-serif italic">John Smith</span>
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(currentContract.updated)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Customer Signature</p>
                        <div className="mt-2 flex items-center">
                          <span className="text-lg font-medium font-serif italic">{currentContract.customer.name}</span>
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(currentContract.startDate || currentContract.updated)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      <p>Secure hash: 7d8c5b89e2f9a3d6c1e4f7b0a2d5e8c3f6a9b2d5e8f7c4a1d3b6e9f2c5a8b7d4e1f</p>
                      <p>Digital signatures secured and verified using DocuSign technology.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}