import React from 'react';
import { Check } from 'lucide-react';

export function StepIndicator({ steps, currentStep }) {
  return (
    <div className="w-full py-4 mb-8">
      {/* Desktop step indicator */}
      <div className="hidden md:flex items-center justify-between max-w-4xl mx-auto relative">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#E8DCD9] -translate-y-1/2 z-0"></div>
        {steps.map((step, idx) => {
          const stepNumber = idx + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;

          return (
            <div key={idx} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 ${
                  isCompleted
                    ? 'bg-[#8C3F52] border-[#8C3F52] text-white shadow-xs'
                    : isCurrent
                    ? 'bg-white border-[#8C3F52] text-[#8C3F52] ring-4 ring-[#8C3F52]/20 shadow-xs'
                    : 'bg-[#FAF7F5] border-[#D4B8B1] text-[#9A8B86]'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
              </div>
              <span
                className={`text-xs mt-2 font-medium tracking-wide transition-colors text-center max-w-[90px] ${
                  isCurrent
                    ? 'text-[#8C3F52] font-semibold'
                    : isCompleted
                    ? 'text-[#2C2422]'
                    : 'text-[#9A8B86]'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile step indicator */}
      <div className="md:hidden flex items-center justify-between px-2 bg-white/70 p-3 rounded-2xl border border-[#EFE5E2]">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-[#8C3F52] text-white text-xs font-bold flex items-center justify-center">
            {currentStep}
          </span>
          <div>
            <p className="text-[10px] uppercase font-semibold text-[#8C3F52] tracking-wider">
              Paso {currentStep} de {steps.length}
            </p>
            <p className="text-sm font-display font-medium text-[#2C2422]">
              {steps[currentStep - 1]?.title}
            </p>
          </div>
        </div>
        <div className="w-24 bg-[#E8DCD9] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#8C3F52] h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
