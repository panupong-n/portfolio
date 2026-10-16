"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Languages, Menu, X } from "lucide-react";
import { contact, site } from "@/lib/profile";
import type { Content, Locale } from "@/lib/content";

export function Header({ lang, ui }: { lang: Locale; ui: Content["ui"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const pathname = usePathname();
  const other: Locale = lang === "en" ? "th" : "en";
  const otherPath = pathname.replace(/^\/(en|th)(?=\/|$)/, `/${other}`);

  const links = [
    { href: `/${lang}#work`, label: ui.nav.work },
    { href: `/${lang}#experience`, label: ui.nav.experience },
    { href: `/${lang}#stack`, label: ui.nav.stack },
    { href: `/${lang}#certifications`, label: ui.nav.certifications },
    { href: `/${lang}#contact`, label: ui.nav.contact },
  ];

  useEffect(() => {
    // The header turns light-on-dark while it sits over a [data-dark-zone] (hero and intro).
    const on = () => {
      setScrolled(window.scrollY > 24);
      const mid = 36;
      setDark(
        Array.from(document.querySelectorAll("[data-dark-zone]")).some((z) => {
          const r = z.getBoundingClientRect();
          return r.top <= mid && r.bottom >= mid && !z.querySelector("[data-lit]");
        }),
      );
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    window.addEventListener("lit-change", on);
    return () => {
      window.removeEventListener("lit-change", on);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /** Remember the choice, then reload in the other language keeping the #section. */
  const switchLang = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      document.cookie = `lang=${other}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      /* cookies blocked: the URL still carries the language */
    }
    window.location.assign(otherPath + window.location.hash);
  };

  const solid = scrolled || open;
  const onDark = dark && !open;
  const fg = onDark ? "text-white" : "text-ink";
  const ring = onDark ? "border-white/35" : "border-ink/30";
  const hov = onDark ? "hover:bg-white/15" : "hover:bg-sand";

  const switcher = (cls: string) => (
    <a
      href={otherPath}
      hrefLang={other}
      lang={other}
      onClick={switchLang}
      aria-label={ui.switchLabel}
      className={cls}
    >
      <Languages aria-hidden className="size-4" />
      <span>{ui.switchShort}</span>
    </a>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? onDark
            ? "border-b border-white/10 bg-[#04060c]/70 backdrop-blur-md"
            : "border-b border-line bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
      style={{ height: "var(--header-h)" }}
    >
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <Link href={`/${lang}`} className={`flex items-baseline gap-2 ${fg}`} onClick={() => setOpen(false)}>
          <span className="serif text-2xl leading-none">{site.name}</span>
          <span className={`mono-label hidden sm:inline ${onDark ? "text-white/60" : "text-muted"}`}>{ui.portfolio}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`mono-label u-link py-2 ${fg}`}>
              {l.label}
            </Link>
          ))}
          {switcher(`mono-label inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 transition-colors ${ring} ${fg} ${hov}`)}
          <a
            href={`mailto:${contact.email}`}
            className={`mono-label rounded-full px-4 py-2.5 transition-colors ${onDark ? "bg-white text-[#05070d] hover:bg-[#6db4ff]" : "bg-ink text-paper hover:bg-signal-deep"}`}
          >
            {ui.emailMe}
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          {switcher(`mono-label inline-flex size-11 min-w-11 items-center justify-center gap-1 rounded-full border px-3 ${ring} ${fg}`)}
          <button
            type="button"
            className={`inline-flex size-11 items-center justify-center rounded-full border ${ring} ${fg}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? ui.menuClose : ui.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-full border-b border-line bg-paper px-5 pb-6 pt-2 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="serif border-b border-line py-3 text-3xl"
              >
                {l.label}
              </Link>
            ))}
            <a href={`mailto:${contact.email}`} className="mono-label mt-5 rounded-full bg-ink px-5 py-3.5 text-center text-paper">
              {ui.emailMe}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
