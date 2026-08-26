import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  QueryConstraint,
  writeBatch,
} from 'firebase/firestore';
import { firestore } from './config';

interface QueryOptions {
  constraints?: QueryConstraint[];
  limit?: number;
  cursor?: any;
}

export const firestoreService = {
  // Create or Set
  async setDoc<T>(collectionName: string, docId: string, data: T) {
    return setDoc(doc(firestore, collectionName, docId), data);
  },

  // Get Single Document
  async getDoc<T>(collectionName: string, docId: string): Promise<T | null> {
    const docSnap = await getDoc(doc(firestore, collectionName, docId));
    return docSnap.exists() ? (docSnap.data() as T) : null;
  },

  // Get Collection with Pagination
  async getCollection<T>(
    collectionName: string,
    options: QueryOptions = {}
  ): Promise<T[]> {
    const constraints = options.constraints || [];
    if (options.limit) {
      constraints.push(limit(options.limit));
    }
    if (options.cursor) {
      constraints.push(startAfter(options.cursor));
    }

    const q = query(collection(firestore, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as T));
  },

  // Real-time Listener
  onDocSnapshot<T>(collectionName: string, docId: string, callback: (data: T | null) => void) {
    return onSnapshot(doc(firestore, collectionName, docId), (docSnap) => {
      callback(docSnap.exists() ? (docSnap.data() as T) : null);
    });
  },

  onCollectionSnapshot<T>(
    collectionName: string,
    constraints: QueryConstraint[] = [],
    callback: (data: T[]) => void
  ) {
    const q = query(collection(firestore, collectionName), ...constraints);
    return onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as T));
      callback(data);
    });
  },

  // Update
  async updateDoc(collectionName: string, docId: string, data: any) {
    return updateDoc(doc(firestore, collectionName, docId), data);
  },

  // Delete
  async deleteDoc(collectionName: string, docId: string) {
    return deleteDoc(doc(firestore, collectionName, docId));
  },

  // Batch Write
  async batchWrite(operations: Array<{ type: 'set' | 'update' | 'delete'; collectionName: string; docId: string; data?: any }>) {
    const batch = writeBatch(firestore);

    operations.forEach((op) => {
      const docRef = doc(firestore, op.collectionName, op.docId);
      if (op.type === 'set') {
        batch.set(docRef, op.data);
      } else if (op.type === 'update') {
        batch.update(docRef, op.data);
      } else if (op.type === 'delete') {
        batch.delete(docRef);
      }
    });

    return batch.commit();
  },
};
