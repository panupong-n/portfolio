/**
 * Colour field for the WebGL background. Mostly warm paper, with slow drifts of
 * peach, vermilion and sage. The shader maps noise to these seven stops with a
 * bias so that most of the area stays light and text stays readable.
 */
export const shaderPalette = [
  "#f6f2ea",
  "#f6f2ea",
  "#f5e3d4",
  "#f2bc9d",
  "#ea5a30",
  "#c4dcd3",
  "#f6f2ea",
];

/** Static gradient shown with no JS / WebGL, and under the canvas before first frame. */
export const shaderFallbackCss =
  "radial-gradient(60% 70% at 78% 30%, #f2bc9d 0%, rgba(242,188,157,0) 70%), radial-gradient(50% 60% at 15% 85%, #c4dcd3 0%, rgba(196,220,211,0) 70%), #f6f2ea";
