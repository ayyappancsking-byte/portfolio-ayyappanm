"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Database, Globe } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { careerObjective } from "@/lib/data";

const highlights = [
  { icon: <Brain size={20} />, label: "AI Development", desc: "Groq, LLMs, Custom Memory" },
  { icon: <Code2 size={20} />, label: "Full-Stack", desc: "Python, FastAPI, JS" },
  { icon: <Database size={20} />, label: "Data Science", desc: "Pandas, NumPy, Matplotlib" },
  { icon: <Globe size={20} />, label: "Cloud Tools", desc: "Google Cloud, MongoDB" },
];

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-start">
          {/* Left */}
          <div>
            <SectionHeading
              eyebrow="About Me"
              title="Who I Am"
              subtitle=""
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-body text-[var(--text-secondary)] leading-[1.85] text-base mb-6"
            >
              {careerObjective}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {["Python", "FastAPI", "Groq API", "Google Cloud", "MongoDB", "Data Analysis"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--border)]"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — Highlight cards */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="card-premium p-5 group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-glow)] flex items-center justify-center text-[var(--accent)] mb-3 group-hover:scale-110 transition-transform duration-200">
                  {h.icon}
                </div>
                <p className="font-body font-semibold text-[var(--text-primary)] text-sm mb-1">
                  {h.label}
                </p>
                <p className="font-body text-[var(--text-muted)] text-xs leading-relaxed">
                  {h.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
