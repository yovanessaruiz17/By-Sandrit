import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BusinessProvider } from './context/BusinessContext';
import { PwaProvider } from './context/PwaContext';
import { PwaContainer } from './components/pwa/PwaContainer';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { ServicesPage } from './pages/public/ServicesPage';
import { ServiceDetailPage } from './pages/public/ServiceDetailPage';
import { AboutPage } from './pages/public/AboutPage';
import { GalleryPage } from './pages/public/GalleryPage';
import { ContactPage } from './pages/public/ContactPage';
import { BookingPage } from './pages/public/BookingPage';
import { ReviewPage } from './pages/public/ReviewPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Policy Pages
import { PoliciesHubPage } from './pages/public/policies/PoliciesHubPage';
import { TermsPage } from './pages/public/policies/TermsPage';
import { PrivacyPage } from './pages/public/policies/PrivacyPage';
import { CancellationPage } from './pages/public/policies/CancellationPage';
import { BiosecurityConsentPage } from './pages/public/policies/BiosecurityConsentPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminAppointmentsPage } from './pages/admin/AdminAppointmentsPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminTestimonialsPage } from './pages/admin/AdminTestimonialsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BusinessProvider>
          <PwaProvider>
            <ScrollToTop />
            <PwaContainer />
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="servicios" element={<ServicesPage />} />
                <Route path="servicios/:slug" element={<ServiceDetailPage />} />
                <Route path="nosotros" element={<AboutPage />} />
                <Route path="galeria" element={<GalleryPage />} />
                <Route path="contacto" element={<ContactPage />} />
                <Route path="agendar" element={<BookingPage />} />
                <Route path="dejar-opinion" element={<ReviewPage />} />
                <Route path="calificar" element={<ReviewPage />} />
                <Route path="opinar" element={<ReviewPage />} />
                <Route path="reviews" element={<ReviewPage />} />
                
                {/* POLICIES & LEGAL */}
                <Route path="politicas" element={<PoliciesHubPage />} />
                <Route path="politicas/terminos" element={<TermsPage />} />
                <Route path="politicas/privacidad" element={<PrivacyPage />} />
                <Route path="politicas/cancelaciones" element={<CancellationPage />} />
                <Route path="politicas/consentimiento-bioseguridad" element={<BiosecurityConsentPage />} />
                {/* Friendly short aliases */}
                <Route path="terminos" element={<TermsPage />} />
                <Route path="privacidad" element={<PrivacyPage />} />

                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* ADMIN LOGIN */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* PROTECTED ADMIN ROUTES */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboardPage />} />
                <Route path="servicios" element={<AdminServicesPage />} />
                <Route path="citas" element={<AdminAppointmentsPage />} />
                <Route path="galeria" element={<AdminGalleryPage />} />
                <Route path="testimonios" element={<AdminTestimonialsPage />} />
                <Route path="configuracion" element={<AdminSettingsPage />} />
              </Route>
            </Routes>
          </PwaProvider>
        </BusinessProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
