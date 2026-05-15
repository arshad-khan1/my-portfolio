"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface WorkDetailContentProps {
  overview?: string[];
  features?: string[];
  techStack?: string[];
  challenges?: string[];
  learnings?: string[];
  impact?: string[];
  role?: string[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return { ref, inView };
}

/* ─── Section label ─── */
function Label({ children, color = "#049EE2" }: { children: React.ReactNode; color?: string }) {
  return (
    <p
      style={{
        fontSize: "0.65rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.16em",
        color,
        margin: "0 0 14px",
      }}
    >
      {children}
    </p>
  );
}

/* ─── Overview ─── */
function OverviewSection({ items }: { items: string[] }) {
  const { ref, inView } = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE }}
      style={{
        background: "rgba(4,158,226,0.05)",
        border: "1px solid rgba(4,158,226,0.13)",
        borderRadius: 16,
        padding: "22px 26px",
      }}
    >
      <Label>Overview</Label>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#049EE2",
                flexShrink: 0,
                marginTop: 8,
              }}
            />
            <span style={{ fontSize: "0.88rem", lineHeight: 1.65, color: "rgba(240,240,240,0.78)" }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─── Key Features ─── */
function FeaturesSection({ items }: { items: string[] }) {
  const { ref, inView } = useReveal();

  const parsed = items.map((item) => {
    const sep = item.indexOf(" — ");
    if (sep !== -1) return { title: item.slice(0, sep), sub: item.slice(sep + 3) };
    return { title: item, sub: null };
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.04, ease: EASE }}
    >
      <Label>Key Features</Label>
      <div className="wd-features-grid">
        {parsed.map((f, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              padding: "12px 15px",
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "rgba(4,158,226,0.65)",
                flexShrink: 0,
                marginTop: 7,
              }}
            />
            <div>
              <span
                style={{
                  fontSize: "0.82rem",
                  fontWeight: f.sub ? 600 : 400,
                  color: "rgba(240,240,240,0.82)",
                  lineHeight: 1.4,
                  display: "block",
                }}
              >
                {f.title}
              </span>
              {f.sub && (
                <span
                  style={{
                    fontSize: "0.74rem",
                    color: "rgba(240,240,240,0.42)",
                    lineHeight: 1.5,
                    display: "block",
                    marginTop: 2,
                  }}
                >
                  {f.sub}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Tech Stack ─── */
const CHIP_PALETTE = [
  { bg: "rgba(4,158,226,0.1)",   border: "rgba(4,158,226,0.28)",   text: "#17C0FD" },
  { bg: "rgba(139,92,246,0.1)",  border: "rgba(139,92,246,0.28)",  text: "#a78bfa" },
  { bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.28)",  text: "#34d399" },
  { bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.28)",  text: "#fbbf24" },
  { bg: "rgba(236,72,153,0.1)",  border: "rgba(236,72,153,0.28)",  text: "#f472b6" },
  { bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.28)",  text: "#93c5fd" },
] as const;

function TechStackSection({ items }: { items: string[] }) {
  const { ref, inView } = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.06, ease: EASE }}
    >
      <Label>Tech Stack</Label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {items.map((tech, i) => {
          const c = CHIP_PALETTE[i % CHIP_PALETTE.length];
          return (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 13px",
                background: c.bg,
                border: `1px solid ${c.border}`,
                borderRadius: 8,
                fontSize: "0.78rem",
                fontWeight: 600,
                color: c.text,
                letterSpacing: "0.01em",
              }}
            >
              <span
                style={{ width: 4, height: 4, borderRadius: "50%", background: c.text, flexShrink: 0 }}
              />
              {tech}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Challenges + Learnings side by side ─── */
function ChallengesLearnings({
  challenges,
  learnings,
}: {
  challenges?: string[];
  learnings?: string[];
}) {
  const { ref, inView } = useReveal();
  const hasBoth = !!(challenges?.length && learnings?.length);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
      className={hasBoth ? "wd-dual-grid" : undefined}
    >
      {challenges && challenges.length > 0 && (
        <div
          style={{
            background: "rgba(239,68,68,0.04)",
            border: "1px solid rgba(239,68,68,0.13)",
            borderLeft: "3px solid rgba(239,68,68,0.45)",
            borderRadius: "0 12px 12px 0",
            padding: "20px 20px",
          }}
        >
          <Label color="rgba(239,68,68,0.85)">Challenges</Label>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {challenges.map((item, i) => (
              <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "rgba(239,68,68,0.7)", flexShrink: 0, fontSize: "0.7rem", marginTop: 3, fontWeight: 700 }}>
                  ⚡
                </span>
                <span style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "rgba(240,240,240,0.72)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {learnings && learnings.length > 0 && (
        <div
          style={{
            background: "rgba(16,185,129,0.04)",
            border: "1px solid rgba(16,185,129,0.13)",
            borderLeft: "3px solid rgba(16,185,129,0.45)",
            borderRadius: "0 12px 12px 0",
            padding: "20px 20px",
          }}
        >
          <Label color="rgba(16,185,129,0.85)">Learnings</Label>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {learnings.map((item, i) => (
              <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "rgba(16,185,129,0.8)", flexShrink: 0, fontSize: "0.75rem", marginTop: 3, fontWeight: 700 }}>
                  →
                </span>
                <span style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "rgba(240,240,240,0.72)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Impact / Results ─── */
function ImpactSection({ items }: { items: string[] }) {
  const { ref, inView } = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
      style={{
        background: "linear-gradient(135deg, rgba(4,158,226,0.09) 0%, rgba(4,158,226,0.03) 100%)",
        border: "1px solid rgba(4,158,226,0.22)",
        borderRadius: 16,
        padding: "22px 26px",
      }}
    >
      <Label>Impact & Results</Label>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ color: "#17C0FD", flexShrink: 0, fontSize: "0.7rem", marginTop: 4, fontWeight: 700 }}>
              ✦
            </span>
            <span style={{ fontSize: "0.88rem", fontWeight: 500, lineHeight: 1.65, color: "rgba(240,240,240,0.88)" }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─── Role / Contribution ─── */
function RoleSection({ items }: { items: string[] }) {
  const { ref, inView } = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.06, ease: EASE }}
      style={{
        background: "rgba(139,92,246,0.05)",
        border: "1px solid rgba(139,92,246,0.15)",
        borderRadius: 16,
        padding: "22px 26px",
      }}
    >
      <Label color="rgba(167,139,250,0.9)">My Contribution</Label>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span
              style={{
                width: 17,
                height: 17,
                borderRadius: "50%",
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.35)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 1,
                fontSize: "0.6rem",
                fontWeight: 700,
                color: "rgba(167,139,250,0.9)",
              }}
            >
              ✓
            </span>
            <span style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "rgba(240,240,240,0.75)" }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─── Root export ─── */
export function WorkDetailContent({
  overview,
  features,
  techStack,
  challenges,
  learnings,
  impact,
  role,
}: WorkDetailContentProps) {
  const hasChallenges = !!(challenges?.length);
  const hasLearnings = !!(learnings?.length);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
      {overview?.length   ? <OverviewSection items={overview} />             : null}
      {features?.length   ? <FeaturesSection items={features} />             : null}
      {techStack?.length  ? <TechStackSection items={techStack} />           : null}
      {(hasChallenges || hasLearnings) && (
        <ChallengesLearnings challenges={challenges} learnings={learnings} />
      )}
      {impact?.length     ? <ImpactSection items={impact} />                 : null}
      {role?.length       ? <RoleSection items={role} />                     : null}
    </div>
  );
}
