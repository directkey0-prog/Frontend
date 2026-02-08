import supabase from './authService';

export const createProperty = async (propertyData) => {
  const { data, error } = await supabase
    .from('properties')
    .insert(propertyData);
  return { data, error };
};

export const getLandlordProperties = async (landlordId) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('landlord_id', landlordId);
  return { data, error };
};