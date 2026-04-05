"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface TimelineEvent {
  time: string;
  icon: string;
  nameEN: string;
  nameTH: string;
  type: "transport" | "food" | "activity" | "shopping" | "hotel";
  duration?: string;
  noteEN?: string;
  noteTH?: string;
}

interface DayTimeline {
  day: number;
  date: string;
  titleEN: string;
  titleTH: string;
  events: TimelineEvent[];
}

const timelines: DayTimeline[] = [
  {
    day: 1,
    date: "16/04",
    titleEN: "Arrival & Ueno/Asakusa",
    titleTH: "เดินทางถึง & Ueno/Asakusa",
    events: [
      { time: "06:20", icon: "✈️", nameEN: "Land at Narita Airport", nameTH: "ลงเครื่องที่ Narita", type: "transport", duration: "30 min" },
      { time: "07:00", icon: "📱", nameEN: "Get SIM card", nameTH: "ซื้อ SIM card", type: "activity", duration: "20 min" },
      { time: "07:30", icon: "🎫", nameEN: "Buy Skyliner ticket", nameTH: "ซื้อตั๋ว Skyliner", type: "transport", duration: "15 min" },
      { time: "08:00", icon: "💳", nameEN: "Buy Suica cards (x4)", nameTH: "ซื้อบัตร Suica (4 ใบ)", type: "transport", duration: "15 min" },
      { time: "08:30", icon: "🎫", nameEN: "Buy JR Tokyo Wide Pass", nameTH: "ซื้อ JR Tokyo Wide Pass", type: "transport", duration: "30 min" },
      { time: "09:30", icon: "🚃", nameEN: "Skyliner to Ueno", nameTH: "นั่ง Skyliner ไป Ueno", type: "transport", duration: "45 min" },
      { time: "10:30", icon: "🏨", nameEN: "Drop luggage at hotel", nameTH: "ฝากกระเป๋าที่โรงแรม", type: "hotel", duration: "15 min" },
      { time: "11:30", icon: "🍣", nameEN: "Lunch - Sushiro Ueno", nameTH: "อาหารกลางวัน - Sushiro Ueno", type: "food", duration: "45 min" },
      { time: "13:00", icon: "⛩️", nameEN: "Senso-ji Temple", nameTH: "วัด Senso-ji", type: "activity", duration: "1.5 hrs" },
      { time: "15:00", icon: "🍦", nameEN: "Snack hopping Asakusa", nameTH: "กินเล่นที่ Asakusa", type: "food", duration: "2 hrs", noteEN: "Matcha ice, melon pan, etc.", noteTH: "ไอศกรีมชาเขียว, เมลอนปัง ฯลฯ" },
      { time: "17:00", icon: "🗼", nameEN: "Tokyo Skytree", nameTH: "Tokyo Skytree", type: "activity", duration: "2 hrs" },
      { time: "19:30", icon: "🌊", nameEN: "Sumida River walk", nameTH: "เดินเล่นริมแม่น้ำ Sumida", type: "activity", duration: "30 min" },
      { time: "20:00", icon: "🏨", nameEN: "Check-in Tabist Hotel", nameTH: "เข้าโรงแรม Tabist", type: "hotel" },
    ],
  },
  {
    day: 2,
    date: "17/04",
    titleEN: "Gala Yuzawa Snow Day",
    titleTH: "หิมะ Gala Yuzawa",
    events: [
      { time: "07:00", icon: "🚃", nameEN: "Arrive at Ueno Station", nameTH: "ถึงสถานี Ueno", type: "transport" },
      { time: "07:42", icon: "🚄", nameEN: "Shinkansen to Gala Yuzawa", nameTH: "ชินคันเซนไป Gala Yuzawa", type: "transport", duration: "2 hrs" },
      { time: "10:00", icon: "🎿", nameEN: "Gala Yuzawa Ski Resort", nameTH: "ลานสกี Gala Yuzawa", type: "activity", duration: "5 hrs" },
      { time: "12:30", icon: "🍜", nameEN: "Lunch at resort", nameTH: "อาหารกลางวันที่รีสอร์ท", type: "food", duration: "45 min" },
      { time: "15:56", icon: "🚄", nameEN: "Return Shinkansen", nameTH: "ชินคันเซนกลับ", type: "transport", duration: "2 hrs" },
      { time: "18:00", icon: "🦖", nameEN: "Shinjuku Godzilla Head", nameTH: "ก็อตซิลล่า ชินจูกุ", type: "activity", duration: "30 min" },
      { time: "19:00", icon: "🍣", nameEN: "Dinner - Afuri Ramen", nameTH: "อาหารเย็น - ราเมน Afuri", type: "food", duration: "1 hr" },
    ],
  },
  {
    day: 3,
    date: "18/04",
    titleEN: "Kamakura & Akihabara",
    titleTH: "Kamakura & Akihabara",
    events: [
      { time: "08:30", icon: "🚃", nameEN: "Train to Kamakura", nameTH: "รถไฟไป Kamakura", type: "transport", duration: "1 hr" },
      { time: "09:30", icon: "🗿", nameEN: "Great Buddha (Daibutsu)", nameTH: "พระใหญ่ Daibutsu", type: "activity", duration: "1 hr" },
      { time: "10:30", icon: "🥞", nameEN: "Kannon Crepe", nameTH: "เครป Kannon", type: "food", duration: "20 min" },
      { time: "11:00", icon: "🛍️", nameEN: "Komachi-dori Street", nameTH: "ถนน Komachi-dori", type: "shopping", duration: "1 hr" },
      { time: "12:00", icon: "🚃", nameEN: "Return to Tokyo", nameTH: "กลับโตเกียว", type: "transport", duration: "1 hr" },
      { time: "14:00", icon: "🎮", nameEN: "Akihabara Electric Town", nameTH: "Akihabara", type: "activity", duration: "3 hrs", noteEN: "Games, anime, electronics", noteTH: "เกม, อนิเมะ, อิเล็กทรอนิกส์" },
      { time: "17:00", icon: "🏢", nameEN: "Animate Ikebukuro", nameTH: "Animate Ikebukuro", type: "shopping", duration: "1.5 hrs" },
    ],
  },
  {
    day: 4,
    date: "19/04",
    titleEN: "Kawagoe, Shibuya & Harajuku",
    titleTH: "Kawagoe, Shibuya & Harajuku",
    events: [
      { time: "08:30", icon: "🚃", nameEN: "Train to Kawagoe", nameTH: "รถไฟไป Kawagoe", type: "transport", duration: "30 min" },
      { time: "09:00", icon: "🏮", nameEN: "Kawagoe Old Town", nameTH: "เมืองเก่า Kawagoe", type: "activity", duration: "2.5 hrs" },
      { time: "12:00", icon: "🚃", nameEN: "Return to Tokyo", nameTH: "กลับโตเกียว", type: "transport" },
      { time: "13:00", icon: "🍔", nameEN: "Lunch - Burger tour", nameTH: "อาหารกลางวัน - เบอร์เกอร์", type: "food", duration: "2 hrs" },
      { time: "15:30", icon: "🛍️", nameEN: "Takeshita Street Harajuku", nameTH: "ถนน Takeshita Harajuku", type: "shopping", duration: "1.5 hrs" },
      { time: "17:00", icon: "⛩️", nameEN: "Meiji Jingu Shrine", nameTH: "ศาลเจ้า Meiji Jingu", type: "activity", duration: "1 hr" },
      { time: "18:00", icon: "🍩", nameEN: "I'm Donut Harajuku", nameTH: "I'm Donut Harajuku", type: "food", duration: "30 min" },
    ],
  },
  {
    day: 5,
    date: "20/04",
    titleEN: "Mt. Fuji One Day Tour",
    titleTH: "ทัวร์ Mt. Fuji",
    events: [
      { time: "08:00", icon: "🚌", nameEN: "Mt. Fuji tour bus departs", nameTH: "รถบัสทัวร์ Mt. Fuji ออก", type: "transport", duration: "10 hrs" },
      { time: "10:00", icon: "🗻", nameEN: "Mt. Fuji viewpoint", nameTH: "จุดชมวิว Mt. Fuji", type: "activity", duration: "1 hr" },
      { time: "11:30", icon: "🏞️", nameEN: "Lake Kawaguchi", nameTH: "ทะเลสาบ Kawaguchi", type: "activity", duration: "1.5 hrs" },
      { time: "13:00", icon: "🍜", nameEN: "Lunch at tour stop", nameTH: "อาหารกลางวันที่จุดแวะ", type: "food", duration: "45 min" },
      { time: "14:00", icon: "♨️", nameEN: "Oshino Hakkai / Onsen", nameTH: "Oshino Hakkai / บ่อน้ำพุร้อน", type: "activity", duration: "2 hrs" },
      { time: "18:00", icon: "🚌", nameEN: "Return to Tokyo", nameTH: "กลับโตเกียว", type: "transport" },
    ],
  },
  {
    day: 6,
    date: "21/04",
    titleEN: "Tokyo Old Town & Coffee",
    titleTH: "เมืองเก่าโตเกียว & กาแฟ",
    events: [
      { time: "09:30", icon: "🚃", nameEN: "Train to Shibamata", nameTH: "รถไฟไป Shibamata", type: "transport", duration: "30 min" },
      { time: "10:00", icon: "🏮", nameEN: "Shibamata Old Town", nameTH: "เมืองเก่า Shibamata", type: "activity", duration: "2 hrs" },
      { time: "12:00", icon: "🍡", nameEN: "Tora-san Dango", nameTH: "ดังโงะ Tora-san", type: "food", duration: "30 min" },
      { time: "14:00", icon: "🚃", nameEN: "Train to Shimokitazawa", nameTH: "รถไฟไป Shimokitazawa", type: "transport" },
      { time: "14:30", icon: "☕", nameEN: "Bear Pond Espresso", nameTH: "Bear Pond Espresso", type: "food", duration: "1 hr" },
      { time: "16:00", icon: "🛍️", nameEN: "Vintage shopping", nameTH: "ช้อปปิ้งของวินเทจ", type: "shopping", duration: "2 hrs" },
    ],
  },
  {
    day: 7,
    date: "22/04",
    titleEN: "Departure Day",
    titleTH: "วันกลับ",
    events: [
      { time: "08:00", icon: "🏨", nameEN: "Check-out from hotel", nameTH: "เช็คเอาท์จากโรงแรม", type: "hotel", duration: "30 min" },
      { time: "09:00", icon: "🛍️", nameEN: "Duty free shopping (optional)", nameTH: "ช้อปปิ้ง Duty free (ถ้ามีเวลา)", type: "shopping", duration: "1 hr" },
      { time: "10:30", icon: "🚃", nameEN: "Train to Narita Airport", nameTH: "รถไฟไปสนามบิน Narita", type: "transport", duration: "1 hr" },
      { time: "12:00", icon: "✈️", nameEN: "Arrive at Narita, check-in", nameTH: "ถึง Narita, เช็คอิน", type: "transport" },
      { time: "14:00", icon: "🛃", nameEN: "Immigration & security", nameTH: "ตรวจคนเข้าเมือง & ความมั่นคง", type: "transport" },
      { time: "16:20", icon: "✈️", nameEN: "Flight TG 647 departs", nameTH: "เที่ยวบิน TG 647 ออก", type: "transport" },
    ],
  },
];

const typeColors: Record<string, string> = {
  transport: "bg-blue-500",
  food: "bg-orange-500",
  activity: "bg-purple-500",
  shopping: "bg-pink-500",
  hotel: "bg-green-500",
};

const typeDots: Record<string, string> = {
  transport: "bg-blue-100 dark:bg-blue-900/30",
  food: "bg-orange-100 dark:bg-orange-900/30",
  activity: "bg-purple-100 dark:bg-purple-900/30",
  shopping: "bg-pink-100 dark:bg-pink-900/30",
  hotel: "bg-green-100 dark:bg-green-900/30",
};

export default function TimelineView() {
  const { language } = useLanguage();
  const [selectedDay, setSelectedDay] = useState(0);

  const timeline = timelines[selectedDay];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-4 text-white">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">⏰</span>
          <h2 className="text-lg sm:text-xl font-bold">
            {language === 'th' ? 'ตารางเวลา' : 'Timeline'}
          </h2>
        </div>
        <p className="text-white/70 text-xs">
          {language === 'th' ? 'แผนรายชั่วโมงแต่ละวัน' : 'Hour-by-hour plan'}
        </p>
      </div>

      {/* Day Selector */}
      <div className="px-4 pt-3">
        <div className="flex gap-1.5 overflow-x-auto pb-2">
          {timelines.map((tl, idx) => (
            <button
              key={tl.day}
              onClick={() => setSelectedDay(idx)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                selectedDay === idx
                  ? "bg-indigo-500 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <span className="block">{language === 'th' ? `ว.${tl.day}` : `D${tl.day}`}</span>
              <span className="block text-xs opacity-75">{tl.date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="p-4">
        {/* Title */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
            {language === 'th' ? timeline.titleTH : timeline.titleEN}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {timeline.events.length} {language === 'th' ? 'รายการ' : 'events'}
            {timeline.events[timeline.events.length - 1]?.time && 
              ` • ${timeline.events[0].time} - ${timeline.events[timeline.events.length - 1].time}`
            }
          </p>
        </div>

        {/* Events */}
        <div className="relative space-y-3">
          {/* Vertical line */}
          <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-gray-700" />

          {timeline.events.map((event, idx) => (
            <div key={idx} className="relative flex gap-3">
              {/* Dot */}
              <div className={`relative z-10 w-8 h-8 rounded-full ${typeDots[event.type]} flex items-center justify-center flex-shrink-0 border-2 border-white dark:border-gray-800`}>
                <span className="text-sm">{event.icon}</span>
              </div>

              {/* Content */}
              <div className="flex-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {event.time}
                      </span>
                      {event.duration && (
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          ({event.duration})
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {language === 'th' ? event.nameTH : event.nameEN}
                    </p>
                    {(language === 'th' ? event.noteTH : event.noteEN) && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {language === 'th' ? event.noteTH : event.noteEN}
                      </p>
                    )}
                  </div>
                  {/* Type badge */}
                  <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium text-white ${typeColors[event.type]}`}>
                    {event.type === 'transport' ? (language === 'th' ? 'เดินทาง' : 'Transit') :
                     event.type === 'food' ? (language === 'th' ? 'อาหาร' : 'Food') :
                     event.type === 'activity' ? (language === 'th' ? 'กิจกรรม' : 'Activity') :
                     event.type === 'shopping' ? (language === 'th' ? 'ช้อป' : 'Shop') :
                     (language === 'th' ? 'โรงแรม' : 'Hotel')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>{language === 'th' ? 'เดินทาง' : 'Transit'}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>{language === 'th' ? 'อาหาร' : 'Food'}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>{language === 'th' ? 'กิจกรรม' : 'Activity'}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              <span>{language === 'th' ? 'ช้อปปิ้ง' : 'Shopping'}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span>{language === 'th' ? 'โรงแรม' : 'Hotel'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
