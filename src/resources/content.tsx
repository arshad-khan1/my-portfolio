import {
  About,
  Blog,
  Gallery,
  Home,
  Newsletter,
  Person,
  Social,
  Work,
} from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Arshad",
  lastName: "Khan",
  name: `Arshad Khan`,
  role: "Senior Backend Engineer & AI Solutions Architect",
  avatar: "/images/gallery/image.png",
  email: "003arshad@gmail.com",
  location: "Asia/Kolkata",
  languages: ["English", "Hindi"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/arshad-khan1",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/arshad-khan-linkdin/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "",
    essential: false,
  },
  {
    name: "Threads",
    icon: "threads",
    link: "",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
  {
    name: "Phone",
    icon: "phone",
    link: "tel:+918668721925",
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} — Backend Engineer & AI Architect`,
  description: `Senior software engineer delivering scalable systems, AI-driven products, and business solutions that drive revenue and reduce costs.`,
  headline: (
    <>I Build Systems That Scale Businesses</>
  ),
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Available for hire</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Open to full-time opportunities
        </Text>
      </Row>
    ),
    href: "#contact",
  },
  subline: (
    <>
      I architect backend infrastructure that handles 10K+ daily transactions,
      reduce query resolution by 50% with AI-powered routing, and cut database
      costs by 80% through strategic caching. I think in business outcomes —
      scalability, performance, and measurable ROI.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I am a software engineer who takes full ownership of projects from
        conception to deployment. I leverage AI to accelerate development
        cycles, make data-driven decisions, and build products that scale. My
        approach combines technical leadership with strategic thinking to ship
        faster without compromising quality.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Pinnacle Teleservices Pvt. Ltd.",
        timeframe: "December 2024 - Present",
        role: "Software Engineer",
        achievements: [
          <>
            <strong>Owned and led</strong> the backend development for{" "}
            <strong>HelpNest</strong> platform, making architectural decisions
            that enabled scalable APIs and multi-tenant customer support systems.
          </>,
          <>
            <strong>Architected and deployed</strong> the complete{" "}
            <strong>WhatsApp Messaging Pipeline</strong> with inbound/outbound
            messaging, reducing integration time by 60% through automated AWS
            deployments.
          </>,
          <>
            <strong>Designed and implemented</strong> core infrastructure
            including Role-Based Access Control, Authentication, and{" "}
            <strong>MinIO-based file storage</strong>, ensuring secure
            multi-tenant operations from day one.
          </>,
          <>
            <strong>Leading the UGP platform</strong> with full ownership of API
            design in NestJS. Currently integrating{" "}
            <strong>AI-powered conversation analytics</strong> and intelligent
            routing to reduce query resolution time by 50%.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "B.Tech in Information Technology",
        description: (
          <>Shri Ramdeobaba College of Engineering and Management, Nagpur</>
        ),
      },
      // {
      //   name: "Maratrao Mude Junior College, Nagpur",
      //   description: <>Completed 12th grade with 75%.</>,
      // },
      // {
      //   name: "Bhavan's Wardha",
      //   description: <>Completed 10th grade with 84%.</>,
      // },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Backend Development",
        description: (
          <>
            Building robust APIs and services with Node.js, Nest.js, and
            FastAPI.
          </>
        ),
        tags: [
          {
            name: "Node.js",
            icon: "node",
          },
          {
            name: "Nest.js",
            icon: "nestjs",
          },
          {
            name: "Python",
            icon: "python",
          },
          {
            name: "FastAPI",
            icon: "fastapi",
          },
        ],
        images: [],
      },
      {
        title: "Frontend Development",
        description: (
          <>Creating dynamic user interfaces with React.js and Next.js.</>
        ),
        tags: [
          {
            name: "React.js",
            icon: "react",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "TypeScript",
            icon: "typescript",
          },
        ],
        images: [],
      },
      {
        title: "Databases & Cloud",
        description: (
          <>
            Managing data with MySQL, PostgreSQL, MongoDB, and deploying on AWS
            with Docker.
          </>
        ),
        tags: [
          {
            name: "MySQL",
            icon: "mysql",
          },
          {
            name: "PostgreSQL",
            icon: "postgresql",
          },
          {
            name: "MongoDB",
            icon: "mongodb",
          },
          {
            name: "AWS",
            icon: "aws",
          },
          {
            name: "Docker",
            icon: "docker",
          },
          {
            name: "Redis",
            icon: "redis",
          },
          {
            name: "Kafka",
            icon: "kafka",
          },
        ],
        images: [],
      },
      {
        title: "AI & Automation",
        description: (
          <>Implementing AI workflows, agents, and generative AI solutions.</>
        ),
        tags: [
          {
            name: "Python",
            icon: "python",
          },
          {
            name: "N8N",
            icon: "n8n",
          },
          {
            name: "Open Code",
            icon: "vscode",
          },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Placeholder images
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
