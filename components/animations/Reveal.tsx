"use client";

import { usePathname } from "next/navigation";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * One instance in the layout animates the whole page. Markers:
 *   data-rv           fade and lift once as it enters (value = delay in seconds)
 *   data-wipe         headline wipes up from a clipped line
 *   data-stag         container whose [data-stag-item] children rise in a stagger
 *   data-parallax     image inside a clipped box drifts as you scroll (value = percent)
 *   data-draw         a line that draws down as its section scrolls past
 *   data-count        number that counts up (the text is already the final value)
 * #progress is the scroll bar at the top. Everything is plainly visible without
 * JS and with reduced motion.
 */
export function Reveal() {
  const path = usePathname();
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const bar = document.getElementById("progress");
        if (bar) {
          gsap.to(bar, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-rv]").forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              delay: Number(el.dataset.rv) || 0,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
              clearProps: "transform",
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-wipe]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 0 100% 0)", yPercent: 40, autoAlpha: 0 },
            {
              clipPath: "inset(0 0 -10% 0)",
              yPercent: 0,
              autoAlpha: 1,
              duration: 1.1,
              ease: "power4.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
              clearProps: "clipPath,transform",
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-stag]").forEach((box) => {
          const items = gsap.utils.toArray<HTMLElement>("[data-stag-item]", box);
          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 36, scale: 0.94 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "back.out(1.4)",
              stagger: { each: 0.045, from: "start" },
              scrollTrigger: { trigger: box, start: "top 85%", once: true },
              clearProps: "transform",
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amt = Number(el.dataset.parallax) || 10;
          const box = el.parentElement ?? el;
          gsap.fromTo(
            el,
            { yPercent: -amt, scale: 1 + amt / 40 },
            {
              yPercent: amt,
              ease: "none",
              scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
          const host = el.parentElement ?? el;
          gsap.fromTo(
            el,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              transformOrigin: "top",
              scrollTrigger: { trigger: host, start: "top 70%", end: "bottom 60%", scrub: 0.4 },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          if (!Number.isFinite(end)) return;
          const o = { v: 0 };
          gsap.to(o, {
            v: end,
            duration: 1.6,
            ease: "power2.out",
            snap: { v: 1 },
            onUpdate: () => {
              el.textContent = String(Math.round(o.v));
            },
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
          el.textContent = "0";
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
      return () => mm.revert();
    },
    { dependencies: [path] },
  );
  return null;
}
