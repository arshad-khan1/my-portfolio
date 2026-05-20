"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";

function useCardNav(slug: string) {
  const router = useRouter();
  return {
    onClick: (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) return;
      router.push(`/work/${slug}`);
    },
  };
}
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */
export type ProjectData = {
  slug: string;
  metadata: {
    title: string;
    summary: string;
    images: string[];
    badge?: string;
    live?: string;
    github?: string;
    publishedAt: string;
  };
};

interface WorkContentProps {
  saas: ProjectData[];
  clients: ProjectData[];
  personal: ProjectData[];
}

/* ─────────────────────────────────────────────
   Shared animation helpers
   ───────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: EASE },
  }),
};

/* ─────────────────────────────────────────────
   Floating orb (reused from HeroSection pattern)
   ───────────────────────────────────────────── */
function FloatingOrb({
  x,
  y,
  size,
  color,
  delay,
}: {
  x: string;
  y: string;
  size: number;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: `blur(${size * 0.6}px)`,
        pointerEvents: "none",
      }}
      animate={{
        x: [0, 25, -18, 0],
        y: [0, -35, 15, 0],
        scale: [1, 1.15, 0.92, 1],
      }}
      transition={{
        duration: 9 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   Section header (matches BentoGrid pattern)
   ───────────────────────────────────────────── */
function SectionHeader({
  eyebrow,
  heading,
  subtext,
  count,
  countLabel,
}: {
  eyebrow: string;
  heading: string;
  subtext?: string;
  count: number;
  countLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const num = String(count).padStart(2, "0");

  return (
    <div ref={ref} style={{ position: "relative", paddingBottom: 28, marginBottom: 36 }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <motion.span
            style={{
              display: "block",
              fontSize: "0.72rem",
              color: "#049EE2",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontWeight: 600,
              marginBottom: 10,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            {eyebrow}
          </motion.span>
          <motion.h2
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: "0 0 12px",
              color: "var(--neutral-on-background-strong, #f0f0f0)",
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
          >
            {heading}
          </motion.h2>
          {subtext && (
            <motion.p
              style={{
                fontSize: "0.875rem",
                color: "var(--neutral-on-background-weak, rgba(240,240,240,0.55))",
                maxWidth: 460,
                lineHeight: 1.55,
                margin: 0,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {subtext}
            </motion.p>
          )}
        </div>

        <motion.div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            border: "1px solid var(--neutral-alpha-medium, rgba(255,255,255,0.12))",
            borderRadius: 100,
            padding: "8px 18px",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--neutral-on-background-weak, rgba(240,240,240,0.55))",
            flexShrink: 0,
            whiteSpace: "nowrap",
            background: "var(--neutral-alpha-weak, rgba(255,255,255,0.04))",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.45, delay: 0.25 }}
        >
          <strong
            style={{
              fontSize: "1.15rem",
              fontWeight: 800,
              color: "#049EE2",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {num}
          </strong>
          {countLabel}
        </motion.div>
      </div>

      {/* Gradient rule */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, #049EE2 0%, rgba(4,158,226,0.3) 50%, transparent 100%)",
          transformOrigin: "left center",
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.75, delay: 0.3, ease: EASE }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Browser chrome mockup wrapper
   ───────────────────────────────────────────── */
function BrowserChrome({
  children,
  url,
}: {
  children: React.ReactNode;
  url?: string;
}) {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(0,0,0,0.3)",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          height: 32,
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 6,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#ff5f57",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#febc2e",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#28c840",
            flexShrink: 0,
          }}
        />
        {url && (
          <div
            style={{
              flex: 1,
              marginLeft: 8,
              height: 18,
              borderRadius: 4,
              background: "rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.35)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {url.replace(/^https?:\/\//, "")}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Image with fallback gradient
   ───────────────────────────────────────────── */
function ProjectImage({
  src,
  alt,
  accentColor,
  style,
}: {
  src?: string;
  alt: string;
  accentColor: string;
  style?: React.CSSProperties;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          ...style,
        }}
        loading="lazy"
      />
    );
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(135deg, ${accentColor}20 0%, ${accentColor}08 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <div style={{ fontSize: "2rem", opacity: 0.25 }}>&#x25A6;</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION
   ───────────────────────────────────────────── */
function WorkHero({
  totalCount,
  clientCount,
  saasCount,
}: {
  totalCount: number;
  clientCount: number;
  saasCount: number;
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  return (
    <section
      style={{
        minHeight: "60vh",
        width: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        isolation: "isolate",
        paddingTop: "6rem",
        paddingBottom: "4rem",
      }}
    >
      {/* Background orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <FloatingOrb x="5%" y="10%" size={380} color="rgba(4,158,226,0.09)" delay={0} />
        <FloatingOrb x="70%" y="60%" size={450} color="rgba(23,192,253,0.06)" delay={2} />
        <FloatingOrb x="80%" y="5%" size={280} color="rgba(4,158,226,0.07)" delay={4} />
      </div>

      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(4,158,226,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(4,158,226,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        {/* Badge */}
        <motion.div variants={fadeUp} custom={0} style={{ marginBottom: "1.4rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 18px",
              background: "rgba(4,158,226,0.08)",
              border: "1px solid rgba(4,158,226,0.25)",
              borderRadius: 100,
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#049EE2",
                boxShadow: "0 0 8px #049EE2",
                flexShrink: 0,
              }}
            />
            My Work
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          custom={1}
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            margin: "0 0 1rem",
            background: "linear-gradient(135deg, #fff 30%, #82F1FC 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Projects &amp; Products
        </motion.h1>

        {/* Subline */}
        <motion.p
          variants={fadeUp}
          custom={2}
          style={{
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            lineHeight: 1.75,
            color: "var(--neutral-on-background-weak, rgba(240,240,240,0.55))",
            margin: "0 auto 2rem",
            maxWidth: 560,
          }}
        >
          From SaaS products to client delivery &mdash; everything I&apos;ve shipped.
        </motion.p>

        {/* Stat chips */}
        <motion.div
          variants={fadeUp}
          custom={3}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: "1.6rem",
          }}
        >
          {[
            { val: totalCount, label: "Total Projects" },
            { val: clientCount, label: "Client Projects" },
            { val: saasCount, label: "SaaS Products" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                padding: "10px 20px",
                background: "rgba(128,128,128,0.05)",
                border: "1px solid rgba(128,128,128,0.15)",
                borderRadius: 12,
                textAlign: "center",
                minWidth: 100,
              }}
            >
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "#17C0FD",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  color: "rgba(240,240,240,0.45)",
                  marginTop: 4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Anchor scroll chips */}
        <motion.div
          variants={fadeUp}
          custom={4}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Products & SaaS", href: "#saas" },
            { label: "Client Engagements", href: "#engagements" },
            { label: "Personal Projects", href: "#personal" },
          ].map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "9px 18px",
                background: "rgba(4,158,226,0.06)",
                border: "1px solid rgba(4,158,226,0.2)",
                borderRadius: 10,
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#17C0FD",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              whileHover={{
                background: "rgba(4,158,226,0.12)",
                borderColor: "rgba(4,158,226,0.4)",
                y: -2,
              }}
              whileTap={{ scale: 0.97 }}
            >
              {link.label}
              <FiArrowRight size={13} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SAAS SECTION
   ───────────────────────────────────────────── */
function SaaSCard({ project, index }: { project: ProjectData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const img = project.metadata.images?.[0];
  const { onClick } = useCardNav(project.slug);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: EASE }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      onClick={onClick}
      style={{
        display: "flex",
        gap: 32,
        padding: 32,
        background: "rgba(128,128,128,0.05)",
        border: "1px solid rgba(128,128,128,0.15)",
        borderRadius: 24,
        position: "relative",
        overflow: "hidden",
        minHeight: 220,
        cursor: "pointer",
      }}
      className="saas-card"
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, #049EE2 0%, #17C0FD 60%, transparent 100%)",
          borderRadius: "24px 24px 0 0",
        }}
      />

      {/* Left: content */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.62rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "3px 10px",
              borderRadius: 5,
              background: "rgba(4,158,226,0.12)",
              border: "1px solid rgba(4,158,226,0.3)",
              color: "#17C0FD",
            }}
          >
            {project.metadata.badge || "SaaS"}
          </span>
        </div>

        {/* Title */}
        <a href={`/work/${project.slug}`} style={{ textDecoration: "none" }}>
          <h3
            style={{
              fontSize: "1.6rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "var(--neutral-on-background-strong, #f0f0f0)",
              lineHeight: 1.1,
            }}
          >
            {project.metadata.title}
          </h3>
        </a>

        {/* Summary */}
        <p
          style={{
            fontSize: "0.875rem",
            lineHeight: 1.7,
            color: "var(--neutral-on-background-weak, rgba(240,240,240,0.55))",
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.metadata.summary}
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: "auto",
            flexWrap: "wrap",
          }}
        >
          {project.metadata.live && (
            <motion.a
              href={project.metadata.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "9px 18px",
                background: "linear-gradient(135deg, #17C0FD 0%, #049EE2 100%)",
                color: "#fff",
                borderRadius: 10,
                fontSize: "0.82rem",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 0 20px rgba(4,158,226,0.3)",
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 30px rgba(4,158,226,0.5)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <FiExternalLink size={13} />
              Live Site
            </motion.a>
          )}
          {project.metadata.github && (
            <motion.a
              href={project.metadata.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "9px 18px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(240,240,240,0.7)",
                borderRadius: 10,
                fontSize: "0.82rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
              whileHover={{
                background: "rgba(255,255,255,0.1)",
                borderColor: "rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <FiGithub size={13} />
              GitHub
            </motion.a>
          )}
          <motion.a
            href={`/work/${project.slug}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 18px",
              background: "transparent",
              border: "1px solid rgba(128,128,128,0.2)",
              color: "rgba(240,240,240,0.5)",
              borderRadius: 10,
              fontSize: "0.82rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
            whileHover={{
              borderColor: "rgba(4,158,226,0.4)",
              color: "#17C0FD",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Details
            <FiArrowRight size={13} />
          </motion.a>
        </div>
      </div>

      {/* Right: screenshot in browser chrome */}
      <div style={{ width: 300, flexShrink: 0, alignSelf: "center" }} className="saas-screenshot">
        <BrowserChrome url={project.metadata.live}>
          <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
            <ProjectImage
              src={img}
              alt={project.metadata.title}
              accentColor="#049EE2"
              style={{ height: 160, objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </BrowserChrome>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .saas-card {
            flex-direction: column !important;
          }
          .saas-screenshot {
            width: 100% !important;
          }
        }
      `}</style>
    </motion.div>
  );
}

function SaaSSection({ projects }: { projects: ProjectData[] }) {
  return (
    <section
      id="saas"
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 16px 80px",
      }}
    >
      <SectionHeader
        eyebrow="Products"
        heading="SaaS & Shipped Products"
        subtext="Live platforms and SaaS tools built from zero to launch."
        count={projects.length}
        countLabel="Products"
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {projects.map((p, i) => (
          <SaaSCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CLIENT ENGAGEMENTS SECTION
   ───────────────────────────────────────────── */
const CLIENT_ACCENT_COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];

function EngagementCard({
  project,
  index,
}: {
  project: ProjectData;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const accent = CLIENT_ACCENT_COLORS[index % CLIENT_ACCENT_COLORS.length];
  const img = project.metadata.images?.[0];
  const cFaint = accent + "12";
  const cBorder = accent + "35";
  const { onClick } = useCardNav(project.slug);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: EASE }}
      whileHover={{
        y: -4,
        boxShadow: `0 24px 60px -20px ${accent}40`,
        borderColor: `${accent}50`,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      onClick={onClick}
      style={{
        background: "rgba(128,128,128,0.05)",
        border: `1px solid rgba(128,128,128,0.15)`,
        borderRadius: 24,
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${accent} 0%, transparent 100%)`,
          zIndex: 3,
        }}
      />

      {/* Image area with browser chrome */}
      <BrowserChrome url={project.metadata.live}>
        <div
          style={{
            aspectRatio: "16/10",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <ProjectImage
            src={img}
            alt={project.metadata.title}
            accentColor={accent}
            style={{ height: "100%" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.55) 100%)`,
              pointerEvents: "none",
            }}
          />
        </div>
      </BrowserChrome>

      {/* Body */}
      <div
        style={{
          padding: "20px 24px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
        }}
      >
        {/* Category tag */}
        <span
          style={{
            display: "inline-block",
            fontSize: "0.6rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            padding: "3px 9px",
            borderRadius: 5,
            background: cFaint,
            border: `1px solid ${cBorder}`,
            color: accent,
            alignSelf: "flex-start",
          }}
        >
          {project.metadata.badge || "Website"}
        </span>

        {/* Title */}
        <a href={`/work/${project.slug}`} style={{ textDecoration: "none" }}>
          <h3
            style={{
              fontSize: "1.15rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              margin: 0,
              color: "var(--neutral-on-background-strong, #f0f0f0)",
              lineHeight: 1.25,
            }}
          >
            {project.metadata.title}
          </h3>
        </a>

        {/* Summary */}
        <p
          style={{
            fontSize: "0.82rem",
            lineHeight: 1.6,
            color: "var(--neutral-on-background-weak, rgba(240,240,240,0.55))",
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.metadata.summary}
        </p>

        {/* Links */}
        <div style={{ marginTop: "auto", display: "flex", gap: 10, paddingTop: 8 }}>
          {project.metadata.live && (
            <motion.a
              href={project.metadata.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.8rem",
                fontWeight: 600,
                color: accent,
                textDecoration: "none",
                padding: "6px 12px",
                background: cFaint,
                borderRadius: 8,
                border: `1px solid ${cBorder}`,
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View Live
              <FiArrowRight size={12} />
            </motion.a>
          )}
          <motion.a
            href={`/work/${project.slug}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "rgba(240,240,240,0.45)",
              textDecoration: "none",
              padding: "6px 12px",
              background: "transparent",
              borderRadius: 8,
              border: "1px solid rgba(128,128,128,0.2)",
            }}
            whileHover={{
              color: "rgba(240,240,240,0.8)",
              borderColor: "rgba(128,128,128,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Case Study
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

function EngagementsSection({ projects }: { projects: ProjectData[] }) {
  return (
    <section
      id="engagements"
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 16px 80px",
      }}
    >
      <SectionHeader
        eyebrow="Projects"
        heading="Client Engagements"
        subtext="Websites and platforms delivered for real businesses."
        count={projects.length}
        countLabel="Clients"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
        }}
        className="engagements-grid"
      >
        {projects.map((p, i) => (
          <EngagementCard key={p.slug} project={p} index={i} />
        ))}
      </div>
      <style jsx global>{`
        @media (max-width: 700px) {
          .engagements-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PERSONAL PROJECTS SECTION
   ───────────────────────────────────────────── */
const PERSONAL_ACCENT_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#f43f5e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
];

function PersonalCard({
  project,
  index,
}: {
  project: ProjectData;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const accent = PERSONAL_ACCENT_COLORS[index % PERSONAL_ACCENT_COLORS.length];
  const img = project.metadata.images?.[0];
  const cFaint = accent + "12";
  const cBorder = accent + "35";
  const { onClick } = useCardNav(project.slug);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: EASE }}
      whileHover={{
        y: -4,
        boxShadow: `0 20px 48px -16px ${accent}40`,
        borderColor: `${accent}45`,
        transition: { duration: 0.22, ease: "easeOut" },
      }}
      onClick={onClick}
      style={{
        background: "rgba(128,128,128,0.05)",
        border: "1px solid rgba(128,128,128,0.15)",
        borderRadius: 24,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${accent} 0%, transparent 100%)`,
          zIndex: 3,
        }}
      />

      {/* Image/header area */}
      <div style={{ height: 80, overflow: "hidden", position: "relative" }}>
        {img ? (
          <ProjectImage
            src={img}
            alt={project.metadata.title}
            accentColor={accent}
            style={{ height: 80, objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              height: 80,
              background: `linear-gradient(135deg, ${accent}20 0%, ${accent}06 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: cFaint,
                border: `1px solid ${cBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: accent, fontSize: "1rem" }}>&#x2728;</span>
            </div>
          </div>
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Body */}
      <div
        style={{
          padding: "16px 20px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flex: 1,
        }}
      >
        {/* Title */}
        <a href={`/work/${project.slug}`} style={{ textDecoration: "none" }}>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              margin: 0,
              color: "var(--neutral-on-background-strong, #f0f0f0)",
              lineHeight: 1.3,
            }}
          >
            {project.metadata.title}
          </h3>
        </a>

        {/* Summary */}
        <p
          style={{
            fontSize: "0.78rem",
            lineHeight: 1.6,
            color: "var(--neutral-on-background-weak, rgba(240,240,240,0.5))",
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flex: 1,
          }}
        >
          {project.metadata.summary}
        </p>

        {/* Links row */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: "auto",
            paddingTop: 8,
            borderTop: "1px solid rgba(128,128,128,0.1)",
          }}
        >
          {project.metadata.github && (
            <motion.a
              href={project.metadata.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "rgba(240,240,240,0.45)",
                textDecoration: "none",
                padding: "5px 10px",
                borderRadius: 7,
                border: "1px solid rgba(128,128,128,0.15)",
                background: "transparent",
              }}
              whileHover={{
                color: accent,
                borderColor: cBorder,
                background: cFaint,
              }}
              whileTap={{ scale: 0.97 }}
            >
              <FiGithub size={12} />
              Code
            </motion.a>
          )}
          {project.metadata.live && (
            <motion.a
              href={project.metadata.live}
              target="_blank"
              rel="noopener noreferrer"
              title="Live Demo"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "rgba(240,240,240,0.45)",
                textDecoration: "none",
                padding: "5px 10px",
                borderRadius: 7,
                border: "1px solid rgba(128,128,128,0.15)",
                background: "transparent",
              }}
              whileHover={{
                color: accent,
                borderColor: cBorder,
                background: cFaint,
              }}
              whileTap={{ scale: 0.97 }}
            >
              <FiExternalLink size={12} />
              Demo
            </motion.a>
          )}
          <motion.a
            href={`/work/${project.slug}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "rgba(240,240,240,0.35)",
              textDecoration: "none",
              padding: "5px 10px",
              borderRadius: 7,
              border: "1px solid rgba(128,128,128,0.12)",
              background: "transparent",
              marginLeft: "auto",
            }}
            whileHover={{ color: "rgba(240,240,240,0.8)" }}
            whileTap={{ scale: 0.97 }}
          >
            View
            <FiArrowRight size={11} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

function PersonalSection({ projects }: { projects: ProjectData[] }) {
  return (
    <section
      id="personal"
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 16px 100px",
      }}
    >
      <SectionHeader
        eyebrow="Open Source"
        heading="Personal Projects"
        subtext="Experiments, tools, and passion projects built for learning and fun."
        count={projects.length}
        countLabel="Projects"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 18,
        }}
        className="personal-grid"
      >
        {projects.map((p, i) => (
          <PersonalCard key={p.slug} project={p} index={i} />
        ))}
      </div>
      <style jsx global>{`
        @media (max-width: 900px) {
          .personal-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 560px) {
          .personal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ROOT EXPORT
   ───────────────────────────────────────────── */
export function WorkContent({ saas, clients, personal }: WorkContentProps) {
  const total = saas.length + clients.length + personal.length;

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <WorkHero totalCount={total} clientCount={clients.length} saasCount={saas.length} />
      {saas.length > 0 && <SaaSSection projects={saas} />}
      {clients.length > 0 && <EngagementsSection projects={clients} />}
      {personal.length > 0 && <PersonalSection projects={personal} />}
    </div>
  );
}
