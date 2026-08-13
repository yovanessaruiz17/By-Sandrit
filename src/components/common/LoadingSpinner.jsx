import React from 'react';
import { Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export function LoadingSpinner({ text = 'Cargando...', fullScreen = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-[#F2D7D9] animate-pulse"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#8C3F52] border-r-[#C59B4E] animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-[#C59B4E] animate-bounce" />
        </div>
      </div>
      <p className="text-sm font-medium text-[#685D59] tracking-wider uppercase">{text}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FAF7F5]">
        {content}
      </div>
    );
  }

  return content;
}

export function EmptyState({
  icon: Icon = Sparkles,
  title = 'No hay elementos para mostrar',
  message = 'Aún no se han registrado datos en esta sección.',
  actionLabel,
  onAction,
  className = ''
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center bg-white/70 border border-[#EFE5E2] rounded-2xl max-w-lg mx-auto ${className}`}>
      <div className="w-14 h-14 rounded-full bg-[#FAF2F3] text-[#8C3F52] flex items-center justify-center mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-display text-xl text-[#2C2422] mb-2">{title}</h3>
      <p className="text-sm text-[#736662] mb-6 max-w-sm">{message}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function ErrorState({
  title = 'Ocurrió un inconveniente',
  message = 'No pudimos cargar la información en este momento.',
  onRetry,
  className = ''
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-rose-50/70 border border-rose-200/80 rounded-2xl max-w-lg mx-auto ${className}`}>
      <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="font-display text-lg text-rose-900 mb-1">{title}</h3>
      <p className="text-sm text-rose-700 mb-4">{message}</p>
      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          icon={RefreshCw}
        >
          Reintentar
        </Button>
      )}
    </div>
  );
}
