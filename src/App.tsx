import { useState } from 'react';
import Login from './pages/Login';
import EnhancedDashboard from './pages/EnhancedDashboard';
import ContactsManagement from './pages/ContactsManagement';
import MessageComposer from './pages/MessageComposer';
import CampaignReports from './pages/CampaignReports';
import PaymentIntegration from './pages/PaymentIntegration';

export interface Contact {
  id: string;
  name: string;
  phone: string;
  verified: boolean;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'dashboard' | 'contacts' | 'composer' | 'reports' | 'payment'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
    setContacts([]);
  };

  const handleAddContact = (contact: Contact) => {
    setContacts(prev => [...prev, contact]);
  };

  const handleAddMultipleContacts = (newContacts: Contact[]) => {
    setContacts(prev => [...prev, ...newContacts]);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const handleClearAllContacts = () => {
    setContacts([]);
  };

  const handleNavigate = (page: 'dashboard' | 'contacts' | 'composer' | 'reports' | 'payment') => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          {currentPage === 'dashboard' && (
            <EnhancedDashboard
              contacts={contacts}
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          )}
          {currentPage === 'contacts' && (
            <ContactsManagement
              contacts={contacts}
              onAddContact={handleAddContact}
              onAddMultipleContacts={handleAddMultipleContacts}
              onDeleteContact={handleDeleteContact}
              onClearAll={handleClearAllContacts}
              onBack={() => setCurrentPage('dashboard')}
            />
          )}
          {currentPage === 'composer' && (
            <MessageComposer
              contacts={contacts}
              onBack={() => setCurrentPage('dashboard')}
            />
          )}
          {currentPage === 'reports' && (
            <CampaignReports
              onBack={() => setCurrentPage('dashboard')}
            />
          )}
          {currentPage === 'payment' && (
            <PaymentIntegration
              onBack={() => setCurrentPage('dashboard')}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;