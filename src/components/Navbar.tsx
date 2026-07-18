import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';


interface NavbarProps {
  currentView: 'home' | 'guides';
  onViewChange: (view: 'home' | 'guides') => void;
}

export default function Navbar({ currentView, onViewChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  
  const navItems = [
    { name: 'Inizio', href: '#inizio', type: 'anchor' },
    { name: 'Chi siamo', href: '#chi-siamo', type: 'anchor' },
    { name: 'Associazioni', href: '#aree', type: 'anchor' },
    { name: 'Guide e Novità', href: '#guides', type: 'view', view: 'guides' as const },
    { name: 'Contatti', href: '#contatti', type: 'anchor' }
  ];

  const handleItemClick = (item: typeof navItems[number], e: React.MouseEvent) => {
    if (item.type === 'view' && item.view) {
      e.preventDefault();
      onViewChange(item.view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentView !== 'home') {
        // If we are in another view, switch back to home first, then scroll
        e.preventDefault();
        onViewChange('home');
        const targetId = item.href.replace('#', '');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    onViewChange('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass rounded-full px-6 py-4 flex items-center justify-between shadow-lg"
        >
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md rotate-3 group-hover:rotate-0 transition-all duration-500 overflow-hidden border-2 border-slate-50 shrink-0">
              <img src="/logo.png" alt="ConfedOrienta" className="w-full h-full object-contain p-1" referrerPolicy="no-referrer" />
            </div>
            <span className="font-extrabold text-csn-blue tracking-tighter text-xl leading-none shrink-0">
              Confed<span className="text-csn-yellow italic">Orienta</span> <span className="font-medium text-slate-400 opacity-60 text-base tracking-normal ml-1">Università</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                onClick={(e) => handleItemClick(item, e)}
                className={`text-sm font-bold transition-colors ${
                  (item.type === 'view' && currentView === 'guides')
                    ? 'text-csn-blue font-extrabold'
                    : 'text-slate-600 hover:text-csn-blue'
                }`}
                id={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="https://instagram.com/confed_napoli"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-csn-blue text-white px-6 py-2 rounded-full text-sm font-bold shadow-md hover:bg-csn-yellow hover:text-csn-blue transition-all duration-300"
            >
              Unisciti a noi
            </a>
          </div>

          <button 
            className="md:hidden text-csn-blue cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            id="mobile-menu-btn"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-24 left-4 right-4 bg-white rounded-3xl shadow-2xl p-6 md:hidden z-50 border border-slate-100"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                className={`text-lg font-bold p-2 transition-colors ${
                  item.type === 'view' && currentView === 'guides' ? 'text-csn-blue font-black' : 'text-slate-800 hover:text-csn-blue'
                }`}
                onClick={(e) => handleItemClick(item, e)}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="https://instagram.com/confed_napoli"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-csn-blue text-white w-full py-4 rounded-2xl font-black text-lg shadow-lg text-center"
              onClick={() => setIsOpen(false)}
            >
              UNISCITI A NOI
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
