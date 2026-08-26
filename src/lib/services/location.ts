import { firestoreService } from '../firebase/firestore';
import { rtdbService } from '../firebase/rtdb';
import { LocationData, LocationHistory } from '../types';

export const locationService = {
  async addLocationToHistory(data: LocationData): Promise<void> {
    const date = new Date(data.timestamp).toISOString().split('T')[0];
    const locationId = Math.random().toString(36).substring(7);
    const path = `locationHistory/${data.vehicleDriverId}/${date}/${locationId}`;
    await rtdbService.set(path, {
      ...data,
      timestamp: data.timestamp.getTime(),
    });
  },

  async getLocationHistory(
    vehicleDriverId: string,
    date: Date
  ): Promise<LocationHistory[]> {
    const dateStr = date.toISOString().split('T')[0];
    const path = `locationHistory/${vehicleDriverId}/${dateStr}`;
    const data = await rtdbService.get(path);
    return data ? Object.values(data) : [];
  },

  async getLocationBetweenDates(
    vehicleDriverId: string,
    startDate: Date,
    endDate: Date
  ): Promise<LocationHistory[]> {
    const locations: LocationHistory[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      const dayLocations = await this.getLocationHistory(vehicleDriverId, current);
      locations.push(...dayLocations);
      current.setDate(current.getDate() + 1);
    }

    return locations.sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  },

  async updateLiveLocation(
    tenantId: string,
    vehicleDriverId: string,
    data: any
  ): Promise<void> {
    await rtdbService.set(`liveLocations/${tenantId}/${vehicleDriverId}`, {
      ...data,
      updatedAt: Date.now(),
    });
  },

  onLocationChange(
    vehicleDriverId: string,
    date: Date,
    callback: (locations: LocationHistory[]) => void
  ) {
    const dateStr = date.toISOString().split('T')[0];
    const path = `locationHistory/${vehicleDriverId}/${dateStr}`;
    return rtdbService.onValue(path, (data) => {
      callback(data ? Object.values(data) : []);
    });
  },
};
