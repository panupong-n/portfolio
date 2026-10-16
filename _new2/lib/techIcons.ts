import fs from "node:fs";
import path from "node:path";
import { products } from "@/lib/profile";
import { tech, type Tech } from "@/lib/tech";

/**
 * Resolves the icon for a technology at build time.
 * 1. a file the owner supplied: public/img/tech/<id>.(svg|png|webp)
 * 2. a generated brand icon: public/img/tech/_auto/<id>.svg
 * 3. none: the tile shows the name as text
 */
const pub = path.join(process.cwd(), "public");
const exts = ["svg", "png", "webp", "jpg"];

export type TechWithIcon = Tech & { icon?: string; custom: boolean };

export function resolveTech(): TechWithIcon[] {
  return tech.map((t) => {
    for (const e of exts) {
      if (fs.existsSync(path.join(pub, "img/tech", `${t.id}.${e}`))) return { ...t, icon: `/img/tech/${t.id}.${e}`, custom: true };
    }
    if (fs.existsSync(path.join(pub, "img/tech/_auto", `${t.id}.svg`))) return { ...t, icon: `/img/tech/_auto/${t.id}.svg`, custom: false };
    return { ...t, custom: false };
  });
}

/** Optional video file for a slug (public/video/<name>.mp4). */
export function videoFor(name: string): string | undefined {
  return fs.existsSync(path.join(pub, "video", `${name}.mp4`)) ? `/video/${name}.mp4` : undefined;
}

export function platformIcon(name: string) {
  return products.find((p) => p.name === name);
}
