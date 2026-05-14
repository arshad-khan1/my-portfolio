"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heading, Text, Column } from "@once-ui-system/core";
import { FiTarget, FiLayers, FiCpu, FiShield } from "react-icons/fi";

const values = [
  {
    icon: <FiTarget size={28} />,
    title: "Business-First Thinking",
    description:
      "I start with the business outcome, not the technology. Every feature, every API endpoint, every database schema is designed to drive revenue, reduce churn, or cut costs.",
    color: "#3b82f6",
  },
  {
    icon: <FiLayers size={28} />,
    title: "Ownership & Delivery",
    description:
      "From architecture to deployment, I take full ownership. I don't need hand-holding — I need a problem worth solving. Then I ship production-ready solutions.",
    color: "#8b5cf6",
  },
  {
    icon: <FiCpu size={28} />,
    title: "AI-Native Development",
    description:
      "I leverage AI not as a buzzword, but as a force multiplier. Smart routing, automated analytics, intelligent agents — I build systems that get smarter over time.",
    color: "#10b981",
  },
  {
    icon: <FiShield size={28} />,
    title: "Scalable by Design",
    description:
      "Multi-tenancy, RBAC, caching strategies, and infrastructure that grows with your user base. I architect for the traffic you'll have tomorrow, not just today.",
    color: "#f59e0b",
  },
];

export function BusinessValue() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <Column fillWidth gap="32" paddingY="64" horizontal="center">
      <div style={{ maxWidth: "700px", textAlign: "center", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Text
            variant="label-strong-s"
            onBackground="brand-medium"
            style={{ textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}
          >
            Why Hire Me
          </Text>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Heading as="h2" variant="display-strong-s" wrap="balance" style={{ marginBottom: "16px" }}>
            I Think Like a Founder, Code Like an Engineer
          </Heading>
        </motion.div>
      </div>

      <div ref={ref} className="bv-grid">
        {values.map((value, idx) => (
          <motion.div
            key={value.title}
            className="bv-card"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: idx * 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{
              y: -6,
              transition: { duration: 0.2 },
            }}
            style={{
              background: "var(--surface-background, rgba(128, 128, 128, 0.03))",
              border: "1px solid var(--neutral-alpha-weak, rgba(128, 128, 128, 0.1))",
              borderRadius: "24px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: idx * 0.15 + 0.2,
                type: "spring",
                stiffness: 200,
                damping: 12,
              }}
              whileHover={{
                scale: 1.15,
                rotate: [0, 10, -10, 0],
                transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 },
              }}
              style={{
                background: `${value.color}15`,
                borderRadius: "14px",
                padding: "14px",
                color: value.color,
                width: "fit-content",
                position: "relative",
              }}
            >
              <motion.div
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: idx * 0.5,
                  ease: "easeInOut",
                }}
              >
                {value.icon}
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.15 + 0.3 }}
            >
              <Heading as="h3" variant="heading-strong-m">
                {value.title}
              </Heading>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.15 + 0.4 }}
            >
              <Text variant="body-default-m" onBackground="neutral-weak" style={{ lineHeight: 1.7 }}>
                {value.description}
              </Text>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15 + 0.5 }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: `linear-gradient(90deg, transparent, ${value.color}, transparent)`,
                transformOrigin: "center",
              }}
            />

            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at 50% 0%, ${value.color}08 0%, transparent 50%)`,
                pointerEvents: "none",
              }}
            />
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        .bv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          width: 100%;
          max-width: 1100px;
          padding: 0 16px;
          box-sizing: border-box;
          margin: 0 auto;
        }
        @media (max-width: 560px) {
          .bv-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
            padding: 0 8px;
          }
          .bv-card {
            padding: 14px !important;
            border-radius: 16px !important;
            gap: 10px !important;
          }
          .bv-card [class*="heading-strong"] {
            font-size: 0.85rem !important;
            line-height: 1.25 !important;
          }
          .bv-card [class*="body-default"] {
            font-size: 0.72rem !important;
            line-height: 1.55 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 4 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
          }
        }
      `}</style>
    </Column>
  );
}
