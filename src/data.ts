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

export interface Association {
  id: string;
  name: string;
  description: string;
  link: string;
  instagram?: string;
  facebook?: string;
}

export interface UniversityArea {
  id: string;
  name: string;
  icon: any;
  color: string;
  associations: Association[];
  keywords: string[]; // Keywords for smart search
}

export const UNIVERSITY_AREAS: UniversityArea[] = [
  {
    id: 'agraria',
    name: 'Agraria',
    icon: Leaf,
    color: '#2d6a4f',
    keywords: ['agricoltura', 'cibo', 'ambiente', 'terra', 'piante', 'animali', 'territorio'],
    associations: [
      { id: 'uni-agraria', name: 'UniAgraria', description: 'Associazione di riferimento per il dipartimento di Agraria.', link: 'https://instagram.com/uni_agraria', instagram: 'https://instagram.com/uni_agraria' }
    ]
  },
  {
    id: 'architettura',
    name: 'Architettura',
    icon: Building2,
    color: '#0077b6',
    keywords: ['design', 'edifici', 'urbanistica', 'costruzioni', 'arte', 'progettazione'],
    associations: [
      { id: 'archetipi-unina', name: 'Archetipi', description: 'Associazione di riferimento per il dipartimento di Architettura.', link: 'https://instagram.com/archetipi.unina', instagram: 'https://instagram.com/archetipi.unina' }
    ]
  },
  {
    id: 'biotecnologie',
    name: 'Biotecnologie Mediche',
    icon: Microscope,
    color: '#f9c74f',
    keywords: ['dna', 'laboratorio', 'ricerca', 'scienza', 'cellule', 'medica'],
    associations: [
      { id: 'asbiomed-unina', name: 'AsBioMed', description: 'Associazione di riferimento per Biotecnologie Mediche.', link: 'https://instagram.com/asbiomed_unina', instagram: 'https://instagram.com/asbiomed_unina' }
    ]
  },
  {
    id: 'economia',
    name: 'Economia',
    icon: TrendingUp,
    color: '#43aa8b',
    keywords: ['finanza', 'management', 'business', 'marketing', 'soldi', 'impresa', 'aziendale'],
    associations: [
      { id: 'aseconomia', name: 'ASE Economia', description: 'Associazione di riferimento per Economia.', link: 'https://instagram.com/aseconomia', instagram: 'https://instagram.com/aseconomia' }
    ]
  },
  {
    id: 'farmacia',
    name: 'Farmacia',
    icon: Pill,
    color: '#f94144',
    keywords: ['farmaci', 'chimica', 'salute', 'laboratorio', 'erboristeria', 'preparazioni'],
    associations: [
      { id: 'aisf-unina', name: 'AISF Farmacia', description: 'Associazione di riferimento per Farmacia.', link: 'https://instagram.com/aisf_unina', instagram: 'https://instagram.com/aisf_unina' }
    ]
  },
  {
    id: 'giurisprudenza',
    name: 'Giurisprudenza',
    icon: Gavel,
    color: '#277da1',
    keywords: ['legge', 'avvocato', 'diritto', 'magistrato', 'codice', 'tribunale'],
    associations: [
      { id: 'ius-federicoii', name: 'IUS Federico II', description: 'Associazione di riferimento per Giurisprudenza.', link: 'https://instagram.com/ius_federicoii', instagram: 'https://instagram.com/ius_federicoii' },
      { id: 'us-unina', name: 'US Unina', description: 'Associazione di riferimento per Giurisprudenza.', link: 'https://instagram.com/us.unina', instagram: 'https://instagram.com/us.unina' }
    ]
  },
  {
    id: 'ingegneria',
    name: 'Ingegneria',
    icon: Cpu,
    color: '#003566',
    keywords: ['meccanica', 'informatica', 'elettrica', 'elettronica', 'ambiente', 'ambientale', 'territorio', 'software', 'automazione', 'gestionale', 'civile', 'aerospaziale', 'chimica', 'materiali'],
    associations: [
      { id: 'assingegneria', name: 'ASSI Ingegneria', description: 'Associazione di riferimento per Ingegneria e Informatica.', link: 'https://instagram.com/assingegneria', instagram: 'https://instagram.com/assingegneria' }
    ]
  },
  {
    id: 'medicina',
    name: 'Medicina e Sanità Pubblica',
    icon: Stethoscope,
    color: '#e63946',
    keywords: ['chirurgo', 'ospedale', 'salute', 'dottore', 'clinica', 'odontoiatria', 'denti', 'infermiere', 'professioni sanitarie', 'chirurgia'],
    associations: [
      { id: 'asmed-unina', name: 'AsMed Medicina', description: 'Medicina e Chirurgia.', link: 'https://instagram.com/asmed__unina', instagram: 'https://instagram.com/asmed__unina' },
      { id: 'imsa-unina', name: 'IMSA Medicina (Inglese)', description: 'Medicine and Surgery (English).', link: 'https://instagram.com/imsa_unina', instagram: 'https://instagram.com/imsa_unina' },
      { id: 'meditec-unina', name: 'Meditec (Medicina Tecnologica)', description: 'Medicina Tecnologica.', link: 'https://instagram.com/meditec_unina', instagram: 'https://instagram.com/meditec_unina' },
      { id: 'aiso-napoli', name: 'AISO Odontoiatria', description: 'Associazione Italiana Studenti Odontoiatria.', link: 'https://instagram.com/aiso_napoli_federicoii', instagram: 'https://instagram.com/aiso_napoli_federicoii' },
      { id: 'prof-sanitarie', name: 'Professioni Sanitarie', description: 'Professioni Sanitarie.', link: 'https://instagram.com/professioni_sanitarie_unina', instagram: 'https://instagram.com/professioni_sanitarie_unina' },
      { id: 'asinf-unina', name: 'AsInf Scienze Infermieristiche', description: 'Scienze Infermieristiche.', link: 'https://instagram.com/asinf_unina', instagram: 'https://instagram.com/asinf_unina' }
    ]
  },
  {
    id: 'veterinaria',
    name: 'Veterinaria',
    icon: Dog,
    color: '#588157',
    keywords: ['animali', 'cani', 'gatti', 'chirurgia veterinaria', 'stalla', 'medicina animale'],
    associations: [
      { id: 'medvet-unina', name: 'MedVet Veterinaria', description: 'Associazione di riferimento per Veterinaria.', link: 'https://instagram.com/medvet.unina', instagram: 'https://instagram.com/medvet.unina' }
    ]
  },
  {
    id: 'smfn',
    name: 'Scienze MM.FF.NN.',
    icon: FlaskConical,
    color: '#9b5de5',
    keywords: ['biologia', 'geologia', 'matematica', 'chimica', 'fisica', 'informatica', 'scienze', 'naturali'],
    associations: [
      { id: 'biostudenti-unina', name: 'BioStudenti', description: 'Area Biologia.', link: 'https://instagram.com/biostudenti_unina', instagram: 'https://instagram.com/biostudenti_unina' },
      { id: 'asgunina', name: 'ASGU', description: 'Area Geologia.', link: 'https://instagram.com/asgunina', instagram: 'https://instagram.com/asgunina' },
      { id: 'asmath-unina', name: 'ASMath', description: 'Area Matematica.', link: 'https://instagram.com/asmath_unina', instagram: 'https://instagram.com/asmath_unina' },
      { id: 'aschem-unina', name: 'ASChem', description: 'Area Scienze Chimiche.', link: 'https://instagram.com/aschem_unina', instagram: 'https://instagram.com/aschem_unina' }
    ]
  },
  {
    id: 'scienze-politiche',
    name: 'Scienze Politiche',
    icon: Globe2,
    color: '#f15bb5',
    keywords: ['politica', 'relazioni internazionali', 'sociale', 'governo', 'istituzioni', 'diritto'],
    associations: [
      { id: 'scienze-politiche-asu', name: 'ASU Scienze Politiche', description: 'Associazione di riferimento per Scienze Politiche.', link: 'https://instagram.com/asu.scienzepolitiche', instagram: 'https://instagram.com/asu.scienzepolitiche' }
    ]
  },
  {
    id: 'scienze-sociali',
    name: 'Scienze Sociali',
    icon: Users,
    color: '#00f5d4',
    keywords: ['sociologia', 'comunicazione', 'media', 'giornalismo', 'antropologia', 'vivere comune'],
    associations: [
      { id: 'csn-sociali', name: 'Confederazione Napoli', description: 'Associazione di riferimento per Scienze Sociali.', link: 'https://instagram.com/confed_napoli', instagram: 'https://instagram.com/confed_napoli' }
    ]
  },
  {
    id: 'studi-umanistici',
    name: 'Studi Umanistici',
    icon: BookOpen,
    color: '#f4a261',
    keywords: ['lettere', 'filosofia', 'storia', 'archeologia', 'lingue', 'psicologia', 'cultura', 'arte'],
    associations: [
      { id: 'csn-umanistici', name: 'Confederazione Napoli', description: 'Associazione di riferimento per Studi Umanistici.', link: 'https://instagram.com/confed_napoli', instagram: 'https://instagram.com/confed_napoli' }
    ]
  }
];
