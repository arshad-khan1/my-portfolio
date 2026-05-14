"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { Heading, Text, Column } from "@once-ui-system/core";
import { FiTrendingUp, FiDatabase, FiHeadphones, FiZap } from "react-icons/fi";

interface MetricCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  delay: number;
  color: string;
  className?: string;
}

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const prefix = value.match(/^[^-0-9]*/)?.[0] || "";
  const suffix = value.match(/[^0-9]+$/)?.[0] || "";
  
  const motionValue = useMotionValue(0);
  const displayValue = useTransform(motionValue, (v) => {
    const rounded = Math.round(v);
    if (value.includes("K")) {
      return prefix + (v < 1000 ? Math.floor(v) : (v / 1000).toFixed(1) + "K");
    }
    return prefix + rounded + suffix;
  });
  
  useEffect(() => {
    if (isInView) {
      animate(motionValue, numericValue, {
        duration: 2,
        ease: [0.25, 0.1, 0.25, 1],
      });
    }
  }, [isInView, motionValue, numericValue]);
  
  return (
    <motion.div ref={ref} style={{ display: "inline-block" }}>
      <motion.span>{displayValue}</motion.span>
    </motion.div>
  );
}

function MetricCard({ icon, value, label, description, delay, color, className = "" }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={`im-card ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background: "var(--surface-background, rgba(128, 128, 128, 0.05))",
        border: "1px solid var(--neutral-alpha-weak, rgba(128, 128, 128, 0.15))",
        borderRadius: "24px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "1rem",
        position: "relative",
        overflow: "hidden",
      }}
      whileHover={{
        y: -6,
        boxShadow: `0 20px 40px -12px ${color}30`,
        borderColor: `${color}50`,
      }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ 
          duration: 0.6, 
          delay: delay + 0.2, 
          type: "spring", 
          stiffness: 200,
          damping: 15 
        }}
        style={{
          background: `${color}15`,
          borderRadius: "12px",
          padding: "12px",
          color: color,
          position: "relative",
        }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut" 
          }}
        >
          {icon}
        </motion.div>
      </motion.div>
      <div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.3 }}
          style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}
        >
          <Heading 
            variant="display-strong-xs" 
            style={{ 
              fontSize: "2.5rem", 
              lineHeight: 1.1,
              color: color,
            }}
          >
            <AnimatedNumber value={value} />
          </Heading>
        </motion.div>
        <Text variant="heading-strong-s" style={{ marginTop: "0.5rem", display: "block" }}>
          {label}
        </Text>
        <Text
          variant="body-default-m"
          onBackground="neutral-weak"
          style={{ marginTop: "0.5rem", lineHeight: 1.6 }}
        >
          {description}
        </Text>
      </div>
      
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: delay + 0.5 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          transformOrigin: "center",
        }}
      />
    </motion.div>
  );
}

export function ImpactMetrics() {
  const metrics = [
    {
      icon: <FiDatabase size={24} />,
      value: "-80%",
      label: "Database Cost Reduction",
      description:
        "Strategic Redis caching implementation eliminated redundant DB calls and dramatically reduced infrastructure costs.",
      color: "#3b82f6",
    },
    {
      icon: <FiHeadphones size={24} />,
      value: "-50%",
      label: "Query Resolution Time",
      description:
        "AI-powered intelligent routing system that matches queries to the right agents instantly, cutting resolution time in half.",
      color: "#8b5cf6",
    },
    {
      icon: <FiTrendingUp size={24} />,
      value: "3x",
      label: "Google Reviews Growth",
      description:
        "Built an AI SaaS platform that automated feedback collection, helping businesses triple their review volume.",
      color: "#10b981",
    },
    {
      icon: <FiZap size={24} />,
      value: "10K+",
      label: "Daily Transactions Handled",
      description:
        "Architected a full ecommerce platform with robust admin dashboard, processing thousands of orders daily with 99.9% uptime.",
      color: "#f59e0b",
    },
  ];

  return (
    <Column fillWidth gap="32" paddingY="64" horizontal="center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <Column horizontal="center" gap="12" maxWidth="s" style={{ margin: "0 auto", textAlign: "center" }}>
          <Text
            variant="label-strong-s"
            onBackground="brand-medium"
            style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}
          >
            Real Business Impact
          </Text>
          <Heading as="h2" variant="display-strong-s" wrap="balance">
            Numbers That Speak
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
            I don&apos;t just write code — I deliver measurable outcomes that move the bottom line.
          </Text>
        </Column>
      </motion.div>

      <div className="im-grid">
        {metrics.map((metric, idx) => (
          <MetricCard
            key={metric.label}
            icon={metric.icon}
            value={metric.value}
            label={metric.label}
            description={metric.description}
            delay={idx * 0.15}
            color={metric.color}
          />
        ))}
      </div>

      <style jsx global>{`
        .im-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 16px;
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 560px) {
          .im-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
            padding: 0 8px;
          }
          .im-card {
            padding: 14px !important;
            border-radius: 16px !important;
            gap: 10px !important;
          }
          .im-card [class*="display-strong"] {
            font-size: 1.8rem !important;
          }
          .im-card [class*="body-default"] {
            display: -webkit-box !important;
            -webkit-line-clamp: 3 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            font-size: 0.75rem !important;
          }
          .im-card [class*="heading-strong"] {
            font-size: 0.82rem !important;
          }
        }
      `}</style>
    </Column>
  );
}
