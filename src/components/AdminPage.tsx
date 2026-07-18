import { useState, useEffect, FormEvent } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  ArrowLeft, 
  ExternalLink, 
  Lock, 
  Database, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  RefreshCw
} from 'lucide-react';
import { getGuides, saveGuide, deleteGuide, seedDefaultGuidesToCloud, resetLocalDataToDefaults, getFirebaseError } from '../lib/dbService';
import { isFirebaseConfigured } from '../lib/firebase';
import { Guide, GuideSection } from '../guidesData';

interface AdminPageProps {
  onBackToHome: () => void;
}

export default function AdminPage({ onBackToHome }: AdminPageProps) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  
  // Edit mode state
  const [editingGuide, setEditingGuide] = useState<Partial<Guide> | null>(null);
  const [expandedSections, setExpandedSections] = useState<boolean>(true);

  const CORRECT_PASSCODE = 'Confed_AmministrazionE_20_26';

  useEffect(() => {
    // Check if authenticated in current session
    const isAuth = sessionStorage.getItem('confed_admin_authenticated') === 'true';
    if (isAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadGuidesData();
    }
  }, [isAuthenticated]);

  const loadGuidesData = async () => {
    setLoading(true);
    try {
      const data = await getGuides();
      // Sort guides by date/id
      setGuides(data);
      setFirebaseError(getFirebaseError());
    } catch (e) {
      console.error(e);
      showStatus('error', 'Errore durante il caricamento delle guide.');
      setFirebaseError(getFirebaseError());
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (passcode === CORRECT_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('confed_admin_authenticated', 'true');
      setAuthError('');
    } else {
      setAuthError('Codice di accesso non valido. Riprova.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('confed_admin_authenticated');
    setPasscode('');
  };

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4500);
  };

  const handleNewGuide = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    
    setEditingGuide({
      id: 'nuova-guida-' + Math.random().toString(36).substr(2, 5),
      title: '',
      category: 'Borse & Contributi',
      date: formattedDate,
      readTime: '3 min',
      excerpt: '',
      officialUrl: '',
      officialUrlLabel: '',
      instagramPostUrl: '',
      sections: [
        { title: 'Introduzione', content: '' }
      ]
    });
  };

  const handleEditGuide = (guide: Guide) => {
    // Deep copy to prevent mutating list directly
    setEditingGuide(JSON.parse(JSON.stringify(guide)));
  };

  const handleDeleteGuide = async (id: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questa guida? L\'azione è irreversibile.')) {
      setLoading(true);
      try {
        await deleteGuide(id);
        setGuides(guides.filter(g => g.id !== id));
        showStatus('success', 'Guida eliminata con successo!');
        if (editingGuide?.id === id) {
          setEditingGuide(null);
        }
      } catch (e) {
        console.error(e);
        showStatus('error', 'Errore durante l\'eliminazione della guida.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveGuide = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingGuide) return;

    if (!editingGuide.id || !editingGuide.title || !editingGuide.excerpt) {
      showStatus('error', 'Compila i campi obbligatori (ID, Titolo, Descrizione breve).');
      return;
    }

    // Clean up empty section properties
    const cleanedSections = (editingGuide.sections || []).map(sec => {
      const s = { ...sec };
      if (s.bullets) {
        s.bullets = s.bullets.filter(b => b.trim() !== '');
        if (s.bullets.length === 0) {
          delete s.bullets;
        }
      }
      return s;
    });

    const finalGuide: Guide = {
      id: editingGuide.id.trim().toLowerCase().replace(/\s+/g, '-'),
      title: editingGuide.title.trim(),
      category: editingGuide.category || 'Borse & Contributi',
      date: editingGuide.date || 'Oggi',
      readTime: editingGuide.readTime || '3 min',
      excerpt: editingGuide.excerpt.trim(),
      sections: cleanedSections
    };

    if (editingGuide.officialUrl?.trim()) {
      finalGuide.officialUrl = editingGuide.officialUrl.trim();
    }
    if (editingGuide.officialUrlLabel?.trim()) {
      finalGuide.officialUrlLabel = editingGuide.officialUrlLabel.trim();
    }
    if (editingGuide.instagramPostUrl?.trim()) {
      finalGuide.instagramPostUrl = editingGuide.instagramPostUrl.trim();
    }

    setLoading(true);
    try {
      await saveGuide(finalGuide);
      const err = getFirebaseError();
      if (err) {
        showStatus('error', `Salvataggio Cloud fallito (${err}). Salvata temporaneamente nel browser.`);
        setFirebaseError(err);
      } else {
        showStatus('success', 'Guida salvata correttamente!');
        setFirebaseError(null);
        setEditingGuide(null);
      }
      await loadGuidesData();
    } catch (e) {
      console.error(e);
      showStatus('error', 'Impossibile salvare la guida.');
      setFirebaseError(getFirebaseError());
    } finally {
      setLoading(false);
    }
  };

  const handleSeedDefaults = async () => {
    if (window.confirm('Questa azione ripristinerà tutte le guide predefinite. Procedere?')) {
      setLoading(true);
      try {
        if (isFirebaseConfigured) {
          await seedDefaultGuidesToCloud();
        } else {
          resetLocalDataToDefaults();
        }
        showStatus('success', 'Dati ripristinati correttamente con le guide predefinite!');
        await loadGuidesData();
      } catch (e) {
        console.error(e);
        showStatus('error', 'Impossibile ripristinare i dati predefiniti.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Section fields helpers
  const handleAddSection = () => {
    if (!editingGuide) return;
    const currentSections = editingGuide.sections || [];
    setEditingGuide({
      ...editingGuide,
      sections: [...currentSections, { title: '', content: '' }]
    });
  };

  const handleRemoveSection = (index: number) => {
    if (!editingGuide) return;
    const currentSections = [...(editingGuide.sections || [])];
    currentSections.splice(index, 1);
    setEditingGuide({
      ...editingGuide,
      sections: currentSections
    });
  };

  const handleSectionFieldChange = (index: number, field: keyof GuideSection, value: any) => {
    if (!editingGuide) return;
    const currentSections = [...(editingGuide.sections || [])];
    currentSections[index] = {
      ...currentSections[index],
      [field]: value
    };
    setEditingGuide({
      ...editingGuide,
      sections: currentSections
    });
  };

  const handleAddBullet = (sectionIndex: number) => {
    if (!editingGuide) return;
    const currentSections = [...(editingGuide.sections || [])];
    const section = currentSections[sectionIndex];
    const currentBullets = section.bullets || [];
    currentSections[sectionIndex] = {
      ...section,
      bullets: [...currentBullets, '']
    };
    setEditingGuide({
      ...editingGuide,
      sections: currentSections
    });
  };

  const handleBulletChange = (sectionIndex: number, bulletIndex: number, value: string) => {
    if (!editingGuide) return;
    const currentSections = [...(editingGuide.sections || [])];
    const section = currentSections[sectionIndex];
    if (section.bullets) {
      const nextBullets = [...section.bullets];
      nextBullets[bulletIndex] = value;
      currentSections[sectionIndex] = {
        ...section,
        bullets: nextBullets
      };
      setEditingGuide({
        ...editingGuide,
        sections: currentSections
      });
    }
  };

  const handleRemoveBullet = (sectionIndex: number, bulletIndex: number) => {
    if (!editingGuide) return;
    const currentSections = [...(editingGuide.sections || [])];
    const section = currentSections[sectionIndex];
    if (section.bullets) {
      const nextBullets = section.bullets.filter((_, idx) => idx !== bulletIndex);
      currentSections[sectionIndex] = {
        ...section,
        bullets: nextBullets
      };
      setEditingGuide({
        ...editingGuide,
        sections: currentSections
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4 text-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-csn-yellow text-csn-blue shadow-lg shadow-csn-yellow/20 mb-4">
            <Lock size={28} />
          </div>
          <h2 className="text-3xl font-black text-white">Area Amministrazione</h2>
          <p className="mt-2 text-sm text-slate-400">
            Pannello riservato alla gestione delle guide e bandi per i collaboratori.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-slate-800 py-8 px-6 shadow-2xl rounded-[2.5rem] border border-slate-700/60">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="passcode" className="block text-sm font-bold text-slate-300">
                  Codice Amministratore
                </label>
                <div className="mt-1.5 relative">
                  <input
                    id="passcode"
                    name="passcode"
                    type="password"
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Inserisci il passcode"
                    className="appearance-none block w-full px-4 py-3 border border-slate-700 rounded-xl bg-slate-900 text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-csn-yellow focus:border-csn-yellow text-center font-mono tracking-widest"
                  />
                </div>
                {authError && (
                  <p className="mt-2.5 text-xs font-semibold text-rose-400 flex items-center gap-1">
                    <AlertCircle size={14} />
                    <span>{authError}</span>
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onBackToHome}
                  className="w-1/3 flex justify-center items-center px-4 py-3 border border-slate-700 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-700/40 transition-colors cursor-pointer"
                >
                  Indietro
                </button>
                <button
                  type="submit"
                  className="w-2/3 flex justify-center items-center px-4 py-3 bg-csn-yellow text-csn-blue rounded-xl text-sm font-black uppercase tracking-wider shadow-lg shadow-csn-yellow/15 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  Accedi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-all cursor-pointer"
              title="Torna alla Home"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-800">Pannello Amministrazione</h1>
                <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                  Attivo
                </span>
              </div>
              <p className="text-slate-500 text-sm mt-0.5">Gestisci in tempo reale le guide del portale ConfedOrienta.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleSeedDefaults}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              title="Re-inizializza dati se vuoto o corrotto"
            >
              <RefreshCw size={14} />
              <span>Reset Dati Default</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Esci
            </button>
          </div>
        </div>

        {/* Firebase Config Info Bar */}
        <div className={`p-5 rounded-3xl border flex flex-col md:flex-row gap-4 justify-between items-start md:items-center ${
          !isFirebaseConfigured 
            ? 'bg-amber-50/60 border-amber-100 text-amber-900' 
            : firebaseError
            ? 'bg-rose-50/70 border-rose-100 text-rose-950'
            : 'bg-emerald-50/50 border-emerald-100 text-emerald-800'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-2xl ${
              !isFirebaseConfigured 
                ? 'bg-amber-100 text-amber-700' 
                : firebaseError 
                ? 'bg-rose-100 text-rose-700' 
                : 'bg-emerald-100 text-emerald-700'
            }`}>
              <Database size={20} />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-sm flex items-center gap-1.5 flex-wrap">
                <span>Stato Database:</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                  !isFirebaseConfigured 
                    ? 'bg-amber-100 text-amber-800' 
                    : firebaseError 
                    ? 'bg-rose-100 text-rose-800' 
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {!isFirebaseConfigured 
                    ? 'DATABASE LOCALE (LOCAL STORAGE)' 
                    : firebaseError 
                    ? 'ERRORE COLLEGAMENTO CLOUD' 
                    : 'CLOUD (FIREBASE ATTIVO)'
                  }
                </span>
              </h3>
              <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
                {!isFirebaseConfigured 
                  ? 'Stai usando il Database Locale salvato sul tuo browser. Le modifiche non saranno visibili agli altri collaboratori o utenti finché non configuri le credenziali di Firebase su Vercel.'
                  : firebaseError
                  ? `Il database Cloud è configurato ma si è verificato un errore: "${firebaseError}". Le guide create ora verranno salvate solo localmente in questo browser.`
                  : 'Il cloud database Firebase è configurato ed attivo. Tutti i collaboratori condividono le stesse guide in tempo reale.'
                }
              </p>
            </div>
          </div>
          
          {isFirebaseConfigured && firebaseError && (
            <div className="bg-white/95 p-4 rounded-2xl border border-rose-200 text-xs text-slate-700 max-w-md w-full shrink-0 space-y-2">
              <span className="font-extrabold text-rose-800 flex items-center gap-1">
                <AlertCircle size={14} className="text-rose-600" /> Come risolvere l'errore di scrittura:
              </span>
              <p className="text-slate-600 leading-snug">
                Questo avviene quasi sempre perché le <strong>Regole di Sicurezza di Firestore</strong> sono in modalità bloccata (Production mode).
              </p>
              <ol className="list-decimal list-inside space-y-1 pl-1 text-slate-600 font-medium">
                <li>Apri la <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-csn-blue underline font-bold">Console Firebase</a></li>
                <li>Seleziona <strong>Firestore Database</strong> a sinistra e clicca sul tab <strong>Rules (Regole)</strong> in alto</li>
                <li>Incolla queste regole (permettono l'accesso pubblico a "guides") e clicca su <strong>Publish (Pubblica)</strong>:</li>
              </ol>
              <pre className="bg-slate-100 p-2 rounded-lg text-[10px] font-mono text-slate-800 overflow-x-auto whitespace-pre select-all">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /guides/{document} {
      allow read, write: if true;
    }
  }
}`}
              </pre>
            </div>
          )}
          
          {!isFirebaseConfigured && (
            <div className="bg-white/80 p-4 rounded-2xl border border-amber-200 text-xs text-slate-700 max-w-md w-full shrink-0 space-y-2">
              <span className="font-extrabold text-slate-800 flex items-center gap-1">
                <Info size={14} className="text-amber-600" /> Come attivare il Cloud Database gratuito:
              </span>
              <ol className="list-decimal list-inside space-y-1 pl-1 text-slate-600 font-medium">
                <li>Crea un database Firestore gratuito su <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-csn-blue underline font-bold">Firebase Console</a></li>
                <li>Registra un'app Web nel progetto per avere le credenziali</li>
                <li>Su Vercel, aggiungi le variabili d'ambiente di <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[10px] text-pink-600">.env.example</code></li>
                <li>Rifai il deploy su Vercel. Fatto!</li>
              </ol>
            </div>
          )}
        </div>

        {/* Main section */}
        {statusMessage && (
          <div className={`p-4 rounded-2xl border flex items-center gap-3 animate-fade-in ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            {statusMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="text-xs font-bold">{statusMessage.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Guides List */}
          <div className="lg:col-span-1 bg-white border border-slate-200/60 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-black text-slate-800 text-base">Tutte le Guide ({guides.length})</h2>
              <button
                onClick={handleNewGuide}
                className="bg-csn-blue hover:bg-slate-800 text-white p-2 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                title="Aggiungi Nuova Guida"
              >
                <Plus size={16} />
              </button>
            </div>

            {loading && guides.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs font-bold animate-pulse">
                Caricamento guide in corso...
              </div>
            ) : guides.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs space-y-2">
                <p>Nessuna guida presente nel database.</p>
                <button
                  onClick={handleNewGuide}
                  className="text-csn-blue underline font-extrabold cursor-pointer"
                >
                  Crea la prima ora!
                </button>
              </div>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {guides.map((g) => (
                  <div 
                    key={g.id} 
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      editingGuide?.id === g.id 
                        ? 'border-csn-blue bg-blue-50/20 shadow-xs' 
                        : 'border-slate-100 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] font-black uppercase tracking-wider mb-1">
                          {g.category}
                        </span>
                        <h4 className="font-extrabold text-xs text-slate-800 line-clamp-2 leading-snug">{g.title}</h4>
                        <span className="text-[10px] text-slate-400 font-medium block mt-1">{g.date}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 border-t border-slate-100/60 mt-3 pt-2">
                      <button
                        onClick={() => handleEditGuide(g)}
                        className="px-2.5 py-1 text-[10px] font-bold text-csn-blue hover:bg-blue-50 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 size={10} /> Modifica
                      </button>
                      <button
                        onClick={() => handleDeleteGuide(g.id)}
                        className="px-2.5 py-1 text-[10px] font-bold text-rose-600 hover:bg-rose-50 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 size={10} /> Elimina
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Guide Editor */}
          <div className="lg:col-span-2">
            {editingGuide ? (
              <form onSubmit={handleSaveGuide} className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-black text-csn-blue uppercase tracking-widest block">CREAZIONE / MODIFICA</span>
                    <h2 className="font-black text-slate-800 text-lg">
                      {editingGuide.title ? editingGuide.title : 'Nuova Guida'}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingGuide(null)}
                    className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-lg cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Base Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                      ID Guida (Chiave Unica - solo lettere, numeri e trattini) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="es. contributo-affitti-2026"
                      value={editingGuide.id || ''}
                      onChange={(e) => setEditingGuide({ ...editingGuide, id: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-hidden focus:ring-1 focus:ring-csn-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                      Categoria *
                    </label>
                    <select
                      value={editingGuide.category}
                      onChange={(e) => setEditingGuide({ ...editingGuide, category: e.target.value as any })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-csn-blue"
                    >
                      <option value="Borse & Contributi">Borse & Contributi</option>
                      <option value="Matricole">Matricole</option>
                      <option value="Tasse & Servizi">Tasse & Servizi</option>
                      <option value="Didattica">Didattica</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                      Titolo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Inserisci il titolo della guida"
                      value={editingGuide.title || ''}
                      onChange={(e) => setEditingGuide({ ...editingGuide, title: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-csn-blue"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                      Descrizione breve (estratto) *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Un breve riassunto per la lista delle guide..."
                      value={editingGuide.excerpt || ''}
                      onChange={(e) => setEditingGuide({ ...editingGuide, excerpt: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-csn-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                      Data Pubblicazione
                    </label>
                    <input
                      type="text"
                      placeholder="es. 18 Luglio 2026"
                      value={editingGuide.date || ''}
                      onChange={(e) => setEditingGuide({ ...editingGuide, date: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-csn-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-600 uppercase tracking-wider mb-1.5">
                      Tempo di Lettura stimato
                    </label>
                    <input
                      type="text"
                      placeholder="es. 4 min"
                      value={editingGuide.readTime || ''}
                      onChange={(e) => setEditingGuide({ ...editingGuide, readTime: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-csn-blue"
                    />
                  </div>
                </div>

                {/* Third-Party Info (Bando e Instagram Embed) */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-4">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Collegamenti Esterni & Social</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-600 mb-1">
                        Link al Bando Ufficiale (opzionale)
                      </label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={editingGuide.officialUrl || ''}
                        onChange={(e) => setEditingGuide({ ...editingGuide, officialUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-csn-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-600 mb-1">
                        Etichetta del Link (opzionale)
                      </label>
                      <input
                        type="text"
                        placeholder="es. Bando Ufficiale su Unina.it"
                        value={editingGuide.officialUrlLabel || ''}
                        onChange={(e) => setEditingGuide({ ...editingGuide, officialUrlLabel: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-csn-blue"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-extrabold text-slate-600 mb-1">
                        URL Post Instagram per l&apos;Embed (opzionale - il box si attiva solo se valorizzato)
                      </label>
                      <input
                        type="url"
                        placeholder="https://www.instagram.com/p/DaVqT2gow_X/"
                        value={editingGuide.instagramPostUrl || ''}
                        onChange={(e) => setEditingGuide({ ...editingGuide, instagramPostUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-csn-blue"
                      />
                      <span className="text-[9px] text-slate-400 block mt-1 italic">
                        Inserisci l&apos;URL completo del post. Se presente, attiverà automaticamente il box embed di Instagram nella barra laterale destra della guida.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sections Array Editor */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-[11px] font-black text-slate-600 uppercase tracking-wider flex items-center gap-2">
                      <Layers size={14} /> Sezioni della Guida (Contenuto Principale)
                    </span>
                    <button
                      type="button"
                      onClick={() => setExpandedSections(!expandedSections)}
                      className="text-slate-400 hover:text-slate-600 p-1 bg-slate-50 rounded"
                    >
                      {expandedSections ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>

                  {expandedSections && (
                    <div className="space-y-4">
                      {(editingGuide.sections || []).map((sec, secIdx) => (
                        <div key={secIdx} className="border border-slate-200 rounded-2xl p-4 bg-white shadow-xs relative space-y-3">
                          <button
                            type="button"
                            onClick={() => handleRemoveSection(secIdx)}
                            className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 p-1 transition-colors"
                            title="Rimuovi Sezione"
                          >
                            <Trash2 size={13} />
                          </button>
                          
                          <div className="text-[10px] font-black text-csn-blue mb-1">SEZIONE {secIdx + 1}</div>

                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                              Titolo Sezione
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="es. Requisiti di Ammissione"
                              value={sec.title}
                              onChange={(e) => handleSectionFieldChange(secIdx, 'title', e.target.value)}
                              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-csn-blue"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                              Testo Sezione
                            </label>
                            <textarea
                              rows={3}
                              placeholder="Descrivi dettagliatamente questo passaggio o concetto..."
                              value={sec.content}
                              onChange={(e) => handleSectionFieldChange(secIdx, 'content', e.target.value)}
                              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white focus:outline-hidden focus:ring-1 focus:ring-csn-blue"
                            />
                          </div>

                          {/* Bullets array inside Section */}
                          <div className="space-y-2 bg-slate-50/55 p-3 rounded-xl border border-dashed border-slate-200/80">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">
                                Elenco Puntato (Opzionale)
                              </span>
                              <button
                                type="button"
                                onClick={() => handleAddBullet(secIdx)}
                                className="text-[10px] font-black text-csn-blue hover:underline flex items-center gap-0.5"
                              >
                                <Plus size={10} /> Aggiungi punto
                              </button>
                            </div>

                            <div className="space-y-1.5">
                              {(sec.bullets || []).map((bullet, bulIdx) => (
                                <div key={bulIdx} className="flex gap-2 items-center">
                                  <span className="text-slate-400 text-xs font-black">•</span>
                                  <input
                                    type="text"
                                    placeholder="Inserisci riga di testo..."
                                    value={bullet}
                                    onChange={(e) => handleBulletChange(secIdx, bulIdx, e.target.value)}
                                    className="flex-1 px-2 py-1 border border-slate-200 rounded-md text-[11px] bg-white"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveBullet(secIdx, bulIdx)}
                                    className="text-slate-400 hover:text-rose-500 p-0.5"
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={handleAddSection}
                        className="w-full py-2.5 border border-dashed border-slate-300 rounded-2xl text-xs text-slate-500 hover:text-csn-blue hover:border-csn-blue hover:bg-blue-50/10 transition-all font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus size={14} />
                        <span>Aggiungi Sezione</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Save and Actions */}
                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingGuide(null)}
                    className="px-5 py-3 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-5 py-3 bg-csn-blue hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-csn-blue/15 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Save size={14} />
                    <span>Salva Modifiche</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-10 text-center text-slate-400 max-w-lg mx-auto shadow-xs select-none">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mx-auto mb-4 border border-slate-100">
                  <Edit2 size={24} />
                </div>
                <h3 className="font-extrabold text-slate-700 text-sm">Nessuna Guida Selezionata</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Seleziona una guida dalla lista a sinistra per modificarne i testi e i collegamenti, oppure clicca sul bottone &quot;+&quot; in alto per crearne una nuova.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
