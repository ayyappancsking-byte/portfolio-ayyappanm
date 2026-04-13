"use client";

import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { languages } from "@/lib/data";

const levelColors: Record<string, { bg: string; text: string; bar: number }> = {
  Native: { bg: "rgba(139,94,60,0.1)", text: "#8b5e3c", bar: 100 },
  Fluent: { bg: "rgba(107,127,94,0.1)", text: "#6b7f5e", bar: 85 },
  Conversational: { bg: "rgba(94,107,127,0.1)", text: "#5e6b7f", bar: 55 },
};

export default function Languages() {
  return (
    <section id="languages" className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="Communication" title="Languages" />

        <div className="grid sm:grid-cols-3 gap-5 max-w-2xl">
          {languages.map((lang, i) => {
            const palette = levelColors[lang.level] ?? levelColors["Conversational"];
            return (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="card-premium p-6 group"
              >
                {/* Flag code avatar */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-mono font-bold border"
                    style={{
                      background: palette.bg,
                      color: palette.text,
                      borderColor: `${palette.text}25`,
                    }}
                  >
                    {lang.flag}
                  </div>
                  <Globe2 size={14} className="text-[var(--text-muted)]" />
                </div>

                {/* Language name */}
                <p className="font-display text-xl font-semibold text-[var(--text-primary)] mb-1">
                  {lang.name}
                </p>

                {/* Level */}
                <p
                  className="font-mono text-xs font-medium tracking-wide mb-3"
                  style={{ color: palette.text }}
                >
                  {lang.level}
                </p>

                {/* Progress bar */}
                <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${palette.bar}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 + 0.3, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: palette.text }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
