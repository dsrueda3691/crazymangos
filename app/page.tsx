"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { scroll } from "@/components/Hero3D";

const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "57XXXXXXXXXX";
const IG = "https://instagram.com/crazymangos.sm";
const PRODUCTS = [
  { id: "maracumango", n: "01", name: "Maracumango", note: "Mango fresco, maracuyá, chamoy y ese toque ácido que despierta todo.", tag: "Favorito de la casa", price: undefined as number | undefined },
  { id: "chamoyada", n: "02", name: "Chamoyada mexicana", note: "Frío, frutal y bañado en una mezcla dulce, ácida y picante.", tag: "Dulce + picante", price: undefined },
  { id: "bandeja", n: "03", name: "Crazy bandeja ácida", note: "Mango, mamón, manzana verde y gomitas para mezclar a tu manera.", tag: "Para compartir", price: undefined },
  { id: "tamarindo", n: "04", name: "Crazy tamarindo", note: "Tamarindo intenso, mango, cereza y dulces con mucho carácter.", tag: "Sabor intenso", price: undefined },
  { id: "promo", n: "05", name: "Dúo de bandejas", note: "Dos bandejas para compartir el antojo.", tag: "Combo especial", price: 15000 },
];
const FLAVORS = [
  { n: "Mango biche", t: "Verde, crujiente y con limón.", c: "#b8e85b" },
  { n: "Maracuyá", t: "Ácido, tropical y refrescante.", c: "#ffd05a" },
  { n: "Chamoy", t: "Dulce, salado y con picante.", c: "#ff6658" },
  { n: "Tamarindo", t: "Profundo, frutal y lleno de carácter.", c: "#d98b55" },
];
const INGREDIENTS = ["Mango fresco", "Chamoy", "Tajín", "Tamarindo", "Maracuyá", "Gomitas", "Mango fresco", "Tajín"];

export default function Page() {
  const root = useRef<HTMLDivElement>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: root.current, start: "top top", end: "bottom bottom", onUpdate: (s) => (scroll.p = s.progress) });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => gsap.fromTo(el, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }));
      gsap.to("[data-marquee]", { xPercent: -50, ease: "none", repeat: -1, duration: 28 });
    }, root);
    return () => ctx.revert();
  }, []);
  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const remove = (id: string) => setCart((c) => { const next = { ...c }; if ((next[id] ?? 0) <= 1) delete next[id]; else next[id] -= 1; return next; });
  const order = () => {
    const lines = Object.entries(cart).map(([id, q]) => `${q} x ${PRODUCTS.find((p) => p.id === id)!.name}`);
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola Crazy Mango's, quiero pedir:\n" + lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  };
  return <main ref={root} className="relative min-h-screen overflow-hidden bg-[#24070b] text-[#fff4df]">
    <div className="hero-glow" aria-hidden="true" />
    <div className="fixed inset-0 z-[1] pointer-events-none opacity-95"><Hero3D /></div>
    <header className="site-header fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 md:px-12 md:py-6">
      <a href="#inicio" className="brand-lockup flex items-center gap-3"><span className="brand-mark">cm</span><span><strong className="block font-display text-lg leading-none">CRAZY MANGO'S</strong><small className="mt-1 block text-[9px] uppercase tracking-[.28em] text-white/60">Fruta con actitud</small></span></a>
      <nav className="hidden items-center gap-8 text-xs uppercase tracking-[.18em] text-white/75 md:flex"><a className="nav-link" href="#filosofia">Nuestra esencia</a><a className="nav-link" href="#menu">Menú</a><a className="nav-link" href="#visitanos">Encuéntranos</a></nav>
      <motion.button whileTap={{ scale: .96 }} onClick={() => setOpen(true)} className="order-button rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[.12em]">Tu pedido <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-[#fff4df] px-1.5 py-0.5 text-[10px] text-[#6f1019]">{count}</span></motion.button>
    </header>
    <section id="inicio" className="hero-section relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-14 pt-32 md:px-12 md:pb-16">
      <div className="relative z-10 max-w-[760px]" data-reveal><div className="eyebrow mb-5 flex items-center gap-3"><span className="eyebrow-line" /> SANTA MARTA · EL PANDO <span className="text-[#ffc95d]">•</span> HECHO AL MOMENTO</div>
        <h1 className="hero-title font-display uppercase leading-[.79] tracking-[-.045em]">EL ANTOJO<br/><span className="hero-outline">SE PONE</span><br/><span className="hero-accent">CRAZY.</span></h1>
        <p className="mt-7 max-w-[360px] text-base leading-7 text-[#fff4df]/75 md:text-lg">Mango fresco, chamoy y una explosión de sabores que no pide permiso.</p>
        <div className="mt-8 flex flex-wrap items-center gap-4"><a href="#menu" className="primary-cta">Explorar menú <span>↗</span></a><a href="#filosofia" className="text-xs uppercase tracking-[.18em] text-white/70 transition hover:text-[#ffc95d]">Conoce Crazy Mango's</a></div>
      </div>
      <div className="hero-bottom relative z-10 mt-14 flex items-end justify-between border-t border-white/15 pt-4 text-[10px] uppercase tracking-[.2em] text-white/55"><span>Ácido. Dulce. Picante.</span><span className="hidden sm:block">Una experiencia para saborear despacio.</span><span>01 / 04</span></div>
      <div className="hero-product-label pointer-events-none absolute right-[7%] top-[25%] z-0 hidden text-right lg:block"><span className="block text-[10px] uppercase tracking-[.35em] text-[#ffc95d]">El favorito</span><span className="font-display text-2xl">MANGO + CHAMOY</span></div>
    </section>
    <section id="filosofia" className="relative z-10 px-5 py-28 md:px-12 md:py-40"><div className="section-rule mb-10"/><div className="grid gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-20"><div data-reveal><p className="eyebrow">02 — NUESTRA ESENCIA</p><p className="mt-5 max-w-xs text-sm leading-6 text-white/55">No es solo fruta. Es ese primer bocado que mezcla frescura, acidez y picante.</p></div><div data-reveal><h2 className="font-display text-4xl uppercase leading-[.95] tracking-[-.03em] sm:text-6xl md:text-7xl">FRUTA REAL.<br/><span className="text-[#ffc95d]">ANTOJO SIN REGLAS.</span></h2><p className="mt-7 max-w-xl text-base leading-8 text-white/70">Cortamos, mezclamos y preparamos cada pedido al momento. Mango jugoso, salsas intensas y toppings que convierten algo sencillo en tu nuevo antojo favorito.</p></div></div></section>
    <section id="menu" className="relative z-10 px-5 py-24 md:px-12 md:py-32"><div className="menu-panel mx-auto max-w-7xl rounded-[2rem] px-5 py-9 sm:px-8 md:px-12 md:py-14"><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end" data-reveal><div><p className="eyebrow mb-4">03 — EL MENÚ</p><h2 className="font-display text-4xl uppercase leading-none sm:text-6xl">ELIGE TU <span className="text-[#ffc95d]">CRAZY.</span></h2></div><p className="max-w-sm text-sm leading-6 text-white/60">Cada combinación tiene su propia personalidad. ¿Cuál va contigo?</p></div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{PRODUCTS.map((p) => <motion.article key={p.id} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="product-card flex min-h-[260px] flex-col rounded-2xl p-5 sm:p-6"><div className="flex items-center justify-between"><span className="text-[10px] tracking-[.2em] text-white/40">{p.n} / CRAZY MANGO'S</span><span className="rounded-full border border-[#ffc95d]/30 px-3 py-1 text-[9px] uppercase tracking-[.14em] text-[#ffc95d]">{p.tag}</span></div><div className="mt-8 flex-1"><h3 className="font-display text-2xl uppercase leading-tight">{p.name}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-white/60">{p.note}</p></div><div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4"><span className="text-sm font-semibold">{p.price ? `$${p.price.toLocaleString("es-CO")}` : "Precio por consultar"}</span><motion.button whileTap={{ scale: .92 }} onClick={() => add(p.id)} className="add-button" aria-label={`Agregar ${p.name}`}>+ <span className="hidden sm:inline">Agregar</span></motion.button></div></motion.article>)}</div><p className="mt-6 text-xs leading-5 text-white/40">¿Tienes una combinación en mente? Escríbenos y armamos tu antojo.</p>
    </div></section>
    <section className="relative z-10 overflow-hidden px-5 py-20 md:px-12 md:py-28"><div data-reveal className="mb-10"><p className="eyebrow mb-4">SABORES</p><h2 className="font-display text-4xl uppercase sm:text-5xl">LA PALETA <span className="text-[#ffc95d]">CRAZY.</span></h2></div><div className="space-y-0">{FLAVORS.map((f) => <div key={f.n} className="flavor-row flex items-center gap-5 border-t border-white/10 py-6" data-reveal><span className="flavor-dot" style={{ color: f.c, background: f.c }} /><span className="font-display text-2xl uppercase sm:text-4xl">{f.n}</span><span className="ml-auto hidden max-w-xs text-right text-sm text-white/50 sm:block">{f.t}</span></div>)}</div></section>
    <section className="relative z-10 overflow-hidden py-16"><div className="mb-4 flex gap-10 whitespace-nowrap font-display text-5xl uppercase opacity-40 md:text-7xl"><div data-marquee className="flex shrink-0 gap-10">{[...INGREDIENTS, ...INGREDIENTS].map((x, i) => <span key={i} className={i % 2 ? "text-transparent" style={{ WebkitTextStroke: "1px rgba(255,244,223,.5)" } as React.CSSProperties : ""}>{x}</span>)}</div></div></section>
    <section id="visitanos" className="relative z-10 px-5 pb-24 pt-10 md:px-12 md:pb-32"><div className="visit-card mx-auto max-w-5xl rounded-[2rem] p-8 md:p-12" data-reveal><div className="grid gap-10 md:grid-cols-2"><div><p className="eyebrow mb-4">04 — VISÍTANOS</p><h2 className="font-display text-4xl uppercase leading-none sm:text-5xl">EL PANDO,<br/><span className="text-[#ffc95d]">SANTA MARTA.</span></h2><p className="mt-6 text-sm leading-7 text-white/65">Manzana 47, casa 12, calle 30 · El Pando, Santa Marta. Diagonal a Surtisam.</p><a href={IG} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-[#ffc95d] underline-offset-4 hover:underline">@crazymangos.sm ↗</a></div><div className="flex flex-col justify-end"><p className="text-sm text-white/50">Lleva el dúo de bandejas por $15.000</p><button onClick={() => add("promo")} className="primary-cta mt-4 w-fit">Aprovechar combo <span>↗</span></button></div></div></div>
      <footer className="mx-auto mt-16 flex max-w-5xl flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between"><span>© Crazy Mango's. Fruta con fuego y actitud en Santa Marta.</span><a href="#inicio" className="hover:text-white">Volver arriba ↑</a></footer></section>
    <AnimatePresence>{open && <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28 }} className="cart-drawer fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col p-6 text-[#fff4df] shadow-2xl sm:p-8" role="dialog" aria-modal="true" aria-label="Tu pedido"><div className="flex items-center justify-between border-b border-white/15 pb-5"><div><p className="eyebrow">CRAZY MANGO'S</p><h3 className="mt-2 font-display text-3xl uppercase">Tu pedido</h3></div><button onClick={() => setOpen(false)} aria-label="Cerrar pedido" className="close-button">✕</button></div><ul className="mt-6 flex-1 space-y-3 overflow-auto">{count===0 && <li className="py-8 text-sm text-white/55">Tu pedido está vacío. Agrega algo rico del menú.</li>}{Object.entries(cart).map(([id,q])=><li key={id} className="flex items-center justify-between gap-4 border-b border-white/10 py-3"><div><p className="font-semibold">{PRODUCTS.find((p)=>p.id===id)!.name}</p><p className="mt-1 text-xs text-white/45">{PRODUCTS.find((p)=>p.id===id)!.price ? `$${PRODUCTS.find((p)=>p.id===id)!.price!.toLocaleString("es-CO")}` : "Precio por consultar"}</p></div><div className="flex items-center gap-3"><button onClick={()=>remove(id)} className="quantity-button" aria-label={`Quitar una unidad de ${id}`}>−</button><span>{q}</span><button onClick={()=>add(id)} className="quantity-button" aria-label={`Agregar una unidad de ${id}`}>+</button></div></li>)}</ul><p className="mb-4 text-xs leading-5 text-white/45">Los precios no publicados se confirman al tomar el pedido.</p><button disabled={!count} onClick={order} className="primary-cta justify-center disabled:cursor-not-allowed disabled:opacity-40">Enviar por WhatsApp ↗</button></motion.aside>}</AnimatePresence>
  </main>;
}
