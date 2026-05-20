"use client";

const ITEMS = [
  "NestJS",
  "AWS",
  "PostgreSQL",
  "Redis",
  "AI / ML",
  "React Native",
  "Python",
  "Docker",
  "TypeScript",
  "GraphQL",
  "Kafka",
  "LangChain",
  "OpenAI API",
  "WebSockets",
  "Prisma",
  "MongoDB",
];

export function MarqueeBanner({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...ITEMS, ...ITEMS];
  const animName = reverse ? "mq-scroll-r" : "mq-scroll-l";

  return (
    <div className="mq-outer">
      <div className="mq-track" style={{ animationName: animName }}>
        {doubled.map((item, i) => (
          <span key={i} className="mq-item">
            {item}
            <span className="mq-dot">✦</span>
          </span>
        ))}
      </div>

      <style jsx global>{`
        .mq-outer {
          overflow: hidden;
          padding: 18px 0;
          border-top: 1px solid var(--neutral-alpha-weak);
          border-bottom: 1px solid var(--neutral-alpha-weak);
          position: relative;
          width: 100%;
        }
        .mq-outer::before,
        .mq-outer::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .mq-outer::before {
          left: 0;
          background: linear-gradient(90deg, var(--page-background) 20%, transparent 100%);
        }
        .mq-outer::after {
          right: 0;
          background: linear-gradient(-90deg, var(--page-background) 20%, transparent 100%);
        }
        .mq-track {
          display: flex;
          width: max-content;
          animation-duration: 28s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          gap: 0;
        }
        .mq-item {
          display: inline-flex;
          align-items: center;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--neutral-on-background-weak);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0 18px;
          white-space: nowrap;
          transition: color 0.2s;
        }
        .mq-item:hover {
          color: var(--neutral-on-background-medium);
        }
        .mq-dot {
          color: var(--brand-on-background-weak);
          font-size: 0.55rem;
          margin-left: 18px;
        }
        @media (max-width: 480px) {
          .mq-outer {
            padding: 14px 0;
          }
          .mq-item {
            font-size: 0.65rem;
            padding: 0 14px;
            letter-spacing: 0.08em;
          }
          .mq-dot {
            margin-left: 14px;
          }
        }
        @keyframes mq-scroll-l {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes mq-scroll-r {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
