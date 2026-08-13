import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  CalendarDays,
  Image as ImageIcon,
  MessageSquareQuote,
  Settings as SettingsIcon,
  ExternalLink,
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function AdminSidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { logout, isDemoUser } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Citas & Reservas', path: '/admin/citas', icon: CalendarDays },
    { label: 'Servicios', path: '/admin/servicios', icon: Sparkles },
    { label: 'Galería de Fotos', path: '/admin/galeria', icon: ImageIcon },
    { label: 'Testimonios', path: '/admin/testimonios', icon: MessageSquareQuote },
    { label: 'Configuración & Horarios', path: '/admin/configuracion', icon: SettingsIcon },
  ];

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden backdrop-blur-xs"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#261E1C] text-[#E5D7D3] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-[#3D312E] flex items-center justify-between">
          <Link to="/admin" className="flex flex-col">
            <span className="font-display text-lg tracking-widest text-white font-bold">
              BY SANDRIT
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#C97A8B]">
              Panel Administrativo
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-[#B8A7A2] hover:text-white"
            aria-label="Cerrar menú lateral"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User indicator */}
        <div className="px-6 py-3 bg-[#1F1816] text-xs flex items-center justify-between border-b border-[#3D312E]">
          <span className="text-[#B8A7A2] truncate">Sandrit Ríos M.</span>
          {isDemoUser ? (
            <span className="px-1.5 py-0.5 rounded bg-amber-900/60 text-amber-300 text-[10px] font-semibold">
              DEMO
            </span>
          ) : (
            <span className="px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 text-[10px] font-semibold">
              SUPABASE
            </span>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 grow overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-[#8C3F52] text-white shadow-sm'
                    : 'text-[#B8A7A2] hover:text-white hover:bg-[#352B28]'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#C59B4E]' : 'text-[#A69590]'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#3D312E] space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium text-[#B8A7A2] hover:text-white hover:bg-[#352B28] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" /> Ver Sitio Web
            </span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
}
