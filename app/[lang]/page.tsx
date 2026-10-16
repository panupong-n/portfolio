import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDownRight, ArrowUpRight, FileText, MapPin, Phone, Lock, MonitorPlay, PenLine, Code2 } from "lucide-react";
import { HeroSequence } from "@/components/animations/HeroSequence";
import { Helix, type HelixItem } from "@/components/animations/Helix";
import { IntroStage, type FlyCard } from "@/components/animations/IntroStage";
import { Marquee } from "@/components/animations/Marquee";
import { ShaderBackground } from "@/components/ui/ShaderBackground";
import { HeroVideo } from "@/components/ui/HeroVideo";
import { Chars } from "@/components/ui/Chars";
import { VideoSlot } from "@/components/ui/Video";
import { fill, getContent, isLocale, type Head } from "@/lib/content";
import { certIssuers, certs, contact, productGroups, products, site } from "@/lib/profile";
import { projectMeta } from "@/lib/work";
import { techCategories } from "@/lib/tech";
import { resolveTech, videoFor } from "@/lib/techIcons";

const GithubMark = () => (
  <svg aria-hidden viewBox="0 0 24 24" className="size-4 fill-current">
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);
const LinkedinMark = () => (
  <svg aria-hidden viewBox="0 0 24 24" className="size-4 fill-current">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

/** Heading text with its middle part in italics. */
const H = ({ parts }: { parts: Head }) => (
  <>
    {parts[0]}
    {parts[1] && <span className="italic">{parts[1]}</span>}
    {parts[2]}
  </>
);

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { alternates: { canonical: `/${lang}`, languages: { en: "/en", th: "/th", "x-default": "/en" } } };
}

/** Deterministic scatter round the edge of the stage; keeps the middle free for the text. */
function scatter(i: number) {
  const a = ((i * 137.508 + 20) * Math.PI) / 180;
  const f = 0.62 + 0.38 * ((i * 0.618) % 1);
  const x = Math.min(88, Math.max(2, 50 + 47 * f * Math.cos(a) - 6));
  const y = Math.min(82, Math.max(4, 50 + 40 * f * Math.sin(a) - 5));
  return { x: Math.round(x), y: Math.round(y) };
}

/** Takes from several lists in turn so the kinds are mixed along the scroll. */
function weave<T>(...lists: T[][]): T[] {
  const out: T[] = [];
  const max = Math.max(...lists.map((l) => l.length));
  for (let i = 0; i < max; i++) for (const l of lists) if (i < l.length) out.push(l[i]);
  return out;
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  const { ui, profile } = c;
  const current = profile.roles[0];
  const icons = resolveTech();
  const cvHref = `/cv/Panupong-Nijjaboon-CV-${lang.toUpperCase()}.pdf`;
  const aboutVideo = videoFor("about");

  const workItems: HelixItem[] = projectMeta.map((p) => ({
    href: `/${lang}/work/${p.slug}`,
    title: p.title,
    category: c.projects[p.slug].category,
    line: c.projects[p.slug].tagline,
    image: p.cover,
    alt: c.projects[p.slug].coverAlt,
    video: videoFor(`${p.video}-card`),
  }));

  const certItems: HelixItem[] = certs.map((ce) => ({
    href: `/img/certs/${ce.slug}.webp`,
    external: true,
    title: ce.title,
    category: ce.issuer,
    image: `/img/certs/${ce.slug}.webp`,
    alt: `${ui.certs.open}: ${ce.title}, ${ce.issuer}`,
    fit: "contain",
    ratio: ce.ratio,
  }));

  // ---- cards for the intro stage: screenshots, certificates, logos and tool icons ----
  const shots: Omit<FlyCard, "x" | "y">[] = [
    { kind: "shot", href: `/${lang}/work/tenix-one`, title: "TENIX One", image: "/img/work/tenix-one-dashboard.webp" },
    { kind: "shot", href: `/${lang}/work/tenix-deepspace`, title: "TENIX DeepSpace", image: "/img/work/deepspace-pipeline.webp" },
    { kind: "shot", href: `/${lang}/work/project-hub`, title: "Project Hub", image: "/img/work/project-hub-dashboard.webp" },
    { kind: "shot", href: `/${lang}/work/tenix-fullsnap`, title: "TENIX FullSnap", image: "/img/work/fullsnap-2.webp" },
    { kind: "shot", href: `/${lang}/work/tenix-one`, title: "TENIX One SOC wall", image: "/img/work/tenix-one-wall.webp" },
  ];
  const certCards: Omit<FlyCard, "x" | "y">[] = [
    "comptia-security",
    "crowdstrike-certified-siem-engineer-ccse",
    "silverfort-unified-expert-certification",
    "junior-penetration-tester-ejpt",
  ].map((slug) => ({
    kind: "cert" as const,
    href: `/${lang}#certifications`,
    title: certs.find((x) => x.slug === slug)?.title ?? slug,
    image: `/img/certs/${slug}.webp`,
  }));
  const logoCards: Omit<FlyCard, "x" | "y">[] = products.map((p) => ({
    kind: "logo" as const,
    title: p.name,
    image: `/img/products/${p.file}`,
  }));
  const techPick = ["typescript", "nextjs", "react", "python", "nodejs", "docker", "postgresql", "clickhouse", "mongodb", "redis", "nginx", "fastapi", "tailwindcss", "vmware-esxi", "kafka", "github", "linux", "n8n"];
  const techCards: Omit<FlyCard, "x" | "y">[] = techPick
    .map((id) => icons.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => !!t?.icon)
    .map((t) => ({ kind: "tech" as const, title: t.name, image: t.icon as string }));
  const flyCards: FlyCard[] = weave(techCards, shots, logoCards, certCards).map((card, i) => ({ ...card, ...scatter(i) }));

  const stats = [
    { n: projectMeta.length, label: ui.facts[0] },
    { n: certs.length, label: ui.facts[1] },
    { n: certIssuers.length, label: ui.facts[2] },
    { n: products.length, label: ui.facts[3] },
  ];

  const bgVideo = { src: "/video/sections.mp4", poster: "/video/sections-poster.jpg" };
  const mq1 = icons.filter((t) => t.icon);

  return (
    <>
      {/* ---- Hero + intro: one dark zone ---- */}
      <div data-dark-zone>
        <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-[#04060c] pb-[46svh] pt-[calc(var(--header-h)+2rem)] text-white lg:pb-20">
          <HeroVideo src="/video/hero.mp4" poster="/video/hero-poster.jpg" />
          <div className="hero-shade" aria-hidden />
          <div className="hero-photo" aria-hidden={false}>
            <Image
              src="/img/me/hero.webp"
              alt={ui.about.portraitAlt}
              width={1120}
              height={1393}
              priority
              sizes="(min-width: 1024px) 40vw, 80vw"
            />
          </div>
          <HeroSequence className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
            <div data-hero-fx className="will-change-transform">
              <p data-hero="1" className="mono-label text-white/70">
                {c.meta.role} · {c.meta.location}
              </p>
              <h1 data-hero="2" className="t-mega t-hero mt-5">
                <span className="sr-only">{site.name}</span>
                <span className="name-line">
                  <Chars text="Panupong" />
                </span>
                <span className="name-line italic text-[#6db4ff]">
                  <Chars text="Nijjaboon" />
                </span>
              </h1>
              <p data-hero="3" className="t-lead mt-8 max-w-xl !text-white/85">
                {ui.hero.tagline}
              </p>
              <div data-hero="4" className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="mono-label inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-[#05070d] transition-colors hover:bg-[#6db4ff]"
                >
                  {ui.hero.ctaWork} <ArrowDownRight aria-hidden className="size-4" />
                </a>
                <Link
                  href={`/${lang}/work/tenix-one`}
                  className="mono-label inline-flex min-h-12 items-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 text-white backdrop-blur-sm transition-colors hover:bg-white/15"
                >
                  {ui.hero.ctaDemo} <ArrowUpRight aria-hidden className="size-4" />
                </Link>
              </div>
            </div>
          </HeroSequence>
          <p lang="th" className="mono-label absolute right-5 top-[calc(var(--header-h)+1rem)] z-10 hidden text-white/60 sm:right-8 md:block">
            {site.nameTh}
          </p>
        </section>

        {/* ---- Intro stage ---- */}
        <IntroStage statements={ui.intro} cards={flyCards} />
      </div>

      {/* ---- Numbers ---- */}
      <section aria-label="Numbers" className="border-b border-line bg-card">
        <dl data-stag className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px px-5 py-10 sm:px-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} data-stag-item className="px-2 py-4 lg:px-6">
              <dd className="serif text-6xl leading-none sm:text-7xl">
                <span data-count={s.n}>{s.n}</span>
              </dd>
              <dt className="mono-label mt-3 text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* ---- Work ---- */}
      <div id="work" className="scroll-mt-0" />
      <Helix items={workItems} label={ui.work.helixLabel} ratio={1.6} bg={bgVideo} />
      <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-8" aria-labelledby="work-h">
        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-line pt-10">
          <h2 id="work-h" data-wipe className="t-h2">
            {ui.work.title}
          </h2>
          <p data-rv className="max-w-md text-muted">
            {ui.work.blurb}
          </p>
        </div>
        <ul data-stag className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {projectMeta.map((p) => {
            const t = c.projects[p.slug];
            return (
              <li key={p.slug} data-stag-item className="bg-card">
                <Link href={`/${lang}/work/${p.slug}`} className="group flex h-full flex-col gap-2 p-5 transition-colors hover:bg-sand">
                  <span className="mono-label text-muted">{t.category}</span>
                  <span className="serif text-3xl leading-none">{p.title}</span>
                  <span className="mt-1 text-sm text-ink-soft">{t.tagline}</span>
                  <span className="mono-label mt-auto inline-flex items-center gap-1.5 pt-4 text-signal-deep">
                    {p.demo ? ui.work.demoDetails : ui.work.details}
                    <ArrowUpRight aria-hidden className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---- Source code is private ---- */}
      <section id="source" className="border-t border-line bg-sand/60" aria-labelledby="source-h">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <p data-rv className="mono-label flex items-center gap-2 text-signal-deep">
                <Lock aria-hidden className="size-4" /> {ui.source.label}
              </p>
              <h2 id="source-h" data-wipe className="t-h2 mt-3">
                <H parts={ui.source.title} />
              </h2>
              <p data-rv="0.1" className="t-lead mt-5 max-w-xl">
                {ui.source.body}
              </p>
              <a
                data-rv="0.15"
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/40 px-6 transition-colors hover:bg-card"
              >
                <GithubMark /> {ui.source.github} <ArrowUpRight aria-hidden className="size-4" />
              </a>
            </div>
            <ul data-stag className="grid gap-3">
              {ui.source.cards.map((card, i) => {
                const Icon = [MonitorPlay, PenLine, Code2][i] ?? Code2;
                return (
                  <li key={card.title} data-stag-item className="tile flex gap-4 rounded-lg border border-line bg-card p-5">
                    <span className="grid size-11 flex-none place-items-center rounded-full bg-signal-tint text-signal-deep">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span>
                      <span className="serif block text-2xl leading-tight">{card.title}</span>
                      <span className="mt-1 block text-ink-soft">{card.text}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ---- Tools marquee ---- */}
      <section aria-label={ui.marquee} className="overflow-hidden border-y border-line bg-paper py-8">
        <p className="mono-label mx-auto mb-5 max-w-[1400px] px-5 text-muted sm:px-8">{ui.marquee}</p>
        <div className="grid gap-3">
          <Marquee label={ui.marquee}>
            {mq1.map((t) => (
              <span key={t.id} className="tech-tile whitespace-nowrap">
                <span className="tech-icon">
                  <Image src={t.icon as string} alt="" width={24} height={24} loading="eager" />
                </span>
                {t.name}
              </span>
            ))}
          </Marquee>
          <Marquee label={ui.stack.platformsLabel} reverse>
            {products.map((p) => (
              <span key={p.name} className="logo-tile w-36 flex-none" data-fill={p.tile ? "true" : undefined}>
                <Image src={`/img/products/${p.file}`} alt={p.name} width={p.w} height={p.h} sizes="9rem" />
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ---- About ---- */}
      <section id="about" className="bg-card">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:py-28">
          <div>
            <div data-rv className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-sand lg:mx-0">
              <Image
                data-parallax="5"
                src="/img/me/portrait.webp"
                alt={ui.about.portraitAlt}
                width={896}
                height={1105}
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="h-auto w-full mix-blend-multiply"
              />
            </div>
            {aboutVideo && (
              <div className="mx-auto mt-6 max-w-md lg:mx-0">
                <VideoSlot src={aboutVideo} poster="/img/me/portrait.webp" label={ui.about.videoLabel} />
              </div>
            )}
          </div>
          <div>
            <p data-rv className="mono-label text-signal-deep">
              {ui.about.label}
            </p>
            <h2 data-wipe className="t-h2 mt-3">
              <H parts={ui.about.headline} />
            </h2>
            <p data-rv="0.1" className="t-lead mt-6 max-w-2xl">
              {profile.summary}
            </p>
            <dl data-rv="0.15" className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
              <div>
                <dt className="mono-label text-muted">{ui.about.now}</dt>
                <dd className="mt-1">
                  {current.title}, {current.company}
                </dd>
              </div>
              <div>
                <dt className="mono-label text-muted">{ui.about.education}</dt>
                <dd className="mt-1">
                  {profile.education.degree}
                  <br />
                  <span className="text-muted">
                    {profile.education.school}, {profile.education.years}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ---- Experience ---- */}
      <section id="experience" className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <p data-rv className="mono-label text-signal-deep">
              {ui.experience.label}
            </p>
            <h2 data-wipe className="t-h2 mt-3">
              <H parts={ui.experience.headline} />
            </h2>
          </div>
          <div>
            <ol className="relative border-t border-ink pl-6 sm:pl-8">
              <span data-draw aria-hidden className="absolute bottom-0 left-0 top-0 w-px origin-top bg-signal" />
              {profile.roles.map((r, i) => (
                <li key={r.title + r.company} data-rv className="relative border-b border-line">
                  <span aria-hidden className="absolute -left-[1.78rem] top-[2.2rem] size-2.5 rounded-full bg-signal ring-4 ring-paper sm:-left-[2.28rem]" />
                  <details open={i === 0} className="group py-6">
                    <summary className="flex cursor-pointer list-none flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between [&::-webkit-details-marker]:hidden">
                      <span>
                        <span className="serif block text-3xl leading-tight sm:text-4xl">{r.title}</span>
                        <span className="block text-ink-soft">
                          {r.company} · {r.place}
                        </span>
                      </span>
                      <span className="mono-label flex items-center gap-3 text-muted">
                        {r.current && <span className="rounded-full bg-signal-tint px-2.5 py-1 text-signal-deep">{ui.experience.current}</span>}
                        {r.period}
                        <span aria-hidden className="text-lg leading-none transition-transform group-open:rotate-45">
                          +
                        </span>
                      </span>
                    </summary>

                    {r.intro && <p className="mt-5 max-w-2xl text-ink-soft">{r.intro}</p>}

                    {r.projectEntries && (
                      <div className="mt-8">
                        <h3 className="mono-label text-signal-deep">{ui.experience.builtHeading}</h3>
                        <ul className="mt-4 grid gap-4">
                          {r.projectEntries.map((pe) => (
                            <li key={pe.slug} className="tile rounded-lg border border-line bg-card p-5">
                              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                <p className="serif text-3xl leading-tight">{pe.name}</p>
                                <Link
                                  href={`/${lang}/work/${pe.slug}`}
                                  className="mono-label u-link inline-flex items-center gap-1 text-signal-deep"
                                >
                                  {ui.experience.viewProject} <ArrowUpRight aria-hidden className="size-3.5" />
                                </Link>
                              </div>
                              <p className="mono-label mt-1 text-muted">{pe.line}</p>
                              <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-soft marker:text-signal">
                                {pe.points.map((pt) => (
                                  <li key={pt}>{pt}</li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {r.dutiesHeading && <h3 className="mono-label mt-8 text-signal-deep">{r.dutiesHeading}</h3>}
                    <ul className="mt-5 space-y-3">
                      {r.points.map((pt) => (
                        <li key={pt.text} className="grid gap-1 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                          <span className="mono-label pt-0.5 text-muted">{pt.label ?? "·"}</span>
                          <span className="text-ink-soft">{pt.text}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
            </ol>

            <h3 data-rv className="t-h3 mt-14">
              {ui.experience.otherHeading}
            </h3>
            <Link
              data-rv
              href={`/${lang}/work/recon-tool`}
              className="tile group mt-5 flex items-start justify-between gap-4 rounded-lg border border-line bg-card p-5"
            >
              <span>
                <span className="serif block text-3xl leading-tight">10CYBER Recon</span>
                <span className="mono-label mt-1 block text-muted">{c.projects["recon-tool"].category}</span>
                <span className="mt-3 block text-ink-soft">{ui.experience.otherText}</span>
              </span>
              <ArrowUpRight aria-hidden className="size-6 flex-none transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Stack ---- */}
      <section id="stack" className="border-t border-line bg-card">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
          <p data-rv className="mono-label text-signal-deep">
            {ui.stack.label}
          </p>
          <h2 data-wipe className="t-h2 mt-3 max-w-3xl">
            <H parts={ui.stack.headline} />
          </h2>

          <h3 data-rv className="t-h3 mt-14">
            {ui.stack.platformsLabel}
          </h3>
          <p data-rv className="mt-2 max-w-xl text-muted">
            {ui.stack.platformsNote}
          </p>
          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {productGroups.map((g) => (
              <div key={g}>
                <h4 data-rv className="mono-label text-muted">
                  {ui.stack.platformGroups[g]}
                </h4>
                <ul data-stag className="mt-3 grid grid-cols-2 gap-3">
                  {products
                    .filter((p) => p.group === g)
                    .map((p) => (
                      <li key={p.name} data-stag-item className="logo-tile tile" data-fill={p.tile ? "true" : undefined}>
                        <Image src={`/img/products/${p.file}`} alt={p.name} width={p.w} height={p.h} sizes="12rem" />
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 data-rv className="t-h3 mt-20 border-t border-line pt-12">
            {ui.stack.techLabel}
          </h3>
          <p data-rv className="mt-2 max-w-xl text-muted">
            {ui.stack.techNote}
          </p>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {techCategories.map((cat) => (
              <div key={cat}>
                <h4 data-rv className="mono-label text-muted">
                  {ui.stack.categories[cat]}
                </h4>
                <ul data-stag className="mt-3 flex flex-wrap gap-2">
                  {icons
                    .filter((t) => t.cat === cat)
                    .map((t) => (
                      <li key={t.id} data-stag-item className="tech-tile">
                        <span className="tech-icon" aria-hidden>
                          {t.icon ? <Image src={t.icon} alt="" width={24} height={24} /> : t.name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2)}
                        </span>
                        {t.name}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Certifications ---- */}
      <div id="certifications" />
      <Helix items={certItems} label={ui.certs.helixLabel} ratio={1.4} bg={bgVideo} />
      <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-8" aria-labelledby="cert-h">
        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-line pt-10">
          <h2 id="cert-h" data-wipe className="t-h2">
            {fill(ui.certs.title, { n: certs.length, m: certIssuers.length })}
          </h2>
          <p data-rv className="max-w-md text-muted">
            {ui.certs.hint}
          </p>
        </div>
        <div data-stag className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {certIssuers.map((issuer) => (
            <section key={issuer} data-stag-item className="tile rounded-lg border border-line bg-card p-5" aria-label={issuer}>
              <h3 className="serif text-2xl leading-tight">{issuer}</h3>
              <ul className="mt-3 divide-y divide-line/70">
                {certs
                  .filter((ce) => ce.issuer === issuer)
                  .map((ce) => (
                    <li key={ce.slug} className="py-2">
                      <a href={`/img/certs/${ce.slug}.webp`} target="_blank" rel="noopener noreferrer" className="u-link text-[0.95rem]">
                        {ce.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      {/* ---- Contact ---- */}
      <section id="contact" className="relative isolate overflow-hidden">
        <ShaderBackground className="-z-10 grain" showControl={false} />
        <div className="mx-auto max-w-[1400px] px-5 pb-28 pt-24 sm:px-8 lg:pt-32">
          <p data-rv className="mono-label text-ink-soft">
            {ui.contact.label}
          </p>
          <h2 data-wipe className="t-mega mt-3">
            <H parts={ui.contact.headline} />
          </h2>
          <a
            data-rv="0.1"
            href={`mailto:${contact.email}`}
            className="serif u-link mt-8 inline-block break-all text-3xl sm:text-5xl"
          >
            {contact.email}
          </a>
          <ul data-rv="0.15" className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-ink">
            <li className="flex items-center gap-2">
              <Phone aria-hidden className="size-4" />
              <a className="u-link" href={`tel:${contact.phoneHref}`}>
                {contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <GithubMark />
              <a className="u-link" href={contact.github} target="_blank" rel="noopener noreferrer">
                {contact.githubLabel}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <LinkedinMark />
              <a className="u-link" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FileText aria-hidden className="size-4" />
              <a className="u-link" href={cvHref} download>
                {ui.contact.cv}
              </a>
              <span aria-hidden className="text-muted">
                /
              </span>
              <a className="u-link" href={ui.contact.cvOtherHref} download>
                {ui.contact.cvOther}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin aria-hidden className="size-4" />
              {c.meta.location}
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
