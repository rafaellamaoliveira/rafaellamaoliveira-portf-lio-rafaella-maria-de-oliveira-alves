import { Instagram, Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto flex justify-between items-end pt-5 text-[11px] text-white">
      <div>
        <p>SoftGrid.io - Gere designs neumórficos</p>
        <div className="flex gap-4 mt-2">
          <span>Instagram</span>
          <span>GitHub</span>
          <span>X</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-x-5 gap-y-1 text-right">
        <span>Uiverse.io</span>
        <span>Checkboxes</span>
        <span>Neumorfismo.io</span>
        <span>Radio buttons</span>
        <span>Cssbuttons.io</span>
        <span>Switches</span>
      </div>
    </footer>
  );
}

