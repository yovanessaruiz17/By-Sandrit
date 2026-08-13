import React, { createContext, useContext, useEffect, useState } from 'react';
import { settingsService } from '../services/settings.service';
import { servicesService } from '../services/services.service';
import { demoBusinessSettings } from '../services/demoData';
import { isSupabaseConfigured } from '../lib/supabase';

const BusinessContext = createContext(null);

export function BusinessProvider({ children }) {
  const [settings, setSettings] = useState(demoBusinessSettings);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured);

  const refreshBusinessData = async () => {
    try {
      const [settingsRes, categoriesRes] = await Promise.all([
        settingsService.getSettings(),
        servicesService.getCategories()
      ]);

      if (settingsRes.data) {
        setSettings(settingsRes.data);
      }
      if (categoriesRes.data) {
        setCategories(categoriesRes.data);
      }
      setIsDemoMode(Boolean(settingsRes.isDemo || !isSupabaseConfigured));
    } catch (err) {
      console.error('Error fetching business info:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshBusinessData();
  }, []);

  const updateBusinessSettings = async (newValues) => {
    const res = await settingsService.updateSettings(newValues);
    if (res.data) {
      setSettings(prev => ({ ...prev, ...res.data }));
    }
    return res;
  };

  const value = {
    settings,
    categories,
    loading,
    isDemoMode,
    isSupabaseConfigured,
    updateBusinessSettings,
    refreshBusinessData
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
}
