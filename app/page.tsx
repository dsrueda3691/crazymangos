"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { scroll } from "@/components/Hero3D";

const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "57XXXXXXXXXX"; // TODO: número real del local
const IG = "https://instagram.com/crazymangos.sm";

// price: pon aquí los precios reales; si falta, se muestra "Consultar"
const PRODUCTS = [
  { id: "maracumango", name: "Maracumango", note: "Mango y maracuyá en vaso, con chamoy y tajín.", price: undefined as number | undefined },
  { id: "chamoyada", name: "Chamoyada Mexicana", note: "Granizado con chamoy, fruta y dulce mexicano.", price: undefined },
  { id: "bandeja", name: "Crazy Bandeja Ácida", note: "Mango, mamón, manzana verde y gomitas.", price: undefined },
  { id: "tamarindo", name: "Crazy Tamarindo", note: "Granizado de tamarindo con cereza, gomitas y mango.", price: undefined },
  { id: "promo", name: "2 Bandejas Crazy", note: "Lleva dos bandejas por $15.000.", price: 15000 },
];
const FLAVORS = [
  { n: "Mango biche", c: "#A8E02A", t: "Verde, crujiente y con limón." },
  { n: "Maracuyá", c: "#FFC62B", t: "Ácido y fresco, el que se comparte primero." },
  { n: "Chamoy", c: "#C8102E", t: "Dulce, salado y con picante." },
  { n: "Tamarindo", c: "#B5651D", t: "Granizado espeso con gomitas." },
  { n: "Mamón", c: "#FF7A1A", t: "Bolitas con tajín en la bandeja ácida." },
];
const INGREDIENTS = ["Mango", "Chamoy", "Tajín", "Tamarindo", "Maracuyá", "Mamón", "Manzana verde", "Gomitas"];

export default function Page() {
  const root = useRef<HTMLDivElement>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: root.current, start: "top top", end: "bottom bottom", onUpdate: (s) => (scroll.p = s.progress) });
      const bg = ["#A8E02A", "#FFC62B", "#C8102E", "#FF7A1A", "#12301A"];
      gsap.utils.toArray<HTMLElement>("[data-sec]").forEach((el, i) =>
        ScrollTrigger.create({ trigger: el, start: "top 55%", end: "bottom 55%", onToggle: (s) => s.isActive && gsap.to("body", { backgroundColor: bg[i], duration: .7 }) }));
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) =>
        gsap.from(el.querySelectorAll("span"), { yPercent: 110, stagger: .06, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } }));
      gsap.to("[data-marquee]", { xPercent: -50, ease: "none", repeat: -1, duration: 22 });
    }, root);
    return () => ctx.revert();
  }, []);

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const order = () => {
    const lines = Object.entries(cart).map(([id, q]) => `${q} x ${PRODUCTS.find((p) => p.id === id)!.name}`);
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hola Crazy Mango's, quiero pedir:\n" + lines.join("\n"))}`);
  };
  const Split = ({ t, className = "" }: { t: string; className?: string }) => (
    <h2 data-split className={`font-display leading-[.9] ${className}`}>
      {t.split(" ").map((w, i) => <span key={i} className="mr-[.25em] inline-block overflow-hidden align-bottom"><span className="inline-block">{w}</span></span>)}
    </h2>);

  return (
    <div ref={root} className="relative">
      <div className="fixed inset-0 z-10 pointer-events-none"><Hero3D /></div>

      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 md:px-10">
        <span className="font-display text-xl">Crazy Mango's</span>
        <motion.button whileTap={{ scale: .92 }} onClick={() => setOpen(true)} className="rounded-full bg-selva px-5 py-2 text-sm font-semibold text-crema focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
          Pedido ({count})
        </motion.button>
      </header>

      <section data-sec className="relative flex min-h-screen flex-col justify-end overflow-hidden px-5 pb-16 md:px-10">
        <h1 className="relative z-0 font-display text-[22vw] leading-[.8] md:text-[17vw]">CRAZY<br /><span className="outline">MANGO'S</span></h1>
        <p className="relative z-20 mt-6 max-w-md text-lg font-medium">Mango, maracuyá y chamoy, preparados al momento en El Pando, Santa Marta.</p>
        <a href="#menu" className="relative z-20 mt-6 w-fit rounded-full bg-chamoy px-7 py-3 font-semibold text-crema transition hover:scale-105">Ver el menú</a>
      </section>

      <section data-sec className="relative z-20 flex min-h-screen items-center px-5 md:px-10">
        <div className="max-w-xl">
          <Split t="Primero el mango. Después, lo que se te antoje." className="text-4xl md:text-6xl" />
          <p className="mt-6 text-lg">Cortamos la fruta, la bañamos en chamoy y la terminamos con tajín y dulce. Cada vaso y cada bandeja se arma al momento.</p>
        </div>
      </section>

      <section id="menu" data-sec className="relative z-20 min-h-screen px-5 py-24 text-crema md:px-10">
        <div className="ml-auto max-w-[min(100%,46rem)]">
          <Split t="Lo más pedido" className="mb-10 text-4xl md:text-6xl" />
          <div className="grid gap-4 sm:grid-cols-2">
            {PRODUCTS.map((p) => (
              <motion.article key={p.id} whileHover={{ y: -6, rotate: -1 }} transition={{ type: "spring", stiffness: 300 }}
                className="rounded-3xl bg-selva/90 p-6 backdrop-blur">
                <h3 className="font-display text-2xl">{p.name}</h3>
                <p className="mt-2 text-sm opacity-90">{p.note}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-semibold">{p.price ? `$${p.price.toLocaleString("es-CO")}` : "Consultar"}</span>
                  <motion.button whileTap={{ scale: .9 }} onClick={() => add(p.id)} className="rounded-full bg-mango px-4 py-2 text-sm font-bold text-selva">Agregar</motion.button>
                </div>
              </motion.article>))}
          </div>
        </div>
      </section>

      <section data-sec className="relative z-20 flex min-h-screen items-center px-5 md:px-10">
        <ul className="space-y-6">
          {FLAVORS.map((f) => (
            <motion.li key={f.n} className="group flex items-center gap-5" whileHover={{ x: 8 }}>
              <span className="h-12 w-12 shrink-0 rounded-full" style={{ background: f.c }} />
              <span className="font-display text-3xl md:text-5xl">{f.n}</span>
              <span className="hidden max-w-[14rem] text-right text-sm opacity-0 transition group-hover:opacity-100 sm:block">{f.t}</span>
            </motion.li>))}
        </ul>
      </section>

      <section data-sec className="relative z-20 min-h-screen overflow-hidden px-5 py-24 text-crema md:px-10">
        <Split t="Ingredientes que se notan" className="mb-12 max-w-3xl text-4xl md:text-6xl" />
        <div className="mb-16 flex gap-8 whitespace-nowrap font-display text-6xl opacity-90 md:text-8xl">
          <div data-marquee className="flex shrink-0 gap-8">{[...INGREDIENTS, ...INGREDIENTS].map((x, i) => <span key={i} className={i % 2 ? "outline" : ""}>{x}</span>)}</div>
        </div>
        <div className="flex flex-wrap items-center gap-6 rounded-3xl bg-mango p-8 text-selva">
          <p className="font-display text-3xl md:text-5xl">Lleva 2 bandejas por $15.000</p>
          <button onClick={() => add("promo")} className="rounded-full bg-selva px-7 py-3 font-semibold text-crema transition hover:scale-105">Aprovechar</button>
        </div>
        <footer className="mt-24 max-w-md">
          <h3 className="font-display text-3xl">Visítanos</h3>
          <p className="mt-3">Manzana 47, casa 12, calle 30 · El Pando, Santa Marta. Diagonal a Surtisam.</p>
          <a href={IG} className="mt-4 inline-block underline underline-offset-4">@crazymangos.sm</a>
        </footer>
      </section>

      <AnimatePresence>
        {open && (
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-crema p-6 text-selva shadow-2xl" role="dialog" aria-label="Tu pedido">
            <div className="flex justify-between"><h3 className="font-display text-2xl">Tu pedido</h3><button onClick={() => setOpen(false)} aria-label="Cerrar">✕</button></div>
            <ul className="mt-6 flex-1 space-y-3">
              {count === 0 && <li>Agrega algo del menú para empezar.</li>}
              {Object.entries(cart).map(([id, q]) => <li key={id} className="flex justify-between"><span>{PRODUCTS.find((p) => p.id === id)!.name}</span><span>x{q}</span></li>)}
            </ul>
            <button disabled={!count} onClick={order} className="rounded-full bg-chamoy py-3 font-semibold text-crema disabled:opacity-40">Enviar pedido por WhatsApp</button>
          </motion.aside>)}
      </AnimatePresence>
    </div>
  );
}
