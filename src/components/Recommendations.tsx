"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { shoppingByDay } from "@/data/shoppingRecommendations";

const categoryStyle: Record<string, { badge: string; border: string }> = {
  food: { badge: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300", border: "border-amber-200 dark:border-amber-800" },
  souvenir: { badge: "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300", border: "border-teal-200 dark:border-teal-800" },
  anime: { badge: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800" },
  fashion: { badge: "bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300", border: "border-pink-200 dark:border-pink-800" },
  cosmetics: { badge: "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300", border: "border-rose-200 dark:border-rose-800" },
  electronics: { badge: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" },
  other: { badge: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400", border: "border-gray-200 dark:border-gray-600" },
};

const categoryLabel: Record<string, string> = {
  food: "🍡 ของกิน", souvenir: "🎁 ของฝาก", anime: "🎮 อนิเมะ", fashion: "👕 แฟชั่น",
  cosmetics: "💄 เครื่องสำอาง", electronics: "📱 อิเล็กทรอนิกส์", other: "📦 อื่นๆ",
};

const categoryEmoji: Record<string, string> = {
  food: "🍽️", souvenir: "🎁", anime: "🎮", fashion: "👕", cosmetics: "💄", electronics: "📱", other: "📦",
};

const dayIcons = ["✈️", "❄️", "⛩️", "🏮", "🗻", "☕", "🛫"];
const dayLabels = ["Ueno/Asakusa", "Gala Yuzawa", "Kamakura/Akiba", "Shibuya/Harajuku", "Mt. Fuji", "Shimokitazawa", "Narita"];
const dayColors = [
  "from-pink-400 to-rose-400", "from-blue-400 to-cyan-400", "from-indigo-400 to-purple-400",
  "from-orange-400 to-amber-400", "from-teal-400 to-emerald-400", "from-amber-700 to-yellow-600", "from-gray-400 to-slate-400",
];

// Unsplash direct photo URLs
const unsplashPhotos: Record<string, string> = {
  food: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&h=300&fit=crop",
  matcha: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
  sake: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=300&fit=crop",
  coffee: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&fit=crop",
  chocolate: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop",
  fruit: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop",
  whiskey: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400&h=300&fit=crop",
  temple: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop",
  asakusa: "https://images.unsplash.com/photo-1583966371059-7e79e2e672c3?w=400&h=300&fit=crop",
  skytree: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop",
  fuji: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&h=300&fit=crop",
  market: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=400&h=300&fit=crop",
  anime: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=300&fit=crop",
  fashion: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
  shibuya: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop",
  harajuku: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop",
  cosmetics: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
  snow: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=400&h=300&fit=crop",
  vintage: "https://images.unsplash.com/photo-1551232864-3f522363a84a?w=400&h=300&fit=crop",
  default: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop",
};

const getImageUrl = (query: string) => {
  const q = query.toLowerCase();
  if (q.includes("omamori") || q.includes("amulet") || q.includes("temple")) return unsplashPhotos.temple;
  if (q.includes("fan") || q.includes("uchiwa")) return unsplashPhotos.asakusa;
  if (q.includes("cake") || q.includes("ningyo")) return unsplashPhotos.food;
  if (q.includes("skytree") || q.includes("sumikko")) return unsplashPhotos.skytree;
  if (q.includes("kitkat") || q.includes("matcha")) return unsplashPhotos.matcha;
  if (q.includes("seafood") || q.includes("squid") || q.includes("dried")) return unsplashPhotos.food;
  if (q.includes("fruit") || q.includes("strawberry")) return unsplashPhotos.fruit;
  if (q.includes("spice") || q.includes("shichimi") || q.includes("wasabi")) return unsplashPhotos.food;
  if (q.includes("banana") || q.includes("tokyo banana")) return unsplashPhotos.food;
  if (q.includes("cosmetic") || q.includes("shiseido") || q.includes("skincare")) return unsplashPhotos.cosmetics;
  if (q.includes("sake")) return unsplashPhotos.sake;
  if (q.includes("ski") || q.includes("snow") || q.includes("glove")) return unsplashPhotos.snow;
  if (q.includes("cookie") || q.includes("hato")) return unsplashPhotos.food;
  if (q.includes("buddha") || q.includes("kamakura")) return unsplashPhotos.temple;
  if (q.includes("nendoroid") || q.includes("figma") || q.includes("figure")) return unsplashPhotos.anime;
  if (q.includes("gundam") || q.includes("gunpla")) return unsplashPhotos.anime;
  if (q.includes("pokemon") || q.includes("card")) return unsplashPhotos.anime;
  if (q.includes("game") || q.includes("retro")) return unsplashPhotos.anime;
  if (q.includes("potato") || q.includes("kawagoe")) return unsplashPhotos.food;
  if (q.includes("shibuya") || q.includes("109") || q.includes("fashion")) return unsplashPhotos.shibuya;
  if (q.includes("kawaii") || q.includes("harajuku") || q.includes("accessor")) return unsplashPhotos.harajuku;
  if (q.includes("don quijote") || q.includes("donki")) return unsplashPhotos.market;
  if (q.includes("fuji") || q.includes("mount fuji")) return unsplashPhotos.fuji;
  if (q.includes("egg") || q.includes("onsen") || q.includes("hakone")) return unsplashPhotos.food;
  if (q.includes("vintage") || q.includes("thrift")) return unsplashPhotos.vintage;
  if (q.includes("coffee") || q.includes("bean") || q.includes("drip")) return unsplashPhotos.coffee;
  if (q.includes("whiskey") || q.includes("yamazaki")) return unsplashPhotos.whiskey;
  if (q.includes("chocolate") || q.includes("royce")) return unsplashPhotos.chocolate;
  if (q.includes("shiroi") || q.includes("koibito")) return unsplashPhotos.chocolate;
  if (q.includes("snack") || q.includes("pocky")) return unsplashPhotos.food;
  return unsplashPhotos.default;
};

export default function Recommendations() {
  const { language } = useLanguage();
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([0]));
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const toggleDay = (d: number) => {
    setExpandedDays(prev => {
      const n = new Set(prev);
      n.has(d) ? n.delete(d) : n.add(d);
      return n;
    });
  };

  const handleImageLoad = (id: string) => setLoadedImages(prev => ({ ...prev, [id]: true }));
  const handleImageError = (id: string) => setFailedImages(prev => ({ ...prev, [id]: true }));

  const searchGoogleImages = (query: string) => {
    window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2.5">
            <span className="text-3xl">⭐</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold">
              {language === 'th' ? 'ของแนะนำแต่ละที่' : 'Recommended Items'}
            </h3>
            <p className="text-amber-100 text-xs sm:text-sm">
              {language === 'th'
                ? 'สินค้า/ของกินขึ้นชื่อ ในแต่ละสถานที่'
                : 'Famous food & souvenirs at each location'}
            </p>
          </div>
        </div>
        <div className="mt-3 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2.5 flex items-center gap-2">
          <span className="text-lg flex-shrink-0">🔍</span>
          <p className="text-xs sm:text-sm text-white font-medium">
            {language === 'th'
              ? 'กดปุ่มตรงกลางรูปเพื่อค้นหารูปสินค้าใน Google Images'
              : 'Tap the center button to search item images on Google Images'}
          </p>
        </div>
      </div>

      {/* Day-by-day */}
      {Object.entries(shoppingByDay).map(([dayStr, locations]) => {
        const dayIndex = parseInt(dayStr);
        const isExpanded = expandedDays.has(dayIndex);
        const totalItems = locations.reduce((s, l) => s + l.items.length, 0);

        return (
          <div key={dayIndex} className="border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => toggleDay(dayIndex)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${dayColors[dayIndex]} flex items-center justify-center text-lg flex-shrink-0`}>
                {dayIcons[dayIndex]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {language === 'th' ? `Day ${dayIndex + 1}` : `Day ${dayIndex + 1}`}
                  <span className="ml-1 text-xs font-normal text-gray-400">{dayLabels[dayIndex]}</span>
                </p>
                <p className="text-[10px] text-gray-400 truncate">
                  {locations.map(l => l.locationName).join(' · ')}
                </p>
              </div>
              <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full flex-shrink-0">
                {totalItems} {language === 'th' ? 'รายการ' : 'items'}
              </span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isExpanded && (
              <div className="px-3 pb-4 space-y-4 animate-fadeIn">
                {locations.map((loc, li) => (
                  <div key={li}>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-3 py-2.5 mb-3">
                      <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100">
                        {loc.locationName}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-0.5">
                        {loc.locationNameJP}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {loc.items.map((rec, ri) => {
                        const style = categoryStyle[rec.category] || categoryStyle.other;
                        const imgId = `${dayIndex}-${li}-${ri}`;
                        const isLoaded = loadedImages[imgId];
                        const isFailed = failedImages[imgId];
                        const imgUrl = getImageUrl(rec.unsplashQuery);
                        const searchQuery = `${rec.name} ${rec.nameJP} ${loc.locationName} Japan`;

                        return (
                          <div
                            key={ri}
                            className={`rounded-xl border overflow-hidden transition-all hover:shadow-md bg-white dark:bg-gray-800 ${style.border}`}
                          >
                            {/* Image area with Unsplash bg + center button */}
                            <div className="relative h-32 sm:h-36 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                              {/* Loading spinner */}
                              {!isLoaded && !isFailed && (
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                  <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 border-t-transparent rounded-full animate-spin" />
                                </div>
                              )}

                              {/* Unsplash background */}
                              <img
                                src={imgUrl}
                                alt={rec.name}
                                referrerPolicy="no-referrer"
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                                onLoad={() => handleImageLoad(imgId)}
                                onError={() => handleImageError(imgId)}
                                loading="lazy"
                              />

                              {/* Fallback if image fails */}
                              {isFailed && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                                  <span className="text-5xl opacity-40">{categoryEmoji[rec.category]}</span>
                                </div>
                              )}

                              {/* Dark overlay */}
                              <div className="absolute inset-0 bg-black/20" />

                              {/* Center button - Google Images */}
                              <button
                                onClick={() => searchGoogleImages(searchQuery)}
                                className="absolute inset-0 m-auto w-14 h-14 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95 z-20 group"
                              >
                                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" viewBox="0 0 24 24" fill="none">
                                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5"/>
                                  <path d="M16 16l5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                                </svg>
                              </button>

                              {/* Price badge */}
                              <div className="absolute bottom-2 right-2 z-20">
                                <span className="text-xs font-bold text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                  ≈¥{rec.priceEstimate.toLocaleString()}
                                </span>
                              </div>
                            </div>

                            {/* Info */}
                            <div className="p-3">
                              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {rec.name}
                              </p>
                              {rec.nameJP && (
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                  {rec.nameJP}
                                </p>
                              )}
                              {(rec.tip || rec.tipTH) && (
                                <div className="flex items-start gap-1.5 mt-1.5">
                                  <span className="text-amber-500 dark:text-amber-400 flex-shrink-0 text-xs">💡</span>
                                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 leading-snug">
                                    {language === 'th' ? rec.tipTH : rec.tip}
                                  </p>
                                </div>
                              )}
                              <span className={`inline-block mt-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${style.badge}`}>
                                {categoryLabel[rec.category]}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
