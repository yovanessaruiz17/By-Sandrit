/**
 * Comprehensive SEO & GEO (Generative Engine Optimization) Manager
 * Generates dynamic titles, meta descriptions, Open Graph, Twitter Cards,
 * Geolocation tags, Canonical links, and Schema.org JSON-LD structured data.
 */

const BASE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://bysandrit.com';
const BRAND_NAME = 'BY SANDRIT';
const BRAND_FULL = 'BY SANDRIT — Servicios Estéticos & Cosméticos | Sandrit Ríos Molinares';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&h=630&q=80';

export function updatePageSEO({
  title,
  description,
  keywords,
  canonicalPath = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  service = null,
  faqs = null,
  breadcrumbs = null,
  noindex = false
}) {
  if (typeof document === 'undefined') return;

  const currentUrl = `${BASE_URL}${canonicalPath || window.location.pathname}`;
  const pageTitle = title ? `${title} | ${BRAND_NAME} — Estética & Cosmética` : BRAND_FULL;
  const pageDesc = description ||
    'Centro especializado de estética, belleza y bienestar por Sandrit Ríos Molinares. Higiene facial profunda, masajes relajantes, cejas, pestañas, depilación con cera, maquillaje y spa para niñas.';
  const pageKeywords = keywords ||
    'estética, cosmetología, higiene facial profunda, masajes relajantes, drenaje linfático, depilación con cera, diseño de cejas, lifting de pestañas, maquillaje social, spa niñas, Sandrit Ríos Molinares, By Sandrit, citas estética';

  // 1. Document Title
  document.title = pageTitle;

  // Helper to upsert meta tag
  const setMeta = (nameAttr, nameVal, content) => {
    if (!content) return;
    let el = document.querySelector(`meta[${nameAttr}="${nameVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(nameAttr, nameVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard Meta Tags
  setMeta('name', 'description', pageDesc);
  setMeta('name', 'keywords', pageKeywords);
  setMeta('name', 'author', 'YorDev (https://yordevctg17.netlify.app/) | Sandrit Ríos Molinares');
  setMeta('name', 'designer', 'YorDev — https://yordevctg17.netlify.app/');
  setMeta('name', 'copyright', '© 2026 BY SANDRIT. Todos los derechos reservados. Desarrollado por YorDev.');
  setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  setMeta('name', 'googlebot', noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large');
  setMeta('name', 'bingbot', noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large');

  // GEO & Local Optimization Meta Tags (Generative & Local search engine positioning)
  setMeta('name', 'geo.region', 'CO');
  setMeta('name', 'geo.placename', 'Colombia');
  setMeta('name', 'geo.position', '4.570868;-74.297333');
  setMeta('name', 'ICBM', '4.570868, -74.297333');
  setMeta('name', 'DC.title', pageTitle);
  setMeta('name', 'DC.creator', 'Sandrit Ríos Molinares');
  setMeta('name', 'DC.description', pageDesc);
  setMeta('name', 'language', 'Spanish');

  // Open Graph (Facebook, WhatsApp, LinkedIn, iMessage previews)
  setMeta('property', 'og:title', pageTitle);
  setMeta('property', 'og:description', pageDesc);
  setMeta('property', 'og:url', currentUrl);
  setMeta('property', 'og:type', type);
  setMeta('property', 'og:site_name', 'BY SANDRIT — Servicios Estéticos & Cosméticos');
  setMeta('property', 'og:locale', 'es_CO');
  setMeta('property', 'og:image', image);
  setMeta('property', 'og:image:alt', title || 'By Sandrit Servicios Estéticos');

  // Twitter Cards
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', pageTitle);
  setMeta('name', 'twitter:description', pageDesc);
  setMeta('name', 'twitter:image', image);
  setMeta('name', 'twitter:creator', '@by_sandrit');

  // Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = currentUrl;

  // 2. Schema.org JSON-LD Injection for Rich Snippets & Generative AI Knowledge Graphs
  injectStructuredData({
    pageTitle,
    pageDesc,
    currentUrl,
    image,
    service,
    faqs,
    breadcrumbs
  });
}

function injectStructuredData({ pageTitle, pageDesc, currentUrl, image, service, faqs, breadcrumbs }) {
  const schemaId = 'schema-by-sandrit-jsonld';
  let scriptEl = document.getElementById(schemaId);
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = schemaId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  // Base Business Schema
  const businessSchema = {
    '@type': ['BeautySalon', 'HealthAndBeautyBusiness', 'DaySpa'],
    '@id': `${BASE_URL}/#organization`,
    'name': 'BY SANDRIT — Servicios Estéticos & Cosméticos',
    'alternateName': ['By Sandrit', 'Sandrit Ríos Molinares Estética', 'BySandrit'],
    'url': BASE_URL,
    'logo': {
      '@type': 'ImageObject',
      'url': `${BASE_URL}/logo.jpg`,
      'caption': 'By Sandrit Logo'
    },
    'image': image || DEFAULT_IMAGE,
    'description': 'Centro profesional de estética facial, masajes terapéuticos, cejas, pestañas, depilación con cera, maquillaje y bienestar integral.',
    'telephone': '+573127654780',
    'priceRange': '$$',
    'currenciesAccepted': 'COP',
    'paymentAccepted': 'Cash, Credit Card, Debit Card, Nequi, Daviplata, Transferencia Bancaria',
    'founder': {
      '@type': 'Person',
      'name': 'Sandrit Ríos Molinares',
      'jobTitle': 'Especialista en Servicios Estéticos y Cosméticos',
      'sameAs': 'https://instagram.com/by_sandrit'
    },
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'CO',
      'addressLocality': 'Colombia'
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '08:00',
        'closes': '18:00'
      }
    ],
    'sameAs': [
      'https://instagram.com/by_sandrit',
      'https://wa.me/573127654780'
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Catálogo de Servicios Estéticos y Cosméticos By Sandrit',
      'itemListElement': [
        {
          '@type': 'OfferCatalog',
          'name': 'Higiene y Cuidado Facial',
          'itemListElement': [
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Higiene Facial Profunda' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Higiene Facial Básica' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Tratamiento Antiacné' } }
          ]
        },
        {
          '@type': 'OfferCatalog',
          'name': 'Masajes & Bienestar Corporal',
          'itemListElement': [
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Masaje Relajante Corporal' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Drenaje Linfático Manual' } }
          ]
        },
        {
          '@type': 'OfferCatalog',
          'name': 'Mirada & Cejas',
          'itemListElement': [
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Diseño y Pigmentación de Cejas' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Lifting de Pestañas con Nutrición' } }
          ]
        },
        {
          '@type': 'OfferCatalog',
          'name': 'Spa para Niñas',
          'itemListElement': [
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Experiencia Spa Consentidor Niñas' } }
          ]
        }
      ]
    }
  };

  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      'url': BASE_URL,
      'name': 'BY SANDRIT',
      'publisher': { '@id': `${BASE_URL}/#organization` },
      'inLanguage': 'es'
    },
    businessSchema
  ];

  // Specific Service Schema
  if (service) {
    graph.push({
      '@type': 'Service',
      '@id': `${currentUrl}#service`,
      'name': service.name,
      'description': service.description || service.short_description,
      'provider': { '@id': `${BASE_URL}/#organization` },
      'serviceType': service.service_categories?.name || 'Servicio Estético',
      'offers': {
        '@type': 'Offer',
        'price': service.price || '0',
        'priceCurrency': 'COP',
        'availability': 'https://schema.org/InStock',
        'url': currentUrl
      }
    });
  }

  // FAQ Schema (Generative AI Q&A Grounding)
  if (faqs && Array.isArray(faqs) && faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${currentUrl}#faq`,
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    });
  }

  // Breadcrumbs Schema
  if (breadcrumbs && Array.isArray(breadcrumbs)) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${currentUrl}#breadcrumbs`,
      'itemListElement': breadcrumbs.map((b, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': b.name,
        'item': `${BASE_URL}${b.path}`
      }))
    });
  }

  scriptEl.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph
  }, null, 2);
}
