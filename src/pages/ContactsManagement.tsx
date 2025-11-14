import { useState } from 'react';
import type { Contact } from '../App';
import { 
  ArrowLeft, UserPlus, Upload, Download, Trash2, CheckCircle, 
  XCircle, AlertCircle, Loader2, Users 
} from 'lucide-react';

interface ContactsManagementProps {
  contacts: Contact[];
  onAddContact: (contact: Contact) => void;
  onAddMultipleContacts: (contacts: Contact[]) => void;
  onDeleteContact: (id: string) => void;
  onClearAll: () => void;
  onBack: () => void;
}

export default function ContactsManagement({
  contacts,
  onAddContact,
  onAddMultipleContacts,
  onDeleteContact,
  onClearAll,
  onBack
}: ContactsManagementProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const verifiedContacts = contacts.filter(c => c.verified).length;
  const invalidContacts = contacts.filter(c => !c.verified).length;

  const validatePhone = (phoneNumber: string): boolean => {
    return phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);
  };

  const handleAddContact = () => {
    if (!name.trim() || !phone.trim()) {
      setMessage('Please enter both name and phone number');
      return;
    }

    if (!validatePhone(phone)) {
      setMessage('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newContact: Contact = {
        id: Date.now().toString(),
        name: name.trim(),
        phone: phone.trim(),
        verified: Math.random() > 0.2 // 80% verified rate for demo
      };
      onAddContact(newContact);
      setName('');
      setPhone('');
      setLoading(false);
      setMessage(`✅ ${name} added successfully!`);
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n').slice(1); // Skip header
        const newContacts: Contact[] = [];

        lines.forEach(line => {
          const [contactName, contactPhone] = line.split(',').map(s => s.trim());
          if (contactName && contactPhone && validatePhone(contactPhone)) {
            newContacts.push({
              id: Date.now().toString() + Math.random(),
              name: contactName,
              phone: contactPhone,
              verified: Math.random() > 0.2
            });
          }
        });

        onAddMultipleContacts(newContacts);
        setLoading(false);
        setMessage(`✅ ${newContacts.length} contacts imported successfully!`);
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setLoading(false);
        setMessage('❌ Error reading file');
      }
    };

    reader.readAsText(file);
  };

  const downloadTemplate = () => {
    const csv = 'Name,Phone\nJohn Doe,9876543210\nJane Smith,9876543211';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts_template.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Contacts Management</h1>
                <p className="text-gray-600">Add and manage your WhatsApp contacts</p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Contacts</p>
                  <p className="text-3xl font-bold">{contacts.length}</p>
                </div>
                <Users className="w-12 h-12 text-blue-200" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Verified</p>
                  <p className="text-3xl font-bold">{verifiedContacts}</p>
                </div>
                <CheckCircle className="w-12 h-12 text-green-200" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Invalid</p>
                  <p className="text-3xl font-bold">{invalidContacts}</p>
                </div>
                <XCircle className="w-12 h-12 text-red-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Add Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-blue-500" />
            Add New Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="Enter 10-digit phone"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAddContact}
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-600 disabled:opacity-50 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Add Contact
                </>
              )}
            </button>
          </div>
          {message && (
            <div className={`mt-4 p-3 rounded-lg ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}
        </div>

        {/* Excel Upload */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Upload className="w-6 h-6 text-purple-500" />
            Bulk Import from Excel/CSV
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <label className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">Click to upload Excel/CSV file</p>
              <p className="text-sm text-gray-400">Supports .xlsx, .xls, .csv</p>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <div className="flex flex-col gap-3">
              <button
                onClick={downloadTemplate}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                <Download className="w-5 h-5" />
                Download Template
              </button>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  Format: Name, Phone (10 digits)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contacts List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              Contact List ({contacts.length})
            </h2>
            {contacts.length > 0 && (
              <button
                onClick={onClearAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          {contacts.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No contacts yet</p>
              <p className="text-gray-400">Add contacts manually or import from Excel</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-gray-800 font-medium">{contact.name}</td>
                      <td className="px-6 py-4 text-gray-600">{contact.phone}</td>
                      <td className="px-6 py-4 text-center">
                        {contact.verified ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                            <CheckCircle className="w-4 h-4" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                            <XCircle className="w-4 h-4" />
                            Invalid
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => onDeleteContact(contact.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}