export type VehicleStatus = 'online' | 'offline';
export type GPSStatus = 'active' | 'inactive' | 'low_accuracy';
export type InternetStatus = 'connected' | 'disconnected';

export interface Location {
  latitude: number;
  longitude: number;
  timestamp: Date;
  accuracy: number;
  heading: number;
  speed: number;
}

export interface CurrentTrip {
  tripId: string;
  startTime: Date;
  startLocation: Location;
}

export interface AlertSettings {
  enableSpeedAlert: boolean;
  enableGeofenceAlert: boolean;
  enableOfflineAlert: boolean;
  enableBatteryAlert: boolean;
  enableStopAlert: boolean;
  stopDurationThreshold: number; // minutes
}

export interface VehicleDriver {
  id: string;
  tenantId: string;
  name: string;
  phone: string;
  driverCode: string; // DRV-XXXXXX
  deviceId?: string;
  status: VehicleStatus;
  lastLocation: Location;
  currentTrip: CurrentTrip | null;
  battery: number; // 0-100
  gpsStatus: GPSStatus;
  internetStatus: InternetStatus;
  isMoving: boolean;
  currentSpeed: number;
  lastUpdate: Date;
  offlineThreshold: number; // minutes
  maxSpeed: number; // km/h or mph
  alertSettings: AlertSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateVehicleDriverInput {
  name: string;
  phone: string;
  maxSpeed?: number;
  alertSettings?: Partial<AlertSettings>;
}
