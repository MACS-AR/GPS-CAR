export type ReportType =
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'trips'
  | 'speed'
  | 'distance'
  | 'stops'
  | 'alerts';

export interface ReportFilter {
  vehicleDriverId?: string;
  startDate: Date;
  endDate: Date;
  type: ReportType;
}

export interface ReportData {
  totalTrips: number;
  totalDistance: number;
  totalDuration: number;
  averageSpeed: number;
  maxSpeed: number;
  totalStops: number;
  totalMovingTime: number;
  totalStoppedTime: number;
  alerts: number;
  geofenceViolations: number;
}

export interface ChartData {
  label: string;
  value: number;
  timestamp?: Date;
}
