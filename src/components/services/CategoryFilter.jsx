import React from 'react';
import {
  Sparkles,
  HeartHandshake,
  Feather,
  Eye,
  Flame,
  Palette,
  Hand,
  Gift,
  LayoutGrid
} from 'lucide-react';

const iconMap = {
  Sparkles,
  HeartHandshake,
  Feather,
  Eye,
  Flame,
  Palette,
  Hand,
  Gift,
};

export function CategoryFilter({
  categories = [],
  selectedCategory,
  onSelectCategory
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none no-scrollbar justify-start md:justify-center flex-nowrap sm:flex-wrap">
      <button
        onClick={() => onSelectCategory('all')}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap shrink-0 border ${
          selectedCategory === 'all'
            ? 'bg-[#8C3F52] text-white border-[#8C3F52] shadow-xs'
            : 'bg-white text-[#5C504C] border-[#E8DCD9] hover:border-[#8C3F52] hover:bg-[#FAF2F3]'
        }`}
      >
        <LayoutGrid className="w-3.5 h-3.5" />
        <span>Todos los servicios</span>
      </button>

      {categories.map((cat) => {
        const IconComponent = iconMap[cat.icon] || Sparkles;
        const isSelected = selectedCategory === cat.id || selectedCategory === cat.slug;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap shrink-0 border ${
              isSelected
                ? 'bg-[#8C3F52] text-white border-[#8C3F52] shadow-xs'
                : 'bg-white text-[#5C504C] border-[#E8DCD9] hover:border-[#8C3F52] hover:bg-[#FAF2F3]'
            }`}
          >
            <IconComponent className="w-3.5 h-3.5 text-[#C59B4E]" />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
