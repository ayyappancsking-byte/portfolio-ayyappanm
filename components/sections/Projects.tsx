"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useInView,
  animate,
} from "framer-motion";
import { useEffect } from "react";
import { Zap, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────
// (mirror whatever shape your data/lib has)
type Project = (typeof projects)[number];

// ─── Count-up metric ──────────────────────────────────────────────────────────
function AnimatedMetric({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);

  const match  = value.match(/^(\d+\.?\d*)(.*)$/);
  const numVal = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : "";

  const display = useTransform(mv, (v) => {
    if (numVal === null) return value;
    const rounded = Number.isInteger(numVal) ? Math.round(v) : v.toFixed(1);
    return `${rounded}${suffix}`;
  });

  useEffect(() => {
    if (isInView && numVal !== null) {
      const ctrl = animate(mv, numVal, { duration: 1.6, ease: "easeOut" });
      return ctrl.stop;
    }
  }, [isInView, numVal, mv]);

  if (numVal === null) return <span ref={ref}>{value}</span>;
  return <motion.span ref={ref}>{display}</motion.span>;
}

// ─── 3-D tilt card with mouse spotlight ──────────────────────────────────────
function TiltCard({
  children,
  accentColor,
  className,
}: {
  children: React.ReactNode;
  accentColor: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const normX = useMotionValue(0);
  const normY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowOpacity = useMotionValue(0);

  const rotateX = useSpring(useTransform(normY, [-0.5, 0.5], [7, -7]), {
    stiffness: 260,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(normX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 260,
    damping: 28,
  });

  const glowBg = useMotionTemplate`radial-gradient(260px circle at ${glowX}% ${glowY}%, ${accentColor}18 0%, transparent 70%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    normX.set((e.clientX - r.left) / r.width - 0.5);
    normY.set((e.clientY - r.top) / r.height - 0.5);
    glowX.set(((e.clientX - r.left) / r.width) * 100);
    glowY.set(((e.clientY - r.top) / r.height) * 100);
    glowOpacity.set(1);
  };

  const onMouseLeave = () => {
    normX.set(0);
    normY.set(0);
    glowOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative ${className ?? ""}`}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        style={{ background: glowBg, opacity: glowOpacity }}
      />
      {children}
    </motion.div>
  );
}

// ─── Animated top accent bar ──────────────────────────────────────────────────
function AccentBar({ color, inView, delay }: { color: string; inView: boolean; delay: number }) {
  return (
    <div className="relative h-[3px] w-full overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0"
        initial={{ width: "0%" }}
        animate={inView ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: `linear-gradient(90deg, ${color}, ${color}80, transparent)` }}
      />
      {inView && (
        <motion.div
          className="absolute inset-y-0 w-[20%]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }}
          animate={{ x: ["-100%", "600%"] }}
          transition={{ duration: 1.8, delay: delay + 0.9, ease: "easeOut" }}
        />
      )}
    </div>
  );
}

// ─── Individual project card — extracted so hooks are called at top-level ─────
/**
 * Extracting this into its own component fixes the ESLint hooks-in-loops
 * violation in the original code. Each card now has its own stable
 * useRef / useInView call outside of any loop.
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef   = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard accentColor={project.accentColor} className="card-premium overflow-hidden group">

        {/* Accent bar */}
        <AccentBar color={project.accentColor} inView={cardInView} delay={0.1} />

        <div className="p-5 sm:p-7 md:p-10">

          {/* ── Header ─────────────────────────────────────────────── */}
          <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div className="min-w-0 flex-1">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={cardInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="inline-block px-2.5 py-0.5 rounded-full
                           text-[10px] font-mono font-medium border mb-2"
                style={{
                  color: project.accentColor,
                  borderColor: `${project.accentColor}30`,
                  background: `${project.accentColor}0f`,
                }}
              >
                {project.tag}
              </motion.span>

              <h3
                className="font-display text-xl sm:text-2xl md:text-3xl font-semibold
                           text-[var(--text-primary)] leading-tight"
              >
                {project.title}
              </h3>
            </div>

            {/* Project number — hidden on xs, visible from sm */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={cardInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="hidden sm:block font-display text-4xl md:text-5xl
                         font-semibold text-[var(--border)] select-none flex-shrink-0"
            >
              0{project.id}
            </motion.span>
          </div>

          {/* ── Summary ────────────────────────────────────────────── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={cardInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.55 }}
            className="font-body text-[var(--text-secondary)] text-sm sm:text-base
                       leading-relaxed mb-6 sm:mb-8 max-w-3xl"
          >
            {project.summary}
          </motion.p>

          {/* ── Metrics grid ───────────────────────────────────────── */}
          {/*
            2 cols on mobile, 4 cols from sm (tablets/phones in landscape)
            Previously md:grid-cols-4 meant 2 columns up to 768 px — now sm:grid-cols-4
            gives the 4-column layout from 640 px.
          */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {project.highlights.map((h, j) => (
              <motion.div
                key={j}
                initial={{ opacity: 0, scale: 0.82, y: 16 }}
                animate={cardInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + j * 0.09, ease: "backOut" }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="bg-[var(--bg-secondary)] rounded-xl p-3 sm:p-4
                           border border-[var(--border)] text-center
                           transition-shadow hover:shadow-md cursor-default"
              >
                <p
                  className="font-display text-lg sm:text-xl font-semibold mb-1"
                  style={{ color: project.accentColor }}
                >
                  <AnimatedMetric value={h.metric} />
                </p>
                <p className="font-body text-[var(--text-muted)] text-[10px] sm:text-[11px] leading-tight">
                  {h.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── Bullets + tech stack ────────────────────────────────── */}
          {/*
            On mobile: stacked (flex-col).
            On lg+: side-by-side grid.
            Previously md:grid which kicked in too early on tablets.
          */}
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-8 items-start">

            {/* Bullet points */}
            <ul className="flex flex-col gap-2.5 sm:gap-3 w-full">
              {project.bulletPoints.map((bp, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -14 }}
                  animate={cardInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + j * 0.07, duration: 0.4, ease: "easeOut" }}
                  className="flex items-start gap-2.5 sm:gap-3"
                >
                  <motion.span
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <CheckCircle2
                      size={14}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: project.accentColor }}
                    />
                  </motion.span>
                  <span className="font-body text-[var(--text-secondary)] text-sm leading-relaxed">
                    {bp}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Tech stack */}
            <div className="w-full lg:w-auto lg:min-w-[220px]">
              <div className="flex items-center gap-1.5 mb-2.5 sm:mb-3">
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Zap size={12} style={{ color: project.accentColor }} />
                </motion.span>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  Tech Stack
                </p>
              </div>

              {/*
                On mobile: horizontal wrapping chips (easy to scan).
                On lg+: vertical list (sits in the side column).
              */}
              <div className="flex flex-wrap lg:flex-col gap-2">
                {project.technologies.map((tech, j) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={cardInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + j * 0.06, duration: 0.35, ease: "backOut" }}
                    whileHover={{ scale: 1.07, x: 3 }}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium
                               border whitespace-nowrap cursor-default
                               transition-shadow hover:shadow-sm"
                    style={{
                      color: project.accentColor,
                      borderColor: `${project.accentColor}25`,
                      background: `${project.accentColor}0a`,
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </TiltCard>
    </motion.div>
  );
}

// ─── Projects section ─────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="What I've Built"
          title="Projects"
          subtitle="Engineered end-to-end — every project solves a real problem."
        />

        <div className="flex flex-col gap-6 sm:gap-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}