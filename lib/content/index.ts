import en from "./en";
import th from "./th";
import type { Content, Locale } from "./types";

export * from "./types";

const dict: Record<Locale, Content> = { en, th };
export const getContent = (l: Locale): Content => dict[l];

/** Replace {n}-style placeholders. */
export const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
