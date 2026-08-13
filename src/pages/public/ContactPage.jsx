import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  Instagram,
  Phone,
  MapPin,
  Clock,
  Send,
  Sparkles,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { SectionTitle } from '../../components/common/SectionTitle';
import { Button } from '../../components/common/Button';
import { useBusiness } from '../../context/BusinessContext';
import { generateWhatsAppUrl } from '../../utils/whatsapp';
import { updatePageSEO } from '../../utils/seo';

export function ContactPage() {
  const { settings } = useBusiness();
  const phone = settings?.whatsapp || '3127654780';
  const instagram = settings?.instagram || 'by_sandrit';

  const [form, setForm] = useState({
    name: '',
    phone: '',
    serviceInterest: 'Higiene Facial',
    message: ''
  });

  useEffect(() => {
    updatePageSEO({
      title: 'Contacto & Ubicación',
      description: 'Ponte en contacto directo con Sandrit Ríos Molinares por WhatsApp o Instagram para agendar tu cita y resolver dudas.',
      canonicalPath: '/contacto'
    });
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    let text = `Hola Sandrit 💕, te escribo desde la página web.\n\n`;
    text += `👤 *Nombre:* ${form.name || 'Cliente'}\n`;
    if (form.phone) text += `📱 *Teléfono:* ${form.phone}\n`;
    text += `✨ *Interés:* ${form.serviceInterest}\n`;
    if (form.message) text += `💬 *Mensaje:* ${form.message}\n`;

    const waUrl = generateWhatsAppUrl({ phone, message: text });
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      <SectionTitle
        subtitle="Hablemos"
        title="Contacto & Ubicación"
        description="Estamos a tu disposición para resolver dudas, orientarte sobre tratamientos o confirmar tu próxima sesión."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Info & Socials */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE5E2] shadow-xs space-y-6">
            <h3 className="font-display text-xl text-[#2C2422] font-semibold border-b border-[#F2D7D9] pb-4">
              Canales de Atención Directa
            </h3>

            <div className="space-y-4 text-sm">
              <a
                href={generateWhatsAppUrl({ phone, message: 'Hola Sandrit 💕, quiero consultar disponibilidad.' })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F5] hover:bg-[#FAF2F3] border border-[#E8DCD9] transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8A7974] font-semibold block">
                    WhatsApp Directo
                  </span>
                  <p className="font-semibold text-[#2C2422] group-hover:text-[#8C3F52] transition-colors">
                    {phone}
                  </p>
                  <span className="text-xs text-[#25D366] font-medium">Clic para chatear</span>
                </div>
              </a>

              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F5] hover:bg-[#FAF2F3] border border-[#E8DCD9] transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#E1306C]/15 text-[#E1306C] flex items-center justify-center shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8A7974] font-semibold block">
                    Instagram
                  </span>
                  <p className="font-semibold text-[#2C2422] group-hover:text-[#8C3F52] transition-colors">
                    @{instagram}
                  </p>
                  <span className="text-xs text-[#E1306C] font-medium">Síguenos y conoce novedades</span>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F5] border border-[#E8DCD9]">
                <div className="w-10 h-10 rounded-full bg-[#FAF2F3] text-[#8C3F52] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8A7974] font-semibold block">
                    Ubicación
                  </span>
                  <p className="font-medium text-[#2C2422]">
                    {settings?.address || 'Ubicación disponible al agendar'}
                  </p>
                  <span className="text-xs text-[#736662]">Atención privada con cita previa</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF7F5] border border-[#E8DCD9]">
                <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#C59B4E] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8A7974] font-semibold block">
                    Horario de Citas
                  </span>
                  <p className="font-medium text-[#2C2422]">
                    {settings?.hours_text || 'Lunes a Sábado: 8:00 AM - 6:00 PM'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive WhatsApp generator form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE5E2] shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3F52]">
                Escríbenos Directamente
              </span>
              <h3 className="font-display text-2xl text-[#2C2422] font-semibold mt-1">
                Envía un mensaje a Sandrit
              </h3>
              <p className="text-xs sm:text-sm text-[#736662] mt-1">
                Completa tus datos y se abrirá WhatsApp con tu mensaje listo para enviar.
              </p>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                  Tu nombre *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. María Elena"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                  Tu número de teléfono
                </label>
                <input
                  type="tel"
                  placeholder="Ej. 312 765 4780"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                  Servicio de interés
                </label>
                <select
                  value={form.serviceInterest}
                  onChange={(e) => setForm({ ...form, serviceInterest: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20 text-[#2C2422]"
                >
                  <option value="Higiene Facial">Higiene Facial (Básica / Profunda / Luxury)</option>
                  <option value="Masajes Relajantes">Masajes Relajantes & Drenaje</option>
                  <option value="Depilación con Cera">Depilación con Cera</option>
                  <option value="Cejas y Pestañas">Diseño de Cejas / Lifting de Pestañas</option>
                  <option value="Cabello y Peinados">Peinados, Trenzas y Ondas</option>
                  <option value="Maquillaje Social">Maquillaje Social & Eventos</option>
                  <option value="Manicure y Pedicure">Manicure & Pedicure</option>
                  <option value="Spa para Niñas">Spa para Niñas</option>
                  <option value="Consulta General">Otra consulta general</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                  Mensaje o consulta
                </label>
                <textarea
                  rows="4"
                  placeholder="¿Tienes alguna pregunta sobre fechas o tratamientos?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
                ></textarea>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={Send}
                  className="w-full"
                >
                  Abrir WhatsApp con este mensaje
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
