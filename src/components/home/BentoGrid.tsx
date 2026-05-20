"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./BentoGrid.module.scss";
import {
  FiSearch,
  FiFolder,
  FiFileText,
  FiStar,
  FiShoppingBag,
  FiHeadphones,
  FiCreditCard,
} from "react-icons/fi";
import { SiRedis, SiMinio, SiWhatsapp, SiRazorpay } from "react-icons/si";

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */
interface CardProps {
  children: React.ReactNode;
  className: string;
  index: number;
  color: string;
}

/* ─────────────────────────────────────────────
   Card wrapper — staggered entrance + hover lift
   ───────────────────────────────────────────── */
function Card({ children, className, index, color }: CardProps) {
  const cFaint = color + "12";
  const cMid = color + "28";
  const cBorder = color + "40";

  return (
    <motion.div
      className={`${styles.card} ${className}`}
      style={
        {
          "--c": color,
          "--cFaint": cFaint,
          "--cMid": cMid,
          "--cBorder": cBorder,
        } as React.CSSProperties
      }
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
    >
      <div className={styles.cardAccent} />
      <div className={styles.cardGlow} />
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Section Header
   ───────────────────────────────────────────── */
function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className={styles.sectionHeader}>
      <div className={styles.headerLeft}>
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Engineering Deep Dives
        </motion.span>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          How I Solve Hard Problems
        </motion.h2>
        <motion.p
          className={styles.subheading}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A look at the technical decisions and architectures that powered real-world systems.
        </motion.p>
      </div>

      <motion.div
        className={styles.counterPill}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.45, delay: 0.25 }}
      >
        <strong>07</strong> Highlights
      </motion.div>

      {/* Animated reveal rule */}
      <motion.div
        className={styles.headerRule}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Card 1 — Strategic Redis Integration
   ───────────────────────────────────────────── */
function RedisCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const bars: { label: string; pct: number }[] = [
    { label: "Cache Hits", pct: 80 },
    { label: "DB Calls", pct: 20 },
    { label: "Latency", pct: 95 },
  ];

  return (
    <Card className={styles.item1} index={0} color="#3b82f6">
      <SiRedis className={styles.bgIcon} />
      <div className={styles.cardContent} ref={ref}>
        <span className={styles.cardTag}>Redis Cache</span>
        <h3>Strategic Redis Integration</h3>
        <p>
          Led the decision to implement distributed caching, slashing DB calls by 80% and delivering
          sub-millisecond response times.
        </p>

        <div className={styles.cacheBars}>
          {bars.map((bar) => (
            <div key={bar.label} className={styles.barRow}>
              <span className={styles.barLabel}>{bar.label}</span>
              <div className={styles.barTrack}>
                <motion.div
                  className={styles.barFill}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${bar.pct}%` } : { width: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                />
              </div>
              <span className={styles.barPct}>{bar.pct}%</span>
            </div>
          ))}
        </div>

        <div className={styles.metricRow}>
          <span className={styles.metricBig}>-80%</span>
          <span className={styles.metricSub}>DB call reduction</span>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Card 2 — AI-Powered Agent Routing
   ───────────────────────────────────────────── */
function AIRoutingCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const nodes = [
    { id: "ai", label: "AI Hub", cx: 90, cy: 30 },
    { id: "r1", label: "Route A", cx: 40, cy: 90 },
    { id: "r2", label: "Route B", cx: 140, cy: 90 },
    { id: "ag", label: "Agent", cx: 90, cy: 145 },
  ];

  const edges = [
    { x1: 90, y1: 38, x2: 40, y2: 82 },
    { x1: 90, y1: 38, x2: 140, y2: 82 },
    { x1: 40, y1: 98, x2: 90, y2: 138 },
    { x1: 140, y1: 98, x2: 90, y2: 138 },
  ];

  return (
    <Card className={styles.item2} index={1} color="#8b5cf6">
      <FiHeadphones className={styles.bgIcon} />
      <div className={styles.cardContent} ref={ref}>
        <span className={styles.cardTag}>AI / ML</span>
        <h3>AI-Powered Agent Routing</h3>
        <p>
          Architected an intelligent routing engine that cut customer query resolve time by 50% via
          contextual NLP classification.
        </p>

        <div className={styles.networkWrap}>
          <svg viewBox="0 0 180 175" className={styles.networkSvg} aria-hidden="true">
            {/* Edges — fade in first */}
            {edges.map((e, i) => (
              <motion.line
                key={i}
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                stroke="#8b5cf6"
                strokeOpacity={0.35}
                strokeWidth={1.5}
                strokeDasharray="4 3"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
              />
            ))}

            {/* Nodes — appear after edges */}
            {nodes.map((n, i) => (
              <motion.g
                key={n.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
                transition={{ duration: 0.35, delay: 0.4 + i * 0.09 }}
              >
                <circle
                  cx={n.cx}
                  cy={n.cy}
                  r={n.id === "ai" ? 14 : 11}
                  fill={n.id === "ai" ? "#8b5cf6" : "#8b5cf620"}
                  stroke="#8b5cf6"
                  strokeWidth={1.5}
                />
                <text
                  x={n.cx}
                  y={n.cy + 4}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize={n.id === "ai" ? "7" : "6"}
                  fontWeight="700"
                >
                  {n.label}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>

        <div className={styles.metricRow}>
          <span className={styles.metricBig}>-50%</span>
          <span className={styles.metricSub}>Resolve time</span>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Card 3 — Reviews AI SaaS (wide)
   ───────────────────────────────────────────── */
function ReviewsCard() {
  return (
    <Card className={styles.item3} index={2} color="#10b981">
      <FiStar className={styles.bgIcon} />
      <div className={styles.cardContent}>
        <span className={styles.cardTag}>AI SaaS</span>
        <div className={styles.wideCardInner}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3>Reviews Next AI SaaS</h3>
            <p>
              Built and launched a complete review management platform, helping businesses boost
              Google reviews by 3× through automated, AI-personalised feedback collection workflows.
            </p>
            <div className={styles.techChips}>
              {["Next.js", "AI / NLP", "TypeScript", "Stripe"].map((t) => (
                <span key={t} className={styles.chip}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.bigMetricBox}>
            <span className={styles.bigMetricNum}>3×</span>
            <span className={styles.bigMetricLabel}>Review Growth</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Card 4 — Full Ecommerce Platform (wide)
   ───────────────────────────────────────────── */
function EcommerceCard() {
  return (
    <Card className={styles.item4} index={3} color="#f59e0b">
      <FiShoppingBag className={styles.bgIcon} />
      <div className={styles.cardContent}>
        <span className={styles.cardTag}>Ecommerce</span>
        <div className={styles.wideCardInner}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3>Full Ecommerce Platform</h3>
            <p>
              Led end-to-end development of a full-stack ecommerce platform with a comprehensive
              admin dashboard, supporting 10K+ daily transactions at scale.
            </p>
            <div className={styles.techChips}>
              {["React Native", "Node.js", "PostgreSQL", "Redis"].map((t) => (
                <span key={t} className={styles.chip}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.bigMetricBox}>
            <span className={styles.bigMetricNum}>10K+</span>
            <span className={styles.bigMetricLabel}>Daily Transactions</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Card 5 — Minio Storage Solution (tall wide)
   ───────────────────────────────────────────── */
function MinioCard() {
  return (
    <Card className={styles.item5} index={4} color="#049EE2">
      <SiMinio className={styles.bgIcon} />
      <div className={styles.cardContent}>
        <span className={styles.cardTag}>Cloud Storage</span>
        <h3>Minio Storage Solution</h3>
        <p>
          Architected a scalable self-hosted object storage system mimicking Google Drive,
          supporting multi-tenant file operations with 99.9% uptime.
        </p>

        {/* Drive Wireframe UI */}
        <div className={styles.driveWireframe}>
          <div className={styles.sidebar}>
            <div className={styles.navItem} />
            <div className={styles.navItem} />
            <div className={styles.navItem} />
          </div>
          <div className={styles.main}>
            <div className={styles.searchBar}>
              <FiSearch size={10} />
              <span className={styles.searchText}>Search files…</span>
            </div>
            <div className={styles.filesGrid}>
              <motion.div
                className={styles.folder}
                whileHover={{ scale: 1.08, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <FiFolder size={15} />
              </motion.div>
              <motion.div
                className={styles.folder}
                whileHover={{ scale: 1.08, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <FiFolder size={15} />
              </motion.div>
              <motion.div
                className={styles.file}
                whileHover={{ scale: 1.08, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <FiFileText size={15} />
              </motion.div>
              <motion.div
                className={styles.file}
                whileHover={{ scale: 1.08, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <FiFileText size={15} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Card 6 — WhatsApp Pipeline
   ───────────────────────────────────────────── */
function WhatsAppCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const bubbles: {
    text: string;
    variant: "in" | "sys" | "out";
    delay: number;
  }[] = [
    { text: "Customer inquiry received", variant: "in", delay: 0.05 },
    { text: "Routing to AI…", variant: "sys", delay: 0.3 },
    { text: "Response dispatched ✓", variant: "out", delay: 0.55 },
  ];

  const variantClass: Record<string, string> = {
    in: styles.bubbleIn,
    sys: styles.bubbleSys,
    out: styles.bubbleOut,
  };

  return (
    <Card className={styles.item6} index={5} color="#25D366">
      <SiWhatsapp className={styles.bgIcon} />
      <div className={styles.cardContent} ref={ref}>
        <span className={styles.cardTag}>Messaging</span>
        <h3>WhatsApp AI Pipeline</h3>
        <p>
          Built a complete WhatsApp messaging pipeline with automated AI routing and rapid response
          dispatch for customer support at scale.
        </p>

        <div className={styles.chatWrap}>
          {bubbles.map((b) => (
            <motion.div
              key={b.text}
              className={`${styles.bubble} ${variantClass[b.variant]}`}
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: b.delay }}
            >
              {b.text}
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Card 7 — Razorpay Gateway
   ───────────────────────────────────────────── */
function RazorpayCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <Card className={styles.item7} index={6} color="#6875F5">
      <SiRazorpay className={styles.bgIcon} />
      <div className={styles.cardContent} ref={ref}>
        <span className={styles.cardTag}>Payments</span>
        <h3>Razorpay Gateway</h3>
        <p>
          Integrated Razorpay payment gateway with webhook handling and reconciliation, achieving a
          99.9% transaction success rate.
        </p>

        <div className={styles.paymentWrap}>
          <motion.div
            className={styles.paymentCard}
            animate={
              inView
                ? {
                    y: [0, -6, 0],
                    transition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
                : {}
            }
          >
            <span className={styles.paymentAmount}>₹ 24,999</span>
            <div className={styles.paymentStatus}>
              <motion.div
                className={styles.paymentCheck}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                  delay: 0.25,
                }}
              >
                ✓
              </motion.div>
              <span>Payment Successful</span>
            </div>
            <span className={styles.paymentMeta}>99.9% success rate</span>
          </motion.div>
        </div>

        <div className={styles.metricRow}>
          <span className={styles.metricBig}>99.9%</span>
          <span className={styles.metricSub}>Success rate</span>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Main Export
   ───────────────────────────────────────────── */
export const BentoGrid = () => {
  return (
    <section className={styles.section}>
      <SectionHeader />
      <div className={styles.bentoGrid}>
        <RedisCard />
        <AIRoutingCard />
        <ReviewsCard />
        <EcommerceCard />
        <MinioCard />
        <WhatsAppCard />
        <RazorpayCard />
      </div>
    </section>
  );
};
