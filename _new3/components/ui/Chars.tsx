/** Splits a Latin string into inline-block letters that the hero animation can lift one by one. */
export function Chars({ text }: { text: string }) {
  return (
    <span aria-hidden>
      {Array.from(text).map((ch, i) => (
        <span key={i} data-char>
          {ch}
        </span>
      ))}
    </span>
  );
}
