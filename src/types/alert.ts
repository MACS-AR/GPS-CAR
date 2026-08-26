export type AlertType =
  | 'speed_violation'
  | 'geofence_enter'
  | 'geofence_exit'
  | 'offline'
  | 'battery_low'
  | 'fake_gps'
  | 'app_old_version'
  | 'sync_failure'
  | 'stop_duration'
  | 'outside_hours';

export type AlertSeverity = 'info' | 'warning' | 'critical';

export interface Alert {
  id: string;
  tenantId: string;
  vehicleDriverId: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  data: Record<string, any>;
  timestamp: Date;
  read: boolean;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AlertSettings {
  speedViolation: boolean;
  geofenceEnter: boolean;
  geofenceExit: boolean;
  offline: boolean;
  batteryLow: boolean;
  fakeGPS: boolean;
  appOldVersion: boolean;
  syncFailure: boolean;
  stopDuration: boolean;
  outsideHours: boolean;
}
