"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  /** Fecha en formato "12 de junio de 2026" */
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative bg-bg-deep text-white min-h-screen">
      {/* Mini-header */}
      <header className="border-b border-white/5">
        <div className="mx-auto max-w-[920px] px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/isotipo.png"
              alt="VirtuoSolve"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <span className="font-display font-semibold tracking-[0.06em] text-[14px] text-white">
              VirtuoSolve
            </span>
          </Link>
          <Link
            href="/"
            className="text-[13px] text-ink-soft hover:text-white transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-[760px] px-6 py-16">
        <p className="text-[12px] uppercase tracking-[0.2em] text-accent-blue/90 mb-3">
          Información legal
        </p>
        <h1 className="font-display font-medium text-[clamp(28px,4vw,42px)] leading-tight text-white text-balance">
          {title}
        </h1>
        <p className="mt-3 text-[13px] text-ink-soft/70">
          Última actualización: {updated}
        </p>

        <div className="prose-legal mt-10 text-[15px] leading-[1.75] text-ink-soft">
          {children}
        </div>

        <hr className="my-12 border-white/5" />
        <p className="text-[12px] text-ink-soft/60">
          ¿Tienes dudas sobre este documento o sobre el tratamiento de tus
          datos? Escríbenos a{" "}
          <a
            href="mailto:[EMAIL_CONTACTO]"
            className="text-accent-blue hover:underline"
          >
            [EMAIL_CONTACTO]
          </a>
          .
        </p>
      </article>
    </main>
  );
}
