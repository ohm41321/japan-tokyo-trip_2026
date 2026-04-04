export interface Location {
  name: string;
  query: string; // Google Maps search query
  done: boolean;
}

export interface DayPlan {
  day: number;
  date: string;
  dayOfWeek: string;
  title: string;
  icon: string;
  transport?: string;
  locations: Location[];
  notes?: string;
}

export const itineraryData: DayPlan[] = [
  {
    day: 1,
    date: "16/04/2026",
    dayOfWeek: "Thursday",
    title: "Arrival & Ueno/Asakusa",
    icon: "✈️",
    transport: "TG 640 landing 6:20 AM",
    locations: [
      { name: "Check SIM card", query: "SIM card shop Ueno Tokyo", done: false },
      { name: "Buy Keisei Skyliner ticket", query: "Keisei Skyliner ticket counter Narita Airport", done: false },
      { name: "Buy 4 Suica cards", query: "Suica card machine Narita Airport", done: false },
      { name: "Buy JR Tokyo Wide Pass (8 pcs) + Book Gala Yuzawa seat", query: "JR East Travel Service Center Narita Airport", done: false },
      { name: "Leave luggage at hotel", query: "Tabist Hotel Ueno 39 Tokyo", done: false },
      { name: "Lunch - Sushiro Ueno", query: "Sushiro Ueno Tokyo", done: false },
      { name: "Asakusa Temple (Senso-ji)", query: "Senso-ji Temple Asakusa Tokyo", done: false },
      { name: "Unagi Irokawa (eel rice)", query: "Unagi Irokawa Asakusa", done: false },
      { name: "Asakusa Gyukatsu", query: "Asakusa Gyukatsu", done: false },
      { name: "Unatoto Asakusa", query: "Unatoto Asakusa", done: false },
      { name: "Kagetsudo Asakusa (melon pan)", query: "Kagetsudo Asakusa", done: false },
      { name: "Suzukien Asakusa (matcha ice cream)", query: "Suzukien Asakusa matcha", done: false },
      { name: "Imo Pippi (sweet potato creme brulee)", query: "Imo Pippi Asakusa", done: false },
      { name: "Chaya Tabanenoshi (matcha crepes)", query: "Chaya Tabanenoshi Asakusa", done: false },
      { name: "Hatoya Asakusa (matcha)", query: "Hatoya Asakusa", done: false },
      { name: "Mutsuchiyama Shoden Temple", query: "Mutsuchiyama Shoden Tokyo", done: false },
      { name: "Tokyo Skytree", query: "Tokyo Skytree", done: false },
      { name: "Sumida River", query: "Sumida River Tokyo", done: false },
      { name: "Check-in Tabist Hotel Ueno 39", query: "Tabist Hotel Ueno 39 Tokyo", done: false },
      { name: "Ameyoko Market", query: "Ameyoko Market Ueno Tokyo", done: false },
      { name: "Takeya Ueno", query: "Takeya Ueno", done: false },
    ],
  },
  {
    day: 2,
    date: "17/04/2026",
    dayOfWeek: "Friday",
    title: "Gala Yuzawa Snow Day",
    icon: "❄️",
    transport: "JR Tokyo Wide Pass | 07:42/08:09/09:58 Ueno → Gala Yuzawa | Return 15:56",
    locations: [
      { name: "Ueno Station", query: "Ueno Station Tokyo", done: false },
      { name: "Gala Yuzawa Ski Resort", query: "Gala Yuzawa Station Niigata", done: false },
      { name: "Shinjuku Godzilla Street", query: "Godzilla Head Shinjuku Tokyo", done: false },
      { name: "Shinpachi Shokudo", query: "Shinpachi Shokudo Shinjuku", done: false },
      { name: "Afuri Ramen", query: "Afuri Ramen Shinjuku Tokyo", done: false },
    ],
  },
  {
    day: 3,
    date: "18/04/2026",
    dayOfWeek: "Saturday",
    title: "Kamakura & Akihabara",
    icon: "⛩️",
    transport: "JR Tokyo Wide Pass",
    locations: [
      { name: "Kamakura (08:30-12:00)", query: "Kamakura Station", done: false },
      { name: "Kannon Crepe", query: "Kannon Crepe Kamakura", done: false },
      { name: "Komachi-dori Street", query: "Komachi-dori Street Kamakura", done: false },
      { name: "Shichirigahama Beach (optional)", query: "Shichirigahama Beach Kamakura", done: false },
      { name: "Akihabara", query: "Akihabara Electric Town Tokyo", done: false },
      { name: "Ikebukuro Animate", query: "Animate Ikebukuro Tokyo", done: false },
      { name: "I'm Donut", query: "I'm Donut Tokyo", done: false },
    ],
  },
  {
    day: 4,
    date: "19/04/2026",
    dayOfWeek: "Sunday",
    title: "Kawagoe, Shibuya & Harajuku",
    icon: "🏮",
    locations: [
      { name: "Kawagoe Old Town (08:30-14:00)", query: "Kawagoe Ichibangai Saitama", done: false },
      { name: "Shogun Burger Shibuya", query: "Shogun Burger Shibuya Tokyo", done: false },
      { name: "The Great Burger", query: "The Great Burger Tokyo", done: false },
      { name: "Burger Mania Ebisu", query: "Burger Mania Ebisu Tokyo", done: false },
      { name: "Henry's Burger", query: "Henry's Burger Tokyo", done: false },
      { name: "Tsukishima Monja Okoge", query: "Tsukishima Monja Street Tokyo", done: false },
      { name: "Daikanyama", query: "Daikanyama Tokyo", done: false },
      { name: "Takeshita Street Harajuku", query: "Takeshita Street Harajuku Tokyo", done: false },
      { name: "Meiji Jingu Shrine", query: "Meiji Jingu Shrine Tokyo", done: false },
      { name: "I'm Donut Harajuku", query: "I'm Donut Harajuku Tokyo", done: false },
    ],
  },
  {
    day: 5,
    date: "20/04/2026",
    dayOfWeek: "Monday",
    title: "Mt. Fuji One Day Tour",
    icon: "🗻",
    transport: "Tour 08:00-18:00",
    locations: [
      { name: "Mt. Fuji Tour", query: "Mount Fuji Tour Tokyo", done: false },
      { name: "Ueno (free time)", query: "Ueno Park Tokyo", done: false },
    ],
  },
  {
    day: 6,
    date: "21/04/2026",
    dayOfWeek: "Tuesday",
    title: "Tokyo Old Town & Coffee",
    icon: "☕",
    locations: [
      { name: "Shibamata Old Town", query: "Shibamata Taishakuten Tokyo", done: false },
      { name: "Bear Pond Espresso (Kitazawa)", query: "Bear Pond Espresso Shimokitazawa Tokyo", done: false },
    ],
  },
  {
    day: 7,
    date: "22/04/2026",
    dayOfWeek: "Wednesday",
    title: "Departure Day",
    icon: "🛫",
    locations: [
      { name: "Duty Free Shopping", query: "Duty Free Shop Narita Airport", done: false },
      { name: "Narita Airport", query: "Narita International Airport", done: false },
    ],
  },
];
