# 🥭 Crazy Mango's

Landing page interactiva para **Crazy Mango's** — mango, maracuyá y chamoy preparados al momento en El Pando, Santa Marta.

## 🌐 Visualización en vivo (GitHub Pages)

**[Ver la página →](https://dsrueda3691.github.io/crazymangos/)**

> El deploy se hace automáticamente con GitHub Actions en cada push a `main`.
> La primera vez puede tardar 1–2 minutos. Si no carga, ve a **Settings → Pages** y asegúrate de que la fuente sea **GitHub Actions**.

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

## Despliegue (GitHub Pages)

El workflow `.github/workflows/deploy.yml` genera el sitio estático (`out/`) y lo publica en GitHub Pages.

1. Ve a **Settings → Pages** del repositorio.
2. En **Source** elige **GitHub Actions**.
3. Cada push a `main` vuelve a desplegar.

URL final: https://dsrueda3691.github.io/crazymangos/

---

📍 Manzana 47, casa 12, calle 30 · El Pando, Santa Marta  
Instagram: [@crazymangos.sm](https://instagram.com/crazymangos.sm)
