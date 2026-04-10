export interface Station {
  id: string;
  name: string;
  nameTH: string;
  line: string;
  lineColor: string;
  lat: number;
  lng: number;
}

export interface RouteStep {
  from: string;
  to: string;
  line: string;
  lineColor: string;
  duration: number; // minutes
  stops: number;
  instruction?: string;
  instructionTH?: string;
}

export interface TrainRoute {
  id: string;
  from: string;
  to: string;
  totalTime: number; // minutes
  totalPrice: number; // yen
  transfers: number;
  steps: RouteStep[];
  tips: string[];
  tipsTH: string[];
  jrPassCovered: boolean;
}

export const stations: Station[] = [
  // Yamanote Line (Green)
  { id: 'tokyo', name: 'Tokyo', nameTH: 'โตเกียว (Tokyo)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.6812, lng: 139.7671 },
  { id: 'ueno', name: 'Ueno', nameTH: 'อุเอโนะ (Ueno)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.7138, lng: 139.7772 },
  { id: 'akihabara', name: 'Akihabara', nameTH: 'อากิฮาบาระ (Akihabara)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.6984, lng: 139.7731 },
  { id: 'ikebukuro', name: 'Ikebukuro', nameTH: 'อิเคะบุคุโระ (Ikebukuro)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.7295, lng: 139.7109 },
  { id: 'shinjuku', name: 'Shinjuku', nameTH: 'ชินจูกุ (Shinjuku)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.6896, lng: 139.7006 },
  { id: 'harajuku', name: 'Harajuku', nameTH: 'ฮาราจูกุ (Harajuku)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.6702, lng: 139.7026 },
  { id: 'shibuya', name: 'Shibuya', nameTH: 'ชิบุยะ (Shibuya)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.6580, lng: 139.7016 },
  { id: 'shinagawa', name: 'Shinagawa', nameTH: 'ชินากาวะ (Shinagawa)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.6284, lng: 139.7387 },
  { id: 'osaki', name: 'Osaki', nameTH: 'โอซากิ (Osaki)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.6197, lng: 139.7286 },
  { id: 'gotanda', name: 'Gotanda', nameTH: 'โกทันดะ (Gotanda)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.6258, lng: 139.7238 },
  { id: 'meguro', name: 'Meguro', nameTH: 'เมกุโระ (Meguro)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.6339, lng: 139.7158 },
  { id: 'ebisu', name: 'Ebisu', nameTH: 'เอบิสุ (Ebisu)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.6467, lng: 139.7101 },
  { id: 'yoyogi', name: 'Yoyogi', nameTH: 'โยโยงิ (Yoyogi)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.6830, lng: 139.7020 },
  { id: 'sendagaya', name: 'Sendagaya', nameTH: 'เซนดางายะ (Sendagaya)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.6841, lng: 139.7182 },
  { id: 'nishi-nippori', name: 'Nishi-Nippori', nameTH: 'นิชิ-นิปโปริ (Nishi-Nippori)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.7322, lng: 139.7672 },
  { id: 'tabata', name: 'Tabata', nameTH: 'ตาบาตะ (Tabata)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.7381, lng: 139.7608 },
  { id: 'komagome', name: 'Komagome', nameTH: 'โคมาโกเมะ (Komagome)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.7365, lng: 139.7469 },
  { id: 'sugamo', name: 'Sugamo', nameTH: 'สุงะโมะ (Sugamo)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.7334, lng: 139.7393 },
  { id: 'shin-okubo', name: 'Shin-Okubo', nameTH: 'ชิน-โอคุโบะ (Shin-Okubo)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.7012, lng: 139.7000 },
  { id: 'takadanobaba', name: 'Takadanobaba', nameTH: 'ทาคาดะโนะบาบะ (Takadanobaba)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.7128, lng: 139.7035 },
  { id: 'mejiro', name: 'Mejiro', nameTH: 'เมจิโระ (Mejiro)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.7212, lng: 139.7063 },
  { id: 'oimachi', name: 'Oimachi', nameTH: 'โออิมะชิ (Oimachi)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.6126, lng: 139.7305 },
  { id: 'hamamatsucho', name: 'Hamamatsucho', nameTH: 'ฮามามัตสึโจ (Hamamatsucho)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.6556, lng: 139.7572 },
  { id: 'tamachi', name: 'Tamachi', nameTH: 'ตามะชิ (Tamachi)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.6457, lng: 139.7475 },
  { id: 'takanawa-gateway', name: 'Takanawa Gateway', nameTH: 'ทาคานาวะ เกตเวย์ (Takanawa Gateway)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.6348, lng: 139.7406 },
  { id: 'kanda', name: 'Kanda', nameTH: 'คันดะ (Kanda)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.6914, lng: 139.7707 },
  { id: 'okachimachi', name: 'Okachimachi', nameTH: 'โอคาจิมาชิ (Okachimachi)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.7076, lng: 139.7746 },
  { id: 'nippori', name: 'Nippori', nameTH: 'นิปโปริ (Nippori)', line: 'Yamanote Line', lineColor: '#80C244', lat: 35.7362, lng: 139.7669 },

  // Tokyo Metro Ginza Line (Orange)
  { id: 'asakusa', name: 'Asakusa', nameTH: 'อาซากุสะ (Asakusa)', line: 'Ginza Line', lineColor: '#FF9500', lat: 35.7108, lng: 139.7967 },
  { id: 'ginza', name: 'Ginza', nameTH: 'กินซะ (Ginza)', line: 'Ginza Line', lineColor: '#FF9500', lat: 35.6719, lng: 139.7638 },
  { id: 'ueno-ginza', name: 'Ueno (Ginza Line)', nameTH: 'อุเอโนะ (Ginza Line)', line: 'Ginza Line', lineColor: '#FF9500', lat: 35.7114, lng: 139.7749 },

  // Chuo Line (Yellow)
  { id: 'nakano', name: 'Nakano', nameTH: 'นากาโนะ (Nakano)', line: 'Chuo Line', lineColor: '#F15A22', lat: 35.7056, lng: 139.6647 },
  { id: 'yotsuya', name: 'Yotsuya', nameTH: 'โยทสึยะ (Yotsuya)', line: 'Chuo Line', lineColor: '#F15A22', lat: 35.6851, lng: 139.7304 },
  { id: 'shinbashi', name: 'Shinbashi', nameTH: 'ชินบาชิ (Shinbashi)', line: 'Chuo Line', lineColor: '#F15A22', lat: 35.6661, lng: 139.7585 },

  // Keihin-Tohoku Line
  { id: 'akabane', name: 'Akabane', nameTH: 'อาคาบาเนะ (Akabane)', line: 'Keihin-Tohoku Line', lineColor: '#00B2E5', lat: 35.7778, lng: 139.7206 },
  { id: 'urawa', name: 'Urawa', nameTH: 'อุระวะ (Urawa)', line: 'Keihin-Tohoku Line', lineColor: '#00B2E5', lat: 35.8617, lng: 139.6455 },
  { id: 'yokohama', name: 'Yokohama', nameTH: 'โยโกฮามะ (Yokohama)', line: 'Keihin-Tohoku Line', lineColor: '#00B2E5', lat: 35.4658, lng: 139.6221 },
  { id: 'sakuragicho', name: 'Sakuragicho', nameTH: 'ซากุระงิโช (Sakuragicho)', line: 'Keihin-Tohoku Line', lineColor: '#00B2E5', lat: 35.4506, lng: 139.6304 },
  { id: 'kannai', name: 'Kannai', nameTH: 'คันไน (Kannai)', line: 'Keihin-Tohoku Line', lineColor: '#00B2E5', lat: 35.4437, lng: 139.6353 },
  { id: 'ishikawacho', name: 'Ishikawacho', nameTH: 'อิชิคาวะโช (Ishikawacho)', line: 'Keihin-Tohoku Line', lineColor: '#00B2E5', lat: 35.4367, lng: 139.6456 },
  { id: 'yamate', name: 'Yamate', nameTH: 'ยามาเตะ (Yamate)', line: 'Keihin-Tohoku Line', lineColor: '#00B2E5', lat: 35.4378, lng: 139.6548 },
  { id: 'negishi', name: 'Negishi', nameTH: 'เนงิชิ (Negishi)', line: 'Keihin-Tohoku Line', lineColor: '#00B2E5', lat: 35.4336, lng: 139.6617 },

  // Sobu Line
  { id: 'chiba', name: 'Chiba', nameTH: 'ชิบะ (Chiba)', line: 'Sobu Line', lineColor: '#FFD400', lat: 35.6074, lng: 140.1063 },
  { id: 'funabashi', name: 'Funabashi', nameTH: 'ฟุนาบาชิ (Funabashi)', line: 'Sobu Line', lineColor: '#FFD400', lat: 35.6947, lng: 139.9827 },
  { id: 'kinshicho', name: 'Kinshicho', nameTH: 'คินชิโช (Kinshicho)', line: 'Sobu Line', lineColor: '#FFD400', lat: 35.6969, lng: 139.8146 },
  { id: 'ryo', name: 'Ryogoku', nameTH: 'เรียวโงกุ (Ryogoku)', line: 'Sobu Line', lineColor: '#FFD400', lat: 35.6967, lng: 139.7933 },

  // Keisei Line
  { id: 'narita-airport', name: 'Narita Airport', nameTH: 'สนามบินนาริตะ (Narita Airport)', line: 'Keisei Line', lineColor: '#007AC0', lat: 35.7647, lng: 140.3862 },
  { id: 'keisei-ueno', name: 'Keisei Ueno', nameTH: 'เคเซอุเอโนะ (Keisei Ueno)', line: 'Keisei Line', lineColor: '#007AC0', lat: 35.7114, lng: 139.7749 },
  { id: 'nippori', name: 'Nippori', nameTH: 'นิปโปริ (Nippori)', line: 'Keisei Line', lineColor: '#007AC0', lat: 35.7362, lng: 139.7669 },

  // Yokosuka Line
  { id: 'kamakura', name: 'Kamakura', nameTH: 'คามะคุระ (Kamakura)', line: 'Yokosuka Line', lineColor: '#00AC90', lat: 35.3191, lng: 139.5467 },
  { id: 'hase', name: 'Hase', nameTH: 'ฮาเซะ (Hase)', line: 'Enoden Line', lineColor: '#FF6B35', lat: 35.3126, lng: 139.5348 },
  { id: 'ofuna', name: 'Ofuna', nameTH: 'โอฟุนะ (Ofuna)', line: 'Yokosuka Line', lineColor: '#00AC90', lat: 35.3384, lng: 139.5283 },
  { id: 'totsuka', name: 'Totsuka', nameTH: 'โทะทสึกะ (Totsuka)', line: 'Yokosuka Line', lineColor: '#00AC90', lat: 35.3765, lng: 139.5334 },
  { id: 'higashi-totsuka', name: 'Higashi-Totsuka', nameTH: 'ฮิงะชิ-โทะทสึกะ (Higashi-Totsuka)', line: 'Yokosuka Line', lineColor: '#00AC90', lat: 35.3811, lng: 139.5531 },

  // Shinkansen
  { id: 'gala-yuzawa', name: 'Gala Yuzawa', nameTH: 'กาล่า ยูซาวะ (Gala Yuzawa)', line: 'Joetsu Shinkansen', lineColor: '#DA251E', lat: 36.8681, lng: 138.9361 },
  { id: 'niigata', name: 'Niigata', nameTH: 'นีงาตะ (Niigata)', line: 'Joetsu Shinkansen', lineColor: '#DA251E', lat: 37.9189, lng: 139.0361 },
  { id: 'nagano', name: 'Nagano', nameTH: 'นากาโนะ (Nagano)', line: 'Hokuriku Shinkansen', lineColor: '#00A7DB', lat: 36.6486, lng: 138.1948 },
  { id: 'karuizawa', name: 'Karuizawa', nameTH: 'คารุอิซาวะ (Karuizawa)', line: 'Hokuriku Shinkansen', lineColor: '#00A7DB', lat: 36.3481, lng: 138.6103 },

  // Tobu Line
  { id: 'kawagoe', name: 'Kawagoe', nameTH: 'คาวาโกเอะ (Kawagoe)', line: 'Tobu Tojo Line', lineColor: '#0068B8', lat: 35.9252, lng: 139.4856 },

  // Odakyu Line
  { id: 'shimokitazawa', name: 'Shimokitazawa', nameTH: 'ชิโมคิตะซาวะ (Shimokitazawa)', line: 'Odakyu Line', lineColor: '#448831', lat: 35.6610, lng: 139.6681 },
  { id: 'odawara', name: 'Odawara', nameTH: 'โอดะวะระ (Odawara)', line: 'Odakyu Line', lineColor: '#448831', lat: 35.2559, lng: 139.1563 },
  { id: 'hakone-yumoto', name: 'Hakone-Yumoto', nameTH: 'ฮาโกเน่-ยุโมโทะ (Hakone-Yumoto)', line: 'Odakyu Line', lineColor: '#448831', lat: 35.2332, lng: 139.1075 },

  // Toei Asakusa Line
  { id: 'nihombashi', name: 'Nihombashi', nameTH: 'นิฮมบะชิ (Nihombashi)', line: 'Asakusa Line', lineColor: '#E85482', lat: 35.6810, lng: 139.7743 },

  // Rinkai Line
  { id: 'tokyo-teleport', name: 'Tokyo Teleport', nameTH: 'โตเกียว เทเลพอร์ต (Tokyo Teleport)', line: 'Rinkai Line', lineColor: '#E60012', lat: 35.6258, lng: 139.7755 },
  { id: 'shin-kiba', name: 'Shin-Kiba', nameTH: 'ชิน-คิบะ (Shin-Kiba)', line: 'Rinkai Line', lineColor: '#E60012', lat: 35.6427, lng: 139.8267 },

  // Tokyo Monorail
  { id: 'haneda-airport', name: 'Haneda Airport', nameTH: 'สนามบินฮาเนดะ (Haneda Airport)', line: 'Tokyo Monorail', lineColor: '#003B9B', lat: 35.5494, lng: 139.7798 },
];

export const trainRoutes: TrainRoute[] = [
  // === AIRPORT ROUTES ===
  {
    id: 'narita-ueno',
    from: 'narita-airport',
    to: 'ueno',
    totalTime: 45,
    totalPrice: 2600,
    transfers: 0,
    steps: [
      {
        from: 'narita-airport',
        to: 'ueno',
        line: 'Keisei Skyliner',
        lineColor: '#007AC0',
        duration: 41,
        stops: 3,
        instruction: 'Direct Skyliner to Keisei Ueno. Departures every 20-40 minutes.',
        instructionTH: 'Skyliner ตรงไป Keisei Ueno ออกรถทุก 20-40 นาที',
      },
    ],
    tips: ['Book tickets online in advance for ¥2,400 discount price', 'Luggage space available on all Skyliner trains'],
    tipsTH: ['จองตั๋วล่วงหน้าออนไลน์ราคา ¥2,400', 'มีที่เก็บกระเป๋าบนรถไฟ Skyliner ทุกขบวน'],
    jrPassCovered: false,
  },
  {
    id: 'ueno-narita',
    from: 'ueno',
    to: 'narita-airport',
    totalTime: 45,
    totalPrice: 2600,
    transfers: 0,
    steps: [
      {
        from: 'ueno',
        to: 'narita-airport',
        line: 'Keisei Skyliner',
        lineColor: '#007AC0',
        duration: 41,
        stops: 3,
        instruction: 'Direct Skyliner from Keisei Ueno to Narita Airport.',
        instructionTH: 'Skyliner ตรงจาก Keisei Ueno ไปสนามบินนาริตะ',
      },
    ],
    tips: ['Arrive at least 2 hours before your flight', 'Book return ticket in advance for discount'],
    tipsTH: ['ถึงสนามบินอย่างน้อย 2 ชั่วโมงก่อนเที่ยวบิน', 'จองตั๋วขากลับล่วงหน้าเพื่อรับส่วนลด'],
    jrPassCovered: false,
  },
  {
    id: 'narita-tokyo',
    from: 'narita-airport',
    to: 'tokyo',
    totalTime: 60,
    totalPrice: 3070,
    transfers: 0,
    steps: [
      {
        from: 'narita-airport',
        to: 'tokyo',
        line: 'Narita Express (N\'EX)',
        lineColor: '#DA251E',
        duration: 60,
        stops: 5,
        instruction: 'Direct N\'EX to Tokyo Station. Reserved seats only.',
        instructionTH: 'N\'EX ตรงไปสถานีโตเกียว ที่นั่งสำรองเท่านั้น',
      },
    ],
    tips: ['Covered by JR Tokyo Wide Pass', 'Round-trip ticket available for ¥4,070 (valid 14 days)', 'Free Wi-Fi on board'],
    tipsTH: ['ครอบคลุมโดย JR Tokyo Wide Pass', 'มีตั๋วไป-กลับ ¥4,070 (ใช้ได้ 14 วัน)', 'มี Wi-Fi ฟรีบนรถไฟ'],
    jrPassCovered: true,
  },
  {
    id: 'haneda-shinagawa',
    from: 'haneda-airport',
    to: 'shinagawa',
    totalTime: 13,
    totalPrice: 500,
    transfers: 0,
    steps: [
      {
        from: 'haneda-airport',
        to: 'shinagawa',
        line: 'Tokyo Monorail',
        lineColor: '#003B9B',
        duration: 13,
        stops: 3,
        instruction: 'Tokyo Monorail to Hamamatsucho, then JR Yamanote to Shinagawa.',
        instructionTH: 'Tokyo Monorail ไป Hamamatsucho แล้วเปลี่ยน JR Yamanote ไป Shinagawa',
      },
    ],
    tips: ['JR Pass covers Tokyo Monorail', 'Fastest route from Haneda to central Tokyo'],
    tipsTH: ['JR Pass ครอบคลุม Tokyo Monorail', 'เส้นทางเร็วที่สุดจากฮาเนดะไปกลางโตเกียว'],
    jrPassCovered: true,
  },
  {
    id: 'haneda-shibuya',
    from: 'haneda-airport',
    to: 'shibuya',
    totalTime: 40,
    totalPrice: 580,
    transfers: 1,
    steps: [
      {
        from: 'haneda-airport',
        to: 'hamamatsucho',
        line: 'Tokyo Monorail',
        lineColor: '#003B9B',
        duration: 18,
        stops: 5,
        instruction: 'Tokyo Monorail to Hamamatsucho.',
        instructionTH: 'Tokyo Monorail ไป Hamamatsucho',
      },
      {
        from: 'hamamatsucho',
        to: 'shibuya',
        line: 'JR Yamanote Line',
        lineColor: '#80C244',
        duration: 22,
        stops: 10,
        instruction: 'JR Yamanote Line (outer loop) to Shibuya.',
        instructionTH: 'JR Yamanote Line (วนนอก) ไป Shibuya',
      },
    ],
    tips: ['JR Pass covers the entire journey', 'Alternative: Keikyu Line + Asakusa Line + Ginza Line (¥620, 45 min)'],
    tipsTH: ['JR Pass ครอบคลุมตลอดเส้นทาง', 'ทางเลือก: สาย Keikyu + Asakusa + Ginza (¥620, 45 นาที)'],
    jrPassCovered: true,
  },

  // === YAMANOTE LINE (Major Routes) ===
  {
    id: 'tokyo-shinjuku',
    from: 'tokyo',
    to: 'shinjuku',
    totalTime: 14,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'tokyo',
        to: 'shinjuku',
        line: 'JR Chuo Line (Rapid)',
        lineColor: '#F15A22',
        duration: 14,
        stops: 4,
        instruction: 'Direct Chuo Line Rapid from Tokyo to Shinjuku. Trains every 3-5 min.',
        instructionTH: 'สาย Chuo Rapid ตรงจาก Tokyo ไป Shinjuku รถออกทุก 3-5 นาที',
      },
    ],
    tips: ['Fastest route: Chuo Line Rapid (skip Yamanote)', 'Yamanote Line also available (20 min, same price)', 'Avoid rush hour (7:30-9:00 AM) if possible'],
    tipsTH: ['เส้นทางเร็วสุด: สาย Chuo Rapid (ข้าม Yamanote)', 'สาย Yamanote ก็มี (20 นาที ราคาเดียวกัน)', 'หลีกเลี่ยงชั่วโมงเร่งด่วน (7:30-9:00 น.) ถ้าทำได้'],
    jrPassCovered: true,
  },
  {
    id: 'shinjuku-shibuya',
    from: 'shinjuku',
    to: 'shibuya',
    totalTime: 7,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'shinjuku',
        to: 'shibuya',
        line: 'JR Yamanote Line',
        lineColor: '#80C244',
        duration: 7,
        stops: 3,
        instruction: 'JR Yamanote Line (inner loop) to Shibuya.',
        instructionTH: 'JR Yamanote Line (วนใน) ไป Shibuya',
      },
    ],
    tips: ['Very frequent service - trains every 2-3 minutes', 'Can also walk to Harajuku (1 stop before Shibuya)'],
    tipsTH: ['บริการบ่อยมาก - รถออกทุก 2-3 นาที', 'สามารถเดินไป Harajuku ได้ (1 สถานีถึง Shibuya)'],
    jrPassCovered: true,
  },
  {
    id: 'shibuya-harajuku',
    from: 'shibuya',
    to: 'harajuku',
    totalTime: 3,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'shibuya',
        to: 'harajuku',
        line: 'JR Yamanote Line',
        lineColor: '#80C244',
        duration: 3,
        stops: 1,
        instruction: 'JR Yamanote Line (inner loop) to Harajuku. Just 1 stop!',
        instructionTH: 'JR Yamanote Line (วนใน) ไป Harajuku แค่ 1 สถานี!',
      },
    ],
    tips: ['Easy 15-min walk along Omotesando if weather is nice', 'Harajuku is famous for Takeshita Street and crepes'],
    tipsTH: ['เดิน 15 นาทีตามถนน Omotesando ถ้าอากาศดี', 'Harajuku มีชื่อเสียงจากถนน Takeshita และเครป'],
    jrPassCovered: true,
  },
  {
    id: 'harajuku-shinjuku',
    from: 'harajuku',
    to: 'shinjuku',
    totalTime: 4,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'harajuku',
        to: 'shinjuku',
        line: 'JR Yamanote Line',
        lineColor: '#80C244',
        duration: 4,
        stops: 2,
        instruction: 'JR Yamanote Line (inner loop) to Shinjuku.',
        instructionTH: 'JR Yamanote Line (วนใน) ไป Shinjuku',
      },
    ],
    tips: ['15-min walk through Yoyogi Park if weather permits', 'Yoyogi Park is beautiful for cherry blossoms (early April)'],
    tipsTH: ['เดิน 15 นาทีผ่านสวน Yoyogi ถ้าอากาศดี', 'สวน Yoyogi สวยมากช่วงดอกซากุระ (ต้น เม.ย.)'],
    jrPassCovered: true,
  },
  {
    id: 'ueno-akihabara',
    from: 'ueno',
    to: 'akihabara',
    totalTime: 4,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'ueno',
        to: 'akihabara',
        line: 'JR Yamanote Line',
        lineColor: '#80C244',
        duration: 4,
        stops: 2,
        instruction: 'JR Yamanote Line (inner loop) to Akihabara.',
        instructionTH: 'JR Yamanote Line (วนใน) ไป Akihabara',
      },
    ],
    tips: ['Easy 15-min walk or short train ride', 'Akihabara electronics shops open around 10-11 AM'],
    tipsTH: ['เดิน 15 นาทีหรือนั่งรถไฟสั้นๆ', 'ร้านอิเล็กทรอนิกส์อากิฮาบาระเปิดประมาณ 10-11 โมง'],
    jrPassCovered: true,
  },
  {
    id: 'tokyo-akihabara',
    from: 'tokyo',
    to: 'akihabara',
    totalTime: 5,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'tokyo',
        to: 'akihabara',
        line: 'JR Yamanote Line',
        lineColor: '#80C244',
        duration: 5,
        stops: 2,
        instruction: 'JR Yamanote Line (inner loop) to Akihabara.',
        instructionTH: 'JR Yamanote Line (วนใน) ไป Akihabara',
      },
    ],
    tips: ['Can also walk (20 min) through Imperial Palace area', 'Akihabara Electric Town is the main attraction'],
    tipsTH: ['สามารถเดินได้ (20 นาที) ผ่านพื้นที่วังอิมพีเรียล', 'อากิฮาบาระ Electric Town เป็นจุดท่องเที่ยวหลัก'],
    jrPassCovered: true,
  },
  {
    id: 'akihabara-asakusa',
    from: 'akihabara',
    to: 'asakusa',
    totalTime: 15,
    totalPrice: 310,
    transfers: 1,
    steps: [
      {
        from: 'akihabara',
        to: 'asakusa',
        line: 'Toei Oedo Line',
        lineColor: '#E85482',
        duration: 15,
        stops: 5,
        instruction: 'Walk to Akihabara Station, take Toei Oedo Line to Asakusa.',
        instructionTH: 'เดินไปสถานี Akihabara นั่งสาย Toei Oedo ไป Asakusa',
      },
    ],
    tips: ['Alternative: Ginza Line from Suehirocho (5-min walk from Akihabara)', 'Senso-ji Temple is 5-min walk from Asakusa Station'],
    tipsTH: ['ทางเลือก: สาย Ginza จาก Suehirocho (เดิน 5 นาทีจาก Akihabara)', 'วัด Senso-ji เดิน 5 นาทีจากสถานี Asakusa'],
    jrPassCovered: false,
  },
  {
    id: 'tokyo-ueno',
    from: 'tokyo',
    to: 'ueno',
    totalTime: 7,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'tokyo',
        to: 'ueno',
        line: 'JR Yamanote Line',
        lineColor: '#80C244',
        duration: 7,
        stops: 3,
        instruction: 'JR Yamanote Line (inner loop) to Ueno.',
        instructionTH: 'JR Yamanote Line (วนใน) ไป Ueno',
      },
    ],
    tips: ['Ueno Park has multiple museums (many free)', 'Ameyoko market near Ueno Station is great for shopping'],
    tipsTH: ['สวน Ueno มีพิพิธภัณฑ์หลายแห่ง (หลายแห่งฟรี)', 'ตลาด Ameyoko ใกล้สถานี Ueno เหมาะสำหรับการช็อปปิ้ง'],
    jrPassCovered: true,
  },
  {
    id: 'ueno-ikebukuro',
    from: 'ueno',
    to: 'ikebukuro',
    totalTime: 12,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'ueno',
        to: 'ikebukuro',
        line: 'JR Yamanote Line',
        lineColor: '#80C244',
        duration: 12,
        stops: 6,
        instruction: 'JR Yamanote Line (inner loop) to Ikebukuro.',
        instructionTH: 'JR Yamanote Line (วนใน) ไป Ikebukuro',
      },
    ],
    tips: ['Ikebukuro has Sunshine City mall and Pokemon Center', 'Less crowded than Shinjuku/Shibuya for shopping'],
    tipsTH: ['Ikebukuro มีห้าง Sunshine City และ Pokemon Center', 'ไม่แออัดเท่า Shinjuku/Shibuya สำหรับการช็อปปิ้ง'],
    jrPassCovered: true,
  },
  {
    id: 'shinjuku-ikebukuro',
    from: 'shinjuku',
    to: 'ikebukuro',
    totalTime: 10,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'shinjuku',
        to: 'ikebukuro',
        line: 'JR Yamanote Line',
        lineColor: '#80C244',
        duration: 10,
        stops: 5,
        instruction: 'JR Yamanote Line (outer loop) to Ikebukuro.',
        instructionTH: 'JR Yamanote Line (วนนอก) ไป Ikebukuro',
      },
    ],
    tips: ['Direct Yamanote Line in both directions', 'Both are major shopping districts'],
    tipsTH: ['สาย Yamanote ตรงทั้งสองทิศทาง', 'ทั้งสองย่านเป็นย่านช็อปปิ้งใหญ่'],
    jrPassCovered: true,
  },
  {
    id: 'shibuya-shinagawa',
    from: 'shibuya',
    to: 'shinagawa',
    totalTime: 13,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'shibuya',
        to: 'shinagawa',
        line: 'JR Yamanote Line',
        lineColor: '#80C244',
        duration: 13,
        stops: 6,
        instruction: 'JR Yamanote Line (outer loop) to Shinagawa.',
        instructionTH: 'JR Yamanote Line (วนนอก) ไป Shinagawa',
      },
    ],
    tips: ['Shinagawa is a Shinkansen stop (for trips to Kyoto/Osaka)', 'Good area for business hotels'],
    tipsTH: ['Shinagawa เป็นจุดจอด Shinkansen (สำหรับไปเกียวซ่า/โอซาก้า)', 'ย่านนี้มีโรงแรมธุรกิจดีๆ เยอะ'],
    jrPassCovered: true,
  },

  // === KAMAKURA ROUTES ===
  {
    id: 'tokyo-kamakura',
    from: 'tokyo',
    to: 'kamakura',
    totalTime: 60,
    totalPrice: 1000,
    transfers: 0,
    steps: [
      {
        from: 'tokyo',
        to: 'kamakura',
        line: 'JR Yokosuka Line',
        lineColor: '#00AC90',
        duration: 60,
        stops: 13,
        instruction: 'Direct JR Yokosuka Line from Tokyo to Kamakura. Reserved seats available.',
        instructionTH: 'JR Yokosuka Line ตรงจาก Tokyo ไป Kamakura มีที่นั่งสำรอง',
      },
    ],
    tips: ['Get window seat for Tokyo Bay views on return', 'JR Pass covers entire journey', 'Great Buddha is 10-min bus ride from station'],
    tipsTH: ['เลือกที่นั่งริมหน้าต่างชมวิวอ่าวโตเกียวขากลับ', 'JR Pass ครอบคลุมตลอดเส้นทาง', 'พระใหญ่โอดะวะระนั่งบัส 10 นาทีจากสถานี'],
    jrPassCovered: true,
  },
  {
    id: 'shinjuku-kamakura',
    from: 'shinjuku',
    to: 'kamakura',
    totalTime: 70,
    totalPrice: 1000,
    transfers: 1,
    steps: [
      {
        from: 'shinjuku',
        to: 'tokyo',
        line: 'JR Chuo Line (Rapid)',
        lineColor: '#F15A22',
        duration: 14,
        stops: 4,
        instruction: 'Chuo Line Rapid to Tokyo Station.',
        instructionTH: 'สาย Chuo Rapid ไปสถานี Tokyo',
      },
      {
        from: 'tokyo',
        to: 'kamakura',
        line: 'JR Yokosuka Line',
        lineColor: '#00AC90',
        duration: 56,
        stops: 13,
        instruction: 'Transfer at Tokyo Station to Yokosuka Line (same platform usually).',
        instructionTH: 'เปลี่ยนสายที่สถานี Tokyo ไปสาย Yokosuka (มักจะชานชาลาเดียวกัน)',
      },
    ],
    tips: ['Can also take Shonan-Shinjuku Line direct from Shinjuku (less frequent)', 'JR Pass covers entire journey'],
    tipsTH: ['สามารถนั่งสาย Shonan-Shinjuku ตรงจาก Shinjuku ได้ (รถออกน้อยกว่า)', 'JR Pass ครอบคลุมตลอดเส้นทาง'],
    jrPassCovered: true,
  },
  {
    id: 'kamakura-great-buddha',
    from: 'kamakura',
    to: 'hase',
    totalTime: 10,
    totalPrice: 300,
    transfers: 0,
    steps: [
      {
        from: 'kamakura',
        to: 'hase',
        line: 'Enoden Tram',
        lineColor: '#FF6B35',
        duration: 10,
        stops: 5,
        instruction: 'Enoden electric tram from Kamakura to Hase Station. Great Buddha is 3-min walk.',
        instructionTH: 'รถราง Enoden จาก Kamakura ไปสถานี Hase พระใหญ่เดิน 3 นาที',
      },
    ],
    tips: ['Entrance fee: ¥300 per person', 'Enoden is NOT covered by JR Pass', 'Kamakura day pass for buses: ¥600'],
    tipsTH: ['ค่าเข้า: ¥300 ต่อคน', 'Enoden ไม่ครอบคลุมโดย JR Pass', 'Day pass สำหรับรถบัส Kamakura: ¥600'],
    jrPassCovered: false,
  },

  // === SHINKANSEN ROUTES ===
  {
    id: 'ueno-gala-yuzawa',
    from: 'ueno',
    to: 'gala-yuzawa',
    totalTime: 75,
    totalPrice: 7000,
    transfers: 0,
    steps: [
      {
        from: 'ueno',
        to: 'gala-yuzawa',
        line: 'Joetsu Shinkansen (Tanigawa)',
        lineColor: '#DA251E',
        duration: 75,
        stops: 3,
        instruction: 'Direct Shinkansen from Ueno to Gala Yuzawa. Reserved seats recommended.',
        instructionTH: 'Shinkansen ตรงจาก Ueno ไป Gala Yuzawa แนะนำที่นั่งสำรอง',
      },
    ],
    tips: ['JR Tokyo Wide Pass covers round trip (¥14,000 value)', 'Reserve seats at JR East Travel Service Center', 'Seasonal: usually December to May only', 'Gala Yuzawa station connects directly to ski resort'],
    tipsTH: ['JR Tokyo Wide Pass ครอบคลุมไป-กลับ (มูลค่า ¥14,000)', 'จองที่นั่งที่ JR East Travel Service Center', 'เปิดเฉพาะฤดูกาล: ปกติ ธ.ค. - พ.ค.', 'สถานี Gala Yuzawa เชื่อมตรงไปยังสกีรีสอร์ท'],
    jrPassCovered: true,
  },
  {
    id: 'tokyo-nagano',
    from: 'tokyo',
    to: 'nagano',
    totalTime: 80,
    totalPrice: 8500,
    transfers: 0,
    steps: [
      {
        from: 'tokyo',
        to: 'nagano',
        line: 'Hokuriku Shinkansen (Kagayaki/Hakutaka)',
        lineColor: '#00A7DB',
        duration: 80,
        stops: 2,
        instruction: 'Direct Shinkansen from Tokyo to Nagano.',
        instructionTH: 'Shinkansen ตรงจาก Tokyo ไป Nagano',
      },
    ],
    tips: ['JR Tokyo Wide Pass covers this route', 'Famous for Zenko-ji Temple and soba noodles', '1998 Winter Olympics host city'],
    tipsTH: ['JR Tokyo Wide Pass ครอบคลุมเส้นทางนี้', 'มีชื่อเสียงจากวัด Zenko-ji และโซบะ', 'เมืองเจ้าภาพโอลิมปิกฤดูหนาว 1998'],
    jrPassCovered: true,
  },

  // === SUBURBAN ROUTES ===
  {
    id: 'ikebukuro-kawagoe',
    from: 'ikebukuro',
    to: 'kawagoe',
    totalTime: 30,
    totalPrice: 600,
    transfers: 0,
    steps: [
      {
        from: 'ikebukuro',
        to: 'kawagoe',
        line: 'Tobu Tojo Line (Rapid)',
        lineColor: '#0068B8',
        duration: 30,
        stops: 9,
        instruction: 'Direct Tobu Tojo Line Rapid from Ikebukuro to Kawagoe.',
        instructionTH: 'สาย Tobu Tojo Rapid ตรงจาก Ikebukuro ไป Kawagoe',
      },
    ],
    tips: ['NOT covered by JR Pass (Tobu Railway)', 'Known as "Little Edo" for historic buildings', 'Try sweet potato treats - Kawagoe\'s specialty!', 'Suica/Pasmo works on Tobu Line'],
    tipsTH: ['ไม่ครอบคลุมโดย JR Pass (รถไฟ Tobu)', 'ได้ชื่อว่าเป็น "เอโดะน้อย" จากอาคารประวัติศาสตร์', 'ลองขนมมันหวาน - ของขึ้นชื่อของ Kawagoe!', 'Suica/Pasmo ใช้กับสาย Tobu ได้'],
    jrPassCovered: false,
  },
  {
    id: 'shinjuku-shimokitazawa',
    from: 'shinjuku',
    to: 'shimokitazawa',
    totalTime: 10,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'shinjuku',
        to: 'shimokitazawa',
        line: 'Odakyu Line (Local)',
        lineColor: '#448831',
        duration: 10,
        stops: 3,
        instruction: 'Direct Odakyu Line Local from Shinjuku to Shimokitazawa.',
        instructionTH: 'สาย Odakyu Local ตรงจาก Shinjuku ไป Shimokitazawa',
      },
    ],
    tips: ['NOT covered by JR Pass (Odakyu Railway)', 'Famous for vintage/thrift shopping and live music', 'Suica/Pasmo works on Odakyu Line', 'Great indie theater scene'],
    tipsTH: ['ไม่ครอบคลุมโดย JR Pass (รถไฟ Odakyu)', 'มีชื่อเสียงร้านขายของเก่า/มือสองและดนตรีสด', 'Suica/Pasmo ใช้กับสาย Odakyu ได้', 'มีละครอินดี้อิสระยอดเยี่ยม'],
    jrPassCovered: false,
  },
  {
    id: 'shinjuku-odawara',
    from: 'shinjuku',
    to: 'odawara',
    totalTime: 75,
    totalPrice: 1000,
    transfers: 0,
    steps: [
      {
        from: 'shinjuku',
        to: 'odawara',
        line: 'Odakyu Romancecar',
        lineColor: '#448831',
        duration: 75,
        stops: 5,
        instruction: 'Direct Odakyu Romancecar from Shinjuku to Odawara. Reserved seats recommended.',
        instructionTH: 'Odakyu Romancecar ตรงจาก Shinjuku ไป Odawara แนะนำที่นั่งสำรอง',
      },
    ],
    tips: ['Gate to Hakone area (hot springs, Mt. Fuji views)', 'Romancecar reserved seat surcharge: ¥520', 'JR Pass covers alternative route via Tokaido Line'],
    tipsTH: ['ประตูสู่พื้นที่ Hakone (น้ำพุร้อน, วิวภูเขาฟูจิ)', 'Romancecar ค่าสำรองที่นั่ง: ¥520', 'JR Pass ครอบคลุมเส้นทางทางเลือกผ่านสาย Tokaido'],
    jrPassCovered: false,
  },

  // === POPULAR TOURIST ROUTES ===
  {
    id: 'asakusa-ginza',
    from: 'asakusa',
    to: 'ginza',
    totalTime: 15,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'asakusa',
        to: 'ginza',
        line: 'Tokyo Metro Ginza Line',
        lineColor: '#FF9500',
        duration: 15,
        stops: 6,
        instruction: 'Direct Ginza Line from Asakusa to Ginza.',
        instructionTH: 'สาย Ginza ตรงจาก Asakusa ไป Ginza',
      },
    ],
    tips: ['Ginza is famous for luxury shopping and department stores', 'Great for lunch deals at department store basements'],
    tipsTH: ['กินซะมีชื่อเสียงจากการช็อปปิ้งแบรนด์เนมและห้างสรรพสินค้า', 'เหมาะสำหรับอาหารกลางวันราคาถูกที่ชั้นใต้ดินห้าง'],
    jrPassCovered: false,
  },
  {
    id: 'tokyo-ginza',
    from: 'tokyo',
    to: 'ginza',
    totalTime: 5,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'tokyo',
        to: 'ginza',
        line: 'Tokyo Metro Marunouchi Line',
        lineColor: '#F62E36',
        duration: 5,
        stops: 2,
        instruction: 'Metro Marunouchi Line to Ginza (or 10-min walk).',
        instructionTH: 'Metro สาย Marunouchi ไป Ginza (หรือเดิน 10 นาที)',
      },
    ],
    tips: ['Can easily walk from Tokyo Station through Imperial Palace grounds', 'Ginza shopping arcades open around 11 AM'],
    tipsTH: ['สามารถเดินจากสถานี Tokyo ผ่านพื้นที่วังอิมพีเรียล', 'ห้างสรรพสินค้ากินซะเปิดประมาณ 11 โมง'],
    jrPassCovered: false,
  },
  {
    id: 'ueno-asakusa',
    from: 'ueno',
    to: 'asakusa',
    totalTime: 5,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'ueno',
        to: 'asakusa',
        line: 'Tokyo Metro Ginza Line',
        lineColor: '#FF9500',
        duration: 5,
        stops: 2,
        instruction: 'Direct Ginza Line from Ueno to Asakusa. Only 2 stops!',
        instructionTH: 'สาย Ginza ตรงจาก Ueno ไป Asakusa แค่ 2 สถานี!',
      },
    ],
    tips: ['Can also walk (20 min) through Sumida Park along the river', 'Senso-ji Temple is Tokyo\'s oldest Buddhist temple'],
    tipsTH: ['สามารถเดินได้ (20 นาที) ผ่านสวน Sumida ตามแม่น้ำ', 'วัด Senso-ji เป็นวัดพุทธที่เก่าแก่ที่สุดในโตเกียว'],
    jrPassCovered: false,
  },
  {
    id: 'tokyo-ryogoku',
    from: 'tokyo',
    to: 'ryo',
    totalTime: 15,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'tokyo',
        to: 'ryo',
        line: 'JR Sobu Line',
        lineColor: '#FFD400',
        duration: 15,
        stops: 4,
        instruction: 'Direct JR Sobu Line from Tokyo to Ryogoku.',
        instructionTH: 'JR สาย Sobu ตรงจาก Tokyo ไป Ryogoku',
      },
    ],
    tips: ['Ryogoku is famous for sumo wrestling', 'Edo-Tokyo Museum is right outside the station', 'Sumo tournaments held in January, May, and September'],
    tipsTH: ['เรียวโงกุมีชื่อเสียงจากซูโม่', 'พิพิธภัณฑ์เอโดะ-โตเกียวอยู่หน้าสถานีเลย', 'ทัวร์นาเมนต์ซูโม่จัดในเดือน ม.ค., พ.ค., ก.ย.'],
    jrPassCovered: true,
  },
  {
    id: 'tokyo-odaiba',
    from: 'tokyo',
    to: 'tokyo-teleport',
    totalTime: 25,
    totalPrice: 480,
    transfers: 1,
    steps: [
      {
        from: 'tokyo',
        to: 'shinbashi',
        line: 'JR Yamanote Line',
        lineColor: '#80C244',
        duration: 8,
        stops: 3,
        instruction: 'JR Yamanote Line to Shimbashi.',
        instructionTH: 'JR Yamanote Line ไป Shimbashi',
      },
      {
        from: 'shinbashi',
        to: 'tokyo-teleport',
        line: 'Yurikamome Line',
        lineColor: '#E60012',
        duration: 17,
        stops: 9,
        instruction: 'Yurikamome automated transit system to Odaiba.',
        instructionTH: 'ระบบขนส่งอัตโนมัติ Yurikamome ไป Odaiba',
      },
    ],
    tips: ['Odaiba has teamLab Borderless, Gundam statue, and beach views', 'Yurikamome has great Rainbow Bridge views from the front car', 'NOT covered by JR Pass after Shimbashi'],
    tipsTH: ['Odaiba มี teamLab Borderless, รูปปั้นกันดั้ม และวิวชายหาด', 'Yurikamome มีวิวสะพาน Rainbow Bridge สวยจากตู้หน้า', 'ไม่ครอบคลุมโดย JR Pass หลังจาก Shimbashi'],
    jrPassCovered: false,
  },

  // === CROSS-TOWN ROUTES ===
  {
    id: 'shinjuku-nakano',
    from: 'shinjuku',
    to: 'nakano',
    totalTime: 8,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'shinjuku',
        to: 'nakano',
        line: 'JR Chuo Line (Rapid)',
        lineColor: '#F15A22',
        duration: 8,
        stops: 3,
        instruction: 'Direct Chuo Line Rapid from Shinjuku to Nakano.',
        instructionTH: 'สาย Chuo Rapid ตรงจาก Shinjuku ไป Nakano',
      },
    ],
    tips: ['Nakano Broadway is famous for anime/manga goods', 'Less touristy alternative to Akihabara'],
    tipsTH: ['Nakano Broadway มีชื่อเสียงจากสินค้าอนิเมะ/มังงะ', 'ทางเลือกที่ไม่ค่อยมีนักท่องเที่ยวเท่าอากิฮาบาระ'],
    jrPassCovered: true,
  },
  {
    id: 'shibuya-ebisu',
    from: 'shibuya',
    to: 'ebisu',
    totalTime: 5,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'shibuya',
        to: 'ebisu',
        line: 'JR Yamanote Line',
        lineColor: '#80C244',
        duration: 5,
        stops: 2,
        instruction: 'JR Yamanote Line (inner loop) to Ebisu.',
        instructionTH: 'JR Yamanote Line (วนใน) ไป Ebisu',
      },
    ],
    tips: ['Ebisu has great izakaya (Japanese pub) culture at night', 'Ebisu Garden Place is beautiful for evening walks'],
    tipsTH: ['Ebisu มีวัฒนธรรมอิซากายะ (ผับญี่ปุ่น) ยอดเยี่ยมในตอนกลางคืน', 'Ebisu Garden Place สวยงามสำหรับการเดินตอนเย็น'],
    jrPassCovered: true,
  },
  {
    id: 'shinagawa-yokohama',
    from: 'shinagawa',
    to: 'yokohama',
    totalTime: 25,
    totalPrice: 500,
    transfers: 0,
    steps: [
      {
        from: 'shinagawa',
        to: 'yokohama',
        line: 'JR Keihin-Tohoku Line',
        lineColor: '#00B2E5',
        duration: 25,
        stops: 7,
        instruction: 'Direct JR Keihin-Tohoku Line to Yokohama.',
        instructionTH: 'JR สาย Keihin-Tohoku ตรงไป Yokohama',
      },
    ],
    tips: ['Yokohama has Chinatown, Cup Noodle Museum, and waterfront', 'Faster option: Tokaido Line (17 min, ¥500)'],
    tipsTH: ['Yokohama มีไชน่าทาวน์, พิพิธภัณฑ์ Cup Noodle และริมน้ำ', 'ตัวเลือกที่เร็วกว่า: สาย Tokaido (17 นาที, ¥500)'],
    jrPassCovered: true,
  },
  {
    id: 'tokyo-yokohama',
    from: 'tokyo',
    to: 'yokohama',
    totalTime: 30,
    totalPrice: 500,
    transfers: 0,
    steps: [
      {
        from: 'tokyo',
        to: 'yokohama',
        line: 'JR Tokaido Line',
        lineColor: '#F15A22',
        duration: 30,
        stops: 6,
        instruction: 'Direct JR Tokaido Line from Tokyo to Yokohama.',
        instructionTH: 'JR สาย Tokaido ตรงจาก Tokyo ไป Yokohama',
      },
    ],
    tips: ['Fastest route: Tokaido Line (some trains 17 min)', 'Yokohama Minato Mirai area is great for evening views'],
    tipsTH: ['เส้นทางเร็วสุด: สาย Tokaido (บางขบวน 17 นาที)', 'พื้นที่ Yokohama Minato Mirai เหมาะชมวิวตอนเย็น'],
    jrPassCovered: true,
  },

  // === REVERSE ROUTES (Important for bidirectional search) ===
  {
    id: 'ueno-asakusa',
    from: 'ueno',
    to: 'asakusa',
    totalTime: 5,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'ueno',
        to: 'asakusa',
        line: 'Tokyo Metro Ginza Line',
        lineColor: '#FF9500',
        duration: 5,
        stops: 2,
        instruction: 'Direct Ginza Line from Ueno to Asakusa. Only 2 stops!',
        instructionTH: 'สาย Ginza ตรงจาก Ueno ไป Asakusa แค่ 2 สถานี!',
      },
    ],
    tips: ['Can also walk (20 min) through Sumida Park along the river', 'Senso-ji Temple is Tokyo\'s oldest Buddhist temple'],
    tipsTH: ['สามารถเดินได้ (20 นาที) ผ่านสวน Sumida ตามแม่น้ำ', 'วัด Senso-ji เป็นวัดพุทธที่เก่าแก่ที่สุดในโตเกียว'],
    jrPassCovered: false,
  },
  {
    id: 'asakusa-ueno',
    from: 'asakusa',
    to: 'ueno',
    totalTime: 5,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'asakusa',
        to: 'ueno',
        line: 'Tokyo Metro Ginza Line',
        lineColor: '#FF9500',
        duration: 5,
        stops: 2,
        instruction: 'Direct Ginza Line from Asakusa to Ueno.',
        instructionTH: 'สาย Ginza ตรงจาก Asakusa ไป Ueno',
      },
    ],
    tips: ['Ueno Park has multiple museums', 'Great for connecting to JR Yamanote Line'],
    tipsTH: ['สวน Ueno มีพิพิธภัณฑ์หลายแห่ง', 'เหมาะสำหรับเชื่อมต่อกับ JR Yamanote Line'],
    jrPassCovered: false,
  },
  {
    id: 'shibuya-shinjuku',
    from: 'shibuya',
    to: 'shinjuku',
    totalTime: 7,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'shibuya',
        to: 'shinjuku',
        line: 'JR Yamanote Line',
        lineColor: '#80C244',
        duration: 7,
        stops: 3,
        instruction: 'JR Yamanote Line (outer loop) to Shinjuku.',
        instructionTH: 'JR Yamanote Line (วนนอก) ไป Shinjuku',
      },
    ],
    tips: ['Very frequent service - trains every 2-3 minutes'],
    tipsTH: ['บริการบ่อยมาก - รถออกทุก 2-3 นาที'],
    jrPassCovered: true,
  },
  {
    id: 'shinjuku-tokyo',
    from: 'shinjuku',
    to: 'tokyo',
    totalTime: 14,
    totalPrice: 200,
    transfers: 0,
    steps: [
      {
        from: 'shinjuku',
        to: 'tokyo',
        line: 'JR Chuo Line (Rapid)',
        lineColor: '#F15A22',
        duration: 14,
        stops: 4,
        instruction: 'Direct Chuo Line Rapid from Shinjuku to Tokyo.',
        instructionTH: 'สาย Chuo Rapid ตรงจาก Shinjuku ไป Tokyo',
      },
    ],
    tips: ['Fastest route: Chuo Line Rapid', 'Avoid rush hour (7:30-9:00 AM) if possible'],
    tipsTH: ['เส้นทางเร็วสุด: สาย Chuo Rapid', 'หลีกเลี่ยงชั่วโมงเร่งด่วน (7:30-9:00 น.) ถ้าทำได้'],
    jrPassCovered: true,
  },
  {
    id: 'kamakura-tokyo',
    from: 'kamakura',
    to: 'tokyo',
    totalTime: 60,
    totalPrice: 1000,
    transfers: 0,
    steps: [
      {
        from: 'kamakura',
        to: 'tokyo',
        line: 'JR Yokosuka Line',
        lineColor: '#00AC90',
        duration: 60,
        stops: 13,
        instruction: 'Direct JR Yokosuka Line from Kamakura to Tokyo.',
        instructionTH: 'JR Yokosuka Line ตรงจาก Kamakura ไป Tokyo',
      },
    ],
    tips: ['Get window seat for Tokyo Bay views', 'JR Pass covers entire journey'],
    tipsTH: ['เลือกที่นั่งริมหน้าต่างชมวิวอ่าวโตเกียว', 'JR Pass ครอบคลุมตลอดเส้นทาง'],
    jrPassCovered: true,
  },
  {
    id: 'kawagoe-ikebukuro',
    from: 'kawagoe',
    to: 'ikebukuro',
    totalTime: 30,
    totalPrice: 600,
    transfers: 0,
    steps: [
      {
        from: 'kawagoe',
        to: 'ikebukuro',
        line: 'Tobu Tojo Line (Rapid)',
        lineColor: '#0068B8',
        duration: 30,
        stops: 9,
        instruction: 'Direct Tobu Tojo Line Rapid from Kawagoe to Ikebukuro.',
        instructionTH: 'สาย Tobu Tojo Rapid ตรงจาก Kawagoe ไป Ikebukuro',
      },
    ],
    tips: ['NOT covered by JR Pass (Tobu Railway)', 'Suica/Pasmo works on Tobu Line'],
    tipsTH: ['ไม่ครอบคลุมโดย JR Pass (รถไฟ Tobu)', 'Suica/Pasmo ใช้กับสาย Tobu ได้'],
    jrPassCovered: false,
  },
  {
    id: 'gala-yuzawa-ueno',
    from: 'gala-yuzawa',
    to: 'ueno',
    totalTime: 75,
    totalPrice: 7000,
    transfers: 0,
    steps: [
      {
        from: 'gala-yuzawa',
        to: 'ueno',
        line: 'Joetsu Shinkansen (Tanigawa)',
        lineColor: '#DA251E',
        duration: 75,
        stops: 3,
        instruction: 'Direct Shinkansen from Gala Yuzawa to Ueno.',
        instructionTH: 'Shinkansen ตรงจาก Gala Yuzawa ไป Ueno',
      },
    ],
    tips: ['JR Tokyo Wide Pass covers round trip (¥14,000 value)', 'Reserve seats at JR East Travel Service Center'],
    tipsTH: ['JR Tokyo Wide Pass ครอบคลุมไป-กลับ (มูลค่า ¥14,000)', 'จองที่นั่งที่ JR East Travel Service Center'],
    jrPassCovered: true,
  },
  {
    id: 'odaiba-tokyo',
    from: 'tokyo-teleport',
    to: 'tokyo',
    totalTime: 25,
    totalPrice: 480,
    transfers: 1,
    steps: [
      {
        from: 'tokyo-teleport',
        to: 'shinbashi',
        line: 'Yurikamome Line',
        lineColor: '#E60012',
        duration: 17,
        stops: 9,
        instruction: 'Yurikamome automated transit system to Shimbashi.',
        instructionTH: 'ระบบขนส่งอัตโนมัติ Yurikamome ไป Shimbashi',
      },
      {
        from: 'shinbashi',
        to: 'tokyo',
        line: 'JR Yamanote Line',
        lineColor: '#80C244',
        duration: 8,
        stops: 3,
        instruction: 'JR Yamanote Line from Shimbashi to Tokyo.',
        instructionTH: 'JR Yamanote Line จาก Shimbashi ไป Tokyo',
      },
    ],
    tips: ['Yurikamome has great Rainbow Bridge views from the front car', 'NOT covered by JR Pass after Shimbashi'],
    tipsTH: ['Yurikamome มีวิวสะพาน Rainbow Bridge สวยจากตู้หน้า', 'ไม่ครอบคลุมโดย JR Pass หลังจาก Shimbashi'],
    jrPassCovered: false,
  },
];

export function getStationById(id: string): Station | undefined {
  return stations.find(s => s.id === id);
}

export function findRoute(fromId: string, toId: string): TrainRoute | undefined {
  // First try exact match
  const directRoute = trainRoutes.find(
    r => r.from === fromId && r.to === toId
  );
  
  if (directRoute) return directRoute;
  
  // Try reverse route
  const reverseRoute = trainRoutes.find(
    r => r.from === toId && r.to === fromId
  );
  
  return reverseRoute;
}

export function searchRoutesByStations(fromId: string, toId: string): TrainRoute[] {
  // Direct routes
  const directRoutes = trainRoutes.filter(
    r => r.from === fromId && r.to === toId
  );
  
  if (directRoutes.length > 0) return directRoutes;
  
  // Reverse routes
  const reverseRoutes = trainRoutes.filter(
    r => r.from === toId && r.to === fromId
  );
  
  if (reverseRoutes.length > 0) {
    return reverseRoutes.map(route => ({
      ...route,
      id: `${route.id}-reverse`,
      from: toId,
      to: fromId,
      steps: [...route.steps].reverse().map(step => ({
        ...step,
        from: step.to,
        to: step.from,
      })),
    }));
  }
  
  // If no direct connection, find routes that share common stations
  const fromRoutes = trainRoutes.filter(r => r.from === fromId || r.to === fromId);
  const toRoutes = trainRoutes.filter(r => r.from === toId || r.to === toId);
  
  // Find connecting routes
  const connections: TrainRoute[] = [];
  for (const fromRoute of fromRoutes) {
    const connectingStation = fromRoute.from === fromId ? fromRoute.to : fromRoute.from;
    for (const toRoute of toRoutes) {
      const toConnectingStation = toRoute.from === toId ? toRoute.to : toRoute.from;
      if (connectingStation === toConnectingStation) {
        // Found a connection!
        connections.push(fromRoute);
        connections.push(toRoute);
        break;
      }
    }
    if (connections.length > 0) break;
  }
  
  return connections;
}

export function searchRoutes(query: string): TrainRoute[] {
  const lowerQuery = query.toLowerCase();
  return trainRoutes.filter(route => {
    const fromStation = getStationById(route.from);
    const toStation = getStationById(route.to);
    
    return (
      fromStation?.name.toLowerCase().includes(lowerQuery) ||
      fromStation?.nameTH.includes(query) ||
      toStation?.name.toLowerCase().includes(lowerQuery) ||
      toStation?.nameTH.includes(query) ||
      fromStation?.line.toLowerCase().includes(lowerQuery) ||
      toStation?.line.toLowerCase().includes(lowerQuery)
    );
  });
}

export function getRoutesByStation(stationId: string): { departing: TrainRoute[]; arriving: TrainRoute[] } {
  return {
    departing: trainRoutes.filter(r => r.from === stationId),
    arriving: trainRoutes.filter(r => r.to === stationId),
  };
}

export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function formatTimeTH(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} นาที`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours} ชม. ${mins} นาที` : `${hours} ชม.`;
}

export function formatPrice(price: number): string {
  return `¥${price.toLocaleString()}`;
}
