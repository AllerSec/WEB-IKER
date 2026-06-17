"use client";
import * as React from "react";
import { motion, useInView } from "framer-motion";
import { SectionEyebrow } from "../ui/section-eyebrow";

/* Palettes — red at rest, blue when the card is active (hover/focus) */
const palette = {
  rest: {
    bright: "#FFB1C4",
    mid: "#FF4D70",
    deep: "#C81C3C",
    fill: "rgba(255,77,112,0.35)",
    glow: "rgba(255,40,60,0.55)",
    line: "rgba(255,77,112,0.85)",
  },
  active: {
    bright: "#C6E8FF",
    mid: "#4FB4FF",
    deep: "#1A82E8",
    fill: "rgba(80,170,255,0.4)",
    glow: "rgba(48,166,255,0.6)",
    line: "rgba(120,200,255,0.9)",
  },
};

/* ─────────────────────────────  Animated chart  ───────────────────────────── */
function ChartGlyph({ active }: { active: boolean }) {
  const ref = React.useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const p = active ? palette.active : palette.rest;

  const linePath =
    "M0,92 C14,86 22,78 32,76 S50,72 65,68 S82,52 100,55 S125,45 140,40 S168,30 185,24 S210,16 220,14";
  const points = [
    { x: 32, y: 76 },
    { x: 65, y: 68 },
    { x: 100, y: 55 },
    { x: 140, y: 40 },
    { x: 185, y: 24 },
    { x: 220, y: 14 },
  ];

  return (
    <svg ref={ref} viewBox="0 0 220 120" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="chartLine" x1="0" y1="0" x2="1" y2="0">
          <motion.stop offset="0%" animate={{ stopColor: p.mid }} transition={{ duration: 0.4 }} />
          <motion.stop offset="100%" animate={{ stopColor: p.deep }} transition={{ duration: 0.4 }} />
        </linearGradient>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <motion.stop offset="0%" animate={{ stopColor: p.fill }} transition={{ duration: 0.4 }} />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
        <radialGradient id="chartHaloRest" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,77,112,0.55)" />
          <stop offset="100%" stopColor="rgba(255,77,112,0)" />
        </radialGradient>
        <radialGradient id="chartHaloActive" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(80,180,255,0.75)" />
          <stop offset="100%" stopColor="rgba(80,180,255,0)" />
        </radialGradient>
      </defs>

      {[...Array(6)].map((_, i) => (
        <line key={i} x1="0" x2="220" y1={20 + i * 18} y2={20 + i * 18} stroke="rgba(120,180,255,0.06)" />
      ))}

      <motion.path
        d={`${linePath} L220,120 L0,120 Z`}
        fill="url(#chartFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ delay: active ? 0.7 : 1.6, duration: 0.7 }}
      />

      <motion.path
        d={linePath}
        fill="none"
        stroke="url(#chartLine)"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView ? 1 : 0 }}
        transition={{
          duration: active ? 0.9 : 1.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      <motion.path
        d={linePath}
        fill="none"
        stroke="url(#chartLine)"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: inView ? 1 : 0, opacity: inView ? (active ? 0.6 : 0.35) : 0 }}
        transition={{
          duration: active ? 0.9 : 1.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ filter: "blur(3px)" }}
      />

      {points.slice(0, -1).map((pt, i) => (
        <motion.circle
          key={i}
          cx={pt.x}
          cy={pt.y}
          r={2.5}
          fill="#fff"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            inView
              ? { scale: [0, 1.6, 1], opacity: [0, 1, 1], y: [0, -1, 0] }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            delay: (active ? 0.18 : 0.4) + i * (active ? 0.08 : 0.2),
            duration: 0.55,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        />
      ))}

      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ delay: active ? 0.8 : 1.6, duration: 0.5 }}
      >
        <motion.circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r={16}
          fill={active ? "url(#chartHaloActive)" : "url(#chartHaloRest)"}
          animate={{ scale: [0.6, 1, 0.6], opacity: [0.45, 0.9, 0.45] }}
          transition={{ duration: active ? 1.6 : 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r={3.2}
          fill="#fff"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: active ? 0.9 : 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>

      <motion.circle
        r={3}
        fill="#fff"
        style={{
          offsetPath: `path('${linePath}')`,
          offsetRotate: "0deg" as unknown as undefined,
          filter: "drop-shadow(0 0 4px rgba(255,255,255,0.9))",
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] } : { opacity: 0 }}
        transition={{
          delay: active ? 1.0 : 2.0,
          duration: active ? 1.4 : 3.0,
          repeat: Infinity,
          repeatDelay: active ? 0.2 : 1.4,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

/* ─────────────────────────────  Radar sweep  ───────────────────────── */
function GlowCard({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl flex items-center justify-center">
      <div
        className="radar-glyph"
        style={
          {
            "--radar-color": active ? "#4FB4FF" : "#FF4D70",
          } as React.CSSProperties
        }
      >
        <span className="radar-sweep" />
      </div>
    </div>
  );
}

/* ─────────────────────────────  Animated chat  ──────────────────────────── */
function ChatGlyph({ active }: { active: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const p = active ? palette.active : palette.rest;

  const bubbles = [
    { side: "l", text: "¿Estado del pedido #4821?" },
    { side: "r", text: "En tránsito · llega 14:30", read: true },
    { side: "l", text: "Gracias!" },
  ];

  const bubbleEase = [0.34, 1.56, 0.64, 1] as const;

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(60% 80% at 50% 50%, ${
            active ? "rgba(60,180,255,0.5)" : "rgba(255,80,110,0.4)"
          } 0%, ${
            active ? "rgba(10,40,80,0.4)" : "rgba(80,15,30,0.4)"
          } 50%, rgba(0,0,0,0) 80%)`,
        }}
        transition={{ duration: 0.4 }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-5">
        {bubbles.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14, scale: 0.88, x: b.side === "l" ? -8 : 8 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1, x: 0 } : { opacity: 0, y: 14 }}
            transition={{
              delay: (active ? 0.12 : 0.3) + i * (active ? 0.22 : 0.5),
              duration: 0.55,
              ease: bubbleEase,
            }}
            className={`glass-pill rounded-2xl px-3 py-1.5 text-[11px] flex items-center gap-1.5 ${
              b.side === "l" ? "self-start rounded-bl-sm" : "self-end rounded-br-sm"
            }`}
            style={{
              color: b.side === "l" ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.95)",
              background:
                b.side === "r"
                  ? active
                    ? "rgba(48,166,255,0.35)"
                    : "rgba(255,77,112,0.35)"
                  : "rgba(8, 22, 44, 0.55)",
              borderColor:
                b.side === "r"
                  ? active
                    ? "rgba(48,166,255,0.45)"
                    : "rgba(255,77,112,0.45)"
                  : "rgba(120, 180, 255, 0.18)",
            }}
          >
            <span>{b.text}</span>
            {b.read && (
              <motion.svg
                viewBox="0 0 24 16"
                className="h-2.5 w-3.5 shrink-0"
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0 }}
                transition={{
                  delay: (active ? 0.12 : 0.3) + i * (active ? 0.22 : 0.5) + 0.35,
                  duration: 0.4,
                }}
              >
                <motion.path d="M2 9 L7 14 L14 5" />
                <motion.path d="M10 9 L15 14 L22 5" />
              </motion.svg>
            )}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{
            delay: active ? 0.85 : 1.95,
            duration: 0.4,
            ease: bubbleEase,
          }}
          className="self-start flex items-center gap-1.5"
        >
          <motion.span
            className="h-3.5 w-3.5 rounded-full"
            style={{ background: p.mid, boxShadow: `0 0 8px ${p.mid}` }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{
              duration: active ? 0.9 : 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div className="glass-pill rounded-2xl rounded-bl-sm px-3 py-2 flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full"
                animate={{
                  y: [0, active ? -5 : -3, 0],
                  opacity: [0.35, 1, 0.35],
                  backgroundColor: p.mid,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: active ? 0.45 : 1,
                  repeat: Infinity,
                  delay: i * (active ? 0.08 : 0.18),
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────  Card wrapper  ────────────────────────────── */
type CardData = {
  title: string;
  body: string;
  Visual: React.ComponentType<{ active: boolean }>;
};

const cards: CardData[] = [
  {
    title: "Reduce Tiempo Manual",
    body: "Sustituye procesos repetitivos por agentes que ejecutan, validan y reportan sin intervención humana.",
    Visual: ChartGlyph,
  },
  {
    title: "Mayor Velocidad Operativa",
    body: "Decisiones en tiempo real. Respuestas a clientes, generación de documentos y enrutamientos al instante.",
    Visual: GlowCard,
  },
  {
    title: "Menos Errores Humanos",
    body: "Validaciones automáticas, trazabilidad y aprendizaje continuo. Tu equipo se libera para lo creativo.",
    Visual: ChatGlyph,
  },
];

function BenefitCard({ card, index }: { card: CardData; index: number }) {
  const [active, setActive] = React.useState(false);
  const { Visual } = card;
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="card-blob p-5 flex flex-col h-[360px] group"
      style={{ "--blob-delay": `${index * -2}s` } as React.CSSProperties}
    >
      <div className="relative h-[160px] w-full rounded-xl overflow-hidden border border-white/5 bg-bg-deep/60">
        <Visual active={active} />
      </div>
      <div className="mt-5">
        <h3 className="font-display font-medium text-[18px] text-white">
          {card.title}
        </h3>
        <p className="mt-2 text-[14px] leading-[1.55] text-ink-soft">
          {card.body}
        </p>
      </div>
    </motion.article>
  );
}

export function BenefitsSection() {
  return (
    <section id="benefits" className="relative pt-10 md:pt-12 pb-24 md:pb-32">
      <div className="mx-auto max-w-[1180px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-5"
        >
          <SectionEyebrow>Beneficios</SectionEyebrow>
          <h2 className="font-display font-medium text-[clamp(26px,3.6vw,44px)] leading-[1.1] text-white whitespace-nowrap">
            Optimiza, Acelera y Automatiza
          </h2>
          <p className="text-ink-soft text-[15px] max-w-[640px]">
            Implementa IA donde tu equipo pierde más tiempo. El resultado se mide
            en horas recuperadas y errores eliminados desde el primer mes.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <BenefitCard key={c.title} card={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
