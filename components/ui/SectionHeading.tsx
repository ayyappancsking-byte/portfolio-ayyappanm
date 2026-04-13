"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 ${isCenter ? "text-center" : "text-left"} ${className}`}
    >
      {eyebrow && (
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-3 font-medium">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl md:text-5xl font-semibold text-[var(--text-primary)] leading-tight">
        {title}
        <span className="text-[var(--accent)]">.</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-[var(--text-secondary)] font-body text-base leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-5 h-px bg-gradient-to-r from-[var(--accent)] via-[var(--border)] to-transparent ${
          isCenter ? "mx-auto max-w-24" : "max-w-24"
        }`}
      />
    </motion.div>
  );
}
