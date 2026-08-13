import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export function Lightbox({
  isOpen,
  onClose,
  items = [],
  currentIndex = 0,
  onPrev,
  onNext
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !items.length) return null;

  const currentItem = items[currentIndex] || items[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
        aria-label="Cerrar lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {items.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <div className="flex flex-col items-center max-w-4xl max-h-[90vh] w-full text-white">
        <div className="relative overflow-hidden rounded-xl max-h-[75vh] flex items-center justify-center bg-black/40">
          <img
            src={currentItem.image_url}
            alt={currentItem.title || 'Trabajo realizado por By Sandrit'}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
          />
        </div>

        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-xs text-[#EAD0C7] mb-1">
            <Sparkles className="w-3 h-3 text-[#C59B4E]" />
            <span>{currentItem.category || 'Galería'}</span>
          </div>
          <h4 className="font-display text-lg text-white font-medium">{currentItem.title}</h4>
          {currentItem.description && (
            <p className="text-xs text-white/70 mt-1 max-w-md">{currentItem.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
