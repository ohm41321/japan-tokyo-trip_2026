"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'th';

interface Translations {
  [key: string]: {
    en: string;
    th: string;
  };
}

export const translations: Translations = {
  // Header
  'header.title': { en: 'Tokyo Trip Planner', th: 'แพลนเที่ยวโตเกียว' },
  'header.subtitle': { en: 'April 16-22, 2026', th: '16-22 เมษายน 2569' },
  'header.flight': { en: 'Flight', th: 'เที่ยวบิน' },
  'header.hotel': { en: 'Hotel', th: 'โรงแรม' },
  'header.jrpass': { en: 'JR Pass', th: 'JR Pass' },
  'header.progress': { en: 'Trip Progress', th: 'ความคืบหน้าทริป' },
  'header.overall': { en: 'Overall', th: 'รวมทั้งหมด' },
  'header.theme': { en: 'Toggle theme', th: 'สลับธีม' },

  // Tabs
  'tab.itinerary': { en: 'Itinerary', th: '📅 แผนรายวัน' },
  'tab.budget': { en: 'Budget', th: '💰 งบประมาณ' },
  'tab.weather': { en: 'Weather', th: '🌤️ สภาพอากาศ' },
  'tab.packing': { en: 'Packing', th: '🎒 ของที่ต้องเตรียม' },
  'tab.transport': { en: 'Transport', th: '🚃 การเดินทาง' },

  // DayCard
  'daycard.done': { en: 'done', th: 'เสร็จแล้ว' },
  'daycard.check_all': { en: 'Check All', th: 'เลือกทั้งหมด' },
  'daycard.uncheck_all': { en: 'Uncheck All', th: 'ยกเลิกทั้งหมด' },
  'daycard.expand_all': { en: 'Expand All', th: 'ขยายทั้งหมด' },
  'daycard.collapse_all': { en: 'Collapse All', th: 'ยุบทั้งหมด' },
  'daycard.view_map': { en: 'View on Map', th: 'ดูบนแผนที่' },
  'daycard.hide_map': { en: 'Hide Map', th: 'ซ่อนแผนที่' },
  'daycard.open_maps': { en: 'Open in Maps', th: 'เปิดใน Maps' },
  'daycard.tips_title': { en: 'Tips & Advice', th: 'เคล็ดลับและข้อควรระวัง' },

  // Budget
  'budget.title': { en: 'Budget Tracker', th: 'ติดตามงบประมาณ' },
  'budget.subtitle': { en: 'Track your spending', th: 'ติดตามค่าใช้จ่าย' },
  'budget.spent': { en: 'spent', th: 'ใช้แล้ว' },
  'budget.budget': { en: 'budget', th: 'งบ' },
  'budget.remaining': { en: 'remaining', th: 'เหลือ' },
  'budget.over_budget': { en: 'Over budget!', th: 'เกินงบแล้ว!' },
  'budget.add_expense': { en: 'Add Expense', th: 'เพิ่มค่าใช้จ่าย' },
  'budget.set_limit': { en: 'Set Limit', th: 'ตั้งวงเงิน' },
  'budget.delete': { en: 'Delete', th: 'ลบ' },
  'budget.category': { en: 'Category', th: 'หมวดหมู่' },
  'budget.amount': { en: 'Amount (¥)', th: 'จำนวนเงิน (¥)' },
  'budget.description': { en: 'Description', th: 'รายละเอียด' },
  'budget.save': { en: 'Save', th: 'บันทึก' },
  'budget.cancel': { en: 'Cancel', th: 'ยกเลิก' },
  'budget.total_spent': { en: 'Total Spent', th: 'ใช้ทั้งหมด' },
  'budget.total_budget': { en: 'Total Budget', th: 'งบทั้งหมด' },
  'budget.savings': { en: 'Remaining', th: 'คงเหลือ' },
  'budget.food': { en: 'Food', th: '🍜 อาหาร' },
  'budget.transport': { en: 'Transport', th: '🚃 เดินทาง' },
  'budget.shopping': { en: 'Shopping', th: '🛍️ ช้อปปิ้ง' },
  'budget.activities': { en: 'Activities', th: '🎭 กิจกรรม' },
  'budget.accommodation': { en: 'Accommodation', th: '🏨 ที่พัก' },
  'budget.other': { en: 'Other', th: '📦 อื่นๆ' },

  // Weather
  'weather.title': { en: 'Tokyo Weather', th: 'สภาพอากาศโตเกียว' },
  'weather.live': { en: 'Live data', th: 'ข้อมูลสด' },
  'weather.updated': { en: 'Updated', th: 'อัพเดต' },
  'weather.just_now': { en: 'just now', th: 'เมื่อสักครู่' },
  'weather.fallback': { en: 'Live data unavailable - using estimate', th: 'ไม่สามารถดึงข้อมูลสด - ใช้ข้อมูลประมาณการ' },
  'weather.loading': { en: 'Loading weather data...', th: 'กำลังโหลดข้อมูลสภาพอากาศ...' },
  'weather.fetching': { en: 'Fetching live weather from Open-Meteo...', th: 'กำลังดึงข้อมูลจาก Open-Meteo...' },
  'weather.rain_expected': { en: 'Rain expected', th: 'คาดว่าฝนจะตก' },
  'weather.humidity': { en: 'Humidity', th: 'ความชื้น' },
  'weather.wind': { en: 'Wind', th: 'ลม' },
  'weather.rain': { en: 'Rain', th: 'ฝน' },
  'weather.location': { en: 'Location', th: 'สถานที่' },
  'weather.clothing': { en: 'Clothing Recommendations', th: 'แนะนำการแต่งตัว' },
  'weather.tips': { en: 'Tips', th: 'เคล็ดลับ' },
  'weather.swipe': { en: 'Swipe to see all days. Tap a day for details.', th: '👆 เลื่อนเพื่อดูทุกวัน แตะที่วันเพื่อดูรายละเอียด' },
  'weather.click': { en: 'Click a day to expand detailed weather info.', th: 'คลิกที่วันเพื่อดูรายละเอียดสภาพอากาศ' },

  // Packing
  'packing.title': { en: 'Packing List', th: 'รายการของที่ต้องเตรียม' },
  'packing.subtitle': { en: 'Get ready for your trip', th: 'เตรียมตัวให้พร้อมสำหรับทริป' },
  'packing.packed': { en: 'packed', th: 'จัดแล้ว' },
  'packing.all': { en: 'All', th: 'ทั้งหมด' },
  'packing.unpacked': { en: 'Unpacked', th: 'ยังไม่ได้จัด' },
  'packing.reset': { en: 'Reset All', th: 'รีเซ็ตทั้งหมด' },
  'packing.confirm': { en: 'Confirm?', th: 'ยืนยัน?' },
  'packing.add': { en: 'Add', th: 'เพิ่ม' },
  'packing.placeholder': { en: 'Add custom item...', th: 'เพิ่มรายการ...' },
  'packing.documents': { en: 'Documents', th: '📋 เอกสาร' },
  'packing.electronics': { en: 'Electronics', th: '🔌 อิเล็กทรอนิกส์' },
  'packing.clothing': { en: 'Clothing', th: '👕 เสื้อผ้า' },
  'packing.toiletries': { en: 'Toiletries', th: '🧴 ของใช้ส่วนตัว' },
  'packing.medicine': { en: 'Medicine', th: '💊 ยา' },
  'packing.misc': { en: 'Misc', th: '📦 เบ็ดเตล็ด' },

  // Transport
  'transport.title': { en: 'Transport Guide', th: 'คู่มือการเดินทาง' },
  'transport.subtitle': { en: 'Get around Tokyo efficiently', th: 'เดินทางในโตเกียวอย่างมีประสิทธิภาพ' },
  'transport.jr_pass': { en: 'JR Tokyo Wide Pass', th: 'JR Tokyo Wide Pass' },
  'transport.pass_cost': { en: 'Pass Cost', th: 'ค่า Pass' },
  'transport.total_value': { en: 'Total Value', th: 'มูลค่ารวม' },
  'transport.total_savings': { en: 'Total Savings', th: 'ประหยัดไป' },
  'transport.worth_it': { en: 'Worth it?', th: 'คุ้มไหม?' },
  'transport.recommended': { en: 'Recommended', th: 'แนะนำ' },
  'transport.covered': { en: 'Covered by JR Pass', th: 'ครอบคลุมโดย JR Pass' },
  'transport.tips': { en: 'Tips', th: 'เคล็ดลับ' },
  'transport.quick_ref': { en: 'Quick Reference', th: 'ข้อมูลด่วน' },

  // Footer
  'footer.title': { en: 'Enjoy Your Tokyo Adventure!', th: 'ขอให้สนุกกับการผจญภัยในโตเกียว!' },
  'footer.subtitle': { en: '7 days • 49 locations • 200+ tips', th: '7 วัน • 49 สถานที่ • 200+ เคล็ดลับ' },

  // Misc
  'day': { en: 'Day', th: 'วันที่' },
  'loading': { en: 'Loading...', th: 'กำลังโหลด...' },
  'error': { en: 'Error', th: 'ข้อผิดพลาด' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('tokyo-trip-language');
    if (stored === 'th' || stored === 'en') {
      setLanguageState(stored);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('tokyo-trip-language', language);
    }
  }, [language, mounted]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
