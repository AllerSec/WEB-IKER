"use client";
import * as React from "react";
import Image from "next/image";
import { MenuIcon } from "./icons";
import { smoothScrollTo } from "./smooth-scroll";

const links = [
  { href: "#benefits", label: "Beneficios" },
  { href: "#services", label: "Servicios" },
  { href: "#process", label: "Proceso" },
];

/** Click handler for any in-page anchor — slow-scrolls via Lenis instead of jumping. */
function useAnchorClick() {
  return React.useCallback(
    (href: string, onAfter?: () => void) => (e: React.MouseEvent) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      smoothScrollTo(href, { duration: 2.2 });
      onAfter?.();
    },
    []
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const anchorClick = useAnchorClick();

  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 w-[min(960px,calc(100vw-24px))] transition-all duration-300 ${
        scrolled ? "top-3" : "top-5"
      }`}
    >
      <div
        className={`nav-blob px-3 py-2 flex items-center justify-between ${
          scrolled ? "shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]" : ""
        }`}
      >
        <a
          href="#hero"
          onClick={anchorClick("#hero")}
          className="flex items-center gap-2 pl-2"
        >
          <Image
            src="/images/isotipo.png"
            alt="Virtuosolve"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
            priority
          />
          <span className="font-display font-semibold tracking-[0.06em] text-[14px] text-white">
            VirtuoSolve
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={anchorClick(l.href)}
                className="px-3 py-1.5 text-[13px] text-white/85 hover:text-white rounded-full transition-colors hover:bg-white/5"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={anchorClick("#contact")}
          className="nav-blob-sm hidden md:inline-flex px-4 py-2 text-[11px] font-display font-medium tracking-[0.14em] uppercase text-white"
        >
          <span className="btn-toplight" aria-hidden />
          <span className="btn-sheen" aria-hidden />
          <span>Solicita Servicios</span>
        </a>

        <button
          aria-label="Menu"
          className="md:hidden h-9 w-9 rounded-full grid place-items-center text-white/85 hover:bg-white/5"
          onClick={() => setOpen((o) => !o)}
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-2 glass-pill rounded-2xl p-3 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={anchorClick(l.href, () => setOpen(false))}
              className="px-3 py-2 text-[14px] text-white/85 hover:text-white rounded-lg hover:bg-white/5"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={anchorClick("#contact", () => setOpen(false))}
            className="btn-blue mt-2 rounded-full px-4 py-2 text-[12px] font-display font-medium tracking-[0.14em] uppercase text-white text-center"
          >
            Solicita Servicios
          </a>
        </div>
      )}
    </nav>
  );
}
