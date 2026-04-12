'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import api from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/auth-context';

const PropertyContext = createContext(undefined);

export function PropertyProvider({ children }) {
  const { user, data: userProfile } = useUser();
  const { toast } = useToast();
  
  const [properties, setProperties] = useState([]);
  const [isPropertiesLoading, setIsPropertiesLoading] = useState(true);
  const [savedPropertyIds, setSavedPropertyIds] = useState(userProfile?.savedPropertyIds || []);

  useEffect(() => {
    if (userProfile?.savedPropertyIds) {
      setSavedPropertyIds(userProfile.savedPropertyIds);
    }
  }, [userProfile]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await api.get('/properties');
        setProperties(data);
      } catch (error) {
        console.error("Failed to load properties", error);
        toast({ title: 'Error', description: 'Could not load properties', variant: 'destructive' });
      } finally {
        setIsPropertiesLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const getPropertyById = useCallback((id) => {
    return properties.find(p => p.id === id);
  }, [properties]);

  const addProperty = useCallback(async (property) => {
    if (!user) throw new Error("User not authenticated");
    try {
        const { data } = await api.post('/properties', property);
        setProperties(prev => [data, ...prev]);
        toast({ title: 'Property Added', description: 'Your listing is now live.' });
    } catch (error) {
        toast({ title: 'Error', description: 'Could not add property', variant: 'destructive' });
        throw error;
    }
  }, [user, toast]);

  const updateProperty = useCallback(async (propertyId, updatedProperty) => {
    // Implement PUT if needed on backend
  }, []);

  const deleteProperty = useCallback(async (propertyId) => {
    // Implement DELETE if needed on backend
  }, []);

  const toggleSaveProperty = async (propertyId) => {
      if (!user) return;
      try {
          const { data } = await api.post(`/auth/save-property/${propertyId}`);
          setSavedPropertyIds(data.savedPropertyIds);
      } catch (error) {
          toast({ title: 'Error', description: 'Could not update saved properties', variant: 'destructive' });
      }
  };

  const saveProperty = useCallback((propertyId) => {
    toggleSaveProperty(propertyId);
    toast({ title: 'Property Saved!', description: 'You can view it in your saved list.' });
  }, [user, toast]);

  const unsaveProperty = useCallback((propertyId) => {
    toggleSaveProperty(propertyId);
    toast({ title: 'Property Unsaved', variant: 'destructive' });
  }, [user, toast]);
  
  const isPropertySaved = useCallback((propertyId) => {
    return savedPropertyIds.includes(propertyId);
  }, [savedPropertyIds]);

  const savedProperties = useMemo(() => {
    return properties.filter(p => savedPropertyIds.includes(p.id));
  }, [properties, savedPropertyIds]);

  const value = useMemo(() => ({ 
      properties,
      isPropertiesLoading,
      getPropertyById,
      addProperty,
      updateProperty,
      deleteProperty,
      savedProperties,
      saveProperty,
      unsaveProperty,
      isPropertySaved,
      data: userProfile,
      users: []
    }), [properties, isPropertiesLoading, getPropertyById, addProperty, updateProperty, deleteProperty, savedProperties, saveProperty, unsaveProperty, isPropertySaved, userProfile]);

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
}