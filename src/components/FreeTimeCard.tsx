"use client";

import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface FreeTimeLocation {
  name: string;
  query: string;
  tips: string[];
  walkingTime?: string; // e.g., "🚶 2 min from Ueno Station"
  closingTime?: string; // e.g., "20:00"
}

interface AreaGroup {
  area: string;
  emoji: string;
  categories: CategoryGroup[];
}

interface CategoryGroup {
  category: string;
  icon: string;
  locations: FreeTimeLocation[];
}

// All unique categories for filter tabs (using normalized names)
const allCategories = [
  { category: "ทั้งหมด", icon: "🏪", normalized: "ทั้งหมด" },
  { category: "คาเฟ่", icon: "☕", normalized: "คาเฟ่" },
  { category: "อนิเมะ/โอตาคุ", icon: "🎌", normalized: "อนิเมะ/โอตาคุ" },
  { category: "โมเดล/Tamiya", icon: "🚗", normalized: "โมเดล/Tamiya" },
  { category: "แผ่นเสียง/CD", icon: "💿", normalized: "แผ่นเสียง/CD" },
  { category: "เกมมือสอง", icon: "🎮", normalized: "เกมมือสอง" },
  { category: "เครื่องสำอาง", icon: "💄", normalized: "เครื่องสำอาง" },
  { category: "รองเท้ากีฬา", icon: "👟", normalized: "รองเท้ากีฬา" },
  { category: "เครื่องเขียน", icon: "✏️", normalized: "เครื่องเขียน" },
  { category: "แฟชั่น", icon: "👕", normalized: "แฟชั่น" },
  { category: "100 เยน", icon: "🏪", normalized: "100 เยน" },
];

// Deduplicate and normalize category names
const normalizeCategory = (cat: string): string => {
  if (cat.includes("อนิเมะ") || cat.includes("โอตาคุ")) return "อนิเมะ/โอตาคุ";
  if (cat.includes("โมเดล") || cat.includes("Tamiya") || cat.includes("กันพลา")) return "โมเดล/Tamiya";
  if (cat.includes("ของเล่น") || cat.includes("Tamiya")) return "โมเดล/Tamiya";
  if (cat.includes("แผ่นเสียง") || cat.includes("CD")) return "แผ่นเสียง/CD";
  if (cat.includes("เกม") || cat.includes("Retro")) return "เกมมือสอง";
  if (cat.includes("เครื่องสำอาง") || cat.includes("ยา")) return "เครื่องสำอาง";
  if (cat.includes("รองเท้า")) return "รองเท้ากีฬา";
  if (cat.includes("เครื่องเขียน") || cat.includes("ศิลปะ")) return "เครื่องเขียน";
  if (cat.includes("แฟชั่น")) return "แฟชั่น";
  if (cat.includes("100 เยน") || cat.includes("ดองกี้")) return "100 เยน";
  if (cat.includes("คาเฟ่")) return "คาเฟ่";
  return cat;
};

const freeTimeData: AreaGroup[] = [
  {
    area: "Shibuya",
    emoji: "☕",
    categories: [
      {
        category: "คาเฟ่",
        icon: "☕",
        locations: [
          {
            name: "HUMAN MADE Cafe by Blue Bottle Coffee",
            query: "HUMAN MADE Cafe Blue Bottle Coffee Shibuya Tokyo",
            walkingTime: "🚶 5 min จาก Shibuya Station",
            closingTime: "19:00",
            tips: [
              "☕ คาเฟ่ Collaboration ระหว่าง HUMAN MADE x Blue Bottle Coffee",
              "🎨 ดีไซน์สไตล์ HUMAN MADE น่ารัก มี Logo Heart และ Duck",
              "💰 กาแฟราคา ¥500-700 เค้ก ¥600-800",
              "📸 ถ่ายรูปสวยทุกมุม มีแก้วและ Merchandise เฉพาะคาเฟ่",
              "⏰ เปิด 08:00-19:00 (อาจปิดเร็วหรือหยุดบางวัน)",
              "⚠️ คิวยาวมากช่วง 10:00-14:00 แนะนำไปเช้าหรือเย็น",
              "🛍️ มี Merchandise HUMAN MADE จำหน่าย Limited Edition ซื้อเร็วหมดเร็ว",
            ],
          },
        ],
      },
      {
        category: "แฟชั่น",
        icon: "👕",
        locations: [
          {
            name: "HUMAN MADE OFFLINE STORE TOKYO",
            query: "HUMAN MADE OFFLINE STORE TOKYO",
            walkingTime: "🚶 10 min จาก Shibuya Station / 3 min จาก Omotesando",
            closingTime: "19:00",
            tips: [
              "👕 ร้าน Standalone Flagship Store ของ HUMAN MADE สาขาหลักในโตเกียว",
              "🌟 มีสินค้าครบที่สุด ทั้งเสื้อผ้า ของใช้ และ Merchandise",
              "🛍️ คิวอาจจะยาวในวันหยุดหรือวันปล่อยสินค้าใหม่ (Drop day ทุกเช้าวันหยุด)",
              "⏰ เปิด 11:00-19:00 (อาจมีการเปลี่ยนแปลง)",
              "💳 รับบัตรเครดิต มี Tax Free",
            ],
          },
          {
            name: "HUMAN MADE SHIBUYA PARCO",
            query: "HUMAN MADE SHIBUYA PARCO",
            walkingTime: "🚶 5 min จาก Shibuya Station",
            closingTime: "21:00",
            tips: [
              "🏬 ตั้งอยู่ในห้าง Shibuya PARCO ชั้น 1 เดินทางง่ายที่สุด",
              "👕 เน้นเสื้อผ้า คอลเลกชันใหม่ๆ เข้าถึงง่าย",
              "📸 หน้าร้านเก๋ มีจอและพร็อพตกแต่งตามสไตล์ของร้าน",
              "⏰ เปิด 11:00-21:00 ตามเวลาเปิด-ปิดของห้าง",
              "💳 รับบัตรเครดิต มี Tax Free ทำที่เคาน์เตอร์ของห้างได้เลย",
            ],
          },
          {
            name: "MIYASHITA PARK",
            query: "MIYASHITA PARK Shibuya Tokyo",
            walkingTime: "🚶 3 min จาก Shibuya Station",
            closingTime: "21:00",
            tips: [
              "👕 ห้างกึ่งสวนสาธารณะลอยฟ้า ดีไซน์สวยชิค",
              "☕ มีร้านกาแฟ คาเฟ่ชื่อดัง และร้านแบรนด์เนมอย่าง KITH Tokyo",
              "🛍️ มีร้าน GBL Store ขายของสะสมจากสตูดิโอ Ghibli",
              "📸 บรรยากาศโปร่งสบาย เหมาะกับมาพักผ่อน ถ่ายรูปเล่น",
              "⏰ เปิด 11:00-21:00 (ร้านอาหารอาจเปิดดึกกว่า)",
            ]
          },
          {
            name: "GU Shibuya",
            query: "GU Shibuya Tokyo",
            walkingTime: "🚶 4 min จาก Shibuya Station",
            closingTime: "21:00",
            tips: [
              "👕 สาขาใหญ่ใจกลางชิบูย่า ตัวเลือกแฟชั่นผู้ชาย/ผู้หญิงจัดเต็ม",
              "💸 ช้อปปิ้งเสื้อผ้าสไตล์สตรีทและเบสิกในราคาสบายกระเป๋า (ถูกกว่าไทยด้วยค่าเงิน)",
              "💳 มีเคาน์เตอร์ Tax Free บริการจ่ายเงินอัตโนมัติสะดวกสบาย",
              "⏰ เปิด 11:00-21:00 (เสาร์อาทิตย์เปิด 10:00)",
            ]
          },
        ],
      },
      {
        category: "แผ่นเสียง/CD",
        icon: "💿",
        locations: [
          {
            name: "Tower Records Shibuya",
            query: "Tower Records Shibuya Tokyo",
            walkingTime: "🚶 3 min จาก Shibuya Station",
            closingTime: "22:00",
            tips: [
              "💿 ตึก 9 ชั้นที่เป็นตำนานของคนรักเสียงเพลง",
              "🎵 มีตั้งแต่ Vinyl แผ่นหายาก, CD, DVD และโซน K-Pop/J-Pop",
              "🤩 มีชั้นจัดนิทรรศการและอีเวนต์แจกของเกี่ยวกับศิลปินบ่อยครั้ง",
              "⏰ เปิด 11:00-22:00",
            ]
          }
        ]
      },
      {
        category: "อนิเมะ/โอตาคุ",
        icon: "🎌",
        locations: [
          {
            name: "Nintendo TOKYO / Pokémon Center",
            query: "Nintendo TOKYO Shibuya PARCO",
            walkingTime: "🚶 5 min จาก Shibuya Station",
            closingTime: "21:00",
            tips: [
              "🎮 สวรรค์ของวัยรุ่นและเกมเมอร์ ตั้งอยู่ที่ Shibuya PARCO ชั้น 6",
              "🍄 Nintendo TOKYO เปิดให้บริการครั้งแรกในญี่ปุ่น",
              "⚡ Pokémon Center สุดล้ำ มีมิวทูอยู่ในหลอดทดลองหน้าร้าน",
              "🛍️ ซื้อของสะสมและสินค้า Limited ที่หาจากที่อื่นไม่ได้",
              "⚠️ วันหยุดอาจต้องรอคิวเข้าร้าน",
            ]
          }
        ]
      },
      {
        category: "100 เยน/ดองกี้",
        icon: "🏪",
        locations: [
          {
            name: "Don Quijote Shibuya (ดองกี้)",
            query: "Don Quijote Shibuya Tokyo",
            walkingTime: "🚶 3 min จาก Shibuya Station",
            closingTime: "24:00",
            tips: [
              "🏪 ร้านดองกี้สาขา Shibuya ใหญ่ มีของเยอะมาก เปิดถึงเที่ยงคืน",
              "💰 ทุกอย่างราคาถูก ตั้งแต่ ¥100+ มีทั้งของใหม่และมือสอง",
              "🎁 ซื้อขนม ของฝาก เครื่องสำอาง ยา ของใช้ ครบในที่เดียว",
              "💳 ใช้ Passport ทำ Tax Free ได้เลย สำหรับนักท่องเที่ยว",
              "⏰ เปิด 10:00-24:00 (บางสาขา 24 ชม.)",
              "📸 มุมถ่ายรูปกับป้ายดองกี้ใหญ่หน้าร้าน",
              "⚠️ ของเยอะมาก เดินง่ายแต่เสียเวลา ตั้งเป้าไว้ก่อนไป",
            ],
          },
          {
            name: "Can Do Shibuya",
            query: "Can Do Shibuya Tokyo",
            walkingTime: "🚶 4 min จาก Shibuya Station",
            closingTime: "21:00",
            tips: [
              "💯 ร้าน 100 เยนคุณภาพสูง สินค้าทำในญี่ปุ่น ไม่ใช่ของจีนราคาถูก",
              "🍱 มีทั้งของใช้ในบ้าน, เครื่องครัว, ของเล่น, เครื่องเขียน",
              "🎁 มี Gift Set สวย เหมาะซื้อเป็นของฝาก",
              "💰 ทุกอย่าง ¥100 คุณภาพดีกว่า Daiso นิดหน่อย",
              "⏰ เปิด 10:00-21:00",
            ],
          },
          {
            name: "Daiso Shibuya",
            query: "Daiso Shibuya Tokyo",
            walkingTime: "🚶 3 min จาก Shibuya Station",
            closingTime: "21:00",
            tips: [
              "💯 ร้าน 100 เยนใหญ่สุดในญี่ปุ่น มีทุกสาขา",
              "🏠 มีทุกอย่าง - ของใช้ในบ้าน, เครื่องสำอาง, ของเล่น, เครื่องเขียน, อาหาร",
              "💰 ทุกอย่าง ¥100 บางร้านมีสินค้า Premium ¥300-500 ด้วย",
              "🎁 KitKat รสแปลกๆ, ชาเขียว, ขนมญี่ปุ่น ซื้อเป็นของฝากได้",
              "⏰ เปิด 10:00-21:00",
              "📸 มีสินค้า Collaboration กับ Character ดังกึ่งดัง บ่อย",
            ],
          },
        ],
      },
    ],
  },
  {
    area: "Shinjuku",
    emoji: "🗼",
    categories: [
      {
        category: "แผ่นเสียง/CD",
        icon: "💿",
        locations: [
          {
            name: "Record Tower Main Shop",
            query: "Record Tower Main Shop Tokyo",
            walkingTime: "🚶 5 min จาก Shinjuku Station",
            closingTime: "21:00",
            tips: [
              "💿 ร้านแผ่นเสียงและสื่อเพลงที่ใหญ่ที่สุดในญี่ปุ่น มีทั้ง Vinyl, CD, DVD",
              "🎵 มีทั้งเพลงญี่ปุ่น, Jazz, Rock, Pop, Classical, Anime Soundtrack",
              "💰 ราคา Vinyl แผ่นทั่วไป ¥2,000-5,000 แผ่นหายากอาจหลักหมื่น",
              "📍 เข้าถึงง่ายจากสถานี Shibuya เดิน ~5 นาที",
              "⏰ เปิด 11:00-21:00 ทุกวัน",
              "💳 รับบัตรเครดิต มี Tax Free สำหรับนักท่องเที่ยว",
            ],
          },
          {
            name: "Disk Union Shinjuku",
            query: "Disk Union Shinjuku Tokyo",
            walkingTime: "🚶 3 min จาก Shinjuku Station",
            closingTime: "21:00",
            tips: [
              "💿 สาขา Shinjuku มี Jazz, Rock, City Pop, Classical เยอะสุดในโตเกียว",
              "🎷 Jazz Section ดังกึ่งดัง มีแผ่นหายากจากยุค 60s-80s",
              "💰 Vinyl มือสองเริ่มต้น ¥1,500+ CD ¥800-2,500",
              "🔍 มีระบบประเมินสภาพแผ่น A/B/C เช่นเดียวกับทุกสาขา",
              "⏰ เปิด 11:00-21:00",
            ],
          },
        ],
      },
      {
        category: "เครื่องสำอาง/ยา",
        icon: "💄",
        locations: [
          {
            name: "@cosme TOKYO (Shinjuku)",
            query: "@cosme TOKYO Shinjuku",
            closingTime: "21:00",
            walkingTime: "🚶 3 min จาก Shinjuku Station",
            tips: [
              "💄 ร้านเครื่องสำอางยักษ์ใหญ่ รวมแบรนด์ยอดนิยมไว้ที่เดียว",
              "🌟 มี Shiseido, SUQQU, Addiction, RMK, Canmake, CeZanne",
              "🏆 มี Ranking Display จากเว็บไซต์ @cosme ช่วยเลือกซื้อ",
              "💰 มี Tester ให้ลองทุกแบรนด์ ราคาถูกกว่าไทย 20-40%",
              "💳 รับบัตรเครดิต มี Tax Free",
              "⏰ เปิด 11:00-21:00",
            ],
          },
          {
            name: "Bic Camera Shinjuku (เครื่องสำอางชั้นล่าง)",
            query: "Bic Camera Shinjuku Tokyo",
            closingTime: "22:00",
            walkingTime: "🚶 1 min จาก Shinjuku Station",
            tips: [
              "📷 ตึกใหญ่ 9 ชั้น มีทุกอย่าง - กล้อง, เครื่องใช้ไฟฟ้า, นาฬิกา, เครื่องสำอาง",
              "💄 ชั้นเครื่องสำอางมี Shiseido, SK-II, Kanebo, Decorté ราคาถูก",
              "💳 ใช้บัตรเครดิตต่างประเทศได้ มี Tax Free + Coupon ส่วนเพิ่ม 7-10%",
              "🎁 ซื้อกล้อง/เลนส์ ได้ราคาถูกกว่าไทย 20-30%",
              "⏰ เปิด 10:00-22:00",
            ],
          },
        ],
      },
      {
        category: "เครื่องเขียน/ศิลปะ",
        icon: "✏️",
        locations: [
          {
            name: "Sekaido Shinjuku",
            query: "Sekaido Shinjuku Tokyo",
            walkingTime: "🚶 5 min จาก Shinjuku Station",
            closingTime: "20:30",
            tips: [
              "✏️ สวรรค์ของคนรักเครื่องเขียนและอุปกรณ์ศิลปะ สินค้าราคาถูกกว่าทั่วไป",
              "🎨 มีครบทุกอย่าง ตั้งแต่ปากกา สี กระดาษ งานฝีมือ และของขวัญกระจุกกระจิก",
            ]
          }
        ]
      },
      {
        category: "รองเท้ากีฬา",
        icon: "👟",
        locations: [
          {
            name: "Alpen TOKYO",
            query: "Alpen TOKYO Shinjuku",
            walkingTime: "🚶 3 min จาก Shinjuku Station",
            closingTime: "22:00",
            tips: [
              "👟 ตึกศูนย์รวมอุปกรณ์กีฬาและแคมป์ปิ้ง มหึมาที่สุดใจกลางชินจูกุ",
              "🏃‍♂️ มีรองเท้าวิ่ง, รองเท้าผ้าใบหายาก, ชุดกีฬา และโซนสายนอกบ้านครบวงจร",
            ]
          }
        ]
      },
      {
        category: "แฟชั่น",
        icon: "👕",
        locations: [
          {
            name: "GU Shinjuku Flags",
            query: "GU Shinjuku Flags Tokyo",
            walkingTime: "🚶 1 min จาก Shinjuku Station (East/South Exit)",
            closingTime: "21:00",
            tips: [
              "👕 กู สาขาใจกลางชินจูกุ เดินทางง่ายมาก เดินออกมาเจอเลย",
              "👖 สินค้าเปลี่ยนไว แฟชั่นตามฤดูกาลมาครบ",
              "💸 ช้อปปิ้งต่อได้เลยเพราะอยู่ในตึก Flags ที่มีแหล่งร้านป๊อปคัลเจอร์เพียบ",
              "⏰ เปิด 11:00-21:00",
            ]
          }
        ]
      },
      {
        category: "100 เยน/ดองกี้",
        icon: "🏪",
        locations: [
          {
            name: "Don Quijote Shinjuku (ดองกี้)",
            query: "Don Quijote Shinjuku Tokyo",
            closingTime: "24:00",
            walkingTime: "🚶 2 min จาก Shinjuku Station",
            tips: [
              "🏪 ร้านดองกี้สาขา Shinjuku ใหญ่ เปิดดึก มีของเยอะมาก",
              "💰 ทุกอย่างราคาถูก ตั้งแต่ ¥100+ มีทั้งของใหม่และมือสอง",
              "🎁 ซื้อขนม ของฝาก เครื่องสำอาง ยา ของใช้ ครบในที่เดียว",
              "💳 ใช้ Passport ทำ Tax Free ได้เลย สำหรับนักท่องเที่ยว",
              "⏰ เปิด 10:00-24:00 (บางสาขา 24 ชม.)",
            ],
          },
          {
            name: "Can Do Shinjuku",
            query: "Can Do Shinjuku Tokyo",
            closingTime: "21:00",
            walkingTime: "🚶 4 min จาก Shinjuku Station",
            tips: [
              "💯 ร้าน 100 เยนคุณภาพสูง สินค้าทำในญี่ปุ่น",
              "🍱 มีทั้งของใช้ในบ้าน, เครื่องครัว, ของเล่น, เครื่องเขียน",
              "🎁 มี Gift Set สวย เหมาะซื้อเป็นของฝาก",
              "💰 ทุกอย่าง ¥100 คุณภาพดีกว่า Daiso นิดหน่อย",
              "⏰ เปิด 10:00-21:00",
            ],
          },
          {
            name: "Daiso Shinjuku",
            query: "Daiso Shinjuku Tokyo",
            closingTime: "21:00",
            walkingTime: "🚶 3 min จาก Shinjuku Station",
            tips: [
              "💯 ร้าน 100 เยนใหญ่สุดในญี่ปุ่น มีทุกสาขา",
              "🏠 มีทุกอย่าง - ของใช้ในบ้าน, เครื่องสำอาง, ของเล่น, เครื่องเขียน, อาหาร",
              "💰 ทุกอย่าง ¥100 บางร้านมีสินค้า Premium ¥300-500 ด้วย",
              "🎁 KitKat รสแปลกๆ, ชาเขียว, ขนมญี่ปุ่น ซื้อเป็นของฝากได้",
              "⏰ เปิด 10:00-21:00",
              "📸 มีสินค้า Collaboration กับ Character ดังกึ่งดัง บ่อย",
            ],
          },
        ],
      },
    ],
  },
  {
    area: "Ueno",
    emoji: "🌸",
    categories: [
      {
        category: "ของเล่น/โมเดล/Tamiya",
        icon: "🧸",
        locations: [
          {
            name: "Yamashiroya (山城屋)",
            query: "Yamashiroya Ueno Tokyo",
            walkingTime: "🚶 1 min จาก Ueno Station",
            closingTime: "20:00",
            tips: [
              "🧸 ร้านของเล่นและ Hobby ขนาดใหญ่ 6 ชั้น อยู่หน้าสถานี Ueno",
              "🚗 มี Tamiya Model Kits, Gunpla, รถบังคับ, โมเดลทหาร, ไดคาสต์ ครบ!",
              "🎌 ชั้น BF-1F = ของเล่นเด็ก, 2F-3F = โมเดล/กันพลา, 4F-5F = Anime Goods",
              "💰 ราคาถูกกว่าไทย 20-40% โดยเฉพาะ Tamiya และ Bandai",
              "💳 รับบัตรเครดิต มี Tax Free สำหรับซื้อเกิน ¥5,000",
              "⏰ เปิด 10:00-20:00 ทุกวัน",
            ],
          },
        ],
      },
      {
        category: "แผ่นเสียง/CD",
        icon: "💿",
        locations: [
          {
            name: "Disk Union Ueno",
            query: "Disk Union Ueno Tokyo",
            walkingTime: "🚶 3 min จาก Ueno Station",
            closingTime: "20:00",
            tips: [
              "💿 ร้านแผ่นเสียงและ CD มือสองชื่อดัง มีหลายสาขาใน Ueno",
              "🎵 แบ่งตามแนวเพลง - Jazz, Rock, Pop, Classical, Electronic, Anime Song",
              "💰 Vinyl มือสองเริ่มต้น ¥1,000+ CD ราคา ¥500-2,000",
              "🔍 ตรวจสอบสภาพแผ่นก่อนซื้อ มีเกรด A/B/C บอกไว้",
              "📸 บางร้านมีแผ่นปกหายากหรือ Limited Edition เฉพาะญี่ปุ่น",
              "⏰ เปิด 11:00-20:00 (แต่ละสาขาอาจต่างกัน)",
            ],
          },
          {
            name: "Chikkōdō (Chikukodo)",
            query: "Chikukodo Ameyoko Ueno Tokyo",
            walkingTime: "🚶 3 min จาก Ueno Station (ใน Ameyoko)",
            closingTime: "21:00",
            tips: [
              "💿 ร้านแผ่นเสียงระดับตำนานที่เปิดมานานกว่า 70 ปี",
              "🌟 เน้นแผ่นเสียงยุค Showa, City Pop, และ J-Pop เก่าๆ",
              "📸 บรรยากาศอบอุ่นคลาสสิกสุดๆ มีแผ่นหายากซ่อนอยู่เยอะมาก",
              "⏰ เปิด 13:00-21:00",
            ],
          },
        ],
      },
      {
        category: "เครื่องสำอาง/ยา",
        icon: "💄",
        locations: [
          {
            name: "Takeya Ueno (ชั้นเครื่องสำอาง)",
            query: "Takeya Ueno Tokyo",
            closingTime: "20:00",
            walkingTime: "🚶 2 min จาก Ueno Station",
            tips: [
              "🏪 ร้าน Duty Free ขนาดใหญ่ มีของฝาก ขนม เครื่องสำอาง ยา ครบ",
              "💄 ชั้นเครื่องสำอางมี Shiseido, SK-II, Biore, Hada Labo ราคาถูกกว่าไทย",
              "💊 มียาญี่ปุ่นขายเยอะ - EVE (แก้ปวด), Pabron (แก้หวัด), Kowa (วิตามิน)",
              "🎁 ซื้อขนมกล่องเป็นของฝากได้ ราคาถูกกว่าที่สนามบิน",
              "💳 ใช้ Passport นำไปทำ Tax Free ได้ (ซื้อเกิน ¥5,000)",
              "⏰ เปิด 09:00-20:00",
            ],
          },
          {
            name: "Ainz & Tulpe Ueno",
            query: "Ainz Tulpe Ueno Tokyo",
            closingTime: "21:00",
            walkingTime: "🚶 3 min จาก Ueno Station",
            tips: [
              "💄 ร้านเครื่องสำอางและยาขนาดใหญ่ มีแบรนด์ญี่ปุ่นครบ",
              "🌟 มี Shiseido, Decorté, Kanebo, SK-II, Hada Labo, Biore, Senka",
              "💊 มียาและวิตามินขาย - EVE, Pabron, DHC, Fancl",
              "💰 ราคาถูกกว่าไทย 20-30% มี Tester ให้ลองก่อนซื้อ",
              "💳 รับบัตรเครดิต มี Tax Free สำหรับนักท่องเที่ยว",
              "⏰ เปิด 10:00-21:00",
            ],
          },
          {
            name: "Matsukiyo / Sundrug (ร้านยา)",
            query: "Matsukiyo Sundrug Ueno Tokyo",
            closingTime: "22:00",
            walkingTime: "🚶 2 min จาก Ueno Station",
            tips: [
              "💊 ร้านขายยายอดนิยม มีสาขาเยอะใน Ueno",
              "💄 มีเครื่องสำอาง, สกินแคร์, กันแดด ราคาถูก",
              "🍵 มีวิตามิน, อาหารเสริม, ชาสุขภาพ",
              "💰 ถูกกว่า Sephora 30-50% บางรายการมี Sale",
              "⏰ เปิด 10:00-22:00 (บางสาขา 24 ชม.)",
            ],
          },
        ],
      },
      {
        category: "แฟชั่น",
        icon: "👕",
        locations: [
          {
            name: "GU & Uniqlo Ueno",
            query: "GU Uniqlo Ueno Tokyo",
            closingTime: "21:00",
            walkingTime: "🚶 4 min จาก Ueno Station",
            tips: [
              "👕 Uniqlo = แบรนด์แฟชั่นญี่ปุ่นพื้นฐาน GU = สายแฟชั่นราคาถูกกว่า",
              "💰 ราคา GU ถูกกว่า Uniqlo 30-50% คุณภาพดีเหมือนกัน",
              "🎌 มีคอลเลกชัน Exclusive เฉพาะญี่ปุ่น เช่น UT (กราฟฟิก) และ Collaboration",
              "📏 คนญี่ปุ่นไซส์เล็กกว่าไทย ควรลองก่อนซื้อ โดยเฉพาะเสื้อและกางเกง",
              "💳 ใช้บัตรเครดิตได้ มี Tax Free สำหรับซื้อเกิน ¥5,000",
              "⏰ เปิด 10:00-21:00 ส่วนใหญ่",
            ],
          },
        ],
      },
      {
        category: "รองเท้ากีฬา/ตลาด",
        icon: "👟",
        locations: [
          {
            name: "ตลาด Ameyoko",
            query: "Ameyoko Ueno Tokyo",
            walkingTime: "🚶 1 min จาก Ueno Station",
            closingTime: "20:00",
            tips: [
              "👟 ย่านช้อปปิ้งละลายทรัพย์ที่มีร้านสนีกเกอร์มากมาย (เช่น ABC Mart)",
              "🍵 เดินซื้อขนมญี่ปุ่น, ชาเขียว, เครื่องสำอางราคาถูก และผลไม้เสียบไม้",
              "🍢 มีร้านอาหารสตรีทฟู้ดและร้านกินดื่มตอนกลางคืนคึกคัก",
            ]
          }
        ]
      },
      {
        category: "100 เยน/ดองกี้",
        icon: "🏪",
        locations: [
          {
            name: "Don Quijote Ueno (ดองกี้)",
            query: "Don Quijote Ueno Tokyo",
            closingTime: "24:00",
            walkingTime: "🚶 2 min จาก Ueno Station",
            tips: [
              "🏪 ร้านดองกี้สาขา Ueno ใหญ่ เปิดดึก มีของเยอะมาก",
              "💰 ทุกอย่างราคาถูก ตั้งแต่ ¥100+ มีทั้งของใหม่และมือสอง",
              "🎁 ซื้อขนม ของฝาก เครื่องสำอาง ยา ของใช้ ครบในที่เดียว",
              "💳 ใช้ Passport ทำ Tax Free ได้เลย สำหรับนักท่องเที่ยว",
              "⏰ เปิด 10:00-24:00",
            ],
          },
          {
            name: "Can Do Ueno",
            query: "Can Do Ueno Tokyo",
            closingTime: "21:00",
            walkingTime: "🚶 3 min จาก Ueno Station",
            tips: [
              "💯 ร้าน 100 เยนคุณภาพสูง สินค้าทำในญี่ปุ่น",
              "🍱 มีทั้งของใช้ในบ้าน, เครื่องครัว, ของเล่น, เครื่องเขียน",
              "🎁 มี Gift Set สวย เหมาะซื้อเป็นของฝาก",
              "💰 ทุกอย่าง ¥100 คุณภาพดีกว่า Daiso นิดหน่อย",
              "⏰ เปิด 10:00-21:00",
            ],
          },
          {
            name: "Daiso Ueno",
            query: "Daiso Ueno Tokyo",
            closingTime: "21:00",
            walkingTime: "🚶 3 min จาก Ueno Station",
            tips: [
              "💯 ร้าน 100 เยนใหญ่สุดในญี่ปุ่น มีทุกสาขา",
              "🏠 มีทุกอย่าง - ของใช้ในบ้าน, เครื่องสำอาง, ของเล่น, เครื่องเขียน, อาหาร",
              "💰 ทุกอย่าง ¥100 บางร้านมีสินค้า Premium ¥300-500 ด้วย",
              "🎁 KitKat รสแปลกๆ, ชาเขียว, ขนมญี่ปุ่น ซื้อเป็นของฝากได้",
              "⏰ เปิด 10:00-21:00",
            ],
          },
        ],
      },
    ],
  },
  {
    area: "Ginza",
    emoji: "✨",
    categories: [
      {
        category: "เครื่องสำอาง/ยา",
        icon: "💄",
        locations: [
          {
            name: "@cosme TOKYO (Ginza)",
            query: "@cosme TOKYO Ginza",
            closingTime: "21:00",
            walkingTime: "🚶 2 min จาก Ginza Station",
            tips: [
              "💄 สาขา Ginza ใหญ่สุดในโตเกียว มีทุกแบรนด์ญี่ปุ่น",
              "🌟 มี Shiseido, SUQQU, Addiction, RMK, Clé de Peau Beauté, CPB",
              "🏆 มี Beauty Ranking จาก @cosme Website ช่วยเลือกซื้อ",
              "💰 Tester ให้ลองทุกแบรนด์ ราคาถูกกว่าไทย 20-40%",
              "💳 รับบัตรเครดิต มี Tax Free",
              "⏰ เปิด 11:00-21:00",
            ],
          },
          {
            name: "Ainz & Tulpe Ginza",
            query: "Ainz Tulpe Ginza Tokyo",
            closingTime: "21:00",
            walkingTime: "🚶 3 min จาก Ginza Station",
            tips: [
              "💄 ร้านเครื่องสำอางและยายักษ์ใหญ่ใน Ginza",
              "🌟 มี Shiseido, Decorté, Kanebo, SK-II, Hada Labo, Biore",
              "💊 มียาและวิตามิน - EVE, Pabron, DHC, Fancl, Q10",
              "💰 ราคาถูกกว่าไทย 20-30% มี Tester ให้ลองก่อนซื้อ",
              "💳 รับบัตรเครดิต มี Tax Free สำหรับนักท่องเที่ยว",
              "⏰ เปิด 10:00-21:00",
            ],
          },
          {
            name: "Matsumoto Kiyoshi Ginza",
            query: "Matsumoto Kiyoshi Ginza Tokyo",
            closingTime: "22:00",
            walkingTime: "🚶 2 min จาก Ginza Station",
            tips: [
              "💊 ร้านขายยายอดนิยมมีสาขาเยอะสุดในญี่ปุ่น",
              "💄 มีเครื่องสำอาง, สกินแคร์, กันแดด ราคาถูก",
              "🍵 มีวิตามิน, อาหารเสริม, ชาสุขภาพ",
              "💰 ถูกกว่า Sephora 30-50% บางรายการมี Sale",
              "⏰ เปิด 10:00-22:00",
            ],
          },
        ],
      },
      {
        category: "รองเท้ากีฬา",
        icon: "👟",
        locations: [
          {
            name: "Euro Sport Tokyo Ginza",
            query: "Euro Sport Tokyo Ginza",
            walkingTime: "🚶 3 min จาก Ginza Station",
            closingTime: "20:00",
            tips: [
              "👟 ร้านรองเท้ากีฬาและแบรนด์เนม มีทั้ง Nike, Adidas, New Balance, Asics",
              "🎌 มีรุ่น Exclusive เฉพาะญี่ปุ่นหรือเอเชีย มักหมดเร็วที่อื่น",
              "💰 ราคาใกล้เคียงไทย แต่มีโอกาสเจอ Sale หรือ Limited Release",
              "📏 ไซส์รองเท้าญี่ปุ่นเล็กกว่าไทย 0.5-1 ไซส์ ควรลองก่อนซื้อ",
              "📍 อยู่ย่าน Ginza เดินช้อปต่อได้หลายห้าง",
              "⏰ เปิด 11:00-20:00",
            ],
          },
        ],
      },
      {
        category: "เครื่องเขียน/ศิลปะ",
        icon: "✏️",
        locations: [
          {
            name: "Itoya Ginza",
            query: "Itoya Ginza Tokyo",
            closingTime: "21:00",
            walkingTime: "🚶 1 min จาก Ginza Station",
            tips: [
              "✏️ ร้านเครื่องเขียน 12 ชั้น ใหญ่สุดในญี่ปุ่น!",
              "🎨 มีปากกา, สมุด, สี, อุปกรณ์ศิลปะ, DIY Craft",
              "🖌️ มี Pilot, Uni-ball, Pentel, Sailor, Platinum ราคาถูกกว่าไทย",
              "📸 ชั้นบนมี Workshop และ Gallery",
              "⏰ เปิด 10:00-21:00",
            ],
          },
        ],
      },
      {
        category: "แฟชั่น",
        icon: "👕",
        locations: [
          {
            name: "Uniqlo Ginza Flagship Store",
            query: "Uniqlo Ginza Tokyo",
            walkingTime: "🚶 4 min จาก Ginza Station",
            closingTime: "21:00",
            tips: [
              "👕 ร้านยูนิโคล่ Flagship หรูหราและยิ่งใหญ่มาก สูงถึง 12 ชั้น!",
              "🎌 มีคอลเลกชันกราฟิก (UT) แบบพิเศษๆ ลายจัดเต็มที่หาซื้อที่อื่นไม่ได้",
              "📸 จุดถ่ายรูปลำโพงรูปปั้นและ Display แก้วสวยงามอลังการ",
            ]
          },
          {
            name: "GU Ginza (Marronnier Gate)",
            query: "GU Ginza Tokyo",
            walkingTime: "🚶 4 min จาก Ginza Station",
            closingTime: "21:00",
            tips: [
              "👕 ร้าน GU สาขาใหญ่ย่านกินซ่า จัดสไตล์แฟชั่นแบบผู้ใหญ่ชิคๆ",
              "🌟 มีสินค้าพิเศษ สินค้า Collection ใหม่มาลงที่นี่เยอะ",
              "💸 ถึงอยู่ย่านหรูแต่ราคาน่ารักเหมือนเดิม ช้อปปิ้งต่อจาก Uniqlo ได้เลย",
              "⏰ เปิด 11:00-21:00",
            ]
          }
        ]
      },
      {
        category: "โมเดล/ของเล่น",
        icon: "🧸",
        locations: [
          {
            name: "Hakuhinkan Toy Park",
            query: "Hakuhinkan Toy Park Ginza Tokyo",
            walkingTime: "🚶 5 min จาก Ginza Station",
            closingTime: "20:00",
            tips: [
              "🧸 ตึกรวมของเล่น 4 ชั้น มีทั้งของสะสม โมเดล รถราง Tamiya",
              "🏎️ มีรางรถแข่ง Slot Car ให้บริการดวลความเร็วกันได้ที่ชั้นบน",
              "🧸 เหมาะสำหรับเดินดูเพลินๆ และสายของสะสมเด็กโต",
            ]
          }
        ]
      },
      {
        category: "100 เยน/ดองกี้",
        icon: "🏪",
        locations: [
          {
            name: "Don Quijote Ginza (ดองกี้)",
            query: "Don Quijote Ginza Tokyo",
            closingTime: "24:00",
            walkingTime: "🚶 2 min จาก Ginza Station",
            tips: [
              "🏪 ร้านดองกี้สาขา Ginza ใหญ่ เปิดดึก มีของเยอะมาก",
              "💰 ทุกอย่างราคาถูก ตั้งแต่ ¥100+ มีทั้งของใหม่และมือสอง",
              "🎁 ซื้อขนม ของฝาก เครื่องสำอาง ยา ของใช้ ครบในที่เดียว",
              "💳 ใช้ Passport ทำ Tax Free ได้เลย สำหรับนักท่องเที่ยว",
              "⏰ เปิด 10:00-24:00",
            ],
          },
          {
            name: "Can Do Ginza",
            query: "Can Do Ginza Tokyo",
            closingTime: "21:00",
            walkingTime: "🚶 3 min จาก Ginza Station",
            tips: [
              "💯 ร้าน 100 เยนคุณภาพสูง สินค้าทำในญี่ปุ่น",
              "🍱 มีทั้งของใช้ในบ้าน, เครื่องครัว, ของเล่น, เครื่องเขียน",
              "🎁 มี Gift Set สวย เหมาะซื้อเป็นของฝาก",
              "💰 ทุกอย่าง ¥100 คุณภาพดีกว่า Daiso นิดหน่อย",
              "⏰ เปิด 10:00-21:00",
            ],
          },
          {
            name: "Daiso Ginza",
            query: "Daiso Ginza Tokyo",
            walkingTime: "🚶 4 min จาก Ginza Station",
            closingTime: "21:00",
            tips: [
              "💯 ร้าน 100 เยนใหญ่สุดในญี่ปุ่น มีทุกสาขา",
              "🏠 มีทุกอย่าง - ของใช้ในบ้าน, เครื่องสำอาง, ของเล่น, เครื่องเขียน, อาหาร",
              "💰 ทุกอย่าง ¥100 บางร้านมีสินค้า Premium ¥300-500 ด้วย",
              "🎁 KitKat รสแปลกๆ, ชาเขียว, ขนมญี่ปุ่น ซื้อเป็นของฝากได้",
              "⏰ เปิด 10:00-21:00",
            ],
          },
        ],
      },
    ],
  },
  {
    area: "Akihabara",
    emoji: "🎮",
    categories: [
      {
        category: "อนิเมะ/โอตาคุ/Figure",
        icon: "🎌",
        locations: [
          {
            name: "Radio Kaikan",
            query: "Radio Kaikan Akihabara Tokyo",
            walkingTime: "🚶 1 min จาก Akihabara Station",
            closingTime: "20:00",
            tips: [
              "🏢 ตึก 10 ชั้น รวมร้าน Hobby, Figure, Card Game, Doujinshi, Anime Goods",
              "🎴 แต่ละชั้นแยกประเภท - Figure, Card Game, Model Kit, CD/DVD",
              "🎰 Gachapon (ตู้กาชาปอง) อยู่ชั้น 1 มีเยอะที่สุดในย่าน",
              "💳 รับบัตรเครดิต บางร้านมี Tax Free",
              "📸 มี Event และ Exhibition เปลี่ยนทุกเดือน เช็คตารางก่อนไป",
              "⏰ เปิด 10:00-20:00",
            ],
          },
          {
            name: "Lashinbang Akihabara",
            query: "Lashinbang Akihabara Tokyo",
            walkingTime: "🚶 5 min จาก Akihabara Station",
            closingTime: "21:00",
            tips: [
              "🎭 ร้านขายของมือสองสาย Anime/Doujin โดยเฉพาะ มีสินค้า Exclusive เยอะ",
              "📚 มีทั้ง Manga, Doujinshi, Figure, CD, DVD, Game, Goods",
              "💰 ราคาถูกกว่าร้านใหม่ 30-70% แต่ต้องเช็คสภาพดีๆ",
              "🔍 มีระบบเกรดสินค้า A/B/C เกรด A = เกือบใหม่, C = มีรอยใช้",
              "🎌 บางสินค้ามีเฉพาะภาษาญี่ปุ่น เช็คก่อนซื้อ",
              "⏰ เปิด 11:00-21:00",
            ],
          },
          {
            name: "Mandarake Complex",
            query: "Mandarake Complex Akihabara Tokyo",
            walkingTime: "🚶 4 min จาก Akihabara Station",
            closingTime: "20:00",
            tips: [
              "🏢 ตึก 8 ชั้น ของมือสอง OTAKU ดังกึ่งดัง! มีทุกอย่าง",
              "📚 Manga, Doujinshi, Figure, Anime Cel, Poster, Goods, Retro Game",
              "💰 ราคาถูกมากเริ่มต้น ¥300+ แต่ของหายากหลักหมื่น",
              "🔍 แต่ละชั้นแยกตามประเภท - ชั้น 3-4 = Manga, 5-6 = Figure, 7-8 = Rare Items",
              "⚠️ ของเก่าบางอย่างมีกลิ่น/รอย ต้องตรวจสอบก่อนซื้อ",
              "⏰ เปิด 12:00-20:00",
            ],
          },
          {
            name: "Kotobukiya Akihabara",
            query: "Kotobukiya Akihabara Tokyo",
            walkingTime: "🚶 3 min จาก Akihabara Station",
            closingTime: "21:00",
            tips: [
              "🎨 ร้าน Figure และ Model Kit ยักษ์ใหญ่ แบรนด์ Kotobukiya",
              "🚗 มี Tamiya, Bandai, Gunpla, Frame Arms, Maison de Plastic",
              "💰 Figure เริ่มต้น ¥3,000-15,000 Model Kit ¥2,000-10,000",
              "🎌 มี Exclusive Figure และ Limited Edition เฉพาะร้าน",
              "💳 รับบัตรเครดิต มี Tax Free",
              "⏰ เปิด 11:00-21:00",
            ],
          },
          {
            name: "AmiAmi Akihabara",
            query: "AmiAmi Akihabara Tokyo",
            walkingTime: "🚶 2 min จาก Akihabara Station",
            closingTime: "21:00",
            tips: [
              "🎨 ร้านฟิกเกอร์ทั้งของใหม่และมือสองที่โด่งดังมาก มี 2 สาขาใกล้ๆ กัน",
              "💰 ราคาดีและมีการตีเกรดสภาพของชัดเจน เชื่อถือได้",
            ],
          },
          {
            name: "Akihabara Gachapon Kaikan",
            query: "Akihabara Gachapon Kaikan Tokyo",
            walkingTime: "🚶 5 min จาก Akihabara Station",
            closingTime: "20:00",
            tips: [
              "🎰 สวรรค์ของนักสุ่ม มีตู้กาชาปองให้หมุนเป็นร้อยๆ ตู้ อัปเดตของใหม่ตลอด",
              "🪙 มีเครื่องแลกเหรียญให้บริการครบครัน",
            ],
          },
        ],
      },
      {
        category: "โมเดล/Tamiya/กันพลา",
        icon: "🚗",
        locations: [
          {
            name: "Yodobashi Camera Akiba (ชั้นของเล่น)",
            query: "Yodobashi Camera Akiba Tokyo",
            walkingTime: "🚶 1 min จาก Akihabara Station",
            closingTime: "22:00",
            tips: [
              "📷 ตึกใหญ่ 8 ชั้น มีทุกอย่าง - กล้อง, เครื่องใช้ไฟฟ้า, นาฬิกา, ของเล่น",
              "🎮 ชั้นของเล่นมี Gunpla, Figure, Model Kit, Tamiya, Bandai",
              "💳 ใช้บัตรเครดิตต่างประเทศได้ มี Tax Free + Coupon ส่วนเพิ่ม 7-10%",
              "🎁 ซื้อกล้อง/เลนส์/นาฬิกา ได้ราคาถูกกว่าไทย 20-30%",
              "⏰ เปิด 09:30-22:00",
            ],
          },
        ],
      },
      {
        category: "เกมมือสอง/Retro",
        icon: "🎮",
        locations: [
          {
            name: "RECOfan Akihabara",
            query: "RECOfan Akihabara Tokyo",
            walkingTime: "🚶 5 min จาก Akihabara Station",
            closingTime: "21:00",
            tips: [
              "🎮 ร้านเกมมือสองชื่อดัง มีเกม PS, Nintendo, Sega, PC เก่าและใหม่",
              "💰 เกมมือสองราคา ¥1,000-4,000 เกมใหม่ ¥5,000-8,000",
              "🕹️ มี Retro Game ยุค Famicom, Super Famicom, Sega Saturn ด้วย",
              "🔍 ตรวจสอบแผ่นเกมและคู่มือครบก่อนซื้อ บางร้านมีเฉพาะแผ่น",
              "📦 บางเกมมีเฉพาะภาษาญี่ปุ่น เช็คก่อนว่าเล่นภาษาอังกฤษได้ไหม",
              "⏰ เปิด 11:00-21:00",
            ],
          },
          {
            name: "Super Potato Akihabara",
            query: "Super Potato Akihabara Tokyo",
            walkingTime: "🚶 4 min จาก Akihabara Station",
            closingTime: "20:00",
            tips: [
              "🕹️ ร้านเกม Retro ระดับตำนาน บรรยากาศเหมือนหลุดไปยุค 90s",
              "🎮 มีทั้งเครื่องตลับ, Famicom, Gameboy และของสะสมสุดแรร์",
              "🕹️ ชั้นบนสุดมีตู้เกม Arcade คลาสสิกให้นั่งเล่นพร้อมซื้อขนมย้อนยุค",
            ],
          },
        ],
      },
      {
        category: "แผ่นเสียง/CD/Anime Song",
        icon: "💿",
        locations: [
          {
            name: "Disk Union Akihabara",
            query: "Disk Union Akihabara Tokyo",
            walkingTime: "🚶 2 min จาก Akihabara Station",
            closingTime: "21:00",
            tips: [
              "💿 สาขา Akihabara มี Anime Song, Vocaloid, Game Music, J-Pop เยอะสุด",
              "🎵 มี CD Anime Song, Idol, Voice Actor, Vocaloid, Touhou Project",
              "💰 CD มือสองเริ่มต้น ¥500+ Vinyl ¥1,500+",
              "📸 มีแผ่น Limited Edition, Autographed, Event-Only บางแผ่นหายาก",
              "⏰ เปิด 11:00-21:00",
            ],
          },
        ],
      },
      {
        category: "100 เยน/ดองกี้",
        icon: "🏪",
        locations: [
          {
            name: "Don Quijote Akihabara (ดองกี้)",
            query: "Don Quijote Akihabara Tokyo",
            walkingTime: "🚶 4 min จาก Akihabara Station",
            closingTime: "24:00",
            tips: [
              "🏪 ร้านดองกี้สาขา Akihabara ใหญ่ เปิดดึก มีของเยอะมาก",
              "💰 ทุกอย่างราคาถูก ตั้งแต่ ¥100+ มีทั้งของใหม่และมือสอง",
              "🎁 ซื้อขนม ของฝาก เครื่องสำอาง ยา ของใช้ ครบในที่เดียว",
              "💳 ใช้ Passport ทำ Tax Free ได้เลย สำหรับนักท่องเที่ยว",
              "⏰ เปิด 10:00-24:00",
            ],
          },
          {
            name: "Can Do Akihabara",
            query: "Can Do Akihabara Tokyo",
            walkingTime: "🚶 3 min จาก Akihabara Station",
            closingTime: "21:00",
            tips: [
              "💯 ร้าน 100 เยนคุณภาพสูง สินค้าทำในญี่ปุ่น",
              "🍱 มีทั้งของใช้ในบ้าน, เครื่องครัว, ของเล่น, เครื่องเขียน",
              "🎁 มี Gift Set สวย เหมาะซื้อเป็นของฝาก",
              "💰 ทุกอย่าง ¥100 คุณภาพดีกว่า Daiso นิดหน่อย",
              "⏰ เปิด 10:00-21:00",
            ],
          },
          {
            name: "Daiso Akihabara",
            query: "Daiso Akihabara Tokyo",
            walkingTime: "🚶 3 min จาก Akihabara Station",
            closingTime: "21:00",
            tips: [
              "💯 ร้าน 100 เยนใหญ่สุดในญี่ปุ่น มีทุกสาขา",
              "🏠 มีทุกอย่าง - ของใช้ในบ้าน, เครื่องสำอาง, ของเล่น, เครื่องเขียน, อาหาร",
              "💰 ทุกอย่าง ¥100 บางร้านมีสินค้า Premium ¥300-500 ด้วย",
              "🎁 KitKat รสแปลกๆ, ชาเขียว, ขนมญี่ปุ่น ซื้อเป็นของฝากได้",
              "⏰ เปิด 10:00-21:00",
            ],
          },
        ],
      },
    ],
  },
  {
    area: "Ikebukuro",
    emoji: "🛍️",
    categories: [
      {
        category: "อนิเมะ/โอตาคุ",
        icon: "🎌",
        locations: [
          {
            name: "Animate Ikebukuro",
            query: "Animate Ikebukuro Tokyo",
            walkingTime: "🚶 5 min จาก Ikebukuro Station",
            closingTime: "21:00",
            tips: [
              "🏢 Animate Flagship Store ใหญ่สุดในญี่ปุ่น 8 ชั้น!",
              "📚 แต่ละชั้นแยกตามประเภท: Manga, Anime, Goods, CD/DVD, Doujinshi",
              "🎁 ซื้อ Box Set หรือ Limited Edition มีเฉพาะที่นี่",
              "💳 ใช้บัตรเครดิตได้ มี Tax Free สำหรับซื้อเกิน ¥5,000",
              "📍 ออก Exit C2 จาก Ikebukuro Station ใกล้สุด",
              "⏰ เปิด 10:00-21:00",
            ],
          },
          {
            name: "Surugaya Ikebukuro",
            query: "Surugaya Ikebukuro Tokyo",
            walkingTime: "🚶 5 min จาก Ikebukuro Station",
            closingTime: "20:00",
            tips: [
              "🎌 ร้านขายของมือสองสาย Anime/Doujin/Idol มีสินค้าหายากเยอะ",
              "📦 มีทั้ง Figure, CD, DVD, Manga, Goods, Poster, Clear File",
              "💰 ราคาถูกกว่าร้านใหม่ 40-70% ต้องเช็คสภาพดีๆ",
              "🔍 มีระบบเกรดสินค้า เหมือน Lashinbang",
              "🎭 มีสินค้า Idol Group หายาก โดยเฉพาะวง Underground",
              "⏰ เปิด 11:00-20:00",
              "📍 อยู่ใกล้ Animate เดินถึงได้ใน 5 นาที",
            ],
          },
          {
            name: "Otome Road (少女ロード)",
            query: "Otome Road Ikebukuro Tokyo",
            walkingTime: "🚶 8 min จาก Ikebukuro Station",
            closingTime: "20:00",
            tips: [
              "🌸 ถนนสาย OTAKU หญิง มีร้าน Animate, K-Books, Mandarake สาขาหญิง",
              "📚 มี Doujinshi, BL, Joseimuke Manga, Otome Game เยอะสุดในโตเกียว",
              "🎭 มีคาเฟ่ Otaku, Maid Cafe, Butler Cafe แถวนั้น",
              "🚶 เดินจาก Ikebukuro Exit 2 ~5 นาที",
              "📸 ถ่ายรูปกับรูปปั้นอนิเมะได้ที่หน้า Animate",
            ],
          },
          {
            name: "Sekiendo Ikebukuro",
            query: "Sekiendo Ikebukuro Tokyo",
            walkingTime: "🚶 1 min จาก Ikebukuro Station",
            closingTime: "22:00",
            tips: [
              "📚 ร้านหนังสือใหญ่ใน Ikebukuro มี Manga, Novel, Artbook",
              "🎨 มี Artbook อนิเมะ, Manga Guide, How-to-Draw เยอะ",
              "💰 หนังสือใหม่ราคามาตรฐาน หนังสือเก่า ¥300-800",
              "📸 มีมังงะ Limited Edition และ Box Set เฉพาะร้าน",
              "⏰ เปิด 10:00-22:00",
            ],
          },
          {
            name: "Sunshine City",
            query: "Sunshine City Ikebukuro Tokyo",
            walkingTime: "🚶 10 min จาก Ikebukuro Station",
            closingTime: "20:00",
            tips: [
              "🏬 ห้างสรรพสินค้าครบวงจรที่เป็นแหล่งแฮงเอาต์ของสายอนิเมะ",
              "⚡ มี Pokémon Center Mega Tokyo แหล่งช้อปของโปเกมอนที่ใหญ่มากๆ",
              "🏴‍☠️ มีร้าน One Piece Mugiwara Store และ Gashapon Department Store (มีตู้กว่า 3,000 ตู้)",
            ],
          },
          {
            name: "K-BOOKS Ikebukuro",
            query: "K-BOOKS Ikebukuro Tokyo",
            walkingTime: "🚶 5 min จาก Ikebukuro Station",
            closingTime: "20:00",
            tips: [
              "📚 ร้านมือสองเฉพาะทาง มีการแบ่งสาขาตามหมวดหมู่ไว้ใกล้ๆ กันในโซน Otome Road",
              "🎭 มีตั้งแต่อนิเมะ, เกม, K-pop, นักพากย์ ไปจนถึงสายวงไอดอล 2.5D",
            ],
          },
        ],
      },
      {
        category: "เครื่องสำอาง/ยา",
        icon: "💄",
        locations: [
          {
            name: "Ainz & Tulpe Ikebukuro",
            query: "Ainz Tulpe Ikebukuro Tokyo",
            walkingTime: "🚶 3 min จาก Ikebukuro Station",
            closingTime: "21:00",
            tips: [
              "💄 ร้านเครื่องสำอางและยาขนาดใหญ่ มีแบรนด์ญี่ปุ่นครบ",
              "🌟 มี Shiseido, Decorté, Kanebo, SK-II, Hada Labo, Biore, Senka",
              "💊 มียาและวิตามินขาย - EVE, Pabron, DHC, Fancl",
              "💰 ราคาถูกกว่าไทย 20-30% มี Tester ให้ลองก่อนซื้อ",
              "💳 รับบัตรเครดิต มี Tax Free สำหรับนักท่องเที่ยว",
              "⏰ เปิด 10:00-21:00",
            ],
          },
          {
            name: "Tobu Department Store (ชั้นเครื่องสำอาง)",
            query: "Tobu Department Store Ikebukuro",
            walkingTime: "🚶 1 min จาก Ikebukuro Station",
            closingTime: "21:00",
            tips: [
              "🏬 ห้างสรรพสินค้าใหญ่ติดสถานี Ikebukuro",
              "💄 ชั้นเครื่องสำอางมี Shiseido, Kanebo, Decorté, SUQQU, CPB",
              "🎁 มีเครื่องสำอาง Limited Edition และ Gift Set เฉพาะห้าง",
              "💳 รับบัตรเครดิตต่างประเทศ มี Tax Free",
              "⏰ เปิด 10:00-21:00 (ร้านอาหาร 11:00-22:00)",
            ],
          },
        ],
      },
      {
        category: "100 เยน/ดองกี้",
        icon: "🏪",
        locations: [
          {
            name: "Don Quijote Ikebukuro (ดองกี้)",
            query: "Don Quijote Ikebukuro Tokyo",
            walkingTime: "🚶 1 min จาก Ikebukuro Station",
            closingTime: "24:00",
            tips: [
              "🏪 ร้านดองกี้สาขา Ikebukuro ใหญ่ เปิดดึก มีของเยอะมาก",
              "💰 ทุกอย่างราคาถูก ตั้งแต่ ¥100+ มีทั้งของใหม่และมือสอง",
              "🎁 ซื้อขนม ของฝาก เครื่องสำอาง ยา ของใช้ ครบในที่เดียว",
              "💳 ใช้ Passport ทำ Tax Free ได้เลย สำหรับนักท่องเที่ยว",
              "⏰ เปิด 10:00-24:00",
            ],
          },
          {
            name: "Can Do Ikebukuro",
            query: "Can Do Ikebukuro Tokyo",
            walkingTime: "🚶 3 min จาก Ikebukuro Station",
            closingTime: "21:00",
            tips: [
              "💯 ร้าน 100 เยนคุณภาพสูง สินค้าทำในญี่ปุ่น",
              "🍱 มีทั้งของใช้ในบ้าน, เครื่องครัว, ของเล่น, เครื่องเขียน",
              "🎁 มี Gift Set สวย เหมาะซื้อเป็นของฝาก",
              "💰 ทุกอย่าง ¥100 คุณภาพดีกว่า Daiso นิดหน่อย",
              "⏰ เปิด 10:00-21:00",
            ],
          },
          {
            name: "Daiso Ikebukuro",
            query: "Daiso Ikebukuro Tokyo",
            walkingTime: "🚶 3 min จาก Ikebukuro Station",
            closingTime: "21:00",
            tips: [
              "💯 ร้าน 100 เยนใหญ่สุดในญี่ปุ่น มีทุกสาขา",
              "🏠 มีทุกอย่าง - ของใช้ในบ้าน, เครื่องสำอาง, ของเล่น, เครื่องเขียน, อาหาร",
              "💰 ทุกอย่าง ¥100 บางร้านมีสินค้า Premium ¥300-500 ด้วย",
              "🎁 KitKat รสแปลกๆ, ชาเขียว, ขนมญี่ปุ่น ซื้อเป็นของฝากได้",
              "⏰ เปิด 10:00-21:00",
            ],
          },
        ],
      },
    ],
  },
];

export default function FreeTimeCard() {
  const { language } = useLanguage();
  const [showMap, setShowMap] = useState<string | null>(null);
  const [collapsedAreas, setCollapsedAreas] = useState<Record<string, boolean>>({});
  const [collapsedTips, setCollapsedTips] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("freetime-favorites");
    if (saved) {
      try { setFavorites(JSON.parse(saved)); } catch {}
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("freetime-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const [currentTime, setCurrentTime] = useState<number | null>(null);

  // Update time every minute on client only
  useEffect(() => {
    setCurrentTime(Date.now());
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleArea = (area: string) => {
    setCollapsedAreas(prev => ({ ...prev, [area]: !prev[area] }));
  };

  const toggleTips = (key: string) => {
    setCollapsedTips(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFavorite = (name: string) => {
    setFavorites(prev => 
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    freeTimeData.forEach(item => { allExpanded[item.area] = true; });
    setCollapsedAreas(allExpanded);
  };

  const collapseAll = () => {
    setCollapsedAreas({});
  };

  const openInMaps = (query: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  // Check if location matches search and category filter
  const matchesFilter = (location: FreeTimeLocation, category: string) => {
    const matchesSearch = searchQuery === "" || 
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.tips.some(tip => tip.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const normalizedCat = normalizeCategory(category);
    const matchesCategory = activeCategory === "ทั้งหมด" || normalizedCat === activeCategory;
    
    const matchesFavorites = !showFavoritesOnly || favorites.includes(location.name);
    
    return matchesSearch && matchesCategory && matchesFavorites;
  };

  // Get current hour to check if shop is open (client-side only)
  const isShopOpen = (closingTime?: string): boolean | null => {
    if (!closingTime || currentTime === null) return null;
    const now = new Date(currentTime);
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const [closeHour, closeMin] = closingTime.split(":").map(Number);
    const closeTotal = closeHour * 60 + (closeMin || 0);
    const currentTotal = currentHour * 60 + currentMin;
    return currentTotal < closeTotal;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-violet-400 to-purple-500 p-4 sm:p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-3xl sm:text-4xl">🎯</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">
                {language === 'th' ? 'Free Time' : 'Free Time'}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`px-2 py-1 rounded-full text-xs sm:text-sm transition-all ${
                showFavoritesOnly 
                  ? "bg-white text-purple-600" 
                  : "bg-white/20 hover:bg-white/30"
              }`}
            >
              {showFavoritesOnly ? "❤️ " : "🤍 "}{language === 'th' ? 'โปรด' : 'Favs'} ({favorites.length})
            </button>
          </div>
        </div>
        <p className="text-sm sm:text-base opacity-90 mt-1">
          {language === 'th'
            ? 'สถานที่น่าสนใจสำหรับเวลาว่าง แยกตามย่าน'
            : 'Interesting spots for free time, organized by area'}
        </p>
      </div>

      {/* Search Bar */}
      <div className="px-4 sm:px-6 pt-4">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'th' ? '🔍 ค้นหาร้าน...' : '🔍 Search shops...'}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs (Horizontal Scroll) */}
      <div className="px-4 sm:px-6 pt-3">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {allCategories.map((cat) => (
            <button
              key={cat.normalized}
              onClick={() => setActiveCategory(cat.normalized)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.normalized
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {cat.icon} {cat.category}
            </button>
          ))}
        </div>
      </div>

      {/* Collapse/Expand Controls */}
      <div className="px-4 sm:px-6 pt-3 flex gap-2">
        <button
          onClick={expandAll}
          className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium transition-colors duration-150"
        >
          {language === 'th' ? 'ขยายทั้งหมด' : 'Expand All'}
        </button>
        <span className="text-gray-400">|</span>
        <button
          onClick={collapseAll}
          className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 font-medium transition-colors duration-150"
        >
          {language === 'th' ? 'ยุบทั้งหมด' : 'Collapse All'}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {freeTimeData.map((areaGroup, areaIndex) => {
          const areaKey = `area-${areaIndex}`;
          const isCollapsed = !collapsedAreas[areaGroup.area];
          const needsCollapse = freeTimeData.length > 3;

          // Check if any shop in this area matches filter
          const hasMatchingShop = areaGroup.categories.some(cat =>
            cat.locations.some(loc => matchesFilter(loc, cat.category))
          );

          if (!hasMatchingShop) return null;

          return (
            <div key={areaIndex} className="mb-6 last:mb-0">
              {/* Area Header */}
              <button
                onClick={() => needsCollapse && toggleArea(areaGroup.area)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all mb-3 ${
                  needsCollapse
                    ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    : 'cursor-default'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl">{areaGroup.emoji}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
                    {areaGroup.area}
                  </h3>
                </div>
                {needsCollapse && (
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isCollapsed ? "" : "rotate-180"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>

              {/* Categories */}
              {(!needsCollapse || !isCollapsed) && (
                <div className="space-y-3 ml-2 sm:ml-4">
                  {areaGroup.categories.map((category, catIndex) => {
                    const catKey = `${areaKey}-cat-${catIndex}`;
                    const filteredLocations = category.locations.filter(loc => matchesFilter(loc, category.category));

                    if (filteredLocations.length === 0) return null;

                    return (
                      <div key={catIndex} className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3 sm:p-4">
                        {/* Category Header */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg sm:text-xl">{category.icon}</span>
                          <h4 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
                            {category.category}
                          </h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({filteredLocations.length} {language === 'th' ? 'ร้าน' : 'shops'})
                          </span>
                        </div>

                        {/* Shops in Category */}
                        <ul className="space-y-2">
                          {filteredLocations.map((location, locIndex) => {
                            const locKey = `${catKey}-loc-${locIndex}`;
                            const tipsKey = `${locKey}-tips`;
                            const isTipsCollapsed = collapsedTips[tipsKey];
                            const isFav = favorites.includes(location.name);
                            const shopOpen = isShopOpen(location.closingTime);

                            return (
                              <li key={locIndex} className="group rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all p-2 sm:p-3">
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <div className="flex-1 min-w-0">
                                    {/* Shop Name + Badges */}
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {location.name}
                                      </span>
                                      {/* Favorite Button */}
                                      <button
                                        onClick={() => toggleFavorite(location.name)}
                                        className="text-sm hover:scale-110 transition-transform"
                                      >
                                        {isFav ? "❤️" : "🤍"}
                                      </button>
                                      {/* Open/Closed Badge */}
                                      {shopOpen !== null && (
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                          shopOpen 
                                            ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                                            : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                                        }`}>
                                          {shopOpen ? "🟢 " : "🔴 "}{shopOpen ? (language === 'th' ? 'เปิด' : 'Open') : (language === 'th' ? 'ปิด' : 'Closed')}
                                        </span>
                                      )}
                                      {/* Closing Time Badge */}
                                      {location.closingTime && (
                                        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                                          🕒 {location.closingTime}
                                        </span>
                                      )}
                                    </div>
                                    {/* Walking Time Badge */}
                                    {location.walkingTime && (
                                      <div className="mt-1">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">
                                          {location.walkingTime}
                                        </span>
                                      </div>
                                    )}

                                    {/* Tips Section (Collapsible) */}
                                    {location.tips && location.tips.length > 0 && (
                                      <div className="mt-2">
                                        <button
                                          onClick={() => toggleTips(tipsKey)}
                                          className="w-full bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-l-4 border-amber-400 dark:border-amber-600 rounded-r-lg p-3 text-left hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-900/30 dark:hover:to-orange-900/30 transition-all"
                                        >
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                              <svg className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                              </svg>
                                              <span className="text-xs font-semibold text-amber-900 dark:text-amber-300 uppercase tracking-wide">
                                                {language === 'th' ? '💡 เคล็ดลับ' : '💡 Tips'}
                                              </span>
                                            </div>
                                            <svg
                                              className={`w-4 h-4 text-amber-600 dark:text-amber-400 transition-transform ${isTipsCollapsed ? "" : "rotate-180"}`}
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                          </div>
                                          {!isTipsCollapsed && (
                                            <ul className="space-y-1.5 mt-2">
                                              {location.tips.map((tip, tipIndex) => (
                                                <li key={tipIndex} className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed flex items-start gap-2">
                                                  <span className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0">•</span>
                                                  <span>{tip}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          )}
                                        </button>
                                      </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="mt-2 flex gap-2 flex-wrap">
                                      {/* Google Maps Button */}
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setShowMap(showMap === locKey ? null : locKey);
                                        }}
                                        className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center gap-1"
                                      >
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        {showMap === locKey
                                          ? (language === 'th' ? 'ซ่อนแผนที่' : 'Hide Map')
                                          : (language === 'th' ? 'ดูบนแผนที่' : 'View on Map')
                                        }
                                      </button>
                                      {/* Open in Maps App */}
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openInMaps(location.query);
                                        }}
                                        className="text-xs text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 inline-flex items-center gap-1"
                                      >
                                        📍 {language === 'th' ? 'เปิดใน Maps' : 'Open in Maps'}
                                      </button>
                                    </div>

                                    {showMap === locKey && (
                                      <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                                        <iframe
                                          width="100%"
                                          height="200"
                                          style={{ border: 0 }}
                                          loading="lazy"
                                          src={`https://maps.google.com/maps?q=${encodeURIComponent(location.query)}&output=embed`}
                                        ></iframe>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-2 flex justify-between items-center">
                                          <span className="text-xs text-gray-600 dark:text-gray-300 truncate">{location.query}</span>
                                          <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.query)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap ml-2"
                                          >
                                            {language === 'th' ? 'เปิดใน Maps ↗' : 'Open in Maps ↗'}
                                          </a>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
