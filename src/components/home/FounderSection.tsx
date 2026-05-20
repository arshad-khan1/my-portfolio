"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowUpRight, FiStar, FiZap, FiLayers } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { icon: <FiStar size={11} />, label: "3× Reviews" },
  { icon: <FiZap size={11} />, label: "Live Product" },
  { icon: <FiLayers size={11} />, label: "Multi-tenant" },
];

export function FounderSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  const inView = useInView(contentRef, { once: true, amount: 0.25 });
  const mockupInView = useInView(mockupRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} className="fs-root">
      {/* Noise texture overlay */}
      <div className="fs-noise" />

      {/* Ambient glow orbs */}
      <div className="fs-orb fs-orb-1" />
      <div className="fs-orb fs-orb-2" />
      <div className="fs-orb fs-orb-3" />

      {/* Grid dot pattern */}
      <div className="fs-grid" />

      <div className="fs-inner" ref={contentRef}>
        {/* ── LEFT: Text ── */}
        <div className="fs-text">
          {/* Founder badge */}
          <motion.div
            className="fs-badge"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="fs-badge-dot" />
            <span>FOUNDER &amp; BUILDER</span>
          </motion.div>

          {/* Product wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="fs-wordmark">ReviewsNext</h2>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="fs-tagline"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Turning customer experiences into Google rankings
          </motion.p>

          {/* Stat chips */}
          <motion.div
            className="fs-stats"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.22 }}
          >
            {stats.map((s) => (
              <span key={s.label} className="fs-stat-chip">
                {s.icon}
                {s.label}
              </span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            className="fs-desc"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Built and launched a complete review management SaaS — from
            architecture to production. Helps businesses automate review
            collection and dominate local search.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="fs-ctas"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.38 }}
          >
            <a
              href="https://www.reviewsnext.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="fs-cta-primary"
            >
              Visit ReviewsNext
              <FiArrowUpRight size={15} />
            </a>
            <Link href="/work/reviewsnext" className="fs-cta-secondary">
              View Case Study
            </Link>
          </motion.div>
        </div>

        {/* ── RIGHT: Browser mockup ── */}
        <motion.div
          ref={mockupRef}
          className="fs-mockup-wrap"
          style={{ y: mockupY }}
          initial={{ opacity: 0, x: 40, scale: 0.97 }}
          animate={mockupInView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glow behind mockup */}
          <div className="fs-mockup-glow" />

          {/* Browser chrome */}
          <div className="fs-browser">
            {/* Top bar */}
            <div className="fs-browser-bar">
              <div className="fs-traffic-lights">
                <span className="fs-tl fs-tl-red" />
                <span className="fs-tl fs-tl-yellow" />
                <span className="fs-tl fs-tl-green" />
              </div>
              <div className="fs-url-bar">
                <span className="fs-url-lock">🔒</span>
                <span className="fs-url-text">reviewsnext.com</span>
              </div>
              <div className="fs-browser-actions" />
            </div>

            {/* Screenshot */}
            <div className="fs-browser-screen">
              <Image
                src="https://res.cloudinary.com/dvjqrh2gh/image/upload/v1779187846/MyPortfolio/Production%20Apps/674b9ede-c78f-4d3a-9495-73246ceedcd8.png"
                alt="ReviewsNext dashboard screenshot"
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        /* ── Root ── */
        .fs-root {
          position: relative;
          width: 100%;
          background: #020c14;
          overflow: hidden;
          padding: 96px 1.5rem;
          isolation: isolate;
        }

        /* ── Noise ── */
        .fs-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 180px 180px;
          pointer-events: none;
          z-index: 1;
          opacity: 0.55;
        }

        /* ── Orbs ── */
        .fs-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .fs-orb-1 {
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, rgba(16,185,129,0.13) 0%, transparent 70%);
          top: -120px;
          right: 10%;
        }
        .fs-orb-2 {
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 70%);
          bottom: -80px;
          left: 5%;
        }
        .fs-orb-3 {
          width: 260px;
          height: 260px;
          background: radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%);
          top: 40%;
          left: 30%;
        }

        /* ── Grid dots ── */
        .fs-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(16,185,129,0.12) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          z-index: 1;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        /* ── Layout ── */
        .fs-inner {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.05fr;
          align-items: center;
          gap: 64px;
        }

        /* ── Text side ── */
        .fs-text {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Badge */
        .fs-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: #10b981;
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.22);
          padding: 5px 13px 5px 10px;
          border-radius: 100px;
          width: fit-content;
          margin-bottom: 22px;
        }
        .fs-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          animation: fs-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes fs-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.3); }
        }

        /* Wordmark */
        .fs-wordmark {
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1;
          margin: 0 0 18px;
          background: linear-gradient(135deg, #10b981 0%, #34d399 35%, #06b6d4 75%, #22d3ee 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: fs-shimmer 4s ease-in-out infinite alternate;
        }
        @keyframes fs-shimmer {
          from { background-position: 0% 50%; }
          to { background-position: 100% 50%; }
        }

        /* Tagline */
        .fs-tagline {
          font-size: clamp(0.95rem, 1.8vw, 1.15rem);
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          margin: 0 0 24px;
          line-height: 1.5;
          font-style: italic;
        }

        /* Stat chips */
        .fs-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .fs-stat-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #10b981;
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.2);
          padding: 5px 12px;
          border-radius: 8px;
        }

        /* Description */
        .fs-desc {
          font-size: 0.9rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.45);
          margin: 0 0 32px;
          max-width: 440px;
        }

        /* CTAs */
        .fs-ctas {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .fs-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #020c14;
          background: linear-gradient(135deg, #10b981, #06b6d4);
          padding: 11px 22px;
          border-radius: 10px;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 28px rgba(16,185,129,0.3);
        }
        .fs-cta-primary:hover {
          opacity: 0.88;
          transform: translateY(-2px);
          box-shadow: 0 8px 36px rgba(16,185,129,0.42);
        }
        .fs-cta-secondary {
          display: inline-flex;
          align-items: center;
          font-size: 0.82rem;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 11px 22px;
          border-radius: 10px;
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .fs-cta-secondary:hover {
          color: rgba(255,255,255,0.9);
          border-color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.08);
        }

        /* ── Mockup ── */
        .fs-mockup-wrap {
          position: relative;
        }
        .fs-mockup-glow {
          position: absolute;
          inset: -40px;
          background: radial-gradient(ellipse 70% 55% at 50% 50%, rgba(16,185,129,0.18) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .fs-browser {
          position: relative;
          z-index: 1;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          background: #0d1f2d;
          box-shadow:
            0 0 0 1px rgba(16,185,129,0.08),
            0 32px 80px -20px rgba(0,0,0,0.7),
            0 0 60px -10px rgba(16,185,129,0.12);
        }
        .fs-browser-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          background: #111c28;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .fs-traffic-lights {
          display: flex;
          gap: 6px;
          flex-shrink: 0;
        }
        .fs-tl {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .fs-tl-red    { background: #ff5f57; }
        .fs-tl-yellow { background: #febc2e; }
        .fs-tl-green  { background: #28c840; }

        .fs-url-bar {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.45);
          max-width: 280px;
          margin: 0 auto;
        }
        .fs-url-lock { font-size: 0.65rem; }
        .fs-url-text { font-weight: 500; }
        .fs-browser-actions { width: 54px; flex-shrink: 0; }

        .fs-browser-screen {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .fs-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .fs-text { order: 2; }
          .fs-mockup-wrap { order: 1; }
          .fs-wordmark {
            font-size: clamp(2.2rem, 9vw, 3.2rem);
          }
          .fs-desc { max-width: 100%; }
        }

        @media (max-width: 480px) {
          .fs-root { padding: 64px 1rem; }
          .fs-ctas { flex-direction: column; align-items: flex-start; }
          .fs-cta-primary, .fs-cta-secondary { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
