import { motion } from 'motion/react';
import { 
  Instagram, 
  Check, 
  MessageCircle, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function InstagramFeed() {
  return (
    <section id="instagram-feed" className="py-16 px-4 max-w-7xl mx-auto border-t border-slate-100 relative">
      <div className="text-center mb-12">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-pink-600 font-extrabold text-xs uppercase tracking-widest bg-pink-50 px-4 py-2 rounded-full border border-pink-100 inline-flex items-center gap-1.5 select-none"
        >
          <Instagram size={14} /> 
          <span>Community Social</span>
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-csn-blue mt-4 mb-3"
        >
          Resta Aggiornato su Instagram
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 max-w-2xl mx-auto font-medium"
        >
          Segui il nostro profilo ufficiale per guide di immatricolazione, avvisi, scadenze importanti e tutta la vita universitaria.
        </motion.p>
      </div>

      <div className="flex justify-center items-center">
        {/* original light theme card style with correct authentic data */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-xl bg-white border border-slate-100 rounded-[2.5rem] p-6 sm:p-8 shadow-xl shadow-slate-100/50 hover:border-pink-200 transition-all duration-300 group relative overflow-hidden"
        >
          {/* Top Instagram gradient bar decoration */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600" />
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] text-slate-400 font-bold font-mono tracking-wider uppercase">Instagram Profile</span>
            <div className="flex items-center gap-1 bg-sky-50 text-sky-600 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-tight">
              <Check size={11} className="stroke-[3]" /> Verificato
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 mt-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shrink-0 select-none">
              <div className="w-full h-full rounded-full bg-white p-1">
                <img 
                  src="/logo.png" 
                  alt="Confederazione Studenti Napoli" 
                  className="w-full h-full rounded-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=200&auto=format&fit=crop';
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 justify-start">
                <h3 className="font-extrabold text-xl text-slate-800">confed_napoli</h3>
                <div className="w-4 h-4 bg-sky-500 rounded-full flex items-center justify-center text-white shrink-0">
                  <Check size={9} strokeWidth={4} />
                </div>
              </div>
              <p className="text-slate-400 text-xs font-bold font-mono mt-0.5">UNIVERSITÀ FEDERICO II</p>
            </div>
          </div>

          {/* Real Metrics Stats */}
          <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100 my-6 text-center select-none bg-slate-50/50 rounded-2xl">
            <div>
              <div className="font-black text-slate-800 text-base sm:text-lg">415</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Post</div>
            </div>
            <div>
              <div className="font-black text-slate-800 text-base sm:text-lg">28.3K</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Follower</div>
            </div>
            <div>
              <div className="font-black text-slate-800 text-base sm:text-lg">46</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Seguiti</div>
            </div>
          </div>

          {/* Verified Details */}
          <div className="space-y-2">
            <div>
              <h4 className="font-extrabold text-sm text-slate-800">Confederazione Studenti-Napoli</h4>
              <span className="text-slate-400 text-[11px] font-bold mt-0.5 block">
                Education
              </span>
            </div>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Associazione di Rappresentanza Universitaria presso l&apos;Università di Napoli Federico II.
              <br />
              <span className="text-slate-400">Le notizie pubblicate sono... <span className="text-slate-500 font-bold hover:underline cursor-pointer">altro</span></span>
            </p>
            
            <a 
              href="https://linktr.ee/confed_napoli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 text-xs font-black inline-flex items-center gap-1 hover:underline"
            >
              🔗 linktr.ee/confed_napoli <span className="text-slate-400 font-medium">e altri 3</span>
            </a>

            {/* Followed By Row */}
            <div className="flex items-center gap-2 pt-3 text-[11px] text-slate-400 select-none border-t border-slate-50 mt-3">
              <div className="flex -space-x-1.5 shrink-0">
                <img 
                  src="/logo.png"
                  alt="avatar" 
                  className="w-5 h-5 rounded-full border border-white"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-slate-400">
                In collagborazione con 
                <a 
                  href="https://instagram.com/confederazionedeglistudenti_it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-700" > 
                  confederazionedeglistudenti_it.
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a 
              href="https://instagram.com/confed_napoli" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 text-white font-black text-center py-3.5 rounded-2xl shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 select-none text-sm"
            >
              <Instagram size={16} />
              <span>Segui @confed_napoli</span>
            </a>
            <a 
              href="https://instagram.com/confed_napoli" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-center py-3.5 px-6 rounded-2xl active:scale-98 transition-all flex items-center justify-center gap-1.5 select-none text-sm"
            >
              <span>Messaggio</span>
              <ChevronRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
