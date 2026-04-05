"use client";

import { useState } from "react";
import { useBudget, Expense } from "@/hooks/useBudget";
import { useLanguage } from "@/context/LanguageContext";

const categoryEmoji: Record<string, string> = {
  food: "🍜",
  transport: "🚃",
  shopping: "🛍️",
  activities: "🎭",
  accommodation: "🏨",
  other: "📦",
};

const categoryLabels: Record<string, string> = {
  food: "อาหาร",
  transport: "เดินทาง",
  shopping: "ช้อปปิ้ง",
  activities: "กิจกรรม",
  accommodation: "ที่พัก",
  other: "อื่นๆ",
};

const categoryLabelsTH: Record<string, string> = {
  food: "อาหาร",
  transport: "เดินทาง",
  shopping: "ช้อปปิ้ง",
  activities: "กิจกรรม",
  accommodation: "ที่พัก",
  other: "อื่นๆ",
};

function formatJPY(amount: number): string {
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", minimumFractionDigits: 0 }).format(amount);
}

function formatSimple(amount: number): string {
  if (amount >= 1000) return `¥${(amount / 1000).toFixed(1)}k`;
  return `¥${amount}`;
}

export default function BudgetTracker() {
  const { language } = useLanguage();
  const {
    expenses,
    dayBudgets,
    addExpense,
    deleteExpense,
    setDayLimit,
    getDayTotal,
    getTotalSpent,
    getTotalBudget,
    isOverBudget,
    mounted,
  } = useBudget();

  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [addingExpenseFor, setAddingExpenseFor] = useState<number | null>(null);
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const totalSpent = getTotalSpent();
  const totalBudget = getTotalBudget();
  const overallPercent = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  const handleSetBudget = (dayIndex: number) => {
    const val = parseFloat(editValue);
    if (!isNaN(val) && val >= 0) {
      setDayLimit(dayIndex, val);
    }
    setEditingDay(null);
    setEditValue("");
  };

  const handleDelete = (id: string) => {
    deleteExpense(id);
  };

  const getDayPercent = (dayIndex: number) => {
    const limit = dayBudgets[dayIndex]?.limit || 0;
    const spent = getDayTotal(dayIndex);
    return limit > 0 ? Math.round((spent / limit) * 100) : 0;
  };

  const getDayColor = (percent: number) => {
    if (percent >= 100) return "bg-red-500";
    if (percent >= 75) return "bg-orange-500";
    if (percent >= 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  if (!mounted) {
    return <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 animate-pulse" />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden max-w-2xl mx-auto">
      {/* Simple Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-5 sm:p-6 text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              {language === 'th' ? 'งบประมาณ' : 'Budget'}
            </h2>
            <p className="text-white/70 text-xs mt-0.5">
              {language === 'th' ? 'ติดตามค่าใช้จ่าย' : 'Track spending'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl sm:text-3xl font-bold">{formatJPY(totalSpent)}</p>
            {totalBudget > 0 && (
              <p className="text-white/70 text-xs">
                {language === 'th' ? 'จาก' : 'of'} {formatJPY(totalBudget)} ({overallPercent}%)
              </p>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {totalBudget > 0 && (
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${overallPercent >= 100 ? 'bg-red-400' : 'bg-white'}`}
              style={{ width: `${Math.min(overallPercent, 100)}%` }}
            />
          </div>
        )}
      </div>

      {/* Day List */}
      <div className="p-4 space-y-2">
        {dayBudgets.map((day, index) => {
          const dayTotal = getDayTotal(index);
          const dayLimit = day.limit;
          const percent = getDayPercent(index);
          const overBudget = isOverBudget(index);
          const isExpanded = expandedDay === index;
          const dayExpenses = expenses.filter(e => e.dayIndex === index).sort((a, b) => b.timestamp - a.timestamp);

          return (
            <div
              key={index}
              className={`rounded-xl border transition-all ${
                overBudget
                  ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'
              }`}
            >
              {/* Day Summary */}
              <div
                className="flex items-center gap-3 p-3 cursor-pointer"
                onClick={() => setExpandedDay(isExpanded ? null : index)}
              >
                {/* Day Number */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                      {language === 'th' ? `วันที่ ${index + 1}` : `Day ${index + 1}`}
                    </span>
                    <span className={`font-bold text-sm ${overBudget ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'}`}>
                      {formatJPY(dayTotal)}
                      {dayLimit > 0 && (
                        <span className="text-gray-400 dark:text-gray-500 font-normal ml-1 text-xs">
                          / {formatSimple(dayLimit)}
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  {dayLimit > 0 && (
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all ${getDayColor(percent)}`}
                        style={{ width: `${Math.min(percent, 100)}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Add Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAddingExpenseFor(index);
                  }}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white flex items-center justify-center hover:shadow-lg transition-all flex-shrink-0"
                  title={language === 'th' ? 'เพิ่มค่าใช้จ่าย' : 'Add expense'}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>

                {/* Expand Icon */}
                <svg
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-3 pb-3 border-t border-gray-200 dark:border-gray-600 pt-3">
                  {/* Day Budget Setting */}
                  <div className="flex items-center gap-2 mb-3">
                    {editingDay === index ? (
                      <div className="flex gap-2 flex-1">
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          placeholder="¥ 0"
                          className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 outline-none"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSetBudget(index);
                            if (e.key === 'Escape') setEditingDay(null);
                          }}
                          autoFocus
                        />
                        <button
                          onClick={() => handleSetBudget(index)}
                          className="px-3 py-1.5 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        >
                          {language === 'th' ? 'บันทึก' : 'Save'}
                        </button>
                        <button
                          onClick={() => setEditingDay(null)}
                          className="px-2 py-1.5 text-sm text-gray-500 hover:text-gray-700"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingDay(index);
                          setEditValue(dayLimit > 0 ? dayLimit.toString() : '');
                        }}
                        className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
                      >
                        {dayLimit > 0
                          ? (language === 'th' ? `✏️ ตั้งงบใหม่ (${formatJPY(dayLimit)})` : '✏️ Edit budget')
                          : (language === 'th' ? '🎯 ตั้งงบวันนี้' : '🎯 Set budget')
                        }
                      </button>
                    )}
                  </div>

                  {/* Expenses List */}
                  {dayExpenses.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-3">
                      {language === 'th' ? 'ยังไม่มีค่าใช้จ่าย' : 'No expenses yet'}
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      {dayExpenses.map((exp) => (
                        <div
                          key={exp.id}
                          className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg px-3 py-2 group"
                        >
                          <div className="flex-1 min-w-0 flex items-center gap-2">
                            <span className="text-base">{categoryEmoji[exp.category]}</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-gray-900 dark:text-gray-100 truncate">{exp.description}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {language === 'th' ? categoryLabelsTH[exp.category] : categoryLabels[exp.category]}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                              {formatJPY(exp.amount)}
                            </span>
                            <button
                              onClick={() => handleDelete(exp.id)}
                              className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1 transition-opacity"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Expense Modal */}
      {addingExpenseFor !== null && (
        <AddExpenseForm
          dayIndex={addingExpenseFor}
          onClose={() => setAddingExpenseFor(null)}
          onAdd={(expense) => {
            addExpense(expense);
            setAddingExpenseFor(null);
          }}
        />
      )}
    </div>
  );
}

function AddExpenseForm({ dayIndex, onClose, onAdd }: { dayIndex: number; onClose: () => void; onAdd: (e: Omit<Expense, 'id' | 'timestamp'>) => void }) {
  const { language } = useLanguage();
  const [category, setCategory] = useState<Expense['category']>('food');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;
    if (!description.trim()) return;
    onAdd({ dayIndex, category, amount: numAmount, description: description.trim() });
    setAmount('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          {language === 'th' ? `เพิ่มค่าใช้จ่าย - วันที่ ${dayIndex + 1}` : `Add Expense - Day ${dayIndex + 1}`}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Category Quick Select */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              {language === 'th' ? 'หมวดหมู่' : 'Category'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(categoryEmoji) as Expense['category'][]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`p-2 rounded-lg text-sm transition-all ${
                    category === cat
                      ? 'bg-purple-500 text-white shadow-md scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span className="text-lg">{categoryEmoji[cat]}</span>
                  <p className="text-xs mt-0.5">
                    {language === 'th' ? categoryLabelsTH[cat] : categoryLabels[cat]}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              {language === 'th' ? 'จำนวนเงิน (¥)' : 'Amount (¥)'}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2.5 text-xl font-bold rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-center focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              {language === 'th' ? 'รายละเอียด' : 'Description'}
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={language === 'th' ? 'เช่น ข้าวกลางวัน...' : 'e.g., Lunch...'}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              {language === 'th' ? 'ยกเลิก' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all shadow-md"
            >
              {language === 'th' ? 'เพิ่ม' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
