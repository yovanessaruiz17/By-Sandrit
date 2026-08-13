import React from 'react';
import { Sparkles } from 'lucide-react';

export function SectionTitle({
  subtitle,
  title,
  description,
  align = 'center',
  className = '',
  withGoldOrnament = true,
  id
}) {
  const alignClasses = {
    center: 'text-center items-center mx-auto',
    left: 'text-left items-start',
    right: 'text-right items-end ml-auto'
  };

  return (
    <div id={id} className={`flex flex-col max-w-3xl mb-12 ${alignClasses[align]} ${className}`}>
      {subtitle && (
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-[#F6E8EB] text-[#8C3F52] text-xs font-semibold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#C59B4E]" />
          <span>{subtitle}</span>
        </div>
      )}

      {title && (
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#2C2422] font-normal tracking-tight leading-tight">
          {title}
        </h2>
      )}

      {withGoldOrnament && (
        <div className="flex items-center gap-2 my-4">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#C59B4E]"></div>
          <div className="w-2 h-2 rotate-45 border border-[#C59B4E] bg-[#FAF7F5]"></div>
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#C59B4E]"></div>
        </div>
      )}

      {description && (
        <p className="text-[#685D59] text-base sm:text-lg leading-relaxed mt-1 font-light max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
