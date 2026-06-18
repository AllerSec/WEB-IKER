"use client";
import * as React from "react";
import Link from "next/link";

/** Minimal cookies banner.
 *  - Persists choice in localStorage so it only shows on first visit.
 *  - Two CTAs: "Aceptar" + "Solo necesarias" (rejection of non-essentials).
 *  - Does NOT load any tracking by itself — once you integrate GA / Pixel
 *    etc., gate them on `localStorage.getItem("cookie-consent") === "all"`.
 */
export function CookieBanner() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    try {
      const choice = window.localStorage.getItem("cookie-consent");
      if (!choice) setShow(true);
    } catch {
      // privacy-mode → silently skip
    }
  }, []);

  const decide = (choice: "all" | "necessary") => {
    try {
      window.localStorage.setItem("cookie-consent", choice);
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[min(640px,calc(100vw-24px))]"
    >
      <div className="glass-pill rounded-2xl p-5 shadow-[0_22px_60px_-20px_rgba(0,0,0,0.7)]">
        <p className="text-[13px] leading-[1.6] text-ink-soft">
          Usamos cookies técnicas para que la web funcione. Si nos lo permites,
          también usaremos cookies analíticas para medir cómo se utiliza el
          sitio y mejorarlo. Puedes leer más en nuestra{" "}
          <Link
            href="/cookies"
            className="text-accent-blue hover:underline whitespace-nowrap"
          >
            Política de Cookies
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => decide("necessary")}
            className="text-[12px] px-4 py-2 rounded-full border border-white/15 text-ink-soft hover:text-white hover:border-white/30 transition-colors uppercase tracking-[0.14em] font-display"
          >
            Solo necesarias
          </button>
          <button
            type="button"
            onClick={() => decide("all")}
            className="btn-blue rounded-full px-5 py-2 text-[12px] font-display font-medium tracking-[0.14em] uppercase text-white"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
