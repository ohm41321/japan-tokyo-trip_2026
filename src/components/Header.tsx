"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage, Language } from "@/context/LanguageContext";
import { useChecklist } from "@/hooks/useChecklist";

function DualClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const thTime = now.toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const jpTime = now.toLocaleString("en-US", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div className="flex gap-3 sm:gap-4 text-white/90">
      <div className="text-right">
        <div className="text-xs opacity-70">🇹🇭 Thailand</div>
        <div className="text-sm sm:text-base font-mono font-bold">{thTime}</div>
      </div>
      <div className="text-right">
        <div className="text-xs opacity-70">🇯🇵 Japan</div>
        <div className="text-sm sm:text-base font-mono font-bold">{jpTime}</div>
      </div>
    </div>
  );
}

// Trip Countdown
const TRIP_START = new Date(2026, 3, 16); // April 16, 2026
const TRIP_END = new Date(2026, 3, 22); // April 22, 2026

function TripCountdown() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000); // update every minute
    return () => clearInterval(timer);
  }, []);

  const daysUntilStart = Math.ceil((TRIP_START.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const daysSinceStart = Math.floor((now.getTime() - TRIP_START.getTime()) / (1000 * 60 * 60 * 24));
  const daysUntilEnd = Math.ceil((TRIP_END.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  let label = "";
  if (daysUntilStart > 0) {
    label = `🛫 ${daysUntilStart} ${daysUntilStart === 1 ? 'day' : 'days'} to go!`;
  } else if (daysSinceStart >= 0 && daysUntilEnd > 0) {
    label = `📍 Day ${daysSinceStart + 1} of 7`;
  } else {
    label = "✅ Trip completed!";
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 text-center">
      <p className="text-xs sm:text-sm font-bold text-white">{label}</p>
      {daysUntilStart > 0 && (
        <p className="text-[10px] text-white/60">April 16-22, 2026</p>
      )}
    </div>
  );
}

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { getTotalProgress, mounted } = useChecklist();
  const progress = getTotalProgress();

  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700 dark:from-pink-900 dark:via-purple-900 dark:to-indigo-950"></div>
      <div className="relative container mx-auto px-4 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-1 sm:mb-2">🗼 Tokyo 2026</h1>
            <p className="text-sm sm:text-xl text-white/80">📅 April 16-22 • 7 Days</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <DualClock />
            <TripCountdown />
          </div>
        </div>
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}
              className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
              aria-label="Toggle language"
            >
              <span className="text-sm sm:text-base font-bold text-white">
                {language === 'en' ? '🇹🇭 TH' : '🇬🇧 EN'}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <span className="text-xl sm:text-2xl">☀️</span>
              ) : (
                <span className="text-xl sm:text-2xl">🌙</span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3 flex-wrap mb-4 sm:mb-6">
          <span className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm text-white">
            ✈️ TG 640
          </span>
          <span className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm text-white">
            🏨 Ueno
          </span>
          <span className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm text-white">
            🎫 JR Pass
          </span>
          <span className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm text-white">
            💳 Suica x4
          </span>
        </div>

        {mounted && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-xs sm:text-sm font-medium">
                {language === 'th' ? 'ความคืบหน้าทริป' : 'Trip Progress'}
              </span>
              <span className="text-white text-xs sm:text-sm">
                {progress.done}/{progress.total} ({progress.percent}%)
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2.5 sm:h-3">
              <div
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-2.5 sm:h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress.percent}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
