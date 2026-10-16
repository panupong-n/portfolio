"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";

const Q = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(Q);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Full-bleed looping background video for the hero.
 * - The poster (first frame) is what shows without JS, before the video loads,
 *   or with reduced motion (where the video does not play unless asked).
 * - Plays only while visible and while the tab is visible.
 * - A visible Pause/Play button (bottom left) lets anyone stop it (WCAG 2.2.2).
 */
export function HeroVideo({
  src,
  poster,
  playLabel,
  pauseLabel,
}: {
  src: string;
  poster: string;
  playLabel: string;
  pauseLabel: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(Q).matches, () => false);
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const paused = userPaused ?? reduced;
  const pausedRef = useRef(paused);
  const sync = useRef<() => void>(() => {});

  useEffect(() => {
    pausedRef.current = paused;
    sync.current();
  }, [paused]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let visible = true;
    sync.current = () => {
      if (pausedRef.current || !visible || document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync.current();
    });
    io.observe(v);
    const onVis = () => sync.current();
    document.addEventListener("visibilitychange", onVis);
    sync.current();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const toggle = () => setUserPaused(!paused);

  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? playLabel : pauseLabel}
        className="absolute bottom-5 left-5 z-20 grid size-10 place-items-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black sm:left-8"
      >
        {paused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
      </button>
    </>
  );
}
