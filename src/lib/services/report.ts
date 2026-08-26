import { firestoreService } from '../firebase/firestore';
import { Trip, ReportFilter, ReportData } from '../types';
import { tripService } from './trip';
import { alertService } from './alert';
import { calculateDistance } from '../utils/geo';
import { where, orderBy } from 'firebase/firestore';

export const reportService = {
  async generateTripReport(
    tenantId: string,
    vehicleDriverId: string,
    startDate: Date,
    endDate: Date
  ): Promise<ReportData> {
    const trips = await tripService.getTripsByFilter(
      tenantId,
      {
        vehicleDriverId,
        startDate,
        endDate,
        status: 'completed',
      },
      1000
    );

    const alerts = await alertService.getAlertsByVehicle(tenantId, vehicleDriverId, 1000);

    let totalDistance = 0;
    let totalDuration = 0;
    let totalStops = 0;
    let maxSpeed = 0;
    let speedSum = 0;
    let movingTime = 0;
    let stoppedTime = 0;

    trips.forEach((trip) => {
      if (trip.startTime >= startDate && trip.startTime <= endDate) {
        totalDistance += trip.distance;
        totalDuration += trip.duration;
        totalStops += trip.stops?.length || 0;
        maxSpeed = Math.max(maxSpeed, trip.maxSpeed);
        speedSum += trip.averageSpeed * trip.duration;

        trip.stops?.forEach((stop) => {
          stoppedTime += stop.duration;
        });
        movingTime += trip.duration - (trip.stops?.reduce((sum, s) => sum + s.duration, 0) || 0);
      }
    });

    return {
      totalTrips: trips.length,
      totalDistance,
      totalDuration,
      averageSpeed: trips.length > 0 ? speedSum / totalDuration : 0,
      maxSpeed,
      totalStops,
      totalMovingTime: movingTime,
      totalStoppedTime: stoppedTime,
      alerts: alerts.filter(
        (a) =>
          a.timestamp >= startDate && a.timestamp <= endDate
      ).length,
      geofenceViolations: alerts.filter(
        (a) =>
          (a.type === 'geofence_enter' || a.type === 'geofence_exit') &&
          a.timestamp >= startDate &&
          a.timestamp <= endDate
      ).length,
    };
  },

  async generateSpeedReport(
    tenantId: string,
    startDate: Date,
    endDate: Date
  ): Promise<{ speedViolations: number; averageSpeed: number }> {
    const alerts = await firestoreService.getCollection<any>('alerts', {
      constraints: [
        where('tenantId', '==', tenantId),
        where('type', '==', 'speed_violation'),
        where('timestamp', '>=', startDate),
        where('timestamp', '<=', endDate),
      ],
    });

    const speedViolations = alerts.length;
    const averageSpeed =
      alerts.length > 0
        ? alerts.reduce((sum, a) => sum + (a.data?.speed || 0), 0) / alerts.length
        : 0;

    return {
      speedViolations,
      averageSpeed,
    };
  },

  async generateDistanceReport(
    tenantId: string,
    vehicleDriverId: string,
    startDate: Date,
    endDate: Date
  ): Promise<{ totalDistance: number; avgDailyDistance: number }> {
    const data = await this.generateTripReport(
      tenantId,
      vehicleDriverId,
      startDate,
      endDate
    );

    const days = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      totalDistance: data.totalDistance,
      avgDailyDistance: data.totalDistance / days,
    };
  },

  async generateStopsReport(
    tenantId: string,
    vehicleDriverId: string,
    startDate: Date,
    endDate: Date
  ): Promise<{ totalStops: number; avgStopDuration: number }> {
    const data = await this.generateTripReport(
      tenantId,
      vehicleDriverId,
      startDate,
      endDate
    );

    return {
      totalStops: data.totalStops,
      avgStopDuration:
        data.totalStops > 0 ? data.totalStoppedTime / data.totalStops : 0,
    };
  },
};
