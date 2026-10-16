import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Info, Lock } from "lucide-react";
import { VideoSlot } from "@/components/ui/Video";
import { getContent, isLocale, locales } from "@/lib/content";
import { getMeta, projectMeta } from "@/lib/work";
import { videoFor } from "@/lib/techIcons";

export function generateStaticParams() {
  return locales.flatMap((lang) => projectMeta.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const m = getMeta(slug);
  if (!isLocale(lang) || !m) return {};
  const t = getContent(lang).projects[m.slug];
  return {
    title: m.title,
    description: `${t.tagline} ${t.summary}`.slice(0, 200),
    alternates: {
      canonical: `/${lang}/work/${slug}`,
      languages: { en: `/en/work/${slug}`, th: `/th/work/${slug}`, "x-default": `/en/work/${slug}` },
    },
  };
}

const btnPrimary =
  "mono-label inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-paper transition-colors hover:bg-signal-deep";
const btnGhost = "mono-label inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/40 px-6 transition-colors hover:bg-sand";

export default async function WorkPage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  const m = getMeta(slug);
  if (!isLocale(lang) || !m) notFound();
  const c = getContent(lang);
  const { ui } = c;
  const t = c.projects[m.slug];
  const i = projectMeta.findIndex((x) => x.slug === slug);
  const next = projectMeta[(i + 1) % projectMeta.length];
  const video = videoFor(m.video);

  return (
    <article className="pb-24 pt-[calc(var(--header-h)+2rem)]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Link href={`/${lang}#work`} className="mono-label u-link inline-flex items-center gap-2 text-muted">
          <ArrowLeft aria-hidden className="size-4" /> {ui.project.allWork}
        </Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="mono-label text-signal-deep">{t.category}</p>
            <h1 className="t-mega mt-3 !text-[clamp(3rem,1rem+9vw,9rem)]">{m.title}</h1>
          </div>
          <div>
            <p className="t-lead">{t.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {m.demo && (
                <a href={m.demo} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                  {t.demoLabel} <ArrowUpRight aria-hidden className="size-4" />
                </a>
              )}
              {m.extra && (
                <a href={m.extra} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                  {t.extraLabel} <ArrowUpRight aria-hidden className="size-4" />
                </a>
              )}
            </div>
          </div>
        </header>

        <figure className="mt-10 overflow-hidden rounded-lg border border-line bg-card shadow-[var(--shadow-lift)]">
          <Image
            src={m.cover}
            alt={t.coverAlt}
            width={1440}
            height={900}
            priority
            sizes="(min-width: 1400px) 1336px, 94vw"
            className="h-auto w-full"
          />
        </figure>

        <p className="mt-4 flex max-w-3xl gap-2 text-sm text-muted">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
          {t.demoNote}
        </p>

        {video && (
          <section className="mt-12" aria-labelledby="video-h">
            <h2 id="video-h" className="t-h3 mb-5">
              {ui.project.videoHeading}
            </h2>
            <VideoSlot src={video} poster={m.cover} label={`${m.title}: ${ui.project.videoHeading}`} />
          </section>
        )}

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <aside className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <dl data-stag className="grid grid-cols-2 gap-x-6 gap-y-6">
              {m.factValues.map((value, k) => (
                <div key={k} data-stag-item className="border-t border-ink pt-3">
                  <dt className="sr-only">{t.factLabels[k]}</dt>
                  <dd>
                    <span className="serif block text-4xl leading-none">{value}</span>
                    <span className="mt-1 block text-sm text-muted">{t.factLabels[k]}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <h2 className="mono-label mt-10 text-muted">{ui.project.stack}</h2>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {m.stack.map((s) => (
                <li key={s} className="rounded-full border border-line bg-card px-2.5 py-1 font-mono text-xs">
                  {s}
                </li>
              ))}
            </ul>
            <h2 className="mono-label mt-10 flex items-center gap-1.5 text-muted">
              <Lock aria-hidden className="size-3.5" /> {ui.project.sourceLabel}
            </h2>
            <p className="mt-2 text-sm text-ink-soft">{ui.project.sourceValue}</p>
          </aside>

          <div className="prose-block">
            <h2 className="t-h3">{ui.project.why}</h2>
            <p>{t.summary}</p>
            <p>{t.problem}</p>

            <h2 className="t-h3 mt-14">{ui.project.what}</h2>
            <ul className="!mt-4 divide-y divide-line border-y border-line">
              {t.capabilities.map((cap) => (
                <li key={cap.title} className="grid gap-1 py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                  <span className="mono-label pt-1 text-signal-deep">{cap.title}</span>
                  <span className="text-ink-soft">{cap.text}</span>
                </li>
              ))}
            </ul>

            <h2 className="t-h3 mt-14">{ui.project.decisions}</h2>
            <ul className="!mt-4 list-disc space-y-2 pl-5 text-ink-soft marker:text-signal">
              {t.decisions.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>

            <h2 className="t-h3 mt-14">{ui.project.role}</h2>
            <ul className="!mt-4 list-disc space-y-2 pl-5 text-ink-soft marker:text-signal">
              {t.role.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>

        {m.shots.length > 1 && (
          <section className="mt-20" aria-labelledby="shots-h">
            <h2 id="shots-h" className="t-h3">
              {ui.project.screens}
            </h2>
            <ul data-stag className="mt-6 grid gap-4 sm:grid-cols-2">
              {m.shots.map((s, k) => (
                <li key={s} data-stag-item className="overflow-hidden rounded-lg border border-line bg-card">
                  <Image src={s} alt={t.shotAlts[k] ?? m.title} width={1440} height={900} sizes="(min-width: 640px) 48vw, 94vw" className="h-auto w-full" />
                </li>
              ))}
            </ul>
          </section>
        )}

        <Link
          href={`/${lang}/work/${next.slug}`}
          className="group mt-20 flex items-end justify-between gap-6 border-t border-ink pt-6"
        >
          <span>
            <span className="mono-label text-muted">{ui.project.next}</span>
            <span className="t-h2 mt-2 block">{next.title}</span>
          </span>
          <ArrowRight aria-hidden className="mb-2 size-10 transition-transform group-hover:translate-x-2" />
        </Link>
      </div>
    </article>
  );
}
