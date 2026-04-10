'use client';

import { useState, useMemo } from 'react';
import { stations } from '@/data/trainRoutes';
import { useLanguage } from '@/context/LanguageContext';

export default function TrainRouteFinder() {
  const { language } = useLanguage();
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  // ฟิลเตอร์สถานีตามคำค้นหา
  const filteredFromStations = useMemo(() => {
    if (!searchFrom) return stations;
    const query = searchFrom.toLowerCase();
    return stations.filter(
      s =>
        s.name.toLowerCase().includes(query) ||
        s.nameTH.includes(searchFrom) ||
        s.id.includes(query)
    );
  }, [searchFrom]);

  const filteredToStations = useMemo(() => {
    if (!searchTo) return stations;
    const query = searchTo.toLowerCase();
    return stations.filter(
      s =>
        s.name.toLowerCase().includes(query) ||
        s.nameTH.includes(searchTo) ||
        s.id.includes(query)
    );
  }, [searchTo]);

  // เปิด Google Maps Transit
  const openGoogleMaps = () => {
    if (!fromStation || !toStation) return;

    const from = stations.find(s => s.id === fromStation);
    const to = stations.find(s => s.id === toStation);

    if (!from || !to) return;

    // สร้าง Google Maps Directions URL
    const origin = `${from.lat},${from.lng}`;
    const destination = `${to.lat},${to.lng}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=transit`;

    // เปิดในแท็บใหม่
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // เส้นทางยอดนิยม
  const popularRoutes = [
    { from: 'narita-airport', to: 'ueno', labelTH: 'สนามบินนาริตะ → อุเอโนะ', labelEN: 'Narita Airport → Ueno' },
    { from: 'tokyo', to: 'shibuya', labelTH: 'โตเกียว → ชิบุยะ', labelEN: 'Tokyo → Shibuya' },
    { from: 'shinjuku', to: 'ueno', labelTH: 'ชินจูกุ → อุเอโนะ', labelEN: 'Shinjuku → Ueno' },
    { from: 'shibuya', to: 'asakusa', labelTH: 'ชิบุยะ → อาซากุสะ', labelEN: 'Shibuya → Asakusa' },
    { from: 'ueno', to: 'akihabara', labelTH: 'อุเอโนะ → อากิฮาบาระ', labelEN: 'Ueno → Akihabara' },
    { from: 'shinjuku', to: 'harajuku', labelTH: 'ชินจูกุ → ฮาราจูกุ', labelEN: 'Shinjuku → Harajuku' },
  ];

  const handlePopularRoute = (fromId: string, toId: string) => {
    setFromStation(fromId);
    setToStation(toId);

    const from = stations.find(s => s.id === fromId);
    const to = stations.find(s => s.id === toId);

    if (from) setSearchFrom(language === 'th' ? from.nameTH : from.name);
    if (to) setSearchTo(language === 'th' ? to.nameTH : to.name);

    // เปิด Google Maps ทันที
    setTimeout(() => {
      if (!from || !to) return;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${from.lat},${from.lng}&destination=${to.lat},${to.lng}&travelmode=transit`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 100);
  };

  const selectFromStation = (stationId: string) => {
    setFromStation(stationId);
    setShowFromDropdown(false);
    const station = stations.find(s => s.id === stationId);
    if (station) {
      setSearchFrom(language === 'th' ? station.nameTH : station.name);
    }
  };

  const selectToStation = (stationId: string) => {
    setToStation(stationId);
    setShowToDropdown(false);
    const station = stations.find(s => s.id === stationId);
    if (station) {
      setSearchTo(language === 'th' ? station.nameTH : station.name);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6" onClick={() => {
      setShowFromDropdown(false);
      setShowToDropdown(false);
    }}>
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 p-4 sm:p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🗺️</span>
          <h2 className="text-lg sm:text-2xl font-bold">
            {language === 'th' ? 'เลือกต้นทาง-ปลายทาง' : 'Route Planner'}
          </h2>
        </div>
        <p className="text-blue-100 text-xs sm:text-sm">
          {language === 'th'
            ? 'เลือกสถานีแล้วเปิด Google Maps เพื่อดูเส้นทางแบบเรียลไทม์'
            : 'Select stations and open Google Maps for real-time routes'}
        </p>
      </div>

      {/* Station Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-3 sm:p-6">
        <div className="space-y-4">
          {/* From Station */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {language === 'th' ? '🔵 ต้นทาง' : '🔵 From'}
            </label>
            <input
              type="text"
              value={searchFrom}
              onChange={(e) => {
                setSearchFrom(e.target.value);
                setShowFromDropdown(true);
                setFromStation('');
              }}
              onFocus={() => setShowFromDropdown(true)}
              onClick={(e) => e.stopPropagation()}
              placeholder={language === 'th' ? 'ค้นหาสถานี...' : 'Search stations...'}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all text-sm"
            />

            {/* Dropdown */}
            {showFromDropdown && (
              <div className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {filteredFromStations.length > 0 ? (
                  filteredFromStations.map(station => (
                    <button
                      key={station.id}
                      onClick={() => selectFromStation(station.id)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-b border-gray-100 dark:border-gray-700 transition flex items-center gap-3"
                    >
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: station.lineColor }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                          {language === 'th' ? station.nameTH : station.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {station.line}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    {language === 'th' ? 'ไม่พบสถานี' : 'No stations found'}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* To Station */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {language === 'th' ? '🔴 ปลายทาง' : '🔴 To'}
            </label>
            <input
              type="text"
              value={searchTo}
              onChange={(e) => {
                setSearchTo(e.target.value);
                setShowToDropdown(true);
                setToStation('');
              }}
              onFocus={() => setShowToDropdown(true)}
              onClick={(e) => e.stopPropagation()}
              placeholder={language === 'th' ? 'ค้นหาสถานี...' : 'Search stations...'}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800 transition-all text-sm"
            />

            {/* Dropdown */}
            {showToDropdown && (
              <div className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {filteredToStations.length > 0 ? (
                  filteredToStations.map(station => (
                    <button
                      key={station.id}
                      onClick={() => selectToStation(station.id)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-b border-gray-100 dark:border-gray-700 transition flex items-center gap-3"
                    >
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: station.lineColor }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                          {language === 'th' ? station.nameTH : station.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {station.line}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    {language === 'th' ? 'ไม่พบสถานี' : 'No stations found'}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Open Google Maps Button */}
          <button
            onClick={openGoogleMaps}
            disabled={!fromStation || !toStation}
            className="w-full py-4 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-base rounded-xl shadow-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-green-500 disabled:hover:to-emerald-600 transition-all active:scale-95 min-h-[52px] flex items-center justify-center gap-2"
          >
            <span className="text-2xl">🗺️</span>
            <span>
              {language === 'th' ? 'เปิด Google Maps' : 'Open Google Maps'}
            </span>
          </button>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-3 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          {language === 'th' ? '⭐ เส้นทางยอดนิยม' : '⭐ Popular Routes'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {popularRoutes.map((route, idx) => (
            <button
              key={idx}
              onClick={() => handlePopularRoute(route.from, route.to)}
              className="text-left px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all active:scale-95 min-h-[44px]"
            >
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {language === 'th' ? route.labelTH : route.labelEN}
              </span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">
                {language === 'th' ? 'แตะเพื่อเปิด Google Maps' : 'Tap to open Google Maps'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800 p-3 sm:p-6">
        <h3 className="text-sm sm:text-base font-bold text-green-700 dark:text-green-300 mb-3">
          {language === 'th' ? '💡 เคล็ดลับ' : '💡 Tips'}
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-green-600 dark:text-green-400">
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">🗺️</span>
            <span>
              {language === 'th'
                ? 'Google Maps จะแสดงเส้นทางแบบเรียลไทม์ พร้อมเวลาออก-ถึง'
                : 'Google Maps shows real-time routes with departure/arrival times'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">⏱️</span>
            <span>
              {language === 'th'
                ? 'ดูเวลารถไฟขบวนถัดไปและการแจ้งเตือนความล่าช้า'
                : 'View next train times and delay notifications'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">💳</span>
            <span>
              {language === 'th'
                ? 'ใช้ Suica/Pasmo สำหรับการเดินทางทั้งหมดในโตเกียว'
                : 'Use Suica/Pasmo for all travel in Tokyo'}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
