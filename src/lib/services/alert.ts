import { firestoreService } from '../firebase/firestore';
import { Alert, AlertType, AlertSeverity } from '../types';
import { where, orderBy, limit } from 'firebase/firestore';

export const alertService = {
  async getAlert(alertId: string): Promise<Alert | null> {
    return firestoreService.getDoc<Alert>('alerts', alertId);
  },

  async getAlertsByVehicle(
    tenantId: string,
    vehicleDriverId: string,
    limitCount: number = 50
  ): Promise<Alert[]> {
    return firestoreService.getCollection<Alert>('alerts', {
      constraints: [
        where('tenantId', '==', tenantId),
        where('vehicleDriverId', '==', vehicleDriverId),
        orderBy('timestamp', 'desc'),
        limit(limitCount),
      ],
    });
  },

  async getUnreadAlerts(tenantId: string): Promise<Alert[]> {
    return firestoreService.getCollection<Alert>('alerts', {
      constraints: [
        where('tenantId', '==', tenantId),
        where('read', '==', false),
        orderBy('timestamp', 'desc'),
      ],
    });
  },

  async createAlert(
    tenantId: string,
    vehicleDriverId: string,
    type: AlertType,
    severity: AlertSeverity,
    message: string,
    data: any = {}
  ): Promise<string> {
    const alertId = Math.random().toString(36).substring(7);
    await firestoreService.setDoc('alerts', alertId, {
      tenantId,
      vehicleDriverId,
      type,
      severity,
      message,
      data,
      timestamp: new Date(),
      read: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return alertId;
  },

  async markAsRead(alertId: string): Promise<void> {
    await firestoreService.updateDoc('alerts', alertId, {
      read: true,
      readAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async markMultipleAsRead(alertIds: string[]): Promise<void> {
    const operations = alertIds.map((alertId) => ({
      type: 'update' as const,
      collectionName: 'alerts',
      docId: alertId,
      data: {
        read: true,
        readAt: new Date(),
        updatedAt: new Date(),
      },
    }));
    await firestoreService.batchWrite(operations);
  },

  async deleteAlert(alertId: string): Promise<void> {
    await firestoreService.deleteDoc('alerts', alertId);
  },

  onTenantAlertsChange(
    tenantId: string,
    callback: (alerts: Alert[]) => void
  ) {
    return firestoreService.onCollectionSnapshot<Alert>(
      'alerts',
      [where('tenantId', '==', tenantId), orderBy('timestamp', 'desc')],
      callback
    );
  },

  onVehicleAlertsChange(
    tenantId: string,
    vehicleDriverId: string,
    callback: (alerts: Alert[]) => void
  ) {
    return firestoreService.onCollectionSnapshot<Alert>(
      'alerts',
      [
        where('tenantId', '==', tenantId),
        where('vehicleDriverId', '==', vehicleDriverId),
        orderBy('timestamp', 'desc'),
      ],
      callback
    );
  },
};
