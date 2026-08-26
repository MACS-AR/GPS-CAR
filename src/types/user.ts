export type UserRole = 'owner' | 'admin' | 'dispatcher' | 'viewer' | 'accountant';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: string;
  tenantId: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  lastLogin?: Date;
  permissions: UserPermissions;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPermissions {
  canViewVehicles: boolean;
  canAddVehicles: boolean;
  canDeleteVehicles: boolean;
  canViewTrips: boolean;
  canViewReports: boolean;
  canManageUsers: boolean;
  canManageGeofences: boolean;
  canViewBilling: boolean;
  canManageSubscription: boolean;
  canViewSupport: boolean;
  canCreateSupport: boolean;
}

export interface AuthUser {
  uid: string;
  email: string;
  emailVerified: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  tenant: any | null;
  role: UserRole | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
