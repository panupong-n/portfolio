import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "th"] as const;
type Loc = (typeof locales)[number];
const isLoc = (v: string | undefined): v is Loc => !!v && (locales as readonly string[]).includes(v);

/** First supported language in Accept-Language (by q value), else English. */
function negotiate(header: string | null): Loc {
  if (!header) return "en";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = Number(params.find((p) => p.trim().startsWith("q="))?.split("=")[1] ?? 1);
      return { lang: tag.toLowerCase().split("-")[0], q: Number.isFinite(q) ? q : 0 };
    })
    .sort((a, b) => b.q - a.q);
  for (const r of ranked) if (isLoc(r.lang)) return r.lang;
  return "en";
}

/**
 * Sends `/` and any path without a language prefix to /en or /th, using the
 * visitor's saved choice (cookie) first and the browser language second.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (isLoc(pathname.split("/")[1])) return NextResponse.next();
  const saved = req.cookies.get("lang")?.value;
  const lang = isLoc(saved) ? saved : negotiate(req.headers.get("accept-language"));
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // skip Next internals, static folders and anything with a file extension
  matcher: ["/((?!_next|api|img|demos|video|cv|.*\\..*).*)"],
};
