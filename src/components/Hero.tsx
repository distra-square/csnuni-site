import { motion } from 'motion/react';
import { Sparkles, GraduationCap, Users } from 'lucide-react';

export default function Hero() {
  return (
    <header id="inizio" className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-40 -left-20 w-80 h-80 bg-csn-yellow/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-csn-blue/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-csn-yellow/10 border border-csn-yellow/20 text-csn-blue font-bold text-sm mb-6"
          >
            <Sparkles size={16} /> Orientamento Federico II
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-csn-blue leading-[1.1] mb-6 tracking-tighter"
          >
            Confed<span className="text-csn-yellow italic tracking-tight">Orienta</span><br /> 
            Università.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed"
          >
            La tua bussola per navigare nel mondo universitario.
            Siamo gli studenti della <span className="font-bold text-csn-blue">Confederazione</span>, pronti ad accompagnarti.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <a href="#aree" className="bg-csn-blue text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-csn-blue/20 hover:scale-105 active:scale-95 transition-all outline-none">
              Inizia l'Orientamento
            </a>
            <a href="#chi-siamo" className="bg-white text-csn-blue border-2 border-slate-100 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all outline-none">
              Chi Siamo
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex items-center justify-center lg:justify-start gap-8"
          >
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-3xl font-black text-csn-blue italic">19+</span>
              <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Associazioni</span>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-3xl font-black text-csn-blue italic">13</span>
              <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Aree Didattiche</span>
            </div>
          </motion.div>
        </div>

        <div className="lg:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="relative z-10"
          >
            <div className="bg-linear-to-br from-csn-blue to-blue-900 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-csn-yellow/20 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-csn-yellow/30 transition-colors" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md border border-white/20">
                    <GraduationCap size={40} className="text-csn-yellow" />
                  </div>
                  <div className="text-white">
                    <div className="text-sm font-bold text-csn-yellow uppercase tracking-widest">Studente del 5° anno?</div>
                    <div className="text-2xl font-black italic">Prepara il tuo futuro</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: MessageCircle, text: 'Gruppi WhatsApp Matricole', color: 'bg-emerald-500' },
                    { icon: Sparkles, text: 'Consigli da Studenti', color: 'bg-orange-500' },
                    { icon: GraduationCap, text: 'Guida ai Test', color: 'bg-blue-500' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + (i * 0.1) }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-colors"
                    >
                      <div className={`p-2 rounded-xl scale-75 ${item.color}`}>
                        <item.icon size={20} className="text-white" />
                      </div>
                      <span className="text-white font-bold">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Floating Blobs */}
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 -right-10 w-32 h-32 bg-csn-yellow rounded-3xl shadow-xl z-20 flex items-center justify-center p-8 -rotate-12 hidden md:flex"
          >
             <Sparkles size={48} className="text-csn-blue animate-pulse" />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
