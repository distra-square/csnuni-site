import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AreaGrid from './components/AreaGrid';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';
import { motion, useScroll, useSpring } from 'motion/react';
import { Instagram, MessageCircle } from 'lucide-react';
import studentsImage from './assets/images/regenerated_image_1778425878747.png';
import orientationImage from './assets/images/regenerated_image_1778426150367.jpg';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen selection:bg-csn-yellow selection:text-csn-blue overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-csn-yellow z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />

        {/* Quick Groups CTA */}
        <section className="py-8 px-4 max-w-7xl mx-auto">
          <div className="bg-csn-yellow/10 border-2 border-csn-yellow/20 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="w-16 h-16 bg-csn-yellow rounded-2xl flex items-center justify-center text-csn-blue shadow-lg shadow-csn-yellow/25 shrink-0">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MessageCircle size={32} fill="currentColor" />
                </motion.div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-csn-blue">Sei una futura Matricola?</h3>
                <p className="text-slate-600 font-medium mt-1">Entra subito nei gruppi ufficiali delle associazioni per info e supporto.</p>
              </div>
            </div>
            <a 
              href="#aree" 
              className="bg-csn-blue text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-csn-blue/20 hover:scale-[1.03] active:scale-95 transition-all text-center w-full md:w-auto shrink-0 select-none"
            >
              TROVA IL TUO GRUPPO
            </a>
          </div>
        </section>
        
        {/* About Section */}
        <section id="chi-siamo" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-3xl bg-csn-blue overflow-hidden relative group shadow-2xl">
                    <img src={studentsImage} alt="Studenti Confederazione" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-linear-to-t from-csn-blue/80 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                       <span className="text-white font-black text-2xl italic">Persone</span>
                    </div>
                  </div>
                  <div className="aspect-square rounded-3xl bg-csn-yellow mt-8 overflow-hidden relative group shadow-2xl">
                    <img src={orientationImage} alt="Orientamento" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-linear-to-t from-csn-yellow/80 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                       <span className="text-white font-black text-2xl italic">Futuro</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-5xl font-black text-csn-blue mb-6 leading-tight">
                  Siamo la più grande <br /> 
                  <span className="text-csn-yellow italic">associazione di studenti</span> <br />
                  della Federico II.
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  Confederazione degli Studenti Napoli è un progetto collettivo che parte da studenti proprio come te. 
                  Siamo presenti in quasi tutti i dipartimenti della Federico II per garantire che ogni studente 
                  abbia una voce e un punto di riferimento sicuro, fin dal primo giorno.
                </p>
                <div className="space-y-4">
                  {[
                    'Rappresentanza in ogni dipartimento',
                    'Orientamento personalizzato per le matricole',
                    'Organizzazione di eventi e seminari',
                    'Supporto costante agli studenti'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-csn-yellow flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-csn-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-bold text-slate-800">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <AreaGrid />

        <InstagramFeed />

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto bg-csn-blue rounded-[3rem] p-10 md:p-12 text-center relative overflow-hidden shadow-2xl shadow-csn-blue/35">
            {/* Ambient gold/indigo graphics in margins */}
            <div className="absolute -top-12 -left-12 w-36 h-36 bg-csn-yellow/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 relative z-10">
              Hai ancora dei dubbi? <br />
              <span className="text-csn-yellow italic drop-shadow-xs">Parlane con noi.</span>
            </h2>
            
            <p className="text-blue-100 text-base md:text-lg mb-8 max-w-xl mx-auto relative z-10 font-semibold leading-relaxed">
              I nostri rappresentanti sono pronti a rispondere a tutte le tue domande su corsi, test e vita universitaria. Scrivici direttamente su Instagram!
            </p>
            
            <a 
              href="https://instagram.com/confed_napoli" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-csn-yellow text-csn-blue hover:bg-white hover:text-csn-blue px-8 py-4 rounded-2xl font-black text-md shadow-xl shadow-csn-yellow/10 hover:scale-[1.03] active:scale-95 transition-all relative z-10 group select-none"
            >
              <Instagram size={20} className="group-hover:rotate-12 transition-transform" />
              <span>SCRIVICI @CONFED_NAPOLI</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
