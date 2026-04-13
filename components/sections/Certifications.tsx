"use client";

import { motion } from "framer-motion";
import { Award, Calendar } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { certifications } from "@/lib/data";

export default function Certifications() {
  return (
    <section id="certifications" className="section-padding bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications"
          subtitle="Continuous learning backed by recognised credentials."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-premium p-5 group flex flex-col gap-3"
            >
              {/* Issuer badge */}
              <div className="flex items-center justify-between">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-mono font-bold shadow-md"
                  style={{ background: cert.color }}
                >
                  {cert.issuer.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex items-center gap-1 text-[var(--text-muted)] text-xs font-mono">
                  <Calendar size={10} />
                  {cert.date}
                </div>
              </div>

              {/* Title */}
              <p className="font-body font-semibold text-[var(--text-primary)] text-sm leading-snug flex-1">
                {cert.title}
              </p>

              {/* Issuer */}
              <div className="flex items-center gap-1.5 pt-2 border-t border-[var(--border)]">
                <Award size={12} className="text-[var(--text-muted)]" />
                <p className="font-body text-[var(--text-muted)] text-xs truncate">
                  {cert.issuer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
