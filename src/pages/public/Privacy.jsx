import { motion } from 'framer-motion';

const Privacy = () => {
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
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            How we collect, use, and protect your information
          </motion.p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {[
            {
              title: '1. Information We Collect',
              content: 'We collect information you provide directly, including your name, email address, phone number, and property details when creating listings. For tenants, we collect payment information processed securely through Paystack. We also collect usage data such as pages visited, search queries, and connection activity.',
            },
            {
              title: '2. How We Use Your Information',
              content: 'Your information is used to facilitate connections between landlords and tenants, process payments, improve our platform, send relevant notifications about your listings or connections, and provide customer support. We may also use aggregated, anonymized data for analytics.',
            },
            {
              title: '3. Information Sharing',
              content: 'When a tenant pays the connection fee, the landlord\'s contact information (name, phone, email, WhatsApp) is shared with the tenant. We do not sell your personal information to third parties. We may share data with payment processors (Paystack) and service providers who assist in operating our platform.',
            },
            {
              title: '4. Data Security',
              content: 'We implement industry-standard security measures to protect your data. Payment information is processed securely through Paystack and is never stored on our servers. We use encryption for data in transit and at rest.',
            },
            {
              title: '5. Cookies and Tracking',
              content: 'We use cookies and similar technologies to improve your browsing experience, analyze platform usage, and personalize content. You can control cookie settings through your browser preferences.',
            },
            {
              title: '6. Your Rights',
              content: 'You have the right to access, update, or delete your personal information. Landlords can manage their listings and profile through their dashboard. To request data deletion, please contact our support team.',
            },
            {
              title: '7. Data Retention',
              content: 'We retain your data for as long as your account is active or as needed to provide services. Connection records are retained for transaction history purposes. You may request deletion of your account and associated data at any time.',
            },
            {
              title: '8. Third-Party Links',
              content: 'Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing personal information.',
            },
            {
              title: '9. Changes to This Policy',
              content: 'We may update this Privacy Policy from time to time. We will notify users of significant changes via email or a prominent notice on our platform. Your continued use after changes constitutes acceptance.',
            },
            {
              title: '10. Contact Us',
              content: 'For privacy-related questions or concerns, please contact us at privacy@directkey.com.ng or through our Contact page.',
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

export default Privacy;
