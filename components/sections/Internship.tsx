"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { internship } from "@/lib/data";

export default function Internship() {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="Work Experience" title="Internship" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="card-premium overflow-hidden max-w-3xl"
        >
          {/* Top bar */}
          <div className="h-1 bg-gradient-to-r from-[var(--accent)] to-transparent" />

          <div className="p-8">
            {/* Role + company */}
            <div className="flex flex-wrap items-start gap-4 justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[var(--accent-glow)] flex items-center justify-center text-[var(--accent)]">
                    <Briefcase size={17} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] font-medium">
                    Internship
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)] mb-1">
                  {internship.role}
                </h3>
                <p className="font-body text-[var(--text-secondary)] font-medium text-base">
                  {internship.company}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-body">
                  <MapPin size={12} className="text-[var(--accent)]" />
                  {internship.location}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-glow)] border border-[var(--accent)]/20 text-xs font-mono text-[var(--accent)]">
                  <Calendar size={11} />
                  {internship.period}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[var(--border)] mb-6" />

            {/* Contributions */}
            <ul className="flex flex-col gap-4">
              {internship.contributions.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={15}
                    className="flex-shrink-0 mt-0.5 text-[var(--accent)]"
                  />
                  <p className="font-body text-[var(--text-secondary)] text-sm leading-relaxed">
                    {item}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
