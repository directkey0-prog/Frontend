import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Listings', path: '/listings' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center gap-2 no-underline flex-shrink-0">
            <img src="/DIRECTKEYLOGO.png" alt="DirectKey" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-navy-900">
              Direct<span className="text-primary-400">Key</span>
            </span>
          </Link>

          {/* Right side - Nav Links + CTA */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors no-underline ${
                  isActive(link.path)
                    ? 'text-primary-500'
                    : 'text-gray-600 hover:text-primary-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="http://localhost:5174"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-navy-800 hover:text-primary-500 transition-colors no-underline"
            >
              Landlord Portal
            </a>
            <Link
              to="/listings"
              className="bg-primary-400 hover:bg-primary-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all no-underline"
            >
              Find Property
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors bg-transparent border-0"
          >
            {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 px-3 rounded-lg text-sm font-medium transition-colors no-underline ${
                  isActive(link.path)
                    ? 'bg-primary-50 text-primary-500'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-gray-100" />
            <a
              href="http://localhost:5174"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 px-3 text-sm font-medium text-navy-800 no-underline"
            >
              Landlord Portal
            </a>
            <Link
              to="/listings"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-primary-400 hover:bg-primary-500 text-white py-2.5 rounded-lg text-sm font-semibold transition-all no-underline"
            >
              Find Property
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
