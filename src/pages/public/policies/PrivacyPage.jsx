import React, { useEffect } from 'react';
import { PolicyLayout } from '../../../components/policies/PolicyLayout';
import { updatePageSEO } from '../../../utils/seo';

export function PrivacyPage() {
  useEffect(() => {
    updatePageSEO({
      title: 'Política de Privacidad y Tratamiento de Datos Personales (Habeas Data)',
      description: 'Conoce cómo BY SANDRIT y Sandrit Ríos Molinares recolectan, protegen y custodian tus datos de contacto y fichas técnicas estéticas.',
      canonicalPath: '/politicas/privacidad'
    });
  }, []);

  return (
    <PolicyLayout
      title="Política de Privacidad y Tratamiento de Datos"
      subtitle="Cumplimiento de la Ley de Protección de Datos Personales (Habeas Data). Conoce cómo cuidamos tu información personal y clínica-estética."
      badgeText="Protección de Datos & Privacidad"
      lastUpdated="13 de Agosto de 2026"
    >
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          1. Responsable del Tratamiento de Datos
        </h2>
        <p>
          En cumplimiento de la legislación aplicable en materia de protección de datos personales (Ley 1581 de 2012 y normativas concordantes), te informamos que el responsable del tratamiento de los datos personales suministrados a través de este sitio web y de manera presencial es:
        </p>
        <div className="bg-[#FAF7F5] p-4 rounded-2xl border border-[#E8DCD9] text-xs sm:text-sm text-[#5C504C] space-y-1">
          <p><strong>Razón Comercial:</strong> BY SANDRIT — Servicios Estéticos & Cosméticos</p>
          <p><strong>Titular Responsable:</strong> Sandrit Ríos Molinares</p>
          <p><strong>Canal de Atención WhatsApp:</strong> +57 312 765 4780</p>
          <p><strong>Redes Sociales Oficiales:</strong> Instagram @by_sandrit</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          2. Datos Personales Recopilados
        </h2>
        <p>
          Recopilamos únicamente los datos pertinentes y estrictamente necesarios para prestar nuestros servicios de belleza y bienestar con calidad y seguridad:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Datos de Identificación y Contacto:</strong> Nombre y apellidos, número de teléfono móvil / WhatsApp y dirección de correo electrónico opcional.
          </li>
          <li>
            <strong>Datos Sensibles y de Ficha Técnica Estética:</strong> Tipo de piel (seca, grasa, mixta, sensible), historial de alergias a productos cosméticos o ceras, antecedentes de tratamientos dermatológicos activos (como peelings médicos o retinoides) y observaciones particulares suministradas por la clienta voluntariamente para personalizar el procedimiento.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          3. Finalidad del Tratamiento
        </h2>
        <p>
          Los datos personales recolectados serán utilizados exclusivamente para los siguientes fines:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Gestionar, agendar y confirmar citas de estética y cosmetología solicitadas a través de la web o WhatsApp.</li>
          <li>Llevar el registro y seguimiento de la ficha cosmética para adaptar los productos adecuados según el tipo de piel y necesidades individuales de cada clienta.</li>
          <li>Remitir recordatorios de cita, recomendaciones pre y post tratamiento y avisos sobre cambios de horario.</li>
          <li>Enviar promociones exclusivas, felicitaciones de cumpleaños o novedades del centro solo si la clienta lo ha autorizado previamente.</li>
          <li>Atender quejas, reclamos o sugerencias presentadas por las clientas.</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          4. Confidencialidad y Seguridad de la Información
        </h2>
        <p>
          <strong>BY SANDRIT</strong> implementa medidas técnicas, humanas y administrativas necesarias para garantizar la seguridad de los datos personales, evitando su adulteración, pérdida, consulta, uso o acceso no autorizado.
        </p>
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-emerald-900">
          <p className="font-semibold">🔒 Compromiso de No Transferencia:</p>
          <p className="mt-1">
            Bajo ninguna circunstancia vendemos, alquilamos ni transferimos tus datos personales a empresas de publicidad, terceros o entidades ajenas a la prestación directa de nuestros servicios.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          5. Derechos de las Titulares de los Datos (Habeas Data)
        </h2>
        <p>
          Como titular de los datos personales, tienes derecho en cualquier momento a:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Conocer:</strong> Consultar qué datos tuyos reposan en nuestras bases de datos.</li>
          <li><strong>Actualizar y Rectificar:</strong> Corregir información desactualizada, incompleta o errónea.</li>
          <li><strong>Suprimir:</strong> Solicitar la eliminación total de tus datos cuando ya no requieras nuestros servicios o consideres que no se están respetando los principios legales.</li>
          <li><strong>Revocar Autorización:</strong> Retirar el consentimiento otorgado para el envío de comunicaciones promocionales.</li>
        </ul>
        <p>
          Para ejercer cualquiera de estos derechos, simplemente envía una solicitud escrita vía WhatsApp al <strong>+57 312 765 4780</strong> indicando tu nombre completo y la solicitud correspondiente.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          6. Uso de Cookies y Navegación Web
        </h2>
        <p>
          Este sitio web utiliza cookies técnicas básicas y almacenamiento local estrictamente necesario para el correcto funcionamiento de la interfaz y la navegación fluida de las clientas. No empleamos cookies invasivas de rastreo de terceros.
        </p>
      </section>
    </PolicyLayout>
  );
}
