"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp, FaCalendarDays } from "react-icons/fa6";

import { Fade, Flex, Line, Row, ToggleButton } from "@once-ui-system/core";

import {
  routes,
  display,
  person,
  about,
  blog,
  work,
  gallery,
  contact,
} from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({
  timeZone,
  locale = "en-GB",
}) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Disable body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div
      className={`ct-header-parent ${isMobileMenuOpen ? "ct-menu-active" : ""}`}
    >
      {/* ── Desktop Header ── */}
      <div className="ct-desktop-header">
        <Fade
          fillWidth
          position="fixed"
          height="80"
          zIndex={9}
          className="ct-top-blur"
        />
        <Row
          fitHeight
          className={`${styles.position} ct-desktop-header-row`}
          position="sticky"
          as="header"
          zIndex={9}
          fillWidth
          padding="8"
          horizontal="center"
          data-border="rounded"
          s={{
            position: "fixed",
          }}
        >
          <Row
            paddingLeft="12"
            fillWidth
            vertical="center"
            textVariant="body-default-s"
          >
            {display.location && (
              <Row s={{ hide: true }}>{person.location}</Row>
            )}
          </Row>
          <Row fillWidth horizontal="center">
            <Row
              background="page"
              border="neutral-alpha-weak"
              radius="m-4"
              shadow="l"
              padding="4"
              horizontal="center"
              zIndex={1}
            >
              <Row
                gap="4"
                vertical="center"
                textVariant="body-default-s"
                suppressHydrationWarning
              >
                {routes["/"] && (
                  <ToggleButton
                    prefixIcon="home"
                    href="/"
                    label="Home"
                    selected={pathname === "/"}
                  />
                )}
                <Line background="neutral-alpha-medium" vert maxHeight="24" />
                {routes["/about"] && (
                  <ToggleButton
                    prefixIcon="person"
                    href="/about"
                    label={about.label}
                    selected={pathname === "/about"}
                  />
                )}
                {routes["/work"] && (
                  <ToggleButton
                    prefixIcon="grid"
                    href="/work"
                    label={work.label}
                    selected={pathname.startsWith("/work")}
                  />
                )}
                {routes["/blog"] && (
                  <ToggleButton
                    prefixIcon="book"
                    href="/blog"
                    label={blog.label}
                    selected={pathname.startsWith("/blog")}
                  />
                )}
                {routes["/gallery"] && (
                  <ToggleButton
                    prefixIcon="gallery"
                    href="/gallery"
                    label={gallery.label}
                    selected={pathname.startsWith("/gallery")}
                  />
                )}
                {routes["/contact"] && (
                  <ToggleButton
                    prefixIcon="email"
                    href="/contact"
                    label={contact.label}
                    selected={pathname === "/contact"}
                  />
                )}

                {display.themeSwitcher && (
                  <>
                    <Line
                      background="neutral-alpha-medium"
                      vert
                      maxHeight="24"
                    />
                    <ThemeToggle />
                  </>
                )}
              </Row>
            </Row>
          </Row>
          <Flex fillWidth horizontal="end" vertical="center">
            <Flex
              paddingRight="12"
              horizontal="end"
              vertical="center"
              textVariant="body-default-s"
              gap="20"
            >
              <Flex s={{ hide: true }}>
                {display.time && <TimeDisplay timeZone={person.location} />}
              </Flex>
            </Flex>
          </Flex>
        </Row>
      </div>

      {/* ── Mobile Hamburger Trigger ── */}
      <button
        type="button"
        className={`ct-mobile-hamburger ${isMobileMenuOpen ? "ct-menu-opened" : ""}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }
        }}
        aria-label="Toggle Menu"
      >
        {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* ── Mobile Premium Menu Overlay ── */}
      <div
        className={`ct-mobile-menu-overlay ${isMobileMenuOpen ? "active" : ""}`}
      >
        <div className="ct-mobile-menu-content">
          <div className="ct-menu-brand-header">
            <span className="ct-menu-brand-name">{person.name}</span>
            <span className="ct-menu-brand-title">Menu</span>
          </div>

          <nav className="ct-mobile-nav-links">
            {routes["/"] && (
              <a
                href="/"
                className={`ct-mobile-nav-item ${pathname === "/" ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="ct-nav-num">01</span>
                <span className="ct-nav-text">Home</span>
              </a>
            )}
            {routes["/about"] && (
              <a
                href="/about"
                className={`ct-mobile-nav-item ${pathname === "/about" ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="ct-nav-num">02</span>
                <span className="ct-nav-text">{about.label}</span>
              </a>
            )}
            {routes["/work"] && (
              <a
                href="/work"
                className={`ct-mobile-nav-item ${pathname.startsWith("/work") ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="ct-nav-num">03</span>
                <span className="ct-nav-text">{work.label}</span>
              </a>
            )}
            {routes["/contact"] && (
              <a
                href="/contact"
                className={`ct-mobile-nav-item ${pathname === "/contact" ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="ct-nav-num">04</span>
                <span className="ct-nav-text">{contact.label}</span>
              </a>
            )}
          </nav>

          <div className="ct-menu-footer">
            <div className="ct-menu-footer-divider" />
            <p className="ct-menu-footer-title">Let's Connect</p>
            <div className="ct-menu-footer-actions">
              <a
                href="https://wa.me/919931215160?text=Say%20Hi"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-menu-action-btn wa"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaWhatsapp size={18} />
                <span>Say Hi</span>
              </a>
              <a
                href="https://cal.id/arshad-khan"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-menu-action-btn cal"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaCalendarDays size={16} />
                <span>Book a Call</span>
              </a>
            </div>
            <p className="ct-menu-location">Based in {person.location}</p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ── Floating Mobile Hamburger Trigger ── */
        .ct-mobile-hamburger {
          display: none;
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 1000;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(15, 15, 15, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          align-items: center;
          justify-content: center;
          color: var(--neutral-on-background-strong, #fff);
          cursor: pointer;
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition:
            transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            background-color 0.2s,
            border-color 0.2s;
          outline: none;
        }

        .ct-mobile-hamburger svg {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ct-mobile-hamburger:hover {
          background: rgba(25, 25, 25, 0.9);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .ct-mobile-hamburger:active {
          transform: scale(0.92);
        }

        .ct-menu-active .ct-mobile-hamburger svg {
          transform: rotate(90deg);
        }

        @media (max-width: 768px) {
          .ct-mobile-hamburger {
            display: flex;
          }
        }

        /* ── Mobile Premium Menu Overlay ── */
        .ct-mobile-menu-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(8, 8, 8, 0.92);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          z-index: 999;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ct-mobile-menu-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }

        @media (max-width: 768px) {
          .ct-mobile-menu-overlay {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .ct-mobile-menu-content {
          width: 100%;
          max-width: 480px;
          height: 100%;
          padding: 100px 32px 48px 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transform: translateY(30px) scale(0.96);
          opacity: 0;
          transition:
            transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ct-mobile-menu-overlay.active .ct-mobile-menu-content {
          transform: translateY(0) scale(1);
          opacity: 1;
        }

        /* ── Brand Header ── */
        .ct-menu-brand-header {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ct-menu-brand-name {
          font-family: var(--font-heading), sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--neutral-on-background-strong, #fff);
        }

        .ct-menu-brand-title {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--neutral-on-background-weak, #a0a0a0);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* ── Numbered Navigation Links ── */
        .ct-mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 40px 0;
        }

        .ct-mobile-nav-item {
          display: flex;
          align-items: baseline;
          gap: 20px;
          text-decoration: none;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          transition:
            border-color 0.25s,
            transform 0.25s;
        }

        .ct-mobile-nav-item:hover,
        .ct-mobile-nav-item.active {
          border-color: rgba(255, 255, 255, 0.12);
        }

        .ct-nav-num {
          font-family: var(--font-code), monospace;
          font-size: 0.9rem;
          color: var(
            --brand-on-background-weak,
            var(--neutral-on-background-weak)
          );
          opacity: 0.6;
        }

        .ct-nav-text {
          font-family: var(--font-heading), sans-serif;
          font-size: 2.25rem;
          font-weight: 500;
          letter-spacing: -0.03em;
          color: var(--neutral-on-background-weak, #d0d0d0);
          transition:
            color 0.25s,
            transform 0.25s;
        }

        .ct-mobile-nav-item:hover .ct-nav-text,
        .ct-mobile-nav-item.active .ct-nav-text {
          color: var(--neutral-on-background-strong, #fff);
          transform: translateX(4px);
        }

        /* ── Menu Footer Actions ── */
        .ct-menu-footer {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ct-menu-footer-divider {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.06);
          margin-bottom: 8px;
        }

        .ct-menu-footer-title {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--neutral-on-background-weak, #a0a0a0);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .ct-menu-footer-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          width: 100%;
        }

        .ct-menu-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          border-radius: 12px;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          transition:
            transform 0.2s,
            background 0.2s,
            border-color 0.2s;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .ct-menu-action-btn.wa {
          background: rgba(37, 211, 102, 0.08);
          border-color: rgba(37, 211, 102, 0.2);
          color: #25d366;
        }

        .ct-menu-action-btn.wa:hover {
          background: rgba(37, 211, 102, 0.15);
          transform: translateY(-2px);
        }

        .ct-menu-action-btn.cal {
          background: rgba(255, 255, 255, 0.03);
          color: var(--neutral-on-background-strong, #fff);
        }

        .ct-menu-action-btn.cal:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
        }

        .ct-menu-action-btn:active {
          transform: scale(0.96);
        }

        .ct-menu-location {
          font-size: 0.85rem;
          color: var(--neutral-on-background-weak, #a0a0a0);
          text-align: center;
          margin-top: 12px;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};
