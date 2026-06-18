"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

/* ─────────  Drifting particles for the page background  ─────────── */
function LegalAtmosphere() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      style={{
        maskImage:
          "linear-gradient(to bottom, #000 0%, #000 60%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 0%, #000 60%, transparent 100%)",
      }}
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMin slice"
    >
      <defs>
        <radialGradient id="legalGlowL" cx="10%" cy="20%" r="55%">
          <stop offset="0%" stopColor="rgba(48,166,255,0.22)" />
          <stop offset="60%" stopColor="rgba(48,166,255,0.05)" />
          <stop offset="100%" stopColor="rgba(48,166,255,0)" />
        </radialGradient>
        <radialGradient id="legalGlowR" cx="90%" cy="35%" r="55%">
          <stop offset="0%" stopColor="rgba(120,200,255,0.18)" />
          <stop offset="60%" stopColor="rgba(48,166,255,0.04)" />
          <stop offset="100%" stopColor="rgba(48,166,255,0)" />
        </radialGradient>
      </defs>
      <motion.rect
        width="100%"
        height="100%"
        fill="url(#legalGlowL)"
        animate={{ opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.rect
        width="100%"
        height="100%"
        fill="url(#legalGlowR)"
        animate={{ opacity: [0.7, 0.45, 0.7] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {Array.from({ length: 18 }).map((_, i) => {
        const top = ((i * 73) % 850) + 30;
        const left = ((i * 137) % 1180) + 20;
        return (
          <motion.circle
            key={`p-${i}`}
            cy={top}
            r={1.4}
            fill="#9CD8FF"
            initial={{ opacity: 0, cx: left }}
            animate={{
              opacity: [0, 1, 0],
              cx: [left, left + 14, left],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: (i * 0.45) % 5,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </svg>
  );
}

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  /** Fecha en formato "12 de junio de 2026" */
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative bg-bg-deep text-white min-h-screen overflow-x-hidden">
      {/* Atmospheric background — same vibe as the home hero */}
      <div className="absolute inset-0 h-[80vh] z-0">
        <LegalAtmosphere />
      </div>

      {/* Floating nav pill — mirrors the home navbar shape */}
      <nav className="fixed left-1/2 -translate-x-1/2 z-50 top-5 w-[min(620px,calc(100vw-24px))]">
        <div className="nav-blob px-3 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 pl-2">
            <Image
              src="/images/isotipo.png"
              alt="VirtuoSolve"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
              priority
            />
            <span className="font-display font-semibold tracking-[0.06em] text-[14px] text-white">
              VirtuoSolve
            </span>
          </Link>
          <Link
            href="/"
            className="text-[12px] font-display font-medium tracking-[0.14em] uppercase text-white/85 hover:text-white px-3 py-1.5 rounded-full transition-colors hover:bg-white/5"
          >
            ← Inicio
          </Link>
        </div>
      </nav>

      <article className="relative z-10 mx-auto max-w-[780px] px-6 pt-32 md:pt-40 pb-24">
        {/* Header block matching home-section style */}
        <div className="flex flex-col items-center text-center gap-5">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-medium leading-[1.1] tracking-[-0.01em] text-[clamp(32px,5vw,56px)] text-white text-balance"
          >
            {title}
          </motion.h1>
          <p className="text-[13px] tracking-[0.04em] text-ink-soft/70">
            Última actualización · {updated}
          </p>
        </div>

        {/* The legal copy itself — sits on a card-blob plate to match
            the visual language used everywhere else on the site */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="card-blob is-flat no-dots no-halo mt-12 p-7 md:p-10"
          style={{ "--blob-delay": "-2s" } as React.CSSProperties}
        >
          <div className="prose-legal text-[15px] leading-[1.78] text-ink-soft">
            {children}
          </div>
        </motion.div>

        <div className="mt-10 text-center text-[12px] text-ink-soft/60">
          ¿Tienes dudas sobre este documento o sobre el tratamiento de tus
          datos? Escríbenos a{" "}
          <a
            href="mailto:[EMAIL_CONTACTO]"
            className="text-accent-blue hover:underline"
          >
            [EMAIL_CONTACTO]
          </a>
          .
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-[12px] text-ink-soft/60">
          <Link href="/aviso-legal" className="hover:text-white transition-colors">Aviso Legal</Link>
          <span aria-hidden>·</span>
          <Link href="/privacidad" className="hover:text-white transition-colors">Privacidad</Link>
          <span aria-hidden>·</span>
          <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
        </div>
      </article>

      {/* Slim footer to close the page with the brand */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="mx-auto max-w-[780px] px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-ink-soft/60">
          <div className="flex items-center gap-2">
            <Image
              src="/images/isotipo.png"
              alt="VirtuoSolve"
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
            <span className="font-display font-semibold tracking-[0.06em] text-white/85">
              VirtuoSolve
            </span>
          </div>
          <span>© {new Date().getFullYear()} VirtuoSolve. Todos los derechos reservados.</span>
        </div>
      </footer>
    </main>
  );
}
