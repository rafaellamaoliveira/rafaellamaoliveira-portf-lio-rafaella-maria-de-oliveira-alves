import React from "react";
import { motion } from "motion/react";
import { getNeumorphicShadows } from "@/src/lib/neumorphism-utils";

interface ExamplesProps {
  color: string;
}

export const Examples: React.FC<ExamplesProps> = ({ color }) => {
  const outerShadow = getNeumorphicShadows(color, 6, 12, 15);
  const innerShadow = getNeumorphicShadows(color, 4, 8, 15, true);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Exemplos e Exploração</h2>
        <p className="opacity-60">Explore a coleção de designs de Neumorfismo com elementos interativos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Botão Aperte-me */}
        <div className="flex flex-col items-center gap-6">
          <motion.button
            whileTap={{ scale: 0.95, boxShadow: innerShadow }}
            className="px-10 py-5 rounded-2xl font-bold transition-all"
            style={{ backgroundColor: color, boxShadow: outerShadow }}
          >
            Aperte-me
          </motion.button>
          <span className="text-sm opacity-50">Botão 3D</span>
        </div>

        {/* Caixa de Seleção */}
        <div className="flex flex-col items-center gap-6">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: color, boxShadow: outerShadow }}
          >
            <div className="w-6 h-6 rounded-md" style={{ boxShadow: innerShadow }}></div>
          </div>
          <span className="text-sm opacity-50">Caixa de Seleção</span>
        </div>

        {/* Ícone de Carregamento */}
        <div className="flex flex-col items-center gap-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-full border-4 border-transparent border-t-white/20"
            style={{ boxShadow: outerShadow }}
          />
          <span className="text-sm opacity-50">Carregamento</span>
        </div>
      </div>
    </div>
  );
};
