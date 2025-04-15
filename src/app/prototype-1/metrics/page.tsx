import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function MetricsPage() {
  // Mock data for analytics
  const analyticsData = {
    summary: {
      totalQuotes: 120,
      convertedQuotes: 78,
      conversionRate: 65,
      avgResponseTime: 2.3, // hours
      avgQuoteValue: 47250.00,
      totalRevenue: 3685500.00
    },
    monthlyTrends: [
      { month: 'Jan', quotes: 18, conversions: 10, rate: 55.6 },
      { month: 'Feb', quotes: 22, conversions: 14, rate: 63.6 },
      { month: 'Mar', quotes: 25, conversions: 17, rate: 68.0 },
      { month: 'Apr', quotes: 30, conversions: 20, rate: 66.7 },
      { month: 'May', quotes: 25, conversions: 17, rate: 68.0 }
    ],
    materialTypes: [
      { type: 'Crushed Stone', requests: 45, conversions: 32, value: 1250000 },
      { type: 'Sand', requests: 38, conversions: 26, value: 850000 },
      { type: 'Concrete', requests: 32, conversions: 17, value: 950000 },
      { type: 'Asphalt', requests: 15, conversions: 10, value: 635500 },
      { type: 'Gravel', requests: 12, conversions: 8, value: 235000 },
      { type: 'Other', requests: 8, conversions: 5, value: 125000 }
    ],
    conversionFactors: [
      { factor: 'Response Time', impact: 'High', notes: 'Quotes responded to within 2 hours have 82% conversion rate' },
      { factor: 'Price Point', impact: 'High', notes: 'Competitive pricing within 5% of market average increases conversions by 35%' },
      { factor: 'Material Availability', impact: 'Medium', notes: 'Immediate availability increases likelihood of conversion by 28%' },
      { factor: 'Delivery Options', impact: 'Medium', notes: 'Flexible delivery windows improve conversions by 22%' },
      { factor: 'Follow-up Communication', impact: 'High', notes: 'Personal follow-up within 24 hours improves conversion by 40%' }
    ],
    recentOrders: [
      { id: 'ORD-2025-04-10-001', company: 'Acme Construction', value: 89250.00, fromQuote: 'QT-2025-04-10-001', conversionTime: '2 hours' },
      { id: 'ORD-2025-04-08-007', company: 'Riverfront Properties', value: 67500.00, fromQuote: 'QT-2025-04-08-007', conversionTime: '1 day' },
      { id: 'ORD-2025-04-05-012', company: 'Highland Development', value: 125750.00, fromQuote: 'QT-2025-04-05-012', conversionTime: '3 days' },
      { id: 'ORD-2025-04-02-005', company: 'Metro Builders', value: 43200.00, fromQuote: 'QT-2025-04-02-005', conversionTime: '5 hours' }
    ]
  };

  // Function to determine impact style
  const getImpactStyle = (impact) => {
    switch (impact) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
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
              <h1 className="text-2xl md:text-3xl font-bold">Quote Conversion Analytics</h1>
              
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <select className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                  <option value="last30days">Last 30 Days</option>
                  <option value="last90days">Last 90 Days</option>
                  <option value="ytd">Year to Date</option>
                  <option value="lastyear">Last Year</option>
                </select>
                <button className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                  Export Report
                </button>
              </div>
            </div>

            {/* KPI Summary */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Quotes</p>
                <p className="text-2xl font-bold">{analyticsData.summary.totalQuotes}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Converted</p>
                <p className="text-2xl font-bold">{analyticsData.summary.convertedQuotes}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold">{analyticsData.summary.conversionRate}%</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Avg. Response</p>
                <p className="text-2xl font-bold">{analyticsData.summary.avgResponseTime} hrs</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Avg. Quote Value</p>
                <p className="text-2xl font-bold">${analyticsData.summary.avgQuoteValue.toLocaleString()}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold">${(analyticsData.summary.totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Monthly Conversion Trend */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold mb-4">Monthly Conversion Trend</h2>
                
                <div className="h-64 flex items-end justify-between space-x-2">
                  {analyticsData.monthlyTrends.map((month, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="w-full flex justify-center space-x-1">
                        <div 
                          className="w-5 bg-blue-200 dark:bg-blue-900 rounded-t" 
                          style={{ height: `${(month.quotes / 30) * 100}%` }}
                        ></div>
                        <div 
                          className="w-5 bg-primary rounded-t" 
                          style={{ height: `${(month.conversions / 30) * 100}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs font-medium">{month.month}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{month.rate}%</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-4 space-x-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-200 dark:bg-blue-900 mr-2"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Quotes</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary mr-2"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Conversions</span>
                  </div>
                </div>
              </div>

              {/* Material Type Distribution */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold mb-4">Material Type Performance</h2>
                
                <div className="space-y-4">
                  {analyticsData.materialTypes.map((material, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{material.type}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {Math.round((material.conversions / material.requests) * 100)}% ({material.conversions}/{material.requests})
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${(material.conversions / material.requests) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Value: ${(material.value / 1000).toFixed(0)}k
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Conversion Factors */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold mb-4">Key Conversion Factors</h2>
                
                <div className="space-y-4">
                  {analyticsData.conversionFactors.map((factor, index) => (
                    <div key={index} className="flex">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactStyle(factor.impact)} self-start mt-0.5 mr-3`}
                      >
                        {factor.impact}
                      </span>
                      <div>
                        <h3 className="font-medium text-sm">{factor.factor}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{factor.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Converted Orders */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold mb-4">Recently Converted Orders</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2">Order</th>
                        <th className="px-4 py-2">Company</th>
                        <th className="px-4 py-2">Value</th>
                        <th className="px-4 py-2">Conv. Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {analyticsData.recentOrders.map((order, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="px-4 py-3 font-medium">{order.id}</td>
                          <td className="px-4 py-3">{order.company}</td>
                          <td className="px-4 py-3">${order.value.toLocaleString()}</td>
                          <td className="px-4 py-3">{order.conversionTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Future AI Recommendations Section */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                AI-Powered Recommendations
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-100 dark:border-blue-900">
                  <p className="font-medium text-sm mb-1">Optimize Response Time</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Reducing average response time from 2.3 hours to under 1 hour could increase conversion rate by approximately 17% based on historical patterns.</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-100 dark:border-blue-900">
                  <p className="font-medium text-sm mb-1">Focus on Crushed Stone Quotes</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Crushed Stone shows the highest conversion potential. Consider creating package deals with complementary materials to increase average order value.</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-100 dark:border-blue-900">
                  <p className="font-medium text-sm mb-1">Implement Automated Follow-ups</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Data shows 40% of unconverted quotes never received a follow-up. Implementing automatic follow-up system could recapture these potential conversions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}