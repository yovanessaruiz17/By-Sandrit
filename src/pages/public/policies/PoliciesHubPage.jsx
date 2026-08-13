import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  FileText,
  Lock,
  CalendarX,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  HelpCircle,
  PhoneCall,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { SectionTitle } from '../../../components/common/SectionTitle';
import { Button } from '../../../components/common/Button';
import { updatePageSEO } from '../../../utils/seo';

export function PoliciesHubPage() {
  useEffect(() => {
    updatePageSEO({
      title: 'Centro de Políticas y Normatividad Legal',
      description: 'Conoce los términos y condiciones, política de privacidad y tratamiento de datos personales, política de cancelaciones y protocolos de bioseguridad de By Sandrit.',
      canonicalPath: '/politicas'
    });
  }, []);

  const policies = [
    {
      title: 'Términos y Condiciones de Servicio',
      slug: 'terminos',
      path: '/politicas/terminos',
      badge: 'Uso de la Plataforma & Citas',
      desc: 'Define los derechos, deberes, condiciones de prestación de servicios estéticos, puntualidad, formas de pago y garantías aplicables a todas nuestras clientas.',
      icon: FileText,
      keyPoints: [
        'Proceso de reserva y confirmación de citas',
        'Tiempos de tolerancia y puntualidad (10-15 min)',
        'Formas de pago aceptadas (Efectivo, Nequi, Transferencia)',
        'Garantías y recomendaciones posteriores'
      ]
    },
    {
      title: 'Política de Privacidad y Datos (Habeas Data)',
      slug: 'privacidad',
      path: '/politicas/privacidad',
      badge: 'Protección de Datos & Confidencialidad',
      desc: 'Explica con total transparencia cómo recopilamos, protegemos y utilizamos tus datos personales, números de contacto y tu ficha técnica de valoración estética.',
      icon: Lock,
      keyPoints: [
        'Tratamiento seguro de datos de contacto y salud cutánea',
        'Confidencialidad absoluta de la ficha estética',
        'Derechos de acceso, actualización y supresión',
        'Cero venta o transferencia de datos a terceros'
      ]
    },
    {
      title: 'Política de Cancelaciones & Reagendamiento',
      slug: 'cancelaciones',
      path: '/politicas/cancelaciones',
      badge: 'Gestión de Citas & Inasistencias',
      desc: 'Normas claras sobre los tiempos de anticipación para avisar reprogramaciones de citas, políticas de no-show (inasistencias) y abonos para servicios especiales.',
      icon: CalendarX,
      keyPoints: [
        'Aviso mínimo de 24 horas para reprogramar sin cargo',
        'Gestión de inasistencias y reservas futuras',
        'Abonos para paquetes especiales y eventos',
        'Reprogramación flexible por causas de salud demostrables'
      ]
    },
    {
      title: 'Consentimiento Informado & Bioseguridad',
      slug: 'consentimiento-bioseguridad',
      path: '/politicas/consentimiento-bioseguridad',
      badge: 'Salud, Higiene & Contraindicaciones',
      desc: 'Protocolos de esterilización de instrumental, material desechable y declaración médica obligatoria previa (embarazo, acné severo, retinoides, alergias).',
      icon: ShieldCheck,
      keyPoints: [
        'Protocolo de desinfección y material 100% descartable',
        'Declaración previa de alergias o tratamientos médicos',
        'Cuidados pre y post tratamiento (fotoprotección solar)',
        'Expectativas realistas y variabilidad biológica'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      {/* Page Header */}
      <SectionTitle
        subtitle="Transparencia & Confianza"
        title="Centro de Políticas y Compromiso Legal"
        description="En BY SANDRIT tu seguridad, privacidad y satisfacción son nuestra máxima prioridad. Consulta a continuación todas nuestras normativas y protocolos de atención."
      />

      {/* Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {policies.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.slug}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-[#EFE5E2] hover:border-[#D4B8B1] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF2F3] text-[#8C3F52] border border-[#F2D7D9] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#8C3F52] bg-[#FAF2F3] px-3 py-1 rounded-full border border-[#F2D7D9] uppercase tracking-wider">
                    {p.badge}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-medium text-[#2C2422] mb-3">
                  {p.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#736662] leading-relaxed font-light mb-6">
                  {p.desc}
                </p>

                <div className="space-y-2 mb-6 pt-4 border-t border-[#F5ECE9]">
                  <p className="text-xs font-semibold text-[#2C2422] uppercase tracking-wider">Puntos clave:</p>
                  {p.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#685D59]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8C3F52] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link to={p.path} className="pt-4 border-t border-[#F5ECE9]">
                <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right" className="w-full justify-between">
                  <span>Leer documento completo</span>
                </Button>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Summary Banner */}
      <div className="bg-gradient-to-br from-[#FAF2F3] via-white to-[#FDF8F5] rounded-3xl p-8 sm:p-12 border border-[#F2D7D9] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C3F52] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#C59B4E]" />
              <span>Garantía de Ética Profesional</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-[#2C2422] font-normal">
              Atención directa por Sandrit Ríos Molinares
            </h3>
            <p className="text-sm text-[#685D59] font-light leading-relaxed">
              Todos nuestros servicios se rigen por principios de honestidad, respeto por la salud de la piel y confidencialidad. Si tienes alguna pregunta sobre nuestras condiciones o requieres adaptaciones especiales para tu cita, no dudes en contactarnos directamente.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <Link to="/agendar" className="w-full">
              <Button variant="primary" size="md" className="w-full">
                Agendar cita con confianza
              </Button>
            </Link>
            <Link to="/contacto" className="w-full">
              <Button variant="outline" size="md" className="w-full">
                Contactar a Sandrit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
