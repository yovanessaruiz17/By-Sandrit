import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({
  title = 'No se encontraron resultados',
  message = 'Intenta ajustar tus criterios de búsqueda o filtros.',
  actionLabel,
  onAction,
  icon: Icon = Sparkles
}) {
  return (
    <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#EFE5E2] max-w-lg mx-auto shadow-xs">
      <div className="w-14 h-14 rounded-2xl bg-[#FAF2F3] text-[#8C3F52] flex items-center justify-center mx-auto mb-4 border border-[#F2D7D9]">
        <Icon className="w-7 h-7 text-[#8C3F52]" />
      </div>
      <h3 className="font-display text-lg font-semibold text-[#2C2422] mb-1">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-[#736662] mb-6 max-w-sm mx-auto font-light leading-relaxed">
        {message}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
