import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { formatPrice, formatDuration } from '../../utils/formatters';
import { useBusiness } from '../../context/BusinessContext';
import { generateWhatsAppUrl, generateServiceInquiryMessage } from '../../utils/whatsapp';

export function ServiceCard({
  service,
  showCategory = true,
  featured = false,
  id
}) {
  const { settings } = useBusiness();
  const phone = settings?.whatsapp || '3127654780';
  const waUrl = generateWhatsAppUrl({
    phone,
    message: generateServiceInquiryMessage(service.name)
  });

  return (
    <div
      id={id || `service-card-${service.id}`}
      className={`group relative flex flex-col bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
        featured
          ? 'border-[#C59B4E]/50 shadow-md hover:shadow-xl ring-1 ring-[#C59B4E]/30'
          : 'border-[#EFE5E2] hover:border-[#D4B8B1] shadow-xs hover:shadow-lg'
      }`}
    >
      {/* Service Image with fallback */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-[#FAF2F3]">
        <img
          src={service.image_url || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

        {/* Featured pill */}
        {featured && (
          <div className="absolute top-3 left-3 bg-[#FAF7F5]/90 backdrop-blur-xs text-[#8C3F52] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs border border-[#C59B4E]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B4E]" />
            <span>Destacado</span>
          </div>
        )}

        {/* Duration badge */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium">
          <Clock className="w-3.5 h-3.5 text-[#E2CFCA]" />
          <span>{formatDuration(service.duration_minutes)}</span>
        </div>

        {/* Price tag */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#8C3F52] text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-xs border border-[#E8DCD9]">
          {formatPrice(service.price, service.price_is_demo)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col grow justify-between">
        <div>
          {showCategory && (
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8C3F52] mb-1.5 block">
              {service.service_categories?.name || 'Estética & Belleza'}
            </span>
          )}

          <h3 className="font-display text-lg sm:text-xl font-medium text-[#2C2422] group-hover:text-[#8C3F52] transition-colors leading-snug mb-2">
            <Link to={`/servicios/${service.slug}`}>
              {service.name}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-[#685D59] leading-relaxed line-clamp-2 mb-4 font-light">
            {service.short_description || service.description}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-[#F5ECE9] flex items-center gap-2 mt-auto">
          <Link to={`/agendar?service=${service.id}`} className="flex-1">
            <Button
              variant="primary"
              size="sm"
              className="w-full text-xs"
            >
              Agendar cita
            </Button>
          </Link>

          <Link
            to={`/servicios/${service.slug}`}
            className="p-2 text-[#736662] hover:text-[#8C3F52] hover:bg-[#FAF2F3] rounded-full transition-colors"
            title="Ver detalles del servicio"
            aria-label={`Ver detalles de ${service.name}`}
          >
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#25D366] hover:bg-emerald-50 rounded-full transition-colors"
            title="Consultar por WhatsApp"
            aria-label={`Consultar ${service.name} por WhatsApp`}
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
