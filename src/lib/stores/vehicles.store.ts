import { create } from 'zustand';
import { VehicleDriver } from '../types';

interface VehiclesStore {
  vehicles: VehicleDriver[];
  selectedVehicle: VehicleDriver | null;
  loading: boolean;
  error: string | null;
  setVehicles: (vehicles: VehicleDriver[]) => void;
  setSelectedVehicle: (vehicle: VehicleDriver | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateVehicle: (vehicleId: string, updates: Partial<VehicleDriver>) => void;
}

export const useVehiclesStore = create<VehiclesStore>((set) => ({
  vehicles: [],
  selectedVehicle: null,
  loading: false,
  error: null,
  setVehicles: (vehicles) => set({ vehicles }),
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  updateVehicle: (vehicleId, updates) =>
    set((state) => ({
      vehicles: state.vehicles.map((v) =>
        v.id === vehicleId ? { ...v, ...updates } : v
      ),
      selectedVehicle:
        state.selectedVehicle?.id === vehicleId
          ? { ...state.selectedVehicle, ...updates }
          : state.selectedVehicle,
    })),
}));
