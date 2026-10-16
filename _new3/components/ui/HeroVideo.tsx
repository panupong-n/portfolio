"use client";

import { useEffect, useRef } from "react";

/**
 * Full-bleed looping background video (hero and the dark sections).
 * - The poster (first frame) shows without JS, before the video loads, or with
 *   reduced motion (the video then stays paused on the poster).
 * - Plays only while visible and while the tab is visible.
 */
export function HeroVideo({
  src,
  poster,
  videoClass = "absolute inset-0 -z-20 h-full w-full object-cover",
}: {
  src: string;
  poster: string;
  videoClass?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    const sync = () => {
      if (reduced || !visible || document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(v);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={videoClass}
      src={src}
      poster={poster}
      autoPlay={false}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
    />
  );
}
