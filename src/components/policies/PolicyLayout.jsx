import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  FileText,
  Lock,
  CalendarX,
  HeartHandshake,
  Printer,
  ChevronRight,
  ArrowLeft,
  MessageCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { Button } from '../common/Button';
import { useBusiness } from '../../context/BusinessContext';
import { generateWhatsAppUrl, generateGeneralInquiryMessage } from '../../utils/whatsapp';

export function PolicyLayout({
  title,
  subtitle,
  lastUpdated = 'Agosto 2026',
  badgeText = 'Documento Legal & Normativo',
  children
}) {
  const location = useLocation();
  const { settings } = useBusiness();

  const policyLinks = [
    {
      title: 'Términos y Condiciones',
      desc: 'Reglas de servicio, reservas y compromisos',
      path: '/politicas/terminos',
      icon: FileText
    },
    {
      title: 'Privacidad y Datos (Habeas Data)',
      desc: 'Protección de datos personales y ficha estética',
      path: '/politicas/privacidad',
      icon: Lock
    },
    {
      title: 'Cancelaciones & Reagendamiento',
      desc: 'Tiempos de aviso, inasistencias y abonos',
      path: '/politicas/cancelaciones',
      icon: CalendarX
    },
    {
      title: 'Bioseguridad & Consentimiento',
      desc: 'Higiene, instrumental y contraindicaciones',
      path: '/politicas/consentimiento-bioseguridad',
      icon: ShieldCheck
    }
  ];

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const waUrl = generateWhatsAppUrl({
    phone: settings?.whatsapp || '3127654780',
    message: generateGeneralInquiryMessage()
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb navigation */}
      <nav className="flex items-center gap-2 text-xs font-medium text-[#8A7974] flex-wrap">
        <Link to="/" className="hover:text-[#8C3F52] transition-colors">Inicio</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/politicas" className="hover:text-[#8C3F52] transition-colors">Centro de Políticas</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#8C3F52] font-semibold">{title}</span>
      </nav>

      {/* Main Grid: Sidebar + Document Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* Left / Top Policy Sidebar Navigation */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#EFE5E2] shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F2E8E5]">
              <ShieldCheck className="w-5 h-5 text-[#8C3F52]" />
              <h3 className="font-display font-semibold text-base text-[#2C2422]">
                Centro de Transparencia
              </h3>
            </div>
            
            <p className="text-xs text-[#736662] leading-relaxed">
              En <strong>BY SANDRIT</strong> operamos bajo los más estrictos estándares éticos, sanitarios y de respeto por la privacidad de nuestras clientas.
            </p>

            <div className="space-y-2 pt-2">
              {policyLinks.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-start gap-3 p-3 rounded-2xl transition-all ${
                      isActive
                        ? 'bg-[#FAF2F3] border border-[#F2D7D9] text-[#8C3F52] shadow-2xs'
                        : 'hover:bg-[#FAF7F5] border border-transparent text-[#5C504C]'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isActive ? 'bg-[#8C3F52] text-white' : 'bg-[#FAF2F3] text-[#8C3F52]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className={`text-xs font-semibold ${isActive ? 'text-[#8C3F52]' : 'text-[#2C2422]'}`}>
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#8A7974] line-clamp-1 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#F2E8E5] space-y-3">
              <button
                type="button"
                onClick={handlePrint}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FAF7F5] hover:bg-[#F5ECE8] border border-[#E8DCD9] text-xs font-medium text-[#5C504C] transition-colors"
              >
                <Printer className="w-4 h-4 text-[#8C3F52]" />
                <span>Imprimir / Guardar en PDF</span>
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FAF2F3] hover:bg-[#F2D7D9] border border-[#F2D7D9] text-xs font-semibold text-[#8C3F52] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>¿Dudas sobre las políticas? Escríbenos</span>
              </a>
            </div>
          </div>

          {/* Quick Notice Card */}
          <div className="p-5 bg-gradient-to-br from-[#FAF2F3] to-[#FDF8F5] rounded-2xl border border-[#F2D7D9] text-xs text-[#685D59] space-y-2">
            <div className="flex items-center gap-2 text-[#8C3F52] font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#C59B4E]" />
              <span>Compromiso de Sandrit</span>
            </div>
            <p className="leading-relaxed">
              La atención y cuidado de tu piel se rige por el principio de consentimiento informado y respeto absoluto a tu bienestar.
            </p>
          </div>
        </aside>

        {/* Right / Main Policy Article Content */}
        <main className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#EFE5E2] shadow-xs space-y-8">
          {/* Header Banner */}
          <div className="pb-6 border-b border-[#F2E8E5] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FAF2F3] border border-[#F2D7D9] text-[#8C3F52] text-[11px] font-semibold tracking-wider uppercase">
                {badgeText}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-[#8A7974]">
                <Clock className="w-3.5 h-3.5 text-[#C59B4E]" /> Última actualización: {lastUpdated}
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#2C2422] font-normal leading-tight">
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-sm sm:text-base text-[#685D59] font-light leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Policy Body */}
          <div className="policy-content prose prose-stone max-w-none text-[#4A3E3B] text-sm sm:text-base leading-relaxed space-y-6">
            {children}
          </div>

          {/* Bottom Callout & Legal Notice */}
          <div className="pt-8 border-t border-[#F2E8E5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7974]">
            <p>
              Responsable: <strong>Sandrit Ríos Molinares</strong> — BY SANDRIT
            </p>
            <Link to="/politicas" className="text-[#8C3F52] hover:underline font-medium inline-flex items-center gap-1">
              Ver todas las políticas <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
