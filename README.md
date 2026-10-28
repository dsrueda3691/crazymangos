# 🥭 Crazy Mango's

Landing page interactiva para **Crazy Mango's** — mango, maracuyá y chamoy preparados al momento en El Pando, Santa Marta.

## 🌐 Visualización en vivo (GitHub Pages)

**→ [https://dsrueda3691.github.io/crazymangos/](https://dsrueda3691.github.io/crazymangos/)**

El sitio ya está publicado y se actualiza automáticamente con cada push a `main`.

## Stack

- **Next.js 15** (App Router + static export)
- **React 19** + **TypeScript**
- **Three.js** + **@react-three/fiber** + **@react-three/drei** (vaso 3D interactivo)
- **GSAP** + ScrollTrigger (scroll-driven animations y cambio de fondo)
- **Framer Motion** (UI micro-interacciones)
- **Tailwind CSS**

## Características

- Hero 3D con vaso de chamoyada que reacciona al scroll
- Menú con carrito y pedido directo por WhatsApp
- Secciones animadas con split text y marquee de ingredientes
- Diseño responsive y con soporte a `prefers-reduced-motion`

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Crea un archivo `.env.local`:

```
NEXT_PUBLIC_WHATSAPP=57XXXXXXXXXX
```

(Reemplaza por el número real del local, formato internacional sin `+` ni espacios.)

## Despliegue

GitHub Actions (`.github/workflows/nextjs.yml`) construye el export estático y lo publica en GitHub Pages en cada push a `main`.

URL: https://dsrueda3691.github.io/crazymangos/

---

📍 Manzana 47, casa 12, calle 30 · El Pando, Santa Marta  
Instagram: [@crazymangos.sm](https://instagram.com/crazymangos.sm)
