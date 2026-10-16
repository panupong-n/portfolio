/**
 * Language-independent facts about the person. Wording is in lib/content/*.
 * Everything comes from the owner's own CV, project documents and certificate
 * files. Nothing is invented: if a fact is not in the sources it is not here.
 */

export const site = {
  name: "Panupong Nijjaboon",
  nameTh: "ภานุพงศ์ นิจบุญ",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-panupong-nijjaboon.vercel.app",
};

export const contact = {
  email: "panupong.nijjaboon@gmail.com",
  phone: "098-276-4341",
  phoneHref: "+66982764341",
  github: "https://github.com/panupong-n",
  githubLabel: "github.com/panupong-n",
  linkedin: "https://www.linkedin.com/in/panupong-nijjaboon-964a8927b/",
};

export type ProductGroup = "endpoint" | "data" | "network" | "identity" | "validation" | "awareness" | "cloud";

/**
 * Logos supplied by the owner: products they have used or worked with. All
 * tiles on the site share one size (2.2 : 1); `tile` marks the two solid-colour
 * banners that fill their tile edge to edge, the rest are tightly cropped and
 * scaled to fit it.
 */
export const products: { name: string; file: string; w: number; h: number; group: ProductGroup; tile?: boolean }[] = [
  { name: "CrowdStrike", file: "crowdstrike.png", w: 1280, h: 581, group: "endpoint", tile: true },
  { name: "Palo Alto Networks Cortex", file: "paloalto.png", w: 880, h: 175, group: "endpoint" },
  { name: "Splunk", file: "splunk.png", w: 645, h: 204, group: "data" },
  { name: "Forcepoint", file: "forcepoint.png", w: 1926, h: 325, group: "data" },
  { name: "Zscaler", file: "zscaler.png", w: 880, h: 198, group: "network" },
  { name: "Netskope", file: "netskope.png", w: 880, h: 345, group: "network" },
  { name: "Cloudflare", file: "cloudflare.png", w: 880, h: 300, group: "network" },
  { name: "Cato Networks", file: "catonetwork.png", w: 880, h: 370, group: "network" },
  { name: "Silverfort", file: "silverfort.png", w: 880, h: 209, group: "identity" },
  { name: "Keyfactor", file: "keyfactor.png", w: 1280, h: 581, group: "identity", tile: true },
  { name: "Cymulate", file: "cymulate.png", w: 720, h: 513, group: "validation" },
  { name: "Horizon3.ai", file: "horizon3ai.png", w: 880, h: 225, group: "validation" },
  { name: "KnowBe4", file: "knowbe4.png", w: 880, h: 250, group: "awareness" },
  { name: "AWS", file: "aws.png", w: 853, h: 514, group: "cloud" },
];

export const productGroups: ProductGroup[] = ["endpoint", "data", "network", "identity", "validation", "awareness", "cloud"];

/** `ratio` = width / height of the certificate image, so each card frame matches its picture exactly */
export type Cert = { slug: string; title: string; issuer: string; ratio: number };

/**
 * Grouped by issuer (alphabetical, as in the owner's Certificate folder), and
 * within an issuer from entry level to advanced. Neighbouring helix cards
 * therefore share an issuer, and the helix label names it.
 */
export const certs: Cert[] = [
  { slug: "comptia-security", title: "CompTIA Security+", issuer: "CompTIA", ratio: 1.29 },

  { slug: "crowdstrike-certified-siem-engineer-ccse", title: "CrowdStrike Certified SIEM Engineer (CCSE)", issuer: "CrowdStrike", ratio: 1.29 },
  { slug: "crowdstrike-technical-sales-accreditation", title: "CrowdStrike Technical Sales Accreditation", issuer: "CrowdStrike", ratio: 1.41 },

  { slug: "certified-red-team-analyst-crta", title: "Certified Red Team Analyst (CRTA)", issuer: "CyberWarFare Labs", ratio: 1.41 },
  { slug: "active-directory-red-team-specialist-ad-rts", title: "Active Directory Red Team Specialist (AD-RTS)", issuer: "CyberWarFare Labs", ratio: 1.41 },
  { slug: "multi-cloud-red-teaming-analyst-mcrta", title: "Multi-Cloud Red Teaming Analyst (MCRTA)", issuer: "CyberWarFare Labs", ratio: 1.41 },
  { slug: "certified-red-team-infra-dev-crt-id", title: "Certified Red Team INFRA DEV (CRT-ID)", issuer: "CyberWarFare Labs", ratio: 1.41 },

  { slug: "junior-penetration-tester-ejpt", title: "Junior Penetration Tester (eJPT)", issuer: "INE", ratio: 1.29 },

  { slug: "certified-mobile-app-penetration-testing-apprentice", title: "Certified Mobile App Penetration Testing Apprentice", issuer: "Knight Squad Academy", ratio: 1.29 },

  { slug: "thailand-cyber-top-talent-2025", title: "Thailand Cyber Top Talent 2025", issuer: "National Cyber Security Agency (Thailand)", ratio: 1.41 },

  { slug: "beginner-red-team", title: "Beginner (Red Team)", issuer: "Permis Security", ratio: 1.75 },
  { slug: "pentest-47", title: "PENTEST 47", issuer: "Permis Security", ratio: 1.75 },

  { slug: "silverfort-unified-associate-certification", title: "Silverfort Unified Associate", issuer: "Silverfort", ratio: 1.41 },
  { slug: "silverfort-unified-professional-certification", title: "Silverfort Unified Professional", issuer: "Silverfort", ratio: 1.41 },
  { slug: "silverfort-unified-expert-certification", title: "Silverfort Unified Expert", issuer: "Silverfort", ratio: 1.41 },

  { slug: "zscaler-technical-associate-zta", title: "Zscaler Technical Associate (ZTA)", issuer: "Zscaler", ratio: 1.29 },
  { slug: "zscaler-certified-sales-professional", title: "Zscaler Certified Sales Professional", issuer: "Zscaler", ratio: 1.29 },
  { slug: "zscaler-certified-sales-engineer", title: "Zscaler Certified Sales Engineer", issuer: "Zscaler", ratio: 1.29 },
];

export const certIssuers = Array.from(new Set(certs.map((c) => c.issuer)));
