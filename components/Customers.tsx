"use client";

import { Item, Stagger } from "./motion/reveal";
import SectionHeading from "./Section-Heading";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const cases = [
  {
    img: "/lerocher.png",
    client: "Le Rocher",
    title: "Carta digital interactiva, con asistente de inteligencia artificial.",
    link: "https://lerocherbcn.com",
  },
  {
    img: "/kolabora.png",
    client: "Kolabora.es",
    title: "Plataforma SaaS escalable para la gestión y crecimiento de canales comerciales.",
    link: "https://kolabora.es",
  },
];

export default function Customers() {
  return (
    <section
      id="showcase"
      className="mx-auto max-w-[1400px] px-6 lg:px-10 py-28 lg:py-40 border-t border-line"
    >
      <SectionHeading
        eyebrow="Showcase"
        title="El progreso no se promete. Se construye."
        body="Más de 500 clientes han utilizado nuestro servicio de desarrollo digital, sectores como educación, cultura confían en nosotros."
      />

      <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.12}>
        {cases.map((c) => (
          <Item key={c.client} as="article">
            <CaseCard {...c} />
          </Item>
        ))}
      </Stagger>
    </section>
  );
}

function CaseCard({
  img,
  client,
  title,
  link,
}: {
  img: string;
  client: string;
  title: string;
  link: string;
}) {
  return (
    <>
      <motion.div className="aspect-[3/4] overflow-hidden group">
        <motion.img
          src={img}
          alt={client}
          loading="lazy"
          className="h-[112%] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </motion.div>

      <div className="p-6">
        <p className="font-display text-sm uppercase tracking-widest text-ink-muted mb-3">
          {client}
        </p>

        <h3 className="text-display text-2xl leading-tight">{title}</h3>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium"
        >
          Explorar
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </>
  );
}