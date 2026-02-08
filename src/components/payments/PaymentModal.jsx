import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiLoader, FiPhone, FiMail } from 'react-icons/fi';
import { IoLogoWhatsapp } from 'react-icons/io5';

const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-NG').format(amount);
};

const PaymentModal = ({ isOpen, onClose, property, connectionFee = 15000 }) => {
  const [step, setStep] = useState('form'); // form, processing, success, error
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [formError, setFormError] = useState('');

  const handlePay = async () => {
    if (!email.trim() || !name.trim()) {
      setFormError('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setFormError('');
    setStep('processing');

    // Mock payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Simulate success
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    setEmail('');
    setName('');
    setFormError('');
    onClose();
  };

  if (!isOpen) return null;

  const landlord = property?.users || property?.landlord_contacts || {};

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10 bg-transparent border-0 cursor-pointer"
          >
            <FiX className="text-gray-500" />
          </button>

          {/* Form Step */}
          {step === 'form' && (
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FiPhone className="text-2xl text-primary-500" />
                </div>
                <h2 className="text-xl font-bold text-navy-900 mb-1">Contact Landlord</h2>
                <p className="text-sm text-gray-500">
                  Pay the connection fee to get the landlord's contact details
                </p>
              </div>

              {/* Property summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm font-medium text-navy-900 mb-1">{property?.property_name}</p>
                <p className="text-xs text-gray-500">{property?.area}, {property?.local_government}, {property?.state}</p>
                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Connection Fee</span>
                  <span className="text-lg font-bold text-navy-900">{'\u20A6'}{formatPrice(connectionFee)}</span>
                </div>
              </div>

              {/* Form fields */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  />
                </div>
              </div>

              {formError && (
                <p className="text-red-500 text-sm mb-4">{formError}</p>
              )}

              <button
                onClick={handlePay}
                className="w-full bg-primary-400 hover:bg-primary-500 text-white py-3.5 rounded-xl font-semibold transition-all border-0 cursor-pointer text-sm"
              >
                Pay {'\u20A6'}{formatPrice(connectionFee)}
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                Payment is processed securely. Your details are safe.
              </p>
            </div>
          )}

          {/* Processing Step */}
          {step === 'processing' && (
            <div className="p-10 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 border-4 border-gray-200 border-t-primary-400 rounded-full mx-auto mb-6"
              />
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Processing Payment</h3>
              <p className="text-sm text-gray-500">Please wait while we process your payment...</p>
            </div>
          )}

          {/* Success Step */}
          {step === 'success' && (
            <div className="p-6">
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <FiCheck className="text-2xl text-green-600" />
                </motion.div>
                <h2 className="text-xl font-bold text-navy-900 mb-1">Payment Successful!</h2>
                <p className="text-sm text-gray-500">
                  Here are the landlord's contact details
                </p>
              </div>

              {/* Landlord Contact Card */}
              <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-6 text-white mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold">
                      {(landlord.full_name || 'L').charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{landlord.full_name || 'Landlord'}</p>
                    <p className="text-sm text-gray-300">Property Owner</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={`tel:${landlord.phone_number}`}
                    className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 hover:bg-white/20 transition-colors no-underline text-white"
                  >
                    <FiPhone className="text-primary-400" />
                    <span className="text-sm">{landlord.phone_number || 'N/A'}</span>
                  </a>

                  <a
                    href={`mailto:${landlord.email}`}
                    className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 hover:bg-white/20 transition-colors no-underline text-white"
                  >
                    <FiMail className="text-primary-400" />
                    <span className="text-sm">{landlord.email || 'N/A'}</span>
                  </a>

                  {landlord.whatsapp && (
                    <a
                      href={`https://wa.me/${landlord.whatsapp?.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-green-600/30 rounded-xl px-4 py-3 hover:bg-green-600/50 transition-colors no-underline text-white"
                    >
                      <IoLogoWhatsapp className="text-green-400" />
                      <span className="text-sm">Chat on WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-all border-0 cursor-pointer text-sm"
              >
                Close
              </button>
            </div>
          )}

          {/* Error Step */}
          {step === 'error' && (
            <div className="p-10 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiX className="text-2xl text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Payment Failed</h3>
              <p className="text-sm text-gray-500 mb-6">
                Something went wrong. Please try again.
              </p>
              <button
                onClick={() => setStep('form')}
                className="bg-primary-400 hover:bg-primary-500 text-white px-8 py-3 rounded-xl font-semibold transition-all border-0 cursor-pointer text-sm"
              >
                Try Again
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;
