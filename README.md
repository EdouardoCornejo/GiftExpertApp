# GiftExpertApp

Buscador de GIFs con React + TypeScript + Vite usando la API de GIPHY.

**Demo:** https://gift-expert-app-navy.vercel.app

## Uso en un iframe

La app permite ser embebida desde cualquier dominio (`frame-ancestors *` en `vercel.json`):

```html
<iframe
  src="https://gift-expert-app-navy.vercel.app"
  title="GiftExpertApp"
  width="100%"
  height="600"
  style="border: 0"
></iframe>
```

## Configuración local

1. Copia `.env.example` a `.env.local` y pon tu API key de GIPHY (https://developers.giphy.com/dashboard/).
2. `yarn install`
3. `yarn dev`

## Deploy

Desplegado en Vercel. La variable `VITE_GIPHY_API_KEY` está configurada en el entorno Production del proyecto.
