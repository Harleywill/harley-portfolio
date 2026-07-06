import { Projects } from "@/components/projects/projects";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "A look at the full-stack projects I've built and shipped.",
  path: "/projects",
});

export default function ProjectsPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col gap-20 sm:gap-28">
      <div className="pt-40 sm:pt-56">
        <Projects withHeadline />
      </div>
      <div className="h-12 sm:h-16" />
    </main>
  );
}
