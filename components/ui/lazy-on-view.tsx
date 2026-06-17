"use client";
import * as React from "react";

/**
 * Renders nothing until its placeholder approaches the viewport (rootMargin
 * 320px). Once visible, it mounts children and disconnects the observer.
 * Used to defer heavy below-the-fold sections so their framer-motion runtime
 * + CSS animations don't burn the main thread on initial load.
 */
export function LazyOnView({
  children,
  minHeight = 600,
  rootMargin = "320px",
}: {
  children: React.ReactNode;
  minHeight?: number;
  rootMargin?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
