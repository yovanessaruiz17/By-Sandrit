import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { demoBusinessSettings } from './demoData';

let localSettings = { ...demoBusinessSettings };

export const settingsService = {
  async getSettings() {
    if (!isSupabaseConfigured || !supabase) {
      return { data: localSettings, error: null, isDemo: true };
    }
    try {
      const { data, error } = await supabase
        .from('business_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        return { data: localSettings, error: null, isDemo: true };
      }
      return { data: { ...localSettings, ...data, is_demo_mode: false }, error: null, isDemo: false };
    } catch (err) {
      console.warn('Supabase getSettings fallback:', err.message);
      return { data: localSettings, error: null, isDemo: true };
    }
  },

  async updateSettings(newSettings) {
    if (!isSupabaseConfigured || !supabase) {
      localSettings = { ...localSettings, ...newSettings };
      return { data: localSettings, error: null, isDemo: true };
    }
    try {
      // Fetch the single row id if existing
      const { data: existing } = await supabase
        .from('business_settings')
        .select('id')
        .limit(1)
        .maybeSingle();

      let res;
      if (existing?.id) {
        res = await supabase
          .from('business_settings')
          .update(newSettings)
          .eq('id', existing.id)
          .select()
          .single();
      } else {
        res = await supabase
          .from('business_settings')
          .insert([newSettings])
          .select()
          .single();
      }

      if (res.error) throw res.error;
      localSettings = { ...localSettings, ...res.data };
      return { data: res.data, error: null, isDemo: false };
    } catch (err) {
      return { data: null, error: err };
    }
  }
};
