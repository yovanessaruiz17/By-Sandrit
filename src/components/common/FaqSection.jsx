import React, { useState } from 'react';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

export const DEFAULT_AESTHETIC_FAQS = [
  {
    question: '¿Qué servicios estéticos y cosméticos ofrece By Sandrit?',
    answer: 'Ofrecemos una amplia gama de tratamientos profesionales realizados directamente por Sandrit Ríos Molinares: higiene facial básica y profunda con alta frecuencia, tratamiento antiacné, masajes relajantes y descontracturantes, drenaje linfático manual, depilación con cera hipoalergénica, diseño y pigmentación de cejas, lifting de pestañas con nutrición, maquillaje profesional para eventos, peinados/trenzas, manicure/pedicure y experiencias mágicas de spa para niñas.'
  },
  {
    question: '¿Cada cuánto tiempo se recomienda realizarse una higiene facial profunda?',
    answer: 'Para pieles normales a mixtas se recomienda cada 28 a 30 días, coincidiendo con el ciclo natural de renovación celular epidérmica. Para pieles con tendencia acnéica, comedogénica o con exceso de sebo, puede recomendarse una sesión cada 15 a 21 días al inicio para descongestionar y equilibrar el manto hidrolipídico.'
  },
  {
    question: '¿Cómo funciona el agendamiento y qué medios de pago aceptan?',
    answer: 'Puedes solicitar tu cita en línea a través de nuestro asistente en https://bysandrit.com/agendar seleccionando el tratamiento, fecha y hora, o escribirnos directamente a nuestro WhatsApp oficial +57 312 765 4780. Aceptamos efectivo, transferencias bancarias, Nequi y Daviplata. El pago se realiza al finalizar la sesión (salvo abonos específicos para eventos o spa de niñas).'
  },
  {
    question: '¿Qué protocolos de bioseguridad e higiene aplican en las sesiones?',
    answer: 'En By Sandrit la seguridad es primordial. Todo el instrumental metálico pasa por lavado enzimático, desinfección química de alto nivel y esterilización. Los insumos como guantes de nitrilo, sábanas de camilla, algodones, gasas, espátulas de cera y microcepillos son 100% descartables y desechados tras cada uso.'
  },
  {
    question: '¿En qué consiste el Spa Consentidor para Niñas?',
    answer: 'Es una experiencia lúdica, dulce y segura diseñada para celebrar cumpleaños o fechas especiales. Incluye mascarillas faciales suaves formuladas con ingredientes naturales no irritantes (frutas, yogurt), mini manicure con esmaltes al agua, aromaterapia suave, batas de spa y peinados infantiles con accesorios.'
  },
  {
    question: '¿Cuánto dura el efecto de un lifting de pestañas y cómo debo cuidarlo?',
    answer: 'El lifting de pestañas naturales con queratina tiene una duración promedio de 4 a 6 semanas, dependiendo del ciclo de crecimiento de tus pestañas. Durante las primeras 24 horas posteriores al tratamiento no debes mojarlas, aplicarles vapor, saunas ni rímel para permitir que la curvatura se fije correctamente.'
  }
];

export function FaqSection({
  title = 'Preguntas Frecuentes',
  subtitle = 'Resuelve Tus Dudas',
  description = 'Respuestas claras y detalladas sobre nuestros procedimientos, cuidados de la piel y proceso de reserva.',
  faqs = DEFAULT_AESTHETIC_FAQS,
  className = ''
}) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className={`max-w-4xl mx-auto px-4 sm:px-6 ${className}`}>
      <SectionTitle
        subtitle={subtitle}
        title={title}
        description={description}
      />

      <div className="space-y-4 pt-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white border-[#8C3F52]/40 shadow-sm ring-1 ring-[#8C3F52]/10'
                  : 'bg-white/80 border-[#EFE5E2] hover:border-[#D4B8B1]'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
                    isOpen ? 'bg-[#8C3F52] text-white' : 'bg-[#FAF2F3] text-[#8C3F52]'
                  }`}>
                    {index + 1}
                  </div>
                  <h3 className="font-display font-medium text-base sm:text-lg text-[#2C2422]">
                    {faq.question}
                  </h3>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 bg-[#FAF2F3] text-[#8C3F52]' : 'text-[#8A7974]'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#685D59] leading-relaxed border-t border-[#F7ECE9] font-light animate-fade-in pl-14 sm:pl-16">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
