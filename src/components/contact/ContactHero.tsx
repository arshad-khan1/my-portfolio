"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { person, social, about } from "@/resources";
import {
  FiCalendar,
  FiMapPin,
  FiMail,
  FiPhone,
  FiSend,
  FiCheckCircle,
  FiCopy,
  FiExternalLink,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";
import {
  Button,
  Input,
  Textarea,
  Text,
  Heading,
  Row,
  Column,
} from "@once-ui-system/core";
import type React from "react";

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
        x: [0, 40, -30, 0],
        y: [0, -50, 30, 0],
        scale: [1, 1.25, 0.9, 1],
      }}
      transition={{
        duration: 9 + delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ContactHero() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => setMounted(true), []);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, -80]);

  const copyEmail = () => {
    navigator.clipboard.writeText(person.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const newErrors = { name: "", email: "", subject: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Please enter a subject";
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please write a message";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to send message. Please try again.",
        );
      }

      if (data.simulation) {
        console.warn(
          "⚠️ magic-portfolio contact: Received message in simulation mode. Define RESEND_API_KEY in your .env file to enable real delivery.",
        );
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="ct-section">
      {/* Background orbs */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: bgY,
          pointerEvents: "none",
        }}
      >
        <FloatingOrb
          x="10%"
          y="15%"
          size={350}
          color="rgba(4,158,226,0.08)"
          delay={0}
        />
        <FloatingOrb
          x="75%"
          y="60%"
          size={450}
          color="rgba(23,192,253,0.06)"
          delay={2}
        />
        <FloatingOrb
          x="20%"
          y="75%"
          size={250}
          color="rgba(139,92,246,0.06)"
          delay={1}
        />
        <FloatingOrb
          x="80%"
          y="8%"
          size={280}
          color="rgba(4,158,226,0.07)"
          delay={3}
        />
      </motion.div>

      {/* Grid lines */}
      <div className="ct-grid-bg" />

      <motion.div
        className="ct-inner"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Header Title */}
        <motion.div variants={fadeUp} className="ct-header-group">
          <span className="ct-eyebrow">Get in touch</span>
          <h1 className="ct-title">Let&apos;s Build Something Scale</h1>
          <p className="ct-subtitle">
            Have a project in mind, want to discuss operational AI workflows, or
            just want to say hi? Drop me a line below and I will get back to you
            within 24 hours.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="ct-main-grid">
          {/* LEFT: Info Column */}
          <motion.div variants={fadeUp} className="ct-info-col">
            <div className="ct-glass-card ct-info-card">
              <span className="ct-card-label">Contact Details</span>

              {/* Email */}
              <div className="ct-info-item">
                <div className="ct-icon-box">
                  <FiMail size={16} />
                </div>
                <div className="ct-info-text-group">
                  <p className="ct-info-lbl">Direct Email</p>
                  <a
                    href={`mailto:${person.email}`}
                    className="ct-info-val ct-link"
                  >
                    {person.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="ct-copy-btn"
                  title="Copy to clipboard"
                >
                  <FiCopy
                    size={14}
                    className={copied ? "ct-copied-anim" : ""}
                  />
                  <span className="ct-tooltip">
                    {copied ? "Copied!" : "Copy"}
                  </span>
                </button>
              </div>

              {/* Location */}
              <div className="ct-info-item">
                <div className="ct-icon-box">
                  <FiMapPin size={16} />
                </div>
                <div className="ct-info-text-group">
                  <p className="ct-info-lbl">Location</p>
                  <p className="ct-info-val">Nagpur, Maharashtra, India</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="ct-info-item">
                <div
                  className="ct-icon-box"
                  style={{
                    color: "#22c55e",
                    background: "rgba(34, 197, 94, 0.08)",
                    borderColor: "rgba(34, 197, 94, 0.2)",
                  }}
                >
                  <FaWhatsapp size={16} />
                </div>
                <div className="ct-info-text-group">
                  <p className="ct-info-lbl">WhatsApp</p>
                  <a
                    href="https://wa.me/918668721925?text=Hello%20Arshad!%20I%27d%20love%20to%20connect%20with%20you."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ct-info-val ct-link"
                    style={{ color: "#22c55e" }}
                  >
                    Say Hi
                  </a>
                </div>
              </div>

              {/* Phone if present */}
              {social.find((s) => s.name === "Phone") && (
                <div className="ct-info-item">
                  <div className="ct-icon-box">
                    <FiPhone size={16} />
                  </div>
                  <div className="ct-info-text-group">
                    <p className="ct-info-lbl">Direct Contact</p>
                    <a
                      href={social.find((s) => s.name === "Phone")?.link}
                      className="ct-info-val ct-link"
                    >
                      +91 86687 21925
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Scheduler Block */}
            {about.calendar.display && (
              <div className="ct-glass-card ct-schedule-card">
                <div className="ct-schedule-header">
                  <span className="ct-schedule-dot" />
                  <span className="ct-schedule-live">Live Calendar</span>
                </div>
                <h3 className="ct-schedule-title">
                  Book a 15-Min Strategy Session
                </h3>
                <p className="ct-schedule-desc">
                  Choose a direct slot on my calendar to discuss scaling your
                  product or automating operations using AI workflows.
                </p>
                <a
                  href={about.calendar.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ct-schedule-btn"
                >
                  <FiCalendar size={15} />
                  <span>Schedule Live Sync</span>
                  <FiExternalLink
                    size={12}
                    style={{ marginLeft: "4px", opacity: 0.8 }}
                  />
                </a>
              </div>
            )}
          </motion.div>

          {/* RIGHT: Form Column */}
          <motion.div variants={fadeUp} className="ct-form-col">
            <div className="ct-glass-card ct-form-card">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="ct-card-label">Send Message</span>
                    <div className="ct-form-fields">
                      {/* Name input */}
                      <div className="ct-field-wrap">
                        <label htmlFor="name" className="ct-field-label">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          errorMessage={errors.name}
                        />
                      </div>

                      {/* Email input */}
                      <div className="ct-field-wrap">
                        <label htmlFor="email" className="ct-field-label">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          errorMessage={errors.email}
                        />
                      </div>

                      {/* Subject input */}
                      <div className="ct-field-wrap">
                        <label htmlFor="subject" className="ct-field-label">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="Project Discussion"
                          required
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            })
                          }
                          errorMessage={errors.subject}
                        />
                      </div>

                      {/* Message Input */}
                      <div className="ct-field-wrap">
                        <label htmlFor="message" className="ct-field-label">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell me about your vision..."
                          required
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          errorMessage={errors.message}
                        />
                      </div>

                      {/* Submit error message */}
                      {submitError && (
                        <p
                          style={{
                            color: "#ef4444",
                            fontSize: "0.82rem",
                            fontWeight: "600",
                            margin: "5px 0 0",
                            textAlign: "center",
                          }}
                        >
                          ❌ {submitError}
                        </p>
                      )}

                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="ct-submit-btn"
                      >
                        {submitting ? (
                          <>
                            <span className="ct-spinner" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <FiSend size={14} />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="ct-success-state"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  >
                    <div className="ct-success-icon-wrap">
                      <FiCheckCircle size={40} className="ct-success-icon" />
                    </div>
                    <h3 className="ct-success-title">
                      Message Sent Successfully!
                    </h3>
                    <p className="ct-success-desc">
                      Thank you for getting in touch,{" "}
                      {formData.name || "friend"}! I have received your message
                      and will review it shortly. You can expect a response at{" "}
                      <strong>{formData.email || "your inbox"}</strong> within
                      24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="ct-reset-btn"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Find Me Online - Full Width Wrap Row */}
        <motion.div variants={fadeUp} className="ct-social-section-wrapper">
          <div className="ct-glass-card ct-social-card">
            <p className="ct-social-label">Find Me Online</p>
            <div className="ct-social-grid">
              {/* GitHub */}
              <a
                href="https://github.com/arshad-khan1"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-social-item ct-github"
              >
                <div className="ct-social-icon-box">
                  <FaGithub size={18} />
                </div>
                <div className="ct-social-details">
                  <span className="ct-social-name">GitHub</span>
                  <span className="ct-social-username">@arshad-khan1</span>
                </div>
                <FiExternalLink size={14} className="ct-social-arrow" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/arshad-khan-linkdin/"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-social-item ct-linkedin"
              >
                <div className="ct-social-icon-box">
                  <FaLinkedinIn size={18} />
                </div>
                <div className="ct-social-details">
                  <span className="ct-social-name">LinkedIn</span>
                  <span className="ct-social-username">Arshad Khan</span>
                </div>
                <FiExternalLink size={14} className="ct-social-arrow" />
              </a>

              {/* X (formerly Twitter) */}
              <div className="ct-social-item ct-future">
                <div className="ct-social-icon-box">
                  <FaXTwitter size={18} />
                </div>
                <div className="ct-social-details">
                  <span className="ct-social-name">X / Twitter</span>
                  <span className="ct-social-username">Coming Soon</span>
                </div>
              </div>

              {/* Instagram */}
              <div className="ct-social-item ct-future">
                <div className="ct-social-icon-box">
                  <FaInstagram size={18} />
                </div>
                <div className="ct-social-details">
                  <span className="ct-social-name">Instagram</span>
                  <span className="ct-social-username">Coming Soon</span>
                </div>
              </div>

              {/* YouTube */}
              <div className="ct-social-item ct-future">
                <div className="ct-social-icon-box">
                  <FaYoutube size={18} />
                </div>
                <div className="ct-social-details">
                  <span className="ct-social-name">YouTube</span>
                  <span className="ct-social-username">Coming Soon</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        /* ── Section & Layout ────────────────────────────── */
        .ct-section {
          width: 100%;
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          overflow: hidden;
          isolation: isolate;
          padding: 8rem 2rem 6rem;
        }

        .ct-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(4, 158, 226, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(4, 158, 226, 0.02) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none;
        }

        .ct-inner {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        /* ── Header Title Group ─────────────────────────── */
        .ct-header-group {
          text-align: center;
          max-width: 680px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ct-eyebrow {
          font-size: 0.75rem;
          color: #049ee2;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-weight: 700;
        }

        .ct-title {
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #fff;
          margin: 0;
          text-shadow: 0 0 50px rgba(4, 158, 226, 0.15);
        }

        .ct-subtitle {
          font-size: clamp(0.92rem, 1.8vw, 1.05rem);
          line-height: 1.7;
          color: var(--neutral-on-background-weak);
          margin: 0;
        }

        /* ── Main Grid Layout ────────────────────────────── */
        .ct-main-grid {
          display: grid;
          grid-template-columns: 430px 1fr;
          gap: 2.2rem;
          align-items: start;
        }

        /* ── Glassmorphism Card Base ─────────────────────── */
        .ct-glass-card {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.03) 0%,
            rgba(255, 255, 255, 0.01) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          padding: 2.2rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          position: relative;
          overflow: visible;
        }

        .ct-card-label {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #049ee2;
          font-weight: 700;
          display: block;
          margin-bottom: 2rem;
        }

        /* ── LEFT Column Info & Scheduler ─────────────────── */
        .ct-info-col {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        .ct-info-item {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 1.8rem;
          position: relative;
        }
        .ct-info-item:last-child {
          margin-bottom: 0;
        }

        .ct-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(4, 158, 226, 0.08);
          border: 1px solid rgba(4, 158, 226, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #17c0fd;
          flex-shrink: 0;
        }

        .ct-info-text-group {
          flex: 1;
          min-width: 0;
        }

        .ct-info-lbl {
          font-size: 0.72rem;
          color: var(--neutral-on-background-weak);
          margin: 0 0 3px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .ct-info-val {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--neutral-on-background-strong);
          margin: 0;
          word-break: break-all;
        }

        .ct-link {
          color: #17c0fd;
          text-decoration: none;
          transition: color 0.2s;
        }
        .ct-link:hover {
          color: #60e4fc;
          text-decoration: underline;
        }

        /* Copy Button Tooltip */
        .ct-copy-btn {
          background: transparent;
          border: none;
          color: var(--neutral-on-background-weak);
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition:
            background 0.2s,
            color 0.2s;
        }
        .ct-copy-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #17c0fd;
        }

        .ct-copied-anim {
          color: #22c55e !important;
          animation: ct-pop 0.3s ease;
        }

        .ct-tooltip {
          position: absolute;
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          background: #111;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          font-size: 0.65rem;
          padding: 4px 8px;
          border-radius: 4px;
          opacity: 0;
          pointer-events: none;
          transition:
            opacity 0.2s,
            transform 0.2s;
          white-space: nowrap;
          z-index: 100;
        }
        .ct-copy-btn:hover .ct-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        /* Live Scheduler Card */
        .ct-schedule-card {
          background: linear-gradient(
            135deg,
            rgba(4, 158, 226, 0.06) 0%,
            rgba(255, 255, 255, 0.01) 100%
          );
          border: 1px solid rgba(4, 158, 226, 0.16);
          position: relative;
        }
        .ct-schedule-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #17c0fd, transparent);
          border-radius: 24px 24px 0 0;
        }

        .ct-schedule-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 1.2rem;
        }

        .ct-schedule-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 10px #22c55e;
          animation: pulse 1.8s infinite;
        }

        .ct-schedule-live {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #22c55e;
          font-weight: 700;
        }

        .ct-schedule-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 10px;
          letter-spacing: -0.01em;
        }

        .ct-schedule-desc {
          font-size: 0.82rem;
          line-height: 1.5;
          color: var(--neutral-on-background-weak);
          margin: 0 0 1.6rem;
        }

        .ct-schedule-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 12px 20px;
          background: linear-gradient(135deg, #17c0fd 0%, #049ee2 100%);
          color: #fff;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.88rem;
          text-decoration: none;
          box-shadow: 0 5px 15px rgba(4, 158, 226, 0.25);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ct-schedule-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(4, 158, 226, 0.45);
        }

        /* Social grid styles */
        .ct-social-section-wrapper {
          width: 100%;
          margin-top: 1rem;
        }

        .ct-social-card {
          padding: 1.8rem;
          width: 100%;
        }

        .ct-social-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--neutral-on-background-weak);
          margin-bottom: 1.2rem;
          font-weight: 700;
        }

        .ct-social-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          width: 100%;
        }

        .ct-social-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s, border-color 0.2s, background 0.2s, box-shadow 0.2s;
          position: relative;
          flex: 1 1 calc(20% - 13px);
          min-width: 180px;
        }

        .ct-social-item:not(.ct-future) {
          cursor: pointer;
        }

        .ct-social-item.ct-future {
          opacity: 0.45;
          background: rgba(255, 255, 255, 0.01);
          border-style: dashed;
        }

        .ct-social-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--neutral-on-background-medium);
          transition: color 0.2s, background 0.2s, border-color 0.2s;
        }

        .ct-social-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .ct-social-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: #fff;
        }

        .ct-social-username {
          font-size: 0.75rem;
          color: var(--neutral-on-background-weak);
        }

        .ct-social-arrow {
          color: var(--neutral-on-background-weak);
          opacity: 0.5;
          transition: transform 0.2s, opacity 0.2s, color 0.2s;
        }

        /* Hover states */
        .ct-social-item:not(.ct-future):hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.04);
        }

        .ct-social-item:not(.ct-future):hover .ct-social-arrow {
          transform: translateX(2px);
          opacity: 1;
          color: #fff;
        }

        /* Brand Colors & Neon glow effects */
        .ct-social-item.ct-github:hover {
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.03);
        }
        .ct-social-item.ct-github:hover .ct-social-icon-box {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .ct-social-item.ct-linkedin:hover {
          border-color: rgba(10, 102, 194, 0.4);
          box-shadow: 0 10px 30px rgba(10, 102, 194, 0.1);
        }
        .ct-social-item.ct-linkedin:hover .ct-social-icon-box {
          color: #0a66c2;
          background: rgba(10, 102, 194, 0.1);
          border-color: rgba(10, 102, 194, 0.3);
        }

        /* ── RIGHT Column Form Card ──────────────────────── */
        .ct-form-card {
          width: 100%;
          min-height: 520px;
        }

        .ct-form-fields {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .ct-field-wrap {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ct-field-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--neutral-on-background-medium);
        }

        /* Custom Submit Button */
        .ct-submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #17c0fd 0%, #049ee2 100%);
          border: none;
          color: #fff;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(4, 158, 226, 0.25);
          transition:
            transform 0.2s,
            box-shadow 0.2s;
          margin-top: 1rem;
        }
        .ct-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(4, 158, 226, 0.45);
        }
        .ct-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* ── Success State Animation ─────────────────────── */
        .ct-success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 3rem 1rem;
          min-height: 440px;
        }

        .ct-success-icon-wrap {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(34, 197, 94, 0.1);
          border: 2px solid rgba(34, 197, 94, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #22c55e;
          margin-bottom: 1.8rem;
          box-shadow: 0 0 30px rgba(34, 197, 94, 0.2);
        }

        .ct-success-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 12px;
          letter-spacing: -0.02em;
        }

        .ct-success-desc {
          font-size: 0.9rem;
          line-height: 1.65;
          color: var(--neutral-on-background-weak);
          max-width: 440px;
          margin: 0 0 2rem;
        }

        .ct-success-desc strong {
          color: #fff;
        }

        .ct-reset-btn {
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          color: var(--neutral-on-background-medium);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition:
            background 0.2s,
            color 0.2s,
            border-color 0.2s;
        }
        .ct-reset-btn:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.15);
          color: #fff;
        }

        /* ── Spinner animation ───────────────────────────── */
        .ct-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.4;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes ct-pop {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }

        /* ── Responsive breakpoints ──────────────────────── */
        @media (max-width: 1000px) {
          .ct-main-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .ct-info-col {
            order: 2;
          }
          .ct-form-col {
            order: 1;
          }
          .ct-social-item {
            flex: 1 1 calc(33.333% - 11px);
          }
        }

        @media (max-width: 600px) {
          .ct-section {
            padding: 6.5rem 1.2rem 4rem;
          }
          .ct-inner {
            gap: 2.2rem;
          }
          .ct-glass-card {
            padding: 1.5rem;
          }
          .ct-info-item {
            gap: 12px;
          }
          .ct-icon-box {
            width: 36px;
            height: 36px;
            border-radius: 10px;
          }
          .ct-title {
            font-size: clamp(1.8rem, 8vw, 2.5rem);
          }
          .ct-schedule-title {
            font-size: 1.05rem;
          }
          .ct-social-item {
            flex: 1 1 calc(50% - 8px);
            min-width: 140px;
          }
        }
        @media (max-width: 420px) {
          .ct-social-item {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </section>
  );
}
