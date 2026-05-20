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
      {/* ── Section Header (Career/Work style) ── */}
      <div ref={ref} className={styles.header}>
        <div className={styles.headerLeft}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Education
          </motion.span>
          <motion.h2
            className={styles.sectionHeading}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {about.studies.title}
          </motion.h2>
          <motion.p
            className={styles.sectionSubheading}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            My academic background and qualifications.
          </motion.p>
        </div>

        <motion.div
          className={styles.eduPill}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.45, delay: 0.25 }}
        >
          <FiBook size={14} />
          <span>
            <strong>{about.studies.institutions.length}</strong> Degree
            {about.studies.institutions.length > 1 ? "s" : ""}
          </span>
        </motion.div>

        <motion.div
          className={styles.headerRule}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* ── Top: Education full width ── */}
      <div className={styles.topRow}>
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
            <span>2020</span>
            <span>2024</span>
          </div>
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
            I don't just ship features — I take ownership, think in systems, and build things that
            scale.
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
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(4,158,226,0.12)",
                    borderColor: "rgba(4,158,226,0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  title={item.name}
                >
                  {item.name === "GitHub" && <FiGithub size={16} />}
                  {item.name === "LinkedIn" && <FiLinkedin size={16} />}
                  {item.name === "Email" && <FiMail size={16} />}
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
