"use client";

import { useState } from "react";
import { useChecklist } from "@/hooks/useChecklist";
import { useLanguage } from "@/context/LanguageContext";

interface FreeTimeLocation {
  name: string;
  query: string;
  tips: string[];
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
            tips: [
              "💿 ร้านแผ่นเสียงและ CD มือสองชื่อดัง มีหลายสาขาใน Ueno",
              "🎵 แบ่งตามแนวเพลง - Jazz, Rock, Pop, Classical, Electronic, Anime Song",
              "💰 Vinyl มือสองเริ่มต้น ¥1,000+ CD ราคา ¥500-2,000",
              "🔍 ตรวจสอบสภาพแผ่นก่อนซื้อ มีเกรด A/B/C บอกไว้",
              "📸 บางร้านมีแผ่นปกหายากหรือ Limited Edition เฉพาะญี่ปุ่น",
              "⏰ เปิด 11:00-20:00 (แต่ละสาขาอาจต่างกัน)",
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
            tips: [
              "🎨 ร้าน Figure และ Model Kit ยักษ์ใหญ่ แบรนด์ Kotobukiya",
              "🚗 มี Tamiya, Bandai, Gunpla, Frame Arms, Maison de Plastic",
              "💰 Figure เริ่มต้น ¥3,000-15,000 Model Kit ¥2,000-10,000",
              "🎌 มี Exclusive Figure และ Limited Edition เฉพาะร้าน",
              "💳 รับบัตรเครดิต มี Tax Free",
              "⏰ เปิด 11:00-21:00",
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
            tips: [
              "🎮 ร้านเกมมือสองชื่อดัง มีเกม PS, Nintendo, Sega, PC เก่าและใหม่",
              "💰 เกมมือสองราคา ¥1,000-4,000 เกมใหม่ ¥5,000-8,000",
              "🕹️ มี Retro Game ยุค Famicom, Super Famicom, Sega Saturn ด้วย",
              "🔍 ตรวจสอบแผ่นเกมและคู่มือครบก่อนซื้อ บางร้านมีเฉพาะแผ่น",
              "📦 บางเกมมีเฉพาะภาษาญี่ปุ่น เช็คก่อนว่าเล่นภาษาอังกฤษได้ไหม",
              "⏰ เปิด 11:00-21:00",
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
            tips: [
              "📚 ร้านหนังสือใหญ่ใน Ikebukuro มี Manga, Novel, Artbook",
              "🎨 มี Artbook อนิเมะ, Manga Guide, How-to-Draw เยอะ",
              "💰 หนังสือใหม่ราคามาตรฐาน หนังสือเก่า ¥300-800",
              "📸 มีมังงะ Limited Edition และ Box Set เฉพาะร้าน",
              "⏰ เปิด 10:00-22:00",
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
    ],
  },
];

export default function FreeTimeCard() {
  const { language } = useLanguage();
  const [showMap, setShowMap] = useState<string | null>(null);
  const [collapsedAreas, setCollapsedAreas] = useState<Record<string, boolean>>({});

  const toggleArea = (area: string) => {
    setCollapsedAreas(prev => ({ ...prev, [area]: !prev[area] }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    freeTimeData.forEach(item => { allExpanded[item.area] = true; });
    setCollapsedAreas(allExpanded);
  };

  const collapseAll = () => {
    setCollapsedAreas({});
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
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
        <p className="text-sm sm:text-base opacity-90 mt-1">
          {language === 'th' 
            ? 'สถานที่น่าสนใจสำหรับเวลาว่าง แยกตามย่าน' 
            : 'Interesting spots for free time, organized by area'}
        </p>
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

                    return (
                      <div key={catIndex} className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3 sm:p-4">
                        {/* Category Header */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg sm:text-xl">{category.icon}</span>
                          <h4 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
                            {category.category}
                          </h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({category.locations.length} {language === 'th' ? 'ร้าน' : 'shops'})
                          </span>
                        </div>

                        {/* Shops in Category */}
                        <ul className="space-y-2">
                          {category.locations.map((location, locIndex) => {
                            const locKey = `${catKey}-loc-${locIndex}`;

                            return (
                              <li key={locIndex} className="group rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all p-2 sm:p-3">
                                <div className="flex items-start gap-2 sm:gap-3">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {location.name}
                                      </span>
                                    </div>

                                    {/* Tips Section */}
                                    {location.tips && location.tips.length > 0 && (
                                      <div className="mt-2 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-l-4 border-amber-400 dark:border-amber-600 rounded-r-lg p-3">
                                        <div className="flex items-start gap-2 mb-2">
                                          <svg className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                          </svg>
                                          <span className="text-xs font-semibold text-amber-900 dark:text-amber-300 uppercase tracking-wide">
                                            {language === 'th' ? '💡 เคล็ดลับและข้อควรระวัง' : '💡 Tips & Advice'}
                                          </span>
                                        </div>
                                        <ul className="space-y-1.5">
                                          {location.tips.map((tip, tipIndex) => (
                                            <li key={tipIndex} className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed flex items-start gap-2">
                                              <span className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0">•</span>
                                              <span>{tip}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    {/* Google Maps Button */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowMap(showMap === locKey ? null : locKey);
                                      }}
                                      className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center gap-1 mt-2"
                                    >
                                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                      </svg>
                                      {showMap === locKey
                                        ? (language === 'th' ? 'ซ่อนแผนที่' : 'Hide Map')
                                        : (language === 'th' ? 'ดูบนแผนที่' : 'View on Map')
                                      }
                                    </button>

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
