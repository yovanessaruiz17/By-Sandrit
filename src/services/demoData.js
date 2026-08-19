// Demo fallback datasets used when Supabase is not configured or in development mode

export const demoBusinessSettings = {
  id: 'default-settings',
  business_name: 'BY SANDRIT — Servicios Estéticos & Cosméticos',
  stylist_name: 'Sandrit Ríos Molinares',
  tagline: 'Belleza · Estética · Bienestar',
  logo_url: 'https://i.postimg.cc/mkg3bwD8/logo-cuadrado.jpg',
  hero_title: 'Realzamos tu esencia, resaltamos tu belleza.',
  hero_subtitle: 'Descubre una experiencia de belleza, estética y bienestar diseñada para consentirte y resaltar lo mejor de ti.',
  phone: '3127654780',
  whatsapp: '3127654780',
  instagram: 'by_sandrit',
  email: 'contacto@bysandrit.com',
  address: 'Ubicación disponible al agendar',
  hours_text: 'Lunes a Sábado: 8:00 AM - 6:00 PM | Domingos & Festivos: Con cita previa',
  welcome_message: '¡Bienvenida a By Sandrit! Estamos listas para consentirte.',
  about_story: 'By Sandrit nace de la pasión y vocación de Sandrit Ríos Molinares por el cuidado estético integral, combinando técnicas avanzadas, productos de alta calidad y un trato cálido y personalizado para realzar la belleza natural y brindar momentos de bienestar.',
  about_mission: 'Brindar servicios estéticos y cosméticos de excelencia que eleven la confianza, el bienestar y la belleza auténtica de cada una de nuestras clientas a través de un trato humano y personalizado.',
  about_vision: 'Ser el centro de estética y belleza de referencia en la región, reconocido por la excelencia en sus tratamientos, innovación constante y una experiencia memorable.',
  about_values: ['Calidad e Higiene', 'Atención Personalizada', 'Empatía y Calidez', 'Pasión por la Belleza', 'Compromiso y Puntualidad'],
  currency_symbol: '$',
  is_demo_mode: true
};

export const demoCategories = [
  { id: 'cat-facial', name: 'Higiene Facial', slug: 'higiene-facial', order_index: 1, icon: 'Sparkles', description: 'Tratamientos profundos para purificar, renovar y dar luminosidad a tu piel.' },
  { id: 'cat-masajes', name: 'Masajes', slug: 'masajes', order_index: 2, icon: 'HeartHandshake', description: 'Técnicas de relajación corporal y drenaje para aliviar tensiones.' },
  { id: 'cat-depilacion', name: 'Depilación con Cera', slug: 'depilacion-con-cera', order_index: 3, icon: 'Feather', description: 'Eliminación delicada del vello por zonas con máxima suavidad.' },
  { id: 'cat-cejas', name: 'Cejas & Pestañas', slug: 'cejas-pestanas', order_index: 4, icon: 'Eye', description: 'Diseño, laminado y realce de mirada que armonizan tu rostro.' },
  { id: 'cat-cabello', name: 'Cabello', slug: 'cabello', order_index: 5, icon: 'Flame', description: 'Peinados, trenzas, planchados y ondas para cualquier ocasión.' },
  { id: 'cat-maquillaje', name: 'Maquillaje', slug: 'maquillaje', order_index: 6, icon: 'Palette', description: 'Maquillaje social y glam adaptado a tu estilo y evento.' },
  { id: 'cat-unas', name: 'Manicure & Pedicure', slug: 'manicure-pedicure', order_index: 7, icon: 'Hand', description: 'Cuidado completo para manos y pies con acabados impecables.' },
  { id: 'cat-spa-ninas', name: 'Spa para Niñas', slug: 'spa-para-ninas', order_index: 8, icon: 'Gift', description: 'Una experiencia divertida, delicada y mágica para las más pequeñas.' },
];

export const demoServices = [
  // Higiene facial
  {
    id: 'srv-fac-1',
    category_id: 'cat-facial',
    name: 'Limpieza Facial Básica',
    slug: 'limpieza-facial-basica',
    short_description: 'Higienización superficial, exfoliación suave, mascarilla hidratante y protector solar.',
    description: 'Tratamiento esencial para mantener los poros limpios y la piel oxigenada. Ideal para pieles jóvenes o como mantenimiento mensual preventivo.',
    benefits: ['Elimina impurezas superficiales', 'Aporta suavidad inmediata', 'Hidrata y equilibra el pH cutáneo', 'Mejora la absorción de cosméticos diarios'],
    recommendations: 'Venir con el rostro desmaquillado si es posible. Evitar exposición solar directa durante las 24 horas siguientes.',
    duration_minutes: 45,
    price: 45000,
    price_is_demo: true,
    image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    is_featured: true
  },
  {
    id: 'srv-fac-2',
    category_id: 'cat-facial',
    name: 'Limpieza Facial Profunda',
    slug: 'limpieza-facial-profunda',
    short_description: 'Vapor de ozono, extracción manual/ultrasónica, alta frecuencia, sérum intensivo y mascarilla LED.',
    description: 'Protocolo completo de desintoxicación celular y renovación dérmica. Extrae comedones e impurezas a nivel profundo dejando la piel radiante y uniforme.',
    benefits: ['Extracción meticulosa de puntos negros', 'Desinflamación y efecto bactericida con alta frecuencia', 'Regeneración celular acelerada', 'Piel luminosa, tersa y oxigenada'],
    recommendations: 'No usar maquillaje por 12 horas. Utilizar protector solar FPS 50+ rigurosamente.',
    duration_minutes: 75,
    price: 75000,
    price_is_demo: true,
    image_url: 'https://images.unsplash.com/photo-1512290900672-1f02e6b0a7ea?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    is_featured: true
  },
  {
    id: 'srv-fac-3',
    category_id: 'cat-facial',
    name: 'Facial Anti-Acné & Purificante',
    slug: 'facial-anti-acne',
    short_description: 'Regulación sebácea, principios activos calmantes, descongestión y sellado antibacteriano.',
    description: 'Diseñado específicamente para pieles con tendencia grasa o brotes de acné. Calma la irritación, controla la producción de sebo y minimiza marcas.',
    benefits: ['Control de brillo y sebo', 'Reducción de rojeces y bacterias', 'Prevención de marcas e imperfecciones', 'Sensación de frescura duradera'],
    recommendations: 'No manipular las lesiones previamente. Mantener una toalla de uso exclusivo para el rostro.',
    duration_minutes: 60,
    price: 68000,
    price_is_demo: true,
    image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    is_featured: false
  },
  {
    id: 'srv-fac-4',
    category_id: 'cat-facial',
    name: 'Facial Luxury & Rejuvenecedor',
    slug: 'facial-luxury',
    short_description: 'Elixir de oro/ácido hialurónico, masaje miofascial remodelador, mascarilla hidroplástica y velo de colágeno.',
    description: 'Nuestra experiencia facial más consentidora. Nutre profundamente las capas de la piel, atenúa líneas de expresión y brinda un glow perlado espectacular.',
    benefits: ['Efecto tensor y lifting instantáneo', 'Hidratación profunda con ácido hialurónico', 'Masaje relajante facial, cuello y escote', 'Glow y luminosidad extrema'],
    recommendations: 'Tratamiento ideal previo a eventos sociales importantes.',
    duration_minutes: 90,
    price: 110000,
    price_is_demo: true,
    image_url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    is_featured: true
  },

  // Masajes
  {
    id: 'srv-mas-1',
    category_id: 'cat-masajes',
    name: 'Masaje Relajante Corporal',
    slug: 'masaje-relajante-corporal',
    short_description: 'Aromaterapia, aceites esenciales tibios, música suave y maniobras descontracturantes suaves.',
    description: 'Libera la fatiga física y mental. Diseñado para devolverle la serenidad a tu cuerpo, aliviar nudos musculares y calmar el sistema nervioso.',
    benefits: ['Disminución del estrés y la ansiedad', 'Mejora la calidad del sueño', 'Alivio de sobrecargas musculares', 'Estimulación de la circulación sanguínea'],
    recommendations: 'Asistir con ropa cómoda. Hidratarse adecuadamente antes y después del masaje.',
    duration_minutes: 60,
    price: 65000,
    price_is_demo: true,
    image_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    is_featured: true
  },
  {
    id: 'srv-mas-2',
    category_id: 'cat-masajes',
    name: 'Drenaje Linfático Manual',
    slug: 'drenaje-linfatico-manual',
    short_description: 'Maniobras rítmicas y suaves para estimular la eliminación de líquidos retenidos y toxinas.',
    description: 'Técnica suave y especializada que activa el sistema linfático, reduce la hinchazón corporal y es ideal para post-operatorios o pesadez en piernas.',
    benefits: ['Reducción visible de retención de líquidos', 'Alivio de pesadez y cansancio en piernas', 'Favorece la depuración orgánica', 'Mejora el aspecto de la piel'],
    recommendations: 'Beber suficiente agua tras la sesión para potenciar la eliminación de toxinas.',
    duration_minutes: 60,
    price: 70000,
    price_is_demo: true,
    image_url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    is_featured: false
  },
  {
    id: 'srv-mas-3',
    category_id: 'cat-masajes',
    name: 'Masaje Combinado Relajante & Terapéutico',
    slug: 'masaje-combinado',
    short_description: 'Fusión de técnicas descontracturantes en espalda/cuello con relajación general y puntos de presión.',
    description: 'El equilibrio ideal entre alivio de puntos de dolor agudo y descanso integral.',
    benefits: ['Atención focalizada a contracturas', 'Relajación muscular integral', 'Recuperación de movilidad articular'],
    recommendations: 'Indicar zonas de dolor específico al iniciar la sesión.',
    duration_minutes: 75,
    price: 85000,
    price_is_demo: true,
    image_url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    is_featured: true
  },

  // Depilación con cera
  {
    id: 'srv-dep-1',
    category_id: 'cat-depilacion',
    name: 'Depilación por Zonas (Cera Elástica/Miel)',
    slug: 'depilacion-con-cera-zonas',
    short_description: 'Cera hipoalergénica de baja temperatura para cejas, bozo, axilas, piernas o zona íntima.',
    description: 'Extracción del vello desde la raíz con cera elástica formulada para pieles sensibles, minimizando molestias y dejando la piel tersa.',
    benefits: ['Retraso progresivo en el crecimiento del vello', 'Piel sedosa sin irritaciones', 'Técnica higiénica y rápida'],
    recommendations: 'Tener el vello con al menos 3mm de longitud. Evitar cremas con fragancia antes de la cita.',
    duration_minutes: 30,
    price: 35000,
    price_is_demo: true,
    image_url: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    is_featured: false
  },

  // Cejas & pestañas
  {
    id: 'srv-cej-1',
    category_id: 'cat-cejas',
    name: 'Diseño y Depilación de Cejas con Henna / Pigmento',
    slug: 'diseno-depilacion-cejas-pigmento',
    short_description: 'Visagismo facial personalizado, depilación precisa y sombreado semipermanente efecto natural.',
    description: 'Armonizamos tu mirada trazando la forma geométrica perfecta según las facciones de tu rostro, complementando con pigmento vegetal de larga duración.',
    benefits: ['Cejas definidas y con mayor densidad', 'Pigmentación que dura de 7 a 12 días en piel', 'Resalta la expresión y mirada'],
    recommendations: 'No mojar el área en las primeras 12 horas posteriores a la aplicación.',
    duration_minutes: 40,
    price: 30000,
    price_is_demo: true,
    image_url: 'https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    is_featured: true
  },
  {
    id: 'srv-cej-2',
    category_id: 'cat-cejas',
    name: 'Lifting de Pestañas & Laminado de Cejas',
    slug: 'lifting-pestanas-laminado-cejas',
    short_description: 'Curvatura natural desde la raíz, nutrición con keratina y peinado fijador orgánico.',
    description: 'Potencia el largo y volumen de tus pestañas naturales sin necesidad de extensiones, junto al peinado alisado de cejas más demandado.',
    benefits: ['Mirada abierta y descansada', 'Efecto rímel y cejas orgánicas por 6 a 8 semanas', 'No daña la pestaña natural'],
    recommendations: 'Evitar vapores, saunas y frotar los ojos durante las primeras 24 horas.',
    duration_minutes: 60,
    price: 60000,
    price_is_demo: true,
    image_url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    is_featured: false
  },

  // Cabello
  {
    id: 'srv-cab-1',
    category_id: 'cat-cabello',
    name: 'Peinados, Ondas & Planchado Profesional',
    slug: 'peinados-ondas-planchado',
    short_description: 'Termoprotección capilar, cepillado pulido, ondas al agua o planchado espejo de larga duración.',
    description: 'Preparamos tu cabello con productos de nutrición y sellado térmico para que luzcas un peinado impecable que resista todo tu evento.',
    benefits: ['Cabello brillante sin frizz', 'Fijación flexible sin efecto acartonado', 'Acabados modernos y sofisticados'],
    recommendations: 'Tener el cabello lavado del día anterior o limpio y seco.',
    duration_minutes: 50,
    price: 40000,
    price_is_demo: true,
    image_url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    is_featured: true
  },
  {
    id: 'srv-cab-2',
    category_id: 'cat-cabello',
    name: 'Trenzas Artísticas & Recogidos',
    slug: 'trenzas-artisticas-recogidos',
    short_description: 'Diseños de trenzas laterales, recogidos elegantes y semirecogidos para eventos especiales.',
    description: 'Estilos creativos y duraderos para novias, graduadas, quinceañeras o para lucir un look fresco y original.',
    benefits: ['Comodidad total durante todo el día', 'Diseños personalizados', 'Alta durabilidad'],
    recommendations: 'Traer accesorios si deseas incorporarlos en el peinado.',
    duration_minutes: 60,
    price: 50000,
    price_is_demo: true,
    image_url: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    is_featured: false
  },

  // Maquillaje
  {
    id: 'srv-maq-1',
    category_id: 'cat-maquillaje',
    name: 'Maquillaje Social & Para Eventos',
    slug: 'maquillaje-social-eventos',
    short_description: 'Preparación de piel blindada, corrección cromática, pestañas postizas y fijación de 24h.',
    description: 'Diseñado para resaltar tus mejores rasgos con elegancia y armonía. Piel con acabado aterciopelado, resistente a lágrimas, calor y fotografía en alta definición.',
    benefits: ['Piel blindada de larga duración', 'Tonos y estilos adaptados a tu vestuario', 'Pestañas por punto o tira incluidas'],
    recommendations: 'Asistir con blusa o vestido de botones o escote amplio.',
    duration_minutes: 60,
    price: 75000,
    price_is_demo: true,
    image_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    is_featured: true
  },
  {
    id: 'srv-maq-2',
    category_id: 'cat-maquillaje',
    name: 'Maquillaje Glam & Gala',
    slug: 'maquillaje-glam-gala',
    short_description: 'Técnicas de ojos ahumados o cut crease, glitter fino, contornos esculpidos y labios de impacto.',
    description: 'Para quienes buscan un look impactante y sofisticado en fiestas nocturnas, bodas o sesiones fotográficas.',
    benefits: ['Efecto filtro en vivo', 'Máxima durabilidad y resistencia', 'Asesoría de estilo'],
    duration_minutes: 75,
    price: 90000,
    price_is_demo: true,
    image_url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    is_featured: false
  },

  // Manicure & Pedicure
  {
    id: 'srv-una-1',
    category_id: 'cat-unas',
    name: 'Manicure & Pedicure Semi-Permanente',
    slug: 'manicure-pedicure-semipermanente',
    short_description: 'Limpieza profunda de cutículas, exfoliación, esmaltado en gel curado en lámpara LED.',
    description: 'Cuidado completo para manos y pies con brillo espejo y resistencia intacta durante hasta 21 días.',
    benefits: ['Secado instantáneo bajo lámpara', 'Durabilidad extrema sin descascararse', 'Diseños minimalistas y francesas perfectas'],
    recommendations: 'Evitar cortar cutículas en casa antes del servicio.',
    duration_minutes: 60,
    price: 45000,
    price_is_demo: true,
    image_url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    is_featured: true
  },

  // Spa para Niñas
  {
    id: 'srv-spa-1',
    category_id: 'cat-spa-ninas',
    name: 'Spa Mágico para Niñas',
    slug: 'spa-magico-ninas',
    short_description: 'Mascarilla frutal de chocolate/fresa, tina relajante de burbujas, mini-manicure con glitter y peinado con brillos.',
    description: 'Una experiencia tierna, divertida y segura pensada para cumpleaños o consentir a las pequeñas princesas en un ambiente alegre y lleno de detalles.',
    benefits: ['Productos 100% hipoalergénicos y seguros', 'Esmaltes al agua lavables', 'Momentos mágicos de diversión y fotos inolvidables'],
    recommendations: 'Apto para niñas de 4 a 12 años. Acompañamiento de un adulto responsable.',
    duration_minutes: 60,
    price: 55000,
    price_is_demo: true,
    image_url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    is_active: true,
    is_featured: true
  }
];

export const demoGallery = [
  {
    id: 'gal-1',
    title: 'Higiene Facial y Velo Hidratante',
    category: 'Facial',
    category_slug: 'higiene-facial',
    image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    description: 'Piel purificada y luminosa con protocolo de alta frecuencia y nutrición.',
    is_active: true,
    order_index: 1
  },
  {
    id: 'gal-2',
    title: 'Maquillaje Social Elegante',
    category: 'Maquillaje',
    category_slug: 'maquillaje',
    image_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    description: 'Piel blindada con acabado satinado y ojos en tonos bronce cálidos.',
    is_active: true,
    order_index: 2
  },
  {
    id: 'gal-3',
    title: 'Diseño de Cejas y Visagismo',
    category: 'Cejas & Pestañas',
    category_slug: 'cejas-pestanas',
    image_url: 'https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=900&q=80',
    description: 'Definición natural y sombreado suave que enmarca la mirada.',
    is_active: true,
    order_index: 3
  },
  {
    id: 'gal-4',
    title: 'Masaje Relajante y Aromaterapia',
    category: 'Masajes',
    category_slug: 'masajes',
    image_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
    description: 'Sesión integral para armonizar cuerpo y mente.',
    is_active: true,
    order_index: 4
  },
  {
    id: 'gal-5',
    title: 'Peinado con Ondas Glamour',
    category: 'Cabello',
    category_slug: 'cabello',
    image_url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80',
    description: 'Ondas pulidas y duraderas para sesión de fotos y evento social.',
    is_active: true,
    order_index: 5
  },
  {
    id: 'gal-6',
    title: 'Spa Consentidor para Niñas',
    category: 'Spa',
    category_slug: 'spa-para-ninas',
    image_url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
    description: 'Mascarilla de chocolate y glitter bar en tarde de spa infantil.',
    is_active: true,
    order_index: 6
  },
  {
    id: 'gal-7',
    title: 'Manicure en Gel Delicado',
    category: 'Uñas',
    category_slug: 'manicure-pedicure',
    image_url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=80',
    description: 'Esmaltado en tono nude con detalles dorados y brillo prolongado.',
    is_active: true,
    order_index: 7
  },
  {
    id: 'gal-8',
    title: 'Lifting de Pestañas Naturales',
    category: 'Cejas & Pestañas',
    category_slug: 'cejas-pestanas',
    image_url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80',
    description: 'Curvatura elegante desde la raíz con nutrición profunda.',
    is_active: true,
    order_index: 8
  }
];

export const demoTestimonials = [
  {
    id: 'test-1',
    customer_name: 'Camila Morales',
    service_name: 'Limpieza Facial Profunda',
    rating: 5,
    comment: 'La atención de Sandrit es inigualable. Mi piel quedó suavecita, cero rojeces y súper luminosa. La delicadeza con la que trabaja te hace sentir en un santuario de paz.',
    created_at: '2026-07-15T14:30:00Z',
    is_active: true
  },
  {
    id: 'test-2',
    customer_name: 'Valentina Restrepo',
    service_name: 'Maquillaje Social & Peinado',
    rating: 5,
    comment: 'Me maquilló y peinó para el matrimonio de mi hermana. El maquillaje duró intacto toda la noche a pesar del baile y el calor. Sandrit tiene unas manos mágicas.',
    created_at: '2026-07-28T18:00:00Z',
    is_active: true
  },
  {
    id: 'test-3',
    customer_name: 'Laura Sofía Gómez',
    service_name: 'Diseño de Cejas & Henna',
    rating: 5,
    comment: 'Siempre me daba miedo hacerme las cejas, pero Sandrit entendió perfectamente la forma de mi rostro. Quedaron naturales y simétricas. 100% recomendada.',
    created_at: '2026-08-02T10:15:00Z',
    is_active: true
  },
  {
    id: 'test-4',
    customer_name: 'Mariana Duarte',
    service_name: 'Spa para Niñas',
    rating: 5,
    comment: 'Le organicé el spa de cumpleaños a mi hija con sus primitas y quedaron fascinadas. El cuidado, los productos suaves y el ambiente dulce fue inolvidable.',
    created_at: '2026-08-08T16:45:00Z',
    is_active: true
  }
];

export const demoBusinessHours = [
  { day_of_week: 1, day_name: 'Lunes', open_time: '08:00', close_time: '18:00', is_closed: false },
  { day_of_week: 2, day_name: 'Martes', open_time: '08:00', close_time: '18:00', is_closed: false },
  { day_of_week: 3, day_name: 'Miércoles', open_time: '08:00', close_time: '18:00', is_closed: false },
  { day_of_week: 4, day_name: 'Jueves', open_time: '08:00', close_time: '18:00', is_closed: false },
  { day_of_week: 5, day_name: 'Viernes', open_time: '08:00', close_time: '18:00', is_closed: false },
  { day_of_week: 6, day_name: 'Sábado', open_time: '08:00', close_time: '18:00', is_closed: false },
  { day_of_week: 0, day_name: 'Domingo', open_time: '09:00', close_time: '14:00', is_closed: true },
];

export const demoAppointments = [
  {
    id: 'apt-101',
    customer_name: 'María Fernanda Rojas',
    customer_phone: '3001234567',
    customer_email: 'maria.rojas@gmail.com',
    service_id: 'srv-fac-2',
    service_name: 'Limpieza Facial Profunda',
    service_price: 75000,
    service_duration: 75,
    appointment_date: '2026-08-20',
    appointment_time: '10:00',
    status: 'confirmed',
    notes: 'Piel mixta sensible a fragancias fuertes.',
    created_at: '2026-08-12T09:00:00Z'
  },
  {
    id: 'apt-102',
    customer_name: 'Ana Milena Castro',
    customer_phone: '3159876543',
    customer_email: 'ana.castro@hotmail.com',
    service_id: 'srv-cej-1',
    service_name: 'Diseño y Depilación de Cejas con Henna',
    service_price: 30000,
    service_duration: 40,
    appointment_date: '2026-08-20',
    appointment_time: '14:00',
    status: 'pending',
    notes: 'Primera vez.',
    created_at: '2026-08-13T11:00:00Z'
  },
  {
    id: 'apt-103',
    customer_name: 'Diana Patricia Silva',
    customer_phone: '3187654321',
    customer_email: 'diana.silva@outlook.com',
    service_id: 'srv-mas-1',
    service_name: 'Masaje Relajante Corporal',
    service_price: 65000,
    service_duration: 60,
    appointment_date: '2026-08-19',
    appointment_time: '16:00',
    status: 'completed',
    notes: 'Tensión en cuello y hombros.',
    created_at: '2026-08-10T14:30:00Z'
  }
];
