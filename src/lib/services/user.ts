import { firestoreService } from '../firebase/firestore';
import { User, CreateUserInput } from '../types';
import { where } from 'firebase/firestore';

export const userService = {
  async getUser(userId: string): Promise<User | null> {
    return firestoreService.getDoc<User>('users', userId);
  },

  async getUsersByTenant(tenantId: string): Promise<User[]> {
    return firestoreService.getCollection<User>('users', {
      constraints: [where('tenantId', '==', tenantId)],
    });
  },

  async createUser(data: Partial<User>): Promise<string> {
    const userId = Math.random().toString(36).substring(7);
    await firestoreService.setDoc('users', userId, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return userId;
  },

  async updateUser(userId: string, data: Partial<User>): Promise<void> {
    await firestoreService.updateDoc('users', userId, {
      ...data,
      updatedAt: new Date(),
    });
  },

  async deleteUser(userId: string): Promise<void> {
    await firestoreService.deleteDoc('users', userId);
  },

  onUserChange(userId: string, callback: (user: User | null) => void) {
    return firestoreService.onDocSnapshot<User>('users', userId, callback);
  },

  onTenantUsersChange(
    tenantId: string,
    callback: (users: User[]) => void
  ) {
    return firestoreService.onCollectionSnapshot<User>(
      'users',
      [where('tenantId', '==', tenantId)],
      callback
    );
  },
};
