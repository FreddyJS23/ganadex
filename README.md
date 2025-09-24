# Ganadex - Documentación del Proyecto

## Índice

- [Introducción](#introducción)
- [Estructura del Proyecto](#estructura-de-carpetas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Guía de Desarrollo](#guía-de-desarrollo)

## Introducción

Ganadex es un sistema automatizado para monitorear y gestionar cada etapa del ciclo de vida de los animales bovinos. Este proyecto está desarrollado con Next.js.

El objetivo principal de Ganadex es proporcionar herramientas para la gestión de ganado.

## Características Principales

### Gestión de Ganado

- Registro completo de animales con historial detallado

- Seguimiento de ciclo de vida: nacimientos, crecimiento, reproducción

- Control de salud: vacunas, tratamientos, enfermedades

- Gestión reproductiva: servicios, preñeces, partos

- Gestión de servicios de toros

### Haciendas y Personal

- Gestión múltiple de haciendas

- Control de usuarios veterinarios por haciendas

- Gestión de personal obrero y veterinario

### Dashboards

- Dashboards interactivos con métricas clave

- Reportes personalizables por fechas y criterios

- Estadísticas de productividad

- Notificaciones en tiempo real

- Asignación de personal (obreros, veterinarios)

- Permisos granular por funcionalidad

### Sistema de Alertas

- Recordatorios automáticos para vacunas

- Alertas de eventos críticos (partos, servicios)

- Notificaciones en tiempo real

### Reportes y Analytics

- Exportación de reportes estadísticos en PDF

## Estructura de Carpetas

 El proyecto sigue una estructura modular para facilitar la escalabilidad y el mantenimiento. A continuación, se describe la estructura principal:

```bash
public/
├── assets/
│   ├── icons/
│   ├── images/
├── fonts/
src/
├── actions/               # Lógica para interactuar con la API (fetch, CRUD).
├── app/                   # Rutas y páginas de Next.js.
│   ├── (routes auth)/     # Rutas protegidas por autenticación.
│   ├── api/               # Rutas API internas de Next.js.
│   └── layout.tsx         # Layout principal de la aplicación.
│   └── auth.ts            # Lógica de autenticación authjs.
│   └── error.tsx          # Pagina de error.
│   └── providers.tsx      # Uso de proveedores.
├── collections/           # Datos estáticos y configuraciones (íconos, textos, etc.).
├── components/            # Componentes reutilizables (UI, tablas, gráficos, etc.).
│   ├── charts/            # Gráficos y visualizaciones de datos.
│   ├── modals/            # Modales reutilizables.
│   ├── tables/            # Tablas para mostrar datos.
├── constants/             # Constantes globales (colores, mensajes, etc.).
├── hooks/                 # Hooks personalizados.
├── lib/                   # Funciones auxiliares y utilidades.
├── services/              # Servicios para interactuar con la API externa.
├── stores/                # Gestión de estado global (Zustand, Redux, etc.).
├── types/                 # Definiciones de tipos TypeScript.
├── utils/                 # Funciones utilitarias (validaciones, formateos, etc.).
└── validations/           # Esquemas de validación (Zod).

```

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina:

- **Node.js** (versión 18 o superior).
- **npm, yarn, pnpm o bun** (gestor de paquetes).
- **Git** (para clonar el repositorio).
- **Docker** (opcional, para entornos de desarrollo consistentes).

## Instalación

Sigue estos pasos para instalar el proyecto en tu máquina local:

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/ganadex.git
   cd ganadex

2. **Instala las dependencias:**

   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env.local` en la raíz del proyecto y agrega las siguientes variables:

```env

URL base del backend Laravel (sin /api/)

Ejemplo: http://localhost:8000 o https://api.tudominio.com

API_URL_BASE="http://127.0.0.1:8000/"

//URL completa para las APIs (incluye /api/)

API_URL= "http://127.0.0.1:8000/api/"


// Modo de desarrollo (development) o producción (production)

APP_ENV=development

// URL base de la aplicación frontend (para producción cambiar por dominio real)

NEXT_PUBLIC_BASE_URL="http://localhost:3000"

// Dominio de origen para CORS y validaciones

ORIGIN=127.0.0.1


/// CONFIGURACIÓN DE AUTENTICACIÓN ///

//Secreto para firmar tokens JWT (debe ser una cadena segura de 32+ caracteres)

//Generar nuevo secreto con: npx auth secret

AUTH_SECRET=G/QG9l1ryBfl.......

NEXT_PUBLIC_BASE_URL="https://tudominio.com"

```

## Ejecución del Proyecto

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm run dev
# o
yarn dev
```

***Comandos Disponibles***

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Servidor de producción
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación

## Guía de Desarrollo

## **Contenido de la Carpeta `src/lib`**

### **Estructura de la Carpeta**

```bash
src/lib/
├── errors/
│   └── errorFromApi.ts
├── hooks/
│   └── useEditDelete.ts
```

### **Descripción de los Archivos**

#### **`errors/errorFromApi.ts`**

Clase personalizada de error que se utiliza para manejar errores de la API. Esta clase hereda de la clase `Error` y proporciona métodos para extraer información relevante del error, como el código de error y el mensaje detallado.

**Ejemplo de funcionalidad:**

- Extraer mensajes de error de las respuestas de la API.
- Formatear errores en un formato estándar para el componente error.tsx.

**Ejemplo de uso:**
```ts
import { ResponseErrorFromApi } from "@/types";

throw new ErrorFromApi("error", {
    status: status,
    data: data as ResponseErrorFromApi["data"],
  });
```

### Estilo de Código

- Seguir las reglas de ESLint y biome configuradas en el proyecto.
