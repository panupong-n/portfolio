"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

/**
 * Two small round buttons, bottom right: jump to the top or the bottom of the
 * page. A thin ring round the button shows how far down the page you are.
 * The up button appears after the first screen, the down button hides at the end.
 */
export function ScrollButtons({ labelTop, labelBottom }: { labelTop: string; labelBottom: string }) {
  const ring = useRef<SVGCircleElement>(null);
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(true);

  useEffect(() => {
    const C = 2 * Math.PI * 20;
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      ring.current?.setAttribute("stroke-dashoffset", String(C * (1 - p)));
      setShowUp(window.scrollY > window.innerHeight * 0.6);
      setShowDown(p < 0.985);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  const go = (to: "top" | "bottom") => {
    const y = to === "top" ? 0 : document.documentElement.scrollHeight;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(y, { duration: 2.2, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const base =
    "relative grid size-11 place-items-center rounded-full border border-ink/15 bg-paper/80 text-ink shadow-[0_6px_24px_-8px_rgb(21_20_15/0.35)] backdrop-blur-md transition-[opacity,transform,background-color,color] duration-300 hover:bg-ink hover:text-paper";

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-40 flex flex-col gap-2 sm:bottom-6 sm:right-6">
      <button
        type="button"
        aria-label={labelTop}
        onClick={() => go("top")}
        tabIndex={showUp ? 0 : -1}
        className={`${base} ${showUp ? "pointer-events-auto translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
      >
        <svg aria-hidden viewBox="0 0 44 44" className="absolute inset-0 -rotate-90">
          <circle cx="22" cy="22" r="20" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" />
          <circle
            ref={ring}
            cx="22"
            cy="22"
            r="20"
            fill="none"
            stroke="var(--color-signal)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 20}
            strokeDashoffset={2 * Math.PI * 20}
          />
        </svg>
        <ArrowUp aria-hidden className="size-4" />
      </button>
      <button
        type="button"
        aria-label={labelBottom}
        onClick={() => go("bottom")}
        tabIndex={showDown ? 0 : -1}
        className={`${base} ${showDown ? "pointer-events-auto translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
      >
        <ArrowDown aria-hidden className="size-4" />
      </button>
    </div>
  );
}
