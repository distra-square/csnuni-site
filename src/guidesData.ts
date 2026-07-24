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
    id: 'borse-di-studio-adisurc-2026-2027',
    title: 'Borse di Studio ADISURC 2026/2027: Requisiti, Scadenze e Guida Completa',
    category: 'Borse & Contributi',
    date: '24 Luglio 2026',
    readTime: '6 min',
    excerpt: 'È stato pubblicato il nuovo bando per le Borse di Studio ADISURC della Regione Campania A.A. 2026/2027. Ecco la guida completa con scadenze, requisiti di reddito (ISEE/ISPE), tabella CFU di merito, punti bonus e le regole per l\'ulteriore semestre e il semestre aperto.',
    officialUrl: 'https://www.adisurcampania.it/',
    officialUrlLabel: 'Portale Ufficiale ADISURC Campania',
    instagramPostUrl: 'https://www.instagram.com/p/DbLGaBfDd5t/',
    instagramPostCaption: '🎓 BORSE DI STUDIO ADISURC 2026/2027 🎓\n\nSei uno studente universitario in Campania? È uscito il bando di concorso ADISURC per la borsa di studio erogata dalla Regione Campania!\n\nIn questo post trovi la sintesi completa con scadenze, requisiti ISEE/ISPE, tabella CFU di merito, punti bonus e regole per l\'ulteriore semestre e semestre aperto.\n\n#adisurc #unina #borsadistudio #dirittoallostudio #confed_napoli #campania',
    sections: [
      {
        title: 'Cos\'è la Borsa di Studio ADISURC?',
        content: 'Se sei uno studente della Regione Campania (pendolare, in sede o fuorisede) puoi avere accesso a numerosi benefici. In particolare, se possiedi i requisiti previsti dal bando di concorso ADISURC puoi risultare beneficiario di una BORSA DI STUDIO interamente finanziata dalla Regione e adatta alle tue esigenze di studente universitario.'
      },
      {
        title: 'Come e Dove Presentare la Domanda',
        content: 'La domanda va presentata esclusivamente online su adisurcampania.it accedendo all\'Area Riservata Studenti con la propria identità digitale SPID o CIE ID e cliccando su "Modulo di richiesta benefici 2026/2027" (Domanda online borsa di studio e benefici correlati 2026/2027).',
        bullets: [
          'TERMINE PRESENTAZIONE DOMANDA: Entro le ORE 12:00 DEL 10 SETTEMBRE 2026.',
          'Presentazione per non ancora iscritti: È possibile presentare domanda anche se non si è ancora iscritti all\'A.A. 2026/27. L\'idoneità sarà condizionata dall\'iscrizione entro e non oltre il 31 MARZO 2027 (verificata con le graduatorie assestate).',
          'Attenzione Posto Alloggio: Se concorri per un posto alloggio, devi perfezionare l\'iscrizione universitaria ENTRO IL 20 SETTEMBRE 2026.'
        ]
      },
      {
        title: 'Di cosa ho bisogno per fare domanda?',
        content: 'Prima di avviare la compilazione della domanda online assicurati di avere a disposizione:',
        bullets: [
          'Certificazione ISEEU 2026: sottoscritta, a pena di esclusione, entro la scadenza del bando e disponibile negli archivi INPS.',
          'Conto bancario o carta con IBAN: intestato o cointestato allo studente. L\'IBAN andrà inserito nella propria area personale ADISURC cliccando su "Modifica Codice IBAN" ENTRO E NON OLTRE IL 31 DICEMBRE 2026, pena la rinuncia del beneficio.',
          'Indirizzo PEC: da inserire in fase di domanda online (Confederazione degli Studenti consiglia SpidMail, gratuita in ricezione). N.B. NON è possibile utilizzare la PEC istituzionale Unina.'
        ]
      },
      {
        title: '1. Requisito di Reddito (ISEE e ISPE)',
        content: 'Per risultare idonei al concorso bisogna soddisfare contemporaneamente due tipologie di requisiti. Il primo è il requisito economico:',
        bullets: [
          'ISEE (Indicatore Situazione Economica Equivalente): ≤ €25.500,00',
          'ISPE (Indicatore Situazione Patrimoniale Equivalente): ≤ €54.000,00',
          'Attestazione ISEE applicabile alle prestazioni per il diritto allo studio universitario (ISEE Università) rilasciata obbligatoriamente nell\'anno 2026.',
          '⚠️ IMPORTANTE (Dichiarazione Borse di Studio 2024): Nel caso siano stati percepiti contributi di borse di studio nell\'anno solare 2024 (dal 01/01/2024 al 31/12/2024), tali importi andranno dichiarati nel quadro FC4 della DSU tra i redditi esenti da imposte e inseriti in fase di compilazione della domanda ADISURC.'
        ]
      },
      {
        title: '2. Requisito di Merito (Tabella CFU)',
        content: 'Dovrai conseguire (in caso di iscrizione a un primo anno) o aver conseguito (in caso di iscrizione ad anni successivi al primo) un minimo di Crediti Formativi Universitari (CFU) in base all\'anno di iscrizione 2026/27:',
        bullets: [
          '1° ANNO (Triennali, Magistrali C.U., Magistrali Biennali): 20 CFU. I candidati al 1° anno devono soddisfare il requisito A POSTERIORI: entro il 10/08 successivo per il 100% della borsa, oppure entro il 30/11 successivo per il 50%.',
          '2° ANNO: 25 CFU (Triennali e Magistrali C.U.) | 30 CFU (Magistrali Biennali).',
          '3° ANNO: 80 CFU per tutti i corsi di studio.',
          '4° ANNO: 135 CFU (Triennali Ulteriore Semestre | Magistrali C.U.).',
          '5° ANNO (Magistrali C.U.): 190 CFU.',
          '6° ANNO: 245 CFU (Ulteriore semestre LMCU 5 anni / LMCU 6 anni).',
          '7° ANNO: 300 CFU (Ulteriore semestre LMCU 6 anni).',
          '📌 REGOLA ANNI SUCCESSIVI AL PRIMO: I candidati iscritti ad anni successivi al primo devono soddisfare il requisito di merito A PRIORI entro il 10/08 antecedente la scadenza del bando.'
        ]
      },
      {
        title: 'Punti Bonus per chi non raggiunge i CFU',
        content: 'Gli studenti iscritti ad anni successivi al primo che al 10/08/2026 non possiedono i CFU minimi di merito possono beneficiare dei punti bonus:',
        bullets: [
          '5 Punti Bonus: se utilizzati per la prima volta da iscritti a un secondo anno (il residuo sarà utilizzabile per i concorsi degli anni successivi).',
          '12 Punti Bonus: se utilizzati per la prima volta da iscritti a un terzo anno.',
          '15 Punti Bonus: se utilizzati per la prima volta da iscritti ad anni successivi al terzo.',
          'Corsi Magistrali Biennali: possono utilizzare il bonus residuo maturato e non fruito nel corso della laurea triennale.',
          '⚠️ I punti bonus NON sono assegnabili ai candidati iscritti al primo anno di corso.'
        ]
      },
      {
        title: 'Ulteriore Semestre (Primo anno fuori corso)',
        content: 'Con l\'espressione "ulteriore semestre" ci si riferisce ai candidati iscritti per l\'A.A. 2026/27 al primo anno fuori corso (7° semestre triennale, 5° semestre magistrale biennale, 11° o 13° semestre magistrale a ciclo unico). Gli studenti in ulteriore semestre beneficiano della borsa di studio ridotta del 50%.',
        bullets: [
          'Laureandi in corso 2025/26: Agli studenti in procinto di laurearsi sarà riconosciuta l\'idoneità come ulteriore semestre 2026/27 (anche se laureati nel 2025/26) se la laurea avviene nella sessione straordinaria A.A. 2025/26 e risultano iscritti all\'A.A. 2026/27 ad ulteriore semestre. Concorrono per il 50% della borsa.',
          'Successiva iscrizione a Laurea Magistrale: In caso di successiva iscrizione nel 2026/27 al 1° anno di magistrale, l\'eventuale inserimento nella graduatoria dei primi anni (PA) avviene d\'ufficio dopo verfica in sede di assestamento graduatorie, con adeguamento dell\'importo.'
        ]
      },
      {
        title: 'Semestre Aperto / Semestre Filtro',
        content: 'Gli studenti contemporaneamente iscritti al semestre aperto (o semestre filtro) e ad uno dei corsi affini (art. 2.5 del bando) concorrono alle seguenti condizioni:',
        bullets: [
          'Possono presentare domanda entro il 31 MARZO 2027 (in deroga alla scadenza del 10 settembre 2026).',
          'Sono sospesi in graduatoria fino al perfezionamento dell\'immatricolazione all\'A.A. 2026/27.',
          'Ottengono lo status di studente fuori sede se la permanenza nel posto alloggio a titolo oneroso ha una durata di almeno 3 mesi nel periodo 01/10/2026 - 30/09/2027.',
          'Sono esclusi dal concorso se, concluso il semestre filtro, si immatricolano per il secondo semestre presso un ateneo al di fuori della Regione Campania.'
        ]
      }
    ]
  },
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
