import * as React from "react";

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 glass-pill">
      <span className="block h-1.5 w-1.5 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(48,166,255,0.8)]" />
      <span className="text-[12px] font-medium tracking-[0.18em] uppercase text-ink-eyebrow">
        {children}
      </span>
    </div>
  );
}
