"use client";

import { motion } from "framer-motion";

const CHARACTERS = [
  {
    name: "Nyota",
    vibe: "the dreamers",
    color: "#B8C6E8",
    rotateClass: "-rotate-[6deg]",
    floatDelay: 0,
  },
  {
    name: "Hirono",
    vibe: "the thinkers",
    color: "#7A9E9F",
    rotateClass: "rotate-[0deg]",
    floatDelay: 0.6,
  },
  {
    name: "Lulu",
    vibe: "the caretakers",
    color: "#F5B5C0",
    rotateClass: "rotate-[6deg]",
    floatDelay: 1.2,
  },
];

export function BlindBoxPreview() {
  return (
    <section className="bg-card py-24 px-4">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-16">
        {/* Heading — slides up when scrolled into view */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-muted">
            ✦ 16 figures · 3 characters ✦
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold lowercase text-text">
            which one is yours?
          </h2>
          <p className="mt-2 font-body text-sm text-muted">
            you won&apos;t know until you open it.
          </p>
        </motion.div>

        {/* Boxes — horizontal scroll on mobile */}
        <div className="-mx-4 flex items-end justify-start gap-5 overflow-x-auto px-8 pb-2 sm:mx-0 sm:justify-center sm:gap-7 sm:overflow-x-visible sm:px-0">
          {CHARACTERS.map((char) => (
            // Outer div: static CSS rotation — independent of Framer transforms
            <div
              key={char.name}
              className={`${char.rotateClass} relative flex-shrink-0`}
            >
              {/* Framer motion wrapper: float + hover lift */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: char.floatDelay,
                }}
                whileHover={{
                  y: -16,
                  scale: 1.06,
                  transition: { type: "spring", stiffness: 280, damping: 18 },
                }}
              >
                {/* Box body */}
                <div
                  className="relative h-44 w-32 overflow-hidden rounded-3xl shadow-box sm:h-52 sm:w-36"
                  style={{ backgroundColor: char.color }}
                >
                  {/* Lid */}
                  <div className="absolute inset-x-0 top-0 h-[36%] rounded-t-3xl bg-white/25" />

                  {/* Tear line */}
                  <div className="absolute inset-x-4 top-[36%]">
                    <div className="border-t-[2px] border-dashed border-white/55" />
                    <p
                      className="mt-0.5 text-center font-heading text-[8px] uppercase tracking-[0.2em]"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      tear here
                    </p>
                  </div>

                  {/* "?" — soft breathing pulse */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="select-none font-heading text-[5rem] font-bold leading-none"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                      animate={{ scale: [1, 1.06, 1], opacity: [0.65, 0.8, 0.65] }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: char.floatDelay,
                      }}
                    >
                      ?
                    </motion.span>
                  </div>

                  {/* Character name */}
                  <div className="absolute inset-x-0 bottom-0 pb-4 text-center">
                    <p
                      className="font-heading text-[9px] font-bold uppercase tracking-[0.25em]"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {char.name}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Vibe pills — stagger in */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {CHARACTERS.map((char, i) => (
            <motion.div
              key={char.name}
              className="flex items-center gap-2 rounded-full border border-text/10 bg-background px-4 py-1.5"
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 20,
                delay: i * 0.09,
              }}
            >
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: char.color }}
              />
              <span className="font-body text-xs lowercase text-muted">
                {char.name} — {char.vibe}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
