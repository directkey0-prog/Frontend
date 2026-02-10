import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';
import { HiOutlineAdjustments } from 'react-icons/hi';
import PropertyCard from '../../components/cards/PropertyCard';
import { SkeletonCard } from '../../components/ui/Skeleton';
import { getProperties, getStates, getLGAs, getAreas } from '../../services/api';

const propertyTypes = ['Apartment', 'Duplex', 'Bungalow', 'Semi-Detached', 'Penthouse', 'Studio'];
const bedroomOptions = ['Any', '1', '2', '3', '4', '5+'];
const sortOptions = [
  { label: 'Latest', value: 'latest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Most Viewed', value: 'views' },
];

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('latest');

  const [filters, setFilters] = useState({
    state: searchParams.get('state') || '',
    local_government: '',
    area: '',
    type: searchParams.get('type') || '',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'Any',
  });

  const [locationData, setLocationData] = useState({ states: [], lgas: [], areas: [] });

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const data = await getProperties();
        const approved = Array.isArray(data) ? data.filter(p => p.status === 'approved') : [];
        setProperties(approved);
      } catch (err) {
        console.error('Failed to fetch:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const loadStates = async () => {
      const data = await getStates();
      setLocationData(prev => ({ ...prev, states: Array.isArray(data) ? data : [] }));
    };
    loadStates();
  }, []);

  useEffect(() => {
    if (filters.state) {
      const loadLGAs = async () => {
        const data = await getLGAs(filters.state);
        setLocationData(prev => ({ ...prev, lgas: Array.isArray(data) ? data : [], areas: [] }));
      };
      loadLGAs();
    } else {
      setLocationData(prev => ({ ...prev, lgas: [], areas: [] }));
    }
  }, [filters.state]);

  useEffect(() => {
    if (filters.state && filters.local_government) {
      const loadAreas = async () => {
        const data = await getAreas(filters.state, filters.local_government);
        setLocationData(prev => ({ ...prev, areas: Array.isArray(data) ? data : [] }));
      };
      loadAreas();
    } else {
      setLocationData(prev => ({ ...prev, areas: [] }));
    }
  }, [filters.state, filters.local_government]);

  const filteredAndSorted = useMemo(() => {
    let result = [...properties];
    if (filters.state) result = result.filter(p => p.state === filters.state);
    if (filters.local_government) result = result.filter(p => p.local_government === filters.local_government);
    if (filters.area) result = result.filter(p => p.area === filters.area);
    if (filters.type) result = result.filter(p => p.property_type === filters.type);
    if (filters.minPrice) result = result.filter(p => (p.price_per_year || p.monthly_rent * 12) >= parseInt(filters.minPrice));
    if (filters.maxPrice) result = result.filter(p => (p.price_per_year || p.monthly_rent * 12) <= parseInt(filters.maxPrice));
    if (filters.bedrooms !== 'Any') {
      const beds = filters.bedrooms === '5+' ? 5 : parseInt(filters.bedrooms);
      result = result.filter(p => filters.bedrooms === '5+' ? p.bedrooms >= beds : p.bedrooms === beds);
    }
    switch (sortBy) {
      case 'price_asc': result.sort((a, b) => (a.price_per_year || a.monthly_rent * 12) - (b.price_per_year || b.monthly_rent * 12)); break;
      case 'price_desc': result.sort((a, b) => (b.price_per_year || b.monthly_rent * 12) - (a.price_per_year || a.monthly_rent * 12)); break;
      case 'views': result.sort((a, b) => (b.views_count || 0) - (a.views_count || 0)); break;
      default: result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    return result;
  }, [properties, filters, sortBy]);

  const updateFilter = (key, value) => {
    setFilters(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'state') { next.local_government = ''; next.area = ''; }
      if (key === 'local_government') { next.area = ''; }
      return next;
    });
  };

  const clearFilters = () => {
    setFilters({ state: '', local_government: '', area: '', type: '', minPrice: '', maxPrice: '', bedrooms: 'Any' });
  };

  const activeFilterCount = Object.entries(filters).filter(([k, v]) => v && v !== 'Any').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy-900 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Browse Properties</h1>
          <p className="text-gray-300">Find your next home from our collection of verified rentals</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowFilters(!showFilters)} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all cursor-pointer ${showFilters ? 'bg-primary-400 text-white border-primary-400' : 'bg-white text-gray-700 border-gray-200 hover:border-primary-400'}`}>
              <HiOutlineAdjustments />
              Filters
              {activeFilterCount > 0 && <span className="bg-white text-primary-500 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{activeFilterCount}</span>}
            </button>
            <span className="text-sm text-gray-500">{filteredAndSorted.length} properties found</span>
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-400 cursor-pointer">
            {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">State</label>
                    <select value={filters.state} onChange={e => updateFilter('state', e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400">
                      <option value="">All States</option>
                      {locationData.states.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">LGA</label>
                    <select value={filters.local_government} onChange={e => updateFilter('local_government', e.target.value)} disabled={!filters.state} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:bg-gray-50">
                      <option value="">All LGAs</option>
                      {locationData.lgas.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Area</label>
                    <select value={filters.area} onChange={e => updateFilter('area', e.target.value)} disabled={!filters.local_government} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:bg-gray-50">
                      <option value="">All Areas</option>
                      {locationData.areas.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Property Type</label>
                    <select value={filters.type} onChange={e => updateFilter('type', e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400">
                      <option value="">All Types</option>
                      {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Min Price ({'\u20A6'}/year)</label>
                    <input type="number" value={filters.minPrice} onChange={e => updateFilter('minPrice', e.target.value)} placeholder="0" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Max Price ({'\u20A6'}/year)</label>
                    <input type="number" value={filters.maxPrice} onChange={e => updateFilter('maxPrice', e.target.value)} placeholder="No limit" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Bedrooms</label>
                    <div className="flex gap-1.5">
                      {bedroomOptions.map(opt => (
                        <button key={opt} onClick={() => updateFilter('bedrooms', opt)} className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all border-0 cursor-pointer ${filters.bedrooms === opt ? 'bg-primary-400 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-end">
                    <button onClick={clearFilters} className="w-full py-2.5 text-sm font-medium text-gray-600 hover:text-primary-500 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all border-0 cursor-pointer">Clear All</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredAndSorted.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSorted.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiFilter className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters to see more results</p>
            <button onClick={clearFilters} className="bg-primary-400 hover:bg-primary-500 text-white px-6 py-2.5 rounded-xl font-medium transition-all border-0 cursor-pointer text-sm">Clear All Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
