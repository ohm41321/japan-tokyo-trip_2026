"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface StoreType {
  id: string;
  name: string;
  nameJP: string;
  emoji: string;
  color: string;
  description: string;
  descriptionTH: string;
}

const storeTypes: StoreType[] = [
  {
    id: "konbini",
    name: "Convenience Store",
    nameJP: "\u30b3\u30f3\u30d3\u30cb",
    emoji: "🏪",
    color: "from-green-500 to-emerald-500",
    description: "7-Eleven, Lawson, FamilyMart - open 24/7",
    descriptionTH: "เปิด 24 ชม. มีทุกอย่าง",
  },
  {
    id: "pharmacy",
    name: "Pharmacy / Drug Store",
    nameJP: "\u85ac\u5c40",
    emoji: "💊",
    color: "from-red-500 to-pink-500",
    description: "Matsumoto Kiyoshi, Welcia, Sun Drug",
    descriptionTH: "ร้านขายยา เครื่องสำอาง",
  },
  {
    id: "atm",
    name: "ATM",
    nameJP: "ATM",
    emoji: "🏧",
    color: "from-blue-500 to-indigo-500",
    description: "7-Bank ATM, Japan Post ATM",
    descriptionTH: "กดเงินสด ใช้บัตรต่างประเทศได้",
  },
  {
    id: "restaurant",
    name: "Restaurant",
    nameJP: "\u98ef\u5c4b",
    emoji: "🍜",
    color: "from-orange-500 to-amber-500",
    description: "Ramen, sushi, curry nearby",
    descriptionTH: "ร้านอาหารใกล้ๆ",
  },
  {
    id: "cafe",
    name: "Cafe",
    nameJP: "\u30ab\u30d5\u30a7",
    emoji: "☕",
    color: "from-amber-700 to-yellow-600",
    description: "Starbucks, Doutor, local cafes",
    descriptionTH: "คาเฟ่ ร้านกาแฟ",
  },
  {
    id: "hospital",
    name: "Hospital / Clinic",
    nameJP: "\u75c5\u9662",
    emoji: "🏥",
    color: "from-red-600 to-red-500",
    description: "Nearby hospitals and clinics",
    descriptionTH: "โรงพยาบาล คลินิก",
  },
];

export default function NearbyStore() {
  const { language } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>("konbini");

  const selected = storeTypes.find(s => s.id === selectedType) || storeTypes[0];

  const getGoogleMapsUrl = (query: string) => {
    return `https://www.google.com/maps/search/${encodeURIComponent(query)}/@35.6762,139.6503,16z`;
  };

  const openMaps = (type: string) => {
    const queries: Record<string, string> = {
      konbini: "7-Eleven OR Lawson OR FamilyMart",
      pharmacy: "\u85ac\u5c40 OR Matsumoto Kiyoshi OR drug store",
      atm: "ATM OR \u30a2\u30c8\u30e9",
      restaurant: "\u30ec\u30b9\u30c8\u30e9\u30f3 OR restaurant",
      cafe: "\u30ab\u30d5\u30a7 OR cafe OR Starbucks",
      hospital: "\u75c5\u9662 OR hospital OR clinic",
    };
    const query = queries[type] || type;
    window.open(getGoogleMapsUrl(query), '_blank');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 p-4 sm:p-5 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2.5">
            <span className="text-3xl">📍</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold">
              {language === 'th' ? 'หาร้านใกล้ตัว' : 'Find Nearby'}
            </h3>
            <p className="text-teal-100 text-xs sm:text-sm">
              {language === 'th' ? 'เปิด Google Maps หารอบตัวคุณ' : 'Open Google Maps to find nearby'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Store Type Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {storeTypes.map((store) => (
            <button
              key={store.id}
              onClick={() => setSelectedType(store.id)}
              className={`p-3 rounded-xl text-sm transition-all duration-200 active:scale-95 border-2 ${
                selectedType === store.id
                  ? `border-transparent bg-gradient-to-r ${store.color} text-white shadow-md scale-105`
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-2xl block mb-1">{store.emoji}</span>
              <span className="text-xs font-semibold block">
                {store.name}
              </span>
              <span className={`text-[10px] block mt-0.5 ${
                selectedType === store.id ? 'text-white/80' : 'text-gray-400 dark:text-gray-500'
              }`}>
                {language === 'th' ? store.descriptionTH : store.description}
              </span>
              {/* Japanese name sub-label */}
              <span className={`text-[10px] block mt-0.5 ${
                selectedType === store.id ? 'text-white/60' : 'text-gray-300 dark:text-gray-600'
              }`}>
                {store.nameJP}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Store Info */}
        <div className={`bg-gradient-to-r ${selected.color} rounded-xl p-4 text-white`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{selected.emoji}</span>
            <div>
              <p className="text-lg font-bold">{selected.name}</p>
              <p className="text-sm opacity-80">{selected.nameJP}</p>
            </div>
          </div>
          <p className="text-xs opacity-75 mb-3">
            {language === 'th' ? selected.descriptionTH : selected.description}
          </p>

          {/* Open Maps Button */}
          <button
            onClick={() => openMaps(selected.id)}
            className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl py-3 font-bold text-sm transition-all duration-150 active:scale-95 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {language === 'th' ? 'เปิด Maps หาร้านนี้แถวนี้' : 'Open Maps to find nearby'}
          </button>
        </div>

        {/* Konbini Tips */}
        {selectedType === "konbini" && (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 border border-green-100 dark:border-green-800">
            <p className="text-xs font-semibold text-green-700 dark:text-green-300 mb-2">
              💡 {language === 'th' ? 'ร้านสะดวกซื้อในญี่ปุ่น' : 'Konbini Tips'}
            </p>
            <ul className="space-y-1 text-xs text-green-600 dark:text-green-400">
              <li>• {language === 'th' ? '7-Eleven, Lawson, FamilyMart เปิด 24 ชม.' : '7-Eleven, Lawson, FamilyMart open 24/7'}</li>
              <li>• {language === 'th' ? 'ATM 7-Bank ใช้บัตรต่างประเทศได้' : '7-Bank ATM accepts foreign cards'}</li>
              <li>• {language === 'th' ? 'มีของร้อนพร้อมกิน ข้าวกล่อง ออนเซ็นทามาโกะ' : 'Hot food ready: bento, onsen tamago, fried chicken'}</li>
              <li>• {language === 'th' ? 'จ่ายบิล ค่าตั๋ว ทำได้ที่ร้าน' : 'Pay bills, buy tickets at the store'}</li>
            </ul>
          </div>
        )}

        {/* Pharmacy Tips */}
        {selectedType === "pharmacy" && (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 border border-red-100 dark:border-red-800">
            <p className="text-xs font-semibold text-red-700 dark:text-red-300 mb-2">
              💡 {language === 'th' ? 'ร้านขายยา' : 'Pharmacy Tips'}
            </p>
            <ul className="space-y-1 text-xs text-red-600 dark:text-red-400">
              <li>• {language === 'th' ? 'Matsumoto Kiyoshi, Welcia หาง่าย ราคาถูก' : 'Matsumoto Kiyoshi, Welcia common & cheap'}</li>
              <li>• {language === 'th' ? 'ยาแก้ปวด, ยาแก้แพ้, พลาสเตอร์ หาซื้อได้เอง' : 'OTC painkillers, allergy meds, bandages available'}</li>
              <li>• {language === 'th' ? 'เครื่องสำอางราคาถูกมาก' : 'Cosmetics are very affordable'}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
