"use client";
import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionEyebrow } from "../ui/section-eyebrow";

const steps = [
  {
    num: "01",
    title: "Análisis",
    body:
      "Mapeamos tu operación y detectamos los puntos donde la automatización con IA genera más valor.",
  },
  {
    num: "02",
    title: "Implementación",
    body:
      "Diseñamos y desplegamos agentes y flujos integrados a tu stack actual, sin fricción.",
  },
  {
    num: "03",
    title: "Optimización",
    body:
      "Medimos resultados, iteramos sobre los flujos y escalamos los que más impactan tu negocio.",
  },
];

export function ProcessSection() {
  // 3-phase highlight cycle: phase 0 → only step 1 lit · phase 1 → steps
  // 1 + 2 lit · phase 2 → all three. Loops continuously every ~2.4 s.
  const [phase, setPhase] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % 3), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1180px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-5"
        >
          <SectionEyebrow>Nuestro Proceso</SectionEyebrow>
          <h2 className="font-display font-medium text-[clamp(32px,4.5vw,52px)] leading-[1.1] text-white max-w-[820px] text-balance">
            Un Método Probado para Resultados Garantizados
          </h2>
          <p className="text-ink-soft text-[15px] max-w-[640px]">
            Tres fases que llevan a tu empresa desde la primera reunión hasta
            tener procesos operando solos en cuestión de semanas.
          </p>
        </motion.div>

        {/* Big circular emblem */}
        <div className="relative mt-16 flex items-center justify-center">
          <motion.div
            className="absolute h-[260px] w-[260px] radial-glow blur-3xl"
            animate={{ opacity: [0.55, 1, 0.55], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="relative h-[160px] w-[160px] rounded-full border border-white/10 grid place-items-center bg-bg-deep/40 backdrop-blur"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-20 w-20"
            >
              <Image
                src="/images/isotipo.png"
                alt="Virtuosolve"
                fill
                className="object-contain drop-shadow-[0_0_16px_rgba(80,170,255,0.5)]"
                sizes="80px"
              />
            </motion.div>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute inset-0 rounded-full border border-accent-blue/30 process-ring"
                style={{ "--ring-delay": `${i * 0.93}s` } as React.CSSProperties}
                aria-hidden
              />
            ))}
          </motion.div>
        </div>

        {/* Connector line + 3 steps */}
        <div className="relative mt-10">
          <div className="absolute left-[12%] right-[12%] top-[44px] h-px bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => {
              const lit = i <= phase; // true while this step is part of the current phase
              return (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="card-blob p-6 pt-12 transition-[transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    "--blob-delay": `${i * -2}s`,
                    transform: lit ? "translateY(-4px)" : "translateY(0)",
                  } as React.CSSProperties}
                >
                  {/* Dim overlay — drops the whole card when it's not in the
                      current phase. The inner content stays at full colour. */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[18px] bg-bg-deep/55 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ opacity: lit ? 0 : 1 }}
                    aria-hidden
                  />

                  {/* number circle anchored above the card */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 h-14 w-14 rounded-full glass-pill grid place-items-center z-10 transition-all duration-700">
                    {/* Ping ring — only on the active leading step */}
                    {lit && i === phase && (
                      <motion.span
                        className="absolute inset-0 rounded-full border border-accent-blue/60"
                        initial={{ scale: 1, opacity: 0.7 }}
                        animate={{ scale: 1.6, opacity: 0 }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                      />
                    )}
                    <span
                      className="font-display text-[14px] tracking-widest transition-colors duration-500"
                      style={{
                        color: lit ? "#9CD8FF" : "rgba(156, 216, 255, 0.35)",
                      }}
                    >
                      {s.num}
                    </span>
                  </div>

                  <h3
                    className="font-display font-medium text-[20px] text-center transition-colors duration-500"
                    style={{ color: lit ? "#FFFFFF" : "rgba(255, 255, 255, 0.45)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.6] text-center transition-colors duration-500"
                    style={{ color: lit ? "rgb(183, 222, 255)" : "rgba(183, 222, 255, 0.4)" }}
                  >
                    {s.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
