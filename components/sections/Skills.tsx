"use client";

import { motion } from "framer-motion";
import { Code2, BarChart2, Cloud, Globe, Layers } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  code: <Code2 size={18} />,
  "bar-chart": <BarChart2 size={18} />,
  cloud: <Cloud size={18} />,
  globe: <Globe size={18} />,
  layers: <Layers size={18} />,
};

const accentVars = [
  { bg: "rgba(139,94,60,0.08)", text: "#8b5e3c", border: "rgba(139,94,60,0.18)" },
  { bg: "rgba(107,127,94,0.08)", text: "#6b7f5e", border: "rgba(107,127,94,0.18)" },
  { bg: "rgba(94,107,127,0.08)", text: "#5e6b7f", border: "rgba(94,107,127,0.18)" },
  { bg: "rgba(127,94,107,0.08)", text: "#7f5e6b", border: "rgba(127,94,107,0.18)" },
  { bg: "rgba(122,107,94,0.08)", text: "#7a6b5e", border: "rgba(122,107,94,0.18)" },
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="What I Know" title="Technical Skills" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => {
            const colors = accentVars[i % accentVars.length];
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="card-premium p-6 group"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                    style={{ background: colors.bg, color: colors.text }}
                  >
                    {iconMap[cat.icon]}
                  </div>
                  <h3 className="font-body font-semibold text-sm text-[var(--text-primary)] leading-tight">
                    {cat.title}
                  </h3>
                </div>

                {/* Divider */}
                <div
                  className="h-px mb-4"
                  style={{
                    background: `linear-gradient(90deg, ${colors.border}, transparent)`,
                  }}
                />

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.06 + j * 0.04 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-all duration-150 cursor-default"
                      style={{
                        background: colors.bg,
                        color: colors.text,
                        borderColor: colors.border,
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Wide span card — summary chip */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="card-premium p-6 sm:col-span-2 lg:col-span-3 flex flex-wrap items-center gap-4"
          >
            <div className="flex-shrink-0">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">
                Total Skills
              </p>
              <p className="font-display text-3xl font-semibold text-[var(--text-primary)]">
                {skillCategories.reduce((a, c) => a + c.skills.length, 0)}{" "}
                <span className="font-body text-sm text-[var(--text-muted)] font-normal">
                  technologies
                </span>
              </p>
            </div>
            <div className="h-10 w-px bg-[var(--border)] hidden sm:block" />
            <div className="flex flex-wrap gap-2 flex-1">
              {skillCategories
                .flatMap((c) => c.skills)
                .map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-md text-[11px] font-mono text-[var(--text-muted)] border border-[var(--border)] bg-[var(--bg-secondary)]"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
