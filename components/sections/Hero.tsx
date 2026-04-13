"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { Mail, FileText, X, ChevronDown, Linkedin, Github } from "lucide-react";
import Image from "next/image";

const hero = {
  name: "Ayyappan",
  surname: "M",
  roles: [
    "BSc Computer Science Student",
    "AI Enthusiast",
    "Full‑Stack Developer",
    "Data Analytics Enthusiast",
  ],
  tags: ["AI Enthusiast", "Full-Stack Developer", "Data Analytics"],
  bio: "Ambitious final year CS student passionate about building intelligent systems. From AI chatbots with custom memory to automated billing pipelines — I turn ideas into working software.",
  email: "ayyappancsking@gmail.com",
  linkedin: "https://www.linkedin.com/in/-ayyappanm",
  github: "https://github.com/ayyappancsking-byte",
  photo: "/profile.jpg",
  resume: "/resume.pdf",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Splits a string into per-character motion.span elements with staggered clip reveal */
function SplitChars({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", lineHeight: 1.15 }}
        >
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              delay: delay + i * 0.035,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Magnetic pull wrapper */
function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 360, damping: 22 });
  const sy = useSpring(y, { stiffness: 360, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Cycling role typewriter ──────────────────────────────────────────────────
function CyclingRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <div className="relative h-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ y: 28, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -28, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-lg sm:text-xl text-ink-200 absolute whitespace-nowrap"
        >
          {roles[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

// ─── Floating background orb ─────────────────────────────────────────────────
function FloatingOrb({
  style,
  delay,
}: {
  style: React.CSSProperties;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={style}
      animate={{
        y: [0, -30, 0],
        x: [0, 14, 0],
        scale: [1, 1.08, 1],
        opacity: [0.35, 0.55, 0.35],
      }}
      transition={{
        duration: 9 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

// ─── Resume Modal ─────────────────────────────────────────────────────────────
function ResumeModal({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-black/92 backdrop-blur-md"
        onClick={onClose}
      >
        <div
          className="flex items-center justify-between px-4 sm:px-6 py-4
                     bg-slate-950/90 border-b border-slate-800 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2 sm:gap-3 text-slate-200 min-w-0">
            <FileText size={18} className="text-blue-500 flex-shrink-0" />
            <span className="font-mono text-xs sm:text-sm tracking-wide truncate">
              AYYAPPAN_M_Resume.pdf
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 ml-3">
            <a
              href={hero.resume}
              download="Ayyappan_M_Resume.pdf"
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-md
                         bg-blue-600 hover:bg-blue-500 text-white
                         text-xs font-medium transition-all whitespace-nowrap"
            >
              Download CV
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400
                         hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="flex-1 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={`${hero.resume}#view=FitH`}
            title="Ayyappan M — Resume"
            className="w-full h-full border-none bg-white"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse-tracking spotlight
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const spotX = useSpring(rawX, { stiffness: 80, damping: 28 });
  const spotY = useSpring(rawY, { stiffness: 80, damping: 28 });
  const spotXPct = useTransform(spotX, [0, 1], ["0%", "100%"]);
  const spotYPct = useTransform(spotY, [0, 1], ["0%", "100%"]);
  const spotlight = useMotionTemplate`radial-gradient(700px circle at ${spotXPct} ${spotYPct}, rgba(201,168,76,0.055) 0%, transparent 65%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const r = sectionRef.current?.getBoundingClientRect();
      if (!r) return;
      rawX.set((e.clientX - r.left) / r.width);
      rawY.set((e.clientY - r.top) / r.height);
    },
    [rawX, rawY]
  );

  // Photo parallax on mouse move
  const photoX = useMotionValue(0);
  const photoY = useMotionValue(0);
  const photoSX = useSpring(photoX, { stiffness: 60, damping: 20 });
  const photoSY = useSpring(photoY, { stiffness: 60, damping: 20 });

  const handlePhotoMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    const cx = (e.clientX - r.left) / r.width - 0.5;
    const cy = (e.clientY - r.top) / r.height - 0.5;
    photoX.set(cx * 18);
    photoY.set(cy * 12);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    handleMouseMove(e);
    handlePhotoMove(e);
  };
  const onMouseLeave = () => {
    photoX.set(0);
    photoY.set(0);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <>
      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}

      <section
        ref={sectionRef}
        id="about"
        className="relative min-h-screen flex items-center bg-slate-950 overflow-hidden"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {/* ── Cursor spotlight ── */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: spotlight }}
        />

        {/* ── Floating gradient orbs ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <FloatingOrb
            delay={0}
            style={{
              top: "20%",
              left: "10%",
              width: "480px",
              height: "480px",
              background:
                "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <FloatingOrb
            delay={2.5}
            style={{
              bottom: "15%",
              right: "8%",
              width: "360px",
              height: "360px",
              background:
                "radial-gradient(circle, rgba(139,94,60,0.08) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
          <FloatingOrb
            delay={5}
            style={{
              top: "55%",
              left: "45%",
              width: "280px",
              height: "280px",
              background:
                "radial-gradient(circle, rgba(212,168,67,0.05) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          {/* Subtle grid dots */}
          <div className="absolute inset-0 hero-grid-dots opacity-[0.015]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto
                        px-5 sm:px-10 lg:px-16 pt-28 pb-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ── Text column ──────────────────────────────────────────── */}
            <div>
              {/* Eyebrow label */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0}
                className="flex items-center gap-3 mb-6 sm:mb-8"
              >
                <motion.span
                  className="block h-px bg-ink-500"
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                />
                <span className="text-ink-400 text-xs font-mono tracking-[0.2em] uppercase">
                  Portfolio
                </span>
              </motion.div>

              {/* Name — character-by-character reveal */}
              <h1
                className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl
                           font-light text-ink-50 leading-[1.05] mb-3 sm:mb-4"
              >
                <SplitChars text={hero.name} delay={0.15} />
                {" "}
                <SplitChars
                  text={hero.surname}
                  delay={0.15 + hero.name.length * 0.035 + 0.05}
                  className="text-ink-400"
                />
              </h1>

              {/* Cycling role */}
              <div className="mb-3">
                <CyclingRole roles={hero.roles} />
              </div>

              {/* Tags */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={3}
                className="flex flex-wrap gap-2 mb-6 sm:mb-8"
              >
                {hero.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: 0.55 + i * 0.09,
                      duration: 0.4,
                      ease: "backOut",
                    }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium
                               border border-ink-700/60 text-ink-400 bg-ink-800/30
                               cursor-default transition-colors hover:border-ink-500"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              {/* Bio — words fade in with stagger */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={4}
                className="font-body text-sm sm:text-base text-ink-300 leading-relaxed
                           max-w-lg mb-8 sm:mb-10"
              >
                {hero.bio}
              </motion.p>

              {/* CTA buttons — magnetic */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={5}
                className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10"
              >
                <Magnetic strength={0.2}>
                  <motion.a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 min-h-[44px]
                               rounded bg-ink-600 hover:bg-ink-500 text-ink-50
                               font-body font-medium text-sm relative overflow-hidden group"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {/* Shimmer sweep on hover */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                                     transition-transform duration-500 ease-in-out
                                     bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <span className="relative">View Projects</span>
                  </motion.a>
                </Magnetic>

                <Magnetic strength={0.2}>
                  <motion.a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 min-h-[44px]
                               rounded border border-ink-700 hover:border-ink-400
                               text-ink-300 hover:text-ink-100
                               font-body font-medium text-sm transition-colors duration-200
                               relative overflow-hidden group"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                                     transition-transform duration-500
                                     bg-gradient-to-r from-transparent via-ink-600/20 to-transparent" />
                    <Mail size={15} className="relative flex-shrink-0" />
                    <span className="relative">Contact Me</span>
                  </motion.a>
                </Magnetic>

                <Magnetic strength={0.2}>
                  <motion.button
                    onClick={() => setResumeOpen(true)}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 min-h-[44px]
                               rounded border border-ink-700 hover:border-ink-400
                               text-ink-300 hover:text-ink-100
                               font-body font-medium text-sm transition-colors duration-200
                               relative overflow-hidden group"
                    aria-label="View resume"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                                     transition-transform duration-500
                                     bg-gradient-to-r from-transparent via-ink-600/20 to-transparent" />
                    <FileText size={15} className="relative flex-shrink-0" />
                    <span className="relative">Resume</span>
                  </motion.button>
                </Magnetic>
              </motion.div>

              {/* Social links */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={6}
                className="flex flex-wrap items-center gap-x-4 gap-y-3 text-ink-500 text-sm"
              >
                {[
                  { href: hero.linkedin, icon: <Linkedin size={15} />, label: "LinkedIn" },
                  { href: hero.github, icon: <Github size={15} />, label: "GitHub" },
                  { href: `mailto:${hero.email}`, icon: <Mail size={15} />, label: hero.email },
                ].map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-1.5 hover:text-ink-300
                               transition-colors duration-200 min-h-[44px] group relative"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
                    whileHover={{ x: 3 }}
                  >
                    <span className="flex-shrink-0 group-hover:text-ink-300 transition-colors">
                      {s.icon}
                    </span>
                    <span className="truncate max-w-[170px] sm:max-w-none">{s.label}</span>
                    {/* Underline reveal */}
                    <span className="absolute bottom-2 left-0 h-px w-0 group-hover:w-full
                                     bg-ink-500 transition-all duration-300" />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* ── Photo column ─────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center lg:justify-end mt-6 lg:mt-0"
            >
              {/* Parallax container */}
              <motion.div style={{ x: photoSX, y: photoSY }}>
                <div className="profile-photo-wrapper profile-photo-responsive">
                  <div className="profile-pulse-2" />
                  <div className="profile-pulse-1" />
                  <div className="profile-spinner-ring" />
                  <div className="profile-corner-dot tl" />
                  <div className="profile-corner-dot tr" />
                  <div className="profile-corner-dot bl" />
                  <div className="profile-corner-dot br" />
                  <div className="profile-photo-inner">
                    <Image
                      src="/profile.jpg"
                      alt="Ayyappan M"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="profile-photo-shine" />
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* ── Scroll hint ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2
                     flex flex-col items-center gap-1.5 text-ink-600"
        >
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Scroll</span>
          {/* Animated scroll line */}
          <div className="relative w-px h-10 bg-ink-800/50 overflow-hidden">
            <motion.div
              className="absolute top-0 w-full bg-ink-500"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ height: "40%" }}
            />
          </div>
        </motion.div>
      </section>
    </>
  );
}