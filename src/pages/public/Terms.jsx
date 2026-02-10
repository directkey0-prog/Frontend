import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-navy-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Please read these terms carefully before using DirectKey
          </motion.p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {[
            {
              title: '1. Acceptance of Terms',
              content: 'By accessing and using the DirectKey platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.',
            },
            {
              title: '2. Description of Service',
              content: 'DirectKey is a property rental connection platform that connects landlords with potential tenants in Nigeria. We provide a marketplace for property listings and facilitate connections between parties through a paid connection model.',
            },
            {
              title: '3. Connection Fee',
              content: 'To access landlord contact information, tenants must pay a non-refundable connection fee of ₦15,000 per property. This fee grants you direct access to the landlord\'s contact details including phone number, email, and WhatsApp. The connection fee is not a rental payment or deposit.',
            },
            {
              title: '4. User Responsibilities',
              content: 'Users must provide accurate information when creating listings or making connections. Landlords are responsible for the accuracy of their property listings. Tenants are responsible for verifying property details before making any rental agreements. DirectKey is not responsible for disputes between landlords and tenants.',
            },
            {
              title: '5. Property Listings',
              content: 'All property listings are subject to review and approval by our admin team. We reserve the right to reject or remove listings that do not meet our quality standards, contain false information, or violate our community guidelines.',
            },
            {
              title: '6. Payment Terms',
              content: 'All payments are processed securely through Paystack. Connection fees are non-refundable once the landlord\'s contact information has been provided. In the event of a payment processing error, refunds will be handled on a case-by-case basis.',
            },
            {
              title: '7. Privacy',
              content: 'Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.',
            },
            {
              title: '8. Limitation of Liability',
              content: 'DirectKey serves as a connection platform only. We do not own, manage, or inspect any listed properties. We are not liable for the condition of properties, the conduct of landlords or tenants, or any agreements made between parties after connection.',
            },
            {
              title: '9. Changes to Terms',
              content: 'We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms. We will notify users of significant changes via email or platform notifications.',
            },
            {
              title: '10. Contact',
              content: 'If you have questions about these Terms of Service, please contact us through our Contact page or email us at support@directkey.com.ng.',
            },
          ].map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="mb-8"
            >
              <h2 className="text-lg font-bold text-navy-900 mb-3">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{section.content}</p>
            </motion.div>
          ))}

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-400">Last updated: February 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
