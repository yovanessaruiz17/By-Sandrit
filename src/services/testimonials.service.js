import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { demoTestimonials } from './demoData';

let localTestimonials = [...demoTestimonials];

export const testimonialsService = {
  async getAllTestimonials(includeInactive = false) {
    if (!isSupabaseConfigured || !supabase) {
      const filtered = includeInactive ? localTestimonials : localTestimonials.filter(t => t.is_active);
      return { data: filtered, error: null, isDemo: true };
    }
    try {
      let query = supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (!includeInactive) {
        query = query.eq('is_active', true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return { data: data && data.length > 0 ? data : localTestimonials, error: null, isDemo: !data || data.length === 0 };
    } catch (err) {
      console.warn('Supabase getAllTestimonials fallback:', err.message);
      const filtered = includeInactive ? localTestimonials : localTestimonials.filter(t => t.is_active);
      return { data: filtered, error: null, isDemo: true };
    }
  },

  async createTestimonial(testimonialData) {
    const payload = {
      ...testimonialData,
      rating: Number(testimonialData.rating) || 5,
      is_active: testimonialData.is_active ?? true,
      created_at: new Date().toISOString()
    };

    if (!isSupabaseConfigured || !supabase) {
      const newItem = { id: `test-${Date.now()}`, ...payload };
      localTestimonials.unshift(newItem);
      return { data: newItem, error: null, isDemo: true };
    }

    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([payload])
        .select()
        .single();
      if (error) throw error;
      return { data, error: null, isDemo: false };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async updateTestimonial(id, testimonialData) {
    if (!isSupabaseConfigured || !supabase) {
      const index = localTestimonials.findIndex(t => t.id === id);
      if (index !== -1) {
        localTestimonials[index] = { ...localTestimonials[index], ...testimonialData };
        return { data: localTestimonials[index], error: null, isDemo: true };
      }
      return { data: null, error: new Error('Testimonio no encontrado'), isDemo: true };
    }
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .update(testimonialData)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return { data, error: null, isDemo: false };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async deleteTestimonial(id) {
    if (!isSupabaseConfigured || !supabase) {
      localTestimonials = localTestimonials.filter(t => t.id !== id);
      return { success: true, error: null, isDemo: true };
    }
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err };
    }
  }
};
