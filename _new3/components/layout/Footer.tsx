import { contact, site } from "@/lib/profile";
import type { Content, Locale } from "@/lib/content";

export function Footer({ lang, ui }: { lang: Locale; ui: Content["ui"] }) {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {lang === "th" ? site.nameTh : site.name}. {ui.footer.note}
        </p>
        <p className="flex gap-5">
          <a className="u-link" href={contact.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="u-link" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="u-link" href={`mailto:${contact.email}`}>
            Email
          </a>
        </p>
      </div>
    </footer>
  );
}
