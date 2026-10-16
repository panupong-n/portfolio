"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { WarpHandle, WarpState } from "./warp";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

export type FlyCard = {
  kind: "shot" | "cert" | "logo" | "tech";
  title: string;
  image: string;
  /** final position, percent of the stage (the card flies out from the centre to here and past it) */
  x: number;
  y: number;
  /** only shots and certificates link somewhere */
  href?: string;
  fit?: "cover" | "contain";
};

/**
 * A dark "flight" section. A Three.js star-field of streaks runs behind
 * statements that turn into view in 3D, one after another, while cards, logos
 * and tool icons fly out of the distance towards the screen. After the last
 * statement the ship goes to warp: the streaks stretch, the text rushes at the
 * viewer, and the screen floods with light, which is the colour of the next
 * section, so the exit is seamless.
 *
 * Scroll-driven and pinned with CSS sticky; the scroll distance and the scrub
 * lag are generous so each statement can be read. Without JS or with reduced
 * motion the statements are stacked plain text and the cards are a simple row.
 */
export function IntroStage({ statements, cards }: { statements: string[]; cards: FlyCard[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        el.dataset.mode = "3d";
        const paras = gsap.utils.toArray<HTMLElement>("[data-intro-text]", el);
        const flies = gsap.utils.toArray<HTMLElement>("[data-fly]", el);
        const glow = el.querySelector<HTMLElement>("[data-warp]");
        const flash = el.querySelector<HTMLElement>("[data-flash]");
        const canvas = el.querySelector<HTMLCanvasElement>("[data-warp-canvas]");
        const state: WarpState = { warp: 0 };
        let handle: WarpHandle | null = null;
        let gone = false;
        if (canvas) {
          import("./warp").then(({ createWarp }) => {
            if (gone) return;
            handle = createWarp(canvas, state);
            if (handle) {
              el.dataset.gl = "true";
              handle.setActive(ScrollTrigger.isInViewport(el, 0.001));
            }
          });
        }
        const visibility = ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => handle?.setActive(self.isActive),
        });
        const n = paras.length;
        const STEP = 1.4; // timeline units per statement
        const total = n * STEP;
        const rush = (n - 1) * STEP + 0.85; // when the last statement starts to leave
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 1.2 },
          onUpdate: () => {
            // tell the header when the screen is flooded with light, so it can switch to dark text
            if (!flash) return;
            const lit = Number(gsap.getProperty(flash, "opacity")) > 0.5;
            if (el.hasAttribute("data-lit") !== lit) {
              el.toggleAttribute("data-lit", lit);
              window.dispatchEvent(new Event("lit-change"));
            }
          },
        });
        gsap.set(paras, { autoAlpha: 0, transformPerspective: 700 });

        paras.forEach((p, i) => {
          const at = i * STEP;
          const last = i === n - 1;
          tl.fromTo(p, { rotationY: 55, x: 120, autoAlpha: 0 }, { rotationY: 0, x: 0, autoAlpha: 1, duration: 0.35 }, at);
          tl.to(p, { rotationY: -4, duration: 0.5 }, at + 0.35);
          if (!last) {
            tl.to(p, { rotationY: -55, x: -120, autoAlpha: 0, duration: 0.3 }, at + 0.85);
          } else {
            // the closing rush: the line comes at the viewer, grows, blurs and vanishes
            tl.to(
              p,
              { z: 560, rotationY: 0, autoAlpha: 0, filter: "blur(14px)", duration: 0.5, ease: "power3.in" },
              at + 0.85,
            );
          }
        });

        // the closing warp starts only once the last sentence begins to leave
        tl.to(state, { warp: 1, duration: 0.55, ease: "power2.in" }, rush);
        if (glow) tl.fromTo(glow, { opacity: 0, scale: 0.6 }, { opacity: 0.8, scale: 1.2, duration: 0.45, ease: "power1.in" }, rush + 0.1);
        if (flash) tl.fromTo(flash, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.in" }, rush + 0.25);

        flies.forEach((c, i) => {
          const at = (i / flies.length) * (rush - 1.7);
          tl.fromTo(
            c,
            { z: -2800, autoAlpha: 0, rotationZ: i % 2 ? -7 : 7 },
            { z: 540, autoAlpha: 1, rotationZ: i % 2 ? 4 : -4, duration: 1.7, ease: "power1.in" },
            at,
          );
          tl.to(c, { autoAlpha: 0, duration: 0.18 }, at + 1.52);
        });

        // keep the track exactly as long as the content
        tl.to({}, { duration: 0.001 }, total);
        requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => {
          gone = true;
          visibility.kill();
          handle?.dispose();
          delete el.dataset.mode;
          delete el.dataset.gl;
          el.removeAttribute("data-lit");
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} data-mode="static" className="intro" style={{ "--n": statements.length } as React.CSSProperties}>
      <div className="intro-stage">
        <canvas data-warp-canvas className="intro-canvas" aria-hidden />
        <div data-warp className="intro-warp" aria-hidden />
        <div className="intro-texts">
          {statements.map((s, i) => (
            <p key={i} data-intro-text className="intro-text">
              {s}
            </p>
          ))}
        </div>
        <div className="intro-fly">
          {cards.map((c, i) => {
            const style = {
              left: `${c.x}%`,
              top: `${c.y}%`,
              background: c.kind === "cert" || c.kind === "logo" || c.kind === "tech" ? "#fff" : undefined,
            };
            const img = (
              <Image
                src={c.image}
                alt=""
                {...(c.kind === "shot" || c.kind === "cert" ? { fill: true, sizes: "14rem" } : { width: 96, height: 96, unoptimized: true })}
                className={
                  c.kind === "cert" ? "object-contain p-2" : c.kind === "shot" ? "object-cover object-top" : undefined
                }
              />
            );
            return c.href ? (
              <Link key={i} href={c.href} data-fly data-kind={c.kind} style={style} className="intro-card" aria-label={c.title}>
                {img}
              </Link>
            ) : (
              <span key={i} data-fly data-kind={c.kind} style={style} className="intro-card" aria-hidden>
                {img}
              </span>
            );
          })}
        </div>
        <div data-flash className="intro-flash" aria-hidden />
      </div>
    </section>
  );
}
