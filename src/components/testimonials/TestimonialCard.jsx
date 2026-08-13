import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

export function TestimonialCard({ testimonial }) {
  const rating = Number(testimonial.rating) || 5;

  return (
    <div className="relative flex flex-col justify-between bg-white rounded-2xl p-6 sm:p-7 border border-[#EFE5E2] shadow-xs hover:shadow-md transition-all duration-300">
      {/* Decorative quote icon */}
      <Quote className="absolute top-6 right-6 w-8 h-8 text-[#F2D7D9] -scale-x-100 opacity-60 pointer-events-none" />

      <div>
        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-4 text-[#C59B4E]">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? 'fill-[#C59B4E] text-[#C59B4E]' : 'text-stone-300'
              }`}
            />
          ))}
        </div>

        {/* Comment */}
        <p className="text-sm sm:text-base text-[#5C504C] leading-relaxed italic mb-6 font-light">
          "{testimonial.comment}"
        </p>
      </div>

      {/* Customer info */}
      <div className="pt-4 border-t border-[#F7EFEF] flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#FAF2F3] text-[#8C3F52] border border-[#F2D7D9] flex items-center justify-center font-bold text-sm shrink-0">
          {testimonial.customer_name?.charAt(0) || 'C'}
        </div>
        <div className="min-w-0">
          <h4 className="font-display text-sm font-semibold text-[#2C2422] truncate">
            {testimonial.customer_name}
          </h4>
          {testimonial.service_name && (
            <span className="text-xs text-[#8C3F52] flex items-center gap-1 truncate font-medium">
              <Sparkles className="w-3 h-3 text-[#C59B4E] shrink-0" />
              {testimonial.service_name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function TestimonialGrid({ testimonials = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((t) => (
        <TestimonialCard key={t.id} testimonial={t} />
      ))}
    </div>
  );
}
