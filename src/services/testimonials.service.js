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
      return { data: data && data.length > 0 ? data : (includeInactive ? localTestimonials : localTestimonials.filter(t => t.is_active)), error: null, isDemo: false };
    } catch (err) {
      console.warn('Supabase getAllTestimonials fallback:', err.message);
      const filtered = includeInactive ? localTestimonials : localTestimonials.filter(t => t.is_active);
      return { data: filtered, error: null, isDemo: true };
    }
  },

  async createTestimonial(testimonialData) {
    const customerName = (testimonialData.customer_name || testimonialData.client_name || '').trim();
    const serviceName = (testimonialData.service_name || '').trim() || null;
    const comment = (testimonialData.comment || '').trim();
    const rating = Math.min(5, Math.max(1, Number(testimonialData.rating) || 5));

    const generatedId = testimonialData.id || `test-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const payload = {
      id: generatedId,
      customer_name: customerName,
      service_name: serviceName,
      comment: comment,
      rating: rating,
      is_active: testimonialData.is_active !== undefined ? Boolean(testimonialData.is_active) : true,
      created_at: new Date().toISOString()
    };

    if (!isSupabaseConfigured || !supabase) {
      localTestimonials.unshift(payload);
      return { data: payload, error: null, isDemo: true };
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
      console.error('Supabase createTestimonial error:', err);
      return { data: null, error: err };
    }
  },

  async updateTestimonial(id, testimonialData) {
    const updatePayload = { ...testimonialData };
    if (updatePayload.client_name && !updatePayload.customer_name) {
      updatePayload.customer_name = updatePayload.client_name;
      delete updatePayload.client_name;
    }

    if (!isSupabaseConfigured || !supabase) {
      const index = localTestimonials.findIndex(t => t.id === id);
      if (index !== -1) {
        localTestimonials[index] = { ...localTestimonials[index], ...updatePayload };
        return { data: localTestimonials[index], error: null, isDemo: true };
      }
      return { data: null, error: new Error('Testimonio no encontrado'), isDemo: true };
    }
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .update(updatePayload)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return { data, error: null, isDemo: false };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async toggleActive(id, currentStatus) {
    return this.updateTestimonial(id, { is_active: !currentStatus });
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
