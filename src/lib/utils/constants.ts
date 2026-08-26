export const APP_NAME = 'GPS-CAR Dashboard';
export const APP_VERSION = '2.0.0';

export const DEFAULT_TIMEZONE = 'Africa/Cairo';
export const DEFAULT_SPEED_UNIT = 'km/h';
export const DEFAULT_DISTANCE_UNIT = 'km';

export const OFFLINE_THRESHOLD = 5; // minutes
export const STOP_TIMEOUT = 5; // minutes
export const DEFAULT_MAX_SPEED = 120; // km/h

export const PAGINATION_SIZE = 20;
export const MAP_DEFAULT_ZOOM = 13;
export const MAP_DEFAULT_CENTER = { lat: 30.0444, lng: 31.2357 }; // Cairo

export const SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    maxVehicles: 5,
    maxUsers: 2,
    price: 99,
    currency: 'EGP',
    billingCycle: 'monthly',
  },
  {
    id: 'professional',
    name: 'Professional',
    maxVehicles: 20,
    maxUsers: 10,
    price: 299,
    currency: 'EGP',
    billingCycle: 'monthly',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    maxVehicles: 100,
    maxUsers: 50,
    price: 999,
    currency: 'EGP',
    billingCycle: 'monthly',
  },
];
