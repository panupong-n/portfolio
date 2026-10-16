"""Render scripts/cv-out/cv-*.html to public/cv/Panupong-Nijjaboon-CV-<LANG>.pdf (needs playwright + chromium)."""
import asyncio, pathlib
from playwright.async_api import async_playwright
root = pathlib.Path(__file__).resolve().parent.parent
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(args=["--allow-file-access-from-files"])
        for lang in ("en", "th"):
            pg = await b.new_page()
            await pg.goto((root / f"scripts/cv-out/cv-{lang}.html").as_uri(), wait_until="load")
            await pg.evaluate("document.fonts.ready")
            await pg.wait_for_timeout(500)
            dest = root / f"public/cv/Panupong-Nijjaboon-CV-{lang.upper()}.pdf"
            await pg.pdf(path=str(dest), width="210mm", height="297mm", print_background=True, prefer_css_page_size=True)
            print("wrote", dest)
        await b.close()
asyncio.run(main())
