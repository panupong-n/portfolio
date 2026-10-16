"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const t = {
  en: { code: "404", a: "Not ", b: "found.", text: "That page does not exist. Try the work or the home page.", back: "Back to home" },
  th: { code: "404", a: "ไม่พบ", b: "หน้านี้", text: "ไม่มีหน้านี้ ลองไปที่ผลงานหรือหน้าแรก", back: "กลับหน้าแรก" },
};

export default function NotFound() {
  const lang = usePathname().split("/")[1] === "th" ? "th" : "en";
  const s = t[lang];
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-[1400px] flex-col justify-center px-5 pt-[var(--header-h)] sm:px-8">
      <p className="mono-label text-signal-deep">{s.code}</p>
      <h1 className="t-mega mt-3">
        {s.a}
        <span className="italic">{s.b}</span>
      </h1>
      <p className="t-lead mt-6 max-w-lg">{s.text}</p>
      <Link href={`/${lang}`} className="mono-label mt-8 w-fit rounded-full bg-ink px-6 py-3.5 text-paper">
        {s.back}
      </Link>
    </section>
  );
}
