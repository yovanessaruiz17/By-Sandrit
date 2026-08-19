import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { demoGallery } from './demoData';

let localGallery = [...demoGallery];

export const galleryService = {
  async getGallery(category = 'Todos', includeInactive = false) {
    if (!isSupabaseConfigured || !supabase) {
      let filtered = includeInactive ? localGallery : localGallery.filter(g => g.is_active);
      if (category && category !== 'Todos') {
        filtered = filtered.filter(g => g.category.toLowerCase() === category.toLowerCase());
      }
      return { data: filtered, error: null, isDemo: true };
    }
    try {
      let query = supabase
        .from('gallery')
        .select('*')
        .order('order_index', { ascending: true });

      if (!includeInactive) {
        query = query.eq('is_active', true);
      }
      if (category && category !== 'Todos') {
        query = query.ilike('category', `%${category}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return { data: data && data.length > 0 ? data : localGallery, error: null, isDemo: !data || data.length === 0 };
    } catch (err) {
      console.warn('Supabase getGallery fallback:', err.message);
      let filtered = localGallery.filter(g => includeInactive ? true : g.is_active);
      if (category && category !== 'Todos') {
        filtered = filtered.filter(g => g.category.toLowerCase() === category.toLowerCase());
      }
      return { data: filtered, error: null, isDemo: true };
    }
  },

  async addGalleryItem(itemData, imageFile = null) {
    let imageUrl = itemData.image_url;

    // Supabase Storage upload if file provided and supabase is ready
    if (imageFile && isSupabaseConfigured && supabase) {
      try {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `gallery/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('gallery')
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      } catch (uploadErr) {
        console.error('Error uploading image to Supabase Storage:', uploadErr);
        // Fallback to placeholder image or raw url
        if (!imageUrl) {
          imageUrl = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80';
        }
      }
    } else if (imageFile && !imageUrl) {
      // Create local object URL for instant preview in demo mode
      imageUrl = URL.createObjectURL(imageFile);
    }

    const galleryId = itemData.id || `gal-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const payload = {
      id: galleryId,
      title: itemData.title?.trim() || 'Trabajo By Sandrit',
      category: itemData.category?.trim() || 'General',
      category_slug: itemData.category_slug || (itemData.category ? itemData.category.toLowerCase().replace(/\s+/g, '-') : 'general'),
      description: itemData.description?.trim() || '',
      image_url: imageUrl || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      is_active: itemData.is_active ?? true,
      order_index: Number(itemData.order_index) || localGallery.length + 1,
      created_at: new Date().toISOString()
    };

    if (!isSupabaseConfigured || !supabase) {
      localGallery.unshift(payload);
      return { data: payload, error: null, isDemo: true };
    }

    try {
      const { data, error } = await supabase
        .from('gallery')
        .insert([payload])
        .select()
        .single();
      if (error) throw error;
      return { data, error: null, isDemo: false };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async updateGalleryItem(id, itemData) {
    if (!isSupabaseConfigured || !supabase) {
      const index = localGallery.findIndex(g => g.id === id);
      if (index !== -1) {
        localGallery[index] = { ...localGallery[index], ...itemData };
        return { data: localGallery[index], error: null, isDemo: true };
      }
      return { data: null, error: new Error('Item no encontrado'), isDemo: true };
    }
    try {
      const { data, error } = await supabase
        .from('gallery')
        .update(itemData)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return { data, error: null, isDemo: false };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async deleteGalleryItem(id) {
    if (!isSupabaseConfigured || !supabase) {
      localGallery = localGallery.filter(g => g.id !== id);
      return { success: true, error: null, isDemo: true };
    }
    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err };
    }
  }
};
