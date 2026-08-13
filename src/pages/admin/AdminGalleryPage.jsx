import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { AdminHeader } from '../../components/layout/AdminHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { galleryService } from '../../services/gallery.service';
import { updatePageSEO } from '../../utils/seo';

export function AdminGalleryPage() {
  const { setSidebarOpen } = useOutletContext();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Facial',
    description: '',
    image_url: '',
    is_active: true,
    display_order: 1
  });

  const categories = ['Facial', 'Cabello', 'Maquillaje', 'Cejas & Pestañas', 'Uñas', 'Spa', 'Masajes', 'Otros'];

  const loadGallery = async () => {
    setLoading(true);
    try {
      const { data } = await galleryService.getGallery('Todos', true);
      if (data) setItems(data);
    } catch (err) {
      console.error('Error loading gallery admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updatePageSEO({ title: 'Galería de Trabajos' });
    loadGallery();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Facial',
      description: '',
      image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
      is_active: true,
      display_order: items.length + 1
    });
    setErrorMessage('');
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description || '',
      image_url: item.image_url,
      is_active: item.is_active ?? true,
      display_order: item.display_order ?? 1
    });
    setErrorMessage('');
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    const payload = {
      title: formData.title.trim(),
      category: formData.category,
      description: formData.description.trim(),
      image_url: formData.image_url.trim(),
      is_active: formData.is_active,
      display_order: Number(formData.display_order) || 1
    };

    let res;
    if (editingItem) {
      res = await galleryService.updateImage(editingItem.id, payload);
    } else {
      res = await galleryService.createImage(payload);
    }

    setSubmitting(false);

    if (res.error) {
      setErrorMessage(res.error.message || 'Error al guardar la fotografía.');
    } else {
      setModalOpen(false);
      loadGallery();
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    await galleryService.deleteImage(itemToDelete.id);
    setDeleteModalOpen(false);
    setItemToDelete(null);
    loadGallery();
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        onMenuClick={() => setSidebarOpen(true)}
        title="Gestión de Galería"
        subtitle="Sube y clasifica fotografías de resultados y procedimientos"
      />

      {/* Action Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#EFE5E2] shadow-xs">
        <p className="text-xs text-[#736662]">
          Total de fotos: <strong>{items.length}</strong>
        </p>

        <Button
          variant="primary"
          size="sm"
          onClick={openCreateModal}
          icon={Plus}
        >
          Subir Fotografía
        </Button>
      </div>

      {/* Grid of gallery items */}
      <div className="bg-white rounded-3xl p-6 border border-[#EFE5E2] shadow-xs">
        {loading ? (
          <LoadingSpinner text="Cargando galería..." />
        ) : items.length === 0 ? (
          <div className="p-8 text-center bg-[#FAF7F5] rounded-2xl">
            <p className="text-sm text-[#736662]">No hay fotografías registradas aún.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden border border-[#E8DCD9] bg-[#FAF7F5] flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 bg-[#FAF2F3] overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </div>
                </div>

                <div className="p-3.5 space-y-1">
                  <h4 className="font-display font-medium text-sm text-[#2C2422] truncate">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-[#8A7974] line-clamp-1">{item.description}</p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-[#EBDCD8] text-xs">
                    <span className={item.is_active ? 'text-emerald-700 font-medium' : 'text-stone-500 font-medium'}>
                      {item.is_active ? 'Visible' : 'Oculto'}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1 text-[#5C504C] hover:text-[#8C3F52] hover:bg-white rounded-md transition-colors"
                        title="Editar foto"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setItemToDelete(item);
                          setDeleteModalOpen(true);
                        }}
                        className="p-1 text-rose-600 hover:text-rose-800 hover:bg-white rounded-md transition-colors"
                        title="Eliminar foto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? 'Editar Fotografía' : 'Nueva Fotografía'}
        subtitle="Galería By Sandrit"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
              Título / Trabajo Realizado *
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Lifting de pestañas con keratina"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                Categoría *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                Orden de Visualización
              </label>
              <input
                type="number"
                min="1"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
              URL de la Fotografía *
            </label>
            <input
              type="url"
              required
              placeholder="https://..."
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
              Descripción o Detalles (Opcional)
            </label>
            <textarea
              rows="2"
              placeholder="Ej. Procedimiento realizado con pigmentación orgánica..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
            ></textarea>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="gallery_is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4 text-[#8C3F52] rounded border-[#D4B8B1] focus:ring-[#8C3F52]"
            />
            <label htmlFor="gallery_is_active" className="text-xs font-medium text-[#2C2422] cursor-pointer">
              Fotografía Visible al Público en la Galería
            </label>
          </div>

          <div className="pt-4 border-t border-[#EFE5E2] flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={submitting}
            >
              {editingItem ? 'Guardar Cambios' : 'Subir'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Eliminar Fotografía"
        subtitle="Confirmación"
        maxWidth="max-w-sm"
      >
        <div className="space-y-4 text-sm text-[#5C504C]">
          <p>¿Estás segura de eliminar esta fotografía de la galería?</p>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={confirmDelete}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
