import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';
import { usePwa } from '../../context/PwaContext';

export function PwaInstallBanner() {
  const { isInstalled, isInstallable, isIOS, setShowInstallModal, triggerInstall } = usePwa();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem('by_sandrit_pwa_dismissed') === 'true';
    if (isDismissed) {
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('by_sandrit_pwa_dismissed', 'true');
  };

  // If already installed or dismissed, do not show bottom banner
  if (isInstalled || dismissed) {
    return null;
  }

  // Only show if browser supports install or is iOS
  if (!isInstallable && !isIOS) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 animate-fade-in">
      <div className="bg-[#2C2422] text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-[#4A3B37] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-white p-0.5 shrink-0 flex items-center justify-center shadow-xs border border-[#C59B4E]/30">
            <img
              src="/logo.jpg"
              alt="Logo By Sandrit"
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-xs sm:text-sm font-semibold truncate text-white">
                Instalar App BY SANDRIT
              </span>
            </div>
            <p className="text-[11px] text-[#D8C7C3] truncate">
              Accede más rápido desde tu pantalla
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              if (isInstallable) {
                triggerInstall();
              } else {
                setShowInstallModal(true);
              }
            }}
            className="px-3 py-1.5 bg-[#8C3F52] hover:bg-[#A34E64] text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Instalar</span>
          </button>

          <button
            onClick={handleDismiss}
            title="Cerrar"
            className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
