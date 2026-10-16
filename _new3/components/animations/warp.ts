import * as THREE from "three";

/**
 * Warp star-field for the intro: thousands of streaks flying at the camera.
 * Each star is an instanced quad that is stretched along its direction of
 * travel in the vertex shader, so there is one draw call and no per-frame CPU
 * work except two uniforms. Speed and streak length come from `state.warp`
 * (0 to 1, driven by the scroll timeline) plus the current scroll velocity.
 *
 * Returns null if WebGL is unavailable (the CSS background stays).
 */
export type WarpState = { warp: number };

export type WarpHandle = {
  setActive: (on: boolean) => void;
  dispose: () => void;
};

const DEPTH = 120;

const VERT = /* glsl */ `
uniform float uTravel;
uniform float uStreak;
uniform float uAspect;
uniform float uPx;
uniform float uClear;
attribute vec4 aSeed;
varying float vA;
varying vec3 vC;
void main() {
  float z = -mod(aSeed.z + uTravel, ${DEPTH.toFixed(1)});
  float len = uStreak * (0.35 + aSeed.w);
  vec4 ph = projectionMatrix * vec4(aSeed.xy, z, 1.0);
  vec4 pt = projectionMatrix * vec4(aSeed.xy, z - len, 1.0);
  vec2 asp = vec2(uAspect, 1.0);
  vec2 a = ph.xy / ph.w;
  vec2 b = pt.xy / pt.w;
  vec2 d = (b - a) * asp;
  float l = length(d);
  d = l > 1e-5 ? d / l : vec2(0.0, 1.0);
  vec2 n = vec2(-d.y, d.x) / asp;
  float t = position.y;
  vec2 p = mix(a, b, t) + n * position.x * uPx * (0.55 + aSeed.w) * (1.0 - 0.7 * t);
  float depthFade = smoothstep(0.0, 14.0, -z) * (1.0 - smoothstep(${(DEPTH * 0.55).toFixed(1)}, ${DEPTH.toFixed(1)}, -z));
  // keep the middle of the screen (where the text is) quiet; the clearing closes up during the final warp
  float centre = smoothstep(0.12, 0.62, length(a * asp));
  float clear = mix(1.0, 0.18 + 0.82 * centre, uClear);
  vA = depthFade * clear * (1.0 - 0.85 * t) * (0.3 + 0.7 * aSeed.w);
  vC = mix(vec3(0.30, 0.62, 1.0), vec3(0.85, 0.95, 1.0), aSeed.w);
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const FRAG = /* glsl */ `
uniform float uGain;
varying float vA;
varying vec3 vC;
void main() {
  gl_FragColor = vec4(vC * vA * uGain, 1.0);
}`;

export function createWarp(
  canvas: HTMLCanvasElement,
  state: WarpState,
): WarpHandle | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 400);

  const count = window.innerWidth < 700 ? 700 : 1500;
  const geo = new THREE.InstancedBufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array([-1, 0, 0, 1, 0, 0, -1, 1, 0, 1, 1, 0]), 3));
  geo.setIndex([0, 1, 2, 2, 1, 3]);
  const seeds = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) {
    // a ring-ish scatter: nothing right on the axis, so the middle stays open for the text
    const r = 3 + Math.pow(Math.random(), 0.7) * 70;
    const ang = Math.random() * Math.PI * 2;
    seeds[i * 4] = Math.cos(ang) * r;
    seeds[i * 4 + 1] = Math.sin(ang) * r * 0.62;
    seeds[i * 4 + 2] = Math.random() * DEPTH;
    seeds[i * 4 + 3] = Math.random();
  }
  geo.setAttribute("aSeed", new THREE.InstancedBufferAttribute(seeds, 4));
  geo.instanceCount = count;

  const mat = new THREE.ShaderMaterial({
    uniforms: { uTravel: { value: 0 }, uStreak: { value: 0.4 }, uAspect: { value: 1 }, uPx: { value: 0.0026 }, uGain: { value: 1.25 }, uClear: { value: 1 } },
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  scene.add(mesh);

  const resize = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    mat.uniforms.uAspect.value = w / h;
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  let raf = 0;
  let last = 0;
  let active = false;
  let lastY = window.scrollY;
  let vel = 0;
  let travel = 0;

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
    last = now;
    const y = window.scrollY;
    const inst = Math.abs(y - lastY) / Math.max(dt, 0.001);
    lastY = y;
    vel += (inst - vel) * Math.min(1, dt * 6);
    const w = state.warp;
    // units per second: a slow drift, scroll speed adds, the closing warp dominates
    const speed = 3 + Math.min(vel / 90, 10) + w * w * 260;
    travel += speed * dt;
    mat.uniforms.uTravel.value = travel;
    mat.uniforms.uStreak.value = 0.4 + Math.min(vel / 160, 2.2) + w * 70;
    mat.uniforms.uGain.value = 1.25 + w * 1.2;
    mat.uniforms.uClear.value = 1 - w;
    renderer.render(scene, camera);
  };

  return {
    setActive(on) {
      if (on === active) return;
      active = on;
      if (on) {
        last = 0;
        lastY = window.scrollY;
        raf = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    },
  };
}
