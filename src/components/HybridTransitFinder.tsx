'use client';

import { useState } from 'react';
import { useHybridTransit } from '@/hooks/useHybridTransit';
import { TransitSearchParams } from '@/types/transit';
import { findNearestStation, isInTokyoArea } from '@/services/hybridTransit';

interface HybridTransitFinderProps {
  language: 'th' | 'en';
}

export default function HybridTransitFinder({ language }: HybridTransitFinderProps) {
  const {
    routes,
    loading,
    error,
    dataSource,
    hasLocalData,
    usedNavitime,
    message,
    messageTH,
    searchRoutes,
  } = useHybridTransit();

  const [startLat, setStartLat] = useState('35.6812');
  const [startLng, setStartLng] = useState('139.7671');
  const [goalLat, setGoalLat] = useState('35.6580');
  const [goalLng, setGoalLng] = useState('139.7016');
  const [startTime, setStartTime] = useState('');

  const handleSearch = async () => {
    const params: TransitSearchParams = {
      start: { lat: parseFloat(startLat), lng: parseFloat(startLng) },
      goal: { lat: parseFloat(goalLat), lng: parseFloat(goalLng) },
      startTime: startTime || undefined,
      limit: 5,
      term: 1440,
    };

    await searchRoutes(params);
  };

  const handleNearestStation = (type: 'start' | 'goal') => {
    const lat = parseFloat(type === 'start' ? startLat : goalLat);
    const lng = parseFloat(type === 'start' ? startLng : goalLng);
    const nearest = findNearestStation({ lat, lng });

    if (nearest.station) {
      if (type === 'start') {
        setStartLat(nearest.station.lat.toString());
        setStartLng(nearest.station.lng.toString());
      } else {
        setGoalLat(nearest.station.lat.toString());
        setGoalLng(nearest.station.lng.toString());
      }
    }
  };

  const handlePresetRoute = (from: string, to: string) => {
    const stationMap: Record<string, { lat: number; lng: number }> = {
      'tokyo': { lat: 35.6812, lng: 139.7671 },
      'shinjuku': { lat: 35.6896, lng: 139.7006 },
      'shibuya': { lat: 35.6580, lng: 139.7016 },
      'ueno': { lat: 35.7138, lng: 139.7772 },
      'akihabara': { lat: 35.6984, lng: 139.7731 },
      'harajuku': { lat: 35.6702, lng: 139.7026 },
      'ikebukuro': { lat: 35.7295, lng: 139.7109 },
      'shinagawa': { lat: 35.6284, lng: 139.7387 },
      'asakusa': { lat: 35.7148, lng: 139.7967 },
      'ginza': { lat: 35.6719, lng: 139.7648 },
    };

    const fromStation = stationMap[from];
    const toStation = stationMap[to];

    if (fromStation && toStation) {
      setStartLat(fromStation.lat.toString());
      setStartLng(fromStation.lng.toString());
      setGoalLat(toStation.lat.toString());
      setGoalLng(toStation.lng.toString());
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const formatPrice = (yen: number) => {
    return `¥${yen.toLocaleString()}`;
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'train': return '🚃';
      case 'subway': return '🚇';
      case 'bus': return '🚌';
      case 'shinkansen': return '🚄';
      case 'walk': return '🚶';
      default: return '🚌';
    }
  };

  const isTokyoStart = isInTokyoArea({ lat: parseFloat(startLat), lng: parseFloat(startLng) });
  const isTokyoGoal = isInTokyoArea({ lat: parseFloat(goalLat), lng: parseFloat(goalLng) });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">
          {language === 'th' ? '🚆 ค้นหาเส้นทาง Hybrid' : '🚆 Hybrid Route Finder'}
        </h2>
        <p className="text-sm opacity-90">
          {language === 'th' 
            ? 'ใช้ข้อมูล local ก่อน ถ้าไม่มีค่อยใช้ NAVITIME API (ประหยัด API calls)' 
            : 'Uses local data first, falls back to NAVITIME API (saves API calls)'}
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
        {/* Start Location */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {language === 'th' ? '📍 จุดเริ่มต้น' : '📍 Start Location'}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              step="0.0001"
              value={startLat}
              onChange={(e) => setStartLat(e.target.value)}
              placeholder="Latitude"
              className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="number"
              step="0.0001"
              value={startLng}
              onChange={(e) => setStartLng(e.target.value)}
              placeholder="Longitude"
              className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <button
            onClick={() => handleNearestStation('start')}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {language === 'th' ? '🔍 หาสถานีที่ใกล้เคียง' : '🔍 Find nearest station'}
          </button>
        </div>

        {/* Goal Location */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {language === 'th' ? '🏁 จุดหมาย' : '🏁 Destination'}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              step="0.0001"
              value={goalLat}
              onChange={(e) => setGoalLat(e.target.value)}
              placeholder="Latitude"
              className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="number"
              step="0.0001"
              value={goalLng}
              onChange={(e) => setGoalLng(e.target.value)}
              placeholder="Longitude"
              className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <button
            onClick={() => handleNearestStation('goal')}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {language === 'th' ? '🔍 หาสถานีที่ใกล้เคียง' : '🔍 Find nearest station'}
          </button>
        </div>

        {/* Start Time */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {language === 'th' ? '🕐 เวลาออกเดินทาง' : '🕐 Departure Time'}
          </label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* Preset Routes */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {language === 'th' ? '⭐ เส้นทางยอดนิยม' : '⭐ Popular Routes'}
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handlePresetRoute('tokyo', 'shibuya')}
              className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded-full text-sm hover:bg-indigo-200 dark:hover:bg-indigo-800 transition"
            >
              Tokyo → Shibuya
            </button>
            <button
              onClick={() => handlePresetRoute('shinjuku', 'ueno')}
              className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded-full text-sm hover:bg-indigo-200 dark:hover:bg-indigo-800 transition"
            >
              Shinjuku → Ueno
            </button>
            <button
              onClick={() => handlePresetRoute('shibuya', 'asakusa')}
              className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded-full text-sm hover:bg-indigo-200 dark:hover:bg-indigo-800 transition"
            >
              Shibuya → Asakusa
            </button>
            <button
              onClick={() => handlePresetRoute('ueno', 'akihabara')}
              className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded-full text-sm hover:bg-indigo-200 dark:hover:bg-indigo-800 transition"
            >
              Ueno → Akihabara
            </button>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading 
            ? (language === 'th' ? '⏳ กำลังค้นหา...' : '⏳ Searching...') 
            : (language === 'th' ? '🔍 ค้นหาเส้นทาง' : '🔍 Search Routes')}
        </button>
      </div>

      {/* Status Indicator */}
      {(hasLocalData || usedNavitime) && (
        <div className={`p-4 rounded-lg border-l-4 ${
          dataSource === 'local' 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-500' 
            : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              {dataSource === 'local' ? '✅' : '🌐'}
            </span>
            <div>
              <p className="font-semibold">
                {dataSource === 'local'
                  ? (language === 'th' ? 'ข้อมูลท้องถิ่น (Local)' : 'Local Data')
                  : (language === 'th' ? 'NAVITIME API' : 'NAVITIME API')}
              </p>
              <p className="text-sm opacity-75">
                {language === 'th' ? messageTH : message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tokyo Area Warning */}
      {(!isTokyoStart || !isTokyoGoal) && (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            {language === 'th' 
              ? '⚠️ เส้นทางนอกพื้นที่ Tokyo อาจไม่มีในข้อมูลท้องถิ่น จะต้องใช้ NAVITIME API'
              : '⚠️ Routes outside Tokyo area may not be in local data, will use NAVITIME API'}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Results */}
      {routes.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {language === 'th' 
              ? `🚆 พบ ${routes.length} เส้นทาง` 
              : `🚆 Found ${routes.length} routes`}
          </h3>

          {routes.map((route, index) => (
            <div 
              key={route.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              {/* Route Header */}
              <div className={`p-4 ${
                route.source === 'local' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600'
              } text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {route.source === 'local' ? '✅' : '🌐'}
                    </span>
                    <div>
                      <h4 className="font-bold">
                        {language === 'th' ? `เส้นทางที่ ${index + 1}` : `Route ${index + 1}`}
                      </h4>
                      <p className="text-xs opacity-90">
                        {route.source === 'local' 
                          ? (language === 'th' ? 'จากฐานข้อมูลท้องถิ่น' : 'From local database')
                          : (language === 'th' ? 'จาก NAVITIME API' : 'From NAVITIME API')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{formatDuration(route.totalTime)}</p>
                    <p className="text-sm opacity-90">{formatPrice(route.totalPrice)}</p>
                  </div>
                </div>
              </div>

              {/* Route Steps */}
              <div className="p-4 space-y-3">
                {route.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl">
                      {getModeIcon(step.mode)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">
                            {step.from} → {step.to}
                          </p>
                          {step.line && (
                            <div className="flex items-center gap-2 mt-1">
                              {step.lineColor && (
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: step.lineColor }}
                                />
                              )}
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {step.line}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{step.duration} min</p>
                          {step.stops && (
                            <p className="text-xs text-gray-500">
                              {step.stops} {language === 'th' ? 'สถานี' : 'stops'}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* JR Pass Badge */}
                {route.details?.jrPassCovered && (
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      ✅ {language === 'th' ? 'ครอบคลุมโดย JR Pass' : 'Covered by JR Pass'}
                    </p>
                  </div>
                )}

                {/* Tips */}
                {route.details?.tips && route.details.tips.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm font-semibold mb-2">
                      {language === 'th' ? '💡 เคล็ดลับ:' : '💡 Tips:'}
                    </p>
                    <ul className="space-y-1">
                      {(language === 'th' ? route.details.tipsTH || route.details.tips : route.details.tips).map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-sm text-gray-700 dark:text-gray-300">
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
