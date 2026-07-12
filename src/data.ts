import { 
  Leaf, 
  Building2, 
  Microscope, 
  TrendingUp, 
  Pill, 
  Gavel, 
  Cpu, 
  Stethoscope, 
  Dog, 
  FlaskConical, 
  Globe2, 
  Users, 
  BookOpen 
} from 'lucide-react';

export interface AssociationLink {
  label: string;
  url: string;
  type: 'whatsapp' | 'telegram' | 'link';
}

export interface Association {
  id: string;
  name: string;
  description: string;
  link: string;
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
  telegram?: string;
  logo?: string;
  customLinks?: AssociationLink[];
}

export interface UniversityArea {
  id: string;
  name: string;
  icon: any;
  color: string;
  associations: Association[];
  keywords: string[]; // Keywords for smart search
  courses?: string[]; // List of available degree courses
}

export const UNIVERSITY_AREAS: UniversityArea[] = [
  {
    id: 'agraria',
    name: 'Agraria',
    icon: Leaf,
    color: '#2d6a4f',
    keywords: [
      'agricoltura', 'cibo', 'ambiente', 'terra', 'piante', 'animali', 'territorio',
      'biotecnologie agro-ambientali ed alimentari', 'scienze agrarie, forestali e ambientali',
      'scienze e tecnologie agrarie', 'scienze e tecnologie alimentari', 'scienze enologiche',
      'scienze forestali e ambientali', 'scienze gastronomiche mediterranee', 'sustainable food systems',
      'tecnologie alimentari', 'viticoltura ed enologia', 'agro-ambientali', 'agrarie', 'alimentari', 'gastronomiche'
    ],
    courses: [
      'Biotecnologie Agro-Ambientali ed Alimentari',
      'Scienze Agrarie, Forestali e Ambientali',
      'Scienze e Tecnologie Agrarie',
      'Scienze e Tecnologie Alimentari',
      'Scienze Enologiche',
      'Scienze Forestali e Ambientali',
      'Scienze Gastronomiche Mediterranee',
      'Sustainable food systems',
      'Tecnologie Alimentari',
      'Viticoltura ed Enologia'
    ],
    associations: [
      { 
        id: 'uni-agraria', 
        name: 'UniAgraria', 
        description: 'Associazione di riferimento per il dipartimento di Agraria.', 
        link: 'https://instagram.com/uni_agraria', 
        instagram: 'https://instagram.com/uni_agraria', 
        whatsapp: 'https://chat.whatsapp.com/BlhNnJLbmmbDGESYoVEyOS?s=cl&p=i&ilr=2', 
        logo: '/UNIAGRARIA.png' 
      }
    ]
  },
  {
    id: 'architettura',
    name: 'Architettura',
    icon: Building2,
    color: '#0077b6',
    keywords: [
      'design', 'edifici', 'urbanistica', 'costruzioni', 'arte', 'progettazione',
      'architecture & heritage (archer)', 'architettura (arch5ue)', 'architettura per comunità, territori e ambiente',
      'design for the built environment (dbe)', 'design per la comunità (co.de)',
      'pianificazione territoriale, urbanistica e paesaggistico-ambientale (ptupa)',
      'scienze dell\'architettura (sda)', 'urbanistica sostenibile (urbs)', 'territorio', 'paesaggio'
    ],
    courses: [
      'Architecture & Heritage (ARCHER)',
      'Architettura (ARCH5UE)',
      'Architettura per comunità, territori e ambiente',
      'Design For The Built Environment (DBE)',
      'Design per la Comunità (CO.DE)',
      'Pianificazione Territoriale, Urbanistica e Paesaggistico-Ambientale (PTUPA)',
      'Scienze dell\'architettura (SDA)',
      'Urbanistica Sostenibile (UrbS)'
    ],
    associations: [
      { 
        id: 'archetipi-unina', 
        name: 'Archetipi', 
        description: 'Associazione di riferimento per il dipartimento di Architettura.', 
        link: 'https://instagram.com/archetipi.unina', 
        instagram: 'https://instagram.com/archetipi.unina', 
        whatsapp: 'https://chat.whatsapp.com/EuL6qNSehmx6JDMmMzQa0a?mode=gi_t', 
        logo: '/ARCHETIPI.png' 
      }
    ]
  },
  {
    id: 'biotecnologie',
    name: 'Biotecnologie Mediche',
    icon: Microscope,
    color: '#f9c74f',
    keywords: [
      'dna', 'laboratorio', 'ricerca', 'scienza', 'cellule', 'medica',
      'biotecnologie del farmaco', 'biotecnologie mediche', 'biotecnologie per la salute',
      'farmaco', 'salute'
    ],
    courses: [
      'Biotecnologie del Farmaco',
      'Biotecnologie mediche',
      'Biotecnologie per la salute'
    ],
    associations: [
      { 
        id: 'asbiomed-unina', 
        name: 'AsBioMed', 
        description: 'Associazione di riferimento per Biotecnologie Mediche.', 
        link: 'https://instagram.com/asbiomed_unina', 
        instagram: 'https://instagram.com/asbiomed_unina',
        whatsapp: 'https://chat.whatsapp.com/HJhv4RIEfQ93cI2tlKh22d', 
        logo: '/ASBIOMED.png' 
      }
    ]
  },
  {
    id: 'economia',
    name: 'Economia',
    icon: TrendingUp,
    color: '#43aa8b',
    keywords: [
      'finanza', 'management', 'business', 'marketing', 'soldi', 'impresa', 'aziendale',
      'economia aziendale (l)', 'economia aziendale (lm)', 'economia delle imprese finanziarie (cleif)',
      'economia e commercio (clec)', 'economia e commercio (lmec)', 'economics and finance (lmef)',
      'finanza (lmf)', 'hospitality management', 'innovation and international management',
      'scienze del turismo a indirizzo manageriale (stim)', 'commercio', 'turismo'
    ],
    courses: [
      'Economia Aziendale (L)',
      'Economia Aziendale (LM)',
      'Economia delle Imprese Finanziarie (CLEIF)',
      'Economia e Commercio (CLEC)',
      'Economia e Commercio (LMEC)',
      'Economics and Finance (LMEF)',
      'Finanza (LMF)',
      'Hospitality Management (Professionalizzante)',
      'Innovation and International Management',
      'Scienze del Turismo a Indirizzo Manageriale (STIM)'
    ],
    associations: [
      { 
        id: 'aseconomia', 
        name: 'ASE Economia', 
        description: 'Associazione di riferimento per Economia.', 
        link: 'https://instagram.com/aseconomia', 
        instagram: 'https://instagram.com/aseconomia', 
        logo: '/ASE.png',
        customLinks: [
          { label: 'Gruppi Whatsapp', url: 'https://linktr.ee/confedeconomia', type: 'whatsapp' }
        ]
      }
    ]
  },
  {
    id: 'farmacia',
    name: 'Farmacia',
    icon: Pill,
    color: '#f94144',
    keywords: [
      'farmaci', 'chimica', 'salute', 'laboratorio', 'erboristeria', 'preparazioni',
      'chimica e tecnologia farmaceutiche', 'controllo di qualità', 'farmacia',
      'scienza e tecnologia dell’industria cosmetica', 'scienze e tecnologie erboristiche',
      'scienze nutraceutiche', 'tossicologia chimica e ambientale', 'cosmetica', 'nutraceutica', 'tossicologia'
    ],
    courses: [
      'Chimica e Tecnologia Farmaceutiche',
      'Controllo di Qualità',
      'Farmacia',
      'Scienza e Tecnologia dell’Industria Cosmetica',
      'Scienze e Tecnologie Erboristiche',
      'Scienze Nutraceutiche',
      'Tossicologia Chimica e Ambientale'
    ],
    associations: [
      { 
        id: 'aisf-unina', 
        name: 'AISF Farmacia', 
        description: 'Associazione di riferimento per Farmacia.', 
        link: 'https://instagram.com/aisf_unina', 
        instagram: 'https://instagram.com/aisf_unina', 
        logo: '/AISF.png' 
      }
    ]
  },
  {
    id: 'giurisprudenza',
    name: 'Giurisprudenza',
    icon: Gavel,
    color: '#277da1',
    keywords: [
      'legge', 'avvocato', 'diritto', 'magistrato', 'codice', 'tribunale',
      'giurisprudenza', 'scienze dei servizi giuridici', 'servizi giuridici'
    ],
    courses: [
      'Giurisprudenza',
      'Scienze dei Servizi Giuridici'
    ],
    associations: [
      { 
        id: 'ius-federicoii', 
        name: 'IUS Federico II', 
        description: 'Associazione di riferimento per Giurisprudenza.', 
        link: 'https://instagram.com/ius_federicoii', 
        instagram: 'https://instagram.com/ius_federicoii', 
        whatsapp: 'https://chat.whatsapp.com/LG3npIB5POG18NUtBKNigr?mode=gi_t&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGntdTTWjoGew2leacVzJ1IH7aCK_fU8M1SF1Q2-cy7Y02_0UJMYRy74xnTF_k_aem_NCNAYAZykvCef-P1XxuycA', 
        logo: '/IUS.png' 
      },
      { 
        id: 'us-unina', 
        name: 'US Unina', 
        description: 'Associazione di riferimento per Giurisprudenza.', 
        link: 'https://instagram.com/us.unina', 
        instagram: 'https://instagram.com/usuninagiurisprudenza', 
        whatsapp: 'https://chat.whatsapp.com/JJ0YlGN5618Ew08Q8ck5Fl?s=cl&p=i&mlu=3', 
        logo: '/US.png' 
      }
    ]
  },
  {
    id: 'ingegneria',
    name: 'Ingegneria',
    icon: Cpu,
    color: '#003566',
    keywords: [
      'meccanica', 'informatica', 'elettrica', 'elettronica', 'ambiente', 'ambientale', 'territorio', 'software', 'automazione', 'gestionale', 'civile', 'aerospaziale', 'chimica', 'materiali',
      'autonomous vehicle engineering', 'civil and environmental engineering', 'data science',
      'electrical engineering and information technology', 'geco - ingegneria gestionale delle costruzioni',
      'industrial bioengineering', 'informatica', 'ingegneria aerospaziale', 'ingegneria biomedica',
      'ingegneria chimica', 'ingegneria civile', 'ingegneria civile per l\'idraulica e i trasporti',
      'ingegneria dei materiali', 'ingegneria dei materiali e biomateriali', 'ingegneria dell\'automazione',
      'ingegneria dell\'automazione e robotica', 'ingegneria delle telecomunicazioni e dei media digitali',
      'ingegneria edile - architettura', 'ingegneria edile per la sostenibilità', 'ingegneria elettrica',
      'ingegneria elettronica', 'ingegneria gestionale', 'ingegneria informatica', 'ingegneria meccanica',
      'ingegneria meccanica per l\'energia e l\'ambiente', 'ingegneria meccanica per la progettazione e la produzione',
      'ingegneria navale', 'ingegneria per l\'ambiente e il territorio', 'ingegneria strutturale e geotecnica (strega)',
      'meccatronica', 'tecnologie digitali per le costruzioni', 'transportation engineering and mobility',
      'biomedica', 'robotica', 'telecomunicazioni', 'edile', 'navale', 'strutturale', 'geotecnica', 'trasporti'
    ],
    courses: [
      'Autonomous Vehicle Engineering',
      'Civil and Environmental Engineering',
      'Data Science',
      'Electrical Engineering And Information Technology',
      'GeCo - Ingegneria Gestionale delle Costruzioni',
      'Industrial Bioengineering',
      'Informatica',
      'Ingegneria Aerospaziale',
      'Ingegneria Biomedica',
      'Ingegneria Chimica',
      'Ingegneria Civile',
      'Ingegneria Civile per l\'Idraulica e i Trasporti',
      'Ingegneria dei Materiali',
      'Ingegneria dei Materiali e Biomateriali',
      'Ingegneria dell\'Automazione',
      'Ingegneria dell\'Automazione e Robotica',
      'Ingegneria delle Telecomunicazioni e dei Media Digitali',
      'Ingegneria Edile - Architettura',
      'Ingegneria Edile per la Sostenibilità',
      'Ingegneria Elettrica',
      'Ingegneria Elettronica',
      'Ingegneria Gestionale',
      'Ingegneria Informatica',
      'Ingegneria Meccanica',
      'Ingegneria Meccanica per l\'Energia e l\'Ambiente',
      'Ingegneria Meccanica per la Progettazione e la Produzione',
      'Ingegneria Navale',
      'Ingegneria per l\'Ambiente e il Territorio',
      'Ingegneria Strutturale e Geotecnica (STReGA)',
      'Meccatronica (Professionalizzante)',
      'Tecnologie Digitali per le Costruzioni (Professionalizzante)',
      'Transportation Engineering and Mobility'
    ],
    associations: [
      { 
        id: 'assingegneria', 
        name: 'ASSI Ingegneria', 
        description: 'Associazione di riferimento per Ingegneria ed Informatica alla Federico II.', 
        link: 'https://assingegneria.com/', 
        instagram: 'https://instagram.com/assingegneria', 
        logo: '/ASSI.png',
        customLinks: [
          { label: 'Area Informazione', url: 'https://chat.whatsapp.com/GVHhwIlKfXqJX6gonzkfV8', type: 'whatsapp' },
          { label: 'Area Industriale', url: 'https://chat.whatsapp.com/J0wTjiijBXO62XntQGBCu9', type: 'whatsapp' },
          { label: 'Area Civile', url: 'https://chat.whatsapp.com/KqLhKG54haJBznEW7o5ko3', type: 'whatsapp' }
        ]
      }
    ]
  },
  {
    id: 'medicina',
    name: 'Medicina e Sanità Pubblica',
    icon: Stethoscope,
    color: '#e63946',
    keywords: [
      'chirurgo', 'ospedale', 'salute', 'dottore', 'clinica', 'odontoiatria', 'denti', 'infermiere', 'professioni sanitarie', 'chirurgia',
      'dietistica', 'fisioterapia', 'igiene dentale', 'infermieristica', 'logopedia', 'medicina e chirurgia',
      'medicina e chirurgia ad alta tecnologia', 'medicine and surgery', 'odontoiatria e protesi dentaria',
      'ortottica ed assistenza oftalmologica', 'ostetricia', 'scienze della nutrizione umana',
      'scienze delle professioni sanitarie - area tecnico assistenziale', 'scienze delle professioni sanitarie della prevenzione',
      'scienze delle professioni sanitarie tecniche - area tecnico-diagnostica', 'scienze infermieristiche ed ostetriche',
      'scienze riabilitative delle professioni sanitarie', 'tecniche audiometriche', 'tecniche audioprotesiche',
      'tecniche della prevenzione nell\'ambiente e nei luoghi di lavoro', 'tecniche di fisiopatologia cardiocircolatoria e perfusione cardiovascolare',
      'tecniche di laboratorio biomedico', 'tecniche di neurofisiopatologia', 'tecniche di radiologia medica per immagini e radioterapia',
      'tecniche ortopediche', 'terapia occupazionale', 'nutrizione', 'riabilitazione', 'radiologia', 'ortopedia'
    ],
    courses: [
      'Dietistica',
      'Fisioterapia',
      'Igiene Dentale',
      'Infermieristica',
      'Logopedia',
      'Medicina e Chirurgia',
      'Medicina e Chirurgia ad Alta Tecnologia',
      'Medicine and Surgery',
      'Odontoiatria e Protesi Dentaria',
      'Ortottica ed Assistenza Oftalmologica',
      'Ostetricia',
      'Scienze della nutrizione umana',
      'Scienze delle Professioni Sanitarie - Area Tecnico Assistenziale',
      'Scienze delle Professioni Sanitarie della Prevenzione',
      'Scienze delle Professioni Sanitarie Techniques - Area Tecnico-Diagnostica',
      'Scienze Infermieristiche ed Ostetriche',
      'Scienze Riabilitative delle Professioni Sanitarie',
      'Tecniche Audiometriche',
      'Tecniche Audioprotesiche',
      'Tecniche della Prevenzione nell\'Ambiente e nei Luoghi di Lavoro',
      'Tecniche di Fisiopatologia Cardiocircolatoria e Perfusione Cardiovascolare',
      'Tecniche di Laboratorio biomedico',
      'Tecniche di Neurofisiopatologia',
      'Tecniche di Radiologia Medica per Immagini e Radioterapia',
      'Tecniche Ortopediche',
      'Terapia Occupazionale'
    ],
    associations: [
      { 
        id: 'asmed-unina', 
        name: 'AsMed Medicina', 
        description: 'Medicina e Chirurgia.', 
        link: 'https://instagram.com/asmed__unina', 
        instagram: 'https://instagram.com/asmed__unina', 
        logo: '/ASMED.png',
        customLinks: [
          { label: 'Semestre Filtro', url: 'https://chat.whatsapp.com/B6EsXxCMyyEJJhyvJUWQ21', type: 'whatsapp' }
        ]
      },
      { 
        id: 'imsa-unina', 
        name: 'IMSA Medicine (English)', 
        description: 'Medicine and Surgery (English).', 
        link: 'https://instagram.com/imsa_unina', 
        instagram: 'https://instagram.com/imsa_unina', 
        logo: '/IMSA.png' 
      },
      { 
        id: 'meditec-unina', 
        name: 'Meditec (Medicina Tecnologica)', 
        description: 'Riferimento per Medicina Tecnologica.', 
        link: 'https://instagram.com/meditec_unina', 
        instagram: 'https://instagram.com/meditec_unina', 
        logo: '/MEDTECH.png',
        customLinks: [
          { label: 'Semestre Filtro', url: 'https://chat.whatsapp.com/B6EsXxCMyyEJJhyvJUWQ21', type: 'whatsapp' }
        ]
      },
      { 
        id: 'odonto-unina', 
        name: 'Odonto Unina', 
        description: 'Riferimento per Odontoiatria.', 
        link: 'https://www.instagram.com/odonto_unina/', 
        instagram: 'https://www.instagram.com/odonto_unina/', 
        logo: '/ODONTO.png',
        customLinks: [
          { label: 'Semestre Filtro', url: 'https://chat.whatsapp.com/B6EsXxCMyyEJJhyvJUWQ21', type: 'whatsapp' }
        ]
      },
      { 
        id: 'prof-sanitarie', 
        name: 'Professioni Sanitarie', 
        description: 'Professioni Sanitarie.', 
        link: 'https://instagram.com/professioni_sanitarie_unina', 
        instagram: 'https://instagram.com/professioni_sanitarie_unina', 
        logo: '/PROFESSIONI_SANITARIE.png' 
      },
      { 
        id: 'asinf-unina', 
        name: 'AsInf Scienze Infermieristiche', 
        description: 'Scienze Infermieristiche.', 
        link: 'https://instagram.com/asinf_unina', 
        instagram: 'https://instagram.com/asinf_unina', 
        logo: '/ASINF.png' 
      }
    ]
  },
  {
    id: 'veterinaria',
    name: 'Veterinaria',
    icon: Dog,
    color: '#588157',
    keywords: [
      'animali', 'cani', 'gatti', 'chirurgia veterinaria', 'stalla', 'medicina militare', 'medicina animale',
      'gestione degli animali e delle produzioni', 'medicina veterinaria', 'precision livestock farming',
      'scienze e tecnologie delle produzioni animali', 'veterinary medicine', 'produzioni animali'
    ],
    courses: [
      'Gestione degli Animali e delle Produzioni',
      'Medicina Veterinaria',
      'Precision Livestock Farming',
      'Scienze e Tecnologie delle produzioni animali',
      'Veterinary Medicine'
    ],
    associations: [
      { 
        id: 'medvet-unina', 
        name: 'MedVet Veterinaria', 
        description: 'Associazione di riferimento per Veterinaria.', 
        link: 'https://instagram.com/medvet.unina', 
        instagram: 'https://instagram.com/medvet.unina', 
        logo: '/MEDVET.png',
        customLinks: [
          { label: 'Semestre Filtro', url: 'https://chat.whatsapp.com/BE4dGIEGcyCJ0WZlU8ORK7?s=cl&p=a&ilr=4', type: 'whatsapp' },
          { label: 'Gestione Animali e Produzioni', url: 'https://chat.whatsapp.com/EMuRB9kK19T6POIsABznQ3', type: 'whatsapp' }
        ]
      }
    ]
  },
  {
    id: 'smfn',
    name: 'Scienze MM.FF.NN.',
    icon: FlaskConical,
    color: '#9b5de5',
    keywords: [
      'biologia', 'geologia', 'matematica', 'chimica', 'fisica', 'informatica', 'scienze', 'naturali',
      'biology for one health', 'biology of extreme environments', 'biotecnologie molecolari e industriali',
      'chimica industriale', 'geoscienze per l’ambiente, le risorse e i rischi naturali',
      'industrial chemistry for circular and bio economy', 'marine biology and aquaculture',
      'mathematical engineering', 'ottica e optometria', 'quantum science and engineering',
      'scienze biologiche', 'scienze chimiche', 'scienze e tecnologie della chimica industriale',
      'scienze geologiche', 'scienze naturali', 'scienze per la natura e per l\'ambiente', 'volcanology',
      'ambiente', 'mare', 'ottica'
    ],
    courses: [
      'Biologia',
      'Biology for one health',
      'Biology of extreme environments',
      'Biotecnologie Molecolari e Industriali',
      'Chimica',
      'Chimica Industriale',
      'Fisica',
      'Geoscienze per l’Ambiente, le Risorse e i Rischi Naturali',
      'Industrial Chemistry for Circular and Bio Economy',
      'Marine Biology and Aquaculture',
      'Matematica',
      'Mathematical Engineering',
      'Ottica e Optometria',
      'Quantum Science and Engineering',
      'Scienze Biologiche',
      'Scienze Chimiche',
      'Scienze e Tecnologie della Chimica Industriale',
      'Scienze Geologiche',
      'Scienze Naturali',
      'Scienze per la natura e per l\'ambiente',
      'Volcanology'
    ],
    associations: [
      { 
        id: 'biostudenti-unina', 
        name: 'BioStudenti', 
        description: 'Area Biologia.', 
        link: 'https://instagram.com/biostudenti_unina', 
        instagram: 'https://instagram.com/biostudenti_unina',
        logo: '/BIOSTUDENTI.png',
        customLinks: [
          { label: 'Gruppo Matricole', url: 'https://t.me/matricole_biologia_unina', type: 'telegram' }
        ]         
      },
      { 
        id: 'asgunina', 
        name: 'ASGU', 
        description: 'Area Geologia.', 
        link: 'https://instagram.com/asgunina', 
        instagram: 'https://instagram.com/asgunina', 
        logo: '/ASGU.png' 
      },
      { 
        id: 'asmath-unina', 
        name: 'ASMath', 
        description: 'Area Matematica.', 
        link: 'https://instagram.com/asmath_unina', 
        instagram: 'https://instagram.com/asmath_unina',
        whatsapp: 'https://chat.whatsapp.com/LEfMNzQgB3P8CqHOfFjHGd?s=sw&p=a&mlu=3&amv=0', 
        logo: '/ASMATH.png' 
      },
      { 
        id: 'aschem-unina', 
        name: 'ASChem', 
        description: 'Area Scienze Chimiche.', 
        link: 'https://instagram.com/aschem_unina', 
        instagram: 'https://instagram.com/aschem_unina', 
        logo: '/ASCHEM.png' 
      }
    ]
  },
  {
    id: 'scienze-politiche',
    name: 'Scienze Politiche',
    icon: Globe2,
    color: '#f15bb5',
    keywords: [
      'politica', 'relazioni internazionali', 'sociale', 'governo', 'istituzioni', 'diritto',
      'gestione delle politiche e dei servizi sociali', 'international relations',
      'relazioni internazionali, studi sull\'integrazione europea e per la sostenibilità',
      'scienze criminologiche, investigative e di contrasto ai crimini informatici',
      'scienze del servizio sociale', 'scienze dell\'amministrazione e dell\'organizzazione',
      'scienze della pubblica amministrazione e del lavoro', 'scienze politiche',
      'scienze statistiche per le decisioni', 'statistica e tecnologie per l\'analisi dei dati',
      'servizi sociali', 'criminologia', 'statistica'
    ],
    courses: [
      'Gestione delle Politiche e dei Servizi Sociali',
      'International Relations',
      'Relazioni Internazionali, studi sull\'Integrazione Europea e per la Sostenibilità',
      'Scienze Criminologiche, Investigative e di Contrasto ai Crimini Informatici',
      'Scienze del Servizio Sociale',
      'Scienze dell\'Amministrazione e dell\'Organizzazione',
      'Scienze della Pubblica Amministrazione e del Lavoro',
      'Scienze Politiche',
      'Scienze Statistiche per le Decisioni',
      'Statistica e Tecnologie per l\'Analisi dei Dati'
    ],
    associations: [
      { 
        id: 'scienze-politiche-asu', 
        name: 'ASU Scienze Politiche', 
        description: 'Associazione di riferimento ASU per Scienze Politiche e Sociali.', 
        link: 'https://instagram.com/asu.scienzepolitiche', 
        instagram: 'https://instagram.com/asu.scienzepolitiche', 
        logo: '/ASU.png',
        customLinks: [
          { label: 'Scienze Politiche', url: 'https://chat.whatsapp.com/DmuZcNTPjEPFn3HRTcd7Oa?s=cl&p=a&mlu=1', type: 'whatsapp' },
          { label: 'Servizio Sociale', url: 'https://chat.whatsapp.com/IxyGYS7cWFBArcFU6A7SEh?s=cl&p=a&mlu=1', type: 'whatsapp' },
          { label: 'Statistica', url: 'https://chat.whatsapp.com/FOaL4QjWelF5BZk6dLxwBJ?s=cl&p=a&mlu=1', type: 'whatsapp' },
          { label: 'Scienze dell\'Amministrazione', url: 'https://chat.whatsapp.com/JyH7gOKKkZ3ClGYpye5vem?s=cl&p=a&mlu=1', type: 'whatsapp' }
        ]
      }
    ]
  },
  {
    id: 'scienze-sociali',
    name: 'Scienze Sociali',
    icon: Users,
    color: '#00f5d4',
    keywords: [
      'sociologia', 'comunicazione', 'media', 'giornalismo', 'antropologia', 'vivere comune',
      'comunicazione pubblica, sociale e politica', 'culture digitali e della comunicazione',
      'digital society, social innovation and global citizenship', 'innovazione sociale',
      'scienze antropologiche e geografiche', 'sociologia', 'sociologia digitale e analisi del web',
      'digital', 'geografia', 'web'
    ],
    courses: [
      'Comunicazione Pubblica, Sociale e Politica',
      'Culture Digitali e della Comunicazione',
      'Digital Society, Social Innovation and Global Citizenship',
      'Innovazione Sociale',
      'Scienze antropologiche e geografiche',
      'Sociologia',
      'Sociologia Digitale e Analisi del Web'
    ],
    associations: [
      { id: 'csn-sociali', name: 'Confederazione Napoli', description: 'Associazione di riferimento per Scienze Sociali.', link: 'https://instagram.com/confed_napoli', instagram: 'https://instagram.com/confed_napoli', logo: '/logo.png' }
    ]
  },
  {
    id: 'studi-umanistici',
    name: 'Studi Umanistici',
    icon: BookOpen,
    color: '#f4a261',
    keywords: [
      'lettere', 'filosofia', 'storia', 'archeologia', 'lingue', 'psicologia', 'cultura', 'arte',
      'archeologia del mediterraneo', 'archeologia, storia delle arti e scienze del patrimonio culturale',
      'coordinamento dei servizi educativi per la prima infanzia e per il disagio sociale',
      'discipline della musica e dello spettacolo. storia e teoria.', 'filologia moderna',
      'filologia, letterature e civiltà del mondo antico', 'philosophia', 'languages and literatures for european plurilingualism',
      'lettere classiche', 'lettere moderne', 'lingue, culture e letterature moderne europee',
      'management del patrimonio culturale', 'patrimonio culturale storia delle arti e museologia',
      'psicologia clinica e degli interventi nei contesti sociali e dello sviluppo',
      'scienze e tecniche psicologiche', 'scienze storiche', 'musica', 'spettacolo', 'lettere moderne'
    ],
    courses: [
      'Archeologia del Mediterraneo',
      'Archeologia, Storia delle Arti e Scienze del Patrimonio Culturale',
      'Coordinamento dei Servizi Educativi per la prima Infanzia e per il Disagio Sociale',
      'Discipline della Musica e dello Spettacolo. Storia e Teoria.',
      'Filologia Moderna',
      'Filologia, Letterature e Civiltà del Mondo Antico',
      'Filosofia',
      'Languages and Literatures for European Plurilingualism',
      'Lettere Classiche',
      'Lettere Moderne',
      'Lingue, Culture e Letterature Moderne Europee',
      'Management del Patrimonio Culturale',
      'Patrimonio Culturale Storia delle Arti e Museologia',
      'Psicologia Clinica e degli Interventi nei contesti Sociali e dello Sviluppo',
      'Scienze e Technique Psicologiche',
      'Scienze Storiche',
      'Storia'
    ],
    associations: [
      { id: 'csn-umanistici', name: 'Confederazione Napoli', description: 'Associazione di riferimento per Studi Umanistici.', link: 'https://instagram.com/confed_napoli', instagram: 'https://instagram.com/confed_napoli', logo: '/logo.png' }
    ]
  }
];
