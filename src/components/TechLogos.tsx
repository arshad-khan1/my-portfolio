"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiNestjs,
  SiNodedotjs,
  SiTypescript,
  SiPython,
  SiApachekafka,
  SiReact,
  SiNextdotjs,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiDocker,
  SiGit,
  SiJenkins,
  SiOpenai,
  SiRazorpay,
  SiStripe,
  SiWhatsapp,
} from "react-icons/si";
import {
  FiCloud,
  FiCpu,
  FiZap,
  FiServer,
  FiMonitor,
  FiDatabase,
  FiPackage,
} from "react-icons/fi";
import styles from "./TechLogos.module.scss";

/* ── Skill categories ───────────────────────────────── */
const categories = [
  {
    id: "backend",
    label: "Backend & APIs",
    color: "#049EE2",
    CatIcon: FiServer,
    skills: [
      { name: "NestJS", Icon: SiNestjs },
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "Python", Icon: SiPython },
    ],
  },
  {
    id: "frontend",
    label: "Frontend & Mobile",
    color: "#8b5cf6",
    CatIcon: FiMonitor,
    skills: [
      { name: "React.js", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "React Native", Icon: SiReact },
    ],
  },
  {
    id: "database",
    label: "Databases",
    color: "#10b981",
    CatIcon: FiDatabase,
    skills: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MySQL", Icon: SiMysql },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "Redis", Icon: SiRedis },
      { name: "Kafka", Icon: SiApachekafka },
      { name: "Prisma", Icon: SiPrisma },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    color: "#f59e0b",
    CatIcon: FiCloud,
    skills: [
      { name: "AWS", Icon: FiCloud },
      { name: "Docker", Icon: SiDocker },
      { name: "Git", Icon: SiGit },
      { name: "Jenkins", Icon: SiJenkins },
    ],
  },
  {
    id: "ai",
    label: "AI & Automation",
    color: "#ec4899",
    CatIcon: FiCpu,
    skills: [
      { name: "OpenAI API", Icon: SiOpenai },
      { name: "LangChain", Icon: FiZap },
      { name: "AI / NLP", Icon: FiCpu },
    ],
  },
  {
    id: "payments",
    label: "Payments & Integrations",
    color: "#6875F5",
    CatIcon: FiPackage,
    skills: [
      { name: "Razorpay", Icon: SiRazorpay },
      { name: "Stripe", Icon: SiStripe },
      { name: "WhatsApp API", Icon: SiWhatsapp },
    ],
  },
];

/* ── Section header ─────────────────────────────────── */
function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const totalSkills = categories.reduce((acc, c) => acc + c.skills.length, 0);

  return (
    <div ref={ref} className={styles.header}>
      <div className={styles.headerLeft}>
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Engineering Stack
        </motion.span>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Technologies I Build With
        </motion.h2>
        <motion.p
          className={styles.subheading}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A full-stack arsenal spanning backend systems, databases, cloud
          infrastructure, and AI—everything needed to ship production software.
        </motion.p>
      </div>

      <motion.div
        className={styles.headerStats}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.45, delay: 0.25 }}
      >
        <div className={styles.statPill}>
          <span className={styles.statNum}>{categories.length}</span>
          <span className={styles.statLabel}>Disciplines</span>
        </div>
        <div className={styles.statPill}>
          <span className={styles.statNum}>{totalSkills}+</span>
          <span className={styles.statLabel}>Technologies</span>
        </div>
      </motion.div>

      <motion.div
        className={styles.headerRule}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/* ── Single category row ─────────────────────────────── */
interface Category {
  id: string;
  label: string;
  color: string;
  CatIcon: React.ElementType;
  skills: { name: string; Icon: React.ElementType }[];
}

function CategoryRow({ cat, index }: { cat: Category; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const cFaint = `${cat.color}14`;
  const cBorder = `${cat.color}35`;
  const cHover = `${cat.color}22`;
  const cGlow = `${cat.color}28`;
  const cBar = `${cat.color}60`;

  return (
    <motion.div
      ref={ref}
      className={styles.catRow}
      style={{ "--c": cat.color, "--cBar": cBar } as React.CSSProperties}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Category label */}
      <div className={styles.catLabel}>
        <cat.CatIcon size={13} className={styles.catIcon} />
        <span>{cat.label}</span>
      </div>

      {/* Skill chips */}
      <div className={styles.chips}>
        {cat.skills.map((skill, si) => (
          <motion.div
            key={skill.name}
            className={styles.chip}
            style={
              {
                "--cFaint": cFaint,
                "--cBorder": cBorder,
                "--cHover": cHover,
                "--cGlow": cGlow,
              } as React.CSSProperties
            }
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.32,
              delay: index * 0.09 + si * 0.045,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -3,
              transition: { duration: 0.15, ease: "easeOut" },
            }}
          >
            <skill.Icon className={styles.chipIcon} />
            <span className={styles.chipName}>{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main export ─────────────────────────────────────── */
export const TechLogos = () => {
  return (
    <section className={styles.section}>
      <SectionHeader />
      <div className={styles.rows}>
        {categories.map((cat, i) => (
          <CategoryRow key={cat.id} cat={cat} index={i} />
        ))}
      </div>
    </section>
  );
};
