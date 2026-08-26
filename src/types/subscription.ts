export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled';
export type BillingCycle = 'monthly' | 'yearly';

export interface SubscriptionPlan {
  id: string;
  name: string;
  maxVehicles: number;
  maxUsers: number;
  price: number;
  currency: string;
  billingCycle: BillingCycle;
  features: string[];
}

export interface Subscription {
  id: string;
  tenantId: string;
  planId: string;
  planName: string;
  status: SubscriptionStatus;
  maxVehicles: number;
  maxUsers: number;
  price: number;
  currency: string;
  billingCycle: BillingCycle;
  autoRenew: boolean;
  startDate: Date;
  endDate: Date;
  trialDaysRemaining: number;
  createdAt: Date;
  updatedAt: Date;
}
