import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';
import { StepIndicator } from './StepIndicator';
import { Button } from '../common/Button';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { servicesService } from '../../services/services.service';
import { appointmentsService } from '../../services/appointments.service';
import { useBusiness } from '../../context/BusinessContext';
import { getAvailableSlots } from '../../utils/availability';
import { formatPrice, formatDuration, formatDateSpanish, formatTime12Hour } from '../../utils/formatters';
import { generateWhatsAppUrl, generateBookingConfirmationMessage } from '../../utils/whatsapp';

export function BookingWizard() {
  const [searchParams] = useSearchParams();
  const preselectedServiceId = searchParams.get('service');
  const { settings } = useBusiness();

  const [currentStep, setCurrentStep] = useState(1);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Data
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [businessHours, setBusinessHours] = useState([]);

  // Booking selections
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  // Slots calculation
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [availableSlotsResult, setAvailableSlotsResult] = useState({ slots: [], isClosed: false });

  // Completed appointment result
  const [completedAppointment, setCompletedAppointment] = useState(null);

  const steps = [
    { title: 'Categoría' },
    { title: 'Servicio' },
    { title: 'Fecha' },
    { title: 'Horario' },
    { title: 'Tus Datos' },
    { title: 'Confirmar' }
  ];

  // Initial load
  useEffect(() => {
    async function loadData() {
      try {
        const [catRes, srvRes, bhRes] = await Promise.all([
          servicesService.getCategories(),
          servicesService.getAllServices(false),
          appointmentsService.getBusinessHours()
        ]);

        if (catRes.data) setCategories(catRes.data);
        if (srvRes.data) {
          setServices(srvRes.data);

          // If preselected service in query param, select it and jump to date
          if (preselectedServiceId) {
            const found = srvRes.data.find(s => s.id === preselectedServiceId);
            if (found) {
              setSelectedService(found);
              setSelectedCategory(found.category_id);
              setCurrentStep(3); // Jump to date selection
            }
          }
        }
        if (bhRes.data) setBusinessHours(bhRes.data);
      } catch (err) {
        console.error('Error loading booking data:', err);
      } finally {
        setLoadingInitial(false);
      }
    }
    loadData();
  }, [preselectedServiceId]);

  // Recalculate slots whenever date or service changes
  useEffect(() => {
    async function fetchSlots() {
      if (!selectedDate || !selectedService) return;
      setSlotsLoading(true);
      setSelectedTime(''); // Reset time selection on date change
      try {
        const { data: existingAppts } = await appointmentsService.getAppointmentsForDate(selectedDate);
        const result = getAvailableSlots({
          dateString: selectedDate,
          serviceDurationMinutes: selectedService.duration_minutes || 60,
          businessHoursList: businessHours,
          existingAppointments: existingAppts || []
        });
        setAvailableSlotsResult(result);
      } catch (err) {
        console.error('Error computing slots:', err);
      } finally {
        setSlotsLoading(false);
      }
    }
    fetchSlots();
  }, [selectedDate, selectedService, businessHours]);

  // Set default min date to today formatted as YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  // Services in currently selected category
  const filteredServices = selectedCategory
    ? services.filter(s => s.category_id === selectedCategory)
    : services;

  const handleNext = () => {
    setErrorMessage('');
    if (currentStep === 1 && !selectedCategory) {
      setErrorMessage('Por favor selecciona una categoría.');
      return;
    }
    if (currentStep === 2 && !selectedService) {
      setErrorMessage('Por favor selecciona el servicio que deseas agendar.');
      return;
    }
    if (currentStep === 3 && !selectedDate) {
      setErrorMessage('Por favor selecciona una fecha para tu cita.');
      return;
    }
    if (currentStep === 4 && !selectedTime) {
      setErrorMessage('Por favor selecciona una hora disponible.');
      return;
    }
    if (currentStep === 5) {
      if (!customerData.name.trim()) {
        setErrorMessage('Por favor ingresa tu nombre completo.');
        return;
      }
      if (!customerData.phone.trim() || customerData.phone.trim().length < 7) {
        setErrorMessage('Por favor ingresa un número de teléfono de contacto válido.');
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setErrorMessage('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmitBooking = async () => {
    setSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        customer_name: customerData.name.trim(),
        customer_phone: customerData.phone.trim(),
        customer_email: customerData.email.trim() || null,
        service_id: selectedService.id,
        service_name: selectedService.name,
        service_price: selectedService.price,
        service_duration: selectedService.duration_minutes || 60,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        notes: customerData.notes.trim()
      };

      const result = await appointmentsService.createAppointment(payload);

      if (result.error) {
        setErrorMessage(result.error.message || 'No fue posible completar la reserva.');
        setSubmitting(false);
        return;
      }

      setCompletedAppointment({
        ...payload,
        id: result.data?.id
      });
    } catch (err) {
      console.error('Submit booking error:', err);
      setErrorMessage('Ocurrió un error inesperado al procesar la cita.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingInitial) {
    return <LoadingSpinner text="Cargando disponibilidad de agenda..." fullScreen />;
  }

  // Final confirmation screen
  if (completedAppointment) {
    const waUrl = generateWhatsAppUrl({
      phone: settings?.whatsapp || '3127654780',
      message: generateBookingConfirmationMessage({
        serviceName: completedAppointment.service_name,
        date: formatDateSpanish(completedAppointment.appointment_date),
        time: formatTime12Hour(completedAppointment.appointment_time),
        customerName: completedAppointment.customer_name,
        customerPhone: completedAppointment.customer_phone,
        notes: completedAppointment.notes
      })
    });

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DCD9] shadow-xl text-center animate-fade-in my-8">
        <img
          src="/logo.jpg"
          alt="Logo By Sandrit"
          className="w-16 h-16 rounded-full object-cover p-0.5 bg-white shadow-md border border-[#C59B4E]/40 mx-auto mb-4"
        />

        <div className="w-12 h-12 rounded-full bg-[#FAF2F3] text-[#8C3F52] border border-[#F2D7D9] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-[#8C3F52]" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-widest text-[#C59B4E] block mb-1">
          ¡Solicitud Recibida con Éxito!
        </span>
        <h2 className="font-display text-2xl sm:text-3xl text-[#2C2422] font-semibold mb-3">
          Gracias, {completedAppointment.customer_name}
        </h2>
        <p className="text-sm text-[#685D59] mb-8 max-w-md mx-auto leading-relaxed">
          Tu solicitud para <strong>{completedAppointment.service_name}</strong> ha sido registrada. Nos pondremos en contacto contigo para confirmar tu cita.
        </p>

        {/* Appointment summary card */}
        <div className="bg-[#FAF7F5] rounded-2xl p-6 border border-[#EFE5E2] text-left space-y-3 mb-8 max-w-lg mx-auto">
          <div className="flex justify-between items-center text-xs pb-2 border-b border-[#EBDCD8]">
            <span className="text-[#8A7974]">Servicio:</span>
            <span className="font-semibold text-[#2C2422]">{completedAppointment.service_name}</span>
          </div>
          <div className="flex justify-between items-center text-xs pb-2 border-b border-[#EBDCD8]">
            <span className="text-[#8A7974]">Fecha:</span>
            <span className="font-medium text-[#2C2422]">{formatDateSpanish(completedAppointment.appointment_date)}</span>
          </div>
          <div className="flex justify-between items-center text-xs pb-2 border-b border-[#EBDCD8]">
            <span className="text-[#8A7974]">Hora:</span>
            <span className="font-medium text-[#2C2422]">{formatTime12Hour(completedAppointment.appointment_time)}</span>
          </div>
          <div className="flex justify-between items-center text-xs pb-2 border-b border-[#EBDCD8]">
            <span className="text-[#8A7974]">Teléfono:</span>
            <span className="font-medium text-[#2C2422]">{completedAppointment.customer_phone}</span>
          </div>
          <div className="flex justify-between items-center text-xs pt-1">
            <span className="text-[#8A7974]">Inversión estimada:</span>
            <span className="font-bold text-[#8C3F52] text-sm">{formatPrice(completedAppointment.service_price)}</span>
          </div>
        </div>

        {/* WhatsApp confirmation CTA */}
        <div className="space-y-3 max-w-md mx-auto">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Confirmar por WhatsApp ahora</span>
          </a>
          <Link to="/" className="block">
            <Button variant="secondary" size="md" className="w-full">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <StepIndicator steps={steps} currentStep={currentStep} />

      {/* Main card container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE5E2] shadow-sm relative">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: CATEGORY SELECTION */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3F52]">Paso 1</span>
              <h3 className="font-display text-2xl text-[#2C2422] font-semibold mt-1">
                Selecciona la categoría del servicio
              </h3>
              <p className="text-xs sm:text-sm text-[#736662] mt-1">
                Elige el área de belleza o bienestar que deseas disfrutar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSelectedService(null);
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#8C3F52] bg-[#FAF2F3] ring-2 ring-[#8C3F52]/30 shadow-xs'
                        : 'border-[#EFE5E2] hover:border-[#D4B8B1] bg-[#FAF7F5]/50 hover:bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-white text-[#8C3F52] border border-[#E8DCD9] flex items-center justify-center mb-3">
                      <Sparkles className="w-5 h-5 text-[#C59B4E]" />
                    </div>
                    <div>
                      <h4 className="font-display font-medium text-[#2C2422] text-base mb-1">
                        {cat.name}
                      </h4>
                      <p className="text-[11px] text-[#736662] line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: SERVICE SELECTION */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3F52]">Paso 2</span>
              <h3 className="font-display text-2xl text-[#2C2422] font-semibold mt-1">
                Selecciona el tratamiento específico
              </h3>
              <p className="text-xs sm:text-sm text-[#736662] mt-1">
                Conoce la duración y detalles de cada experiencia.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredServices.map((srv) => {
                const isSelected = selectedService?.id === srv.id;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv)}
                    className={`p-5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#8C3F52] bg-[#FAF2F3] ring-2 ring-[#8C3F52]/30 shadow-sm'
                        : 'border-[#EFE5E2] hover:border-[#D4B8B1] bg-[#FAF7F5]/50 hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h4 className="font-display font-medium text-[#2C2422] text-base leading-snug">
                          {srv.name}
                        </h4>
                        <span className="text-xs font-bold text-[#8C3F52] shrink-0 bg-white px-2.5 py-1 rounded-full border border-[#EBDCD8]">
                          {formatPrice(srv.price, srv.price_is_demo)}
                        </span>
                      </div>
                      <p className="text-xs text-[#736662] leading-relaxed mb-4 line-clamp-3">
                        {srv.short_description || srv.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#8A7974] pt-3 border-t border-[#EFE5E2]/80">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#C59B4E]" />
                        {formatDuration(srv.duration_minutes)}
                      </span>
                      <span className="font-medium text-[#8C3F52]">
                        {isSelected ? '✓ Seleccionado' : 'Seleccionar'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: DATE SELECTION */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3F52]">Paso 3</span>
              <h3 className="font-display text-2xl text-[#2C2422] font-semibold mt-1">
                Elige la fecha de tu cita
              </h3>
              <p className="text-xs sm:text-sm text-[#736662] mt-1">
                Selecciona el día en el que deseas ser atendida.
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <div className="p-6 bg-[#FAF7F5] rounded-2xl border border-[#E8DCD9]">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-2">
                  Fecha de reserva
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20 text-[#2C2422]"
                />
              </div>

              {selectedDate && (
                <div className="p-4 rounded-xl bg-[#FAF2F3] border border-[#F2D7D9] text-xs text-[#6E2B3C] flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#8C3F52] shrink-0" />
                  <span>Día seleccionado: <strong>{formatDateSpanish(selectedDate)}</strong></span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: TIME SLOT SELECTION */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3F52]">Paso 4</span>
              <h3 className="font-display text-2xl text-[#2C2422] font-semibold mt-1">
                Selecciona la hora de inicio
              </h3>
              <p className="text-xs sm:text-sm text-[#736662] mt-1">
                Mostrando horarios calculados para una duración de {formatDuration(selectedService?.duration_minutes || 60)}.
              </p>
            </div>

            {slotsLoading ? (
              <LoadingSpinner text="Consultando horarios libres..." />
            ) : availableSlotsResult.isClosed ? (
              <div className="p-8 text-center bg-amber-50 border border-amber-200 rounded-2xl max-w-md mx-auto">
                <p className="text-sm font-medium text-amber-900 mb-1">Día no disponible</p>
                <p className="text-xs text-amber-700">{availableSlotsResult.reason}</p>
                <Button variant="secondary" size="sm" onClick={() => setCurrentStep(3)} className="mt-4">
                  Elegir otra fecha
                </Button>
              </div>
            ) : availableSlotsResult.slots.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 border border-stone-200 rounded-2xl max-w-md mx-auto">
                <p className="text-sm font-medium text-stone-800 mb-1">Sin horarios disponibles</p>
                <p className="text-xs text-stone-600">No hay cupos libres para el día seleccionado con esta duración.</p>
                <Button variant="secondary" size="sm" onClick={() => setCurrentStep(3)} className="mt-4">
                  Elegir otra fecha
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
                {availableSlotsResult.slots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        !slot.available
                          ? 'bg-stone-100/70 border-stone-200 text-stone-400 cursor-not-allowed line-through text-xs'
                          : isSelected
                          ? 'bg-[#8C3F52] text-white border-[#8C3F52] shadow-xs font-semibold'
                          : 'bg-white hover:bg-[#FAF2F3] border-[#E8DCD9] hover:border-[#8C3F52] text-[#2C2422] text-sm'
                      }`}
                    >
                      <span>{formatTime12Hour(slot.time)}</span>
                      {!slot.available && (
                        <span className="block text-[10px] text-stone-400 no-underline">Ocupado</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* STEP 5: CUSTOMER INFORMATION */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fade-in max-w-lg mx-auto">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3F52]">Paso 5</span>
              <h3 className="font-display text-2xl text-[#2C2422] font-semibold mt-1">
                Tus datos de contacto
              </h3>
              <p className="text-xs sm:text-sm text-[#736662] mt-1">
                Ingresa tu información para registrar y confirmar tu solicitud de cita.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                  Nombre completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7974]" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. María Fernanda Gómez"
                    value={customerData.name}
                    onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                  Teléfono / WhatsApp de contacto *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7974]" />
                  <input
                    type="tel"
                    required
                    placeholder="Ej. 312 765 4780"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                  Correo electrónico (Opcional)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7974]" />
                  <input
                    type="email"
                    placeholder="Ej. maria@ejemplo.com"
                    value={customerData.email}
                    onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                  Observaciones o preferencias (Opcional)
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-[#8A7974]" />
                  <textarea
                    rows="3"
                    placeholder="Ej. Piel sensible, tengo un evento a las 6pm, etc."
                    value={customerData.notes}
                    onChange={(e) => setCustomerData({ ...customerData, notes: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: SUMMARY & CONFIRMATION */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-fade-in max-w-lg mx-auto">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3F52]">Paso 6</span>
              <h3 className="font-display text-2xl text-[#2C2422] font-semibold mt-1">
                Resumen de tu solicitud
              </h3>
              <p className="text-xs sm:text-sm text-[#736662] mt-1">
                Por favor verifica todos los datos antes de confirmar tu reserva.
              </p>
            </div>

            <div className="bg-[#FAF7F5] rounded-2xl p-6 border border-[#E8DCD9] space-y-4">
              <div className="flex items-start justify-between pb-3 border-b border-[#EBDCD8]">
                <div>
                  <span className="text-[11px] font-semibold text-[#8C3F52] uppercase tracking-wider block">
                    Tratamiento
                  </span>
                  <h4 className="font-display font-semibold text-[#2C2422] text-lg">
                    {selectedService?.name}
                  </h4>
                  <span className="text-xs text-[#736662]">
                    Duración: {formatDuration(selectedService?.duration_minutes)}
                  </span>
                </div>
                <span className="text-base font-bold text-[#8C3F52]">
                  {formatPrice(selectedService?.price, selectedService?.price_is_demo)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#8A7974] block mb-0.5">Fecha:</span>
                  <p className="font-semibold text-[#2C2422]">{formatDateSpanish(selectedDate)}</p>
                </div>
                <div>
                  <span className="text-[#8A7974] block mb-0.5">Hora:</span>
                  <p className="font-semibold text-[#2C2422]">{formatTime12Hour(selectedTime)}</p>
                </div>
                <div>
                  <span className="text-[#8A7974] block mb-0.5">Cliente:</span>
                  <p className="font-semibold text-[#2C2422]">{customerData.name}</p>
                </div>
                <div>
                  <span className="text-[#8A7974] block mb-0.5">Teléfono:</span>
                  <p className="font-semibold text-[#2C2422]">{customerData.phone}</p>
                </div>
              </div>

              {customerData.notes && (
                <div className="pt-3 border-t border-[#EBDCD8] text-xs">
                  <span className="text-[#8A7974] block mb-0.5">Notas adicionales:</span>
                  <p className="text-[#5C504C] italic">{customerData.notes}</p>
                </div>
              )}
            </div>

            {/* Legal consent and cancellation notice */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF2F3]/60 border border-[#F2D7D9] text-xs text-[#5C504C] cursor-pointer hover:bg-[#FAF2F3] transition-colors">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#8C3F52] focus:ring-[#8C3F52] border-[#D4B8B1]"
                />
                <span className="leading-relaxed">
                  He leído y acepto los{' '}
                  <Link to="/politicas/terminos" target="_blank" className="font-semibold text-[#8C3F52] underline hover:text-[#722F40]">
                    Términos de Servicio
                  </Link>
                  , la{' '}
                  <Link to="/politicas/privacidad" target="_blank" className="font-semibold text-[#8C3F52] underline hover:text-[#722F40]">
                    Política de Privacidad (Habeas Data)
                  </Link>
                  {' '}y la{' '}
                  <Link to="/politicas/cancelaciones" target="_blank" className="font-semibold text-[#8C3F52] underline hover:text-[#722F40]">
                    Política de Cancelaciones
                  </Link>
                  .
                </span>
              </label>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  Al enviar la solicitud, te contactaremos vía WhatsApp para confirmar los detalles. No se requiere pago anticipado para citas estándar.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-10 pt-6 border-t border-[#EFE5E2] flex items-center justify-between">
          {currentStep > 1 ? (
            <Button
              variant="secondary"
              size="md"
              onClick={handleBack}
              icon={ChevronLeft}
              iconPosition="left"
            >
              Atrás
            </Button>
          ) : (
            <div></div>
          )}

          {currentStep < steps.length ? (
            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              icon={ChevronRight}
              iconPosition="right"
            >
              Continuar
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                if (!acceptedTerms) {
                  setErrorMessage('Por favor acepta los Términos y la Política de Privacidad para continuar.');
                  return;
                }
                handleSubmitBooking();
              }}
              disabled={!acceptedTerms}
              isLoading={submitting}
              icon={CheckCircle2}
            >
              Confirmar Solicitud
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
