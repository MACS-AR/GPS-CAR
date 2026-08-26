export type TenantType = 'company' | 'individual';
export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled';
export type SpeedUnit = 'km/h' | 'mph';
export type DistanceUnit = 'km' | 'mi';

export interface Tenant {
  id: string;
  type: TenantType;
  name: string;
  email: string;
  phone: string;
  logo?: string;
  province?: string; // للشركات
  activityType?: string; // للشركات
  expectedVehicles?: number; // للشركات
  timezone: string;
  speedUnit: SpeedUnit;
  distanceUnit: DistanceUnit;
  maxVehicles: number;
  subscriptionStatus: SubscriptionStatus;
  subscriptionStartDate: Date;
  subscriptionEndDate: Date;
  createdAt: Date;
  updatedAt: Date;
  settings: TenantSettings;
}

export interface TenantSettings {
  maxSpeed: number;
  offlineTimeout: number; // minutes
  stopTimeout: number; // minutes
  enableAlerts: boolean;
  enableGeofencing: boolean;
  enableReports: boolean;
  enableSharing: boolean;
}
