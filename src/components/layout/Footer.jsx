import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import toast from 'react-hot-toast';

const socialLinks = [
  { Icon: FaFacebookF, url: 'https://facebook.com/directkey' },
  { Icon: FaTwitter, url: 'https://twitter.com/directkey' },
  { Icon: FaInstagram, url: 'https://instagram.com/directkey' },
  { Icon: FaLinkedinIn, url: 'https://linkedin.com/company/directkey' },
  { Icon: FaTiktok, url: 'https://tiktok.com/@directkey' },
];

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success('Subscribed successfully!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-navy-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-navy-800">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-white text-xl font-semibold mb-2">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-6">
              Get the latest property listings and updates
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-navy-800 border border-navy-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary-400 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-400 hover:bg-primary-500 text-white font-semibold rounded-lg text-sm transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/DIRECTKEYLOGO.png" alt="DirectKey" className="h-9 w-auto" />
              <span className="text-xl font-bold text-white">
                Direct<span className="text-primary-400">Key</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              Nigeria's trusted property rental connection platform. We bridge the gap between
              landlords and tenants with verified listings and secure connections.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-navy-800 hover:bg-primary-400 flex items-center justify-center transition-colors no-underline"
                >
                  <Icon className="text-sm text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Browse Listings', path: '/listings' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'How It Works', path: '/about' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors no-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Landlords */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Landlords</h3>
            <ul className="space-y-3">
              {[
                { name: 'List Your Property', url: 'http://localhost:5174' },
                { name: 'Landlord Dashboard', url: 'http://localhost:5174' },
                { name: 'Pricing', url: '#' },
                { name: 'FAQs', url: '#' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors no-underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-primary-400 flex-shrink-0" />
                <a href="tel:+2348012345678" className="text-sm text-gray-400 hover:text-primary-400 transition-colors no-underline">
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-primary-400 flex-shrink-0" />
                <a href="mailto:info@directkey.ng" className="text-sm text-gray-400 hover:text-primary-400 transition-colors no-underline">
                  info@directkey.ng
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            {new Date().getFullYear()} DirectKey. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">RC: 0000000</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-300 transition-colors no-underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-300 transition-colors no-underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
