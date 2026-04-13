"use client";

import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Brand - Removed the 'A' Circle for a cleaner look */}
          <div className="flex items-center">
            <span className="font-display text-[var(--text-primary)] font-bold text-lg tracking-tight">
              Ayyappan <span className="text-[var(--gold)]">M</span>
            </span>
          </div>

          {/* Social Links - Grouped and centered */}
          <div className="flex items-center gap-4">
            {[
              {
                href: `mailto:${personalInfo.email}`,
                icon: <Mail size={18} />,
                label: "Email",
              },
              
              {
                href: personalInfo.linkedin,
                icon: <Linkedin size={18} />,
                label: "LinkedIn",
              },
              {
                href: personalInfo.github,
                icon: <Github size={18} />,
                label: "GitHub",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={item.label}
                className="text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors duration-300"
              >
                {item.icon}
              </a>
            ))}
          </div>

          {/* Copyright - Simplified */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-[var(--text-muted)] text-[12px] font-body opacity-80 text-center md:text-right">
              © {new Date().getFullYear()} Ayyappan M. All Rights Reserved.
            </p>
            <p className="text-[var(--gold)] text-[11px] font-medium tracking-wide opacity-90 text-center md:text-right">
              Designed & Developed by Ayyappan M
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

