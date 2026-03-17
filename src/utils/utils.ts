import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
  github?: string;
  live?: string;
  badge?: string;
};

import { notFound } from "next/navigation";

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const githubUsername =
    process.env.NEXT_PUBLIC_GITHUB_USERNAME || "arshad-khan1";

  const metadata: Metadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: (data.link || "").replace("{{GITHUB_USERNAME}}", githubUsername),
    github: (data.github || "").replace("{{GITHUB_USERNAME}}", githubUsername),
    live: (data.live || "").replace("{{GITHUB_USERNAME}}", githubUsername),
    badge: data.badge || "",
  };

  return {
    metadata,
    content: content.replace(/{{GITHUB_USERNAME}}/g, githubUsername),
  };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles
    .map((file) => {
      const data = readMDXFile(path.join(dir, file));
      if (!data) return null;

      const { metadata, content } = data;
      const slug = path.basename(file, path.extname(file));

      return {
        metadata,
        slug,
        content,
      };
    })
    .filter((post) => post !== null);
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
