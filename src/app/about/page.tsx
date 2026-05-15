import { Meta, Schema, Column } from "@once-ui-system/core";
import { baseURL, about, person } from "@/resources";
import { ScrollProgressBar } from "@/components/home/ScrollProgressBar";
import { AboutHero } from "@/components/about/AboutHero";
import { WorkTimeline } from "@/components/about/WorkTimeline";
import { PinnacleGrid } from "@/components/about/PinnacleGrid";
import { ClosingSection } from "@/components/about/ClosingSection";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  return (
    <Column maxWidth="m" gap="0" paddingY="0" horizontal="center">
      <ScrollProgressBar />
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <AboutHero />
      <WorkTimeline />
      <PinnacleGrid />
      <ClosingSection />
    </Column>
  );
}
