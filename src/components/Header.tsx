"use client";

import { useTheme } from "@/context/ThemeContext";
import { useChecklist } from "@/hooks/useChecklist";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { getTotalProgress, mounted } = useChecklist();
  const progress = getTotalProgress();

  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700 dark:from-pink-900 dark:via-purple-900 dark:to-indigo-950"></div>
      <div className="relative container mx-auto px-4 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-1 sm:mb-2">🗼 Tokyo 2026</h1>
            <p className="text-sm sm:text-xl text-white/80">📅 April 16-22 • 7 Days</p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm flex-shrink-0 ml-2"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <span className="text-xl sm:text-2xl">☀️</span>
            ) : (
              <span className="text-xl sm:text-2xl">🌙</span>
            )}
          </button>
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
              <span className="text-white text-xs sm:text-sm font-medium">Progress</span>
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
