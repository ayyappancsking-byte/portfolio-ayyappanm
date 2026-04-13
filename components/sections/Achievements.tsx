"use client";

import { motion } from "framer-motion";
import { Cpu, Users, Star, Calendar } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { achievements } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  cpu: <Cpu size={20} />,
  users: <Users size={20} />,
  award: <Star size={20} />,
};

const accentColors = ["#8b5e3c", "#6b7f5e", "#5e6b7f"];

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="Milestones" title="Achievements" />

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((item, i) => {
            const accent = accentColors[i % accentColors.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="card-premium p-6 group"
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200"
                  style={{ background: `${accent}14`, color: accent }}
                >
                  {iconMap[item.icon]}
                </div>

                {/* Title */}
                <h3 className="font-body font-semibold text-[var(--text-primary)] text-sm leading-snug mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-body text-[var(--text-secondary)] text-sm leading-relaxed mb-4 flex-1">
                  {item.description}
                </p>

                {/* Date badge */}
                <div className="flex items-center gap-1.5 pt-3 border-t border-[var(--border)]">
                  <Calendar size={11} style={{ color: accent }} />
                  <span
                    className="font-mono text-[11px]"
                    style={{ color: accent }}
                  >
                    {item.date}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
