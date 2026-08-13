import React, { useEffect, useState } from 'react';
import { SectionTitle } from '../../components/common/SectionTitle';
import { GalleryGrid } from '../../components/gallery/GalleryGrid';
import { Lightbox } from '../../components/common/Lightbox';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { galleryService } from '../../services/gallery.service';
import { updatePageSEO } from '../../utils/seo';

export function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [loading, setLoading] = useState(true);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = ['Todos', 'Facial', 'Cabello', 'Maquillaje', 'Cejas & Pestañas', 'Uñas', 'Spa', 'Masajes'];

  useEffect(() => {
    updatePageSEO({
      title: 'Galería de Resultados & Trabajos',
      description: 'Descubre los resultados reales de nuestros tratamientos de higiene facial, peinados, cejas, lifting, maquillaje y spa en By Sandrit.',
      canonicalPath: '/galeria'
    });

    async function loadGallery() {
      try {
        const { data } = await galleryService.getGallery(selectedCategory, false);
        if (data) setGalleryItems(data);
      } catch (err) {
        console.error('Error loading gallery:', err);
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, [selectedCategory]);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleNextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <SectionTitle
        subtitle="Galería Fotográfica"
        title="Resultados que Inspiran Confianza"
        description="Explora fotografías reales de nuestros tratamientos estéticos y momentos de consentir a nuestras clientas."
      />

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none no-scrollbar flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap border ${
              selectedCategory === cat
                ? 'bg-[#8C3F52] text-white border-[#8C3F52] shadow-xs'
                : 'bg-white text-[#5C504C] border-[#E8DCD9] hover:border-[#8C3F52] hover:bg-[#FAF2F3]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <LoadingSpinner text="Cargando galería..." />
      ) : galleryItems.length > 0 ? (
        <GalleryGrid
          items={galleryItems}
          onSelectImage={handleOpenLightbox}
        />
      ) : (
        <EmptyState
          title="No hay fotografías en esta categoría"
          message="Pronto subiremos más resultados de esta especialidad."
          actionLabel="Ver todas las fotos"
          onAction={() => setSelectedCategory('Todos')}
        />
      )}

      {/* Interactive Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={galleryItems}
        currentIndex={lightboxIndex}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />
    </div>
  );
}
