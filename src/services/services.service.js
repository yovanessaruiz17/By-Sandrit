import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { demoCategories, demoServices } from './demoData';

// Local cache for in-memory demo mutations if Supabase is not yet connected
let localServices = [...demoServices];
let localCategories = [...demoCategories];

// Helper to sanitize service slugs
function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accent marks
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Build clean Supabase payload containing only valid table columns
function buildServicePayload(serviceData, isNew = false) {
  const name = (serviceData.name || '').trim();
  const slug = slugify(serviceData.slug || name) || `srv-${Date.now()}`;
  
  // Ensure category_id is either a non-empty string or null
  let categoryId = null;
  if (serviceData.category_id && typeof serviceData.category_id === 'string' && serviceData.category_id.trim() !== '') {
    categoryId = serviceData.category_id.trim();
  }

  // Ensure benefits is a valid array
  let benefits = [];
  if (Array.isArray(serviceData.benefits)) {
    benefits = serviceData.benefits.filter(Boolean);
  } else if (typeof serviceData.benefitsText === 'string') {
    benefits = serviceData.benefitsText.split('\n').map(b => b.trim()).filter(Boolean);
  }

  const payload = {
    name,
    slug,
    category_id: categoryId,
    description: (serviceData.description || '').trim() || null,
    short_description: (serviceData.short_description || serviceData.description || '').trim().slice(0, 140) || null,
    benefits,
    recommendations: (serviceData.recommendations || '').trim() || null,
    duration_minutes: Number(serviceData.duration_minutes) || 60,
    price: Number(serviceData.price) || 0,
    price_is_demo: false,
    image_url: (serviceData.image_url || '').trim() || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    is_active: serviceData.is_active !== undefined ? Boolean(serviceData.is_active) : true,
    is_featured: Boolean(serviceData.is_featured),
    updated_at: new Date().toISOString()
  };

  if (isNew) {
    payload.id = serviceData.id || `srv-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    payload.created_at = new Date().toISOString();
  }

  return payload;
}

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

      // If categories table exists but is empty, try to seed with default categories
      if (!data || data.length === 0) {
        try {
          const { data: seeded, error: seedError } = await supabase
            .from('service_categories')
            .upsert(demoCategories, { onConflict: 'id' })
            .select();
          if (!seedError && seeded && seeded.length > 0) {
            return { data: seeded, error: null, isDemo: false };
          }
        } catch {
          // ignore seeding error
        }
        return { data: localCategories, error: null, isDemo: true };
      }

      return { data, error: null, isDemo: false };
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
    const payload = buildServicePayload(serviceData, true);

    if (!isSupabaseConfigured || !supabase) {
      localServices.unshift(payload);
      return { data: payload, error: null, isDemo: true };
    }

    try {
      let insertRes = await supabase
        .from('services')
        .insert([payload])
        .select()
        .single();

      // If foreign key constraint failed on category_id (e.g. category doesn't exist in remote table yet)
      if (insertRes.error && insertRes.error.code === '23503') {
        console.warn('Category foreign key violation, retrying with category_id: null');
        payload.category_id = null;
        insertRes = await supabase
          .from('services')
          .insert([payload])
          .select()
          .single();
      }

      if (insertRes.error) throw insertRes.error;
      return { data: insertRes.data, error: null, isDemo: false };
    } catch (err) {
      console.error('Error creating service in Supabase:', err);
      return { data: null, error: err };
    }
  },

  async updateService(id, serviceData) {
    const payload = buildServicePayload(serviceData, false);

    if (!isSupabaseConfigured || !supabase) {
      const index = localServices.findIndex(s => s.id === id);
      if (index !== -1) {
        localServices[index] = { ...localServices[index], ...payload, id };
        return { data: localServices[index], error: null, isDemo: true };
      }
      return { data: null, error: new Error('Servicio no encontrado'), isDemo: true };
    }

    try {
      let updateRes = await supabase
        .from('services')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      // If foreign key failed on category_id
      if (updateRes.error && updateRes.error.code === '23503') {
        payload.category_id = null;
        updateRes = await supabase
          .from('services')
          .update(payload)
          .eq('id', id)
          .select()
          .single();
      }

      if (updateRes.error) throw updateRes.error;
      return { data: updateRes.data, error: null, isDemo: false };
    } catch (err) {
      console.error('Error updating service in Supabase:', err);
      return { data: null, error: err };
    }
  },

  async toggleServiceActive(id, currentStatus) {
    if (!isSupabaseConfigured || !supabase) {
      const srv = localServices.find(s => s.id === id);
      if (srv) srv.is_active = !currentStatus;
      return { success: true };
    }
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
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
