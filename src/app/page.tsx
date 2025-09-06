"use client";

import Marquee from "react-fast-marquee";
function LogoMarquee() {
  return (
    <section className="py-12 bg-neutral-50">
      <Marquee gradient={false} speed={50} pauseOnHover>
        <span className="mx-12 text-2xl font-semibold text-neutral-700">Dirahatsa</span>
        <span className="mx-12 text-2xl font-semibold text-neutral-700">Wavuka</span>
        <span className="mx-12 text-2xl font-semibold text-neutral-700">BookOne</span>
        <span className="mx-12 text-2xl font-semibold text-neutral-700">Debrief</span>
        <span className="mx-12 text-2xl font-semibold text-neutral-700">Khetha AI</span>
      </Marquee>
    </section>
  );
}

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const MotionImage = motion(Image);

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
      {/* Background waves */}
      <MotionImage
        src="/hero-bg.png"
        alt="Background"
        fill
        style={{ y: yBg }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10" />

      <div className="relative h-full flex items-center">
        <div className="section flex justify-between items-center">
          {/* Left: Text */}
          <div>
            <motion.h1
              style={{ y: yTitle, opacity }}
              className="text-5xl md:text-7xl font-bold text-white max-w-3xl leading-tight"
            >
              Building accessible, powerful <span className="text-yellow-400">digital products</span> for SMEs.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 text-white/90 max-w-2xl"
            >
              Dirahatsa (Pty) Ltd — software development, platforms, and tools that help entrepreneurs grow.
            </motion.p>
            <div className="mt-10 flex gap-4">
              <a href="#solutions" className="px-6 py-3 rounded-2xl bg-yellow-400 font-medium hover:brightness-95">Our Solutions</a>
              <a href="#contact" className="px-6 py-3 rounded-2xl border border-white/40 text-white hover:bg-white/10">Contact</a>
            </div>
          </div>

          {/* Right: Robot (hidden on small screens) */}
          <MotionImage
            src="/hero-robot.png"
            alt="Mascot"
            width={400}
            height={400}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden md:block w-[400px] h-auto"
          />
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
            <Image src="/logos/dirahatsa-logo.png" alt="Dirahatsa" width={28} height={28} className="h-7 w-7 rounded hidden md:block" />
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
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p>
                We build software and platforms that help small businesses operate, market, and grow —
                from directories to accounting tools and custom apps.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Image
                src="/about-illustration.png"
                alt="Entrepreneur working"
                width={520}
                height={360}
                className="w-[520px] max-w-full h-auto drop-shadow-sm"
              />
            </div>
          </div>
        </FadeInSection>

        <FadeInSection id="solutions" title="Solutions & Products">
          <ul className="grid md:grid-cols-2 gap-6">
            <li className="p-6 rounded-2xl border hover:shadow-sm 
transition">
              <div className="flex items-center gap-3">
                <Image src="/logos/wavuka-logo.png" alt="Wavuka" width={32} height={32} className="h-8 w-8 rounded" />
                <h3 className="font-semibold">Wavuka — Business Directory 
& Marketplace</h3>
              </div>
              <p className="mt-2 text-sm text-neutral-600">
                Connects local service providers with customers. Premium 
features for visibility and lead gen.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Image src="/screens/wavuka-1.png" alt="Wavuka screen 1" width={360} height={240} className="rounded-lg border" />
                <Image src="/screens/wavuka-2.png" alt="Wavuka screen 2" width={360} height={240} className="rounded-lg border" />
              </div>
            </li>
            <li className="p-6 rounded-2xl border hover:shadow-sm 
transition">
              <div className="flex items-center gap-3">
                <Image src="/logos/bookone-logo.png" alt="BookOne" width={32} height={32} className="h-8 w-8 rounded" />
                <h3 className="font-semibold">BookOne — Accounting for 
SMEs</h3>
              </div>
              <p className="mt-2 text-sm text-neutral-600">
                Simple daily sales, invoicing, reports, and CSV/PDF 
exports for small businesses.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Image src="/screens/bookone-1.png" alt="BookOne screen 1" width={360} height={240} className="rounded-lg border" />
                <Image src="/screens/bookone-2.png" alt="BookOne screen 2" width={360} height={240} className="rounded-lg border" />
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
      <LogoMarquee />
      <footer className="section pt-0">
        <div className="border-t py-8 text-sm text-neutral-500">
          © {new Date().getFullYear()} Dirahatsa (Pty) Ltd. All rights reserved.
        </div>
      </footer>
    </>
  );
}

