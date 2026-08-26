import { firestoreService } from '../firebase/firestore';
import { Geofence, CreateGeofenceInput } from '../types';
import { where, orderBy } from 'firebase/firestore';

export const geofenceService = {
  async getGeofence(geofenceId: string): Promise<Geofence | null> {
    return firestoreService.getDoc<Geofence>('geofences', geofenceId);
  },

  async getGeofencesByTenant(tenantId: string): Promise<Geofence[]> {
    return firestoreService.getCollection<Geofence>('geofences', {
      constraints: [where('tenantId', '==', tenantId), orderBy('createdAt', 'desc')],
    });
  },

  async createGeofence(
    tenantId: string,
    data: CreateGeofenceInput
  ): Promise<string> {
    const geofenceId = Math.random().toString(36).substring(7);
    await firestoreService.setDoc('geofences', geofenceId, {
      tenantId,
      ...data,
      enabled: true,
      enterAlert: data.enterAlert ?? true,
      exitAlert: data.exitAlert ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return geofenceId;
  },

  async updateGeofence(
    geofenceId: string,
    data: Partial<Geofence>
  ): Promise<void> {
    await firestoreService.updateDoc('geofences', geofenceId, {
      ...data,
      updatedAt: new Date(),
    });
  },

  async deleteGeofence(geofenceId: string): Promise<void> {
    await firestoreService.deleteDoc('geofences', geofenceId);
  },

  async toggleGeofence(geofenceId: string, enabled: boolean): Promise<void> {
    await this.updateGeofence(geofenceId, { enabled });
  },

  onTenantGeofencesChange(
    tenantId: string,
    callback: (geofences: Geofence[]) => void
  ) {
    return firestoreService.onCollectionSnapshot<Geofence>(
      'geofences',
      [where('tenantId', '==', tenantId)],
      callback
    );
  },
};
