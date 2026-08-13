-- ==============================================================================
-- BY SANDRIT — DATABASE SCHEMA & SEED FOR SUPABASE
-- Creado para: BY SANDRIT (Sandrit Ríos Molinares) por YorDev
-- ==============================================================================

-- 1. Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. TABLAS PRINCIPALES
-- ==============================================================================

-- Categorías de Servicios
CREATE TABLE IF NOT EXISTS public.service_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    order_index INTEGER DEFAULT 1,
    icon TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Servicios & Tratamientos
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    category_id TEXT REFERENCES public.service_categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT,
    description TEXT,
    benefits JSONB DEFAULT '[]'::jsonb,
    recommendations TEXT,
    duration_minutes INTEGER DEFAULT 60,
    price NUMERIC NOT NULL DEFAULT 0,
    price_is_demo BOOLEAN DEFAULT false,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Horarios de Atención
CREATE TABLE IF NOT EXISTS public.business_hours (
    day_of_week INTEGER PRIMARY KEY, -- 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    day_name TEXT NOT NULL,
    open_time TEXT NOT NULL DEFAULT '08:00',
    close_time TEXT NOT NULL DEFAULT '18:00',
    is_closed BOOLEAN DEFAULT false,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Citas & Reservas
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    service_id TEXT REFERENCES public.services(id) ON DELETE SET NULL,
    service_name TEXT NOT NULL,
    service_price NUMERIC NOT NULL DEFAULT 0,
    service_duration INTEGER DEFAULT 60,
    appointment_date DATE NOT NULL,
    appointment_time TEXT NOT NULL,
    notes TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Galería de Trabajos
CREATE TABLE IF NOT EXISTS public.gallery (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    category_slug TEXT DEFAULT 'general',
    image_url TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Testimonios y Reseñas
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    service_name TEXT,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Configuración General del Negocio
CREATE TABLE IF NOT EXISTS public.business_settings (
    id TEXT PRIMARY KEY DEFAULT 'default-settings',
    business_name TEXT DEFAULT 'BY SANDRIT — Servicios Estéticos & Cosméticos',
    stylist_name TEXT DEFAULT 'Sandrit Ríos Molinares',
    tagline TEXT DEFAULT 'Belleza · Estética · Bienestar',
    hero_title TEXT DEFAULT 'Realzamos tu esencia, resaltamos tu belleza.',
    hero_subtitle TEXT DEFAULT 'Descubre una experiencia de belleza, estética y bienestar diseñada para consentirte y resaltar lo mejor de ti.',
    phone TEXT DEFAULT '3127654780',
    whatsapp TEXT DEFAULT '3127654780',
    instagram TEXT DEFAULT 'by_sandrit',
    email TEXT DEFAULT 'contacto@bysandrit.com',
    address TEXT DEFAULT 'Ubicación disponible al agendar',
    hours_text TEXT DEFAULT 'Lunes a Sábado: 8:00 AM - 6:00 PM | Domingos & Festivos: Con cita previa',
    welcome_message TEXT DEFAULT '¡Bienvenida a By Sandrit! Estamos listas para consentirte.',
    about_story TEXT,
    about_mission TEXT,
    about_vision TEXT,
    about_values JSONB DEFAULT '["Calidad e Higiene", "Atención Personalizada", "Empatía y Calidez", "Pasión por la Belleza", "Compromiso y Puntualidad"]'::jsonb,
    currency_symbol TEXT DEFAULT '$',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 3. SEGURIDAD Y POLÍTICAS RLS (Row Level Security)
-- ==============================================================================

ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;

-- Políticas de Lectura Pública
CREATE POLICY "Acceso público de lectura para categorías" ON public.service_categories FOR SELECT USING (true);
CREATE POLICY "Acceso público de lectura para servicios activos" ON public.services FOR SELECT USING (true);
CREATE POLICY "Acceso público de lectura para horarios" ON public.business_hours FOR SELECT USING (true);
CREATE POLICY "Acceso público de lectura para galería activa" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Acceso público de lectura para testimonios activos" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Acceso público de lectura para configuración" ON public.business_settings FOR SELECT USING (true);

-- Creación de Citas Pública (Permite a cualquier cliente agendar)
CREATE POLICY "Cualquier cliente puede agendar citas" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Lectura pública de citas para control de cupos" ON public.appointments FOR SELECT USING (true);

-- Permisos Totales para Usuarios Autenticados (Administrador)
CREATE POLICY "Admin full access service_categories" ON public.service_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access business_hours" ON public.business_hours FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access appointments" ON public.appointments FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access gallery" ON public.gallery FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access business_settings" ON public.business_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- 4. BUCKET DE ALMACENAMIENTO PARA IMÁGENES (Supabase Storage)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Imágenes de galería públicas" 
ON storage.objects FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Subida de imágenes autenticado" 
ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Edición y borrado de imágenes autenticado" 
ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'gallery');

-- ==============================================================================
-- 5. DATOS INICIALES (SEED DATA)
-- ==============================================================================

-- Categorías
INSERT INTO public.service_categories (id, name, slug, order_index, icon, description) VALUES
('cat-facial', 'Higiene Facial', 'higiene-facial', 1, 'Sparkles', 'Tratamientos profundos para purificar, renovar y dar luminosidad a tu piel.'),
('cat-masajes', 'Masajes', 'masajes', 2, 'HeartHandshake', 'Técnicas de relajación corporal y drenaje para aliviar tensiones.'),
('cat-depilacion', 'Depilación con Cera', 'depilacion-con-cera', 3, 'Feather', 'Eliminación delicada del vello por zonas con máxima suavidad.'),
('cat-cejas', 'Cejas & Pestañas', 'cejas-pestanas', 4, 'Eye', 'Diseño, laminado y realce de mirada que armonizan tu rostro.'),
('cat-cabello', 'Cabello', 'cabello', 5, 'Flame', 'Peinados, trenzas, planchados y ondas para cualquier ocasión.'),
('cat-maquillaje', 'Maquillaje', 'maquillaje', 6, 'Palette', 'Maquillaje social y glam adaptado a tu estilo y evento.'),
('cat-unas', 'Manicure & Pedicure', 'manicure-pedicure', 7, 'Hand', 'Cuidado completo para manos y pies con acabados impecables.'),
('cat-spa-ninas', 'Spa para Niñas', 'spa-para-ninas', 8, 'Gift', 'Una experiencia divertida, delicada y mágica para las más pequeñas.')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- Servicios
INSERT INTO public.services (id, category_id, name, slug, short_description, description, benefits, recommendations, duration_minutes, price, image_url, is_active, is_featured) VALUES
('srv-fac-1', 'cat-facial', 'Limpieza Facial Básica', 'limpieza-facial-basica', 'Higienización superficial, exfoliación suave, mascarilla hidratante y protector solar.', 'Tratamiento esencial para mantener los poros limpios y la piel oxigenada. Ideal para pieles jóvenes o como mantenimiento mensual preventivo.', '["Elimina impurezas superficiales", "Aporta suavidad inmediata", "Hidrata y equilibra el pH cutáneo", "Mejora la absorción de cosméticos diarios"]'::jsonb, 'Venir con el rostro desmaquillado si es posible. Evitar exposición solar directa durante las 24 horas siguientes.', 45, 45000, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', true, true),
('srv-fac-2', 'cat-facial', 'Limpieza Facial Profunda', 'limpieza-facial-profunda', 'Vapor de ozono, extracción manual/ultrasónica, alta frecuencia, sérum intensivo y mascarilla LED.', 'Protocolo completo de desintoxicación celular y renovación dérmica. Extrae comedones e impurezas a nivel profundo dejando la piel radiante y uniforme.', '["Extracción meticulosa de puntos negros", "Desinflamación y efecto bactericida con alta frecuencia", "Regeneración celular acelerada", "Piel luminosa, tersa y oxigenada"]'::jsonb, 'No usar maquillaje por 12 horas. Utilizar protector solar FPS 50+ rigurosamente.', 75, 75000, 'https://images.unsplash.com/photo-1512290900672-1f02e6b0a7ea?auto=format&fit=crop&w=800&q=80', true, true),
('srv-fac-3', 'cat-facial', 'Facial Anti-Acné & Purificante', 'facial-anti-acne', 'Regulación sebácea, principios activos calmantes, descongestión y sellado antibacteriano.', 'Diseñado específicamente para pieles con tendencia grasa o brotes de acné. Calma la irritación, controla la producción de sebo y minimiza marcas.', '["Control de brillo y sebo", "Reducción de rojeces y bacterias", "Prevención de marcas e imperfecciones", "Sensación de frescura duradera"]'::jsonb, 'No manipular las lesiones previamente. Mantener una toalla de uso exclusivo para el rostro.', 60, 68000, 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80', true, false),
('srv-fac-4', 'cat-facial', 'Facial Luxury & Rejuvenecedor', 'facial-luxury', 'Elixir de oro/ácido hialurónico, masaje miofascial remodelador, mascarilla hidroplástica y velo de colágeno.', 'Nuestra experiencia facial más consentidora. Nutre profundamente las capas de la piel, atenúa líneas de expresión y brinda un glow perlado espectacular.', '["Efecto tensor y lifting instantáneo", "Hidratación profunda con ácido hialurónico", "Masaje relajante facial, cuello y escote", "Glow y luminosidad extrema"]'::jsonb, 'Tratamiento ideal previo a eventos sociales importantes.', 90, 110000, 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80', true, true),
('srv-mas-1', 'cat-masajes', 'Masaje Relajante Corporal', 'masaje-relajante-corporal', 'Aromaterapia, aceites esenciales tibios, música suave y maniobras descontracturantes suaves.', 'Libera la fatiga física y mental. Diseñado para devolverle la serenidad a tu cuerpo, aliviar nudos musculares y calmar el sistema nervioso.', '["Disminución del estrés y la ansiedad", "Mejora la calidad del sueño", "Alivio de sobrecargas musculares", "Estimulación de la circulación sanguínea"]'::jsonb, 'Asistir con ropa cómoda. Hidratarse adecuadamente antes y después del masaje.', 60, 65000, 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80', true, true),
('srv-mas-2', 'cat-masajes', 'Drenaje Linfático Manual', 'drenaje-linfatico-manual', 'Maniobras rítmicas y suaves para estimular la eliminación de líquidos retenidos y toxinas.', 'Técnica suave y especializada que activa el sistema linfático, reduce la hinchazón corporal y es ideal para post-operatorios o pesadez en piernas.', '["Reducción visible de retención de líquidos", "Alivio de pesadez y cansancio en piernas", "Favorece la depuración orgánica", "Mejora el aspecto de la piel"]'::jsonb, 'Beber suficiente agua tras la sesión para potenciar la eliminación de toxinas.', 60, 70000, 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=800&q=80', true, false),
('srv-dep-1', 'cat-depilacion', 'Depilación por Zonas (Cera Elástica/Miel)', 'depilacion-con-cera-zonas', 'Cera hipoalergénica de baja temperatura para cejas, bozo, axilas, piernas o zona íntima.', 'Extracción del vello desde la raíz con cera elástica formulada para pieles sensibles, minimizando molestias y dejando la piel tersa.', '["Retraso progresivo en el crecimiento del vello", "Piel sedosa sin irritaciones", "Técnica higiénica y rápida"]'::jsonb, 'Tener el vello con al menos 3mm de longitud. Evitar cremas con fragancia antes de la cita.', 30, 35000, 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80', true, false),
('srv-cej-1', 'cat-cejas', 'Diseño y Depilación de Cejas con Henna / Pigmento', 'diseno-depilacion-cejas-pigmento', 'Visagismo facial personalizado, depilación precisa y sombreado semipermanente efecto natural.', 'Armonizamos tu mirada trazando la forma geométrica perfecta según las facciones de tu rostro, complementando con pigmento vegetal de larga duración.', '["Cejas definidas y con mayor densidad", "Pigmentación que dura de 7 a 12 días en piel", "Resalta la expresión y mirada"]'::jsonb, 'No mojar el área en las primeras 12 horas posteriores a la aplicación.', 40, 30000, 'https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=800&q=80', true, true),
('srv-cej-2', 'cat-cejas', 'Lifting de Pestañas & Laminado de Cejas', 'lifting-pestanas-laminado-cejas', 'Curvatura natural desde la raíz, nutrición con keratina y peinado fijador orgánico.', 'Potencia el largo y volumen de tus pestañas naturales sin necesidad de extensiones, junto al peinado alisado de cejas más demandado.', '["Mirada abierta y descansada", "Efecto rímel y cejas orgánicas por 6 a 8 semanas", "No daña la pestaña natural"]'::jsonb, 'Evitar vapores, saunas y frotar los ojos durante las primeras 24 horas.', 60, 60000, 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80', true, false),
('srv-cab-1', 'cat-cabello', 'Peinados, Ondas & Planchado Profesional', 'peinados-ondas-planchado', 'Termoprotección capilar, cepillado pulido, ondas al agua o planchado espejo de larga duración.', 'Preparamos tu cabello con productos de nutrición y sellado térmico para que luzcas un peinado impecable que resista todo tu evento.', '["Cabello brillante sin frizz", "Fijación flexible sin efecto acartonado", "Acabados modernos y sofisticados"]'::jsonb, 'Tener el cabello lavado del día anterior o limpio y seco.', 50, 40000, 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80', true, true),
('srv-cab-2', 'cat-cabello', 'Trenzas Artísticas & Recogidos', 'trenzas-artisticas-recogidos', 'Diseños de trenzas laterales, recogidos elegantes y semirecogidos para eventos especiales.', 'Estilos creativos y duraderos para novias, graduadas, quinceañeras o para lucir un look fresco y original.', '["Comodidad total durante todo el día", "Diseños personalizados", "Alta durabilidad"]'::jsonb, 'Traer accesorios si deseas incorporarlos en el peinado.', 60, 50000, 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80', true, false),
('srv-maq-1', 'cat-maquillaje', 'Maquillaje Social & Para Eventos', 'maquillaje-social-eventos', 'Preparación de piel blindada, corrección cromática, pestañas postizas y fijación de 24h.', 'Diseñado para resaltar tus mejores rasgos con elegancia y armonía. Piel con acabado aterciopelado, resistente a lágrimas, calor y fotografía en alta definición.', '["Piel blindada de larga duración", "Tonos y estilos adaptados a tu vestuario", "Pestañas por punto o tira incluidas"]'::jsonb, 'Asistir con blusa o vestido de botones o escote amplio.', 60, 75000, 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80', true, true),
('srv-maq-2', 'cat-maquillaje', 'Maquillaje Glam & Gala', 'maquillaje-glam-gala', 'Técnicas de ojos ahumados o cut crease, glitter fino, contornos esculpidos y labios de impacto.', 'Para quienes buscan un look impactante y sofisticado en fiestas nocturnas, bodas o sesiones fotográficas.', '["Efecto filtro en vivo", "Máxima durabilidad y resistencia", "Asesoría de estilo"]'::jsonb, '', 75, 90000, 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80', true, false),
('srv-una-1', 'cat-unas', 'Manicure & Pedicure Semi-Permanente', 'manicure-pedicure-semipermanente', 'Limpieza profunda de cutículas, exfoliación, esmaltado en gel curado en lámpara LED.', 'Cuidado completo para manos y pies con brillo espejo y resistencia intacta durante hasta 21 días.', '["Secado instantáneo bajo lámpara", "Durabilidad extrema sin descascararse", "Diseños minimalistas y francesas perfectas"]'::jsonb, 'Evitar cortar cutículas en casa antes del servicio.', 60, 45000, 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80', true, true),
('srv-spa-1', 'cat-spa-ninas', 'Spa Mágico para Niñas', 'spa-magico-ninas', 'Mascarilla frutal de chocolate/fresa, tina relajante de burbujas, mini-manicure con glitter y peinado con brillos.', 'Una experiencia tierna, divertida y segura pensada para cumpleaños o consentir a las pequeñas princesas en un ambiente alegre y lleno de detalles.', '["Productos 100% hipoalergénicos y seguros", "Esmaltes al agua lavables", "Momentos mágicos de diversión y fotos inolvidables"]'::jsonb, 'Apto para niñas de 4 a 12 años. Acompañamiento de un adulto responsable.', 60, 55000, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80', true, true)
ON CONFLICT (id) DO NOTHING;

-- Horarios de Atención
INSERT INTO public.business_hours (day_of_week, day_name, open_time, close_time, is_closed) VALUES
(1, 'Lunes', '08:00', '18:00', false),
(2, 'Martes', '08:00', '18:00', false),
(3, 'Miércoles', '08:00', '18:00', false),
(4, 'Jueves', '08:00', '18:00', false),
(5, 'Viernes', '08:00', '18:00', false),
(6, 'Sábado', '08:00', '18:00', false),
(0, 'Domingo', '09:00', '14:00', true)
ON CONFLICT (day_of_week) DO NOTHING;

-- Galería
INSERT INTO public.gallery (id, title, category, category_slug, image_url, description, is_active, order_index) VALUES
('gal-1', 'Higiene Facial y Velo Hidratante', 'Facial', 'higiene-facial', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80', 'Piel purificada y luminosa con protocolo de alta frecuencia y nutrición.', true, 1),
('gal-2', 'Maquillaje Social Elegante', 'Maquillaje', 'maquillaje', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80', 'Piel blindada con acabado satinado y ojos en tonos bronce cálidos.', true, 2),
('gal-3', 'Diseño de Cejas y Visagismo', 'Cejas & Pestañas', 'cejas-pestanas', 'https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=900&q=80', 'Definición natural y sombreado suave que enmarca la mirada.', true, 3),
('gal-4', 'Masaje Relajante y Aromaterapia', 'Masajes', 'masajes', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80', 'Sesión integral para armonizar cuerpo y mente.', true, 4),
('gal-5', 'Peinado con Ondas Glamour', 'Cabello', 'cabello', 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80', 'Ondas pulidas y duraderas para sesión de fotos y evento social.', true, 5),
('gal-6', 'Spa Consentidor para Niñas', 'Spa', 'spa-para-ninas', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80', 'Mascarilla de chocolate y glitter bar en tarde de spa infantil.', true, 6),
('gal-7', 'Manicure en Gel Delicado', 'Uñas', 'manicure-pedicure', 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=80', 'Esmaltado en tono nude con detalles dorados y brillo prolongado.', true, 7),
('gal-8', 'Lifting de Pestañas Naturales', 'Cejas & Pestañas', 'cejas-pestanas', 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80', 'Curvatura elegante desde la raíz con nutrición profunda.', true, 8)
ON CONFLICT (id) DO NOTHING;

-- Testimonios
INSERT INTO public.testimonials (id, customer_name, service_name, rating, comment, is_active) VALUES
('test-1', 'Camila Morales', 'Limpieza Facial Profunda', 5, 'La atención de Sandrit es inigualable. Mi piel quedó suavecita, cero rojeces y súper luminosa. La delicadeza con la que trabaja te hace sentir en un santuario de paz.', true),
('test-2', 'Valentina Restrepo', 'Maquillaje Social & Peinado', 5, 'Me maquilló y peinó para el matrimonio de mi hermana. El maquillaje duró intacto toda la noche a pesar del baile y el calor. Sandrit tiene unas manos mágicas.', true),
('test-3', 'Laura Sofía Gómez', 'Diseño de Cejas & Henna', 5, 'Siempre me daba miedo hacerme las cejas, pero Sandrit entendió perfectamente la forma de mi rostro. Quedaron naturales y simétricas. 100% recomendada.', true),
('test-4', 'Mariana Duarte', 'Spa para Niñas', 5, 'Le organicé el spa de cumpleaños a mi hija con sus primitas y quedaron fascinadas. El cuidado, los productos suaves y el ambiente dulce fue inolvidable.', true)
ON CONFLICT (id) DO NOTHING;

-- Configuración del Negocio
INSERT INTO public.business_settings (id, business_name, stylist_name, tagline, phone, whatsapp, instagram, email, address, hours_text, welcome_message, about_story, about_mission, about_vision)
VALUES (
    'default-settings',
    'BY SANDRIT — Servicios Estéticos & Cosméticos',
    'Sandrit Ríos Molinares',
    'Belleza · Estética · Bienestar',
    '3127654780',
    '3127654780',
    'by_sandrit',
    'contacto@bysandrit.com',
    'Ubicación disponible al agendar',
    'Lunes a Sábado: 8:00 AM - 6:00 PM | Domingos & Festivos: Con cita previa',
    '¡Bienvenida a By Sandrit! Estamos listas para consentirte.',
    'By Sandrit nace de la pasión y vocación de Sandrit Ríos Molinares por el cuidado estético integral, combinando técnicas avanzadas, productos de alta calidad y un trato cálido y personalizado.',
    'Brindar servicios estéticos y cosméticos de excelencia que eleven la confianza, el bienestar y la belleza auténtica de cada una de nuestras clientas.',
    'Ser el centro de estética y belleza de referencia en la región, reconocido por la excelencia en sus tratamientos y trato humano.'
)
ON CONFLICT (id) DO UPDATE SET
    business_name = EXCLUDED.business_name,
    stylist_name = EXCLUDED.stylist_name;
