"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { href: "#about",      label: "About"      },
  { href: "#education",  label: "Education"  },
  { href: "#skills",     label: "Skills"     },
  { href: "#projects",   label: "Projects"   },
  { href: "#experience", label: "Experience" },
  { href: "#contact",    label: "Contact"    },
];

// ─── Magnetic wrapper ─────────────────────────────────────────────────────────
function MagneticWrap({
  children,
  strength = 0.28,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 380, damping: 24 });
  const sy = useSpring(y, { stiffness: 380, damping: 24 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  );
}

// ─── Shimmer border ───────────────────────────────────────────────────────────
function ShimmerBorder({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-0 left-0 right-0 h-px overflow-hidden"
        >
          <div className="absolute inset-0 bg-[var(--border)]" />
          <motion.div
            className="absolute top-0 h-full w-[28%]"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--accent-soft), var(--gold-light), var(--accent-soft), transparent)",
              filter: "blur(1px)",
            }}
            animate={{ x: ["-100%", "500%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Track actual header height so the mobile menu aligns perfectly
  const headerRef = useRef<HTMLElement>(null);
  const [headerH, setHeaderH] = useState(64);

  useEffect(() => {
    const measure = () => {
      if (headerRef.current) setHeaderH(headerRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [scrolled]);        // re-measure when scrolled state changes padding

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 50); // small delay lets the menu close animation start first
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[var(--bg-primary)]/90 backdrop-blur-xl shadow-[var(--shadow-sm)]"
            : "py-4 sm:py-5 bg-transparent"
        }`}
      >
        <ShimmerBorder visible={scrolled} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <MagneticWrap strength={0.32}>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 group min-h-[44px]"
              whileTap={{ scale: 0.94 }}
              aria-label="Scroll to top"
            >
              <motion.div
                className="relative w-9 h-9 rounded-xl flex items-center justify-center
                           overflow-hidden shadow-md"
                style={{ background: "linear-gradient(135deg, var(--accent), var(--gold))" }}
                whileHover={{ scale: 1.14, rotate: 6 }}
                transition={{ type: "spring", stiffness: 420, damping: 18 }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.3) 60deg, transparent 120deg)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10 font-display text-white font-semibold text-sm">
                  AM
                </span>
              </motion.div>
              {/* Name hidden on very small screens, visible from sm */}
              <span className="font-display text-[var(--text-primary)] font-semibold text-lg tracking-wide hidden sm:block" />
            </motion.button>
          </MagneticWrap>

          {/* ── Desktop Nav ──────────────────────────────────────────── */}
          <nav
            className="hidden md:flex items-center gap-1"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => {
              const isActive  = activeSection === link.href.slice(1);
              const isHovered = hoveredLink === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  className={`relative px-3 py-1.5 text-sm font-body font-medium rounded-lg
                              transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <AnimatePresence>
                    {isHovered && !isActive && (
                      <motion.span
                        key="hover-bg"
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.75 }}
                        transition={{ duration: 0.16 }}
                        className="absolute inset-0 bg-[var(--bg-secondary)] rounded-lg"
                      />
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-[var(--accent-glow)] rounded-lg"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ── Right actions ────────────────────────────────────────── */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <MagneticWrap>
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.88, rotate: 22 }}
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center
                           border border-[var(--border)] bg-[var(--bg-card)]
                           text-[var(--text-secondary)] hover:text-[var(--accent)]
                           hover:border-[var(--border-hover)] transition-all duration-200"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.4 }}
                    transition={{ duration: 0.22, ease: "backOut" }}
                  >
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </MagneticWrap>

            {/* Hamburger — mobile only */}
            <MagneticWrap>
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.88 }}
                className="w-11 h-11 rounded-xl flex items-center justify-center
                           border border-[var(--border)] bg-[var(--bg-card)]
                           text-[var(--text-secondary)] hover:text-[var(--accent)]
                           md:hidden transition-all duration-200"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={mobileOpen ? "open" : "closed"}
                    initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.4 }}
                    transition={{ duration: 0.2, ease: "backOut" }}
                  >
                    {mobileOpen ? <X size={17} /> : <Menu size={17} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </MagneticWrap>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Menu — position matches measured header height ──── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Full-screen dimming overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/30 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Dropdown panel */}
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              /* Use measured header height instead of hard-coded 64px */
              style={{ top: headerH }}
              className="fixed inset-x-0 z-40 bg-[var(--bg-primary)]/95
                         backdrop-blur-xl border-b border-[var(--border)] md:hidden
                         max-h-[calc(100dvh-var(--header-h,64px))] overflow-y-auto"
            >
              <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-1
                              pb-safe-area-inset-bottom">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -22, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ delay: i * 0.055, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-left px-4 py-3.5 min-h-[52px] rounded-xl text-sm
                                font-medium transition-all duration-200 ${
                      activeSection === link.href.slice(1)
                        ? "bg-[var(--accent-glow)] text-[var(--accent)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}