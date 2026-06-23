import { Reveal, Stagger, Item, WordMask } from "@/components/motion/reveal";
import { ArrowUpRight } from "lucide-react";

export default function SectionHeading({
  eyebrow, title, body, cta,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
      <div className="lg:col-span-5">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-ink-muted mb-4">{eyebrow}</p>
        </Reveal>
        <h2 className="text-display text-5xl md:text-6xl lg:text-7xl">
          <WordMask text={title} />
        </h2>
      </div>
      {body && (
        <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-end">
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-ink-muted leading-relaxed">{body}</p>
          </Reveal>
          {cta && (
            <Reveal delay={0.35}>
              <a
                href={cta.href}
                className="group mt-6 inline-flex w-fit items-center gap-2 text-base font-medium underline-offset-4 hover:underline"
              >
                {cta.label}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          )}
        </div>
      )}
    </div>
  );
}