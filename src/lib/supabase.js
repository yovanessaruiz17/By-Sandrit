import { createClient } from '@supabase/supabase-js';

const getCleanUrl = () => {
  let url = import.meta.env.VITE_SUPABASE_URL || '';
  if (typeof url !== 'string') return '';
  url = url.trim().replace(/^["']|["']$/g, ''); // strip accidental quotes

  if (!url) return '';

  // If user pasted dashboard URL like https://supabase.com/dashboard/project/<ref>
  if (url.includes('supabase.com/dashboard/project/')) {
    const match = url.match(/project\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://${match[1]}.supabase.co`;
    }
  }

  // Strip trailing subpaths like /rest/v1, /auth/v1, /auth, etc.
  url = url.replace(/\/(rest|auth)(\/v\d+)?.*$/i, '');
  // Strip any trailing slashes
  url = url.replace(/\/+$/, '');

  // Ensure protocol
  if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }

  return url;
};

const getCleanKey = () => {
  let key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  if (typeof key !== 'string') return '';
  return key.trim().replace(/^["']|["']$/g, '');
};

const supabaseUrl = getCleanUrl();
const supabaseAnonKey = getCleanKey();

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' && 
  !supabaseUrl.includes('placeholder')
);

// Graceful client creation so app won't crash when env variables are unset
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      }
    })
  : null;

