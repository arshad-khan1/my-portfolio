"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { about, person, social } from "@/resources";
import { FiCalendar, FiMapPin, FiZap } from "react-icons/fi";
import React from "react";

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
      animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0], scale: [1, 1.2, 0.9, 1] }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

const identityCards = [
  {
    emoji: "🚀",
    title: "Founder",
    sub: "ReviewsNext",
    color: "#3b82f6",
  },
  {
    emoji: "⚡",
    title: "2-Day Delivery",
    sub: "Prod-ready websites",
    color: "#f59e0b",
  },
  {
    emoji: "🤖",
    title: "AI-Native",
    sub: "LLMs & Agents",
    color: "#8b5cf6",
  },
  {
    emoji: "📦",
    title: "Full Ownership",
    sub: "Arch → Deploy",
    color: "#10b981",
  },
];

export function AboutHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, -100]);

  const essentialSocials = social.filter((s) => s.essential && s.link);
  const [rolePart1, rolePart2] = person.role.includes(" & ")
    ? person.role.split(" & ")
    : [person.role, null];

  return (
    <section className="ah-section">
      {/* Background orbs */}
      <motion.div style={{ position: "absolute", inset: 0, y: bgY, pointerEvents: "none" }}>
        <FloatingOrb x="5%" y="10%" size={400} color="rgba(4,158,226,0.10)" delay={0} />
        <FloatingOrb x="70%" y="55%" size={500} color="rgba(23,192,253,0.07)" delay={2} />
        <FloatingOrb x="18%" y="70%" size={300} color="rgba(4,158,226,0.06)" delay={1} />
        <FloatingOrb x="82%" y="5%" size={260} color="rgba(4,158,226,0.07)" delay={3} />
      </motion.div>

      {/* Grid lines */}
      <div className="ah-grid-bg" />

      {/* Content — centered column */}
      <motion.div className="ah-inner" variants={stagger} initial="hidden" animate="visible">
        {/* Calendar badge */}
        {about.calendar.display && (
          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center" }}>
            <a
              href={about.calendar.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ah-cal-badge"
            >
              <motion.span
                className="ah-badge-dot"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <FiCalendar size={13} />
              <span>Schedule a call</span>
            </a>
          </motion.div>
        )}

        {/* Avatar */}
        <motion.div variants={fadeUp} className="ah-avatar-wrap">
          <div className="ah-avatar-card">
            <motion.div
              className="ah-ring"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="ah-ring ah-ring2"
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            <div className="ah-img-wrap">
              {mounted && (
                <Image
                  src={person.avatar}
                  alt={person.name}
                  className="ah-img"
                  fill
                  sizes="200px"
                />
              )}
              <div className="ah-img-overlay" />
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.div variants={fadeUp} style={{ textAlign: "center" }}>
          <p className="ah-name-label">Hi, I&apos;m</p>
          <h1 className="ah-name">{person.name}</h1>
        </motion.div>

        {/* Role */}
        <motion.div variants={fadeUp}>
          <div className="ah-role-line">
            <span className="ah-role-blue">{rolePart1}</span>
            {rolePart2 && (
              <>
                <span className="ah-role-sep"> × </span>
                <span className="ah-role-purple">{rolePart2}</span>
              </>
            )}
          </div>
        </motion.div>

        {/* Location + languages */}
        <motion.div variants={fadeUp} className="ah-meta">
          <span className="ah-meta-item">
            <FiMapPin size={13} />
            {String(person.location).replace("Asia/", "").replace(/_/g, " ")}
          </span>
          {person.languages?.map((lang) => (
            <span key={lang} className="ah-lang-chip">
              {lang}
            </span>
          ))}
        </motion.div>

        {/* Intro */}
        {about.intro.display && (
          <motion.div variants={fadeUp} className="ah-intro">
            {about.intro.description}
          </motion.div>
        )}

        {/* Identity cards */}
        <motion.div variants={fadeUp} className="ah-identity-grid">
          {identityCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="ah-id-card"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -4,
                boxShadow: `0 12px 32px -8px ${card.color}30`,
                borderColor: `${card.color}50`,
              }}
            >
              <span className="ah-id-emoji">{card.emoji}</span>
              <div>
                <p className="ah-id-title" style={{ color: card.color }}>
                  {card.title}
                </p>
                <p className="ah-id-sub">{card.sub}</p>
              </div>
              <motion.div
                className="ah-id-bar"
                style={{
                  background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.8 + i * 0.08 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Socials */}
        {essentialSocials.length > 0 && (
          <motion.div variants={fadeUp} className="ah-socials">
            {essentialSocials.map((item) => (
              <motion.a
                key={item.name}
                href={item.link}
                target={item.name !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="ah-social-pill"
                whileHover={{
                  scale: 1.07,
                  backgroundColor: "rgba(4,158,226,0.12)",
                  borderColor: "rgba(4,158,226,0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="ah-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" })}
      >
        <motion.div
          className="ah-scroll-line"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </motion.div>

      <style jsx global>{`
        /* ── Section ─────────────────────────────── */
        .ah-section {
          width: 100%;
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          isolation: isolate;
          padding: 6rem 2rem 5rem;
        }
        .ah-grid-bg {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(4, 158, 226, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(4, 158, 226, 0.025) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none;
        }

        /* ── Inner — centered column ───────────────── */
        .ah-inner {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 680px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.1rem;
          text-align: center;
        }

        /* ── Calendar badge ─────────────────────── */
        .ah-cal-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          background: rgba(4, 158, 226, 0.08);
          border: 1px solid rgba(4, 158, 226, 0.25);
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.75);
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
        }
        .ah-cal-badge:hover {
          background: rgba(4, 158, 226, 0.15);
          border-color: rgba(4, 158, 226, 0.45);
        }
        .ah-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px #22c55e;
          flex-shrink: 0;
          display: inline-block;
        }

        /* ── Avatar ─────────────────────────────── */
        .ah-avatar-wrap {
          margin: 0.5rem 0 0.8rem;
        }
        .ah-avatar-card {
          position: relative;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          overflow: visible;
        }
        .ah-ring {
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          border: 2px solid transparent;
          background: linear-gradient(
              135deg,
              rgba(4, 158, 226, 0.55),
              rgba(23, 192, 253, 0.45),
              rgba(4, 158, 226, 0.2),
              transparent
            )
            border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          pointer-events: none;
        }
        .ah-ring2 {
          inset: -22px;
          opacity: 0.35;
        }
        .ah-img-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--neutral-alpha-medium);
        }
        .ah-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          filter: saturate(0.9) contrast(1.05);
        }
        .ah-img-overlay {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.35) 100%);
        }

        /* ── Name ───────────────────────────────── */
        .ah-name-label {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 0.06em;
          margin: 0 0 4px;
          font-weight: 400;
        }
        .ah-name {
          font-size: clamp(2.6rem, 7vw, 4.8rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #fff;
          margin: 0;
          font-family: inherit;
          text-shadow: 0 0 60px rgba(4, 158, 226, 0.2);
        }

        /* ── Role ───────────────────────────────── */
        .ah-role-line {
          font-size: clamp(0.88rem, 2vw, 1.15rem);
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1.4;
        }
        .ah-role-blue {
          background: linear-gradient(135deg, #60e4fc, #17c0fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ah-role-sep {
          color: rgba(255, 255, 255, 0.25);
          -webkit-text-fill-color: rgba(255, 255, 255, 0.25);
        }
        .ah-role-purple {
          background: linear-gradient(135deg, #a78bfa, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Meta ───────────────────────────────── */
        .ah-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .ah-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.83rem;
          color: var(--neutral-on-background-weak);
        }
        .ah-lang-chip {
          padding: 3px 11px;
          background: var(--neutral-alpha-weak);
          border: 1px solid var(--neutral-alpha-medium);
          border-radius: 100px;
          font-size: 0.75rem;
          color: var(--neutral-on-background-weak);
        }

        /* ── Intro ──────────────────────────────── */
        .ah-intro {
          font-size: clamp(0.9rem, 1.5vw, 1rem);
          line-height: 1.9;
          color: var(--neutral-on-background-weak);
          max-width: 560px;
          margin: 0.3rem 0;
        }

        /* ── Identity cards ─────────────────────── */
        .ah-identity-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          width: 100%;
          max-width: 640px;
          margin: 0.4rem 0;
        }
        .ah-id-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 16px 10px 18px;
          background: var(--surface-background, rgba(128, 128, 128, 0.05));
          border: 1px solid var(--neutral-alpha-weak, rgba(128, 128, 128, 0.15));
          border-radius: 16px;
          overflow: hidden;
          cursor: default;
          text-align: center;
          transition: border-color 0.2s;
        }
        .ah-id-emoji {
          font-size: 1.5rem;
          line-height: 1;
        }
        .ah-id-title {
          font-size: 0.78rem;
          font-weight: 700;
          margin: 0;
          line-height: 1.2;
        }
        .ah-id-sub {
          font-size: 0.68rem;
          color: var(--neutral-on-background-weak);
          margin: 0;
          line-height: 1.3;
        }
        .ah-id-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          transform-origin: center;
        }

        /* ── Socials ────────────────────────────── */
        .ah-socials {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 0.2rem;
        }
        .ah-social-pill {
          display: inline-flex;
          align-items: center;
          padding: 9px 18px;
          background: var(--neutral-alpha-weak);
          border: 1px solid var(--neutral-alpha-medium);
          border-radius: 10px;
          color: var(--neutral-on-background-weak);
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .ah-social-pill:hover {
          color: var(--neutral-on-background-strong);
          background: var(--neutral-alpha-medium);
        }

        /* ── Scroll hint ─────────────────────────── */
        .ah-scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          cursor: pointer;
          z-index: 10;
        }
        .ah-scroll-line {
          width: 1px;
          height: 56px;
          background: linear-gradient(to bottom, rgba(23, 192, 253, 0.7), transparent);
          transform-origin: top;
        }

        /* ── Responsive ─────────────────────────── */
        @media (max-width: 600px) {
          .ah-section {
            padding: 5rem 1.2rem 4rem;
          }
          .ah-identity-grid {
            grid-template-columns: repeat(2, 1fr);
            max-width: 340px;
          }
          .ah-name {
            font-size: clamp(2rem, 10vw, 3rem);
          }
          .ah-role-line {
            font-size: 0.82rem;
          }
          .ah-social-pill {
            padding: 8px 12px;
            font-size: 0.78rem;
          }
        }
      `}</style>
    </section>
  );
}
