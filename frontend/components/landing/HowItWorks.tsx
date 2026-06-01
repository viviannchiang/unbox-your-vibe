"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "answer 12 questions",
    description:
      "two cards per question. no right answers — just pick what's more you.",
    accent: "#B8C6E8",
    icon: "✦",
  },
  {
    number: "02",
    title: "swipe open your box",
    description:
      "a mystery blind box appears. drag across the tear line to open it.",
    accent: "#F5D5C0",
    icon: "?",
  },
  {
    number: "03",
    title: "meet your figure",
    description:
      "your figure rises out with sparkles. 16 results across 4 characters.",
    accent: "#F5B5C0",
    icon: "★",
  },
];

export function HowItWorks() {
  return (
    <section className="pattern-dots py-24 px-4">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-muted">
            ✦ how it works ✦
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold lowercase text-text">
            three steps to your figure
          </h2>
        </motion.div>

        {/* Cards — staggered slide-up */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className="flex flex-col gap-5 rounded-3xl bg-card p-8 shadow-card"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.14,
                ease: "easeOut" as const,
              }}
              whileHover={{
                y: -4,
                boxShadow: "0 12px 40px rgba(45,45,45,0.11)",
                transition: { type: "spring", stiffness: 300, damping: 22 },
              }}
            >
              {/* Step number + accent line */}
              <div className="flex items-center gap-3">
                <span className="font-heading text-xs font-bold tracking-widest text-muted">
                  {step.number}
                </span>
                <motion.div
                  className="h-0.5 w-8 rounded-full"
                  style={{ backgroundColor: step.accent }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.14 + 0.3 }}
                />
              </div>

              {/* Dashed icon box */}
              <motion.div
                className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-dashed"
                style={{
                  borderColor: step.accent,
                  backgroundColor: step.accent + "22",
                }}
                whileHover={{ rotate: [0, -6, 6, -3, 0] }}
                transition={{ duration: 0.5 }}
              >
                <span
                  className="font-heading text-xl font-bold"
                  style={{ color: step.accent }}
                >
                  {step.icon}
                </span>
              </motion.div>

              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-lg font-bold lowercase text-text">
                  {step.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
