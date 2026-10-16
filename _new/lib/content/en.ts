import type { Content } from "./types";

const en: Content = {
  meta: {
    title: "Panupong Nijjaboon | System Engineer & Cybersecurity",
    description:
      "Portfolio of Panupong Nijjaboon, a system and cybersecurity engineer who designs and builds security software end to end: SOC platforms, tamper-evident log storage and project tooling.",
    role: "System Engineer & Cybersecurity",
    location: "Samut Sakhon, Bangkok",
  },
  ui: {
    nav: { work: "Work", experience: "Experience", stack: "Stack", certifications: "Certifications", contact: "Contact" },
    emailMe: "Email me",
    portfolio: "Portfolio",
    skip: "Skip to content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    switchLabel: "Switch to Thai",
    switchShort: "ไทย",
    pauseBg: "Pause background animation",
    playBg: "Play background animation",
    scrollTop: "Back to top",
    scrollBottom: "Jump to the bottom",
    hero: {
      tagline:
        "I design and build security software end to end: SOC platforms, log storage and project tooling. On each one I am the only developer.",
      ctaWork: "See the work",
      ctaDemo: "Open a live demo",
      scroll: "Scroll",
    },
    intro: [
      "I build the tools security teams work in.",
      "From the first alert to the audit trail.",
      "Logs that can prove they were never touched.",
      "Five systems, each built end to end by one person.",
    ],
    facts: ["systems built end to end", "certifications", "certification issuers", "security platforms worked with"],
    work: {
      title: "Selected work",
      blurb:
        "Five things I designed and built, each one on my own. Three have an interactive demo you can open and click through; they run in your browser on invented data.",
      demoDetails: "Demo + details",
      details: "Details",
      helixLabel: "Selected work",
    },
    source: {
      label: "Source code",
      title: ["Why the ", "GitHub", " looks empty"],
      body: "The repositories behind this work are private, so my GitHub profile shows few or no public projects. Here is how you can still see what I built.",
      cards: [
        { title: "Live demos", text: "Three systems open in your browser with invented data: click through the real interface, not a mock-up." },
        { title: "Design write-ups", text: "Each project page explains the problem, the design decisions and exactly what I did, with screenshots." },
        { title: "Code walkthrough on request", text: "I am glad to walk through the code and architecture in an interview or on a screen-share." },
      ],
      github: "My GitHub profile",
    },
    marquee: "Tools and systems I work with",
    about: {
      label: "About",
      headline: ["Engineer first, ", "security", " always."],
      now: "Now",
      education: "Education",
      portraitAlt: "Portrait of Panupong Nijjaboon smiling, in a navy suit and patterned tie",
      videoLabel: "A short introduction",
    },
    experience: {
      label: "Experience",
      headline: ["Four roles, one thread: ", "detect, respond, build.", ""],
      current: "Current",
      builtHeading: "What I built here",
      viewProject: "Project page",
      otherHeading: "Also built",
      otherText:
        "A command-line tool that builds an exposure report for a domain from public sources. Python, sole developer. Source is on request.",
    },
    stack: {
      label: "Stack",
      headline: ["Platforms and tools ", "I work with.", ""],
      platformsLabel: "Security products",
      platformsNote: "Products I have worked with, grouped by what they do.",
      techLabel: "Technology I build with",
      techNote: "Everything used in the systems above, by layer.",
      categories: {
        languages: "Languages",
        frontend: "Front end",
        backend: "Back end",
        data: "Data and messaging",
        infra: "Infrastructure and delivery",
        security: "Security and identity",
        integrations: "Integrations and automation",
        recon: "Reconnaissance sources",
      },
      platformGroups: {
        endpoint: "Endpoint and XDR",
        data: "Data protection and SIEM",
        network: "Zero trust, network and edge",
        identity: "Identity and certificates",
        validation: "Security validation",
        awareness: "Awareness training",
        cloud: "Cloud",
      },
    },
    certs: {
      title: "{n} certifications from {m} issuers",
      hint: "Grouped by issuer. Click a card to open the full certificate in a new tab.",
      helixLabel: "Certifications",
      open: "Open certificate",
    },
    contact: {
      label: "Contact",
      headline: ["Let’s ", "talk.", ""],
      cv: "CV (PDF, English)",
      cvOther: "CV (PDF, Thai)",
      cvOtherHref: "/cv/Panupong-Nijjaboon-CV-TH.pdf",
    },
    footer: { note: "Demos use invented data. Third-party logos belong to their owners." },
    project: {
      allWork: "All work",
      why: "Why it exists",
      what: "What it does",
      decisions: "Design decisions",
      role: "My role",
      screens: "Screens",
      stack: "Stack",
      next: "Next project",
      sourceLabel: "Source code",
      sourceValue: "Private repository. Code walkthrough on request.",
      videoHeading: "Walkthrough",
    },
    notFound: {
      code: "404",
      title: ["Not ", "found.", ""],
      text: "That page does not exist. Try the work or the home page.",
      back: "Back to home",
    },
  },
  profile: {
    summary:
      "System engineer who designs and builds security software end to end, as the only developer: the interface, the API, the data stores and the servers. My systems cover security operations (TENIX One), log storage with tamper evidence (TENIX DeepSpace), project and billing tracking (Project Hub), a screenshot tool (TENIX FullSnap) and a passive reconnaissance tool (10CYBER Recon). Before that I worked in SOC monitoring, data loss prevention and IT support. I hold 18 security and red-team certifications.",
    education: {
      degree: "Bachelor’s degree, Computer Engineering Technology",
      school: "Rajamangala University of Technology Krungthep",
      years: "2018 – 2022",
    },
    roles: [
      {
        title: "System Engineer",
        company: "TEN FORWARD CO., LTD.",
        place: "Bangkok",
        period: "Mar 2025 – Present",
        current: true,
        intro:
          "I design, build and run the company’s in-house security and operations software. I built each system below on my own, from the first design to deployment, so the work spans the interface, the API, the data stores and the servers.",
        projectEntries: [
          {
            slug: "tenix-one",
            name: "TENIX One",
            line: "Multi-tenant security operations platform",
            points: [
              "Built the interface in Next.js and TypeScript and the API in Express, with three permission levels (Super Admin, Staff, Intern), an audit log and read-only per-tenant API tokens.",
              "Chose and modelled the data stores: PostgreSQL for users, tenants and settings; ClickHouse for high-volume logs.",
              "Integrated CrowdStrike Falcon, Cloudflare, Microsoft Graph, TP-Link Omada and LINE. Deploy and operate it behind nginx and pm2.",
              "About 66,000 lines of TypeScript in 57 commits, 9 June – 15 October 2026.",
            ],
          },
          {
            slug: "tenix-deepspace",
            name: "TENIX DeepSpace",
            line: "Log data lake that runs inside the customer’s own network",
            points: [
              "Designed the data path: intake, buffer, three independent consumers and storage tiers, plus a separate evidence path that keeps writing if search fails.",
              "Wrote the backend services (Python, FastAPI), the parser design, the spec-driven connector engine and the Next.js console.",
              "Built the evidence vault (hourly blocks chained with sha256), two-step sign-in, the installer, release signing and console-driven updates.",
              "Measured on one development dataset: hot tier 15.8× and evidence vault 25.6× smaller than raw.",
            ],
          },
          {
            slug: "project-hub",
            name: "Project Hub",
            line: "Contracts, warranty and billing tracker for a system-integrator business",
            points: [
              "Designed the data model and REST API (Express, MongoDB, Redis) and built every screen in React and TypeScript.",
              "Wrote the automation: a nightly expiry job, LINE summary reminders and a read-only Integration API, with tests.",
              "Handled authentication, rate limiting, hashed API keys and webhook signature checks. Deploy it on PM2 and nginx.",
              "About 14,700 lines in the backend and 32,000 in the frontend.",
            ],
          },
          {
            slug: "tenix-fullsnap",
            name: "TENIX FullSnap",
            line: "Chrome extension for annotated, shareable screenshots",
            points: [
              "Built the extension: full-page capture, numbered steps, arrows, text, blur for sensitive values, export to PNG, JPG or PDF with A4 splitting.",
              "Built its access-control module inside TENIX One: email OTP sign-in, department groups and a list of signed-in devices.",
            ],
          },
        ],
        dutiesHeading: "Also in this role",
        points: [
          { label: "Log collection", text: "Configure and run CrowdStrike LogScale as a log collector for security data." },
          {
            label: "Environments",
            text: "Look after virtual machines on VMware ESXi and containerised services on Docker, with MinIO and PostgreSQL where the systems need them.",
          },
        ],
      },
      {
        title: "Cybersecurity Analyst",
        company: "Cybertron Company Limited",
        place: "Bangkok",
        period: "Aug 2024 – Feb 2025",
        points: [
          { label: "Incident monitoring", text: "Monitored and triaged security incidents across several client environments for timely detection and response." },
          { label: "Threat analysis", text: "Analysed alerts, indicators and attack behaviour to judge severity and decide containment actions." },
          { label: "Prioritisation and escalation", text: "Prioritised intrusions by business impact and escalated critical threats to response teams within SLA timelines." },
          { label: "Reporting", text: "Wrote daily incident summaries and management-ready reports, and compiled trend statistics on suspicious activity." },
          { label: "Client advisory", text: "Gave practical recommendations and technical guidance to reduce recurring risks, and kept SOC work within incident-response procedures, ticket workflows and contractual SLAs." },
          { label: "Threat research", text: "Researched emerging attack vectors and adversary techniques to improve detection and response readiness." },
        ],
      },
      {
        title: "Data Loss Prevention (DLP) Analyst",
        company: "Metro Systems Corporation (at PTT Digital)",
        place: "Bangkok",
        period: "Aug 2023 – Jul 2024",
        points: [
          { text: "Monitored system incidents 24/7 with Forcepoint DLP and Boldon James." },
          { text: "Notified end users and the right teams about data breaches, following the set procedure." },
          { text: "Produced DLP incident reports and monthly summaries from the monitoring data." },
          { text: "Distributed and maintained DLP agents for end users and coordinated Boldon James agent deployment to endpoints." },
        ],
      },
      {
        title: "IT Support (outsource)",
        company: "Acacia I.T. (at Krungthai Bank HQ)",
        place: "Bangkok",
        period: "Jan 2022 – Dec 2022",
        points: [
          { text: "IT support for banking systems and terminal hardware at the bank’s headquarters." },
          { text: "Resolved complex network connectivity problems (VPN) for bank staff in a secure environment." },
        ],
      },
    ],
  },
  projects: {
    "tenix-one": {
      category: "Security operations",
      tagline: "One screen for alerts, leaked accounts, WAF and infrastructure health.",
      summary:
        "A multi-tenant security operations platform. It pulls alerts from endpoint, SaaS, network and identity tools into one console so analysts can triage, decide and respond without switching between consoles.",
      problem:
        "Security teams that look after several organisations juggle many consoles, and customer data and permissions easily get mixed. TENIX One puts alerts, account leaks, WAF and system status in one place, keeps each tenant separate and records who did what.",
      coverAlt: "TENIX One dashboard with alert counts, a severity chart and the most affected hosts",
      shotAlts: ["TENIX One dashboard", "TENIX One alert list", "TENIX One SOC wall"],
      demoLabel: "Open the interactive demo",
      extraLabel: "System information (Thai)",
      demoNote:
        "The demo runs entirely in your browser on invented data (640 alerts, 6 tenants, 22 hosts). Nothing is connected to a real system. The sign-in page fills in demo credentials for you.",
      capabilities: [
        { title: "Alerts", text: "Filter, search and sort, bulk acknowledge or close, and a four-tab detail drawer: details, timeline, raw JSON log and team notes." },
        { title: "Email monitoring", text: "Leaked accounts per customer folder, password reveal that is always logged, owner notification, forced password change, look-alike domains and A4 reports." },
        { title: "SOC wall", text: "A full-screen live view for the operations room with a minimum-severity filter." },
        { title: "Web defacement", text: "Compares a page with a stored baseline, shows line differences and four status levels, and lets you set a new baseline." },
        { title: "Cloudflare WAF", text: "Requests, blocks, countries, rules, zone security score with advice, and blocked IP lists." },
        { title: "System health and network", text: "Host and agent status, resource graphs, a restricted terminal that logs every command, device discovery, port scans and a network map." },
        { title: "Uptime pulse", text: "HTTPS or light-agent service checks with their own incident history and alert settings, kept apart from security alerts." },
        { title: "Tenants, users and tokens", text: "Three roles (Super Admin, Staff, Intern), role-based capabilities, read-only per-tenant API tokens shown once, and an audit log." },
      ],
      decisions: [
        "Transactional data (users, tenants, settings) lives in PostgreSQL; high-volume logs live in ClickHouse.",
        "Permissions are enforced in the API on every route that changes data. Hiding a button in the UI is not treated as protection.",
        "Customer tokens are read-only and bound to one tenant. Leaked passwords are not stored, every reveal is logged, and connection secrets are encrypted on the server.",
        "Subsystems keep their own scope: uptime alerts are configured separately from security alerts so settings never mix.",
      ],
      role: [
        "Worked alone: no other developer. I designed and built the interface in Next.js and TypeScript, responsive with light and dark themes.",
        "Built the API and business logic in Express and TypeScript, with role-based permissions and audit logging.",
        "Chose the data stores and modelled the data.",
        "Wrote the integrations with CrowdStrike Falcon, Cloudflare, Microsoft Graph, TP-Link Omada and LINE.",
        "Deploy and operate it on a server behind nginx and pm2.",
      ],
      factLabels: ["lines of TypeScript", "commits, 9 Jun – 15 Oct 2026", "permission levels", "two-step sign-in"],
    },
    "tenix-deepspace": {
      category: "Log data lake",
      tagline: "Collect, store and search security logs, and prove the originals were never altered.",
      summary:
        "An appliance that runs inside the customer’s own network. It receives logs from many sources, keeps the original bytes under a hash chain, and serves fast search over recent data. Nothing leaves the customer’s network.",
      problem:
        "Organisations need logs they can search quickly and defend later. DeepSpace keeps a fast hot tier for search, a compressed cold tier for retention and an evidence vault that lets you show what was received and that it was not changed.",
      coverAlt: "TENIX DeepSpace pipeline view from log sources through parsing to storage",
      shotAlts: ["Pipeline diagram", "Overview dashboard with ingest rate and recent events"],
      demoLabel: "Open the interactive demo",
      demoNote:
        "The demo is the real console interface with its API answered by a simulation in your browser. Its data comes from running the system’s own parsers and report builders over invented logs. No real logs, customers or hosts.",
      capabilities: [
        { title: "Ingest from any direction", text: "Syslog over TCP and UDP, HTTP ingest with API keys, scheduled vendor API pulls and vendor event streams share one buffered path, so a slow destination does not drop events." },
        { title: "Parsers by specificity", text: "A log goes to the most specific parser that recognises it and is also kept as raw text, so nothing is lost when no parser applies." },
        { title: "Readable headlines", text: "The console builds each event’s headline from the shape of the record, so a product it has never seen is readable on its first event." },
        { title: "Connectors as specs", text: "A new vendor API is a short YAML spec: request, authentication, paging, event location and field mapping. Secrets are sealed at rest and outbound calls cannot reach internal addresses." },
        { title: "Evidence vault", text: "Original bytes are written before parsing, in hourly blocks, each hashed with the previous block’s hash (sha256)." },
        { title: "Search", text: "field=value queries with a command pipeline (stats, top, timechart), saved searches, a field sidebar and export." },
        { title: "Operations", text: "Roles (Administrator, Analyst, Viewer, Auditor), quotas, retention and legal holds, a hash-chained audit log, signed releases and console-driven updates. English and Thai." },
      ],
      decisions: [
        "Separate the evidence path from the search path: if the search database fails, the evidence archive keeps writing. This was the first design constraint.",
        "Buffer first, then fan out: three independent consumers (index, cold export, evidence) each read every event through their own consumer group and can replay what they missed.",
        "Raw bytes are the source of truth. Parsing can improve over time; the originals stay.",
        "Configuration over code for integrations, and measure instead of assert for compression figures.",
      ],
      role: [
        "Worked alone: no other developer. I designed the data path: intake, buffer, consumers and storage tiers, plus the separate evidence path.",
        "Built the backend services and the Next.js console, including search, sources, roles, quotas and audit log.",
        "Wrote the parser design, the shape-based headline logic and the spec-driven connector engine.",
        "Designed the sign-in model (password plus authenticator or email code) and the installer, release signing and update tooling.",
      ],
      factLabels: [
        "hot tier smaller than raw, measured on one development dataset",
        "evidence vault smaller than raw, same dataset",
        "parser modules",
        "console roles",
      ],
    },
    "project-hub": {
      category: "Project and billing",
      tagline: "Contracts, deadlines, warranty and billing milestones in one place, with reminders.",
      summary:
        "An internal web app for a system-integrator business. It gathers projects from several business units, from contract and delivery dates to warranty periods, billing instalments and maintenance cycles, and warns before dates arrive.",
      problem:
        "Project data was scattered across spreadsheets, warranty dates were tracked by memory, and expired contracts were updated by hand and missed. Project Hub centralises the data and lets the system do the reminding.",
      coverAlt: "Project Hub dashboard with status counts, a status by signing-year matrix and company panels",
      shotAlts: ["Dashboard overview", "Project calendar"],
      demoLabel: "Open the interactive demo",
      demoNote:
        "The demo uses the same interface code as the real system with a simulated data layer: 38 invented projects, 3 companies and 5 users, saved in your browser. No messages are sent. The sign-in page is pre-filled and accepts any credentials.",
      capabilities: [
        { title: "Projects", text: "Two levels, categories and sub-projects, with contract value, signing date, delivery, warranty, SLA, contacts, billing instalments and maintenance cycles per company." },
        { title: "Dashboard and calendar", text: "Status mix, a status by signing-year matrix you can click through, and a calendar that shows Thai public holidays automatically." },
        { title: "Automatic expiry", text: "A nightly cron job marks projects as expired once the warranty end date has passed and records it in the activity log." },
        { title: "LINE reminders", text: "One summary card per project per day, with configurable lead time, send time and event types." },
        { title: "Access and audit", text: "Admin, user and read-only roles with per-module view, edit and delete rights; an activity log showing old and new values for 30 days; and a 30-day recycle bin." },
        { title: "Integration API", text: "Read-only keys for other systems, scoped by company and field, rate-limited, HTTPS only, with only key hashes stored." },
      ],
      decisions: [
        "The SPA talks to a REST API through nginx on a single /api path, so either side can be replaced without touching the other.",
        "A stateless API on a PM2 cluster, with Redis caching that is cleared on every change so data never goes stale.",
        "Scheduled jobs live outside the web server and are idempotent: no duplicate messages, no overwriting manual edits, and a dry-run mode.",
        "Business rules (which projects to expire, how to build a message) are pure functions with automated tests. Demo mode is a build-time switch, so the production bundle contains no demo code.",
      ],
      role: [
        "Worked alone: no other developer. I designed and built the data model, the REST API, per-module permissions and every screen in React and TypeScript.",
        "Wrote the automation: expiry checker, LINE summary sender and the Integration API, with tests.",
        "Handled security: authentication, rate limiting, hashed keys and webhook signature checks.",
        "Deploy and operate it on PM2 and nginx, and built the demo mode used on this page.",
      ],
      factLabels: [
        "lines in the backend (77 TypeScript files)",
        "lines in the frontend",
        "user roles",
        "days of activity log and recycle bin retention",
      ],
    },
    "tenix-fullsnap": {
      category: "Browser extension",
      tagline: "Capture a whole web page, annotate it, hide sensitive data and export as PNG, JPG or PDF.",
      summary:
        "A Chrome extension for writing how-to guides and reporting problems. One click captures a full page, then you add numbered steps, arrows and text, blur sensitive details and export. Access for staff is managed from TENIX One.",
      problem:
        "Support and documentation work needs screenshots that are annotated and safe to share. FullSnap keeps that in one tool, and keeps control of who can use it.",
      coverAlt: "TENIX FullSnap popup over a router settings page",
      shotAlts: [
        "Capture a full page in one click",
        "Numbered steps, boxes, arrows and text",
        "Move text or logos and erase backgrounds",
        "Blur sensitive values such as IP addresses and passwords",
        "Export as PNG, JPG or PDF with automatic A4 splitting",
      ],
      demoNote:
        "These are the store-listing screenshots. The captured page is a sample router page. The extension is distributed to staff, so there is no public demo.",
      capabilities: [
        { title: "Capture", text: "Full page in one click (Alt+Shift+S) or only the visible part (Alt+Shift+V)." },
        { title: "Annotate", text: "Numbered steps, boxes, arrows and text; move text or logos and erase backgrounds." },
        { title: "Protect", text: "Blur IP addresses, passwords and emails before sharing." },
        { title: "Export", text: "PNG, JPG or PDF, with automatic A4 page splitting." },
        { title: "Access control", text: "The TENIX One admin console controls who may use it: email OTP sign-in, department groups and a list of signed-in devices." },
      ],
      decisions: [
        "Sensitive-data blurring is a first-class tool in the editor rather than an afterthought.",
        "Access is managed centrally from the admin console instead of inside the extension.",
      ],
      role: [
        "Worked alone: no other developer. I designed and built the extension and its capture, annotation and export tools.",
        "Built the access-control module for it inside TENIX One (email OTP, department groups, signed-in devices).",
      ],
      factLabels: ["store-listing screens", "export formats"],
    },
    "recon-tool": {
      category: "Passive OSINT",
      tagline: "Passive-first reconnaissance: map what a domain exposes from public sources.",
      summary:
        "A command-line tool that builds an exposure report for a domain, mostly from public sources: certificate transparency logs, DNS, RDAP and internet-scan indexes. For domains you own or are authorised to assess.",
      problem:
        "Pre-sales and assessment work starts with knowing what a domain exposes. Doing it passively keeps it legal and quiet, and gives a repeatable report.",
      coverAlt: "List of the ten reconnaissance modules and their public data sources",
      shotAlts: ["The ten modules and their sources"],
      demoNote:
        "No public demo: the tool is meant to be run by the person who is authorised to assess a domain. The image lists its modules as documented in its README.",
      capabilities: [
        { title: "Registration and DNS", text: "RDAP registration data and DNS checks, including SPF, DMARC and DKIM hints." },
        { title: "Certificates and subdomains", text: "Certificate transparency (crt.sh) and subdomain enumeration (crt.sh and HackerTarget)." },
        { title: "Live endpoints and TLS", text: "A concurrent HTTP(S) prober and a TLS certificate check." },
        { title: "WAF detection", text: "Optional wafw00f integration, skipped gracefully if it is not installed." },
        { title: "AD exposure heuristics", text: "Domain-controller exposure hints from DNS SRV records." },
        { title: "Internet-wide intelligence", text: "Optional Shodan, Censys and Netlas lookups with your own API keys." },
        { title: "Report", text: "All modules aggregated into one Markdown-flavoured exposure report." },
      ],
      decisions: [
        "Passive-first: most modules read public third-party data and send nothing to the target. The live endpoint prober and the TLS check do contact the target’s public services, so the tool is for domains you own or are authorised to assess.",
        "API keys come from environment variables and are kept out of the repository.",
      ],
      role: ["Worked alone: sole developer. I designed and wrote the whole tool and its README."],
      factLabels: ["modules", "optional intelligence sources"],
    },
  },
};

export default en;
