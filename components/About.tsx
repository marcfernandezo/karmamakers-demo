"use client";

import Image from "next/image";
import { useCountUp } from "@/hooks/use-count-up";
import { Item, Stagger } from "./motion/reveal";
import SectionHeading from "./Section-Heading";


export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1400px] px-6 lg:px-10 py-28 lg:py-40 border-t border-line">
      <SectionHeading
        eyebrow="Nosotros"
        title="Una agencia innovadora."
        body="Fundada en Barcelona, diseñamos acciones que generan efectos medibles. Construimos marcas que ven resultados."
      />
      <Stagger className="grid lg:grid-cols-3 gap-5" stagger={0.1}>
        <Item className="lg:col-span-2">
          <div className="rounded-3xl overflow-hidden bg-surface-2 aspect-[16/10] group">
            <img
              src={'/office.png'}
              alt="The team"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
          </div>
        </Item>
        <Item>
          <div className="grid grid-cols-1 gap-5">
            <Stat target={5} suffix="+" label="Expertos" />
            <Stat target={2024} label="Fundado desde" />
          </div>
        </Item>
      </Stagger>
    </section>
  );
}
/* ---------------- STAT (SECONDARY ELEMENT) ---------------- */

function Stat({
  target,
  suffix = "",
  label,
}: {
  target: number;
  suffix?: string;
  label: string;
}) {
  const { ref, value } = useCountUp(target);

  return (
    <Item>
      <div className="group relative rounded-3xl border border-neutral-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-25px_rgba(0,0,0,0.15)]">
        <div className="flex flex-col gap-3">
          <span
            ref={ref}
            className="text-5xl font-semibold tracking-tight tabular-nums text-neutral-900"
          >
            {value}
            {suffix}
          </span>

          <span className="text-sm text-neutral-500 leading-snug">
            {label}
          </span>
        </div>
      </div>
    </Item>
  );
}