"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface JournalEntry {
  dayIndex: number;
  date: string;
  titleEN: string;
  titleTH: string;
  rating: number; // 1-5 stars
  notesEN: string;
  notesTH: string;
  highlightsEN: string[];
  highlightsTH: string[];
  savedAt: number;
}

const defaultEntries: JournalEntry[] = [
  { dayIndex: 0, date: "16/04/2026", titleEN: "Arrival & Ueno/Asakusa", titleTH: "เดินทางถึง & Ueno/Asakusa", rating: 0, notesEN: "", notesTH: "", highlightsEN: [], highlightsTH: [], savedAt: 0 },
  { dayIndex: 1, date: "17/04/2026", titleEN: "Gala Yuzawa Snow Day", titleTH: "หิมะ Gala Yuzawa", rating: 0, notesEN: "", notesTH: "", highlightsEN: [], highlightsTH: [], savedAt: 0 },
  { dayIndex: 2, date: "18/04/2026", titleEN: "Kamakura & Akihabara", titleTH: "Kamakura & Akihabara", rating: 0, notesEN: "", notesTH: "", highlightsEN: [], highlightsTH: [], savedAt: 0 },
  { dayIndex: 3, date: "19/04/2026", titleEN: "Kawagoe, Shibuya & Harajuku", titleTH: "Kawagoe, Shibuya & Harajuku", rating: 0, notesEN: "", notesTH: "", highlightsEN: [], highlightsTH: [], savedAt: 0 },
  { dayIndex: 4, date: "20/04/2026", titleEN: "Mt. Fuji Tour", titleTH: "ทัวร์ Mt. Fuji", rating: 0, notesEN: "", notesTH: "", highlightsEN: [], highlightsTH: [], savedAt: 0 },
  { dayIndex: 5, date: "21/04/2026", titleEN: "Tokyo Old Town & Coffee", titleTH: "เมืองเก่าโตเกียว & กาแฟ", rating: 0, notesEN: "", notesTH: "", highlightsEN: [], highlightsTH: [], savedAt: 0 },
  { dayIndex: 6, date: "22/04/2026", titleEN: "Departure Day", titleTH: "วันกลับ", rating: 0, notesEN: "", notesTH: "", highlightsEN: [], highlightsTH: [], savedAt: 0 },
];

export default function TravelJournal() {
  const { language } = useLanguage();
  const [entries, setEntries] = useState<JournalEntry[]>(defaultEntries);
  const [selectedDay, setSelectedDay] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("tokyo-trip-journal");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length > 0) {
          setEntries(parsed);
        }
      } catch (e) {
        console.error("Failed to load journal:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("tokyo-trip-journal", JSON.stringify(entries));
    }
  }, [entries, mounted]);

  const updateEntry = (dayIndex: number, updates: Partial<JournalEntry>) => {
    setEntries(prev =>
      prev.map(entry =>
        entry.dayIndex === dayIndex
          ? { ...entry, ...updates, savedAt: Date.now() }
          : entry
      )
    );
  };

  const currentEntry = entries[selectedDay];

  if (!currentEntry) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-pulse">
        <p className="text-center text-gray-500">Loading journal...</p>
      </div>
    );
  }

  const totalRated = entries.filter(e => e.rating > 0).length;
  const avgRating = totalRated > 0
    ? (entries.filter(e => e.rating > 0).reduce((sum, e) => sum + e.rating, 0) / totalRated).toFixed(1)
    : "---";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📝</span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                {language === 'th' ? 'บันทึกการเดินทาง' : 'Travel Journal'}
              </h2>
              <p className="text-white/70 text-xs">
                {language === 'th' ? 'บันทึกความทรงจำแต่ละวัน' : 'Daily memories & notes'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">
              {typeof avgRating === 'string' && avgRating === '---' ? avgRating : `${avgRating}⭐`}
            </p>
            <p className="text-white/70 text-xs">
              {totalRated}/7 {language === 'th' ? 'วัน' : 'days'}
            </p>
          </div>
        </div>
      </div>

      {/* Day Selector */}
      <div className="px-4 pt-3">
        <div className="flex gap-1.5 overflow-x-auto pb-2">
          {entries.map((entry, idx) => (
            <button
              key={entry.dayIndex}
              onClick={() => setSelectedDay(idx)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                selectedDay === idx
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <span className="block">{language === 'th' ? `ว.${entry.dayIndex + 1}` : `D${entry.dayIndex + 1}`}</span>
              {entry.rating > 0 && (
                <span className="block text-yellow-300">
                  {"⭐".repeat(entry.rating)}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Journal Entry */}
      <div className="p-4">
        {/* Day Title */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
            {language === 'th' ? currentEntry.titleTH : currentEntry.titleEN}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{currentEntry.date}</p>
        </div>

        {/* Star Rating */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
            {language === 'th' ? 'ให้คะแนนวันนี้' : 'Rate today'}
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => updateEntry(currentEntry.dayIndex, { rating: star })}
                className="text-2xl transition-transform hover:scale-110"
              >
                {star <= currentEntry.rating ? "⭐" : "☆"}
              </button>
            ))}
          </div>
          {currentEntry.rating > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {currentEntry.rating === 5 ? (language === 'th' ? 'ยอดเยี่ยม! 🎉' : 'Amazing! 🎉') :
               currentEntry.rating === 4 ? (language === 'th' ? 'ดีมาก! 😊' : 'Great! 😊') :
               currentEntry.rating === 3 ? (language === 'th' ? 'ดี 😊' : 'Good 😊') :
               currentEntry.rating === 2 ? (language === 'th' ? 'พอใช้' : 'Okay') :
               (language === 'th' ? 'ไม่ดี 😕' : 'Not great 😕')}
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
            {language === 'th' ? '📝 บันทึก' : '📝 Notes'}
          </label>
          <textarea
            value={language === 'th' ? currentEntry.notesTH : currentEntry.notesEN}
            onChange={(e) => {
              const field = language === 'th' ? 'notesTH' : 'notesEN';
              updateEntry(currentEntry.dayIndex, { [field]: e.target.value });
            }}
            placeholder={language === 'th' ? 'เขียนบันทึกวันนี้...' : 'Write about today...'}
            className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-amber-500 outline-none resize-none h-24"
          />
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
            {language === 'th' ? '🌟 จุดเด่นวันนี้ (กดเพิ่ม)' : '🌟 Highlights (tap to add)'}
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {(language === 'th' ? currentEntry.highlightsTH : currentEntry.highlightsEN).map((h, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs"
              >
                {h}
                <button
                  onClick={() => {
                    const field = language === 'th' ? 'highlightsTH' : 'highlightsEN';
                    const newHighlights = [...(language === 'th' ? currentEntry.highlightsTH : currentEntry.highlightsEN)];
                    newHighlights.splice(idx, 1);
                    updateEntry(currentEntry.dayIndex, { [field]: newHighlights });
                  }}
                  className="text-amber-500 hover:text-amber-700 ml-0.5"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <AddHighlight
            onAdd={(text) => {
              const field = language === 'th' ? 'highlightsTH' : 'highlightsEN';
              const current = language === 'th' ? currentEntry.highlightsTH : currentEntry.highlightsEN;
              updateEntry(currentEntry.dayIndex, { [field]: [...current, text] });
            }}
            language={language}
          />
        </div>

        {/* Saved indicator */}
        {currentEntry.savedAt > 0 && (
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            {language === 'th' ? '✅ บันทึกแล้ว' : '✅ Saved'} • {new Date(currentEntry.savedAt).toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
}

function AddHighlight({ onAdd, language }: { onAdd: (text: string) => void; language: string }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleAdd()}
        placeholder={language === 'th' ? 'เพิ่มจุดเด่น...' : 'Add highlight...'}
        className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-amber-500 outline-none"
      />
      <button
        onClick={handleAdd}
        className="px-3 py-1.5 text-sm bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all"
      >
        {language === 'th' ? 'เพิ่ม' : 'Add'}
      </button>
    </div>
  );
}
