import React from "react";
import { motion } from "motion/react";
import { getNeumorphicShadows, getNeumorphicGradient } from "@/src/lib/neumorphism-utils";

interface PreviewCardProps {
  color: string;
  size: number;
  radius: number;
  distance: number;
  blur: number;
  intensity: number;
  shape: "flat" | "concave" | "convex" | "pressed";
}

export const PreviewCard: React.FC<PreviewCardProps> = ({
  color,
  size,
  radius,
  distance,
  blur,
  intensity,
  shape,
}) => {
  const isInset = shape === "pressed";
  const shadow = getNeumorphicShadows(color, distance, blur, intensity, isInset);
  
  const background = (shape === "concave" || shape === "convex") 
    ? getNeumorphicGradient(color, shape) 
    : color;

  return (
    <motion.div
      layout
      className="relative flex items-center justify-center"
      initial={false}
      animate={{
        width: size,
        height: size,
        borderRadius: radius,
        boxShadow: shadow,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        background: background,
      }}
    >
      <div className="text-white/20 font-bold text-xl select-none uppercase tracking-widest">
        Preview
      </div>
    </motion.div>
  );
};

