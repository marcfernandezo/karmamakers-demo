"use client";

import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

/** Snappy expo-out — matches the MVST.co aesthetic. */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const LINKS = {
  empresa: [
    { label: "Soluciones", href: "#solutions" },
    { label: "Showcase",   href: "#showcase"   },
    { label: "Nosotros",   href: "#about"   },
    { label: "Trabajo",    href: "/"    },
    { label: "Contacto",   href: "#about"   },
  ],
  social: [
    { label: "Instagram",   href: "https://www.instagram.com/karmamakers"         },
    { label: "LinkedIn",    href: "https://www.linkedin.com/company/karma-makers" },
    { label: "Twitter / X", href: "https://x.com/karmamakers"                    },
  ],
  legal: [
    { label: "Privacidad", href: "/privacidad" },
    { label: "Términos",   href: "/terminos"   },
    { label: "Cookies",    href: "/cookies"    },
  ],
} satisfies Record<string, NavLink[]>;

const CONTACT_ITEMS = [
  {
    Icon: Mail,
    label: "hello@karma-makers.es",
    href: "mailto:hello@karma-makers.es",
  },
  {
    Icon: MapPin,
    label: "Barcelona · Mitre Muntaner",
    href: "https://maps.app.goo.gl/aWAEQPVMVweSYuM77",
  },
];

// Primitives 

/**
 * Full-width horizontal rule that reveals left → right via scaleX.
 * More intentional than a static border.
 */
function AnimatedRule() {
  return (
    <motion.div
      className="h-px w-full bg-zinc-200 origin-left"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: EASE }}
    />
  );
}

/**
 *  - underline span scales from left on hover
 *  - ArrowUpRight slides in from bottom-left corner
 */
function InlineLink({ href, label }: NavLink) {
  return (
    <a
      href={href}
      className="group relative inline-flex w-full items-center justify-between text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-200"
    >
      <span className="relative">
        {label}
        {/* Underline reveal */}
        <span
          className="absolute -bottom-px left-0 h-px w-full bg-zinc-900 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
          style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
        />
      </span>

      {/* Arrow slides from bottom-left to neutral */}
      <ArrowUpRight
        size={13}
        className="shrink-0 opacity-0 translate-x-1 -translate-y-1 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
      />
    </a>
  );
}

//  Section Components 

/**
 * Column header + staggered link list.
 * The `motion.ul` orchestrates children via staggerChildren.
 */
function NavCol({
  title,
  links,
  delay = 0,
}: {
  title: string;
  links: NavLink[];
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      <h4 className="text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-400 mb-6">
        {title}
      </h4>

      <motion.ul
        className="space-y-4"
        variants={{
          visible: {
            transition: { staggerChildren: 0.065, delayChildren: delay + 0.08 },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {links.map((link) => (
          <motion.li
            key={link.label}
            variants={{
              hidden:  { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
            }}
          >
            <InlineLink {...link} />
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

/**
 * Ghost typographic anchor at the footer's base — the signature element.
 * Each character cascades in from below with a short stagger,
 * creating a "curtain rise" reveal that reads as intentional rather than noisy.
 */
function FooterWordmark() {
  const chars = [...("KARMA MAKERS.")];

  return (
    <div
      className="px-6 lg:px-10 pt-10 pb-4 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="flex flex-wrap leading-none">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="text-[clamp(2.4rem,7vw,7rem)] font-bold tracking-tight text-zinc-100"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.04 + i * 0.028,
              ease: EASE,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

//  Footer 

export default function Footer() {
  return (
    <footer className="relative bg-white text-black overflow-hidden">
      <AnimatedRule />

      {/*  MAIN GRID  */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 grid md:grid-cols-4 gap-12 md:gap-16">

        {/* BRAND */}
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h2 className="text-[2.25rem] font-semibold tracking-tight uppercase leading-none">
            Karma Makers<span className="text-zinc-300">.</span>
          </h2>

          <p className="mt-5 max-w-sm text-sm text-zinc-500 leading-relaxed">
            Impulsamos el crecimiento de su negocio con nuestras soluciones de
            inteligencia artificial. Diseñado por nosotros, para vosotros.
          </p>

          {/* Contact links — same underline + icon micro-animation as nav */}
          <div className="mt-8 flex flex-col gap-3">
            {CONTACT_ITEMS.map(({ Icon, label, href }) => (
              <a
                key={href}
                href={href}
                className="group inline-flex w-fit items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-200"
              >
                <Icon
                  size={14}
                  className="shrink-0 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
                />
                <span className="relative">
                  {label}
                  <span
                    className="absolute -bottom-px left-0 h-px w-full bg-zinc-900 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
                    style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                  />
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* EMPRESA */}
        <NavCol title="Empresa" links={LINKS.empresa} delay={0.10} />

        {/* SOCIAL */}
        <NavCol title="Social"  links={LINKS.social}  delay={0.18} />
      </div>

      <AnimatedRule />

      {/*  SIGNATURE WORDMARK */}
      <FooterWordmark />

      <AnimatedRule />

      {/*  BASELINE  */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <motion.span
          className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          © {new Date().getFullYear()} Karma Makers
        </motion.span>

        <motion.nav
          className="flex flex-wrap gap-5"
          aria-label="Legal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          {LINKS.legal.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </motion.nav>
      </div>
    </footer>
  );
}