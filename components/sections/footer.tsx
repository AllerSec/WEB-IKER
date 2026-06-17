"use client";
import * as React from "react";
import { LambdaEmblem } from "../icons";

const sections = [
  {
    title: "Navegación",
    items: [
      { label: "Inicio", href: "#hero" },
      { label: "Beneficios", href: "#benefits" },
      { label: "Servicios", href: "#services" },
      { label: "Proceso", href: "#process" },
    ],
  },
  {
    title: "Social",
    items: [
      { label: "YouTube", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "X / Twitter", href: "#" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Términos", href: "#" },
      { label: "Privacidad", href: "#" },
      { label: "Contacto", href: "#contact" },
    ],
  },
];

export function FooterSection() {
  return (
    <footer className="relative border-t border-white/5 py-14">
      <div className="mx-auto max-w-[1180px] px-6 grid grid-cols-1 md:grid-cols-[1.6fr_repeat(3,1fr)] gap-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <LambdaEmblem className="h-12 w-12" />
            <span className="font-display font-semibold tracking-[0.06em] text-[20px] text-white">
              VirtuoSolve
            </span>
          </div>
        </div>

        {sections.map((col) => (
          <div key={col.title}>
            <div className="text-[11px] tracking-[0.22em] uppercase text-ink-eyebrow mb-3">
              {col.title}
            </div>
            <ul className="flex flex-col gap-2">
              {col.items.map((it) => (
                <li key={it.label}>
                  <a
                    href={it.href}
                    className="text-[14px] text-ink-soft hover:text-white transition-colors"
                  >
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-[1180px] px-6 mt-12 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-ink-soft/70 border-t border-white/5 pt-6">
        <span>© {new Date().getFullYear()} Lambda Template · Plantilla demostrativa.</span>
        <span>Diseñada como template — personalízala con tu marca.</span>
      </div>
    </footer>
  );
}
