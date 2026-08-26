import { firestoreService } from '../firebase/firestore';
import { Notification, NotificationType } from '../types';
import { where, orderBy, limit } from 'firebase/firestore';

export const notificationService = {
  async getNotification(notificationId: string): Promise<Notification | null> {
    return firestoreService.getDoc<Notification>('notifications', notificationId);
  },

  async getNotificationsByTenant(
    tenantId: string,
    limitCount: number = 50
  ): Promise<Notification[]> {
    return firestoreService.getCollection<Notification>('notifications', {
      constraints: [
        where('tenantId', '==', tenantId),
        orderBy('createdAt', 'desc'),
        limit(limitCount),
      ],
    });
  },

  async getNotificationsByUser(
    userId: string,
    limitCount: number = 50
  ): Promise<Notification[]> {
    return firestoreService.getCollection<Notification>('notifications', {
      constraints: [
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limitCount),
      ],
    });
  },

  async getUnreadNotifications(tenantId: string): Promise<Notification[]> {
    return firestoreService.getCollection<Notification>('notifications', {
      constraints: [
        where('tenantId', '==', tenantId),
        where('read', '==', false),
        orderBy('createdAt', 'desc'),
      ],
    });
  },

  async createNotification(
    tenantId: string,
    type: NotificationType,
    title: string,
    body: string,
    userId?: string,
    data?: any
  ): Promise<string> {
    const notificationId = Math.random().toString(36).substring(7);
    await firestoreService.setDoc('notifications', notificationId, {
      tenantId,
      userId,
      type,
      title,
      body,
      data,
      read: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return notificationId;
  },

  async markAsRead(notificationId: string): Promise<void> {
    await firestoreService.updateDoc('notifications', notificationId, {
      read: true,
      readAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async markAllAsRead(tenantId: string): Promise<void> {
    const notifications = await this.getUnreadNotifications(tenantId);
    const operations = notifications.map((notif) => ({
      type: 'update' as const,
      collectionName: 'notifications',
      docId: notif.id,
      data: {
        read: true,
        readAt: new Date(),
        updatedAt: new Date(),
      },
    }));
    if (operations.length > 0) {
      await firestoreService.batchWrite(operations);
    }
  },

  async deleteNotification(notificationId: string): Promise<void> {
    await firestoreService.deleteDoc('notifications', notificationId);
  },

  onTenantNotificationsChange(
    tenantId: string,
    callback: (notifications: Notification[]) => void
  ) {
    return firestoreService.onCollectionSnapshot<Notification>(
      'notifications',
      [where('tenantId', '==', tenantId), orderBy('createdAt', 'desc')],
      callback
    );
  },
};
