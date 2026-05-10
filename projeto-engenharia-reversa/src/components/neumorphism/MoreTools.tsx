import React from "react";
import { getNeumorphicShadows } from "@/src/lib/neumorphism-utils";

interface MoreToolsProps {
  color: string;
}

export const MoreTools: React.FC<MoreToolsProps> = ({ color }) => {
  const outerShadow = getNeumorphicShadows(color, 8, 16, 15);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Mais ferramentas</h2>
        <p className="opacity-60">Recursos gratuitos de desenvolvimento front-end para ajudar você a criar seu próximo projeto.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Uiverse.io */}
        <div 
          className="p-8 rounded-[40px] space-y-4 transition-transform hover:scale-[1.02]"
          style={{ backgroundColor: color, boxShadow: outerShadow }}
        >
          <h3 className="text-2xl font-bold">Uiverse.io</h3>
          <p className="opacity-70 text-sm leading-relaxed">
            A maior biblioteca de elementos de interface de usuário de código aberto. Explore uma vasta coleção de belos elementos de interface, incluindo botões, caixas de seleção, cartões e muito mais.
          </p>
        </div>

        {/* Cssbuttons.io */}
        <div 
          className="p-8 rounded-[40px] space-y-4 transition-transform hover:scale-[1.02]"
          style={{ backgroundColor: color, boxShadow: outerShadow }}
        >
          <h3 className="text-2xl font-bold">Cssbuttons.io</h3>
          <p className="opacity-70 text-sm leading-relaxed">
            Coleção com mais de 100 botões belíssimos e personalizáveis para o seu próximo projeto. Obtenha o código necessário para aprimorar seus projetos web com botões elegantes e funcionais.
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <button 
          className="px-12 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all active:scale-95"
          style={{ backgroundColor: color, boxShadow: outerShadow }}
        >
          Veja Mais
        </button>
      </div>
    </div>
  );
};
