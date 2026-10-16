/**
 * Renders a walkthrough video only if the file exists in public/video (see
 * lib/techIcons.videoFor). Drop the file in and rebuild; nothing shows until then.
 */
export function VideoSlot({ src, poster, label }: { src?: string; poster?: string; label: string }) {
  if (!src) return null;
  return (
    <figure data-rv className="video-frame">
      <video src={src} poster={poster} controls playsInline preload="metadata" aria-label={label} />
    </figure>
  );
}
