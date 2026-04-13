"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { personalInfo } from "@/lib/data";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const contactLinks = [
  {
    icon: <Mail size={17} />,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: <Phone size={17} />,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
  },
  {
    icon: <Linkedin size={17} />,
    label: "LinkedIn",
    value: "linkedin.com/in/-ayyappanm",
    href: personalInfo.linkedin,
  },
  {
    icon: <Github size={17} />,
    label: "GitHub",
    value: personalInfo.githubHandle,
    href: personalInfo.github,
  },
];

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim() || form.name.trim().length < 2)
    errors.name = "Please enter your name.";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = "Please enter a valid email.";
  if (!form.subject.trim() || form.subject.trim().length < 3)
    errors.subject = "Please enter a subject.";
  if (!form.message.trim() || form.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("loading");
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setServerMsg(data.message || "Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "", honeypot: "" });
      } else {
        setStatus("error");
        setServerMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerMsg("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="section-padding bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact"
          subtitle="Open to internships, collaborations, and entry-level opportunities."
        />

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
          {/* Left — contact info */}
          <div className="flex flex-col gap-4">
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ x: 4, transition: { duration: 0.15 } }}
                className="flex items-center gap-4 p-4 card-premium group"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-glow)] flex items-center justify-center text-[var(--accent)] flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                  {link.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-0.5">
                    {link.label}
                  </p>
                  <p className="font-body text-[var(--text-primary)] text-sm font-medium truncate">
                    {link.value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Quick availability note */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-4 rounded-xl border border-[var(--accent)]/20 bg-[var(--accent-glow)] mt-2"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] font-medium">
                  Available
                </p>
              </div>
              <p className="font-body text-[var(--text-secondary)] text-xs leading-relaxed">
                Actively seeking entry-level positions and internship opportunities in software development and AI.
              </p>
            </motion.div>
          </div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="card-premium p-7 md:p-8"
          >
            <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-6">
              Send a Message
            </h3>

            {/* Honeypot — hidden from real users */}
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={handleChange}
              className="absolute opacity-0 pointer-events-none w-0 h-0"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              {/* Name + Email row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-body bg-[var(--bg-secondary)] border text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-200 ${
                      errors.name ? "border-red-400/60" : "border-[var(--border)]"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-400 text-xs font-body">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-body bg-[var(--bg-secondary)] border text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-200 ${
                      errors.email ? "border-red-400/60" : "border-[var(--border)]"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-400 text-xs font-body">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className={`w-full px-4 py-2.5 rounded-xl text-sm font-body bg-[var(--bg-secondary)] border text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-200 ${
                    errors.subject ? "border-red-400/60" : "border-[var(--border)]"
                  }`}
                />
                {errors.subject && (
                  <p className="mt-1 text-red-400 text-xs font-body">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={5}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm font-body bg-[var(--bg-secondary)] border text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-200 resize-none ${
                    errors.message ? "border-red-400/60" : "border-[var(--border)]"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-red-400 text-xs font-body">{errors.message}</p>
                )}
              </div>

              {/* Server feedback */}
              <AnimatePresence>
                {(status === "success" || status === "error") && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-sm font-body ${
                      status === "success"
                        ? "bg-green-500/8 border-green-500/20 text-green-600 dark:text-green-400"
                        : "bg-red-500/8 border-red-500/20 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {status === "success" ? (
                      <CheckCircle size={15} className="flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                    )}
                    {serverMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={status !== "loading" ? { scale: 1.02, y: -1 } : {}}
                whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-[var(--accent)] text-white text-sm font-medium font-body shadow-lg shadow-[var(--accent-glow)] hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
