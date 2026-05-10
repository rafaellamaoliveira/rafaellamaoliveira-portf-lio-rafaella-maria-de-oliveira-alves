import { Github, Star, Shield, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface NavbarProps {
  onOpenAdmin?: () => void;
}

export function Navbar({ onOpenAdmin }: NavbarProps) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const simulateGoogleLogin = () => {
    // Simulated Google Auth Flow
    setUser({ name: 'Admin', email: 'admin@softgrid.io' });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <nav className="flex items-center justify-between p-6">
      <div className="text-4xl font-script text-white">Softgrid.io</div>
      <div className="flex items-center gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2.5 bg-github-gray px-4 py-2 rounded-md shadow-sm cursor-pointer hover:bg-opacity-90 transition-colors text-sm font-semibold hidden lg:flex"
        >
          <span className="text-white">GitHub</span>
          <Github className="w-4 h-4 text-pink-500 fill-pink-500" />
          <Star className="w-4 h-4 text-white fill-white" />
          <span className="text-white">6079</span>
        </motion.div>

        <div className="flex items-center gap-3 border-l border-white/10 pl-6">
          {user ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={onOpenAdmin}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
              >
                <Shield className="w-4 h-4" /> Admin
              </button>
              <div className="flex items-center gap-2 pl-4 border-l border-white/5">
                 <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px] font-bold text-white">
                   {user.name[0]}
                 </div>
                 <button onClick={logout} title="Sair">
                   <LogOut className="w-3 h-3 text-white/30 hover:text-white transition-colors" />
                 </button>
              </div>
            </div>
          ) : (
            <>
              <button 
                onClick={simulateGoogleLogin}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google Login
              </button>
              <button className="px-4 py-1.5 bg-white text-base text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-200 transition-colors">
                Cadastrar
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}




