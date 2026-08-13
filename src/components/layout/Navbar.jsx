import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, Calendar, Heart, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';
import { useBusiness } from '../../context/BusinessContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useBusiness();

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
        <Link to="/" className="group flex flex-col focus:outline-none">
          <div className="flex items-center gap-1.5">
            <span className="font-display tracking-[0.2em] text-xl sm:text-2xl font-semibold text-[#2C2422] group-hover:text-[#8C3F52] transition-colors">
              BY SANDRIT
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59B4E]"></span>
          </div>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#8C3F52] font-medium -mt-0.5">
            Servicios Estéticos & Cosméticos
          </span>
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
          <div className="pt-2 border-t border-[#EFE5E2]">
            <Link to="/agendar" className="block w-full">
              <Button variant="primary" size="md" className="w-full" icon={Calendar}>
                Agendar cita ahora
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
