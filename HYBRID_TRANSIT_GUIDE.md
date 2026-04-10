# 🚆 Hybrid Transit System - คู่มือการใช้งาน

## ภาพรวม

ระบบ Hybrid Transit ใช้ข้อมูลจาก 2 แหล่ง:

1. **Local Data** (ฐานข้อมูลท้องถิ่น) - ข้อมูลที่มีอยู่ในแอปอยู่แล้ว
2. **NAVITIME API** - API ภายนอกสำหรับคำนวณเส้นทางที่ซับซ้อน

## 🎯 กลยุทธ์การทำงาน

```
┌─────────────────────────────────────┐
│  ผู้ใช้ค้นหาเส้นทาง                │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  1. ตรวจสอบข้อมูล Local ก่อน       │
│     - มีสถานีใกล้เคียงไหม?          │
│     - มีเส้นทางในข้อมูลไหม?        │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        │             │
        ▼             ▼
   ✅ มีข้อมูล    ❌ ไม่มีข้อมูล
        │             │
        │             ▼
        │    ┌────────────────────┐
        │    │ 2. เรียก NAVITIME  │
        │    │    API             │
        │    └────────┬───────────┘
        │             │
        ▼             ▼
┌─────────────────────────────────────┐
│  ส่งผลลัพธ์ + แหล่งข้อมูล           │
│  (Local หรือ NAVITIME)             │
└─────────────────────────────────────┘
```

## 📊 ประโยชน์

| ข้อดี | Local Data | NAVITIME API |
|-------|-----------|--------------|
| **ความเร็ว** | ⚡ เร็วมาก (ทันที) | 🐢 ต้องรอ API ตอบ |
| **ราคา** | 🆓 ฟรี | 💰 ใช้ API quota |
| **ข้อมูล** | 📍 เฉพาะโตเกียว | 🌏 ทั่วญี่ปุ่น |
| **Offline** | ✅ ใช้งานได้ | ❌ ต้องต่อเน็ต |

## 🔧 ไฟล์ที่เกี่ยวข้อง

```
src/
├── data/
│   └── trainRoutes.ts          # ข้อมูลเส้นทางท้องถิ่น
├── types/
│   └── transit.ts              # Types สำหรับ hybrid system
├── services/
│   └── hybridTransit.ts        # Core service logic
├── hooks/
│   └── useHybridTransit.ts     # React hook
└── components/
    └── HybridTransitFinder.tsx # UI component
```

## 🚀 วิธีใช้งาน

### 1. ตั้งค่า API Key

สร้างไฟล์ `.env.local`:

```env
NEXT_PUBLIC_NAVITIME_API_KEY=your_api_key_here
```

ได้ API Key จาก: https://rapidapi.com/navitimejapan-navitimejapan/api/navitime-route-totalnavi

**แพ็คเกจฟรี:** 500 requests/เดือน สำหรับทดสอบ

### 2. ใช้งานใน Component

```tsx
import { useHybridTransit } from '@/hooks/useHybridTransit';

export default function MyComponent() {
  const { 
    routes, 
    loading, 
    dataSource,
    searchRoutes 
  } = useHybridTransit();

  const handleSearch = async () => {
    await searchRoutes({
      start: { lat: 35.6812, lng: 139.7671 }, // Tokyo
      goal: { lat: 35.6580, lng: 139.7016 },  // Shibuya
    });
    
    console.log(`Source: ${dataSource}`); // 'local' หรือ 'navitime'
  };
}
```

### 3. ตรวจสอบแหล่งข้อมูล

```tsx
{dataSource === 'local' && (
  <p>✅ ใช้ข้อมูลท้องถิ่น (ฟรี)</p>
)}

{dataSource === 'navitime' && (
  <p>🌐 ใช้ NAVITIME API (เสีย quota)</p>
)}
```

## 📍 ตัวอย่างการใช้งาน

### เส้นทางที่มีข้อมูล Local

```
Tokyo Station → Shibuya Station
✅ Local Data (อยู่ใน trainRoutes.ts)
⚡ ตอบทันที, ไม่เสีย API call
```

### เส้นทางที่ต้องใช้ API

```
Narita Airport → Yokohama
❌ ไม่มีข้อมูล Local
🌐 เรียก NAVITIME API
💰 เสีย 1 request
```

## 🔍 ฟังก์ชันสำคัญ

### 1. `checkLocalRouteAvailable()`

ตรวจสอบว่ามีข้อมูลใน local หรือไม่

```typescript
const result = checkLocalRouteAvailable(
  { lat: 35.6812, lng: 139.7671 },
  { lat: 35.6580, lng: 139.7016 }
);

console.log(result.found); // true/false
```

### 2. `searchHybridTransit()`

ค้นหาเส้นทางแบบ hybrid (local ก่อน, API ถ้าจำเป็น)

```typescript
const result = await searchHybridTransit({
  start: { lat: 35.6812, lng: 139.7671 },
  goal: { lat: 35.6580, lng: 139.7016 },
  startTime: '2024-04-16T10:00:00',
  limit: 5,
});

console.log(result.source); // 'local' | 'navitime'
console.log(result.routes); // เส้นทางทั้งหมด
```

### 3. `findNearestStation()`

หาสถานีที่ใกล้เคียงที่สุด

```typescript
const nearest = findNearestStation({
  lat: 35.6812,
  lng: 139.7671
});

console.log(nearest.station.name); // 'Tokyo'
console.log(nearest.distance); // ระยะทาง (เมตร)
```

### 4. `isInTokyoArea()`

ตรวจสอบว่าอยู่ในพื้นที่โตเกียวหรือไม่

```typescript
const inTokyo = isInTokyoArea({
  lat: 35.6812,
  lng: 139.7671
});

console.log(inTokyo); // true/false
```

## 💡 เคล็ดลับการใช้งาน

1. **ใช้ข้อมูล Local ให้มากที่สุด**
   - เส้นทางในโตเกียวเกือบทั้งหมดมีอยู่แล้ว
   - รวดเร็ว, ฟรี, ใช้งานได้ offline

2. **สงวน NAVITIME API สำหรับเส้นทางไกล**
   - นอกพื้นที่โตเกียว
   - เส้นทางข้ามจังหวัด
   - ข้อมูลเวลาจริง (real-time)

3. **ตรวจสอบ `dataSource` เสมอ**
   - แสดงให้ผู้ใช้รู้ว่าข้อมูลมาจากไหน
   - ช่วยให้ผู้ใช้ตัดสินใจได้ดีขึ้น

## 🐛 การแก้ไขปัญหา

### ไม่มีผลลัพธ์จาก NAVITIME API

1. ตรวจสอบ API Key ใน `.env.local`
2. ดูว่าเกิน quota หรือไม่ (500 requests/เดือน)
3. ตรวจสอบ coordinate ว่าถูกต้อง

### Local Data ไม่พบ

1. ตรวจสอบว่า coordinate อยู่ในรัศมี 500m จากสถานี
2. ลองใช้ฟังก์ชัน `findNearestStation()` หาสถานี terdekat
3. ตรวจสอบว่าเส้นทางมีใน `trainRoutes.ts` หรือไม่

## 📝 หมายเหตุ

- **NAVITIME API Free Tier:** 500 requests/เดือน
- **Local Data:** ครอบคลุมพื้นที่โตเกียวและปริมณฑล
- **Offline Mode:** ใช้งานได้เฉพาะข้อมูล local

## 🔗 ลิงก์ที่เกี่ยวข้อง

- [NAVITIME API Documentation](https://rapidapi.com/navitimejapan-navitimejapan/api/navitime-route-totalnavi)
- [Tokyo Train Routes](../src/data/trainRoutes.ts)
- [Hybrid Transit Service](../src/services/hybridTransit.ts)
