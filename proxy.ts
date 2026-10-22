import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "th"] as const;
type Loc = (typeof locales)[number];
const isLoc = (v: string | undefined): v is Loc => !!v && (locales as readonly string[]).includes(v);

/**
 * Sends `/` and any path without a language prefix to /en or /th. English is
 * the default; only a language the visitor chose with the switch (cookie) wins.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (isLoc(pathname.split("/")[1])) return NextResponse.next();
  const saved = req.cookies.get("lang")?.value;
  const lang: Loc = isLoc(saved) ? saved : "en";
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // skip Next internals, static folders and anything with a file extension
  matcher: ["/((?!_next|api|img|demos|video|cv|.*\\..*).*)"],
};
