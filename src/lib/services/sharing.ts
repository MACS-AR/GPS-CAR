import { firestoreService } from '../firebase/firestore';
import { rtdbService } from '../firebase/rtdb';
import { nanoid } from 'nanoid';

export interface SharingLink {
  id: string;
  tenantId: string;
  vehicleDriverId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  createdBy: string;
  readOnly: boolean;
  lastAccessedAt?: Date;
}

export const sharingService = {
  async createSharingLink(
    tenantId: string,
    vehicleDriverId: string,
    createdBy: string,
    expirationHours: number = 1
  ): Promise<SharingLink> {
    const linkId = Math.random().toString(36).substring(7);
    const token = nanoid(32);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + expirationHours);

    const link: SharingLink = {
      id: linkId,
      tenantId,
      vehicleDriverId,
      token,
      expiresAt,
      createdAt: new Date(),
      createdBy,
      readOnly: true,
    };

    await firestoreService.setDoc('sharingLinks', linkId, link);
    return link;
  },

  async getSharingLink(linkId: string): Promise<SharingLink | null> {
    return firestoreService.getDoc<SharingLink>('sharingLinks', linkId);
  },

  async getSharingLinkByToken(token: string): Promise<SharingLink | null> {
    const links = await firestoreService.getCollection<SharingLink>('sharingLinks', {
      constraints: [where('token', '==', token)],
    });
    return links[0] || null;
  },

  async revokeSharingLink(linkId: string): Promise<void> {
    await firestoreService.deleteDoc('sharingLinks', linkId);
  },

  async updateLastAccessed(linkId: string): Promise<void> {
    await firestoreService.updateDoc('sharingLinks', linkId, {
      lastAccessedAt: new Date(),
    });
  },

  isLinkExpired(link: SharingLink): boolean {
    return new Date() > link.expiresAt;
  },
};
