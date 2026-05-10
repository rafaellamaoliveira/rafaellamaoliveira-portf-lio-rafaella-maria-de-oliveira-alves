import React from "react";
import { Github, Star } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}

/**
 * MainLayout - Estrutura base para o Neumorphism.io
 * Suporta uma página longa com rolagem e seções bem definidas.
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  header,
  footer,
  bgColor = "#610505", 
  textColor = "#F6F5F7" 
}) => {
  return (
    <div 
      className="min-h-screen w-full flex flex-col font-sans transition-colors duration-500 overflow-x-hidden"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Header - Caixa superior (#5d5a56) */}
      <header 
        className="w-full p-4 shadow-lg z-50 sticky top-0 flex items-center justify-between px-8"
        style={{ backgroundColor: "#5d5a56" }}
      >
        {/* Espaçador para centralizar o título */}
        <div className="w-32 hidden md:block"></div>

        <div className="flex-1 flex justify-center">
          {header || (
            <h1 className="text-xl font-bold tracking-widest uppercase">Neumorphism.io</h1>
          )}
        </div>

        {/* GitHub Badge (Ponto 8) */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#5d5a56] border border-white/10 shadow-inner">
          <Github size={18} color="#FFFFFF" />
          <div className="flex items-center gap-1 text-sm font-bold">
            <Star size={14} fill="#f7d917" color="#f7d917" />
            <span style={{ color: "#FFFFFF" }}>6079</span>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal - Ocupa o restante da página */}
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>

      {/* Footer Detalhado */}
      <footer className="w-full border-t border-white/5 bg-black/20 mt-20">
        <div className="max-w-7xl mx-auto p-12">
          {footer}
        </div>
      </footer>
    </div>
  );
};





