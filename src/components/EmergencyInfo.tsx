"use client";

import { useLanguage } from "@/context/LanguageContext";

interface EmergencyItem {
  icon: string;
  titleEN: string;
  titleTH: string;
  info: string;
  phone?: string;
  noteEN?: string;
  noteTH?: string;
  urgent?: boolean;
}

const emergencyData: EmergencyItem[] = [
  {
    icon: "🚨",
    titleEN: "Police",
    titleTH: "ตำรวจ",
    info: "110",
    noteEN: "Free call from any phone",
    noteTH: "โทรฟรีจากทุกเครื่อง",
    urgent: true,
  },
  {
    icon: "🚒",
    titleEN: "Fire / Ambulance",
    titleTH: "ดับเพลิง / รถพยาบาล",
    info: "119",
    noteEN: "Free call from any phone",
    noteTH: "โทรฟรีจากทุกเครื่อง",
    urgent: true,
  },
  {
    icon: "🏥",
    titleEN: "Nearest Hospital (Ueno)",
    titleTH: "โรงพยาบาลใกล้สุด (Ueno)",
    info: "Tokyo Metropolitan Hiroo Hospital",
    phone: "03-3400-1111",
    noteEN: "English support available",
    noteTH: "มีบริการภาษาอังกฤษ",
  },
  {
    icon: "🇹🇭",
    titleEN: "Thai Embassy in Tokyo",
    titleTH: "สถานทูตไทยในโตเกียว",
    info: "Royal Thai Embassy",
    phone: "03-5475-8693",
    noteEN: "5-9-16 Minami-Azabu, Minato-ku",
    noteTH: "5-9-16 Minami-Azabu, Minato-ku",
  },
  {
    icon: "🚃",
    titleEN: "JR Lost & Found",
    titleTH: "JR ของหาย",
    info: "JR East Lost Property Center",
    phone: "03-3842-8111",
    noteEN: "Open 9:00-17:00 daily",
    noteTH: "เปิด 9:00-17:00 ทุกวัน",
  },
  {
    icon: "🏧",
    titleEN: "Nearest ATM (7-Eleven)",
    titleTH: "ATM ใกล้สุด (7-Eleven)",
    info: "Seven Bank ATM at 7-Eleven stores",
    noteEN: "Accepts international cards, 24/7",
    noteTH: "รับบัตรต่างประเทศ เปิด 24 ชม.",
  },
  {
    icon: "💊",
    titleEN: "24h Pharmacy (Ueno)",
    titleTH: "ร้านขายยา 24 ชม. (Ueno)",
    info: "Sugi Pharmacy Ueno Branch",
    noteEN: "Near Ueno Station, some OTC meds",
    noteTH: "ใกล้สถานี Ueno มียาทั่วไป",
  },
  {
    icon: "🆘",
    titleEN: "Tourist Helpline",
    titleTH: "สายด่วนนักท่องเที่ยว",
    info: "Japan Visitor Hotline: 050-3816-2787",
    noteEN: "English/Chinese/Korean support, 24/7",
    noteTH: "รองรับอังกฤษ/จีน/เกาหลี ตลอด 24 ชม.",
  },
];

export default function EmergencyInfo() {
  const { language } = useLanguage();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-400 to-orange-400 p-5 text-white">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🚨</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              {language === 'th' ? 'ข้อมูลฉุกเฉิน' : 'Emergency Info'}
            </h2>
            <p className="text-white/70 text-xs mt-0.5">
              {language === 'th' ? 'เบอร์สำคัญที่ควรรู้' : 'Important numbers to know'}
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Numbers */}
      <div className="p-4">
        {/* Quick Dial Numbers */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {emergencyData
            .filter(item => item.urgent)
            .map((item, idx) => (
              <a
                key={idx}
                href={`tel:${item.info}`}
                className="bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-700 rounded-xl p-4 text-center hover:bg-red-100 dark:hover:bg-red-900/50 transition-all"
              >
                <span className="text-3xl mb-2 block">{item.icon}</span>
                <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                  {language === 'th' ? item.titleTH : item.titleEN}
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
                  {item.info}
                </p>
              </a>
            ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {language === 'th' ? 'ข้อมูลสำคัญ' : 'Other important info'}
          </span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Other Info */}
        <div className="space-y-2">
          {emergencyData
            .filter(item => !item.urgent)
            .map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                      {language === 'th' ? item.titleTH : item.titleEN}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      {item.info}
                    </p>
                    {item.phone && (
                      <a
                        href={`tel:${item.phone}`}
                        className="inline-flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 hover:underline mt-1"
                      >
                        📞 {item.phone}
                      </a>
                    )}
                    {(language === 'th' ? item.noteTH : item.noteEN) && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {language === 'th' ? item.noteTH : item.noteEN}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Quick Tips */}
        <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">
            {language === 'th' ? '💡 เคล็ดลับ' : '💡 Quick Tips'}
          </p>
          <ul className="space-y-1 text-xs text-blue-600 dark:text-blue-400">
            <li>
              {language === 'th'
                ? '• บันทึกเบอร์ 110 (ตำรวจ) และ 119 (รถพยาบาล) ไว้'
                : '• Save 110 (Police) and 119 (Ambulance) in your phone'}
            </li>
            <li>
              {language === 'th'
                ? '• 7-Eleven ATM ใช้บัตรต่างประเทศได้ เปิด 24 ชม.'
                : '• 7-Eleven ATMs accept foreign cards, open 24/7'}
            </li>
            <li>
              {language === 'th'
                ? '• สถานทูตไทย: เปิด จ.-ศ. 9:00-17:00'
                : '• Thai Embassy: Open Mon-Fri 9:00-17:00'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
