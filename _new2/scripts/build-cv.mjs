// Builds the two CV pages (EN, TH) as HTML from the same content the site uses.
// Then render with:  python3 scripts/render-cv.py
// Run with Node 22+ (it imports the .ts content files directly).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const imp = (p) => import(pathToFileURL(path.join(root, p)).href);
const { default: en } = await imp("lib/content/en.ts");
const { default: th } = await imp("lib/content/th.ts");
const { certs, certIssuers, contact, products, site } = await imp("lib/profile.ts");
const { tech, techCategories } = await imp("lib/tech.ts");

const out = path.join(root, "scripts/cv-out");
fs.mkdirSync(out, { recursive: true });
const nm = (p) => pathToFileURL(path.join(root, "node_modules", p)).href;
const photo = pathToFileURL(path.join(root, "public/img/me/portrait.webp")).href;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const labels = {
  en: { summary: "Profile", exp: "Experience", edu: "Education", certs: "Certifications", skills: "Technology", products: "Security products", contact: "Contact", built: "Built at TEN FORWARD", link: "Portfolio", sole: "All projects built solo", cur: "Present", demos: "Live demos and project pages are on the portfolio site. Source repositories are private; a code walkthrough is available on request." },
  th: { summary: "โปรไฟล์", exp: "ประสบการณ์ทำงาน", edu: "การศึกษา", certs: "ใบรับรอง", skills: "เทคโนโลยี", products: "ผลิตภัณฑ์ด้านความปลอดภัย", contact: "ติดต่อ", built: "ระบบที่สร้างที่ TEN FORWARD", link: "เว็บผลงาน", sole: "ทุกโปรเจกต์พัฒนาคนเดียว", cur: "ปัจจุบัน", demos: "เดโมและหน้ารายละเอียดโปรเจกต์อยู่ที่เว็บผลงาน ซอร์สโค้ดเป็น private ขอให้พาดูโค้ดได้" },
};

function html(lang) {
  const c = lang === "en" ? en : th;
  const L = labels[lang];
  const p = c.profile;
  const siteHost = site.url.replace(/^https?:\/\//, "");
  const roles = p.roles
    .map((r, i) => {
      const entries = (r.projectEntries ?? [])
        .map(
          (pe) => `<div class="proj"><div class="ph"><b>${esc(pe.name)}</b><span>${esc(pe.line)}</span></div><ul>${pe.points
            .map((x) => `<li>${esc(x)}</li>`)
            .join("")}</ul></div>`,
        )
        .join("");
      const pts = r.points.map((x) => `<li>${x.label ? `<b>${esc(x.label)}:</b> ` : ""}${esc(x.text)}</li>`).join("");
      const compact = i > 0 ? " compact" : "";
      return `<div class="role${compact}"><div class="rh"><div><b class="rt">${esc(r.title)}</b><span class="rc"> · ${esc(r.company)}</span></div><span class="rp">${esc(r.period)}</span></div>
      ${r.intro ? `<p class="intro">${esc(r.intro)}</p>` : ""}
      ${r.projectEntries ? `<div class="sub">${esc(L.built)}</div>${entries}` : ""}
      ${r.dutiesHeading ? `<div class="sub">${esc(r.dutiesHeading)}</div>` : ""}
      <ul>${pts}</ul></div>`;
    })
    .join("");
  const recon = c.projects["recon-tool"];
  const certHtml = certIssuers
    .map((iss) => `<div class="ci"><b>${esc(iss)}</b><br>${certs.filter((x) => x.issuer === iss).map((x) => esc(x.title)).join("<br>")}</div>`)
    .join("");
  const techHtml = techCategories
    .map((k) => `<div class="tc"><b>${esc(c.ui.stack.categories[k])}</b><br>${tech.filter((t) => t.cat === k).map((t) => esc(t.name)).join(" · ")}</div>`)
    .join("");
  const prodHtml = products.map((x) => esc(x.name)).join(" · ");

  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${esc(site.name)} CV</title>
<style>
@font-face{font-family:"Inter Tight";src:url(${nm("@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2")});font-weight:100 900}
@font-face{font-family:"Noto Sans Thai";src:url(${nm("@fontsource-variable/noto-sans-thai/files/noto-sans-thai-thai-wght-normal.woff2")});font-weight:100 900;unicode-range:U+0E01-0E5B,U+200B-200D,U+25CC}
@font-face{font-family:"Instrument Serif";src:url(${nm("@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2")})}
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
:root{--ink:#15140f;--soft:#3c3a31;--muted:#666255;--line:#d8d1c1;--sig:#b52b09;--paper:#f4f0e8}
body{font-family:"Inter Tight","Noto Sans Thai",sans-serif;color:var(--ink);font-size:8.6pt;line-height:${lang === "th" ? 1.55 : 1.42};-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:210mm;height:297mm;display:grid;grid-template-columns:62mm 1fr;overflow:hidden;page-break-after:always;position:relative}
.side{background:var(--paper);padding:11mm 6mm 8mm 8mm;border-right:1px solid var(--line)}
.main{padding:11mm 9mm 8mm 8mm}
.photo{width:34mm;height:42mm;border-radius:3mm;object-fit:cover;object-position:50% 12%;display:block;background:#fff}
h1{font-family:"Instrument Serif","Noto Sans Thai",serif;font-weight:400;font-size:${lang === "th" ? "16pt" : "22pt"};line-height:1.1;margin-top:5mm}
.role-line{color:var(--sig);font-weight:600;margin-top:1.5mm;font-size:8.4pt}
h2{font-size:7.4pt;letter-spacing:${lang === "th" ? "0" : ".12em"};text-transform:${lang === "th" ? "none" : "uppercase"};color:var(--sig);font-weight:700;margin:5mm 0 1.6mm;border-bottom:1px solid var(--line);padding-bottom:1mm}
.side h2:first-of-type{margin-top:6mm}
.main h2:first-child{margin-top:0}
.contact div{margin-bottom:1.1mm;word-break:break-all}
.contact span{color:var(--muted);display:block;font-size:6.8pt}
.ci,.tc{margin-bottom:1.5mm;font-size:7.2pt;color:var(--soft)}
.ci b,.tc b{color:var(--ink);font-size:7.8pt}
.prod{font-size:7.6pt;color:var(--soft)}
.summary{color:var(--soft);font-size:8.8pt}
.role{margin-bottom:4mm}
.rh{display:flex;justify-content:space-between;align-items:baseline;gap:3mm}
.rt{font-size:10pt}.rc{color:var(--soft)}.rp{color:var(--muted);font-size:7.6pt;white-space:nowrap}
.intro{color:var(--soft);margin:1.2mm 0}
.sub{font-size:7pt;font-weight:700;color:var(--muted);margin:2.2mm 0 .8mm;text-transform:${lang === "th" ? "none" : "uppercase"};letter-spacing:${lang === "th" ? "0" : ".08em"}}
.proj{margin-bottom:1.8mm;padding-left:2.5mm;border-left:2px solid var(--sig)}
.ph{display:flex;flex-direction:column}.ph span{color:var(--muted);font-size:7.6pt}
ul{padding-left:4mm;color:var(--soft)}li{margin:.5mm 0}
.compact{margin-bottom:2.6mm}.compact ul{margin-top:.8mm}
.foot{position:absolute;left:70mm;right:9mm;bottom:6mm;font-size:6.8pt;color:var(--muted)}
.edu b{display:block}
</style></head><body>
<section class="page">
<aside class="side">
<img class="photo" src="${photo}" alt="">
<h1>${esc(lang === "th" ? site.nameTh : site.name)}</h1>
<div class="role-line">${esc(c.meta.role)}</div>
<h2>${esc(L.contact)}</h2>
<div class="contact">
<div>${esc(contact.email)}</div>
<div>${esc(contact.phone)}</div>
<div>${esc(contact.githubLabel)}</div>
<div>linkedin.com/in/panupong-nijjaboon-964a8927b</div>
<div>${esc(c.meta.location)}</div>
</div>
<h2>${esc(L.certs)} (${certs.length})</h2>
${certHtml}
</aside>
<main class="main">
<h2>${esc(L.summary)}</h2>
<p class="summary">${esc(p.summary)}</p>
<h2>${esc(L.exp)}</h2>
${roles.split('<div class="role compact">')[0]}
<div class="foot">${esc(L.demos)}</div>
</main>
</section>
<section class="page">
<aside class="side">
<h2 style="margin-top:0">${esc(L.skills)}</h2>
${techHtml}
<h2>${esc(L.products)}</h2>
<div class="prod">${prodHtml}</div>
</aside>
<main class="main">
${roles.includes('<div class="role compact">') ? '<div class="role compact">' + roles.split('<div class="role compact">').slice(1).join('<div class="role compact">') : ""}
<h2>${esc(L.edu)}</h2>
<div class="edu"><b>${esc(p.education.degree)}</b>${esc(p.education.school)}, ${esc(p.education.years)}</div>
<h2>10CYBER Recon</h2>
<p class="summary"><b>${esc(recon.category)}.</b> ${esc(c.ui.experience.otherText)}</p>
<div class="foot">${esc(L.sole)} · ${esc(L.demos)}</div>
</main>
</section></body></html>`;
}

for (const lang of ["en", "th"]) fs.writeFileSync(path.join(out, `cv-${lang}.html`), html(lang));
console.log("cv html written to", out);
