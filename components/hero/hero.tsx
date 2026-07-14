import Image from "next/image";
import type { ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";

export function Hero(): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 pt-44 pb-24 sm:px-10 sm:pt-56 sm:pb-32">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
          <FadeIn className="flex flex-col gap-4">
            <p className="text-[20px] leading-tight tracking-tight font-medium text-foreground">
              Hey
              <span aria-hidden="true" className="mx-0.5">
                👋
              </span>
              , I&rsquo;m Harley
            </p>

            <h1 className="text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[2.5rem] lg:text-[3.65rem]">
              <span className="block">Full-stack developer</span>
            </h1>

            <p className="max-w-[40ch] text-[22px] leading-[1.4] tracking-tight text-foreground/65">
              I build scalable web applications with React, Node.js, and
              MongoDB — focused on seamless user experiences backed by robust
              backend systems.
            </p>

            <HeroCtas />
          </FadeIn>

          <ScaleUnblur className="flex justify-stretch md:justify-end">
            <div className="relative aspect-square w-full md:max-w-105 overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
              <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                <Image
                  src="/harley-portrait.jpg"
                  alt="Harley Williams"
                  fill
                  sizes="(min-width: 768px) 420px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </ScaleUnblur>
        </div>
      </div>
    </section>
  );
}
