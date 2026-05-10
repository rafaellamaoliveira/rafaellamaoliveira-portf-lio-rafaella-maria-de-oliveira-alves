import { useState, useMemo } from 'react';

export type NeumorphismShape = 'flat' | 'concave' | 'convex' | 'inset';

export interface NeumorphismState {
  baseColor: string;
  size: number;
  distance: number;
  intensity: number;
  blur: number;
  borderRadius: number;
  shape: NeumorphismShape;
}

export function useNeumorphism() {
  const [state, setState] = useState<NeumorphismState>({
    baseColor: '#45150d',
    size: 300,
    distance: 20,
    intensity: 0.15,
    blur: 60,
    borderRadius: 50,
    shape: 'flat',
  });

  const updateState = (updates: Partial<NeumorphismState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const getLighterColor = (color: string, intensity: number) => {
    // Basic hex manipulation for the demo. In a real app, use a lib like 'colord' or chroma-js
    // For now, let's use a simpler mapping or keep the logic hardcoded for this specific base color
    // as per the requirement of "SoftGrid.io" style.
    // However, to make it truly interactive:
    return lightenDarkenColor(color, Math.round(intensity * 100));
  };

  const getDarkerColor = (color: string, intensity: number) => {
    return lightenDarkenColor(color, -Math.round(intensity * 100));
  };

  const shadowStyles = useMemo(() => {
    const { baseColor, distance, blur, intensity, borderRadius, shape } = state;
    
    // Improved lighting calculation for a more realistic "molded" look
    const amt = Math.round(intensity * 100);
    const darkShadow = lightenDarkenColor(baseColor, -amt);
    const lightShadow = lightenDarkenColor(baseColor, amt);

    const baseStyles = {
      borderRadius: `${borderRadius}px`,
      backgroundColor: baseColor,
      transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    };

    switch (shape) {
      case 'inset':
        return {
          ...baseStyles,
          boxShadow: `inset ${distance}px ${distance}px ${blur}px ${darkShadow}, inset -${distance}px -${distance}px ${blur}px ${lightShadow}`,
        };
      case 'concave':
        return {
          ...baseStyles,
          boxShadow: `${distance}px ${distance}px ${blur}px ${darkShadow}, -${distance}px -${distance}px ${blur}px ${lightShadow}`,
          background: `linear-gradient(145deg, ${darkShadow}, ${lightShadow})`,
        };
      case 'convex':
        return {
          ...baseStyles,
          boxShadow: `${distance}px ${distance}px ${blur}px ${darkShadow}, -${distance}px -${distance}px ${blur}px ${lightShadow}`,
          background: `linear-gradient(145deg, ${lightShadow}, ${darkShadow})`,
        };
      default: // Elevated (flat)
        return {
          ...baseStyles,
          boxShadow: `${distance}px ${distance}px ${blur}px ${darkShadow}, -${distance}px -${distance}px ${blur}px ${lightShadow}`,
        };
    }
  }, [state]);

  const cssCode = useMemo(() => {
    const { distance, blur, shape, baseColor, borderRadius, intensity } = state;
    const amt = Math.round(intensity * 100);
    const darkShadow = lightenDarkenColor(baseColor, -amt);
    const lightShadow = lightenDarkenColor(baseColor, amt);

    let backgroundCode = `background: ${baseColor};`;
    if (shape === 'concave') backgroundCode = `background: linear-gradient(145deg, ${darkShadow}, ${lightShadow});`;
    if (shape === 'convex') backgroundCode = `background: linear-gradient(145deg, ${lightShadow}, ${darkShadow});`;

    const shadowCode = shape === 'inset' 
      ? `box-shadow: inset ${distance}px ${distance}px ${blur}px ${darkShadow},\n            inset -${distance}px -${distance}px ${blur}px ${lightShadow};`
      : `box-shadow: ${distance}px ${distance}px ${blur}px ${darkShadow},\n            -${distance}px -${distance}px ${blur}px ${lightShadow};`;

    return `border-radius: ${borderRadius}px;\n${backgroundCode}\n${shadowCode}`;
  }, [state]);

  return {
    state,
    updateState,
    shadowStyles,
    cssCode,
  };
}

// Utility to lighten/darken hex colors
function lightenDarkenColor(col: string, amt: number) {
  let usePound = false;
  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }
  const num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;
  let b = ((num >> 8) & 0x00FF) + amt;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;
  let g = (num & 0x0000FF) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
}
