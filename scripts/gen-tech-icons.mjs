// Generates coloured brand SVGs from simple-icons into public/img/tech/_auto.
// Run: node scripts/gen-tech-icons.mjs   (also runs before `next build` via prebuild)
import fs from "node:fs";
import path from "node:path";
import * as si from "simple-icons";

const src = fs.readFileSync(path.join(process.cwd(), "lib/tech.ts"), "utf8");
const pairs = [...src.matchAll(/id: "([^"]+)"[^}]*?si: "([^"]+)"/g)].map((m) => [m[1], m[2]]);
const out = path.join(process.cwd(), "public/img/tech/_auto");
fs.mkdirSync(out, { recursive: true });
const byslug = new Map(Object.values(si).filter((v) => v && v.slug).map((v) => [v.slug, v]));
let ok = 0;
const missing = [];
for (const [id, slug] of pairs) {
  const icon = byslug.get(slug);
  if (!icon) { missing.push(`${id} (${slug})`); continue; }
  const svg = icon.svg.replace("<svg ", `<svg fill="#${icon.hex}" `);
  fs.writeFileSync(path.join(out, `${id}.svg`), svg);
  ok++;
}
console.log(`tech icons: ${ok} generated${missing.length ? `, missing in simple-icons: ${missing.join(", ")}` : ""}`);
