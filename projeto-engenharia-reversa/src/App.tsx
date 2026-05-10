import React, { useState } from "react";
import { MainLayout } from "./components/layout/MainLayout";
import { Section } from "./components/layout/Section";
import { Footer } from "./components/layout/Footer";
import { HeroTool } from "./components/neumorphism/HeroTool";
import { Definition } from "./components/neumorphism/Definition";
import { Examples } from "./components/neumorphism/Examples";
import { MoreTools } from "./components/neumorphism/MoreTools";
import { getNeumorphicShadows } from "./lib/neumorphism-utils";

export default function App() {
  const [config, setConfig] = useState({
    color: "#610505",
    size: 300,
    radius: 60,
    distance: 15,
    intensity: 15,
    blur: 30,
    shape: "flat" as "flat" | "concave" | "convex" | "pressed",
  });

  const [copied, setCopied] = useState(false);

  const generatedShadow = getNeumorphicShadows(
    config.color,
    config.distance,
    config.blur,
    config.intensity,
    config.shape === "pressed"
  );

  const cssCode = `border-radius: ${config.radius}px;
background: ${config.color};
box-shadow: ${generatedShadow};`;

  const textColor = "#F6F5F7";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MainLayout
      bgColor={config.color}
      textColor={textColor}
      footer={<Footer textColor={textColor} />}
    >
      {/* 1, 2, 3. Hero Section - Interactive Tool */}
      <Section className="pt-12">
        <HeroTool 
          config={config}
          setConfig={setConfig}
          textColor={textColor}
          cssCode={cssCode}
          copied={copied}
          copyToClipboard={copyToClipboard}
        />
      </Section>

      {/* 4. Definition Section */}
      <Section className="bg-black/5">
        <Definition />
      </Section>

      {/* 5. Examples Section */}
      <Section>
        <Examples color={config.color} />
      </Section>

      {/* 6. More Tools Section */}
      <Section className="bg-black/5">
        <MoreTools color={config.color} />
      </Section>
    </MainLayout>
  );
}








