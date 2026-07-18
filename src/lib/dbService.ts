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
      return JSON.parse(data);
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

// Recursively remove undefined, null, and empty string properties from objects for Firestore safety
function sanitizeForFirestore<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return undefined as any;
  }
  
  // Use native JSON stringify with a custom replacer to strip out all undefined, null, or empty string values recursively.
  const str = JSON.stringify(obj, (key, value) => {
    if (value === undefined || value === null) {
      return undefined;
    }
    if (typeof value === 'string' && value.trim() === '') {
      return undefined;
    }
    return value;
  });
  
  if (!str) return undefined as any;
  return JSON.parse(str);
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
      
      // Sort guides (some might not have parsed timestamp but we can sort by date or title as secondary)
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
  const sanitizedGuide = sanitizeForFirestore(guide);
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
      const sanitized = sanitizeForFirestore(guide);
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
