import { MainLayout } from './components/layout/MainLayout';
import { useNeumorphism, NeumorphismShape } from './hooks/useNeumorphism';
import { AdminDashboard } from './components/AdminDashboard';
import { Copy, Check, MousePointer2, Loader2, GripVertical } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { state, updateState, shadowStyles, cssCode } = useNeumorphism();
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // Initialize with the new brand color
  useEffect(() => {
    updateState({ baseColor: '#722F37' });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <MainLayout onOpenAdmin={() => setIsAdminOpen(true)}>
      <AnimatePresence>
        {isAdminOpen && <AdminDashboard onClose={() => setIsAdminOpen(false)} />}
      </AnimatePresence>

      <div 
        className="fixed inset-0 -z-10 transition-colors duration-300" 
        style={{ backgroundColor: state.baseColor }} 
      />
      
      {/* Generator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start mt-10">
        {/* Controls Column */}
        <aside className="controls space-y-6">
          <div className="glass-panel">
            <span className="text-[10px] uppercase mb-3 block font-bold tracking-widest text-white">Base Color</span>
            <div className="flex gap-3 items-center">
              <input 
                type="color" 
                value={state.baseColor}
                onChange={(e) => updateState({ baseColor: e.target.value })}
                className="w-full h-8 bg-transparent rounded-sm border border-white/20 cursor-pointer overflow-hidden"
              />
              <span className="text-xs font-mono uppercase text-white">{state.baseColor}</span>
            </div>
          </div>
          
          <div className="glass-panel">
            <span className="text-[10px] uppercase mb-3 block font-bold tracking-widest text-white">Distance ({state.distance}px)</span>
            <input 
              type="range" min="0" max="50" value={state.distance}
              onChange={(e) => updateState({ distance: parseInt(e.target.value) })}
              className="w-full h-1 bg-black/30 rounded-full appearance-none my-2 cursor-pointer accent-star" 
            />
          </div>

          <div className="glass-panel">
            <span className="text-[10px] uppercase mb-3 block font-bold tracking-widest text-white">Intensity ({state.intensity.toFixed(2)})</span>
            <input 
              type="range" min="0.05" max="0.30" step="0.01" value={state.intensity}
              onChange={(e) => updateState({ intensity: parseFloat(e.target.value) })}
              className="w-full h-1 bg-black/30 rounded-full appearance-none my-2 cursor-pointer accent-star" 
            />
          </div>

          <div className="glass-panel">
            <span className="text-[10px] uppercase mb-3 block font-bold tracking-widest text-white">Blur ({state.blur}px)</span>
            <input 
              type="range" min="0" max="100" value={state.blur}
              onChange={(e) => updateState({ blur: parseInt(e.target.value) })}
              className="w-full h-1 bg-black/30 rounded-full appearance-none my-2 cursor-pointer accent-star" 
            />
          </div>

          <div className="glass-panel">
            <span className="text-[10px] uppercase mb-3 block font-bold tracking-widest text-white">Border Radius ({state.borderRadius}px)</span>
            <input 
              type="range" min="0" max="150" value={state.borderRadius}
              onChange={(e) => updateState({ borderRadius: parseInt(e.target.value) })}
              className="w-full h-1 bg-black/30 rounded-full appearance-none my-2 cursor-pointer accent-star" 
            />
          </div>


          <div className="grid grid-cols-2 gap-2.5">
            {[
              { id: 'flat', label: 'Elevado' },
              { id: 'inset', label: 'Insetado' },
              { id: 'concave', label: 'Côncavo' },
              { id: 'convex', label: 'Convexo' }
            ].map((shape) => (
              <button 
                key={shape.id}
                onClick={() => updateState({ shape: shape.id as NeumorphismShape })}
                className={`py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all ${
                  state.shape === shape.id 
                  ? 'bg-star text-base shadow-lg scale-[1.05] border border-white/40' 
                  : 'neumorphic-button hover:bg-white/5 text-white'
                }`}
              >
                {shape.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Preview Area */}
        <section className="preview-area flex flex-col items-center justify-center gap-12">
          {/* Active Filters Bar - Visible Filters for easy tracking */}
          <div className="flex flex-wrap gap-2 justify-center mb-[-24px]">
            <span className="bg-white/10 text-[9px] uppercase font-bold px-2 py-1 rounded-sm border border-white/5">Cor: {state.baseColor}</span>
            <span className="bg-white/10 text-[9px] uppercase font-bold px-2 py-1 rounded-sm border border-white/5">Dist: {state.distance}px</span>
            <span className="bg-white/10 text-[9px] uppercase font-bold px-2 py-1 rounded-sm border border-white/5">Blur: {state.blur}px</span>
            <span className="bg-white/10 text-[9px] uppercase font-bold px-2 py-1 rounded-sm border border-white/5">Raio: {state.borderRadius}px</span>
            <span className="bg-white/10 text-[9px] uppercase font-bold px-2 py-1 rounded-sm border border-white/5">Shape: {state.shape}</span>
          </div>

          <div 
            className="w-64 h-64 md:w-80 md:h-80 transition-all duration-300 border border-white/5 shadow-2xl"
            style={shadowStyles}
          ></div>
          
          <div className="w-full max-w-xl relative group glass-panel rounded-lg">
            <button 
              onClick={handleCopy}
              className="absolute top-4 right-4 p-2 rounded-sm bg-white/5 hover:bg-white/10 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white" />}
            </button>
            <pre className="font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap text-white">
              {cssCode}
            </pre>
          </div>
        </section>
      </div>

      {/* About Section */}
      <section className="mt-24 pt-12 border-t border-white/10 max-w-4xl">
        <h2 className="text-2xl font-display font-bold text-white mb-6 underline decoration-white/20 underline-offset-8">O que é Softgrid?</h2>
        <p className="text-base md:text-lg text-white leading-relaxed text-justify">
          O SoftGrid.io é uma plataforma digital que se diferencia principalmente pelo uso do Neumorfismo, 
          um estilo de design que busca criar interfaces mais suaves, modernas e intuitivas. 
          Nesse tipo de abordagem, os elementos da tela parecem fazer parte da própria superfície, 
          com efeitos de luz e sombra que dão uma sensação de profundidade sutil e realista. 
          Ao adotar esse conceito visual, o SoftGrid.io não se limita apenas à funcionalidade, 
          mas também valoriza a experiência do usuário. Os botões, menus e campos são pensados para serem 
          visualmente agradáveis e fáceis de identificar, o que torna a navegação mais natural e menos cansativa. 
          Isso ajuda o usuário a interagir com o sistema de forma mais rápida e eficiente, 
          sem precisar lidar com interfaces confusas ou poluídas.
        </p>
      </section>



      {/* Examples Gallery */}
      <section className="mt-24">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Exemplos e Coleções</h2>
          <p className="text-white">Explore a coleção de designs de Neumorfismo com elementos interativos.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Button Aperte-me */}
          <div className="flex flex-col items-center justify-center p-10 h-64 bg-base rounded-3xl neumorphic-flat">
            <button className="neumorphic-button px-6 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all">
              aperte-me
            </button>
          </div>

          {/* Button Clique aqui */}
          <div className="flex flex-col items-center justify-center p-10 h-64 bg-base rounded-3xl neumorphic-flat gap-4 text-center">
            <button className="w-16 h-16 rounded-full neumorphic-button flex items-center justify-center active:neumorphic-inset">
              <MousePointer2 className="w-6 h-6" />
            </button>
            <span className="text-xs font-bold uppercase tracking-widest">clique aqui</span>
          </div>

          {/* Checkbox */}
          <div className="flex flex-col items-center justify-center p-10 h-64 bg-base rounded-3xl neumorphic-flat">
             <div className="group cursor-pointer">
                <div title="Checkbox" className="w-12 h-12 rounded-xl neumorphic-inset flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-star rounded-md shadow-inner"
                  />
                </div>
                <span className="text-[10px] font-bold block mt-3 text-center uppercase tracking-tighter">caixa de seleção</span>
             </div>
          </div>

          {/* Loader */}
          <div className="flex flex-col items-center justify-center p-10 h-64 bg-base rounded-3xl neumorphic-flat gap-4">
             <div className="w-16 h-16 rounded-full neumorphic-inset flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-star" />
             </div>
             <span className="text-[10px] font-bold uppercase tracking-tighter">carregando</span>
          </div>

          {/* Push Toggle */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex items-center justify-center p-12 bg-base rounded-3xl neumorphic-flat mt-4">
            <div className="w-64 h-14 rounded-full neumorphic-inset p-2 relative flex items-center">
               <motion.div 
                 drag="x"
                 dragConstraints={{ left: 0, right: 200 }}
                 className="w-10 h-10 bg-star rounded-full cursor-grab active:cursor-grabbing shadow-lg flex items-center justify-center"
               >
                 <GripVertical className="w-4 h-4 text-base" />
               </motion.div>
               <span className="absolute right-8 text-[10px] font-bold uppercase tracking-widest text-white">arraste para o lado</span>
            </div>
          </div>
        </div>


        <div className="flex justify-center mt-12">
          <button className="px-12 py-3 bg-base rounded-2xl neumorphic-button font-bold text-sm tracking-widest hover:text-star transition-colors">
            VEJA MAIS
          </button>
        </div>
      </section>

      {/* More Tools */}
      <section className="mt-32">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2">Mais ferramentas</h2>
          <p className="text-white/50">Recursos gratuitos de desenvolvimento front-end para ajudar você a criar seu próximo projeto.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-base rounded-3xl neumorphic-flat border border-white/5 space-y-4">
            <h3 className="text-xl font-bold">Uiverse.io</h3>
            <p className="text-sm text-white leading-relaxed">
              A maior biblioteca de elementos de interface de usuário de código aberto. 
              Explore uma vasta coleção de belos elementos de interface, incluindo botões, 
              caixas de seleção, cartões e muito mais.
            </p>
          </div>
          <div className="p-8 bg-base rounded-3xl neumorphic-flat border border-white/5 space-y-4">
            <h3 className="text-xl font-bold">Cssbuttons.io</h3>
            <p className="text-sm text-white leading-relaxed">
              Coleção com mais de 100 botões belíssimos e personalizáveis para o seu próximo projeto. 
              Obtenha o código necessário para aprimorar seus projetos web com botões elegantes e funcionais.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button className="px-12 py-3 bg-base rounded-2xl neumorphic-button font-bold text-sm tracking-widest hover:text-star transition-colors">
            VEJA MAIS
          </button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="mt-32 pb-20 border-t border-white/10 pt-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Entre em Contato</h2>
            <p className="text-white/50 text-sm">Tem dúvidas, sugestões ou precisa de suporte? Mande uma mensagem.</p>
          </div>
          
          {formSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel text-center py-12 border-star/30 border"
            >
              <h3 className="text-xl font-bold text-white mb-2">Mensagem Enviada!</h3>
              <p className="text-white/60">Obrigado pelo seu contato. Responderemos em breve.</p>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/50">Nome</label>
                  <input required type="text" className="w-full bg-base p-4 rounded-sm neumorphic-inset border-none focus:ring-1 focus:ring-white/20 text-white outline-none" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/50">E-mail</label>
                  <input required type="email" className="w-full bg-base p-4 rounded-sm neumorphic-inset border-none focus:ring-1 focus:ring-white/20 text-white outline-none" placeholder="seu@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/50">Mensagem</label>
                <textarea required rows={5} className="w-full bg-base p-4 rounded-sm neumorphic-inset border-none focus:ring-1 focus:ring-white/20 text-white outline-none resize-none" placeholder="Como podemos ajudar?"></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-white text-base text-xs font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-white/90 transition-all neumorphic-button">
                Enviar Mensagem
              </button>
            </form>
          )}
        </div>
      </section>

    </MainLayout>
  );
}




