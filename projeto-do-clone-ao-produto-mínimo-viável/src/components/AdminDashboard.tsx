import { motion } from 'motion/react';
import { ShieldCheck, Plus, Trash2, Save, X, Settings, Users, Gavel } from 'lucide-react';
import { useState } from 'react';

export function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [criteria, setCriteria] = useState([
    { id: 1, name: 'Estética Neumórfica', weight: 40 },
    { id: 2, name: 'Usabilidade', weight: 30 },
    { id: 3, name: 'Fidelidade ao Tema', weight: 30 },
  ]);

  const addCriteria = () => {
    setCriteria([...criteria, { id: Date.now(), name: 'Novo Critério', weight: 0 }]);
  };

  const removeCriteria = (id: number) => {
    setCriteria(criteria.filter(c => c.id !== id));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div className="w-full max-w-4xl h-[80vh] bg-base rounded-lg border border-white/10 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <header className="p-6 border-bottom border-white/10 flex items-center justify-between glass-panel rounded-none border-t-0 border-x-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-white tracking-tight">Painel Administrativo</h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-white/50">Sistema de Julgamento Softgrid</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-sm transition-colors">
            <X className="w-6 h-6 text-white" />
          </button>
        </header>

        {/* Sidebar & Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <aside className="w-48 border-right border-white/10 p-4 space-y-2 hidden md:block border-r">
            <div className="p-3 bg-white/10 rounded-sm flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
              <Gavel className="w-4 h-4" />
              Critérios
            </div>
            <div className="p-3 hover:bg-white/5 rounded-sm flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/50 cursor-not-allowed">
              <Users className="w-4 h-4" />
              Jurados
            </div>
            <div className="p-3 hover:bg-white/5 rounded-sm flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/50 cursor-not-allowed">
              <Settings className="w-4 h-4" />
              Config
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8 overflow-y-auto">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Configurar Julgamento</h2>
              <button 
                onClick={addCriteria}
                className="flex items-center gap-2 px-4 py-2 bg-white text-base text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-white/90 transition-all"
              >
                <Plus className="w-4 h-4" /> Adicionar Critério
              </button>
            </div>

            <div className="space-y-4">
              {criteria.map((c) => (
                <motion.div 
                  layout
                  key={c.id}
                  className="glass-panel group flex items-center gap-6 p-6"
                >
                  <div className="flex-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/50 block mb-2">Nome do Critério</label>
                    <input 
                      type="text" 
                      value={c.name}
                      onChange={(e) => {
                        const newC = [...criteria];
                        const idx = newC.findIndex(x => x.id === c.id);
                        newC[idx].name = e.target.value;
                        setCriteria(newC);
                      }}
                      className="w-full bg-black/20 p-2 rounded-sm border border-white/10 focus:border-white/30 text-white outline-none font-medium"
                    />
                  </div>
                  <div className="w-32">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-white/50 block mb-2">Peso (%)</label>
                    <input 
                      type="number" 
                      value={c.weight}
                      onChange={(e) => {
                        const newC = [...criteria];
                        const idx = newC.findIndex(x => x.id === c.id);
                        newC[idx].weight = parseInt(e.target.value);
                        setCriteria(newC);
                      }}
                      className="w-full bg-black/20 p-2 rounded-sm border border-white/10 focus:border-white/30 text-white outline-none font-medium"
                    />
                  </div>
                  <button 
                    onClick={() => removeCriteria(c.id)}
                    className="p-2 text-white/20 group-hover:text-red-400 transition-colors mt-6"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex justify-end">
              <button className="flex items-center gap-2 px-8 py-3 bg-white text-base text-xs font-bold uppercase tracking-[0.2em] rounded-sm hover:scale-105 transition-all shadow-xl">
                <Save className="w-4 h-4" /> Salvar Configuração
              </button>
            </div>
          </main>
        </div>
      </div>
    </motion.div>
  );
}
