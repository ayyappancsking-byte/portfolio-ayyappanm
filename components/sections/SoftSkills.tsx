"use client";

import { motion } from "framer-motion";
import { Users, MessageCircle, Lightbulb, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { softSkills } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  users: <Users size={22} />,
  "message-circle": <MessageCircle size={22} />,
  lightbulb: <Lightbulb size={22} />,
  clock: <Clock size={22} />,
};

const accentPalette = [
  { bg: "rgba(139,94,60,0.1)", color: "#8b5e3c", border: "rgba(139,94,60,0.2)" },
  { bg: "rgba(94,107,127,0.1)", color: "#5e6b7f", border: "rgba(94,107,127,0.2)" },
  { bg: "rgba(107,127,94,0.1)", color: "#6b7f5e", border: "rgba(107,127,94,0.2)" },
  { bg: "rgba(122,94,139,0.1)", color: "#7a5e8b", border: "rgba(122,94,139,0.2)" },
];

export default function SoftSkills() {
  return (
    <section id="softskills" className="section-padding bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="Personal Strengths" title="Soft Skills" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {softSkills.map((skill, i) => {
            const palette = accentPalette[i % accentPalette.length];
            return (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, type: "spring", bounce: 0.3 }}
                whileHover={{ y: -5, scale: 1.03, transition: { duration: 0.18 } }}
                className="card-premium p-6 flex flex-col items-center text-center gap-3 group cursor-default"
                style={{ borderColor: palette.border }}
              >
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: palette.bg, color: palette.color }}
                >
                  {iconMap[skill.icon]}
                </motion.div>
                <p className="font-body font-semibold text-[var(--text-primary)] text-sm leading-snug">
                  {skill.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
