"use client";
import * as React from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { SectionEyebrow } from "../ui/section-eyebrow";
import { ChatIcon } from "../icons";
import { smoothScrollTo } from "../smooth-scroll";

/* ─────────────────────────────  Live gauge  ──────────────────────────── */
function DialGlyph({ active = false }: { active?: boolean }) {
  const ref = React.useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });

  const ARC = Math.PI * 80; // arc length of the semicircle (r=80)

  // single source of truth — everything else is derived from this percentage
  const pct = useMotionValue(0);
  const display = useTransform(pct, (x) => Math.round(x) + "%");
  const dashOffset = useTransform(pct, (p) => ARC * (1 - p / 100));
  const needleAngle = useTransform(pct, (p) => -90 + (p / 100) * 180);

  // tracks whether the first-ever rest intro has already started (so we don't
  // replay it when the user unhovers — instead we smoothly settle from the
  // current value back into the 40↔80 oscillation)
  const introStartedRef = React.useRef(false);

  React.useEffect(() => {
    if (!inView) return;

    if (active) {
      // hover → climb from current value to 100 and hold
      const c = animate(pct, 100, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
      return () => c.stop();
    }

    // rest path. Two flavours:
    //   - first time:  0 → 80 → 40   then loop
    //   - back from hover (or any subsequent entry): current → 40 then loop
    // Both ALWAYS animate from the current motion value, never snap to 0.
    let cancelled = false;
    let current: ReturnType<typeof animate> | undefined;

    const run = async () => {
      if (!introStartedRef.current) {
        introStartedRef.current = true;
        current = animate(pct, 80, { duration: 1.4, ease: "easeInOut" });
        await current;
        if (cancelled) return;
        current = animate(pct, 40, { duration: 1.4, ease: "easeInOut" });
        await current;
      } else {
        current = animate(pct, 40, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
        await current;
      }
      if (cancelled) return;
      current = animate(pct, [40, 80, 40], {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
      });
    };
    run();

    return () => {
      cancelled = true;
      current?.stop();
    };
  }, [inView, active, pct]);

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <svg ref={ref} viewBox="0 0 220 160" className="h-full w-full">
        <defs>
          <linearGradient id="dial-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4FB4FF" />
            <stop offset="100%" stopColor="#1A82E8" />
          </linearGradient>
          <radialGradient id="dial-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(48,166,255,0.55)" />
            <stop offset="100%" stopColor="rgba(48,166,255,0)" />
          </radialGradient>
        </defs>

        {/* background track */}
        <path
          d="M30,130 A80,80 0 0 1 190,130"
          stroke="rgba(120,180,255,0.18)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />

        {/* active arc — driven by the pct motion value */}
        <motion.path
          d="M30,130 A80,80 0 0 1 190,130"
          stroke="url(#dial-g)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={ARC}
          style={{ strokeDashoffset: dashOffset }}
        />

        {/* ticks — gently pulsing */}
        {Array.from({ length: 9 }).map((_, i) => {
          const a = (i / 8) * Math.PI;
          const x1 = 110 + Math.cos(Math.PI - a) * 70;
          const y1 = 130 - Math.sin(a) * 70;
          const x2 = 110 + Math.cos(Math.PI - a) * 60;
          const y2 = 130 - Math.sin(a) * 60;
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(180,210,255,0.4)"
              strokeWidth="1.5"
              animate={{ opacity: [0.25, 0.7, 0.25] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
            />
          );
        })}
      </svg>

      <div className="absolute bottom-3 inset-x-0 text-center">
        <p className="text-[11px] uppercase tracking-[0.18em] text-ink-soft/70">
          Eficiencia
        </p>
        <p className="text-[22px] font-display font-medium text-white">
          +<motion.span>{display}</motion.span>
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────  Live agent chat  ─────────────────────── */
function AgentGlyph() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });

  const messages = React.useMemo(
    () => [
      "¿Cómo puedo ayudarte hoy?",
      "Reservando tu cita…",
      "Listo, te lo confirmo ✉️",
    ],
    []
  );
  const [idx, setIdx] = React.useState(0);
  const [shown, setShown] = React.useState("");
  const [phase, setPhase] = React.useState<"typing" | "hold" | "deleting">("typing");

  React.useEffect(() => {
    if (!inView) return;
    const full = messages[idx];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (shown.length < full.length) {
        t = setTimeout(() => setShown(full.slice(0, shown.length + 1)), 45);
      } else {
        t = setTimeout(() => setPhase("hold"), 1300);
      }
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("deleting"), 500);
    } else {
      if (shown.length > 0) {
        t = setTimeout(() => setShown(full.slice(0, shown.length - 1)), 22);
      } else {
        setPhase("typing");
        setIdx((idx + 1) % messages.length);
      }
    }
    return () => clearTimeout(t);
  }, [shown, phase, idx, inView, messages]);

  return (
    <div ref={ref} className="relative h-full w-full flex items-center justify-center">
      {/* radiating rings */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute h-24 w-24 rounded-full border border-accent-blue/30"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={inView ? { scale: [0.6, 1.7], opacity: [0.45, 0] } : { opacity: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
        />
      ))}

      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 glass-pill rounded-2xl rounded-bl-sm p-3 flex items-center gap-2 max-w-[92%]"
      >
        <motion.div
          animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="shrink-0"
        >
          <ChatIcon className="h-4 w-4 text-accent-blue" />
        </motion.div>
        <span className="text-[12px] leading-snug text-white/90 whitespace-nowrap">
          {shown}
          <motion.span
            className="inline-block w-[1.5px] h-3 -mb-[2px] ml-[1px] bg-accent-blue"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </span>
      </motion.div>

      {/* live sound-wave bars under the bubble — slower, more ambient */}
      <div className="absolute bottom-3 flex items-end gap-[3px] h-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-accent-blue/70"
            animate={{ height: [4, 18, 8, 22, 4] }}
            transition={{
              duration: 2.8 + (i % 4) * 0.35,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 -z-10 radial-glow opacity-60 blur-3xl" />
    </div>
  );
}

/* ─────────────────────────────  Live SaaS / CRM dashboard  ───────────────── */
function DashboardGlyph() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });

  // live counter ticking up
  const count = useMotionValue(1180);
  const countDisplay = useTransform(count, (x) =>
    Math.round(x).toLocaleString("es-ES")
  );
  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(count, [1180, 1342, 1267, 1408, 1180], {
      duration: 12,
      ease: "easeInOut",
      repeat: Infinity,
    });
    return controls.stop;
  }, [inView, count]);

  const bars = [
    [30, 70, 45, 85, 55],
    [60, 40, 90, 50, 75],
    [45, 80, 35, 95, 60],
    [70, 55, 65, 40, 88],
    [50, 92, 48, 72, 38],
  ];

  return (
    <div ref={ref} className="relative h-full w-full flex items-center justify-center">
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-[230px] glass-card rounded-xl p-3.5 flex flex-col gap-3"
      >
        {/* header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent-blue" />
            <span className="text-[10px] uppercase tracking-[0.16em] text-ink-soft/80">
              Dashboard
            </span>
          </div>
          <div className="flex items-center gap-1">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="text-[9px] text-emerald-300/80">Live</span>
          </div>
        </div>

        {/* big metric counter */}
        <div>
          <p className="text-[9px] uppercase tracking-[0.14em] text-ink-soft/60">
            Clientes activos
          </p>
          <p className="text-[22px] leading-none font-display font-medium text-white">
            <motion.span>{countDisplay}</motion.span>
          </p>
        </div>

        {/* animated bar chart */}
        <div className="flex items-end justify-between gap-1.5 h-[52px]">
          {bars.map((heights, i) => (
            <motion.span
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-[#1A82E8] to-[#6EC1FF]"
              animate={{ height: heights.map((h) => `${h}%`) }}
              transition={{
                duration: 4 + (i % 3) * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.18,
              }}
            />
          ))}
        </div>

        {/* live list rows sliding in */}
        <div className="flex flex-col gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2"
              animate={{ opacity: [0.35, 1, 0.35], x: [0, 2, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            >
              <span className="h-3.5 w-3.5 rounded-full bg-accent-blue/30 shrink-0" />
              <span className="h-1.5 rounded bg-white/15 flex-1" />
              <span className="h-1.5 w-6 rounded bg-accent-blue/40" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* live status badge */}
      <motion.div
        className="absolute -top-2 -right-1 h-7 w-7 rounded-full bg-accent-blue/95 grid place-items-center text-white shadow-[0_0_20px_rgba(48,166,255,0.7)] z-10"
        animate={{ scale: [1, 1.12, 1], rotate: [0, 6, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h4l3 8 4-16 3 8h4" />
        </svg>
      </motion.div>

      <div className="absolute inset-0 -z-10 radial-glow opacity-50 blur-2xl" />
    </div>
  );
}

type Service = {
  title: string;
  body: string;
  Visual: React.ComponentType<{ active?: boolean }>;
};

const services: Service[] = [
  {
    title: "Automatizaciones",
    body: "Conectamos tus herramientas y eliminamos el trabajo manual: flujos que ejecutan, validan y reportan sin que tengas que tocar nada.",
    Visual: DialGlyph,
  },
  {
    title: "Asistentes de IA",
    body: "Agentes conversacionales entrenados con tu información: atienden clientes, califican leads y dan soporte 24/7 con respuestas precisas.",
    Visual: AgentGlyph,
  },
  {
    title: "Aplicaciones a Medida · SaaS y CRM",
    body: "Diseñamos y desarrollamos plataformas SaaS y CRMs hechos a tu medida, adaptados a tus procesos y listos para escalar con tu negocio.",
    Visual: DashboardGlyph,
  },
];

/* Grid card (1 of 2) — tracks its own hover and feeds it to the visual */
function ServiceCard({ s, i }: { s: Service; i: number }) {
  const [hover, setHover] = React.useState(false);
  const { Visual } = s;
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="card-blob p-6 flex flex-col h-[400px]"
      style={{ "--blob-delay": `${i * -2}s` } as React.CSSProperties}
    >
      <div className="relative h-[200px] w-full rounded-xl overflow-hidden border border-white/5 bg-bg-deep/40">
        <Visual active={hover} />
      </div>
      <div className="mt-5">
        <h3 className="font-display font-medium text-[20px] text-white">{s.title}</h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-ink-soft">{s.body}</p>
      </div>
    </motion.article>
  );
}

/* Wide card (the 3rd service) */
function ServiceWideCard({ s }: { s: Service }) {
  const [hover, setHover] = React.useState(false);
  const { Visual } = s;
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.16 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="mt-6 card-blob p-6 flex flex-col md:flex-row gap-6 items-center h-auto md:h-[280px]"
      style={{ "--blob-delay": "-4s" } as React.CSSProperties}
    >
      <div className="relative h-[200px] md:h-full w-full md:w-[300px] rounded-xl overflow-hidden border border-white/5 bg-bg-deep/40">
        <Visual active={hover} />
      </div>
      <div className="flex-1">
        <h3 className="font-display font-medium text-[22px] text-white">{s.title}</h3>
        <p className="mt-2 text-[15px] leading-[1.6] text-ink-soft max-w-[640px]">{s.body}</p>
      </div>
    </motion.article>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -top-10 h-[220px] w-full pointer-events-none opacity-50"
      >
        <path
          d="M0,160 C300,40 600,180 900,90 C1100,30 1200,120 1200,120"
          fill="none"
          stroke="rgba(48,166,255,0.35)"
          strokeWidth="1"
        />
        <path
          d="M0,180 C300,80 600,200 900,110 C1100,50 1200,140 1200,140"
          fill="none"
          stroke="rgba(48,166,255,0.18)"
          strokeWidth="1"
        />
      </svg>

      <div className="mx-auto max-w-[1180px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-5"
        >
          <SectionEyebrow>Servicios</SectionEyebrow>
          <h2 className="font-display font-medium text-[clamp(32px,4.5vw,52px)] leading-[1.1] text-white max-w-[820px] text-balance">
            Transformamos tu Operación con Inteligencia Artificial
          </h2>
          <p className="text-ink-soft text-[15px] max-w-[640px]">
            Diseñamos agentes y flujos a la medida de tu negocio. Desde la
            primera llamada hasta el reporte final, todo medible y escalable.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.slice(0, 2).map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} />
          ))}
        </div>

        <ServiceWideCard s={services[2]} />

        <div className="mt-12 flex justify-center">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo("#contact", { duration: 2.2 });
            }}
            className="btn-blob inline-flex items-center justify-center px-10 py-5 font-display font-semibold tracking-[0.14em] uppercase text-[15px] text-white"
          >
            <span className="btn-toplight" aria-hidden />
            <span className="btn-sheen" aria-hidden />
            <span>Reserva una Demo</span>
          </a>
        </div>
      </div>
    </section>
  );
}
