import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass rounded-full px-6 py-4 flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md rotate-3 group-hover:rotate-0 transition-all duration-500 overflow-hidden border-2 border-slate-50 shrink-0">
              <img src="/logo.png" alt="ConfedOrienta" className="w-full h-full object-contain p-1" referrerPolicy="no-referrer" />
            </div>
            <span className="font-extrabold text-csn-blue tracking-tighter text-xl leading-none shrink-0">
              Confed<span className="text-csn-yellow italic">Orienta</span> <span className="font-medium text-slate-400 opacity-60 text-base tracking-normal ml-1">Università</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Inizio', 'Aree', 'Associazioni', 'Contatti'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-bold text-slate-600 hover:text-csn-blue transition-colors"
                id={`nav-${item.toLowerCase()}`}
              >
                {item}
              </a>
            ))}
            <button className="bg-csn-blue text-white px-6 py-2 rounded-full text-sm font-bold shadow-md hover:bg-csn-yellow hover:text-csn-blue transition-all duration-300">
              Unisciti a noi
            </button>
          </div>

          <button 
            className="md:hidden text-csn-blue"
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
            {['Inizio', 'Aree', 'Associazioni', 'Contatti'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-lg font-bold text-slate-800 p-2 hover:text-csn-blue transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="bg-csn-blue text-white w-full py-4 rounded-2xl font-black text-lg shadow-lg">
              UNISCITI A NOI
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
