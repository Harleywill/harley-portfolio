import type { ReactNode } from "react";

type Entry = {
  company: string;
  role: string;
  period: string;
};

const ENTRIES: Entry[] = [];

export function Experience(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        Experience
      </h3>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative rounded-4xl border p-4 sm:p-6">
        {ENTRIES.length === 0 ? (
          <p className="text-[14px] tracking-tight text-foreground/50 sm:text-[15px]">
            Worked with TRVentilation and NTS &mdash; full role details coming
            soon.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {ENTRIES.map((entry) => (
              <li
                key={`${entry.company}-${entry.period}`}
                className="bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border p-2"
                style={{ minHeight: 64 }}
              >
                <div className="flex min-w-0 flex-col">
                  <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
                    {entry.company}
                  </span>
                  <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                    {entry.role}
                    <span className="text-foreground/30 mx-2">&bull;</span>
                    <span className="text-foreground/55">{entry.period}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
