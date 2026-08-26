export type GeofenceType = 'safe' | 'restricted' | 'company' | 'home' | 'warehouse' | 'branch';
export type ShapeType = 'circle' | 'polygon';

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Geofence {
  id: string;
  tenantId: string;
  name: string;
  type: GeofenceType;
  center: Coordinate;
  radius?: number; // meters, for circle type
  coordinates?: Coordinate[]; // for polygon type
  shapeType: ShapeType;
  enabled: boolean;
  enterAlert: boolean;
  exitAlert: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGeofenceInput {
  name: string;
  type: GeofenceType;
  center: Coordinate;
  radius?: number;
  coordinates?: Coordinate[];
  shapeType: ShapeType;
  enterAlert?: boolean;
  exitAlert?: boolean;
}
