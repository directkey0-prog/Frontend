import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiDollarSign, FiPhoneCall, FiArrowRight } from 'react-icons/fi';
import Hero from '../../components/public/Hero';
import PropertyCard from '../../components/cards/PropertyCard';
import { getProperties } from '../../services/api';

const propertyTypeTabs = ['All', 'Apartment', 'Duplex', 'Bungalow', 'Semi-Detached', 'Penthouse', 'Studio'];

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        const approved = Array.isArray(data) ? data.filter(p => p.status === 'approved') : [];
        setProperties(approved);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = activeTab === 'All'
    ? properties
    : properties.filter(p => p.property_type === activeTab);

  const displayProperties = filteredProperties.slice(0, 6);

  return (
    <div>
      <Hero />

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Latest Properties</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Discover the newest rental properties listed on our platform across Nigeria
            </p>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {propertyTypeTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border-0 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-primary-400 text-white shadow-lg shadow-primary-400/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Property Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-8 bg-gray-200 rounded w-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          )}

          {displayProperties.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No properties found in this category.</p>
            </div>
          )}

          {filteredProperties.length > 6 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                to="/listings"
                className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-900 text-white px-8 py-3.5 rounded-xl font-semibold transition-all no-underline"
              >
                View All Properties
                <FiArrowRight />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">How It Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Getting connected to your ideal landlord is quick and simple
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FiSearch,
                title: 'Browse Properties',
                description: 'Search from thousands of verified rental listings across Nigeria. Filter by location, type, and budget.',
                color: 'bg-blue-50',
                iconColor: 'text-blue-500',
                step: '01',
              },
              {
                icon: FiDollarSign,
                title: 'Pay Connection Fee',
                description: 'Pay a one-time connection fee of \u20A615,000 to unlock direct access to the landlord\'s contact.',
                color: 'bg-primary-50',
                iconColor: 'text-primary-500',
                step: '02',
              },
              {
                icon: FiPhoneCall,
                title: 'Connect Directly',
                description: 'Get the landlord\'s phone, email, and WhatsApp instantly. Arrange viewings on your terms.',
                color: 'bg-green-50',
                iconColor: 'text-green-500',
                step: '03',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <span className="absolute top-6 right-6 text-5xl font-black text-gray-100">{item.step}</span>
                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-6`}>
                  <item.icon className={`text-2xl ${item.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-navy-800 to-navy-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Find Your Perfect Home?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Browse verified rental properties across Nigeria and connect directly with landlords today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/listings"
                className="bg-primary-400 hover:bg-primary-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all no-underline"
              >
                Browse Properties
              </Link>
              <a
                href="http://localhost:5174"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-semibold transition-all no-underline"
              >
                List Your Property
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
