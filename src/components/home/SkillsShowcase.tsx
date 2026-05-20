"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heading, Text, Column, Row } from "@once-ui-system/core";

interface SkillCategory {
  title: string;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Backend & APIs",
    skills: ["Node.js", "NestJS", "FastAPI", "Python", "REST APIs", "GraphQL", "WebSockets"],
    color: "#3b82f6",
  },
  {
    title: "Frontend & Mobile",
    skills: ["React.js", "Next.js", "React Native", "TypeScript", "Tailwind CSS"],
    color: "#8b5cf6",
  },
  {
    title: "Databases & Storage",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "MinIO", "Prisma"],
    color: "#10b981",
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "Docker", "Kafka", "CI/CD", "Linux", "Nginx"],
    color: "#f59e0b",
  },
  {
    title: "AI & Automation",
    skills: ["OpenAI API", "N8N", "LangChain", "Python ML", "Vector DBs"],
    color: "#ec4899",
  },
  {
    title: "Business Logic",
    skills: ["RBAC", "Payment Gateways", "Real-time Systems", "Multi-tenancy", "Webhooks"],
    color: "#06b6d4",
  },
];

function SkillPill({ skill, color, delay }: { skill: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.08, y: -2 }}
      style={{
        background: `${color}15`,
        border: `1px solid ${color}30`,
        borderRadius: "100px",
        padding: "8px 18px",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: `${color}`,
        cursor: "default",
        transition: "all 0.2s ease",
      }}
    >
      {skill}
    </motion.div>
  );
}

function SkillCategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      style={{
        background: "var(--surface-background, rgba(128, 128, 128, 0.03))",
        border: "1px solid var(--neutral-alpha-weak, rgba(128, 128, 128, 0.1))",
        borderRadius: "20px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 30px -10px ${category.color}20`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: category.color,
          }}
        />
        <Text variant="heading-strong-s">{category.title}</Text>
      </div>
      <Row gap="8" wrap style={{ alignItems: "flex-start" }}>
        {category.skills.map((skill, idx) => (
          <SkillPill key={skill} skill={skill} color={category.color} delay={idx * 0.05} />
        ))}
      </Row>
    </motion.div>
  );
}

export function SkillsShowcase() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <Column fillWidth gap="32" paddingY="64" horizontal="center">
      <div ref={headerRef} style={{ maxWidth: "700px", textAlign: "center", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Text
            variant="label-strong-s"
            onBackground="brand-medium"
            style={{ textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}
          >
            Technical Arsenal
          </Text>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Heading
            as="h2"
            variant="display-strong-s"
            wrap="balance"
            style={{ marginBottom: "16px" }}
          >
            Tools That Power Real Solutions
          </Heading>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
            I don&apos;t just learn tech — I master the right tools to solve business problems
            efficiently. From AI-powered pipelines to payment gateways, I build end-to-end.
          </Text>
        </motion.div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "16px",
          width: "100%",
          maxWidth: "1100px",
          padding: "0 16px",
        }}
      >
        {skillCategories.map((category, idx) => (
          <SkillCategoryCard key={category.title} category={category} index={idx} />
        ))}
      </div>
    </Column>
  );
}
