"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./WorkTimeline.module.scss";
import { about } from "@/resources";
import { FiBriefcase, FiCalendar, FiZap, FiArrowRight } from "react-icons/fi";
import React from "react";

type Experience = (typeof about.work.experiences)[number];

const ACCENT_COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];

const TECH_MAP: Record<string, string[]> = {
  "Pinnacle Teleservices Pvt. Ltd.": [
    "NestJS",
    "Next.js",
    "PostgreSQL",
    "Redis",
    "AWS",
    "WhatsApp API",
  ],
};

/* ── Section header ── */
function Header() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className={styles.header}>
      <div className={styles.headerLeft}>
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Career
        </motion.span>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          {about.work.title}
        </motion.h2>
        <motion.p
          className={styles.subheading}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Companies where I owned products end-to-end — from architecture to production.
        </motion.p>
      </div>

      <motion.div
        className={styles.expPill}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.45, delay: 0.25 }}
      >
        <FiBriefcase size={14} />
        <span>
          <strong>{about.work.experiences.length}</strong> Position
          {about.work.experiences.length > 1 ? "s" : ""}
        </span>
      </motion.div>

      <motion.div
        className={styles.headerRule}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/* ── Single experience entry ── */
function ExperienceEntry({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const color = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const techs = TECH_MAP[experience.company] ?? [];

  return (
    <motion.div
      ref={ref}
      className={styles.entry}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Left panel */}
      <div className={styles.leftPanel}>
        {/* Dot + line */}
        <div
          className={styles.timelineDot}
          style={{ background: color, boxShadow: `0 0 12px ${color}60` }}
        />
        {index < about.work.experiences.length - 1 && (
          <div
            className={styles.timelineLine}
            style={{ background: `linear-gradient(to bottom, ${color}40, transparent)` }}
          />
        )}

        <div className={styles.companyBlock}>
          <motion.h3
            className={styles.companyName}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.1 + 0.1 }}
          >
            {experience.company}
          </motion.h3>

          <motion.div
            className={styles.roleChip}
            style={{ color, borderColor: color + "40", background: color + "10" }}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.18 }}
          >
            <FiZap size={11} />
            {experience.role}
          </motion.div>

          <motion.div
            className={styles.timeframe}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.25 }}
          >
            <FiCalendar size={11} />
            {experience.timeframe}
          </motion.div>

          {techs.length > 0 && (
            <motion.div
              className={styles.techRow}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.35 }}
            >
              {techs.map((t) => (
                <span key={t} className={styles.techChip}>
                  {t}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Divider */}
      <motion.div
        className={styles.divider}
        style={{
          background: `linear-gradient(to bottom, ${color}30, transparent)`,
          transformOrigin: "top",
        }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
      />

      {/* Right panel — achievements */}
      <div className={styles.rightPanel}>
        <ul className={styles.achievements}>
          {experience.achievements.map((ach: React.ReactNode, i: number) => (
            <motion.li
              key={i}
              className={styles.achievement}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 + i * 0.09 + 0.3 }}
            >
              <span className={styles.achDot} style={{ background: color }} />
              <span className={styles.achText}>{ach}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Bottom glow line */}
      <motion.div
        className={styles.entryAccent}
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.55 }}
      />
    </motion.div>
  );
}

/* ── Main export ── */
export function WorkTimeline() {
  if (!about.work.display) return null;

  return (
    <section className={styles.section}>
      <Header />
      <div className={styles.entries}>
        {about.work.experiences.map((exp, i) => (
          <ExperienceEntry key={`${exp.company}-${i}`} experience={exp} index={i} />
        ))}
      </div>
    </section>
  );
}
