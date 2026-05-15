"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState(text);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const total = 18;
    const id = setInterval(() => {
      frame++;
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (frame / total > i / text.length) return char;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );
      if (frame >= total) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [started, text]);

  return <>{display}</>;
}

function FloatingOrb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
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
        x: [0, 30, -20, 0],
        y: [0, -40, 20, 0],
        scale: [1, 1.2, 0.9, 1],
      }}
      transition={{
        duration: 8 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export function HeroSection({
  headline,
  subline,
}: {
  headline: React.ReactNode;
  subline: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { stiffness: 120, damping: 20 });

  // Scroll-driven parallax
  const { scrollY } = useScroll();
  const bgSlowY = useTransform(scrollY, [0, 800], [0, -140]);
  const bgFastY  = useTransform(scrollY, [0, 800], [0, -240]);
  const contentY = useTransform(scrollY, [0, 600], [0, -70]);
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0]);

  useEffect(() => { setMounted(true); }, []);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const up = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Background orbs — slow parallax layer */}
      <motion.div style={{ position: "absolute", inset: 0, y: bgSlowY, pointerEvents: "none" }}>
        <FloatingOrb x="5%" y="10%" size={400} color="rgba(4,158,226,0.10)" delay={0} />
        <FloatingOrb x="20%" y="70%" size={350} color="rgba(4,158,226,0.06)" delay={1} />
      </motion.div>

      {/* Background orbs — fast parallax layer */}
      <motion.div style={{ position: "absolute", inset: 0, y: bgFastY, pointerEvents: "none" }}>
        <FloatingOrb x="60%" y="60%" size={500} color="rgba(23,192,253,0.07)" delay={2} />
        <FloatingOrb x="80%" y="5%" size={300} color="rgba(4,158,226,0.07)" delay={4} />
      </motion.div>

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

      {/* Hero content with scroll-out effect */}
      <motion.div style={{ y: contentY, opacity: contentOpacity, position: "relative", zIndex: 10, width: "100%" }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: "1200px",
          width: "100%",
          padding: "2.5rem 2rem",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "4rem",
          alignItems: "center",
          margin: "0 auto",
        }}
        className="hero-grid"
      >
        {/* LEFT — Text */}
        <div>
          {/* Status badge */}
          <motion.div variants={up} style={{ marginBottom: "1.2rem" }}>
            <div className="hero-badge">
              <motion.div
                className="badge-dot"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <span>Available for hire &mdash; Open to full-time</span>
            </div>
          </motion.div>

          {/* Big name */}
          <motion.div variants={up} style={{ marginBottom: "0.5rem" }}>
            <p className="hero-name-label">Hi, I&apos;m</p>
            <h1 className="hero-name">
              {mounted ? <ScrambleText text="ARSHAD KHAN" delay={400} /> : "ARSHAD KHAN"}
            </h1>
          </motion.div>

          {/* Role with gradient */}
          <motion.div variants={up} style={{ marginBottom: "1rem" }}>
            <div className="hero-role-line">
              <span className="hero-role-gradient">Senior Backend Engineer</span>
              <span className="hero-role-sep">&nbsp;×&nbsp;</span>
              <span className="hero-role-gradient2">AI Solutions Architect</span>
            </div>
          </motion.div>

          {/* Subline */}
          <motion.div variants={up} style={{ marginBottom: "1.4rem", maxWidth: "580px" }}>
            <p className="hero-subline">{subline}</p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={up} className="hero-ctas">
            <motion.a
              href="/work"
              className="btn-primary"
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(4,158,226,0.55), 0 0 80px rgba(4,158,226,0.25)" }}
              whileTap={{ scale: 0.97 }}
            >
              <span>View My Work</span>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.3, repeat: Infinity }}>
                <FiArrowRight size={18} />
              </motion.span>
            </motion.a>

            <motion.a
              href="#contact"
              className="btn-outline"
              whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Socials */}
          <motion.div variants={up} className="hero-socials">
            {[
              { href: "https://github.com/arshad-khan1", icon: <FiGithub size={20} />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/arshad-khan-linkdin/", icon: <FiLinkedin size={20} />, label: "LinkedIn" },
              { href: "mailto:003arshad@gmail.com", icon: <FiMail size={20} />, label: "Email" },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="social-pill"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(4,158,226,0.12)", borderColor: "rgba(4,158,226,0.4)" }}
                whileTap={{ scale: 0.95 }}
                title={s.label}
              >
                {s.icon}
                <span>{s.label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div variants={up} className="hero-stats">
            {[
              { val: "10K+", label: "Daily Transactions" },
              { val: "80%", label: "DB Cost Reduction" },
              { val: "50%", label: "Faster Resolution" },
              { val: "5+", label: "Years Shipping" },
            ].map((s, i) => (
              <div key={i} className="hero-stat">
                <span className="hero-stat-val">{s.val}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Portrait card */}
        <motion.div
          variants={up}
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
          className="portrait-wrap"
        >
          <div className="portrait-card">
            {/* Glowing ring */}
            <motion.div
              className="portrait-ring"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="portrait-ring portrait-ring2"
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />

            {/* Avatar */}
            <div className="portrait-img-wrap">
              <img
                src="/images/gallery/image.png"
                alt="Arshad Khan"
                className="portrait-img"
              />
              <div className="portrait-overlay" />
            </div>

            {/* Floating badges */}
            <motion.div
              className="float-badge float-badge-tl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="badge-icon">⚡</span>
              <div>
                <div className="badge-title">NestJS</div>
                <div className="badge-sub">Backend</div>
              </div>
            </motion.div>

            <motion.div
              className="float-badge float-badge-br"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <span className="badge-icon">🤖</span>
              <div>
                <div className="badge-title">AI Architect</div>
                <div className="badge-sub">LLM + Agents</div>
              </div>
            </motion.div>

            <motion.div
              className="float-badge float-badge-tr"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <span className="badge-icon">☁️</span>
              <div>
                <div className="badge-title">AWS</div>
                <div className="badge-sub">Cloud</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="scroll-hint"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <motion.div className="scroll-line" animate={{ scaleY: [1, 0.4, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
      </motion.div>

      <style jsx global>{`
        /* ── Badge ─────────────────────────── */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          background: rgba(4,158,226,0.08);
          border: 1px solid rgba(4,158,226,0.25);
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          letter-spacing: 0.04em;
        }
        .badge-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px #22c55e;
          flex-shrink: 0;
        }

        /* ── Name ─────────────────────────── */
        .hero-name-label {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.05em;
          margin: 0 0 4px;
          font-weight: 400;
        }
        .hero-name {
          font-size: clamp(3.2rem, 8vw, 6.5rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #fff;
          margin: 0 0 0;
          font-family: inherit;
          text-shadow: 0 0 60px rgba(4,158,226,0.2);
        }

        /* ── Role ─────────────────────────── */
        .hero-role-line {
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1.4;
        }
        .hero-role-gradient {
          background: linear-gradient(135deg, #60E4FC, #17C0FD);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-role-sep {
          color: rgba(255,255,255,0.25);
          -webkit-text-fill-color: rgba(255,255,255,0.25);
        }
        .hero-role-gradient2 {
          background: linear-gradient(135deg, #a78bfa, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Subline ─────────────────────── */
        .hero-subline {
          font-size: clamp(0.95rem, 1.8vw, 1.1rem);
          line-height: 1.85;
          color: var(--neutral-on-background-weak);
          margin: 0;
        }

        /* ── CTAs ────────────────────────── */
        .hero-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 1.1rem;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 30px;
          background: linear-gradient(135deg, #17C0FD 0%, #049EE2 100%);
          color: #fff;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          box-shadow: 0 0 25px rgba(4,158,226,0.35);
          transition: box-shadow 0.3s;
        }
        .btn-outline {
          display: inline-flex;
          align-items: center;
          padding: 14px 30px;
          background: transparent;
          color: var(--neutral-on-background-medium);
          border: 1px solid var(--neutral-alpha-medium);
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          transition: border-color 0.3s, background 0.3s, color 0.3s;
        }
        .btn-outline:hover {
          background: var(--neutral-alpha-weak);
          color: var(--neutral-on-background-strong);
          border-color: var(--neutral-alpha-strong);
        }

        /* ── Socials ─────────────────────── */
        .hero-socials {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 1.4rem;
        }
        .social-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 16px;
          background: var(--neutral-alpha-weak);
          border: 1px solid var(--neutral-alpha-medium);
          border-radius: 10px;
          color: var(--neutral-on-background-weak);
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .social-pill:hover {
          color: var(--neutral-on-background-strong);
          background: var(--neutral-alpha-medium);
        }

        /* ── Stats ───────────────────────── */
        .hero-stats {
          display: flex;
          gap: 0;
          background: var(--neutral-alpha-weak);
          border: 1px solid var(--neutral-alpha-medium);
          border-radius: 16px;
          overflow: hidden;
          max-width: 560px;
        }
        .hero-stat {
          flex: 1;
          padding: 18px 16px;
          text-align: center;
          border-right: 1px solid var(--neutral-alpha-weak);
          position: relative;
        }
        .hero-stat:last-child { border-right: none; }
        .hero-stat-val {
          display: block;
          font-size: 1.7rem;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 5px;
          background: linear-gradient(135deg, #fff 0%, #82F1FC 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-stat-label {
          display: block;
          font-size: 0.72rem;
          color: var(--neutral-on-background-weak);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          line-height: 1.3;
        }

        /* ── Portrait ────────────────────── */
        .portrait-wrap {
          position: relative;
          flex-shrink: 0;
          padding: 28px 80px 20px 70px;
        }
        .portrait-card {
          position: relative;
          width: 300px;
          height: 380px;
          border-radius: 24px;
          overflow: visible;
        }
        .portrait-ring {
          position: absolute;
          inset: -14px;
          border-radius: 30px;
          border: 2px solid transparent;
          background: linear-gradient(135deg, rgba(4,158,226,0.5), rgba(23,192,253,0.4), rgba(4,158,226,0.2), transparent) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          pointer-events: none;
        }
        .portrait-ring2 {
          inset: -24px;
          border-radius: 36px;
          opacity: 0.35;
        }
        .portrait-img-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--neutral-alpha-medium);
        }
        .portrait-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          filter: saturate(0.9) contrast(1.05);
        }
        .portrait-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 40%,
            rgba(0,0,0,0.6) 100%
          );
        }

        /* ── Float badges ────────────────── */
        .float-badge {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: var(--neutral-background-medium);
          border: 1px solid var(--neutral-alpha-medium);
          border-radius: 12px;
          backdrop-filter: blur(16px);
          z-index: 20;
          white-space: nowrap;
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
        }
        .float-badge-tl { top: -22px; left: -62px; }
        .float-badge-tr { top: 36px; right: -72px; }
        .float-badge-br { bottom: 40px; right: -72px; }
        .badge-icon { font-size: 1.2rem; }
        .badge-title {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--neutral-on-background-strong);
          line-height: 1;
        }
        .badge-sub {
          font-size: 0.68rem;
          color: var(--neutral-on-background-weak);
          line-height: 1.2;
          margin-top: 2px;
        }

        /* ── Scroll hint ─────────────────── */
        .scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          cursor: pointer;
          z-index: 10;
          transform-origin: top;
        }
        .scroll-line {
          width: 1px;
          height: 56px;
          background: linear-gradient(to bottom, rgba(23,192,253,0.7), transparent);
          transform-origin: top;
        }

        /* ── Hero grid responsive ─────────── */
        .hero-grid {
          grid-template-columns: 1fr auto !important;
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            padding: 2rem 1.5rem !important;
            gap: 2rem !important;
          }
          .hero-badge, .hero-ctas, .hero-socials { justify-content: center; }
          .hero-stats { margin: 0 auto; }
          .hero-subline { max-width: 100%; }
          .portrait-wrap { display: none; }
          .hero-name { font-size: clamp(2.4rem, 10vw, 5rem); }
        }
        @media (max-width: 500px) {
          .hero-stats { flex-wrap: wrap; max-width: 100%; }
          .hero-stat {
            flex: 0 0 50%;
            border-right: none;
            border-bottom: 1px solid var(--neutral-alpha-weak);
          }
          .hero-stat:nth-child(odd)  { border-right: 1px solid var(--neutral-alpha-weak); }
          .hero-stat:nth-child(3),
          .hero-stat:nth-child(4)    { border-bottom: none; }
        }
        @media (max-width: 480px) {
          .hero-grid {
            padding: 1.5rem 1rem 2rem !important;
            gap: 1.5rem !important;
          }
          .hero-name {
            font-size: clamp(1.85rem, 8.5vw, 2.5rem) !important;
            letter-spacing: -0.03em;
          }
          .hero-name-label {
            font-size: 0.95rem;
          }
          .hero-role-line {
            font-size: clamp(0.85rem, 3.5vw, 1.1rem);
          }
          .hero-ctas {
            flex-direction: column;
            align-items: center;
          }
          .btn-primary, .btn-outline {
            width: 100%;
            justify-content: center;
            padding: 13px 20px;
            font-size: 0.9rem;
          }
          .social-pill {
            padding: 8px 12px;
            font-size: 0.78rem;
            gap: 6px;
          }
          .hero-socials {
            gap: 8px;
          }
          .hero-badge {
            font-size: 0.72rem;
            padding: 7px 12px;
          }
          .hero-stat-val {
            font-size: 1.45rem;
          }
          .hero-stat {
            padding: 14px 10px;
          }
          .hero-stat-label {
            font-size: 0.68rem;
          }
        }
      `}</style>
    </section>
  );
}
