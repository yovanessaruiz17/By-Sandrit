import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Star,
  Plus,
  Trash2,
  Edit2,
  AlertCircle,
  QrCode,
  Share2,
  Copy,
  Check,
  Eye,
  EyeOff,
  Sparkles,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { AdminHeader } from '../../components/layout/AdminHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ReviewQRModal } from '../../components/testimonials/ReviewQRModal';
import { testimonialsService } from '../../services/testimonials.service';
import { updatePageSEO } from '../../utils/seo';

export function AdminTestimonialsPage() {
  const { setSidebarOpen } = useOutletContext();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // QR Modal
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

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
    customer_name: '',
    service_name: '',
    comment: '',
    rating: 5,
    is_active: true
  });

  const reviewUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/dejar-opinion`
    : 'https://by-sandrit.netlify.app/dejar-opinion';

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
      customer_name: '',
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
      customer_name: item.customer_name || item.client_name || '',
      service_name: item.service_name || '',
      comment: item.comment,
      rating: item.rating || 5,
      is_active: item.is_active ?? true
    });
    setErrorMessage('');
    setModalOpen(true);
  };

  const handleToggleActive = async (item) => {
    try {
      await testimonialsService.toggleActive(item.id, item.is_active);
      loadTestimonials();
    } catch (err) {
      console.error('Error toggling active status', err);
    }
  };

  const handleCopyQuickLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(reviewUrl);
      } else {
        const input = document.createElement('input');
        input.value = reviewUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 3000);
    } catch (err) {
      console.error('Error copying link', err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    const payload = {
      customer_name: formData.customer_name.trim(),
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

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        onMenuClick={() => setSidebarOpen(true)}
        title="Gestión de Testimonios"
        subtitle="Administra las reseñas o comparte el enlace/QR para que tus clientas opinen"
      />

      {/* PROMINENT QR & LINK SHARE BANNER */}
      <div className="bg-gradient-to-r from-[#FAF2F3] to-[#FAF7F5] border border-[#F2D7D9] rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#F2D7D9] text-[#8C3F52] flex items-center justify-center shrink-0 shadow-xs">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8C3F52] text-white uppercase tracking-wider">
                Para Tus Clientas
              </span>
              <h3 className="font-display font-medium text-base sm:text-lg text-[#2C2422]">
                Pide reseñas con Enlace o Código QR
              </h3>
            </div>
            <p className="text-xs text-[#736662] max-w-xl leading-relaxed">
              No tienes que escribir los comentarios tú misma: tus clientas pueden calificar su cita escaneando el código QR en tu local o desde el enlace de WhatsApp.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyQuickLink}
            icon={linkCopied ? Check : Copy}
            className="grow md:grow-0"
          >
            {linkCopied ? '¡Enlace Copiado!' : 'Copiar Enlace'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setQrModalOpen(true)}
            icon={QrCode}
            className="grow md:grow-0 bg-[#8C3F52] hover:bg-[#722F40]"
          >
            Ver QR y Compartir
          </Button>
        </div>
      </div>

      {/* TOP BAR / STATS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#EFE5E2] shadow-xs">
        <div className="flex items-center gap-3 text-xs text-[#736662]">
          <span>Total de testimonios: <strong>{testimonials.length}</strong></span>
          <span>•</span>
          <span className="text-emerald-700 font-medium">
            Activos en web: <strong>{testimonials.filter(t => t.is_active).length}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.open(reviewUrl, '_blank')}
            icon={ExternalLink}
          >
            Formulario Público
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={openCreateModal}
            icon={Plus}
          >
            Agregar Manualmente
          </Button>
        </div>
      </div>

      {/* TESTIMONIALS LIST / GRID */}
      <div className="bg-white rounded-3xl p-6 border border-[#EFE5E2] shadow-xs">
        {loading ? (
          <LoadingSpinner text="Cargando testimonios..." />
        ) : testimonials.length === 0 ? (
          <div className="p-12 text-center bg-[#FAF7F5] rounded-2xl border border-[#EFE5E2] space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF2F3] text-[#8C3F52] flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-display text-base text-[#2C2422]">Aún no hay testimonios registrados</h4>
            <p className="text-xs text-[#736662] max-w-sm mx-auto">
              Comparte tu código QR o enlace con tus primeras clientas para que dejen su calificación.
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setQrModalOpen(true)}
              icon={QrCode}
            >
              Generar Código QR
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => {
              const name = t.customer_name || t.client_name || 'Clienta';
              return (
                <div
                  key={t.id}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    t.is_active
                      ? 'border-[#E8DCD9] bg-[#FAF7F5]'
                      : 'border-stone-200 bg-stone-50/60 opacity-75'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex text-[#C59B4E] gap-0.5">
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>

                      <button
                        onClick={() => handleToggleActive(t)}
                        title={t.is_active ? 'Hacer clic para ocultar de la web' : 'Hacer clic para mostrar en la web'}
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full transition-colors ${
                          t.is_active
                            ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                            : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                        }`}
                      >
                        {t.is_active ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Visible</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Oculto</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5C504C] italic leading-relaxed">
                      "{t.comment}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EBDCD8] flex items-center justify-between mt-4">
                    <div className="min-w-0 pr-2">
                      <h4 className="font-display font-medium text-sm text-[#2C2422] truncate">
                        {name}
                      </h4>
                      <div className="flex items-center gap-2">
                        {t.service_name && (
                          <p className="text-[11px] text-[#8C3F52] truncate font-medium">
                            {t.service_name}
                          </p>
                        )}
                        {t.created_at && (
                          <span className="text-[10px] text-stone-400">
                            {formatDate(t.created_at)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => openEditModal(t)}
                        title="Editar testimonio"
                        className="p-1.5 text-[#5C504C] hover:text-[#8C3F52] hover:bg-white rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setItemToDelete(t);
                          setDeleteModalOpen(true);
                        }}
                        title="Eliminar testimonio"
                        className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-white rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* QR MODAL */}
      <ReviewQRModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
      />

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
              value={formData.customer_name}
              onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
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
                <option value={2}>2 Estrellas ★★☆☆☆</option>
                <option value={1}>1 Estrella ★☆☆☆☆</option>
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
