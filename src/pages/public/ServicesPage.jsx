import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Sparkles, AlertCircle } from 'lucide-react';
import { SectionTitle } from '../../components/common/SectionTitle';
import { ServiceCard } from '../../components/services/ServiceCard';
import { CategoryFilter } from '../../components/services/CategoryFilter';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { servicesService } from '../../services/services.service';
import { updatePageSEO } from '../../utils/seo';

export function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const catQuery = searchParams.get('cat') || 'all';

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(catQuery);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updatePageSEO({
      title: 'Servicios & Tratamientos Estéticos',
      description: 'Conoce nuestro catálogo completo de estética profesional: faciales, masajes, cejas, lifting de pestañas, maquillaje, uñas y spa para niñas por Sandrit Ríos Molinares.',
      canonicalPath: '/servicios'
    });

    async function loadServicesData() {
      try {
        const [catRes, srvRes] = await Promise.all([
          servicesService.getCategories(),
          servicesService.getAllServices(false)
        ]);

        if (catRes.data) setCategories(catRes.data);
        if (srvRes.data) setServices(srvRes.data);
      } catch (err) {
        console.error('Error loading services page:', err);
      } finally {
        setLoading(false);
      }
    }

    loadServicesData();
  }, []);

  // Sync category state with query params
  useEffect(() => {
    if (catQuery) {
      setSelectedCategory(catQuery);
    }
  }, [catQuery]);

  const handleCategorySelect = (categoryIdOrSlug) => {
    setSelectedCategory(categoryIdOrSlug);
    if (categoryIdOrSlug === 'all') {
      searchParams.delete('cat');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ cat: categoryIdOrSlug });
    }
  };

  // Filter services
  const filteredServices = services.filter((srv) => {
    // Category match
    const categoryMatches =
      selectedCategory === 'all' ||
      srv.category_id === selectedCategory ||
      srv.service_categories?.slug === selectedCategory;

    // Search match
    const keywordMatches =
      !searchKeyword.trim() ||
      srv.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      (srv.description && srv.description.toLowerCase().includes(searchKeyword.toLowerCase()));

    return categoryMatches && keywordMatches;
  });

  if (loading) {
    return <LoadingSpinner text="Cargando catálogo de servicios..." fullScreen />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <SectionTitle
        subtitle="Catálogo Completo"
        title="Nuestros Servicios Estéticos & Cosméticos"
        description="Selecciona una categoría o busca tu tratamiento favorito. Todos nuestros servicios son atendidos con altos estándares de bioseguridad y dedicación personalizada."
      />

      {/* Controls: Search & Category filter */}
      <div className="space-y-6">
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7974]" />
          <input
            type="text"
            placeholder="Buscar tratamiento (ej. facial, pestañas, masaje...)"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-[#E8DCD9] focus:border-[#8C3F52] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20 text-[#2C2422] shadow-xs"
          />
          {searchKeyword && (
            <button
              onClick={() => setSearchKeyword('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#8A7974] hover:text-[#2C2422]"
            >
              Limpiar
            </button>
          )}
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      </div>

      {/* Services Grid or Empty */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
          {filteredServices.map((srv) => (
            <ServiceCard key={srv.id} service={srv} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No encontramos servicios con esos criterios"
          message="Intenta seleccionando otra categoría o limpiando la barra de búsqueda."
          actionLabel="Ver todos los servicios"
          onAction={() => {
            setSelectedCategory('all');
            setSearchKeyword('');
          }}
        />
      )}
    </div>
  );
}
