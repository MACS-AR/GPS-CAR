import { firestoreService } from '../firebase/firestore';
import { rtdbService } from '../firebase/rtdb';
import { VehicleDriver, CreateVehicleDriverInput } from '../types';
import { where, orderBy } from 'firebase/firestore';
import { nanoid } from 'nanoid';

export const vehicleDriverService = {
  async getVehicleDriver(vehicleDriverId: string): Promise<VehicleDriver | null> {
    return firestoreService.getDoc<VehicleDriver>('vehicleDrivers', vehicleDriverId);
  },

  async getVehicleDriversByTenant(tenantId: string): Promise<VehicleDriver[]> {
    return firestoreService.getCollection<VehicleDriver>('vehicleDrivers', {
      constraints: [where('tenantId', '==', tenantId), orderBy('createdAt', 'desc')],
    });
  },

  async createVehicleDriver(
    tenantId: string,
    data: CreateVehicleDriverInput
  ): Promise<string> {
    const vehicleDriverId = Math.random().toString(36).substring(7);
    const driverCode = this.generateDriverCode();

    await firestoreService.setDoc('vehicleDrivers', vehicleDriverId, {
      tenantId,
      ...data,
      driverCode,
      status: 'offline',
      isMoving: false,
      currentSpeed: 0,
      battery: 0,
      gpsStatus: 'inactive',
      internetStatus: 'disconnected',
      lastUpdate: new Date(),
      maxSpeed: data.maxSpeed || 120,
      alertSettings: {
        enableSpeedAlert: true,
        enableGeofenceAlert: true,
        enableOfflineAlert: true,
        enableBatteryAlert: true,
        enableStopAlert: true,
        stopDurationThreshold: 5,
        ...data.alertSettings,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return vehicleDriverId;
  },

  async updateVehicleDriver(
    vehicleDriverId: string,
    data: Partial<VehicleDriver>
  ): Promise<void> {
    await firestoreService.updateDoc('vehicleDrivers', vehicleDriverId, {
      ...data,
      updatedAt: new Date(),
    });
  },

  async deleteVehicleDriver(vehicleDriverId: string): Promise<void> {
    await firestoreService.deleteDoc('vehicleDrivers', vehicleDriverId);
  },

  generateDriverCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'DRV-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  },

  async regenerateDriverCode(vehicleDriverId: string): Promise<string> {
    const newCode = this.generateDriverCode();
    await this.updateVehicleDriver(vehicleDriverId, { driverCode: newCode });
    return newCode;
  },

  onVehicleDriverChange(
    vehicleDriverId: string,
    callback: (vehicle: VehicleDriver | null) => void
  ) {
    return firestoreService.onDocSnapshot<VehicleDriver>(
      'vehicleDrivers',
      vehicleDriverId,
      callback
    );
  },

  onTenantVehicleDriversChange(
    tenantId: string,
    callback: (vehicles: VehicleDriver[]) => void
  ) {
    return firestoreService.onCollectionSnapshot<VehicleDriver>(
      'vehicleDrivers',
      [where('tenantId', '==', tenantId)],
      callback
    );
  },

  async getLiveLocation(tenantId: string, vehicleDriverId: string) {
    return rtdbService.get(`liveLocations/${tenantId}/${vehicleDriverId}`);
  },

  onLiveLocationChange(
    tenantId: string,
    vehicleDriverId: string,
    callback: (location: any) => void
  ) {
    return rtdbService.onValue(
      `liveLocations/${tenantId}/${vehicleDriverId}`,
      callback
    );
  },
};
