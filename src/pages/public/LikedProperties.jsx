import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiSearch, FiX } from 'react-icons/fi';
import { useLikedProperties } from '../../hooks/useLikedProperties';
import { getProperties } from '../../services/api';
import PropertyCard from '../../components/cards/PropertyCard';
import { SkeletonCard } from '../../components/ui/Skeleton';

const LikedProperties = () => {
  const { likedIds, toggleLike } = useLikedProperties();
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getProperties();
        setAllProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const liked = allProperties.filter((p) => likedIds.includes(String(p.id)));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy-900 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <FiHeart className="text-primary-400 text-2xl" />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Saved Properties</h1>
              <p className="text-gray-300 mt-1">Properties you have saved for later</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : likedIds.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <FiHeart className="text-3xl text-primary-400" />
            </div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">No saved properties yet</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Tap the heart icon on any property to save it here for quick access later.
            </p>
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 bg-primary-400 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold transition-all no-underline text-sm"
            >
              <FiSearch />
              Browse Properties
            </Link>
          </motion.div>
        ) : liked.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <FiHeart className="text-3xl text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">Saved properties no longer available</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              The properties you saved have been removed from the platform. Browse for new listings.
            </p>
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 bg-primary-400 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold transition-all no-underline text-sm"
            >
              <FiSearch />
              Browse Properties
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">{liked.length} saved {liked.length === 1 ? 'property' : 'properties'}</p>
              <button
                onClick={() => liked.forEach(p => toggleLike(p.id))}
                className="text-xs text-red-500 hover:text-red-600 font-medium bg-transparent border-0 cursor-pointer"
              >
                Remove all
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {liked.map((property, index) => (
                  <motion.div
                    key={property.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="relative"
                  >
                    <button
                      onClick={() => toggleLike(property.id)}
                      className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-red-100 text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-sm"
                    >
                      <FiX className="text-xs" />
                      Remove
                    </button>
                    <PropertyCard property={property} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LikedProperties;
