import { firestoreService } from '../firebase/firestore';
import { Invoice } from '../types';
import { where, orderBy, limit } from 'firebase/firestore';

export const billingService = {
  async getInvoice(invoiceId: string): Promise<Invoice | null> {
    return firestoreService.getDoc<Invoice>('billing', invoiceId);
  },

  async getInvoicesByTenant(
    tenantId: string,
    limitCount: number = 50
  ): Promise<Invoice[]> {
    return firestoreService.getCollection<Invoice>('billing', {
      constraints: [
        where('tenantId', '==', tenantId),
        orderBy('billingDate', 'desc'),
        limit(limitCount),
      ],
    });
  },

  async getPaidInvoices(tenantId: string): Promise<Invoice[]> {
    return firestoreService.getCollection<Invoice>('billing', {
      constraints: [
        where('tenantId', '==', tenantId),
        where('status', '==', 'paid'),
        orderBy('billingDate', 'desc'),
      ],
    });
  },

  async getPendingInvoices(tenantId: string): Promise<Invoice[]> {
    return firestoreService.getCollection<Invoice>('billing', {
      constraints: [
        where('tenantId', '==', tenantId),
        where('status', '==', 'pending'),
        orderBy('dueDate', 'asc'),
      ],
    });
  },

  async createInvoice(data: Partial<Invoice>): Promise<string> {
    const invoiceId = Math.random().toString(36).substring(7);
    await firestoreService.setDoc('billing', invoiceId, {
      ...data,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return invoiceId;
  },

  async markAsPaid(invoiceId: string): Promise<void> {
    await firestoreService.updateDoc('billing', invoiceId, {
      status: 'paid',
      paidAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async markAsFailed(invoiceId: string): Promise<void> {
    await firestoreService.updateDoc('billing', invoiceId, {
      status: 'failed',
      updatedAt: new Date(),
    });
  },

  onBillingChange(
    tenantId: string,
    callback: (invoices: Invoice[]) => void
  ) {
    return firestoreService.onCollectionSnapshot<Invoice>(
      'billing',
      [where('tenantId', '==', tenantId), orderBy('billingDate', 'desc')],
      callback
    );
  },
};
