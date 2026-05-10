import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AreaGrid from './components/AreaGrid';
import Footer from './components/Footer';
import { motion, useScroll, useSpring } from 'motion/react';
import { Instagram } from 'lucide-react';
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
        
        {/* About Section */}
        <section id="associazioni" className="py-20 bg-white">
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
                  <span className="text-csn-yellow italic">rete di studenti</span> <br />
                  a Napoli.
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  La Confederazione degli Studenti Napoli non è solo un'associazione, è un progetto collettivo. 
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

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto bg-csn-blue rounded-[3rem] p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">
              Hai ancora dei dubbi? <br />
              <span className="text-csn-yellow italic">Parlane con noi.</span>
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto relative z-10">
              I nostri rappresentanti sono pronti a rispondere a tutte le tue domande su corsi, test e vita universitaria.
            </p>
            <a 
              href="https://instagram.com/confed_napoli" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-csn-yellow text-csn-blue px-10 py-5 rounded-[2rem] font-black text-xl shadow-2xl hover:scale-105 transition-all relative z-10 group"
            >
              <Instagram size={28} className="group-hover:rotate-12 transition-transform" />
              <span>SCRIVICI @CONFED_NAPOLI</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

