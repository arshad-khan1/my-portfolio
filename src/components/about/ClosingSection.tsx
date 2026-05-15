"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styles from "./ClosingSection.module.scss";
import { about, person, social } from "@/resources";
import {
  FiBook,
  FiMapPin,
  FiGlobe,
  FiArrowRight,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiClock,
  FiCode,
  FiCpu,
} from "react-icons/fi";
import React from "react";

const quickFacts = [
  { icon: <FiMapPin size={15} />, label: "Based in", value: "Nagpur, India" },
  { icon: <FiClock size={15} />, label: "Experience", value: "5+ Years" },
  { icon: <FiCode size={15} />, label: "Primary stack", value: "Node · NestJS · Next" },
  { icon: <FiCpu size={15} />, label: "Specialty", value: "AI-native Systems" },
  { icon: <FiGlobe size={15} />, label: "Languages", value: "English · Hindi" },
  { icon: <FiBook size={15} />, label: "Degree", value: "B.Tech · IT" },
];

export function ClosingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const eduRef = useRef<HTMLDivElement>(null);
  const eduInView = useInView(eduRef, { once: true, amount: 0.3 });

  if (!about.studies.display) return null;

  const inst = about.studies.institutions[0];
  const essentialSocials = social.filter((s) => s.essential && s.link);

  return (
    <section className={styles.section}>
      {/* ── Top: Education + Quick facts ── */}
      <div ref={ref} className={styles.topRow}>

        {/* Education block */}
        <div ref={eduRef} className={styles.eduBlock}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 10 }}
            animate={eduInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Education
          </motion.span>

          <motion.div
            className={styles.degreeRow}
            initial={{ opacity: 0, y: 16 }}
            animate={eduInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className={styles.degreeIcon}>
              <FiBook size={20} />
            </div>
            <div>
              <h3 className={styles.degreeName}>{inst?.name}</h3>
              <p className={styles.degreeInst}>{inst?.description}</p>
            </div>
          </motion.div>

          {/* Timeline bar */}
          <motion.div
            className={styles.eduTimeline}
            initial={{ opacity: 0, y: 10 }}
            animate={eduInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className={styles.eduTimelineDot} />
            <motion.div
              className={styles.eduTimelineBar}
              initial={{ scaleX: 0 }}
              animate={eduInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className={styles.eduTimelineDot} />
          </motion.div>
          <div className={styles.eduTimelineLabels}>
            <span>2019</span>
            <span>2023</span>
          </div>
        </div>

        {/* Quick facts grid */}
        <div className={styles.factsGrid}>
          {quickFacts.map((fact, i) => (
            <motion.div
              key={fact.label}
              className={styles.factCard}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
            >
              <span className={styles.factIcon}>{fact.icon}</span>
              <div>
                <p className={styles.factLabel}>{fact.label}</p>
                <p className={styles.factValue}>{fact.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Bottom: Quote + CTA ── */}
      <motion.div
        className={styles.bottomRow}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.quoteBlock}>
          <span className={styles.quoteGlyph}>"</span>
          <p className={styles.quoteText}>
            I don't just ship features — I take ownership, think in systems,
            and build things that scale.
          </p>
        </div>

        <div className={styles.ctaBlock}>
          <p className={styles.ctaLabel}>Let&apos;s build something great</p>
          <div className={styles.ctaRow}>
            <motion.a
              href="#contact"
              className={styles.ctaPrimary}
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(4,158,226,0.55)" }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Get In Touch</span>
              <FiArrowRight size={16} />
            </motion.a>

            <div className={styles.socialRow}>
              {essentialSocials.slice(0, 3).map((item) => (
                <motion.a
                  key={item.name}
                  href={item.link}
                  target={item.name !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(4,158,226,0.12)", borderColor: "rgba(4,158,226,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  title={item.name}
                >
                  {item.name === "GitHub"   && <FiGithub size={16} />}
                  {item.name === "LinkedIn" && <FiLinkedin size={16} />}
                  {item.name === "Email"    && <FiMail size={16} />}
                  {!["GitHub", "LinkedIn", "Email"].includes(item.name) && (
                    <span style={{ fontSize: "0.72rem" }}>{item.name}</span>
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
