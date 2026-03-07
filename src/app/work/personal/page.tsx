import {
  Column,
  Heading,
  Meta,
  Schema,
  Button,
  RevealFx,
  Text,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: `Personal Projects - ${person.name}`,
    description: "A collection of my personal projects and experiments.",
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent("Personal Projects")}`,
    path: `${work.path}/personal`,
  });
}

export default function PersonalWork() {
  return (
    <Column maxWidth="m" paddingTop="24" gap="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={`${work.path}/personal`}
        title={`Personal Projects - ${person.name}`}
        description="A collection of my personal projects and experiments."
        image={`/api/og/generate?title=${encodeURIComponent(
          "Personal Projects",
        )}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <RevealFx speed="medium" translateY="0">
        <Button
          href="/work"
          variant="tertiary"
          size="s"
          prefixIcon="arrowRight"
          style={{ transform: "rotate(180deg)", width: "fit-content" }}
        >
          <Text variant="label-default-s">Back to Projects</Text>
        </Button>
      </RevealFx>

      <RevealFx speed="medium" delay={0.2}>
        <Heading variant="display-strong-xs">Personal Projects</Heading>
      </RevealFx>

      <RevealFx speed="medium" delay={0.4}>
        <Projects type="personal" columns="3" />
      </RevealFx>
    </Column>
  );
}
