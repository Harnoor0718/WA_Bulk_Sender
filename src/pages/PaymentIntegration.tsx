import { useState } from 'react';
import { 
  ArrowLeft, CreditCard, Building, Smartphone, Check, 
  AlertCircle, Loader2, Shield, DollarSign, Clock, 
  CheckCircle, XCircle, ArrowRight, Zap, Star
} from 'lucide-react';

interface PaymentIntegrationProps {
  onBack: () => void;
}

const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: '₹499',
    period: '/month',
    features: [
      '1,000 messages/month',
      '100 contacts',
      'Basic analytics',
      'Email support',
      'Single user'
    ],
    popular: false,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: '₹1,999',
    period: '/month',
    features: [
      '10,000 messages/month',
      'Unlimited contacts',
      'Advanced analytics',
      'Priority support',
      'Up to 5 users',
      'Custom templates',
      'API access'
    ],
    popular: true,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: '₹4,999',
    period: '/month',
    features: [
      'Unlimited messages',
      'Unlimited contacts',
      'Full analytics suite',
      '24/7 phone support',
      'Unlimited users',
      'Custom integration',
      'Dedicated account manager',
      'White-label option'
    ],
    popular: false,
    color: 'from-purple-500 to-purple-600'
  }
];

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
  { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
  { id: 'netbanking', name: 'Net Banking', icon: Building, description: 'All major banks' },
  { id: 'wallet', name: 'Wallets', icon: Smartphone, description: 'Paytm, Mobikwik, Freecharge' }
];

const transactionHistory = [
  { id: '1', plan: 'Pro Plan', amount: '₹1,999', date: '2024-11-01', status: 'success', method: 'UPI' },
  { id: '2', plan: 'Basic Plan', amount: '₹499', date: '2024-10-01', status: 'success', method: 'Card' },
  { id: '3', plan: 'Pro Plan', amount: '₹1,999', date: '2024-09-01', status: 'success', method: 'Net Banking' },
];

export default function PaymentIntegration({ onBack }: PaymentIntegrationProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('basic');

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // UPI details
  const [upiId, setUpiId] = useState('');

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaymentSuccess(true);
      setCurrentPlan(selectedPlan || 'basic');
      setTimeout(() => {
        setPaymentSuccess(false);
        setShowPaymentModal(false);
        setSelectedPlan(null);
        setSelectedMethod(null);
        setCardNumber('');
        setCardName('');
        setExpiryDate('');
        setCvv('');
        setUpiId('');
      }, 3000);
    }, 2500);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const getPlanDetails = (planId: string) => {
    return pricingPlans.find(p => p.id === planId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Payment & Billing</h1>
              <p className="text-gray-600">Manage your subscription and billing</p>
            </div>
          </div>
        </div>

        {/* Current Plan Status */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-lg p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Current Plan</p>
              <h2 className="text-3xl font-bold mb-2">
                {getPlanDetails(currentPlan)?.name}
              </h2>
              <p className="text-green-100">
                Active until December 15, 2024
              </p>
            </div>
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-green-100 text-sm">Next Billing</p>
                <p className="text-2xl font-bold">{getPlanDetails(currentPlan)?.price}</p>
                <p className="text-green-100 text-sm">on Dec 15, 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden relative ${
                  plan.popular ? 'ring-4 ring-green-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-center py-2 text-sm font-semibold">
                    <Star className="w-4 h-4 inline mr-1" />
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    disabled={currentPlan === plan.id}
                    className={`w-full py-3 rounded-lg font-semibold transition ${
                      currentPlan === plan.id
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : plan.popular
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {currentPlan === plan.id ? (
                      <>
                        <Check className="w-5 h-5 inline mr-2" />
                        Current Plan
                      </>
                    ) : (
                      <>
                        Upgrade Now
                        <ArrowRight className="w-5 h-5 inline ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Why Upgrade?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <Zap className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Unlimited Messages</h3>
                <p className="text-sm text-gray-600">Send unlimited messages to unlimited contacts</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <Shield className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Priority Support</h3>
                <p className="text-sm text-gray-600">Get 24/7 dedicated support from our team</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
              <Star className="w-6 h-6 text-purple-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Advanced Features</h3>
                <p className="text-sm text-gray-600">Access to all premium features and integrations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-500" />
              Transaction History
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Plan</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Method</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactionHistory.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-600">{transaction.date}</td>
                    <td className="px-6 py-4 text-gray-800 font-medium">{transaction.plan}</td>
                    <td className="px-6 py-4 text-gray-800 font-semibold">{transaction.amount}</td>
                    <td className="px-6 py-4 text-gray-600">{transaction.method}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Success
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && !paymentSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Complete Payment</h2>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <XCircle className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Order Summary */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-4 text-white mb-6">
                <p className="text-green-100 text-sm mb-1">Selected Plan</p>
                <h3 className="text-2xl font-bold mb-2">
                  {getPlanDetails(selectedPlan || '')?.name}
                </h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">
                    {getPlanDetails(selectedPlan || '')?.price}
                  </span>
                  <span className="text-green-100 ml-2">/month</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Select Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 border-2 rounded-lg transition ${
                        selectedMethod === method.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <method.icon className={`w-8 h-8 mx-auto mb-2 ${
                        selectedMethod === method.id ? 'text-green-500' : 'text-gray-600'
                      }`} />
                      <p className="font-medium text-gray-800 text-sm">{method.name}</p>
                      <p className="text-xs text-gray-500">{method.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Details Forms */}
              {selectedMethod === 'card' && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value.replace(/\s/g, '').slice(0, 16)))}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value.slice(0, 5))}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === 'upi' && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@upi"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      You'll receive a payment request on your UPI app
                    </p>
                  </div>
                </div>
              )}

              {(selectedMethod === 'netbanking' || selectedMethod === 'wallet') && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-center">
                  <p className="text-blue-800">
                    You'll be redirected to complete the payment
                  </p>
                </div>
              )}

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 mb-6 text-gray-600">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm">Secured by 256-bit SSL encryption</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  disabled={processing}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  disabled={!selectedMethod || processing}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <DollarSign className="w-5 h-5" />
                      Pay {getPlanDetails(selectedPlan || '')?.price}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {paymentSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-4">
              Your subscription has been upgraded successfully
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                Welcome to {getPlanDetails(selectedPlan || '')?.name}! 🎉
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}