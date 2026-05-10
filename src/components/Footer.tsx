import { Instagram, Facebook, Globe, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contatti" className="bg-csn-blue text-white py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-8 group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl rotate-3 group-hover:rotate-0 transition-all duration-500 overflow-hidden p-1 shrink-0">
              <img src="/logo.png" alt="ConfedOrienta" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <span className="font-extrabold text-2xl tracking-tighter text-white shrink-0">
              Confed<span className="text-csn-yellow italic">Orienta</span> <span className="font-medium opacity-50 tracking-normal text-lg ml-2">Università</span>
            </span>
          </div>
          <p className="text-blue-100 max-w-md leading-relaxed mb-8">
            La Confederazione degli Studenti Napoli è il network che unisce gli studenti della Federico II.
            Siamo presenti in ogni dipartimento per rappresentare e orientare le nuove generazioni.
          </p>
          <div className="flex gap-4">
            {[
              { Icon: Instagram, href: 'https://instagram.com/confed_napoli' },
              { Icon: Facebook, href: 'https://www.facebook.com/confederazionedeglistudentinapoli/' },
              { Icon: Globe, href: 'https://linktr.ee/confed_napoli' },
              { Icon: Mail, href: 'mailto:confederazione.studentinapoli@gmail.com' }
            ].map(({ Icon, href }, i) => (
              <a 
                key={i} 
                href={href} 
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-csn-yellow hover:text-csn-blue hover:border-csn-yellow transition-all duration-300"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6 text-csn-yellow">Link Rapidi</h4>
          <ul className="space-y-4">
            {[
              { name: 'Inizio', href: '#inizio' },
              { name: 'Chi siamo', href: '#chi-siamo' },
              { name: 'Associazioni', href: '#aree' },
              { name: 'Unisciti a noi', href: 'https://instagram.com/confed_napoli' }
            ].map(item => (
              <li key={item.name}>
                <a href={item.href} className="text-blue-100 hover:text-white transition-colors">{item.name}</a>
              </li>
            ))} 
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6 text-csn-yellow">Sedi</h4>
          <ul className="space-y-4 text-blue-100">
            <li>Dipartimenti di Ingegneria</li>
            <li>Dipartimento di Giurisprudenza</li>
            <li>Dipartimento di Medicina</li>
            <li>... e molti altri</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-16 pt-8 text-center text-blue-300/50 text-sm">
        &copy; {new Date().getFullYear()} Confederazione degli Studenti Napoli. Tutti i diritti riservati.
      </div>
    </footer>
  );
}
