"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { SectionEyebrow } from "../ui/section-eyebrow";
import { smoothScrollTo } from "../smooth-scroll";
import { LambdaEmblem } from "../icons";

/* Stylized robotic hands holding emblem — pure SVG */
function HandsArt() {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 520 340"
        className="relative h-[340px] w-[520px] max-w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E9F2FF" />
            <stop offset="55%" stopColor="#8AA7C7" />
            <stop offset="100%" stopColor="#2E4865" />
          </linearGradient>
          <linearGradient id="metal-dark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1B2E48" />
            <stop offset="100%" stopColor="#070D1A" />
          </linearGradient>
          <linearGradient id="palm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8D6E8" />
            <stop offset="100%" stopColor="#445E80" />
          </linearGradient>
          <radialGradient id="bell" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="rgba(80,170,255,0.55)" />
            <stop offset="100%" stopColor="rgba(48,166,255,0)" />
          </radialGradient>
        </defs>

        {/* Glow under */}
        <ellipse cx="260" cy="300" rx="170" ry="22" fill="rgba(48,166,255,0.45)" filter="blur(12px)" />

        {/* Left forearm */}
        <path
          d="M30,260 L130,170 L220,170 L220,260 Z"
          fill="url(#metal)"
          opacity="0.95"
        />
        <path
          d="M50,260 L130,180 L210,180 L210,260 Z"
          fill="url(#metal-dark)"
          opacity="0.6"
        />
        {/* Right forearm */}
        <path
          d="M490,260 L390,170 L300,170 L300,260 Z"
          fill="url(#metal)"
          opacity="0.95"
        />
        <path
          d="M470,260 L390,180 L310,180 L310,260 Z"
          fill="url(#metal-dark)"
          opacity="0.6"
        />

        {/* Left palm */}
        <path
          d="M110,180 C100,110 220,90 245,150 C255,180 240,210 220,220 C190,235 130,225 110,180 Z"
          fill="url(#palm)"
        />
        {/* Right palm */}
        <path
          d="M410,180 C420,110 300,90 275,150 C265,180 280,210 300,220 C330,235 390,225 410,180 Z"
          fill="url(#palm)"
        />

        {/* Fingers - left */}
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={`fl${i}`}
            x={150 + i * 22}
            y={70}
            width="14"
            height="80"
            rx="6"
            fill="url(#metal)"
            opacity="0.95"
          />
        ))}
        {/* Fingers - right */}
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={`fr${i}`}
            x={284 + i * 22}
            y={70}
            width="14"
            height="80"
            rx="6"
            fill="url(#metal)"
            opacity="0.95"
          />
        ))}
        {/* Thumb L */}
        <rect x="225" y="135" width="14" height="55" rx="6" fill="url(#metal)" transform="rotate(35 232 162)" />
        {/* Thumb R */}
        <rect x="280" y="135" width="14" height="55" rx="6" fill="url(#metal)" transform="rotate(-35 287 162)" />

        {/* Light blob between palms */}
        <circle cx="260" cy="155" r="86" fill="url(#bell)" />
      </svg>
      {/* Lambda emblem floating between palms */}
      <div className="absolute left-1/2 top-[28%] -translate-x-1/2">
        <LambdaEmblem className="h-20 w-20 drop-shadow-[0_0_20px_rgba(80,170,255,0.7)]" />
      </div>
    </div>
  );
}

/* Circuit background */
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
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8 }}
          className="mt-8 animate-float-y"
        >
          <HandsArt />
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
