'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

// สถานที่ท่องเที่ยวยอดนิยม
const popularPlaces = [
  // สถานที่ยอดนิยมในโตเกียว
  { name: 'Tokyo Disney Resort', nameTH: 'โตเกียวดิสนีย์รีสอร์ท', category: 'tourist', icon: '🏰' },
  { name: 'Tokyo Skytree', nameTH: 'โตเกียวสกายทรี', category: 'tourist', icon: '🗼' },
  { name: 'Senso-ji Temple Asakusa', nameTH: 'วัดเซนโซจิ อาซากุสะ', category: 'tourist', icon: '⛩️' },
  { name: 'Shibuya Crossing', nameTH: 'ชิบุยะ สแควร์', category: 'tourist', icon: '🚶' },
  { name: 'Meiji Shrine', nameTH: 'ศาลเจ้าเมจิ', category: 'tourist', icon: '⛩️' },
  { name: 'Akihabara Electric Town', nameTH: 'อากิฮาบาระ', category: 'tourist', icon: '🎮' },
  { name: 'Harajuku Takeshita Street', nameTH: 'ฮาราจูกุ', category: 'tourist', icon: '👗' },
  { name: 'Tsukiji Outer Market', nameTH: 'ตลาดสึกิจิ', category: 'tourist', icon: '🍣' },
  { name: 'Tokyo Tower', nameTH: 'โตเกียวทาวเวอร์', category: 'tourist', icon: '🗼' },
  { name: 'Ueno Park', nameTH: 'สวนอุเอโนะ', category: 'tourist', icon: '🌸' },
  { name: 'Shinjuku Gyoen', nameTH: 'สวนชินจูกุเกียวเอน', category: 'tourist', icon: '🌳' },
  { name: 'teamLab Planets', nameTH: 'ทีมแล็บ แพลนเน็ทส์', category: 'tourist', icon: '🎨' },
  { name: 'Odaiba', nameTH: 'โอไดบะ', category: 'tourist', icon: '🌊' },
  { name: 'Ginza Shopping District', nameTH: 'กินซะ', category: 'tourist', icon: '🛍️' },
  { name: 'Roppongi Hills', nameTH: 'roppongi Hills', category: 'tourist', icon: '🏙️' },
  
  // นอกโตเกียว
  { name: 'Kamakura Great Buddha', nameTH: 'พระใหญ่คามะคุระ', category: 'tourist', icon: '🗿' },
  { name: 'Hakone', nameTH: 'ฮาโกเน่', category: 'tourist', icon: '♨️' },
  { name: 'Mount Fuji', nameTH: 'ภูเขาไฟฟูจิ', category: 'tourist', icon: '🗻' },
  { name: 'Nikko', nameTH: 'นิกโก้', category: 'tourist', icon: '⛩️' },
  { name: 'Yokohama Chinatown', nameTH: 'ไชน่าทาวน์ โยโกฮามะ', category: 'tourist', icon: '🏮' },
];

// โรงแรมที่แนะนำ
const hotels = [
  { name: 'Tabist Hotel Ueno 39', nameTH: 'Tabist Hotel Ueno 39 (โรงแรมของเรา)', area: 'Ueno', icon: '🏨', category: 'hotel' },
  { name: 'APA Hotel Shibuya', nameTH: 'APA โฮเทล ชิบุยะ', area: 'Shibuya', icon: '🏨', category: 'hotel' },
  { name: 'APA Hotel Shinjuku', nameTH: 'APA โฮเทล ชินจูกุ', area: 'Shinjuku', icon: '🏨', category: 'hotel' },
  { name: 'Hotel Gracery Shinjuku', nameTH: 'โฮเทล กราเซอรี่ ชินจูกุ', area: 'Shinjuku', icon: '🏨', category: 'hotel' },
  { name: 'Mitsui Garden Hotel Ginza', nameTH: 'มิตซุย การ์เด้น โฮเทล กินซะ', area: 'Ginza', icon: '🏨', category: 'hotel' },
];

// สถานีหลัก/สนามบิน
const transportHubs = [
  { name: 'Narita International Airport', nameTH: 'สนามบินนาริตะ', icon: '✈️', category: 'transport' },
  { name: 'Haneda Airport', nameTH: 'สนามบินฮาเนดะ', icon: '✈️', category: 'transport' },
  { name: 'Tokyo Station', nameTH: 'สถานีโตเกียว', icon: '🚃', category: 'transport' },
  { name: 'Shinjuku Station', nameTH: 'สถานีชินจูกุ', icon: '🚃', category: 'transport' },
  { name: 'Shibuya Station', nameTH: 'สถานีชิบุยะ', icon: '🚃', category: 'transport' },
  { name: 'Ueno Station', nameTH: 'สถานีอุเอโนะ', icon: '🚃', category: 'transport' },
  { name: 'Akihabara Station', nameTH: 'สถานีอากิฮาบาระ', icon: '🚃', category: 'transport' },
  { name: 'Ikebukuro Station', nameTH: 'สถานีอิเคะบุคุโระ', icon: '🚃', category: 'transport' },
];

type PlaceItem = {
  name: string;
  nameTH: string;
  icon: string;
  category?: string;
  area?: string;
  displayName?: string; // สำหรับ Nominatim results
  lat?: number;
  lon?: number;
};

// เส้นทางยอดนิยม
const popularRoutes = [
  { from: 'Narita International Airport', to: 'Ueno Station', labelTH: 'สนามบินนาริตะ → อุเอโนะ', labelEN: 'Narita → Ueno' },
  { from: 'Haneda Airport', to: 'Tokyo Station', labelTH: 'ฮาเนดะ → โตเกียว', labelEN: 'Haneda → Tokyo' },
  { from: 'Tokyo Station', to: 'Tokyo Disney Resort', labelTH: 'โตเกียว → ดิสนีย์', labelEN: 'Tokyo → Disney' },
  { from: 'Shinjuku Station', to: 'Kamakura Great Buddha', labelTH: 'ชินจูกุ → พระใหญ่คามะคุระ', labelEN: 'Shinjuku → Kamakura' },
  { from: 'Tokyo Station', to: 'Mount Fuji', labelTH: 'โตเกียว → ฟูจิ', labelEN: 'Tokyo → Mt. Fuji' },
  { from: 'Ueno Station', to: 'Nikko', labelTH: 'อุเอโนะ → นิกโก้', labelEN: 'Ueno → Nikko' },
];

export default function TrainRouteFinder() {
  const { language } = useLanguage();
  const [fromPlace, setFromPlace] = useState('');
  const [toPlace, setToPlace] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState<PlaceItem[]>([]);
  const [toSuggestions, setToSuggestions] = useState<PlaceItem[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'places' | 'hotels' | 'routes'>('search');
  const [isSearching, setIsSearching] = useState(false);
  
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  // ค้นหาด้วย Nominatim API (OpenStreetMap - ฟรี)
  const searchNominatim = async (query: string): Promise<PlaceItem[]> => {
    if (query.length < 2) return [];
    
    setIsSearching(true);
    try {
      // เพิ่ม " Japan" เพื่อเน้นผลการค้นหาในญี่ปุ่น
      const searchQuery = `${query} Japan`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=8&addressdetails=1&accept-language=th,en`
      );
      
      if (!response.ok) return [];
      
      const data = await response.json();
      
      return data.map((item: any) => ({
        name: item.display_name.split(',')[0],
        nameTH: item.display_name.split(',')[0],
        displayName: item.display_name,
        icon: getCategoryIcon(item.type, item.class),
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        category: 'nominatim',
      }));
    } catch (error) {
      console.error('Nominatim search error:', error);
      return [];
    } finally {
      setIsSearching(false);
    }
  };

  // กำหนด icon ตามประเภทสถานที่
  const getCategoryIcon = (type: string, category: string): string => {
    if (category === 'railway') return '🚃';
    if (category === 'aeroway') return '✈️';
    if (category === 'tourism') return '🏯';
    if (category === 'hotel') return '🏨';
    if (category === 'restaurant') return '🍜';
    if (category === 'shop') return '🛍️';
    if (category === 'hospital') return '🏥';
    if (category === 'school' || category === 'university') return '🏫';
    return '📍';
  };

  // ปิด dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ค้นหาและแนะนำ
  const handleFromSearch = async (value: string) => {
    setFromPlace(value);
    if (value.length >= 2) {
      const query = value.toLowerCase();
      const allPlaces = [...popularPlaces, ...hotels, ...transportHubs];
      
      // ค้นหาใน local list ก่อน
      const localFiltered = allPlaces.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.nameTH.includes(value)
      );
      
      // ถ้าไม่เจอใน local หรือเจอน้อย → ค้นหาจาก Nominatim
      if (localFiltered.length < 5) {
        const nominatimResults = await searchNominatim(value);
        // รวมผลลัพธ์จาก local + Nominatim (ไม่เกิน 8 รายการ)
        const combined = [...localFiltered, ...nominatimResults].slice(0, 8);
        setFromSuggestions(combined);
      } else {
        setFromSuggestions(localFiltered.slice(0, 8));
      }
      
      setShowFromSuggestions(true);
    } else {
      setFromSuggestions([]);
      setShowFromSuggestions(false);
    }
  };

  const handleToSearch = async (value: string) => {
    setToPlace(value);
    if (value.length >= 2) {
      const query = value.toLowerCase();
      const allPlaces = [...popularPlaces, ...hotels, ...transportHubs];
      
      // ค้นหาใน local list ก่อน
      const localFiltered = allPlaces.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.nameTH.includes(value)
      );
      
      // ถ้าไม่เจอใน local หรือเจอน้อย → ค้นหาจาก Nominatim
      if (localFiltered.length < 5) {
        const nominatimResults = await searchNominatim(value);
        // รวมผลลัพธ์จาก local + Nominatim (ไม่เกิน 8 รายการ)
        const combined = [...localFiltered, ...nominatimResults].slice(0, 8);
        setToSuggestions(combined);
      } else {
        setToSuggestions(localFiltered.slice(0, 8));
      }
      
      setShowToSuggestions(true);
    } else {
      setToSuggestions([]);
      setShowToSuggestions(false);
    }
  };

  const selectFromSuggestion = (place: PlaceItem) => {
    setFromPlace(place.name);
    setShowFromSuggestions(false);
  };

  const selectToSuggestion = (place: PlaceItem) => {
    setToPlace(place.name);
    setShowToSuggestions(false);
  };

  // เปิด Google Maps Transit
  const openGoogleMaps = () => {
    if (!fromPlace.trim() || !toPlace.trim()) return;

    const origin = encodeURIComponent(fromPlace.trim());
    const destination = encodeURIComponent(toPlace.trim());
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=transit`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleQuickSelect = (from: string, to: string) => {
    setFromPlace(from);
    setToPlace(to);
    
    setTimeout(() => {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&travelmode=transit`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      openGoogleMaps();
    }
  };

  // รวมสถานที่ทั้งหมดสำหรับ tab
  const allTouristPlaces = popularPlaces.filter(p => p.category === 'tourist');
  const allHotels = hotels;
  const allTransport = transportHubs;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 p-4 sm:p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🗺️</span>
          <h2 className="text-lg sm:text-2xl font-bold">
            {language === 'th' ? 'ค้นหาเส้นทาง' : 'Route Planner'}
          </h2>
        </div>
        <p className="text-blue-100 text-xs sm:text-sm">
          {language === 'th'
            ? 'พิมพ์ชื่อสถานที่, เลือกจากลิสต์, หรือแตะเส้นทางยอดนิยม'
            : 'Type place name, pick from list, or tap popular routes'}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all min-h-[44px] ${
              activeTab === 'search'
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            🔍 {language === 'th' ? 'ค้นหา' : 'Search'}
          </button>
          <button
            onClick={() => setActiveTab('places')}
            className={`flex-1 px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all min-h-[44px] ${
              activeTab === 'places'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            🏯 {language === 'th' ? 'สถานที่' : 'Places'}
          </button>
          <button
            onClick={() => setActiveTab('hotels')}
            className={`flex-1 px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all min-h-[44px] ${
              activeTab === 'hotels'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            🏨 {language === 'th' ? 'โรงแรม' : 'Hotels'}
          </button>
          <button
            onClick={() => setActiveTab('routes')}
            className={`flex-1 px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all min-h-[44px] ${
              activeTab === 'routes'
                ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            ⭐ {language === 'th' ? 'ยอดนิยม' : 'Popular'}
          </button>
        </div>
      </div>

      {/* Search Tab */}
      {activeTab === 'search' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-3 sm:p-6">
          <div className="space-y-4">
            {/* From Place */}
            <div ref={fromRef} className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'th' ? '🔵 จุดเริ่มต้น' : '🔵 From'}
              </label>
              <input
                type="text"
                value={fromPlace}
                onChange={(e) => handleFromSearch(e.target.value)}
                onFocus={() => fromPlace.length >= 1 && setShowFromSuggestions(true)}
                onKeyDown={handleKeyDown}
                placeholder={language === 'th' ? 'พิมพ์ชื่อสถานที่...' : 'Type place name...'}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all text-sm"
              />
              
              {/* Suggestions Dropdown */}
              {showFromSuggestions && fromSuggestions.length > 0 && (
                <div className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto">
                  {fromSuggestions.map((place, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectFromSuggestion(place)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-b border-gray-100 dark:border-gray-700 transition flex items-center gap-3"
                    >
                      <span className="text-xl">{place.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                          {language === 'th' ? place.nameTH : place.name}
                        </p>
                        {place.displayName && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {place.displayName}
                          </p>
                        )}
                        {place.category === 'nominatim' && (
                          <p className="text-xs text-blue-500 dark:text-blue-400">
                            🌐 OpenStreetMap
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                  {isSearching && (
                    <div className="px-4 py-6 text-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mx-auto mb-2"></div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {language === 'th' ? 'กำลังค้นหา...' : 'Searching...'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* To Place */}
            <div ref={toRef} className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'th' ? '🔴 ปลายทาง' : '🔴 To'}
              </label>
              <input
                type="text"
                value={toPlace}
                onChange={(e) => handleToSearch(e.target.value)}
                onFocus={() => toPlace.length >= 1 && setShowToSuggestions(true)}
                onKeyDown={handleKeyDown}
                placeholder={language === 'th' ? 'พิมพ์ชื่อสถานที่...' : 'Type place name...'}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800 transition-all text-sm"
              />
              
              {/* Suggestions Dropdown */}
              {showToSuggestions && toSuggestions.length > 0 && (
                <div className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto">
                  {toSuggestions.map((place, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectToSuggestion(place)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-b border-gray-100 dark:border-gray-700 transition flex items-center gap-3"
                    >
                      <span className="text-xl">{place.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                          {language === 'th' ? place.nameTH : place.name}
                        </p>
                        {place.displayName && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {place.displayName}
                          </p>
                        )}
                        {place.category === 'nominatim' && (
                          <p className="text-xs text-blue-500 dark:text-blue-400">
                            🌐 OpenStreetMap
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                  {isSearching && (
                    <div className="px-4 py-6 text-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mx-auto mb-2"></div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {language === 'th' ? 'กำลังค้นหา...' : 'Searching...'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Open Google Maps Button */}
            <button
              onClick={openGoogleMaps}
              disabled={!fromPlace.trim() || !toPlace.trim()}
              className="w-full py-4 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-base rounded-xl shadow-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 min-h-[52px] flex items-center justify-center gap-2"
            >
              <span className="text-2xl">🗺️</span>
              <span>
                {language === 'th' ? 'เปิด Google Maps' : 'Open Google Maps'}
              </span>
            </button>

            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              {language === 'th'
                ? '💡 กด Enter หรือเลือกจากคำแนะนำ'
                : '💡 Press Enter or select from suggestions'}
            </p>
          </div>
        </div>
      )}

      {/* Tourist Places Tab */}
      {activeTab === 'places' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-3 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3">
            {language === 'th' ? '🏯 สถานที่ท่องเที่ยวยอดนิยม' : '🏯 Popular Tourist Attractions'}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            {language === 'th'
              ? 'แตะที่สถานที่เพื่อเลือกเป็นจุดเริ่มต้นหรือปลายทาง'
              : 'Tap a place to select as start or destination'}
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {allTouristPlaces.map((place, idx) => (
              <div key={idx} className="space-y-2">
                <button
                  onClick={() => handleQuickSelect(place.name, '')}
                  className="w-full text-left p-3 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border border-pink-200 dark:border-pink-800 rounded-xl hover:from-pink-100 hover:to-rose-100 dark:hover:from-pink-900/30 dark:hover:to-rose-900/30 transition-all active:scale-95"
                >
                  <span className="text-2xl block mb-1">{place.icon}</span>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">
                    {language === 'th' ? place.nameTH : place.name}
                  </p>
                </button>
                <button
                  onClick={() => handleQuickSelect('', place.name)}
                  className="w-full text-center text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 py-1"
                >
                  {language === 'th' ? '← ไปที่นี่' : 'Go here →'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hotels Tab */}
      {activeTab === 'hotels' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-3 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3">
            {language === 'th' ? '🏨 โรงแรมที่แนะนำ' : '🏨 Recommended Hotels'}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            {language === 'th'
              ? 'แตะที่โรงแรมเพื่อเลือกเป็นจุดเริ่มต้นหรือปลายทาง'
              : 'Tap a hotel to select as start or destination'}
          </p>
          
          <div className="space-y-2">
            {allHotels.map((hotel, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <button
                  onClick={() => handleQuickSelect(hotel.name, '')}
                  className="flex-1 text-left p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-900/30 dark:hover:to-orange-900/30 transition-all active:scale-95 flex items-center gap-3"
                >
                  <span className="text-2xl">{hotel.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {language === 'th' ? hotel.nameTH : hotel.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {hotel.area}
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => handleQuickSelect('', hotel.name)}
                  className="px-3 py-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  {language === 'th' ? '← ไป' : 'Go →'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popular Routes Tab */}
      {activeTab === 'routes' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-3 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3">
            {language === 'th' ? '⭐ เส้นทางยอดนิยม' : '⭐ Popular Routes'}
          </h3>
          <div className="space-y-2">
            {popularRoutes.map((route, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickSelect(route.from, route.to)}
                className="w-full text-left px-4 py-3 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-200 dark:border-green-800 rounded-xl hover:from-green-100 hover:to-teal-100 dark:hover:from-green-900/30 dark:hover:to-teal-900/30 transition-all active:scale-95"
              >
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  {language === 'th' ? route.labelTH : route.labelEN}
                </span>
                <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {language === 'th' ? 'แตะเพื่อเปิด Google Maps' : 'Tap to open Google Maps'}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800 p-3 sm:p-6">
        <h3 className="text-sm sm:text-base font-bold text-green-700 dark:text-green-300 mb-3">
          {language === 'th' ? '💡 เคล็ดลับ' : '💡 Tips'}
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-green-600 dark:text-green-400">
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">🔍</span>
            <span>
              {language === 'th'
                ? 'พิมพ์ชื่อสถานที่ 2 ตัวอักษรขึ้นไป จะมีคำแนะนำจาก Local + OpenStreetMap (ฟรี!)'
                : 'Type 2+ characters for autocomplete from Local + OpenStreetMap (Free!)'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">🌐</span>
            <span>
              {language === 'th'
                ? '🌐 OpenStreetMap ค้นหาได้ทุกที่ในโลก - โรงแรม, ร้านอาหาร, สถานที่ท่องเที่ยว'
                : '🌐 OpenStreetMap searches worldwide - hotels, restaurants, attractions'}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">🗺️</span>
            <span>
              {language === 'th'
                ? 'Google Maps จะแสดงเส้นทางรถไฟแบบเรียลไทม์ พร้อมเวลาออก-ถึง'
                : 'Google Maps shows real-time train routes with times'}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
