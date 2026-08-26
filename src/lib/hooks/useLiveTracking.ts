import { useEffect, useState, useCallback, useRef } from 'react';
import { vehicleDriverService } from '../services/vehicleDriver';
import { Location } from '../types';

interface LiveLocation extends Location {
  battery: number;
  gpsStatus: string;
  internetStatus: string;
  isMoving: boolean;
}

export const useLiveTracking = (tenantId: string | null, vehicleDriverId: string | null) => {
  const [location, setLocation] = useState<LiveLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!tenantId || !vehicleDriverId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      unsubscribeRef.current = vehicleDriverService.onLiveLocationChange(
        tenantId,
        vehicleDriverId,
        (data) => {
          if (data) {
            setLocation(data as LiveLocation);
          }
          setIsLoading(false);
        }
      );
    } catch (err: any) {
      setError(err.message || 'Failed to start live tracking');
      setIsLoading(false);
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [tenantId, vehicleDriverId]);

  const stopTracking = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
  }, []);

  return {
    location,
    isLoading,
    error,
    stopTracking,
  };
};
