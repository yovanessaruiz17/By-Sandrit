import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { demoAppointments, demoBusinessHours } from './demoData';

let localAppointments = [...demoAppointments];
let localBusinessHours = [...demoBusinessHours];

export const appointmentsService = {
  async getBusinessHours() {
    if (!isSupabaseConfigured || !supabase) {
      return { data: localBusinessHours, error: null, isDemo: true };
    }
    try {
      const { data, error } = await supabase
        .from('business_hours')
        .select('*')
        .order('day_of_week', { ascending: true });

      if (error) throw error;
      return { data: data && data.length > 0 ? data : localBusinessHours, error: null, isDemo: !data || data.length === 0 };
    } catch (err) {
      console.warn('Supabase getBusinessHours fallback:', err.message);
      return { data: localBusinessHours, error: null, isDemo: true };
    }
  },

  async updateBusinessHours(hoursArray) {
    if (!isSupabaseConfigured || !supabase) {
      localBusinessHours = [...hoursArray];
      return { data: localBusinessHours, error: null, isDemo: true };
    }
    try {
      const { data, error } = await supabase
        .from('business_hours')
        .upsert(hoursArray, { onConflict: 'day_of_week' })
        .select();
      if (error) throw error;
      return { data, error: null, isDemo: false };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async getAppointmentsForDate(dateString) {
    if (!isSupabaseConfigured || !supabase) {
      const filtered = localAppointments.filter(
        a => a.appointment_date === dateString && a.status !== 'cancelled'
      );
      return { data: filtered, error: null, isDemo: true };
    }
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*, services(name, duration_minutes, price)')
        .eq('appointment_date', dateString)
        .neq('status', 'cancelled');
      if (error) throw error;
      return { data: data || [], error: null, isDemo: false };
    } catch (err) {
      console.warn('Supabase getAppointmentsForDate fallback:', err.message);
      const filtered = localAppointments.filter(
        a => a.appointment_date === dateString && a.status !== 'cancelled'
      );
      return { data: filtered, error: null, isDemo: true };
    }
  },

  async getAllAppointments({ statusFilter = 'all', dateFilter = '' } = {}) {
    if (!isSupabaseConfigured || !supabase) {
      let filtered = [...localAppointments];
      if (statusFilter && statusFilter !== 'all') {
        filtered = filtered.filter(a => a.status === statusFilter);
      }
      if (dateFilter) {
        filtered = filtered.filter(a => a.appointment_date === dateFilter);
      }
      filtered.sort((a, b) => new Date(`${b.appointment_date}T${b.appointment_time || '00:00'}`) - new Date(`${a.appointment_date}T${a.appointment_time || '00:00'}`));
      return { data: filtered, error: null, isDemo: true };
    }
    try {
      let query = supabase
        .from('appointments')
        .select('*, services(name, duration_minutes, price)')
        .order('appointment_date', { ascending: false })
        .order('appointment_time', { ascending: false });

      if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      if (dateFilter) {
        query = query.eq('appointment_date', dateFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return { data: data || [], error: null, isDemo: false };
    } catch (err) {
      console.warn('Supabase getAllAppointments fallback:', err.message);
      let filtered = [...localAppointments];
      if (statusFilter && statusFilter !== 'all') {
        filtered = filtered.filter(a => a.status === statusFilter);
      }
      return { data: filtered, error: null, isDemo: true };
    }
  },

  async createAppointment(appointmentData) {
    // 1. In-memory check or client guard
    const { appointment_date, appointment_time, service_id, service_duration } = appointmentData;

    if (!isSupabaseConfigured || !supabase) {
      const conflict = localAppointments.find(
        a => a.appointment_date === appointment_date && 
             a.appointment_time === appointment_time && 
             a.status !== 'cancelled'
      );
      if (conflict) {
        return {
          data: null,
          error: new Error('Lo sentimos, este horario acaba de ser reservado. Por favor selecciona otra hora.'),
          isDemo: true
        };
      }

      const newApt = {
        id: `apt-${Date.now()}`,
        ...appointmentData,
        status: 'pending',
        created_at: new Date().toISOString()
      };
      localAppointments.unshift(newApt);
      return { data: newApt, error: null, isDemo: true };
    }

    try {
      // 2. Check for concurrency in Supabase table
      const { data: existing, error: checkError } = await supabase
        .from('appointments')
        .select('id')
        .eq('appointment_date', appointment_date)
        .eq('appointment_time', appointment_time)
        .neq('status', 'cancelled');

      if (checkError) throw checkError;
      if (existing && existing.length > 0) {
        return {
          data: null,
          error: new Error('El horario seleccionado ya no está disponible. Por favor elige otro horario.')
        };
      }

      const { data, error } = await supabase
        .from('appointments')
        .insert([{
          customer_name: appointmentData.customer_name,
          customer_phone: appointmentData.customer_phone,
          customer_email: appointmentData.customer_email || null,
          service_id: service_id,
          service_name: appointmentData.service_name,
          service_price: appointmentData.service_price,
          service_duration: service_duration || 60,
          appointment_date: appointment_date,
          appointment_time: appointment_time,
          notes: appointmentData.notes || '',
          status: 'pending'
        }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null, isDemo: false };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  async updateAppointmentStatus(id, newStatus) {
    if (!isSupabaseConfigured || !supabase) {
      const index = localAppointments.findIndex(a => a.id === id);
      if (index !== -1) {
        localAppointments[index] = { ...localAppointments[index], status: newStatus };
        return { data: localAppointments[index], error: null, isDemo: true };
      }
      return { data: null, error: new Error('Cita no encontrada'), isDemo: true };
    }
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return { data, error: null, isDemo: false };
    } catch (err) {
      return { data: null, error: err };
    }
  }
};
