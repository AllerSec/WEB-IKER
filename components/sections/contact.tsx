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

const socials = [
  { Icon: InstagramIcon, href: "#", name: "Instagram" },
  { Icon: LinkedinIcon, href: "#", name: "LinkedIn" },
  { Icon: YoutubeIcon, href: "#", name: "YouTube" },
  { Icon: TwitterIcon, href: "#", name: "X" },
  { Icon: TiktokIcon, href: "#", name: "TikTok" },
];

export function ContactSection() {
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
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="mt-10 card-blob is-flat no-dots no-halo w-full p-6 md:p-8 flex flex-col gap-5"
          style={{ "--blob-delay": "-2s" } as React.CSSProperties}
          onSubmit={(e) => e.preventDefault()}
        >
          <Field label="Nombre" placeholder="Tu nombre" />
          <Field label="Empresa" placeholder="Nombre de tu empresa o proyecto" />
          <Field
            label="Email"
            type="email"
            placeholder="Tu correo electrónico de contacto"
          />
          <SelectField
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
            label="Cuéntame más sobre tu idea"
            placeholder="Comparte algunos detalles sobre lo que necesitas. Cuanto más sepamos, mejor podremos ayudarte."
          />

          <button
            type="submit"
            className="btn-blue mt-2 rounded-full px-6 py-3.5 font-display font-medium tracking-[0.14em] uppercase text-[13px] text-white"
          >
            Enviar Solicitud
          </button>

          <p className="text-center text-[11px] text-ink-soft/70">
            Powered by Lambda · Respuesta en 24h
          </p>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12px] uppercase tracking-[0.18em] text-ink-eyebrow">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-11 rounded-lg border border-white/10 bg-bg-deep/70 px-3.5 text-[14px] text-white placeholder:text-white/30 outline-none focus:border-accent-blue/60 focus:ring-2 focus:ring-accent-blue/25 transition"
      />
    </label>
  );
}

function SelectField({
  label,
  options,
  placeholder = "Selecciona una opción",
}: {
  label: string;
  options: string[];
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12px] uppercase tracking-[0.18em] text-ink-eyebrow">{label}</span>
      <select
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
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12px] uppercase tracking-[0.18em] text-ink-eyebrow">{label}</span>
      <textarea
        rows={4}
        placeholder={placeholder}
        className="rounded-lg border border-white/10 bg-bg-deep/70 p-3 text-[14px] text-white placeholder:text-white/30 outline-none focus:border-accent-blue/60 focus:ring-2 focus:ring-accent-blue/25 transition resize-none"
      />
    </label>
  );
}
