import { useState } from 'react';
import { Send, Phone, Globe } from 'lucide-react';
import OTPVerification from './OTPVerification';
import Dashboard from './Dashboard';

const Login = () => {
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const countries = [
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+1', name: 'USA', flag: '🇺🇸' },
    { code: '+44', name: 'UK', flag: '🇬🇧' },
    { code: '+971', name: 'UAE', flag: '🇦🇪' },
    { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
  ];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError('');
    }
  };

  const handleSendOTP = () => {
    if (!phoneNumber) {
      setError('Please enter phone number');
      return;
    }
    if (phoneNumber.length !== 10) {
      setError('Phone number must be 10 digits');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowOTP(true);
    }, 1500);
  };

  const handleVerifySuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowOTP(false);
    setPhoneNumber('');
    setError('');
  };

  // Show Dashboard if logged in
  if (isLoggedIn) {
    return (
      <Dashboard
        phoneNumber={phoneNumber}
        countryCode={countryCode}
        onLogout={handleLogout}
      />
    );
  }

  // Show OTP page if OTP was sent
  if (showOTP) {
    return (
      <OTPVerification
        phoneNumber={phoneNumber}
        countryCode={countryCode}
        onBack={() => setShowOTP(false)}
        onVerifySuccess={handleVerifySuccess}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
            <Send className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">WA Bulk Sender</h1>
          <p className="text-gray-600">Send bulk messages on WhatsApp</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome Back!</h2>
          <p className="text-gray-600 mb-6">Enter your phone number to continue</p>

          {/* Country Code Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country Code
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code} {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Enter 10 digit number"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            {phoneNumber && (
              <p className="text-sm text-gray-500 mt-2">
                Preview: {countryCode} {phoneNumber}
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Send OTP Button */}
          <button
            onClick={handleSendOTP}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </>
            ) : (
              'Send OTP'
            )}
          </button>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              By continuing, you agree to our{' '}
              <a href="#" className="text-green-600 hover:underline">Terms</a>
              {' & '}
              <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* Support Link */}
        <div className="text-center mt-6">
          <a href="#" className="text-sm text-gray-600 hover:text-green-600">
            Need help? Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;