import React from 'react';
import {
  Download,
  Share2,
  PlusSquare,
  Sparkles,
  Smartphone,
  CheckCircle2,
  X,
  ExternalLink,
  Laptop,
  Check
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { usePwa } from '../../context/PwaContext';

export function PwaInstallModal({ isOpen, onClose }) {
  const { isIOS, deferredPrompt, triggerInstall, isInstalled } = usePwa();

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await triggerInstall();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Instalar BY SANDRIT"
      subtitle="Aplicación Web Progresiva (PWA)"
      maxWidth="max-w-lg"
    >
      <div className="space-y-6">
        {/* App Hero / Icon Header */}
        <div className="flex items-center gap-4 p-4 bg-[#FAF2F3] border border-[#F2D7D9] rounded-2xl">
          <div className="w-16 h-16 rounded-2xl bg-white p-1 shadow-md border border-[#C59B4E]/40 flex items-center justify-center shrink-0">
            <img
              src="https://i.postimg.cc/mkg3bwD8/logo-cuadrado.jpg"
              alt="BY SANDRIT Logo"
              className="w-full h-full rounded-xl object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-base sm:text-lg text-[#2C2422]">
                BY SANDRIT
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C59B4E] text-white">
                PWA
              </span>
            </div>
            <p className="text-xs text-[#736662] mt-0.5 leading-relaxed">
              Instala la aplicación en tu teléfono o computadora para acceder en 1 toque a tus reservas y al panel.
            </p>
          </div>
        </div>

        {/* Benefits list */}
        <div className="grid grid-cols-2 gap-3 text-xs text-[#5C504C]">
          <div className="p-3 bg-[#FAF7F5] rounded-xl border border-[#E8DCD9] flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#8C3F52] shrink-0 mt-0.5" />
            <span>Acceso directo desde tu pantalla de inicio</span>
          </div>
          <div className="p-3 bg-[#FAF7F5] rounded-xl border border-[#E8DCD9] flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#8C3F52] shrink-0 mt-0.5" />
            <span>Pantalla completa sin barra de navegación</span>
          </div>
          <div className="p-3 bg-[#FAF7F5] rounded-xl border border-[#E8DCD9] flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#8C3F52] shrink-0 mt-0.5" />
            <span>Carga ultrarrápida y consumo mínimo de datos</span>
          </div>
          <div className="p-3 bg-[#FAF7F5] rounded-xl border border-[#E8DCD9] flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#8C3F52] shrink-0 mt-0.5" />
            <span>No ocupa espacio en la memoria de tu celular</span>
          </div>
        </div>

        {/* Installation Instructions depending on platform */}
        {isInstalled ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-emerald-900">
              ¡La aplicación ya está instalada!
            </h4>
            <p className="text-xs text-emerald-700">
              Puedes abrirla directamente desde los iconos de tus aplicaciones o pantalla de inicio.
            </p>
          </div>
        ) : deferredPrompt ? (
          /* Direct 1-Click Install for Android / Chrome / Edge */
          <div className="space-y-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={handleInstallClick}
              icon={Download}
              className="w-full justify-center text-sm py-3.5 bg-[#8C3F52] hover:bg-[#722F40]"
            >
              Instalar Aplicación en 1 Clic
            </Button>
            <p className="text-[11px] text-center text-[#736662]">
              Se agregará el icono oficial de BY SANDRIT a tus aplicaciones.
            </p>
          </div>
        ) : isIOS ? (
          /* iOS Safari Step-by-Step Instructions */
          <div className="space-y-3 bg-[#FAF7F5] p-4 rounded-2xl border border-[#E8DCD9]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C3F52] flex items-center gap-1.5">
              <Smartphone className="w-4 h-4" />
              <span>Instrucciones para iPhone / iPad (Safari)</span>
            </h4>

            <ol className="space-y-2.5 text-xs text-[#2C2422]">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#8C3F52] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  Toca el botón <strong>Compartir</strong> <Share2 className="w-3.5 h-3.5 inline mx-1 text-sky-600" /> en la barra inferior de Safari.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#8C3F52] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  Desplázate hacia abajo y selecciona <strong>"Agregar a pantalla de inicio"</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-[#8C3F52]" />.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#8C3F52] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  Toca <strong>"Agregar"</strong> en la esquina superior derecha. ¡Listo!
                </span>
              </li>
            </ol>
          </div>
        ) : (
          /* Desktop / General Browser Guide */
          <div className="space-y-3 bg-[#FAF7F5] p-4 rounded-2xl border border-[#E8DCD9]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C3F52] flex items-center gap-1.5">
              <Laptop className="w-4 h-4" />
              <span>Instalar desde tu Navegador</span>
            </h4>

            <p className="text-xs text-[#5C504C] leading-relaxed">
              En tu navegador (Chrome, Edge, Brave o Firefox), haz clic en el icono de <strong>Instalar</strong> <Download className="w-3.5 h-3.5 inline mx-1 text-[#8C3F52]" /> en la barra de direcciones superior o selecciona <em>"Instalar BY SANDRIT"</em> en el menú de opciones (tres puntos ⋮).
            </p>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
