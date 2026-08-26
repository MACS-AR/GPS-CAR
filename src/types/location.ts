export interface LocationData {
  tenantId: string;
  vehicleDriverId: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  accuracy: number;
  timestamp: Date;
  batteryLevel: number;
  isMoving: boolean;
  tripId?: string;
}

export interface LocationHistory extends LocationData {
  id: string;
}

export interface LocationStats {
  totalDistance: number;
  averageSpeed: number;
  maxSpeed: number;
  totalStops: number;
  totalMovingTime: number;
  totalStoppedTime: number;
}
