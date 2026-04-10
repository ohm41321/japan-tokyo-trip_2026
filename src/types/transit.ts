// Types for hybrid transit system

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface TransitStep {
  mode: 'walk' | 'train' | 'subway' | 'bus' | 'shinkansen';
  from: string;
  to: string;
  line?: string;
  lineColor?: string;
  duration: number; // minutes
  distance?: number; // meters (for walking)
  stops?: number;
  departureTime?: string;
  arrivalTime?: string;
}

export interface TransitRoute {
  id: string;
  source: 'local' | 'navitime'; // ข้อมูลมาจากไหน
  steps: TransitStep[];
  totalTime: number; // minutes
  totalPrice: number; // yen
  transfers: number;
  startTime?: string;
  endTime?: string;
  details?: {
    jrPassCovered?: boolean;
    tips?: string[];
    tipsTH?: string[];
    navitimeRouteId?: string;
  };
}

export interface TransitSearchParams {
  start: Coordinate;
  goal: Coordinate;
  startTime?: string; // ISO format: 2024-04-16T10:00:00
  limit?: number; // number of routes to return (default: 5)
  term?: number; // search time window in minutes (default: 1440)
}

export interface LocalRouteMatch {
  found: boolean;
  routes: Array<{
    fromId: string;
    toId: string;
    stationName: string;
    stationNameTH: string;
  }>;
}

export type DataSource = 'local' | 'navitime' | 'hybrid';

export interface HybridTransitResult {
  source: DataSource;
  routes: TransitRoute[];
  hasLocalData: boolean;
  usedNavitime: boolean;
  message?: string;
  messageTH?: string;
}
