import React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { getNeumorphicShadows, getTextColor } from "@/src/lib/neumorphism-utils";

interface ControlPanelProps {
  config: {
    color: string;
    size: number;
    radius: number;
    distance: number;
    intensity: number;
    blur: number;
    shape: "flat" | "concave" | "convex" | "pressed";
  };
  onChange: (newConfig: any) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ config, onChange }) => {
  const updateConfig = (key: string, value: any) => {
    onChange({ ...config, [key]: value });
  };

  const textColor = getTextColor(config.color);
  const outerShadow = getNeumorphicShadows(config.color, 4, 8, config.intensity);
  const innerShadow = getNeumorphicShadows(config.color, 2, 4, config.intensity, true);

  return (
    <div className="space-y-8" style={{ color: textColor }}>
      {/* Shape Selector */}
      <div className="space-y-3">
        <Label className="text-xs font-semibold uppercase tracking-wider opacity-50">Formato</Label>
        <Tabs 
          value={config.shape} 
          onValueChange={(v) => updateConfig("shape", v)}
          className="w-full"
        >
          <TabsList 
            className="grid grid-cols-4 p-1 h-12 rounded-xl transition-all"
            style={{ backgroundColor: config.color, boxShadow: innerShadow }}
          >
            {["flat", "concave", "convex", "pressed"].map((s) => (
              <TabsTrigger 
                key={s}
                value={s} 
                className="rounded-lg data-[state=active]:shadow-none transition-all"
                style={{ 
                  backgroundColor: config.shape === s ? config.color : "transparent",
                  boxShadow: config.shape === s ? outerShadow : "none"
                }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Separator className="bg-black/5" />

      {/* Sliders */}
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <Label className="text-xs font-semibold uppercase tracking-wider opacity-50">Tamanho</Label>
            <span className="text-xs font-mono">{config.size}px</span>
          </div>
          <Slider 
            value={[config.size]} 
            min={50} 
            max={400} 
            step={1} 
            onValueChange={(v: any) => updateConfig("size", Array.isArray(v) ? v[0] : v)}
            className="[&_[data-slot=slider-track]]:shadow-[inset_2px_2px_5px_#bebebe,inset_-2px_-2px_5px_#ffffff] [&_[data-slot=slider-track]]:bg-transparent [&_[data-slot=slider-thumb]]:bg-transparent [&_[data-slot=slider-thumb]]:border-none [&_[data-slot=slider-indicator]]:bg-black/10"
            style={{ 
              // @ts-ignore
              "--slider-thumb-shadow": outerShadow,
              "--slider-track-shadow": innerShadow
            }}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <Label className="text-xs font-semibold uppercase tracking-wider opacity-50">Raio</Label>
            <span className="text-xs font-mono">{config.radius}px</span>
          </div>
          <Slider 
            value={[config.radius]} 
            min={0} 
            max={200} 
            step={1} 
            onValueChange={(v: any) => updateConfig("radius", Array.isArray(v) ? v[0] : v)}
            className="[&_[data-slot=slider-track]]:shadow-[inset_2px_2px_5px_#bebebe,inset_-2px_-2px_5px_#ffffff] [&_[data-slot=slider-track]]:bg-transparent [&_[data-slot=slider-thumb]]:bg-transparent [&_[data-slot=slider-thumb]]:border-none [&_[data-slot=slider-indicator]]:bg-black/10"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <Label className="text-xs font-semibold uppercase tracking-wider opacity-50">Distância</Label>
            <span className="text-xs font-mono">{config.distance}px</span>
          </div>
          <Slider 
            value={[config.distance]} 
            min={5} 
            max={50} 
            step={1} 
            onValueChange={(v: any) => updateConfig("distance", Array.isArray(v) ? v[0] : v)}
            className="[&_[data-slot=slider-track]]:shadow-[inset_2px_2px_5px_#bebebe,inset_-2px_-2px_5px_#ffffff] [&_[data-slot=slider-track]]:bg-transparent [&_[data-slot=slider-thumb]]:bg-transparent [&_[data-slot=slider-thumb]]:border-none [&_[data-slot=slider-indicator]]:bg-black/10"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <Label className="text-xs font-semibold uppercase tracking-wider opacity-50">Intensidade</Label>
            <span className="text-xs font-mono">{config.intensity}</span>
          </div>
          <Slider 
            value={[config.intensity]} 
            min={10} 
            max={100} 
            step={1} 
            onValueChange={(v: any) => updateConfig("intensity", Array.isArray(v) ? v[0] : v)}
            className="[&_[data-slot=slider-track]]:shadow-[inset_2px_2px_5px_#bebebe,inset_-2px_-2px_5px_#ffffff] [&_[data-slot=slider-track]]:bg-transparent [&_[data-slot=slider-thumb]]:bg-transparent [&_[data-slot=slider-thumb]]:border-none [&_[data-slot=slider-indicator]]:bg-black/10"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <Label className="text-xs font-semibold uppercase tracking-wider opacity-50">Desfoque (Blur)</Label>
            <span className="text-xs font-mono">{config.blur}px</span>
          </div>
          <Slider 
            value={[config.blur]} 
            min={0} 
            max={100} 
            step={1} 
            onValueChange={(v: any) => updateConfig("blur", Array.isArray(v) ? v[0] : v)}
            className="[&_[data-slot=slider-track]]:shadow-[inset_2px_2px_5px_#bebebe,inset_-2px_-2px_5px_#ffffff] [&_[data-slot=slider-track]]:bg-transparent [&_[data-slot=slider-thumb]]:bg-transparent [&_[data-slot=slider-thumb]]:border-none [&_[data-slot=slider-indicator]]:bg-black/10"
          />
        </div>
      </div>
    </div>
  );
};
