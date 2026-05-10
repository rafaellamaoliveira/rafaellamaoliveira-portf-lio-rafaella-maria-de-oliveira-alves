/**
 * Utilities for Neumorphism color and shadow calculations
 */

export type ColorRGB = { r: number; g: number; b: number };

export const hexToRgb = (hex: string): ColorRGB => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

export const rgbToHex = ({ r, g, b }: ColorRGB): string => {
  const toHex = (c: number) => Math.min(255, Math.max(0, Math.round(c))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const adjustColor = (rgb: ColorRGB, amount: number): ColorRGB => {
  return {
    r: Math.min(255, Math.max(0, rgb.r + amount)),
    g: Math.min(255, Math.max(0, rgb.g + amount)),
    b: Math.min(255, Math.max(0, rgb.b + amount)),
  };
};

export const getNeumorphicShadows = (
  color: string,
  distance: number,
  blur: number,
  intensity: number,
  isInset: boolean = false
) => {
  const rgb = hexToRgb(color);
  
  // Calculate light and dark shades
  const darkShade = rgbToHex(adjustColor(rgb, -intensity));
  const lightShade = rgbToHex(adjustColor(rgb, intensity));

  const insetStr = isInset ? "inset " : "";
  
  return `${insetStr}${distance}px ${distance}px ${blur}px ${darkShade}, ${insetStr}-${distance}px -${distance}px ${blur}px ${lightShade}`;
};

export const getNeumorphicGradient = (color: string, shape: "concave" | "convex") => {
  const rgb = hexToRgb(color);
  const darkShade = rgbToHex(adjustColor(rgb, -10));
  const lightShade = rgbToHex(adjustColor(rgb, 10));

  const angle = shape === "convex" ? 145 : 325;
  return `linear-gradient(${angle}deg, ${darkShade}, ${lightShade})`;
};

export const getTextColor = (bgColor: string): string => {
  const { r, g, b } = hexToRgb(bgColor);
  // Simple luminance check
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#001f3f" : "#ffffff";
};
