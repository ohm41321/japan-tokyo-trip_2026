'use client';

import { useState, useMemo } from 'react';
import { useTransport } from '../hooks/useTransport';
import { useLanguage } from '@/context/LanguageContext';

const typeIcons: Record<string, string> = {
  train: '\u{1F683}',
  subway: '\u{1F687}',
  bus: '\u{1F68C}',
  shinkansen: '\u{1F684}',
  walking: '\u{1F6B6}',
};

const typeLabels: Record<string, string> = {
  train: 'Train',
  subway: 'Subway',
  bus: 'Bus',
  shinkansen: 'Shinkansen',
  walking: 'Walking',
};

const typeLabelsTh: Record<string, string> = {
  train: 'รถไฟ',
  subway: 'รถไฟใต้ดิน',
  bus: 'รถบัส',
  shinkansen: 'ชินคันเซน',
  walking: 'เดิน',
};

function formatPrice(price: number): string {
  return `\u00A5${price.toLocaleString()}`;
}

function ValueMeter({ value, max }: { value: number; max: number }) {
  const { language } = useLanguage();
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const isAboveCost = value > 15000;

  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-500 dark:text-gray-400">
          {language === 'th' ? 'มูลค่าเทียบ Pass' : 'Value toward pass'}
        </span>
        <span className={`font-medium ${isAboveCost ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}`}>
          {formatPrice(value)} / {formatPrice(15000)}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isAboveCost
              ? 'bg-gradient-to-r from-green-500 to-emerald-400'
              : 'bg-gradient-to-r from-amber-500 to-yellow-400'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="relative mt-1">
        <div
          className="absolute top-0 border-l-2 border-gray-400 dark:border-gray-500 h-2"
          style={{ left: `${(15000 / max) * 100}%` }}
        />
        <span className="absolute text-[10px] text-gray-400 dark:text-gray-500" style={{ left: `${(15000 / max) * 100}%` }}>
          {language === 'th' ? 'ค่า Pass' : 'Pass cost'}
        </span>
      </div>
      {isAboveCost && value > 0 && (
        <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
          {language === 'th'
            ? `เกินค่า Pass ${formatPrice(value - 15000)}`
            : `Exceeds pass cost by ${formatPrice(value - 15000)}`}
        </p>
      )}
      {!isAboveCost && value > 0 && value < 15000 && (
        <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium">
          {language === 'th'
            ? `ขาดอีก ${formatPrice(15000 - value)} ถึงค่า Pass`
            : `${formatPrice(15000 - value)} below pass cost`}
        </p>
      )}
    </div>
  );
}

function WarningBadge({ message }: { message: string }) {
  return (
    <div className="mt-2 flex items-start gap-2 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2">
      <span className="text-amber-500 dark:text-amber-400 text-sm">{'\u26A0\uFE0F'}</span>
      <span className="text-xs text-amber-700 dark:text-amber-300">{message}</span>
    </div>
  );
}

export default function TransportGuide() {
  const { language } = useLanguage();
  const {
    getDayTransports,
    calculateJRPassValue,
    getTotalJRPassSavings,
    jrPassCost,
    totalPassValue,
    totalSavings,
    isJRPassWorthIt,
    recommendedDays,
  } = useTransport();

  const [selectedDay, setSelectedDay] = useState(0);
  const [expandedTips, setExpandedTips] = useState<Record<string, boolean>>({});

  const dayTransports = useMemo(() => getDayTransports(selectedDay), [getDayTransports, selectedDay]);
  const jrValues = useMemo(() => calculateJRPassValue(), [calculateJRPassValue]);
  const currentJRValue = jrValues[selectedDay];

  const totalPaidSeparately = jrValues.reduce((sum, v) => sum + v.totalWithoutPass, 0);
  const totalSavingsAmount = getTotalJRPassSavings();

  const toggleTips = (id: string) => {
    setExpandedTips((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const dayLabels = [
    'Day 1 - Arrival',
    'Day 2 - Gala Yuzawa',
    'Day 3 - Kamakura',
    'Day 4 - Kawagoe/Shibuya',
    'Day 5 - Mt. Fuji',
    'Day 6 - Old Town',
    'Day 7 - Departure',
  ];

  const dayActiveOnPass = [1, 2, 3].includes(selectedDay);

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 p-4 sm:p-6 mb-4 sm:mb-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{'\u{1F5FC}'}</span>
          <h1 className="text-lg sm:text-2xl font-bold">
            {language === 'th' ? 'คู่มือการเดินทาง' : 'Tokyo Transport Guide'}
          </h1>
        </div>
        <p className="text-blue-100 text-xs sm:text-sm">
          {language === 'th'
            ? 'เดินทางในโตเกียวอย่างมีประสิทธิภาพ'
            : 'Plan your routes, maximize your JR Pass, and navigate Tokyo like a pro.'}
        </p>
      </div>

      {/* JR Pass Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-3 sm:p-6 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{'\u{1F3AB}'}</span>
          <h2 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white">JR Tokyo Wide Pass</h2>
        </div>

        {/* JR Pass Stats - Horizontal scroll on mobile, grid on tablet+ */}
        <div className="flex gap-2 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-4 scrollbar-hide mb-3 sm:mb-4">
          {/* Pass Cost */}
          <div className="flex-shrink-0 w-28 sm:w-auto bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-xl p-3 sm:p-4 border border-indigo-100 dark:border-indigo-800">
            <p className="text-[10px] sm:text-xs text-indigo-600 dark:text-indigo-400 font-medium uppercase tracking-wide">
              {language === 'th' ? 'ค่า Pass' : 'Pass Cost'}
            </p>
            <p className="text-lg sm:text-2xl font-bold text-indigo-700 dark:text-indigo-300 mt-1">{formatPrice(jrPassCost)}</p>
            <p className="text-[10px] sm:text-xs text-indigo-500 dark:text-indigo-400">3-day pass</p>
          </div>

          {/* Total Value */}
          <div className="flex-shrink-0 w-28 sm:w-auto bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-3 sm:p-4 border border-green-100 dark:border-green-800">
            <p className="text-[10px] sm:text-xs text-green-600 dark:text-green-400 font-medium uppercase tracking-wide">
              {language === 'th' ? 'มูลค่ารวม' : 'Value'}
            </p>
            <p className="text-lg sm:text-2xl font-bold text-green-700 dark:text-green-300 mt-1">{formatPrice(totalPassValue)}</p>
            <p className="text-[10px] sm:text-xs text-green-500 dark:text-green-400">JR rides</p>
          </div>

          {/* Savings */}
          <div className="flex-shrink-0 w-28 sm:w-auto bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/30 dark:to-teal-900/30 rounded-xl p-3 sm:p-4 border border-cyan-100 dark:border-cyan-800">
            <p className="text-[10px] sm:text-xs text-cyan-600 dark:text-cyan-400 font-medium uppercase tracking-wide">
              {language === 'th' ? 'ประหยัด' : 'Savings'}
            </p>
            <p className="text-lg sm:text-2xl font-bold text-cyan-700 dark:text-cyan-300 mt-1">{formatPrice(totalSavingsAmount)}</p>
            <p className="text-[10px] sm:text-xs text-cyan-500 dark:text-cyan-400">vs. pay each</p>
          </div>

          {/* Worth It? */}
          <div className={`flex-shrink-0 w-28 sm:w-auto rounded-xl p-3 sm:p-4 border ${
            isJRPassWorthIt
              ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-100 dark:border-green-800'
              : 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 border-red-100 dark:border-red-800'
          }`}>
            <p className={`text-[10px] sm:text-xs font-medium uppercase tracking-wide ${
              isJRPassWorthIt ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {language === 'th' ? 'คุ้มไหม?' : 'Worth?'}
            </p>
            <p className={`text-lg sm:text-2xl font-bold mt-1 ${
              isJRPassWorthIt ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
            }`}>
              {isJRPassWorthIt
                ? '✅ ' + (language === 'th' ? 'แนะนำ' : 'Yes!')
                : '❌ ' + (language === 'th' ? 'ไม่แนะนำ' : 'No')}
            </p>
            <p className={`text-[10px] sm:text-xs ${
              isJRPassWorthIt ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
            }`}>
              D{recommendedDays[0]}-{recommendedDays[1] || recommendedDays[0]}
            </p>
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800">
          <p className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
            {'\u{1F4A1}'} {language === 'th' ? 'แนะนำ' : 'Recommendation'}
          </p>
          <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400">
            {language === 'th'
              ? 'เปิดใช้ JR Tokyo Wide Pass 3 วัน'
              : 'Activate the 3-day JR Tokyo Wide Pass on '}
            <strong>{language === 'th' ? 'วันที่ 2-4 (Gala Yuzawa, Kamakura)' : 'Day 2-4'}</strong>
            {language === 'th'
              ? ' — Shinkansen ไป Gala Yuzawa ครั้งเดียวก็คุ้มแล้ว'
              : '. Shinkansen to Gala Yuzawa alone gives ~'}
            {formatPrice(14000)}
            {language === 'th' ? '' : ' in value.'}
          </p>
        </div>
      </div>

      {/* Day Selector - Horizontal scroll on mobile */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-3 sm:p-6 mb-4 sm:mb-6">
        <div className="flex gap-1.5 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible scrollbar-hide mb-3 sm:mb-6">
          {Array.from({ length: 7 }, (_, i) => (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`flex-shrink-0 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 min-w-[60px] ${
                selectedDay === i
                  ? 'bg-gradient-to-r from-indigo-400 to-blue-400 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span className="block text-sm font-bold">D{i + 1}</span>
              <span className="block text-[9px] sm:text-[10px] opacity-75 truncate max-w-[60px] sm:max-w-[80px]">
                {dayLabels[i].split(' - ')[1] || ''}
              </span>
            </button>
          ))}
        </div>

        {/* Day Title */}
        <h3 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white mb-1">
          {dayLabels[selectedDay]}
        </h3>

        {/* JR Pass status for this day */}
        {dayActiveOnPass && (
          <div className="inline-flex items-center gap-1.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-medium px-3 py-1.5 rounded-full mb-3">
            <span>{'\u2705'}</span>
            {language === 'th' ? 'JR Pass ใช้งานอยู่' : 'JR Pass Active'}
          </div>
        )}
        {!dayActiveOnPass && currentJRValue?.passUsed === false && (
          <div className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium px-3 py-1.5 rounded-full mb-3">
            <span>{'\u{1F4B3}'}</span>
            {language === 'th' ? 'จ่ายแยก / Suica' : 'Pay separately / Suica'}
          </div>
        )}

        {/* Transport List */}
        <div className="space-y-3 sm:space-y-4">
          {dayTransports.map((transport) => {
            const isExpanded = !!expandedTips[transport.id];
            const isCovered = transport.coveredByJRPass;

            return (
              <div
                key={transport.id}
                className={`rounded-xl border-2 overflow-hidden transition-all ${
                  isCovered
                    ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50'
                }`}
              >
                <div className="p-3 sm:p-4">
                  {/* Transport Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5 flex-1 min-w-0">
                      <span className="text-xl sm:text-2xl flex-shrink-0 mt-0.5">
                        {typeIcons[transport.type]}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                          {transport.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {transport.line && (
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                              {transport.line}
                            </span>
                          )}
                          {transport.from && transport.to && (
                            <span className="truncate">
                              {transport.from} {'\u2192'} {transport.to}
                            </span>
                          )}
                          {transport.duration && (
                            <span className="flex items-center gap-1">
                              <span>{'\u23F1\uFE0F'}</span>
                              {transport.duration}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price Badge - Larger touch target */}
                    <div className="flex-shrink-0">
                      {isCovered ? (
                        <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-semibold px-2.5 py-1.5 rounded-full">
                          {'\u2705'} {language === 'th' ? 'ครอบคลุม' : 'Covered'}
                        </span>
                      ) : (
                        <span className={`inline-flex items-center text-sm font-bold px-2.5 py-1.5 rounded-full ${
                          transport.price === 0
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                            : 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                        }`}>
                          {transport.price === 0
                            ? (language === 'th' ? 'ฟรี' : 'Free')
                            : formatPrice(transport.price ?? 0)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Type Label */}
                  <div className="mt-2">
                    <span className="inline-block text-[10px] sm:text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                      {language === 'th' ? typeLabelsTh[transport.type] : typeLabels[transport.type]}
                    </span>
                  </div>

                  {/* Tips Section - Larger touch target */}
                  {transport.tips.length > 0 && (
                    <div className="mt-2.5 sm:mt-3">
                      <button
                        onClick={() => toggleTips(transport.id)}
                        className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors min-h-[44px] py-2 w-full text-left"
                      >
                        <span className={`transform transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`}>
                          {'\u25B6'}
                        </span>
                        {isExpanded
                          ? (language === 'th' ? 'ซ่อน' : 'Hide')
                          : `${language === 'th' ? 'แสดง' : 'Show'} ${language === 'th' ? 'เคล็ดลับ' : 'tips'} (${transport.tips.length})`}
                      </button>
                      {isExpanded && (
                        <div className="mt-2 space-y-2 animate-fadeIn">
                          {(language === 'th' && transport.tipsTH ? transport.tipsTH : transport.tips).map((tip, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg px-3 py-2.5 border border-gray-100 dark:border-gray-700"
                            >
                              <span className="text-indigo-400 dark:text-indigo-500 flex-shrink-0 mt-0.5">
                                {'\u{1F4A1}'}
                              </span>
                              {tip}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* JR Pass Value Meter for Active Days */}
        {dayActiveOnPass && currentJRValue && currentJRValue.totalWithoutPass > 0 && (
          <ValueMeter value={currentJRValue.totalWithoutPass} max={15000} />
        )}

        {/* Warnings for low-value pass days */}
        {dayActiveOnPass && currentJRValue && currentJRValue.totalWithoutPass > 0 && currentJRValue.totalWithoutPass < 3000 && (
          <WarningBadge message="Low JR Pass value day. Consider using pass for longer trips only, or save it if this is near the end of your 3-day window." />
        )}

        {/* General tips for the day - Mobile friendly */}
        {selectedDay === 0 && (
          <div className="mt-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 border border-indigo-100 dark:border-indigo-800">
            <p className="text-xs sm:text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">
              {'\u{1F44B}'} {language === 'th' ? 'เคล็ดลับวันแรกที่ถึง' : 'Arrival Day Tips'}
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-indigo-600 dark:text-indigo-400">
              <li>• {language === 'th' ? 'ซื้อบัตร Suica หรือ Pasmo ที่สนามบิน Narita ใช้ได้กับขนส่งสาธารณะทั้งหมด' : 'Buy a Suica or Pasmo card at Narita Airport - works on all local transit'}</li>
              <li>• {language === 'th' ? 'Skyliner เร็วกว่า แต่ N\'EX ครอบคลุมโดย JR Pass (แต่ยังไม่เปิดใช้วันแรก)' : 'Skyliner is faster but N\'EX is covered by JR passes (not activated yet)'}</li>
              <li>• {language === 'th' ? 'เก็บใบเสร็จและตั๋วไว้สำหรับช้อปปิ้งปลอดภาษีในภายหลัง' : 'Keep all receipts and tickets for potential tax-free shopping later'}</li>
            </ul>
          </div>
        )}

        {selectedDay === 1 && (
          <div className="mt-3 bg-green-50 dark:bg-green-900/20 rounded-xl p-3 border border-green-100 dark:border-green-800">
            <p className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300 mb-2">
              {'\u{1F3BF}'} {language === 'th' ? 'วัน Gala Yuzawa' : 'Gala Yuzawa Day'}
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-green-600 dark:text-green-400">
              <li>• {language === 'th' ? 'จองที่นั่ง Shinkansen วันก่อนหน้าที่ JR East Travel Service Center' : 'Reserve Shinkansen seats the day before at JR East Travel Service Center'}</li>
              <li>• {language === 'th' ? 'การเดินทางรอบเดียว ({formatPrice(14000)}) ก็คุ้ม Pass เกือบจะเพียงพอแล้ว' : 'This single round trip ({formatPrice(14000)}) almost justifies the pass alone'}</li>
              <li>• {language === 'th' ? 'สถานี Gala Yuzawa อยู่ที่ฐานสกีรีสอร์ทเลย' : 'Gala Yuzawa station is literally at the ski resort base'}</li>
              <li>• {language === 'th' ? 'เช็คการเปิดให้บริการตามฤดูกาล - ปกติเปิด ธ.ค.-พ.ค.' : 'Check seasonal operation - usually runs December through May'}</li>
            </ul>
          </div>
        )}

        {selectedDay === 2 && (
          <div className="mt-3 bg-green-50 dark:bg-green-900/20 rounded-xl p-3 border border-green-100 dark:border-green-800">
            <p className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300 mb-2">
              {'\u{26E9}\uFE0F'} {language === 'th' ? 'วัน Kamakura' : 'Kamakura Day'}
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-green-600 dark:text-green-400">
              <li>• {language === 'th' ? 'รวมกับวันที่ 2 JR Pass คุ้มแน่นอน (มูลค่า {formatPrice(17000)}+)' : 'Combined with Day 2, your JR Pass is now definitively worth it ({formatPrice(17000)}+ value)'}</li>
              <li>• {language === 'th' ? 'รถราง Enoden ไม่ใช่ JR แต่คุ้มที่จะลอง' : 'Enoden tram is not JR but worth the experience'}</li>
              <li>• {language === 'th' ? 'ทางเข้าพระใหญ่ {formatPrice(300)} - ไม่ครอบคลุม' : 'Great Buddha entrance: {formatPrice(300)} - not covered'}</li>
            </ul>
          </div>
        )}

        {selectedDay === 3 && (
          <div className="mt-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 border border-amber-100 dark:border-amber-800">
            <p className="text-xs sm:text-sm font-medium text-amber-700 dark:text-amber-300 mb-2">
              {'\u26A0\uFE0F'} {language === 'th' ? 'วันสุดท้ายของ JR Pass' : 'Last Day of JR Pass'}
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-amber-600 dark:text-amber-400">
              <li>• {language === 'th' ? 'JR Pass 3 วันจะหมดอายุสิ้นวันนี้' : 'Your 3-day JR Pass expires at the end of today'}</li>
              <li>• {language === 'th' ? 'ใช้ Yamanote Line ไป Shibuya ฟรีถ้า Pass ยังใช้ได้' : 'Use Yamanote Line for free Shibuya travel if still valid'}</li>
              <li>• {language === 'th' ? 'Kawagoe ผ่านสาย Tobu ไม่ครอบคลุม - จ่ายด้วย Suica' : 'Kawagoe via Tobu Line is NOT covered - pay with Suica'}</li>
              <li>• {language === 'th' ? 'ลองพิจารณา Pasmo Passport สำหรับส่วนลดท่องเที่ยว' : 'Consider getting a Pasmo Passport for sightseeing discounts'}</li>
            </ul>
          </div>
        )}

        {/* Day total */}
        {currentJRValue && currentJRValue.totalWithoutPass > 0 && (
          <div className="mt-3 flex items-center justify-between text-xs sm:text-sm border-t border-gray-200 dark:border-gray-700 pt-3">
            <span className="text-gray-500 dark:text-gray-400">Day total (if paying separately):</span>
            <span className="font-bold text-gray-900 dark:text-white">{formatPrice(currentJRValue.totalWithoutPass)}</span>
          </div>
        )}
      </div>

      {/* Quick Reference - Mobile friendly */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-3 sm:p-6">
        <h3 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          {'\u{1F4CB}'} {language === 'th' ? 'ข้อมูลด่วน' : 'Quick Reference'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs sm:text-sm">
          <div className="flex items-start gap-2">
            <span>{'\u{1F4B3}'}</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Suica / Pasmo</p>
              <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
                {language === 'th' ? 'บัตรเติมเงินสำหรับขนส่งสาธารณะ' : 'Reloadable IC card for all local transit'}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span>{'\u{1F504}'}</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Yamanote Line</p>
              <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
                {language === 'th' ? 'สายวนเชื่อมต่อสถานีหลักในโตเกียว' : 'Loop line connecting all major Tokyo stations'}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span>{'\u{1F3AB}'}</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">JR Tokyo Wide Pass</p>
              <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
                {language === 'th' ? `3 วัน ${formatPrice(15000)} ครอบคลุมพื้นที่โตเกียวฝั่งกว้าง` : `3 days, ${formatPrice(15000)}, covers wider Tokyo area`}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span>{'\u{1F684}'}</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Shinkansen</p>
              <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
                {language === 'th' ? 'จองที่นั่งฟรีที่ศูนย์บริการ JR East' : 'Reserve seats free at JR East Travel Service Center'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
