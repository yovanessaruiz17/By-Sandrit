import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  Sparkles,
  User,
  ArrowRight,
  TrendingUp,
  Image as ImageIcon,
  MessageSquareQuote,
  Settings,
  RefreshCw,
  Plus,
  Smartphone,
  Download
} from 'lucide-react';
import { AdminHeader } from '../../components/layout/AdminHeader';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { appointmentsService } from '../../services/appointments.service';
import { servicesService } from '../../services/services.service';
import { usePwa } from '../../context/PwaContext';
import { formatPrice, formatTime12Hour, formatShortDate } from '../../utils/formatters';
import { updatePageSEO } from '../../utils/seo';

export function AdminDashboardPage() {
  const { setSidebarOpen } = useOutletContext();
  const [appointments, setAppointments] = useState([]);
  const [servicesCount, setServicesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [apptRes, srvRes] = await Promise.all([
        appointmentsService.getAllAppointments(),
        servicesService.getAllServices(true)
      ]);

      if (apptRes.data) setAppointments(apptRes.data);
      if (srvRes.data) setServicesCount(srvRes.data.filter(s => s.is_active).length);
    } catch (err) {
      console.error('Error loading admin dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updatePageSEO({ title: 'Dashboard Administrativo' });
    loadDashboard();
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.appointment_date === todayStr);
  const pendingAppointments = appointments.filter(a => a.status === 'pending');
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed');

  const handleUpdateStatus = async (id, newStatus) => {
    await appointmentsService.updateAppointmentStatus(id, newStatus);
    loadDashboard();
  };

  return (
    <div className="space-y-8">
      <AdminHeader
        onMenuClick={() => setSidebarOpen(true)}
        title="Dashboard General"
        subtitle="Resumen de actividad y estado de citas"
      />

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#EFE5E2] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A7974] block">
              Citas para Hoy
            </span>
            <p className="font-display text-3xl font-bold text-[#2C2422] mt-1">
              {todayAppointments.length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#FAF2F3] text-[#8C3F52] flex items-center justify-center">
            <CalendarDays className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#EFE5E2] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 block">
              Citas Pendientes
            </span>
            <p className="font-display text-3xl font-bold text-amber-900 mt-1">
              {pendingAppointments.length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#EFE5E2] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 block">
              Citas Confirmadas
            </span>
            <p className="font-display text-3xl font-bold text-emerald-900 mt-1">
              {confirmedAppointments.length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#EFE5E2] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A7974] block">
              Servicios Activos
            </span>
            <p className="font-display text-3xl font-bold text-[#2C2422] mt-1">
              {servicesCount}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#C59B4E] flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          to="/admin/servicios"
          className="p-4 bg-white hover:bg-[#FAF2F3] border border-[#E8DCD9] hover:border-[#8C3F52] rounded-2xl flex items-center gap-3 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FAF2F3] group-hover:bg-[#8C3F52] text-[#8C3F52] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-left min-w-0">
            <h4 className="font-display text-sm font-semibold text-[#2C2422]">Servicios</h4>
            <p className="text-[11px] text-[#736662] truncate">Gestionar catálogo</p>
          </div>
        </Link>

        <Link
          to="/admin/citas"
          className="p-4 bg-white hover:bg-[#FAF2F3] border border-[#E8DCD9] hover:border-[#8C3F52] rounded-2xl flex items-center gap-3 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FAF2F3] group-hover:bg-[#8C3F52] text-[#8C3F52] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div className="text-left min-w-0">
            <h4 className="font-display text-sm font-semibold text-[#2C2422]">Agenda & Citas</h4>
            <p className="text-[11px] text-[#736662] truncate">Control de reservas</p>
          </div>
        </Link>

        <Link
          to="/admin/galeria"
          className="p-4 bg-white hover:bg-[#FAF2F3] border border-[#E8DCD9] hover:border-[#8C3F52] rounded-2xl flex items-center gap-3 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FAF2F3] group-hover:bg-[#8C3F52] text-[#8C3F52] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div className="text-left min-w-0">
            <h4 className="font-display text-sm font-semibold text-[#2C2422]">Galería</h4>
            <p className="text-[11px] text-[#736662] truncate">Subir fotos de trabajos</p>
          </div>
        </Link>

        <Link
          to="/admin/configuracion"
          className="p-4 bg-white hover:bg-[#FAF2F3] border border-[#E8DCD9] hover:border-[#8C3F52] rounded-2xl flex items-center gap-3 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FAF2F3] group-hover:bg-[#8C3F52] text-[#8C3F52] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
            <Settings className="w-5 h-5" />
          </div>
          <div className="text-left min-w-0">
            <h4 className="font-display text-sm font-semibold text-[#2C2422]">Configuración</h4>
            <p className="text-[11px] text-[#736662] truncate">Horarios y negocio</p>
          </div>
        </Link>
      </div>

      {/* Recent Appointments Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE5E2] shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl text-[#2C2422] font-semibold">
              Últimas Citas Registradas
            </h3>
            <p className="text-xs text-[#736662] mt-0.5">
              Gestiona el estado y atiende solicitudes entrantes.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadDashboard}
              className="p-2 text-[#736662] hover:text-[#8C3F52] hover:bg-[#FAF2F3] rounded-full transition-colors"
              title="Actualizar datos"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link to="/admin/citas">
              <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right">
                Ver todas
              </Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner text="Cargando citas..." />
        ) : appointments.length === 0 ? (
          <div className="p-8 text-center bg-[#FAF7F5] rounded-2xl border border-[#EFE5E2]">
            <p className="text-sm text-[#736662]">Aún no hay citas registradas en el sistema.</p>
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
                {appointments.slice(0, 5).map((apt) => (
                  <tr key={apt.id} className="hover:bg-[#FAF7F5]/50 transition-colors">
                    <td className="px-4 py-4 font-medium text-[#2C2422]">
                      <div>
                        <p>{apt.customer_name}</p>
                        <span className="text-xs text-[#8A7974] font-normal">{apt.customer_phone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[#5C504C]">
                      <div>
                        <p className="font-medium text-[#2C2422]">{apt.service_name || apt.services?.name}</p>
                        <span className="text-xs text-[#8C3F52]">{formatPrice(apt.service_price || apt.services?.price)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[#5C504C] whitespace-nowrap">
                      <div>
                        <p className="font-medium text-[#2C2422]">{formatShortDate(apt.appointment_date)}</p>
                        <span className="text-xs text-[#8A7974]">{formatTime12Hour(apt.appointment_time)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={apt.status} />
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {apt.status === 'pending' && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, 'confirmed')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 border border-emerald-200"
                          >
                            Confirmar
                          </button>
                        )}
                        {apt.status === 'confirmed' && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, 'completed')}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold hover:bg-blue-100 border border-blue-200"
                          >
                            Completar
                          </button>
                        )}
                        {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, 'cancelled')}
                            className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 text-xs font-semibold hover:bg-rose-100 border border-rose-200"
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
    </div>
  );
}
