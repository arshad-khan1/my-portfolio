import { getPosts } from "@/utils/utils";
import { Grid } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  type?: "personal" | "freelance";
  columns?: "1" | "2" | "3";
}

export function Projects({
  range,
  exclude,
  type,
  columns = "1",
}: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  const freelanceSlugs = ["ramesys", "beanbagaffairs", "vydhra", "soho"];

  if (type === "freelance") {
    allProjects = allProjects.filter((post) =>
      freelanceSlugs.includes(post.slug),
    );
  } else if (type === "personal") {
    allProjects = allProjects.filter(
      (post) => !freelanceSlugs.includes(post.slug),
    );
  }

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Grid columns={columns} s={{ columns: 1 }} fillWidth gap="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={
            post.metadata.team?.map((member) => ({ src: member.avatar })) || []
          }
          link={post.metadata.link || ""}
          github={post.metadata.github}
          live={post.metadata.live}
          badge={post.metadata.badge}
        />
      ))}
    </Grid>
  );
}
