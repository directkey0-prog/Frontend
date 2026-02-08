import { motion } from 'framer-motion';
import { FiShield, FiUsers, FiHome, FiCheckCircle } from 'react-icons/fi';

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
            Bridging the gap between landlords and tenants across Nigeria with verified listings and secure connections.
          </motion.p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-navy-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                DirectKey was founded with a simple mission: to make finding rental properties in Nigeria
                transparent, secure, and hassle-free. We understand the challenges tenants face when
                searching for homes and the difficulties landlords encounter in reaching genuine tenants.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our platform connects verified landlords with serious tenants through a trusted connection
                system. By requiring a small connection fee, we ensure that only genuinely interested
                parties contact property owners, saving everyone time and creating meaningful connections.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80"
                alt="Modern apartment building"
                className="rounded-2xl shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Why Choose DirectKey</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We are committed to providing the best property rental experience in Nigeria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FiShield,
                title: 'Verified Listings',
                description: 'Every property listing is reviewed and approved by our team before going live.',
              },
              {
                icon: FiUsers,
                title: 'Direct Connection',
                description: 'Connect directly with landlords. No agents, no middlemen, no hidden fees.',
              },
              {
                icon: FiHome,
                title: 'Wide Coverage',
                description: 'Properties across all major Nigerian states and cities, with more added daily.',
              },
              {
                icon: FiCheckCircle,
                title: 'Secure Payments',
                description: 'All transactions are processed securely. Your payment data is never stored.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm text-center"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-xl text-primary-500" />
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
            {[
              { value: '2,500+', label: 'Listed Properties' },
              { value: '1,200+', label: 'Verified Landlords' },
              { value: '15,000+', label: 'Happy Tenants' },
              { value: '36', label: 'States Covered' },
            ].map((stat) => (
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
    </div>
  );
};

export default About;
