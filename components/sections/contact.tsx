"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { SectionEyebrow } from "../ui/section-eyebrow";
import {
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
  TwitterIcon,
  TiktokIcon,
} from "../icons";

// ─────────────────────────────────────────────────────────────────────────────
// Pega aquí la URL de tu Google Apps Script desplegado como Web App
// (la que termina en /exec — ver docs/apps-script-sheet.gs).
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwGx3hO60VukmT-bIYrryBO7i67azgKlsaZr-2gSOcrC9lTE37T7rpHbSautwfrD5M3/exec";
// ─────────────────────────────────────────────────────────────────────────────

const socials = [
  { Icon: InstagramIcon, href: "#", name: "Instagram" },
  { Icon: LinkedinIcon, href: "#", name: "LinkedIn" },
  { Icon: YoutubeIcon, href: "#", name: "YouTube" },
  { Icon: TwitterIcon, href: "#", name: "X" },
  { Icon: TiktokIcon, href: "#", name: "TikTok" },
];

type Status = "idle" | "sending" | "sent" | "error";

export function ContactSection() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState<string>("");
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    if (SCRIPT_URL.startsWith("[")) {
      setStatus("error");
      setErrorMsg(
        "Falta configurar SCRIPT_URL en contact.tsx — pega ahí la URL del Google Apps Script."
      );
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      nombre: String(fd.get("nombre") || ""),
      empresa: String(fd.get("empresa") || ""),
      email: String(fd.get("email") || ""),
      presupuesto: String(fd.get("presupuesto") || ""),
      descripcion: String(fd.get("descripcion") || ""),
      origen:
        typeof window !== "undefined"
          ? window.location.href
          : "virtuosolve",
    };

    setStatus("sending");
    setErrorMsg("");
    try {
      // text/plain evita el preflight CORS — Apps Script lo acepta y lo
      // parseamos como JSON en doPost.
      await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Error al enviar la solicitud."
      );
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background world-curve decoration */}
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
        aria-hidden
      >
        <defs>
          <radialGradient id="contact-glow" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="rgba(48,166,255,0.25)" />
            <stop offset="100%" stopColor="rgba(48,166,255,0)" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#contact-glow)" />
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse
            key={i}
            cx="720"
            cy="500"
            rx={620 + i * 38}
            ry={140 + i * 12}
            fill="none"
            stroke="rgba(80,170,255,0.18)"
            strokeWidth="0.7"
          />
        ))}
      </svg>

      <div className="relative mx-auto max-w-[760px] px-6 flex flex-col items-center">
        <SectionEyebrow>Solicita Nuestros Servicios</SectionEyebrow>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-6 font-display font-medium text-[clamp(32px,4.5vw,52px)] leading-[1.1] text-white text-center text-balance"
        >
          Haz Crecer tu Negocio Hoy
        </motion.h2>

        <p className="mt-4 text-ink-soft text-[15px] text-center max-w-[540px]">
          Cuéntanos en qué te podemos ayudar. Te respondemos en menos de 24h
          con un plan de automatización adaptado a tu equipo.
        </p>

        {/* Social row */}
        <div className="mt-8 flex items-center gap-4">
          {socials.map(({ Icon, href, name }, i) => (
            <motion.a
              key={name}
              href={href}
              aria-label={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -3, scale: 1.1 }}
              className="relative h-9 w-9 rounded-full glass-pill grid place-items-center text-ink-soft hover:text-white transition-colors"
            >
              <Icon className="h-4 w-4" />
              <motion.span
                className="absolute inset-0 rounded-full border border-accent-blue/40"
                initial={{ scale: 1, opacity: 0 }}
                whileHover={{ scale: 1.6, opacity: [0.6, 0] }}
                transition={{ duration: 0.8 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Form card */}
        <motion.form
          ref={formRef}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="mt-10 card-blob is-flat no-dots no-halo w-full p-6 md:p-8 flex flex-col gap-5"
          style={{ "--blob-delay": "-2s" } as React.CSSProperties}
          onSubmit={handleSubmit}
        >
          <Field name="nombre" label="Nombre" placeholder="Tu nombre" required />
          <Field
            name="empresa"
            label="Empresa"
            placeholder="Nombre de tu empresa o proyecto"
          />
          <Field
            name="email"
            label="Email"
            type="email"
            placeholder="Tu correo electrónico de contacto"
            required
          />
          <SelectField
            name="presupuesto"
            label="Presupuesto"
            placeholder="Elige tu rango de inversión..."
            options={[
              "Menos de 1.000 €",
              "1.000 € – 3.000 €",
              "3.000 € – 6.000 €",
              "6.000 € – 12.000 €",
              "Más de 12.000 €",
            ]}
          />
          <TextareaField
            name="descripcion"
            label="Cuéntame más sobre tu idea"
            placeholder="Comparte algunos detalles sobre lo que necesitas. Cuanto más sepamos, mejor podremos ayudarte."
          />

          {/* RGPD consent — required to enable submission */}
          <label className="flex items-start gap-3 mt-2 text-[12px] leading-[1.55] text-ink-soft/85 cursor-pointer">
            <input
              type="checkbox"
              required
              name="privacy-consent"
              className="mt-[3px] h-4 w-4 shrink-0 rounded border border-white/20 bg-bg-deep/70 accent-accent-blue"
            />
            <span>
              He leído y acepto la{" "}
              <a
                href="/privacidad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-blue hover:underline"
              >
                Política de Privacidad
              </a>{" "}
              y el tratamiento de mis datos para responder a esta consulta.
            </span>
          </label>

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="btn-blob mt-2 inline-flex items-center justify-center px-10 py-5 font-display font-semibold tracking-[0.14em] uppercase text-[15px] text-white disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="btn-toplight" aria-hidden />
            <span className="btn-sheen" aria-hidden />
            <span>
              {status === "sending"
                ? "Enviando…"
                : status === "sent"
                  ? "¡Recibida!"
                  : "Envía Solicitud"}
            </span>
          </button>

          {/* Status messages */}
          {status === "sent" && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-[13px] text-emerald-300/90"
            >
              ✓ Tu solicitud está en cola. Te respondemos en menos de 24h.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-[13px] text-rose-300/90"
            >
              ✗ {errorMsg || "Ha fallado el envío. Inténtalo de nuevo en unos segundos."}
            </motion.p>
          )}
          {status === "idle" && (
            <p className="text-center text-[11px] text-ink-soft/70">
              Respuesta en menos de 24h
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12px] uppercase tracking-[0.18em] text-ink-eyebrow">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="h-11 rounded-lg border border-white/10 bg-bg-deep/70 px-3.5 text-[14px] text-white placeholder:text-white/30 outline-none focus:border-accent-blue/60 focus:ring-2 focus:ring-accent-blue/25 transition"
      />
    </label>
  );
}

function SelectField({
  name,
  label,
  options,
  placeholder = "Selecciona una opción",
}: {
  name: string;
  label: string;
  options: string[];
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12px] uppercase tracking-[0.18em] text-ink-eyebrow">{label}</span>
      <select
        name={name}
        defaultValue=""
        className="h-11 rounded-lg border border-white/10 bg-bg-deep/70 px-3 text-[14px] text-white outline-none focus:border-accent-blue/60 focus:ring-2 focus:ring-accent-blue/25 transition"
      >
        <option value="" disabled className="bg-bg-deep">
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-bg-deep">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12px] uppercase tracking-[0.18em] text-ink-eyebrow">{label}</span>
      <textarea
        name={name}
        rows={4}
        placeholder={placeholder}
        className="rounded-lg border border-white/10 bg-bg-deep/70 p-3 text-[14px] text-white placeholder:text-white/30 outline-none focus:border-accent-blue/60 focus:ring-2 focus:ring-accent-blue/25 transition resize-none"
      />
    </label>
  );
}
