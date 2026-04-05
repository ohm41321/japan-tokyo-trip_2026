"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Free exchange rate API (exchangerate-api.com - no API key needed for base endpoint)
const API_URL = "https://open.er-api.com/v6/latest/JPY";

export default function YenConverter() {
  const { language } = useLanguage();
  const [yenAmount, setYenAmount] = useState("1000");
  const [thbAmount, setThbAmount] = useState("");
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [mode, setMode] = useState<"yen" | "thb">("yen");

  // Fallback rate (approximate: 1 JPY = 0.25 THB, or 1 THB = 4 JPY)
  const fallbackRate = 0.25;
  const effectiveRate = rate ?? fallbackRate;

  useEffect(() => {
    let isMounted = true;
    async function fetchRate() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        const jpyToThb = data?.rates?.THB;
        if (isMounted && jpyToThb) {
          setRate(jpyToThb);
          setLastUpdated(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        }
      } catch (err) {
        if (isMounted) {
          console.error('Rate fetch failed:', err);
          setError(language === 'th' ? 'ใช้เรทประมาณ' : 'Using fallback rate');
          setLastUpdated(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchRate();
    return () => { isMounted = false; };
  }, []);

  const handleYenChange = (val: string) => {
    setYenAmount(val);
    setMode("yen");
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setThbAmount((num * effectiveRate).toFixed(2));
    } else {
      setThbAmount("");
    }
  };

  const handleThbChange = (val: string) => {
    setThbAmount(val);
    setMode("thb");
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setYenAmount(Math.round(num / effectiveRate).toString());
    } else {
      setYenAmount("");
    }
  };

  const yenNum = parseFloat(yenAmount) || 0;
  const thbNum = parseFloat(thbAmount) || 0;

  const quickAmounts = [100, 500, 1000, 3000, 5000, 10000];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 p-4 sm:p-5 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2.5">
            <span className="text-3xl">🎌</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold">
              {language === 'th' ? 'แปลงเงินเยน-บาท' : 'Yen-Baht Converter'}
            </h3>
            <p className="text-yellow-100 text-xs sm:text-sm">
              {loading
                ? (language === 'th' ? 'กำลังโหลดเรท...' : 'Loading rate...')
                : `1 JPY = ${effectiveRate.toFixed(4)} THB`
              }
            </p>
            {lastUpdated && (
              <p className="text-yellow-200/70 text-[10px]">
                {language === 'th' ? 'อัพเดท:' : 'Updated:'} {lastUpdated}
                {error && ` (${error})`}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Yen Input */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            🇯🇵 {language === 'th' ? 'เงินเยน (¥)' : 'Japanese Yen (¥)'}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400">¥</span>
            <input
              type="number"
              value={yenAmount}
              onChange={(e) => handleYenChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 text-2xl font-bold rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-center focus:ring-2 focus:ring-amber-400 outline-none transition-all"
              inputMode="numeric"
              placeholder="0"
            />
          </div>
        </div>

        {/* Swap Icon */}
        <div className="flex items-center justify-center">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </div>
        </div>

        {/* THB Input */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            🇹🇭 {language === 'th' ? 'เงินบาท (฿)' : 'Thai Baht (฿)'}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400">฿</span>
            <input
              type="number"
              value={thbAmount}
              onChange={(e) => handleThbChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 text-2xl font-bold rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-center focus:ring-2 focus:ring-amber-400 outline-none transition-all"
              inputMode="numeric"
              placeholder="0"
            />
          </div>
        </div>

        {/* Quick Amounts */}
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
            {language === 'th' ? '⚡ จำนวนเงินด่วน' : '⚡ Quick amounts'}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => handleYenChange(amt.toString())}
                className="py-2.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-700 dark:hover:text-amber-300 transition-all duration-150 active:scale-95"
              >
                <span className="block font-bold">¥{amt.toLocaleString()}</span>
                <span className="block text-[10px] text-gray-400">≈฿{(amt * effectiveRate).toFixed(0)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Rate Source */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center">
          <p className="text-[10px] text-gray-400 dark:text-gray-500">
            {language === 'th' ? 'อัตราจาก:' : 'Rate from:'}{' '}
            <a href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 hover:underline">
              ExchangeRate-API
            </a>
            {' '}• {language === 'th' ? 'เรทประมาณ 1:4 ถ้าไม่มีเน็ต' : 'Fallback ~1:4 if offline'}
          </p>
        </div>
      </div>
    </div>
  );
}
