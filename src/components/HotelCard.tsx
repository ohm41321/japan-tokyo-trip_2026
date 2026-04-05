"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const hotelInfo = {
  nameEN: "Tabist Hotel Ueno 39",
  nameTH: "Tabist Hotel Ueno 39",
  nameJP: "タビストホテル上野39",
  addressEN: "5-31-12 Ueno, Taito-ku, Tokyo 110-0005",
  addressTH: "5-31-12 Ueno, Taito-ku, Tokyo 110-0005",
  addressJP: "\u6771\u4eac\u90fd\u53f0\u6771\u533a\u4e0a\u91ce5-31-12 \u3001\u90f5\u4fbf\u756a\u53f7 110-0005",
  phone: "03-5826-5939",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Tabist+Hotel+Ueno+39+Tokyo",
  nearestStation: "JR Ueno Station (Inariguchi Exit)",
  nearestStationJP: "JR\u4e0a\u91ce\u99c5\uff08\u7a32\u8377\u53e3\uff09",
  walkTime: "7 min walk",
  walkTimeJP: "\u5f92\u6b697\u5206",
  // Taxi card message
  taxiMessageJP:
    "\u3053\u306e\u4f4f\u6240\u307e\u3067\u304a\u9858\u3044\u3057\u307e\u3059\u3002\n\u300c\u30bf\u30d3\u30b9\u30c8\u30db\u30c6\u30eb\u4e0a\u91ce39\u300d",
  // Check-in/out
  checkIn: "15:00",
  checkOut: "10:00",
};

export default function HotelCard() {
  const { language } = useLanguage();
  const [showFullJP, setShowFullJP] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-4 sm:p-5 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2.5">
            <span className="text-3xl">🏨</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold">
              {language === 'th' ? 'ข้อมูลโรงแรม' : 'Hotel Info'}
            </h3>
            <p className="text-purple-100 text-xs sm:text-sm">
              {hotelInfo.nameEN}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Hotel Name - Big */}
        <div className="text-center py-3 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-800">
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            {hotelInfo.nameJP}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {hotelInfo.nameEN}
          </p>
        </div>

        {/* Check-in / Check-out */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center border border-green-100 dark:border-green-800">
            <p className="text-xs text-green-600 dark:text-green-400 font-semibold mb-1">
              {language === 'th' ? 'เช็คอิน' : 'Check-in'}
            </p>
            <p className="text-xl font-bold text-green-700 dark:text-green-300">
              {hotelInfo.checkIn}
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 text-center border border-orange-100 dark:border-orange-800">
            <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold mb-1">
              {language === 'th' ? 'เช็คเอาท์' : 'Check-out'}
            </p>
            <p className="text-xl font-bold text-orange-700 dark:text-orange-300">
              {hotelInfo.checkOut}
            </p>
          </div>
        </div>

        {/* ─── TAXI CARD ─── */}
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
            🚕 {language === 'th' ? 'บัตรโชว์แท็กซี่' : 'Show to Taxi Driver'}
          </p>
          <div className="bg-white dark:bg-gray-900 border-2 border-gray-800 dark:border-gray-600 rounded-xl p-4">
            {/* Big message in Japanese */}
            <div className="text-center mb-3">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                {language === 'th' ? 'ให้แท็กซี่ดูหน้านี้' : 'Show this screen to the driver'}
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 leading-relaxed whitespace-pre-line">
                {hotelInfo.taxiMessageJP}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-3" />

            {/* Address in Japanese - large for easy reading */}
            <div className="text-center">
              <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 leading-relaxed">
                {hotelInfo.addressJP}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {hotelInfo.nearestStationJP} ({hotelInfo.walkTimeJP})
              </p>
            </div>

            {/* Phone */}
            <div className="text-center mt-3">
              <a
                href={`tel:${hotelInfo.phone}`}
                className="inline-flex items-center gap-1.5 text-sm text-purple-600 dark:text-purple-400 hover:underline"
              >
                📞 {hotelInfo.phone}
              </a>
            </div>
          </div>
        </div>

        {/* ─── ADDRESS DETAILS ─── */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-2">
          <div>
            <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase">
              {language === 'th' ? 'ที่อยู่ (อังกฤษ)' : 'Address (English)'}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {hotelInfo.addressEN}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase">
              {language === 'th' ? 'ที่อยู่ (ญี่ปุ่น)' : 'Address (Japanese)'}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {hotelInfo.addressJP}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase">
              {language === 'th' ? 'สถานีใกล้สุด' : 'Nearest Station'}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {hotelInfo.nearestStation} ({hotelInfo.walkTime})
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {hotelInfo.nearestStationJP} ({hotelInfo.walkTimeJP})
            </p>
          </div>
        </div>

        {/* ─── ACTION BUTTONS ─── */}
        <div className="grid grid-cols-2 gap-2">
          {/* Open Maps */}
          <a
            href={hotelInfo.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg transition-all active:scale-95"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {language === 'th' ? 'เปิด Maps' : 'Open Maps'}
          </a>

          {/* Call Hotel */}
          <a
            href={`tel:${hotelInfo.phone}`}
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg transition-all active:scale-95"
          >
            📞 {language === 'th' ? 'โทรโรงแรม' : 'Call Hotel'}
          </a>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1.5">
            💡 {language === 'th' ? 'เคล็ดลับ' : 'Tips'}
          </p>
          <ul className="space-y-1 text-xs text-blue-600 dark:text-blue-400">
            <li>
              {language === 'th'
                ? '• โชว์หน้าจอแท็กซี่ — คนขับอ่านญี่ปุ่นได้'
                : '• Show this screen to taxi — driver can read Japanese'}
            </li>
            <li>
              {language === 'th'
                ? '• จาก Ueno Station ออกประตู Inariguchi เดิน 7 นาที'
                : '• From Ueno Station: Inariguchi Exit, 7 min walk'}
            </li>
            <li>
              {language === 'th'
                ? '• เช็คอิน 15:00 — เก็บกระเป๋าไว้ก่อนได้ถ้ามาถึงเช้า'
                : '• Check-in 15:00 — can store luggage if arriving early'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
