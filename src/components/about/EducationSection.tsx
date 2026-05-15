"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heading, Text } from "@once-ui-system/core";
import { about } from "@/resources";
import { FiBook } from "react-icons/fi";
import React from "react";

type Institution = (typeof about.studies.institutions)[number];

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981"];

function EducationCard({
  institution,
  index,
}: {
  institution: Institution;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const color = COLORS[index % COLORS.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="edu-card"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.15 + 0.2,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        className="edu-icon"
        style={{ background: `${color}15`, color }}
      >
        <FiBook size={22} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
      >
        <Heading as="h3" variant="heading-strong-l">
          {institution.name}
        </Heading>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
      >
        <Text variant="body-default-m" onBackground="neutral-weak" style={{ lineHeight: 1.65 }}>
          {institution.description}
        </Text>
      </motion.div>

      {/* Bottom accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
        className="edu-accent-bar"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      {/* Hover glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="edu-hover-glow"
        style={{ background: `radial-gradient(circle at 50% 0%, ${color}08 0%, transparent 50%)` }}
      />
    </motion.div>
  );
}

export function EducationSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  if (!about.studies.display) return null;

  return (
    <section className="edu-section">
      <div ref={headerRef} className="edu-header">
        <motion.p
          className="edu-label"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Background
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Heading as="h2" variant="display-strong-s" wrap="balance">
            {about.studies.title}
          </Heading>
        </motion.div>
      </div>

      <div className="edu-grid">
        {about.studies.institutions.map((inst, i) => (
          <EducationCard key={`${inst.name}-${i}`} institution={inst} index={i} />
        ))}
      </div>

      <style jsx global>{`
        .edu-section {
          width: 100%;
          padding: 2rem 2rem 6rem;
          max-width: 860px;
          margin: 0 auto;
          box-sizing: border-box;
        }
        .edu-header {
          margin-bottom: 2.5rem;
          text-align: center;
        }
        .edu-label {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--brand-on-background-medium);
          margin: 0 0 12px;
        }
        .edu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .edu-card {
          background: var(--surface-background, rgba(128, 128, 128, 0.05));
          border: 1px solid var(--neutral-alpha-weak, rgba(128, 128, 128, 0.15));
          border-radius: 24px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .edu-icon {
          border-radius: 12px;
          padding: 12px;
          width: fit-content;
        }
        .edu-accent-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          transform-origin: center;
        }
        .edu-hover-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }
        @media (max-width: 600px) {
          .edu-section {
            padding: 2rem 1rem 5rem;
          }
          .edu-card {
            padding: 1.4rem;
            border-radius: 18px;
          }
          .edu-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
