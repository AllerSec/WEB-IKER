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
  id,
}: {
  children: React.ReactNode;
  minHeight?: number;
  rootMargin?: string;
  /** Anchor id placed on the wrapper so `#id` links work even before the
   *  real section mounts. Listen to hash-change to force-mount on click. */
  id?: string;
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

  // If the page lands with #id matching this wrapper (or the user clicks an
  // anchor while we're still off-screen), force-mount immediately so the
  // browser can actually scroll to a populated section.
  React.useEffect(() => {
    if (!id || visible) return;
    const check = () => {
      if (window.location.hash === `#${id}`) setVisible(true);
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, [id, visible]);

  return (
    <div ref={ref} id={id} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
