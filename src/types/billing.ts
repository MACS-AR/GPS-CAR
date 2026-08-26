export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'cancelled';

export interface Invoice {
  id: string;
  tenantId: string;
  subscriptionId: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  billingDate: Date;
  dueDate: Date;
  paidAt?: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
