"use client";

import { motion } from "framer-motion";

// A decorative night-market backdrop that fades in when the quiz starts:
// deep purple night sky, a tiled starfield, a few warm lantern glows, and a
// warm street-lamp glow rising from the bottom. Purely cosmetic.
export function NightMarketBackground() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed inset-0 -z-10 overflow-hidden"
    >
      {/* night sky */}
      <div className="night-sky absolute inset-0" />
      {/* stars */}
      <div className="night-stars animate-twinkle absolute inset-0" />
      {/* soft lantern glows drifting near the top */}
      <div className="absolute left-[12%] top-[18%] h-24 w-24 rounded-full bg-amber-300/20 blur-3xl" />
      <div className="absolute right-[14%] top-[26%] h-28 w-28 rounded-full bg-rose-300/20 blur-3xl" />
      <div className="absolute left-[60%] top-[10%] h-20 w-20 rounded-full bg-amber-200/15 blur-3xl" />
      {/* warm glow rising from the market below */}
      <div className="night-glow absolute inset-x-0 bottom-0 h-2/3" />
    </motion.div>
  );
}
