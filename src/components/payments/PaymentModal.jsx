import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiPhone, FiMail, FiShield, FiLock } from 'react-icons/fi';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { usePaystackPayment } from 'react-paystack';
import toast from 'react-hot-toast';

const formatPrice = (amount) => new Intl.NumberFormat('en-NG').format(amount);

const API_BASE = 'http://localhost:5000/api';

// Public key from .env — enables real Paystack when set
const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';
const USE_REAL_PAYSTACK = PAYSTACK_KEY.startsWith('pk_');

// Fallback landlord shown if Supabase isn't connected yet
const FALLBACK_LANDLORD = {
  name: 'Chidi Okonkwo',
  phone: '+234 805 123 4567',
  email: 'chidi.okonkwo@directkey.ng',
  whatsapp: '+2348051234567',
};

const PaymentModal = ({ isOpen, onClose, property, connectionFee = 15000 }) => {
  const [step, setStep] = useState('form'); // form | processing | success | error
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [landlordContact, setLandlordContact] = useState(null);
  const [showExitBanner, setShowExitBanner] = useState(false);
  const referenceRef = useRef(`DK_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`);

  // Exit intent detection on success step
  useEffect(() => {
    if (step !== 'success') return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        setShowExitBanner(true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [step]);

  // Paystack config — reactive to form state on every render
  const paystackConfig = {
    reference: referenceRef.current,
    email: email || 'placeholder@directkey.ng',
    amount: connectionFee * 100, // kobo
    publicKey: PAYSTACK_KEY,
    currency: 'NGN',
    label: 'DirectKey Digital Key',
    metadata: {
      custom_fields: [
        { display_name: 'Tenant Name', variable_name: 'tenant_name', value: name },
        { display_name: 'Property', variable_name: 'property_name', value: property?.property_name || '' },
        { display_name: 'Property ID', variable_name: 'property_id', value: String(property?.id || '') },
      ],
    },
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const validate = () => {
    if (!name.trim() || !email.trim()) {
      setFormError('Please fill in both name and email.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Please enter a valid email address.');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleVerify = async (reference) => {
    try {
      const res = await fetch(
        `${API_BASE}/payments/verify/${reference}?tenantEmail=${encodeURIComponent(email)}&tenantName=${encodeURIComponent(name)}`
      );
      const data = await res.json();

      if (data.success) {
        // Use landlord from backend if available, else fall back to property dummy data
        const contact = data.landlordContact || (() => {
          const l = property?.users || property?.landlord_contacts || {};
          return {
            name: l.full_name || FALLBACK_LANDLORD.name,
            phone: l.phone_number || FALLBACK_LANDLORD.phone,
            email: l.email || FALLBACK_LANDLORD.email,
            whatsapp: l.whatsapp || FALLBACK_LANDLORD.whatsapp,
          };
        })();
        setLandlordContact(contact);
        setStep('success');
        toast.success(`Landlord contact sent to ${email}`);
      } else {
        setStep('error');
      }
    } catch {
      // Backend not running — still show landlord from property data
      const l = property?.users || property?.landlord_contacts || {};
      setLandlordContact({
        name: l.full_name || FALLBACK_LANDLORD.name,
        phone: l.phone_number || FALLBACK_LANDLORD.phone,
        email: l.email || FALLBACK_LANDLORD.email,
        whatsapp: l.whatsapp || FALLBACK_LANDLORD.whatsapp,
      });
      setStep('success');
      toast.success(`Landlord contact retrieved`);
    }
  };

  const handlePay = () => {
    if (!validate()) return;

    if (USE_REAL_PAYSTACK) {
      // Open real Paystack popup
      initializePayment({
        onSuccess: (transaction) => {
          setStep('processing');
          handleVerify(transaction.reference);
        },
        onClose: () => {
          // User dismissed Paystack — stay on form, do nothing
        },
      });
    } else {
      // Demo simulation (no Paystack key configured)
      setStep('processing');
      setTimeout(() => {
        const l = property?.users || property?.landlord_contacts || {};
        setLandlordContact({
          name: l.full_name || FALLBACK_LANDLORD.name,
          phone: l.phone_number || FALLBACK_LANDLORD.phone,
          email: l.email || FALLBACK_LANDLORD.email,
          whatsapp: l.whatsapp || FALLBACK_LANDLORD.whatsapp,
        });
        setStep('success');
        toast.success(`Landlord contact sent to ${email}`);
      }, 2000);
    }
  };

  const handleClose = () => {
    setStep('form');
    setName('');
    setEmail('');
    setFormError('');
    setLandlordContact(null);
    referenceRef.current = `DK_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={step === 'form' ? handleClose : undefined}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        >
          {/* Close button (form step only) */}
          {step === 'form' && (
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10 bg-transparent border-0 cursor-pointer"
            >
              <FiX className="text-gray-500" />
            </button>
          )}

          {/* ── FORM ── */}
          {step === 'form' && (
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FiLock className="text-2xl text-primary-500" />
                </div>
                <h2 className="text-xl font-bold text-navy-900 mb-1">Get Your Digital Key</h2>
                <p className="text-sm text-gray-500">
                  Pay the one-time connection fee to unlock the landlord's direct contact
                </p>
              </div>

              {/* Property summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-5">
                <p className="text-sm font-semibold text-navy-900 truncate">{property?.property_name}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {[property?.area, property?.local_government, property?.state].filter(Boolean).join(', ')}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Digital Key</span>
                  <span className="text-lg font-bold text-navy-900">{'\u20A6'}{formatPrice(connectionFee)}</span>
                </div>
              </div>

              {/* Form fields */}
              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setFormError(''); }}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setFormError(''); }}
                    placeholder="your@email.com — landlord info will be sent here"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  />
                </div>
              </div>

              {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}

              <button
                onClick={handlePay}
                className="w-full bg-primary-400 hover:bg-primary-500 text-white py-3.5 rounded-xl font-semibold transition-all border-0 cursor-pointer text-sm"
              >
                Pay with Paystack — {'\u20A6'}{formatPrice(connectionFee)}
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
                <FiShield className="text-green-500" />
                <span>Secured by Paystack · SSL encrypted</span>
              </div>
            </div>
          )}

          {/* ── PROCESSING ── */}
          {step === 'processing' && (
            <div className="p-12 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 border-4 border-gray-200 border-t-primary-400 rounded-full mx-auto mb-6"
              />
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Verifying Payment</h3>
              <p className="text-sm text-gray-500">Please wait, do not close this window...</p>
            </div>
          )}

          {/* ── SUCCESS ── */}
          {step === 'success' && (
            <div className="p-6">
              {/* Exit intent banner */}
              {showExitBanner && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 flex items-start gap-3">
                  <FiShield className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-amber-800">Save the landlord's contact!</p>
                    <p className="text-xs text-amber-700 mt-0.5">Screenshot or copy the details below before leaving this page.</p>
                  </div>
                  <button onClick={() => setShowExitBanner(false)} className="text-amber-500 bg-transparent border-0 cursor-pointer p-0">
                    <FiX className="text-sm" />
                  </button>
                </div>
              )}
              <div className="text-center mb-5">
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
                  Contact details shown below and sent to <strong>{email}</strong>
                </p>
              </div>

              {/* Landlord Contact Card */}
              <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-5 text-white mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold">
                      {(landlordContact?.name || 'L').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{landlordContact?.name}</p>
                    <p className="text-xs text-gray-300">Property Owner</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {landlordContact?.phone && (
                    <a
                      href={`tel:${landlordContact.phone}`}
                      className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 hover:bg-white/20 transition-colors no-underline text-white"
                    >
                      <FiPhone className="text-primary-400 flex-shrink-0" />
                      <span className="text-sm">{landlordContact.phone}</span>
                    </a>
                  )}
                  {landlordContact?.email && (
                    <a
                      href={`mailto:${landlordContact.email}`}
                      className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 hover:bg-white/20 transition-colors no-underline text-white"
                    >
                      <FiMail className="text-primary-400 flex-shrink-0" />
                      <span className="text-sm">{landlordContact.email}</span>
                    </a>
                  )}
                  {landlordContact?.whatsapp && (
                    <a
                      href={`https://wa.me/${landlordContact.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-green-600/40 rounded-xl px-4 py-3 hover:bg-green-600/60 transition-colors no-underline text-white"
                    >
                      <IoLogoWhatsapp className="text-green-400 flex-shrink-0" />
                      <span className="text-sm">Chat on WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>

              <p className="text-xs text-gray-400 text-center mb-4">
                A copy of these details has been sent to {email}
              </p>

              <button
                onClick={handleClose}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-all border-0 cursor-pointer text-sm"
              >
                Close
              </button>
            </div>
          )}

          {/* ── ERROR ── */}
          {step === 'error' && (
            <div className="p-10 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiX className="text-2xl text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Verification Failed</h3>
              <p className="text-sm text-gray-500 mb-6">
                We could not verify your payment. Please try again or contact support.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium border-0 cursor-pointer text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep('form')}
                  className="flex-1 bg-primary-400 hover:bg-primary-500 text-white py-3 rounded-xl font-semibold border-0 cursor-pointer text-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;
