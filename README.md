# 🌸 BY SANDRIT — Plataforma Web de Servicios Estéticos & Cosméticos

[![Desarrollado por YorDev](https://img.shields.io/badge/Desarrollado%20por-YorDev-C59B4E?style=for-the-badge&logo=codeforces&logoColor=white)](https://yordevctg17.netlify.app/)
[![React](https://img.shields.io/badge/React%2018-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)

Plataforma web integral de reservas, catálogo de tratamientos, gestión administrativa y presencia digital diseñada para **BY SANDRIT**, centro de belleza, bienestar y cosmetología liderado por la especialista **Sandrit Ríos Molinares**.

---

## 👨‍💻 Autor y Desarrollo Web
- **Desarrollador:** **YorDev** (Yorleidys Ruiz Ruiz)
- **Portafolio / Sitio Web:** [https://yordevctg17.netlify.app/](https://yordevctg17.netlify.app/)
- **Cliente:** BY SANDRIT — Sandrit Ríos Molinares

---

## ✨ Características Principales

### 🌟 Portal Público (Experiencia del Cliente)
- **Catálogo de Tratamientos:** Higiene facial básica y profunda con alta frecuencia, tratamiento antiacné, masajes relajantes, drenaje linfático manual, depilación con cera hipoalergénica, diseño y visagismo de cejas con henna, lifting de pestañas naturales, maquillaje social y spa consentidor para niñas.
- **Asistente de Reservas Online (`/agendar`):** Flujo guiado paso a paso para seleccionar tratamiento, fecha, hora disponible según horarios laborales, datos de contacto y confirmación con integración directa a WhatsApp.
- **Galería Interactiva con Filtros (`/galeria`):** Muestra de resultados y trabajos categorizados.
- **Testimonios de Clientes:** Reseñas reales y valoraciones con estrellas.
- **Centro de Políticas & Marco Legal (`/politicas`):**
  - Términos y Condiciones de Servicio (`/politicas/terminos`)
  - Política de Privacidad & Tratamiento de Datos / Habeas Data (`/politicas/privacidad`)
  - Política de Cancelaciones y Reagendamiento (`/politicas/cancelaciones`)
  - Consentimiento Informado & Protocolos de Bioseguridad (`/politicas/consentimiento-bioseguridad`)
- **Sección de Preguntas Frecuentes (FAQ):** Preguntas claras sobre bioseguridad, cuidados pre/post tratamiento y medios de pago.

### 🛡️ Panel Administrativo (`/admin`)
- **Dashboard de Métricas:** Citas del día, ingresos estimados, total de reservas y estado de agenda.
- **Gestor de Citas:** Confirmar, completar o cancelar citas con actualización de estados en tiempo real.
- **Administrador de Servicios:** Creación, edición de precios, duración, imágenes y destacados.
- **Gestión de Horarios:** Configuración de días laborales y franjas de atención.
- **Gestión de Galería & Testimonios:** Subida de imágenes a Supabase Storage y activación de reseñas.
- **Configuración del Negocio:** Modificación de teléfonos de WhatsApp, redes sociales, horarios y textos.

### 🚀 Optimización SEO & GEO (Generative Engine Optimization)
- **Schema.org JSON-LD:** Datos estructurados para `BeautySalon`, `Service` y `FAQPage`.
- **Archivos de Conocimiento IA:** `llms.txt` y `llms-full.txt` estructurados para modelos como ChatGPT, Gemini y Perplexity.
- **Rastreo e Indexación:** `sitemap.xml` y `robots.txt` optimizados.

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 18, Vite, JavaScript / TypeScript, Tailwind CSS.
- **Animaciones e Íconos:** Lucide React, Framer Motion.
- **Base de Datos & Auth:** Supabase (PostgreSQL, Row Level Security, Storage Buckets).
- **Hosting & CI/CD:** Netlify con soporte SPA (`_redirects` y `netlify.toml`).

---

## 📁 Estructura del Proyecto

```text
├── public/
│   ├── _redirects              # Regla de redirección SPA para Netlify
│   ├── robots.txt              # Configuración de rastreo para buscadores
│   ├── sitemap.xml             # Mapa del sitio para SEO
│   ├── llms.txt                # Conocimiento para motores de IA (GEO)
│   └── llms-full.txt           # Documentación completa para LLMs
├── src/
│   ├── components/
│   │   ├── admin/              # Componentes del panel administrativo
│   │   ├── booking/            # Wizard y calendario de reservas
│   │   ├── common/             # Botones, modales, FAQs, títulos
│   │   ├── layout/             # Header, Navbar, Footer
│   │   ├── policies/           # Layout de documentos legales
│   │   ├── services/           # Tarjetas y filtros de servicios
│   │   └── testimonials/       # Carrusel y tarjetas de opiniones
│   ├── context/
│   │   ├── AuthContext.jsx     # Autenticación de administrador con Supabase
│   │   └── BusinessContext.jsx # Estado global del negocio y catálogo
│   ├── lib/
│   │   └── supabase.js         # Cliente de conexión a Supabase
│   ├── pages/
│   │   ├── admin/              # Vistas administrativas
│   │   └── public/             # Vistas de clientes (Home, Servicios, Citas, Políticas)
│   ├── services/               # Lógica de datos (API Supabase + fallback demo)
│   ├── utils/                  # Formateadores de fecha, precios y SEO
│   ├── App.tsx                 # Enrutador principal (React Router)
│   └── main.tsx                # Entrada de la aplicación
├── .env.example                # Plantilla de variables de entorno
├── netlify.toml                # Configuración de compilación para Netlify
├── supabase_schema.sql         # Script SQL con esquema completo y seed data
└── package.json                # Dependencias y scripts
```

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/by-sandrit-web.git
cd by-sandrit-web
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

*(Nota: Si no configuras las credenciales de Supabase, la aplicación funcionará en modo de demostración interactivo con datos locales).*

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) o el puerto asignado en tu navegador.

---

## 🗄️ Configuración de la Base de Datos (Supabase)

1. Crea un nuevo proyecto en [Supabase](https://supabase.com/).
2. Ve al **SQL Editor** en el panel de Supabase.
3. Copia todo el contenido del archivo **`supabase_schema.sql`** incluido en este repositorio y ejecútalo.
4. En **Authentication > Users**, crea el usuario y contraseña para el administrador.
5. Copia tu `Project URL` y `anon public key` desde **Project Settings > API** a tu `.env` o a las variables de Netlify.

---

## 🌐 Despliegue en Netlify

1. Inicia sesión en [Netlify](https://app.netlify.com/) y haz clic en **"Add new site" > "Import an existing project"**.
2. Conecta tu repositorio de GitHub.
3. Configuración de Build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. En **Site configuration > Environment variables**, añade:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Haz clic en **Deploy Site**.

---

## 📄 Licencia y Derechos de Autor

© 2026 **BY SANDRIT**. Todos los derechos reservados.  
Diseño, desarrollo web y optimización técnica por **[YorDev](https://yordevctg17.netlify.app/)**.
