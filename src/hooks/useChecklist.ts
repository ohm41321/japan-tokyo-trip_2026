"use client";

import { useEffect, useState } from "react";
import { itineraryData } from "@/data/itinerary";

export function useChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tokyo-trip-checklist");
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch {}
    }
    setMounted(true);
  }, []);

  const toggleItem = (dayIndex: number, itemIndex: number) => {
    const key = `${dayIndex}-${itemIndex}`;
    setCheckedItems((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem("tokyo-trip-checklist", JSON.stringify(next));
      return next;
    });
  };

  const toggleDay = (dayIndex: number) => {
    const day = itineraryData[dayIndex];
    const allChecked = day.locations.every((_, i) => checkedItems[`${dayIndex}-${i}`]);
    const next = { ...checkedItems };

    day.locations.forEach((_, i) => {
      next[`${dayIndex}-${i}`] = !allChecked;
    });

    setCheckedItems(next);
    localStorage.setItem("tokyo-trip-checklist", JSON.stringify(next));
  };

  const getDayProgress = (dayIndex: number) => {
    const day = itineraryData[dayIndex];
    const done = day.locations.filter((_, i) => checkedItems[`${dayIndex}-${i}`]).length;
    return { done, total: day.locations.length, percent: Math.round((done / day.locations.length) * 100) };
  };

  const getTotalProgress = () => {
    let total = 0;
    let done = 0;
    itineraryData.forEach((day, dayIndex) => {
      day.locations.forEach((_, itemIndex) => {
        total++;
        if (checkedItems[`${dayIndex}-${itemIndex}`]) done++;
      });
    });
    return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
  };

  return {
    checkedItems,
    toggleItem,
    toggleDay,
    getDayProgress,
    getTotalProgress,
    mounted,
  };
}
