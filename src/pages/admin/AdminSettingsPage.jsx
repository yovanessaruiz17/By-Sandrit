import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Settings,
  Save,
  CheckCircle2,
  AlertCircle,
  Building,
  Clock,
  BookOpen,
  Share2,
  Phone
} from 'lucide-react';
import { AdminHeader } from '../../components/layout/AdminHeader';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useBusiness } from '../../context/BusinessContext';
import { settingsService } from '../../services/settings.service';
import { updatePageSEO } from '../../utils/seo';

export function AdminSettingsPage() {
  const { setSidebarOpen } = useOutletContext();
  const { settings, refreshSettings, isDemo } = useBusiness();

  const [formData, setFormData] = useState({
    business_name: '',
    stylist_name: '',
    tagline: '',
    hero_title: '',
    hero_subtitle: '',
    phone: '',
    whatsapp: '',
    instagram: '',
    email: '',
    address: '',
    hours_text: '',
    about_story: '',
    about_mission: '',
    about_vision: ''
  });

  const [businessHours, setBusinessHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  useEffect(() => {
    updatePageSEO({ title: 'Configuración General' });
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [setRes, hrsRes] = await Promise.all([
        settingsService.getSettings(),
        settingsService.getBusinessHours()
      ]);

      if (setRes.data) {
        setFormData(setRes.data);
      }
      if (hrsRes.data) {
        setBusinessHours(hrsRes.data);
      }
    } catch (err) {
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleHourChange = (dayIndex, field, val) => {
    setBusinessHours(prev => {
      const updated = [...prev];
      const foundIdx = updated.findIndex(h => h.day_of_week === dayIndex);
      if (foundIdx !== -1) {
        updated[foundIdx] = { ...updated[foundIdx], [field]: val };
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await settingsService.updateSettings(formData);
      if (res.error) {
        setErrorMsg('Error al guardar la configuración: ' + res.error.message);
      } else {
        await refreshSettings();
        setSuccessMsg('Configuración guardada correctamente.');
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err) {
      setErrorMsg('Ocurrió un error inesperado.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Cargando configuración..." fullScreen />;
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        onMenuClick={() => setSidebarOpen(true)}
        title="Configuración General"
        subtitle="Administra los datos de contacto, horarios y textos de tu negocio"
      />

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-medium shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-medium shadow-xs">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECCIÓN 1: IDENTIDAD & CONTACTO */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE5E2] shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#F2D7D9] pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FAF2F3] text-[#8C3F52] flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg text-[#2C2422] font-semibold">
                Información del Negocio & Contacto
              </h3>
              <p className="text-xs text-[#736662]">Datos visibles en la cabecera, pie de página y botones</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                Nombre del Negocio
              </label>
              <input
                type="text"
                value={formData.business_name || ''}
                onChange={(e) => handleChange('business_name', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                Nombre de la Especialista
              </label>
              <input
                type="text"
                value={formData.stylist_name || ''}
                onChange={(e) => handleChange('stylist_name', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                Eslogan / Tagline
              </label>
              <input
                type="text"
                value={formData.tagline || ''}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                WhatsApp Directo (Para reservas)
              </label>
              <input
                type="text"
                value={formData.whatsapp || ''}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                Usuario de Instagram (sin @)
              </label>
              <input
                type="text"
                value={formData.instagram || ''}
                onChange={(e) => handleChange('instagram', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                Texto de Horario (Visible al público)
              </label>
              <input
                type="text"
                value={formData.hours_text || ''}
                onChange={(e) => handleChange('hours_text', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                Ubicación / Dirección
              </label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
              />
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: TEXTOS DEL HERO INICIO */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE5E2] shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#F2D7D9] pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#C59B4E] flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg text-[#2C2422] font-semibold">
                Textos de la Portada (Inicio)
              </h3>
              <p className="text-xs text-[#736662]">Personaliza el titular de bienvenida</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                Título Principal (H1)
              </label>
              <input
                type="text"
                value={formData.hero_title || ''}
                onChange={(e) => handleChange('hero_title', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20 font-display"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                Subtítulo Descriptivo
              </label>
              <textarea
                rows="2"
                value={formData.hero_subtitle || ''}
                onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20 font-light"
              ></textarea>
            </div>
          </div>
        </div>

        {/* SECCIÓN 3: QUIÉNES SOMOS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE5E2] shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#F2D7D9] pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FAF2F3] text-[#8C3F52] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg text-[#2C2422] font-semibold">
                Historia, Misión y Visión
              </h3>
              <p className="text-xs text-[#736662]">Textos presentados en la página "Quiénes Somos"</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                Historia / Esencia
              </label>
              <textarea
                rows="3"
                value={formData.about_story || ''}
                onChange={(e) => handleChange('about_story', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                  Misión
                </label>
                <textarea
                  rows="3"
                  value={formData.about_mission || ''}
                  onChange={(e) => handleChange('about_mission', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                  Visión
                </label>
                <textarea
                  rows="3"
                  value={formData.about_vision || ''}
                  onChange={(e) => handleChange('about_vision', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN 4: HORARIOS DE ATENCIÓN */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE5E2] shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#F2D7D9] pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F5] text-[#8C3F52] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg text-[#2C2422] font-semibold">
                Configuración de Horario Semanal
              </h3>
              <p className="text-xs text-[#736662]">Determina las franjas horarias habilitadas en el agendador de citas</p>
            </div>
          </div>

          <div className="divide-y divide-[#F5ECE9]">
            {[1, 2, 3, 4, 5, 6, 0].map((dayIdx) => {
              const schedule = businessHours.find(h => h.day_of_week === dayIdx) || {
                day_of_week: dayIdx,
                is_closed: dayIdx === 0,
                open_time: '08:00',
                close_time: '18:00'
              };

              return (
                <div key={dayIdx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="w-32">
                    <span className="font-medium text-sm text-[#2C2422]">{dayNames[dayIdx]}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1.5 text-xs text-[#5C504C] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={schedule.is_closed}
                        onChange={(e) => handleHourChange(dayIdx, 'is_closed', e.target.checked)}
                        className="w-4 h-4 text-[#8C3F52] rounded border-[#D4B8B1] focus:ring-[#8C3F52]"
                      />
                      <span>Cerrado / Descanso</span>
                    </label>

                    {!schedule.is_closed && (
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={schedule.open_time}
                          onChange={(e) => handleHourChange(dayIdx, 'open_time', e.target.value)}
                          className="px-2.5 py-1.5 bg-[#FAF7F5] border border-[#D4B8B1] rounded-lg text-xs"
                        />
                        <span className="text-xs text-[#8A7974]">a</span>
                        <input
                          type="time"
                          value={schedule.close_time}
                          onChange={(e) => handleHourChange(dayIdx, 'close_time', e.target.value)}
                          className="px-2.5 py-1.5 bg-[#FAF7F5] border border-[#D4B8B1] rounded-lg text-xs"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Floating/Sticky Bar */}
        <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#EFE5E2] shadow-xl flex items-center justify-between">
          <span className="text-xs text-[#736662]">
            {isDemo ? 'Nota: En modo demo, los cambios se guardan localmente en tu sesión.' : 'Los cambios se reflejarán inmediatamente en la web.'}
          </span>

          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={Save}
            isLoading={saving}
          >
            Guardar Configuración
          </Button>
        </div>
      </form>
    </div>
  );
}
