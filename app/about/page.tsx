import Image from "next/image";
import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { ContactSection } from "@/components/contact/contact-section";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "About me, background, and how to get in touch.",
  path: "/about",
});

export default function AboutPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-160 px-6 pt-40 pb-16 sm:px-10 sm:pt-56 sm:pb-24">
        <FadeIn>
          <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3">
            <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
                  Hello! I&rsquo;m <span className="border-b border-foreground/30 pb-0.5">Harley Williams</span>.
                </h1>
                <div className="mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
                  <p>
                    I&rsquo;m a <strong className="font-semibold text-foreground">full-stack developer</strong> with
                    hands-on experience building scalable web applications and solving complex technical challenges. My
                    specialty is creating seamless user experiences backed by robust backend systems.
                  </p>
                  <p>
                    I&rsquo;ve launched multiple production projects including a full-featured e-commerce platform with
                    Stripe payments and real-time analytics dashboards. I&rsquo;m passionate about{" "}
                    <strong className="font-semibold text-foreground">clean code, performance optimization</strong>, and
                    delivering products that users love.
                  </p>
                </div>
                <a
                  href="/HarleyWilliamsCV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-8 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Download CV
                </a>
              </div>

              <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-3xl border border-foreground/8 sm:w-40 md:w-48">
                <Image
                  src="/harley-graduation.jpg"
                  alt="Harley Williams at his graduation with family"
                  fill
                  sizes="(min-width: 640px) 192px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-[40rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-10">
            <Experience />
            <Education />
            <Skills />
            <Stack />
          </div>
        </FadeIn>
      </section>

      <ContactSection />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
