"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { shaderFallbackCss, shaderPalette } from "@/lib/palette";

/**
 * Slowly flowing, mostly light colour field rendered with a small WebGL fragment shader
 * (no dependencies). Behaviour:
 * - A static CSS gradient with the same palette sits underneath, so it is
 *   what visitors see with no JS, no WebGL, or before the first frame.
 * - Renders at reduced resolution and about 30fps; it stops when scrolled
 *   offscreen or when the tab is hidden.
 * - Users with reduced motion get a still frame and can press Play.
 * - A visible Pause/Play button lets anyone stop the motion (WCAG 2.2.2).
 */

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
uniform vec2 r;
uniform float t;
uniform vec3 c[7];

float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h(i), h(i + vec2(1.0, 0.0)), f.x),
             mix(h(i + vec2(0.0, 1.0)), h(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * n(p); p *= 2.02; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / r;
  vec2 p = uv * vec2(r.x / r.y, 1.0) * 0.85;
  vec2 q = vec2(fbm(p + vec2(0.0, t * 0.035)), fbm(p + vec2(5.2, 1.3) - t * 0.03));
  float v = fbm(p + 2.2 * q + t * 0.03);
  float x = pow(clamp((v - 0.22) / 0.55, 0.0, 1.0), 1.9) * 6.0;
  vec3 col = vec3(0.0);
  for (int i = 0; i < 7; i++) {
    float w = max(0.0, 1.0 - abs(x - float(i)));
    col += w * c[i];
  }
  col += (h(gl_FragCoord.xy + t) - 0.5) * 0.02;
  gl_FragColor = vec4(col, 1.0);
}`;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const reducedSnapshot = () => window.matchMedia(reducedQuery).matches;

type Controller = { setPaused: (paused: boolean) => void };

export function ShaderBackground({
  className = "",
  showControl = true,
  playLabel = "Play background",
  pauseLabel = "Pause background",
}: {
  className?: string;
  showControl?: boolean;
  playLabel?: string;
  pauseLabel?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controller = useRef<Controller | null>(null);
  const reduced = useSyncExternalStore(subscribeReduced, reducedSnapshot, () => false);
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const paused = userPaused ?? reduced;
  const pausedNow = useRef(paused);

  // Set up WebGL once; the controller lets the paused state change without rebuilding.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return; // CSS fallback stays visible

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uR = gl.getUniformLocation(program, "r");
    const uT = gl.getUniformLocation(program, "t");
    const uC = gl.getUniformLocation(program, "c");
    gl.uniform3fv(uC, new Float32Array(shaderPalette.flatMap(hexToRgb)));

    let time = 3; // start part-way in so the first frame already looks composed
    let last = 0;
    let raf = 0;
    let visible = true;
    let tabVisible = !document.hidden;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(2, Math.round(rect.width * 0.5));
      const h = Math.max(2, Math.round(rect.height * 0.5));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const draw = () => {
      resize();
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      raf = 0;
      if (pausedNow.current || !visible || !tabVisible) return;
      if (now - last >= 33) {
        time += last ? Math.min(0.1, (now - last) / 1000) : 0;
        last = now;
        draw();
      }
      raf = requestAnimationFrame(loop);
    };
    const sync = () => {
      if (!pausedNow.current && visible && tabVisible) {
        if (!raf) {
          last = 0;
          raf = requestAnimationFrame(loop);
        }
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    draw();
    canvas.dataset.ready = "true";
    controller.current = {
      setPaused: (p) => {
        pausedNow.current = p;
        sync();
      },
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);
    const onVis = () => {
      tabVisible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(() => draw());
    ro.observe(canvas);
    sync();

    return () => {
      controller.current = null;
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  // Apply pause/play changes (user button or reduced-motion setting)
  useEffect(() => {
    pausedNow.current = paused;
    controller.current?.setPaused(paused);
  }, [paused]);

  return (
    <div
      aria-hidden={!showControl ? true : undefined}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ background: shaderFallbackCss }}
    >
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 size-full" />
      {showControl && (
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setUserPaused(!paused)}
          className="absolute bottom-4 right-4 z-20 inline-flex min-h-11 items-center gap-2 rounded-md border border-ink/30 bg-paper/70 px-3.5 text-sm font-medium text-ink backdrop-blur-sm transition-colors hover:bg-paper sm:bottom-6 sm:right-8"
        >
          {paused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
          {paused ? playLabel : pauseLabel}
        </button>
      )}
    </div>
  );
}
