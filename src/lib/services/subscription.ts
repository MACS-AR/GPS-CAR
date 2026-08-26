import { firestoreService } from '../firebase/firestore';
import { Subscription } from '../types';
import { where } from 'firebase/firestore';

export const subscriptionService = {
  async getSubscription(subscriptionId: string): Promise<Subscription | null> {
    return firestoreService.getDoc<Subscription>('subscriptions', subscriptionId);
  },

  async getTenantSubscription(tenantId: string): Promise<Subscription | null> {
    const subscriptions = await firestoreService.getCollection<Subscription>(
      'subscriptions',
      {
        constraints: [where('tenantId', '==', tenantId)],
      }
    );
    return subscriptions[0] || null;
  },

  async createSubscription(data: Partial<Subscription>): Promise<string> {
    const subscriptionId = Math.random().toString(36).substring(7);
    await firestoreService.setDoc('subscriptions', subscriptionId, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return subscriptionId;
  },

  async updateSubscription(
    subscriptionId: string,
    data: Partial<Subscription>
  ): Promise<void> {
    await firestoreService.updateDoc('subscriptions', subscriptionId, {
      ...data,
      updatedAt: new Date(),
    });
  },

  async cancelSubscription(subscriptionId: string): Promise<void> {
    await this.updateSubscription(subscriptionId, {
      status: 'cancelled',
    });
  },

  async renewSubscription(subscriptionId: string, newEndDate: Date): Promise<void> {
    await this.updateSubscription(subscriptionId, {
      status: 'active',
      endDate: newEndDate,
    });
  },

  onSubscriptionChange(
    subscriptionId: string,
    callback: (subscription: Subscription | null) => void
  ) {
    return firestoreService.onDocSnapshot<Subscription>(
      'subscriptions',
      subscriptionId,
      callback
    );
  },
};
