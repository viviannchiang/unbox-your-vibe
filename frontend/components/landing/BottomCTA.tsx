"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function BottomCTA() {
  return (
    <section className="bg-card px-4 py-28 text-center">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <p className="font-heading text-[11px] font-bold uppercase tracking-[0.35em] text-muted">
          ✦ &nbsp; ready? &nbsp; ✦
        </p>

        <h2
          className="font-heading font-bold lowercase leading-tight text-text"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
        >
          find your figure.
        </h2>

        <p className="max-w-sm font-body text-sm leading-relaxed text-muted">
          12 questions. one blind box. zero spoilers until you swipe it open.
        </p>

        <motion.div
          className="mt-4"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Link
            href="/quiz"
            className="block rounded-full bg-text px-12 py-4 font-heading text-base font-bold lowercase tracking-wide text-background shadow-card"
          >
            start the quiz &nbsp;→
          </Link>
        </motion.div>
      </motion.div>

      <p className="mt-20 font-body text-xs text-muted/40">
        unbox your vibe · inspired by pop mart blind boxes
      </p>
    </section>
  );
}
