import { UserRole } from '../types';
import { ROLE_PERMISSIONS } from '../constants/roles';

export const hasPermission = (role: UserRole, permission: string): boolean => {
  const permissions = ROLE_PERMISSIONS[role];
  return (permissions as any)[permission] === true;
};

export const hasAnyPermission = (role: UserRole, permissions: string[]): boolean => {
  return permissions.some((permission) => hasPermission(role, permission));
};

export const hasAllPermissions = (role: UserRole, permissions: string[]): boolean => {
  return permissions.every((permission) => hasPermission(role, permission));
};
