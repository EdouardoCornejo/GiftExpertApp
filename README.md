# GiftExpertApp

**Buscador de GIFs** hecho con **React 19 + TypeScript + Vite** que consulta la **API de GIPHY**. Cada término que buscas se convierte en una **categoría** con su propia cuadrícula de GIFs; las búsquedas nuevas aparecen arriba y no se repiten categorías. Toda la lógica de datos vive en un **custom hook** (`useFetchGifs`) y un helper tipado (`getGifs`).

**Demo:** https://gift-expert-app-navy.vercel.app

![Tech](https://img.shields.io/badge/React-19-61DAFB)
![Tech](https://img.shields.io/badge/TypeScript-6-3178C6)
![Tech](https://img.shields.io/badge/Vite-8-646CFF)
![Tech](https://img.shields.io/badge/API-GIPHY-black)

---

## Tabla de contenidos

- [GiftExpertApp](#giftexpertapp)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Qué hace el proyecto](#qué-hace-el-proyecto)
  - [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
    - [Requisitos](#requisitos)
    - [Variables de entorno](#variables-de-entorno)
    - [Instalación y scripts](#instalación-y-scripts)
    - [Despliegue](#despliegue)
  - [Uso](#uso)
  - [Cómo funciona](#cómo-funciona)
    - [1. `src/GiftExpertApp.tsx`](#1-srcgiftexpertapptsx)
    - [2. `src/components/AddCategory.tsx`](#2-srccomponentsaddcategorytsx)
    - [3. `src/helpers/getGifs.ts`](#3-srchelpersgetgifsts)
    - [4. `src/hooks/useFetchGifs.ts`](#4-srchooksusefetchgifsts)
    - [5. `GifGrid` y `GifItem`](#5-gifgrid-y-gifitem)
    - [Flujo de la aplicación](#flujo-de-la-aplicación)
  - [Tecnologías](#tecnologías)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Personalización](#personalización)
  - [Licencia](#licencia)

---

## Qué hace el proyecto

- **Búsqueda de GIFs** por texto libre usando el endpoint `search` de GIPHY.
- Cada búsqueda crea una **categoría** con hasta **10 GIFs**, mostrados en cuadrícula con su título.
- Las categorías nuevas se añaden **al principio** de la lista.
- **Sin duplicados**: una categoría que ya existe (sin distinguir mayúsculas) no se vuelve a añadir.
- Ignora búsquedas de **1 carácter o menos** (tras quitar espacios).
- Estados de **carga** y **error** por categoría.
- Categoría inicial de ejemplo: **"One Punch"**.
- Metadatos **Open Graph / Twitter Card** y favicons propios.
- **Cabeceras de seguridad** (CSP) y posibilidad de **incrustarse en un `<iframe>`** desde cualquier dominio.

---

## Cómo ejecutar el proyecto

### Requisitos

- **Node.js 20.19+ o 22.12+** (requerido por Vite 8).
- **Yarn** (el repositorio incluye `yarn.lock`).
- Una API key de GIPHY: https://developers.giphy.com/dashboard/

### Variables de entorno

Copia `.env.example` a `.env.local` y pon tu key:

```bash
cp .env.example .env.local
```

| Variable             | Descripción          |
| -------------------- | -------------------- |
| `VITE_GIPHY_API_KEY` | API key de GIPHY     |

```bash
VITE_GIPHY_API_KEY=your_giphy_api_key
```

> Las variables con prefijo `VITE_` se incrustan en el bundle del cliente, así que la key es visible en el navegador. Usa una key de GIPHY pensada para uso público en frontend.

### Instalación y scripts

```bash
yarn install
yarn dev
```

| Comando        | Descripción                                                    |
| -------------- | -------------------------------------------------------------- |
| `yarn dev`     | Servidor de desarrollo de Vite                                 |
| `yarn build`   | Comprobación de tipos con `tsc` y build de producción (`dist/`) |
| `yarn preview` | Previsualiza el build de producción                            |

### Despliegue

Desplegado en **Vercel**. La variable `VITE_GIPHY_API_KEY` se configura en el entorno _Production_ del proyecto.

---

## Uso

1. Escribe un término en el campo **Buscar gifs** (por ejemplo, _Naruto_).
2. Pulsa `Enter`: aparece una nueva sección con ese título y sus GIFs.
3. Repite para añadir más categorías; las más recientes quedan arriba.

Para incrustarla en otra web:

```html
<iframe
  src="https://gift-expert-app-navy.vercel.app"
  title="GiftExpertApp"
  width="100%"
  height="600"
  style="border: 0"
></iframe>
```

---

## Cómo funciona

### 1. `src/GiftExpertApp.tsx`

Componente raíz. Guarda `categories: string[]` (inicialmente `["One Punch"]`) y define `onAddCategory(newCategory)`, que descarta la categoría si ya existe (comparación en minúsculas) y si no la antepone a la lista. Renderiza `AddCategory` y un `GifGrid` por categoría (la propia categoría actúa como `key`).

### 2. `src/components/AddCategory.tsx`

Formulario controlado con `inputValue`. En `onSubmit` aplica `trim()`, ignora valores de longitud ≤ 1, llama a `onNewCategory(value)` y limpia el campo.

### 3. `src/helpers/getGifs.ts`

Define las interfaces `Gif` (`id`, `title`, `url`) y `GiphyGif` (forma de la respuesta de GIPHY). `getGifs(category)` construye la query con `URLSearchParams` (`api_key`, `q`, `limit: "10"`), llama a `https://api.giphy.com/v1/gifs/search`, lanza un error si la respuesta no es `ok` y mapea cada resultado a `Gif` usando `images.downsized_medium.url`.

### 4. `src/hooks/useFetchGifs.ts`

Custom hook que recibe una categoría y devuelve `{ images, isLoading, error }`. Llama a `getGifs` dentro de un `useEffect([category])` y usa una bandera `ignore` en el _cleanup_ para no actualizar el estado de una petición obsoleta (por ejemplo, con el doble montaje de `StrictMode`).

### 5. `GifGrid` y `GifItem`

- **`GifGrid`**: título de la categoría, mensajes _"Cargando..."_ / _"Error: …"_ y la cuadrícula `.card-grid`.
- **`GifItem`**: tarjeta con la imagen (`alt` = título) y el título del GIF.

`src/vite-env.d.ts` tipa `import.meta.env.VITE_GIPHY_API_KEY` y `tsconfig.json` activa el modo `strict`.

### Flujo de la aplicación

```
main.tsx  (styles.css)
  └─ <GiftExpertApp>                     → categories = ["One Punch"]
       ├─ <AddCategory>
       │     └─ onSubmit()
       │          ├─ trim() y longitud > 1
       │          └─ onNewCategory(value) → onAddCategory()
       │                                      ├─ ya existe → ignora
       │                                      └─ nueva     → [nueva, ...categories]
       └─ <GifGrid category> × N
             └─ useFetchGifs(category)
                   └─ useEffect([category])
                         └─ getGifs(category)
                               └─ fetch api.giphy.com/v1/gifs/search?q=…&limit=10
                                     ↓
                               Gif[] { id, title, url }
             └─ <GifItem> × 10
```

---

## Tecnologías

- **React 19** — componentes funcionales y hooks.
- **TypeScript 6** — tipado estricto de props, respuestas de la API y variables de entorno.
- **Vite 8** — servidor de desarrollo y build.
- **`fetch` nativo** + `URLSearchParams` — peticiones a GIPHY.
- **CSS3** — estilos en `src/styles.css`.
- **Vercel** — despliegue y cabeceras de seguridad.

---

## Estructura del proyecto

```
GiftExpertApp/
├── public/
│   ├── apple-touch-icon.png
│   ├── favicon.ico
│   ├── favicon.svg
│   └── og-image.png          # Imagen para Open Graph / Twitter
├── src/
│   ├── components/
│   │   ├── AddCategory.tsx   # Campo de búsqueda
│   │   ├── GifGrid.tsx       # Sección de una categoría
│   │   └── GifItem.tsx       # Tarjeta de un GIF
│   ├── helpers/
│   │   └── getGifs.ts        # Llamada a GIPHY + tipos
│   ├── hooks/
│   │   └── useFetchGifs.ts   # Carga de GIFs por categoría
│   ├── GiftExpertApp.tsx     # Componente raíz
│   ├── main.tsx
│   ├── styles.css
│   └── vite-env.d.ts         # Tipos de import.meta.env
├── .env.example
├── index.html                # Metadatos SEO / Open Graph
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json               # CSP y cabeceras
├── vite.config.ts
└── yarn.lock
```

---

## Personalización

| Dónde                      | Qué                               | Valor actual             |
| -------------------------- | --------------------------------- | ------------------------ |
| `src/GiftExpertApp.tsx`    | Categoría inicial                 | `["One Punch"]`          |
| `src/helpers/getGifs.ts`   | GIFs por categoría (`limit`)      | `"10"`                   |
| `src/helpers/getGifs.ts`   | Tamaño de imagen usado            | `downsized_medium`       |
| `src/components/AddCategory.tsx` | Longitud mínima de búsqueda | más de 1 carácter        |

> Si cambias el dominio de las imágenes o de la API, actualiza `img-src` y `connect-src` de la CSP en `vercel.json`.

---

## Licencia

Proyecto de uso libre con fines educativos y de práctica.
