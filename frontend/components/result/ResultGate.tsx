"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { QUIZ_COMPLETED_KEY } from "@/lib/constants";

// Guards a result page: only renders its contents if the visitor finished the
// quiz this session. Otherwise (e.g. a deep link or shared URL) it redirects
// home. While checking, it shows a neutral loader so the result never flashes.
export function ResultGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(QUIZ_COMPLETED_KEY)) {
      setAllowed(true);
    } else {
      router.replace("/");
    }
  }, [router]);

  if (!allowed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-14">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="h-7 w-7 rounded-full border-2 border-text/15 border-t-text"
        />
      </div>
    );
  }

  return <>{children}</>;
}
