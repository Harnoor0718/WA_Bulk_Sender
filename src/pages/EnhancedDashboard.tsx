import type { Contact } from '../App';
import { 
  Users, MessageSquare, CheckCircle, XCircle, Clock, TrendingUp, 
  DollarSign, Send, UserPlus, BarChart3, Settings, LogOut, 
  Bell, Menu, X 
} from 'lucide-react';
import { useState } from 'react';

interface EnhancedDashboardProps {
  contacts: Contact[];
  onNavigate: (page: 'contacts' | 'composer' | 'reports' | 'payment') => void;
  onLogout: () => void;
}

export default function EnhancedDashboard({ contacts, onNavigate, onLogout }: EnhancedDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiMode, setApiMode] = useState<'demo' | 'real'>('demo');

  const verifiedContacts = contacts.filter(c => c.verified).length;
  const invalidContacts = contacts.filter(c => !c.verified).length;

  const stats = [
    { label: 'Total Contacts', value: contacts.length, icon: Users, color: 'from-blue-500 to-blue-600', change: '+12%' },
    { label: 'Verified Numbers', value: verifiedContacts, icon: CheckCircle, color: 'from-green-500 to-green-600', change: '+8%' },
    { label: 'Messages Sent Today', value: '1,234', icon: Send, color: 'from-purple-500 to-purple-600', change: '+23%' },
    { label: 'Total Messages Sent', value: '45,678', icon: MessageSquare, color: 'from-indigo-500 to-indigo-600', change: '+15%' },
    { label: 'Success Rate', value: '96.5%', icon: TrendingUp, color: 'from-green-500 to-emerald-600', change: '+2.1%' },
    { label: 'Failed Messages', value: invalidContacts, icon: XCircle, color: 'from-red-500 to-red-600', change: '-5%' },
    { label: 'Pending Messages', value: '23', icon: Clock, color: 'from-yellow-500 to-yellow-600', change: '0%' },
    { label: 'Delivered Today', value: '1,189', icon: CheckCircle, color: 'from-teal-500 to-teal-600', change: '+18%' },
    { label: 'Active Campaigns', value: '8', icon: BarChart3, color: 'from-pink-500 to-pink-600', change: '+3' },
    { label: 'This Month', value: '12,450', icon: MessageSquare, color: 'from-cyan-500 to-cyan-600', change: '+25%' },
    { label: 'API Calls Used', value: '8,456', icon: Settings, color: 'from-orange-500 to-orange-600', change: '+12%' },
    { label: 'API Calls Remaining', value: '41,544', icon: TrendingUp, color: 'from-lime-500 to-lime-600', change: '83%' },
    { label: 'Total Cost (₹)', value: '₹4,230', icon: DollarSign, color: 'from-emerald-500 to-emerald-600', change: '+₹450' },
    { label: 'Cost Per Message', value: '₹0.09', icon: DollarSign, color: 'from-violet-500 to-violet-600', change: '-₹0.01' },
    { label: 'Response Rate', value: '78.5%', icon: TrendingUp, color: 'from-blue-500 to-indigo-600', change: '+5.2%' },
    { label: 'Avg Response Time', value: '2.3 min', icon: Clock, color: 'from-amber-500 to-amber-600', change: '-0.5 min' },
    { label: 'Active Users', value: '3,456', icon: Users, color: 'from-rose-500 to-rose-600', change: '+234' },
    { label: 'Conversion Rate', value: '12.8%', icon: TrendingUp, color: 'from-fuchsia-500 to-fuchsia-600', change: '+1.2%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              📱 WhatsApp Bulk Sender
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => setShowApiModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              <Settings className="w-5 h-5" />
              <span className="hidden md:inline">API Config</span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transition-transform duration-300 mt-16 lg:mt-0`}>
          <nav className="p-4 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg">
              <BarChart3 className="w-5 h-5" />
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('contacts')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition text-left"
            >
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Contacts</span>
            </button>
            <button
              onClick={() => onNavigate('composer')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition text-left"
            >
              <Send className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Send Message</span>
            </button>
            <button
              onClick={() => onNavigate('reports')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition text-left"
            >
              <BarChart3 className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Reports</span>
            </button>
            <button
              onClick={() => onNavigate('payment')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition text-left"
            >
              <DollarSign className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">Payment & Billing</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {/* Demo Mode Banner */}
          {apiMode === 'demo' && (
            <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800 font-medium">Demo Mode Active - No real messages will be sent</span>
              </div>
              <button
                onClick={() => setShowApiModal(true)}
                className="text-yellow-600 hover:text-yellow-800 font-medium"
              >
                Configure API →
              </button>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => onNavigate('contacts')}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition"
              >
                <UserPlus className="w-5 h-5" />
                Add Contacts
              </button>
              <button
                onClick={() => onNavigate('composer')}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-600 transition"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
              <button
                onClick={() => onNavigate('reports')}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition"
              >
                <BarChart3 className="w-5 h-5" />
                View Reports
              </button>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* API Configuration Modal */}
      {showApiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">API Configuration</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">API Mode</label>
                <select
                  value={apiMode}
                  onChange={(e) => setApiMode(e.target.value as 'demo' | 'real')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="demo">Demo Mode (No real messages)</option>
                  <option value="real">Real Mode (Live messages)</option>
                </select>
              </div>
              {apiMode === 'real' && (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">API Key</label>
                  <input
                    type="password"
                    placeholder="Enter your WhatsApp API key"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowApiModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowApiModal(false)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}