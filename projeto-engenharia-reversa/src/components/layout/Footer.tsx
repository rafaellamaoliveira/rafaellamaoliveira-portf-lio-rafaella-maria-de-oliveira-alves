import React from "react";
import { Instagram, Github, Twitter } from "lucide-react";

interface FooterProps {
  textColor: string;
}

export const Footer: React.FC<FooterProps> = ({ textColor }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12" style={{ color: textColor }}>
      {/* Lado Esquerdo */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold">Neumorphism.io</h3>
          <p className="opacity-60 text-sm mt-2">Gere designs neumórficos</p>
        </div>
        
        <div className="flex gap-4">
          <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
            <Instagram size={24} />
          </a>
          <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
            <Twitter size={24} />
          </a>
          <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
            <Github size={24} />
          </a>
        </div>
      </div>

      {/* Lado Direito */}
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-bold uppercase text-xs tracking-widest opacity-40">Recursos</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><a href="https://uiverse.io" target="_blank" className="hover:underline">Uiverse.io</a></li>
            <li><a href="#" className="hover:underline">Neumorfismo.io</a></li>
            <li><a href="https://cssbuttons.io" target="_blank" className="hover:underline">Cssbuttons.io</a></li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-bold uppercase text-xs tracking-widest opacity-40">Outros elementos</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li>caixas de seleção</li>
            <li>Botões de rádio</li>
            <li>Interruptores</li>
            <li>Carregadeiras</li>
            <li>Entradas</li>
            <li>Padrões</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
