"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Single registration point for GSAP plugins. Import gsap, ScrollTrigger and
 * useGSAP from here (never from "gsap" directly) so plugins are always
 * registered exactly once, before any animation code runs.
 *
 * Only import this file from client components. GSAP code must run inside
 * useGSAP/matchMedia so nothing executes during server rendering.
 */
gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Media query under which motion is allowed. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
