import { useState } from 'react';
import {
  Users,
  UserPlus,
  Upload,
  Download,
  Trash2,
  Edit,
  Search,
  X,
  FileSpreadsheet,
  Check
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phone: string;
  countryCode: string;
}

const ContactsManagement = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  // Add Contact Form State
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    countryCode: '+91'
  });

  // File Upload State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const countries = [
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+1', name: 'USA', flag: '🇺🇸' },
    { code: '+44', name: 'UK', flag: '🇬🇧' },
    { code: '+971', name: 'UAE', flag: '🇦🇪' },
    { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
  ];

  // Add Contact Manually
  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      alert('Please fill all fields');
      return;
    }

    if (newContact.phone.length !== 10) {
      alert('Phone number must be 10 digits');
      return;
    }

    const contact: Contact = {
      id: Date.now().toString(),
      name: newContact.name,
      phone: newContact.phone,
      countryCode: newContact.countryCode
    };

    setContacts([...contacts, contact]);
    setNewContact({ name: '', phone: '', countryCode: '+91' });
    setShowAddModal(false);
    alert('Contact added successfully! ✅');
  };

  // Delete Contact
  const handleDeleteContact = (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  // Edit Contact
  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setNewContact({
      name: contact.name,
      phone: contact.phone,
      countryCode: contact.countryCode
    });
    setShowAddModal(true);
  };

  // Update Contact
  const handleUpdateContact = () => {
    if (!editingContact) return;

    if (!newContact.name || !newContact.phone) {
      alert('Please fill all fields');
      return;
    }

    setContacts(contacts.map(c =>
      c.id === editingContact.id
        ? { ...c, name: newContact.name, phone: newContact.phone, countryCode: newContact.countryCode }
        : c
    ));

    setNewContact({ name: '', phone: '', countryCode: '+91' });
    setEditingContact(null);
    setShowAddModal(false);
    alert('Contact updated successfully! ✅');
  };

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls') && !file.name.endsWith('.csv')) {
      alert('Please upload Excel (.xlsx, .xls) or CSV file only');
      return;
    }

    setUploadedFile(file);
    setUploadStatus('');
  };

  // Process Excel File (Demo - you'll need xlsx library for real implementation)
  const handleProcessFile = () => {
    if (!uploadedFile) return;

    setUploadStatus('Processing...');

    // Simulate processing delay
    setTimeout(() => {
      // Demo: Add 5 sample contacts from "uploaded file"
      const sampleContacts: Contact[] = [
        { id: Date.now().toString() + '1', name: 'John Doe', phone: '9876543210', countryCode: '+91' },
        { id: Date.now().toString() + '2', name: 'Jane Smith', phone: '9876543211', countryCode: '+91' },
        { id: Date.now().toString() + '3', name: 'Bob Johnson', phone: '9876543212', countryCode: '+91' },
        { id: Date.now().toString() + '4', name: 'Alice Williams', phone: '9876543213', countryCode: '+91' },
        { id: Date.now().toString() + '5', name: 'Charlie Brown', phone: '9876543214', countryCode: '+91' },
      ];

      setContacts([...contacts, ...sampleContacts]);
      setUploadStatus('success');
      
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadedFile(null);
        setUploadStatus('');
        alert('5 contacts imported successfully! ✅');
      }, 1000);
    }, 2000);
  };

  // Download Sample Excel
  const handleDownloadSample = () => {
    // Create sample CSV content
    const csvContent = 'Name,Phone,Country Code\nJohn Doe,9876543210,+91\nJane Smith,9876543211,+91';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_contacts.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Filter contacts by search
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Management</h2>
        <p className="text-gray-600">Add, edit, and manage your contacts</p>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              setEditingContact(null);
              setNewContact({ name: '', phone: '', countryCode: '+91' });
              setShowAddModal(true);
            }}
            className="flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add Contact
          </button>

          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Excel
          </button>

          <button
            onClick={handleDownloadSample}
            className="flex items-center justify-center px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Sample
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contacts by name or phone..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Contacts Stats */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 mb-1">Total Contacts</p>
            <p className="text-4xl font-bold text-gray-800">{contacts.length}</p>
          </div>
          <Users className="w-16 h-16 text-green-500" />
        </div>
      </div>

      {/* Contacts List */}
      {filteredContacts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {contacts.length === 0 ? 'No contacts yet' : 'No contacts found'}
          </h3>
          <p className="text-gray-600 mb-6">
            {contacts.length === 0
              ? 'Start by adding contacts manually or upload an Excel file'
              : 'Try adjusting your search query'}
          </p>
          {contacts.length === 0 && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
            >
              Add Your First Contact
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredContacts.map((contact, index) => (
                  <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{contact.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600">{contact.countryCode} {contact.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditContact(contact)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                {editingContact ? 'Edit Contact' : 'Add New Contact'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingContact(null);
                  setNewContact({ name: '', phone: '', countryCode: '+91' });
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="Enter contact name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Country Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country Code
                </label>
                <select
                  value={newContact.countryCode}
                  onChange={(e) => setNewContact({ ...newContact, countryCode: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code} {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 10) {
                      setNewContact({ ...newContact, phone: value });
                    }
                  }}
                  placeholder="Enter 10 digit number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingContact(null);
                    setNewContact({ name: '', phone: '', countryCode: '+91' });
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={editingContact ? handleUpdateContact : handleAddContact}
                  className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
                >
                  {editingContact ? 'Update' : 'Add Contact'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Excel Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Upload Excel File</h3>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadedFile(null);
                  setUploadStatus('');
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              {/* File Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-all">
                <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <label className="cursor-pointer">
                  <span className="text-green-600 hover:text-green-700 font-medium">
                    Click to upload
                  </span>
                  <span className="text-gray-600"> or drag and drop</span>
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">Excel or CSV files only</p>
              </div>

              {/* Uploaded File Info */}
              {uploadedFile && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileSpreadsheet className="w-5 h-5 text-green-600 mr-2" />
                      <p className="text-sm font-medium text-gray-800">{uploadedFile.name}</p>
                    </div>
                    {uploadStatus === 'success' && (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </div>
              )}

              {/* Status Message */}
              {uploadStatus === 'Processing...' && (
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent"></div>
                  <p className="text-sm text-gray-600 mt-2">Processing file...</p>
                </div>
              )}

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-800 mb-2">📋 File Format:</p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Column 1: Name</li>
                  <li>• Column 2: Phone (10 digits)</li>
                  <li>• Column 3: Country Code (optional)</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadedFile(null);
                    setUploadStatus('');
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProcessFile}
                  disabled={!uploadedFile || uploadStatus === 'Processing...'}
                  className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadStatus === 'Processing...' ? 'Processing...' : 'Upload'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsManagement;