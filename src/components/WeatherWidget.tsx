"use client";

import { useState, useMemo } from "react";
import { useWeather, DayWeather, WeatherLocation } from "@/hooks/useWeather";
import { useLanguage } from "@/context/LanguageContext";
import { itineraryData } from "@/data/itinerary";

const conditionEmoji: Record<string, string> = {
  sunny: "☀️",
  "partly-cloudy": "⛅",
  cloudy: "☁️",
  rain: "🌧️",
  "heavy-rain": "⛈️",
  snow: "❄️",
};

const conditionColors: Record<string, { bg: string; gradient: string; ring: string; text: string }> = {
  sunny: { bg: "bg-amber-50 dark:bg-amber-900/20", gradient: "from-amber-400 to-orange-500", ring: "ring-amber-300 dark:ring-amber-700", text: "text-amber-700 dark:text-amber-300" },
  "partly-cloudy": { bg: "bg-sky-50 dark:bg-sky-900/20", gradient: "from-sky-400 to-blue-500", ring: "ring-sky-300 dark:ring-sky-700", text: "text-sky-700 dark:text-sky-300" },
  cloudy: { bg: "bg-gray-50 dark:bg-gray-700/30", gradient: "from-gray-400 to-slate-500", ring: "ring-gray-300 dark:ring-gray-600", text: "text-gray-700 dark:text-gray-300" },
  rain: { bg: "bg-blue-50 dark:bg-blue-900/20", gradient: "from-blue-400 to-indigo-500", ring: "ring-blue-300 dark:ring-blue-700", text: "text-blue-700 dark:text-blue-300" },
  "heavy-rain": { bg: "bg-indigo-50 dark:bg-indigo-900/20", gradient: "from-indigo-500 to-purple-600", ring: "ring-indigo-300 dark:ring-indigo-700", text: "text-indigo-700 dark:text-indigo-300" },
  snow: { bg: "bg-cyan-50 dark:bg-cyan-900/20", gradient: "from-cyan-400 to-blue-500", ring: "ring-cyan-300 dark:ring-cyan-700", text: "text-cyan-700 dark:text-cyan-300" },
};

// สถานที่ที่มีในทริปจริงๆ (จาก itinerary)
const weatherLocations: WeatherLocation[] = [
  { id: 'tokyo', name: 'Tokyo / Ueno / Asakusa', nameTH: 'โตเกียว / อุเอโนะ / อาซากุสะ', lat: 35.6762, lng: 139.6503 },
  { id: 'narita', name: 'Narita Airport', nameTH: 'สนามบินนาริตะ', lat: 35.7767, lng: 140.3858 },
  { id: 'yuzawa', name: 'Gala Yuzawa', nameTH: 'กาล่า ยูซาวะ', lat: 36.8681, lng: 138.9361 },
  { id: 'kamakura', name: 'Kamakura', nameTH: 'คามะคุระ', lat: 35.3191, lng: 139.5467 },
  { id: 'kawagoe', name: 'Kawagoe', nameTH: 'คาวาโกเอะ', lat: 35.9252, lng: 139.4856 },
  { id: 'fuji', name: 'Mt. Fuji Area', nameTH: 'ภูเขาไฟฟูจิ', lat: 35.3606, lng: 138.7274 },
];

// หาว่าวันนี้ควรดูสภาพอากาศที่ไหนตาม itinerary
function getTodayRecommendation(todayIndex: number) {
  if (todayIndex < 0 || todayIndex >= itineraryData.length) return null;
  
  const todayPlan = itineraryData[todayIndex];
  
  // หาสถานที่ที่มีความสำคัญสูง (priority >= 4)
  const importantPlaces = todayPlan.locations.filter(l => (l.priority || 0) >= 4);
  
  if (importantPlaces.length === 0) return null;
  
  // หาว่าสถานที่ไหนตรงกับ weatherLocations
  for (const place of importantPlaces) {
    const query = place.query.toLowerCase();
    for (const loc of weatherLocations) {
      if (query.includes(loc.name.toLowerCase()) || 
          query.includes(loc.id.toLowerCase()) ||
          place.name.toLowerCase().includes(loc.name.toLowerCase())) {
        return {
          location: loc,
          dayPlan: todayPlan,
          places: importantPlaces.slice(0, 3), // แสดง 3 สถานที่แรก
        };
      }
    }
  }
  
  // ถ้าไม่เจอ ให้คืนสถานที่แรก
  return {
    location: weatherLocations[0],
    dayPlan: todayPlan,
    places: importantPlaces.slice(0, 3),
  };
}

export default function WeatherWidget() {
  const { language } = useLanguage();
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState('tokyo');

  const selectedLocation = weatherLocations.find(l => l.id === selectedLocationId);
  
  // ส่ง location เข้า useWeather เพื่อโหลดสภาพอากาศของสถานที่นั้น
  const { weatherData, loading, error, lastUpdated } = useWeather(selectedLocation);

  // หาว่าวันนี้คือวันที่เท่าไหร่ของทริป
  const todayIndex = useMemo(() => {
    const TRIP_START = new Date(2026, 3, 16); // 16 เมษายน 2026
    const now = new Date();
    const diff = Math.floor((now.getTime() - TRIP_START.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 0; // ก่อนทริป
    if (diff >= itineraryData.length) return itineraryData.length - 1; // หลังทริป
    return diff;
  }, []);

  // หาคำแนะนำสำหรับวันนี้
  const todayRecommendation = useMemo(() => getTodayRecommendation(todayIndex), [todayIndex]);

  // ถ้ามี recommendation ให้เปลี่ยน location เป็นที่แนะนำ
  useMemo(() => {
    if (todayRecommendation && todayRecommendation.location) {
      setSelectedLocationId(todayRecommendation.location.id);
    }
  }, [todayRecommendation]);

  const hasRainyDays = weatherData.some((day) => day.rainChance >= 50);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 animate-pulse h-64">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🌤️</span>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Location Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-3 sm:p-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {language === 'th' ? '📍 เลือกสถานที่ดูสภาพอากาศ' : '📍 Select Location'}
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {weatherLocations.map((loc) => {
            const isSelected = selectedLocationId === loc.id;
            const isRecommended = todayRecommendation?.location?.id === loc.id;
            
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedLocationId(loc.id)}
                className={`relative px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all min-h-[44px] ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {isRecommended && !isSelected && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                )}
                <span className="block text-base">
                  {loc.id === 'yuzawa' ? '🎿' : loc.id === 'kamakura' ? '🗿' : loc.id === 'narita' ? '✈️' : loc.id === 'fuji' ? '🗻' : loc.id === 'kawagoe' ? '🏯' : '🏙️'}
                </span>
                <span className="block text-[10px] sm:text-xs mt-0.5 truncate">
                  {language === 'th' ? loc.nameTH : loc.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Today's Recommendation Highlight */}
      {todayRecommendation && todayRecommendation.location && (
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl p-3 sm:p-4 text-white shadow-lg">
          <div className="flex items-start gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 flex-shrink-0">
              <span className="text-xl">
                {todayRecommendation.location.id === 'yuzawa' ? '🎿' : 
                 todayRecommendation.location.id === 'kamakura' ? '🗿' : 
                 todayRecommendation.location.id === 'narita' ? '✈️' : 
                 todayRecommendation.location.id === 'fuji' ? '🗻' : 
                 todayRecommendation.location.id === 'kawagoe' ? '🏯' : '🏙️'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold bg-white/20 px-1.5 py-0.5 rounded">
                  {language === 'th' ? 'วันนี้' : 'Today'}
                </span>
                <span className="text-xs opacity-90">
                  Day {todayIndex + 1} • {itineraryData[todayIndex]?.date}
                </span>
              </div>
              <p className="text-sm font-bold mb-1">
                {language === 'th' ? 'ควรดูสภาพอากาศที่' : 'Check weather at'}
                <span className="ml-1">
                  {language === 'th' ? todayRecommendation.location.nameTH : todayRecommendation.location.name}
                </span>
              </p>
              
              {/* สถานที่สำคัญวันนี้ */}
              {todayRecommendation.places.length > 0 && (
                <div className="bg-white/10 backdrop-blur-sm rounded px-2 py-1.5">
                  <p className="text-[10px] opacity-90">
                    {language === 'th' ? 'สถานที่สำคัญ:' : 'Key places:'}
                  </p>
                  <ul className="space-y-0.5">
                    {todayRecommendation.places.map((place, idx) => (
                      <li key={idx} className="text-xs flex items-start gap-1">
                        <span className="opacity-75">•</span>
                        <span className="truncate">{place.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Weather Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 p-4 sm:p-5 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2.5">
                <span className="text-3xl">🌤️</span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">
                  {language === 'th' ? `สภาพอากาศ 7 วัน` : '7-Day Weather'}
                </h3>
                <p className="text-blue-100 text-xs sm:text-sm">
                  {selectedLocation ? (language === 'th' ? selectedLocation.nameTH : selectedLocation.name) : (language === 'th' ? 'โตเกียวและพื้นที่ใกล้เคียง' : 'Tokyo & surrounding areas')}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <p className="text-[10px] text-blue-100">Powered by</p>
                <p className="text-xs font-bold">Open-Meteo</p>
                <p className="text-[10px] text-blue-200/70">open-meteo.com</p>
              </div>
            </div>
          </div>

          {hasRainyDays && (
            <div className="mt-3 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
              <span className="text-lg">☂️</span>
              <p className="text-xs sm:text-sm">
                {language === 'th' ? 'มีวันที่ฝนตก ควรพกร่ม' : 'Rainy days expected - bring an umbrella'}
              </p>
            </div>
          )}
        </div>

        {/* Day Grid */}
        <div className="p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {weatherData.map((day) => {
              const isExpanded = expandedDay === day.dayIndex;
              const needsUmbrella = day.rainChance >= 50;
              const colors = conditionColors[day.condition] || conditionColors["partly-cloudy"];

              return (
                <button
                  key={day.dayIndex}
                  onClick={() => setExpandedDay(isExpanded ? null : day.dayIndex)}
                  className={`relative text-left rounded-xl border-2 p-3 transition-all duration-200 hover:shadow-md ${
                    isExpanded
                      ? `ring-2 ${colors.ring} shadow-lg border-transparent`
                      : `border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 ${colors.bg}`
                  }`}
                >
                  {/* Day number + date */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white bg-gradient-to-br ${colors.gradient}`}>
                        {day.dayIndex + 1}
                      </span>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {day.date}
                      </span>
                    </div>
                    {needsUmbrella && (
                      <span className="text-sm" title={language === 'th' ? 'ฝนตก' : 'Rain'}>
                        ☂️
                      </span>
                    )}
                  </div>

                  {/* Weather icon + temps */}
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{conditionEmoji[day.condition]}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-1">
                        <span className={`text-2xl font-bold ${colors.text}`}>
                          {day.highTemp}°
                        </span>
                        <span className="text-sm text-gray-400 dark:text-gray-500">
                          /{day.lowTemp}°
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {day.location}
                      </p>
                    </div>
                  </div>

                  {/* Rain chance bar */}
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-[10px] text-gray-400 dark:text-gray-500 mb-1">
                      <span>{language === 'th' ? 'โอกาสฝน' : 'Rain'}</span>
                      <span className={`font-semibold ${day.rainChance >= 50 ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                        {day.rainChance}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all ${
                          day.rainChance >= 60
                            ? 'bg-blue-500'
                            : day.rainChance >= 30
                              ? 'bg-amber-400'
                              : 'bg-green-400'
                        }`}
                        style={{ width: `${day.rainChance}%` }}
                      />
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className={`rounded-lg p-2 ${colors.bg}`}>
                          <p className="text-gray-500 dark:text-gray-400 text-[10px]">
                            {language === 'th' ? 'ความชื้น' : 'Humidity'}
                          </p>
                          <p className={`font-bold ${colors.text}`}>
                            {day.humidity}%
                          </p>
                        </div>
                        <div className={`rounded-lg p-2 ${colors.bg}`}>
                          <p className="text-gray-500 dark:text-gray-400 text-[10px]">
                            {language === 'th' ? 'ลม' : 'Wind'}
                          </p>
                          <p className={`font-bold ${colors.text}`}>
                            {day.windSpeed} km/h
                          </p>
                        </div>
                        <div className={`rounded-lg p-2 ${colors.bg}`}>
                          <p className="text-gray-500 dark:text-gray-400 text-[10px]">
                            {language === 'th' ? 'สภาพ' : 'Condition'}
                          </p>
                          <p className={`font-bold ${colors.text} capitalize text-[10px]`}>
                            {day.condition.replace('-', ' ')}
                          </p>
                        </div>
                      </div>

                      {/* Clothing */}
                      {day.clothing.length > 0 && (
                        <div className="mt-2">
                          <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
                            {language === 'th' ? '👕 แนะนำ:' : '👕 Wear:'}
                          </p>
                          <ul className="space-y-0.5">
                            {day.clothing.slice(0, 3).map((item, idx) => (
                              <li key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1">
                                <span className="text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tips */}
                      {day.tips.length > 0 && (
                        <div className="mt-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-2 border-l-2 border-amber-400">
                          <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 mb-1">
                            {language === 'th' ? '💡 เคล็ดลับ' : '💡 Tips'}
                          </p>
                          <ul className="space-y-0.5">
                            {day.tips.slice(0, 2).map((tip, idx) => (
                              <li key={idx} className="text-xs text-gray-700 dark:text-gray-300 leading-snug">
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {language === 'th' ? 'แตะเพื่อดูรายละเอียด' : 'Tap a card for details'}
            </p>
            {lastUpdated && !error && (
              <p className="text-[10px] text-gray-400 dark:text-gray-500">
                {language === 'th' ? 'อัพเดท:' : 'Updated:'} {lastUpdated}
              </p>
            )}
            {error && (
              <p className="text-[10px] text-red-400 dark:text-red-500">
                {language === 'th' ? 'ใช้ข้อมูลสำรอง' : 'Fallback data'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
