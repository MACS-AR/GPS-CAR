import { firestoreService } from '../firebase/firestore';
import { Trip, TripFilter, TripStats } from '../types';
import { where, orderBy, limit } from 'firebase/firestore';

export const tripService = {
  async getTrip(tripId: string): Promise<Trip | null> {
    return firestoreService.getDoc<Trip>('trips', tripId);
  },

  async getTripsByVehicle(
    tenantId: string,
    vehicleDriverId: string,
    limitCount: number = 50
  ): Promise<Trip[]> {
    return firestoreService.getCollection<Trip>('trips', {
      constraints: [
        where('tenantId', '==', tenantId),
        where('vehicleDriverId', '==', vehicleDriverId),
        orderBy('startTime', 'desc'),
        limit(limitCount),
      ],
    });
  },

  async getTripsByFilter(
    tenantId: string,
    filter: TripFilter,
    limitCount: number = 50
  ): Promise<Trip[]> {
    const constraints = [where('tenantId', '==', tenantId)];

    if (filter.vehicleDriverId) {
      constraints.push(where('vehicleDriverId', '==', filter.vehicleDriverId));
    }

    if (filter.startDate && filter.endDate) {
      constraints.push(where('startTime', '>=', filter.startDate));
      constraints.push(where('startTime', '<=', filter.endDate));
    }

    if (filter.status) {
      constraints.push(where('status', '==', filter.status));
    }

    constraints.push(orderBy('startTime', 'desc'));
    constraints.push(limit(limitCount));

    return firestoreService.getCollection<Trip>('trips', { constraints });
  },

  async createTrip(data: Partial<Trip>): Promise<string> {
    const tripId = Math.random().toString(36).substring(7);
    await firestoreService.setDoc('trips', tripId, {
      ...data,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return tripId;
  },

  async updateTrip(tripId: string, data: Partial<Trip>): Promise<void> {
    await firestoreService.updateDoc('trips', tripId, {
      ...data,
      updatedAt: new Date(),
    });
  },

  async endTrip(
    tripId: string,
    endData: {
      endTime: Date;
      endLocation: { latitude: number; longitude: number };
      distance: number;
      averageSpeed: number;
      maxSpeed: number;
      duration: number;
    }
  ): Promise<void> {
    await this.updateTrip(tripId, {
      ...endData,
      status: 'completed',
    });
  },

  async deleteTrip(tripId: string): Promise<void> {
    await firestoreService.deleteDoc('trips', tripId);
  },

  onTripChange(tripId: string, callback: (trip: Trip | null) => void) {
    return firestoreService.onDocSnapshot<Trip>('trips', tripId, callback);
  },

  onVehicleTripsChange(
    tenantId: string,
    vehicleDriverId: string,
    callback: (trips: Trip[]) => void
  ) {
    return firestoreService.onCollectionSnapshot<Trip>(
      'trips',
      [
        where('tenantId', '==', tenantId),
        where('vehicleDriverId', '==', vehicleDriverId),
        orderBy('startTime', 'desc'),
      ],
      callback
    );
  },
};
