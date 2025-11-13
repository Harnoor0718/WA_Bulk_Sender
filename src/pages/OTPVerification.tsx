import { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft } from 'lucide-react';

interface OTPVerificationProps {
  phoneNumber: string;
  countryCode: string;
  onBack: () => void;
  onVerifySuccess: () => void;
}

const OTPVerification = ({ phoneNumber, countryCode, onBack, onVerifySuccess }: OTPVerificationProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Demo: Accept any 6-digit OTP for now
      if (otpValue.length === 6) {
        onVerifySuccess();
      } else {
        setError('Invalid OTP. Please try again.');
      }
    }, 1500);
  };

  const handleResend = () => {
    if (!canResend) return;
    
    setResendTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
    
    // Simulate sending OTP
    alert('OTP sent successfully!');
  };

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

        {/* OTP Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Enter OTP</h2>
          <p className="text-gray-600 mb-6">
            We've sent a 6-digit code to<br />
            <span className="font-semibold text-gray-800">
              {countryCode} {phoneNumber}
            </span>
          </p>

          {/* OTP Input Boxes */}
          <div className="flex gap-3 justify-center mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mb-4"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Verifying...
              </>
            ) : (
              'Verify OTP'
            )}
          </button>

          {/* Resend OTP */}
          <div className="text-center">
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Resend OTP
              </button>
            ) : (
              <p className="text-gray-600 text-sm">
                Resend OTP in <span className="font-semibold text-green-600">{resendTimer}s</span>
              </p>
            )}
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

export default OTPVerification;