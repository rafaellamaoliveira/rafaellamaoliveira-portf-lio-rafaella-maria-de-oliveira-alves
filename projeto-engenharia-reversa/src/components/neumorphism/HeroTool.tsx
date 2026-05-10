import React from "react";
import { ControlPanel } from "./ControlPanel";
import { PreviewCard } from "./PreviewCard";
import { getNeumorphicShadows } from "@/src/lib/neumorphism-utils";

interface HeroToolProps {
  config: any;
  setConfig: (config: any) => void;
  textColor: string;
  cssCode: string;
  copied: boolean;
  copyToClipboard: () => void;
}

export const HeroTool: React.FC<HeroToolProps> = ({
  config,
  setConfig,
  textColor,
  cssCode,
  copied,
  copyToClipboard,
}) => {
  const outerShadow = getNeumorphicShadows(config.color, 4, 8, config.intensity);
  const innerShadow = getNeumorphicShadows(config.color, 2, 4, config.intensity, true);

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start">
      {/* Painel de Controle (Lado Esquerdo) */}
      <aside className="w-full lg:w-80 p-8 rounded-[40px] space-y-10" style={{ backgroundColor: config.color, boxShadow: outerShadow }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-8 bg-white/20 rounded-full"></div>
          <h2 className="text-lg font-semibold tracking-widest uppercase opacity-80">Controles</h2>
        </div>
        
        <div className="space-y-10">
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-tighter opacity-40">Cor do Fundo</label>
            <div className="flex gap-4">
              <div 
                className="relative w-14 h-14 rounded-2xl overflow-hidden transition-transform active:scale-95 cursor-pointer"
                style={{ boxShadow: outerShadow }}
              >
                <input 
                  type="color" 
                  value={config.color}
                  onChange={(e) => setConfig({ ...config, color: e.target.value })}
                  className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] cursor-pointer border-none bg-transparent"
                />
              </div>
              <input 
                type="text" 
                value={config.color}
                onChange={(e) => setConfig({ ...config, color: e.target.value })}
                className="flex-1 px-5 py-3 rounded-2xl outline-none transition-all font-mono text-sm"
                style={{ 
                  backgroundColor: config.color, 
                  boxShadow: innerShadow,
                  color: textColor
                }}
              />
            </div>
          </div>

          <ControlPanel 
            config={config} 
            onChange={(newConfig) => setConfig({ ...config, ...newConfig })} 
          />
        </div>
      </aside>

      {/* Área Central de Preview e Código */}
      <div className="flex-1 w-full space-y-12">
        <div className="flex items-center justify-center min-h-[400px] relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
          <PreviewCard {...config} />
        </div>

        {/* Área de Código CSS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-40">CSS Gerado</h3>
            <button 
              onClick={copyToClipboard}
              className="text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-2xl transition-all active:scale-95 flex items-center gap-2"
              style={{ 
                backgroundColor: config.color, 
                boxShadow: outerShadow,
                color: textColor
              }}
            >
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>
          <div 
            className="p-8 rounded-[30px] font-mono text-sm overflow-x-auto transition-all relative group"
            style={{ 
              backgroundColor: config.color, 
              boxShadow: innerShadow,
              color: textColor
            }}
          >
            <pre className="whitespace-pre-wrap opacity-70 leading-relaxed">
              <code>{cssCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
