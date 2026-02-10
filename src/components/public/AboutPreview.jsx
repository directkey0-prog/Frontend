import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShield, FiUsers, FiHome } from 'react-icons/fi';

const AboutPreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-primary-400 uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mt-3 mb-6">
              Nigeria's Trusted Property Connection Platform
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              DirectKey bridges the gap between landlords and tenants across Nigeria. With verified
              property listings and secure connections, we make finding your next home simple,
              transparent, and hassle-free.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: FiShield, label: 'Verified Listings' },
                { icon: FiUsers, label: 'Direct Contact' },
                { icon: FiHome, label: '36+ States' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="text-primary-500 text-sm" />
                  </div>
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-500 font-semibold transition-colors no-underline"
            >
              Learn More About Us
              <FiArrowRight />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80"
              alt="Modern building"
              className="rounded-2xl shadow-xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">2.5K+</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-navy-900">Properties Listed</p>
                  <p className="text-xs text-gray-500">Across Nigeria</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
