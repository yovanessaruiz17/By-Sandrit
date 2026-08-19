import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Calendar, Heart, ShieldCheck, Download, Smartphone } from 'lucide-react';
import { Button } from '../common/Button';
import { useBusiness } from '../../context/BusinessContext';
import { usePwa } from '../../context/PwaContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useBusiness();
  const { isInstalled, setShowInstallModal, triggerInstall, isInstallable } = usePwa();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Galería', path: '/galeria' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F5]/95 backdrop-blur-md shadow-xs border-b border-[#EBDCD8] py-3'
          : 'bg-[#FAF7F5] border-b border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none">
          <img
            src="https://i.postimg.cc/mkg3bwD8/logo-cuadrado.jpg"
            alt="Logo By Sandrit"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shadow-2xs border border-[#EBDCD8] group-hover:scale-105 transition-transform shrink-0"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display tracking-[0.18em] text-lg sm:text-xl font-bold text-[#2C2422] group-hover:text-[#8C3F52] transition-colors leading-tight">
                BY SANDRIT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59B4E]"></span>
            </div>
            <span className="text-[9px] sm:text-[10.5px] uppercase tracking-[0.22em] text-[#8C3F52] font-semibold -mt-0.5">
              Servicios Estéticos & Cosméticos
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm tracking-wide font-medium transition-colors py-1 ${
                isActive(link.path)
                  ? 'text-[#8C3F52] font-semibold'
                  : 'text-[#5C504C] hover:text-[#8C3F52]'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8C3F52] rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {!isInstalled && (
            <button
              onClick={() => {
                if (isInstallable) triggerInstall();
                else setShowInstallModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#8C3F52] hover:bg-[#FAF2F3] border border-[#F2D7D9] rounded-xl transition-all shadow-2xs hover:shadow-xs cursor-pointer"
              title="Instalar como Aplicación (PWA)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Instalar App</span>
            </button>
          )}

          <Link to="/agendar">
            <Button
              id="btn-nav-agendar"
              variant="primary"
              size="sm"
              icon={Calendar}
            >
              Agendar cita
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link to="/agendar">
            <Button variant="primary" size="sm" className="px-3 py-1.5 text-xs">
              Agendar
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#5C504C] hover:text-[#8C3F52] hover:bg-[#F6E8EB] rounded-lg transition-colors focus:outline-none"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F5] border-b border-[#EBDCD8] px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#F6E8EB] text-[#8C3F52] font-semibold'
                    : 'text-[#5C504C] hover:bg-white/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-2 border-t border-[#EFE5E2] space-y-2">
            <Link to="/agendar" className="block w-full">
              <Button variant="primary" size="md" className="w-full" icon={Calendar}>
                Agendar cita ahora
              </Button>
            </Link>

            {!isInstalled && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (isInstallable) triggerInstall();
                  else setShowInstallModal(true);
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#8C3F52] bg-[#FAF2F3] border border-[#F2D7D9] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Instalar Aplicación en Celular</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
