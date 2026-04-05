import { useState, useEffect } from 'react';

export interface PackingItem {
  id: string;
  name: string;
  nameTH?: string;
  category: 'documents' | 'electronics' | 'clothing' | 'toiletries' | 'medicine' | 'miscellaneous';
  packed: boolean;
  essential: boolean;
  notes?: string;
  notesTH?: string;
}

const defaultItems: PackingItem[] = [
  { id: 'doc-1', name: 'Passport', nameTH: 'หนังสือเดินทาง', category: 'documents', packed: false, essential: true },
  { id: 'doc-2', name: 'Travel Insurance Document', nameTH: 'เอกสารประกันภัยการเดินทาง', category: 'documents', packed: false, essential: true },
  { id: 'doc-3', name: 'Hotel Confirmation Printout', nameTH: 'ใบยืนยันการจองโรงแรม', category: 'documents', packed: false, essential: false },
  { id: 'doc-4', name: 'Flight Tickets/Itinerary', nameTH: 'ตั๋วเดินทาง/ตารางการบิน', category: 'documents', packed: false, essential: true },
  { id: 'doc-5', name: 'JR Pass Exchange Order', nameTH: 'ใบแลก JR Pass', category: 'documents', packed: false, essential: true },
  { id: 'doc-6', name: 'Copy of ID/Passport Photo', nameTH: 'สำเนาบัตรประชาชน/รูปหนังสือเดินทาง', category: 'documents', packed: false, essential: false },
  { id: 'elec-1', name: 'Phone + Charging Cable', nameTH: 'โทรศัพท์ + สายชาร์จ', category: 'electronics', packed: false, essential: true },
  { id: 'elec-2', name: 'Power Bank 10000mAh+', nameTH: 'แบตเตอรี่สำรอง 10000mAh+', category: 'electronics', packed: false, essential: true },
  { id: 'elec-3', name: 'Plug Adapter (Type A 2-pin)', nameTH: 'หัวแปลงปลั๊ก (Type A 2 ขา)', category: 'electronics', packed: false, essential: true },
  { id: 'elec-4', name: 'Pocket WiFi or eSIM', nameTH: 'Pocket WiFi หรือ eSIM', category: 'electronics', packed: false, essential: true },
  { id: 'elec-5', name: 'Camera + SD Cards', nameTH: 'กล้อง + เมมโมรี่การ์ด', category: 'electronics', packed: false, essential: false },
  { id: 'cloth-1', name: 'Comfortable Walking Shoes', nameTH: 'รองเท้าผ้าใบใส่เดินสบายๆ', category: 'clothing', packed: false, essential: true },
  { id: 'cloth-2', name: 'Light Jacket (April 15-20°C)', nameTH: 'เสื้อแจ็คเก็ตบาง (เม.ย. 15-20°C)', category: 'clothing', packed: false, essential: false },
  { id: 'cloth-3', name: 'Umbrella or Raincoat', nameTH: 'ร่มหรือเสื้อกันฝน', category: 'clothing', packed: false, essential: false },
  { id: 'cloth-4', name: 'Extra Socks (temples)', nameTH: 'ถุงเท้าสำรอง (เข้าวัดต้องถอดรองเท้า)', category: 'clothing', packed: false, essential: true },
  { id: 'cloth-5', name: 'Hat/Cap', nameTH: 'หมวก', category: 'clothing', packed: false, essential: false },
  { id: 'toile-1', name: 'Toothbrush/Toothpaste', nameTH: 'แปรงสีฟัน/ยาสีฟัน', category: 'toiletries', packed: false, essential: false },
  { id: 'toile-2', name: 'Sunscreen SPF 50+', nameTH: 'ครีมกันแดด SPF 50+', category: 'toiletries', packed: false, essential: true },
  { id: 'toile-3', name: 'Hand Sanitizer', nameTH: 'เจลล้างมือ', category: 'toiletries', packed: false, essential: false },
  { id: 'toile-4', name: 'Wet Tissues/Wipes', nameTH: 'ทิชชู่เปียก', category: 'toiletries', packed: false, essential: false },
  { id: 'toile-5', name: 'Lip Balm', nameTH: 'ลิปมัน', category: 'toiletries', packed: false, essential: false },
  { id: 'med-1', name: 'Pain Reliever (Tylenol/Advil)', nameTH: 'ยาแก้ปวด (Tylenol/Advil)', category: 'medicine', packed: false, essential: true },
  { id: 'med-2', name: 'Stomach Medicine', nameTH: 'ยาแก้ปวดท้อง/ยาธาตุ', category: 'medicine', packed: false, essential: true },
  { id: 'med-3', name: 'Band-Aids/Plasters', nameTH: 'พลาสเตอร์ปิดแผล', category: 'medicine', packed: false, essential: false },
  { id: 'med-4', name: 'Motion Sickness Pills', nameTH: 'ยาแก้เมารถ/เมาเรือ', category: 'medicine', packed: false, essential: false },
  { id: 'med-5', name: 'Personal Prescription Meds', nameTH: 'ยาประจำตัว', category: 'medicine', packed: false, essential: true },
  { id: 'misc-1', name: 'Coin Purse', nameTH: 'กระเป๋าเหรียญ', category: 'miscellaneous', packed: false, essential: true, notes: 'Japan uses lots of coins', notesTH: 'ญี่ปุ่นใช้เหรียญเยอะมาก' },
  { id: 'misc-2', name: 'Reusable Shopping Bag', nameTH: 'ถุงผ้าช้อปปิ้ง', category: 'miscellaneous', packed: false, essential: false },
  { id: 'misc-3', name: 'Hand Towel', nameTH: 'ผ้าเช็ดมือ', category: 'miscellaneous', packed: false, essential: true, notes: 'Many restrooms have no dryer', notesTH: 'ห้องน้ำหลายที่ไม่มีเครื่องเป่ามือ' },
  { id: 'misc-4', name: 'Suica/PASMO Card', nameTH: 'บัตร Suica/PASMO', category: 'miscellaneous', packed: false, essential: true },
  { id: 'misc-5', name: 'Yen Cash', nameTH: 'เงินเยนสด', category: 'miscellaneous', packed: false, essential: true },
  { id: 'misc-6', name: 'Small Notebook + Pen', nameTH: 'สมุดเล่มเล็ก + ปากกา', category: 'miscellaneous', packed: false, essential: false },
];

export function usePackingList() {
  const [items, setItems] = useState<PackingItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Migration map: English name -> Thai translation
  const nameMap: Record<string, string> = {
    'Passport': 'หนังสือเดินทาง',
    'Travel Insurance Document': 'เอกสารประกันภัยการเดินทาง',
    'Hotel Confirmation Printout': 'ใบยืนยันการจองโรงแรม',
    'Flight Tickets/Itinerary': 'ตั๋วเดินทาง/ตารางการบิน',
    'JR Pass Exchange Order': 'ใบแลก JR Pass',
    'Copy of ID/Passport Photo': 'สำเนาบัตรประชาชน/รูปหนังสือเดินทาง',
    'Phone + Charging Cable': 'โทรศัพท์ + สายชาร์จ',
    'Power Bank 10000mAh+': 'แบตเตอรี่สำรอง 10000mAh+',
    'Plug Adapter (Type A 2-pin)': 'หัวแปลงปลั๊ก (Type A 2 ขา)',
    'Pocket WiFi or eSIM': 'Pocket WiFi หรือ eSIM',
    'Camera + SD Cards': 'กล้อง + เมมโมรี่การ์ด',
    'Comfortable Walking Shoes': 'รองเท้าผ้าใบใส่เดินสบายๆ',
    'Light Jacket (April 15-20°C)': 'เสื้อแจ็คเก็ตบาง (เม.ย. 15-20°C)',
    'Umbrella or Raincoat': 'ร่มหรือเสื้อกันฝน',
    'Extra Socks (temples)': 'ถุงเท้าสำรอง (เข้าวัดต้องถอดรองเท้า)',
    'Hat/Cap': 'หมวก',
    'Toothbrush/Toothpaste': 'แปรงสีฟัน/ยาสีฟัน',
    'Sunscreen SPF 50+': 'ครีมกันแดด SPF 50+',
    'Hand Sanitizer': 'เจลล้างมือ',
    'Wet Tissues/Wipes': 'ทิชชู่เปียก',
    'Lip Balm': 'ลิปมัน',
    'Pain Reliever (Tylenol/Advil)': 'ยาแก้ปวด (Tylenol/Advil)',
    'Stomach Medicine': 'ยาแก้ปวดท้อง/ยาธาตุ',
    'Band-Aids/Plasters': 'พลาสเตอร์ปิดแผล',
    'Motion Sickness Pills': 'ยาแก้เมารถ/เมาเรือ',
    'Personal Prescription Meds': 'ยาประจำตัว',
    'Coin Purse': 'กระเป๋าเหรียญ',
    'Reusable Shopping Bag': 'ถุงผ้าช้อปปิ้ง',
    'Hand Towel': 'ผ้าเช็ดมือ',
    'Suica/PASMO Card': 'บัตร Suica/PASMO',
    'Yen Cash': 'เงินเยนสด',
    'Small Notebook + Pen': 'สมุดเล่มเล็ก + ปากกา',
  };

  const notesMap: Record<string, string> = {
    'Coin Purse': 'ญี่ปุ่นใช้เหรียญเยอะมาก',
    'Hand Towel': 'ห้องน้ำหลายที่ไม่มีเครื่องเป่ามือ',
  };

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('tokyo-trip-packing');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Migration: Add nameTH to existing items
        const migrated = parsed.map((item: PackingItem) => ({
          ...item,
          nameTH: item.nameTH || nameMap[item.name] || undefined,
          notesTH: item.notesTH || notesMap[item.name] || item.notesTH,
        }));
        setItems(migrated);
        // Save migrated data
        localStorage.setItem('tokyo-trip-packing', JSON.stringify(migrated));
      } catch {
        setItems(defaultItems);
      }
    } else {
      setItems(defaultItems);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('tokyo-trip-packing', JSON.stringify(items));
    }
  }, [items, mounted]);

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  };

  const addItem = (name: string, category: PackingItem['category'], essential = false) => {
    const newItem: PackingItem = {
      id: `custom-${Date.now()}`,
      name,
      category,
      packed: false,
      essential,
    };
    setItems(prev => [...prev, newItem]);
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const resetAll = () => {
    setItems(prev => prev.map(item => ({ ...item, packed: false })));
  };

  const getByCategory = (category: PackingItem['category']) => {
    return items.filter(item => item.category === category);
  };

  const getProgress = () => {
    const packed = items.filter(i => i.packed).length;
    const total = items.length;
    const percent = total > 0 ? Math.round((packed / total) * 100) : 0;
    return { packed, total, percent };
  };

  const getCategoryProgress = (category: PackingItem['category']) => {
    const categoryItems = items.filter(i => i.category === category);
    const packed = categoryItems.filter(i => i.packed).length;
    return { packed, total: categoryItems.length };
  };

  return {
    items,
    mounted,
    toggleItem,
    addItem,
    deleteItem,
    resetAll,
    getByCategory,
    getProgress,
    getCategoryProgress,
  };
}
