"use client";

import React from "react";
import { Row, Column, Heading, Text, Icon, Button } from "@once-ui-system/core";
import styles from "./TechLogos.module.scss";
import { about } from "@/resources";

const technologies = [
  { name: "Node.js", icon: "node" },
  { name: "Nest.js", icon: "nestjs" },
  { name: "Spring Boot", icon: "springboot" },
  { name: "React.js", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Python", icon: "python" },
  { name: "MySQL", icon: "mysql" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "AWS", icon: "aws" },
  { name: "Docker", icon: "docker" },
  { name: "JavaScript", icon: "javascript" },
  { name: "Supabase", icon: "supabase" },
  { name: "Figma", icon: "figma" },
  { name: "Redis", icon: "redis" },
  { name: "Kafka", icon: "kafka" },
  { name: "Open Code", icon: "vscode" },
];

export const TechLogos = () => {
  return (
    <Column
      fillWidth
      gap="32"
      paddingTop="32"
      paddingBottom="128"
      horizontal="center"
    >
      <Column horizontal="center" gap="16">
        <Column horizontal="center" gap="8">
          <Heading as="h2" variant="display-strong-xs" wrap="balance">
            Technologies & Skills
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-m">
            The tools and technologies I use to bring ideas to life.
          </Text>
        </Column>
        <Button
          href={`${about.path}#${encodeURIComponent(about.technical.title)}`}
          variant="secondary"
          size="s"
        >
          View all skills
        </Button>
      </Column>
      <div className={styles.container}>
        <div className={styles.floatingArea}>
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className={styles.floatingIcon}
              style={
                {
                  "--index": index,
                } as React.CSSProperties
              }
            >
              <Icon name={tech.icon} size="l" />
            </div>
          ))}
        </div>
      </div>
    </Column>
  );
};
