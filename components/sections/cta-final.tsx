"use client";
import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionEyebrow } from "../ui/section-eyebrow";
import { smoothScrollTo } from "../smooth-scroll";

/* ─────────  Orbital core: isotipo + rotating rings + travelling orbs  ────── */
function OrbitalCore() {
  const C = 180; // viewBox centre
  const SIZE = 360;

  return (
    <div
      className="relative"
      style={{ width: SIZE, height: SIZE, maxWidth: "100%" }}
      aria-hidden
    >
      {/* Ground reflection under the core */}
      <div className="absolute left-1/2 bottom-3 -translate-x-1/2 h-7 w-56 rounded-full blur-2xl bg-accent-blue/55" />

      {/* Three concentric orbits with travelling orbs */}
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="orb-bright">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#9CD8FF" />
            <stop offset="100%" stopColor="rgba(48,166,255,0)" />
          </radialGradient>
          <radialGradient id="orb-soft">
            <stop offset="0%" stopColor="#C8E8FF" />
            <stop offset="100%" stopColor="rgba(120,200,255,0)" />
          </radialGradient>
        </defs>

        {/* Outer ring — large, slow, dashed */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 34, ease: "linear", repeat: Infinity }}
          style={{ transformOrigin: `${C}px ${C}px` }}
        >
          <circle
            cx={C}
            cy={C}
            r="160"
            fill="none"
            stroke="rgba(120,200,255,0.22)"
            strokeWidth="1"
            strokeDasharray="3 9"
          />
          <circle cx={C} cy={C - 160} r="10" fill="url(#orb-soft)" />
          <circle cx={C} cy={C - 160} r="3" fill="#fff" />
        </motion.g>

        {/* Mid ring — counter-rotating, segmented */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          style={{ transformOrigin: `${C}px ${C}px` }}
        >
          <circle
            cx={C}
            cy={C}
            r="118"
            fill="none"
            stroke="rgba(150,210,255,0.4)"
            strokeWidth="1.1"
            strokeDasharray="120 60 40 80 60"
          />
          <circle cx={C} cy={C - 118} r="12" fill="url(#orb-bright)" />
          <circle cx={C} cy={C - 118} r="3.5" fill="#fff" />
        </motion.g>

        {/* Inner ring — fast, solid, with a tiny travelling orb */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          style={{ transformOrigin: `${C}px ${C}px` }}
        >
          <circle
            cx={C}
            cy={C}
            r="80"
            fill="none"
            stroke="rgba(180,225,255,0.55)"
            strokeWidth="1.2"
          />
          <circle cx={C} cy={C - 80} r="9" fill="url(#orb-bright)" />
          <circle cx={C} cy={C - 80} r="2.5" fill="#fff" />
        </motion.g>

        {/* Subtle radial beams streaming out from centre */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x1 = C + Math.cos(angle) * 48;
          const y1 = C + Math.sin(angle) * 48;
          const x2 = C + Math.cos(angle) * 70;
          const y2 = C + Math.sin(angle) * 70;
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(180,220,255,0.7)"
              strokeWidth="1"
              strokeLinecap="round"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{
                duration: 2.4,
                delay: i * 0.12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>

      {/* Drifting sparkle particles in the gaps between orbits */}
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const r = 138 + (i % 3) * 8;
        const x = C + Math.cos(angle) * r;
        const y = C + Math.sin(angle) * r;
        return (
          <motion.span
            key={i}
            className="absolute block h-[3px] w-[3px] rounded-full bg-white"
            style={{ left: x - 1.5, top: y - 1.5 }}
            animate={{ opacity: [0, 1, 0], scale: [0.6, 1.4, 0.6] }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Centered layer: halo + ring + isotipo. The flex parent does the
          centering so framer-motion's transform (scale / y / rotate) doesn't
          override Tailwind's -translate-x/-y centering classes. */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Pulsing halo behind */}
        <motion.div
          className="absolute h-40 w-40 rounded-full bg-accent-blue/40 blur-3xl"
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Tight ring framing the isotipo (own slow spin) */}
        <motion.div
          className="absolute h-[120px] w-[120px] rounded-full border border-white/25"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white/70" />
        </motion.div>

        {/* The isotipo: subtle floating + breathing + heavy blue glow */}
        <motion.div
          animate={{ y: [0, -6, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative h-[88px] w-[88px] drop-shadow-[0_0_28px_rgba(80,170,255,0.9)]">
            <Image
              src="/images/isotipo.png"
              alt="VirtuoSolve"
              fill
              className="object-contain"
              sizes="88px"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* Circuit background (kept — feels right behind the orbital core) */
function CircuitBg() {
  return (
    <svg
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full opacity-50"
      aria-hidden
    >
      <defs>
        <linearGradient id="cwire" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(48,166,255,0)" />
          <stop offset="50%" stopColor="rgba(48,166,255,0.55)" />
          <stop offset="100%" stopColor="rgba(48,166,255,0)" />
        </linearGradient>
      </defs>
      {Array.from({ length: 22 }).map((_, i) => {
        const y = 30 + i * 26;
        return (
          <g key={i}>
            <line x1="0" x2="1200" y1={y} y2={y} stroke="rgba(80,170,255,0.12)" />
            {Array.from({ length: 8 }).map((__, j) => (
              <circle
                key={j}
                cx={120 + j * 140 + (i % 2) * 70}
                cy={y}
                r="1.5"
                fill="rgba(80,170,255,0.55)"
              />
            ))}
          </g>
        );
      })}
      <path
        d="M0,300 C200,250 400,360 600,300 C800,240 1000,360 1200,300"
        fill="none"
        stroke="url(#cwire)"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function CTAFinalSection() {
  return (
    <section id="cta" className="relative py-24 md:py-32 overflow-hidden">
      <CircuitBg />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] radial-glow blur-3xl opacity-60 pointer-events-none" />

      <div className="relative mx-auto max-w-[1100px] px-6 flex flex-col items-center text-center">
        <SectionEyebrow>Empieza Ahora</SectionEyebrow>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <OrbitalCore />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-4 font-display font-medium text-[clamp(32px,4.5vw,52px)] leading-[1.1] text-white text-balance"
        >
          Ponte en Nuestras Manos
        </motion.h2>

        <p className="mt-4 max-w-[600px] text-[15px] leading-[1.6] text-ink-soft">
          El futuro de tu operación ya está aquí. Te ayudamos a desplegar la IA
          que necesita tu equipo para crecer sin sumar carga.
        </p>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo("#contact", { duration: 2.2 });
          }}
          className="btn-blob mt-8 inline-flex items-center justify-center px-10 py-5 font-display font-semibold tracking-[0.14em] uppercase text-[15px] text-white"
        >
          <span className="btn-toplight" aria-hidden />
          <span className="btn-sheen" aria-hidden />
          <span>Automatiza Ahora</span>
        </a>
      </div>
    </section>
  );
}
