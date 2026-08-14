import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, Instagram, Phone, MapPin, Clock, Lock, Download, Smartphone } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';
import { usePwa } from '../../context/PwaContext';
import { generateWhatsAppUrl, generateGeneralInquiryMessage } from '../../utils/whatsapp';

export function Footer() {
  const { settings } = useBusiness();
  const { setShowInstallModal, isInstalled } = usePwa();
  const phone = settings?.whatsapp || '3127654780';
  const instagram = settings?.instagram || 'by_sandrit';
  const waUrl = generateWhatsAppUrl({ phone, message: generateGeneralInquiryMessage() });

  return (
    <footer className="bg-[#261E1C] text-[#E5D7D3] pt-16 pb-10 border-t border-[#3D312E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#3D312E]">
          {/* Brand & Description */}
          <div className="space-y-4 lg:col-span-2">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-display tracking-[0.2em] text-2xl font-bold text-white">
                  BY SANDRIT
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59B4E]"></span>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C97A8B] font-medium">
                Belleza · Estética · Bienestar
              </p>
            </div>
            <p className="text-sm text-[#B8A7A2] leading-relaxed font-light max-w-sm">
              Espacio dedicado a consentirte, cuidar de tu piel y realzar tu belleza auténtica con tratamientos profesionales y trato personalizado por Sandrit Ríos Molinares.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#3D312E] hover:bg-[#25D366] hover:text-white text-[#D9C4BD] flex items-center justify-center transition-colors"
                aria-label="WhatsApp de By Sandrit"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#3D312E] hover:bg-[#E1306C] hover:text-white text-[#D9C4BD] flex items-center justify-center transition-colors"
                aria-label="Instagram de By Sandrit"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg text-white font-medium flex items-center gap-2">
              <span>Navegación</span>
              <span className="w-6 h-[1px] bg-[#C59B4E]"></span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-[#B8A7A2] hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-[#B8A7A2] hover:text-white transition-colors">
                  Nuestros Servicios
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-[#B8A7A2] hover:text-white transition-colors">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-[#B8A7A2] hover:text-white transition-colors">
                  Galería de Trabajos
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-[#B8A7A2] hover:text-white transition-colors">
                  Contacto & Ubicación
                </Link>
              </li>
              <li>
                <Link to="/agendar" className="text-[#C97A8B] hover:text-white font-medium transition-colors">
                  ✨ Agendar Cita en Línea
                </Link>
              </li>
              {!isInstalled && (
                <li>
                  <button
                    onClick={() => setShowInstallModal(true)}
                    className="text-[#C59B4E] hover:text-[#E2BD75] font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Instalar App en tu Celular</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Legal & Policies Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg text-white font-medium flex items-center gap-2">
              <span>Políticas & Legal</span>
              <span className="w-6 h-[1px] bg-[#C59B4E]"></span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/politicas" className="text-[#B8A7A2] hover:text-white transition-colors">
                  Centro de Políticas
                </Link>
              </li>
              <li>
                <Link to="/politicas/terminos" className="text-[#B8A7A2] hover:text-white transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/politicas/privacidad" className="text-[#B8A7A2] hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/politicas/cancelaciones" className="text-[#B8A7A2] hover:text-white transition-colors">
                  Cancelación de Citas
                </Link>
              </li>
              <li>
                <Link to="/politicas/consentimiento-bioseguridad" className="text-[#B8A7A2] hover:text-white transition-colors">
                  Bioseguridad & Salud
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-display text-lg text-white font-medium flex items-center gap-2">
              <span>Atención</span>
              <span className="w-6 h-[1px] bg-[#C59B4E]"></span>
            </h4>
            <div className="space-y-3 text-sm text-[#B8A7A2]">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C59B4E] shrink-0 mt-0.5" />
                <span>WhatsApp: {settings?.phone || '3127654780'}</span>
              </div>
              <div className="flex items-start gap-3">
                <Instagram className="w-4 h-4 text-[#C59B4E] shrink-0 mt-0.5" />
                <span>@{instagram}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C59B4E] shrink-0 mt-0.5" />
                <span>{settings?.address || 'Ubicación disponible al agendar'}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C59B4E] shrink-0 mt-0.5" />
                <span>{settings?.hours_text || 'Lun a Sáb: 8:00 AM - 6:00 PM'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8A7974]">
          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
            <p>© 2026 BY SANDRIT. Todos los derechos reservados.</p>
            <span>•</span>
            <Link to="/politicas/privacidad" className="hover:text-white transition-colors">Habeas Data</Link>
            <span>•</span>
            <Link to="/politicas/terminos" className="hover:text-white transition-colors">Términos</Link>
          </div>

          <div className="flex items-center gap-2 text-[#A89894] flex-wrap justify-center">
            <span>Desarrollado y Diseñado por</span>
            <a
              href="https://yordevctg17.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#C59B4E] hover:text-[#E2BD75] underline decoration-[#C59B4E]/40 hover:decoration-[#C59B4E] transition-colors inline-flex items-center gap-1"
            >
              <span>YorDev</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span>Sandrit Ríos Molinares</span>
            <span>•</span>
            <Link to="/admin/login" className="inline-flex items-center gap-1 hover:text-[#C97A8B] transition-colors">
              <Lock className="w-3 h-3" /> Panel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
