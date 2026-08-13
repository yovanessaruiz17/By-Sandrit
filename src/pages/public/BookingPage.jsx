import React, { useEffect } from 'react';
import { SectionTitle } from '../../components/common/SectionTitle';
import { BookingWizard } from '../../components/booking/BookingWizard';
import { updatePageSEO } from '../../utils/seo';

export function BookingPage() {
  useEffect(() => {
    updatePageSEO({
      title: 'Agendar Cita en Línea | By Sandrit',
      description: 'Elige tu servicio de estética, fecha y hora preferida para agendar tu cita con Sandrit Ríos Molinares en By Sandrit.',
      canonicalPath: '/agendar'
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <SectionTitle
        subtitle="Reserva en Línea"
        title="Agenda Tu Momento de Belleza & Bienestar"
        description="Sigue los sencillos pasos para elegir tu tratamiento, fecha y horario disponible. Te confirmaremos enseguida."
      />

      <BookingWizard />
    </div>
  );
}
