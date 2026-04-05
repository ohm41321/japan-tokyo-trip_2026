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
  { id: 'itinerary', icon: '📅', labelEN: 'Plan', labelTH: 'แผน', color: 'from-zinc-700 to-zinc-900' },
  { id: 'budget', icon: '💰', labelEN: 'Budget', labelTH: 'งบ', color: 'from-zinc-700 to-zinc-900' },
  { id: 'recommend', icon: '⭐', labelEN: 'Rec', labelTH: 'แนะนำ', color: 'from-zinc-700 to-zinc-900' },
  { id: 'emergency', icon: '🚨', labelEN: 'Help', labelTH: 'ฉุกเฉิน', color: 'from-zinc-700 to-zinc-900' },
];

const desktopActions: QuickAction[] = [
  { id: 'itinerary', icon: '📅', labelEN: 'Plan', labelTH: 'แผน', color: 'from-zinc-700 to-zinc-900' },
  { id: 'budget', icon: '💰', labelEN: 'Budget', labelTH: 'งบ', color: 'from-zinc-700 to-zinc-900' },
  { id: 'recommend', icon: '⭐', labelEN: 'Rec', labelTH: 'แนะนำ', color: 'from-zinc-700 to-zinc-900' },
  { id: 'hotel', icon: '🏨', labelEN: 'Hotel', labelTH: 'โรงแรม', color: 'from-zinc-700 to-zinc-900' },
  { id: 'weather', icon: '🌤️', labelEN: 'Weather', labelTH: 'อากาศ', color: 'from-zinc-700 to-zinc-900' },
  { id: 'yen', icon: '🎌', labelEN: 'Yen', labelTH: 'แปลงเงิน', color: 'from-zinc-700 to-zinc-900' },
  { id: 'phrase', icon: '🗣️', labelEN: 'Phrase', labelTH: 'ภาษา', color: 'from-zinc-700 to-zinc-900' },
  { id: 'nearby', icon: '📍', labelEN: 'Nearby', labelTH: 'แถวนี้', color: 'from-zinc-700 to-zinc-900' },
  { id: 'journal', icon: '📝', labelEN: 'Notes', labelTH: 'บันทึก', color: 'from-zinc-700 to-zinc-900' },
  { id: 'packing', icon: '🎒', labelEN: 'Pack', labelTH: 'จัดของ', color: 'from-zinc-700 to-zinc-900' },
  { id: 'transport', icon: '🚃', labelEN: 'Transit', labelTH: 'เดินทาง', color: 'from-zinc-700 to-zinc-900' },
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
      <div className="hidden lg:block sticky top-0 z-40 bg-zinc-900/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-3">
            {desktopActions.map((action) => (
              <button
                key={action.id}
                onClick={() => onTabChange(action.id)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 ${
                  activeTab === action.id
                    ? `bg-gradient-to-r ${action.color} text-white shadow-lg border border-zinc-600`
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-transparent'
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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-900/95 dark:bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-800 shadow-2xl">
        <div className="flex gap-1 px-2 py-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          {desktopActions.map((action) => {
            const isActive = activeTab === action.id;
            return (
              <button
                key={action.id}
                onClick={() => onTabChange(action.id)}
                className={`snap-start flex-shrink-0 flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 active:scale-95 min-w-[64px] ${
                  isActive
                    ? `bg-gradient-to-br ${action.color} text-white shadow-md border border-zinc-600`
                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent'
                }`}
              >
                <span className={`text-xl mb-0.5 transition-transform ${isActive ? 'scale-110' : ''}`}>
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
