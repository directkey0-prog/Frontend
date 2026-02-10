import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const faqs = [
  {
    q: 'What is the connection fee?',
    a: 'The connection fee is a one-time payment of \u20A615,000 per property. This gives you direct access to the landlord\'s contact details including phone number, email, and WhatsApp.',
  },
  {
    q: 'Is the connection fee refundable?',
    a: 'The connection fee is non-refundable once the landlord\'s contact information has been provided. However, if there is a payment processing error, we handle refunds on a case-by-case basis.',
  },
  {
    q: 'How do I know the listings are genuine?',
    a: 'Every property listing on DirectKey is reviewed and approved by our admin team before going live. We verify property details and landlord information to ensure authenticity.',
  },
  {
    q: 'How does the connection process work?',
    a: 'Browse properties, find one you like, and pay the connection fee. Once payment is confirmed, you\'ll instantly receive the landlord\'s phone number, email, and WhatsApp. You can then contact them directly to arrange viewings.',
  },
  {
    q: 'Can I list my property on DirectKey?',
    a: 'Yes! Landlords can sign up on our Landlord portal and submit property listings for free. Our admin team will review and approve your listing, after which it goes live for tenants to discover.',
  },
  {
    q: 'What areas does DirectKey cover?',
    a: 'DirectKey covers all 36 Nigerian states plus the FCT (Abuja). We have properties listed in major cities including Lagos, Abuja, Port Harcourt, Ibadan, Kano, Enugu, and many more.',
  },
  {
    q: 'How do I contact DirectKey support?',
    a: 'You can reach us through our Contact page, via email at support@directkey.com.ng, or through our WhatsApp button on the website. We typically respond within 24 hours.',
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Everything you need to know about using DirectKey
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left bg-transparent border-0 cursor-pointer"
              >
                <span className="text-sm font-semibold text-navy-900 pr-4">{faq.q}</span>
                <FiChevronDown
                  className={`text-gray-400 flex-shrink-0 transition-transform ${open === index ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
