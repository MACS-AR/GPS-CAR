import { useEffect, useState, useCallback } from 'react';
import { geofenceService } from '../services/geofence';
import { Geofence, CreateGeofenceInput } from '../types';

export const useGeofences = (tenantId: string | null) => {
  const [geofences, setGeofences] = useState<Geofence[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tenantId) return;

    setIsLoading(true);
    const unsubscribe = geofenceService.onTenantGeofencesChange(tenantId, (data) => {
      setGeofences(data);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [tenantId]);

  const addGeofence = useCallback(
    async (data: CreateGeofenceInput) => {
      if (!tenantId) throw new Error('No tenant ID');
      return geofenceService.createGeofence(tenantId, data);
    },
    [tenantId]
  );

  const deleteGeofence = useCallback(async (geofenceId: string) => {
    return geofenceService.deleteGeofence(geofenceId);
  }, []);

  const toggleGeofence = useCallback(
    async (geofenceId: string, enabled: boolean) => {
      return geofenceService.toggleGeofence(geofenceId, enabled);
    },
    []
  );

  return {
    geofences,
    isLoading,
    error,
    addGeofence,
    deleteGeofence,
    toggleGeofence,
  };
};
