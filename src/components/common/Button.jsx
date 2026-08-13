import React from 'react';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  id,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-full";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs tracking-wide gap-1.5",
    md: "px-6 py-2.5 text-sm tracking-wide gap-2",
    lg: "px-8 py-3.5 text-base tracking-wider gap-2.5 shadow-sm hover:shadow-md"
  };

  const variantStyles = {
    primary: "bg-[#8C3F52] hover:bg-[#722F40] text-white focus:ring-[#8C3F52]/50 shadow-sm hover:shadow active:scale-[0.99]",
    secondary: "bg-[#F3E5E7] hover:bg-[#EBD6D9] text-[#6E2B3C] focus:ring-[#8C3F52]/30 active:scale-[0.99]",
    gold: "bg-gradient-to-r from-[#C59B4E] to-[#B3873B] hover:from-[#B3873B] hover:to-[#9E7329] text-white focus:ring-[#C59B4E]/50 shadow-sm",
    outline: "border border-[#D4B8B1] hover:border-[#8C3F52] text-[#5B2C37] hover:bg-[#FAF2F3] bg-transparent focus:ring-[#8C3F52]/20",
    outlineGold: "border border-[#C59B4E]/60 hover:border-[#C59B4E] text-[#9E7329] hover:bg-[#FAF7F2] bg-transparent",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500/40",
    text: "text-[#6E2B3C] hover:text-[#8C3F52] hover:bg-[#FAF2F3] bg-transparent shadow-none"
  };

  return (
    <button
      id={id}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          <span className="whitespace-nowrap">{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
}
