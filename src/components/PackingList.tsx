"use client";

import { useState } from 'react';
import { usePackingList, PackingItem } from '@/hooks/usePackingList';
import { useLanguage } from '@/context/LanguageContext';

const categoryConfig = {
  documents: { emoji: '📋', labelEN: 'Documents', labelTH: 'เอกสาร', color: 'blue', gradient: 'from-blue-400 to-indigo-400' },
  electronics: { emoji: '🔌', labelEN: 'Electronics', labelTH: 'อิเล็กทรอนิกส์', color: 'purple', gradient: 'from-purple-400 to-indigo-400' },
  clothing: { emoji: '👕', labelEN: 'Clothing', labelTH: 'เสื้อผ้า', color: 'pink', gradient: 'from-pink-400 to-rose-400' },
  toiletries: { emoji: '🧴', labelEN: 'Toiletries', labelTH: 'ของใช้ส่วนตัว', color: 'yellow', gradient: 'from-yellow-400 to-orange-400' },
  medicine: { emoji: '💊', labelEN: 'Medicine', labelTH: 'ยา', color: 'red', gradient: 'from-red-400 to-pink-400' },
  miscellaneous: { emoji: '📦', labelEN: 'Misc', labelTH: 'เบ็ดเตล็ด', color: 'gray', gradient: 'from-gray-400 to-slate-400' },
};

export default function PackingList() {
  const { items, mounted, toggleItem, addItem, deleteItem, resetAll, getByCategory, getProgress, getCategoryProgress } = usePackingList();
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<PackingItem['category'] | 'all'>('all');
  const [filter, setFilter] = useState<'all' | 'packed' | 'unpacked'>('all');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<PackingItem['category']>('documents');

  const progress = getProgress();
  const allPacked = progress.packed === progress.total;

  const filteredItems = items.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (filter === 'packed' && !item.packed) return false;
    if (filter === 'unpacked' && item.packed) return false;
    return true;
  });

  const handleAddItem = () => {
    if (newItemName.trim()) {
      addItem(newItemName.trim(), newItemCategory);
      setNewItemName('');
    }
  };

  const categoryBorder = (color: string) => {
    return `border-${color}-500`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r from-green-400 to-teal-400 p-4 sm:p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎒</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">
                {language === 'th' ? 'รายการของที่ต้องเตรียม' : 'Packing List'}
              </h2>
              <p className="text-sm opacity-90">
                {language === 'th' ? 'เตรียมตัวให้พร้อมสำหรับทริป' : 'Get ready for your trip'}
              </p>
            </div>
          </div>
          {allPacked && mounted && <span className="text-2xl">✅</span>}
        </div>

        {/* Progress Bar */}
        {mounted && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
              <span>{progress.packed}/{progress.total} {language === 'th' ? 'จัดแล้ว' : 'packed'}</span>
              <span>{progress.percent}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress.percent}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Category Tabs */}
      <div className="px-4 sm:px-6 pt-4">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((cat) => {
            const config = categoryConfig[cat];
            const catProgress = getCategoryProgress(cat);
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as PackingItem['category'])}
                className={`p-2 rounded-lg text-xs transition-all ${
                  isSelected
                    ? `bg-gradient-to-r ${config.gradient} text-white`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <div>{config.emoji}</div>
                <div className="mt-1 font-medium">
                  {language === 'th' ? config.labelTH : config.labelEN}
                </div>
                <div className="text-xs opacity-75">{catProgress.packed}/{catProgress.total}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="px-4 sm:px-6 pt-3 flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all ${
            filter === 'all'
              ? 'bg-teal-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          {language === 'th' ? 'ทั้งหมด' : 'All'}
        </button>
        <button
          onClick={() => setFilter('unpacked')}
          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all ${
            filter === 'unpacked'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          {language === 'th' ? 'ยังไม่ได้จัด' : 'Unpacked'}
        </button>
        <button
          onClick={() => setFilter('packed')}
          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all ${
            filter === 'packed'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          {language === 'th' ? 'จัดแล้ว' : 'Packed'}
        </button>
        <button
          onClick={() => {
            if (showResetConfirm) {
              resetAll();
              setShowResetConfirm(false);
            } else {
              setShowResetConfirm(true);
              setTimeout(() => setShowResetConfirm(false), 3000);
            }
          }}
          className="ml-auto px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
        >
          {showResetConfirm
            ? (language === 'th' ? 'ยืนยัน?' : 'Confirm?')
            : (language === 'th' ? 'รีเซ็ตทั้งหมด' : 'Reset All')
          }
        </button>
      </div>

      {/* Add Item Form - Moved to top */}
      <div className="px-4 sm:px-6 pt-3 pb-2">
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 space-y-2">
          <p className="text-xs font-semibold text-green-700 dark:text-green-300 flex items-center gap-1.5">
            <span className="text-base">➕</span>
            {language === 'th' ? 'เพิ่มรายการใหม่' : 'Add New Item'}
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              placeholder={language === 'th' ? 'พิมพ์ชื่อสิ่งของ...' : 'Type item name...'}
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleAddItem}
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-lg hover:from-green-500 hover:to-teal-500 transition-all shadow-md hover:shadow-lg"
            >
              {language === 'th' ? 'เพิ่ม' : 'Add'}
            </button>
          </div>
          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value as PackingItem['category'])}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map(cat => (
              <option key={cat} value={cat}>
                {categoryConfig[cat].emoji} {language === 'th' ? categoryConfig[cat].labelTH : categoryConfig[cat].labelEN}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Items List */}
      <div className="p-4 sm:p-6">
        <ul className="space-y-2">
          {filteredItems.map((item) => {
            const catConfig = categoryConfig[item.category];
            return (
              <li
                key={item.id}
                className={`group bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 ${categoryBorder(catConfig.color)} hover:shadow-md transition-all`}
              >
                <div className="flex items-start gap-3 p-3">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      item.packed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-400 dark:border-gray-500 hover:border-teal-500'
                    }`}
                  >
                    {item.packed && (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${item.packed ? 'line-through text-gray-500 dark:text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>
                        {language === 'th' && item.nameTH ? item.nameTH : item.name}
                      </span>
                      {item.essential && <span className="text-yellow-500 text-xs">⭐</span>}
                    </div>
                    {item.notes && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {language === 'th' && item.notesTH ? item.notesTH : item.notes}
                      </p>
                    )}
                  </div>

                  {item.id.startsWith('custom-') && (
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs transition-opacity"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {filteredItems.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            {language === 'th' ? 'ไม่มีรายการ' : 'No items to show'}
          </p>
        )}
      </div>
    </div>
  );
}
