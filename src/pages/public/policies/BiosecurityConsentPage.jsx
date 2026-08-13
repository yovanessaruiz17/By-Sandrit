import React, { useEffect } from 'react';
import { ShieldCheck, AlertCircle, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { PolicyLayout } from '../../../components/policies/PolicyLayout';
import { updatePageSEO } from '../../../utils/seo';

export function BiosecurityConsentPage() {
  useEffect(() => {
    updatePageSEO({
      title: 'Consentimiento Informado, Bioseguridad y Contraindicaciones',
      description: 'Protocolos de bioseguridad, esterilización de instrumental, declaración de salud y cuidados pre y post procedimiento en By Sandrit.',
      canonicalPath: '/politicas/consentimiento-bioseguridad'
    });
  }, []);

  return (
    <PolicyLayout
      title="Consentimiento Informado & Bioseguridad"
      subtitle="Garantizamos los más rigurosos estándares higiénicos y sanitarios para proteger tu salud cutánea y bienestar integral."
      badgeText="Salud, Higiene & Bioseguridad"
      lastUpdated="13 de Agosto de 2026"
    >
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          1. Protocolos Rigurosos de Bioseguridad e Higiene
        </h2>
        <p>
          En <strong>BY SANDRIT</strong> la seguridad de cada persona es innegociable. Aplicamos protocolos estandarizados de bioseguridad avalados para centros de estética y cosmetología:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-2xl border border-[#EFE5E2] space-y-2">
            <div className="flex items-center gap-2 text-[#8C3F52] font-semibold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Esterilización de Instrumental</span>
            </div>
            <p className="text-xs text-[#685D59] leading-relaxed">
              Todo el instrumental metálico (extractores de comedones, pinzas de cejas, tijeras) pasa por un ciclo completo de lavado enzimático, desinfección de alto nivel y esterilización antes de cada uso.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#EFE5E2] space-y-2">
            <div className="flex items-center gap-2 text-[#8C3F52] font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#C59B4E]" />
              <span>Material Desechable de 1er Uso</span>
            </div>
            <p className="text-xs text-[#685D59] leading-relaxed">
              Los campos de camilla, algodones, gasas, espátulas de cera, guantes de nitrilo, cofias y microcepillos son 100% descartables y desechados de inmediato tras cada paciente.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          2. Declaración de Salud y Contraindicaciones Médicas
        </h2>
        <p>
          Antes de iniciar cualquier tratamiento facial o corporal, la clienta debe manifestar con total sinceridad si presenta alguna de las siguientes condiciones:
        </p>

        <div className="p-5 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs sm:text-sm text-amber-900 space-y-3">
          <div className="flex items-center gap-2 font-semibold text-amber-950">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>Condiciones que deben declararse con anterioridad:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-amber-900">
            <li><strong>Embarazo o periodo de lactancia:</strong> Restringe el uso de ciertos ácidos exfoliantes, aparatos de electroterapia y masajes de presión profunda.</li>
            <li><strong>Tratamiento con Isotretinoína (Roaccutan) / Retinoides orales o tópicos:</strong> Sensibiliza drásticamente la piel; se contraindica la depilación con cera y extracciones profundas hasta 6 meses posteriores a suspender el fármaco.</li>
            <li><strong>Portador de Marcapasos o implantes metálicos:</strong> Contraindica el uso de alta frecuencia y aparatología eléctrica.</li>
            <li><strong>Herpes simple activo, dermatitis severa, rosácea inflamada o heridas abiertas:</strong> No se realizarán procedimientos invasivos sobre zonas con infección activa.</li>
            <li><strong>Alergias conocidas al látex, aspirina/ácido salicílico, esencias o tintes:</strong> Para sustituir productos por fórmulas hipoalergénicas alternativas.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          3. Cuidados Pre y Post Procedimiento
        </h2>
        <div className="space-y-3">
          <div className="p-4 bg-[#FAF7F5] rounded-2xl border border-[#E8DCD9] space-y-2">
            <h4 className="font-semibold text-xs text-[#2C2422] uppercase tracking-wider">
              Antes de tu cita (Pre-tratamiento):
            </h4>
            <ul className="list-disc pl-5 text-xs text-[#685D59] space-y-1">
              <li>Evitar la exposición solar intensa o cámaras de bronceo durante las 48 horas previas.</li>
              <li>No aplicarse exfoliantes granulados caseros ni ácidos fuertes la noche anterior.</li>
              <li>Asistir preferiblemente sin maquillaje pesado si te realizarás un tratamiento facial o cejas/pestañas.</li>
            </ul>
          </div>

          <div className="p-4 bg-[#FAF2F3] rounded-2xl border border-[#F2D7D9] space-y-2">
            <h4 className="font-semibold text-xs text-[#8C3F52] uppercase tracking-wider">
              Después de tu cita (Post-tratamiento):
            </h4>
            <ul className="list-disc pl-5 text-xs text-[#6E2B3C] space-y-1">
              <li><strong>Protección Solar Estricta:</strong> Aplicar protector solar FPS 50+ cada 3 a 4 horas de manera obligatoria para evitar manchas post-inflamatorias.</li>
              <li><strong>Evitar calor y sudor:</strong> No ingresar a saunas, turcos, piscinas con cloro ni realizar ejercicio intenso durante las 24 a 48 horas posteriores a una limpieza profunda o depilación.</li>
              <li><strong>No tocarse el rostro con manos sucias:</strong> Mantener una higiene óptima de fundas de almohada y toallas faciales.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-[#2C2422] border-b border-[#F2E8E5] pb-2">
          4. Consentimiento y Expectativas Realistas de Resultados
        </h2>
        <p>
          Los procedimientos cosméticos y estéticos son de medio y no de resultado médico absoluto. La respuesta biológica de la piel varía según factores individuales (edad, genética, hidratación, alimentación, rutina domiciliaria y hábitos de vida).
        </p>
        <p>
          Al solicitar y recibir un tratamiento en BY SANDRIT, la clienta declara haber sido informada de manera clara sobre el procedimiento, beneficios esperados, posibles sensaciones transitorias (enrojecimiento o eritema pasajero post-extracción) y se compromete a seguir rigurosamente las pautas de cuidado en casa.
        </p>
      </section>
    </PolicyLayout>
  );
}
