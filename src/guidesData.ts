export interface GuideSection {
  title: string;
  content: string;
  bullets?: string[];
}

export interface Guide {
  id: string;
  title: string;
  category: 'Borse & Contributi' | 'Matricole' | 'Tasse & Servizi' | 'Didattica';
  date: string;
  readTime: string;
  excerpt: string;
  officialUrl?: string;
  officialUrlLabel?: string;
  sections: GuideSection[];
  instagramPostUrl?: string;
  instagramPostCaption?: string;
}

export const GUIDES_DATA: Guide[] = [
  {
    id: 'contributo-affitti-2026',
    title: 'Bando Contributo Affitti Fuorisede: Come richiedere il rimborso',
    category: 'Borse & Contributi',
    date: '18 Luglio 2026',
    readTime: '4 min',
    excerpt: 'È online il nuovo bando della Federico II per il rimborso delle spese di locazione sostenute dagli studenti fuorisede. Ecco i requisiti, le scadenze e come presentare la domanda.',
    officialUrl: 'https://www.unina.it/it/servizi-e-opportunita/opportunita-e-iniziative/locazioni-studenti-fuori-sede',
    officialUrlLabel: 'Bando Ufficiale su Unina.it',
    instagramPostUrl: 'https://www.instagram.com/p/DO_kIyiDb4J/',
    instagramPostCaption: '🏠 CONTRIBUTO AFFITTI FUORISEDE 2026/2027 🏠\n\nSei uno studente fuorisede iscritto alla Federico II con un contratto d’affitto registrato? È uscito il bando per richiedere il rimborso delle spese di locazione!\n\nNel post di oggi ti spieghiamo i requisiti e come fare domanda in pochi semplici passaggi. Non perdere questa opportunità!\n\n#unina #fuorisede #federicoii #affitti #dirittoallostudio #confed_napoli',
    sections: [
      {
        title: 'Cos\'è il Contributo Affitti?',
        content: 'Il contributo affitto per studenti fuorisede è una misura governativa stanziata dal Ministero dell\'Università e della Ricerca (MUR) e gestita direttamente dall\'Ateneo Federico II. Questa agevolazione consiste in un rimborso spese (totale o parziale) del canone di locazione pagato dagli studenti durante l\'anno accademico.'
      },
      {
        title: 'Requisiti di Ammissione',
        content: 'Per poter presentare la domanda ed accedere alla graduatoria del rimborso spese, lo studente deve soddisfare determinati criteri al momento della richiesta:',
        bullets: [
          'Essere regolarmente iscritto per l\'A.A. di riferimento a un corso di laurea, laurea magistrale o ciclo unico presso l\'Università degli Studi di Napoli Federico II.',
          'Essere studente "Fuorisede", ovvero residente in un comune diverso da quello in cui si tengono le lezioni del proprio corso di studi.',
          'Possedere un ISEE Università (ISEE-U) in corso di validità non superiore alla soglia definita nel bando (generalmente €20.000 o €25.000).',
          'Essere titolare di un contratto di locazione ad uso abitativo regolarmente registrato presso l\'Agenzia delle Entrate per l\'immobile situato nel comune sede degli studi.',
          'Non usufruire di altri contributi pubblici per l\'alloggio (es. alloggi ADISURC, borse di studio con quota alloggio inclusa).'
        ]
      },
      {
        title: 'Documentazione Necessaria',
        content: 'Prepara con attenzione tutti i documenti in formato PDF prima di avviare la procedura telematica:',
        bullets: [
          'Copia del contratto di locazione registrato con l\'indicazione del canone mensile.',
          'Ricevuta di registrazione del contratto rilasciata dall\'Agenzia delle Entrate (modello RLI).',
          'Attestazione ISEE Università in corso di validità.',
          'Documento di identità valido e codice fiscale del richiedente.',
          'Ricevute o bonifici di pagamento delle mensilità d\'affitto relative al periodo richiesto.'
        ]
      },
      {
        title: 'Come Presentare la Domanda',
        content: 'La procedura è interamente telematica. Lo studente deve accedere al portale dell\'Ateneo (Segrepass o portale specifico indicato nel bando) tramite le proprie credenziali SPID, CIE o account istituzionale. Bisognerà compilare l\'apposita istanza online, inserire i dati del contratto di locazione, dichiarare i canoni mensili versati e allegare tutta la documentazione firmata richiesta.'
      },
      {
        title: 'Scadenze e Tempistiche importanti',
        content: 'I termini di presentazione sono perentori. La domanda online deve essere inviata e protocollata entro la scadenza fissata dal bando d\'Ateneo. Eventuali domande incomplete, non firmate o inviate oltre i termini previsti non saranno prese in considerazione in alcun modo.'
      },
      {
        title: 'Cosa facciamo noi per te',
        content: 'Como Confederazione degli Studenti, i nostri rappresentanti sono presenti in tutti i dipartimenti per aiutarti nella lettura del bando, nella raccolta dei requisiti e nella compilazione della domanda. Se riscontri bug sul portale o hai dubbi specifici sulla tua situazione contrattuale, non esitare a contattarci tramite i nostri canali social!'
      }
    ]
  },
  {
    id: 'guida-immatricolazioni-2026',
    title: 'Immatricolazioni Unina 2026/2027: La Guida Completa Passo-Passo',
    category: 'Matricole',
    date: '10 Luglio 2026',
    readTime: '6 min',
    excerpt: 'Sei una nuova matricola alla Federico II? Ecco la guida definitiva su come registrarsi su Segrepass, pagare le tasse di immatricolazione ed effettuare l\'iscrizione corretta.',
    sections: [
      {
        title: 'Step 1: Registrazione e Accesso a Segrepass',
        content: 'Il primo passo per entrare a far parte del mondo Federico II è accedere al portale Segrepass. Se sei un nuovo studente, consigliamo vivamente di registrarsi tramite il classico pulsante "Registrati" invece di utilizzare SPID o CIE, in quanto l\'integrazione di questi ultimi può risultare instabile per le prime registrazioni. Effettuando la registrazione tradizionale tramite il pulsante apposito, potrai creare subito le tue credenziali d\'accesso personali (Codice Fiscale e Password).'
      },
      {
        title: 'Step 2: Scelta del Corso e Caricamento Documenti',
        content: 'All\'interno di Segrepass, seleziona la voce "Immatricolazione" e scegli il Corso di Studio desiderato (laurea triennale o magistrale a ciclo unico). Dovrai inserire i tuoi dati personali, il diploma di maturità conseguito (con relativa votazione) e caricare una fototessera digitale recente insieme a un documento di identità fronte/retro.'
      },
      {
        title: 'Step 3: Test di Ammissione (TOLC) o Verifica',
        content: 'Ricorda che per molti corsi ad accesso programmato è richiesta l\'iscrizione alla selezione tramite il superamento del TOLC CISIA corrispondente (es. TOLC-I, TOLC-E, TOLC-SU). Per i corsi a numero programmato è fondamentale consultare con attenzione il bando associato sul sito di Ateneo all\'indirizzo: https://www.unina.it/it/didattica/offerta-formativa/corsi-numero-programmato. Per i corsi ad accesso libero, il test ha valore puramente orientativo (valutazione delle conoscenze iniziali) ma è comunque obbligatorio sostenerlo prima o subito dopo l\'immatricolazione.'
      },
      {
        title: 'Step 4: Generazione e Pagamento delle Tasse',
        content: 'Al termine della procedura di immatricolazione, il sistema genererà la prima rata e la tassa regionale tramite la piattaforma PagoPA, calcolate sulla base dell\'attestazione ISEE-U presentata. Il pagamento può essere effettuato online con carta, home banking o fisicamente presso tabaccherie e sportelli abilitati. L\'immatricolazione si ritiene completata solo ad avvenuta ricezione del pagamento.'
      }
    ]
  },
  {
    id: 'isee-universitario-tasse',
    title: 'Tasse Universitarie: Come richiedere la riduzione con l\'ISEE-U',
    category: 'Tasse & Servizi',
    date: '05 Luglio 2026',
    readTime: '5 min',
    excerpt: 'Vuoi pagare le tasse in base al tuo reddito? Scopri come richiedere l\'attestazione ISEE-U all\'INPS e come autorizzare l\'ateneo ad acquisirla automaticamente per evitare tariffe massime.',
    officialUrl: 'https://www.unina.it/it/servizi-e-opportunita/opportunita-e-iniziative/locazioni-studenti-fuori-sede',
    officialUrlLabel: 'Bando Ufficiale su Unina.it',
    instagramPostUrl: 'https://www.instagram.com/p/DaVqT2gow_X/',

    sections: [
      {
        title: 'Cos\'è l\'ISEE Università e perché serve',
        content: 'L\'ISEE Universitario (ISEE-U) è l\'indicatore della situazione economica equivalente del tuo nucleo familiare, specifico per le prestazioni d\'istruzione universitaria. Senza questo documento, l\'ateneo applicherà d\'ufficio l\'aliquota massima di contribuzione prevista per il tuo corso di studi.'
      },
      {
        title: 'Come ottenere l\'attestazione',
        content: 'Puoi richiedere l\'attestazione ISEE-U gratuitamente rivolgendoti a un qualsiasi Centro di Assistenza Fiscale (CAF), tramite un professionista abilitato, oppure compilandolo in autonomia sul portale INPS utilizzando la DSU precompilata. Assicurati che nell\'attestazione sia esplicitamente riportata la dicitura "si applica alle prestazioni agevolate per il diritto allo studio universitario" in favore dello studente richiedente.'
      },
      {
        title: 'Autorizzare la Federico II su Segrepass',
        content: 'Una volta ottenuto l\'ISEE, non occorre consegnarlo cartaceo. Devi accedere a Segrepass, entrare nella sezione relativa ai dati anagrafici/tassazione e inserire il flag di consenso per l\'acquisizione automatica della banca dati INPS. Il sistema verificherà e scaricherà in tempo reale l\'importo del tuo ISEE applicando la corretta fascia di contribuzione.'
      }
    ]
  }
];
