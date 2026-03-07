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
} from 'react-icons/fi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';

const howItWorks = [
  {
    step: 1,
    Icon: FiSearch,
    title: 'Browse Properties',
    description:
      'Search through hundreds of verified property listings across all 36 states and FCT in Nigeria. Filter by location, price, property type, and amenities to find exactly what you need.',
  },
  {
    step: 2,
    Icon: FiKey,
    title: 'Get Your Digital Key',
    description:
      'Found your perfect property? Pay a one-time Digital Key fee of \u20A615,000 to unlock the landlord\u2019s contact information. Secure payment powered by Paystack ensures your transaction is protected.',
  },
  {
    step: 3,
    Icon: FiPhone,
    title: 'Connect Directly',
    description:
      'Get instant access to the landlord\u2019s phone number, email, and WhatsApp. Contact them directly to schedule viewings, negotiate terms, and finalise your rental agreement.',
  },
];

const benefits = [
  {
    Icon: FiShield,
    title: 'Verified Listings',
    description:
      'Every property is carefully reviewed and approved by our admin team before going live. No fake listings, no scams.',
  },
  {
    Icon: FiLock,
    title: 'Transparent Pricing',
    description:
      'No hidden fees. One simple Digital Key payment of \u20A615,000 gives you direct access to landlord contacts.',
  },
  {
    Icon: FiZap,
    title: 'Instant Access',
    description:
      'Get landlord contact details immediately after payment. No waiting, no delays. Start your conversation right away.',
  },
  {
    Icon: FiCheckCircle,
    title: 'Secure Payments',
    description:
      'All transactions are powered by Paystack, Nigeria\u2019s leading payment gateway. Your money is safe and secure.',
  },
  {
    Icon: FiMapPin,
    title: 'Nationwide Coverage',
    description:
      'Properties available across all 36 states and FCT. Find your home anywhere in Nigeria.',
  },
  {
    Icon: FiUsers,
    title: 'Direct Connection',
    description:
      'No middlemen, no agents. Connect directly with property owners for faster decisions and better deals.',
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
            About DirectKey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Revolutionising property rental in Nigeria — transparent, secure, and hassle-free.
          </motion.p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-5">
                <FiHome className="text-xl text-primary-500" />
              </div>
              <h2 className="text-3xl font-bold text-navy-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To revolutionise the property rental market in Nigeria by providing a transparent,
                secure, and efficient platform that connects tenants directly with landlords. We
                eliminate the stress and uncertainty of finding your dream home through verified
                listings and instant landlord access.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By requiring a small Digital Key fee, we ensure that only genuinely interested
                parties contact property owners — saving everyone time and creating meaningful,
                direct connections.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center mb-5">
                <HiOutlineOfficeBuilding className="text-xl text-navy-700" />
              </div>
              <h2 className="text-3xl font-bold text-navy-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To become Nigeria's leading property rental platform, making home finding
                stress-free for every Nigerian. We envision a future where finding your perfect home
                is as simple as a few clicks — with complete transparency and direct landlord
                connections.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are building trust in Nigeria's rental ecosystem, one verified listing at a time.
              </p>
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
              Find your dream home in 3 simple steps
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
                className="bg-white rounded-2xl p-8 shadow-sm text-center relative"
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

      {/* Why Choose DirectKey */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Why Choose DirectKey?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We are committed to providing the best property rental experience in Nigeria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((item, index) => (
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
              DirectKey is a legally registered Nigerian company committed to transparency and trust.
            </p>
            <div className="bg-white rounded-2xl shadow-sm p-8 text-left space-y-4">
              {[
                { label: 'Company Name', value: 'DirectKey Nigeria Limited' },
                { label: 'RC Number', value: 'RC: 0000000' },
                { label: 'Registered Address', value: 'Lagos, Nigeria' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
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
            Browse hundreds of verified properties across Nigeria and connect directly with landlords.
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
