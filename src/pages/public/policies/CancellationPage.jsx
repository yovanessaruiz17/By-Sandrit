import React, { useEffect } from 'react';
import { PolicyLayout } from '../../../components/policies/PolicyLayout';
import { updatePageSEO } from '../../../utils/seo';

export function CancellationPage() {
  useEffect(() => {
    updatePageSEO({
      title: 'Política de Cancelaciones, Reagendamiento e Inasistencias',
      description: 'Conoce los plazos y condiciones para cancelar o reprogramar tu cita de estética en By Sandrit sin contratiempos.',
      canonicalPath: '/politicas/cancelaciones'
    });
  }, []);

  return (
    <PolicyLayout
      title="Política de Cancelaciones y Reagendamiento"
      subtitle="Buscamos brindarte la máxima flexibilidad y a la vez proteger el tiempo dedicado a cada clienta."
      badgeText="Gestión de Citas & Cancelaciones"
      lastUpdated="13 de Agosto de 2026"
    >
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          1. Importancia del Tiempo en la Atención Personalizada
        </h2>
        <p>
          En <strong>BY SANDRIT</strong> cada cita representa un bloque de tiempo exclusivo reservado únicamente para ti. Por ello, la preparación previa de los equipos, esterilización de instrumental y preparación de cabina se realiza con antelación.
        </p>
        <p>
          Entendemos que pueden surgir imprevistos cotidianos, por lo que hemos diseñado una política justa y transparente para la reprogramación y cancelación de citas.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          2. Plazos para Cancelar o Reprogramar
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-[#FAF2F3] rounded-2xl border border-[#F2D7D9] space-y-2">
            <h3 className="font-display font-semibold text-[#8C3F52] text-sm">
              ✅ Con más de 24 horas de antelación
            </h3>
            <p className="text-xs text-[#6E2B3C] leading-relaxed">
              Puedes reprogramar tu cita sin ninguna penalidad ni costo adicional. Coordinaremos una nueva fecha y horario según disponibilidad de agenda.
            </p>
          </div>

          <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
            <h3 className="font-display font-semibold text-amber-900 text-sm">
              ⚠️ Con menos de 24 horas de antelación
            </h3>
            <p className="text-xs text-amber-800 leading-relaxed">
              Te solicitamos comunicarlo a la brevedad posible vía WhatsApp para intentar reasignar el espacio a otra clienta en lista de espera.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          3. Política de Inasistencias (No-Show)
        </h2>
        <p>
          Se considera <em>"Inasistencia o No-Show"</em> cuando una clienta no se presenta a su cita pactada y no emite notificación previa por los canales oficiales (WhatsApp o llamada).
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Primera Inasistencia sin aviso:</strong> Nos comunicaremos contigo para verificar si tuviste alguna emergencia y coordinar un nuevo intento.
          </li>
          <li>
            <strong>Inasistencias Reiteradas:</strong> En caso de acumular dos (2) o más inasistencias sin previo aviso, para futuras reservas se solicitará un abono previo no reembolsable del 50% del valor del servicio para apartar el cupo en agenda.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          4. Abonos para Servicios Especiales o Grupales
        </h2>
        <p>
          Para servicios que demandan bloqueo prolongado de cabina o desplazamiento especial:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Paquetes de Spa para Niñas / Cumpleaños:</strong> Se requiere un anticipo del 30% al momento de apartar la fecha. Este abono garantiza la reserva de materiales e insumos dedicados.</li>
          <li><strong>Maquillaje Social para Novias / Quinceañeras / Eventos:</strong> Se solicita un abono para apartar fecha y hora exclusiva. Si se cancela con al menos 7 días de antelación, el abono se reembolsa íntegramente o queda como saldo a favor para otros tratamientos.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          5. Excepciones por Fuerza Mayor o Motivos de Salud
        </h2>
        <p>
          Reconocemos que las emergencias médicas y situaciones de fuerza mayor no pueden planificarse. Si presentas síntomas gripales, fiebre, afecciones agudas en la piel o una urgencia de salud, te solicitamos reprogramar de inmediato: no se aplicará ninguna penalidad por motivos de salud y cuidaremos tanto de ti como de nuestro equipo.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          6. ¿Cómo Notificar un Cambio o Cancelación?
        </h2>
        <p>
          El único canal oficial para solicitar cambios o cancelaciones es nuestro WhatsApp directo:
        </p>
        <div className="p-4 bg-[#FAF7F5] rounded-2xl border border-[#E8DCD9] text-xs sm:text-sm text-[#5C504C] space-y-1">
          <p><strong>WhatsApp de Atención:</strong> +57 312 765 4780</p>
          <p><strong>Mensaje recomendado:</strong> <em>"Hola Sandrit, deseo reprogramar mi cita de [Nombre de Servicio] del día [Fecha y Hora] a nombre de [Tu Nombre]."</em></p>
        </div>
      </section>
    </PolicyLayout>
  );
}
