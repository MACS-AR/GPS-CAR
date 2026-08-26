import { useEffect, useState, useCallback } from 'react';
import { tripService } from '../services/trip';
import { Trip, TripFilter } from '../types';

export const useTrips = (tenantId: string | null) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrips = useCallback(
    async (filter: TripFilter) => {
      if (!tenantId) return;
      try {
        setIsLoading(true);
        const data = await tripService.getTripsByFilter(tenantId, filter);
        setTrips(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch trips');
      } finally {
        setIsLoading(false);
      }
    },
    [tenantId]
  );

  const getVehicleTrips = useCallback(
    async (vehicleDriverId: string) => {
      if (!tenantId) return [];
      try {
        setIsLoading(true);
        const data = await tripService.getTripsByVehicle(tenantId, vehicleDriverId);
        setTrips(data);
        return data;
      } catch (err: any) {
        setError(err.message);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [tenantId]
  );

  return {
    trips,
    isLoading,
    error,
    fetchTrips,
    getVehicleTrips,
  };
};
