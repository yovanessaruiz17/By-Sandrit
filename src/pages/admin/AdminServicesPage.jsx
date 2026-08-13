import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Search,
  Clock,
  DollarSign,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { AdminHeader } from '../../components/layout/AdminHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { servicesService } from '../../services/services.service';
import { formatPrice, formatDuration } from '../../utils/formatters';
import { updatePageSEO } from '../../utils/seo';

export function AdminServicesPage() {
  const { setSidebarOpen } = useOutletContext();
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modals state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category_id: '',
    description: '',
    benefitsText: '',
    recommendations: '',
    duration_minutes: 60,
    price: 50000,
    image_url: '',
    is_active: true,
    is_featured: false
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [srvRes, catRes] = await Promise.all([
        servicesService.getAllServices(true),
        servicesService.getCategories()
      ]);
      if (srvRes.data) setServices(srvRes.data);
      if (catRes.data) setCategories(catRes.data);
    } catch (err) {
      console.error('Error loading services in admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updatePageSEO({ title: 'Gestión de Servicios' });
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      name: '',
      slug: '',
      category_id: categories[0]?.id || 'cat-facial',
      description: '',
      benefitsText: '',
      recommendations: '',
      duration_minutes: 60,
      price: 50000,
      image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
      is_active: true,
      is_featured: false
    });
    setErrorMessage('');
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      slug: service.slug,
      category_id: service.category_id,
      description: service.description || '',
      benefitsText: service.benefits ? service.benefits.join('\n') : '',
      recommendations: service.recommendations || '',
      duration_minutes: service.duration_minutes || 60,
      price: service.price || 0,
      image_url: service.image_url || '',
      is_active: service.is_active ?? true,
      is_featured: service.is_featured ?? false
    });
    setErrorMessage('');
    setModalOpen(true);
  };

  const handleNameChange = (name) => {
    const autoSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setFormData(prev => ({
      ...prev,
      name,
      slug: editingService ? prev.slug : autoSlug
    }));
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    const benefitsArray = formData.benefitsText
      .split('\n')
      .map(b => b.trim())
      .filter(Boolean);

    const payload = {
      name: formData.name.trim(),
      slug: formData.slug.trim(),
      category_id: formData.category_id,
      description: formData.description.trim(),
      short_description: formData.description.trim().slice(0, 140),
      benefits: benefitsArray,
      recommendations: formData.recommendations.trim(),
      duration_minutes: Number(formData.duration_minutes) || 60,
      price: Number(formData.price) || 0,
      image_url: formData.image_url.trim(),
      is_active: formData.is_active,
      is_featured: formData.is_featured
    };

    let res;
    if (editingService) {
      res = await servicesService.updateService(editingService.id, payload);
    } else {
      res = await servicesService.createService(payload);
    }

    setSubmitting(false);

    if (res.error) {
      setErrorMessage(res.error.message || 'Error al guardar el servicio.');
    } else {
      setModalOpen(false);
      loadData();
    }
  };

  const handleToggleActive = async (service) => {
    await servicesService.toggleServiceActive(service.id, service.is_active);
    loadData();
  };

  const confirmDelete = async () => {
    if (!serviceToDelete) return;
    await servicesService.deleteService(serviceToDelete.id);
    setDeleteModalOpen(false);
    setServiceToDelete(null);
    loadData();
  };

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    (s.description && s.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <AdminHeader
        onMenuClick={() => setSidebarOpen(true)}
        title="Catálogo de Servicios"
        subtitle="Administra, crea y modifica los tratamientos ofrecidos"
      />

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#EFE5E2] shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7974]" />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAF7F5] border border-[#E8DCD9] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
          />
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={openCreateModal}
          icon={Plus}
          className="w-full sm:w-auto"
        >
          Nuevo Servicio
        </Button>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#EFE5E2] shadow-xs">
        {loading ? (
          <LoadingSpinner text="Cargando servicios..." />
        ) : filteredServices.length === 0 ? (
          <div className="p-8 text-center bg-[#FAF7F5] rounded-2xl">
            <p className="text-sm text-[#736662]">No se encontraron servicios.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAF7F5] text-[#8A7974] text-xs uppercase tracking-wider border-b border-[#EBDCD8]">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Servicio</th>
                  <th className="px-4 py-3">Categoría</th>
                  <th className="px-4 py-3">Duración</th>
                  <th className="px-4 py-3">Precio</th>
                  <th className="px-4 py-3 text-center">Estado</th>
                  <th className="px-4 py-3 rounded-r-xl text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5ECE9]">
                {filteredServices.map((srv) => (
                  <tr key={srv.id} className="hover:bg-[#FAF7F5]/50 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={srv.image_url}
                          alt={srv.name}
                          className="w-10 h-10 rounded-xl object-cover border border-[#E8DCD9] bg-[#FAF2F3] shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div>
                          <p className="font-display font-medium text-[#2C2422]">{srv.name}</p>
                          <span className="text-[11px] text-[#8A7974] line-clamp-1">{srv.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#5C504C]">
                      <span className="px-2.5 py-1 rounded-full bg-[#FAF2F3] text-[#8C3F52] font-medium border border-[#F2D7D9]">
                        {srv.service_categories?.name || categories.find(c => c.id === srv.category_id)?.name || 'General'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#5C504C] whitespace-nowrap">
                      {formatDuration(srv.duration_minutes)}
                    </td>
                    <td className="px-4 py-3.5 text-sm font-semibold text-[#8C3F52] whitespace-nowrap">
                      {formatPrice(srv.price, srv.price_is_demo)}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <button
                        onClick={() => handleToggleActive(srv)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer border ${
                          srv.is_active
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
                        }`}
                        title="Clic para cambiar estado"
                      >
                        {srv.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{srv.is_active ? 'Activo' : 'Inactivo'}</span>
                      </button>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(srv)}
                          className="p-1.5 text-[#5C504C] hover:text-[#8C3F52] hover:bg-[#FAF2F3] rounded-lg transition-colors"
                          title="Editar servicio"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setServiceToDelete(srv);
                            setDeleteModalOpen(true);
                          }}
                          className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Eliminar servicio"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
        subtitle="Administración de Tratamientos"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSaveService} className="space-y-4">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                Nombre del servicio *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                Slug URL *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20 font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                Categoría *
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                Duración (minutos) *
              </label>
              <input
                type="number"
                min="15"
                step="5"
                required
                value={formData.duration_minutes}
                onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
                Precio (COP) *
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
              URL de Fotografía
            </label>
            <input
              type="url"
              placeholder="https://..."
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
              Descripción completa *
            </label>
            <textarea
              rows="3"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
              Beneficios (Un beneficio por línea)
            </label>
            <textarea
              rows="3"
              placeholder="Elimina impurezas&#10;Aporta luminosidad&#10;Piel tersa y suave"
              value={formData.benefitsText}
              onChange={(e) => setFormData({ ...formData, benefitsText: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20 font-mono"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C] mb-1">
              Recomendaciones previas o posteriores (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ej. Evitar exposición solar directa 24 horas después..."
              value={formData.recommendations}
              onChange={(e) => setFormData({ ...formData, recommendations: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#D4B8B1] focus:border-[#8C3F52] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-medium text-[#2C2422] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 text-[#8C3F52] rounded border-[#D4B8B1] focus:ring-[#8C3F52]"
              />
              <span>Servicio Activo (Visible al público)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-[#2C2422] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-4 h-4 text-[#C59B4E] rounded border-[#D4B8B1] focus:ring-[#C59B4E]"
              />
              <span>Destacado en Inicio</span>
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
              {editingService ? 'Guardar Cambios' : 'Crear Servicio'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirmar Eliminación"
        subtitle="Acción Irreversible"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-sm text-[#5C504C]">
          <p>
            ¿Estás segura de eliminar el servicio <strong>{serviceToDelete?.name}</strong>?
          </p>
          <p className="text-xs text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200">
            Esta acción eliminará el servicio de la base de datos. Si solo deseas ocultarlo del público temporalmente, es recomendable cambiar su estado a <strong>Inactivo</strong>.
          </p>
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
              Eliminar Definitivamente
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
