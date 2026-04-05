"use client";

import { useState } from "react";
import { useBudget } from "@/hooks/useBudget";
import { useLanguage } from "@/context/LanguageContext";

const categoryOptions = [
  { id: "food", emoji: "🍜", labelEN: "Food", labelTH: "อาหาร" },
  { id: "transport", emoji: "🚃", labelEN: "Transit", labelTH: "เดินทาง" },
  { id: "shopping", emoji: "🛍️", labelEN: "Shopping", labelTH: "ช้อปปิ้ง" },
  { id: "activities", emoji: "🎭", labelEN: "Activities", labelTH: "กิจกรรม" },
  { id: "accommodation", emoji: "🏨", labelEN: "Stay", labelTH: "ที่พัก" },
  { id: "other", emoji: "📦", labelEN: "Other", labelTH: "อื่นๆ" },
] as const;

const TRIP_START = new Date(2026, 3, 16);

function getCurrentDayIndex(): number {
  const now = new Date();
  const diff = Math.floor((now.getTime() - TRIP_START.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return 0;
  if (diff >= 7) return 6;
  return diff;
}

function formatJPY(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

export default function BudgetCombined() {
  const { language } = useLanguage();
  const {
    expenses, addExpense, deleteExpense, setDayLimit,
    getDayTotal, dayBudgets, getTotalSpent, getTotalBudget, mounted,
  } = useBudget();

  const todayIndex = getCurrentDayIndex();

  // Quick Add
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("food");
  const [description, setDescription] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  // UI state
  const [view, setView] = useState<"add" | "overview">("add");
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const totalSpent = getTotalSpent();
  const totalBudget = getTotalBudget();
  const todayTotal = getDayTotal(todayIndex);
  const todayBudget = dayBudgets[todayIndex]?.limit || 0;
  const todayOver = todayBudget > 0 && todayTotal > todayBudget;
  const allDaysOverBudget = dayBudgets.filter(d => d.limit > 0 && getDayTotal(d.dayIndex) > d.limit).length;

  const handleQuickAdd = () => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return;
    const cat = selectedCategory as typeof categoryOptions[number]["id"];
    const desc = description.trim() || `${categoryOptions.find(c => c.id === cat)?.emoji} ${num}¥`;
    addExpense({ dayIndex: todayIndex, category: cat, amount: num, description: desc });
    setAmount("");
    setDescription("");
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 800);
  };

  const handleSetBudget = (dayIndex: number) => {
    const val = parseFloat(editValue);
    if (!isNaN(val) && val >= 0) setDayLimit(dayIndex, val);
    setEditingDay(null);
    setEditValue("");
  };

  if (!mounted) {
    return <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-pulse" />;
  }

  // ─── SUMMARY CARDS ───
  const summaryCards = [
    {
      label: language === 'th' ? 'ใช้ทั้งหมด' : 'Total Spent',
      value: `${totalSpent.toLocaleString()}¥`,
      sub: totalBudget > 0 ? `${Math.round((totalSpent / totalBudget) * 100)}%` : '',
      gradient: "from-violet-400 to-purple-500",
      emoji: "💰",
    },
    {
      label: language === 'th' ? 'งบรวม' : 'Total Budget',
      value: totalBudget > 0 ? `${totalBudget.toLocaleString()}¥` : (language === 'th' ? 'ยังไม่ได้ตั้ง' : 'Not set'),
      sub: allDaysOverBudget > 0 ? `${allDaysOverBudget} วันเกินงบ` : '',
      gradient: totalBudget > 0 ? "from-blue-400 to-indigo-500" : "from-gray-400 to-gray-500",
      emoji: totalBudget > 0 ? "📊" : "🎯",
    },
    {
      label: language === 'th' ? 'วันนี้ใช้' : 'Today',
      value: `${todayTotal.toLocaleString()}¥`,
      sub: todayBudget > 0 ? (todayOver ? '⚠️ เกิน!' : `งบ ${todayBudget.toLocaleString()}¥`) : '',
      gradient: todayOver ? "from-red-400 to-rose-500" : "from-emerald-400 to-teal-500",
      emoji: "📍",
    },
  ];

  // ─── RECENT EXPENSES ───
  const recentExpenses = [...expenses].sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);

  // ─── MAIN RENDER ───
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-400 to-indigo-400 p-4 sm:p-5 text-white">
        <h2 className="text-xl sm:text-2xl font-bold">
          {language === 'th' ? 'งบประมาณ' : 'Budget'}
        </h2>
        <p className="text-white/60 text-xs mt-0.5">
          {language === 'th' ? 'Day' : 'Day'} {todayIndex + 1} / 7
        </p>
      </div>

      {/* Summary Cards */}
      <div className="px-3 sm:px-4 pt-3 sm:pt-4">
        <div className="grid grid-cols-3 gap-2">
          {summaryCards.map((card, i) => (
            <div key={i} className={`bg-gradient-to-br ${card.gradient} rounded-xl p-2.5 sm:p-3 text-white`}>
              <span className="text-lg sm:text-xl">{card.emoji}</span>
              <p className="text-[10px] sm:text-xs opacity-80 mt-0.5 truncate">{card.label}</p>
              <p className="text-sm sm:text-base font-bold mt-0.5 truncate">{card.value}</p>
              {card.sub && <p className="text-[9px] sm:text-[10px] opacity-70 truncate">{card.sub}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* View Toggle */}
      <div className="px-3 sm:px-4 pt-3 sm:pt-4">
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
          <button
            onClick={() => setView("add")}
            className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
              view === "add"
                ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            ➕ {language === 'th' ? 'จดจ่าย' : 'Add'}
          </button>
          <button
            onClick={() => setView("overview")}
            className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
              view === "overview"
                ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            📊 {language === 'th' ? 'ภาพรวม' : 'Overview'}
          </button>
        </div>
      </div>

      {/* ─── ADD VIEW ─── */}
      {view === "add" && (
        <div className="p-3 sm:p-4 space-y-3">
          {/* Amount */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              {language === 'th' ? 'จำนวนเงิน' : 'Amount'}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400">¥</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleQuickAdd(); }}
                placeholder="0"
                className={`w-full pl-10 pr-4 py-4 text-3xl font-bold rounded-xl border text-center transition-all outline-none ${
                  justAdded
                    ? 'border-green-400 bg-green-50 dark:bg-green-900/20 ring-2 ring-green-400'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-400'
                }`}
                inputMode="numeric"
                autoFocus
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              {language === 'th' ? 'หมวดหมู่' : 'Category'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {categoryOptions.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-3 rounded-xl text-sm transition-all active:scale-95 ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-purple-400 to-indigo-400 text-white shadow-md scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span className="text-2xl block">{cat.emoji}</span>
                  <span className="text-xs mt-0.5 block font-medium">
                    {language === 'th' ? cat.labelTH : cat.labelEN}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              {language === 'th' ? 'รายละเอียด (ไม่จำเป็น)' : 'Description (optional)'}
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleQuickAdd(); }}
              placeholder={language === 'th' ? 'เช่น ข้าวแกงกะหรี่...' : 'e.g., Curry rice...'}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-400 outline-none text-sm"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={handleQuickAdd}
            disabled={!amount || parseFloat(amount) <= 0}
            className={`w-full py-4 rounded-xl text-base font-bold transition-all active:scale-95 ${
              amount && parseFloat(amount) > 0
                ? 'bg-gradient-to-r from-purple-400 to-indigo-400 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            {justAdded ? '✅ Saved!' : `💾  ${language === 'th' ? 'บันทึก' : 'Save'}`}
          </button>

          {/* Recent Expenses */}
          {recentExpenses.length > 0 && (
            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                {language === 'th' ? '📝 ล่าสุด' : '📝 Recent'}
              </p>
              <div className="space-y-1">
                {recentExpenses.map((exp) => (
                  <div key={exp.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2 group">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="text-base flex-shrink-0">{categoryOptions.find(c => c.id === exp.category)?.emoji}</span>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-700 dark:text-gray-300 truncate">{exp.description}</p>
                        <p className="text-[10px] text-gray-400">
                          D{exp.dayIndex + 1} • {new Date(exp.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{exp.amount.toLocaleString()}¥</span>
                      <button
                        onClick={() => deleteExpense(exp.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 p-0.5 transition-opacity"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── OVERVIEW VIEW ─── */}
      {view === "overview" && (
        <div className="p-3 sm:p-4 space-y-2">
          {dayBudgets.map((day, index) => {
            const dayTotal = getDayTotal(index);
            const dayLimit = day.limit;
            const percent = dayLimit > 0 ? Math.round((dayTotal / dayLimit) * 100) : 0;
            const overBudget = dayLimit > 0 && dayTotal > dayLimit;
            const isToday = index === todayIndex;
            const isExpanded = expandedDay === index;
            const dayExpenses = expenses.filter(e => e.dayIndex === index).sort((a, b) => b.timestamp - a.timestamp);
            const pctColor = percent >= 100 ? "bg-red-500" : percent >= 75 ? "bg-orange-500" : percent >= 50 ? "bg-yellow-500" : "bg-green-500";

            return (
              <div
                key={index}
                className={`rounded-xl border-2 transition-all ${
                  isToday
                    ? 'border-purple-400 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/10'
                    : overBudget
                      ? 'border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'
                }`}
              >
                {/* Day Row - always shows bar */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${
                        isToday ? 'bg-gradient-to-br from-purple-400 to-indigo-400' : overBudget ? 'bg-red-500' : 'bg-purple-400'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                          {language === 'th' ? 'วันที่' : 'Day'} {index + 1}
                          {isToday && <span className="ml-1 text-[10px] text-purple-500">• วันนี้</span>}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${overBudget ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'}`}>
                        {dayTotal.toLocaleString()}¥
                      </p>
                      {dayLimit > 0 && (
                        <p className="text-[10px] text-gray-400">/ {formatJPY(dayLimit)}¥ ({percent}%)</p>
                      )}
                    </div>
                  </div>

                  {/* Progress bar - always visible */}
                  {dayLimit > 0 ? (
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className={`h-2 rounded-full ${pctColor}`} style={{ width: `${Math.min(percent, 100)}%` }} />
                    </div>
                  ) : (
                    <button
                      onClick={() => { setEditingDay(index); setEditValue(''); }}
                      className="w-full py-1.5 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-xs text-gray-400 dark:text-gray-500 hover:border-purple-400 hover:text-purple-500 transition-colors"
                    >
                      {language === 'th' ? '+ ตั้งงบวันนี้' : '+ Set budget'}
                    </button>
                  )}

                  {/* Expanded: expenses + edit budget */}
                  {isExpanded && dayExpenses.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600 space-y-1">
                      {dayExpenses.map((exp) => (
                        <div key={exp.id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg px-2 py-1.5 text-xs group">
                          <div className="flex items-center gap-1.5 min-w-0 flex-1">
                            <span>{categoryOptions.find(c => c.id === exp.category)?.emoji}</span>
                            <span className="truncate text-gray-700 dark:text-gray-300">{exp.description}</span>
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className="font-bold">{exp.amount.toLocaleString()}¥</span>
                            <button onClick={() => deleteExpense(exp.id)} className="opacity-0 group-hover:opacity-100 text-red-400 p-0.5">✕</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Edit budget inline */}
                  {editingDay === index && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        placeholder="¥ 0"
                        className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-400 outline-none"
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSetBudget(index); if (e.key === 'Escape') setEditingDay(null); }}
                        autoFocus
                      />
                      <button onClick={() => handleSetBudget(index)} className="px-3 py-1.5 text-sm bg-purple-500 text-white rounded-lg">{language === 'th' ? 'บันทึก' : 'Save'}</button>
                      <button onClick={() => setEditingDay(null)} className="px-2 text-gray-400">✕</button>
                    </div>
                  )}

                  {/* Expand/collapse toggle */}
                  {dayExpenses.length > 0 && (
                    <button
                      onClick={() => setExpandedDay(isExpanded ? null : index)}
                      className="w-full mt-1 text-[10px] text-gray-400 dark:text-gray-500 hover:text-purple-500 transition-colors"
                    >
                      {isExpanded
                        ? (language === 'th' ? 'ยุบ ▲' : 'Collapse ▲')
                        : `${dayExpenses.length} ${language === 'th' ? 'รายการ ▼' : 'items ▼'}`
                      }
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
