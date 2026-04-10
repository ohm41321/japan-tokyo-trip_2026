'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function FeatureUpdateModal() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // ตรวจสอบว่าเคยเห็น notification นี้หรือยัง
    const hasSeenUpdate = localStorage.getItem('seen_feature_update_2024');
    
    if (!hasSeenUpdate) {
      // แสดงหลังจากโหลดหน้า 1 วินาที
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // บันทึกว่าผู้ใช้เห็นแล้ว
    localStorage.setItem('seen_feature_update_2024', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🎉</span>
              <div>
                <h2 className="text-xl font-bold">
                  {language === 'th' ? 'อัพเดตใหม่!' : 'What\'s New!'}
                </h2>
                <p className="text-sm opacity-90">
                  {language === 'th' ? 'เวอร์ชันล่าสุด' : 'Latest version'}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition p-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Feature 1: Route Finder */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xl">
              🗺️
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                {language === 'th' ? 'ค้นหาเส้นทางด้วย Google Maps' : 'Route Finder with Google Maps'}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {language === 'th'
                  ? 'เลือกสถานีต้นทาง-ปลายทาง แล้วเปิด Google Maps เพื่อดูเส้นทางเรียลไทม์ พร้อมเวลาออก-ถึง'
                  : 'Select stations and open Google Maps for real-time routes with departure/arrival times'}
              </p>
            </div>
          </div>

          {/* Feature 2: JR Map */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-xl">
              🚃
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                {language === 'th' ? 'แผนที่รถไฟ JR East แบบซูมได้' : 'Zoomable JR East Railway Map'}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {language === 'th'
                  ? 'ซูมเข้า-ออก, ลากดูรายละเอียด, บันทึกภาพเก็บไว้ใช้ offline ได้'
                  : 'Zoom in/out, drag to explore, save image for offline use'}
              </p>
            </div>
          </div>

          {/* Feature 3: Thai + English Names */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xl">
              🌐
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                {language === 'th' ? 'ชื่อสถานีภาษาไทย + อังกฤษ' : 'Station Names in Thai + English'}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {language === 'th'
                  ? 'ทุกสถานีแสดงชื่อไทยพร้อมชื่ออังกฤษในวงเล็บ ง่ายต่อการถามทาง'
                  : 'All stations show Thai name with English in parentheses for easy navigation'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <button
            onClick={handleClose}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all active:scale-95"
          >
            {language === 'th' ? '✅ รับทราบ' : '✅ Got it!'}
          </button>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
            {language === 'th'
              ? 'จะไม่แสดงข้อความนี้อีก'
              : 'You won\'t see this message again'}
          </p>
        </div>
      </div>
    </div>
  );
}
