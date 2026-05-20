import { Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { getPosts } from "@/utils/utils";
import { WorkContent, type ProjectData } from "@/components/work/WorkContent";
import { ScrollProgressBar } from "@/components/home/ScrollProgressBar";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

const SAAS_BADGES = ["SaaS"];
const CLIENT_SLUGS = [
  "ramesys",
  "beanbagaffairs",
  "vydhra",
  "soho",
  "amico-engineering",
  "masominds",
];

export default function Work() {
  const raw = getPosts(["src", "app", "work", "projects"]);

  const allProjects: ProjectData[] = raw
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
    )
    .map((p) => ({
      slug: p.slug,
      metadata: {
        title: p.metadata.title,
        summary: p.metadata.summary,
        images: p.metadata.images ?? [],
        badge: p.metadata.badge,
        live: p.metadata.live,
        github: p.metadata.github,
        publishedAt: p.metadata.publishedAt,
      },
    }));

  const saas = allProjects.filter((p) => SAAS_BADGES.includes(p.metadata.badge ?? ""));

  const clients = allProjects.filter((p) => CLIENT_SLUGS.includes(p.slug));

  const personal = allProjects.filter(
    (p) => !SAAS_BADGES.includes(p.metadata.badge ?? "") && !CLIENT_SLUGS.includes(p.slug),
  );

  return (
    <>
      <ScrollProgressBar />
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
      <WorkContent saas={saas} clients={clients} personal={personal} />
    </>
  );
}
