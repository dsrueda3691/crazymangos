# 🥭 Crazy Mango's

Landing page interactiva para **Crazy Mango's** — mango, maracuyá y chamoy preparados al momento en El Pando, Santa Marta.

## 🌐 Visualización en vivo

**[Ver la página →](https://crazymangos.vercel.app)**

> Si el link aún no carga, despliega en un click con el botón de abajo o sigue las instrucciones de Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dsrueda3691/crazymangos)

## Stack

- **Next.js 15** (App Router)
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

1. Conecta el repo a [Vercel](https://vercel.com).
2. Añade la variable `NEXT_PUBLIC_WHATSAPP` si quieres.
3. Deploy automático en cada push a `main`.

---

📍 Manzana 47, casa 12, calle 30 · El Pando, Santa Marta  
Instagram: [@crazymangos.sm](https://instagram.com/crazymangos.sm)
