import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
  Award,
  Clock,
  MessageCircle,
  Feather,
  Eye,
  Flame,
  Palette,
  Hand,
  Gift,
  Star
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { SectionTitle } from '../../components/common/SectionTitle';
import { ServiceCard } from '../../components/services/ServiceCard';
import { TestimonialCard } from '../../components/testimonials/TestimonialCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { FaqSection, DEFAULT_AESTHETIC_FAQS } from '../../components/common/FaqSection';
import { servicesService } from '../../services/services.service';
import { testimonialsService } from '../../services/testimonials.service';
import { useBusiness } from '../../context/BusinessContext';
import { updatePageSEO } from '../../utils/seo';
import { generateWhatsAppUrl, generateGeneralInquiryMessage } from '../../utils/whatsapp';

export function HomePage() {
  const { settings } = useBusiness();
  const [featuredServices, setFeaturedServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updatePageSEO({
      title: 'Inicio',
      description: settings?.hero_subtitle || 'Descubre una experiencia de belleza, estética y bienestar en By Sandrit por Sandrit Ríos Molinares. Higiene facial, masajes, cejas, pestañas y spa.',
      canonicalPath: '/',
      faqs: DEFAULT_AESTHETIC_FAQS
    });

    async function loadHomeContent() {
      try {
        const [srvRes, testRes] = await Promise.all([
          servicesService.getAllServices(false),
          testimonialsService.getAllTestimonials(false)
        ]);

        if (srvRes.data) {
          const featured = srvRes.data.filter(s => s.is_featured);
          setFeaturedServices(featured.length > 0 ? featured.slice(0, 4) : srvRes.data.slice(0, 4));
        }
        if (testRes.data) {
          setTestimonials(testRes.data.slice(0, 3));
        }
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadHomeContent();
  }, [settings]);

  const categoriesOverview = [
    {
      title: 'Higiene Facial',
      desc: 'Básica, profunda, anti-acné y protocolos luxury con alta frecuencia.',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
      slug: 'higiene-facial'
    },
    {
      title: 'Masajes',
      desc: 'Masaje relajante corporal, drenaje linfático y terapias combinadas.',
      icon: HeartHandshake,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
      slug: 'masajes'
    },
    {
      title: 'Depilación con Cera',
      desc: 'Depilación delicada por zonas con cera elástica hipoalergénica.',
      icon: Feather,
      image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=600&q=80',
      slug: 'depilacion-con-cera'
    },
    {
      title: 'Cejas & Pestañas',
      desc: 'Diseño, depilación, pigmento semipermanente y lifting natural.',
      icon: Eye,
      image: 'https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=600&q=80',
      slug: 'cejas-pestanas'
    },
    {
      title: 'Cabello',
      desc: 'Trenzas artísticas, peinados para eventos, planchado y ondas.',
      icon: Flame,
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80',
      slug: 'cabello'
    },
    {
      title: 'Maquillaje',
      desc: 'Maquillaje social, para eventos especiales y estilo glam de larga duración.',
      icon: Palette,
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
      slug: 'maquillaje'
    },
    {
      title: 'Manicure & Pedicure',
      desc: 'Cuidado completo de uñas, esmaltado semipermanente y acabados pulidos.',
      icon: Hand,
      image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80',
      slug: 'manicure-pedicure'
    },
    {
      title: 'Spa para Niñas',
      desc: 'Experiencia mágica, dulce y consentidora para las más pequeñas.',
      icon: Gift,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80',
      slug: 'spa-para-ninas'
    },
  ];

  const waUrl = generateWhatsAppUrl({
    phone: settings?.whatsapp || '3127654780',
    message: generateGeneralInquiryMessage()
  });

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-16 sm:pb-24 overflow-hidden">
        {/* Decorative soft backdrop elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 rounded-full bg-[#F6E2E4]/40 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-80 h-80 rounded-full bg-[#EAD0C7]/30 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6E8EB] border border-[#F2D7D9] text-[#8C3F52] text-xs font-semibold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#C59B4E]" />
                <span>{settings?.tagline || 'Belleza · Estética · Bienestar'}</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#2C2422] font-normal tracking-tight leading-[1.15]">
                {settings?.hero_title || 'Realzamos tu esencia, resaltamos tu belleza.'}
              </h1>

              <p className="text-[#685D59] text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {settings?.hero_subtitle ||
                  'Descubre una experiencia de belleza, estética y bienestar diseñada para consentirte y resaltar lo mejor de ti.'}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/agendar" className="w-full sm:w-auto">
                  <Button
                    id="hero-btn-agendar"
                    variant="primary"
                    size="lg"
                    icon={Calendar}
                    className="w-full sm:w-auto"
                  >
                    Agendar cita
                  </Button>
                </Link>
                <Link to="/servicios" className="w-full sm:w-auto">
                  <Button
                    id="hero-btn-servicios"
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Ver servicios
                  </Button>
                </Link>
              </div>

              {/* Trust micro-badges */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-[#EFE5E2] max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <p className="font-display text-xl sm:text-2xl font-bold text-[#8C3F52]">100%</p>
                  <p className="text-[11px] text-[#736662] tracking-wider uppercase">Personalizado</p>
                </div>
                <div>
                  <p className="font-display text-xl sm:text-2xl font-bold text-[#8C3F52]">5.0 ★</p>
                  <p className="text-[11px] text-[#736662] tracking-wider uppercase">Satisfacción</p>
                </div>
                <div>
                  <p className="font-display text-xl sm:text-2xl font-bold text-[#8C3F52]">Premium</p>
                  <p className="text-[11px] text-[#736662] tracking-wider uppercase">Higiene & Cuidado</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative border frame */}
                <div className="absolute -inset-3 rounded-3xl border border-[#C59B4E]/40 translate-x-2 translate-y-2 pointer-events-none hidden sm:block"></div>

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 bg-[#FAF2F3]">
                  <img
                    src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80"
                    alt="Servicios Estéticos By Sandrit"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  {/* Floating floating card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-[#EBDCD8]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FAF2F3] text-[#8C3F52] flex items-center justify-center font-bold">
                        SR
                      </div>
                      <div>
                        <h4 className="font-display font-medium text-sm text-[#2C2422]">
                          Sandrit Ríos Molinares
                        </h4>
                        <p className="text-xs text-[#8C3F52]">
                          Especialista en Estética & Cosmética
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN CATEGORÍAS DESTACADAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Nuestros Servicios"
          title="Todo lo que necesitas para cuidar, transformar y resaltar tu belleza"
          description="Explora nuestras especialidades diseñadas con dedicación, protocolos higiénicos y los mejores productos cosméticos."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesOverview.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-5 border border-[#EFE5E2] hover:border-[#D4B8B1] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-[#FAF2F3]">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs text-[#8C3F52] flex items-center justify-center shadow-sm">
                      <Icon className="w-4 h-4 text-[#8C3F52]" />
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-medium text-[#2C2422] group-hover:text-[#8C3F52] transition-colors mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#736662] leading-relaxed font-light mb-4">
                    {cat.desc}
                  </p>
                </div>

                <Link
                  to={`/servicios?cat=${cat.slug}`}
                  className="inline-flex items-center justify-between text-xs font-semibold text-[#8C3F52] hover:text-[#722F40] pt-3 border-t border-[#F5ECE9] transition-colors"
                >
                  <span>Ver servicios</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED SPECIFIC SERVICES */}
      {featuredServices.length > 0 && (
        <section className="bg-[#F5ECE8]/60 py-16 sm:py-20 border-y border-[#EBDCD8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3F52]">
                  Tratamientos Estrella
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-[#2C2422] font-normal mt-1">
                  Los Favoritos de Nuestras Clientas
                </h2>
              </div>
              <Link to="/servicios">
                <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                  Ver catálogo completo
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredServices.map((srv) => (
                <ServiceCard key={srv.id} service={srv} featured={srv.is_featured} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EXPERIENCE / VALUE PROPOSITION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#FAF2F3] via-white to-[#FDF8F5] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#F2D7D9] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3F52]">
                Experiencia By Sandrit
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[#2C2422] font-normal leading-snug">
                Tu belleza, nuestro propósito. Cuidado integral con manos expertas.
              </h2>
              <p className="text-[#685D59] text-sm sm:text-base leading-relaxed font-light">
                Cada cita es un momento de pausa y consentimiento para ti. Trabajamos con productos de la más alta calidad, protocolos rigurosos de bioseguridad y una atención cálida que te hará sentir renovada.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white text-[#8C3F52] border border-[#F2D7D9] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-medium text-sm text-[#2C2422]">Higiene Rigurosa</h4>
                    <p className="text-xs text-[#736662]">Materiales esterilizados y desechables.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white text-[#8C3F52] border border-[#F2D7D9] flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-[#C59B4E]" />
                  </div>
                  <div>
                    <h4 className="font-display font-medium text-sm text-[#2C2422]">Técnicas Avanzadas</h4>
                    <p className="text-xs text-[#736662]">Actualización constante en tendencias.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/nosotros">
                  <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                    Conoce más sobre Sandrit
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1512290900672-1f02e6b0a7ea?auto=format&fit=crop&w=600&q=80"
                  alt="Tratamiento estético facial"
                  className="rounded-2xl shadow-md object-cover h-48 sm:h-56 w-full"
                />
                <img
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80"
                  alt="Masaje y bienestar"
                  className="rounded-2xl shadow-md object-cover h-36 sm:h-40 w-full"
                />
              </div>
              <div className="space-y-4 pt-6">
                <img
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80"
                  alt="Maquillaje profesional"
                  className="rounded-2xl shadow-md object-cover h-36 sm:h-40 w-full"
                />
                <img
                  src="https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=600&q=80"
                  alt="Diseño de cejas"
                  className="rounded-2xl shadow-md object-cover h-48 sm:h-56 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      {testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Testimonios"
            title="Lo que dicen nuestras clientas"
            description="La satisfacción y confianza de quienes nos eligen es nuestro mejor respaldo."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ & GEO SECTION */}
      <FaqSection
        title="Preguntas Frecuentes sobre Nuestros Tratamientos"
        subtitle="Claridad & Confianza"
        description="Todo lo que necesitas saber antes de tu cita: cuidados de la piel, técnicas aplicadas y proceso de reserva."
      />

      {/* CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#261E1C] text-white p-8 sm:p-12 lg:p-16 overflow-hidden text-center shadow-xl border border-[#3D312E]">
          {/* Subtle gold line ornament */}
          <div className="w-16 h-[2px] bg-[#C59B4E] mx-auto mb-6"></div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#C97A8B] font-semibold block mb-2">
            Reserva tu momento
          </span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal max-w-2xl mx-auto leading-tight mb-4">
            ¿Lista para consentirte?
          </h2>

          <p className="text-[#B8A7A2] text-sm sm:text-base max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Agenda tu cita y déjanos acompañarte a resaltar tu belleza con la atención delicada y profesional que mereces.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link to="/agendar" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                icon={Calendar}
                className="w-full sm:w-auto bg-[#8C3F52] hover:bg-[#722F40]"
              >
                Agendar cita
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
                className="w-full sm:w-auto text-[#C59B4E] border-[#C59B4E]/60 hover:bg-white/5"
              >
                Escribir por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
