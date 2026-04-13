"use client";

import { motion } from "framer-motion";
import { GraduationCap, School, Calendar } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="section-padding bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="Academic Background" title="Education" />

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border)] to-transparent hidden sm:block" />

          <div className="flex flex-col gap-8">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-8 items-start"
              >
                {/* Timeline dot */}
                <div className="relative flex-shrink-0 hidden sm:flex">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.15 + 0.2, type: "spring" }}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 z-10 relative ${
                      edu.type === "primary"
                        ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-lg shadow-[var(--accent-glow)]"
                        : "bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)]"
                    }`}
                  >
                    {edu.type === "primary" ? (
                      <GraduationCap size={20} />
                    ) : (
                      <School size={18} />
                    )}
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className={`flex-1 card-premium p-6 ${
                    edu.type === "primary"
                      ? "border-[var(--accent)]/30"
                      : ""
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3
                        className={`font-display font-semibold leading-tight mb-1 ${
                          edu.type === "primary"
                            ? "text-2xl text-[var(--text-primary)]"
                            : "text-xl text-[var(--text-primary)]"
                        }`}
                      >
                        {edu.degree}
                      </h3>
                      <p className="font-body text-[var(--text-secondary)] text-sm font-medium">
                        {edu.institution}
                      </p>
                      {edu.university && (
                        <p className="font-body text-[var(--text-muted)] text-xs mt-0.5">
                          {edu.university}
                        </p>
                      )}
                      {edu.location && (
                        <p className="font-body text-[var(--text-muted)] text-xs mt-0.5">
                          {edu.location}
                        </p>
                      )}
                    </div>

                    {/* Year badge */}
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium border ${
                        edu.type === "primary"
                          ? "bg-[var(--accent-glow)] text-[var(--accent)] border-[var(--accent)]/20"
                          : "bg-[var(--bg-secondary)] text-[var(--text-muted)] border-[var(--border)]"
                      }`}
                    >
                      <Calendar size={11} />
                      {edu.period}
                    </div>
                  </div>

                  {edu.type === "primary" && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[var(--border)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      <p className="font-mono text-[11px] text-[var(--text-muted)] tracking-wider uppercase">
                        Currently Enrolled · Final Year
                      </p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
