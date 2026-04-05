"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface QuickAction {
  id: string;
  icon: string;
  labelEN: string;
  labelTH: string;
  color: string;
}

const mobileActions: QuickAction[] = [
  { id: 'itinerary', icon: '📅', labelEN: 'Plan', labelTH: 'แผน', color: 'from-pink-500 to-rose-500' },
  { id: 'budget', icon: '💰', labelEN: 'Budget', labelTH: 'งบ', color: 'from-purple-500 to-indigo-500' },
  { id: 'weather', icon: '🌤️', labelEN: 'Weather', labelTH: 'อากาศ', color: 'from-blue-500 to-cyan-500' },
  { id: 'emergency', icon: '🚨', labelEN: 'Help', labelTH: 'ฉุกเฉิน', color: 'from-red-500 to-orange-500' },
];

const desktopActions: QuickAction[] = [
  { id: 'itinerary', icon: '📅', labelEN: 'Plan', labelTH: 'แผน', color: 'from-pink-500 to-rose-500' },
  { id: 'budget', icon: '💰', labelEN: 'Budget', labelTH: 'งบ', color: 'from-purple-500 to-indigo-500' },
  { id: 'weather', icon: '🌤️', labelEN: 'Weather', labelTH: 'อากาศ', color: 'from-blue-500 to-cyan-500' },
  { id: 'timeline', icon: '⏰', labelEN: 'Time', labelTH: 'เวลา', color: 'from-indigo-500 to-blue-500' },
  { id: 'journal', icon: '📝', labelEN: 'Notes', labelTH: 'บันทึก', color: 'from-amber-500 to-orange-500' },
  { id: 'packing', icon: '🎒', labelEN: 'Pack', labelTH: 'จัดของ', color: 'from-green-500 to-teal-500' },
  { id: 'transport', icon: '🚃', labelEN: 'Transit', labelTH: 'เดินทาง', color: 'from-cyan-500 to-blue-500' },
  { id: 'emergency', icon: '🚨', labelEN: 'Help', labelTH: 'ฉุกเฉิน', color: 'from-red-500 to-orange-500' },
];

interface QuickActionsBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function QuickActionsBar({ activeTab, onTabChange }: QuickActionsBarProps) {
  const { language } = useLanguage();

  return (
    <>
      {/* Desktop: Top tabs */}
      <div className="hidden lg:block sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-3">
            {desktopActions.map((action) => (
              <button
                key={action.id}
                onClick={() => onTabChange(action.id)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === action.id
                    ? `bg-gradient-to-r ${action.color} text-white shadow-lg scale-105`
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{action.icon}</span>
                {language === 'th' ? action.labelTH : action.labelEN}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Bottom bar (1 row, scrollable, all 8 buttons) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 shadow-2xl">
        <div className="flex gap-1 px-2 py-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          {desktopActions.map((action) => {
            const isActive = activeTab === action.id;
            return (
              <button
                key={action.id}
                onClick={() => onTabChange(action.id)}
                className={`snap-start flex-shrink-0 flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all min-w-[64px] ${
                  isActive
                    ? `bg-gradient-to-br ${action.color} text-white shadow-md scale-105`
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className={`text-xl mb-0.5 ${isActive ? 'scale-110' : ''}`}>
                  {action.icon}
                </span>
                <span className="text-xs font-medium leading-tight whitespace-nowrap">
                  {language === 'th' ? action.labelTH : action.labelEN}
                </span>
              </button>
            );
          })}
        </div>
        {/* Safe area for iPhone */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </>
  );
}
