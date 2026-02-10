import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FloatingContactButton = () => {
  return (
    <motion.a
      href="https://wa.me/2348012345678?text=Hello%2C%20I%20need%20help%20finding%20a%20property%20on%20DirectKey"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-colors no-underline"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <FaWhatsapp className="text-white text-2xl" />
    </motion.a>
  );
};

export default FloatingContactButton;
