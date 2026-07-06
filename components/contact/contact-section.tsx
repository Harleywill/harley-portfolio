"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";
import { ShaderFlow } from "@/components/shaders/shader-flow";

const CARD_FADE_MASK =
  "radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%)";

export function ContactSection(): ReactNode {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="mx-auto my-12 w-full max-w-275 px-6 sm:my-20 sm:px-10">
      <FadeIn>
        <div className="relative w-full overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
          <div className="relative w-full overflow-hidden rounded-[1.6rem]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-25"
              style={{ WebkitMaskImage: CARD_FADE_MASK, maskImage: CARD_FADE_MASK }}
            >
              <ShaderFlow scale={3} brightness={3} />
            </div>

            <div className="relative grid gap-8 p-6 sm:gap-10 sm:p-7 md:grid-cols-[1.1fr_1fr] md:items-stretch md:gap-6 md:p-6">
              <div className="flex flex-col gap-5">
                <h2 className="font-serif text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[2.75rem] lg:text-[3.25rem]">
                  Let&rsquo;s connect
                </h2>
                <p className="max-w-[32ch] text-[18px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[20px]">
                  Feel free to reach out for collaboration or just a friendly
                  hello.
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <SocialIcon href="mailto:Hjakewilliams@gmail.com" label="Email" Icon={Mail} />
                  <SocialIcon
                    href="https://www.linkedin.com/in/harley-williams/"
                    label="LinkedIn"
                    Icon={Linkedin}
                  />
                  <SocialIcon href="https://github.com/Harleywill" label="GitHub" Icon={Github} />
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="border-foreground/8 flex flex-col gap-3 rounded-[1.1rem] border bg-background p-6 sm:p-7"
              >
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[13px] font-medium tracking-tight text-foreground/70">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="focus-ring rounded-xl border border-foreground/10 bg-background px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-foreground/35"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[13px] font-medium tracking-tight text-foreground/70">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="focus-ring rounded-xl border border-foreground/10 bg-background px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-foreground/35"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[13px] font-medium tracking-tight text-foreground/70">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Your message here..."
                    className="focus-ring resize-none rounded-xl border border-foreground/10 bg-background px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-foreground/35"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="focus-ring mt-1 inline-flex items-center justify-center rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send message"}
                </button>

                {error && (
                  <p role="alert" className="text-[13px] text-red-500">
                    {error}
                  </p>
                )}
                {submitted && (
                  <p role="status" aria-live="polite" className="text-[13px] text-foreground/70">
                    Thanks for reaching out! I&rsquo;ll get back to you soon.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}): ReactNode {
  const isExternal = href.startsWith("http");
  const externalProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link
      href={href}
      aria-label={label}
      className="border-foreground/8 hover:border-foreground/15 focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-background text-foreground/70 transition-colors hover:text-foreground"
      {...externalProps}
    >
      <Icon className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
    </Link>
  );
}
