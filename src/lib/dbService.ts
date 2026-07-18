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

export async function getGuides(): Promise<Guide[]> {
  if (db) {
    try {
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
    } catch (error) {
      console.error('Error fetching guides from Firestore:', error);
      // Fallback to localStorage if firestore permissions fail or network is down
      return getLocalStorageGuides();
    }
  } else {
    return getLocalStorageGuides();
  }
}

export async function saveGuide(guide: Guide): Promise<void> {
  if (db) {
    try {
      const docRef = doc(db, COLLECTION_NAME, guide.id);
      await setDoc(docRef, guide);
      console.log(`Guide ${guide.id} saved to Firestore successfully.`);
    } catch (error) {
      console.error('Error saving guide to Firestore:', error);
      // Save locally as fallback
      const local = getLocalStorageGuides();
      const index = local.findIndex((g) => g.id === guide.id);
      if (index > -1) {
        local[index] = guide;
      } else {
        local.push(guide);
      }
      saveLocalStorageGuides(local);
    }
  } else {
    const local = getLocalStorageGuides();
    const index = local.findIndex((g) => g.id === guide.id);
    if (index > -1) {
      local[index] = guide;
    } else {
      local.push(guide);
    }
    saveLocalStorageGuides(local);
  }
}

export async function deleteGuide(id: string): Promise<void> {
  if (db) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
      console.log(`Guide ${id} deleted from Firestore successfully.`);
    } catch (error) {
      console.error('Error deleting guide from Firestore:', error);
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
    for (const guide of GUIDES_DATA) {
      const docRef = doc(db, COLLECTION_NAME, guide.id);
      await setDoc(docRef, guide);
    }
    console.log('Successfully seeded default guides to Firestore cloud.');
  } catch (error) {
    console.error('Failed to seed default guides to cloud:', error);
    throw error;
  }
}

export function resetLocalDataToDefaults(): Guide[] {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(GUIDES_DATA));
  return GUIDES_DATA;
}
