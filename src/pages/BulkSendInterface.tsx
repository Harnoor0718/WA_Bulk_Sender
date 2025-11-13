import React, { useState } from 'react';
import { Send, Users, CheckCircle, Clock, AlertCircle, Play, Pause, X, Search, Filter } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phone: string;
  countryCode: string;
  selected: boolean;
}

interface SendStatus {
  contactId: string;
  status: 'pending' | 'sending' | 'success' | 'failed';
  message?: string;
}

const BulkSendInterface: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'John Doe', phone: '9876543210', countryCode: '+91', selected: false },
    { id: '2', name: 'Jane Smith', phone: '9876543211', countryCode: '+91', selected: false },
    { id: '3', name: 'Mike Johnson', phone: '9876543212', countryCode: '+91', selected: false },
    { id: '4', name: 'Sarah Williams', phone: '9876543213', countryCode: '+91', selected: false },
    { id: '5', name: 'David Brown', phone: '9876543214', countryCode: '+91', selected: false },
  ]);

  const [message, setMessage] = useState('Hi {name}! This is a test message from WhatsApp Bulk Sender. 🚀');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sendStatuses, setSendStatuses] = useState<SendStatus[]>([]);
  const [delay, setDelay] = useState(5);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const selectedContacts = contacts.filter(c => c.selected);
  const selectedCount = selectedContacts.length;

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  const toggleSelectAll = () => {
    const allSelected = filteredContacts.every(c => c.selected);
    setContacts(contacts.map(contact => {
      if (filteredContacts.find(fc => fc.id === contact.id)) {
        return { ...contact, selected: !allSelected };
      }
      return contact;
    }));
  };

  const toggleContact = (id: string) => {
    setContacts(contacts.map(c => 
      c.id === id ? { ...c, selected: !c.selected } : c
    ));
  };

  const startBulkSend = () => {
    if (selectedCount === 0) {
      alert('Please select at least one contact');
      return;
    }
    if (!message.trim()) {
      alert('Please enter a message');
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmSend = async () => {
    setShowConfirmModal(false);
    setIsSending(true);
    setIsPaused(false);

    // Initialize statuses
    const initialStatuses: SendStatus[] = selectedContacts.map(c => ({
      contactId: c.id,
      status: 'pending',
    }));
    setSendStatuses(initialStatuses);

    // Simulate sending messages
    for (let i = 0; i < selectedContacts.length; i++) {
      if (isPaused) {
        break;
      }

      const contact = selectedContacts[i];
      
      // Update to sending
      setSendStatuses(prev => prev.map(s => 
        s.contactId === contact.id ? { ...s, status: 'sending' } : s
      ));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Random success/failure for demo
      const success = Math.random() > 0.1;
      
      setSendStatuses(prev => prev.map(s => 
        s.contactId === contact.id 
          ? { 
              ...s, 
              status: success ? 'success' : 'failed',
              message: success ? 'Message sent successfully' : 'Failed to send message'
            } 
          : s
      ));

      // Delay between messages
      if (i < selectedContacts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * 1000));
      }
    }

    setIsSending(false);
  };

  const pauseSending = () => {
    setIsPaused(true);
    setIsSending(false);
  };

  const resumeSending = () => {
    setIsPaused(false);
    // Continue from where we left off
  };

  const getStatusIcon = (status: SendStatus['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-gray-400" />;
      case 'sending':
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: SendStatus['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-700';
      case 'sending':
        return 'bg-blue-100 text-blue-700';
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
    }
  };

  const successCount = sendStatuses.filter(s => s.status === 'success').length;
  const failedCount = sendStatuses.filter(s => s.status === 'failed').length;
  const pendingCount = sendStatuses.filter(s => s.status === 'pending').length;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Send className="w-8 h-8" />
          Bulk Message Sender
        </h1>
        <p className="mt-2 text-purple-100">Select contacts and send messages to multiple recipients</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Contact Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Message Input */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Message</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here... Use {name}, {phone} for personalization"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={4}
              disabled={isSending}
            />
            <div className="mt-2 flex justify-between items-center text-sm">
              <span className="text-gray-500">{message.length} characters</span>
              <div className="flex gap-2">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  {'{name}'}
                </span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  {'{phone}'}
                </span>
              </div>
            </div>
          </div>

          {/* Contact List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Select Contacts ({selectedCount} selected)
              </h2>
              <button
                onClick={toggleSelectAll}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                disabled={isSending}
              >
                {filteredContacts.every(c => c.selected) ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search contacts..."
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={isSending}
                />
              </div>
            </div>

            {/* Contact List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredContacts.map((contact) => {
                const status = sendStatuses.find(s => s.contactId === contact.id);
                return (
                  <div
                    key={contact.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 transition ${
                      contact.selected
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={contact.selected}
                      onChange={() => toggleContact(contact.id)}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                      disabled={isSending}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{contact.name}</p>
                      <p className="text-sm text-gray-500">
                        {contact.countryCode} {contact.phone}
                      </p>
                    </div>
                    {status && (
                      <div className="flex items-center gap-2">
                        {getStatusIcon(status.status)}
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(status.status)}`}>
                          {status.status}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel - Send Control */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-4">Sending Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Selected:</span>
                <span className="font-bold text-purple-600">{selectedCount}</span>
              </div>
              {sendStatuses.length > 0 && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Success:</span>
                    <span className="font-bold text-green-600">{successCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Failed:</span>
                    <span className="font-bold text-red-600">{failedCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-bold text-gray-600">{pendingCount}</span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${(successCount / selectedCount) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      {Math.round((successCount / selectedCount) * 100)}% Complete
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-4">Settings</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delay Between Messages (seconds)
              </label>
              <input
                type="number"
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                min="1"
                max="60"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isSending}
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommended: 5-10 seconds to avoid spam detection
              </p>
            </div>
          </div>

          {/* Send Button */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {!isSending && !isPaused && (
              <button
                onClick={startBulkSend}
                disabled={selectedCount === 0 || !message.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <Play className="w-5 h-5" />
                Start Bulk Send
              </button>
            )}

            {isSending && (
              <button
                onClick={pauseSending}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 shadow-lg"
              >
                <Pause className="w-5 h-5" />
                Pause Sending
              </button>
            )}

            {isPaused && (
              <div className="space-y-2">
                <button
                  onClick={resumeSending}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <Play className="w-5 h-5" />
                  Resume Sending
                </button>
                <button
                  onClick={() => {
                    setIsPaused(false);
                    setSendStatuses([]);
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
            <div className="flex gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-semibold mb-1">Important:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Use proper delay to avoid spam</li>
                  <li>Test with few contacts first</li>
                  <li>Follow WhatsApp policies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Bulk Send</h3>
            <p className="text-gray-600 mb-6">
              You are about to send messages to <strong>{selectedCount} contacts</strong>. 
              This action cannot be undone. Are you sure you want to continue?
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmSend}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition"
              >
                Yes, Send Messages
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkSendInterface;