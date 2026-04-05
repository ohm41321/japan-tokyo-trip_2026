# 🌐 Language Support (EN/TH)

## ✅ Now Supports Thai & English!

Your Tokyo trip planner now has **full bilingual support** for English (EN) and Thai (TH)!

---

## 🎯 How It Works

### Default Language: **English**
- First time users see English interface
- Click **🇹🇭 TH** button in header to switch to Thai
- Click **🇬🇧 EN** button to switch back to English

### Smart Translation:
- ✅ **UI Elements** - All buttons, labels, headers translated
- ✅ **Progress Text** - "done", "packed", "spent" etc.
- ✅ **Weather Labels** - Humidity, Wind, Rain, etc.
- ✅ **Packing Categories** - Documents, Electronics, etc.
- ✅ **Tab Names** - Itinerary, Budget, Weather, etc.
- ✅ **Tips Title** - "เคล็ดลับและข้อควรระวัง" / "Tips & Advice"

### What Stays in English:
- ❌ **Place Names** - Senso-ji, Tokyo Skytree, Ueno (should remain English for maps/asking directions)
- ❌ **Restaurant Names** - Sushiro, Afuri Ramen, etc. (need to show staff)
- ❌ **Station Names** - Ueno Station, Narita Airport (for navigation)
- ❌ **Transport Terms** - Shinkansen, Suica, JR Pass (no translation needed)
- ❌ **Tips Content** - Already in Thai from before (useful advice)

---

## 🔘 How to Switch Language

### In Header (Top Right):
```
┌────────────────────────────────────┐
│ 🗼 Tokyo 2026                     │
│                                    │
│              [🇹🇭 TH] [🌙]        │  ← Click here!
└────────────────────────────────────┘
```

**Button shows:**
- 🇹🇭 **TH** - Currently in English, click to switch to Thai
- 🇬🇧 **EN** - Currently in Thai, click to switch to English

---

## 📊 Translation Examples

### Tab Navigation:

| English | Thai |
|---------|------|
| 📅 Itinerary | 📅 แผนรายวัน |
| 💰 Budget | 💰 งบประมาณ |
| 🌤️ Weather | 🌤️ สภาพอากาศ |
| 🎒 Packing | 🎒 ของที่ต้องเตรียม |
| 🚃 Transport | 🚃 การเดินทาง |

### DayCard:

| English | Thai |
|---------|------|
| ☑ Check All | ☑ เลือกทั้งหมด |
| ☐ Uncheck All | ☐ ยกเลิกทั้งหมด |
| Expand All | ขยายทั้งหมด |
| Collapse All | ยุบทั้งหมด |
| 3/21 done | 3/21 เสร็จแล้ว |
| View on Map | ดูบนแผนที่ |
| Hide Map | ซ่อนแผนที่ |
| Open in Maps | เปิดใน Maps |
| 💡 Tips & Advice | 💡 เคล็ดลับและข้อควรระวัง |

### Weather:

| English | Thai |
|---------|------|
| Tokyo Weather | สภาพอากาศโตเกียว |
| Live data | ข้อมูลสด |
| Updated: 2:45 PM | อัพเดต: 14:45 |
| Rain expected | คาดว่าฝนจะตก |
| Sunny | แดดจัด |
| Partly Cloudy | มีเมฆบางส่วน |
| Cloudy | มีเมฆมาก |
| Rain | ฝนตก |
| Humidity | ความชื้น |
| Wind | ลม |
| Clothing Recommendations | แนะนำการแต่งตัว |
| Tips | เคล็ดลับ |

### Packing:

| English | Thai |
|---------|------|
| Packing List | รายการของที่ต้องเตรียม |
| Get ready for your trip | เตรียมตัวให้พร้อมสำหรับทริป |
| 15/32 packed | 15/32 จัดแล้ว |
| All | ทั้งหมด |
| Unpacked | ยังไม่ได้จัด |
| Packed | จัดแล้ว |
| Reset All | รีเซ็ตทั้งหมด |
| Add custom item... | เพิ่มรายการ... |
| Documents | 📋 เอกสาร |
| Electronics | 🔌 อิเล็กทรอนิกส์ |
| Clothing | 👕 เสื้อผ้า |
| Toiletries | 🧴 ของใช้ส่วนตัว |
| Medicine | 💊 ยา |
| Misc | 📦 เบ็ดเตล็ด |

### Footer:

| English | Thai |
|---------|------|
| 🌸 Enjoy Your Tokyo Adventure! 🌸 | 🌸 ขอให้สนุกกับการผจญภัยในโตเกียว! 🌸 |
| 7 Days • 49 Locations • 200+ Tips | 7 วัน • 49 สถานที่ • 200+ เคล็ดลับ |

---

## 💾 Persistence

### Auto-Save:
- Language preference saved to `localStorage`
- Key: `tokyo-trip-language`
- Values: `'en'` or `'th'`
- Persists across page reloads
- Persists across browser sessions

### How It Works:
```
User clicks TH button
  ↓
Language changes to 'th'
  ↓
Saved to localStorage
  ↓
User reloads page
  ↓
App reads localStorage
  ↓
Language stays Thai ✅
```

---

## 🛠️ Technical Implementation

### Language Context:
```typescript
// src/context/LanguageContext.tsx
"use client";

export type Language = 'en' | 'th';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string; // Translation function
}
```

### Usage in Components:
```typescript
import { useLanguage } from '@/context/LanguageContext';

export default function MyComponent() {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div>
      {language === 'th' ? 'สวัสดี' : 'Hello'}
    </div>
  );
}
```

### Translation System:
```typescript
// Centralized translations object
export const translations: Translations = {
  'tab.itinerary': { en: 'Itinerary', th: 'แผนรายวัน' },
  'tab.budget': { en: 'Budget', th: 'งบประมาณ' },
  // ... 80+ translations
};
```

---

## 📁 Files Modified/Created

### Created:
1. `src/context/LanguageContext.tsx` - Language provider + translations

### Modified:
1. `src/app/layout.tsx` - Added LanguageProvider wrapper
2. `src/app/page.tsx` - Tab labels now language-aware
3. `src/components/Header.tsx` - Added language toggle button
4. `src/components/Footer.tsx` - Footer text translated
5. `src/components/DayCard.tsx` - Button labels, progress text translated
6. `src/components/WeatherWidget.tsx` - Weather labels translated

---

## 🎨 UI Components

### Language Toggle Button:
```tsx
<button
  onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}
  className="p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20"
>
  {language === 'en' ? '🇹🇭 TH' : '🇬🇧 EN'}
</button>
```

**Design:**
- Position: Top right corner of header (next to theme toggle)
- Style: Semi-transparent white circle with border
- Hover effect: Slightly brighter background
- Shows current target language (what you'll switch TO)

---

## 💡 Smart Design Choices

### 1. **Place Names Stay English**
**Why?**
- Easier to show staff for directions
- Google Maps search uses English names
- Station signs in Japan are bilingual
- Avoids confusion with similar-sounding Thai translations

**Examples:**
- ✅ "Tokyo Skytree" (not "โตเกียวสกายทรี")
- ✅ "Ueno Station" (not "สถานีโออุเอโนะ")
- ✅ "Senso-ji Temple" (not "วัดเซนโซจิ")

### 2. **Tips Content Already Thai**
**Why?**
- Tips were added in Thai from before
- Contains practical advice (more useful in native language)
- No need to duplicate in English (would bloat data)

**Future Enhancement:**
- Could add EN/TH tips for bilingual support
- Would double the data size

### 3. **Weather Labels Translated**
**Why?**
- Weather terms are universal
- Easy to translate accurately
- Helps users understand forecasts better

**Examples:**
- "Humidity" → "ความชื้น"
- "Wind Speed" → "ความเร็วลม"
- "Rain Chance" → "โอกาสฝนตก"

---

## 🌍 Use Cases

### For Thai Travelers:
1. **Planning Phase** (TH mode):
   - Understand all UI easily
   - Read tips in Thai
   - Know what to pack

2. **During Trip** (TH mode):
   - Check progress in Thai
   - Read weather advice in Thai
   - Still see place names in English (for navigation)

3. **At Location** (English names visible):
   - Show "Tokyo Skytree" to staff for directions
   - Search "Ueno Station" in Google Maps
   - Read station signs (bilingual in Japan)

### For English Speakers:
1. Default English mode works perfectly
2. All features accessible
3. Can share app with Thai friends (they switch to TH)

---

## ✅ Summary

### What's Translated:
- ✅ All UI labels and buttons
- ✅ Progress indicators
- ✅ Tab names
- ✅ Weather terms
- ✅ Packing categories
- ✅ Footer text
- ✅ Tips section titles

### What Stays English:
- ✅ Place/location names
- ✅ Restaurant names
- ✅ Station names
- ✅ Transport terminology (Suica, Shinkansen)
- ✅ Tips content (already Thai)

### Features:
- ✅ Default: English
- ✅ Toggle: TH ↔ EN
- ✅ Persistent: Saved to localStorage
- ✅ Instant: No reload needed
- ✅ Beautiful: Flag emojis for clarity

---

**Switch languages anytime with one click! 🇹🇭🇬🇧**

Enjoy your Tokyo trip in your preferred language! 🗼🌸
