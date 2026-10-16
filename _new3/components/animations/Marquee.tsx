"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Endless row. Scrolling the page speeds it up (and a fast flick briefly
 * reverses nothing: it only accelerates). Reduced motion: a static wrapped
 * list. `reverse` runs the other way.
 */
export function Marquee({
  children,
  reverse = false,
  label,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  label: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const tr = track.current;
      if (!el || !tr) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        el.dataset.static = "false";
        const tween = gsap.fromTo(
          tr,
          { xPercent: reverse ? -50 : 0 },
          { xPercent: reverse ? 0 : -50, duration: 60, ease: "none", repeat: -1 },
        );
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = Math.min(Math.abs(self.getVelocity()) / 260, 6);
            gsap.to(tween, { timeScale: 1 + v, duration: 0.25, overwrite: true });
            gsap.to(tween, { timeScale: 1, duration: 1.2, delay: 0.25 });
          },
          onToggle: (self) => (self.isActive ? tween.resume() : tween.pause()),
        });
        return () => {
          st.kill();
          tween.kill();
          el.dataset.static = "true";
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} data-static="true" className="marquee" role="group" aria-label={label}>
      <div ref={track} className="marquee-track">
        <div className="marquee-set">{children}</div>
        <div className="marquee-set" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
