"use client";

import { motion } from "framer-motion";

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
    <motion.div
      className="mq-outer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="mq-track" style={{ animationName: animName }}>
        {doubled.map((item, i) => (
          <span key={i} className="mq-item">
            {item}
            <span className="mq-dot">✦</span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}
