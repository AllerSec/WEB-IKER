"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { VerifiedIcon } from "../icons";
import { WaveDecoration } from "../ui/wave-decoration";
import { GLSLHills } from "../ui/glsl-hills";
import { smoothScrollTo } from "../smooth-scroll";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden flex items-center md:items-end justify-center pb-[10vh] md:pb-[32vh] min-h-screen"
    >
      {/* GLSL hills (Three.js + Perlin-noise displaced plane) */}
      <GLSLHills
        className="absolute inset-0 h-full w-full"
        color={[0.35, 0.6, 1.0]}
        speed={0.5}
      />

      {/* Particles only in the top half — keeps them above the headline and out of the hills below */}
      <WaveDecoration
        side="left"
        className="absolute left-0 top-0 h-[52%] w-[52%]"
      />
      <WaveDecoration
        side="right"
        className="absolute right-0 top-0 h-[52%] w-[52%]"
      />

      {/* Centered radial glow under headline */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[820px] radial-glow blur-2xl opacity-70 pointer-events-none" />

      {/* Smooth fade-to-bg gradient at the bottom — softens the section transition */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 md:h-64 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,10,21,0) 0%, rgba(0,10,21,0.55) 45%, rgba(0,10,21,0.9) 80%, #000A15 100%)",
        }}
      />

      <div className="relative z-20 mx-auto max-w-[1080px] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          {/* Verified badge with subtle breathing + soft ring pulses (CSS-only loops) */}
          <div className="relative h-10 w-10 grid place-items-center">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full border border-white/25 tick-ring"
            />
            <span
              aria-hidden
              className="absolute inset-0 rounded-full border border-white/25 tick-ring-delay"
            />
            <div className="relative tick-breath">
              <VerifiedIcon className="h-8 w-8 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.45)]" />
            </div>
          </div>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 glass-pill">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue shadow-[0_0_10px_rgba(48,166,255,0.9)]" />
            <span className="text-[12px] font-medium tracking-[0.2em] uppercase text-ink-eyebrow">
              Líderes en Automatización
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-hero font-medium leading-[1.08] tracking-[-0.02em] text-[clamp(36px,6vw,64px)] text-white text-balance">
            Automatiza Hoy.{" "}
            <span
              className="italic font-normal text-white"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              Lidera Mañana
            </span>
          </h1>

          {/* Sub */}
          <p className="max-w-[640px] text-[clamp(15px,1.4vw,18px)] leading-[1.6] text-white">
            Transformamos operaciones complejas en flujos simples, con soluciones
            de IA que trabajan por ti.
          </p>

          {/* CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo("#contact", { duration: 2.4 });
            }}
            className="btn-blob inline-flex items-center justify-center px-10 py-5 font-display font-semibold tracking-[0.14em] uppercase text-[15px] text-white mt-4"
          >
            <span className="btn-toplight" aria-hidden />
            <span className="btn-sheen" aria-hidden />
            <span>Solicita Nuestros Servicios</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
