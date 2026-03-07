import {
  Column,
  Heading,
  Meta,
  Schema,
  SmartLink,
  Text,
  RevealFx,
  Icon,
  Flex,
  Row,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m" paddingTop="24" gap="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <RevealFx speed="medium" translateY="0" fillWidth>
        <Heading variant="display-strong-s" align="center">
          {work.title}
        </Heading>
      </RevealFx>

      <Column fillWidth gap="32" paddingX="l">
        <RevealFx delay={0.2} speed="medium" fillWidth>
          <SmartLink
            href="/work/personal"
            fillWidth
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Flex
              fillWidth
              padding="32"
              radius="l"
              background="surface"
              border="neutral-alpha-weak"
              gap="24"
              vertical="center"
              style={{
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Flex
                background="brand-alpha-weak"
                padding="16"
                radius="m"
                vertical="center"
                horizontal="center"
                style={{
                  minWidth: "64px",
                  minHeight: "64px",
                }}
              >
                <Icon name="person" size="l" onBackground="brand-strong" />
              </Flex>
              <Column gap="8" flex={1}>
                <Row vertical="center" gap="8">
                  <Heading variant="heading-strong-l">
                    Personal Projects
                  </Heading>
                  <Icon
                    name="arrowRight"
                    size="s"
                    onBackground="neutral-weak"
                  />
                </Row>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  Explore my personal experiments, passion projects, and
                  open-source contributions.
                </Text>
              </Column>
            </Flex>
          </SmartLink>
        </RevealFx>

        <RevealFx delay={0.4} speed="medium" fillWidth>
          <SmartLink
            href="/work/freelance"
            fillWidth
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Flex
              fillWidth
              padding="32"
              radius="l"
              background="surface"
              border="neutral-alpha-weak"
              gap="24"
              vertical="center"
              style={{
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Flex
                background="brand-alpha-weak"
                padding="16"
                radius="m"
                vertical="center"
                horizontal="center"
                style={{
                  minWidth: "64px",
                  minHeight: "64px",
                }}
              >
                <Icon name="rocket" size="l" onBackground="brand-strong" />
              </Flex>
              <Column gap="8" flex={1}>
                <Row vertical="center" gap="8">
                  <Heading variant="heading-strong-l">
                    Freelance Projects
                  </Heading>
                  <Icon
                    name="arrowRight"
                    size="s"
                    onBackground="neutral-weak"
                  />
                </Row>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  Professional work delivered for various clients and agencies
                  across different industries.
                </Text>
              </Column>
            </Flex>
          </SmartLink>
        </RevealFx>
      </Column>
    </Column>
  );
}
