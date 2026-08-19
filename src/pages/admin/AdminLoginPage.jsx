import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, Sparkles, ArrowRight, AlertCircle, ShieldCheck, KeyRound } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { updatePageSEO } from '../../utils/seo';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isSupabaseConfigured } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    updatePageSEO({
      title: 'Acceso Administrativo',
      description: 'Inicio de sesión para la administración de By Sandrit.'
    });
  }, []);

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Credenciales incorrectas');
    }
  };

  const handleFillDemoCredentials = () => {
    setEmail('admin@bysandrit.com');
    setPassword('sandrit2026');
  };

  return (
    <div className="min-h-screen bg-[#261E1C] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full">
        {/* Brand header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center group">
            <img
              src="/logo.jpg"
              alt="Logo By Sandrit"
              className="w-20 h-20 rounded-2xl object-cover p-1 bg-white shadow-lg border border-[#C59B4E]/40 mb-3 group-hover:scale-105 transition-transform"
            />
            <div className="flex items-center gap-1.5 mb-1">
              <span className="font-display tracking-[0.2em] text-2xl sm:text-3xl font-bold text-white group-hover:text-[#C97A8B] transition-colors">
                BY SANDRIT
              </span>
              <span className="w-2 h-2 rounded-full bg-[#C59B4E]"></span>
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C97A8B] font-semibold">
              Panel Administrativo
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#3D312E]/20 space-y-6">
          <div>
            <h2 className="font-display text-2xl text-[#2C2422] font-semibold">
              Iniciar Sesión
            </h2>
            <p className="text-xs sm:text-sm text-[#736662] mt-1 font-light">
              Ingresa tus credenciales para gestionar citas, servicios y configuración.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7974]" />
                <input
                  type="email"
                  required
                  placeholder="admin@bysandrit.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20 text-[#2C2422]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7974]" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF7F5] border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20 text-[#2C2422]"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="w-full mt-2"
              icon={ArrowRight}
              iconPosition="right"
            >
              Entrar al Panel
            </Button>
          </form>

          {/* Demo helper */}
          {!isSupabaseConfigured && (
            <div className="pt-4 border-t border-[#EFE5E2] text-center space-y-2">
              <p className="text-[11px] text-[#8A7974]">
                Modo demostración activo (Sin Supabase conectado)
              </p>
              <button
                type="button"
                onClick={handleFillDemoCredentials}
                className="inline-flex items-center gap-1.5 text-xs text-[#8C3F52] hover:text-[#722F40] font-semibold cursor-pointer underline"
              >
                <KeyRound className="w-3.5 h-3.5" /> Usar credenciales demo de prueba
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-[#B8A7A2] hover:text-white transition-colors">
            ← Volver al sitio público de By Sandrit
          </Link>
        </div>
      </div>
    </div>
  );
}
