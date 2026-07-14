import { ArrowRight, Code2 } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  underDevelopment?: boolean;
  image?: string;
};

const PROJECTS: Project[] = [
  {
    id: "nts",
    title: "NTS Ltd - HVAC Services Website",
    description:
      "Modern Next.js website for NTS Ltd, a mechanical and electrical services company in Hull. Features custom admin dashboard for managing projects, testimonials, and news. Includes dynamic service pages, project galleries with image uploads, client testimonials carousel, and a professional portfolio section showcasing completed installations.",
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS", "Prisma", "SQLite", "Framer Motion"],
    link: "https://nevilletuckerservices.co.uk",
    image: "/projects/nts.jpg",
  },
  {
    id: "mepm",
    title: "MEPM Services - Mechanical Services Website",
    description:
      "Professional website for MEPM Services showcasing their mechanical services offerings. Built with modern Next.js architecture featuring service catalogs, project portfolios, client testimonials, and comprehensive contact management systems.",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "Responsive Design"],
    link: "https://www.mepmservices.co.uk",
    underDevelopment: true,
    image: "/projects/mepm.jpg",
  },
  {
    id: "jdbm",
    title: "JDBM Building Contractors - Services Website",
    description:
      "Modern website for JDBM Building Contractors Ltd featuring their building services, completed projects showcase, and client testimonials. Designed to establish strong online presence and attract new construction projects.",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "Portfolio Display"],
    link: "https://www.jdbuildingcontractorsltd.co.uk",
    underDevelopment: true,
    image: "/projects/jdbm.jpg",
  },
  {
    id: "trventilation",
    title: "TRVentilation",
    description:
      "Full-stack e-commerce platform for ventilation products. Features a full storefront with product catalog, shopping cart, and Stripe checkout; a real-time analytics dashboard integrated with Google Analytics 4; a product management system with image upload optimization, SEO tooling, and inventory tracking; and automated order processing with PDF invoice generation and email notifications.",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Stripe",
      "Express",
      "Tailwind",
      "GA4 API",
      "PDF Generation",
    ],
    link: "https://trventilation.com",
    image: "/projects/trventilation.jpg",
  },
];

export type ProjectsProps = {
  withHeadline?: boolean;
  headingLevel?: "h1" | "h2";
};

export function Projects({
  withHeadline = false,
  headingLevel = "h2",
}: ProjectsProps): ReactNode {
  const Heading = headingLevel;
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <Heading className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              My projects
            </Heading>
            <p className="max-w-[33ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              Full-stack development work, with a focus on scalable
              architecture and exceptional user experiences.
            </p>
          </FadeIn>
        ) : null}

        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}): ReactNode {
  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      <article className="project-card flex flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
        <header className="flex items-center gap-2.5 px-1 pt-2">
          <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
            <Code2 className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium tracking-tight text-foreground">
            {project.title}
          </span>
        </header>

        <div className="project-card__image ring-foreground/5 relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1 aspect-[4/3]">
          {project.image ? (
            <div className="project-card__image-inner">
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          ) : (
            <div className="project-card__image-inner bg-gradient-to-br from-foreground/10 via-foreground/5 to-transparent" />
          )}
        </div>

        <div className="flex flex-col gap-2.5 px-1 pb-1">
          <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-foreground/8 bg-foreground/2 px-3 py-1 text-[12px] tracking-tight text-foreground/70 dark:bg-foreground/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="px-1 pb-2">
          {project.link && !project.underDevelopment ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group inline-flex items-center gap-1.5 text-[14px] font-medium tracking-tight text-foreground"
            >
              View project
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          ) : project.underDevelopment ? (
            <span className="text-[14px] tracking-tight text-foreground/40">
              Under development
            </span>
          ) : null}
        </div>
      </article>
    </FadeIn>
  );
}
