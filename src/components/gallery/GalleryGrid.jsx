import React from 'react';
import { Eye, Sparkles } from 'lucide-react';

export function GalleryCard({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden bg-[#FAF2F3] cursor-pointer border border-[#EFE5E2] hover:border-[#D4B8B1] shadow-xs hover:shadow-xl transition-all duration-300 aspect-4/5 sm:aspect-square"
    >
      <img
        src={item.image_url}
        alt={item.title || 'Trabajo estético realizado por By Sandrit'}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80';
        }}
      />

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
        <div className="flex items-center gap-1.5 text-xs text-[#EAD0C7] font-medium mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#C59B4E]" />
          <span>{item.category || 'Estética'}</span>
        </div>
        <h4 className="font-display text-base sm:text-lg font-medium leading-snug text-white">
          {item.title}
        </h4>
        {item.description && (
          <p className="text-xs text-white/80 line-clamp-2 mt-1 font-light">
            {item.description}
          </p>
        )}
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#E2CFCA] font-medium">
          <Eye className="w-3.5 h-3.5" /> Ampliar fotografía
        </div>
      </div>
    </div>
  );
}

export function GalleryGrid({ items = [], onSelectImage }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {items.map((item, index) => (
        <GalleryCard
          key={item.id || index}
          item={item}
          onClick={() => onSelectImage(index)}
        />
      ))}
    </div>
  );
}
