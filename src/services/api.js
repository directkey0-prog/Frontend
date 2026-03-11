// =============================================================================
// DirectKey API Service
// Backend URL is read from VITE_BACKEND_URL in .env
// =============================================================================

const API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api`;

// =============================================================================
// Generic API Call Helper
// =============================================================================

const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || `API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error.message.startsWith('API Error')) throw error;
    throw new Error(`Network Error: Unable to reach server. ${error.message}`);
  }
};

// =============================================================================
// Properties
// =============================================================================

export const getProperties = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.state) params.set('state', filters.state);
  if (filters.category) params.set('category', filters.category);
  if (filters.sub_type) params.set('sub_type', filters.sub_type);
  if (filters.minPrice) params.set('minPrice', filters.minPrice);
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
  if (filters.bedrooms) params.set('bedrooms', filters.bedrooms);
  if (filters.search) params.set('search', filters.search);
  if (filters.lga) params.set('lga', filters.lga);
  if (filters.area) params.set('area', filters.area);
  const query = params.toString();
  return apiCall(`/properties${query ? '?' + query : ''}`);
};

export const getPropertyById = async (id) => {
  return apiCall(`/properties/${id}`);
};

export const getFeaturedProperties = async () => {
  return apiCall('/properties?featured=true');
};

export const getAllProperties = async () => {
  return apiCall('/properties');
};

export const getPropertyTypes = async () => {
  return ['Apartment', 'Land', 'Shop', 'Shortlet', 'Event Hall', 'Office Space'];
};

// =============================================================================
// Locations
// =============================================================================

export const getStates = async () => {
  const data = await apiCall('/locations/states');
  return Array.isArray(data) ? data : data.states || [];
};

export const getLGAs = async (state) => {
  const data = await apiCall(`/locations/lgas/${encodeURIComponent(state)}`);
  return Array.isArray(data) ? data : data.lgas || [];
};

export const getAreas = async (state, lga) => {
  const data = await apiCall(`/locations/areas/${encodeURIComponent(state)}/${encodeURIComponent(lga)}`);
  return Array.isArray(data) ? data : data.areas || [];
};

// =============================================================================
// Settings
// =============================================================================

export const getConnectionFee = async () => {
  return apiCall('/settings/connection-fee');
};

// =============================================================================
// Payments
// =============================================================================

export const initializePayment = async (data) => {
  return apiCall('/payments/initialize', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const verifyPayment = async (reference, tenantEmail, tenantName) => {
  const params = new URLSearchParams();
  if (tenantEmail) params.set('tenantEmail', tenantEmail);
  if (tenantName) params.set('tenantName', tenantName);
  const query = params.toString();
  return apiCall(`/payments/verify/${reference}${query ? '?' + query : ''}`);
};

// checkPaymentStatus and recordPayment are handled server-side via verifyPayment
export const checkPaymentStatus = async () => {
  return { hasPaid: false };
};

export const recordPayment = async () => {
  return { success: true };
};

// =============================================================================
// Testimonials
// =============================================================================

export const getTestimonials = async () => {
  return apiCall('/testimonials');
};

// =============================================================================
// Contact / Messages
// =============================================================================

export const sendMessage = async (data) => {
  return apiCall('/messages', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// =============================================================================
// Newsletter
// =============================================================================

export const subscribeNewsletter = async (email) => {
  return apiCall('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

// =============================================================================
// Default export
// =============================================================================

export default {
  getProperties,
  getPropertyById,
  getFeaturedProperties,
  getAllProperties,
  getPropertyTypes,
  getStates,
  getLGAs,
  getAreas,
  getConnectionFee,
  initializePayment,
  verifyPayment,
  checkPaymentStatus,
  recordPayment,
  getTestimonials,
  sendMessage,
  subscribeNewsletter,
};
