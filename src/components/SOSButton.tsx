"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { speakJapanese, isTTSSupported } from "@/utils/tts";

interface SOSPhrase {
  th: string;
  en: string;
  jp: string;
  romaji: string;
}

interface EmergencyContact {
  icon: string;
  titleEN: string;
  titleTH: string;
  info: string;
  phone?: string;
  noteEN?: string;
  noteTH?: string;
  href?: string;
  urgent?: boolean;
}

const sosPhrases: SOSPhrase[] = [
  { th: "ช่วยด้วย!", en: "Help!", jp: "\u52a9\u3051\u3066!", romaji: "Tasukete!" },
  { th: "อันตราย!", en: "Dangerous!", jp: "\u5371\u967a\u3067\u3059!", romaji: "Kiken desu!" },
  { th: "เรียกตำรวจ", en: "Call the police", jp: "\u8b66\u5bdf\u3092\u547c\u3093\u3067\u304f\u3060\u3055\u3044", romaji: "Keisatsu wo yonde kudasai" },
  { th: "เรียกรถพยาบาล", en: "Call an ambulance", jp: "\u6551\u6025\u8eca\u3092\u547c\u3093\u3067\u304f\u3060\u3055\u3044", romaji: "Kyuukyusha wo yonde kudasai" },
  { th: "ไม่สบาย", en: "I'm sick", jp: "\u5177\u5408\u304c\u60aa\u3044\u3067\u3059", romaji: "Guai ga warui desu" },
  { th: "ปวดหัว", en: "Headache", jp: "\u982d\u304c\u75db\u3044\u3067\u3059", romaji: "Atama ga itai desu" },
  { th: "ปวดท้อง", en: "Stomachache", jp: "\u8179\u304c\u75db\u3044\u3067\u3059", romaji: "Onaka ga itai desu" },
  { th: "แพ้ยา", en: "Drug allergy", jp: "\u85ac\u306e\u30a2\u30ec\u30eb\u30ae\u30fc\u304c\u3042\u308a\u307e\u3059", romaji: "Kusuri no arerugii ga arimasu" },
  { th: "หลงทาง", en: "I'm lost", jp: "\u9053\u306b\u8ff7\u3044\u307e\u3057\u305f", romaji: "Michi ni mayoimashita" },
  { th: "กระเป๋าถูกขโมย", en: "Bag stolen", jp: "\u30d0\u30c3\u30b0\u304c\u76d7\u307e\u308c\u307e\u3057\u305f", romaji: "Baggu ga nusumaremashita" },
];

const emergencyContacts: EmergencyContact[] = [
  {
    icon: "🚔", titleEN: "Police", titleTH: "ตำรวจ", info: "110",
    noteEN: "Free from any phone", noteTH: "โทรฟรีทุกเครื่อง", urgent: true, href: "tel:110",
  },
  {
    icon: "🚑", titleEN: "Fire / Ambulance", titleTH: "ดับเพลิง / รถพยาบาล", info: "119",
    noteEN: "Free from any phone", noteTH: "โทรฟรีทุกเครื่อง", urgent: true, href: "tel:119",
  },
  {
    icon: "🇹🇭", titleEN: "Thai Embassy", titleTH: "สถานทูตไทย", info: "Royal Thai Embassy",
    phone: "03-5475-8693", noteEN: "5-9-16 Minami-Azabu, Minato-ku", noteTH: "จ.-ศ. 9:00-17:00",
    href: "tel:0354758693",
  },
  {
    icon: "🆘", titleEN: "Tourist Hotline", titleTH: "สายด่วนท่องเที่ยว", info: "050-3816-2787",
    noteEN: "EN/CN/KR 24/7", noteTH: "อังกฤษ/จีน/เกาหลี ตลอด 24 ชม.",
    href: "tel:05038162787",
  },
  {
    icon: "🏥", titleEN: "Hospital (Hiroo)", titleTH: "โรงพยาบาล (Hiroo)", info: "Tokyo Metropolitan Hiroo Hospital",
    phone: "03-3400-1111", noteEN: "English support available", noteTH: "มีบริการภาษาอังกฤษ",
    href: "tel:0334001111",
  },
  {
    icon: "🚃", titleEN: "JR Lost & Found", titleTH: "JR ของหาย", info: "JR East Lost Property Center",
    phone: "03-3842-8111", noteEN: "Open 9:00-17:00 daily", noteTH: "เปิด 9:00-17:00 ทุกวัน",
    href: "tel:0338428111",
  },
  {
    icon: "🏧", titleEN: "ATM (7-Eleven)", titleTH: "ATM (7-Eleven)", info: "Seven Bank ATM",
    noteEN: "Intl cards accepted 24/7", noteTH: "รับบัตรต่างประเทศ 24 ชม.",
  },
  {
    icon: "💊", titleEN: "24h Pharmacy (Ueno)", titleTH: "ร้านขายยา 24 ชม.", info: "Sugi Pharmacy Ueno",
    noteEN: "Near Ueno Station", noteTH: "ใกล้สถานี Ueno มียาทั่วไป",
  },
];

export default function SOSButton() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Pre-load voices on mount
  useEffect(() => {
    if (isTTSSupported()) {
      const { getVoices } = require("@/utils/tts");
      getVoices();
    }
  }, []);

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      {/* Floating SOS Button - subtle, non-blocking */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-[60] w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full shadow-lg flex items-center justify-center text-lg opacity-80 hover:opacity-100 transition-all duration-200 active:scale-90"
        aria-label="SOS Emergency"
      >
        🚨
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-fadeIn max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* SOS Header */}
            <div className="bg-gradient-to-r from-red-400 to-orange-400 p-4 text-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🆘</span>
                  <div>
                    <h3 className="text-xl font-bold">
                      {language === 'th' ? 'ฉุกเฉิน / SOS' : 'Emergency SOS'}
                    </h3>
                    <p className="text-red-100 text-xs">
                      {language === 'th' ? 'แตะเพื่อแสดง หรือ เปิดฟัง' : 'Tap to show or speak aloud'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Quick Dial - Urgent */}
              <div className="p-4 pb-2">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  {language === 'th' ? '📞 โทรฉุกเฉิน (แตะเพื่อโทร)' : '📞 Quick Dial (tap to call)'}
                </p>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {emergencyContacts.filter(c => c.urgent).map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href || '#'}
                      className="bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-700 rounded-xl p-3 text-center hover:bg-red-100 dark:hover:bg-red-900/50 transition-all active:scale-95"
                    >
                      <p className="text-2xl mb-1">{item.icon}</p>
                      <p className="text-xs font-semibold text-red-700 dark:text-red-300">
                        {language === 'th' ? item.titleTH : item.titleEN}
                      </p>
                      <p className="text-xl font-bold text-red-600 dark:text-red-400">{item.info}</p>
                    </a>
                  ))}
                </div>

                {/* Other Contacts - scrollable list */}
                <div className="space-y-1.5">
                  {emergencyContacts.filter(c => !c.urgent).map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {language === 'th' ? item.titleTH : item.titleEN}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                            {item.info}
                          </p>
                          {item.phone && item.href && (
                            <a
                              href={item.href}
                              className="inline-flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 hover:underline mt-0.5"
                            >
                              📞 {item.phone}
                            </a>
                          )}
                          {(language === 'th' ? item.noteTH : item.noteEN) && (
                            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                              {language === 'th' ? item.noteTH : item.noteEN}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="px-4 my-2">
                <div className="border-t border-gray-200 dark:border-gray-700" />
              </div>

              {/* Japanese SOS Phrases */}
              <div className="px-4 pb-4">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  {language === 'th' ? '💬 ประโยคฉุกเฉิน (แตะฟัง / คัดลอก)' : '💬 Emergency phrases (tap listen / copy)'}
                </p>
                <div className="space-y-2">
                  {sosPhrases.map((phrase, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-700 p-3">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-0.5">
                        {language === 'th' ? phrase.th : phrase.en}
                      </p>
                      <p className="text-lg font-medium text-red-600 dark:text-red-400">{phrase.jp}</p>
                      <p className="text-xs text-gray-400 italic">{phrase.romaji}</p>
                      <div className="flex gap-1.5 mt-2">
                        <button
                          onClick={() => speakJapanese(phrase.jp)}
                          className="flex-1 py-1.5 rounded-lg text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors active:scale-95"
                        >
                          🔊 {language === 'th' ? 'ฟัง' : 'Speak'}
                        </button>
                        <button
                          onClick={() => copyText(phrase.jp)}
                          className="flex-1 py-1.5 rounded-lg text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors active:scale-95"
                        >
                          📋 {language === 'th' ? 'คัดลอก' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
