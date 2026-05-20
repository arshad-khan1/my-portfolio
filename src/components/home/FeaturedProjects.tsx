"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";
import { SmartLink } from "@once-ui-system/core";

const projects = [
  {
    title: "CPaaS Platform",
    subtitle: "Multi-channel Communication Platform",
    description:
      "Owned and led backend development for a scalable communication platform. Architected and delivered key implementations including the WhatsApp messaging pipeline, self-hosted Garage S3 storage server, centralized Winston logging, conversational routing engine, etc.",
    tags: ["NodeJs", "S3", "WhatsApp API", "PostgreSQL", "Minio", "Deployment"],
    image: "/images/home/whatsapp_pipeline.png",
    link: "/about#what-i-built",
    metric: "Communication Platform",
    color: "#8b5cf6",
    num: "01",
  },
  {
    title: "Soho Ecommerce",
    subtitle: "Full-stack ecommerce with admin dashboard",
    description:
      "Led end-to-end development of a complete ecommerce platform handling 10K+ daily transactions. Built React Native mobile app with secure payment flows and a comprehensive admin dashboard for real-time analytics.",
    tags: ["React Native", "Node.js", "PostgreSQL", "Redis", "Razorpay"],
    image:
      "https://res.cloudinary.com/dvjqrh2gh/image/upload/v1779194174/MyPortfolio/Freelance%20Projects/Soho_irroy6.png",
    link: "/work/freelance",
    metric: "Mobile Application",
    color: "#049EE2",
    num: "02",
  },
  {
    title: "Vydhra",
    subtitle: "Online course platform with agent payout system",
    description:
      "Built a full-stack edtech platform where students browse and enroll in courses via Razorpay. The standout feature is the Agent system — registered agents earn commissions on courses they sell, with a dedicated admin dashboard tracking agent sales, student enrollments, payments, and payout records.",
    tags: [
      "Next.js",
      "Razorpay",
      "TypeScript",
      "Tailwind CSS",
      "Admin Dashboard",
    ],
    image:
      "https://res.cloudinary.com/dvjqrh2gh/image/upload/v1779187820/MyPortfolio/Freelance%20Projects/3ba16c6c-4240-4f05-944b-3173991f2ee2.png",
    link: "/work/vydhra",
    metric: "Education Platform",
    color: "#f59e0b",
    num: "03",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const isEven = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      className={`fp-card ${isEven ? "fp-card--reverse" : ""}`}
      style={{ "--accent": project.color } as React.CSSProperties}
      initial={{ opacity: 0, y: 56 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image panel */}
      <div className="fp-img-wrap">
        <motion.div
          className="fp-img-inner"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 52vw"
          />
          <div className="fp-img-overlay" />
        </motion.div>

        {/* Floating metric chip on image */}
        <motion.div
          className="fp-metric-chip"
          style={{
            background: project.color + "22",
            border: `1px solid ${project.color}55`,
            color: project.color,
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="fp-metric-dot"
            style={{ background: project.color }}
          />
          {project.metric}
        </motion.div>
      </div>

      {/* Content panel */}
      <div className="fp-content">
        {/* Faded background number */}
        <span className="fp-bg-num">{project.num}</span>

        <motion.span
          className="fp-num-label"
          style={{ color: project.color }}
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {project.num}
        </motion.span>

        <motion.h3
          className="fp-title"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {project.title}
        </motion.h3>

        <motion.p
          className="fp-subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          {project.subtitle}
        </motion.p>

        <motion.p
          className="fp-desc"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {project.description}
        </motion.p>

        <motion.div
          className="fp-tags"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.3 }}
        >
          {project.tags.map((tag) => (
            <span key={tag} className="fp-tag">
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.38 }}
        >
          <SmartLink href={project.link} style={{ textDecoration: "none" }}>
            <motion.span
              className="fp-cta"
              style={{ color: project.color }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              View Project <FiArrowUpRight size={15} />
            </motion.span>
          </SmartLink>
        </motion.div>

        {/* Animated accent bar */}
        <motion.div
          className="fp-accent-bar"
          style={{ background: project.color }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

export function FeaturedProjects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, amount: 0.4 });

  return (
    <section className="fp-section">
      {/* Header */}
      <div ref={headerRef} className="fp-header">
        <div>
          <motion.p
            className="fp-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Selected Work
          </motion.p>
          <motion.h2
            className="fp-heading"
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Projects That Define Me
          </motion.h2>
        </div>
        <motion.span
          className="fp-counter-pill"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          <strong>0{projects.length}</strong>&nbsp;Projects
        </motion.span>
      </div>

      <motion.div
        className="fp-rule"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Cards */}
      <div className="fp-cards">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>

      <style jsx global>{`
        /* ── Section ── */
        .fp-section {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          padding: 80px 1rem 96px;
        }

        /* ── Header ── */
        .fp-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.75rem;
        }
        .fp-eyebrow {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--brand-on-background-weak);
          margin: 0 0 0.55rem;
        }
        .fp-heading {
          font-size: clamp(1.9rem, 4.5vw, 2.8rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: var(--neutral-on-background-strong);
          margin: 0;
        }
        .fp-counter-pill {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--neutral-on-background-weak);
          padding: 6px 14px;
          border: 1px solid var(--neutral-alpha-medium);
          border-radius: 100px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .fp-counter-pill strong {
          font-size: 1rem;
          font-weight: 800;
          color: var(--neutral-on-background-strong);
        }
        .fp-rule {
          width: 100%;
          height: 1px;
          background: var(--neutral-alpha-medium);
          transform-origin: left center;
          margin-bottom: 3.5rem;
        }

        /* ── Cards list ── */
        .fp-cards {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* ── Single card ── */
        .fp-card {
          display: flex;
          align-items: stretch;
          min-height: 460px;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid var(--neutral-alpha-weak);
          background: var(--surface-background, rgba(255, 255, 255, 0.02));
          position: relative;
          transition:
            border-color 0.35s ease,
            box-shadow 0.35s ease;
        }
        .fp-card:hover {
          border-color: color-mix(in srgb, var(--accent) 35%, transparent);
          box-shadow: 0 24px 64px -20px
            color-mix(in srgb, var(--accent) 22%, transparent);
        }
        .fp-card--reverse {
          flex-direction: row-reverse;
        }

        /* Top accent line that reveals on hover */
        .fp-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 3;
          border-radius: 2px 2px 0 0;
        }
        .fp-card:hover::before {
          transform: scaleX(1);
        }

        /* ── Image panel ── */
        .fp-img-wrap {
          position: relative;
          flex: 0 0 52%;
          overflow: hidden;
        }
        .fp-img-inner {
          position: absolute;
          inset: 0;
          will-change: transform;
        }
        .fp-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.18) 0%,
            transparent 60%
          );
          z-index: 1;
          pointer-events: none;
        }

        /* Metric chip floating on image */
        .fp-metric-chip {
          position: absolute;
          bottom: 18px;
          left: 18px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 6px 13px;
          border-radius: 100px;
          backdrop-filter: blur(10px);
        }
        .fp-card--reverse .fp-metric-chip {
          left: auto;
          right: 18px;
        }
        .fp-metric-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── Content panel ── */
        .fp-content {
          flex: 1;
          min-width: 0;
          padding: 44px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0;
          position: relative;
          overflow: hidden;
        }
        .fp-bg-num {
          position: absolute;
          top: -12px;
          right: -8px;
          font-size: 9rem;
          font-weight: 900;
          color: var(--neutral-alpha-weak);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.06em;
          opacity: 0.6;
        }
        .fp-card--reverse .fp-bg-num {
          right: auto;
          left: -8px;
        }
        .fp-num-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 12px;
          display: block;
        }
        .fp-title {
          font-size: clamp(1.35rem, 2.4vw, 1.75rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.15;
          color: var(--neutral-on-background-strong);
          margin: 0 0 6px;
        }
        .fp-subtitle {
          font-size: 0.85rem;
          color: var(--neutral-on-background-weak);
          margin: 0 0 16px;
          opacity: 0.8;
        }
        .fp-desc {
          font-size: 0.855rem;
          line-height: 1.78;
          color: var(--neutral-on-background-weak);
          margin: 0 0 20px;
        }
        .fp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 24px;
        }
        .fp-tag {
          font-size: 0.67rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 4px 10px;
          border-radius: 6px;
          background: var(--neutral-alpha-weak);
          color: var(--neutral-on-background-weak);
          border: 1px solid var(--neutral-alpha-medium);
        }
        .fp-cta {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          cursor: pointer;
        }

        /* Bottom accent bar */
        .fp-accent-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          transform-origin: left center;
          border-radius: 0;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .fp-card,
          .fp-card--reverse {
            flex-direction: column;
            min-height: auto;
          }
          .fp-img-wrap {
            flex: 0 0 220px;
            height: 220px;
            position: relative;
          }
          .fp-img-inner {
            position: absolute;
          }
          .fp-metric-chip,
          .fp-card--reverse .fp-metric-chip {
            left: 14px;
            right: auto;
            bottom: 14px;
          }
          .fp-content {
            padding: 28px 24px 32px;
          }
          .fp-bg-num {
            font-size: 6rem;
            top: -6px;
          }
          .fp-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .fp-section {
            padding: 56px 0.75rem 72px;
          }
          .fp-cards {
            gap: 18px;
          }
          .fp-img-wrap {
            flex: 0 0 190px;
            height: 190px;
          }
          .fp-content {
            padding: 22px 18px 26px;
          }
          .fp-title {
            font-size: 1.2rem;
          }
          .fp-desc {
            font-size: 0.8rem;
          }
          .fp-tag {
            font-size: 0.63rem;
            padding: 3px 8px;
          }
          .fp-bg-num {
            font-size: 5rem;
          }
        }
      `}</style>
    </section>
  );
}
