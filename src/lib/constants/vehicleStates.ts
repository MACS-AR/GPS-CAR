export const VEHICLE_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
} as const;

export const VEHICLE_STATUS_LABELS = {
  [VEHICLE_STATUS.ONLINE]: 'متصل',
  [VEHICLE_STATUS.OFFLINE]: 'غير متصل',
} as const;

export const VEHICLE_STATUS_COLORS = {
  [VEHICLE_STATUS.ONLINE]: '#10b981',
  [VEHICLE_STATUS.OFFLINE]: '#6b7280',
} as const;

export const MOVEMENT_STATUS = {
  MOVING: 'moving',
  STOPPED: 'stopped',
  OFFLINE: 'offline',
  ALERT: 'alert',
} as const;

export const MOVEMENT_STATUS_LABELS = {
  [MOVEMENT_STATUS.MOVING]: 'تتحرك',
  [MOVEMENT_STATUS.STOPPED]: 'متوقفة',
  [MOVEMENT_STATUS.OFFLINE]: 'غير متصلة',
  [MOVEMENT_STATUS.ALERT]: 'تنبيه',
} as const;

export const MOVEMENT_STATUS_COLORS = {
  [MOVEMENT_STATUS.MOVING]: '#3b82f6',
  [MOVEMENT_STATUS.STOPPED]: '#f59e0b',
  [MOVEMENT_STATUS.OFFLINE]: '#000000',
  [MOVEMENT_STATUS.ALERT]: '#ef4444',
} as const;

export const MOVEMENT_STATUS_ICONS = {
  [MOVEMENT_STATUS.MOVING]: '🟢',
  [MOVEMENT_STATUS.STOPPED]: '🟡',
  [MOVEMENT_STATUS.OFFLINE]: '⚫',
  [MOVEMENT_STATUS.ALERT]: '🔴',
} as const;
