import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Star,
  Plus,
  Trash2,
  Edit2,
  AlertCircle
} from 'lucide-react';
import { AdminHeader } from '../../components/layout/AdminHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { testimonialsService } from '../../services/testimonials.service';
import { updatePageSEO } from '../../utils/seo';

export function AdminTestimonialsPage() {
  const { setSidebarOpen } = useOutletContext();
  const [testimonials, setTestimonials] = useState([]);
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
    client_name: '',
    service_name: '',
    comment: '',
    rating: 5,
    is_active: true
  });

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const { data } = await testimonialsService.getAllTestimonials(true);
      if (data) setTestimonials(data);
    } catch (err) {
      console.error('Error loading testimonials admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updatePageSEO({ title: 'Gestión de Testimonios' });
    loadTestimonials();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      client_name: '',
      service_name: 'Higiene Facial Profunda',
      comment: '',
      rating: 5,
      is_active: true
    });
    setErrorMessage('');
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      client_name: item.client_name,
      service_name: item.service_name || '',
      comment: item.comment,
      rating: item.rating || 5,
      is_active: item.is_active ?? true
    });
    setErrorMessage('');
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    const payload = {
      client_name: formData.client_name.trim(),
      service_name: formData.service_name.trim(),
      comment: formData.comment.trim(),
      rating: Number(formData.rating) || 5,
      is_active: formData.is_active
    };

    let res;
    if (editingItem) {
      res = await testimonialsService.updateTestimonial(editingItem.id, payload);
    } else {
      res = await testimonialsService.createTestimonial(payload);
    }

    setSubmitting(false);

    if (res.error) {
      setErrorMessage(res.error.message || 'Error al guardar el testimonio.');
    } else {
      setModalOpen(false);
      loadTestimonials();
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    await testimonialsService.deleteTestimonial(itemToDelete.id);
    setDeleteModalOpen(false);
    setItemToDelete(null);
    loadTestimonials();
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        onMenuClick={() => setSidebarOpen(true)}
        title="Gestión de Testimonios"
        subtitle="Administra las reseñas y valoraciones de clientas satisfechas"
      />

      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#EFE5E2] shadow-xs">
        <p className="text-xs text-[#736662]">
          Total de testimonios: <strong>{testimonials.length}</strong>
        </p>

        <Button
          variant="primary"
          size="sm"
          onClick={openCreateModal}
          icon={Plus}
        >
          Nuevo Testimonio
        </Button>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#EFE5E2] shadow-xs">
        {loading ? (
          <LoadingSpinner text="Cargando testimonios..." />
        ) : testimonials.length === 0 ? (
          <div className="p-8 text-center bg-[#FAF7F5] rounded-2xl">
            <p className="text-sm text-[#736662]">Aún no hay testimonios registrados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl border border-[#E8DCD9] bg-[#FAF7F5] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#C59B4E] gap-0.5">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      t.is_active ? 'bg-emerald-50 text-emerald-800' : 'bg-stone-200 text-stone-600'
                    }`}>
                      {t.is_active ? 'Activo' : 'Oculto'}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5C504C] italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EBDCD8] flex items-center justify-between mt-4">
                  <div>
                    <h4 className="font-display font-medium text-sm text-[#2C2422]">{t.client_name}</h4>
                    <p className="text-[11px] text-[#8C3F52]">{t.service_name}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(t)}
                      className="p-1 text-[#5C504C] hover:text-[#8C3F52] hover:bg-white rounded-md transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setItemToDelete(t);
                        setDeleteModalOpen(true);
                      }}
                      className="p-1 text-rose-600 hover:text-rose-800 hover:bg-white rounded-md transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
        title={editingItem ? 'Editar Testimonio' : 'Nuevo Testimonio'}
        subtitle="Opinión de Clienta"
        maxWidth="max-w-md"
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
              Nombre de la clienta *
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Carolina Gómez"
              value={formData.client_name}
              onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                Servicio realizado
              </label>
              <input
                type="text"
                placeholder="Ej. Higiene Facial"
                value={formData.service_name}
                onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                Calificación (1 a 5)
              </label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
              >
                <option value={5}>5 Estrellas ★★★★★</option>
                <option value={4}>4 Estrellas ★★★★☆</option>
                <option value={3}>3 Estrellas ★★★☆☆</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
              Comentario / Reseña *
            </label>
            <textarea
              rows="3"
              required
              placeholder="Escribe el testimonio de la clienta..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
            ></textarea>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="test_is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4 text-[#8C3F52] rounded border-[#D4B8B1] focus:ring-[#8C3F52]"
            />
            <label htmlFor="test_is_active" className="text-xs font-medium text-[#2C2422] cursor-pointer">
              Testimonio Activo (Visible en Inicio)
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
              Guardar Testimonio
            </Button>
          </div>
        </form>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Eliminar Testimonio"
        subtitle="Confirmación"
        maxWidth="max-w-sm"
      >
        <div className="space-y-4 text-sm text-[#5C504C]">
          <p>¿Estás segura de eliminar este testimonio?</p>
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
