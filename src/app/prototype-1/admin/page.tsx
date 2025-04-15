import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function AdminPage() {
  // Mock quote request data
  const quoteRequests = [
    {
      id: 'QR-2025-04-10-001',
      company: 'Acme Construction',
      contact: 'John Smith',
      projectName: 'Highway 42 Expansion',
      location: 'Springfield, IL',
      materials: ['Crushed Stone', 'Sand'],
      requestDate: 'April 10, 2025 - 9:30 AM',
      status: 'Pending',
      priority: 'High'
    },
    {
      id: 'QR-2025-04-09-005',
      company: 'Metro Builders',
      contact: 'Sarah Johnson',
      projectName: 'City Center Plaza',
      location: 'Minneapolis, MN',
      materials: ['Concrete', 'Rebar', 'Gravel'],
      requestDate: 'April 9, 2025 - 3:45 PM',
      status: 'Processing',
      priority: 'Medium'
    },
    {
      id: 'QR-2025-04-09-002',
      company: 'Sunshine Landscaping',
      contact: 'Miguel Rodriguez',
      projectName: 'Parkview Residential Complex',
      location: 'Denver, CO',
      materials: ['Topsoil', 'Mulch', 'Limestone'],
      requestDate: 'April 9, 2025 - 10:15 AM',
      status: 'Pending',
      priority: 'Low'
    },
    {
      id: 'QR-2025-04-08-012',
      company: 'Highland Development',
      contact: 'Emma Chen',
      projectName: 'Mountain Ridge Condos',
      location: 'Salt Lake City, UT',
      materials: ['Crushed Stone', 'Asphalt', 'Sand'],
      requestDate: 'April 8, 2025 - 4:20 PM',
      status: 'Completed',
      priority: 'Medium'
    },
    {
      id: 'QR-2025-04-07-008',
      company: 'Riverfront Properties',
      contact: 'Robert Williams',
      projectName: 'Harbor View Apartments',
      location: 'Portland, OR',
      materials: ['Concrete', 'Gravel'],
      requestDate: 'April 7, 2025 - 1:10 PM',
      status: 'Completed',
      priority: 'High'
    }
  ];

  // Mock active quotes data
  const activeQuotes = [
    {
      id: 'QT-2025-04-10-001',
      company: 'Acme Construction',
      project: 'Highway 42 Expansion',
      total: 89250.00,
      createdDate: 'April 10, 2025',
      expiryDate: 'May 10, 2025',
      status: 'Ready for Review'
    },
    {
      id: 'QT-2025-04-09-003',
      company: 'Metro Builders',
      project: 'City Center Plaza',
      total: 143760.00,
      createdDate: 'April 9, 2025',
      expiryDate: 'May 9, 2025',
      status: 'Sent to Customer'
    },
    {
      id: 'QT-2025-04-08-007',
      company: 'Riverfront Properties',
      project: 'Harbor View Apartments',
      total: 67500.00,
      createdDate: 'April 8, 2025',
      expiryDate: 'May 8, 2025',
      status: 'Accepted'
    },
    {
      id: 'QT-2025-04-05-012',
      company: 'Sunshine Landscaping',
      project: 'Parkview Residential Complex',
      total: 12800.00,
      createdDate: 'April 5, 2025',
      expiryDate: 'May 5, 2025',
      status: 'Changes Requested'
    }
  ];

  // Function to determine status style
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Ready for Review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Sent to Customer':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'Accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Changes Requested':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Function to determine priority style
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link href="/prototype-1" className="text-primary hover:underline inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Prototype 1
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold">Quote Management Dashboard</h1>
              
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                  </div>
                  <input 
                    type="search" 
                    className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="Search quotes..." 
                  />
                </div>
                <button className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                  Generate New Quote
                </button>
              </div>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Pending Requests</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Active Quotes</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Quote Acceptance Rate</p>
                <p className="text-2xl font-bold">76%</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Avg. Response Time</p>
                <p className="text-2xl font-bold">2.3 hrs</p>
              </div>
            </div>

            {/* Quote Requests Tab */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-6">Recent Quote Requests</h2>
              
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Request ID</th>
                      <th className="px-6 py-3 font-semibold">Company</th>
                      <th className="px-6 py-3 font-semibold">Project</th>
                      <th className="px-6 py-3 font-semibold">Materials</th>
                      <th className="px-6 py-3 font-semibold">Request Date</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                      <th className="px-6 py-3 font-semibold">Priority</th>
                      <th className="px-6 py-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {quoteRequests.map((request) => (
                      <tr key={request.id} className="bg-white dark:bg-gray-900">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{request.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">{request.company}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{request.contact}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>{request.projectName}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{request.location}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {request.materials.map((material, index) => (
                              <span 
                                key={index} 
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-full"
                              >
                                {material}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{request.requestDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(request.status)}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityStyle(request.priority)}`}>
                            {request.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-primary hover:text-blue-700">
                            {request.status === 'Pending' ? 'Process' : 'View'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Active Quotes Tab */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Active Quotes</h2>
              
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Quote ID</th>
                      <th className="px-6 py-3 font-semibold">Company</th>
                      <th className="px-6 py-3 font-semibold">Project</th>
                      <th className="px-6 py-3 font-semibold">Total</th>
                      <th className="px-6 py-3 font-semibold">Created</th>
                      <th className="px-6 py-3 font-semibold">Expires</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                      <th className="px-6 py-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {activeQuotes.map((quote) => (
                      <tr key={quote.id} className="bg-white dark:bg-gray-900">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{quote.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{quote.company}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{quote.project}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${quote.total.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{quote.createdDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{quote.expiryDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(quote.status)}`}>
                            {quote.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link href="/prototype-1/view" className="text-primary hover:text-blue-700">
                            {quote.status === 'Accepted' ? 'View Order' : 'View Quote'}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}