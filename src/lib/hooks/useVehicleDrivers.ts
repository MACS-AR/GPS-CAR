import { useEffect, useState, useCallback } from 'react';
import { vehicleDriverService } from '../services/vehicleDriver';
import { VehicleDriver } from '../types';

export const useVehicleDrivers = (tenantId: string | null) => {
  const [vehicles, setVehicles] = useState<VehicleDriver[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tenantId) return;

    setIsLoading(true);
    const unsubscribe = vehicleDriverService.onTenantVehicleDriversChange(
      tenantId,
      (data) => {
        setVehicles(data);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, [tenantId]);

  const addVehicle = useCallback(
    async (name: string, phone: string) => {
      if (!tenantId) throw new Error('No tenant ID');
      return vehicleDriverService.createVehicleDriver(tenantId, { name, phone });
    },
    [tenantId]
  );

  const deleteVehicle = useCallback(
    async (vehicleDriverId: string) => {
      return vehicleDriverService.deleteVehicleDriver(vehicleDriverId);
    },
    []
  );

  const regenerateCode = useCallback(
    async (vehicleDriverId: string) => {
      return vehicleDriverService.regenerateDriverCode(vehicleDriverId);
    },
    []
  );

  return {
    vehicles,
    isLoading,
    error,
    addVehicle,
    deleteVehicle,
    regenerateCode,
  };
};
