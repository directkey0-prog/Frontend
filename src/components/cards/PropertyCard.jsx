import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoBedOutline, IoWaterOutline } from 'react-icons/io5';
import { FiMapPin, FiEye, FiHeart } from 'react-icons/fi';
import { HiOutlinePhotograph } from 'react-icons/hi';

const formatPrice = (amount) => {
  if (!amount) return '0';
  return new Intl.NumberFormat('en-NG').format(amount);
};

const PropertyCard = ({ property, index = 0 }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('dk_favorites') || '[]');
    setIsFav(favs.includes(String(property.id)));
  }, [property.id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const favs = JSON.parse(localStorage.getItem('dk_favorites') || '[]');
    const pid = String(property.id);
    const updated = favs.includes(pid) ? favs.filter(f => f !== pid) : [...favs, pid];
    localStorage.setItem('dk_favorites', JSON.stringify(updated));
    setIsFav(!isFav);
  };

  const images = property.property_images || [];
  const mainImage = images.length > 0
    ? images[0].image_url
    : 'https://picsum.photos/seed/default/800/600';

  const slideDirection = index % 3 === 0 ? -60 : index % 3 === 1 ? 0 : 60;
  const slideY = index % 3 === 1 ? 60 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: slideDirection, y: slideY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.1, ease: 'easeOut' }}
    >
      <Link
        to={`/property/${property.id}`}
        className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 no-underline"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={mainImage}
            alt={property.property_name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {property.featured && (
              <span className="bg-primary-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                Featured
              </span>
            )}
            {property.property_type && (
              <span className="bg-navy-800/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                {property.property_type}
              </span>
            )}
          </div>

          {/* Favorite button */}
          <button
            onClick={toggleFavorite}
            className={`absolute top-3 right-3 w-8 h-8 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors border-0 cursor-pointer ${isFav ? 'bg-red-50' : 'bg-white/90'}`}
          >
            <FiHeart className={`text-sm ${isFav ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
          </button>

          {/* Image count */}
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
              <HiOutlinePhotograph className="text-sm" />
              {images.length}
            </div>
          )}

          {/* Price tag */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-white rounded-lg px-3 py-1.5 shadow-lg">
              <span className="text-lg font-bold text-navy-900">
                {'\u20A6'}{formatPrice(property.price_per_year || property.monthly_rent * 12)}
              </span>
              <span className="text-xs text-gray-500">/year</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-navy-900 text-base mb-2 group-hover:text-primary-500 transition-colors" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {property.property_name}
          </h3>

          <div className="flex items-center gap-1.5 text-gray-500 mb-4">
            <FiMapPin className="text-sm text-primary-400 flex-shrink-0" />
            <span className="text-sm truncate">
              {property.area}, {property.local_government}, {property.state}
            </span>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <IoBedOutline className="text-gray-400" />
              <span className="text-sm text-gray-600">
                {property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <IoWaterOutline className="text-gray-400" />
              <span className="text-sm text-gray-600">
                {property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}
              </span>
            </div>
            {property.views_count > 0 && (
              <div className="flex items-center gap-1.5 ml-auto">
                <FiEye className="text-gray-400 text-sm" />
                <span className="text-xs text-gray-400">{property.views_count}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
