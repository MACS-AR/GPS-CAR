import { firestoreService } from '../firebase/firestore';
import { Tenant } from '../types';
import { where, orderBy, limit } from 'firebase/firestore';

export const tenantService = {
  async getTenant(tenantId: string): Promise<Tenant | null> {
    return firestoreService.getDoc<Tenant>('tenants', tenantId);
  },

  async createTenant(data: Partial<Tenant>): Promise<string> {
    const tenantId = Math.random().toString(36).substring(7);
    await firestoreService.setDoc('tenants', tenantId, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return tenantId;
  },

  async updateTenant(tenantId: string, data: Partial<Tenant>): Promise<void> {
    await firestoreService.updateDoc('tenants', tenantId, {
      ...data,
      updatedAt: new Date(),
    });
  },

  async getTenantSettings(tenantId: string) {
    const tenant = await this.getTenant(tenantId);
    return tenant?.settings || {};
  },

  async updateTenantSettings(tenantId: string, settings: any): Promise<void> {
    await firestoreService.updateDoc('tenants', tenantId, {
      settings,
      updatedAt: new Date(),
    });
  },

  onTenantChange(tenantId: string, callback: (tenant: Tenant | null) => void) {
    return firestoreService.onDocSnapshot<Tenant>('tenants', tenantId, callback);
  },
};
