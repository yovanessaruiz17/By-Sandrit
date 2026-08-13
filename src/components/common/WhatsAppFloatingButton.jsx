import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';
import { generateWhatsAppUrl, generateGeneralInquiryMessage } from '../../utils/whatsapp';

export function WhatsAppFloatingButton() {
  const { settings } = useBusiness();
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);

  const phone = settings?.whatsapp || '3127654780';
  const waUrl = generateWhatsAppUrl({
    phone,
    message: generateGeneralInquiryMessage()
  });

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      {/* Tooltip speech bubble */}
      {isOpenTooltip && (
        <div className="relative bg-white rounded-2xl p-4 shadow-xl border border-[#E8DCD9] max-w-xs animate-fade-in text-[#2C2422]">
          <button
            onClick={() => setIsOpenTooltip(false)}
            className="absolute top-2 right-2 text-[#9A8B86] hover:text-[#2C2422]"
            aria-label="Cerrar tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="text-xs font-semibold text-[#8C3F52] mb-1">¡Hola! 💕 ¿Deseas agendar o tienes dudas?</p>
          <p className="text-xs text-[#685D59] mb-3">Escríbenos a WhatsApp y te responderemos en minutos.</p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full py-2 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-medium rounded-full shadow-sm transition-all"
          >
            Abrir chat directo
          </a>
        </div>
      )}

      {/* Main floating circle */}
      <a
        id="btn-floating-whatsapp"
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsOpenTooltip(true)}
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Escribir por WhatsApp a By Sandrit"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
}
