export type Locale = "en" | "th";
export const locales: Locale[] = ["en", "th"];
export const defaultLocale: Locale = "en";
export const isLocale = (v: string): v is Locale => (locales as string[]).includes(v);

export type ProjectSlug = "tenix-one" | "tenix-deepspace" | "project-hub" | "tenix-fullsnap" | "recon-tool";

/** [before, italic, after]: the middle part is set in italics. */
export type Head = [string, string, string];

export type ProjectText = {
  category: string;
  tagline: string;
  summary: string;
  problem: string;
  coverAlt: string;
  shotAlts: string[];
  demoLabel?: string;
  extraLabel?: string;
  demoNote: string;
  capabilities: { title: string; text: string }[];
  decisions: string[];
  role: string[];
  factLabels: string[];
};

export type Role = {
  title: string;
  company: string;
  place: string;
  period: string;
  current?: boolean;
  intro?: string;
  projectEntries?: { slug: ProjectSlug; name: string; line: string; points: string[] }[];
  dutiesHeading?: string;
  points: { label?: string; text: string }[];
};

export type Content = {
  meta: { title: string; description: string; role: string; location: string };
  ui: {
    nav: { work: string; experience: string; stack: string; certifications: string; contact: string };
    emailMe: string;
    portfolio: string;
    skip: string;
    menuOpen: string;
    menuClose: string;
    switchLabel: string;
    switchShort: string;
    pauseBg: string;
    playBg: string;
    scrollTop: string;
    scrollBottom: string;
    hero: { tagline: string; ctaWork: string; ctaDemo: string; scroll: string };
    intro: string[];
    facts: string[];
    work: { title: string; blurb: string; demoDetails: string; details: string; helixLabel: string };
    source: {
      label: string;
      title: Head;
      body: string;
      cards: { title: string; text: string }[];
      github: string;
    };
    marquee: string;
    about: { label: string; headline: Head; now: string; education: string; portraitAlt: string; videoLabel: string };
    experience: {
      label: string;
      headline: Head;
      current: string;
      builtHeading: string;
      viewProject: string;
      otherHeading: string;
      otherText: string;
    };
    stack: {
      label: string;
      headline: Head;
      platformsLabel: string;
      platformsNote: string;
      techLabel: string;
      techNote: string;
      categories: Record<string, string>;
      platformGroups: Record<string, string>;
    };
    certs: { title: string; hint: string; helixLabel: string; open: string };
    contact: { label: string; headline: Head; cv: string; cvOther: string; cvOtherHref: string };
    footer: { note: string };
    project: {
      allWork: string;
      why: string;
      what: string;
      decisions: string;
      role: string;
      screens: string;
      stack: string;
      next: string;
      sourceLabel: string;
      sourceValue: string;
      videoHeading: string;
    };
    notFound: { code: string; title: Head; text: string; back: string };
  };
  profile: {
    summary: string;
    education: { degree: string; school: string; years: string };
    roles: Role[];
  };
  projects: Record<ProjectSlug, ProjectText>;
};
