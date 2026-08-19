import React from 'react';
import { Menu, User, Bell, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export function AdminHeader({ onMenuClick, title, subtitle }) {
  const { user, isDemoUser } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E8DCD9] px-4 sm:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-[#5C504C] hover:text-[#8C3F52] hover:bg-[#FAF2F3] rounded-lg transition-colors"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-display text-lg sm:text-xl font-semibold text-[#2C2422]">
            {title || 'Panel de Administración'}
          </h1>
          {subtitle && (
            <p className="text-xs text-[#736662] hidden sm:block">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {isDemoUser && (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            Modo Demostración
          </span>
        )}

        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1 text-xs font-medium text-[#8C3F52] hover:text-[#722F40] bg-[#FAF2F3] px-3 py-1.5 rounded-full"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Ver Web
        </Link>

        <div className="flex items-center gap-2 pl-2 border-l border-[#EFE5E2]">
          <img
            src="https://i.postimg.cc/mkg3bwD8/logo-cuadrado.jpg"
            alt="Logo By Sandrit"
            className="w-8 h-8 rounded-full object-cover border border-[#EBDCD8] shrink-0"
          />
          <span className="text-xs font-medium text-[#2C2422] hidden md:inline-block">
            {user?.email || 'admin@bysandrit.com'}
          </span>
        </div>
      </div>
    </header>
  );
}
