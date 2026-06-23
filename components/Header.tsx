"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const agencyEase = [0.76, 0, 0.24, 1] as const;

export default function PinnedAgencyHeader() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of the entire 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Apply spring physics so the scroll scrubbing feels buttery smooth
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  // --- Animation Timelines ---
  
  // 1. Text & Nav: Fade out and move up quickly between 0% and 30% of the scroll
  const textOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.3], [0, -100]);

  // 2. Image: Expands from a grid card on the right to 100% full screen
  // Animates between 0% and 50% of the scroll container
  const imageWidth = useTransform(smoothProgress, [0, 0.5], ["40%", "100%"]);
  const imageHeight = useTransform(smoothProgress, [0, 0.5], ["70%", "100%"]);
  const imageRight = useTransform(smoothProgress, [0, 0.5], ["5%", "0%"]);
  const imageTop = useTransform(smoothProgress, [0, 0.5], ["15%", "0%"]);
  const imageRadius = useTransform(smoothProgress, [0, 0.5], ["24px", "0px"]);
  const imageGrayscale = useTransform(smoothProgress, [0, 0.5], ["100%", "0%"]);

  return (
    // Outer container creates the scrollable space (3x the height of the screen)
    <header ref={containerRef} className="relative h-[300vh] bg-[#f4f4f5] selection:bg-black selection:text-white">
      
      {/* Sticky container stays pinned to the screen while you scroll through the 300vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Subtle Background Noise */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-20 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Text Content (Left side) */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="pointer-events-none absolute left-[5%] top-1/2 z-20 flex w-[90%] -translate-y-1/2 flex-col justify-center md:w-[50%]"
        >
          <h1 className="flex flex-col text-[12vw] font-medium leading-[0.85] tracking-tighter md:text-[7vw]">
            
            <div className="overflow-hidden pb-2 md:pb-4">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: agencyEase, delay: 0.1 }}
                className="block text-neutral-800"
              >
                Una solución,
              </motion.span>
            </div>

            <div className="overflow-hidden pb-2 md:pb-4">
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 1.4, ease: agencyEase, delay: 0.2 }}
                className="relative my-2 inline-flex w-fit items-center overflow-hidden bg-black px-4 py-2 md:px-8 md:py-4 shadow-2xl"
              >
                {/* Infinite Sheen Animation */}
                <motion.div 
                  animate={{ left: ["-100%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatDelay: 2 }}
                  className="absolute inset-y-0 w-1/2 -skew-x-12 bg-white/20 blur-md"
                />
                <span className="relative z-10 block text-white">
                  IA Integrada
                </span>
              </motion.div>
            </div>

            <div className="overflow-hidden pb-2 md:pb-4">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: agencyEase, delay: 0.3 }}
                className="block text-neutral-800"
              >
                para negocios.
              </motion.span>
            </div>
          </h1>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: agencyEase }}
            className="pointer-events-auto mt-12 w-fit flex flex-1 pt-4 gap-4"
          >
            <button className="group relative flex items-center gap-3 overflow-hidden bg-black px-8 py-5 text-white transition-all hover:bg-neutral-800">
              <span className="relative z-10 text-sm font-bold uppercase tracking-widest">
                Contactar Ventas
              </span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="relative z-10"
              >
                <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
              </motion.div>
            </button>

            <button className="group relative flex items-center gap-3 overflow-hidden te px-8 py-5 transition-all border border-neutral-900 hover:bg-neutral-900 hover:text-white">
              <span className="relative z-10 text-sm font-bold uppercase tracking-widest">
                Showcase
              </span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="relative z-10"
              >
                <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" />
              </motion.div>
            </button>
          </motion.div>
        </motion.div>

        {/* Dynamic Image Container (Right side expanding to Full Screen) */}
        <motion.div
          style={{
            width: imageWidth,
            height: imageHeight,
            right: imageRight,
            top: imageTop,
            borderRadius: imageRadius,
            filter: `grayscale(${imageGrayscale})`,
          }}
          className="absolute z-10 overflow-hidden bg-neutral-900 shadow-2xl"
        >
          {/* Subtle overlay to blend it early on */}
          <motion.div 
            style={{ opacity: textOpacity }}
            className="absolute inset-0 z-10 bg-black/10 mix-blend-overlay" 
          />
          
          <Image
            src="/image.png" 
            alt="Plataforma Dashboard"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>

      </div>
    </header>
  );
}