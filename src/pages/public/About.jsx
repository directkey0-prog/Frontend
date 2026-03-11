import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiShield,
  FiUsers,
  FiHome,
  FiCheckCircle,
  FiSearch,
  FiKey,
  FiPhone,
  FiMapPin,
  FiZap,
  FiLock,
  FiArrowRight,
  FiPercent,
  FiVideo,
} from 'react-icons/fi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';

const howItWorks = [
  {
    step: 1,
    Icon: FiSearch,
    title: 'Browse Properties',
    description:
      'Search through verified property listings across all 36 states and FCT. Filter by location, price, property type, and amenities to find exactly what you need.',
  },
  {
    step: 2,
    Icon: FiKey,
    title: 'Get Your Digital Key',
    description:
      'Pay a one-time Digital Key fee of \u20A615,000 to unlock the landlord\u2019s contact information. Secure payment powered by Paystack \u2014 instant and protected.',
  },
  {
    step: 3,
    Icon: FiPhone,
    title: 'Connect Directly',
    description:
      'Get instant access to the landlord\u2019s phone number, email, and WhatsApp. Speak directly, schedule viewings, and finalise your agreement \u2014 zero agent involvement.',
  },
];

const whyChoose = [
  {
    Icon: FiPercent,
    title: '0% Agent Commission',
    description:
      'We do not allow agents. You deal directly with property owners, cutting out the \u201CAgent and Agreement\u201D tax that tenants have been forced to pay for years.',
  },
  {
    Icon: FiVideo,
    title: 'Cinematic Accuracy',
    description:
      'Our 4K cinematic tours ensure that what you see is exactly what you get. No misleading photos, no surprise visits. High-definition visual storytelling on every listing.',
  },
  {
    Icon: FiShield,
    title: 'Verified Listings',
    description:
      'Every property on our platform is vetted for authenticity and CAC compliance by our admin team before going live. No fake listings, no scams.',
  },
  {
    Icon: FiLock,
    title: 'Secure Payments',
    description:
      'All transactions are processed through Paystack, Nigeria\u2019s leading payment gateway. Your money and data are safe at every step.',
  },
  {
    Icon: FiZap,
    title: 'Instant Access',
    description:
      'Pay the Digital Key and get landlord contact details immediately \u2014 no waiting, no back-and-forth. Start your conversation right away.',
  },
  {
    Icon: FiMapPin,
    title: 'Nationwide Coverage',
    description:
      'Properties available across all 36 states and FCT. Whether you are in Lagos, Abuja, Kano, or Enugu \u2014 we have you covered.',
  },
];

const stats = [
  { value: '250+', label: 'Happy Tenants' },
  { value: '486+', label: 'Verified Landlords' },
  { value: '852+', label: 'Listed Properties' },
  { value: '37', label: 'States Covered' },
];

const About = () => {
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
            No More Agents Wahala.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            At DirectKey, we believe that finding a home in Nigeria should not be a financial
            burden or a stressful gamble.
          </motion.p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-5">
                <FiHome className="text-xl text-primary-500" />
              </div>
              <h2 className="text-3xl font-bold text-navy-900 mb-5">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                For too long, tenants have been forced to pay exorbitant &ldquo;Agent and Agreement&rdquo;
                fees for houses they found themselves, while landlords have struggled with
                unverified leads and poor property representation.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                DirectKey is a cinematography-led PropTech platform that bridges the gap. By
                combining 4K Cinematic Tours with a Direct-to-Landlord model, we provide a
                transparent, high-definition marketplace that puts both landlords and tenants
                first.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are not just a listing site. We are a movement to eliminate the
                &ldquo;Agent Tax&rdquo; in Nigeria and restore trust in the rental market through
                technology and transparency.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-navy-900 rounded-2xl p-8 text-white">
                <div className="w-12 h-12 bg-primary-400/20 rounded-xl flex items-center justify-center mb-5">
                  <HiOutlineOfficeBuilding className="text-xl text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  To eliminate the &ldquo;Agent Tax&rdquo; in Nigeria and provide 100% transparency
                  through high-end visual storytelling.
                </p>
                <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                  {[
                    '0% Agent Commission',
                    'Direct-to-Landlord connections',
                    'Verified listings only',
                    '4K cinematic property tours',
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-3">
                      <FiCheckCircle className="text-primary-400 flex-shrink-0" />
                      <span className="text-gray-200 text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">How DirectKey Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Find your next home in 3 simple steps — no agent required
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm text-center"
              >
                <div className="w-10 h-10 bg-primary-400 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-5">
                  {item.step}
                </div>
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.Icon className="text-2xl text-primary-500" />
                </div>
                <h3 className="font-bold text-navy-900 text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Why DirectKey?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              The smarter, fairer way to rent property in Nigeria
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <item.Icon className="text-xl text-primary-500" />
                </div>
                <h3 className="font-bold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center mx-auto mb-5">
              <FiShield className="text-xl text-navy-700" />
            </div>
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Registered &amp; Verified</h2>
            <p className="text-gray-500 mb-10">
              DirectKey is a legally registered Nigerian company committed to transparency and trust in the rental market.
            </p>
            <div className="bg-white rounded-2xl shadow-sm p-8 text-left space-y-0">
              {[
                { label: 'Company Name', value: 'DirectKey Nigeria Limited' },
                { label: 'RC Number', value: 'RC: 0000000' },
                { label: 'Registered Address', value: 'Lagos, Nigeria' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0">
                  <span className="text-sm font-medium text-gray-500">{label}</span>
                  <span className="text-sm font-semibold text-navy-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Home?</h2>
          <p className="text-gray-300 mb-10 max-w-xl mx-auto">
            Browse verified properties across Nigeria and connect directly with landlords. No agents, no surprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 bg-primary-400 hover:bg-primary-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all no-underline text-sm"
            >
              Browse Properties
              <FiArrowRight />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-semibold transition-all no-underline text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
