import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const SOCIAL_LINKS = [
  { label: "Email", href: "mailto:Hjakewilliams@gmail.com", Icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/harley-williams/", Icon: Linkedin },
  { label: "GitHub", href: "https://github.com/Harleywill", Icon: Github },
];

export function Footer(): ReactNode {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-auto w-full max-w-275 border-t border-foreground/8 px-6 py-10 sm:px-10">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => {
            const isExternal = href.startsWith("http");
            const externalProps = isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="border-foreground/8 hover:border-foreground/15 focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-background text-foreground/70 transition-colors hover:text-foreground"
                {...externalProps}
              >
                <Icon className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
              </Link>
            );
          })}
        </div>
        <p className="text-[13px] tracking-tight text-foreground/50">
          &copy; {currentYear} Harley Williams. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
