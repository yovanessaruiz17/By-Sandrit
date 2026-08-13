import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  CheckCheck,
  XCircle,
  Search,
  Filter,
  Eye,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  AlertCircle
} from 'lucide-react';
import { AdminHeader } from '../../components/layout/AdminHeader';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { appointmentsService } from '../../services/appointments.service';
import { formatPrice, formatDuration, formatDateSpanish, formatTime12Hour } from '../../utils/formatters';
import { generateWhatsAppUrl, generateBookingConfirmationMessage } from '../../utils/whatsapp';
import { useBusiness } from '../../context/BusinessContext';
import { updatePageSEO } from '../../utils/seo';

export function AdminAppointmentsPage() {
  const { setSidebarOpen } = useOutletContext();
  const { settings } = useBusiness();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [search, setSearch] = useState('');

  // Selected appointment details modal
  const [selectedAppt, setSelectedAppt] = useState(null);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await appointmentsService.getAllAppointments({
        statusFilter,
        dateFilter
      });
      if (data) setAppointments(data);
    } catch (err) {
      console.error('Error loading appointments in admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updatePageSEO({ title: 'Gestión de Citas' });
    loadAppointments();
  }, [statusFilter, dateFilter]);

  const handleUpdateStatus = async (id, newStatus) => {
    await appointmentsService.updateAppointmentStatus(id, newStatus);
    if (selectedAppt && selectedAppt.id === id) {
      setSelectedAppt(prev => ({ ...prev, status: newStatus }));
    }
    loadAppointments();
  };

  const filtered = appointments.filter(a => {
    const term = search.toLowerCase().trim();
    if (!term) return true;
    return (
      (a.customer_name && a.customer_name.toLowerCase().includes(term)) ||
      (a.customer_phone && a.customer_phone.includes(term)) ||
      (a.service_name && a.service_name.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        onMenuClick={() => setSidebarOpen(true)}
        title="Agenda de Citas"
        subtitle="Monitorea y actualiza las solicitudes de reserva de clientas"
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#EFE5E2] shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search box */}
          <div className="sm:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7974]" />
            <input
              type="text"
              placeholder="Buscar por cliente, teléfono o servicio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F5] border border-[#E8DCD9] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20 text-[#2C2422]"
            />
          </div>

          {/* Date Filter */}
          <div className="sm:col-span-3">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#E8DCD9] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20 text-[#2C2422]"
            />
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF7F5] border border-[#E8DCD9] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20 text-[#2C2422]"
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendientes</option>
              <option value="confirmed">Confirmadas</option>
              <option value="completed">Completadas</option>
              <option value="cancelled">Canceladas</option>
            </select>
          </div>
        </div>

        {(dateFilter || statusFilter !== 'all' || search) && (
          <div className="flex items-center justify-between text-xs text-[#8A7974] pt-2 border-t border-[#F5ECE9]">
            <span>Filtros activos</span>
            <button
              onClick={() => {
                setDateFilter('');
                setStatusFilter('all');
                setSearch('');
              }}
              className="text-[#8C3F52] hover:underline font-medium"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-3xl p-6 border border-[#EFE5E2] shadow-xs">
        {loading ? (
          <LoadingSpinner text="Cargando citas..." />
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center bg-[#FAF7F5] rounded-2xl">
            <p className="text-sm text-[#736662]">No se encontraron citas con los filtros aplicados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAF7F5] text-[#8A7974] text-xs uppercase tracking-wider border-b border-[#EBDCD8]">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Cliente</th>
                  <th className="px-4 py-3">Servicio</th>
                  <th className="px-4 py-3">Fecha & Hora</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3 rounded-r-xl text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5ECE9]">
                {filtered.map((apt) => (
                  <tr key={apt.id} className="hover:bg-[#FAF7F5]/50 transition-colors">
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="font-display font-medium text-[#2C2422]">{apt.customer_name}</p>
                        <div className="flex items-center gap-1.5 text-xs text-[#8A7974]">
                          <Phone className="w-3 h-3 text-[#C59B4E]" />
                          <span>{apt.customer_phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="font-medium text-[#2C2422]">{apt.service_name || apt.services?.name}</p>
                        <span className="text-xs text-[#8C3F52]">{formatPrice(apt.service_price || apt.services?.price)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-[#2C2422]">{formatDateSpanish(apt.appointment_date)}</p>
                        <span className="text-xs text-[#8A7974]">{formatTime12Hour(apt.appointment_time)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={apt.status} />
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedAppt(apt)}
                          className="p-1.5 text-[#5C504C] hover:text-[#8C3F52] hover:bg-[#FAF2F3] rounded-lg transition-colors"
                          title="Ver detalle completo"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {apt.status === 'pending' && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, 'confirmed')}
                            className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 border border-emerald-200"
                            title="Confirmar cita"
                          >
                            Confirmar
                          </button>
                        )}

                        {apt.status === 'confirmed' && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, 'completed')}
                            className="px-2 py-1 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold hover:bg-blue-100 border border-blue-200"
                            title="Marcar completada"
                          >
                            Completar
                          </button>
                        )}

                        {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, 'cancelled')}
                            className="px-2 py-1 rounded-lg bg-rose-50 text-rose-800 text-xs font-semibold hover:bg-rose-100 border border-rose-200"
                            title="Cancelar cita"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* APPOINTMENT DETAILS MODAL */}
      {selectedAppt && (
        <Modal
          isOpen={Boolean(selectedAppt)}
          onClose={() => setSelectedAppt(null)}
          title="Detalles de la Cita"
          subtitle="Información Completa"
          maxWidth="max-w-xl"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-[#FAF7F5] rounded-2xl border border-[#E8DCD9]">
              <div>
                <span className="text-xs text-[#8A7974] block">Estado de la reserva:</span>
                <div className="mt-1">
                  <StatusBadge status={selectedAppt.status} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedAppt.status !== 'confirmed' && selectedAppt.status !== 'completed' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedAppt.id, 'confirmed')}
                  >
                    Confirmar
                  </Button>
                )}
                {selectedAppt.status !== 'cancelled' && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedAppt.id, 'cancelled')}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-white p-5 rounded-2xl border border-[#EFE5E2]">
              <div>
                <span className="text-[#8A7974] block mb-1">Cliente:</span>
                <p className="font-semibold text-sm text-[#2C2422]">{selectedAppt.customer_name}</p>
              </div>
              <div>
                <span className="text-[#8A7974] block mb-1">Teléfono:</span>
                <p className="font-semibold text-sm text-[#2C2422]">{selectedAppt.customer_phone}</p>
              </div>
              {selectedAppt.customer_email && (
                <div className="col-span-2">
                  <span className="text-[#8A7974] block mb-1">Correo electrónico:</span>
                  <p className="font-medium text-[#2C2422]">{selectedAppt.customer_email}</p>
                </div>
              )}
              <div className="col-span-2 pt-2 border-t border-[#F5ECE9]">
                <span className="text-[#8A7974] block mb-1">Tratamiento Solicitado:</span>
                <p className="font-semibold text-base text-[#8C3F52]">{selectedAppt.service_name || selectedAppt.services?.name}</p>
              </div>
              <div>
                <span className="text-[#8A7974] block mb-1">Fecha de la cita:</span>
                <p className="font-medium text-[#2C2422]">{formatDateSpanish(selectedAppt.appointment_date)}</p>
              </div>
              <div>
                <span className="text-[#8A7974] block mb-1">Hora de inicio:</span>
                <p className="font-medium text-[#2C2422]">{formatTime12Hour(selectedAppt.appointment_time)}</p>
              </div>
              <div className="col-span-2 pt-2 border-t border-[#F5ECE9]">
                <span className="text-[#8A7974] block mb-1">Inversión:</span>
                <p className="font-bold text-sm text-[#8C3F52]">{formatPrice(selectedAppt.service_price || selectedAppt.services?.price)}</p>
              </div>
            </div>

            {selectedAppt.notes && (
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
                <span className="font-semibold block mb-1">Notas u observaciones del cliente:</span>
                <p className="italic">{selectedAppt.notes}</p>
              </div>
            )}

            {/* Direct WhatsApp button to customer */}
            <div className="pt-2">
              <a
                href={generateWhatsAppUrl({
                  phone: selectedAppt.customer_phone,
                  message: `Hola ${selectedAppt.customer_name} 💕, te saludo desde By Sandrit para confirmar tu cita de ${selectedAppt.service_name} el día ${formatDateSpanish(selectedAppt.appointment_date)} a las ${formatTime12Hour(selectedAppt.appointment_time)}.`
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-full shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contactar a la clienta por WhatsApp</span>
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
