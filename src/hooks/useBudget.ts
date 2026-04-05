"use client";

import { useEffect, useState, useCallback } from "react";

export interface Expense {
  id: string;
  dayIndex: number;
  category: "food" | "transport" | "shopping" | "activities" | "accommodation" | "other";
  amount: number;
  description: string;
  timestamp: number;
}

export interface DayBudget {
  dayIndex: number;
  limit: number;
}

interface StoredBudget {
  expenses: Expense[];
  dayBudgets: DayBudget[];
}

const STORAGE_KEY = "tokyo-trip-budget";

const defaultDayBudgets: DayBudget[] = Array.from({ length: 7 }, (_, i) => ({
  dayIndex: i,
  limit: 0,
}));

function loadBudget(): StoredBudget {
  if (typeof window === "undefined") {
    return { expenses: [], dayBudgets: defaultDayBudgets };
  }
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as StoredBudget;
      return {
        expenses: parsed.expenses || [],
        dayBudgets: parsed.dayBudgets?.length === 7 ? parsed.dayBudgets : defaultDayBudgets,
      };
    } catch {
      return { expenses: [], dayBudgets: defaultDayBudgets };
    }
  }
  return { expenses: [], dayBudgets: defaultDayBudgets };
}

function saveBudget(expenses: Expense[], dayBudgets: DayBudget[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ expenses, dayBudgets }));
}

export function useBudget() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [dayBudgets, setDayBudgets] = useState<DayBudget[]>(defaultDayBudgets);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const data = loadBudget();
    setExpenses(data.expenses);
    setDayBudgets(data.dayBudgets);
    setMounted(true);
  }, []);

  const persist = useCallback(
    (newExpenses: Expense[], newDayBudgets: DayBudget[]) => {
      setExpenses(newExpenses);
      setDayBudgets(newDayBudgets);
      saveBudget(newExpenses, newDayBudgets);
    },
    []
  );

  const addExpense = useCallback(
    (expense: Omit<Expense, "id" | "timestamp">) => {
      const newExpense: Expense = {
        ...expense,
        id: `exp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        timestamp: Date.now(),
      };
      persist([...expenses, newExpense], dayBudgets);
    },
    [expenses, dayBudgets, persist]
  );

  const deleteExpense = useCallback(
    (id: string) => {
      persist(expenses.filter((e) => e.id !== id), dayBudgets);
    },
    [expenses, dayBudgets, persist]
  );

  const setDayLimit = useCallback(
    (dayIndex: number, limit: number) => {
      const newBudgets = dayBudgets.map((d) =>
        d.dayIndex === dayIndex ? { ...d, limit } : d
      );
      persist(expenses, newBudgets);
    },
    [expenses, dayBudgets, persist]
  );

  const getDayTotal = useCallback(
    (dayIndex: number): number => {
      return expenses
        .filter((e) => e.dayIndex === dayIndex)
        .reduce((sum, e) => sum + e.amount, 0);
    },
    [expenses]
  );

  const getTotalSpent = useCallback((): number => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const getTotalBudget = useCallback((): number => {
    return dayBudgets.reduce((sum, d) => sum + d.limit, 0);
  }, [dayBudgets]);

  const isOverBudget = useCallback(
    (dayIndex: number): boolean => {
      const day = dayBudgets.find((d) => d.dayIndex === dayIndex);
      if (!day || day.limit === 0) return false;
      return getDayTotal(dayIndex) > day.limit;
    },
    [dayBudgets, getDayTotal]
  );

  return {
    expenses,
    dayBudgets,
    addExpense,
    deleteExpense,
    setDayLimit,
    getDayTotal,
    getTotalSpent,
    getTotalBudget,
    isOverBudget,
    mounted,
  };
}
