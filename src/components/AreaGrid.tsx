import { motion, AnimatePresence } from 'motion/react';
import { UNIVERSITY_AREAS, UniversityArea } from '../data';
import { ArrowRight, Instagram, ExternalLink, X, Search } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function AreaGrid() {
  const [selectedArea, setSelectedArea] = useState<UniversityArea | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAreas = useMemo(() => {
    if (!searchTerm.trim()) return UNIVERSITY_AREAS;
    
    const term = searchTerm.toLowerCase();
    return UNIVERSITY_AREAS.filter(area => 
      area.name.toLowerCase().includes(term) ||
      area.keywords.some(k => k.toLowerCase().includes(term)) ||
      area.associations.some(a => a.name.toLowerCase().includes(term) || a.description.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  return (
    <section id="aree" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold text-csn-blue mb-4"
        >
          Scegli la tua Area
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 max-w-2xl mx-auto mb-10"
        >
          Esplora i dipartimenti della Federico II e mettiti in contatto con le associazioni studentesche che li animano.
        </motion.p>

        {/* Smart Search Bar */}
        <div className="max-w-md mx-auto relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-csn-blue transition-colors">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Cerca corso, dipartimento o parola chiave..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-14 pr-5 focus:border-csn-yellow focus:outline-none shadow-sm transition-all text-slate-800 font-medium"
            id="search-input"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-5 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredAreas.map((area, index) => (
            <motion.button
              key={area.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => setSelectedArea(area)}
              className="group relative flex flex-col items-center justify-center aspect-square p-6 rounded-3xl transition-all duration-300 overflow-hidden"
              style={{ backgroundColor: `${area.color}15`, border: `1px solid ${area.color}30` }}
              id={`area-${area.id}`}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(45deg, ${area.color}20, transparent)` }}
              />
              
              <div 
                className="w-12 md:w-16 h-12 md:h-16 flex items-center justify-center rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-110 shadow-lg text-white"
                style={{ backgroundColor: area.color }}
              >
                <area.icon size={32} />
              </div>
              
              <span className="font-bold text-center text-sm md:text-lg text-slate-800 transition-colors duration-300 group-hover:text-csn-blue leading-tight px-2">
                {area.name}
              </span>
              
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-semibold text-csn-blue flex items-center gap-1">
                Scopri <ArrowRight size={12} />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredAreas.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
             <Search size={40} />
          </div>
          <p className="text-slate-500 font-bold">Nessuna corrispondenza trovata per "{searchTerm}"</p>
          <button 
            onClick={() => setSearchTerm('')}
            className="text-csn-blue underline mt-2 font-bold"
          >
            Azzera ricerca
          </button>
        </motion.div>
      )}

      {selectedArea && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-csn-blue/40 backdrop-blur-md"
          onClick={() => setSelectedArea(null)}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="h-32 flex items-center justify-between px-8 text-white relative shadow-lg"
              style={{ backgroundColor: selectedArea.color }}
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/20">
                    <selectedArea.icon size={32} />
                </div>
                <h3 className="text-2xl font-black italic">{selectedArea.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedArea(null)}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                id="close-modal"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <h4 className="text-xs uppercase tracking-widest font-black text-slate-400 mb-6">Associazioni di riferimento</h4>
              <div className="space-y-4">
                {selectedArea.associations.map(assoc => (
                  <div key={assoc.id} className="p-6 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-csn-yellow hover:shadow-xl transition-all duration-300 group">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                       <div>
                         <h5 className="font-extrabold text-xl text-csn-blue group-hover:text-csn-yellow transition-colors">{assoc.name}</h5>
                         <p className="text-slate-500 text-sm mt-1">{assoc.description}</p>
                       </div>
                       <div className="flex gap-2 w-full sm:w-auto">
                         {assoc.instagram && (
                           <a 
                             href={assoc.instagram} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:scale-105 transition-all shadow-md shadow-pink-500/20"
                           >
                             <Instagram size={16} /> @{assoc.instagram.split('/').pop()}
                           </a>
                         )}
                         {assoc.link && !assoc.instagram && (
                           <a 
                             href={assoc.link} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-csn-blue text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-csn-yellow hover:text-csn-blue transition-all shadow-md shadow-csn-blue/20"
                           >
                             <ExternalLink size={16} /> Visita
                           </a>
                         )}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
