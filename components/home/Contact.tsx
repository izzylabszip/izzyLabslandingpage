import { Section } from "@/components/Section";
import { ScanReveal } from "@/components/ScanReveal";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

const ROWS = [
  { label: "Response_time", value: "< 48h" },
  { label: "Engagements", value: "Freelance · Contract · Product" },
  { label: "Timezone", value: "NPT (UTC+5:45)" },
  { label: "Stack", value: "Next.js · Expo · Gemini · Stripe" },
];

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact // 04"
      title="Initiate contact"
      lead="Tell us what you are building. We reply within 48 hours with a first read on scope, timeline and how we would test it."
      className="border-t border-hairline"
    >
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ScanReveal>
            <dl className="divide-y divide-hairline border-y border-hairline font-mono text-[11px] uppercase tracking-[0.14em]">
              {ROWS.map((r) => (
                <div key={r.label} className="flex items-center justify-between gap-6 py-3.5">
                  <dt className="text-muted">{r.label}</dt>
                  <dd className="text-right text-fg">{r.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted">
              {site.email ? (
                <>
                  Prefer email?{" "}
                  <a href={`mailto:${site.email}`} className="text-fg underline underline-offset-4 hover:text-accent">
                    {site.email}
                  </a>
                </>
              ) : (
                "Transmissions land in a real inbox and are answered by the people who will build your product."
              )}
            </p>
          </ScanReveal>
        </div>
        <div className="lg:col-span-7">
          <ScanReveal delay={0.15}>
            <ContactForm />
          </ScanReveal>
        </div>
      </div>
    </Section>
  );
}
