import React, { useState } from 'react';
import { Database, Info, X, ChevronRight } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';
import { Modal } from './Modal';

export function DemoNoticeBanner() {
  const { isDemoMode, isSupabaseConfigured } = useBusiness();
  const [dismissed, setDismissed] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  if (!isDemoMode || dismissed || isSupabaseConfigured) return null;

  return (
    <>
      <div className="bg-[#5B2C37] text-white text-xs py-2 px-4 flex items-center justify-between shadow-xs select-none">
        <div className="flex items-center gap-2 max-w-5xl mx-auto flex-wrap justify-center text-center">
          <span className="inline-flex items-center gap-1 bg-[#8C3F52] px-2 py-0.5 rounded text-[11px] font-semibold tracking-wider text-[#FAF2F3]">
            <Database className="w-3 h-3 text-[#C59B4E]" /> MODO DEMO ACTIVO
          </span>
          <span className="text-[#F5E2E4]">
            La aplicación está funcionando con catálogo e información demostrativa.
          </span>
          <button
            onClick={() => setShowConfigModal(true)}
            className="underline text-[#E2CFCA] hover:text-white font-medium ml-1 inline-flex items-center gap-0.5 cursor-pointer"
          >
            ¿Cómo conectar Supabase? <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/60 hover:text-white p-1 rounded-sm transition-colors"
          aria-label="Ocultar aviso de demostración"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <Modal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        title="Conexión con Supabase"
        subtitle="Guía de Configuración"
      >
        <div className="space-y-4 text-sm text-[#5C504C]">
          <p>
            La web de <strong>By Sandrit</strong> está 100% preparada para conectarse con tu proyecto en Supabase (PostgreSQL, Auth, RLS y Storage).
          </p>

          <div className="bg-white p-4 rounded-xl border border-[#E8DCD9] space-y-2">
            <h4 className="font-semibold text-[#2C2422] flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#8C3F52]" /> Pasos rápidos:
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#5C504C]">
              <li>Crea un proyecto gratis en <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-[#8C3F52] underline font-medium">supabase.com</a></li>
              <li>Ejecuta el archivo <code className="bg-[#FAF2F3] px-1 py-0.5 rounded text-[#8C3F52]">supabase/schema.sql</code> en el SQL Editor de Supabase.</li>
              <li>Opcional: Ejecuta <code className="bg-[#FAF2F3] px-1 py-0.5 rounded text-[#8C3F52]">supabase/seed.sql</code> para datos iniciales.</li>
              <li>Crea un bucket público llamado <strong>gallery</strong> en Supabase Storage.</li>
              <li>Configura las variables en tu archivo <code className="bg-[#FAF2F3] px-1 py-0.5 rounded text-[#8C3F52]">.env</code>:
                <pre className="bg-[#2C2422] text-[#E8DCD9] p-2 rounded mt-1.5 font-mono text-[11px] overflow-x-auto">
{`VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=tu-anon-key`}
                </pre>
              </li>
            </ol>
          </div>

          <div className="p-3 bg-[#FAF2F3] rounded-xl border border-[#F2D7D9] text-xs text-[#6E2B3C]">
            Mientras tanto, puedes explorar todas las vistas públicas, el agendamiento y el panel administrativo con las credenciales demo.
          </div>
        </div>
      </Modal>
    </>
  );
}
