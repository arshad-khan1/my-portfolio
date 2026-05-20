"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./PinnacleGrid.module.scss";
import {
  FiServer,
  FiCloud,
  FiTerminal,
  FiShield,
  FiLock,
  FiCreditCard,
  FiRadio,
  FiLayers,
  FiCheck,
  FiClock,
  FiUser,
  FiArrowRight,
  FiUploadCloud,
  FiFolder,
  FiFileText,
} from "react-icons/fi";
import { SiWhatsapp, SiMinio } from "react-icons/si";

/* ─────────────────────────────────────────────
   Card wrapper
   ───────────────────────────────────────────── */
interface CardProps {
  children: React.ReactNode;
  className: string;
  index: number;
  color: string;
}

function Card({ children, className, index, color }: CardProps) {
  return (
    <motion.div
      className={`${styles.card} ${className}`}
      style={
        {
          "--c": color,
          "--cFaint": `${color}12`,
          "--cMid": `${color}28`,
          "--cBorder": `${color}40`,
        } as React.CSSProperties
      }
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
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
          Pinnacle Teleservices · 2024 – Present
        </motion.span>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          What I Built
        </motion.h2>
        <motion.p
          className={styles.subheading}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A breakdown of the systems, pipelines, and infrastructure I designed
          and shipped at Pinnacle.
        </motion.p>
      </div>

      <motion.div
        className={styles.counterPill}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.45, delay: 0.25 }}
      >
        <strong>08</strong> Implementations
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

/* ─────────────────────────────────────────────
   Card 1 — Garage S3 Storage (tall)
   ───────────────────────────────────────────── */
function GarageCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const buckets = [
    { name: "media-uploads", size: "4.2 GB", primary: true },
    { name: "docs-attachments", size: "1.8 GB", primary: false },
    { name: "profile-assets", size: "640 MB", primary: false },
  ];

  return (
    <Card className={styles.item1} index={0} color="#049EE2">
      <SiMinio className={styles.bgIcon} />
      <div className={styles.cardContent} ref={ref}>
        <span className={styles.cardTag}>Cloud Storage</span>
        <h3>Garage — S3 Storage Server</h3>
        <p>
          Set up a self-hosted S3-compatible object storage using Garage,
          replacing cloud buckets with a server-owned solution for secure
          multi-tenant file management.
        </p>

        <div className={styles.storageWireframe}>
          <div className={styles.storageSidebar}>
            <div className={styles.storageNavItem} />
            <div className={styles.storageNavItem} />
            <div className={styles.storageNavItem} />
          </div>
          <div className={styles.storageBuckets}>
            {buckets.map((b, i) => (
              <motion.div
                key={b.name}
                className={`${styles.storageBucket} ${b.primary ? "" : styles.secondary}`}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              >
                <FiFolder size={9} />
                <span>{b.name}</span>
                <span className={styles.storageBadge}>{b.size}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div
          className={styles.techChips}
          style={{ marginTop: "auto", paddingTop: "10px" }}
        >
          {["Garage", "S3 API", "MinIO-compat", "Multi-tenant"].map((t) => (
            <span key={t} className={styles.chip}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Card 2 — WhatsApp Messaging Pipeline (tall)
   ───────────────────────────────────────────── */
function WhatsAppPipelineCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const flows = [
    {
      label: "Outbound",
      desc: "App → WhatsApp",
      variant: "out" as const,
      delay: 0.1,
    },
    {
      label: "Routing…",
      desc: "Webhook handler",
      variant: "sys" as const,
      delay: 0.35,
    },
    {
      label: "Inbound ✓",
      desc: "WhatsApp → App",
      variant: "in" as const,
      delay: 0.6,
    },
    {
      label: "📢 Broadcast",
      desc: "Template blast",
      variant: "out" as const,
      delay: 0.85,
    },
  ];

  const variantClass = {
    in: styles.bubbleIn,
    sys: styles.bubbleSys,
    out: styles.bubbleOut,
  };

  return (
    <Card className={styles.item2} index={1} color="#25D366">
      <SiWhatsapp className={styles.bgIcon} />
      <div className={styles.cardContent} ref={ref}>
        <span className={styles.cardTag}>Messaging</span>
        <h3>WhatsApp Messaging Pipeline</h3>
        <p>
          End-to-end pipeline for outbound messages, inbound webhook handling,
          and template broadcasting — both direct and bulk.
        </p>

        <div className={styles.chatWrap}>
          {flows.map((f) => (
            <motion.div
              key={f.label}
              className={`${styles.bubble} ${variantClass[f.variant]}`}
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: f.delay }}
            >
              <strong>{f.label}</strong>&ensp;
              <span style={{ opacity: 0.6, fontSize: "0.62rem" }}>
                {f.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Card 3 — Centralized Logging / Winston (tall)
   ───────────────────────────────────────────── */
function LoggingCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const logs: {
    level: "info" | "warn" | "error";
    msg: string;
    delay: number;
  }[] = [
    { level: "info", msg: "Server started on :3000", delay: 0.1 },
    { level: "info", msg: "DB connection established", delay: 0.28 },
    { level: "warn", msg: "Rate limit 85% — /api/messages", delay: 0.46 },
    { level: "error", msg: "Webhook signature mismatch", delay: 0.64 },
    { level: "info", msg: "Retrying… success ✓", delay: 0.82 },
  ];

  return (
    <Card className={styles.item3} index={2} color="#f59e0b">
      <FiTerminal className={styles.bgIcon} />
      <div className={styles.cardContent} ref={ref}>
        <span className={styles.cardTag}>Observability</span>
        <h3>Centralized Logging — Winston</h3>
        <p>
          Unified logging pipeline using Winston with structured JSON output,
          log levels, and transport routing for production observability.
        </p>

        <div className={styles.terminal}>
          <div className={styles.terminalHeader}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
          <div className={styles.terminalBody}>
            {logs.map((log) => (
              <motion.div
                key={log.msg}
                className={styles.logLine}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, delay: log.delay }}
              >
                <span className={`${styles.logLevel} ${styles[log.level]}`}>
                  {log.level.toUpperCase()}
                </span>
                <span className={styles.logMsg}>{log.msg}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Card 4 — Deployment Pipeline (wide)
   ───────────────────────────────────────────── */
function DeploymentCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const steps = [
    { icon: <FiFileText size={14} />, label: "Code" },
    { icon: <FiServer size={14} />, label: "Build" },
    { icon: <FiCheck size={14} />, label: "Test" },
    { icon: <FiUploadCloud size={14} />, label: "Deploy BE" },
    { icon: <FiCloud size={14} />, label: "Deploy FE" },
    { icon: <FiCheck size={14} />, label: "Live ✓" },
  ];

  return (
    <Card className={styles.item4} index={3} color="#3b82f6">
      <FiCloud className={styles.bgIcon} />
      <div className={styles.cardContent} ref={ref}>
        <span className={styles.cardTag}>DevOps</span>
        <div className={styles.wideCardInner}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3>Backend + Frontend Deployment</h3>
            <p>
              Configured and deployed separate backend (NestJS) and frontend
              (Next.js) services on the server, with environment management,
              process supervision, and zero-downtime deploys.
            </p>
            <div className={styles.techChips}>
              {["NestJS", "Next.js", "PM2", "Nginx", "Docker"].map((t) => (
                <span key={t} className={styles.chip}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.pipeline}>
          {steps.map((step, i) => (
            <div
              key={step.label}
              style={{ display: "flex", alignItems: "center" }}
            >
              <motion.div
                className={styles.pipelineStep}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.15 + i * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <div className={styles.stepCircle}>{step.icon}</div>
                <span className={styles.stepLabel}>{step.label}</span>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  className={styles.pipelineArrow}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  style={{ transformOrigin: "left" }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Card 5 — Conversation Handling Logic
   ───────────────────────────────────────────── */
function ConversationCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const nodes = [
    { id: "msg", label: "Incoming Msg", cx: 90, cy: 22 },
    { id: "avail", label: "Agent Free?", cx: 90, cy: 72 },
    { id: "hours", label: "Work Hours?", cx: 40, cy: 122 },
    { id: "assign", label: "Assign Agent", cx: 140, cy: 122 },
    { id: "queue", label: "Queue", cx: 40, cy: 168 },
    { id: "auto", label: "Auto-Reply", cx: 90, cy: 168 },
  ];

  const edges = [
    { x1: 90, y1: 32, x2: 90, y2: 62 },
    { x1: 90, y1: 82, x2: 40, y2: 112, label: "No", lx: 58, ly: 95 },
    { x1: 90, y1: 82, x2: 140, y2: 112, label: "Yes", lx: 122, ly: 95 },
    { x1: 40, y1: 132, x2: 40, y2: 158 },
    { x1: 40, y1: 132, x2: 90, y2: 158, label: "No" },
  ];

  const nodeColors: Record<string, string> = {
    msg: "#3b82f6",
    avail: "#8b5cf6",
    hours: "#f59e0b",
    assign: "#10b981",
    queue: "#f59e0b",
    auto: "#ef4444",
  };

  return (
    <Card className={styles.item5} index={4} color="#8b5cf6">
      <FiLayers className={styles.bgIcon} />
      <div className={styles.cardContent} ref={ref}>
        <span className={styles.cardTag}>Logic</span>
        <h3>Conversation Handling</h3>
        <p>
          Routing engine based on agent availability, working hours, and contact
          rules — auto-assigns or queues conversations intelligently.
        </p>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "8px",
          }}
        >
          <svg
            viewBox="0 0 180 192"
            style={{ width: "100%", maxWidth: "180px" }}
            aria-hidden="true"
          >
            {edges.map((e, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.08 }}
              >
                <line
                  x1={e.x1}
                  y1={e.y1}
                  x2={e.x2}
                  y2={e.y2}
                  stroke="#8b5cf660"
                  strokeWidth={1.5}
                  strokeDasharray="3 2"
                />
                {e.label && (
                  <text
                    x={e.lx ?? (e.x1 + e.x2) / 2}
                    y={e.ly ?? (e.y1 + e.y2) / 2}
                    fontSize="6"
                    fill="#8b5cf6"
                    textAnchor="middle"
                    fontWeight="600"
                  >
                    {e.label}
                  </text>
                )}
              </motion.g>
            ))}
            {nodes.map((n, i) => (
              <motion.g
                key={n.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
              >
                <rect
                  x={n.cx - 28}
                  y={n.cy - 9}
                  width={56}
                  height={18}
                  rx={5}
                  fill={`${nodeColors[n.id]}20`}
                  stroke={`${nodeColors[n.id]}60`}
                  strokeWidth={1}
                />
                <text
                  x={n.cx}
                  y={n.cy + 4}
                  textAnchor="middle"
                  fill={nodeColors[n.id]}
                  fontSize="6.5"
                  fontWeight="700"
                >
                  {n.label}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Card 6 — Login + Protected Routes
   ───────────────────────────────────────────── */
function AuthCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const steps = [
    { icon: <FiUser size={12} />, label: "Login Form", delay: 0.1 },
    { icon: <FiCheck size={12} />, label: "Validate Credentials", delay: 0.3 },
    { icon: <FiLock size={12} />, label: "Issue JWT Token", delay: 0.5 },
  ];

  return (
    <Card className={styles.item6} index={5} color="#10b981">
      <FiShield className={styles.bgIcon} />
      <div className={styles.cardContent} ref={ref}>
        <span className={styles.cardTag}>Auth</span>
        <h3>Login + Protected Routes</h3>
        <p>
          Next.js authentication with JWT, middleware-based route protection,
          and role-gated access for multi-tenant dashboards.
        </p>

        <div className={styles.authFlow}>
          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: s.delay }}
            >
              <div className={styles.authStep}>
                <div className={styles.authIcon}>{s.icon}</div>
                <span className={styles.authLabel}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className={styles.authArrow} />}
            </motion.div>
          ))}
          <motion.div
            className={styles.authResult}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <FiShield size={14} color="#10b981" />
            <span className={styles.authResultLabel}>Protected Route ✓</span>
          </motion.div>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Card 7 — Wallet + Spend Policy
   ───────────────────────────────────────────── */
function WalletCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const policies = [
    { label: "Daily Spend", pct: 62, limit: "₹5,000" },
    { label: "Per Message", pct: 30, limit: "₹0.80" },
  ];

  return (
    <Card className={styles.item7} index={6} color="#f43f5e">
      <FiCreditCard className={styles.bgIcon} />
      <div className={styles.cardContent} ref={ref}>
        <span className={styles.cardTag}>Finance</span>
        <h3>Wallet + Spend Policy</h3>
        <p>
          Built wallet top-up, deduction on message send, and configurable
          per-account spend policies with daily caps and per-unit limits.
        </p>

        <div className={styles.walletCard}>
          <div>
            <motion.div
              className={styles.walletBalance}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              ₹ 3,240
            </motion.div>
            <div className={styles.walletBalanceSub}>Available Balance</div>
          </div>
          {policies.map((p, i) => (
            <div key={p.label} className={styles.spendBar}>
              <div className={styles.spendBarLabel}>
                <span>{p.label}</span>
                <span>{p.limit}</span>
              </div>
              <div className={styles.spendBarTrack}>
                <motion.div
                  className={styles.spendBarFill}
                  style={{ width: `${p.pct}%` }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${p.pct}%` } : { width: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.15,
                    ease: "easeOut",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Card 8 — Template Broadcasting
   ───────────────────────────────────────────── */
function BroadcastCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const recipients = [
    { cx: 155, cy: 30 },
    { cx: 170, cy: 75 },
    { cx: 155, cy: 120 },
    { cx: 130, cy: 155 },
    { cx: 90, cy: 168 },
    { cx: 50, cy: 155 },
    { cx: 25, cy: 120 },
    { cx: 10, cy: 75 },
    { cx: 25, cy: 30 },
  ];

  return (
    <Card className={styles.item8} index={7} color="#06b6d4">
      <FiRadio className={styles.bgIcon} />
      <div className={styles.cardContent} ref={ref}>
        <span className={styles.cardTag}>Broadcast</span>
        <h3>Template Broadcasting</h3>
        <p>
          Bulk WhatsApp template dispatch to contact lists — supports variable
          substitution, scheduling, and delivery tracking.
        </p>

        <div className={styles.broadcastWrap}>
          <svg
            viewBox="0 0 180 180"
            className={styles.broadcastSvg}
            aria-hidden="true"
          >
            {/* Lines from center to recipients */}
            {recipients.map((r, i) => (
              <motion.line
                key={i}
                x1={90}
                y1={90}
                x2={r.cx}
                y2={r.cy}
                stroke="#06b6d440"
                strokeWidth={1.5}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
              />
            ))}

            {/* Center source */}
            <motion.circle
              cx={90}
              cy={90}
              r={18}
              fill="#06b6d420"
              stroke="#06b6d4"
              strokeWidth={1.5}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              style={{ transformOrigin: "90px 90px" }}
              transition={{
                duration: 0.4,
                delay: 0.05,
                type: "spring",
                stiffness: 200,
              }}
            />
            <text
              x={90}
              y={87}
              textAnchor="middle"
              fill="#06b6d4"
              fontSize="6.5"
              fontWeight="700"
            >
              Template
            </text>
            <text
              x={90}
              y={96}
              textAnchor="middle"
              fill="#06b6d4"
              fontSize="6.5"
              fontWeight="700"
            >
              Broadcast
            </text>

            {/* Recipient dots */}
            {recipients.map((r, i) => (
              <motion.circle
                key={i}
                cx={r.cx}
                cy={r.cy}
                r={8}
                fill="#06b6d415"
                stroke="#06b6d450"
                strokeWidth={1}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                style={{ transformOrigin: `${r.cx}px ${r.cy}px` }}
                transition={{
                  duration: 0.3,
                  delay: 0.3 + i * 0.06,
                  type: "spring",
                  stiffness: 250,
                }}
              />
            ))}
          </svg>
        </div>

        <div className={styles.metricRow}>
          <span className={styles.metricBig}>N→∞</span>
          <span className={styles.metricSub}>Bulk delivery</span>
        </div>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────
   Main Export
   ───────────────────────────────────────────── */
export function PinnacleGrid() {
  return (
    <section className={styles.section} id="what-i-built">
      <SectionHeader />
      <div className={styles.bentoGrid}>
        <GarageCard />
        <WhatsAppPipelineCard />
        <LoggingCard />
        <DeploymentCard />
        <ConversationCard />
        <AuthCard />
        <WalletCard />
        <BroadcastCard />
      </div>
    </section>
  );
}
