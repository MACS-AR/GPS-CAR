export type TripStatus = 'active' | 'completed' | 'cancelled';

export interface Stop {
  timestamp: Date;
  location: {
    latitude: number;
    longitude: number;
  };
  duration: number; // seconds
  address?: string;
}

export interface Trip {
  id: string;
  tenantId: string;
  vehicleDriverId: string;
  startTime: Date;
  endTime?: Date;
  startLocation: {
    latitude: number;
    longitude: number;
  };
  endLocation?: {
    latitude: number;
    longitude: number;
  };
  distance: number; // km or mi
  duration: number; // seconds
  averageSpeed: number;
  maxSpeed: number;
  stops: Stop[];
  polyline: string; // encoded Google polyline
  status: TripStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface TripFilter {
  vehicleDriverId?: string;
  startDate?: Date;
  endDate?: Date;
  status?: TripStatus;
}

export interface TripStats {
  totalTrips: number;
  totalDistance: number;
  totalDuration: number; // seconds
  averageSpeed: number;
  maxSpeed: number;
  totalStops: number;
}
