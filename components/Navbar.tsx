"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Soluciones", href: "#solutions" },
  { label: "Industrias", href: "#" },
  { label: "Showcase", href: "#showcase" },
  { label: "Empresa", href: "#about" },
];

export default function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full bg-white transition-[border-color,box-shadow] duration-300 ${
          scrolled
            ? "border-b border-black shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
            : "border-b border-black/8"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">

          {/* ── Logo ── */}
          <Link href="/" className="group flex items-baseline gap-3">
            <motion.span
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[17px] font-black uppercase tracking-[0.08em] text-black"
            >
              Karma Makers
            </motion.span>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden items-center md:flex">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setHovered(item.label)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 transition-colors duration-150 hover:text-black"
                >
                  {item.label}
                  {/* Animated underline */}
                  <span
                    className="absolute bottom-0 left-5 right-5 h-px bg-black transition-transform duration-200 origin-left"
                    style={{
                      transform:
                        isActive || hovered === item.label
                          ? "scaleX(1)"
                          : "scaleX(0)",
                    }}
                  />
                  {/* Active dot */}
                  {isActive && (
                    <span className="absolute -top-0.5 right-4 h-1 w-1 rounded-full bg-black" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── CTA + hamburger ── */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="hidden md:block"
            >
              <Link
                href="/contacto"
                className="group flex items-center gap-1.5 border border-black bg-black px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-200 hover:bg-white hover:text-black"
              >
                Contactar Ventas
                <ArrowUpRight
                  size={12}
                  strokeWidth={2.5}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.div>

            {/* Hamburger — mobile only */}
            <button
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center border border-black/12 text-black transition-colors hover:border-black md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileOpen ? <X size={17} /> : <Menu size={17} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-black/10 bg-white md:hidden"
            >
              <div className="px-6 pb-6 pt-2">
                {navItems.map((item, i) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045, duration: 0.22 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between border-b py-4 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                          isActive
                            ? "border-black text-black"
                            : "border-black/8 text-neutral-500 hover:text-black"
                        }`}
                      >
                        {item.label}
                        <ArrowUpRight
                          size={13}
                          className={isActive ? "text-black" : "text-neutral-300"}
                        />
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: navItems.length * 0.045 + 0.05 }}
                  className="pt-5"
                >
                  <Link
                    href="/contacto"
                    className="flex w-full items-center justify-center gap-2 bg-black py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white"
                  >
                    Contactar Ventas
                    <ArrowUpRight size={12} strokeWidth={2.5} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer to prevent content jump */}
      <div className="h-[72px]" />
    </>
  );
}