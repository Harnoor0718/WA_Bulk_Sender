import { useState } from 'react';
import { ArrowLeft, Download, Calendar, Filter, TrendingUp, CheckCircle, XCircle, Clock, BarChart3, FileText, Search } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  recipients: number;
  sent: number;
  delivered: number;
  failed: number;
  timestamp: string;
  status: 'completed' | 'in-progress' | 'failed';
  message: string;
}

interface CampaignReportsProps {
  onBack: () => void;
}

export default function CampaignReports({ onBack }: CampaignReportsProps) {
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Demo campaign data
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Welcome Campaign',
      recipients: 150,
      sent: 150,
      delivered: 145,
      failed: 5,
      timestamp: '2024-11-14 10:30 AM',
      status: 'completed',
      message: 'Welcome to our service! We are excited to have you.'
    },
    {
      id: '2',
      name: 'Special Offer - Diwali',
      recipients: 500,
      sent: 500,
      delivered: 485,
      failed: 15,
      timestamp: '2024-11-13 02:15 PM',
      status: 'completed',
      message: '🎉 Diwali Special! Get 50% OFF on all products.'
    },
    {
      id: '3',
      name: 'Payment Reminder',
      recipients: 75,
      sent: 75,
      delivered: 72,
      failed: 3,
      timestamp: '2024-11-12 09:00 AM',
      status: 'completed',
      message: 'Your payment is due. Please pay before the deadline.'
    },
    {
      id: '4',
      name: 'Product Update',
      recipients: 200,
      sent: 120,
      delivered: 0,
      failed: 0,
      timestamp: '2024-11-14 03:45 PM',
      status: 'in-progress',
      message: 'New features added! Check out our latest update.'
    }
  ]);

  const totalSent = campaigns.reduce((sum, c) => sum + c.sent, 0);
  const totalDelivered = campaigns.reduce((sum, c) => sum + c.delivered, 0);
  const totalFailed = campaigns.reduce((sum, c) => sum + c.failed, 0);
  const successRate = totalSent > 0 ? ((totalDelivered / totalSent) * 100).toFixed(1) : 0;

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = ['Campaign Name', 'Recipients', 'Sent', 'Delivered', 'Failed', 'Success Rate', 'Status', 'Timestamp'];
    const rows = campaigns.map(c => [
      c.name,
      c.recipients,
      c.sent,
      c.delivered,
      c.failed,
      c.sent > 0 ? `${((c.delivered / c.sent) * 100).toFixed(1)}%` : '0%',
      c.status,
      c.timestamp
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campaign_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Campaign Reports</h1>
                <p className="text-gray-600">Track and analyze your messaging campaigns</p>
              </div>
            </div>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-600 transition"
            >
              <Download className="w-5 h-5" />
              Export CSV
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <p className="text-blue-100">Total Sent</p>
                <BarChart3 className="w-5 h-5 text-blue-200" />
              </div>
              <p className="text-3xl font-bold">{totalSent}</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <p className="text-green-100">Delivered</p>
                <CheckCircle className="w-5 h-5 text-green-200" />
              </div>
              <p className="text-3xl font-bold">{totalDelivered}</p>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <p className="text-red-100">Failed</p>
                <XCircle className="w-5 h-5 text-red-200" />
              </div>
              <p className="text-3xl font-bold">{totalFailed}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <p className="text-purple-100">Success Rate</p>
                <TrendingUp className="w-5 h-5 text-purple-200" />
              </div>
              <p className="text-3xl font-bold">{successRate}%</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Campaign
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date Range
              </label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Campaign List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-500" />
              Campaign History ({filteredCampaigns.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Campaign Name</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Recipients</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Sent</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Delivered</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Failed</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Success Rate</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCampaigns.map((campaign) => {
                  const rate = campaign.sent > 0 ? ((campaign.delivered / campaign.sent) * 100).toFixed(1) : 0;
                  return (
                    <tr key={campaign.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">{campaign.name}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">{campaign.message}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-800 font-medium">{campaign.recipients}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-blue-600 font-medium">{campaign.sent}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-green-600 font-medium">{campaign.delivered}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-red-600 font-medium">{campaign.failed}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                Number(rate) >= 90 ? 'bg-green-500' : Number(rate) >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${rate}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{rate}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            campaign.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : campaign.status === 'in-progress'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {campaign.status === 'in-progress' ? (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              In Progress
                            </span>
                          ) : campaign.status === 'completed' ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Completed
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <XCircle className="w-3 h-3" />
                              Failed
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{campaign.timestamp}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No campaigns found</p>
              <p className="text-gray-400 text-sm">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}