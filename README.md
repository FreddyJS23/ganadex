# Ganadex - Documentación del Proyecto

## 📖 Índice

- 🎯 [Introducción](#-introducción)
- ⚒️ [Stack Tecnológico](#-stack-tecnológico)
- 📂 [Estructura del Proyecto](#-estructura-de-carpetas)
- 📋 [Requisitos Previos](#-requisitos-previos)
- ⚙️ [Instalación y Configuración](#-instalacion-y-configuracion)
- 🚀 [Ejecución del Proyecto](#-ejecución-del-proyecto)
- 🐳 [Uso de Docker](#-uso-de-docker)
- 🛠️ [Guía de Desarrollo](#-guía-de-desarrollo)

## 🎯 Introducción

Ganadex es un sistema automatizado para monitorear y gestionar cada etapa del ciclo de vida de los animales bovinos. Este proyecto está desarrollado con Next.js.

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

### Reportes y Analíticas

- Exportación de reportes estadísticos en PDF

## ⚒️ Stack Tecnológico

Este proyecto utiliza un conjunto de tecnologías modernas para garantizar un desarrollo eficiente, una experiencia de usuario fluida y un backend robusto. Aquí están las herramientas y bibliotecas clave utilizadas:

- 🏎️ **[Next.js](https://nextjs.org/)** - Framework de React para aplicaciones web modernas con renderizado híbrido (SSR/SSG).
- 💅 **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS de utilidad para un diseño rápido y personalizable.
- 🎨 **[DaisyUI](https://daisyui.com/)** - Componentes preconstruidos para Tailwind CSS.
- 🎨 **[HeroUI](https://www.heroui.com/)** - Componentes dinámicos preconstruidos para React hechos por Tailwind CSS.
- 📊 **[Chart.js](https://www.chartjs.org/)** y **[React Chart.js 2](https://react-chartjs-2.js.org/)** - Para gráficos interactivos y visualización de datos.
- 🧪 **[React Hook Form](https://react-hook-form.com/)** - Manejo de formularios con validaciones eficientes.
- 🛠️ **[Zod](https://zod.dev/)** - Validaciones de datos robustas y tipadas.
- 🌍 **[i18next](https://www.i18next.com/)** - Internacionalización para manejar múltiples idiomas.
- 🖼️ **[Framer Motion](https://www.framer.com/motion/)** - Animaciones fluidas y personalizables (requisito para HeroUI).
- 🧰 **[Zustand](https://zustand-demo.pmnd.rs/)** - Gestión de estado global ligera y flexible.
- 🔄 **[Json Server](https://github.com/typicode/json-server)** - Fake API para pruebas locales.
- 🖼️ **[Slick Carousel](https://react-slick.neostack.com/)** - Carruseles interactivos para contenido dinámico.
- 🧹 **[ESLint](https://eslint.org/)** y **[Biome](https://biomejs.dev/)** - Herramientas para mantener un código limpio y consistente.
- ✨ **[Prettier](https://prettier.io/)** - Formateador de código para mejorar la legibilidad.
- 🔧 **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático para un desarrollo más seguro y eficiente.
- 📦 **[Sharp](https://sharp.pixelplumbing.com/)** - Procesamiento de imágenes rápido y eficiente.
- 🔔 **[Sonner](https://sonner.dev/)** - Biblioteca para notificaciones rápidas y personalizables.

## 📂 Estructura de Carpetas

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

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina:

- **Node.js** (versión 18 o superior).
- **npm, yarn, pnpm o bun** (gestor de paquetes).
- **Git** (para clonar el repositorio).
- **Docker** (opcional, para entornos de desarrollo consistentes).

## ⚙️ Instalación y Configuración

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

## 🚀 Ejecución del Proyecto

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

## 🐳 Uso de Docker

Docker permite ejecutar la aplicación en un entorno aislado y consistente, ideal para desarrollo y producción.

---

## Configuración para Docker*

### **Configurar la Aplicación**

   Antes de construir la imagen comenta la línea `distDir` y descomenta `output: "standalone"` en el archivo `next.config.js` para optimizar la imagen.

   ```bash
   // distDir: "build",
   output: "standalone",
   ```

### **Crear archivo variables de entorno**

Crea un archivo `.env.production` en la raíz del proyecto y agrega las variables de entorno que se encuentran en el archivo `.env.example`:

---

### **Construcción de la Imagen**

Para construir la imagen Docker, ejecuta el siguiente comando en la raíz del proyecto:

```bash
docker build -t ganadex .
```

---

### **Ejecución del Contenedor**

Para ejecutar el contenedor, usa el siguiente comando:

```bash
docker run -p 3000:3000 ganadex
```

Esto expondrá la aplicación en [http://localhost:3000](http://localhost:3000).

---

### **Detalles a Tener en Cuenta**

 **Detener el Contenedor**:

- Para detener el contenedor en ejecución, usa:

     ```bash

     docker stop <container_id>
     ```

---

## 🛠️ Guía de Desarrollo

### **Contenido de la Carpeta `src/actions`**

La carpeta `src/actions` contiene las acciones del servidor de Next.js. Estas acciones son funciones que se ejecutan en el lado del servidor.

### **Propósito de la Carpeta**

- Centralizar la lógica del servidor.
- Garantizar que las operaciones sensibles se ejecuten en un entorno seguro (lado del servidor).
- Facilitar la reutilización de funciones en diferentes partes de la aplicación.

---

### **Ejemplo Común: Acción del Servidor**

A continuación, se muestra un ejemplo típico de una acción en esta carpeta. Este patrón es común en todos los archivos de `src/actions` y refleja la lógica utilizada para interactuar con los modelos del backend.

#### **Ejemplo:`vaca.ts`**

```typescript
"use server";

import {
  ListaVacunas,
  Pesos,
  ResponseErrorNext,
  ResponseGanado,
} from "@/types";
import { CreateCastle, EditCastle, updateWeight } from "@/types/forms";
import { submitForm } from "@/services/apiClient";

type vacunasSinId = Omit<ListaVacunas, "id">;

// Crear un nuevo registro de vaca
export async function createCastle(
  formData: CreateCastle,
  listVaccines: ListaVacunas[],
): Promise<
  | ResponseErrorNext
  | ResponseGanado["ganado"]["numero"]
  | ResponseGanado["ganado"]["nombre"]
> {
  const vacunas = listVaccines.map(({ id, ...rest }) => ({ ...rest }));

  const response = await submitForm<
    CreateCastle & { vacunas: vacunasSinId[] },
    ResponseGanado
  >({ endPoint: "ganado", data: { ...formData, vacunas } });

  if ("error" in response) return response;
  return response.ganado.numero ?? response.ganado.nombre;
}

// Editar un registro existente de vaca
export async function editCastle(
  id: number,
  formData: EditCastle,
): Promise<
  | ResponseErrorNext
  | ResponseGanado["ganado"]["numero"]
  | ResponseGanado["ganado"]["nombre"]
> {
  const response = await submitForm<EditCastle, ResponseGanado>({
    endPoint: "ganado",
    method: "PUT",
    data: formData,
    id,
  });

  if ("error" in response) return response;
  return response.ganado.numero ?? response.ganado.nombre;
}

// Actualizar el peso de una vaca
export async function updateWeightCastle(
  id: number,
  formData: updateWeight,
): Promise<Pesos | ResponseErrorNext> {
  const response = await submitForm<updateWeight, ResponseGanado>({
    endPoint: "ganado",
    method: "PUT",
    data: formData,
    id,
  });

  if ("error" in response) return response;
  return response.ganado.pesos!;
}
```

---

### **Características Comunes de las Acciones**

1. **Interacción con el Backend Laravel:**
   Las acciones utilizan un cliente API (`submitForm`) para comunicarse con los endpoints del backend, siguiendo un patrón consistente para todas las operaciones.

2. **Manejo de Errores:**
   Cada acción incluye manejo de errores para garantizar que las respuestas sean claras y consistentes, devolviendo un objeto de error o los datos esperados. Esta metodología es la recomendada a la hora de manejar errores en la aplicación de Next.js, ya que si devuelve un error al hacer la build de la aplicación, el mensaje de error no se detallara en su lugar incluirá un mensaje de error de que no es possible mostrar el error en producción.

3. **Reutilización:**
   Estas funciones pueden ser llamadas desde componentes, páginas o API routes, centralizando la lógica del servidor.

---

### **Cómo Usar una Acción**

Para utilizar una acción en tu aplicación, simplemente habra que importar y llamarla desde donde sea necesario. Por ejemplo:

#### **Uso en una API Route**

```typescript
import { createCastle } from "@/actions/vaca";

 const response = await createCastle(data, listVaccines);

    /* manejar error del backend y mostrar mensaje */
    if (typeof response == "object" && "error" in response!)
      return toast.error(messageErrorApi(response));

    const dataResponse = response as string | number;

    console.log(dataResponse);

```

### **Contenido de la Carpeta `src/components`**

La carpeta `src/components` contiene todos los componentes reutilizables de la aplicación. Estos componentes están organizados en subcarpetas según su funcionalidad, lo que facilita su mantenimiento y reutilización en diferentes partes del proyecto.

---

### **Propósito de la Carpeta components**

- Centralizar los componentes reutilizables para mantener un código limpio y modular.
- Facilitar la creación de interfaces de usuario consistentes en toda la aplicación.
- Organizar los componentes por funcionalidad para mejorar la escalabilidad del proyecto.

---

### **Estructura de la Carpeta**

```bash

src/components/
├── buttons/                     # Botones reutilizables
│   ├── buttonBackuppBd/         # Botón para respaldar la base de datos ubicado en el navbar
│   ├── buttonPrintReports/      # Botón para imprimir reportes ubicado en el navbar de algunas secciones
│   └── buttonRestoreBd/         # Botón para restaurar la base de datos ubicado en el navbar
│      
├── cards/                       # Tarjetas para mostrar información en dashboards
│   └── index.tsx
├── carousel/                    # Carrusel de imágenes del login
│   └── index.tsx
├── charts/                      # Gráficos y visualizaciones de datos
│   ├── dashboard/               # Utilizados en el dashboard principal
│   └── resumen natalidad/       # Utilizados en la página de resumen natalidad
├── details/                     # Detalla un elemento la cual tiene un titulo y un contenido
├── dropdowns/                   # Menús desplegables
├── editable sections/           # Secciones que muestran una información y permiten editarla
├── forms/                       # Formularios reutilizables
├── Inputs/                      # Campos de entrada personalizados
│   └── index.tsx
├── modals/                      # Modales para interacciones específicas
├── navbar/                      # Barra de navegación
├── notifications/               # Notificaciones del sistema
├── question security/           # Preguntas de seguridad
├── redirectsInTables/           # Redirecciones dentro de tablas
├── selects/                     # Selectores personalizados
├── sidebar/                     # Barra lateral
├── skeletons/                   # Esqueletos para carga de contenido
├── slider days vaccination/     # Deslizadores para días de vacunación en el dashboard plan sanitario
├── tables/                      # Tablas para mostrar datos
├── tabs/                        # Pestañas para navegación
│   └── tabsDetatilsCattle/
├── Textarea/                    # Áreas de texto personalizadas
├── tooltip/                     # Tooltips para mostrar información adicional
├── warning toast/               # Mensajes de advertencia tipo toast
│   └── index.tsx
```

---

### **Contenido de la Carpeta `src/data`**

La carpeta `src/data` un archivo server json para un servicio de api con datos de ejemplo.

### **Propósito de la Carpeta data**

- Establecer una base de datos para la aplicación.
- Permitir la demo de la aplicación.

---

### **Estructura de la Carpeta* data**

```bash
src/data/
   └── db.json

```

**Ejemplo de uso:**

```bash
//Levantara un servidor de api con datos de ejemplo en el puerto 4000
npm fakeApi
```

### **Contenido de la Carpeta `src/hooks`**

La carpeta `src/hooks` contiene hooks personalizados que encapsulan lógica reutilizable para manejar acciones comunes en la aplicación. Estos hooks están diseñados para simplificar tareas como la gestión de formularios, la ejecución de acciones con IDs y la edición o eliminación de datos.

---

### **Propósito de la Carpeta hooks**

- Centralizar la lógica reutilizable relacionada con la interacción del usuario y la gestión de datos.
- Facilitar la implementación de patrones comunes en la aplicación.
- Reducir la duplicación de código en componentes y páginas.

---

### **Estructura de la Carpeta hooks**

```bash
src/hooks/
├── useActionId.ts       # Hook para ejecutar acciones basadas en un ID.
├── useEditDelete.ts     # Hook para manejar la edición y eliminación utilizado en el componente button edit-delete.tsx
├── useFormManager.ts    # Hook para gestionar formularios de react-hook-form.
```

---

### **Descripción de los Hooks**

#### **`useActionId`**

Este hook se utiliza para ejecutar acciones basadas en un ID, como eliminar o actualizar un elemento. También maneja el estado de carga, los mensajes de éxito y los errores.

**Características principales:**

- Ejecuta una acción en el servidor utilizando un ID.
- Muestra mensajes de éxito o error mediante `toast`.
- Permite personalizar acciones posteriores al éxito.

---

#### **`useEditDelete`**

Este hook encapsula la lógica para manejar la edición y eliminación del bton edit-delete.tsx. Es un botón
el cual tiene un estado de edición, borrado y guardado.

**Características principales:**

- Proporciona funciones para editar, eliminar y guardar cambios.
- Maneja el estado de carga y los IDs de las acciones.
- Simplifica la lógica de edición y eliminación en componentes.

**Ejemplo de uso:**

```tsx

import { useEditDelete } from "@/hooks/useEditDelete";

/* Editar un recuro */
const {
    stateButton,
    onEdit,
    onDelete,
    isLoading,
    setIsLoading,
    onSaveOrCancel,
  } = useEditDelete();

    <ButtonsEditedDelete
      id={servicio.id}
      size="md"
      hiddenDelete
      formId="form-edit-servicio"
      onEdit={onEdit}
      state={stateButton}
      onCancel={onSaveOrCancel}
      isLoading={isLoading}
      onDelete={onDelete}
      />


/* Eliminar un recuro */
const { stateButton, idAction, isLoading, onEdit, onDelete, onSaveOrCancel } =
    useEditDelete(deleteResponseSecurity);

    <ButtonsEditedDelete
      id={id}
      formId="form-edit-question"
      state="save"
      onCancel={onSaveOrCancel}
      isLoading={isLoading}
      onDelete={onDelete}
      onEdit={onEdit}
      size="sm"
      />

```

---

#### **`useFormManager`**

Este hook se utiliza para gestionar formularios dentro de modales con validaciones basadas en `zod` y `react-hook-form`. Simplifica la creación de formularios con validaciones robustas y manejo de estados.

**Características principales:**

- Integra validaciones con `zod`.
- Proporciona funciones para manejar el envío de formularios.
- Maneja estados de carga y errores.

**Ejemplo de uso:**

```tsx

  const { handleSubmitForm, errors, register, formRef, control } =
    useFormManager<CreateVaccinacionDay, DayVaccination | undefined>({
      schema: createVaccinationDayShema,
      typeForm: "create",
      submitCreateAction: createVaccinationDay,
      messageOnSuccess: "crearPlanSanitario",
      justMessageOnSuccess: true,
    });

```

---

## **Contenido de la Carpeta `src/lib`**

### **Estructura de la Carpeta lib**

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

## **Contenido de la Carpeta `src/services`**

La carpeta `src/services` contiene funciones y utilidades que encapsulan la lógica para interactuar con el backend y realizar operaciones específicas relacionadas con la API, autenticación, generación de reportes, respaldo y restauración de la base de datos, entre otros. Estas funciones están diseñadas para ser reutilizables y centralizar la lógica de comunicación con el servidor.

---

### **Propósito de la Carpeta services**

- Centralizar la lógica de interacción con el backend.
- Proveer funciones reutilizables para operaciones comunes como solicitudes HTTP, autenticación y manejo de datos.
- Facilitar el mantenimiento y la escalabilidad del proyecto al abstraer la lógica de comunicación con la API.

---

### **Estructura de la Carpeta services**

```bash
src/services/
├── apiClient.ts           # Cliente API genérico para solicitudes HTTP.
├── authApi.ts             # Funciones relacionadas con la autenticación.
├── backupBd.ts            # Funciones para respaldar la base de datos.
├── createUser.ts          # Función para crear nuevos usuarios.
├── generateReports.ts     # Generación de reportes generales.
├── generateReportsYear.ts # Generación de reportes anuales.
├── getInitCookieCsrf.ts   # Obtención de cookies iniciales para CSRF.
├── restoreBd.ts           # Funciones para restaurar la base de datos.
├── signOutApi.ts          # Función para cerrar sesión.
```

---

### **Descripción General de Archivos**

#### **`apiClient.ts`**

El archivo `apiClient.ts` es uno de los más importantes en esta carpeta, ya que centraliza la lógica para realizar solicitudes HTTP. Proporciona funciones como `submitForm` y `getData` para realizar operaciones CRUD con la API.

**Funciones principales:**

- `submitForm`: Realiza solicitudes POST o PUT para enviar datos al backend.
- `getData`: Realiza solicitudes GET para obtener datos del backend.

**Ejemplo de uso:**

```ts
import { submitForm } from "@/services/apiClient";

  const response = await submitForm<CreateTypeCheck, ResponseTipoRevision>({
    endPoint: "tipoRevision",
    method: "PUT",
    data: formData,
    id,
  });
  if (typeof response == "object" && "error" in response) return response;
  else return response;


  //getData
   const response = await getData<ResponseVacunas>({
    endPoint: "vacunasDisponibles",
  });
```

---

#### **`authApi.ts`**

Contiene funciones relacionadas con la autenticación de usuarios, como iniciar sesión, cerrar sesión y manejar tokens de autenticación.

**Funciones principales:**

- `signIn`: Inicia sesión en el sistema.
- `signOut`: Cierra la sesión del usuario.

---

#### **`generateReports.ts` y `generateReportsYear.ts`**

Estas funciones generan reportes generales y anuales, respectivamente, interactuando con los endpoints del backend.

**Funciones principales:**

- `generateReports`: Genera reportes personalizados.
- `generateReportsYear`: Genera reportes anuales basados en un año específico.

**Ejemplo de uso:**

```ts
import { generateReportsYear } from "@/services/generateReportsYear";

 const filePdf = await GetReportsYear(2025);
```

---

#### **`getInitCookieCsrf.ts`**

Obtiene las cookies iniciales  necesarias de Laravel para manejar la protección CSRF en las solicitudes

---

## **Contenido de la Carpeta `src/ui`**

La carpeta `src/ui` contiene componentes de interfaz de usuario reutilizables que son fundamentales para construir la experiencia visual y de interacción de la aplicación. Estos componentes están diseñados para ser altamente reutilizables, configurables y consistentes con el diseño general del proyecto.

---

### **Propósito de la Carpeta ui**

- Proveer componentes de interfaz de usuario reutilizables y estilizados.
- Centralizar elementos visuales comunes para mantener consistencia en el diseño.
- Facilitar la creación de interfaces de usuario modernas y accesibles.

---

### **Estructura de la Carpeta ui**

```bash
src/ui/
├── BadgeNotification.tsx         # Componente para mostrar notificaciones tipo badge.
├── Button.tsx                    # Botón reutilizable con múltiples configuraciones.
├── ButtonCreate.tsx              # Botón con estilo específico para acciones de creación.
├── ButtonEdit.tsx                # Botón con estilo específico para acciones de edición.
├── ButtonGroupTabDetailCattle.tsx # Grupo de botones para pestañas de detalles de ganado.
├── Buttons edit-delete.tsx       # Botones combinados para editar y eliminar.
├── CheckboxTheme.tsx             # Checkbox para cambiar entre temas claro y oscuro.
├── HamburgerButton.tsx           # Botón de menú tipo hamburguesa.
├── Logos.tsx                     # Componente para mostrar logotipos.
├── TitlePage.tsx                 # Título principal de una página con soporte para tooltips.
├── TitleTab.tsx                  # Título de pestañas con íconos personalizados utilizados en la pagina detalles de ganado.
```

---

### **Contenido de la Carpeta `src/utils`**

La carpeta `src/utils` contiene funciones utilitarias y helpers que encapsulan lógica común y repetitiva utilizada en diferentes partes de la aplicación. Estas utilidades están diseñadas para ser reutilizables y facilitar tareas como formateo de datos, manejo de errores, configuración de gráficos y más.

---

### **Propósito de la Carpeta utils**

- Centralizar funciones auxiliares para evitar duplicación de código.
- Proveer herramientas reutilizables para tareas comunes.
- Mejorar la legibilidad y el mantenimiento del código al abstraer lógica repetitiva.

---

### **Estructura de la Carpeta utils**

```bash
src/utils/
├── capitalizeFirstLetter.ts               # Capitaliza la primera letra de una cadena.
├── configCharts.ts                        # Configuración de gráficos (Chart.js).
├── convertResponseBalanceAnnualMilk.ts    # Convierte respuesta de balance anual de leche.
├── convertResponseCastleType.ts           # Convierte respuestas relacionadas con tipos de ganado.
├── convertResponseCommonCauseDead.ts      # Convierte respuesta de causas comunes de muerte.
├── convertResponseInOptionsSelect.ts      # Convierte respuesta en opciones para selectores.
├── convertResponseTopProductionCatles.ts  # Convierte respuesta de producción de ganado.
├── getAge.ts                              # Calcula la edad a partir de una fecha.
├── getDateNow.ts                          # Obtiene la fecha actual.
├── getNewCookiesSession.ts                # Obtiene nuevas cookies de sesión de laravel.
├── getNotificationMessage.ts              # Genera mensajes de notificación.
├── handleErrorFromApi.ts                  # Maneja errores provenientes de la API.
├── handleErrorResponseNext.ts             # Maneja errores en respuestas de Next.js.
├── handleResponseApi.ts                   # Maneja respuestas genéricas de la API.
├── index.ts                               # Exporta todas las utilidades.
├── returnError.ts                         # Devuelve un error formateado.
```

---
