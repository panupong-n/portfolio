"use client";

import Image from "next/image";
import { HeroVideo } from "@/components/ui/HeroVideo";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

export type HelixItem = {
  href: string;
  /** open in a new tab (used for certificate images) */
  external?: boolean;
  title: string;
  category: string;
  line?: string;
  image: string;
  alt: string;
  fit?: "cover" | "contain";
  /** width / height of this card's picture; overrides the helix default so the frame fits it exactly */
  ratio?: number;
  /** optional short silent loop (public/video/<slug>-card.mp4), played while the card is at the front */
  video?: string;
};

/**
 * Cards on a vertical helix. Geometry is plain CSS (see .helix in globals.css):
 * item i sits at angle i*step round the axis and i*dy below the front, and every
 * card keeps facing the camera. Scrolling advances --p from 0 to 1, which moves
 * every item up and round together: cards rush towards you at the front, climb
 * away, and are replaced by the next ones coming round from below and behind.
 *
 * - No JS or reduced motion: a plain responsive grid, nothing hidden.
 * - Only cards near the front can be clicked or focused; the rest are `inert`.
 * - The large label names the category of the card at the front.
 */
export function Helix({
  items,
  label,
  id,
  ratio = 1.6,
  bg,
}: {
  items: HelixItem[];
  /** accessible name of the section */
  label: string;
  id?: string;
  /** width / height of every card face (1.6 for screenshots, 1.4 for certificates) */
  ratio?: number;
  /** dark section with a looping background video (data-dark-zone lets the header switch to light text) */
  bg?: { src: string; poster: string; playLabel: string; pauseLabel: string };
}) {
  const root = useRef<HTMLElement>(null);
  const cat = useRef<HTMLParagraphElement>(null);
  const n = items.length;

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const cards = Array.from(el.querySelectorAll<HTMLElement>(".helix-item"));
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        el.dataset.mode = "3d";
        const step = 40; // degrees, keep in sync with --da in CSS
        let shown = "";
        const update = (p: number) => {
          const active = p * (n - 1);
          let nearest = 0;
          cards.forEach((c, i) => {
            const d = Math.abs(i - active);
            if (d < Math.abs(nearest - active)) nearest = i;
            const facing = Math.cos(((i - active) * step * Math.PI) / 180) > 0.15;
            c.toggleAttribute("inert", !(facing && d < 3.6));
            c.style.setProperty("--cap", String(Math.max(0, Math.min(1, 1.5 - d * 2.4))));
            const vid = c.querySelector<HTMLVideoElement>("video");
            if (vid) {
              if (d < 0.9) vid.play().catch(() => {});
              else vid.pause();
            }
          });
          const next = items[nearest]?.category ?? "";
          if (cat.current && next !== shown) {
            shown = next;
            const node = cat.current;
            gsap.killTweensOf(node);
            gsap.fromTo(
              node,
              { autoAlpha: 0, yPercent: 20 },
              {
                autoAlpha: 1,
                yPercent: 0,
                duration: 0.45,
                ease: "power2.out",
                onStart: () => {
                  node.textContent = next;
                },
              },
            );
          }
        };
        update(0);
        gsap.fromTo(
          el,
          { "--p": 0 },
          {
            "--p": 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              onUpdate: (self) => update(self.progress),
            },
          },
        );
        // the layout switched from a grid to a tall track: re-measure
        requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
          delete el.dataset.mode;
          el.style.removeProperty("--p");
          cards.forEach((c) => {
            c.removeAttribute("inert");
            c.style.removeProperty("--cap");
          });
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id={id}
      data-mode="static"
      data-tone={bg ? "dark" : undefined}
      data-dark-zone={bg ? "" : undefined}
      className="helix"
      style={{ "--i-last": n - 1, "--face-r": `${ratio}` } as React.CSSProperties}
      aria-label={label}
    >
      <div className="helix-stage">
        {bg && (
          <>
            <HeroVideo
              src={bg.src}
              poster={bg.poster}
              playLabel={bg.playLabel}
              pauseLabel={bg.pauseLabel}
              videoClass="absolute inset-0 z-0 h-full w-full object-cover"
              buttonClass="absolute left-5 top-[calc(var(--header-h)+1rem)] z-20 sm:left-8"
            />
            <div className="helix-shade" aria-hidden />
          </>
        )}
        <p ref={cat} aria-hidden className="helix-label t-h2" />
        <div className="helix-base">
          {items.map((it, i) => {
            const face = (
              <>
                <span className="helix-face" style={{ ...(it.fit === "contain" ? { background: "#fff" } : null), ...(it.ratio ? { aspectRatio: it.ratio } : null) }}>
                  <Image
                    src={it.image}
                    alt={it.alt}
                    fill
                    sizes="(min-width: 1024px) 17rem, 40vw"
                    className={it.fit === "contain" ? "object-contain" : "object-cover object-top"}
                  />
                  {it.video ? (
                    <video
                      src={it.video}
                      poster={it.image}
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-hidden
                      tabIndex={-1}
                      className="absolute inset-0 size-full object-cover object-top"
                    />
                  ) : null}
                  <ArrowUpRight
                    aria-hidden
                    className="absolute right-2 top-2 size-6 rounded-full bg-paper/90 p-1 text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
                <span className="helix-caption">
                  <span className="serif block text-[1.9em] leading-[1.05]">{it.title}</span>
                  <span className="mono-label mt-1 block !text-[0.9em] text-muted">{it.category}</span>
                  {it.line ? <span className="helix-line mt-1 block text-[1.25em] leading-snug text-ink-soft">{it.line}</span> : null}
                </span>
              </>
            );
            const common = {
              className: "helix-item group block",
              style: { "--i": i } as React.CSSProperties,
            };
            return it.external ? (
              <a key={it.href} href={it.href} target="_blank" rel="noopener noreferrer" {...common}>
                {face}
              </a>
            ) : (
              <Link key={it.href} href={it.href} {...common}>
                {face}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
