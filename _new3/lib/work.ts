/**
 * Language-independent project data: slugs, images, demo links, fact values and
 * stacks. All wording lives in lib/content/{en,th}.ts under `projects`.
 * Numbers are quoted with the qualifier the source gives them (see the labels
 * in the content files). All demos run in the browser on invented data.
 */
import type { ProjectSlug } from "@/lib/content/types";

const w = (f: string) => `/img/work/${f}.webp`;

export type ProjectMeta = {
  slug: ProjectSlug;
  title: string;
  cover: string;
  shots: string[];
  demo?: string;
  extra?: string;
  factValues: string[];
  stack: string[];
  /** optional walkthrough video, used automatically when the file exists in public/video */
  video: string;
};

export const projectMeta: ProjectMeta[] = [
  {
    slug: "tenix-one",
    title: "TENIX One",
    cover: w("tenix-one-dashboard"),
    shots: [w("tenix-one-dashboard"), w("tenix-one-alerts"), w("tenix-one-wall")],
    demo: "/demos/TENIX-One-Demo.html",
    extra: "/demos/TENIX-One-System-Info.html",
    factValues: ["≈66,000", "57", "3", "MFA"],
    stack: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Zustand", "Recharts / ECharts", "Express", "PostgreSQL", "ClickHouse", "JWT", "nginx", "pm2", "CrowdStrike API", "Cloudflare API", "Microsoft Graph", "TP-Link Omada", "LINE"],
    video: "tenix-one",
  },
  {
    slug: "tenix-deepspace",
    title: "TENIX DeepSpace",
    cover: w("deepspace-pipeline"),
    shots: [w("deepspace-pipeline"), w("deepspace-overview")],
    demo: "/demos/tenix-deepspace.html",
    factValues: ["15.8×", "25.6×", "12+", "4"],
    stack: ["Python", "FastAPI", "Next.js", "TypeScript", "ClickHouse", "PostgreSQL", "Redpanda (Kafka API)", "Parquet + ZSTD", "MinIO / S3", "Docker", "nginx", "TOTP"],
    video: "tenix-deepspace",
  },
  {
    slug: "project-hub",
    title: "Project Hub",
    cover: w("project-hub-dashboard"),
    shots: [w("project-hub-dashboard"), w("project-hub-calendar")],
    demo: "/demos/project-hub.html",
    factValues: ["≈14,700", "≈32,000", "3", "30"],
    stack: ["React 18", "TypeScript", "Vite", "TanStack Query", "Tailwind CSS", "Express", "MongoDB (Mongoose)", "Redis", "LINE Messaging API", "Nodemailer", "Winston", "PM2", "nginx", "Swagger / OpenAPI"],
    video: "project-hub",
  },
  {
    slug: "tenix-fullsnap",
    title: "TENIX FullSnap",
    cover: w("fullsnap-1"),
    shots: [w("fullsnap-1"), w("fullsnap-2"), w("fullsnap-3"), w("fullsnap-4"), w("fullsnap-5")],
    factValues: ["5", "3"],
    stack: ["Chrome extension", "TypeScript", "Email OTP", "TENIX One admin"],
    video: "tenix-fullsnap",
  },
  {
    slug: "recon-tool",
    title: "10CYBER Recon",
    cover: "/img/work/recon-modules.webp",
    shots: ["/img/work/recon-modules.webp"],
    factValues: ["10", "3"],
    stack: ["Python 3.9+", "wafw00f", "Shodan", "Censys", "Netlas", "RDAP", "crt.sh"],
    video: "recon-tool",
  },
];

export const projectSlugs = projectMeta.map((p) => p.slug);

export function getMeta(slug: string) {
  return projectMeta.find((p) => p.slug === slug);
}
