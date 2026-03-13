import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoBedOutline, IoWaterOutline } from 'react-icons/io5';
import { FiMapPin, FiPhone, FiChevronLeft, FiChevronRight, FiCheck, FiUsers, FiHeart, FiShare2 } from 'react-icons/fi';
import { HiHeart } from 'react-icons/hi';
import { MdOutlineApartment } from 'react-icons/md';
import { TbRulerMeasure } from 'react-icons/tb';
import { getTypeDisplay } from '../../utils/propertyTypes';
import { getPropertyById, getConnectionFee } from '../../services/api';
import { SkeletonPropertyDetail } from '../../components/ui/Skeleton';
import PaymentModal from '../../components/payments/PaymentModal';
import { useLikedProperties } from '../../hooks/useLikedProperties';
import toast from 'react-hot-toast';

const formatPrice = (amount) => {
  if (!amount) return '0';
  return new Intl.NumberFormat('en-NG').format(amount);
};

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [connectionFee, setConnectionFee] = useState(15000);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const { isLiked, toggleLike } = useLikedProperties();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [propData, feeData] = await Promise.all([
          getPropertyById(id),
          getConnectionFee(),
        ]);
        setProperty(propData);
        if (feeData?.connection_fee) setConnectionFee(parseInt(feeData.connection_fee));
      } catch (err) {
        console.error('Failed to fetch property:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SkeletonPropertyDetail />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Property not found</h2>
          <Link to="/listings" className="text-primary-500 hover:underline">Back to listings</Link>
        </div>
      </div>
    );
  }

  const images = property.property_images || [];
  const amenities = property.amenities || [];
  const isLand = property.property_category === 'land';
  const isShortlet = property.property_category === 'shortlet';
  const isEventHall = property.property_category === 'event_hall';
  const isOfficeSpace = property.property_category === 'office_space';
  const isShop = property.property_category === 'shop';
  const typeDisplay = getTypeDisplay(property);

  const handleShare = async () => {
    const url = window.location.href;
    const text = `Check out this property: ${property.property_name} in ${property.area}, ${property.state} — ${url}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: property.property_name, text, url });
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };
  const nextImage = () => setActiveImage((prev) => (prev + 1) % Math.max(images.length, 1));
  const prevImage = () => setActiveImage((prev) => (prev - 1 + Math.max(images.length, 1)) % Math.max(images.length, 1));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-primary-500 no-underline text-gray-500">Home</Link>
            <span>/</span>
            <Link to="/listings" className="hover:text-primary-500 no-underline text-gray-500">Listings</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium truncate">{property.property_name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="relative rounded-2xl overflow-hidden mb-8 bg-gray-900">
          <div className="aspect-[16/9] sm:aspect-[2/1] lg:aspect-[5/2]">
            {images.length > 0 ? (
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={images[activeImage]?.image_url}
                alt={`${property.property_name} - Image ${activeImage + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-lg">No images available</span>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition border-0 cursor-pointer shadow-lg">
                <FiChevronLeft className="text-gray-700" />
              </button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition border-0 cursor-pointer shadow-lg">
                <FiChevronRight className="text-gray-700" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-full">
                {activeImage + 1} / {images.length}
              </div>
            </>
          )}

          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleShare}
              aria-label="Share property"
              className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition border-0 cursor-pointer shadow-lg"
            >
              <FiShare2 className="text-lg text-gray-700" />
            </button>
            <button
              onClick={() => toggleLike(property.id)}
              aria-label={isLiked(property.id) ? 'Remove from saved' : 'Save property'}
              className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition border-0 cursor-pointer shadow-lg"
            >
              {isLiked(property.id)
                ? <HiHeart className="text-lg text-primary-400" />
                : <FiHeart className="text-lg text-gray-700" />
              }
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImage(i)} className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${activeImage === i ? 'border-primary-400 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                <img src={img.image_url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {typeDisplay && <span className="bg-primary-50 text-primary-600 text-xs font-medium px-3 py-1 rounded-full">{typeDisplay}</span>}
                {property.featured && <span className="bg-yellow-50 text-yellow-700 text-xs font-medium px-3 py-1 rounded-full">Featured</span>}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3">{property.property_name}</h1>
              <div className="flex items-center gap-1.5 text-gray-500 mb-4">
                <FiMapPin className="text-primary-400" />
                <span>{property.area}, {property.local_government}, {property.state}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-navy-900">
                  {'\u20A6'}{formatPrice(
                    isEventHall ? property.price_per_hour :
                    isShortlet ? property.price_per_night :
                    (property.price_per_year || property.monthly_rent * 12)
                  )}
                </span>
                <span className="text-gray-500">
                  {isEventHall ? '/hr' : isShortlet ? '/night' : '/year'}
                </span>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-3 gap-4">
              {(isEventHall ? [
                { icon: FiUsers, value: property.capacity, label: 'Capacity' },
                { icon: MdOutlineApartment, value: 'Event Hall', label: 'Type' },
              ] : isLand ? [
                { icon: TbRulerMeasure, value: property.land_area ? `${property.land_area} ${property.land_unit}` : 'N/A', label: 'Land Size' },
                { icon: MdOutlineApartment, value: 'Land', label: 'Type' },
              ] : isOfficeSpace ? [
                { icon: IoBedOutline, value: property.bedrooms, label: 'Rooms' },
                { icon: IoWaterOutline, value: property.bathrooms, label: 'Bathrooms' },
                { icon: MdOutlineApartment, value: 'Office Space', label: 'Type' },
              ] : isShop ? [
                { icon: IoBedOutline, value: property.bedrooms, label: 'Units' },
                { icon: IoWaterOutline, value: property.bathrooms, label: 'Bathrooms' },
                { icon: MdOutlineApartment, value: 'Shop', label: 'Type' },
              ] : [
                { icon: IoBedOutline, value: property.bedrooms, label: 'Bedrooms' },
                { icon: IoWaterOutline, value: property.bathrooms, label: 'Bathrooms' },
                { icon: MdOutlineApartment, value: typeDisplay || 'N/A', label: 'Type' },
              ]).map((f) => (
                <div key={f.label} className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <f.icon className="text-2xl text-primary-400 mx-auto mb-2" />
                  <p className="text-lg font-bold text-navy-900">{f.value}</p>
                  <p className="text-xs text-gray-500">{f.label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-navy-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>

            {/* Amenities */}
            {amenities.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-navy-900 mb-4">{isEventHall ? 'Event Hall Facilities' : 'Amenities'}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 py-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiCheck className="text-green-600 text-xs" />
                      </div>
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-navy-900 mb-4">Location</h2>
              <div className="flex items-start gap-3">
                <FiMapPin className="text-primary-400 text-lg mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">{property.area}</p>
                  <p className="text-sm text-gray-500">{property.local_government}, {property.state}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Contact CTA */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiPhone className="text-2xl text-primary-500" />
                </div>
                <h3 className="font-bold text-navy-900 mb-1">Interested in this property?</h3>
                <p className="text-sm text-gray-500">Pay a one-time digital key fee to get the landlord's contact details</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Digital Key</span>
                  <span className="text-xl font-bold text-navy-900">{'\u20A6'}{formatPrice(connectionFee)}</span>
                </div>
              </div>
              <button onClick={() => setShowPayment(true)} className="w-full bg-primary-400 hover:bg-primary-500 text-white py-3.5 rounded-xl font-semibold transition-all border-0 cursor-pointer text-sm">
                Get Digital Key
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">Secure payment. Instant access to landlord details.</p>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal isOpen={showPayment} onClose={() => setShowPayment(false)} property={property} connectionFee={connectionFee} />
    </div>
  );
};

export default PropertyDetails;
