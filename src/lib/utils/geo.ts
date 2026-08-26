import { Coordinate } from '../types';

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
export const calculateDistance = (coord1: Coordinate, coord2: Coordinate): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const dLng = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.latitude * Math.PI) / 180) *
      Math.cos((coord2.latitude * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Check if a point is inside a circle
 */
export const isPointInCircle = (
  point: Coordinate,
  center: Coordinate,
  radiusKm: number
): boolean => {
  const distance = calculateDistance(point, center);
  return distance <= radiusKm;
};

/**
 * Check if a point is inside a polygon using ray casting algorithm
 */
export const isPointInPolygon = (point: Coordinate, polygon: Coordinate[]): boolean => {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].longitude;
    const yi = polygon[i].latitude;
    const xj = polygon[j].longitude;
    const yj = polygon[j].latitude;

    const intersect =
      yi > point.latitude !== yj > point.latitude &&
      point.longitude < ((xj - xi) * (point.latitude - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};

/**
 * Calculate bearing between two coordinates
 */
export const calculateBearing = (coord1: Coordinate, coord2: Coordinate): number => {
  const dLng = (coord2.longitude - coord1.longitude) * (Math.PI / 180);
  const y = Math.sin(dLng) * Math.cos((coord2.latitude * Math.PI) / 180);
  const x =
    Math.cos((coord1.latitude * Math.PI) / 180) * Math.sin((coord2.latitude * Math.PI) / 180) -
    Math.sin((coord1.latitude * Math.PI) / 180) *
      Math.cos((coord2.latitude * Math.PI) / 180) *
      Math.cos(dLng);
  return (Math.atan2(y, x) * 180) / Math.PI;
};
