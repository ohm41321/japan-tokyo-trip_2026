"use client";

import { useState } from "react";
import { useWeather, DayWeather } from "@/hooks/useWeather";
import { useLanguage } from "@/context/LanguageContext";

const conditionEmoji: Record<string, string> = {
  sunny: "☀️",
  "partly-cloudy": "⛅",
  cloudy: "☁️",
  rain: "🌧️",
  "heavy-rain": "⛈️",
  snow: "❄️",
};

export default function WeatherWidget() {
  const { weatherData, loading, error, lastUpdated } = useWeather();
  const { language } = useLanguage();
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌤️</span>
            <div>
              <h3 className="text-sm font-bold">
                {language === 'th' ? 'สภาพอากาศ' : 'Weather'}
              </h3>
              {!error && lastUpdated && (
                <p className="text-white/60 text-xs">
                  {lastUpdated}
                </p>
              )}
            </div>
          </div>
          {hasRainyDays && (
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
              ☂️ {language === 'th' ? 'มีฝน' : 'Rain'}
            </span>
          )}
        </div>
      </div>

      {/* Day Grid - 2 rows */}
      <div className="p-3">
        <div className="grid grid-cols-4 gap-2">
          {weatherData.map((day, index) => {
            const isExpanded = expandedDay === day.dayIndex;
            const needsUmbrella = day.rainChance >= 50;

            return (
              <button
                key={day.dayIndex}
                onClick={() => setExpandedDay(isExpanded ? null : day.dayIndex)}
                className={`relative rounded-xl p-2 text-center transition-all ${
                  isExpanded
                    ? 'bg-blue-100 dark:bg-blue-900/40 ring-2 ring-blue-400 col-span-4'
                    : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {isExpanded ? (
                  /* Expanded View */
                  <div className="text-left py-1 animate-fadeIn">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                        {day.location}
                      </span>
                      <span className="text-2xl">
                        {conditionEmoji[day.condition]}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-2">
                        <p className="text-gray-500 dark:text-gray-400">
                          {language === 'th' ? 'สูง/ต่ำ' : 'High/Low'}
                        </p>
                        <p className="font-bold text-gray-900 dark:text-gray-100">
                          {day.highTemp}°/{day.lowTemp}°
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-2">
                        <p className="text-gray-500 dark:text-gray-400">
                          {language === 'th' ? 'ฝน' : 'Rain'}
                        </p>
                        <p className="font-bold text-gray-900 dark:text-gray-100">
                          {day.rainChance}%
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-2">
                        <p className="text-gray-500 dark:text-gray-400">
                          {language === 'th' ? 'ลม' : 'Wind'}
                        </p>
                        <p className="font-bold text-gray-900 dark:text-gray-100">
                          {day.windSpeed}
                        </p>
                      </div>
                    </div>
                    {day.clothing.length > 0 && (
                      <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                        <p className="font-semibold mb-1">
                          {language === 'th' ? '👕 แนะนำ:' : '👕 Wear:'}
                        </p>
                        <p>{day.clothing.slice(0, 2).join(' • ')}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Compact View */
                  <>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-0.5">
                      {language === 'th' ? `ว.${day.dayIndex + 1}` : `D${day.dayIndex + 1}`}
                    </p>
                    <span className="text-lg block mb-0.5">
                      {conditionEmoji[day.condition]}
                    </span>
                    <p className="text-xs font-bold text-gray-900 dark:text-gray-100">
                      {day.highTemp}°
                    </p>
                    {needsUmbrella && (
                      <span className="text-xs absolute -top-1 -right-1">
                        ☂️
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-2">
          {language === 'th' ? 'แตะเพื่อดูรายละเอียด' : 'Tap for details'}
        </p>
      </div>
    </div>
  );
}
