/**
 * Every technology, tool and system on the site, by category. `id` is also the
 * file name for its icon: drop `public/img/tech/<id>.svg` (or .png / .webp)
 * and the next build picks it up. Until then a generated brand icon from
 * simple-icons (public/img/tech/_auto/<id>.svg) is used if one exists, and
 * otherwise a text tile. `si` is the simple-icons slug used to generate it.
 * Only things from the owner's own projects, certificates and CV are listed.
 */

export type TechCategory = "languages" | "frontend" | "backend" | "data" | "infra" | "security" | "integrations" | "recon";

export type Tech = { id: string; name: string; cat: TechCategory; si?: string };

export const techCategories: TechCategory[] = [
  "languages",
  "frontend",
  "backend",
  "data",
  "infra",
  "security",
  "integrations",
  "recon",
];

export const tech: Tech[] = [
  // languages
  { id: "typescript", name: "TypeScript", cat: "languages", si: "typescript" },
  { id: "javascript", name: "JavaScript", cat: "languages", si: "javascript" },
  { id: "python", name: "Python", cat: "languages", si: "python" },

  // front end
  { id: "nextjs", name: "Next.js", cat: "frontend", si: "nextdotjs" },
  { id: "react", name: "React", cat: "frontend", si: "react" },
  { id: "vite", name: "Vite", cat: "frontend", si: "vite" },
  { id: "tailwindcss", name: "Tailwind CSS", cat: "frontend", si: "tailwindcss" },
  { id: "tanstack-query", name: "TanStack Query", cat: "frontend", si: "reactquery" },
  { id: "zustand", name: "Zustand", cat: "frontend" },
  { id: "recharts", name: "Recharts", cat: "frontend" },
  { id: "echarts", name: "Apache ECharts", cat: "frontend", si: "apacheecharts" },
  { id: "chrome-extension", name: "Chrome extensions", cat: "frontend", si: "googlechrome" },

  // back end
  { id: "nodejs", name: "Node.js", cat: "backend", si: "nodedotjs" },
  { id: "express", name: "Express", cat: "backend", si: "express" },
  { id: "nestjs", name: "NestJS", cat: "backend", si: "nestjs" },
  { id: "fastapi", name: "FastAPI", cat: "backend", si: "fastapi" },
  { id: "swagger", name: "Swagger / OpenAPI", cat: "backend", si: "swagger" },
  { id: "jwt", name: "JWT", cat: "backend", si: "jsonwebtokens" },
  { id: "nodemailer", name: "Nodemailer", cat: "backend" },
  { id: "winston", name: "Winston", cat: "backend" },

  // data
  { id: "postgresql", name: "PostgreSQL", cat: "data", si: "postgresql" },
  { id: "mongodb", name: "MongoDB", cat: "data", si: "mongodb" },
  { id: "clickhouse", name: "ClickHouse", cat: "data", si: "clickhouse" },
  { id: "redis", name: "Redis", cat: "data", si: "redis" },
  { id: "redpanda", name: "Redpanda", cat: "data" },
  { id: "kafka", name: "Kafka API", cat: "data", si: "apachekafka" },
  { id: "parquet", name: "Parquet + ZSTD", cat: "data", si: "apacheparquet" },
  { id: "minio", name: "MinIO / S3", cat: "data", si: "minio" },

  // infrastructure and delivery
  { id: "docker", name: "Docker", cat: "infra", si: "docker" },
  { id: "nginx", name: "nginx", cat: "infra", si: "nginx" },
  { id: "nginx-proxy-manager", name: "Nginx Proxy Manager", cat: "infra", si: "nginxproxymanager" },
  { id: "pm2", name: "PM2", cat: "infra", si: "pm2" },
  { id: "vmware-esxi", name: "VMware ESXi", cat: "infra", si: "vmware" },
  { id: "linux", name: "Linux", cat: "infra", si: "linux" },
  { id: "git", name: "Git", cat: "infra", si: "git" },
  { id: "github", name: "GitHub", cat: "infra", si: "github" },

  // security and identity
  { id: "active-directory", name: "Active Directory", cat: "security" },
  { id: "oauth-oidc", name: "OAuth 2.0 / OIDC", cat: "security", si: "openid" },
  { id: "totp-mfa", name: "TOTP / MFA", cat: "security" },
  { id: "bcrypt", name: "bcrypt + Helmet", cat: "security" },
  { id: "forcepoint-dlp", name: "Forcepoint DLP", cat: "security" },
  { id: "boldon-james", name: "Boldon James", cat: "security" },
  { id: "wafw00f", name: "wafw00f", cat: "security" },

  // integrations and automation
  { id: "crowdstrike-falcon", name: "CrowdStrike Falcon API", cat: "integrations" },
  { id: "crowdstrike-logscale", name: "CrowdStrike LogScale", cat: "integrations" },
  { id: "cortex-xdr", name: "Cortex XDR", cat: "integrations", si: "paloaltonetworks" },
  { id: "cloudflare", name: "Cloudflare API / WAF", cat: "integrations", si: "cloudflare" },
  { id: "microsoft-graph", name: "Microsoft Graph", cat: "integrations" },
  { id: "line", name: "LINE Messaging API", cat: "integrations", si: "line" },
  { id: "tp-link-omada", name: "TP-Link Omada", cat: "integrations", si: "tplink" },
  { id: "n8n", name: "n8n", cat: "integrations", si: "n8n" },
  { id: "snmp", name: "SNMP / BMC", cat: "integrations" },
  { id: "sentry", name: "Sentry", cat: "integrations", si: "sentry" },

  // reconnaissance sources
  { id: "shodan", name: "Shodan", cat: "recon" },
  { id: "censys", name: "Censys", cat: "recon" },
  { id: "netlas", name: "Netlas", cat: "recon" },
  { id: "crtsh", name: "crt.sh", cat: "recon" },
  { id: "rdap", name: "RDAP", cat: "recon" },
];
