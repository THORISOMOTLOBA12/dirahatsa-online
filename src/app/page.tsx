"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { motion, useScroll, useTransform } from "framer-motion";

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true });
    const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}

function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section ref={ref} className="relative h-[88vh] overflow-hidden">
      <motion.div style={{ y: yBg }} className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10" />
      <div className="relative h-full flex items-center">
        <div className="section">
          <motion.h1 style={{ y: yTitle, opacity }} className="text-5xl md:text-7xl font-bold text-white max-w-3xl leading-tight">
            Building accessible, powerful <span className="text-yellow-400">digital products</span> for SMEs.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="mt-6 text-white/90 max-w-2xl">
            Dirahatsa (Pty) Ltd — software development, platforms, and tools that help entrepreneurs grow.
          </motion.p>
          <div className="mt-10 flex gap-4">
            <a href="#solutions" className="px-6 py-3 rounded-2xl bg-yellow-400 font-medium hover:brightness-95">Our Solutions</a>
            <a href="#contact" className="px-6 py-3 rounded-2xl border border-white/40 text-white hover:bg-white/10">Contact</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FadeInSection({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-semibold"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6 text-neutral-700"
      >
        {children}
      </motion.div>
    </section>
  );
}

export default function HomePage() {
  useLenis();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur 
supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b">
        <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center 
justify-between">
          <div className="flex items-center gap-2">
            <img src="/logos/dirahatsa-logo.png" alt="Dirahatsa" 
className="h-7 w-7 rounded hidden md:block" />
            <span className="font-semibold">Dirahatsa</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm">
            <a href="#about" className="hover:text-neutral-900 
text-neutral-600">About</a>
            <a href="#solutions" className="hover:text-neutral-900 
text-neutral-600">Solutions</a>
            <a href="#services" className="hover:text-neutral-900 
text-neutral-600">Services</a>
            <a href="#contact" className="hover:text-neutral-900 
text-neutral-600">Contact</a>
          </div>
        </nav>
      </header>

      <main className="pt-14">
        <ParallaxHero />

        <FadeInSection id="about" title="About Dirahatsa">
          <p>
            We build software and platforms that help small businesses 
operate, market, and grow — from directories to accounting tools and 
custom apps.
          </p>
        </FadeInSection>

        <FadeInSection id="solutions" title="Solutions & Products">
          <ul className="grid md:grid-cols-2 gap-6">
            <li className="p-6 rounded-2xl border hover:shadow-sm 
transition">
              <div className="flex items-center gap-3">
                <img src="/logos/wavuka-logo.png" alt="Wavuka" 
className="h-8 w-8 rounded" />
                <h3 className="font-semibold">Wavuka — Business Directory 
& Marketplace</h3>
              </div>
              <p className="mt-2 text-sm text-neutral-600">
                Connects local service providers with customers. Premium 
features for visibility and lead gen.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <img src="/screens/wavuka-1.png" alt="Wavuka screen 1" 
className="rounded-lg border" />
                <img src="/screens/wavuka-2.png" alt="Wavuka screen 2" 
className="rounded-lg border" />
                <img src="/screens/wavuka-3.png" alt="Wavuka screen 3" 
className="rounded-lg border" />
              </div>
            </li>
            <li className="p-6 rounded-2xl border hover:shadow-sm 
transition">
              <div className="flex items-center gap-3">
                <img src="/logos/bookone-logo.png" alt="BookOne" 
className="h-8 w-8 rounded" />
                <h3 className="font-semibold">BookOne — Accounting for 
SMEs</h3>
              </div>
              <p className="mt-2 text-sm text-neutral-600">
                Simple daily sales, invoicing, reports, and CSV/PDF 
exports for small businesses.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <img src="/screens/bookone-1.png" alt="BookOne screen 1" 
className="rounded-lg border" />
                <img src="/screens/bookone-2.png" alt="BookOne screen 2" 
className="rounded-lg border" />
                <img src="/screens/bookone-3.png" alt="BookOne screen 3" 
className="rounded-lg border" />
              </div>
            </li>
          </ul>
        </FadeInSection>

        <FadeInSection id="services" title="Software Development 
Services">
          <p>
            Full-stack development: mobile apps, websites, and 
integrations. Retainers available for ongoing feature development and 
maintenance.
          </p>
        </FadeInSection>

        <FadeInSection id="contact" title="Contact">
          <p>Email: <a className="underline" 
href="mailto:info@dirahatsa.online">info@dirahatsa.online</a></p>
          <p className="mt-2">Tell us what you want to build, and we’ll 
propose a clear scope and timeline.</p>
        </FadeInSection>
      </main>

      <footer className="section pt-0">
        <div className="border-t py-8 text-sm text-neutral-500">
          © {new Date().getFullYear()} Dirahatsa (Pty) Ltd. All rights 
reserved.
        </div>
      </footer>
    </>
  );
}

