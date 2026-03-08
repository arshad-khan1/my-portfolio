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
  role: "Full Stack Developer",
  avatar: "/images/gallery/profile_image.jpg",
  email: "003arshad@gmail.com",
  location: "Asia/Kolkata", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Hindi"], // optional: Leave the array empty if you don't want to display languages
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
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: (
    <>Full stack developer building robust applications leveraging AI</>
  ),
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/",
  },
  subline: (
    <>
      Currently working as a software engineer who is passionate about building
      products that impact millions of users. I specialize in bridging the gap
      between back-end robustness and front-end excellence, all powered by
      intelligent AI workflows.
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
        I am a full stack developer with experience in building robust backend
        systems and dynamic front-end applications. I am passionate about
        leveraging AI to automate complex workflows and build impactful
        products. My approach combines technical excellence with a business
        perspective to deliver maximum value.
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
        role: "Junior Software Developer",
        achievements: [
          <>
            Worked on the <strong>HelpNest</strong> and platforms as a{" "}
            <strong>backend developer</strong>, building scalable APIs and
            backend systems for customer support and learning applications.
          </>,
          <>
            Designed and implemented the complete{" "}
            <strong>WhatsApp Messaging Pipeline</strong> with
            inbound/outbound/template messaging, integrated connectors, and
            automated deployments on <strong>AWS</strong>.
          </>,
          <>
            Developed core modules including{" "}
            <strong>Role, Authentication, File Management (MinIO)</strong>, and{" "}
            <strong>Contacts/Agents/Reports</strong>, ensuring secure and
            multi-tenant operations.
          </>,
          <>
            Currently working on the <strong>UGP platform</strong>, building
            standard APIs in <strong>NestJS</strong> with complex business
            logic, and exploring{" "}
            <strong>Python and Generative AI workflows</strong> for conversation
            analytics, intelligent routing, and message summarization.
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
            icon: "javascript",
          },
          {
            name: "Nest.js",
            icon: "nextjs",
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
            icon: "javascript",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "TypeScript",
            icon: "javascript",
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
