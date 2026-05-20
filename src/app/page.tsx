import {
  Heading,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import { Contact, TechLogos, BentoGrid } from "@/components";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ImpactMetrics } from "@/components/home/ImpactMetrics";
import { BusinessValue } from "@/components/home/BusinessValue";
import { MarqueeBanner } from "@/components/home/MarqueeBanner";
import { ScrollProgressBar } from "@/components/home/ScrollProgressBar";
import { FounderSection } from "@/components/home/FounderSection";
import { Posts } from "@/components/blog/Posts";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="0" horizontal="center">
      <ScrollProgressBar />
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Hero Section */}
      <HeroSection headline={home.headline} subline={home.subline} />

      {/* Founder showcase — ReviewsNext */}
      <FounderSection />

      {/* Marquee ticker */}
      <MarqueeBanner />

      {/* Impact Metrics */}
      <ImpactMetrics />

      {/* Marquee ticker reversed */}
      <MarqueeBanner reverse />

      {/* Featured Projects - Best Work */}
      <FeaturedProjects />

      {/* Business Value Proposition */}
      <BusinessValue />

      {/* Bento Grid - Engineering Deep Dives */}
      <BentoGrid />

      {/* Tech Logos */}
      <TechLogos />

      {routes["/blog"] && (
        <Column fillWidth gap="24" marginBottom="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
            <Row flex={1} paddingLeft="l" paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                Latest from the blog
              </Heading>
            </Row>
            <Row flex={3} paddingX="20">
              <Posts range={[1, 2]} columns="2" />
            </Row>
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      )}

      <div id="contact">
        <Contact />
      </div>
    </Column>
  );
}
