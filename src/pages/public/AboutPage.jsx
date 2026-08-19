import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Shield, Award, Check, Target, Eye, Compass, Calendar, ArrowRight } from 'lucide-react';
import { SectionTitle } from '../../components/common/SectionTitle';
import { Button } from '../../components/common/Button';
import { useBusiness } from '../../context/BusinessContext';
import { updatePageSEO } from '../../utils/seo';

export function AboutPage() {
  const { settings } = useBusiness();

  useEffect(() => {
    updatePageSEO({
      title: 'Quiénes Somos | Sandrit Ríos Molinares',
      description: 'Conoce la historia, misión, visión y valores de By Sandrit — Servicios Estéticos & Cosméticos dirigidos por Sandrit Ríos Molinares.',
      canonicalPath: '/nosotros'
    });
  }, []);

  const valuesList = [
    { title: 'Calidad e Higiene', desc: 'Protocolos de bioseguridad estrictos con insumos desechables y productos de alta gama.' },
    { title: 'Atención Personalizada', desc: 'Cada piel y cuerpo es único. Diseñamos tratamientos adaptados a tus necesidades.' },
    { title: 'Empatía y Calidez', desc: 'Un espacio tranquilo donde te sientas escuchada, cómoda y consentida.' },
    { title: 'Pasión por la Belleza', desc: 'Amor por el arte de la estética, el visagismo y el cuidado armónico.' },
    { title: 'Compromiso y Puntualidad', desc: 'Respetamos tu tiempo y nos esforzamos en brindarte la mejor experiencia.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-20">
      {/* Intro & Story */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6E8EB] text-[#8C3F52] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B4E]" />
            <span>Nuestra Historia & Esencia</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#2C2422] font-normal leading-tight">
            Tu belleza, nuestro propósito.
          </h1>

          <p className="text-sm sm:text-base text-[#5C504C] leading-relaxed font-light">
            {settings?.about_story ||
              'By Sandrit nace de la pasión y vocación de Sandrit Ríos Molinares por el cuidado estético integral, combinando técnicas avanzadas, productos de alta calidad y un trato cálido y personalizado para realzar la belleza natural y brindar momentos de bienestar.'}
          </p>

          <p className="text-sm sm:text-base text-[#5C504C] leading-relaxed font-light">
            Entendemos que el cuidado personal no es solo verse bien, sino sentirse en armonía y renovada. Por ello, creamos un ambiente íntimo donde cada detalle ha sido pensado para consentirte.
          </p>

          <div className="pt-2">
            <Link to="/agendar">
              <Button variant="primary" size="md" icon={Calendar}>
                Agendar una experiencia
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 bg-[#FAF2F3]">
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80"
              alt="Sandrit Ríos Molinares - By Sandrit"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs p-2 rounded-2xl shadow-lg border border-[#EFE5E2] z-10">
              <img src="https://i.postimg.cc/mkg3bwD8/logo-cuadrado.jpg" alt="Logo By Sandrit" className="w-14 h-14 rounded-xl object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="font-display text-xl font-medium">Sandrit Ríos Molinares</h3>
              <p className="text-xs text-[#F2D7D9]">Fundadora & Especialista Estética</p>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EFE5E2] shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF2F3] text-[#8C3F52] flex items-center justify-center mb-6">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3F52] block mb-1">
              Nuestro Rumbo
            </span>
            <h2 className="font-display text-2xl text-[#2C2422] font-semibold mb-4">
              Misión
            </h2>
            <p className="text-sm sm:text-base text-[#5C504C] leading-relaxed font-light">
              {settings?.about_mission ||
                'Brindar servicios estéticos y cosméticos de excelencia que eleven la confianza, el bienestar y la belleza auténtica de cada una de nuestras clientas a través de un trato humano, cálido y personalizado.'}
            </p>
          </div>
          <div className="w-12 h-1 bg-[#8C3F52] mt-6 rounded-full"></div>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EFE5E2] shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#C59B4E] flex items-center justify-center mb-6">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C59B4E] block mb-1">
              Hacia Dónde Vamos
            </span>
            <h2 className="font-display text-2xl text-[#2C2422] font-semibold mb-4">
              Visión
            </h2>
            <p className="text-sm sm:text-base text-[#5C504C] leading-relaxed font-light">
              {settings?.about_vision ||
                'Ser el centro de estética y belleza de referencia en la región, reconocido por la excelencia en sus tratamientos, innovación constante y una experiencia inolvidable de autocuidado.'}
            </p>
          </div>
          <div className="w-12 h-1 bg-[#C59B4E] mt-6 rounded-full"></div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-[#FAF2F3]/60 rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#F2D7D9]">
        <SectionTitle
          subtitle="Nuestros Pilares"
          title="Valores que Guían Nuestro Trabajo"
          description="Cada servicio que realizamos está respaldado por principios inquebrantables de ética, respeto e higiene."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {valuesList.map((val, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-[#EFE5E2] shadow-xs">
              <div className="w-8 h-8 rounded-full bg-[#FAF2F3] text-[#8C3F52] flex items-center justify-center mb-3">
                <Check className="w-4 h-4" />
              </div>
              <h4 className="font-display text-base font-semibold text-[#2C2422] mb-1">
                {val.title}
              </h4>
              <p className="text-xs text-[#685D59] leading-relaxed font-light">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
