"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * Coordinates the hero entrance. Elements opt in with `data-hero="<order>"`.
 *
 * The entrance is short (about 0.8s) and the headline and CTAs arrive first,
 * so the main message and primary action are available immediately.
 * Without JavaScript, or with reduced motion, everything is simply visible.
 */
export function HeroSequence({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const html = document.documentElement;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // the name: letters rise out of a clipped line, one after another
        gsap.fromTo(
          gsap.utils.toArray<HTMLElement>("[data-char]", el),
          { yPercent: 115, rotation: 7, autoAlpha: 0 },
          { yPercent: 0, rotation: 0, autoAlpha: 1, duration: 1.0, ease: "power4.out", stagger: 0.045, delay: 0.25 },
        );
        const items = gsap.utils.toArray<HTMLElement>("[data-hero]", el).sort(
          (a, b) => Number(a.dataset.hero) - Number(b.dataset.hero),
        );
        gsap
          .timeline({ onComplete: () => html.classList.add("hero-ready") })
          .fromTo(
            items,
            { autoAlpha: 0, y: 22 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.1,
              ease: "power3.out",
              clearProps: "transform",
            },
          );
      });

      // Scroll-linked exit: the headline block swings away in 3D (turns about its vertical axis) and fades
      mm.add(MOTION_OK, () => {
        const wrap = el.querySelector("[data-hero-fx]");
        if (!wrap) return;
        // Set the perspective up front: tweened from 0 it would be a few px at
        // the start of the scroll and distort the headline badly.
        gsap.set(wrap, { transformPerspective: 700 });
        gsap.to(wrap, {
          yPercent: -10,
          rotationY: -42,
          opacity: 0.1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        html.classList.add("hero-ready");
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
