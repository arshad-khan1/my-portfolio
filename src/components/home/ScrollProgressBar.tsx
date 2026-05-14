"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "linear-gradient(90deg, #049EE2 0%, #17C0FD 50%, #049EE2 100%)",
        scaleX,
        transformOrigin: "0%",
        zIndex: 9999,
        boxShadow: "0 0 10px rgba(4,158,226,0.7)",
      }}
    />
  );
}
