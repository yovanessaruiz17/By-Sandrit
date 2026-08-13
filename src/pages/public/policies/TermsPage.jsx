import React, { useEffect } from 'react';
import { PolicyLayout } from '../../../components/policies/PolicyLayout';
import { updatePageSEO } from '../../../utils/seo';

export function TermsPage() {
  useEffect(() => {
    updatePageSEO({
      title: 'Términos y Condiciones de Servicio y Citas',
      description: 'Condiciones de uso, reservas, formas de pago, puntualidad y garantías de servicios estéticos en By Sandrit por Sandrit Ríos Molinares.',
      canonicalPath: '/politicas/terminos'
    });
  }, []);

  return (
    <PolicyLayout
      title="Términos y Condiciones de Servicio"
      subtitle="Reglas aplicables al agendamiento de citas, uso del sitio web y prestación de servicios estéticos y cosméticos en BY SANDRIT."
      badgeText="Términos de Servicio"
      lastUpdated="13 de Agosto de 2026"
    >
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          1. Identificación del Prestador del Servicio
        </h2>
        <p>
          El presente sitio web y los servicios ofrecidos bajo la marca comercial <strong>BY SANDRIT</strong> son gestionados directamente por <strong>Sandrit Ríos Molinares</strong>, profesional especializada en servicios estéticos, cosméticos y bienestar integral (en adelante, "la Especialista" o "BY SANDRIT").
        </p>
        <p>
          Al navegar en este sitio web, solicitar información o agendar una cita para cualquiera de nuestros tratamientos (faciales, masajes, depilación, pestañas, cejas, maquillaje, cabello o spa para niñas), el usuario y/o clienta acepta de manera plena y sin reservas los presentes Términos y Condiciones.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          2. Proceso de Agendamiento y Confirmación de Citas
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Solicitud Online:</strong> La selección de servicios, fecha y hora a través del asistente de reservas web constituye una solicitud de reserva sujeta a validación final de disponibilidad.
          </li>
          <li>
            <strong>Confirmación Vía WhatsApp:</strong> La reserva quedará formalmente confirmada una vez que la Especialista o el equipo de atención al cliente se comunique con la clienta a través de WhatsApp o llamada telefónica para verificar los detalles y remitir las indicaciones previas correspondientes.
          </li>
          <li>
            <strong>Veracidad de los Datos:</strong> La clienta es responsable de proporcionar información de contacto verídica, exacta y actualizada (nombre completo, teléfono/WhatsApp y correo electrónico).
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          3. Política de Puntualidad y Tolerancia
        </h2>
        <p>
          Para garantizar una experiencia relajante y no comprometer los tiempos de las citas posteriores de otras clientas:
        </p>
        <div className="p-4 bg-[#FAF2F3] rounded-2xl border border-[#F2D7D9] space-y-2 text-xs sm:text-sm text-[#6E2B3C]">
          <p className="font-semibold">⏱️ Tiempo de tolerancia:</p>
          <p>
            Se otorga un tiempo máximo de tolerancia de <strong>10 a 15 minutos</strong> a partir de la hora pactada. En caso de llegar con posterioridad, la Especialista podrá:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Adaptar el tratamiento reduciendo el tiempo de sesión sin que esto implique reducción de la tarifa establecida.</li>
            <li>Reagendar la cita para otra fecha según disponibilidad, a fin de no afectar la agenda programada.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          4. Tarifas, Precios y Medios de Pago
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Transparencia de Precios:</strong> Todos los precios exhibidos en la plataforma web corresponden a valores en Pesos Colombianos (COP) e incluyen los insumos y productos profesionales empleados durante la sesión.
          </li>
          <li>
            <strong>Medios de Pago Aceptados:</strong> Aceptamos pagos en efectivo, transferencias electrónicas bancarias, Nequi y Daviplata. El pago se efectúa al finalizar el servicio o mediante abono previo en los casos que expresamente se requiera (servicios a domicilio, novias o paquetes grupales de spa).
          </li>
          <li>
            <strong>Modificaciones de Tarifas:</strong> BY SANDRIT se reserva el derecho de actualizar sus listas de precios. No obstante, las citas confirmadas con anterioridad mantendrán el precio cotizado y acordado al momento de la reserva.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          5. Condiciones de Salud y Derecho de Admisión
        </h2>
        <p>
          Por razones de estricta bioseguridad y protección a la salud:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            La clienta debe declarar cualquier patología preexistente, alergias conocidas a cosméticos, embarazo, cirugías recientes, heridas abiertas en la zona a tratar o uso de medicamentos fotosensibilizantes (como isotretinoína/retinol).
          </li>
          <li>
            La Especialista se reserva el derecho de posponer o no realizar un procedimiento si al momento de la valoración visual presencial se identifican lesiones dérmicas contagiosas (como herpes activo o micosis) que impidan la ejecución segura del tratamiento.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          6. Servicios para Menores de Edad (Spa para Niñas)
        </h2>
        <p>
          Para el servicio de <strong>Spa Consentidor para Niñas</strong>, se requiere el consentimiento expreso y la presencia o autorización formal de la madre, padre o tutor legal durante la realización de la sesión. Todos los productos empleados en niñas son fórmulas hipoalergénicas, libres de tóxicos y formuladas para pieles infantiles sensibles.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          7. Propiedad Intelectual
        </h2>
        <p>
          Los textos, logotipos, imágenes fotográficas de trabajos realizados, marcas y contenidos de este sitio web son propiedad exclusiva de BY SANDRIT y Sandrit Ríos Molinares. Queda prohibida su reproducción o distribución con fines comerciales sin autorización previa por escrito.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          8. Canales de Atención y Contacto
        </h2>
        <p>
          Para cualquier consulta, aclaración o sugerencia sobre estos términos, puedes comunicarte por WhatsApp al <strong>+57 312 765 4780</strong> o vía Instagram en <strong>@by_sandrit</strong>.
        </p>
      </section>
    </PolicyLayout>
  );
}
