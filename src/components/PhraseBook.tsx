"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { speakJapanese, isTTSSupported } from "@/utils/tts";

interface Phrase {
  th: string;
  en: string;
  jp: string;
  romaji: string;
}

interface PhraseCategory {
  id: string;
  icon: string;
  labelEN: string;
  labelTH: string;
  phrases: Phrase[];
}

const phraseData: PhraseCategory[] = [
  {
    id: "basic",
    icon: "👋",
    labelEN: "Basics",
    labelTH: "พื้นฐาน",
    phrases: [
      { th: "สวัสดี", en: "Hello", jp: "\u3053\u3093\u306b\u3061\u306f", romaji: "Konnichiwa" },
      { th: "ขอบคุณ", en: "Thank you", jp: "\u3042\u308a\u304c\u3068\u3046", romaji: "Arigatou" },
      { th: "ขอโทษ", en: "Sorry / Excuse me", jp: "\u3059\u307f\u307e\u305b\u3093", romaji: "Sumimasen" },
      { th: "ใช่ / ไม่ใช่", en: "Yes / No", jp: "\u306f\u3044 / \u3044\u3044\u3048", romaji: "Hai / Iie" },
      { th: "ไม่เป็นไร", en: "No problem", jp: "\u5927\u4e08\u592b", romaji: "Daijoubu" },
    ],
  },
  {
    id: "restaurant",
    icon: "🍜",
    labelEN: "Restaurant",
    labelTH: "ร้านอาหาร",
    phrases: [
      { th: "ขอเมนูหน่อย", en: "Menu please", jp: "\u30e1\u30cb\u30e5\u30fc\u3092\u304a\u306d\u304c\u3044\u3057\u307e\u3059", romaji: "Menyuu wo onegaishimasu" },
      { th: "อันนี้ครับ/ค่ะ", en: "This one please", jp: "\u3053\u308c\u3092\u304a\u306d\u304c\u3044\u3057\u307e\u3059", romaji: "Kore wo onegaishimasu" },
      { th: "อร่อยมาก!", en: "Very delicious!", jp: "\u3068\u3066\u3082\u7f8e\u5473\u3057\u3044\u3067\u3059!", romaji: "Totemo oishii desu!" },
      { th: "เช็คบิลด้วย", en: "Check please", jp: "\u304a\u6089\u304a\u306d\u304c\u3044\u3057\u307e\u3059", romaji: "Okaikei onegaishimasu" },
      { th: "แพ้อาหาร...", en: "I'm allergic to...", jp: "\u30a2\u30ec\u30eb\u30ae\u30fc\u304c\u3042\u308a\u307e\u3059", romaji: "Arerugii ga arimasu" },
    ],
  },
  {
    id: "directions",
    icon: "🗺️",
    labelEN: "Directions",
    labelTH: "ถามทาง",
    phrases: [
      { th: "...อยู่ที่ไหน", en: "Where is...", jp: "\u306f\u3069\u3053\u3067\u3059\u304b?", romaji: "...wa doko desu ka?" },
      { th: "สถานีรถไฟ", en: "Train station", jp: "\u99c5", romaji: "Eki" },
      { th: "ห้องน้ำอยู่ที่ไหน", en: "Where is the toilet?", jp: "\u30c8\u30a4\u30ec\u306f\u3069\u3053\u3067\u3059\u304b?", romaji: "Toire wa doko desu ka?" },
      { th: "เดินอย่างไร", en: "How do I go?", jp: "\u3069\u3046\u3044\u304d\u307e\u3059\u304b?", romaji: "Dou ikimasu ka?" },
      { th: "ไกลไหม", en: "Is it far?", jp: "\u9060\u3044\u3067\u3059\u304b?", romaji: "Tooi desu ka?" },
    ],
  },
  {
    id: "shopping",
    icon: "🛍️",
    labelEN: "Shopping",
    labelTH: "ช้อปปิ้ง",
    phrases: [
      { th: "เท่าไหร่ครับ/คะ", en: "How much?", jp: "\u3044\u304f\u3089\u3067\u3059\u304b?", romaji: "Ikura desu ka?" },
      { th: "ลดได้ไหม", en: "Can you discount?", jp: "\u5024\u5f15\u304d\u3067\u304d\u307e\u3059\u304b?", romaji: "Negiki dekimasu ka?" },
      { th: "เอาอันนี้", en: "I'll take this", jp: "\u3053\u308c\u3092\u304f\u3060\u3055\u3044", romaji: "Kore wo kudasai" },
      { th: "ลองได้ไหม", en: "Can I try?", jp: "\u8a66\u3057\u3066\u3082\u3044\u3044\u3067\u3059\u304b?", romaji: "Tameshite mo ii desu ka?" },
      { th: "มีใบเสร็จไหม", en: "Receipt please", jp: "\u30ec\u30b7\u30fc\u30c8\u304a\u306d\u304c\u3044\u3057\u307e\u3059", romaji: "Reshiito onegaishimasu" },
    ],
  },
  {
    id: "emergency",
    icon: "🚨",
    labelEN: "Emergency",
    labelTH: "ฉุกเฉิน",
    phrases: [
      { th: "ช่วยด้วย!", en: "Help!", jp: "\u52a9\u3051\u3066!", romaji: "Tasukete!" },
      { th: "อันตราย!", en: "Dangerous!", jp: "\u5371\u967a\u3067\u3059!", romaji: "Kiken desu!" },
      { th: "เรียกตำรวจด้วย", en: "Call the police", jp: "\u8b66\u5bdf\u3092\u547c\u3093\u3067\u304f\u3060\u3055\u3044", romaji: "Keisatsu wo yonde kudasai" },
      { th: "โรงพยาบาล", en: "Hospital", jp: "\u75c5\u9662", romaji: "Byouin" },
      { th: "ไม่สบาย", en: "I'm sick", jp: "\u5177\u5408\u304c\u60aa\u3044\u3067\u3059", romaji: "Guai ga warui desu" },
    ],
  },
];

export default function PhraseBook() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(phraseData[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Translate mode
  const [mode, setMode] = useState<"phrases" | "translate">("phrases");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState<string | null>(null);
  const [transDirection, setTransDirection] = useState<"th2jp" | "jp2th">("th2jp");

  // Pre-load voices on mount
  useEffect(() => {
    if (isTTSSupported()) {
      const { getVoices } = require("@/utils/tts");
      getVoices();
    }
  }, []);

  const currentCategory = phraseData.find(c => c.id === selectedCategory) || phraseData[0];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setTranslating(true);
    setTranslateError(null);
    setTranslatedText("");

    try {
      const langPair = transDirection === "th2jp" ? "th|ja" : "ja|th";
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${langPair}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        setTranslatedText(data.responseData.translatedText);
      } else {
        throw new Error("Translation failed");
      }
    } catch (err) {
      console.error("Translate failed:", err);
      setTranslateError(language === 'th' ? 'แปลไม่สําเร็จ ลองอีกครั้ง' : 'Translation failed. Try again.');
    } finally {
      setTranslating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-red-400 p-4 sm:p-5 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2.5">
            <span className="text-3xl">🗣️</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold">
              {language === 'th' ? 'รวมประโยคภาษาญี่ปุ่น' : 'Japanese Phrase Book'}
            </h3>
            <p className="text-pink-100 text-xs sm:text-sm">
              {language === 'th' ? 'แตะเพื่อฟังเสียง หรือ copy' : 'Tap to listen or copy'}
            </p>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="px-3 sm:px-4 pt-3">
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
          <button
            onClick={() => setMode("phrases")}
            className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
              mode === "phrases"
                ? 'bg-white dark:bg-gray-800 text-pink-600 dark:text-pink-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            🗣️ {language === 'th' ? 'ประโยคสําเร็จ' : 'Phrases'}
          </button>
          <button
            onClick={() => setMode("translate")}
            className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
              mode === "translate"
                ? 'bg-white dark:bg-gray-800 text-pink-600 dark:text-pink-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            🔄 {language === 'th' ? 'แปลภาษา' : 'Translate'}
          </button>
        </div>
      </div>

      {/* ─── TRANSLATE MODE ─── */}
      {mode === "translate" && (
        <div className="p-3 sm:p-4 space-y-3">
          {/* Direction Toggle */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setTransDirection("th2jp")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                transDirection === "th2jp"
                  ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}
            >
              🇹🇭 TH {'\u2192'} JP 🇯🇵
            </button>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <button
              onClick={() => setTransDirection("jp2th")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                transDirection === "jp2th"
                  ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}
            >
              🇯🇵 JP {'\u2192'} TH 🇹🇭
            </button>
          </div>

          {/* Input */}
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              {transDirection === "th2jp"
                ? (language === 'th' ? 'พิมพ์ภาษาไทย' : 'Type in Thai')
                : (language === 'th' ? 'พิมพ์ภาษาญี่ปุ่น' : 'Type in Japanese')}
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleTranslate(); }}
              placeholder={transDirection === "th2jp"
                ? (language === 'th' ? 'เช่น สถานีรถไฟอยู่ที่ไหน' : 'e.g., Where is the train station?')
                : (language === 'th' ? 'เช่น 駅はどこですか' : 'e.g., Eki wa doko desu ka?')
              }
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-pink-400 outline-none text-sm resize-none"
            />
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
              {language === 'th' ? 'Ctrl+Enter เพื่อแปล' : 'Ctrl+Enter to translate'}
            </p>
          </div>

          {/* Translate Button */}
          <button
            onClick={handleTranslate}
            disabled={!inputText.trim() || translating}
            className={`w-full py-3 rounded-xl text-sm font-bold transition-all active:scale-95 ${
              inputText.trim() && !translating
                ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            {translating
              ? (language === 'th' ? 'กำลังแปล...' : 'Translating...')
              : (language === 'th' ? '🔄 แปลเลย' : '🔄 Translate')
            }
          </button>

          {/* Error */}
          {translateError && (
            <p className="text-xs text-red-500 dark:text-red-400 text-center">{translateError}</p>
          )}

          {/* Result */}
          {translatedText && (
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl border border-pink-200 dark:border-pink-800 p-4">
              <p className="text-xs font-semibold text-pink-600 dark:text-pink-400 mb-2">
                {transDirection === "th2jp"
                  ? (language === 'th' ? '🇯🇵 ภาษาญี่ปุ่น:' : 'Japanese:')
                  : (language === 'th' ? '🇹🇭 ภาษาไทย:' : 'Thai:')
                }
              </p>
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                {translatedText}
              </p>
              <div className="flex gap-2">
                {transDirection === "th2jp" ? (
                  <>
                    <button
                      onClick={() => speakJapanese(translatedText)}
                      className="flex-1 py-2 rounded-lg text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors active:scale-95"
                    >
                      🔊 {language === 'th' ? 'ฟังเสียง' : 'Listen'}
                    </button>
                    <button
                      onClick={() => copyToClipboard(translatedText, 'trans-jp')}
                      className="flex-1 py-2 rounded-lg text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors active:scale-95"
                    >
                      {copiedId === 'trans-jp' ? '✅ ' : '📋 '}
                      {copiedId === 'trans-jp'
                        ? (language === 'th' ? 'คัดลอกแล้ว!' : 'Copied!')
                        : (language === 'th' ? 'คัดลอก' : 'Copy')
                      }
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => copyToClipboard(translatedText, 'trans-th')}
                    className="w-full py-2 rounded-lg text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors active:scale-95"
                  >
                    {copiedId === 'trans-th' ? '✅ ' : '📋 '}
                    {copiedId === 'trans-th'
                      ? (language === 'th' ? 'คัดลอกแล้ว!' : 'Copied!')
                      : (language === 'th' ? 'คัดลอก' : 'Copy')
                    }
                  </button>
                )}
              </div>
            </div>
          )}

          {/* API note */}
          <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center">
            {language === 'th' ? 'แปลโดย MyMemory API (ฟรี) — ผลลัพธ์อาจไม่สมบูรณ์ 100%' : 'Powered by MyMemory API (free) — results may not be 100% accurate'}
          </p>
        </div>
      )}

      {/* ─── PHRASE BOOK MODE ─── */}
      {mode === "phrases" && (
      <>
      {/* Category Tabs */}
      <div className="px-3 pt-3">
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          {phraseData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 active:scale-95 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span className="text-sm mr-1">{cat.icon}</span>
              {language === 'th' ? cat.labelTH : cat.labelEN}
            </button>
          ))}
        </div>
      </div>

      {/* Phrases List */}
      <div className="p-3 sm:p-4 space-y-2">
        {currentCategory.phrases.map((phrase, idx) => (
          <div
            key={idx}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* TH / EN */}
            <div className="px-3 pt-2.5 pb-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {language === 'th' ? phrase.th : phrase.en}
              </p>
            </div>

            {/* JP + Romaji */}
            <div className="px-3 pb-2">
              <p className="text-base sm:text-lg font-medium text-pink-600 dark:text-pink-400">
                {phrase.jp}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-0.5">
                {phrase.romaji}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1 px-2 pb-2">
              <button
                onClick={() => speakJapanese(phrase.jp)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-150 active:scale-95"
              >
                <span>🔊</span>
                {language === 'th' ? 'ฟังเสียง' : 'Listen'}
              </button>
              <button
                onClick={() => copyToClipboard(phrase.jp, `jp-${idx}`)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors duration-150 active:scale-95"
              >
                <span>{copiedId === `jp-${idx}` ? '✅' : '📋'}</span>
                {copiedId === `jp-${idx}`
                  ? (language === 'th' ? 'คัดลอกแล้ว!' : 'Copied!')
                  : (language === 'th' ? 'คัดลอก JP' : 'Copy JP')
                }
              </button>
            </div>
          </div>
        ))}
      </div>
      </>
      )}

      {/* Footer Tip */}
      <div className="px-4 pb-4">
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800">
          <p className="text-xs text-amber-700 dark:text-amber-300">
            <span className="font-semibold">💡 {language === 'th' ? 'เคล็ดลับ:' : 'Tip:'}</span>{' '}
            {language === 'th'
              ? 'กดปุ่ม "ฟังเสียง" เพื่อฟังการออกเสียงภาษาญี่ปุ่น หรือใช้ปุ่ม "คัดลอก" แล้ววางใน Google Translate ได้'
              : 'Tap "Listen" to hear Japanese pronunciation, or "Copy" and paste into Google Translate.'}
          </p>
        </div>
      </div>
    </div>
  );
}
