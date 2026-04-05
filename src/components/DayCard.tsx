"use client";

import { useState } from "react";
import { DayPlan } from "@/data/itinerary";
import { useChecklist } from "@/hooks/useChecklist";
import { useLanguage } from "@/context/LanguageContext";

interface DayCardProps extends DayPlan {
  dayIndex: number;
  isToday?: boolean;
}

const gradients = [
  "from-pink-500 to-rose-500",
  "from-purple-500 to-indigo-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-amber-500",
  "from-teal-500 to-cyan-500",
  "from-red-500 to-pink-500",
];

export default function DayCard({ day, dayIndex, date, dayOfWeek, title, icon, transport, locations, notes, isToday }: DayCardProps) {
  const { toggleItem, toggleDay, getDayProgress, checkedItems, mounted } = useChecklist();
  const { language } = useLanguage();
  const [showMap, setShowMap] = useState<number | null>(null);
  const [collapsedItems, setCollapsedItems] = useState<Record<number, boolean>>({});
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const progress = getDayProgress(dayIndex);
  const gradient = gradients[(day - 1) % gradients.length];
  const allDone = progress.done === progress.total;

  const toggleCollapse = (index: number) => {
    setCollapsedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const expandAll = () => {
    const allExpanded: Record<number, boolean> = {};
    locations.forEach((_, i) => { allExpanded[i] = true; });
    setCollapsedItems(allExpanded);
  };

  const collapseAll = () => {
    setCollapsedItems({});
  };

  const getPriorityBadge = (priority?: number) => {
    if (!priority) return null;
    const badges: Record<number, { emoji: string; label: string; color: string }> = {
      5: { emoji: "🔥", label: language === 'th' ? 'ต้องไป!' : 'Must Go', color: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700" },
      4: { emoji: "⭐", label: language === 'th' ? 'แนะนำ' : 'Highly Rec', color: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700" },
      3: { emoji: "✨", label: language === 'th' ? 'น่าสนใจ' : 'Nice', color: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700" },
      2: { emoji: "👍", label: language === 'th' ? 'ตามสะดวก' : 'Optional', color: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600" },
      1: { emoji: "⏪", label: language === 'th' ? 'มีเวลาค่อยไป' : 'Skip if short', color: "bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700" },
    };
    const badge = badges[priority];
    if (!badge) return null;
    return (
      <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-medium border ${badge.color}`}>
        <span>{badge.emoji}</span>
        <span className="hidden sm:inline">{badge.label}</span>
      </span>
    );
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 ${
      isToday
        ? "ring-4 ring-pink-500 dark:ring-pink-400 shadow-xl shadow-pink-500/20 dark:shadow-pink-400/20 scale-[1.02]"
        : allDone
          ? "ring-2 ring-green-500 shadow-lg"
          : "shadow-lg"
    }`}>
      {isToday && (
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-center py-1.5 text-xs sm:text-sm font-bold tracking-wide today-pulse">
          📍 {language === 'th' ? 'วันนี้' : 'TODAY'}
        </div>
      )}
      {/* Clickable Header */}
      <button
        onClick={() => setIsCardExpanded(!isCardExpanded)}
        className={`w-full bg-gradient-to-r ${gradient} p-4 sm:p-6 text-white text-left hover:opacity-90 transition-opacity`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-3xl sm:text-4xl">{icon}</span>
            <div>
              <span className="text-2xl sm:text-3xl font-bold">Day {day}</span>
              {allDone && <span className="ml-2 text-base sm:text-lg">✅</span>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {mounted && (
              <span className="text-xs sm:text-sm bg-white/20 px-2 sm:px-3 py-1 rounded-full">
                {progress.percent}%
              </span>
            )}
            <svg 
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${isCardExpanded ? "rotate-180" : ""}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <p className="text-sm sm:text-lg opacity-90 mt-1">{date} • {dayOfWeek}</p>
        <h2 className="text-base sm:text-xl font-semibold">{title}</h2>

        {/* Progress Bar */}
        {mounted && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
              <span>
                {progress.done}/{progress.total} {language === 'th' ? 'เสร็จแล้ว' : 'done'}
              </span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                {progress.percent}%
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress.percent}%` }}
              ></div>
            </div>
          </div>
        )}
      </button>

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isCardExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="animate-fadeIn">
          {/* Transport Info */}
          {transport && (
            <div className="mx-4 sm:mx-6 mt-3 sm:mt-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-2 sm:p-3 rounded">
              <p className="text-xs sm:text-sm font-medium text-blue-900 dark:text-blue-300">🚃 {transport}</p>
            </div>
          )}

          {/* Check All Button */}
          <div className="px-4 sm:px-6 pt-4">
            <button
              onClick={() => toggleDay(dayIndex)}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all w-full"
            >
              {allDone
                ? (language === 'th' ? '☐ ยกเลิกทั้งหมด' : '☐ Uncheck All')
                : (language === 'th' ? '☑ เลือกทั้งหมด' : '☑ Check All')
              }
            </button>
          </div>

          {/* Collapse/Expand Controls */}
          {locations.length > 5 && (
            <div className="px-4 sm:px-6 pt-3 flex gap-2">
              <button
                onClick={expandAll}
                className="text-xs sm:text-sm text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300 font-medium transition-colors duration-150"
              >
                {language === 'th' ? 'ขยายทั้งหมด' : 'Expand All'}
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={collapseAll}
                className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 font-medium transition-colors duration-150"
              >
                {language === 'th' ? 'ยุบทั้งหมด' : 'Collapse All'}
              </button>
            </div>
          )}

          {/* Checklist */}
          <div className="p-4 sm:p-6">
            <ul className="space-y-2">
              {locations.map((location, itemIndex) => {
                const key = `${dayIndex}-${itemIndex}`;
                const isChecked = mounted ? checkedItems[key] : false;
                const isCollapsed = !collapsedItems[itemIndex];
                const needsCollapse = locations.length > 5;

                return (
                  <li key={itemIndex} className={`group rounded-lg transition-all ${isChecked ? "bg-green-50 dark:bg-green-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-700/50"}`}>
                    <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3">
                      <button
                        onClick={() => toggleItem(dayIndex, itemIndex)}
                        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 active:scale-90 ${
                          isChecked
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-gray-400 dark:border-gray-500 hover:border-pink-500"
                        }`}
                      >
                        {isChecked && (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div
                          className="flex items-center justify-between cursor-pointer select-none"
                          onClick={() => needsCollapse && toggleCollapse(itemIndex)}
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span className={`text-sm flex-1 truncate ${isChecked ? "line-through text-gray-500 dark:text-gray-500" : "text-gray-900 dark:text-gray-100"}`}>
                              {location.name}
                            </span>
                            {getPriorityBadge(location.priority)}
                          </div>
                          {needsCollapse && (
                            <svg
                              className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-2 ${isCollapsed ? "" : "rotate-180"}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </div>

                        {/* Expandable Content */}
                        {(!needsCollapse || !isCollapsed) && (
                          <div className="mt-2 space-y-2">
                            {/* Tips Section */}
                            {location.tips && location.tips.length > 0 && (
                              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-l-4 border-amber-400 dark:border-amber-600 rounded-r-lg p-3">
                                <div className="flex items-start gap-2 mb-2">
                                  <svg className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-xs font-semibold text-amber-900 dark:text-amber-300 uppercase tracking-wide">
                                    {language === 'th' ? '💡 เคล็ดลับและข้อควรระวัง' : '💡 Tips & Advice'}
                                  </span>
                                </div>
                                <ul className="space-y-1.5">
                                  {location.tips.map((tip, tipIndex) => (
                                    <li key={tipIndex} className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed flex items-start gap-2">
                                      <span className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0">•</span>
                                      <span>{tip}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Google Maps Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowMap(showMap === itemIndex ? null : itemIndex);
                              }}
                              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center gap-1"
                            >
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              {showMap === itemIndex
                                ? (language === 'th' ? 'ซ่อนแผนที่' : 'Hide Map')
                                : (language === 'th' ? 'ดูบนแผนที่' : 'View on Map')
                              }
                            </button>

                            {showMap === itemIndex && (
                              <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                                <iframe
                                  width="100%"
                                  height="200"
                                  style={{ border: 0 }}
                                  loading="lazy"
                                  src={`https://maps.google.com/maps?q=${encodeURIComponent(location.query)}&output=embed`}
                                ></iframe>
                                <div className="bg-gray-50 dark:bg-gray-700 p-2 flex justify-between items-center">
                                  <span className="text-xs text-gray-600 dark:text-gray-300 truncate">{location.query}</span>
                                  <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.query)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap ml-2"
                                  >
                                    {language === 'th' ? 'เปิดใน Maps ↗' : 'Open in Maps ↗'}
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {notes && (
              <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-3 rounded">
                <p className="text-xs sm:text-sm text-yellow-900 dark:text-yellow-300">📝 {notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
