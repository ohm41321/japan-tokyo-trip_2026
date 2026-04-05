export interface TransportInfo {
  id: string;
  name: string;
  type: 'train' | 'subway' | 'bus' | 'shinkansen' | 'walking';
  line?: string;
  from?: string;
  to?: string;
  duration?: string;
  price?: number;
  coveredByJRPass: boolean;
  tips: string[];
  tipsTH?: string[];
  dayIndex: number;
}

export interface JRPassValue {
  dayIndex: number;
  totalWithoutPass: number;
  passUsed: boolean;
  savings: number;
  worthIt: boolean;
}

const transports: TransportInfo[] = [
  // Day 1 - Arrival (16/04)
  {
    id: 'd1-narita-ueno',
    name: 'Narita Express or Skyliner to Ueno',
    type: 'shinkansen',
    line: 'N\'EX or Keisei Skyliner',
    from: 'Narita Airport',
    to: 'Ueno',
    duration: '45-60 min',
    price: 2600,
    coveredByJRPass: false,
    tips: [
      'Book Skyliner online in advance for a small discount',
      'Narita Express (N\'EX) is covered by the JR Tokyo Wide Pass, but NOT activated on Day 1',
      'Keep your ticket for Suica/Pasmo top-up at the station',
    ],
    tipsTH: [
      'จอง Skyliner ล่วงหน้าออนไลน์เพื่อรับส่วนลดเล็กน้อย',
      'Narita Express (N\'EX) ครอบคลุมโดย JR Tokyo Wide Pass แต่ยังไม่เปิดใช้งานในวันที่ 1',
      'เก็บตั๋วไว้เติมเงิน Suica/Pasmo ที่สถานี',
    ],
    dayIndex: 0,
  },
  {
    id: 'd1-ueno-asakusa',
    name: 'Ueno to Asakusa',
    type: 'subway',
    line: 'Tokyo Metro Ginza Line',
    from: 'Ueno',
    to: 'Asakusa',
    duration: '5 min',
    price: 200,
    coveredByJRPass: false,
    tips: [
      'Suica works on all Tokyo Metro lines',
      'Only 2 stops from Ueno to Asakusa on Ginza Line',
    ],
    tipsTH: [
      'Suica ใช้ได้กับทุกสายของ Tokyo Metro',
      'จาก Ueno ไป Asakusa มีเพียง 2 สถานีบน Ginza Line',
    ],
    dayIndex: 0,
  },
  {
    id: 'd1-asakusa-walk',
    name: 'Walking around Asakusa',
    type: 'walking',
    from: 'Asakusa',
    to: 'Senso-ji & Nakamise',
    duration: '2-3 hrs',
    price: 0,
    coveredByJRPass: false,
    tips: [
      'Senso-ji temple is free to enter',
      'Nakamise shopping street is right outside the temple',
      'Try melon pan and ningyo-yaki along the way',
    ],
    tipsTH: [
      'วัด Senso-ji เข้าชมฟรี',
      'ถนนช็อปปิ้ง Nakamise อยู่หน้าวัดพอดี',
      'ลองเมลอนปังและนิงเกียว-ยากิระหว่างทาง',
    ],
    dayIndex: 0,
  },
  {
    id: 'd1-ueno-hotel',
    name: 'Ueno to hotel area',
    type: 'walking',
    from: 'Ueno',
    to: 'Hotel area',
    duration: '10 min',
    price: 0,
    coveredByJRPass: false,
    tips: [
      'Ueno has many convenient hotels near the station',
      'Ameyoko market is great for late-night snacks near Ueno',
    ],
    tipsTH: [
      'Ueno มีโรงแรมสะดวกมากมายใกล้สถานี',
      'ตลาด Ameyoko เหมาะหาของกินดึกๆ ใกล้ Ueno',
    ],
    dayIndex: 0,
  },
  // Day 2 - Gala Yuzawa (17/04) - JR Pass Day 1
  {
    id: 'd2-ueno-gala',
    name: 'Ueno to Gala Yuzawa (Shinkansen)',
    type: 'shinkansen',
    line: 'Joetsu Shinkansen (Tanigawa)',
    from: 'Ueno',
    to: 'Gala Yuzawa',
    duration: '75 min',
    price: 14000,
    coveredByJRPass: true,
    tips: [
      'Arrive at station 30 min early for Shinkansen',
      'Reserve seats at JR East Travel Service Center (free with JR Pass)',
      'Gala Yuzawa is a seasonal station (winter only, usually Dec-May)',
      'The pass covers the entire round trip - huge value!',
    ],
    tipsTH: [
      'ถึงสถานีก่อนเวลานัด 30 นาทีสำหรับ Shinkansen',
      'จองที่นั่งได้ที่ JR East Travel Service Center (ฟรีพร้อม JR Pass)',
      'Gala Yuzawa เป็นสถานีตามฤดูกาล (เปิดเฉพาะฤดูหนาว ปกติ ธ.ค.-พ.ค.)',
      'Pass ครอบคลุมทั้งเที่ยวไป-กลับ คุ้มค่ามาก!',
    ],
    dayIndex: 1,
  },
  {
    id: 'd2-gala-ski',
    name: 'Gala Yuzawa Ski Resort',
    type: 'walking',
    from: 'Gala Yuzawa Station',
    to: 'Ski slopes',
    duration: 'Full day',
    price: 0,
    coveredByJRPass: true,
    tips: [
      'Gala Yuzawa station connects directly to the ski resort',
      'Rentals and lift tickets sold separately (not covered by JR Pass)',
      'Mid-week is less crowded than weekends',
    ],
    tipsTH: [
      'สถานี Gala Yuzawa เชื่อมตรงไปยังสกีรีสอร์ท',
      'ค่าเช่าอุปกรณ์และลิฟต์แยกต่างหาก (ไม่ครอบคลุมโดย JR Pass)',
      'วันธรรมดาคนน้อยกว่าวันหยุดสุดสัปดาห์',
    ],
    dayIndex: 1,
  },
  {
    id: 'd2-shinjuku-local',
    name: 'Shinjuku local travel',
    type: 'train',
    line: 'JR Yamanote Line',
    from: 'Various locations',
    to: 'Shinjuku area',
    duration: 'Variable',
    price: 200,
    coveredByJRPass: true,
    tips: [
      'Yamanote Line is a loop, goes everywhere in central Tokyo',
      'Trains run every 2-4 minutes during peak hours',
      'Suica works on all JR lines including Yamanote',
    ],
    tipsTH: [
      'JR Yamanote Line เป็นเส้นทางวงกลม ไปทุกที่ในใจกลางเมืองโตเกียว',
      'รถไฟออกทุก 2-4 นาทีในช่วงเวลาเร่งด่วน',
      'Suica ใช้ได้กับทุกสาย JR รวมถึง Yamanote',
    ],
    dayIndex: 1,
  },
  // Day 3 - Kamakura (18/04) - JR Pass Day 2
  {
    id: 'd3-tokyo-kamakura',
    name: 'Tokyo to Kamakura',
    type: 'train',
    line: 'JR Yokosuka Line',
    from: 'Tokyo/Shinjuku',
    to: 'Kamakura',
    duration: '60 min from Tokyo',
    price: 1000,
    coveredByJRPass: true,
    tips: [
      'Direct from Tokyo Station on Yokosuka Line',
      'JR Pass covers the entire fare both ways',
      'Get the window seat on the return trip for Tokyo skyline views',
    ],
    tipsTH: [
      'เดินทางตรงจากสถานี Tokyo บน JR Yokosuka Line',
      'JR Pass ครอบคลุมค่าโดยสารทั้งไป-กลับ',
      'เลือกที่นั่งริมขากลับเพื่อชมวิวตึกโตเกียว',
    ],
    dayIndex: 2,
  },
  {
    id: 'd3-kamakura-local',
    name: 'Kamakura local bus',
    type: 'bus',
    line: 'Enoden / Kamakura local bus',
    from: 'Kamakura Station',
    to: 'Great Buddha & temples',
    duration: '10-20 min per ride',
    price: 400,
    coveredByJRPass: false,
    tips: [
      'Enoden electric tram is scenic and fun',
      'JR Pass does NOT cover local buses in Kamakura',
      'Great Buddha (Kotoku-in) is a short bus ride from station',
      'Consider a day pass for unlimited bus rides (~¥600)',
    ],
    tipsTH: [
      'รถราง Enoden เป็นเส้นทางชมวิวและสนุก',
      'JR Pass ไม่ครอบคลุมรถบัสท้องถิ่นใน Kamakura',
      'พระใหญ่ (Kotoku-in) นั่งรถบัสสั้นๆ จากสถานี',
      'ลองใช้วัน pass สำหรับขึ้นรถบัสไม่จำกัด (~¥600)',
    ],
    dayIndex: 2,
  },
  {
    id: 'd3-kamakura-akiba',
    name: 'Kamakura to Akihabara',
    type: 'train',
    line: 'JR Yokosuka Line + JR Yamanote',
    from: 'Kamakura',
    to: 'Akihabara',
    duration: '70 min',
    price: 1500,
    coveredByJRPass: true,
    tips: [
      'JR Pass covers the full fare - normally ¥1,500',
      'Transfer at Tokyo Station to Yamanote Line',
      'Akihabara is great for evening anime and electronics shopping',
    ],
    tipsTH: [
      'JR Pass ครอบคลุมค่าโดยสารเต็มจำนวน - ปกติ ¥1,500',
      'เปลี่ยนสายที่สถานี Tokyo ไป JR Yamanote Line',
      'Akihabara เหมาะสำหรับการช็อปปิ้งอนิเมะและอิเล็กทรอนิกส์ช่วงเย็น',
    ],
    dayIndex: 2,
  },
  // Day 4 - Kawagoe/Shibuya (19/04) - JR Pass Day 3
  {
    id: 'd4-ikebukuro-kawagoe',
    name: 'Ikebukuro to Kawagoe',
    type: 'train',
    line: 'Tobu Tojo Line',
    from: 'Ikebukuro',
    to: 'Kawagoe',
    duration: '30 min',
    price: 600,
    coveredByJRPass: false,
    tips: [
      'Tobu Line is NOT covered by JR Pass',
      'Kawagoe is known as "Little Edo" for its historic buildings',
      'Try sweet potato treats - Kawagoe\'s specialty!',
      'JR Pass does NOT work on Tobu Railway',
    ],
    tipsTH: [
      'Tobu Line ไม่ครอบคลุมโดย JR Pass',
      'Kawagoe ได้ชื่อว่าเป็น "เอโดะน้อย" จากอาคารประวัติศาสตร์',
      'ลองขนมมันหวาน - ของขึ้นชื่อของ Kawagoe!',
      'JR Pass ใช้กับ Tobu Railway ไม่ได้',
    ],
    dayIndex: 3,
  },
  {
    id: 'd4-shibuya-local',
    name: 'Shibuya local travel',
    type: 'train',
    line: 'JR Yamanote Line',
    from: 'Various',
    to: 'Shibuya area',
    duration: 'Variable',
    price: 200,
    coveredByJRPass: true,
    tips: [
      'Yamanote Line stops at Shibuya - fully covered by JR Pass',
      'Shibuya Crossing is right outside the station',
      'JR Pass is about to expire today - last day of 3-day pass!',
    ],
    tipsTH: [
      'JR Yamanote Line จอดที่ Shibuya - ครอบคลุมเต็มจำนวนโดย JR Pass',
      'Shibuya Crossing อยู่หน้าสถานีพอดี',
      'JR Pass จะหมดอายุวันนี้ - วันสุดท้ายของ pass 3 วัน!',
    ],
    dayIndex: 3,
  },
  {
    id: 'd4-harajuku-shibuya',
    name: 'Harajuku to Shibuya',
    type: 'walking',
    from: 'Harajuku',
    to: 'Shibuya',
    duration: '20 min walk (or 1 stop JR)',
    price: 0,
    coveredByJRPass: false,
    tips: [
      'Pleasant 20-min walk along Omotesando or Meiji-dori',
      'Or take JR 1 stop (covered if pass is still valid)',
      'Omotesando has great architecture and cafes along the way',
    ],
    tipsTH: [
      'เดินชมบรรยากาศ 20 นาทีตามถนน Omotesando หรือ Meiji-dori',
      'หรือนั่ง JR 1 สถานี (ครอบคลุมถ้า pass ยังใช้ได้)',
      'Omotesando มีสถาปัตยกรรมและคาเฟ่สวยๆ ตลอดทาง',
    ],
    dayIndex: 3,
  },
  // Day 5 - Mt. Fuji (20/04)
  {
    id: 'd5-fuji-tour',
    name: 'Mt. Fuji tour bus from Tokyo',
    type: 'bus',
    line: 'Highway tour bus',
    from: 'Tokyo (various pickup points)',
    to: 'Mt. Fuji / Lake Kawaguchi',
    duration: 'Full day (~2 hrs each way)',
    price: 12000,
    coveredByJRPass: false,
    tips: [
      'Not covered by JR Pass - this is a tour package',
      'Book in advance for guaranteed seats',
      'April is good for Mt. Fuji visibility (less cloudy)',
      'Some tours include lunch and multiple Fuji spots',
    ],
    tipsTH: [
      'ไม่ครอบคลุมโดย JR Pass - นี่คือแพ็กเกจทัวร์',
      'จองล่วงหน้าเพื่อรับรองว่ามีที่นั่ง',
      'เดือน เม.ย. เหมาะชมภูเขาฟูจิ (เมฆน้อย)',
      'บางทัวร์รวมอาหารกลางวันและจุดชมฟูจิหลายจุด',
    ],
    dayIndex: 4,
  },
  {
    id: 'd5-ueno-walk',
    name: 'Local Ueno walk',
    type: 'walking',
    from: 'Ueno',
    to: 'Ueno Park area',
    duration: 'Variable',
    price: 0,
    coveredByJRPass: false,
    tips: [
      'Ueno Park has multiple museums (many free on certain days)',
      'Great for cherry blossom season (early April)',
    ],
    tipsTH: [
      'สวน Ueno มีพิพิธภัณฑ์หลายแห่ง (หลายแห่งเปิดฟรีบางวัน)',
      'เหมาะสำหรับฤดูดอกซากุระ (ต้นเดือน เม.ย.)',
    ],
    dayIndex: 4,
  },
  // Day 6 - Old Town (21/04)
  {
    id: 'd6-ueno-shibamata',
    name: 'Ueno to Shibamata',
    type: 'train',
    line: 'Keisei Kanamachi Line',
    from: 'Ueno (via Keisei Ueno)',
    to: 'Shibamata',
    duration: '30 min',
    price: 400,
    coveredByJRPass: false,
    tips: [
      'Keisei Line is NOT covered by JR Pass',
      'Shibamata is famous for Taishakuten temple and traditional sweets',
      'Try dango (rice dumplings) at the temple approach',
    ],
    tipsTH: [
      'Keisei Line ไม่ครอบคลุมโดย JR Pass',
      'Shibamata มีชื่อเสียงจากวัด Taishakutenและขนมดั้งเดิม',
      'ลองดังโงะ (ขนมข้าวปั้น) ที่ทางเข้าวัด',
    ],
    dayIndex: 5,
  },
  {
    id: 'd6-shimokitazawa',
    name: 'Tokyo to Shimokitazawa',
    type: 'train',
    line: 'Odakyu Line',
    from: 'Shinjuku',
    to: 'Shimokitazawa',
    duration: '10 min',
    price: 200,
    coveredByJRPass: false,
    tips: [
      'Odakyu Line is NOT covered by JR Pass',
      'Shimokitazawa is Tokyo\'s vintage/thrift shopping capital',
      'Great live music venues and indie theater scene',
      'Suica works on Odakyu Line',
    ],
    tipsTH: [
      'Odakyu Line ไม่ครอบคลุมโดย JR Pass',
      'Shimokitazawa เป็นย่านช็อปปิ้งของเก่า/มือสองชั้นนำของโตเกียว',
      'มีสถานที่แสดงดนตรีสดและละครอินดี้อย่างยอดเยี่ยม',
      'Suica ใช้ได้กับ Odakyu Line',
    ],
    dayIndex: 5,
  },
  // Day 7 - Departure (22/04)
  {
    id: 'd7-ueno-narita',
    name: 'Ueno to Narita Airport',
    type: 'shinkansen',
    line: 'Keisei Skyliner or N\'EX',
    from: 'Ueno',
    to: 'Narita Airport',
    duration: '45-60 min',
    price: 2600,
    coveredByJRPass: false,
    tips: [
      'Skyliner from Ueno: ¥2,600 (45 min) - fastest option',
      'Narita Express: ¥3,070 (60 min) - covered by standard JR Pass but NOT Tokyo Wide Pass',
      'Allow 2+ hours before your flight',
      'Book Skyliner return ticket online for a discount',
      'JR Pass is expired by this day',
    ],
    tipsTH: [
      'Skyliner จาก Ueno: ¥2,600 (45 นาที) - เร็วที่สุด',
      'Narita Express: ¥3,070 (60 นาที) - ครอบคลุมโดย JR Pass ปกติ แต่ NOT Tokyo Wide Pass',
      'เผื่อเวลา 2+ ชั่วโมงก่อนเที่ยวบิน',
      'จองตั๋ว Skyliner ขากลับออนไลน์เพื่อรับส่วนลด',
      'JR Pass หมดอายุในวันนี้',
    ],
    dayIndex: 6,
  },
];

const JR_PASS_COST = 15000;
const JR_PASS_ACTIVE_DAYS = [1, 2, 3]; // Day 2, 3, 4 (0-indexed: indices 1, 2, 3)

export function useTransport() {
  const getDayTransports = (dayIndex: number): TransportInfo[] => {
    return transports.filter((t) => t.dayIndex === dayIndex);
  };

  const calculateJRPassValue = (): JRPassValue[] => {
    return Array.from({ length: 7 }, (_, dayIndex) => {
      const dayTransports = getDayTransports(dayIndex);
      const passActive = JR_PASS_ACTIVE_DAYS.includes(dayIndex);
      const coveredItems = dayTransports.filter((t) => t.coveredByJRPass);
      const totalWithoutPass = coveredItems.reduce((sum, t) => sum + (t.price ?? 0), 0);

      // For multi-day pass analysis:
      // Day 2 alone: ~¥14,000 (not quite worth ¥15,000)
      // Days 2+3: ~¥17,000 (worth it!)
      // Days 2+3+4: ~¥17,200 (still worth, but day 4 adds little)
      const passUsed = passActive;
      const savings = passUsed ? totalWithoutPass : 0;

      // Determine if worth it considering the 3-day pass as a whole
      const totalPassValue = JR_PASS_ACTIVE_DAYS.reduce((sum, idx) => {
        const dayItems = getDayTransports(idx).filter((t) => t.coveredByJRPass);
        return sum + dayItems.reduce((s, t) => s + (t.price ?? 0), 0);
      }, 0);

      // Individual day worth-it depends on cumulative value
      const worthIt = passUsed && totalPassValue > JR_PASS_COST;

      return {
        dayIndex,
        totalWithoutPass,
        passUsed,
        savings,
        worthIt,
      };
    });
  };

  const getTotalJRPassSavings = (): number => {
    const jrValues = calculateJRPassValue();
    const totalCovered = jrValues.reduce((sum, v) => sum + v.savings, 0);
    return Math.max(0, totalCovered - JR_PASS_COST);
  };

  const totalPassValue = JR_PASS_ACTIVE_DAYS.reduce((sum, idx) => {
    const dayItems = getDayTransports(idx).filter((t) => t.coveredByJRPass);
    return sum + dayItems.reduce((s, t) => s + (t.price ?? 0), 0);
  }, 0);

  return {
    transports,
    getDayTransports,
    calculateJRPassValue,
    getTotalJRPassSavings,
    jrPassCost: JR_PASS_COST,
    totalPassValue,
    totalSavings: Math.max(0, totalPassValue - JR_PASS_COST),
    isJRPassWorthIt: totalPassValue > JR_PASS_COST,
    recommendedDays: [2, 3, 4], // Day indices 1, 2, 3 (displayed as 2, 3, 4)
  };
}
