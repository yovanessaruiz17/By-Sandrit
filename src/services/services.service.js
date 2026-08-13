import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { demoCategories, demoServices } from './demoData';

// Local cache for in-memory demo mutations if Supabase is not yet connected
let localServices = [...demoServices];
let localCategories = [...demoCategories];

export const servicesService = {
  async getCategories() {
    if (!isSupabaseConfigured || !supabase) {
      return { data: localCategories, error: null, isDemo: true };
    }
    try {
      const { data, error } = await supabase
        .from('service_categories')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return { data: data && data.length > 0 ? data : localCategories, error: null, isDemo: !data || data.length === 0 };
    } catch (err) {
      console.warn('Supabase getCategories failed, falling back to demo data:', err.message);
      return { data: localCategories, error: err, isDemo: true };
    }
  },

  async getAllServices(includeInactive = false) {
    if (!isSupabaseConfigured || !supabase) {
      const filtered = includeInactive ? localServices : localServices.filter(s => s.is_active);
      return { data: filtered, error: null, isDemo: true };
    }
    try {
      let query = supabase
        .from('services')
        .select('*, service_categories(name, slug)');

      if (!includeInactive) {
        query = query.eq('is_active', true);
      }

      const { data, error } = await query.order('name', { ascending: true });
      if (error) throw error;
      return { data: data && data.length > 0 ? data : localServices, error: null, isDemo: !data || data.length === 0 };
    } catch (err) {
      console.warn('Supabase getAllServices failed, falling back to demo data:', err.message);
      const filtered = includeInactive ? localServices : localServices.filter(s => s.is_active);
      return { data: filtered, error: err, isDemo: true };
    }
  },

  async getServiceBySlug(slug) {
    if (!isSupabaseConfigured || !supabase) {
      const srv = localServices.find(s => s.slug === slug);
      return { data: srv || null, error: srv ? null : new Error('Servicio no encontrado'), isDemo: true };
    }
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*, service_categories(name, slug)')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return { data, error: null, isDemo: false };
    } catch (err) {
      console.warn('Supabase getServiceBySlug fallback:', err.message);
      const srv = localServices.find(s => s.slug === slug);
      return { data: srv || null, error: null, isDemo: true };
    }
  },

  async createService(serviceData) {
    if (!isSupabaseConfigured || !supabase) {
      const newService = {
        ...serviceData,
        id: `srv-${Date.now()}`,
        is_active: serviceData.is_active ?? true,
        price_is_demo: true
      };
      localServices.unshift(newService);
      return { data: newService, error: null, isDemo: true };
    }
    try {
      const { data, error } = await supabase
        .from('services')
        .insert([serviceData])
        .select()
        .single();
      if (error) throw error;
      return { data, error: null, isDemo: false };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async updateService(id, serviceData) {
    if (!isSupabaseConfigured || !supabase) {
      const index = localServices.findIndex(s => s.id === id);
      if (index !== -1) {
        localServices[index] = { ...localServices[index], ...serviceData };
        return { data: localServices[index], error: null, isDemo: true };
      }
      return { data: null, error: new Error('Servicio no encontrado'), isDemo: true };
    }
    try {
      const { data, error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return { data, error: null, isDemo: false };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async toggleServiceActive(id, currentStatus) {
    return this.updateService(id, { is_active: !currentStatus });
  },

  async deleteService(id) {
    if (!isSupabaseConfigured || !supabase) {
      localServices = localServices.filter(s => s.id !== id);
      return { success: true, error: null, isDemo: true };
    }
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err };
    }
  }
};
