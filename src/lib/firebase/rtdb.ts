import {
  ref,
  set,
  get,
  update,
  remove,
  onValue,
  off,
  query as dbQuery,
  orderByChild,
  limitToFirst,
  limitToLast,
} from 'firebase/database';
import { database } from './config';

export const rtdbService = {
  // Set data
  async set(path: string, data: any) {
    return set(ref(database, path), data);
  },

  // Get data once
  async get(path: string) {
    const snapshot = await get(ref(database, path));
    return snapshot.val();
  },

  // Update data
  async update(path: string, data: any) {
    return update(ref(database, path), data);
  },

  // Delete data
  async remove(path: string) {
    return remove(ref(database, path));
  },

  // Real-time listener
  onValue(path: string, callback: (data: any) => void) {
    const dbRef = ref(database, path);
    onValue(dbRef, (snapshot) => {
      callback(snapshot.val());
    });

    // Return unsubscribe function
    return () => off(dbRef);
  },

  // Get current path reference
  getRef(path: string) {
    return ref(database, path);
  },
};
