"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, MOTION_OK, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Lenis smooth scrolling, wired into GSAP's ticker so ScrollTrigger (the
 * pinned intro, helixes and reveals) stays in step. Off for reduced motion.
 * Anchor links (#work etc.) are smoothed too. window.__lenis lets the
 * scroll buttons use the same engine.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia(MOTION_OK).matches) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -72 } });
    window.__lenis = lenis;
    document.documentElement.classList.add("lenis-on");
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
      document.documentElement.classList.remove("lenis-on");
    };
  }, []);
  return null;
}
