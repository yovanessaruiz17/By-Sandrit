import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  Sparkles,
  Calendar,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { servicesService } from '../../services/services.service';
import { useBusiness } from '../../context/BusinessContext';
import { formatPrice, formatDuration } from '../../utils/formatters';
import { generateWhatsAppUrl, generateServiceInquiryMessage } from '../../utils/whatsapp';
import { updatePageSEO } from '../../utils/seo';

export function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { settings } = useBusiness();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadService() {
      try {
        const { data, error } = await servicesService.getServiceBySlug(slug);
        if (error || !data) {
          setNotFound(true);
        } else {
          setService(data);
          updatePageSEO({
            title: `${data.name} | Tratamiento Estético`,
            description: data.short_description || data.description || `Agenda tu tratamiento de ${data.name} con Sandrit Ríos Molinares en By Sandrit.`,
            canonicalPath: `/servicios/${data.slug}`,
            image: data.image_url,
            type: 'article',
            price: data.price,
            currency: 'COP'
          });
        }
      } catch (err) {
        console.error('Error loading service details:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    loadService();
  }, [slug]);

  if (loading) {
    return <LoadingSpinner text="Cargando detalles del servicio..." fullScreen />;
  }

  if (notFound || !service) {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 text-center bg-white rounded-3xl border border-[#EFE5E2] shadow-sm">
        <h2 className="font-display text-2xl text-[#2C2422] mb-3">Servicio no encontrado</h2>
        <p className="text-sm text-[#736662] mb-6">El tratamiento que buscas no existe o ha cambiado de enlace.</p>
        <Link to="/servicios">
          <Button variant="primary" size="md">Ver catálogo de servicios</Button>
        </Link>
      </div>
    );
  }

  const phone = settings?.whatsapp || '3127654780';
  const waUrl = generateWhatsAppUrl({
    phone,
    message: generateServiceInquiryMessage(service.name)
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Back button breadcrumb */}
      <div>
        <Link
          to="/servicios"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8C3F52] hover:text-[#722F40] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Volver a todos los servicios
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Big Image & Visual Badges */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#E8DCD9] aspect-4/3 sm:aspect-16/10 bg-[#FAF2F3]">
            <img
              src={service.image_url}
              alt={service.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#8C3F52] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B4E]" />
              <span>{service.service_categories?.name || 'Estética & Belleza'}</span>
            </div>

            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#E2CFCA]" />
              <span>Duración aprox: {formatDuration(service.duration_minutes)}</span>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#EFE5E2] flex items-center justify-between text-xs text-[#685D59]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#8C3F52]" /> Material esterilizado
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-[#C59B4E]" /> Trato personalizado
            </span>
          </div>
        </div>

        {/* Right Column: Title, Description, Benefits, Booking Buttons */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3F52] block mb-1">
              Tratamiento Especializado
            </span>
            <h1 className="font-display text-3xl sm:text-4xl text-[#2C2422] font-normal leading-tight mb-3">
              {service.name}
            </h1>
            <div className="inline-block bg-[#FAF2F3] text-[#8C3F52] text-xl sm:text-2xl font-bold px-4 py-1.5 rounded-full border border-[#F2D7D9]">
              {formatPrice(service.price, service.price_is_demo)}
            </div>
          </div>

          <div className="prose prose-stone text-sm sm:text-base text-[#5C504C] leading-relaxed font-light">
            <p>{service.description || service.short_description}</p>
          </div>

          {/* Benefits list */}
          {service.benefits && service.benefits.length > 0 && (
            <div className="p-6 bg-white rounded-2xl border border-[#EFE5E2] space-y-3">
              <h3 className="font-display text-base font-semibold text-[#2C2422]">
                Beneficios Principales
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#685D59]">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#8C3F52] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          {service.recommendations && (
            <div className="p-4 bg-[#FAF7F5] rounded-2xl border border-[#E8DCD9] text-xs text-[#736662] space-y-1">
              <span className="font-semibold text-[#2C2422] block uppercase tracking-wider text-[11px]">
                Recomendaciones previas / posteriores:
              </span>
              <p>{service.recommendations}</p>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <Link to={`/agendar?service=${service.id}`} className="w-full sm:w-auto flex-1">
              <Button
                variant="primary"
                size="lg"
                icon={Calendar}
                className="w-full"
              >
                Agendar este servicio
              </Button>
            </Link>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="outlineGold"
                size="lg"
                icon={MessageCircle}
                className="w-full sm:w-auto"
              >
                Consultar WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
