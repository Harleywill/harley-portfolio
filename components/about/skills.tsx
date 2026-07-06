import type { ReactNode } from "react";

type SkillCategory = {
  category: string;
  skills: string[];
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["React", "TypeScript", "Tailwind CSS", "Bootstrap", "Next.js", "Responsive Design"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "MongoDB", "Mongoose", "RESTful APIs", "Authentication"],
  },
  {
    category: "Tools & DevOps",
    skills: ["Git", "GitHub", "PM2", "Nginx", "Linux/VPS", "SSL/TLS", "Stripe API"],
  },
  {
    category: "Other",
    skills: ["Email Services", "File Upload", "Payment Processing", "Performance Optimization", "SEO", "Analytics"],
  },
];

export function Skills(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
        What I do
      </h3>
      <div className="flex flex-col gap-4 rounded-4xl border border-foreground/5 bg-foreground/2 p-4 dark:bg-foreground/5 sm:p-5">
        {SKILL_CATEGORIES.map((category) => (
          <div key={category.category} className="flex flex-col gap-2.5">
            <span className="text-[13px] font-medium tracking-tight text-foreground/50">
              {category.category}
            </span>
            <div className="flex flex-wrap gap-2.5">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-foreground/8 bg-background px-4 py-2 text-[14px] tracking-tight text-foreground/85 sm:text-[15px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
