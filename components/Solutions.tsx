"use client";

import { motion } from "motion/react";
import { Item, Stagger } from "./motion/reveal";
import SectionHeading from "./Section-Heading";
import { ArrowUpRight, Cpu, ShoppingBag, Sparkles } from "lucide-react";
import { EASE } from "@/lib/constants";

export default function Solutions() {
    const solutions = [
  {
    kicker: "UI/UX",
    title: "Desarrollo UI/UX producto digital",
    body: "Diseñamos y desarrollamos su producto digital a medida. Implementación de SEO & GEO para posicionamiento web.",
    icon: Sparkles,
  },
  {
    kicker: "Escalabilidad",
    title: "Marketing",
    body: "Captación de nuevos clientes através de nuestras herramientas de marketing y publicidad. El ROI esperado supera las espectativas de nuestros clientes.",
    icon: ShoppingBag,
  },
  {
    kicker: "Automatización",
    title: "Consultoria / AI Product",
    body: "Facilitamos su experiencia através de una consultoria con expertos y automatizaciones con inteligencia artificial.",
    icon: Cpu,
  },
];

  return (
    <section id="solutions" className="mx-auto max-w-[1400px] px-6 lg:px-10 py-28 lg:py-40">
      <SectionHeading
        eyebrow="Soluciones"
        title="Digitalización, consultoría & expertos IA."
        body="Nuestro equipo implementa las soluciones más eficaces a los clientes, de forma que generamos un mejor rendimiento que agencias tradicionales."
        cta={{ label: "Mirar todas las soluciones", href: "#" }}
      />
      <Stagger className="grid md:grid-cols-3 gap-5" stagger={0.12}>
        {solutions.map((s) => {
          const Icon = s.icon;
          return (
            <Item key={s.title} as="article">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="group rounded-3xl border border-line bg-card p-8 flex flex-col gap-6 h-full hover:border-ink/30 transition-colors"
              >
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="h-14 w-14 rounded-2xl bg-primary text-primary-foreground grid place-items-center"
                >
                  <Icon className="h-7 w-7" />
                </motion.div>
                <div>
                  <p className="text-sm text-ink-muted mb-1">{s.kicker}</p>
                  <h3 className="text-display text-3xl mb-4">{s.title}</h3>
                  <p className="text-ink-muted leading-relaxed">{s.body}</p>
                </div>
                <a
                  href="#"
                  className="mt-auto inline-flex items-center gap-2 text-sm font-medium"
                >
                  Descrube más
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            </Item>
          );
        })}
      </Stagger>
    </section>
  );
}