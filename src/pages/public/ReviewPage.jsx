import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Sparkles,
  Heart,
  Send,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  AlertCircle,
  MessageCircle
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { servicesService } from '../../services/services.service';
import { testimonialsService } from '../../services/testimonials.service';
import { useBusiness } from '../../context/BusinessContext';
import { updatePageSEO } from '../../utils/seo';

const RATING_DESCRIPTIONS = {
  5: '¡Excelente! Me encantó el resultado ✨',
  4: 'Muy buena experiencia 💖',
  3: 'Buena atención y servicio 🙂',
  2: 'Regular',
  1: 'Puede mejorar'
};

export function ReviewPage() {
  const { settings } = useBusiness();
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [customService, setCustomService] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const businessName = settings?.business_name || 'BY SANDRIT';
  const stylistName = settings?.stylist_name || 'Sandrit Ríos Molinares';
  const whatsappNum = (settings?.whatsapp || '3127654780').replace(/\D/g, '');

  useEffect(() => {
    updatePageSEO({
      title: 'Déjanos tu Opinión',
      description: `Cuéntanos cómo fue tu experiencia en ${businessName} con ${stylistName}. Tu calificación y reseña nos ayudan a seguir brindándote la mejor atención.`,
      canonicalPath: '/dejar-opinion'
    });

    async function fetchServices() {
      try {
        const res = await servicesService.getAllServices(false);
        if (res?.data && res.data.length > 0) {
          setServices(res.data);
          setServiceName(res.data[0].title);
        }
      } catch (err) {
        console.warn('Error fetching services for review dropdown', err);
      } finally {
        setLoadingServices(false);
      }
    }
    fetchServices();
  }, [businessName, stylistName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('Por favor ingresa tu nombre.');
      return;
    }
    if (!comment.trim()) {
      setErrorMsg('Por favor escribe tu opinión o reseña.');
      return;
    }

    const finalService = serviceName === 'otro'
      ? (customService.trim() || 'Servicio Personalizado')
      : (serviceName || 'Servicio de Belleza');

    setSubmitting(true);

    try {
      const res = await testimonialsService.createTestimonial({
        customer_name: customerName.trim(),
        service_name: finalService,
        rating: Number(rating),
        comment: comment.trim(),
        is_active: true
      });

      if (res.error) {
        setErrorMsg(res.error.message || 'No se pudo registrar tu opinión. Por favor inténtalo de nuevo.');
      } else {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setErrorMsg('Ocurrió un error de conexión al enviar tu reseña.');
    } finally {
      setSubmitting(false);
    }
  };

  const activeRating = hoverRating || rating;

  return (
    <div className="min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF7F5] flex flex-col justify-center">
      <div className="max-w-xl mx-auto w-full">
        {/* Navigation back */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8C3F52] hover:text-[#722F40] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>
        </div>

        {submitted ? (
          /* SUCCESS STATE */
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EFE5E2] shadow-sm text-center animate-fade-in space-y-6">
            <div className="w-16 h-16 bg-[#FAF2F3] text-[#8C3F52] border border-[#F2D7D9] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <Heart className="w-8 h-8 fill-current text-[#8C3F52]" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C3F52] block mb-1">
                ¡Muchas Gracias!
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#2C2422] mb-3">
                Tu opinión nos llena el corazón
              </h2>
              <p className="text-xs sm:text-sm text-[#736662] leading-relaxed max-w-md mx-auto">
                Gracias, <strong>{customerName}</strong>, por tomarte el tiempo de compartir tu experiencia con <strong>{stylistName}</strong>. Tus palabras nos impulsan a seguir brindando un servicio dedicado y con amor.
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F5] rounded-2xl border border-[#E8DCD9] text-left max-w-md mx-auto">
              <div className="flex text-[#C59B4E] gap-1 mb-2">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#5C504C] italic leading-relaxed">
                "{comment}"
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/" className="w-full sm:w-auto">
                <Button variant="outline" size="md" className="w-full">
                  Ir al Inicio
                </Button>
              </Link>
              <Link to="/agendar" className="w-full sm:w-auto">
                <Button variant="primary" size="md" icon={Calendar} className="w-full">
                  Agendar Próxima Cita
                </Button>
              </Link>
            </div>

            {whatsappNum && (
              <div className="pt-4 border-t border-[#F2E8E5]">
                <a
                  href={`https://wa.me/57${whatsappNum}?text=${encodeURIComponent(`¡Hola Sandrit! Acabo de dejar mi reseña sobre mi cita en By Sandrit ✨`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Escribirle a Sandrit por WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        ) : (
          /* REVIEW FORM */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE5E2] shadow-sm">
            {/* Header */}
            <div className="text-center mb-8">
              <img
                src="https://i.postimg.cc/mkg3bwD8/logo-cuadrado.jpg"
                alt="Logo By Sandrit"
                className="w-16 h-16 rounded-full object-cover p-0.5 bg-white shadow-md border border-[#C59B4E]/40 mx-auto mb-3"
              />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF2F3] text-[#8C3F52] rounded-full text-xs font-semibold tracking-wider uppercase mb-3 border border-[#F2D7D9]">
                <Sparkles className="w-3.5 h-3.5 text-[#C59B4E]" />
                <span>Experiencia By Sandrit</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl text-[#2C2422] mb-2 font-normal">
                Cuéntanos tu experiencia
              </h1>
              <p className="text-xs sm:text-sm text-[#736662] max-w-md mx-auto leading-relaxed">
                Tu opinión es muy valiosa para nosotras y ayuda a que más personas conozcan nuestro cuidado estético.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating Selector */}
              <div className="text-center p-4 sm:p-5 bg-[#FAF7F5] rounded-2xl border border-[#E8DCD9]">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-2">
                  ¿Cómo calificarías tu atención? *
                </label>

                <div className="flex items-center justify-center gap-2 sm:gap-3 my-2">
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 sm:p-1.5 focus:outline-none transition-transform hover:scale-125 active:scale-95"
                      aria-label={`Calificar con ${starValue} estrellas`}
                    >
                      <Star
                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                          starValue <= activeRating
                            ? 'fill-[#C59B4E] text-[#C59B4E] drop-shadow-xs'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <p className="text-xs font-medium text-[#8C3F52] h-4 transition-all">
                  {RATING_DESCRIPTIONS[activeRating] || ''}
                </p>
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1.5">
                  Tu Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. María Camila Pérez"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
                />
              </div>

              {/* Service Dropdown */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1.5">
                  Tratamiento o Servicio Recibido
                </label>
                <select
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="otro">Otro tratamiento / Varios</option>
                </select>
              </div>

              {serviceName === 'otro' && (
                <div className="animate-fade-in">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1.5">
                    ¿Cuál servicio te realizaste?
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Depilación con cera, Limpieza facial..."
                    value={customService}
                    onChange={(e) => setCustomService(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
                  />
                </div>
              )}

              {/* Review Comment */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1.5">
                  Tu Opinión / Comentario *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Cuéntanos qué fue lo que más te gustó de tu tratamiento, los resultados en tu piel o la atención de Sandrit..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20 leading-relaxed"
                />
                <p className="text-[11px] text-[#736662] mt-1">
                  Tu reseña se mostrará en nuestra página para guiar a otras clientas.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={submitting}
                  icon={submitting ? undefined : Send}
                  className="w-full justify-center"
                >
                  {submitting ? 'Enviando tu opinión...' : 'Enviar mi Calificación'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
