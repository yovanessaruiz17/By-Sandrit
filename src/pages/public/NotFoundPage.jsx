import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Sparkles } from 'lucide-react';
import { Button } from '../../components/common/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#EFE5E2] shadow-sm text-center">
        <div className="w-16 h-16 rounded-full bg-[#FAF2F3] text-[#8C3F52] flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-[#C59B4E]" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3F52] block mb-1">
          Error 404
        </span>
        <h1 className="font-display text-3xl text-[#2C2422] font-semibold mb-3">
          Página no encontrada
        </h1>
        <p className="text-sm text-[#685D59] mb-8 leading-relaxed font-light">
          La sección o dirección que buscas no existe o ha sido trasladada.
        </p>
        <Link to="/">
          <Button variant="primary" size="md" icon={Home} className="w-full">
            Regresar al Inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
