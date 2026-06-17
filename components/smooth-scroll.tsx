"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Module-level instance so `smoothScrollTo()` can reach it from any component
// without prop-drilling or React context. Set on mount, cleared on unmount.
let lenisInstance: Lenis | null = null;

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });
    lenisInstance = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}

/**
 * Animated scroll to a section by id. Deliberately slow (default 2.2s) so the
 * user "sees the whole page pass by" instead of a hard jump.
 * Force-mounts the target's LazyOnView wrapper (if any) via the hashchange
 * listener it already exposes, so the section is rendered before we scroll.
 */
export function smoothScrollTo(
  targetId: string,
  opts: { duration?: number; offset?: number } = {}
) {
  const id = targetId.startsWith("#") ? targetId.slice(1) : targetId;

  // 1. Force-mount the LazyOnView wrapper by updating hash + dispatching event.
  if (typeof window !== "undefined") {
    if (window.location.hash !== `#${id}`) {
      history.replaceState(null, "", `#${id}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  }

  // 2. Wait two animation frames so React mounts the section and layout settles
  //    BEFORE Lenis measures the target's final scroll position.
  const go = () => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisInstance) {
      lenisInstance.scrollTo(el, {
        duration: opts.duration ?? 2.2,
        offset: opts.offset ?? -40,
        easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (typeof window !== "undefined") {
    requestAnimationFrame(() => requestAnimationFrame(go));
  }
}
