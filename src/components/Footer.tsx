"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-gray-900 dark:bg-black text-white text-center py-6 sm:py-10">
      <p className="text-xl sm:text-2xl mb-2">
        {language === 'th' ? '🌸 ขอให้สนุกกับการผจญภัยในโตเกียว! 🌸' : '🌸 Enjoy Your Tokyo Adventure! 🌸'}
      </p>
      <p className="text-xs sm:text-sm text-gray-400">
        {language === 'th' 
          ? 'สร้างด้วย ❤️ • 7 วัน • 49 สถานที่ • 200+ เคล็ดลับ' 
          : 'Built with ❤️ • 7 Days • 49 Locations • 200+ Tips'
        }
      </p>
    </footer>
  );
}
