import { TransitSearchParams, TransitRoute, HybridTransitResult, TransitStep } from '@/types/transit';
import { 
  getStationById, 
  findRoute, 
  searchRoutesByStations,
  stations 
} from '@/data/trainRoutes';

// NAVITIME API Configuration
const NAVITIME_API_KEY = process.env.NEXT_PUBLIC_NAVITIME_API_KEY || '';
const NAVITIME_API_HOST = 'navitime-route-totalnavi.p.rapidapi.com';

/**
 * Hybrid Transit Service
 * 
 * Architecture:
 * 1. ตรวจสอบว่ามีข้อมูลใน local หรือไม่
 * 2. ถ้ามี → ใช้ข้อมูล local (ประหยัด API calls)
 * 3. ถ้าไม่มี → เรียก NAVITIME API
 * 4. ส่งผลลัพธ์กลับพร้อมระบุว่ามาจากแหล่งไหน
 */

/**
 * ตรวจสอบว่ามีข้อมูลเส้นทางใน local หรือไม่
 */
export function checkLocalRouteAvailable(
  startCoord: { lat: number; lng: number },
  goalCoord: { lat: number; lng: number }
): { found: boolean; fromId?: string; toId?: string } {
  // หาสถานีที่ใกล้เคียงที่สุด (within 500m)
  const STATION_RADIUS = 0.005; // ~500m

  const startStation = stations.find(s => 
    Math.abs(s.lat - startCoord.lat) < STATION_RADIUS &&
    Math.abs(s.lng - startCoord.lng) < STATION_RADIUS
  );

  const goalStation = stations.find(s => 
    Math.abs(s.lat - goalCoord.lat) < STATION_RADIUS &&
    Math.abs(s.lng - goalCoord.lng) < STATION_RADIUS
  );

  if (startStation && goalStation) {
    const route = findRoute(startStation.id, goalStation.id);
    if (route) {
      return {
        found: true,
        fromId: startStation.id,
        toId: goalStation.id
      };
    }

    // ลองค้นหาแบบ reverse
    const reverseRoute = findRoute(goalStation.id, startStation.id);
    if (reverseRoute) {
      return {
        found: true,
        fromId: goalStation.id,
        toId: startStation.id
      };
    }

    // ลองค้นหาแบบมีต่อรถ
    const multiRoutes = searchRoutesByStations(startStation.id, goalStation.id);
    if (multiRoutes.length > 0) {
      return {
        found: true,
        fromId: startStation.id,
        toId: goalStation.id
      };
    }
  }

  return { found: false };
}

/**
 * แปลงข้อมูลจาก local trainRoutes เป็น TransitRoute format
 */
function convertLocalRouteToTransitRoute(route: any): TransitRoute {
  const fromStation = getStationById(route.from);
  const toStation = getStationById(route.to);

  const steps: TransitStep[] = route.steps.map((step: any, index: number) => ({
    mode: step.line.toLowerCase().includes('metro') || step.line.toLowerCase().includes('subway')
      ? 'subway' 
      : step.line.toLowerCase().includes('bus')
      ? 'bus'
      : step.line.toLowerCase().includes('shinkansen') || step.line.toLowerCase().includes('skyliner') || step.line.toLowerCase().includes('narita express')
      ? 'shinkansen'
      : 'train',
    from: step.from,
    to: step.to,
    line: step.line,
    lineColor: step.lineColor,
    duration: step.duration,
    stops: step.stops,
  }));

  return {
    id: `local-${route.id}`,
    source: 'local',
    steps,
    totalTime: route.totalTime,
    totalPrice: route.totalPrice,
    transfers: route.transfers,
    details: {
      jrPassCovered: route.jrPassCovered,
      tips: route.tips,
      tipsTH: route.tipsTH,
    }
  };
}

/**
 * เรียก NAVITIME Transit API
 */
export async function fetchNavitimeTransit(
  params: TransitSearchParams
): Promise<TransitRoute[]> {
  if (!NAVITIME_API_KEY) {
    console.warn('NAVITIME_API_KEY not configured');
    return [];
  }

  try {
    const startTime = params.startTime || new Date().toISOString();
    const url = new URL('https://navitime-route-totalnavi.p.rapidapi.com/route_transit');
    
    url.searchParams.set('start', `${params.start.lat},${params.start.lng}`);
    url.searchParams.set('goal', `${params.goal.lat},${params.goal.lng}`);
    url.searchParams.set('datum', 'wgs84');
    url.searchParams.set('term', String(params.term || 1440));
    url.searchParams.set('limit', String(params.limit || 5));
    url.searchParams.set('start_time', startTime);
    url.searchParams.set('coord_unit', 'degree');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': NAVITIME_API_HOST,
        'x-rapidapi-key': NAVITIME_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`NAVITIME API error: ${response.status}`);
    }

    const data = await response.json();
    
    // แปลงข้อมูลจาก NAVITIME format เป็น TransitRoute
    return parseNavitimeResponse(data);
  } catch (error) {
    console.error('Error fetching from NAVITIME:', error);
    return [];
  }
}

/**
 * แปลง response จาก NAVITIME API
 */
function parseNavitimeResponse(data: any): TransitRoute[] {
  // หมายเหตุ: โครงสร้างนี้ต้องปรับตาม response จริงของ NAVITIME
  // นี่คือตัวอย่างโครงสร้างพื้นฐาน
  
  if (!data.items || !Array.isArray(data.items)) {
    return [];
  }

  return data.items.map((item: any, index: number) => {
    const steps: TransitStep[] = (item.sections || []).map((section: any) => {
      const mode = section.type === 'walk' ? 'walk' : 'train';
      
      return {
        mode,
        from: section.from?.name || '',
        to: section.to?.name || '',
        line: section.line?.name,
        lineColor: section.line?.color,
        duration: section.duration || 0,
        distance: section.distance,
        stops: section.stops,
        departureTime: section.departure_time,
        arrivalTime: section.arrival_time,
      };
    });

    return {
      id: `navitime-${item.id || index}`,
      source: 'navitime',
      steps,
      totalTime: item.total_time || 0,
      totalPrice: item.fare?.total || 0,
      transfers: item.transfer_count || 0,
      startTime: item.departure_time,
      endTime: item.arrival_time,
      details: {
        navitimeRouteId: item.id,
      }
    };
  });
}

/**
 * ฟังก์ชันหลัก: Hybrid Transit Search
 * 
 * กลยุทธ์:
 * 1. ตรวจสอบข้อมูล local ก่อน
 * 2. ถ้ามี → ใช้ข้อมูล local
 * 3. ถ้าไม่มี → เรียก NAVITIME API
 * 4. ส่งผลลัพธ์พร้อม source tag
 */
export async function searchHybridTransit(
  params: TransitSearchParams
): Promise<HybridTransitResult> {
  // ขั้นตอนที่ 1: ตรวจสอบว่ามีข้อมูลใน local หรือไม่
  const localCheck = checkLocalRouteAvailable(params.start, params.goal);

  if (localCheck.found && localCheck.fromId && localCheck.toId) {
    // พบข้อมูลใน local → ใช้ข้อมูล local (ไม่เสีย API call)
    console.log('✅ Using LOCAL data (no API call needed)');
    
    const localRoutes = searchRoutesByStations(localCheck.fromId, localCheck.toId);
    
    if (localRoutes.length > 0) {
      const transitRoutes = localRoutes.map(route => 
        convertLocalRouteToTransitRoute(route)
      );

      return {
        source: 'local',
        routes: transitRoutes,
        hasLocalData: true,
        usedNavitime: false,
        message: 'Route found in local database',
        messageTH: 'พบเส้นทางในฐานข้อมูลท้องถิ่น',
      };
    }
  }

  // ขั้นตอนที่ 2: ไม่มีข้อมูลใน local → เรียก NAVITIME API
  console.log('🌐 No local data found, calling NAVITIME API...');
  
  const navitimeRoutes = await fetchNavitimeTransit(params);

  if (navitimeRoutes.length > 0) {
    return {
      source: 'navitime',
      routes: navitimeRoutes,
      hasLocalData: false,
      usedNavitime: true,
      message: 'Route calculated by NAVITIME API',
      messageTH: 'คำนวณเส้นทางโดย NAVITIME API',
    };
  }

  // ขั้นตอนที่ 3: ไม่พบเส้นทางเลย
  return {
    source: 'local',
    routes: [],
    hasLocalData: false,
    usedNavitime: false,
    message: 'No route found',
    messageTH: 'ไม่พบเส้นทาง',
  };
}

/**
 * ฟังก์ชัน helper: คำนวณระยะทางระหว่าง 2 จุด (Haversine formula)
 */
export function calculateDistance(
  coord1: { lat: number; lng: number },
  coord2: { lat: number; lng: number }
): number {
  const R = 6371e3; // รัศมีโลก (เมตร)
  const φ1 = (coord1.lat * Math.PI) / 180;
  const φ2 = (coord2.lat * Math.PI) / 180;
  const Δφ = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const Δλ = ((coord2.lng - coord1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // เมตร
}

/**
 * ฟังก์ชัน helper: หาสถานีที่ใกล้เคียงที่สุด
 */
export function findNearestStation(coord: { lat: number; lng: number }) {
  let nearestStation = null;
  let minDistance = Infinity;

  for (const station of stations) {
    const distance = calculateDistance(coord, { lat: station.lat, lng: station.lng });
    if (distance < minDistance) {
      minDistance = distance;
      nearestStation = station;
    }
  }

  return {
    station: nearestStation,
    distance: minDistance, // เมตร
  };
}

/**
 * ฟังก์ชัน helper: ตรวจสอบว่าอยู่ในพื้นที่ Tokyo หรือไม่
 * (ใช้สำหรับตัดสินใจว่าจะใช้ local data หรือ API)
 */
export function isInTokyoArea(coord: { lat: number; lng: number }): boolean {
  // Tokyo bounds (ประมาณ)
  const TOKYO_BOUNDS = {
    minLat: 35.5,
    maxLat: 35.85,
    minLng: 139.5,
    maxLng: 140.0,
  };

  return (
    coord.lat >= TOKYO_BOUNDS.minLat &&
    coord.lat <= TOKYO_BOUNDS.maxLat &&
    coord.lng >= TOKYO_BOUNDS.minLng &&
    coord.lng <= TOKYO_BOUNDS.maxLng
  );
}
