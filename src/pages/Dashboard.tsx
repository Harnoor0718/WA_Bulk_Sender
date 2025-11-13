import React, { useState } from 'react';
import { MessageSquare, Users, Send, CheckCircle, Menu, X, LogOut, Home, Book, Settings, Zap } from 'lucide-react';
import ContactsManagement from './ContactsManagement';
import MessageComposer from './MessageComposer';
import BulkSendInterface from './BulkSendInterface';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'contacts' | 'messages' | 'bulk-send' | 'settings'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    window.location.reload();
  };

  const stats = [
    { icon: Users, label: 'Total Contacts', value: '5', color: 'bg-blue-500' },
    { icon: Send, label: 'Messages Sent', value: '0', color: 'bg-green-500' },
    { icon: MessageSquare, label: 'Pending', value: '0', color: 'bg-yellow-500' },
    { icon: CheckCircle, label: 'Success Rate', value: '0%', color: 'bg-purple-500' },
  ];

  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
    { id: 'contacts' as const, label: 'Contacts', icon: Users },
    { id: 'messages' as const, label: 'Compose', icon: MessageSquare },
    { id: 'bulk-send' as const, label: 'Bulk Send', icon: Zap },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">WhatsApp Bulk Sender</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Send messages to multiple contacts</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${
                      activeTab === tab.id
                        ? 'bg-green-100 text-green-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            {/* User Menu */}
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">+91 98765 43210</p>
                <p className="text-xs text-green-600 flex items-center justify-end gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Active
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg transition ${
                        activeTab === tab.id
                          ? 'bg-green-100 text-green-700 font-semibold'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
                <div className="border-t pt-2 mt-2">
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium text-gray-800">+91 98765 43210</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Active
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition mt-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveTab('contacts')}
                  className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                >
                  <Users className="w-6 h-6 text-blue-600" />
                  <div className="text-left">
                    <p className="font-semibold text-blue-900">Manage Contacts</p>
                    <p className="text-sm text-blue-700">Add or import</p>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition"
                >
                  <MessageSquare className="w-6 h-6 text-green-600" />
                  <div className="text-left">
                    <p className="font-semibold text-green-900">Compose Message</p>
                    <p className="text-sm text-green-700">Create new</p>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('bulk-send')}
                  className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition"
                >
                  <Zap className="w-6 h-6 text-purple-600" />
                  <div className="text-left">
                    <p className="font-semibold text-purple-900">Bulk Send</p>
                    <p className="text-sm text-purple-700">Send to multiple</p>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition"
                >
                  <Settings className="w-6 h-6 text-orange-600" />
                  <div className="text-left">
                    <p className="font-semibold text-orange-900">Settings</p>
                    <p className="text-sm text-orange-700">Configure app</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Getting Started */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-md p-6 border-2 border-green-200">
              <div className="flex items-start gap-4">
                <div className="bg-green-500 p-3 rounded-lg">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Getting Started Guide</h2>
                  <ol className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-sm font-bold flex-shrink-0">1</span>
                      <div>
                        <p className="font-semibold">Add Contacts</p>
                        <p className="text-sm text-gray-600">Go to Contacts tab and add manually or upload Excel/CSV file</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-sm font-bold flex-shrink-0">2</span>
                      <div>
                        <p className="font-semibold">Compose Message</p>
                        <p className="text-sm text-gray-600">Create your message with text, emojis, and attachments</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-sm font-bold flex-shrink-0">3</span>
                      <div>
                        <p className="font-semibold">Test First</p>
                        <p className="text-sm text-gray-600">Send test message to verify everything works correctly</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-sm font-bold flex-shrink-0">4</span>
                      <div>
                        <p className="font-semibold">Bulk Send</p>
                        <p className="text-sm text-gray-600">Select contacts and send messages to all at once</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">✨ Key Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Manual contact entry</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Excel/CSV import</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Message templates with variables</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>File attachments support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Bulk message sending</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Real-time sending status</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Pro Tips</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Use personalization variables like {'{name}'} to make messages more engaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Set appropriate delays between messages to avoid spam detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Always test with a small group before sending to all contacts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Keep your contact list organized and up-to-date</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Follow WhatsApp's terms of service and anti-spam policies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && <ContactsManagement />}

        {/* Messages Tab */}
        {activeTab === 'messages' && <MessageComposer />}

        {/* Bulk Send Tab */}
        {activeTab === 'bulk-send' && <BulkSendInterface />}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Settings className="w-7 h-7" />
              Settings
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Business API Key
                </label>
                <input
                  type="password"
                  placeholder="Enter your WhatsApp API key"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Get your API key from WhatsApp Business Platform
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Message Delay (seconds)
                </label>
                <input
                  type="number"
                  defaultValue="5"
                  min="1"
                  max="60"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Delay between messages (recommended: 5-10 seconds)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="+91 98765 43210"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled
                />
                <p className="text-sm text-gray-500 mt-1">
                  Your registered WhatsApp number
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="notifications"
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
                <label htmlFor="notifications" className="text-gray-700">
                  Enable desktop notifications for message status
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="auto-save"
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  defaultChecked
                />
                <label htmlFor="auto-save" className="text-gray-700">
                  Auto-save message drafts
                </label>
              </div>

              <div className="pt-4 border-t">
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition shadow-lg">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;