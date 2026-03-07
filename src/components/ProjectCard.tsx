"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  Media,
} from "@once-ui-system/core";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  github?: string;
  live?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  github,
  live,
}) => {
  return (
    <Column
      fillWidth
      background="surface"
      radius="l"
      border="neutral-alpha-weak"
      className={styles.card}
      style={{ overflow: "hidden" }}
    >
      <Carousel
        aspectRatio="16 / 9"
        sizes="(max-width: 960px) 100vw, 480px"
        items={images.map((image) => ({
          slide: image,
          alt: title,
        }))}
      />
      <Flex direction="column" fillWidth padding="m" gap="m">
        <Flex direction="column" gap="s">
          <Heading as="h2" variant="heading-strong-m">
            {title}
          </Heading>
          {description?.trim() && (
            <Text
              wrap="balance"
              variant="body-default-xs"
              onBackground="neutral-weak"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {description}
            </Text>
          )}
        </Flex>

        <Flex direction="column" gap="m">
          {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="s" reverse />}
          <Flex gap="16" wrap>
            <SmartLink
              suffixIcon="arrowRight"
              style={{ margin: "0", width: "fit-content" }}
              href={href}
            >
              <Text variant="body-default-xs">Learn more</Text>
            </SmartLink>
            {github && (
              <SmartLink
                suffixIcon="arrowUpRightFromSquare"
                style={{ margin: "0", width: "fit-content" }}
                href={github}
              >
                <Text variant="body-default-xs">GitHub</Text>
              </SmartLink>
            )}
            {live && (
              <SmartLink
                suffixIcon="arrowUpRightFromSquare"
                style={{ margin: "0", width: "fit-content" }}
                href={live}
              >
                <Text variant="body-default-xs">Live Demo</Text>
              </SmartLink>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Column>
  );
};
