import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { HiOutlineHome } from 'react-icons/hi';

const propertyTypes = ['All Types', 'Apartment', 'Duplex', 'Bungalow', 'Semi-Detached', 'Penthouse', 'Studio'];
const popularStates = ['Lagos', 'Abuja', 'Rivers', 'Oyo', 'Ogun', 'Kano', 'Enugu', 'Delta', 'Edo', 'Kaduna'];

// Carousel slides: video first, then all images
const slides = [
  { type: 'video', src: '/video.mp4' },
  { type: 'image', src: '/DKimg1.JPG' },
  { type: 'image', src: '/DKimg2.JPG' },
  { type: 'image', src: '/Dkimg3.JPG' },
  { type: 'image', src: '/Dkimg4.JPG' },
  { type: 'image', src: '/Dkimg5.JPG' },
  { type: 'image', src: '/Dkimg6.JPG' },
  { type: 'image', src: '/Dkim7.JPG' },
];

const Hero = () => {
  const navigate = useNavigate();
  const [searchState, setSearchState] = useState('');
  const [searchType, setSearchType] = useState('');
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-advance every 6 seconds (longer for video)
  useEffect(() => {
    const interval = setInterval(() => {
      goNext();
    }, slides[current].type === 'video' ? 10000 : 6000);
    return () => clearInterval(interval);
  }, [current, goNext]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchState) params.set('state', searchState);
    if (searchType && searchType !== 'All Types') params.set('type', searchType);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {slides[current].type === 'video' ? (
              <video
                src={slides[current].src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={slides[current].src}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-navy-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/40" />
      </div>

      {/* Carousel Controls */}
      <button
        onClick={goPrev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition border-0 cursor-pointer"
      >
        <FiChevronLeft className="text-white text-xl" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition border-0 cursor-pointer"
      >
        <FiChevronRight className="text-white text-xl" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full border-0 cursor-pointer transition-all ${
              i === current
                ? 'w-8 h-2.5 bg-primary-400'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Content - Centered */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 mb-10"
          >
            <HiOutlineHome className="text-primary-400" />
            <span className="text-sm text-white/90 font-medium">Browse among thousands of properties</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-8 max-w-4xl"
          >
            Search and Find Your{' '}
            <span className="text-primary-400">Dream Home</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 mb-14 max-w-2xl leading-relaxed"
          >
            Rental properties across Nigeria. Connect directly with verified landlords
            through our secure platform.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-2xl p-3 shadow-2xl shadow-black/20 w-full max-w-2xl"
          >
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1 px-3 pt-1">Location</label>
                <select
                  value={searchState}
                  onChange={(e) => setSearchState(e.target.value)}
                  className="w-full px-3 pb-2 text-sm text-gray-800 bg-transparent border-0 focus:outline-none cursor-pointer appearance-auto"
                >
                  <option value="">All States</option>
                  {popularStates.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="hidden md:block w-px bg-gray-200" />

              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1 px-3 pt-1">Property Type</label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full px-3 pb-2 text-sm text-gray-800 bg-transparent border-0 focus:outline-none cursor-pointer appearance-auto"
                >
                  {propertyTypes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSearch}
                className="bg-primary-400 hover:bg-primary-500 text-white px-8 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all border-0 cursor-pointer text-sm"
              >
                <FiSearch className="text-lg" />
                Search
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-12 sm:gap-16 mt-14"
          >
            {[
              { value: '2,500+', label: 'Properties' },
              { value: '1,200+', label: 'Landlords' },
              { value: '15,000+', label: 'Happy Tenants' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
