import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Filter,
  Instagram,
  Check,
  ChevronRight,
  Bookmark,
  FileText,
  Share2
} from 'lucide-react';
import { GUIDES_DATA } from '../guidesData';
import InstagramEmbed from './InstagramEmbed';

interface GuidesPageProps {
  onBackToHome: () => void;
}

export default function GuidesPage({ onBackToHome }: GuidesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'live' | 'graphic'>('live');

  // Categories list
  const categories = useMemo(() => {
    const list = new Set(GUIDES_DATA.map(g => g.category));
    return ['All', ...Array.from(list)];
  }, []);

  // Filtered guides based on search query & selected category
  const filteredGuides = useMemo(() => {
    return GUIDES_DATA.filter(guide => {
      const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
      const lowerSearch = searchQuery.toLowerCase();
      const matchesSearch = 
        guide.title.toLowerCase().includes(lowerSearch) ||
        guide.excerpt.toLowerCase().includes(lowerSearch) ||
        guide.sections.some(s => s.title.toLowerCase().includes(lowerSearch) || s.content.toLowerCase().includes(lowerSearch));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const selectedGuide = useMemo(() => {
    return GUIDES_DATA.find(g => g.id === selectedGuideId) || null;
  }, [selectedGuideId]);

  const embedUrl = useMemo(() => {
    if (!selectedGuide?.instagramPostUrl) return null;
    const match = selectedGuide.instagramPostUrl.match(/\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
    if (match && match[2]) {
      return `https://www.instagram.com/p/${match[2]}/embed`;
    }
    return null;
  }, [selectedGuide]);

  const handleSelectGuide = (id: string | null) => {
    setSelectedGuideId(id);
    setSidebarTab('live');
  };

  const handleShare = () => {
    setCopiedLink(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Borse & Contributi':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Matricole':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Tasse & Servizi':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-100';
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen bg-slate-50 selection:bg-csn-yellow selection:text-csn-blue">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedGuide ? (
            // ================= GUIDE LIST VIEW =================
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
              id="guides-list"
            >
              {/* Header with Navigation Back */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
                <div>
                  <button 
                    onClick={onBackToHome}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-csn-blue transition-colors font-bold text-sm mb-4 group cursor-pointer"
                    id="back-to-home-btn"
                  >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Torna alla Home</span>
                  </button>
                  <h1 className="text-3xl md:text-5xl font-black text-csn-blue tracking-tight">
                    Guide e <span className="text-csn-yellow italic">Novità</span>
                  </h1>
                  <p className="text-slate-600 mt-2 font-medium">
                    Bandi ufficiali, scadenze universitarie, e guide operative a cura dei rappresentanti degli studenti.
                  </p>
                </div>

                {/* Live notice indicator */}
                <div className="bg-csn-blue/5 border border-csn-blue/10 rounded-2xl p-4 flex items-center gap-3 self-start md:self-auto">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="text-xs font-bold text-slate-700">Aggiornato in tempo reale con l&apos;Ateneo</span>
                </div>
              </div>

              {/* Filters & Search Row */}
              <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-white p-4 rounded-3xl border border-slate-100 shadow-xs">
                {/* Search input */}
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Cerca bandi, guide, parole chiave..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-hidden focus:border-csn-blue/30 focus:bg-white text-sm font-medium transition-all"
                  />
                </div>

                {/* Category select buttons */}
                <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mr-2 shrink-0 select-none">
                    <Filter size={13} />
                    <span>FILTRA PER:</span>
                  </div>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border select-none cursor-pointer transition-all ${
                        selectedCategory === cat 
                          ? 'bg-csn-blue text-white border-csn-blue shadow-md' 
                          : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                      }`}
                    >
                      {cat === 'All' ? 'Tutte' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guides Grid */}
              {filteredGuides.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGuides.map((guide, idx) => (
                    <motion.article 
                      key={guide.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-csn-blue/10 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                      onClick={() => handleSelectGuide(guide.id)}
                    >
                      <div>
                        {/* Meta Category & Badges */}
                        <div className="flex items-center justify-between mb-4">
                          <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border ${getCategoryColor(guide.category)}`}>
                            {guide.category}
                          </span>
                          <div className="flex items-center gap-1 text-slate-400 text-xs font-bold font-mono">
                            <Clock size={12} />
                            <span>{guide.readTime}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-extrabold text-xl text-slate-800 leading-snug group-hover:text-csn-blue transition-colors mb-3">
                          {guide.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6">
                          {guide.excerpt}
                        </p>
                      </div>

                      {/* Card Footer info */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50 select-none">
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                          <Calendar size={13} />
                          <span>{guide.date}</span>
                        </div>
                        <span className="text-csn-blue group-hover:text-csn-yellow font-black text-xs inline-flex items-center gap-1 transition-colors">
                          LEGGI GUIDA 
                          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white border border-slate-100 rounded-[3rem] p-8 max-w-xl mx-auto">
                  <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">Nessuna guida trovata</h3>
                  <p className="text-slate-500 text-sm">
                    Prova a cercare con un altro termine o seleziona una categoria differente.
                  </p>
                </div>
              )}

              {/* Instagram Notice Highlight */}
              <div className="bg-csn-blue text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-xl shadow-csn-blue/20">
                <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-full blur-3xl opacity-20 pointer-events-none" />
                
                <div className="max-w-3xl relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
                  <div className="space-y-3 text-center md:text-left">
                    <span className="bg-white/15 border border-white/20 text-csn-yellow px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase inline-flex items-center gap-1">
                      Novità Social
                    </span>
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
                      Cercavi l&apos;ultimo post?
                    </h2>
                    <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                      Siamo sempre in prima linea su Instagram per darti riassunti rapidi, grafici chiarificatori e scadenze dell&apos;ultimo minuto. Attiva le notifiche per non perderti nessun bando!
                    </p>
                  </div>
                  
                  <a 
                    href="https://instagram.com/confed_napoli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-csn-blue hover:bg-csn-yellow hover:text-csn-blue font-black px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 flex items-center gap-2 select-none shrink-0"
                  >
                    <Instagram size={18} />
                    <span>SEGUI @CONFED_NAPOLI</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            // ================= GUIDE DETAIL VIEW =================
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              id="guide-detail"
            >
              {/* Main Article column */}
              <article className="lg:col-span-8 bg-white border border-slate-100 rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden">
                {/* Floating category tag */}
                <div className="flex flex-wrap items-center gap-3 mb-6 select-none">
                  <button 
                    onClick={() => handleSelectGuide(null)}
                    className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-csn-blue transition-colors cursor-pointer shrink-0"
                    title="Indietro alla lista"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border ${getCategoryColor(selectedGuide.category)}`}>
                    {selectedGuide.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 text-xs font-bold font-mono ml-auto">
                    <Clock size={12} />
                    <span>Tempo di lettura: {selectedGuide.readTime}</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-csn-blue mb-4 tracking-tight leading-tight">
                  {selectedGuide.title}
                </h1>

                {/* Published details info row */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8 text-xs select-none">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
                      <Calendar size={14} />
                      <span>Pubblicato il: {selectedGuide.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleShare}
                      className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      title="Copia link"
                    >
                      {copiedLink ? <span className="text-emerald-500 font-extrabold text-[10px] uppercase">Copiato!</span> : <Share2 size={15} />}
                    </button>
                  </div>
                </div>

                {/* Excerpt panel */}
                <p className="text-slate-600 font-semibold text-base sm:text-lg leading-relaxed bg-slate-50 border-l-4 border-csn-yellow p-4 sm:p-5 rounded-r-2xl mb-8">
                  {selectedGuide.excerpt}
                </p>

                {/* Article sections */}
                <div className="space-y-8">
                  {selectedGuide.sections.map((section, sIdx) => (
                    <section key={sIdx} className="space-y-3">
                      <h2 className="text-lg sm:text-xl font-black text-slate-800 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-csn-blue rounded-full shrink-0" />
                        <span>{section.title}</span>
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        {section.content}
                      </p>
                      
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="grid grid-cols-1 gap-2.5 pt-2">
                          {section.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                              <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                                <Check size={11} className="stroke-[3]" />
                              </span>
                              <span className="text-xs sm:text-sm text-slate-600 font-medium">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>

                {/* Official Action button footer inside the article */}
                {selectedGuide.officialUrl && (
                  <div className="mt-12 p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-center sm:text-left">
                      <div className="w-12 h-12 bg-csn-blue/5 text-csn-blue rounded-xl flex items-center justify-center shrink-0">
                        <FileText size={22} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-800 text-sm">Hai bisogno del documento completo?</h4>
                        <p className="text-slate-400 text-xs font-medium">Trovi la risorsa e il bando sul sito dell&apos;Ateneo.</p>
                      </div>
                    </div>
                    
                    <a 
                      href={selectedGuide.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-csn-blue hover:bg-csn-yellow text-white hover:text-csn-blue px-6 py-3 rounded-xl font-black text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0 select-none cursor-pointer"
                    >
                      <span>{selectedGuide.officialUrlLabel || 'Apri Link Ufficiale'}</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                )}
              </article>

              {/* Sidebar: Associated Instagram Post Preview */}
              <aside className="lg:col-span-4 space-y-6">
                {/* Back button wrapper for ease */}
                <button 
                  onClick={() => handleSelectGuide(null)}
                  className="w-full bg-white hover:bg-slate-100 border border-slate-100 hover:border-slate-200 text-slate-600 font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 select-none cursor-pointer text-sm"
                >
                  <ArrowLeft size={16} />
                  <span>Torna all&apos;elenco guide</span>
                </button>

                {/* Instagram Post Correlation Container */}
                <div className="bg-white text-slate-800 rounded-[2.5rem] shadow-md border border-slate-100 overflow-hidden flex flex-col">
                  {/* Optional Header tabs if there is an embedUrl */}
                  {embedUrl ? (
                    <div className="flex bg-slate-50 p-1.5 border-b border-slate-100">
                      <button
                        type="button"
                        onClick={() => setSidebarTab('live')}
                        className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                          sidebarTab === 'live' 
                            ? 'bg-csn-blue text-white shadow-sm' 
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Post Live
                      </button>
                      <button
                        type="button"
                        onClick={() => setSidebarTab('graphic')}
                        className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                          sidebarTab === 'graphic' 
                            ? 'bg-csn-blue text-white shadow-sm' 
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Info & Grafica
                      </button>
                    </div>
                  ) : null}

                  {/* Content Container */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    {sidebarTab === 'live' && embedUrl ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 select-none">
                          <div className="flex items-center gap-2">
                            <Instagram size={16} className="text-[#ee2a7b]" />
                            <span className="font-extrabold text-xs text-slate-800">Anteprima Live</span>
                          </div>
                          <a 
                            href={selectedGuide.instagramPostUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600 hover:text-pink-700 font-extrabold text-xs flex items-center gap-1 transition-colors"
                          >
                            Apri su Instagram <ExternalLink size={11} />
                          </a>
                        </div>

                        <div className="relative w-full overflow-hidden rounded-2xl border border-slate-100 bg-white flex items-center justify-center min-h-[460px]">
                          {selectedGuide.instagramPostUrl && (
                            <InstagramEmbed url={selectedGuide.instagramPostUrl} />
                          )}
                        </div>
                        
                        <p className="text-slate-400 text-[10px] text-center italic mt-2">
                          Se l&apos;anteprima non si carica, puoi aprirla direttamente premendo il link in alto o passare alla scheda &quot;Info & Grafica&quot;.
                        </p>
                      </div>
                    ) : (
                      /* Original mockup fallback */
                      <div>
                        {/* Top line profile header */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 select-none">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
                              <div className="w-full h-full rounded-full bg-white p-0.5">
                                <img src="/logo.png" alt="logo" className="w-full h-full rounded-full object-cover" />
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <span className="font-extrabold text-xs text-slate-800">confed_napoli</span>
                                <span className="w-3 h-3 bg-[#0095f6] rounded-full flex items-center justify-center text-white shrink-0">
                                  <Check size={7} strokeWidth={4} />
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-400 leading-none block">Post Ufficiale</span>
                            </div>
                          </div>
                          <span className="bg-pink-50 text-pink-600 px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-wider border border-pink-100">
                            SOCIAL
                          </span>
                        </div>

                        {/* Mock Post graphic area - styled like the official visual identity of the brand */}
                        <div className="aspect-square w-full rounded-2xl bg-linear-to-tr from-[#002775] to-blue-900 border border-slate-100 p-6 flex flex-col justify-between relative overflow-hidden mb-4 select-none group">
                          {/* Decorative abstract circle */}
                          <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-[#f5b000]/10 rounded-full blur-xl" />
                          
                          <div className="flex justify-between items-start">
                            <img src="/logo.png" alt="Confed" className="w-8 h-8 object-contain" />
                            <Instagram size={18} className="text-[#ee2a7b]" />
                          </div>

                          <div className="space-y-1">
                            <span className="text-csn-yellow font-black text-xs uppercase tracking-widest bg-white/5 border border-white/10 px-2.5 py-1 rounded-md inline-block">
                              {selectedGuide.category}
                            </span>
                            <h4 className="text-white font-black text-lg leading-tight uppercase tracking-tight">
                              {selectedGuide.title.length > 55 ? selectedGuide.title.substring(0, 55) + '...' : selectedGuide.title}
                            </h4>
                          </div>

                          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[9px] text-slate-300 font-bold uppercase tracking-wider">
                            <span>Confederazione Studenti</span>
                            <span className="text-[#ee2a7b]">Vedi Post →</span>
                          </div>
                        </div>

                        {/* Caption mock text */}
                        <div className="space-y-3">
                          <p className="text-slate-600 text-xs leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto pr-1">
                            {selectedGuide.instagramPostCaption || 'Segui la nostra pagina ufficiale per consultare le ultime grafiche esplicative su questo argomento.'}
                          </p>

                          <a 
                            href={selectedGuide.instagramPostUrl || 'https://instagram.com/confed_napoli'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700 font-extrabold text-center py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 select-none text-xs cursor-pointer"
                          >
                            <Instagram size={14} />
                            <span>Vai al Post Correlato</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Helpful Contact Helpdesk banner inside sidebar */}
                <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center gap-2">
                    <Bookmark size={18} className="text-csn-yellow fill-csn-yellow" />
                    <h4 className="font-extrabold text-slate-800 text-sm">Hai bisogno di aiuto?</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Se hai dubbi specifici sulle procedure o vuoi confrontarti con un rappresentante del tuo corso di studi, scrivici in privato su Instagram!
                  </p>
                  
                  <a 
                    href="https://instagram.com/confed_napoli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-slate-100 hover:bg-csn-blue hover:text-white text-slate-700 font-extrabold text-center py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 select-none text-xs cursor-pointer"
                  >
                    <span>Contattaci Subito</span>
                  </a>
                </div>
              </aside>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
