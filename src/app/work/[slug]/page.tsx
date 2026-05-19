import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import {
  Meta,
  Schema,
  AvatarGroup,
  Button,
  Column,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
  Line,
  Badge,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { WorkDetailContent } from "@/components/work/WorkDetailContent";
import { Metadata } from "next";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  const post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image:
      post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = getPosts(["src", "app", "work", "projects"]).find(
    (post) => post.slug === slugPath,
  );

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((member) => ({
      src: member.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="l" fillWidth horizontal="center" gap="0">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image ||
          `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Back navigation */}
      <Row fillWidth paddingY="m">
        <SmartLink href="/work">
          <Text variant="label-default-s" onBackground="neutral-weak">
            ← All Projects
          </Text>
        </SmartLink>
      </Row>

      {/* Project header */}
      <Column fillWidth gap="24" style={{ paddingBottom: "2.5rem" }}>
        <Row gap="12" vertical="center">
          {post.metadata.badge && (
            <Badge
              paddingX="8"
              paddingY="4"
              background="brand-alpha-weak"
              onBackground="brand-strong"
              textVariant="label-strong-xs"
            >
              {post.metadata.badge}
            </Badge>
          )}
          {post.metadata.publishedAt && (
            <Text variant="body-default-xs" onBackground="neutral-weak">
              {formatDate(post.metadata.publishedAt)}
            </Text>
          )}
        </Row>

        <Heading
          variant="display-strong-l"
          style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}
        >
          {post.metadata.title}
        </Heading>

        {post.metadata.summary && (
          <Text
            variant="body-default-l"
            onBackground="neutral-weak"
            style={{ maxWidth: "640px", lineHeight: 1.7 }}
          >
            {post.metadata.summary}
          </Text>
        )}

        <Row gap="12" vertical="center" style={{ flexWrap: "wrap" }}>
          {post.metadata.live && (
            <Button
              href={post.metadata.live}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="m"
              prefixIcon="arrowUpRightFromSquare"
            >
              Live Site
            </Button>
          )}
          {post.metadata.github && (
            <Button
              href={post.metadata.github}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="m"
              prefixIcon="github"
            >
              GitHub
            </Button>
          )}
        </Row>

        {post.metadata.team && post.metadata.team.length > 0 && (
          <Row gap="12" vertical="center">
            <AvatarGroup reverse avatars={avatars} size="s" />
            {post.metadata.team.map((member, idx) => (
              <Text key={idx} variant="label-default-s" onBackground="brand-weak">
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">, </Text>
                )}
                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </Text>
            ))}
          </Row>
        )}
      </Column>

      {/* Hero image */}
      {post.metadata.images.length > 0 && (
        <Media
          priority
          aspectRatio="16 / 9"
          radius="l"
          alt={post.metadata.title}
          src={post.metadata.images[0]}
          style={{ width: "100%" }}
        />
      )}

      {/* Two-column content: sections + sidebar */}
      <div className="work-content-layout">
        {/* Structured content sections */}
        <div className="work-article">
          <WorkDetailContent
            overview={post.metadata.overview}
            features={post.metadata.features}
            techStack={post.metadata.techStack}
            challenges={post.metadata.challenges}
            learnings={post.metadata.learnings}
            impact={post.metadata.impact}
            role={post.metadata.role}
            subProjects={post.metadata.subProjects}
          />
        </div>

        {/* Sidebar */}
        <aside className="work-sidebar">
          <div className="work-sidebar-card">
            <p className="work-sidebar-label">Project Details</p>

            {(post.metadata.live || post.metadata.github) && (
              <Column gap="8" style={{ marginTop: "16px" }}>
                {post.metadata.live && (
                  <Button
                    href={post.metadata.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="s"
                    fillWidth
                    prefixIcon="arrowUpRightFromSquare"
                  >
                    Live Site
                  </Button>
                )}
                {post.metadata.github && (
                  <Button
                    href={post.metadata.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="s"
                    fillWidth
                    prefixIcon="github"
                  >
                    GitHub
                  </Button>
                )}
              </Column>
            )}

            <div className="work-sidebar-divider" />

            <Column gap="16">
              {post.metadata.publishedAt && (
                <div>
                  <p className="work-sidebar-meta-label">Published</p>
                  <p className="work-sidebar-meta-value">
                    {formatDate(post.metadata.publishedAt)}
                  </p>
                </div>
              )}
              {post.metadata.badge && (
                <div>
                  <p className="work-sidebar-meta-label">Category</p>
                  <div style={{ marginTop: "6px" }}>
                    <Badge
                      paddingX="8"
                      paddingY="4"
                      background="brand-alpha-weak"
                      onBackground="brand-strong"
                      textVariant="label-strong-xs"
                    >
                      {post.metadata.badge}
                    </Badge>
                  </div>
                </div>
              )}
              {post.metadata.team && post.metadata.team.length > 0 && (
                <div>
                  <p className="work-sidebar-meta-label">Team</p>
                  <Column gap="8" style={{ marginTop: "6px" }}>
                    <AvatarGroup reverse avatars={avatars} size="xs" />
                    {post.metadata.team.map((member, idx) => (
                      <SmartLink key={idx} href={member.linkedIn}>
                        <Text variant="label-default-xs" onBackground="brand-weak">
                          {member.name}
                        </Text>
                      </SmartLink>
                    ))}
                  </Column>
                </div>
              )}
            </Column>
          </div>

          {/* Additional screenshots */}
          {post.metadata.images.slice(1).map((img, i) => (
            <Media
              key={i}
              src={img}
              aspectRatio="16 / 9"
              radius="m"
              alt={`${post.metadata.title} screenshot ${i + 2}`}
              style={{ width: "100%" }}
            />
          ))}
        </aside>
      </div>

      <ScrollToHash />
    </Column>
  );
}
