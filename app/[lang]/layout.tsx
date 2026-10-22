import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/noto-sans-thai";
import "@fontsource-variable/noto-serif-thai";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/animations/Reveal";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { ScrollButtons } from "@/components/ui/ScrollButtons";
import { getContent, isLocale, locales } from "@/lib/content";
import { site } from "@/lib/profile";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const c = getContent(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: c.meta.title, template: `%s | ${site.name}` },
    description: c.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", th: "/th", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: c.meta.title,
      description: c.meta.description,
      locale: lang === "th" ? "th_TH" : "en_US",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  };
}

export const viewport: Viewport = {
  themeColor: "#f4f0e8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint. Adds a `js` class so the hero entrance can start
 * from a hidden state, and a failsafe class that reveals it if the animation
 * script has not finished (slow network, blocked script). Without JavaScript
 * the class is never added and everything is visible.
 */
const progressiveEnhancement = `
(function(){
  var h=document.documentElement;
  h.classList.add('js');
  setTimeout(function(){h.classList.add('hero-failsafe')},2500);
})();`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: progressiveEnhancement }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="skip-link">
          {c.ui.skip}
        </a>
        <div id="progress" aria-hidden className="progress-bar" />
        <Header lang={lang} ui={c.ui} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} ui={c.ui} />
        <Reveal />
        <SmoothScroll />
        <ScrollButtons labelTop={c.ui.scrollTop} labelBottom={c.ui.scrollBottom} />
        <Analytics />
      </body>
    </html>
  );
}
