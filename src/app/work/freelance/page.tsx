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
    title: `Freelance Projects - ${person.name}`,
    description: "A collection of my professional freelance projects.",
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent("Freelance Projects")}`,
    path: `${work.path}/freelance`,
  });
}

export default function FreelanceWork() {
  return (
    <Column maxWidth="m" paddingTop="24" gap="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={`${work.path}/freelance`}
        title={`Freelance Projects - ${person.name}`}
        description="A collection of my professional freelance projects."
        image={`/api/og/generate?title=${encodeURIComponent("Freelance Projects")}`}
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
          prefixIcon="chevronLeft"
        >
          <Text variant="label-default-s">Back to Projects</Text>
        </Button>
      </RevealFx>

      <RevealFx speed="medium" delay={0.2}>
        <Heading variant="display-strong-xs">Freelance Projects</Heading>
      </RevealFx>

      <RevealFx speed="medium" delay={0.4}>
        <Projects type="freelance" columns="2" />
      </RevealFx>
    </Column>
  );
}
