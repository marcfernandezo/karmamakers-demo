"use client";

import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

type Logo = {
  name: string;
  src: string;
};

export default function TrustedClients() {
  const logos: Logo[] = useMemo(
    () => [
      { name: "Finetwork", src: "/logos/finetwork.png" },
      { name: "Orange", src: "/logos/orange-logo.png" },
      { name: "Vodafone", src: "/logos/vodafone.png" },
      { name: "Segurma", src: "/logos/segurma.png" },
      { name: "Segurma", src: "/logos/iberdrola.png" },
      { name: "Yoigo", src: "/logos/yoigo.png" },
      { name: "Silbo", src: "/logos/silbo.png" },
      { name: "Ensol", src: "/logos/ensol.png" },
    ],
    []
  );

  // duplicate for seamless loop
  const row = useMemo(() => [...logos, ...logos], [logos]);

  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px", once: false });

  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView) {
      controls.stop();
      return;
    }

    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 25,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [inView, controls]);

  const handlePause = () => {
    setPaused(true);
    controls.stop();
  };

  const handleResume = () => {
    setPaused(false);
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 25,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  return (
    <section
      ref={ref}
      className="border-y border-dotted bg-white py-7 overflow-hidden"
      id="trusted-clients"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className="flex gap-16 whitespace-nowrap w-max"
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
        >
          <motion.div className="flex gap-16" animate={controls}>
            {row.map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="
                    h-8 md:h-10 w-auto
                    grayscale opacity-60
                    transition-all duration-300
                    hover:grayscale-0 hover:opacity-100
                    hover:scale-105
                  "
                  draggable={false}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}