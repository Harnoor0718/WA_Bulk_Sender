import { useState } from 'react';
import type { Contact } from '../App';
import { 
  ArrowLeft, Send, Users, FileText, CheckCircle, Loader2 
} from 'lucide-react';

interface MessageComposerProps {
  contacts: Contact[];
  onBack: () => void;
}

const templates = [
  {
    id: 'welcome',
    name: 'Welcome Message',
    content: 'Hello {name}! 👋\n\nWelcome to our service. We\'re excited to have you on board!'
  },
  {
    id: 'offer',
    name: 'Special Offer',
    content: 'Hi {name}! 🎉\n\nSpecial offer just for you! Get 50% OFF on your next purchase. Use code: SPECIAL50'
  },
  {
    id: 'appointment',
    name: 'Appointment Reminder',
    content: 'Dear {name},\n\nThis is a reminder for your appointment scheduled tomorrow at 10:00 AM. Please confirm.'
  },
  {
    id: 'payment',
    name: 'Payment Reminder',
    content: 'Hi {name},\n\nYour payment is due. Please clear your dues before the deadline to avoid penalties.'
  },
  {
    id: 'update',
    name: 'Product Update',
    content: 'Hello {name}! 🚀\n\nWe\'ve added exciting new features to our product. Check them out now!'
  }
];

export default function MessageComposer({ contacts, onBack }: MessageComposerProps) {
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [previewName, setPreviewName] = useState('John Doe');
  const [sending, setSending] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [sendComplete, setSendComplete] = useState(false);

  const verifiedContacts = contacts.filter(c => c.verified);

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setMessage(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const insertVariable = (variable: string) => {
    setMessage(prev => prev + `{${variable}}`);
  };

  const getPreviewMessage = () => {
    return message
      .replace(/{name}/g, previewName)
      .replace(/{phone}/g, '9876543210');
  };

  const handleSendMessage = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setShowConfirm(false);
      setSendComplete(true);
      setTimeout(() => {
        setSendComplete(false);
        setMessage('');
        setSelectedTemplate('');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Message Composer</h1>
              <p className="text-gray-600">Create and send bulk WhatsApp messages</p>
            </div>
          </div>

          {/* Recipients Info */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8" />
                <div>
                  <p className="text-sm text-green-100">Ready to Send</p>
                  <p className="text-2xl font-bold">{verifiedContacts.length} Verified Contacts</p>
                </div>
              </div>
              <CheckCircle className="w-12 h-12 text-green-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Message Editor */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-500" />
              Compose Message
            </h2>

            {/* Template Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Template (Optional)
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => handleTemplateSelect(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">-- Select a template --</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Message Textarea */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message Content
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">
                  {message.length} characters
                </span>
                <span className="text-xs text-gray-400">
                  Max 1000 characters
                </span>
              </div>
            </div>

            {/* Variables */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insert Variables
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => insertVariable('name')}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm"
                >
                  + Name
                </button>
                <button
                  onClick={() => insertVariable('phone')}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-sm"
                >
                  + Phone
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Variables will be replaced with actual contact data
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onBack}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                disabled={!message.trim() || verifiedContacts.length === 0}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Send className="w-5 h-5" />
                Send to {verifiedContacts.length} Contacts
              </button>
            </div>
          </div>

          {/* WhatsApp Preview */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Live Preview
            </h2>

            {/* Preview Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview with name:
              </label>
              <input
                type="text"
                value={previewName}
                onChange={(e) => setPreviewName(e.target.value)}
                placeholder="Enter name for preview"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* WhatsApp-style Preview */}
            <div className="bg-[#ECE5DD] rounded-lg p-4 min-h-[400px]">
              <div className="bg-[#E1F4CB] rounded-lg p-3 shadow-md max-w-[80%] ml-auto">
                {message ? (
                  <p className="text-gray-800 whitespace-pre-wrap break-words">
                    {getPreviewMessage()}
                  </p>
                ) : (
                  <p className="text-gray-400 italic">
                    Your message will appear here...
                  </p>
                )}
                <div className="text-right mt-1">
                  <span className="text-xs text-gray-500">
                    {new Date().toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 mb-2">
                <strong>💡 Tips:</strong>
              </p>
              <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                <li>Use {'{name}'} to personalize messages</li>
                <li>Keep messages clear and concise</li>
                <li>Test with preview before sending</li>
                <li>Only verified numbers will receive messages</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Confirm Sending
            </h2>
            <p className="text-gray-600 mb-6">
              You are about to send this message to{' '}
              <strong className="text-green-600">{verifiedContacts.length} verified contacts</strong>.
              This action cannot be undone.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {message.slice(0, 150)}
                {message.length > 150 ? '...' : ''}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={sending}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={sending}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-3 rounded-lg hover:from-green-600 hover:to-blue-600 transition"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Confirm & Send
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {sendComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Messages Sent Successfully!
            </h2>
            <p className="text-gray-600">
              Your message has been sent to {verifiedContacts.length} contacts
            </p>
          </div>
        </div>
      )}
    </div>
  );
}