import { db, isFirebaseConfigured } from './firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc,
  query,
  orderBy 
} from 'firebase/firestore';
import { Guide, GUIDES_DATA } from '../guidesData';

const COLLECTION_NAME = 'guides';
const LOCAL_STORAGE_KEY = 'confed_guides_data';

// Helper to check if local storage has guides
function getLocalStorageGuides(): Guide[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (data) {
    try {
      const parsed: Guide[] = JSON.parse(data);
      let updated = false;
      for (const defaultGuide of GUIDES_DATA) {
        if (!parsed.some(g => g.id === defaultGuide.id)) {
          parsed.unshift(defaultGuide);
          updated = true;
        }
      }
      if (updated) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
      }
      return parsed;
    } catch (e) {
      console.error('Error parsing local storage guides:', e);
    }
  }
  
  // Seed local storage with default GUIDES_DATA
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(GUIDES_DATA));
  return GUIDES_DATA;
}

// Helper to save guides to local storage
function saveLocalStorageGuides(guides: Guide[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(guides));
}

// Strictly map a Guide to a clean plain object for Firestore safety, ensuring no 'undefined' fields exist
export function prepareGuideForFirestore(guide: any): any {
  if (!guide) return null;
  
  const data: any = {
    id: String(guide.id || '').trim().toLowerCase().replace(/\s+/g, '-'),
    title: String(guide.title || '').trim(),
    category: String(guide.category || 'Borse & Contributi').trim(),
    date: String(guide.date || '').trim(),
    readTime: String(guide.readTime || '').trim(),
    excerpt: String(guide.excerpt || '').trim(),
  };

  if (guide.sections && Array.isArray(guide.sections)) {
    data.sections = guide.sections.map((sec: any) => {
      const cleanSec: any = {
        title: String(sec.title || '').trim(),
        content: String(sec.content || '').trim()
      };
      if (sec.bullets && Array.isArray(sec.bullets)) {
        const cleanBullets = sec.bullets
          .map((b: any) => String(b || '').trim())
          .filter((b: string) => b !== '');
        if (cleanBullets.length > 0) {
          cleanSec.bullets = cleanBullets;
        }
      }
      return cleanSec;
    });
  } else {
    data.sections = [];
  }

  // Only assign optional fields if they have non-empty, valid string values
  if (guide.officialUrl && typeof guide.officialUrl === 'string' && guide.officialUrl.trim() !== '') {
    data.officialUrl = guide.officialUrl.trim();
  }
  if (guide.officialUrlLabel && typeof guide.officialUrlLabel === 'string' && guide.officialUrlLabel.trim() !== '') {
    data.officialUrlLabel = guide.officialUrlLabel.trim();
  }
  if (guide.instagramPostUrl && typeof guide.instagramPostUrl === 'string' && guide.instagramPostUrl.trim() !== '') {
    data.instagramPostUrl = guide.instagramPostUrl.trim();
  }
  if (guide.instagramPostCaption && typeof guide.instagramPostCaption === 'string' && guide.instagramPostCaption.trim() !== '') {
    data.instagramPostCaption = guide.instagramPostCaption.trim();
  }

  return data;
}

let lastFirebaseError: string | null = null;

export function getFirebaseError(): string | null {
  return lastFirebaseError;
}

export async function getGuides(): Promise<Guide[]> {
  if (db) {
    try {
      lastFirebaseError = null;
      const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        // Automatically seed Firestore with default GUIDES_DATA if empty
        console.log('Firestore is empty. Seeding default guides...');
        await seedDefaultGuidesToCloud();
        return GUIDES_DATA;
      }
      
      const guides: Guide[] = [];
      querySnapshot.forEach((docSnap) => {
        guides.push(docSnap.data() as Guide);
      });
      
      // Check if any default GUIDES_DATA item is missing in Firestore and seed it
      for (const defaultGuide of GUIDES_DATA) {
        if (!guides.some(g => g.id === defaultGuide.id)) {
          try {
            const sanitized = prepareGuideForFirestore(defaultGuide);
            await setDoc(doc(db, COLLECTION_NAME, sanitized.id), sanitized);
            guides.unshift(sanitized);
          } catch (err) {
            console.warn(`Failed to seed missing default guide ${defaultGuide.id} to Firestore:`, err);
          }
        }
      }
      
      return guides;
    } catch (error: any) {
      console.error('Error fetching guides from Firestore:', error);
      lastFirebaseError = error?.message || String(error);
      // Fallback to localStorage if firestore permissions fail or network is down
      return getLocalStorageGuides();
    }
  } else {
    return getLocalStorageGuides();
  }
}

export async function saveGuide(guide: Guide): Promise<void> {
  const sanitizedGuide = prepareGuideForFirestore(guide);
  if (db) {
    try {
      lastFirebaseError = null;
      const docRef = doc(db, COLLECTION_NAME, sanitizedGuide.id);
      await setDoc(docRef, sanitizedGuide);
      console.log(`Guide ${sanitizedGuide.id} saved to Firestore successfully.`);
    } catch (error: any) {
      console.error('Error saving guide to Firestore:', error);
      lastFirebaseError = error?.message || String(error);
      // Save locally as fallback
      const local = getLocalStorageGuides();
      const index = local.findIndex((g) => g.id === sanitizedGuide.id);
      if (index > -1) {
        local[index] = sanitizedGuide;
      } else {
        local.push(sanitizedGuide);
      }
      saveLocalStorageGuides(local);
    }
  } else {
    const local = getLocalStorageGuides();
    const index = local.findIndex((g) => g.id === sanitizedGuide.id);
    if (index > -1) {
      local[index] = sanitizedGuide;
    } else {
      local.push(sanitizedGuide);
    }
    saveLocalStorageGuides(local);
  }
}

export async function deleteGuide(id: string): Promise<void> {
  if (db) {
    try {
      lastFirebaseError = null;
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
      console.log(`Guide ${id} deleted from Firestore successfully.`);
    } catch (error: any) {
      console.error('Error deleting guide from Firestore:', error);
      lastFirebaseError = error?.message || String(error);
      // Delete locally as fallback
      const local = getLocalStorageGuides();
      const filtered = local.filter((g) => g.id !== id);
      saveLocalStorageGuides(filtered);
    }
  } else {
    const local = getLocalStorageGuides();
    const filtered = local.filter((g) => g.id !== id);
    saveLocalStorageGuides(filtered);
  }
}

export async function seedDefaultGuidesToCloud(): Promise<void> {
  if (!db) return;
  try {
    lastFirebaseError = null;
    for (const guide of GUIDES_DATA) {
      const sanitized = prepareGuideForFirestore(guide);
      const docRef = doc(db, COLLECTION_NAME, sanitized.id);
      await setDoc(docRef, sanitized);
    }
    console.log('Successfully seeded default guides to Firestore cloud.');
  } catch (error: any) {
    console.error('Failed to seed default guides to cloud:', error);
    lastFirebaseError = error?.message || String(error);
    throw error;
  }
}

export function resetLocalDataToDefaults(): Guide[] {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(GUIDES_DATA));
  return GUIDES_DATA;
}
