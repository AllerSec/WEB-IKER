"use client";
import * as React from "react";
import { motion } from "framer-motion";

/**
 * Hero background atmosphere — soft radial glow + drifting sparkle particles.
 * (The concentric wave arcs were removed; particles + glow remain.)
 */
export function WaveDecoration({
  side,
  className = "",
}: {
  side: "left" | "right";
  className?: string;
}) {
  const flip = side === "right" ? "scale-x-[-1]" : "";

  return (
    <svg
      viewBox="0 0 500 900"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none select-none ${flip} ${className}`}
      style={{
        maskImage:
          "linear-gradient(to bottom, #000 0%, #000 65%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 0%, #000 65%, transparent 100%)",
      }}
      aria-hidden
    >
      <defs>
        <radialGradient id={`waveGlow-${side}`} cx="15%" cy="50%" r="65%">
          <stop offset="0%" stopColor="rgba(48,166,255,0.35)" />
          <stop offset="60%" stopColor="rgba(48,166,255,0.08)" />
          <stop offset="100%" stopColor="rgba(48,166,255,0)" />
        </radialGradient>
      </defs>

      {/* breathing background glow (subtle, no rings) */}
      <motion.rect
        width="100%"
        height="100%"
        fill={`url(#waveGlow-${side})`}
        animate={{ opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* drifting sparkle particles */}
      {Array.from({ length: 14 }).map((_, i) => {
        const top = ((i * 71) % 850) + 30;
        const left = ((i * 47) % 220) + 20;
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
              delay: (i * 0.45) % 4,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </svg>
  );
}
